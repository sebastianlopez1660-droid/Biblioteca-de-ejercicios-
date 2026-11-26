// Lote 24: TS-TRA-013 y empujes/tirones horizontales TS-HOR-001 … 009
import { EXERCISES } from './exercises.js';
import { PULL, STAND_FR } from './ex_lote22.js';
import { EMP, benchKeys, BENCH_FR, PUSH_FR } from './ex_lote21.js';
import { plankKey, handsFloor } from './ts_common.js';

const CABLE = 0xb9bec4;
const D = Math.PI / 180;
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const STAG = { P: [0, -0.03, -0.02], rot: [4, 0, 0], L: [0.12, 0.08, 0.22, 0, 6], R: [-0.13, 0.08, -0.30, 10, -6] };
const ROW = { phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA' };
const HOR = { sub: 'Horizontal' };
const add = (a, b, k = 1) => a.map((v, i) => v + b[i] * k);
const norm = (a) => { const l = Math.hypot(...a); return a.map((v) => v / l); };

// press en banco inclinado (ang > 0) o declinado (ang < 0)
function inclineKeys(ang, { w = 0.38, hold = 'bar', db = false } = {}) {
  const th = -(90 - ang) * D, up = [0, Math.cos(th), Math.sin(th)], fr = [0, -Math.sin(th), Math.cos(th)];
  const P = ang >= 0 ? [0, 0.565, 0.02] : [0, 0.62, 0.0];
  const sh = add(add(P, up, 0.48), fr, -0.03), ch = add(add(P, up, ang >= 0 ? 0.38 : 0.30), fr, 0.13);
  const legs = ang >= 0 ? { L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1] } : { lL: [38, 98, 0, 0], lR: [38, 98, 0, 0] };
  const palm = [0, fr[1], fr[2] + 0.3];
  const base = { P, rot: [-(90 - ang), 0, 0], sp: [-6, 0, 0], nk: [-12, 0], ...legs, eL: [0.6, -1, 0.2], eR: [-0.6, -1, 0.2], pL: [...palm, 1, 0, 0], pR: [...palm, -1, 0, 0] };
  const top = add(sh, [0, 1, 0], 0.62), bot = add(ch, fr, 0.06);
  const wb = db ? w + 0.08 : w, wt = db ? w - 0.16 : w;
  return [{ ...base, u: 0, hL: [wt, top[1], top[2]], hR: [-wt, top[1], top[2]] }, { ...base, u: 1, hL: [wb, bot[1], bot[2]], hR: [-wb, bot[1], bot[2]] }];
}
// remo en TRX: talones en z = zH, cuerpo inclinado phi grados sobre la horizontal (cabeza hacia -z)
function trxKey(phi, u, A, pull) {
  const t = phi * D, zH = 0.30;
  const P = [0, 0.08 + 0.87 * Math.sin(t), zH - 0.87 * Math.cos(t)];
  const up = [0, Math.sin(t), -Math.cos(t)];
  const sh = add(P, up, 0.48);
  const hand = (sx) => { const s2 = [sx * 0.18, sh[1], sh[2]]; const d = norm([A[0] - s2[0] * 0.3, A[1] - s2[1], A[2] - s2[2]]); return add(s2, d, pull ? 0.22 : 0.56); };
  return { u, P, rot: [-(90 - phi), 0, 0], nk: [-6, 0], L: [0.10, 0.08, zH, -25, 6], R: [-0.10, 0.08, zH, -25, -6], kL: [0, 1, 0], kR: [0, 1, 0],
    hL: hand(1), hR: hand(-1), eL: pull ? [1, -1, 0] : [1, 0, 0], eR: pull ? [-1, -1, 0] : [-1, 0, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] };
}
const INC_FR = { frame: { dist: 4.4, ty: 0.85, tz: -0.10, distLow: 4.1, tyLow: 0.80 }, views: { f34: { az: -60, el: 18 }, side: { az: -90, el: 8 }, front: { az: -25, el: 22 }, back34: { az: -150, el: 22 } }, orbit: { view: 'side', sweep: 150 } };
const TRX_A = [0, 2.45, 0.80];

Object.assign(EXERCISES, {
  'TS-TRA-013': {
    ...PULL, ...ROW, ...STAND_FR, name: 'Pull-over en polea alta', level: 'Intermedio', secondary: ['Tríceps', 'Core'],
    phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ARRIBA' }, frame: { dist: 4.8, ty: 1.30, tz: 0.30, distLow: 4.5, tyLow: 1.25 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.36, plates: 0 }, rods: [{ from: [0, 2.15, 0.95], to: 'bar', r: 0.006, color: CABLE }],
      keys: [
        { u: 0, ...STAND, P: [0, -0.03, -0.08], rot: [22, 0, 0], nk: [-10, 0], hL: [0.20, 1.86, 0.60], hR: [-0.20, 1.86, 0.60], eL: [0.6, 1, -0.2], eR: [-0.6, 1, -0.2], pL: [0, -1, 0.3, 1, 0, 0], pR: [0, -1, 0.3, -1, 0, 0] },
        { u: 1, ...STAND, P: [0, -0.03, -0.08], rot: [22, 0, 0], nk: [-10, 0], hL: [0.20, 0.98, 0.30], hR: [-0.20, 0.98, 0.30], eL: [0.4, 0.3, -1], eR: [-0.4, 0.3, -1], pL: [0, -0.4, -1, 1, 0, 0], pR: [0, -0.4, -1, -1, 0, 0] }] },
      items: [{ kind: 'post', h: 2.22, z: 0.98 }] },
    captions: {
      intro: 'De pie frente a la polea alta, tronco algo inclinado y brazos casi estirados',
      reps: [
        ['Lleva la barra hacia los muslos con los brazos casi rectos', 'Vuelve en 2 s hasta arriba'],
        ['El movimiento sale del hombro: los codos no se doblan más', 'Abdomen firme y espalda neutra'],
        ['Aprieta la espalda abajo 1 s', 'Peso moderado'],
      ],
      orbit: ['Barra a los muslos', 'Contracción máxima: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-HOR-001': {
    ...EMP, ...HOR, ...INC_FR, primary: ['Pectoral', 'Deltoides anterior'], name: 'Press de banca inclinado', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: inclineKeys(30) }, items: [{ kind: 'inclineBench', angle: 30 }] },
    captions: {
      intro: 'Banco inclinado a unos 30°, barra sobre la parte alta del pecho',
      reps: [
        ['Baja la barra en 2 s hasta la parte alta del pecho', 'Empuja hasta estirar los brazos'],
        ['Escápulas juntas y apoyadas en el respaldo', 'Codos a 45–60° del cuerpo'],
        ['Más trabajo de la parte superior del pecho', 'Pies firmes en el suelo'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-HOR-002': {
    ...EMP, ...HOR, ...INC_FR, name: 'Press de banca declinado', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: inclineKeys(-15) }, items: [{ kind: 'inclineBench', angle: -15, seatH: 0.50, legHook: true }] },
    captions: {
      intro: 'Banco declinado, piernas sujetas y barra sobre la parte baja del pecho',
      reps: [
        ['Baja la barra en 2 s hasta la parte baja del pecho', 'Empuja hasta estirar los brazos'],
        ['Escápulas juntas y hombros abajo', 'Codos a 45–60° del cuerpo'],
        ['Más trabajo de la parte inferior del pecho', 'Pide ayuda para sacar y dejar la barra'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-HOR-003': {
    ...EMP, ...HOR, ...STAND_FR, name: 'Press de pecho en polea (cable press)', level: 'Principiante', phaseNames: { BAJADA: 'REGRESO', SUBIDA: 'EMPUJE', ARRIBA: 'BRAZOS ESTIRADOS' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L', 'R'], bands: [{ anchor: [0.62, 1.30, -0.55], hand: 'L' }, { anchor: [-0.62, 1.30, -0.55], hand: 'R' }],
      keys: [
        { u: 0, ...STAG, nk: [0, 0], hL: [0.10, 1.30, 0.62], hR: [-0.10, 1.30, 0.62], eL: [1, -0.4, -0.3], eR: [-1, -0.4, -0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...STAG, nk: [0, 0], hL: [0.30, 1.30, 0.12], hR: [-0.30, 1.30, 0.12], eL: [1, -0.4, -0.6], eR: [-1, -0.4, -0.6], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'post', h: 1.40, x: 0.64, z: -0.58 }, { kind: 'post', h: 1.40, x: -0.64, z: -0.58 }] },
    captions: {
      intro: 'De pie entre dos poleas a la altura del pecho, un pie adelantado',
      reps: [
        ['Empuja las asas hacia delante hasta casi juntarlas', 'Vuelve en 2 s controlando'],
        ['Abdomen firme: el tronco no se mueve', 'Codos ligeramente flexionados al final'],
        ['Hombros abajo y atrás', 'Exhala al empujar'],
      ],
      orbit: ['Vuelve controlando', 'Posición de inicio: músculos que trabajan', 'Empuja adelante'],
    },
  },
  'TS-HOR-004': {
    ...EMP, ...HOR, ...PUSH_FR, secondary: ['Tríceps', 'Deltoides anterior', 'Core'], name: 'Flexión de brazos con manos en superficie inestable', level: 'Principiante',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [21, 5].map((th, i) => ({ u: i, ...plankKey(th + 2), ...handsFloor(23, { handY: 0.10 }) })) },
      items: [{ kind: 'pad', x: 0.24, z: 0.52 }, { kind: 'pad', x: -0.24, z: 0.52 }] },
    captions: {
      intro: 'Manos sobre dos superficies inestables, cuerpo recto',
      reps: [
        ['Baja en 2 s sin perder la estabilidad de los hombros', 'Empuja hasta estirar los brazos'],
        ['Los hombros trabajan para mantener las manos quietas', 'Abdomen y glúteos firmes'],
        ['Codos a unos 45° del cuerpo', 'Rango algo menor que en el suelo'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja estable'],
    },
  },
  'TS-HOR-005': {
    ...PULL, ...ROW, ...HOR, name: 'Remo en TRX horizontal', level: 'Principiante',
    frame: { dist: 4.8, ty: 1.10, tz: 0.0, distLow: 4.5, tyLow: 1.05 }, views: { f34: { az: -55, el: 10 }, side: { az: -90, el: 4 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 14 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { free: { type: 'kfPose', hold: 'grip', trx: true, bands: [{ anchor: TRX_A, hand: 'L' }, { anchor: TRX_A, hand: 'R' }], keys: [trxKey(42, 0, TRX_A, false), trxKey(56, 1, TRX_A, true)] },
      items: [{ kind: 'trxAnchor', y: 2.45, z: 0.80 }] },
    captions: {
      intro: 'Cuerpo inclinado hacia atrás sujetando las asas del TRX, brazos estirados',
      reps: [
        ['Tira del pecho hacia las asas llevando los codos atrás', 'Baja en 2 s hasta estirar los brazos'],
        ['Cuerpo recto como una plancha', 'Junta las escápulas arriba'],
        ['Pies más adelante = más difícil', 'Sin dejar caer la cadera'],
      ],
      orbit: ['Pecho a las asas', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-HOR-006': {
    ...PULL, ...ROW, ...HOR, ...STAND_FR, name: 'Remo horizontal con banda', level: 'Principiante', frame: { dist: 4.6, ty: 1.15, tz: 0.30, distLow: 4.3, tyLow: 1.10 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.05, 1.20, 1.0], hand: 'L' }, { anchor: [-0.05, 1.20, 1.0], hand: 'R' }],
      keys: [
        { u: 0, ...STAG, rot: [6, 0, 0], nk: [0, 0], hL: [0.10, 1.18, 0.60], hR: [-0.10, 1.18, 0.60], eL: [0.6, -0.6, 0], eR: [-0.6, -0.6, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...STAG, rot: [2, 0, 0], nk: [0, 0], hL: [0.20, 1.12, 0.12], hR: [-0.20, 1.12, 0.12], eL: [0.4, -0.3, -1], eR: [-0.4, -0.3, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'post', h: 1.26, z: 1.03 }] },
    captions: {
      intro: 'Banda anclada delante a la altura del pecho, un pie adelantado',
      reps: [
        ['Tira de la banda hacia la cintura llevando los codos atrás', 'Vuelve en 2 s estirando los brazos'],
        ['Junta las escápulas al final', 'Tronco quieto, sin echarte atrás'],
        ['Hombros abajo', 'Ajusta la tensión alejándote del anclaje'],
      ],
      orbit: ['Codos atrás', 'Contracción máxima: músculos que trabajan', 'Estira los brazos controlando'],
    },
  },
  'TS-HOR-007': {
    ...EMP, ...HOR, ...STAND_FR, secondary: ['Tríceps', 'Deltoides anterior', 'Core'], name: 'Press horizontal a una mano en polea', level: 'Intermedio',
    phaseNames: { BAJADA: 'REGRESO', SUBIDA: 'EMPUJE', ARRIBA: 'BRAZO ESTIRADO' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L'], bands: [{ anchor: [0.40, 1.30, -0.60], hand: 'L' }],
      keys: [
        { u: 0, ...STAG, L: [0.12, 0.08, -0.28, 10, 6], R: [-0.13, 0.08, 0.22, 0, -6], rot: [4, -6, 0], nk: [0, 6], hL: [0.06, 1.32, 0.62], eL: [1, -0.5, -0.3], pL: [-1, 0, 0, 0, 1, 0], aR: [10, 15, 85] },
        { u: 1, ...STAG, L: [0.12, 0.08, -0.28, 10, 6], R: [-0.13, 0.08, 0.22, 0, -6], rot: [4, 6, 0], nk: [0, -6], hL: [0.26, 1.30, 0.12], eL: [1, -0.5, -0.6], pL: [-1, 0, 0, 0, 1, 0], aR: [10, 15, 85] }] },
      items: [{ kind: 'post', h: 1.40, x: 0.42, z: -0.63 }] },
    captions: {
      intro: 'De espaldas a la polea, asa en una mano a la altura del pecho',
      reps: [
        ['Empuja el asa hacia delante hasta estirar el brazo', 'Vuelve en 2 s controlando'],
        ['El tronco resiste la rotación', 'Abdomen firme y cadera quieta'],
        ['Pie contrario adelantado', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Vuelve controlando', 'Posición de inicio: músculos que trabajan', 'Empuja adelante'],
    },
  },
  'TS-HOR-008': {
    ...PULL, ...ROW, ...HOR, name: 'Remo Gironda (seated cable row)', level: 'Principiante',
    frame: { dist: 4.8, ty: 0.80, tz: 0.35, distLow: 4.5, tyLow: 0.78 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0, 0.32, 1.45], to: 'bar', r: 0.006, color: CABLE }],
      keys: [
        { u: 0, P: [0, 0.48, -0.05], rot: [18, 0, 0], nk: [0, 0], L: [0.14, 0.40, 0.88, -20, 8], R: [-0.14, 0.40, 0.88, -20, -8], kL: [0.1, 1, 0.2], kR: [-0.1, 1, 0.2],
          hL: [0.05, 0.80, 0.72], hR: [-0.05, 0.80, 0.72], eL: [0.6, -0.5, 0], eR: [-0.6, -0.5, 0], pL: [-1, 0, 0, 0, 0.3, 1], pR: [1, 0, 0, 0, 0.3, 1] },
        { u: 1, P: [0, 0.48, -0.05], rot: [-2, 0, 0], sp: [-8, 0, 0], nk: [0, 0], L: [0.14, 0.40, 0.88, -20, 8], R: [-0.14, 0.40, 0.88, -20, -8], kL: [0.1, 1, 0.2], kR: [-0.1, 1, 0.2],
          hL: [0.05, 0.82, 0.18], hR: [-0.05, 0.82, 0.18], eL: [0.4, -0.2, -1], eR: [-0.4, -0.2, -1], pL: [-1, 0, 0, 0, 0.3, 1], pR: [1, 0, 0, 0, 0.3, 1] }] },
      items: [{ kind: 'box', h: 0.38, w: 0.36, d: 0.90, z: 0.10 }, { kind: 'box', h: 0.45, w: 0.50, d: 0.08, z: 0.98 }, { kind: 'post', h: 0.40, z: 1.48 }] },
    captions: {
      intro: 'Sentado con los pies en el apoyo y agarre neutro estrecho',
      reps: [
        ['Tira del agarre hacia el abdomen sacando el pecho', 'Vuelve en 2 s estirando los brazos'],
        ['Junta las escápulas al final del tirón', 'Codos pegados al cuerpo'],
        ['El tronco apenas se mueve', 'Exhala al tirar'],
      ],
      orbit: ['Agarre al abdomen', 'Contracción máxima: músculos que trabajan', 'Estira los brazos controlando'],
    },
  },
  'TS-HOR-009': {
    ...EMP, ...HOR, ...BENCH_FR, name: 'Press de pecho con mancuernas en banco plano', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: benchKeys({ top: 1.10, bot: 0.66, zTop: -0.44, zBot: -0.38, w: 0.24 }).map((k, i) => (i ? { ...k, hL: [0.33, 0.66, -0.38], hR: [-0.33, 0.66, -0.38] } : k)) },
      items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco plano, una mancuerna en cada mano',
      reps: [
        ['Baja las mancuernas en 2 s hasta los lados del pecho', 'Empuja hasta juntarlas arriba'],
        ['Escápulas juntas y apoyadas', 'Antebrazos verticales'],
        ['Codos a 45–60° del cuerpo', 'Pies firmes en el suelo'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
});
