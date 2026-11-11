# Building the thing

## Shape the map with a script, not by hand

Write a generator in the scratchpad (not in the repo) that builds the 22 rows from string segments
and asserts every row is exactly 40 characters, then writes `levels/<id>/level.json`. Editing 22
40-character strings by hand produces off-by-one walls that take longer to find than the generator
takes to write.

```js
const R = (s) => { if (s.length !== 40) throw new Error(`row len ${s.length}: ${s}`); return s; };
const rock = '#'.repeat(40);
const t = [];
for (let y = 0; y <= 12; y++) t.push(rock);
t.push(R('#' + '.'.repeat(33) + '#'.repeat(6)));     // 13: the hall
...
if (t.length !== 22) throw new Error('rows ' + t.length);
```

Keep the generator for the whole session: every fix is a two-line edit and a re-run, and the level
stays reproducible.

## Layouts that work

- **A hall with barriers in series.** Floor row, three tiles of headroom, barriers that reach the
  ceiling. Simple, and the shape this repo has used too often — use it as the frame around a new
  core, never as the core.
- **A vault below.** Cracked floor in the hall roof of a chamber; everybody drops in at the end and
  each lands in its own column. Exits at `y = floorRow - 2`.
- **A loft above.** Reached by a lift, an updraft or a one-tile shaft, sealed from the hall by rock.
- **A pit between two banks.** Sludge is lethal to everyone, so it stops every element equally.
- **A one-tile roof** over a stretch where jumping must be impossible.

Three tiles of headroom is the normal hall: it allows a hop over a partner. Two tiles is cramped and
makes passing marginal; one tile forbids jumping entirely.

## Traffic

Players are solid. Before writing a single script, decide the order in which everyone moves and give
each a distinct resting tile. The reliable arrangement is:

- The player who must go **furthest along the corridor goes first**, and each one after it stops
  short of the previous one.
- Where two must swap, give the corridor three tiles of headroom and use a hopping walk.
- At the end, assign each exit so that the player arriving **last** has the **nearest** door.

## Solution scripts

- Export `solutions = { level: '<id>', sets: [{ elements: [...], scripts: {...} }], roles: {...} }`.
- Sequence with `c.flag(name)` and `waitFlag`; never rely on two players' timings lining up.
- `go(c, x)` walks to a tile centre and stops; `until(c, pred, bits, max, what)` is the workhorse
  for waiting on a door, a lift or a partner; `pound(c)` after about 14 ticks of held jump.
- A local hopping walk is worth writing once per level:

```js
function* bound(c, x, hold = 14, max = 900) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}
```

- Push an object by walking into it and **guarding on your own position**, not the object's:
  `until(c, () => c.tx >= 18.6, IN_RIGHT, 900, '...')`. `pushTo` overshoots when the object leaves
  the floor, and a push that follows an object off a ledge drowns the pusher.

## Failures that come up every time

| Symptom | Cause |
|---|---|
| "could not bound/reach x" and the player is a tile short | a partner is standing there, or the roof is too low to hop |
| a jump does nothing | the bit was already held — release first — or the ceiling is one tile up |
| a jump on a belt lands in the wrong place | airborne, you keep only your own speed; the belt is not carrying you |
| a pound does nothing | Earth is half on the stone beside the panel, or there was no new Down press |
| a player walks into a liquid while pushing | the push guard was on the object, not on the pusher |
| "overlaps a solid/liquid tile" | an entity is sitting in rock or in a liquid; move it into open air |
| a gem is left behind | it is not in the body row of anyone who passes it: use `floorRow - 1` |
| "can jump over door X" but it is clearly sealed | the trigger is within four tiles of the door; move it away |
| a player can stand where you wanted a hole | an object parked in a notch, or a floating boulder, is a floor |

## Before `check` can pass

Every supported group needs a script, every gem must be taken, nobody may die, and the level must be
unfinishable while any one player idles in its own door. If a script finds an easier route than the
design, the design has the hole — fix the level, not the script.
