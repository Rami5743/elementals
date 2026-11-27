// Abstract model: a seesaw with pans C (left) and L (right), each at height 0/4/8 above ground.
// Pockets beside each pan at some heights. Air glides from L at 8 carrying one rider to FAR.
// Air returns from FAR via a fan to pocket RET. Boulder (3) only Earth pushes.
const M = { F: 1, W: 1, E: 2, A: 1, B: 3, K: 1, J: 1 };
export function solve(cfg) {
  const { pockets, start, ret, verbose } = cfg; // pockets: ['C0','C8','L0','L4'...], start: {F:'C0',...,B:'C0'}
  const names = ['F', 'W', 'E', 'A', 'B', ...(cfg.crates ?? []).map((_, i) => 'KJ'[i])];
  const pos = (loc) => loc; // 'C0' pocket, 'pC' / 'pL' pan, 'FAR'
  const pans = (st) => {
    let c = 0, l = 0;
    names.forEach((n, i) => { if (st[i] === 'pC') c += M[n]; if (st[i] === 'pL') l += M[n]; });
    const d = Math.sign(c - l); // +1 C down
    return { C: d > 0 ? 0 : d === 0 ? 4 : 8, L: d > 0 ? 8 : d === 0 ? 4 : 0 };
  };
  const key = (st) => st.join(',');
  const s0 = names.map((n, i) => i < 5 ? start[n] : cfg.crates[i - 5]);
  const seen = new Map([[key(s0), null]]);
  let q = [s0];
  const isGoal = (st) => st.slice(0, 4).every((x) => x === 'FAR');
  while (q.length) {
    const nq = [];
    for (const st of q) {
      if (isGoal(st)) {
        const path = []; let k = key(st);
        while (k) { const e = seen.get(k); if (!e) break; path.push(e.m); k = e.prev; }
        return path.reverse();
      }
      const h = pans(st);
      const moves = [];
      const push = (i, to, m) => { const n = st.slice(); n[i] = to; moves.push([n, m]); };
      for (let i = 0; i < 4; i++) {
        const loc = st[i]; const n = names[i];
        if (loc === 'FAR') { if (n === 'A' && ret) push(i, ret, 'A returns to ' + ret); continue; }
        if (n === 'A' && cfg.fan && loc === cfg.fan[0]) {
          push(i, cfg.fan[1], 'A rides the draught up');
          for (const j of [0, 1]) if (st[j] === loc) { const x = st.slice(); x[i] = cfg.fan[1]; x[j] = cfg.fan[1]; moves.push([x, `A carries ${names[j]} up the draught`]); }
        }
        if (loc[0] === 'C' || loc[0] === 'L') { // pocket
          const side = loc[0], ph = +loc.slice(1), panh = h[side];
          if (panh === ph) push(i, 'p' + side, `${n} steps on ${side} at ${ph}`);
          else if (panh < ph) push(i, 'p' + side, `${n} drops onto ${side}`);
        } else { // on pan
          const side = loc[1], other = side === 'C' ? 'L' : 'C', ph = h[side];
          if (pockets.includes(side + ph)) push(i, side + ph, `${n} steps off ${side} at ${ph}`);
          if (h[other] === ph) push(i, 'p' + other, `${n} walks ${side}->${other}`);
          if (h[other] < ph) push(i, 'p' + other, `${n} drops ${side}->${other}`);
          // glide
          if (n === 'A' && side === 'L' && ph === 8) {
            push(i, 'FAR', 'A glides alone');
            for (let j = 0; j < 3; j++) if (st[j] === 'pL') { const x = st.slice(); x[i] = 'FAR'; x[j] = 'FAR'; moves.push([x, `A glides with ${names[j]}`]); }
          }
        }
      }
      for (let oi = 4; oi < names.length; oi++) for (let pi = 0; pi < 4; pi++) {
      if (oi === 4 && pi !== 2) continue;
      const b = st[oi], e = st[pi];
      if (e !== 'FAR' && b !== 'FAR') {
        const surf = (loc) => loc[0] === 'p' ? [loc[1], h[loc[1]], 'pan'] : [loc[0], +loc.slice(1), 'pocket'];
        if (b === e) { // together on a surface: earth may push it to adjacent surface at same height or drop it
          const [side, ht, kind] = surf(b);
          const W = names[pi] + ' pushes ' + names[oi];
          if (kind === 'pocket' && h[side] === ht) push(oi, 'p' + side, W + ' onto ' + side);
          if (kind === 'pocket' && h[side] < ht) push(oi, 'p' + side, W + ' down onto ' + side);
          if (kind === 'pan') {
            const other = side === 'C' ? 'L' : 'C';
            if (pockets.includes(side + ht)) push(oi, side + ht, `${W} off ${side} at ${ht}`);
            if (h[other] === ht) push(oi, 'p' + other, `${W} ${side}->${other}`);
            if (h[other] < ht) push(oi, 'p' + other, `${W} down ${side}->${other}`);
          }
        }
      }
      }
      for (const [n, m] of moves) {
        const k = key(n);
        if (!seen.has(k)) { seen.set(k, { prev: key(st), m }); nq.push(n); }
      }
    }
    q = nq;
  }
  return null;
}
