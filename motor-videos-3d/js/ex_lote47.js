// Lote 47: flexión CO-FLE-006 … 010 y extensión CO-EXT-001 … 005
import { EXERCISES, HCFG } from './exercises.js';
import './ex_lote28.js';
import './ex_lote43.js';
import './ex_lote44.js';
import { FLE } from './ex_lote46.js';

const EXT = { sub: 'Extensión de tronco', primary: ['Erectores espinales'], secondary: ['Glúteos', 'Isquiotibiales'] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const SUP = { P: [0, 0.115, 0.05], rot: [-90, 0, 0], L: [0.13, 0.08, 0.50, 0, 6], R: [-0.13, 0.08, 0.50, 0, -6], kL: [0.15, 1, 0.2], kR: [-0.15, 1, 0.2] };
const HEAD = { aL: [150, 40, 130], aR: [150, 40, 130], pL: [0, 0, -1, -1, 0, 0], pR: [0, 0, -1, 1, 0, 0] };
const SIDES = { aL: [4, 14, 4], aR: [4, 14, 4], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const SUP_FR = { frame: { dist: 3.9, ty: 0.32, tz: 0.0, distLow: 3.6, tyLow: 0.32 },
  views: { f34: { az: 55, el: 20 }, side: { az: 90, el: 8 }, front: { az: 25, el: 26 }, back34: { az: 140, el: 26 } }, orbit: { view: 'side', sweep: 140 } };
const MAT = [{ kind: 'mat', z: 0.0, l: 1.9 }];

Object.assign(EXERCISES, {
  'CO-FLE-006': {
    ...FLE, ...SUP_FR, secondary: ['Flexores de cadera', 'Oblicuos'], name: 'Sit-up completo', level: 'Intermedio', tempo: { down: 1.5, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'SUBE', SUBIDA: 'BAJA', ARRIBA: 'TUMBADO' }, holdLabel: 'SENTADO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, ...SUP, sp: [0, 0, 0], nk: [4, 0], ...HEAD }, { u: 0.4, ...SUP, rot: [-78, 0, 0], sp: [36, 0, 0], nk: [14, 0], ...HEAD }, { u: 1, ...SUP, P: [0, 0.13, 0.08], rot: [-18, 0, 0], sp: [14, 0, 0], nk: [6, 0], ...HEAD }] },
      items: MAT },
    captions: {
      intro: 'Boca arriba, rodillas flexionadas, pies apoyados y manos junto a la cabeza',
      reps: [
        ['Enrolla el tronco y sube hasta quedar sentado', 'Baja vértebra a vértebra'],
        ['No tires del cuello con las manos', 'Los pies quedan apoyados'],
        ['Exhala al subir', 'Baja despacio, sin dejarte caer'],
      ],
      orbit: ['Sentado', 'Flexión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-FLE-007': {
    ...FLE, ...SUP_FR, secondary: ['Flexores de cadera', 'Oblicuos', 'Cuádriceps'], name: 'V-up', level: 'Avanzado', tempo: { down: 1.2, pause: 0.5, up: 1.8 },
    phaseNames: { BAJADA: 'CIERRA EN V', SUBIDA: 'ABRE', ARRIBA: 'TUMBADO ESTIRADO' }, holdLabel: 'POSICIÓN EN V',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.115, 0.0], rot: [-90, 0, 0], sp: [0, 0, 0], nk: [4, 0], lL: [0, 2, 30, 0], lR: [0, 2, 30, 0], aL: [172, 10, 6], aR: [172, 10, 6], pL: [0, 1, 0, 0, 0, -1], pR: [0, 1, 0, 0, 0, -1] },
        { u: 1, P: [0, 0.13, 0.0], rot: [-48, 0, 0], sp: [14, 0, 0], nk: [10, 0], lL: [88, 4, 30, 0], lR: [88, 4, 30, 0], hL: [0.11, 0.80, 0.42], hR: [-0.11, 0.80, 0.42], eL: [0.6, -1, 0], eR: [-0.6, -1, 0], pL: [-1, 0, 0, 0, 0.4, 1], pR: [1, 0, 0, 0, 0.4, 1] }] },
      items: MAT },
    captions: {
      intro: 'Tumbado boca arriba con brazos y piernas estirados',
      reps: [
        ['Sube a la vez tronco y piernas hasta tocar los pies', 'Baja despacio sin apoyar del todo'],
        ['Piernas estiradas y juntas', 'Equilibrio sobre los glúteos arriba'],
        ['Regresión: flexiona las rodillas', 'Exhala al subir'],
      ],
      orbit: ['Posición en V', 'Contracción: músculos que trabajan', 'Abre controlando'],
    },
  },
  'CO-FLE-008': {
    ...FLE, ...SUP_FR, secondary: ['Flexores de cadera', 'Oblicuos'], name: 'Elevación de piernas tumbado (lying leg raise)', level: 'Avanzado', tempo: { down: 1.5, pause: 0.5, up: 2.5 },
    phaseNames: { BAJADA: 'SUBE LAS PIERNAS', SUBIDA: 'BAJA', ARRIBA: 'PIERNAS ABAJO' }, holdLabel: 'PIERNAS ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, P: [0, 0.115, 0.0], rot: [-90, 0, 0], nk: [4, 0], lL: [8, 2, 30, 0], lR: [8, 2, 30, 0], ...SIDES }, { u: 1, P: [0, 0.12, 0.0], rot: [-96, 0, 0], sp: [-4, 0, 0], nk: [4, 0], lL: [96, 4, 30, 0], lR: [96, 4, 30, 0], ...SIDES }] },
      items: MAT },
    captions: {
      intro: 'Tumbado boca arriba, brazos a los lados y piernas estiradas',
      reps: [
        ['Sube las piernas estiradas hasta la vertical', 'Bájalas en 2–3 s sin tocar el suelo'],
        ['La zona lumbar queda pegada al suelo', 'Baja solo hasta donde la controles'],
        ['Manos bajo los glúteos para facilitarlo', 'Exhala al subir'],
      ],
      orbit: ['Piernas arriba', 'Contracción: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-FLE-009': {
    ...FLE, ...SUP_FR, secondary: ['Oblicuos', 'Flexores de cadera'], name: 'Crunch inverso (reverse crunch)', level: 'Avanzado', tempo: { down: 1.2, pause: 0.8, up: 2 },
    phaseNames: { BAJADA: 'ENROLLA LA PELVIS', SUBIDA: 'BAJA', ARRIBA: 'RODILLAS A 90°' }, holdLabel: 'CADERA DESPEGADA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, P: [0, 0.115, 0.0], rot: [-90, 0, 0], nk: [4, 0], lL: [88, 92, 20, 0], lR: [88, 92, 20, 0], ...SIDES }, { u: 1, P: [0, 0.19, -0.02], rot: [-112, 0, 0], sp: [18, 0, 0], nk: [6, 0], lL: [122, 106, 20, 0], lR: [122, 106, 20, 0], ...SIDES }] },
      items: MAT },
    captions: {
      intro: 'Tumbado boca arriba, rodillas a 90° en el aire y brazos a los lados',
      reps: [
        ['Lleva las rodillas al pecho despegando la cadera del suelo', 'Baja la pelvis despacio'],
        ['El movimiento sale del abdomen, no del impulso', 'Las rodillas mantienen su ángulo'],
        ['Exhala al subir', 'Brazos apoyados para estabilizar'],
      ],
      orbit: ['Cadera despegada', 'Contracción: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-FLE-010': {
    ...FLE, secondary: ['Oblicuos', 'Transverso abdominal'], name: 'Abdominales en balón suizo (Swiss ball crunch)', level: 'Avanzado', tempo: { down: 1.2, pause: 1, up: 2 },
    frame: { dist: 3.9, ty: 0.62, tz: 0.15, distLow: 3.6, tyLow: 0.60 }, views: { f34: { az: 55, el: 16 }, side: { az: 90, el: 6 }, front: { az: 25, el: 20 }, back34: { az: 140, el: 22 } }, orbit: { view: 'side', sweep: 140 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', ball: { r: 0.33 }, ballAt: [0, 0.33, -0.10],
      keys: [
        { u: 0, P: [0, 0.60, 0.10], rot: [-78, 0, 0], sp: [-16, 0, 0], nk: [-6, 0], L: [0.15, 0.08, 0.62, 0, 8], R: [-0.15, 0.08, 0.62, 0, -8], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3], ...HEAD },
        { u: 1, P: [0, 0.60, 0.10], rot: [-70, 0, 0], sp: [26, 0, 0], nk: [12, 0], L: [0.15, 0.08, 0.62, 0, 8], R: [-0.15, 0.08, 0.62, 0, -8], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3], ...HEAD }] } },
    captions: {
      intro: 'Espalda apoyada sobre el balón, pies en el suelo y manos junto a la cabeza',
      reps: [
        ['Enrolla el tronco despegando los hombros del balón', 'Vuelve estirándote sobre el balón'],
        ['El balón no rueda: cadera quieta', 'Más recorrido que en el suelo'],
        ['Exhala al subir', 'Pies separados para estabilizarte'],
      ],
      orbit: ['Hombros arriba', 'Contracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-EXT-001': { ...like('TS-ESP-004', {}), ...EXT, name: 'Hiperextensión lumbar en banco romano', level: 'Principiante' },
  'CO-EXT-002': { ...like('CO-AFL-009', {}), ...EXT, secondary: ['Oblicuos', 'Glúteos'], name: 'Hiperextensión con rotación de tronco', level: 'Principiante' },
  'CO-EXT-003': {
    ...like('TS-ESP-007', {}), ...EXT, name: 'Buenos días con barra (énfasis en erectores)', level: 'Principiante',
    cfg: { ...HCFG, arms: 'bar_high', leanBot: 58, hipBottom: 0.905 },
    captions: {
      intro: 'De pie con la barra apoyada sobre los trapecios',
      reps: [
        ['Lleva la cadera atrás inclinando el tronco con la espalda recta', 'Sube apretando glúteos'],
        ['Rodillas ligeramente flexionadas y fijas', 'Pecho alto: la espalda no se redondea'],
        ['Baja hasta notar los isquiotibiales', 'Peso moderado'],
      ],
      orbit: ['Bisagra abajo', 'Extensión: músculos que trabajan', 'Sube controlando'],
    },
  },
  'CO-EXT-004': {
    ...like('TS-ESP-009', {}), ...EXT, secondary: ['Glúteos', 'Isquiotibiales', 'Trapecio medio'], name: 'Superman con extensión de brazos y piernas', level: 'Intermedio',
    captions: {
      intro: 'Tumbado boca abajo con brazos y piernas estirados',
      reps: [
        ['Eleva brazos y piernas estirándote todo lo posible', 'Mantén 2 s y baja'],
        ['Alarga el cuerpo, no solo lo eleves', 'Mirada al suelo y cuello largo'],
        ['Glúteos apretados', 'Respira durante la pausa'],
      ],
      orbit: ['Mantén arriba', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-EXT-005': {
    ...like('CO-AFL-002', {}), ...EXT, name: 'Extensión lumbar con banda elástica', level: 'Intermedio', tempo: { down: 2, pause: 0.5, up: 2 }, holdLabel: 'BISAGRA ABAJO',
    captions: {
      intro: 'De pie sobre la banda con el otro extremo detrás de la nuca',
      reps: [
        ['Inclina el tronco llevando la cadera atrás', 'Sube extendiendo la cadera contra la banda'],
        ['Espalda recta en todo el recorrido', 'Rodillas ligeramente flexionadas'],
        ['Aprieta glúteos arriba sin arquear la espalda', 'Ritmo controlado'],
      ],
      orbit: ['Bisagra abajo', 'Extensión: músculos que trabajan', 'Sube controlando'],
    },
  },
});
