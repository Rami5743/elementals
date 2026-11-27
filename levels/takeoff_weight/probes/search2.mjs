import { solve } from './solve.mjs';
const OPT = ['C0', 'C4', 'C8', 'L0', 'L4'];
const results = [];
const ncr = +(process.argv[2] ?? 1);
for (let mask = 0; mask < 32; mask++) {
  const pockets = ['L8', ...OPT.filter((_, i) => mask & (1 << i))];
  const P = pockets;
  const Bs = [...P, 'X'];
  for (const sp of P) for (const wp of P) for (const ep of P) for (const ap of P) for (const bp of Bs) {
    const crateSets = ncr === 1 ? P.map((p) => [p]) : P.flatMap((p, i) => P.slice(i).map((q) => [p, q]));
    for (const cr of crateSets) {
      const start = { F: sp, W: wp, E: ep, A: ap, B: bp };
      const p = solve({ pockets, start, ret: 'L8', crates: cr });
      if (p) results.push({ pockets: pockets.join(' '), start: `F:${sp} W:${wp} E:${ep} A:${ap} B:${bp} K:${cr}`, n: p.length, p });
    }
  }
}
results.sort((a, b) => b.n - a.n);
for (const r of results.slice(0, 15)) console.log(r.n, r.pockets, '|', r.start);
console.log('total', results.length);
if (results[0]) console.log(results[0].p.join('\n'));
