// Lote 34: tríceps TS-TRI-008 … 013 y antebrazo TS-ANT-001 … 004
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { BENCH_FR, benchKeys } from './ex_lote21.js';
import './ex_lote22.js';
import './ex_lote31.js';
import './ex_lote33.js';

const TRI = { family: 'free', sub: 'Tríceps', primary: ['Tríceps'], secondary: [], tempo: { down: 1.5, pause: 0.5, up: 2 },
  phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'CODOS FLEXIONADOS' }, holdLabel: 'EXTENSIÓN COMPLETA', labelAll: true };
const ANT = { family: 'free', sub: 'Antebrazo', primary: ['Flexores del antebrazo'], secondary: [], tempo: { down: 1, pause: 0.5, up: 1.5 },
  phaseNames: { BAJADA: 'FLEXIÓN DE MUÑECA', SUBIDA: 'BAJADA', ARRIBA: 'MUÑECA ABAJO' }, holdLabel: 'CONTRACCIÓN MÁXIMA', labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SEATW = { P: [0, 0.545, -0.02], rot: [26, 0, 0], nk: [-12, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const OH_FR = { ...RAISE_FR, frame: { dist: 5.0, ty: 1.35, tz: 0.0, distLow: 4.7, tyLow: 1.30 }, views: { f34: { az: -55, el: 10 }, side: { az: -85, el: 6 }, front: { az: -20, el: 8 }, back34: { az: 160, el: 14 } } };
const WR_FR = { frame: { dist: 3.6, ty: 0.65, tz: 0.30, distLow: 3.4, tyLow: 0.65 }, views: { f34: { az: -55, el: 16 }, side: { az: -90, el: 8 }, front: { az: -25, el: 18 }, back34: { az: -140, el: 22 } }, orbit: { view: 'side', sweep: 140 } };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
// muñeca fija sobre la rodilla; la mano rota: ang = 0 mano horizontal, + flexión (palma hacia el antebrazo), − extensión
function wristKey(u, ang, sup, w = 0.16) {
  const a = ang * Math.PI / 180;
  const fing = [0, Math.sin(a), Math.cos(a)];
  const palm = sup ? [0, Math.cos(a), -Math.sin(a)] : [0, -Math.cos(a), Math.sin(a)];
  const k = { u, ...SEATW };
  for (const sd of ['L', 'R']) {
    const sx = sd === 'L' ? 1 : -1, W0 = [sx * w, 0.60, 0.46];
    k['h' + sd] = [W0[0], W0[1] + fing[1] * 0.085 + palm[1] * 0.03, W0[2] + fing[2] * 0.085 + palm[2] * 0.03];
    k['e' + sd] = [sx * 0.3, -1, -0.2];
    k['p' + sd] = [...palm, sx, 0, 0];
  }
  return k;
}

Object.assign(EXERCISES, {
  'TS-TRI-008': {
    ...TRI, ...BENCH_FR, primary: ['Tríceps', 'Pectoral'], secondary: ['Deltoides anterior'], name: 'Press cerrado con barra (close grip bench press)', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: benchKeys({ w: 0.17, zBot: -0.30, bot: 0.68 }).map((k) => ({ ...k, eL: [0.3, -1, 0.5], eR: [-0.3, -1, 0.5] })) }, items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, agarre al ancho de hombros o algo más estrecho',
      reps: [
        ['Baja la barra en 2 s a la parte baja del pecho', 'Empuja hasta estirar los brazos'],
        ['Codos pegados al cuerpo', 'Muñecas rectas sobre los codos'],
        ['Más trabajo de tríceps que el press normal', 'Escápulas juntas'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-TRI-009': {
    ...TRI, ...OH_FR, name: 'Extensión de codo con barra EZ', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EXTENSIÓN', ARRIBA: 'BRAZOS ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.62, plates: 1 },
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.10, 2.03, -0.02], hR: [-0.10, 2.03, -0.02], eL: [0.4, 0.2, 1], eR: [-0.4, 0.2, 1], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.10, 1.60, -0.22], hR: [-0.10, 1.60, -0.22], eL: [0.3, 1, 0.3], eR: [-0.3, 1, 0.3], pL: [0, 1, -0.3, 1, 0, 0], pR: [0, 1, -0.3, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, barra Z sujeta por encima de la cabeza con agarre estrecho',
      reps: [
        ['Baja la barra por detrás de la cabeza flexionando los codos', 'Extiende hasta estirar los brazos'],
        ['Codos apuntando al techo y cerca de la cabeza', 'Abdomen firme'],
        ['Estira bien el tríceps abajo', 'Peso moderado'],
      ],
      orbit: ['Baja detrás de la cabeza', 'Posición baja: músculos que trabajan', 'Extiende los codos'],
    },
  },
  'TS-TRI-010': {
    ...like('TS-EMP-011', {}), ...TRI, primary: ['Tríceps'], secondary: ['Pectoral', 'Deltoides anterior'], name: 'Fondos en paralelas con énfasis en tríceps', level: 'Avanzado',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.8, ty: 1.20, tz: 0.0, distLow: 4.5, tyLow: 1.10 }, views: { f34: { az: -50, el: 8 }, side: { az: -90, el: 4 }, front: { az: -20, el: 8 }, back34: { az: -150, el: 14 } },
    cfg: { free: { type: 'kfPose', hold: 'grip',
      keys: [
        { u: 0, P: [0, 1.20, -0.02], rot: [0, 0, 0], nk: [4, 0], lL: [8, 80, 25, 0], lR: [8, 80, 25, 0], hL: [0.24, 1.135, 0.0], hR: [-0.24, 1.135, 0.0], eL: [0.1, 0, -1], eR: [-0.1, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.92, -0.04], rot: [6, 0, 0], nk: [4, 0], lL: [12, 85, 25, 0], lR: [12, 85, 25, 0], hL: [0.24, 1.135, 0.0], hR: [-0.24, 1.135, 0.0], eL: [0.1, 0.2, -1], eR: [-0.1, 0.2, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'dipBars', h: 1.12, w: 0.24 }] },
    captions: {
      intro: 'Brazos estirados sobre las paralelas, tronco vertical',
      reps: [
        ['Baja en 2 s con el tronco lo más vertical posible', 'Empuja hasta estirar los brazos'],
        ['Codos hacia atrás y pegados al cuerpo', 'Baja hasta unos 90° de codo'],
        ['Hombros abajo', 'Sin balancear las piernas'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-TRI-011': {
    ...TRI, ...RAISE_FR, name: 'Extensión de codo con banda elástica', level: 'Principiante', frame: { dist: 4.8, ty: 1.20, tz: 0.15, distLow: 4.5, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.04, 2.0, 0.40], hand: 'L' }, { anchor: [-0.04, 2.0, 0.40], hand: 'R' }],
      keys: EXERCISES['TS-TRI-002'].cfg.free.keys },
      items: [{ kind: 'post', h: 2.05, z: 0.42 }] },
    captions: {
      intro: 'Banda anclada en alto delante de ti, un extremo en cada mano',
      reps: [
        ['Empuja hacia abajo hasta estirar los codos', 'Sube en 2 s hasta 90°'],
        ['Codos pegados al cuerpo y quietos', 'Tronco algo inclinado'],
        ['La tensión crece al final: aprieta 1 s', 'Ajusta la tensión alejándote del anclaje'],
      ],
      orbit: ['Codos estirados', 'Extensión completa: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-TRI-012': {
    ...TRI, ...BENCH_FR, primary: ['Tríceps'], secondary: ['Pectoral'], name: 'Press JM (JM press)', level: 'Avanzado',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: benchKeys({ w: 0.17, zTop: -0.44, zBot: -0.56, bot: 0.74 }).map((k, i) => ({ ...k, eL: i ? [0.2, -0.3, 1] : [0.3, -1, 0.4], eR: i ? [-0.2, -0.3, 1] : [-0.3, -1, 0.4] })) },
      items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, agarre cerrado y barra sobre los hombros',
      reps: [
        ['Baja la barra hacia la barbilla llevando los codos hacia delante', 'Empuja hasta estirar los brazos'],
        ['Mezcla de press cerrado y press francés', 'Codos apuntando a los pies abajo'],
        ['Peso moderado y recorrido controlado', 'Muñecas firmes'],
      ],
      orbit: ['Baja hacia la barbilla', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-TRI-013': {
    ...TRI, ...OH_FR, name: 'Extensión de codo unilateral con mancuerna', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EXTENSIÓN', ARRIBA: 'BRAZO ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    cfg: { hands: ['grip', 'open'], free: { type: 'kfPose', relY: 'L', hold: 'db', holdSides: ['L'],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.15, 2.03, -0.02], eL: [0.3, 0.2, 1], pL: [-1, 0, 0, 0, 0, 1], aR: [10, 14, 80] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.02, 1.60, -0.20], eL: [0.2, 1, 0.3], pL: [-1, 0, 0, 0, 0, 1], aR: [10, 14, 80] }] } },
    captions: {
      intro: 'De pie con una mancuerna en una mano por encima de la cabeza',
      reps: [
        ['Baja la mancuerna por detrás de la cabeza', 'Extiende hasta estirar el brazo'],
        ['El codo apunta al techo y no se abre', 'La otra mano puede sujetar el codo'],
        ['Peso moderado', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Baja detrás de la cabeza', 'Posición baja: músculos que trabajan', 'Extiende el codo'],
    },
  },
  'TS-ANT-001': {
    ...ANT, ...WR_FR, name: 'Curl de muñeca con barra', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.62, plates: 1 }, keys: [wristKey(0, -45, true), wristKey(1, 55, true)] }, items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, antebrazos sobre los muslos y palmas hacia arriba',
      reps: [
        ['Sube la barra flexionando solo las muñecas', 'Baja en 2 s dejando que la barra ruede a los dedos'],
        ['Los antebrazos no se despegan de los muslos', 'Movimiento corto y controlado'],
        ['Peso ligero', 'Muchas repeticiones'],
      ],
      orbit: ['Muñecas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ANT-002': {
    ...ANT, ...WR_FR, primary: ['Extensores del antebrazo'], name: 'Extensión de muñeca con barra', level: 'Principiante',
    phaseNames: { BAJADA: 'EXTENSIÓN DE MUÑECA', SUBIDA: 'BAJADA', ARRIBA: 'MUÑECA ABAJO' },
    cfg: { free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.62, plates: 1 }, keys: [wristKey(0, -45, false), wristKey(1, 40, false)] }, items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, antebrazos sobre los muslos y palmas hacia abajo',
      reps: [
        ['Sube la barra extendiendo las muñecas', 'Baja en 2 s'],
        ['Los antebrazos no se mueven', 'Peso muy ligero: los extensores son pequeños'],
        ['Útil para prevenir molestias en el codo', 'Recorrido completo'],
      ],
      orbit: ['Muñecas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ANT-003': {
    ...ANT, ...WR_FR, name: 'Curl de muñeca con mancuerna', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: [wristKey(0, -45, true, 0.18), wristKey(1, 55, true, 0.18)] }, items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, antebrazos sobre los muslos y una mancuerna en cada mano',
      reps: [
        ['Sube las mancuernas flexionando solo las muñecas', 'Baja en 2 s'],
        ['Los antebrazos quedan apoyados', 'Movimiento controlado'],
        ['Puedes trabajar un brazo cada vez', 'Peso ligero'],
      ],
      orbit: ['Muñecas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ANT-004': like('TS-TPZ-007', { sub: 'Antebrazo', primary: ['Antebrazo'], secondary: ['Trapecio superior', 'Core'], name: "Farmer's carry (fuerza de agarre)", level: 'Principiante',
    captions: {
      intro: 'De pie con una carga pesada en cada mano',
      reps: [
        ['Camina con pasos firmes apretando fuerte el agarre', 'Brazos estirados junto al cuerpo'],
        ['Hombros atrás y tronco erguido', 'Mirada al frente'],
        ['Tramos de 20–40 m', 'Suelta solo cuando pares'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Agarre firme hasta el final'],
    } }),
});
