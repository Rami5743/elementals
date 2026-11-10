// Shared helpers for the solution scripts in this folder.
// They are ordinary generators: every yield is one tick of input bits.
import { IN_DOWN, IN_INTERACT, IN_JUMP, IN_LEFT, IN_RIGHT, PHYSIQUE, TILE } from '../kit.mjs';
import { go, jump, until, wait } from '../kit.mjs';

/** Jump straight up, e.g. for a gem two tiles overhead. */
export function* hop(c, hold = 30) {
  yield* jump(c, 0, { hold });
}

/** Press `bits` until the ice / fire wall / cracked floor `id` is gone. */
export function* clear(c, id, bits = IN_RIGHT, max = 600) {
  yield* until(c, () => c.ent(id).s.gone === 1, bits, max, `${id} to clear`);
}

/** Stand still until the door `id` has opened at least `px` pixels. */
export function* waitDoor(c, id, px = 64, max = 3000) {
  yield* until(c, () => c.ent(id).s.open >= px, 0, max, `${id} to open`);
}

/** Stand still until the entity `id` stops moving (a lift that has arrived, say). */
export function* waitStill(c, id, still = 10, max = 3000) {
  let last = null, n = 0, t = 0;
  while (n < still) {
    yield 0;
    const s = c.ent(id).s;
    const at = `${s.x},${s.y}`;
    n = at === last ? n + 1 : 0;
    last = at;
    if (++t > max) throw new Error(`${id} never settled`);
  }
}

/** Climb onto a partner's head. The partner has to be standing still. */
export function* climbAboard(c, partner) {
  for (let t = 0; t < 4 || !c.me.grounded; t++) {
    const p = c.player(partner);
    const d = p.x + PHYSIQUE[partner].w / 2 - c.cx;
    yield (t < 16 ? IN_JUMP : 0) | (Math.abs(d) < 2 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT);
    if (t > 240) throw new Error(`${c.me.element} never came down onto ${partner}`);
  }
  const p = c.player(partner);
  if (c.bottom !== p.y) {
    throw new Error(`${c.me.element} is not on ${partner} (bottom=${c.bottom}, ${partner} top=${p.y})`);
  }
}

/** Push a crate or boulder with `bits` until it stops moving for `still` ticks. */
export function* pushUntilStuck(c, id, bits = IN_RIGHT, still = 20, max = 3000) {
  let last = null, n = 0, t = 0;
  while (n < still) {
    yield bits;
    const x = c.ent(id).s.x;
    n = x === last ? n + 1 : 0;
    last = x;
    if (++t > max) throw new Error(`${id} never stopped moving`);
  }
}

/** Push a crate or boulder until its left edge passes tile `tx` (direction from the sign). */
export function* pushTo(c, id, tx, dir = 1, max = 3000) {
  const bits = dir > 0 ? IN_RIGHT : IN_LEFT;
  const goal = tx * TILE;
  yield* until(c, () => (dir > 0 ? c.ent(id).s.x >= goal : c.ent(id).s.x <= goal), bits, max, `${id} at ${tx}`);
}

/** Earth: jump and ground pound, to break the cracked floor underneath. */
export function* poundHere(c, rise = 14) {
  for (let t = 0; t < rise; t++) yield IN_JUMP;
  for (let t = 0; t < 120; t++) {
    yield IN_DOWN;
    if (c.me.grounded) return;
  }
  throw new Error(`${c.me.element} never landed after the pound`);
}

/** Hold Interact for `n` ticks (a "hold" button). */
export function* holdInteract(c, n) {
  for (let t = 0; t < n; t++) yield IN_INTERACT;
}

/** Glide (Air): hold Jump while falling, steering toward tile `x`. */
export function* glideTo(c, x, max = 600) {
  for (let t = 0; t < max; t++) {
    const d = x * TILE + TILE / 2 - c.cx;
    yield IN_JUMP | (Math.abs(d) < 3 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT);
    if (c.me.grounded && t > 2) return;
  }
  throw new Error(`${c.me.element} never landed gliding to ${x}`);
}

export { go, jump, until, wait, PHYSIQUE, IN_DOWN, IN_INTERACT, IN_JUMP, IN_LEFT, IN_RIGHT, TILE };

/** Climb onto a narrower partner (Air): brakes as it closes, so it lands on top rather than past. */
export function* climbOnto(c, partner) {
  for (let t = 0; t < 4 || !c.me.grounded; t++) {
    const p = c.player(partner);
    const want = p.x + PHYSIQUE[partner].w / 2 - c.cx - c.me.vx * 6;
    yield (t < 16 ? IN_JUMP : 0) | (Math.abs(want) < 3 ? 0 : want > 0 ? IN_RIGHT : IN_LEFT);
    if (t > 240) throw new Error(`${c.me.element} never came down onto ${partner}`);
  }
  const p = c.player(partner);
  if (c.bottom !== p.y) {
    throw new Error(`${c.me.element} is not on ${partner} (bottom=${c.bottom}, ${partner} top=${p.y})`);
  }
}
