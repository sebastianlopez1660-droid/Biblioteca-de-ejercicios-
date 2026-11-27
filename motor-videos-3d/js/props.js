// Implementos: kettlebell, barra olímpica, cajón, máquina Smith, máquina hack.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const M = {
  iron: () => new THREE.MeshStandardMaterial({ color: 0x2a2c2f, metalness: 0.55, roughness: 0.42 }),
  steel: () => new THREE.MeshStandardMaterial({ color: 0xc9ccd0, metalness: 0.95, roughness: 0.26 }),
  steelDark: () => new THREE.MeshStandardMaterial({ color: 0x9aa0a6, metalness: 0.9, roughness: 0.35 }),
  rubber: () => new THREE.MeshStandardMaterial({ color: 0x1e2023, metalness: 0.0, roughness: 0.78 }),
  rubberRim: () => new THREE.MeshStandardMaterial({ color: 0x34383d, metalness: 0.0, roughness: 0.7 }),
  frame: () => new THREE.MeshStandardMaterial({ color: 0x2a2d31, metalness: 0.45, roughness: 0.48 }),
  pad: () => new THREE.MeshStandardMaterial({ color: 0x1b1c1e, metalness: 0.0, roughness: 0.62 }),
  wood: () => new THREE.MeshStandardMaterial({ color: 0x5f4b39, metalness: 0.0, roughness: 0.82 }),
  woodEdge: () => new THREE.MeshStandardMaterial({ color: 0x5c4936, metalness: 0.0, roughness: 0.85 }),
};

function shadowAll(obj) { obj.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return obj; }

function cylX(r, len, mat, seg = 28) {
  const g = new THREE.CylinderGeometry(r, r, len, seg, 1);
  g.rotateZ(Math.PI / 2);
  return new THREE.Mesh(g, mat);
}

// Kettlebell: origen en el centro del agarre (mitad de los cuernos)
export function kettlebell() {
  const g = new THREE.Group();
  const iron = M.iron();
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.098, 40, 28), iron);
  bell.position.set(0, -0.125, 0); bell.scale.set(1, 0.96, 1);
  g.add(bell);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.01, 32), iron);
  base.position.set(0, -0.214, 0); g.add(base);
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.066, 0.0155, 14, 36, Math.PI), iron);
  g.add(arc);
  for (const s of [1, -1]) {
    const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.0155, 0.017, 0.06, 16), iron);
    horn.position.set(s * 0.066, -0.028, 0); g.add(horn);
  }
  g.userData.grips = { L: new THREE.Vector3(0.066, -0.02, 0), R: new THREE.Vector3(-0.066, -0.02, 0) };
  return shadowAll(g);
}

// Barra olímpica a lo largo del eje X con discos de 20 kg
export function barbell(opts = {}) {
  const g = new THREE.Group();
  const steel = M.steel(), steelS = M.steel(), dark = M.steelDark(), rub = M.rubber(), rim = M.rubberRim();
  const half = opts.half ?? 1.10;
  g.add(cylX(0.0145, 1.31, steel));
  for (const s of [1, -1]) {
    const col = cylX(0.027, 0.03, dark); col.position.x = s * 0.67; g.add(col);
    const slv = cylX(0.025, half - 0.685, steelS); slv.position.x = s * (0.685 + (half - 0.685) / 2); g.add(slv);
    const nPlates = opts.plates ?? 1;
    let x = 0.69;
    for (let i = 0; i < nPlates; i++) {
      const th = 0.062;
      const p = cylX(0.225, th, rub, 56); p.position.x = s * (x + th / 2); g.add(p);
      const r2 = cylX(0.229, th * 0.55, rim, 56); r2.position.x = s * (x + th / 2); g.add(r2);
      const hub = cylX(0.034, th + 0.004, dark, 24); hub.position.x = s * (x + th / 2); g.add(hub);
      x += th + 0.002;
    }
    const clamp = cylX(0.034, 0.022, dark, 24); clamp.position.x = s * (x + 0.012); g.add(clamp);
  }
  return shadowAll(g);
}

// Cajón pliométrico: origen en el centro de la base
export function plyoBox(w = 0.60, h = 0.42, d = 0.50) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, 0.018), M.wood());
  body.position.y = h / 2; g.add(body);
  const edge = new THREE.Mesh(new RoundedBoxGeometry(w * 0.86, 0.006, d * 0.86, 1, 0.003), M.woodEdge());
  edge.position.y = h + 0.0005; g.add(edge);
  return shadowAll(g);
}

// Máquina Smith: guías verticales en z = 0 (línea de la barra); bastidor detrás del usuario
export function smithMachine() {
  const g = new THREE.Group();
  const fr = M.frame(), steel = M.steel();
  const box = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, 0.01), fr); m.position.set(x, y, z); g.add(m); return m; };
  const ZB = -0.46;
  for (const x of [1.10, -1.10]) {
    box(0.08, 2.24, 0.08, x, 1.12, ZB);            // postes traseros
    box(0.08, 0.08, 0.60, x, 2.20, ZB + 0.30);     // vigas superiores hacia la guía
    box(0.10, 0.06, 1.05, x, 0.03, ZB + 0.44);     // rieles del suelo
  }
  box(2.28, 0.08, 0.08, 0, 2.20, ZB);              // travesaño superior trasero
  box(2.28, 0.06, 0.08, 0, 0.03, ZB);              // travesaño inferior trasero
  for (const x of [0.86, -0.86]) {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 2.10, 20), steel); rod.position.set(x, 1.11, 0); g.add(rod);
    box(0.30, 0.06, 0.08, x > 0 ? 0.98 : -0.98, 2.15, 0);  // soporte superior de la guía
    box(0.30, 0.06, 0.08, x > 0 ? 0.98 : -0.98, 0.07, 0);  // soporte inferior de la guía
    box(0.06, 0.05, 0.06, x, 0.60, 0);                       // topes de seguridad
  }
  for (const x of [1.10, -1.10]) box(0.08, 0.08, 0.10, x, 2.15, -0.02);
  for (const x of [1.10, -1.10]) box(0.08, 0.08, 0.10, x, 0.07, -0.02);
  shadowAll(g);
  // barra móvil con carros
  const bar = new THREE.Group();
  bar.add(cylX(0.0145, 1.72, steel));
  const frB = M.frame(), steelS = M.steel();
  for (const s of [1, -1]) {
    const car = new THREE.Mesh(new RoundedBoxGeometry(0.075, 0.13, 0.075, 2, 0.012), frB); car.position.x = s * 0.86; bar.add(car);
    const hook = new THREE.Mesh(new RoundedBoxGeometry(0.02, 0.07, 0.05, 1, 0.006), frB); hook.position.set(s * 0.86, -0.02, 0.06); bar.add(hook);
    const slv = cylX(0.025, 0.2, steelS); slv.position.x = s * 0.99; bar.add(slv);
    const p = cylX(0.225, 0.06, M.rubber(), 56); p.position.x = s * 0.95; bar.add(p);
    const hub = cylX(0.034, 0.064, M.steelDark(), 24); hub.position.x = s * 0.95; bar.add(hub);
  }
  shadowAll(bar);
  g.userData.bar = bar;
  return g;
}

// Máquina hack. El carro tiene origen en la superficie de la espalda (marco del tronco):
// su eje Y local sube por el riel y su eje Z local apunta hacia delante, saliendo del respaldo.
export const HACK_SLED = {
  handle: { L: new THREE.Vector3(0.215, 0.215, 0.125), R: new THREE.Vector3(-0.215, 0.215, 0.125) },
  railX: 0.29, railZ: -0.17,
};
export function hackMachine(cfg) {
  const { up, railPoint, plateCenter, plateTilt, sledQ } = cfg; // en mundo
  const g = new THREE.Group();
  const fr = M.frame(), pad = M.pad(), steel = M.steel();
  const u = up.clone().normalize();
  // rieles fijos: paralelos a 'up', pasando por railPoint ± x
  const len = 1.85;
  // punto del riel más bajo (y ≈ 0.18)
  const k = (0.18 - railPoint.y) / u.y;
  const base = railPoint.clone().add(u.clone().multiplyScalar(k));
  const top = base.clone().add(u.clone().multiplyScalar(len));
  for (const x of [HACK_SLED.railX, -HACK_SLED.railX]) {
    const r = new THREE.Mesh(new RoundedBoxGeometry(0.07, len, 0.07, 2, 0.01), fr);
    r.quaternion.copy(sledQ);
    r.position.copy(base).add(u.clone().multiplyScalar(len / 2)).add(new THREE.Vector3(x, 0, 0));
    g.add(r);
    const post = new THREE.Mesh(new RoundedBoxGeometry(0.08, top.y, 0.08, 2, 0.01), fr);
    post.position.set(x, top.y / 2, top.z - 0.02); g.add(post);
    const zA = Math.min(top.z, base.z, plateCenter.z) - 0.2, zB = Math.max(top.z, base.z, plateCenter.z) + 0.3;
    const foot = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.06, zB - zA, 2, 0.01), fr);
    foot.position.set(x, 0.03, (zA + zB) / 2); g.add(foot);
    const strut = new THREE.Mesh(new RoundedBoxGeometry(0.06, base.y, 0.06, 1, 0.01), fr);
    strut.position.set(x, base.y / 2, base.z); g.add(strut);
  }
  const cross = new THREE.Mesh(new RoundedBoxGeometry(0.66, 0.06, 0.06, 1, 0.01), fr);
  cross.position.set(0, top.y - 0.03, top.z - 0.02); g.add(cross);
  // plataforma inclinada (punta del pie más alta)
  const pq = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -plateTilt);
  const plate = new THREE.Mesh(new RoundedBoxGeometry(0.80, 0.045, 0.58, 2, 0.012), fr);
  plate.quaternion.copy(pq);
  plate.position.copy(plateCenter).add(new THREE.Vector3(0, -0.0225, 0).applyQuaternion(pq)); g.add(plate);
  const grip = new THREE.Mesh(new RoundedBoxGeometry(0.76, 0.006, 0.54, 1, 0.003), new THREE.MeshStandardMaterial({ color: 0x141516, roughness: 0.95 }));
  grip.quaternion.copy(pq); grip.position.copy(plateCenter).add(new THREE.Vector3(0, 0.001, 0).applyQuaternion(pq)); g.add(grip);
  const sup = new THREE.Mesh(new RoundedBoxGeometry(0.62, Math.max(plateCenter.y - 0.05, 0.05), 0.12, 2, 0.01), fr);
  sup.position.set(0, Math.max(plateCenter.y - 0.05, 0.05) / 2, plateCenter.z + 0.05); g.add(sup);
  const sup2 = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.06, Math.abs(plateCenter.z - base.z) + 0.1, 1, 0.01), fr);
  sup2.position.set(0, 0.03, (plateCenter.z + base.z) / 2); g.add(sup2);
  shadowAll(g);
  // carro móvil
  const sled = new THREE.Group();
  const back = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.80, 0.075, 3, 0.03), pad);
  back.position.set(0, 0.02, -0.040); sled.add(back);
  const plateS = new THREE.Mesh(new RoundedBoxGeometry(0.64, 0.92, 0.03, 2, 0.01), fr);
  plateS.position.set(0, 0.02, -0.095); sled.add(plateS);
  for (const s of [1, -1]) {
    const runner = new THREE.Mesh(new RoundedBoxGeometry(0.09, 0.30, 0.09, 1, 0.012), fr);
    runner.position.set(s * HACK_SLED.railX, -0.05, HACK_SLED.railZ); sled.add(runner);
    const sp = new THREE.Mesh(new RoundedBoxGeometry(0.095, 0.075, 0.25, 3, 0.03), pad);
    sp.position.set(s * 0.112, 0.318, 0.062); sled.add(sp);
    const arm = new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.05, 0.12, 1, 0.01), fr);
    arm.position.set(s * 0.112, 0.30, -0.06); sled.add(arm);
    const hb = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.03, 0.03, 1, 0.008), fr);
    hb.position.set(s * 0.165, 0.29, 0.125); sled.add(hb);
    const hv = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.08, 0.03, 1, 0.008), fr);
    hv.position.set(s * 0.215, 0.26, 0.125); sled.add(hv);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.13, 16), steel);
    handle.position.set(s * 0.215, 0.195, 0.125); sled.add(handle);
  }
  shadowAll(sled);
  g.userData.sled = sled;
  return g;
}

// ---------------------------------------------------------------- lote 2
export function stick(len = 1.5, alongY = false) {
  const g = new THREE.CylinderGeometry(0.0135, 0.0135, len, 20);
  if (!alongY) g.rotateZ(Math.PI / 2);
  const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0xb08a5a, roughness: 0.7 }));
  const grp = new THREE.Group(); grp.add(m); return shadowAll(grp);
}
export function wall(w = 1.9, h = 2.15) {
  const grp = new THREE.Group();
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.08, 2, 0.01), new THREE.MeshStandardMaterial({ color: 0x3b4144, roughness: 0.9 }));
  m.position.set(0, h / 2, -0.04); grp.add(m); return shadowAll(grp);
}
export function dumbbell(k = 1) {
  const g = new THREE.Group();
  const steel = M.steel(), iron = M.iron();
  g.add(cylX(0.014, 0.15, steel));
  for (const s of [1, -1]) { const h = cylX(0.046 * k, 0.055 * k, iron, 6); h.position.x = s * (0.0675 + 0.0275 * k); g.add(h); }
  return shadowAll(g);
}
export function bandSegment(color = 0x2f86c9, r = 0.011) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 12), new THREE.MeshStandardMaterial({ color, roughness: 0.6 }));
  m.castShadow = true; return m;
}
export function post(h = 1.05) {
  const g = new THREE.Group();
  const a = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, h, 20), M.frame()); a.position.y = h / 2; g.add(a);
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.04, 28), M.frame()); b.position.y = 0.02; g.add(b);
  return shadowAll(g);
}

// Barra hexagonal (trap bar): origen en el punto medio de las asas, asas a lo largo de Z en x = ±0.29
export function trapBar() {
  const g = new THREE.Group();
  const steel = M.steel(), dark = M.steelDark(), rub = M.rubber(), rim = M.rubberRim();
  const P = (x, z) => new THREE.Vector3(x, 0, z);
  const tube = (a, b, r, mat) => {
    const d = b.clone().sub(a);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 16), mat);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); g.add(m);
  };
  const hx = [P(0.53, 0), P(0.25, 0.37), P(-0.25, 0.37), P(-0.53, 0), P(-0.25, -0.37), P(0.25, -0.37)];
  for (let i = 0; i < 6; i++) tube(hx[i], hx[(i + 1) % 6], 0.017, dark);
  const zh = 0.37 * (0.53 - 0.29) / 0.28;
  for (const s of [1, -1]) {
    tube(P(s * 0.29, -zh), P(s * 0.29, zh), 0.0145, steel);
    const slv = cylX(0.025, 0.42, steel); slv.position.x = s * 0.74; g.add(slv);
    const pl = cylX(0.225, 0.062, rub, 56); pl.position.x = s * 0.66; g.add(pl);
    const r2 = cylX(0.229, 0.034, rim, 56); r2.position.x = s * 0.66; g.add(r2);
    const hub = cylX(0.034, 0.066, dark, 24); hub.position.x = s * 0.66; g.add(hub);
  }
  return shadowAll(g);
}

// Banco plano a lo largo de Z: origen en el borde delantero del cojín, a ras de suelo
export function flatBench(len = 1.1, h = 0.43) {
  const g = new THREE.Group();
  const fr = M.frame();
  const pad = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.08, len, 3, 0.03), M.pad()); pad.position.set(0, h - 0.04, -len / 2); g.add(pad);
  for (const z of [-0.12, -len + 0.12]) {
    const lg = new THREE.Mesh(new RoundedBoxGeometry(0.06, h - 0.08, 0.06, 1, 0.01), fr); lg.position.set(0, (h - 0.08) / 2, z); g.add(lg);
    const ft = new THREE.Mesh(new RoundedBoxGeometry(0.40, 0.04, 0.08, 1, 0.01), fr); ft.position.set(0, 0.02, z); g.add(ft);
  }
  const beam = new THREE.Mesh(new RoundedBoxGeometry(0.05, 0.05, len - 0.24, 1, 0.01), fr); beam.position.set(0, h - 0.105, -len / 2); g.add(beam);
  return shadowAll(g);
}

// ------------------------------------------------------------------ implementos de las familias libres
const box = (w, h, d, mat, r = 0.01) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2 - 1e-3, h / 2 - 1e-3, d / 2 - 1e-3)), mat);
const tubeBetween = (a, b, r, mat) => {
  const d = b.clone().sub(a);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, d.length(), 16), mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); return m;
};
export { box as roundBox, tubeBetween };
// banco plano a lo largo de X (perpendicular al cuerpo): origen en el centro, a ras de suelo
export function benchX(len = 1.25, h = 0.43) {
  const g = new THREE.Group(); const fr = M.frame();
  const pad = box(len, 0.08, 0.30, M.pad(), 0.03); pad.position.set(0, h - 0.04, 0); g.add(pad);
  for (const x of [-len / 2 + 0.12, len / 2 - 0.12]) {
    const lg = box(0.06, h - 0.08, 0.06, fr); lg.position.set(x, (h - 0.08) / 2, 0); g.add(lg);
    const ft = box(0.08, 0.04, 0.42, fr); ft.position.set(x, 0.02, 0); g.add(ft);
  }
  const beam = box(len - 0.24, 0.05, 0.05, fr); beam.position.set(0, h - 0.105, 0); g.add(beam);
  return shadowAll(g);
}
export function balancePad() {
  const g = new THREE.Group();
  const m = box(0.46, 0.065, 0.36, new THREE.MeshStandardMaterial({ color: 0x3b6f8f, roughness: 0.9 }), 0.03); m.position.y = 0.0325; g.add(m);
  return shadowAll(g);
}
export function mat(w = 0.6, l = 1.8) {
  const g = new THREE.Group();
  const m = box(w, 0.008, l, new THREE.MeshStandardMaterial({ color: 0x2c3e46, roughness: 0.95 }), 0.003); m.position.y = 0.004; g.add(m);
  m.castShadow = false; m.receiveShadow = true; return g;
}
export function swissBall(r = 0.32) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 32), new THREE.MeshStandardMaterial({ color: 0x3f7fb5, roughness: 0.45, metalness: 0.0 }));
  g.add(m);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 0.999, 0.006, 8, 64), new THREE.MeshStandardMaterial({ color: 0xdfe6ea, roughness: 0.5 }));
  ring.rotation.y = Math.PI / 2; g.add(ring);
  return shadowAll(g);
}
export function slider() {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.012, 32), new THREE.MeshStandardMaterial({ color: 0xc8402e, roughness: 0.5 }));
  m.position.y = 0.006; g.add(m); return shadowAll(g);
}
// soportes con topes de seguridad (pin press): dos postes a x = ±0.56 con un tope horizontal a la altura y
export function rackPins(y = 0.4) {
  const g = new THREE.Group(); const fr = M.frame(), st = M.steel();
  for (const s of [1, -1]) {
    const p = box(0.06, 1.2, 0.06, fr); p.position.set(s * 0.56, 0.6, 0); g.add(p);
    const b = box(0.10, 0.03, 0.55, fr); b.position.set(s * 0.56, 0.015, 0); g.add(b);
    const pin = cylX(0.016, 0.16, st); pin.rotation.set(0, Math.PI / 2, 0); pin.position.set(s * 0.56, y, 0.06); g.add(pin);
    const pin2 = cylX(0.016, 0.16, st); pin2.rotation.set(0, Math.PI / 2, 0); pin2.position.set(s * 0.56, y, -0.06); g.add(pin2);
  }
  return shadowAll(g);
}
export function trxAnchor(y = 2.4) {
  const g = new THREE.Group(); const fr = M.frame();
  const beam = box(1.6, 0.08, 0.08, fr); beam.position.set(0, y + 0.04, 0); g.add(beam);
  for (const s of [1, -1]) { const p = box(0.08, y + 0.08, 0.08, fr); p.position.set(s * 0.8, (y + 0.08) / 2, 0); g.add(p); }
  return shadowAll(g);
}
const padMat = () => new THREE.MeshStandardMaterial({ color: 0x1b1c1e, metalness: 0.0, roughness: 0.62 });
const vcyl = (r, h, mat) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 20), mat);
// banco de curl femoral tumbado: cojín con tope a la altura padY, de z = -0.36 a 0.86; asas delante
export function curlBench(o = {}) {
  const padY = typeof o === "number" ? o : (o.padY ?? 0.62);
  const g = new THREE.Group(); const fr = M.frame();
  const pad = box(0.36, 0.08, 1.22, padMat(), 0.03); pad.position.set(0, padY - 0.04, 0.25); g.add(pad);
  for (const z of [-0.25, 0.75]) { const lg = box(0.08, padY - 0.08, 0.08, fr); lg.position.set(0, (padY - 0.08) / 2, z); g.add(lg); const ft = box(0.55, 0.04, 0.09, fr); ft.position.set(0, 0.02, z); g.add(ft); }
  const beam = box(0.06, 0.06, 1.0, fr); beam.position.set(0, padY - 0.11, 0.25); g.add(beam);
  for (const s of [1, -1]) { const h = vcyl(0.016, 0.16, M.rubber()); h.position.set(s * 0.24, padY - 0.02, 0.66); g.add(h); const arm = box(0.03, 0.03, 0.14, fr); arm.position.set(s * 0.21, padY - 0.10, 0.66); g.add(arm); }
  const post = box(0.07, padY - 0.1, 0.07, fr); post.position.set(0.30, (padY - 0.1) / 2, -0.44); g.add(post);
  return shadowAll(g);
}
// asiento de máquina con respaldo; opcional: almohadilla sobre los muslos (curl sentado)
export function seatMachine(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  const sy = o.seatY ?? 0.5, rec = (o.recline ?? 10) * Math.PI / 180;
  const seat = box(0.40, 0.08, 0.46, padMat(), 0.03); seat.position.set(0, sy - 0.04, 0.10); g.add(seat);
  const back = box(0.40, 0.62, 0.08, padMat(), 0.03); back.position.set(0, sy + 0.34, -0.19); back.rotation.x = -rec; g.add(back);
  const col = box(0.08, sy - 0.08, 0.08, fr); col.position.set(0, (sy - 0.08) / 2, 0.05); g.add(col);
  const base = box(0.5, 0.04, 0.8, fr); base.position.set(0, 0.02, 0.1); g.add(base);
  const bk = box(0.06, 0.5, 0.06, fr); bk.position.set(0, sy + 0.2, -0.26); bk.rotation.x = -rec; g.add(bk);
  for (const s of [1, -1]) {
    const h = cylX(0.017, 0.16, M.rubber()); h.rotation.y = Math.PI / 2; h.position.set(s * 0.27, sy + 0.04, 0.12); g.add(h);
    const a = box(0.03, 0.03, 0.03, fr); a.position.set(s * 0.235, sy + 0.04, 0.05); g.add(a);
  }
  const tower = box(0.10, sy + 0.25, 0.10, fr); tower.position.set(0.36, (sy + 0.25) / 2, 0.44); g.add(tower);
  if (o.thighPad) { const tp = box(0.40, 0.08, 0.16, padMat(), 0.03); tp.position.set(0, sy + 0.24, 0.36); g.add(tp); const ar = box(0.04, 0.04, 0.12, fr); ar.position.set(0.30, sy + 0.24, 0.36); g.add(ar); }
  return shadowAll(g);
}
// brazo de palanca con rodillo (o placa) que sigue al pie: actualizado cada fotograma
export function lever(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1, 14), fr); g.add(arm);
  const hub = cylX(0.05, 0.06, fr); g.add(hub);
  const roller = cylX(0.045, o.rollerLen ?? 0.40, padMat(), 28); g.add(roller);
  const stub = cylX(0.015, 0.34, fr); g.add(stub);
  let plate = null;
  if (o.plate) { plate = box(0.16, 0.025, 0.24, M.rubber(), 0.01); g.add(plate); roller.visible = false; }
  const up = new THREE.Vector3(0, 1, 0);
  g.userData.update = (load) => {
    const L = load.dyn && load.dyn.lever; if (!L) return;
    const a = L.pivot.clone(), sx = Math.sign(a.x) || 1;
    const b = new THREE.Vector3(a.x, L.end.y, L.end.z);
    const d = b.clone().sub(a); const len = d.length();
    arm.position.copy(a).add(b).multiplyScalar(0.5); arm.scale.set(1, len, 1); arm.quaternion.setFromUnitVectors(up, d.normalize());
    hub.position.copy(a);
    roller.position.copy(L.end); if (o.rollerX != null) roller.position.x = o.rollerX;
    stub.position.set((a.x + roller.position.x) / 2, b.y, b.z); stub.scale.set(Math.abs(a.x - roller.position.x) / 0.34, 1, 1);
    if (plate) { plate.position.copy(L.end); plate.quaternion.copy(L.q); stub.position.set((a.x + L.end.x) / 2, b.y, b.z); stub.scale.set(Math.abs(a.x - L.end.x) / 0.34, 1, 1); }
  };
  return shadowAll(g);
}
// estructura de la patada de glúteo en máquina: apoyo de antebrazos/pecho y asas
export function kickFrame(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  const hy = o.handY ?? 1.0, hz = o.handZ ?? 0.55;
  const pad = box(0.40, 0.07, 0.34, padMat(), 0.03); pad.position.set(0, hy - 0.06, hz - 0.05); pad.rotation.x = 0.25; g.add(pad);
  const col = box(0.10, hy - 0.08, 0.10, fr); col.position.set(0, (hy - 0.08) / 2, hz + 0.12); g.add(col);
  const base = box(0.70, 0.04, 1.2, fr); base.position.set(0, 0.02, 0.05); g.add(base);
  const bar = cylX(0.017, 0.56, M.rubber()); bar.position.set(0, hy, hz); g.add(bar);
  const plat = box(0.30, 0.05, 0.36, M.rubber(), 0.01); plat.position.set(o.standX ?? 0.09, 0.065, 0.0); g.add(plat);
  const tw = box(0.10, 1.05, 0.10, fr); tw.position.set(o.towerX ?? -0.36, 0.525, o.pivotZ ?? -0.02); g.add(tw);
  return shadowAll(g);
}
export function cableColumn(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  const col = box(0.42, 2.2, 0.26, fr); col.position.set(0, 1.1, o.z ?? 0.78); g.add(col);
  const stack = box(0.26, 0.7, 0.05, M.iron()); stack.position.set(0, 0.45, (o.z ?? 0.78) - 0.15); g.add(stack);
  const pul = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.015, 10, 24), M.steel()); pul.position.set(0, o.pulleyY ?? 0.12, (o.z ?? 0.78) - 0.16); pul.rotation.y = Math.PI / 2; g.add(pul);
  const bar = cylX(0.017, 0.62, M.rubber()); bar.position.set(0, o.handY ?? 1.1, o.handZ ?? 0.55); g.add(bar);
  for (const s of [1, -1]) { const a = box(0.03, 0.03, (o.z ?? 0.78) - (o.handZ ?? 0.55), fr); a.position.set(s * 0.30, o.handY ?? 1.1, ((o.z ?? 0.78) + (o.handZ ?? 0.55)) / 2); g.add(a); }
  return shadowAll(g);
}
export function barre(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  for (const s of [1, -1]) { const p = box(0.05, o.handY ?? 1.05, 0.05, fr); p.position.set(s * 0.45, (o.handY ?? 1.05) / 2, o.handZ ?? 0.5); g.add(p); const b = box(0.08, 0.03, 0.4, fr); b.position.set(s * 0.45, 0.015, o.handZ ?? 0.5); g.add(b); }
  const bar = cylX(0.017, 0.95, M.steel()); bar.position.set(0, o.handY ?? 1.05, o.handZ ?? 0.5); g.add(bar);
  if (o.anchorY != null) { const k = vcyl(0.02, 0.04, M.steel()); k.position.set(0, o.anchorY, (o.handZ ?? 0.5) - 0.03); g.add(k); }
  return shadowAll(g);
}
// soporte de tobillos del curl nórdico: rodillo acolchado sobre los tobillos y colchoneta para las rodillas
export function anklePad(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  const z = o.z ?? -0.43;
  const r = cylX(0.05, 0.42, padMat(), 28); r.position.set(0, o.y ?? 0.17, z); g.add(r);
  for (const s of [1, -1]) { const p = box(0.05, (o.y ?? 0.17) + 0.02, 0.05, fr); p.position.set(s * 0.25, ((o.y ?? 0.17) + 0.02) / 2, z); g.add(p); }
  const base = box(0.6, 0.03, 0.12, fr); base.position.set(0, 0.015, z); g.add(base);
  const kp = box(0.45, 0.04, 0.55, padMat(), 0.015); kp.position.set(0, 0.02, -0.12); g.add(kp);
  return shadowAll(g);
}

// lastre de tobillo: manguito acolchado alrededor de la espinilla (eje local Y)
export function ankleWeight() {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.085, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x1d1f22, roughness: 0.7, side: THREE.DoubleSide }));
  g.add(m);
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.059, 0.008, 8, 32), new THREE.MeshStandardMaterial({ color: 0x8b0d14, roughness: 0.6 }));
  strap.rotation.x = Math.PI / 2; g.add(strap);
  return shadowAll(g);
}
// plataforma móvil de la prensa (eje local Z = dirección de las piernas)
export function legPressSled() {
  const g = new THREE.Group(); const fr = M.frame();
  const plate = box(0.62, 0.48, 0.03, M.iron(), 0.01); plate.position.z = 0.015; g.add(plate);
  const grip = box(0.60, 0.46, 0.01, M.rubber(), 0.004); grip.position.z = -0.002; g.add(grip);
  for (const s of [1, -1]) { const rl = box(0.05, 0.05, 0.9, fr); rl.position.set(s * 0.36, -0.20, 0.45); g.add(rl); }
  return shadowAll(g);
}
// asiento de la prensa a 45°: respaldo inclinado y base
export function legPressSeat(o = {}) {
  const g = new THREE.Group(); const fr = M.frame();
  const rec = (o.recline ?? 48) * Math.PI / 180, sy = o.seatY ?? 0.42;
  const seat = box(0.46, 0.08, 0.40, padMat(), 0.03); seat.position.set(0, sy - 0.13, 0.02); seat.rotation.x = 0.25; g.add(seat);
  const back = box(0.46, 0.75, 0.08, padMat(), 0.03); back.position.set(0, sy + 0.18, -0.25); back.rotation.x = -rec; g.add(back);
  const base = box(0.7, 0.05, 2.0, fr); base.position.set(0, 0.025, 0.55); g.add(base);
  const col = box(0.1, sy - 0.15, 0.1, fr); col.position.set(0, (sy - 0.15) / 2, -0.05); g.add(col);
  const ang = (o.legAng ?? 42) * Math.PI / 180;
  for (const s of [1, -1]) {
    const L = 1.7, rail = box(0.06, 0.06, L, fr);
    rail.position.set(s * 0.36, sy + Math.sin(ang) * 0.95 - 0.25, Math.cos(ang) * 0.95 + 0.05); rail.rotation.x = -ang; g.add(rail);
    const leg = box(0.06, sy + 1.0, 0.06, fr); leg.position.set(s * 0.36, (sy + 1.0) / 2, 1.35); g.add(leg);
  }
  for (const s of [1, -1]) { const h = cylX(0.017, 0.14, M.rubber()); h.rotation.y = Math.PI / 2; h.position.set(s * 0.30, sy - 0.02, 0.10); g.add(h); }
  return shadowAll(g);
}

// BOSU: media esfera sobre base rígida (altura ~0.22 m)
export function bosu() {
  const g = new THREE.Group();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.32, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x2f6fa8, roughness: 0.55 }));
  dome.scale.set(1, 0.62, 1); dome.position.y = 0.025; g.add(dome);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.325, 0.03, 48), new THREE.MeshStandardMaterial({ color: 0x15171a, roughness: 0.7 }));
  base.position.y = 0.015; g.add(base);
  return shadowAll(g);
}

// tabla de equilibrio (balance board): tablero sobre un medio cilindro, gira alrededor de Z
export function balanceBoard() {
  const g = new THREE.Group();
  const top = box(0.62, 0.025, 0.40, new THREE.MeshStandardMaterial({ color: 0xa8743f, roughness: 0.7 }), 0.008); top.position.y = 0.0; g.add(top);
  const grip = box(0.58, 0.004, 0.36, new THREE.MeshStandardMaterial({ color: 0x23262a, roughness: 0.9 }), 0.002); grip.position.y = 0.014; g.add(grip);
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.36, 24, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({ color: 0x15171a, roughness: 0.7 }));
  roll.rotation.x = Math.PI / 2; roll.rotation.z = Math.PI; roll.position.y = -0.013; g.add(roll);
  return shadowAll(g);
}
// espuma de equilibrio (foam pad)
export function foamPad() {
  const g = new THREE.Group();
  const m = box(0.48, 0.065, 0.40, new THREE.MeshStandardMaterial({ color: 0x3b6f8f, roughness: 0.95 }), 0.02); m.position.y = 0.0325; g.add(m);
  return shadowAll(g);
}

// cadena: n eslabones (se colocan en cada fotograma)
export function chain(n = 44) {
  const g = new THREE.Group();
  const geo = new THREE.TorusGeometry(0.019, 0.0055, 8, 14); geo.scale(1, 1.45, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0x8d9298, metalness: 0.85, roughness: 0.38 });
  for (let i = 0; i < n; i++) { const m = new THREE.Mesh(geo, mat); m.castShadow = true; g.add(m); }
  return g;
}

// escalera de agilidad en el suelo (a lo largo de z, desde z0)
export function ladder(o = {}) {
  const g = new THREE.Group();
  const n = o.n ?? 60, sp = o.sp ?? 0.45, w = o.w ?? 0.50, z0 = o.z0 ?? -0.3;
  const mat = new THREE.MeshStandardMaterial({ color: 0xe8c22a, roughness: 0.6 });
  for (const s of [1, -1]) { const r = box(0.03, 0.008, n * sp, mat, 0.002); r.position.set(s * w / 2, 0.004, z0 + n * sp / 2); g.add(r); }
  for (let i = 0; i <= n; i++) { const r = box(w, 0.010, 0.035, mat, 0.003); r.position.set(0, 0.005, z0 + i * sp); g.add(r); }
  return shadowAll(g);
}

// barras paralelas para fondos (a lo largo de z)
export function dipBars(o = {}) {
  const g = new THREE.Group(); const fr = M.frame(); const st = M.steel();
  const h = o.h ?? 1.12, w = o.w ?? 0.26, L = o.len ?? 1.0;
  for (const s of [1, -1]) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, L, 20), st); bar.rotation.x = Math.PI / 2; bar.position.set(s * w, h, 0); g.add(bar);
    for (const z of [-L / 2 + 0.08, L / 2 - 0.08]) { const up = box(0.05, h, 0.05, fr); up.position.set(s * (w + 0.03), h / 2, z); g.add(up); }
    const ft = box(0.08, 0.04, L, fr); ft.position.set(s * (w + 0.03), 0.02, 0); g.add(ft);
  }
  return shadowAll(g);
}
// barra de dominadas con dos postes (barra a lo largo de x)
export function pullupBar(o = {}) {
  const g = new THREE.Group(); const fr = M.frame(); const st = M.steel();
  const h = o.h ?? 2.25, w = o.w ?? 0.62;
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 2 * w + 0.1, 20), st); bar.rotation.z = Math.PI / 2; bar.position.set(0, h, 0); g.add(bar);
  for (const s of [1, -1]) { const up = box(0.06, h + 0.08, 0.06, fr); up.position.set(s * (w + 0.05), (h + 0.08) / 2, 0); g.add(up); const ft = box(0.08, 0.04, 0.9, fr); ft.position.set(s * (w + 0.05), 0.02, 0); g.add(ft); }
  return shadowAll(g);
}
// tubo de longitud 1 a lo largo de Y (se escala en cada fotograma)
export function rod(r = 0.02, color = 0x2a2d31) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 16), new THREE.MeshStandardMaterial({ color, metalness: 0.6, roughness: 0.4 }));
  m.castShadow = true; return m;
}
// asa de máquina / polea (a lo largo de X)
export function handle() {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.14, 16), M.rubber()); m.rotation.z = Math.PI / 2; g.add(m);
  return shadowAll(g);
}

// banco inclinado / declinado: asiento en z ≈ 0 y respaldo hacia -z con el ángulo dado (grados sobre la horizontal; negativo = declinado)
export function inclineBench(o = {}) {
  const g = new THREE.Group(); const fr = M.frame(); const pad = M.pad();
  const a = (o.angle ?? 30) * Math.PI / 180, sh = o.seatH ?? 0.45, L = o.backLen ?? 0.95;
  const seat = box(0.30, 0.08, 0.36, pad, 0.03); seat.position.set(0, sh - 0.04, 0.10); g.add(seat);
  const back = box(0.28, 0.08, L, pad, 0.03);
  const z0 = -0.08, y0 = sh;
  back.position.set(0, y0 + Math.sin(a) * L / 2 - 0.04 * Math.cos(a), z0 - Math.cos(a) * L / 2);
  back.rotation.x = a; g.add(back);
  const yEnd = Math.max(0.12, y0 + Math.sin(a) * L - 0.12), zEnd = z0 - Math.cos(a) * L * 0.85;
  const post = box(0.06, Math.max(0.1, yEnd), 0.06, fr); post.position.set(0, Math.max(0.1, yEnd) / 2, zEnd); g.add(post);
  const col = box(0.06, sh - 0.08, 0.06, fr); col.position.set(0, (sh - 0.08) / 2, 0.08); g.add(col);
  const base = box(0.08, 0.04, Math.abs(zEnd) + 0.35, fr); base.position.set(0, 0.02, (zEnd + 0.25) / 2); g.add(base);
  for (const z of [0.20, zEnd]) { const ft = box(0.42, 0.04, 0.08, fr); ft.position.set(0, 0.02, z); g.add(ft); }
  if (o.legHook) { const hk = cylX(0.05, 0.36, pad); hk.position.set(0, sh + 0.10, 0.42); g.add(hk); const hp = box(0.05, sh + 0.10, 0.05, fr); hp.position.set(0, (sh + 0.10) / 2, 0.42); g.add(hp); }
  return shadowAll(g);
}

// banco de hiperextensiones a 45°: apoyo de cadera en z ≈ 0.16 y plataforma de pies detrás
export function romanChair(o = {}) {
  const g = new THREE.Group(); const fr = M.frame(); const pad = M.pad();
  const a = Math.PI / 4;
  const hp = box(0.40, 0.10, 0.34, pad, 0.04); hp.position.set(0, o.padY ?? 0.70, o.padZ ?? 0.17); hp.rotation.x = -a; g.add(hp);
  const fp = box(0.42, 0.04, 0.26, fr, 0.01); fp.position.set(0, 0.10, -0.56); fp.rotation.x = -a * 0.5; g.add(fp);
  const ap = cylX(0.045, 0.40, pad); ap.position.set(0, 0.24, -0.48); g.add(ap);
  const rail = box(0.06, 0.06, 1.15, fr); rail.position.set(0, 0.42, -0.18); rail.rotation.x = -a; g.add(rail);
  const base = box(0.08, 0.04, 1.10, fr); base.position.set(0, 0.02, -0.20); g.add(base);
  const col = box(0.06, 0.62, 0.06, fr); col.position.set(0, 0.31, 0.22); g.add(col);
  for (const z of [0.25, -0.70]) { const ft = box(0.50, 0.04, 0.08, fr); ft.position.set(0, 0.02, z); g.add(ft); }
  return shadowAll(g);
}

// disco suelto (eje a lo largo de X)
export function plate(r = 0.225) {
  const g = new THREE.Group();
  const p = cylX(r, 0.045, M.rubber(), 56); g.add(p);
  const rim = cylX(r + 0.004, 0.026, M.rubberRim(), 56); g.add(rim);
  const hub = cylX(0.034, 0.05, M.steelDark(), 24); g.add(hub);
  return shadowAll(g);
}

// banco Scott (predicador): asiento y apoyo inclinado delante del pecho
export function preacher(o = {}) {
  const g = new THREE.Group(); const fr = M.frame(); const pad = M.pad();
  const seat = box(0.36, 0.08, 0.34, pad, 0.03); seat.position.set(0, (o.seatH ?? 0.47) - 0.04, -0.02); g.add(seat);
  const pd = box(0.44, 0.07, 0.36, pad, 0.03); pd.position.set(0, o.padY ?? 0.98, o.padZ ?? 0.36); pd.rotation.x = -(o.padAng ?? 45) * Math.PI / 180; g.add(pd);
  const col = box(0.06, (o.padY ?? 0.98) - 0.1, 0.06, fr); col.position.set(0, ((o.padY ?? 0.98) - 0.1) / 2, (o.padZ ?? 0.36) + 0.12); g.add(col);
  const col2 = box(0.06, 0.40, 0.06, fr); col2.position.set(0, 0.20, -0.02); g.add(col2);
  const base = box(0.08, 0.04, 0.70, fr); base.position.set(0, 0.02, 0.20); g.add(base);
  for (const z of [-0.12, 0.52]) { const ft = box(0.50, 0.04, 0.08, fr); ft.position.set(0, 0.02, z); g.add(ft); }
  return shadowAll(g);
}

// Valla baja de pliometría: dos patas y travesaño a lo ancho (eje X)
export function hurdle(o = {}) {
  const h = o.h ?? 0.30, w = o.w ?? 0.80;
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: o.color ?? 0xd9a21b, roughness: 0.6 });
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, h, 12), M.frame()); leg.position.set(sx * w / 2, h / 2, 0); g.add(leg);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.30), M.frame()); foot.position.set(sx * w / 2, 0.01, 0); g.add(foot);
  }
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, w, 14), mat); bar.rotation.z = Math.PI / 2; bar.position.y = h; g.add(bar);
  return shadowAll(g);
}

// Cono de señalización
export function cone(o = {}) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: o.color ?? 0xf28c28, roughness: 0.55 });
  const c = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.23, 20), mat); c.position.y = 0.125; g.add(c);
  const b = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.015, 0.20), mat); b.position.y = 0.0075; g.add(b);
  return shadowAll(g);
}

// rampa/cuesta: cuña cuyo plano superior pasa por y = h0 + z·tan(pendiente) (subida si slope > 0)
export function ramp(o = {}) {
  const sl = Math.tan((o.slope ?? 8) * Math.PI / 180), h0 = o.h0 ?? 0.5, w = o.w ?? 2.4, far = o.far ?? 22;
  const za = sl > 0 ? -h0 / sl : -far, zb = sl > 0 ? far : h0 / -sl;
  const yAt = (z) => Math.max(0, h0 + z * sl);
  const sh = new THREE.Shape();
  sh.moveTo(za, 0); sh.lineTo(zb, 0); sh.lineTo(zb, yAt(zb)); sh.lineTo(za, yAt(za)); sh.lineTo(za, 0);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: w, bevelEnabled: false });
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: o.color ?? 0x3a3f44, roughness: 0.9 }));
  m.rotation.y = -Math.PI / 2; m.position.x = w / 2;
  m.castShadow = false; m.receiveShadow = true;
  const g = new THREE.Group(); g.add(m);
  return g;
}

// paracaídas de resistencia: cúpula abierta hacia +Z con cordinos que convergen en (0, 0, +lines)
export function chute(o = {}) {
  const g = new THREE.Group(), r = o.r ?? 0.55, L = o.lines ?? 0.7;
  const m = new THREE.MeshStandardMaterial({ color: o.color ?? 0xb3262b, roughness: 0.7, side: THREE.DoubleSide });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 12, 0, Math.PI * 2, 0, Math.PI * 0.42), m);
  dome.rotation.x = -Math.PI / 2; dome.scale.set(1, 0.75, 1); dome.castShadow = true; g.add(dome);
  const rimZ = -r * 0.75 * Math.cos(Math.PI * 0.42), rimR = r * Math.sin(Math.PI * 0.42);
  const lm = new THREE.MeshStandardMaterial({ color: 0x1d1f22, roughness: 0.8 });
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2, A = new THREE.Vector3(Math.cos(a) * rimR, Math.sin(a) * rimR, rimZ), B = new THREE.Vector3(0, 0, L);
    const len = A.distanceTo(B), c = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, len, 4), lm);
    c.position.copy(A).add(B).multiplyScalar(0.5); c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize()); g.add(c);
  }
  return g;
}

// chaleco lastrado: paneles delante y detrás del pecho (coordenadas relativas al punto de pecho en reposo)
export function vest(o = {}) {
  const g = new THREE.Group();
  const m = new THREE.MeshStandardMaterial({ color: o.color ?? 0x24272b, roughness: 0.75 });
  const f = o.front ?? 0.112, b = o.back ?? 0.108;
  const front = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.27, 0.05), m); front.position.set(0, -0.03, f); g.add(front);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.30, 0.05), m); back.position.set(0, -0.02, -b); g.add(back);
  for (const s of [1, -1]) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, f + b + 0.05), m); st.position.set(s * 0.09, 0.115, (f - b) / 2); g.add(st); }
  return shadowAll(g);
}

// escalera de agilidad plana en el suelo (cintas laterales + peldaños); se desplaza en Z para simular avance
export function agilityLadder(o = {}) {
  const g = new THREE.Group(), w = o.w ?? 0.46, d = o.d ?? 0.46, z0 = o.z0 ?? -6, z1 = o.z1 ?? 9;
  const yel = new THREE.MeshStandardMaterial({ color: o.color ?? 0xe8c022, roughness: 0.6 });
  const blk = new THREE.MeshStandardMaterial({ color: 0x1d1f22, roughness: 0.7 });
  if (o.rails !== false) for (const s of [1, -1]) { const r = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.008, z1 - z0), blk); r.position.set(s * w / 2, 0.004, (z0 + z1) / 2); g.add(r); }
  for (let z = Math.ceil(z0 / d) * d; z <= z1; z += d) {
    if (o.hurdleH) { const hh = hurdle({ h: o.hurdleH, w: w }); hh.position.z = z; g.add(hh); continue; }
    if (o.pads) { const pd = new THREE.Mesh(new THREE.BoxGeometry(w * 0.8, 0.03, d * 0.55), new THREE.MeshStandardMaterial({ color: 0x3f6fb0, roughness: 0.8 })); pd.position.set(0, 0.015, z); pd.receiveShadow = true; g.add(pd); continue; }
    const r = new THREE.Mesh(new THREE.BoxGeometry(w, 0.012, 0.035), yel); r.position.set(0, 0.006, z); g.add(r);
  }
  g.traverse((m) => { if (m.isMesh) m.receiveShadow = true; });
  return g;
}
