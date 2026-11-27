import { solve } from './solve.mjs';
const results = [];
const base = ['L8', 'C8', 'C0', 'L0'];
const extras = [[], ['C4'], ['L4'], ['C4', 'L4']];
const fans = [['C0', 'C8'], ['L0', 'C8'], ['C0', 'L8'], null];
for (const ex of extras) for (const fan of fans) {
  const P = [...base, ...ex];
  const Bs = [...P, 'X'];
  for (const sp of P) for (const wp of P) for (const ep of P) for (const ap of P) for (const bp of Bs) for (const kp of [...P, null]) {
    const crates = kp ? [kp] : [];
    const p = solve({ pockets: P, start: { F: sp, W: wp, E: ep, A: ap, B: bp }, ret: 'L8', crates, fan });
    if (p) results.push({ cfg: `${P.join(' ')} fan:${fan} | F:${sp} W:${wp} E:${ep} A:${ap} B:${bp} K:${kp}`, n: p.length, p });
  }
}
results.sort((a, b) => b.n - a.n);
for (const r of results.slice(0, 20)) console.log(r.n, r.cfg);
console.log('total', results.length);
if (results[0]) console.log(results[0].p.join('\n'));
