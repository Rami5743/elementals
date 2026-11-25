import fs from "node:fs";
// Writes icon.svg: a real regular dodecahedron, projected: 20 vertices, 12 faces found from the face-centre
// directions, rotated to a three-quarter view, back faces dropped, each face shaded by its normal.
const P = (1 + Math.sqrt(5)) / 2, I = 1 / P;
const V = [];
for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) V.push([sx, sy, sz]);
for (const a of [I, -I]) for (const b of [P, -P]) V.push([0, a, b], [a, b, 0], [b, 0, a]);

// the 12 face centres: (0, ±1, ±P) and cyclic
const C = [];
for (const s of [1, -1]) for (const t of [P, -P]) C.push([0, t, s], [t, s, 0], [s, 0, t]);

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (v) => { const m = Math.hypot(...v); return v.map((x) => x / m); };
const faces = C.map((c) => {
  const n = norm(c);
  const best = Math.max(...V.map((v) => dot(v, n)));
  return { n, vs: V.filter((v) => Math.abs(dot(v, n) - best) < 1e-6) };
});
if (faces.some((f) => f.vs.length !== 5)) throw new Error('not all faces are pentagons: ' + faces.map(f => f.vs.length));

const rotX = (v, a) => [v[0], v[1] * Math.cos(a) - v[2] * Math.sin(a), v[1] * Math.sin(a) + v[2] * Math.cos(a)];
const rotY = (v, a) => [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];
const view = (v) => rotX(rotY(v, 0.55), -0.30);

const R = 44, CX = 50, CY = 50;
const proj = (v) => { const w = view(v); return [CX + w[0] * R / P, CY - w[1] * R / P, w[2]]; };

const polys = [];
for (const f of faces) {
  const n = view(f.n);
  if (n[2] <= 0.02) continue;                                  // facing away
  const pts = f.vs.map(proj);
  const cx = pts.reduce((s, p) => s + p[0], 0) / 5, cy = pts.reduce((s, p) => s + p[1], 0) / 5;
  pts.sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx));
  polys.push({ d: pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' '), lit: n[2], z: pts.reduce((s, p) => s + p[2], 0) / 5 });
}
polys.sort((a, b) => a.z - b.z);
const shade = (lit) => (0.38 + 0.62 * Math.min(1, lit)).toFixed(3);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Dodecahedron">
  <title>Elementals levels</title>
  <style>
    :root { color-scheme: light dark }
    .face { stroke: var(--edge, #7c2d06); stroke-width: 2.1; stroke-linejoin: round; fill: var(--fill, #c2410c) }
    @media (prefers-color-scheme: dark) { svg { --fill: #f97316; --edge: #1a1008 } }
  </style>
${polys.map((p) => `  <polygon class="face" points="${p.d}" fill-opacity="${shade(p.lit)}"/>`).join('\n')}
</svg>\n`;
fs.writeFileSync(new URL("../icon.svg", import.meta.url), svg);
console.error(`icon.svg: ${polys.length} visible faces`);
