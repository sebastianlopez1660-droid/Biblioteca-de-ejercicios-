// Lote 31: trapecio TS-TPZ-004 … 013
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { WALK } from './ex_lote12.js';
import { HANG_FR } from './ex_lote22.js';
import './ex_lote23.js';
import './ex_lote30.js';

const TPZ = { sub: 'Trapecio' };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SHRUG = { family: 'free', primary: ['Trapecio superior'], secondary: ['Antebrazo'], tempo: { down: 1, pause: 1, up: 1.5 },
  phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'HOMBROS ABAJO' }, holdLabel: 'HOMBROS ARRIBA', labelAll: true };
const UPR = { family: 'free', primary: ['Trapecio superior', 'Deltoides medio'], secondary: ['Bíceps', 'Deltoides anterior'], tempo: { down: 1.5, pause: 0.5, up: 2 },
  phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ABAJO' }, holdLabel: 'CODOS ARRIBA', labelAll: true };
const like = (code, extra) => ({ ...EXERCISES[code], ...TPZ, ...extra });
const upright = (w) => [
  { u: 0, ...STAND, nk: [0, 0], hL: [w, 0.80, 0.11], hR: [-w, 0.80, 0.11], eL: [0.6, 0, -0.4], eR: [-0.6, 0, -0.4], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0] },
  { u: 1, ...STAND, nk: [0, 0], hL: [w, 1.32, 0.14], hR: [-w, 1.32, 0.14], eL: [1, 0.7, -0.2], eR: [-1, 0.7, -0.2], pL: [0, -0.4, -1, 1, 0, 0], pR: [0, -0.4, -1, -1, 0, 0], shr: 0.02 },
];

Object.assign(EXERCISES, {
  'TS-TPZ-004': like('TS-TRA-010', { primary: ['Trapecio medio', 'Deltoides posterior'], secondary: ['Romboides', 'Manguito rotador'], name: 'Face pull con énfasis en trapecio medio', level: 'Intermedio' }),
  'TS-TPZ-005': {
    ...UPR, ...TPZ, ...RAISE_FR, name: 'Remo al cuello (upright row)', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', keys: upright(0.13) } },
    captions: {
      intro: 'De pie, barra delante de los muslos con agarre algo más estrecho que los hombros',
      reps: [
        ['Tira de la barra hacia arriba pegada al cuerpo, codos por delante', 'Baja en 2 s hasta estirar los brazos'],
        ['Los codos suben más que las manos', 'Para a la altura del pecho si molesta el hombro'],
        ['Tronco quieto, sin balanceo', 'Agarre algo más ancho = más cómodo para el hombro'],
      ],
      orbit: ['Codos arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-006': {
    ...SHRUG, ...TPZ, ...RAISE_FR, name: 'Encogimientos con banda elástica', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'aL', hand: 'L' }, { anchor: 'aR', hand: 'R' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [2, 8, 6], aR: [2, 8, 6], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], shr: 0 },
        { u: 1, ...STAND, nk: [0, 0], aL: [2, 8, 6], aR: [2, 8, 6], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], shr: 0.075 }] } },
    captions: {
      intro: 'De pie sobre la banda, extremos en las manos y brazos estirados',
      reps: [
        ['Sube los hombros hacia las orejas contra la banda', 'Mantén 1 s y baja controlando'],
        ['Brazos estirados', 'Movimiento vertical, sin círculos'],
        ['Cuello relajado', 'Ajusta la tensión pisando más banda'],
      ],
      orbit: ['Hombros arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-007': {
    ...TPZ, ...WALK, family: 'free', primary: ['Trapecio superior', 'Antebrazo'], secondary: ['Core', 'Glúteos'], name: "Farmer's carry con énfasis en trapecio", level: 'Intermedio',
    tempo: { down: 2, pause: 0, up: 2 }, frame: { dist: 4.8, ty: 0.92, tz: 0.0, distLow: 4.2, tyLow: 0.90 },
    cfg: { free: { type: 'gait', carry: 'both', shr: 0.04, stepLen: 0.50, stepTime: 0.55, lift: 0.07 } },
    captions: {
      intro: 'De pie con una carga pesada en cada mano',
      reps: [
        ['Camina con pasos cortos y firmes', 'Hombros ligeramente elevados y atrás'],
        ['Brazos estirados junto al cuerpo', 'Tronco erguido y abdomen firme'],
        ['Tramos de 20–40 m', 'Mirada al frente'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Hombros firmes hasta el final'],
    },
  },
  'TS-TPZ-008': {
    ...SHRUG, ...TPZ, ...RAISE_FR, name: 'Encogimientos en polea baja', level: 'Intermedio', frame: { dist: 4.8, ty: 1.10, tz: 0.15, distLow: 4.5, tyLow: 1.05 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.40, plates: 0 }, rods: [{ from: [0, 0.15, 0.48], to: 'bar', r: 0.006, color: 0xb9bec4 }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.22, 0.80, 0.12], hR: [-0.22, 0.80, 0.12], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0], shr: 0 },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.22, 0.875, 0.12], hR: [-0.22, 0.875, 0.12], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0], shr: 0.075 }] },
      items: [{ kind: 'post', h: 0.22, z: 0.50 }] },
    captions: {
      intro: 'De pie frente a la polea baja, barra delante de los muslos',
      reps: [
        ['Sube los hombros hacia las orejas', 'Mantén 1 s y baja controlando'],
        ['El cable mantiene la tensión en todo el recorrido', 'Brazos estirados'],
        ['Cuello relajado', 'Recorrido completo'],
      ],
      orbit: ['Hombros arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-009': like('TS-DEL-012', { name: 'Y-raise con mancuernas ligeras', level: 'Intermedio' }),
  'TS-TPZ-010': {
    ...SHRUG, ...TPZ, ...RAISE_FR, name: 'Encogimientos con barra tras la espalda', level: 'Intermedio',
    views: { f34: { az: -130, el: 10 }, side: { az: -90, el: 6 }, front: { az: -160, el: 8 }, back34: { az: -30, el: 10 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.24, 0.80, -0.15], hR: [-0.24, 0.80, -0.15], eL: [0.3, 0, 1], eR: [-0.3, 0, 1], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0], shr: 0 },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.24, 0.875, -0.15], hR: [-0.24, 0.875, -0.15], eL: [0.3, 0, 1], eR: [-0.3, 0, 1], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0], shr: 0.075 }] } },
    captions: {
      intro: 'De pie, barra sujeta por detrás de los muslos',
      reps: [
        ['Sube los hombros hacia las orejas', 'Mantén 1 s y baja controlando'],
        ['Con la barra detrás, los hombros van algo hacia atrás', 'Brazos estirados'],
        ['Cuello relajado', 'Recorrido completo'],
      ],
      orbit: ['Hombros arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-011': {
    ...UPR, ...TPZ, ...RAISE_FR, name: 'Remo alto con cuerda en polea', level: 'Intermedio', frame: { dist: 4.8, ty: 1.15, tz: 0.15, distLow: 4.5, tyLow: 1.10 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, bands: [{ anchor: [0, 0.15, 0.48], hand: 'L' }, { anchor: [0, 0.15, 0.48], hand: 'R' }], keys: upright(0.07) },
      items: [{ kind: 'post', h: 0.22, z: 0.50 }] },
    captions: {
      intro: 'De pie frente a la polea baja con la cuerda en las manos',
      reps: [
        ['Tira de la cuerda hacia el pecho con los codos altos', 'Baja en 2 s hasta estirar los brazos'],
        ['Los codos suben por encima de las manos', 'Tronco quieto'],
        ['Separa un poco las manos arriba', 'Peso moderado'],
      ],
      orbit: ['Codos arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-012': { ...EXERCISES['TS-TPZ-001'], ...TPZ, name: 'Encogimientos isométricos con pausa', level: 'Intermedio', tempo: { down: 1, pause: 4, up: 1.5 },
    phaseNames: { BAJADA: 'ELEVACIÓN', PAUSA: 'PAUSA ISOMÉTRICA', SUBIDA: 'BAJADA', ARRIBA: 'HOMBROS ABAJO' }, holdLabel: 'PAUSA ISOMÉTRICA',
    captions: {
      intro: 'De pie, barra colgando delante de los muslos',
      reps: [
        ['Sube los hombros y mantén 4 s arriba', 'Baja controlando'],
        ['Durante la pausa, aprieta sin mover el cuello', 'Brazos estirados'],
        ['Respira de forma controlada', 'Peso que puedas sostener sin perder la postura'],
      ],
      orbit: ['Mantén arriba', 'Pausa isométrica: músculos que trabajan', 'Baja controlando'],
    } },
  'TS-TPZ-013': {
    ...SHRUG, ...TPZ, ...HANG_FR, primary: ['Trapecio inferior', 'Dorsal ancho'], secondary: ['Romboides', 'Antebrazo'], name: 'Elevación escapular en dominada (scapular pull-up)', level: 'Principiante',
    phaseNames: { BAJADA: 'DEPRESIÓN ESCAPULAR', SUBIDA: 'REGRESO', ARRIBA: 'COLGADO' }, holdLabel: 'ESCÁPULAS ABAJO',
    cfg: { free: { type: 'kfPose', hold: 'grip',
      keys: [
        { u: 0, P: [0, 1.14, -0.02], rot: [3, 0, 0], nk: [0, 0], lL: [18, 55, 25, 0], lR: [18, 55, 25, 0], hL: [0.31, 2.25, 0], hR: [-0.31, 2.25, 0], eL: [1, -0.3, 0.1], eR: [-1, -0.3, 0.1], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0], shr: 0.06 },
        { u: 1, P: [0, 1.20, -0.03], rot: [1, 0, 0], sp: [-4, 0, 0], nk: [-4, 0], lL: [18, 55, 25, 0], lR: [18, 55, 25, 0], hL: [0.31, 2.25, 0], hR: [-0.31, 2.25, 0], eL: [1, -0.3, 0.1], eR: [-1, -0.3, 0.1], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0], shr: -0.01 }] },
      items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra con los brazos estirados',
      reps: [
        ['Baja los hombros alejándolos de las orejas', 'El cuerpo sube unos centímetros sin doblar los codos'],
        ['Mantén 1 s y vuelve a colgar controlando', 'Brazos estirados todo el tiempo'],
        ['Base para dominadas y salud del hombro', 'Sin balanceos'],
      ],
      orbit: ['Escápulas abajo', 'Contracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
});
