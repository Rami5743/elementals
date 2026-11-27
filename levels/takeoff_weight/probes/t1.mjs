import { solve } from './solve.mjs';
const cfg = JSON.parse(process.argv[2] ?? 'null') ?? { pockets: ['C8', 'L8', 'C0', 'L0'], start: { F: 'C8', W: 'C8', E: 'C8', A: 'L8', B: 'C8' }, ret: 'L8' };
const r = solve(cfg);
console.log(r ? r.length + '\n' + r.join('\n') : 'no solution');
