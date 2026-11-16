r"""Refresh catalog/campaign.json from the published game.

The game is at https://elementals-8iap.onrender.com/ ; its index.html names one bundle under
assets/, which carries every campaign level as a JS object literal. This reads that bundle with a
scanner and regexes only — it never imports or executes it — and writes the fingerprint of each
level: id, name, order, supports, par, description, hints, tile palette, entity counts and the
notable options. Tile maps are deliberately not stored.

A campaign level whose tile map is byte-identical to one of ours is tagged `"ours": "<our id>"`,
because the author has shipped several of this repo's levels; tools/catalog.mjs then lists such a
level once, under this repo, instead of twice. Levels of ours that were edited before shipping are
tagged by hand with `"map_differs": true` as well.

    cd <repo> && mkdir -p /tmp/g && cd /tmp/g
    curl -sS -o index.html https://elementals-8iap.onrender.com/
    curl -sS -o app.js "https://elementals-8iap.onrender.com/$(grep -o 'assets/[^"]*\.js' index.html)"
    cd <repo> && python3 -I tools/extract-campaign.py /tmp/g/app.js catalog/campaign.json levels
    node tools/catalog.mjs

Then re-apply the hand-made tags (`map_differs`, the `ideas` on campaign levels) — the script does
not invent them — and run `node tools/novelty.mjs` over the repo to see what the new levels collide
with.
"""
import hashlib, json, re, sys
from pathlib import Path

src = Path(sys.argv[1]).read_text(encoding="utf-8")
out_path, levels_dir = Path(sys.argv[2]), Path(sys.argv[3])

def slice_balanced(s, i):
    """s[i] is '{' or '['; return the slice through its match, respecting backtick strings."""
    open_ch, close_ch = s[i], {"{": "}", "[": "]"}[s[i]]
    depth, j, in_tick = 0, i, False
    while j < len(s):
        c = s[j]
        if c == "\\":
            j += 2
            continue
        if c == "`":
            in_tick = not in_tick
        elif not in_tick:
            if c == open_ch:
                depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0:
                    return s[i:j + 1]
        j += 1
    raise ValueError("unbalanced")

def field(obj, name):
    m = re.search(r"\b" + name + r":`((?:[^`\\]|\\.)*)`", obj)
    return m.group(1).replace("\\`", "`") if m else None

def num(obj, name):
    m = re.search(r"\b" + name + r":(-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?)", obj)
    return m.group(1) if m else None

def array(obj, name):
    m = re.search(r"\b" + name + r":\[", obj)
    return slice_balanced(obj, m.end() - 1) if m else None

def ticks(obj, name):
    for item in re.finditer(r"`((?:[^`\\]|\\.)*)`", obj):
        yield item.group(1).replace("\\`", "`")

SPECIAL = set("=/\\LWMVS")
levels = []
for m in re.finditer(r'"\.\./\.\./levels/([a-z0-9_]+)\.json":\{', src):
    obj = slice_balanced(src, m.end() - 1)
    lid = m.group(1)

    sup = array(obj, "supports") or "[]"
    supports = ["+".join(re.findall(r"`([a-z]+)`", g)) for g in re.findall(r"\[[^\[\]]*\]", sup)]

    tiles = list(ticks(array(obj, "tiles") or "[]", "tiles"))
    palette = sorted({c for row in tiles for c in row if c in SPECIAL})

    ents_src = array(obj, "entities") or "[]"
    counts, options = {}, set()
    for e in re.findall(r"\{(?:[^{}`]|`(?:[^`\\]|\\.)*`|\{[^{}]*\})*\}", ents_src):
        et = field(e, "type")
        if not et or et in ("gem", "exit", "sign", "checkpoint"):
            continue
        counts[et] = counts.get(et, 0) + 1
        if "latch:!0" in e:
            options.add("latch")
        if "invert:!0" in e:
            options.add(f"invert({et})")
        if (r := num(e, "required")):
            options.add(f"required:{r}")
        if field(e, "weight") == "heavy":
            options.add("heavy plate")
        if et == "belt":
            if (s := num(e, "speed")): options.add(f"belt speed {s}")
            if (md := field(e, "mode")): options.add(f"belt:{md}")
        if et == "button":
            if (d := num(e, "duration")): options.add(f"button dur {d}")
            if (md := field(e, "mode")): options.add(f"button:{md}")
        if et == "elevator":
            if (s := num(e, "speed")): options.add(f"elevator speed {s}")
            if (md := field(e, "mode")): options.add(f"elevator:{md}")
        if et == "fan" and (s := num(e, "strength")):
            options.add(f"fan {s}")
        if et == "pool" and (d := num(e, "duration")):
            options.add(f"pool dur {d}")
        if et == "seesaw" and (r := num(e, "range")):
            options.add(f"seesaw range {r}")
        if et == "turbine" and (d := num(e, "duration")):
            options.add(f"turbine dur {d}")

    par = num(obj, "parTicks")
    rec = {
        "order": int(num(obj, "order") or 0),
        "id": lid,
        "name": field(obj, "name"),
        "dark": "dark:!0" in obj,
        "supports": supports,
        "parTicks": int(float(par)) if par else None,
        "description": field(obj, "description"),
        "hints": list(ticks(array(obj, "hints") or "[]", "hints")),
        "palette": palette,
        "entities": counts,
        "options": sorted(options),
        "_tiles_sha": hashlib.sha256("\n".join(tiles).encode()).hexdigest()[:16],
    }
    levels.append(rec)

# which of these are levels of ours that the game has since shipped?
mine = {}
for lv in sorted(levels_dir.glob("*/level.json")):
    d = json.loads(lv.read_text())
    mine[hashlib.sha256("\n".join(d["tiles"]).encode()).hexdigest()[:16]] = lv.parent.name
for rec in levels:
    if (own := mine.get(rec.pop("_tiles_sha"))):
        rec["ours"] = own

levels.sort(key=lambda r: r["order"])
out_path.write_text(json.dumps(levels, indent=1) + "\n")
ours = [r for r in levels if "ours" in r]
print(f"{len(levels)} campaign levels; {len(ours)} of them are ours:")
for r in ours:
    print(f"  {r['id']:24} = levels/{r['ours']}")
