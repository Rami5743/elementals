import { solve } from './solve.mjs';
const ALL = ['C0', 'C4', 'C8', 'L0', 'L4', 'L8'];
const results = [];
for (let mask = 1; mask < 64; mask++) {
  const pockets = ALL.filter((_, i) => mask & (1 << i));
  if (pockets.length > 6) continue;
  for (const ret of pockets) {
    for (const sp of pockets) for (const bp of pockets) for (const ep of pockets) for (const ap of pockets) {
      // fire and water start together at sp
      const start = { F: sp, W: sp, E: ep, A: ap, B: bp };
      const p = solve({ pockets, start, ret });
      if (p) results.push({ pockets: pockets.join(' '), ret, start: `FW:${sp} E:${ep} A:${ap} B:${bp}`, n: p.length, p });
    }
  }
}
results.sort((a, b) => b.n - a.n);
for (const r of results.slice(0, 12)) console.log(r.n, r.pockets, 'ret', r.ret, r.start);
if (results[0]) console.log(results[0].p.join('\n')); console.log('total', results.length);
