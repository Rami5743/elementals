// Build the GitHub Pages index: check and pack every level, collect its play link,
// and write index.html. Run: node tools/build.mjs [--fast]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const LEVELS = path.join(ROOT, 'levels');
const fast = process.argv.includes('--fast');

const ELEMENT_ICON = { fire: '🔥', water: '💧', earth: '🪨', air: '🌬️' };
const CHALLENGE = {
  mind: { label: 'Puzzle', note: 'Thinking, not reflexes: the moves are comfortable.' },
  motor: { label: 'Puzzle + hands', note: 'Solving it is half of it; a window or a jump has to be hit.' },
};

const ids = fs.readdirSync(LEVELS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
  .map((d) => d.name);

const levels = [];
for (const id of ids) {
  const dir = path.join(LEVELS, id);
  const level = JSON.parse(fs.readFileSync(path.join(dir, 'level.json'), 'utf8'));
  const metaPath = path.join(dir, 'meta.json');
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : {};
  if (!fast) {
    execFileSync('node', ['kit.mjs', 'pack', id], { cwd: ROOT, stdio: 'pipe' });
    execFileSync('node', ['kit.mjs', 'play', id, '--no-open'], { cwd: ROOT, stdio: 'pipe' });
  }
  const linkFile = path.join(dir, 'play-link.txt');
  if (!fs.existsSync(linkFile)) throw new Error(`${id}: no play-link.txt (run without --fast)`);
  levels.push({ ...level, meta, link: fs.readFileSync(linkFile, 'utf8').trim() });
}

levels.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0) || a.id.localeCompare(b.id));

// ---- thumbnails -----------------------------------------------------------
// One SVG map per level, drawn straight from its tiles and entities. Runs of
// identical tiles are merged into single rects to keep the files small.

const TILE_FILL = {
  '#': '#403a30', '/': '#403a30', '\\': '#403a30',
  '=': '#6d6353',
  L: '#d0492b', W: '#2f80d2', M: '#7b5c37', V: '#7b5cd2', S: '#6e8e2b',
};
const SOLID_FILL = {
  door: '#8b8069', ice: '#a8dcf0', firewall: '#e87a30', cracked: '#59513f',
  box: '#b48d52', boulder: '#726d64', elevator: '#8b8069', belt: '#4b4b4b',
  seesaw: '#8b8069',
};
const ELEMENT_FILL = { fire: '#f26540', water: '#3fa3f0', earth: '#a97c45', air: '#b4dced', neutral: '#e8dfb8' };
const AIR_FILL = '#17150f';

/** The first row worth drawing: everything above it is solid rock. */
function thumbTop(level) {
  let top = 0;
  while (top < 20 && [...level.tiles[top]].every((ch) => ch === '#')) top++;
  return Math.max(0, top - 1);                       // keep one row of ceiling
}

function thumbSvg(level, top) {
  const h = 22 - top;
  const out = [`<rect x="0" y="${top}" width="40" height="${h}" fill="${AIR_FILL}"/>`];
  level.tiles.forEach((row, y) => {
    let x = 0;
    while (x < 40) {
      const ch = row[x] ?? '.';
      const fill = TILE_FILL[ch];
      if (!fill) { x++; continue; }
      let w = 1;
      while (x + w < 40 && (row[x + w] ?? '.') === ch) w++;
      const h = ch === '=' ? 0.28 : 1;
      out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`);
      x += w;
    }
  });
  for (const e of level.entities ?? []) {
    const w = e.w ?? 1, h = e.h ?? 1;
    const [px, py] = e.type === 'elevator' && e.path?.length ? e.path[0] : [e.x, e.y];
    if (SOLID_FILL[e.type]) {
      const th = e.type === 'elevator' ? 0.5 : e.type === 'seesaw' ? 0.4 : h;
      out.push(`<rect x="${px}" y="${py}" width="${w}" height="${th}" fill="${SOLID_FILL[e.type]}"/>`);
    } else if (e.type === 'plate' || e.type === 'freezepad') {
      const fill = e.type === 'freezepad' ? '#a8dcf0' : '#9a8f78';
      out.push(`<rect x="${px}" y="${py + 0.7}" width="${w}" height="0.3" fill="${fill}"/>`);
    } else if (e.type === 'fan') {
      out.push(`<rect x="${px}" y="${py}" width="${w}" height="${h}" fill="#c9d8e8" opacity="0.14"/>`);
    } else if (e.type === 'pool') {
      // the water tiles already show; nothing to add
    } else if (e.type === 'exit') {
      const fill = ELEMENT_FILL[e.element] ?? '#ccc';
      out.push(`<rect x="${px + 0.1}" y="${py}" width="0.8" height="2" fill="${fill}" opacity="0.55"/>`);
    } else if (e.type === 'gem') {
      const fill = ELEMENT_FILL[e.element] ?? ELEMENT_FILL.neutral;
      out.push(`<circle cx="${px + 0.5}" cy="${py + 0.5}" r="0.24" fill="${fill}"/>`);
    } else if (e.type === 'torch' || e.type === 'lever' || e.type === 'button' || e.type === 'turbine') {
      out.push(`<rect x="${px + 0.25}" y="${py + 0.25}" width="0.5" height="0.5" fill="#d9c98a"/>`);
    }
  }
  for (const [el, pos] of Object.entries(level.spawns ?? {})) {
    if (!level.supports[0].includes(el)) continue;
    out.push(`<circle cx="${pos[0] + 0.5}" cy="${pos[1] + 0.55}" r="0.38" fill="${ELEMENT_FILL[el]}"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${top} 40 ${h}" shape-rendering="crispEdges">\n${out.join('\n')}\n</svg>\n`;
}

const THUMBS = path.join(ROOT, 'thumbs');
fs.mkdirSync(THUMBS, { recursive: true });
for (const l of levels) {
  l.thumbTop = thumbTop(l);
  fs.writeFileSync(path.join(THUMBS, `${l.id}.svg`), thumbSvg(l, l.thumbTop));
}


const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const seconds = (t) => `${Math.round((t ?? 3600) / 60)} s`;
const sizeOf = (l) => l.supports[0].length;

function card(l) {
  const group = l.supports[0];
  const ch = CHALLENGE[l.meta.challenge === 'motor' ? 'motor' : 'mind'];
  return `      <article class="level">
        <header>
          <h3>${esc(l.name)}</h3>
          <p class="who">${group.map((e) => `<span class="el ${e}" title="${e}">${ELEMENT_ICON[e]}</span>`).join('')}</p>
        </header>
        <img class="map" src="thumbs/${esc(l.id)}.svg" alt="Map of ${esc(l.name)}" width="40" height="${22 - l.thumbTop}" loading="lazy" decoding="async">
        <p class="tags"><span class="tag ${l.meta.challenge === 'motor' ? 'motor' : 'mind'}" title="${esc(ch.note)}">${ch.label}</span><span class="tag par">par ${seconds(l.parTicks)}</span></p>
        <p class="links"><a class="play" href="${esc(l.link)}" target="_blank" rel="noopener">Play</a><a class="file" href="packed/${esc(l.id)}.elementals.json" download>level file</a></p>
      </article>`;
}

function section(n) {
  const group = levels.filter((l) => sizeOf(l) === n);
  if (!group.length) return '';
  return `    <section>
      <h2>${n} players <span class="count">${group.length}</span></h2>
      <div class="grid">
${group.map(card).join('\n')}
      </div>
    </section>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Elementals Levels</title>
<meta name="description" content="Fan-made co-op levels for Elementals: open a link and the level is in your My Levels.">
<style>
:root {
  --bg: #f6f4ef; --card: #fffdf8; --ink: #22201c; --muted: #6d675d;
  --line: #e2ddd2; --accent: #c2410c; --accent-ink: #fff;
  --mind: #1d5c54; --mind-bg: #d8ece8; --motor: #8a3d12; --motor-bg: #fbe3d2;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #15140f; --card: #1f1d18; --ink: #ece7dc; --muted: #9c948a;
    --line: #322e27; --accent: #f97316; --accent-ink: #1a1008;
    --mind: #8fd6ca; --mind-bg: #16302c; --motor: #f0ab7a; --motor-bg: #35211400;
  }
}
:root[data-theme="dark"] {
  --bg: #15140f; --card: #1f1d18; --ink: #ece7dc; --muted: #9c948a;
  --line: #322e27; --accent: #f97316; --accent-ink: #1a1008;
  --mind: #8fd6ca; --mind-bg: #16302c; --motor: #f0ab7a; --motor-bg: #352114;
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--ink);
  font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
.wrap { max-width: 1040px; margin: 0 auto; padding: 48px 16px 80px; }
header.top { border-bottom: 1px solid var(--line); padding-bottom: 28px; margin-bottom: 36px; }
h1 { font-size: clamp(28px, 5vw, 40px); margin: 0 0 10px; letter-spacing: -0.02em; }
.lede { color: var(--muted); max-width: 62ch; margin: 0 0 18px; }
.how { max-width: 62ch; margin: 0; padding-left: 20px; color: var(--muted); font-size: 15px; }
.how li { margin: 4px 0; }
h2 { font-size: 20px; margin: 44px 0 16px; display: flex; align-items: baseline; gap: 10px; }
.count { font-size: 13px; font-weight: 500; color: var(--muted); border: 1px solid var(--line); border-radius: 999px; padding: 1px 9px; }
.grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
.level { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.level header { display: flex; justify-content: space-between; align-items: start; gap: 8px; }
h3 { font-size: 17px; margin: 0; letter-spacing: -0.01em; }
.who { margin: 0; font-size: 15px; white-space: nowrap; letter-spacing: 1px; }
.map { display: block; width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--line); background: #17150f; }
.tags { margin: 0; display: flex; gap: 6px; flex-wrap: wrap; }
.tag { font-size: 12px; border-radius: 999px; padding: 2px 9px; border: 1px solid transparent; }
.tag.mind { color: var(--mind); background: var(--mind-bg); }
.tag.motor { color: var(--motor); background: var(--motor-bg); }
.tag.par { color: var(--muted); border-color: var(--line); }
.links { margin: 0; display: flex; gap: 10px; align-items: center; }
a.play {
  background: var(--accent); color: var(--accent-ink); text-decoration: none;
  font-weight: 600; font-size: 14px; padding: 7px 16px; border-radius: 999px;
}
a.play:hover { filter: brightness(1.08); }
a.file { color: var(--muted); font-size: 13px; text-decoration: none; border-bottom: 1px solid var(--line); }
a.file:hover { color: var(--ink); }
footer { margin-top: 56px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--muted); font-size: 14px; }
footer a { color: inherit; }
</style>
</head>
<body>
<div class="wrap">
  <header class="top">
    <h1>Elementals Levels</h1>
    <p class="lede">Co-op puzzle levels for <strong>Elementals</strong>, made with the Level Kit. Every level has been run against the game's own simulation: it is solvable, every gem is reachable within par, and no player is a passenger.</p>
    <ol class="how">
      <li>Open a level's <strong>Play</strong> link. The game loads with the level added to <em>My Levels</em> in that browser.</li>
      <li>Pick the group of elements the level is made for, and have each player press Interact on their controls.</li>
      <li>Links accumulate: open several and they all stay in <em>My Levels</em>.</li>
    </ol>
  </header>
${[2, 3, 4].map(section).filter(Boolean).join('\n')}
  <footer>
    <p><span class="tag mind">Puzzle</span> is solved by thinking; the moves are comfortable.
       <span class="tag motor">Puzzle + hands</span> also asks you to hit a window or a jump.</p>
    <p>Built with the Elementals Level Kit. Sources, design notes and solution scripts are in this repository.</p>
  </footer>
</div>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log(`index.html: ${levels.length} level(s), ${[2, 3, 4].map((n) => `${levels.filter((l) => sizeOf(l) === n).length}×${n}p`).join(' ')}`);
