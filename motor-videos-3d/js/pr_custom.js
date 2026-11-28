// Configuraciones propias para prevención (PR): Copenhague, aducción con balón y con banda/polea
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0], aL: [0, 30, 0], aR: [0, 30, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const FLOOR_FR = { frame: { dist: 4.0, ty: 0.32, tz: 0.20, distLow: 3.6, tyLow: 0.32 }, views: { f34: { az: -35, el: 22 }, side: { az: -90, el: 8 }, front: { az: -15, el: 26 }, back34: { az: -140, el: 26 } } };
const SIDE_FR = { frame: { dist: 4.2, ty: 0.42, tz: 0.10, distLow: 3.9, tyLow: 0.40 }, views: { f34: { az: -25, el: 16 }, side: { az: 0, el: 8 }, front: { az: -50, el: 20 }, back34: { az: 30, el: 22 } } };
const STAND_FR = { frame: { dist: 4.4, ty: 0.95, tz: 0.0, distLow: 4.2, tyLow: 0.92 }, views: { f34: { az: -20, el: 10 }, side: { az: -90, el: 6 }, front: { az: 0, el: 8 }, back34: { az: -160, el: 14 } } };

// plancha lateral de Copenhague sobre el antebrazo derecho, pie (o rodilla) de arriba sobre un banco
const cop = (lift, knee) => {
  const k = { P: [-0.07, 0.38, 0], rot: [0, 0, 92], nk: [0, 0], kL: [0, 1, 0.2], kR: [0, 1, 0.2], hR: [-0.58, 0.045, 0.27], eR: [0, -1, -0.3], pR: [0, -1, 0, 0, 0, 1], aL: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0] };
  if (knee) { k.P = [0.02, 0.34, 0]; k.rot = [0, 0, 94]; k.L = [0.62, 0.20, 0, 0, 0]; k.kL = [0, 1, 0.2]; k.hR = [-0.50, 0.045, 0.27]; }
  else k.L = [0.80, 0.47, 0, 0, 0];
  k.R = lift ? [knee ? 0.55 : 0.79, knee ? 0.30 : 0.38, 0.0, 0, 0] : [knee ? 0.50 : 0.74, 0.08, 0.02, 0, 0];
  return k;
};
export const COPEN = { family: 'free', ...SIDE_FR, labelAll: true, tempo: { down: 1.8, pause: 1.5, up: 1.8 },
  phaseNames: { BAJADA: 'SUBE LA PIERNA', SUBIDA: 'BAJA', ARRIBA: 'PIERNA ABAJO' }, holdLabel: 'PLANCHA DE COPENHAGUE',
  cfg: { free: { type: 'kfPose', keys: [{ u: 0, ...cop(false, false) }, { u: 1, ...cop(true, false) }] }, items: [{ kind: 'flatBench', x: 0.82, len: 0.9, h: 0.40 }, { kind: 'mat', z: 0.1, x: -0.3, l: 1.2, ry: Math.PI / 2 }] } };
export const COPEN_KNEE = { ...COPEN,
  cfg: { free: { type: 'kfPose', keys: [{ u: 0, ...cop(false, true) }, { u: 1, ...cop(true, true) }] }, items: [{ kind: 'flatBench', x: 0.50, len: 0.9, h: 0.40 }, { kind: 'mat', z: 0.1, x: -0.3, l: 1.2, ry: Math.PI / 2 }] } };

// aducción isométrica con balón entre las rodillas (boca arriba, rodillas dobladas)
export const ADD_SQ = { family: 'free', ...FLOOR_FR, labelAll: true, iso: true, tempo: { down: 1.2, pause: 4, up: 1.2 },
  phaseNames: { BAJADA: 'APRIETA', SUBIDA: 'SUELTA', ARRIBA: 'SIN PRESIÓN' }, holdLabel: 'APRIETA EL BALÓN',
  cfg: { free: { type: 'kfPose', ball: { r: 0.10 }, ballAt: 'K:bp', keys: [
    { u: 0, ...SUP, lL: [45, 97, 10, -2], lR: [45, 97, 10, -2], bp: [0, 0.40, 0.29] },
    { u: 1, ...SUP, lL: [45, 97, 10, -5], lR: [45, 97, 10, -5], bp: [0, 0.40, 0.29] },
  ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] } };

// aducción de pie con banda o polea anclada al lado derecho (trabaja la pierna derecha)
const addKeys = [
  { u: 0, ...STAND, lR: [4, 4, 0, 22], aL: [4, 6, 30], aR: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
  { u: 1, ...STAND, lR: [8, 4, 0, -14], aL: [4, 6, 30], aR: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
];
export const ADD_BAND = { family: 'free', ...STAND_FR, labelAll: true, tempo: { down: 1.5, pause: 0.8, up: 1.8 },
  phaseNames: { BAJADA: 'CRUZA', SUBIDA: 'VUELVE', ARRIBA: 'PIERNA AFUERA' }, holdLabel: 'PIERNA CRUZADA',
  cfg: { free: { type: 'kfPose', relY: 'L', bands: [{ anchor: [-0.95, 0.14, 0.0], to: 'aR' }], keys: addKeys }, items: [{ kind: 'post', h: 0.25, x: -0.98, z: 0.0 }] } };
export const ADD_CABLE = { ...ADD_BAND,
  cfg: { free: { type: 'kfPose', relY: 'L', bands: [{ anchor: [-0.95, 0.14, 0.0], to: 'aR', cable: true }], keys: addKeys }, items: [{ kind: 'post', h: 1.9, x: -1.02, z: 0.0 }] } };

// sentadilla española: banda detrás de las rodillas anclada delante, tibias verticales
const SQ_FR = { frame: { dist: 4.4, ty: 0.80, tz: 0.15, distLow: 4.2, tyLow: 0.72 }, views: { f34: { az: -60, el: 10 }, side: { az: -90, el: 6 }, front: { az: -30, el: 10 }, back34: { az: -140, el: 16 } } };
const ARMS_FWD = { hL: [0.16, 1.10, 0.42], hR: [-0.16, 1.10, 0.42], eL: [0.3, -1, 0], eR: [-0.3, -1, 0], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] };
const FEET = { L: [0.14, 0.075, 0, 0, 8], R: [-0.14, 0.075, 0, 0, -8], kL: [0.15, 0.1, 1], kR: [-0.15, 0.1, 1] };
export const SPANISH = { family: 'free', ...SQ_FR, labelAll: true, iso: true, tempo: { down: 2.5, pause: 4, up: 2 },
  phaseNames: { BAJADA: 'SIÉNTATE ATRÁS', SUBIDA: 'SUBE', ARRIBA: 'DE PIE' }, holdLabel: 'ISOMETRÍA',
  cfg: { free: { type: 'kfPose', bands: [{ anchor: [0.16, 0.48, 1.05], to: 'kL' }, { anchor: [-0.16, 0.48, 1.05], to: 'kR' }], keys: [
    { u: 0, P: [0, 0.90, -0.02], rot: [3, 0, 0], nk: [0, 0], ...FEET, ...ARMS_FWD },
    { u: 1, P: [0, 0.56, -0.30], rot: [12, 0, 0], nk: [-4, 0], ...FEET, ...ARMS_FWD, hL: [0.16, 0.86, 0.30], hR: [-0.16, 0.86, 0.30] },
  ] }, items: [{ kind: 'post', h: 0.55, x: 0.0, z: 1.10 }] } };

// sentadilla en tabla declinada (bilateral o a una pierna)
const DEC_FEET = { L: [0.13, 0.17, 0.0, 25, 6], R: [-0.13, 0.17, 0.0, 25, -6], kL: [0.1, 0.1, 1], kR: [-0.1, 0.1, 1] };
export const DECLINE = { family: 'free', ...SQ_FR, labelAll: true, tempo: { down: 3, pause: 0.5, up: 1.5 },
  phaseNames: { BAJADA: 'BAJA LENTO', SUBIDA: 'SUBE', ARRIBA: 'DE PIE' }, holdLabel: 'POSICIÓN BAJA',
  cfg: { free: { type: 'kfPose', keys: [
    { u: 0, P: [0, 0.99, 0.01], rot: [2, 0, 0], nk: [0, 0], ...DEC_FEET, ...ARMS_FWD },
    { u: 1, P: [0, 0.62, -0.10], rot: [14, 0, 0], nk: [-4, 0], ...DEC_FEET, kL: [0.1, 0.05, 1], kR: [-0.1, 0.05, 1], ...ARMS_FWD },
  ] }, items: [{ kind: 'decline' }] } };
export const DECLINE_SL = { ...DECLINE,
  cfg: { free: { type: 'kfPose', keys: [
    { u: 0, P: [0.02, 0.99, 0.01], rot: [2, 0, 0], nk: [0, 0], L: DEC_FEET.L, kL: DEC_FEET.kL, lR: [24, 40, 10, 0], ...ARMS_FWD },
    { u: 1, P: [0.03, 0.66, -0.10], rot: [16, 0, 0], nk: [-4, 0], L: DEC_FEET.L, kL: [0.1, 0.05, 1], lR: [52, 70, 10, 0], ...ARMS_FWD },
  ] }, items: [{ kind: 'decline' }] } };

// báscula pélvica boca arriba (rodillas dobladas)
export const PELVIC_TILT = { family: 'free', ...FLOOR_FR, labelAll: true, tempo: { down: 1.8, pause: 1, up: 1.8 },
  phaseNames: { BAJADA: 'APLANA LA ESPALDA', SUBIDA: 'ARQUEA', ARRIBA: 'ARQUEA' }, holdLabel: 'PELVIS EN RETROVERSIÓN',
  cfg: { free: { type: 'kfPose', keys: [
    { u: 0, ...SUP, rot: [-84, 0, 0], sp: [8, 0, 0], lL: [45, 97, 10, 0], lR: [45, 97, 10, 0] },
    { u: 1, ...SUP, rot: [-94, 0, 0], sp: [-8, 0, 0], lL: [52, 100, 10, 0], lR: [52, 100, 10, 0] },
  ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] } };

// pie sobre una pelota o rodillo pequeño (automasaje de fascia plantar), de pie apoyado en la derecha
const footRoll = (ball) => {
  const k = (u, z) => ({ u, P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [6, 0], R: [-0.12, 0.08, 0, 0, -8], L: [0.15, 0.075 + 0.055, z, 0, 6], kL: [0.2, 0.2, 1], bp: [0.15, 0.035, 0.03] });
  return { type: 'kfPose', relY: 'R', arms: 'hips', ...(ball ? { ball: { r: 0.035 }, ballAt: 'K:bp' } : {}), keys: [k(0, -0.06), k(1, 0.10)] };
};
const FOOT_FR = { frame: { dist: 3.6, ty: 0.55, tz: 0.15, distLow: 3.4, tyLow: 0.50 }, views: { f34: { az: -55, el: 16 }, side: { az: -90, el: 6 }, front: { az: -25, el: 16 }, back34: { az: -140, el: 18 } } };
export const FOOT_BALL = { family: 'free', ...FOOT_FR, labelAll: true, tempo: { down: 1.5, pause: 0.2, up: 1.5 },
  phaseNames: { BAJADA: 'ADELANTE', SUBIDA: 'ATRÁS', ARRIBA: 'ATRÁS' }, holdLabel: 'PRESIÓN CONSTANTE', cfg: { free: footRoll(true) } };
export const FOOT_ROLLER = { ...FOOT_BALL, cfg: { free: footRoll(false), items: [{ kind: 'foamRoller', r: 0.04, len: 0.30, x: 0.15, z: 0.02, alongZ: false }] } };
