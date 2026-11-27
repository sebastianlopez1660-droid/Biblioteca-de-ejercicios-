// Lote 37: manguito rotador TS-MRO-012, 013 y escápula TS-ESC-001 … 008
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { PUSH_FR } from './ex_lote21.js';
import { HANG_FR, hangKeys } from './ex_lote22.js';
import { plankKey, handsFloor, shoulderZ } from './ts_common.js';
import './ex_lote23.js';
import './ex_lote36.js';

const MRO = { family: 'free', sub: 'Manguito rotador', primary: ['Manguito rotador'], secondary: ['Deltoides posterior'], tempo: { down: 2, pause: 0.5, up: 2 },
  phaseNames: { BAJADA: 'ROTACIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ROTACIÓN MÁXIMA', labelAll: true };
const ESC = { family: 'free', sub: 'Escápula', primary: ['Serrato anterior', 'Romboides', 'Trapecio medio'], secondary: ['Manguito rotador', 'Core'], tempo: { down: 1.5, pause: 1, up: 1.5 },
  phaseNames: { BAJADA: 'ACTIVACIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'MANTÉN', labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const FRONT_FR = { ...RAISE_FR, frame: { dist: 4.2, ty: 1.15, tz: 0.15, distLow: 4.0, tyLow: 1.10 } };
const SUP = { P: [0, 0.115, 0.10], rot: [-90, 0, 0], sp: [0, 0, 0], nk: [6, 0], lL: [40, 80, 0, 0], lR: [40, 80, 0, 0], aR: [4, 12, 4], pR: [1, 0, 0, 0, -1, 0] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
// plancha alta con manos fijas (protracción / retracción)
const HF = handsFloor(21);
const plus = (u, up, sp) => { const k = plankKey(21); return { u, ...k, P: [k.P[0], k.P[1] + up, k.P[2]], sp: [sp, 0, 0], ...HF }; };
// plancha sobre antebrazos
const FA = (() => { const th = 9, [, sz] = shoulderZ(th); return { th, hands: { hL: [0.14, 0.045, sz + 0.27], hR: [-0.14, 0.045, sz + 0.27], eL: [0.1, -1, -0.4], eR: [-0.1, -1, -0.4], pL: [0, -1, 0, -0.2, 0, 1], pR: [0, -1, 0, 0.2, 0, 1] } }; })();
const faKey = (u, up, sp) => { const k = plankKey(FA.th); return { u, ...k, P: [k.P[0], k.P[1] + up, k.P[2]], sp: [sp, 0, 0], ...FA.hands }; };
// cuadrupedia: rodillas bajo la cadera, manos bajo los hombros (cabeza hacia +z)
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const QUAD_FR = { frame: { dist: 4.0, ty: 0.42, tz: 0.15, distLow: 3.7, tyLow: 0.40 },
  views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 24 }, back34: { az: -140, el: 28 } }, orbit: { view: 'side', sweep: 150 } };
// tumbado boca abajo, cabeza hacia +z
const PRONE = { P: [0, 0.115, 0], rot: [90, 0, 0], sp: [-4, 0, 0], nk: [-8, 0], lL: [0, 2, 40, 2], lR: [0, 2, 40, 2] };
const PRONE_FR = { frame: { dist: 3.9, ty: 0.25, tz: 0.30, distLow: 3.6, tyLow: 0.25 },
  views: { f34: { az: -45, el: 26 }, side: { az: -90, el: 12 }, front: { az: -15, el: 30 }, back34: { az: -150, el: 34 } }, orbit: { view: 'back34', sweep: 120 } };
const YTW_P = (() => {
  const low = (k) => Object.fromEntries(Object.entries(k).map(([n, v]) => [n, n[0] === 'h' ? [v[0], 0.06, v[2]] : v]));
  const Y = { hL: [0.36, 0.20, 1.05], hR: [-0.36, 0.20, 1.05], eL: [1, 0.3, 0], eR: [-1, 0.3, 0], pL: [-1, 0, 0, 0.3, 0, 1], pR: [1, 0, 0, -0.3, 0, 1] };
  const T = { hL: [0.78, 0.20, 0.42], hR: [-0.78, 0.20, 0.42], eL: [0, 1, 0], eR: [0, 1, 0], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] };
  const W = { hL: [0.44, 0.20, 0.55], hR: [-0.44, 0.20, 0.55], eL: [0.6, 0.4, -1], eR: [-0.6, 0.4, -1], pL: [0, 0, 1, 0, 0, 1], pR: [0, 0, 1, 0, 0, 1] };
  return [Y, T, W, Y].map((k) => [{ u: 0, ...PRONE, ...low(k) }, { u: 1, ...PRONE, ...k, sp: [-8, 0, 0], nk: [-4, 0] }]);
})();

Object.assign(EXERCISES, {
  'TS-MRO-012': {
    ...EXERCISES['TS-MRO-011'], name: 'Rotación interna tumbado con mancuerna ligera',
    cfg: { free: { type: 'kfPose', hold: 'db', holdSides: ['L'],
      keys: [
        { u: 0, ...SUP, hL: [0.50, 0.44, -0.36], eL: [1, -0.6, 0], pL: [0, 0, 1, 1, 0, 0] },
        { u: 1, ...SUP, hL: [0.50, 0.20, -0.04], eL: [1, -0.6, 0], pL: [0, -1, 0, 1, 0, 0] }] },
      items: [{ kind: 'mat', z: -0.10, x: 0, l: 1.9 }] },
    captions: {
      intro: 'Tumbado boca arriba, brazo separado a la altura del hombro y codo a 90°',
      reps: [
        ['Lleva la mancuerna hacia delante, en dirección a la cadera', 'Vuelve a la vertical en 2 s'],
        ['El codo queda apoyado en el suelo', 'El hombro no se despega hacia delante'],
        ['Peso muy ligero', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación interna', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-MRO-013': {
    ...MRO, secondary: ['Deltoides'], name: 'Ejercicio pendular de hombro (Codman)', level: 'Avanzado', tempo: { down: 2.5, pause: 0, up: 2.5 },
    phaseNames: { BAJADA: 'PÉNDULO', SUBIDA: 'PÉNDULO', ARRIBA: 'BRAZO COLGANDO' }, holdLabel: 'BRAZO RELAJADO',
    frame: { dist: 4.4, ty: 0.85, tz: 0.20, distLow: 4.1, tyLow: 0.80 }, views: { f34: { az: -50, el: 14 }, side: { az: -90, el: 6 }, front: { az: -15, el: 16 }, back34: { az: -150, el: 20 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'R',
      keys: (() => {
        const B = { P: [0, -0.06, -0.16], rot: [62, 0, 0], sp: [-2, 0, 0], nk: [-24, 0], L: [0.16, 0.08, -0.12, 0, 8], R: [-0.14, 0.08, 0.10, 0, -8],
          hR: [-0.22, 0.80, 0.66], eR: [-0.5, 0.2, -1], pR: [0, -1, 0, 0, 0, 1] };
        const C = (x, z) => ({ ...B, hL: [0.20 + x, 0.36, 0.52 + z], eL: [0.5, 0, -1], pL: [-1, 0, 0, 0, -1, 0] });
        return [{ u: 0, ...C(0, 0.16) }, { u: 0.25, ...C(0.12, 0.10) }, { u: 0.5, ...C(0.16, -0.02) }, { u: 0.75, ...C(0.10, -0.12) }, { u: 1, ...C(-0.02, -0.15) }];
      })() },
      items: [{ kind: 'box', h: 0.78, w: 0.45, d: 0.45, x: -0.24, z: 0.70 }] },
    captions: {
      intro: 'Inclinado hacia delante, una mano apoyada y el otro brazo colgando relajado',
      reps: [
        ['Mueve el cuerpo para que el brazo dibuje círculos pequeños', 'El brazo no hace fuerza: solo cuelga'],
        ['Círculos en un sentido y luego en el otro', 'También puedes balancearlo adelante y atrás'],
        ['Hombro suelto y sin dolor', '30–60 s por serie'],
      ],
      orbit: ['Brazo relajado', 'Péndulo: zona que trabaja', 'Sigue con círculos suaves'],
    },
  },
  'TS-ESC-001': {
    ...ESC, ...PUSH_FR, primary: ['Serrato anterior'], name: 'Push-up plus (protracción escapular)', level: 'Principiante',
    phaseNames: { BAJADA: 'PROTRACCIÓN', SUBIDA: 'RETRACCIÓN', ARRIBA: 'ESCÁPULAS JUNTAS' }, holdLabel: 'ESPALDA REDONDEADA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [plus(0, -0.015, -6), plus(1, 0.02, 8)] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'En posición alta de flexión, brazos estirados y cuerpo recto',
      reps: [
        ['Empuja el suelo y separa las escápulas', 'Vuelve juntándolas sin doblar los codos'],
        ['Los codos no se doblan: solo se mueven las escápulas', 'Cadera y abdomen firmes'],
        ['Movimiento corto y controlado', 'Siente el lateral de las costillas trabajando'],
      ],
      orbit: ['Separa las escápulas', 'Protracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-ESC-002': {
    ...ESC, ...FRONT_FR, primary: ['Trapecio inferior', 'Serrato anterior'], secondary: ['Manguito rotador', 'Romboides'], name: 'Deslizamiento de escápulas en pared (wall slides)', level: 'Principiante',
    phaseNames: { BAJADA: 'SUBIDA', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS EN W' }, holdLabel: 'BRAZOS ARRIBA',
    views: { f34: { az: -35, el: 12 }, side: { az: -90, el: 6 }, front: { az: -10, el: 10 }, back34: { az: -60, el: 10 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L',
      keys: [
        { u: 0, ...STAND, P: [0, -0.04, -0.02], rot: [0, 0, 0], L: [0.12, 0.08, 0.16, 0, 8], R: [-0.12, 0.08, 0.16, 0, -8], hL: [0.42, 1.48, -0.14], hR: [-0.42, 1.48, -0.14], eL: [1, -0.4, -0.2], eR: [-1, -0.4, -0.2], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] },
        { u: 1, ...STAND, P: [0, -0.04, -0.02], rot: [0, 0, 0], L: [0.12, 0.08, 0.16, 0, 8], R: [-0.12, 0.08, 0.16, 0, -8], hL: [0.30, 2.00, -0.13], hR: [-0.30, 2.00, -0.13], eL: [1, 0, -0.2], eR: [-1, 0, -0.2], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] }] },
      items: [{ kind: 'wall', z: -0.20 }] },
    captions: {
      intro: 'De espaldas a la pared, brazos en W con codos y manos apoyados',
      reps: [
        ['Desliza los brazos hacia arriba sin despegarlos de la pared', 'Baja juntando las escápulas'],
        ['Espalda baja pegada a la pared', 'Si las manos se despegan, sube menos'],
        ['Movimiento lento', 'Hombros lejos de las orejas'],
      ],
      orbit: ['Brazos arriba', 'Deslizamiento: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ESC-003': {
    ...ESC, ...FRONT_FR, primary: ['Romboides', 'Trapecio medio'], secondary: ['Deltoides posterior', 'Manguito rotador'], name: 'Retracción escapular con banda (band pull-apart)', level: 'Principiante',
    phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS AL FRENTE' }, holdLabel: 'ESCÁPULAS JUNTAS',
    views: { f34: { az: -35, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 12 }, back34: { az: -150, el: 18 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'hR', hand: 'L' }],
      keys: [
        { u: 0, ...STAND, hL: [0.20, 1.36, 0.62], hR: [-0.20, 1.36, 0.62], eL: [0.5, -1, 0], eR: [-0.5, -1, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, ...STAND, hL: [0.78, 1.38, 0.10], hR: [-0.78, 1.38, 0.10], eL: [0.3, -1, 0], eR: [-0.3, -1, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] } },
    captions: {
      intro: 'De pie, brazos estirados al frente a la altura del pecho sujetando la banda',
      reps: [
        ['Abre los brazos estirando la banda hasta el pecho', 'Vuelve en 2 s'],
        ['Junta las escápulas al final', 'Brazos casi estirados todo el tiempo'],
        ['Hombros abajo, sin encogerlos', 'Tensión ligera y muchas repeticiones'],
      ],
      orbit: ['Escápulas juntas', 'Apertura: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-ESC-004': {
    ...ESC, ...PRONE_FR, primary: ['Trapecio inferior', 'Trapecio medio', 'Romboides'], name: 'Elevación en Y-T-W tumbado prono', level: 'Principiante',
    phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS EN EL SUELO' }, holdLabel: 'MANTÉN ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: YTW_P[0], repKeys: YTW_P }, items: [{ kind: 'mat', z: 0.10, l: 1.9 }] },
    captions: {
      intro: 'Tumbado boca abajo, frente cerca del suelo',
      reps: [
        ['Y: brazos en diagonal por delante, despégalos del suelo', 'Mantén 1 s y baja'],
        ['T: brazos en cruz, junta las escápulas al subir', 'Mantén 1 s y baja'],
        ['W: codos flexionados junto al cuerpo, escápulas abajo', 'Pulgares hacia el techo en todas'],
      ],
      orbit: ['Mantén arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ESC-005': {
    ...ESC, ...PUSH_FR, primary: ['Serrato anterior'], secondary: ['Core', 'Manguito rotador'], name: 'Estabilización escapular en plancha', level: 'Intermedio', tempo: { down: 2, pause: 1.5, up: 2 },
    phaseNames: { BAJADA: 'PROTRACCIÓN', SUBIDA: 'RETRACCIÓN', ARRIBA: 'ESCÁPULAS JUNTAS' }, holdLabel: 'MANTÉN LA PLANCHA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [faKey(0, -0.012, -5), faKey(1, 0.018, 8)] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Plancha sobre antebrazos, codos bajo los hombros',
      reps: [
        ['Empuja el suelo con los antebrazos separando las escápulas', 'Vuelve juntándolas despacio'],
        ['Cuerpo recto: la cadera no sube ni cae', 'Abdomen firme y respiración continua'],
        ['Mantén 2 s en cada posición', 'Cuello en línea con la espalda'],
      ],
      orbit: ['Escápulas separadas', 'Estabilidad: músculos que trabajan', 'Mantén el cuerpo recto'],
    },
  },
  'TS-ESC-006': {
    ...like('TS-TRA-012', {}), sub: 'Escápula', primary: ['Romboides', 'Trapecio medio'], secondary: ['Dorsal ancho', 'Bíceps', 'Manguito rotador'],
    name: 'Remo con retracción escapular consciente', level: 'Intermedio', tempo: { down: 1.5, pause: 1.5, up: 2 }, holdLabel: 'ESCÁPULAS JUNTAS',
    captions: {
      intro: 'Sentado con la banda alrededor de los pies, brazos estirados al frente',
      reps: [
        ['Primero junta las escápulas y después tira con los brazos', 'Mantén 1–2 s y vuelve despacio'],
        ['Piensa en llevar las escápulas hacia atrás y abajo', 'Pecho alto, sin encoger los hombros'],
        ['Al volver, deja que las escápulas se separen', 'Tensión moderada'],
      ],
      orbit: ['Escápulas juntas', 'Retracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-ESC-007': {
    ...ESC, ...QUAD_FR, primary: ['Serrato anterior', 'Romboides'], name: 'Deslizamiento de escápulas en cuadrupedia', level: 'Intermedio',
    phaseNames: { BAJADA: 'RETRACCIÓN', SUBIDA: 'PROTRACCIÓN', ARRIBA: 'ESPALDA REDONDEADA' }, holdLabel: 'ESCÁPULAS JUNTAS',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, ...QUAD, ...QH, P: [0, 0.615, -0.05], sp: [8, 0, 0] }, { u: 1, ...QUAD, ...QH, P: [0, 0.585, -0.05], sp: [-6, 0, 0] }] },
      items: [{ kind: 'mat', z: 0.10, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Deja caer el pecho entre los brazos juntando las escápulas', 'Empuja el suelo separándolas'],
        ['Los codos no se doblan', 'La espalda baja no se mueve'],
        ['Movimiento lento y controlado', 'Cuello relajado, mirada al suelo'],
      ],
      orbit: ['Escápulas juntas', 'Deslizamiento: músculos que trabajan', 'Empuja el suelo'],
    },
  },
  'TS-ESC-008': {
    ...ESC, ...HANG_FR, primary: ['Trapecio inferior', 'Dorsal ancho'], secondary: ['Romboides', 'Antebrazo'], name: 'Dominada activa con retracción escapular (scapular pull-up)', level: 'Intermedio',
    phaseNames: { BAJADA: 'DEPRESIÓN', SUBIDA: 'REGRESO', ARRIBA: 'COLGADO' }, holdLabel: 'HOMBROS ABAJO',
    cfg: { free: { type: 'kfPose', hold: 'grip',
      keys: (() => {
        const h = hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] })[0];
        return [{ ...h, u: 0, shr: 0.05 }, { ...h, u: 1, P: [h.P[0], h.P[1] + 0.06, h.P[2] - 0.02], sp: [-8, 0, 0], nk: [-6, 0], shr: -0.01 }];
      })() },
      items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra con los brazos estirados',
      reps: [
        ['Baja los hombros y junta las escápulas: el cuerpo sube unos centímetros', 'Vuelve a colgar despacio'],
        ['Los codos no se doblan', 'Pecho hacia la barra'],
        ['Mantén 1–2 s arriba', 'Sin balanceos'],
      ],
      orbit: ['Hombros abajo', 'Depresión escapular: músculos que trabajan', 'Vuelve controlando'],
    },
  },
});
