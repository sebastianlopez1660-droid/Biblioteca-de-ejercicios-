// Lote 28: espalda TS-ESP-001 … 010
import { EXERCISES } from './exercises.js';
import { HCFG } from './exercises.js';
import { PULL } from './ex_lote22.js';
import './ex_lote23.js';
import './ex_lote24.js';

const ESP = { sub: 'Espalda' };
const ROW = { phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA' };
const CABLE = 0xb9bec4;
const SIDEFR = { frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 } };
const like = (code, extra) => ({ ...EXERCISES[code], ...ESP, ...extra });
const HINGE_ROW = (hands) => [
  { u: 0, P: [0, -0.07, -0.14], rot: [48, 0, 0], sp: [-4, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8], ...hands[0] },
  { u: 1, P: [0, -0.07, -0.14], rot: [46, 0, 0], sp: [-6, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8], ...hands[1] },
];
const LOWROW = (one) => {
  const base = { P: [0, 0.48, -0.05], L: [0.14, 0.40, 0.88, -20, 8], R: [-0.14, 0.40, 0.88, -20, -8], kL: [0.1, 1, 0.2], kR: [-0.1, 1, 0.2] };
  return [
    { u: 0, ...base, rot: [16, 8, 0], nk: [0, 0], hL: [0.04, 0.80, 0.72], eL: [0.6, -0.5, 0], pL: [-1, 0, 0, 0, 0.3, 1], aR: [20, 12, 40] },
    { u: 1, ...base, rot: [0, -14, 0], sp: [-6, -8, 0], nk: [0, 8], hL: [0.18, 0.84, 0.14], eL: [0.4, -0.2, -1], pL: [-1, 0, 0, 0, 0.3, 1], aR: [20, 12, 40] },
  ];
};

Object.assign(EXERCISES, {
  'TS-ESP-001': like('TS-TRA-006', { name: 'Remo a una mano con mancuerna en banco', level: 'Principiante' }),
  'TS-ESP-002': like('TS-TRA-013', { name: 'Pull-over recto en polea alta', level: 'Principiante' }),
  'TS-ESP-003': like('TS-TRA-008', { name: 'Remo Gironda con agarre estrecho', level: 'Principiante' }),
  'TS-ESP-004': {
    ...PULL, ...ESP, primary: ['Erectores espinales'], secondary: ['Glúteos', 'Isquiotibiales'], name: 'Extensión de espalda en banco romano (hiperextensión)', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EXTENSIÓN', ARRIBA: 'CUERPO ALINEADO' }, holdLabel: 'POSICIÓN BAJA', labelAll: true,
    frame: { dist: 4.6, ty: 0.80, tz: 0.05, distLow: 4.3, tyLow: 0.75 }, views: { f34: { az: -60, el: 10 }, side: { az: -90, el: 4 }, front: { az: -30, el: 12 }, back34: { az: -150, el: 20 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.80, 0.06], rot: [45, 0, 0], sp: [-4, 0, 0], nk: [-4, 0], L: [0.10, 0.17, -0.56, -30, 6], R: [-0.10, 0.17, -0.56, -30, -6], kL: [0, -1, 0.3], kR: [0, -1, 0.3], aL: [40, -25, 135], aR: [40, -25, 135], pL: [-0.3, 0, -1, -1, 0, 0], pR: [0.3, 0, -1, 1, 0, 0] },
        { u: 1, P: [0, 0.80, 0.06], rot: [108, 0, 0], sp: [22, 0, 0], nk: [12, 0], L: [0.10, 0.17, -0.56, -30, 6], R: [-0.10, 0.17, -0.56, -30, -6], kL: [0, -1, 0.3], kR: [0, -1, 0.3], aL: [40, -25, 135], aR: [40, -25, 135], pL: [-0.3, 0, -1, -1, 0, 0], pR: [0.3, 0, -1, 1, 0, 0] }] },
      items: [{ kind: 'romanChair' }] },
    captions: {
      intro: 'Caderas sobre el apoyo, tobillos sujetos y cuerpo en línea',
      reps: [
        ['Baja el tronco flexionando la cadera en 2 s', 'Sube hasta alinear el cuerpo con las piernas'],
        ['Arriba, sin pasar de la línea del cuerpo', 'Brazos cruzados sobre el pecho'],
        ['Movimiento controlado, sin impulso', 'Aprieta glúteos al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube hasta la línea'],
    },
  },
  'TS-ESP-005': {
    ...PULL, ...ROW, ...ESP, ...SIDEFR, secondary: ['Bíceps', 'Romboides', 'Trapecio medio'], name: 'Remo con barra en agarre supino', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar',
      keys: HINGE_ROW([{ hL: [0.21, 0.62, 0.25], hR: [-0.21, 0.62, 0.25], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] },
        { hL: [0.21, 0.90, 0.16], hR: [-0.21, 0.90, 0.16], eL: [0.2, 0.3, -1], eR: [-0.2, 0.3, -1], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] }]) } },
    captions: {
      intro: 'Tronco inclinado, barra con las palmas hacia delante al ancho de hombros',
      reps: [
        ['Tira de la barra hacia el ombligo', 'Baja en 2 s hasta estirar los brazos'],
        ['Codos pegados al cuerpo', 'Espalda neutra: el tronco no sube'],
        ['Más trabajo de la parte baja del dorsal y del bíceps', 'Junta las escápulas arriba'],
      ],
      orbit: ['Barra al ombligo', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ESP-006': {
    ...PULL, ...ROW, ...ESP, ...SIDEFR, secondary: ['Bíceps', 'Romboides', 'Erectores espinales'], name: 'Remo con banda en bisagra de cadera', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'aL', hand: 'L' }, { anchor: 'aR', hand: 'R' }],
      keys: HINGE_ROW([{ hL: [0.20, 0.62, 0.22], hR: [-0.20, 0.62, 0.22], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { hL: [0.22, 0.92, 0.14], hR: [-0.22, 0.92, 0.14], eL: [0.3, 0.3, -1], eR: [-0.3, 0.3, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] }]) } },
    captions: {
      intro: 'De pie sobre la banda, tronco inclinado y espalda neutra',
      reps: [
        ['Tira de la banda hacia la cintura', 'Baja en 2 s hasta estirar los brazos'],
        ['Mantén la bisagra de cadera durante toda la serie', 'Codos hacia atrás, cerca del cuerpo'],
        ['Junta las escápulas arriba', 'Abdomen firme'],
      ],
      orbit: ['Codos atrás', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ESP-007': {
    ...ESP, family: 'squat', primary: ['Erectores espinales', 'Isquiotibiales'], secondary: ['Glúteos', 'Core'], name: 'Buenos días con foco postural', level: 'Intermedio',
    tempo: { down: 3, pause: 1, up: 2 }, frame: { tz: -0.05, dist: 4.8 }, views: { side: { az: -70, el: 8 } },
    cfg: { ...HCFG, arms: 'clasp', leanBot: 58, hipBottom: 0.905 },
    captions: {
      intro: 'De pie, manos juntas al pecho y espalda neutra',
      reps: [
        ['Lleva la cadera atrás inclinando el tronco en 3 s', 'Sube en 2 s extendiendo la cadera'],
        ['La espalda no se redondea en ningún momento', 'Rodillas ligeramente flexionadas'],
        ['Baja solo hasta notar los isquiotibiales', 'Peso ligero: el foco es la postura'],
      ],
      orbit: ['Inclina con la espalda recta', 'Posición baja: músculos que trabajan', 'Sube extendiendo la cadera'],
    },
  },
  'TS-ESP-008': {
    ...PULL, ...ROW, ...ESP, ...SIDEFR, name: 'Remo unilateral en polea baja', level: 'Intermedio', frame: { dist: 4.8, ty: 0.80, tz: 0.35, distLow: 4.5, tyLow: 0.78 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L'], cable: true, bands: [{ anchor: [0.04, 0.32, 1.45], hand: 'L' }], keys: LOWROW(true) },
      items: [{ kind: 'box', h: 0.38, w: 0.36, d: 0.90, z: 0.10 }, { kind: 'box', h: 0.45, w: 0.50, d: 0.08, z: 0.98 }, { kind: 'post', h: 0.40, z: 1.48 }] },
    captions: {
      intro: 'Sentado frente a la polea baja, asa en una mano y brazo estirado',
      reps: [
        ['Tira del asa hacia la cadera girando ligeramente el tronco', 'Vuelve en 2 s estirando el brazo'],
        ['El codo pasa pegado al cuerpo', 'Junta la escápula al final'],
        ['Pecho arriba durante todo el recorrido', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Asa a la cadera', 'Contracción máxima: músculos que trabajan', 'Estira controlando'],
    },
  },
  'TS-ESP-009': {
    ...PULL, ...ESP, primary: ['Erectores espinales'], secondary: ['Glúteos', 'Trapecio medio', 'Deltoides posterior'], name: 'Superman (extensor de espalda)', level: 'Principiante',
    tempo: { down: 1.5, pause: 2, up: 1.5 }, phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'TUMBADO' }, holdLabel: 'MANTÉN ARRIBA', labelAll: true,
    frame: { dist: 4.2, ty: 0.30, tz: 0.15, distLow: 3.9, tyLow: 0.30 }, views: { f34: { az: -55, el: 22 }, side: { az: -90, el: 10 }, front: { az: -25, el: 24 }, back34: { az: -150, el: 28 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.115, 0], rot: [90, 0, 0], sp: [0, 0, 0], nk: [-4, 0], lL: [0, 2, 40, 2], lR: [0, 2, 40, 2], aL: [172, 14, 4], aR: [172, 14, 4], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.115, 0], rot: [88, 0, 0], sp: [-20, 0, 0], nk: [-14, 0], lL: [-18, 2, 40, 2], lR: [-18, 2, 40, 2], aL: [192, 14, 4], aR: [192, 14, 4], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.10, l: 2.0 }] },
    captions: {
      intro: 'Boca abajo, brazos estirados al frente y piernas estiradas',
      reps: [
        ['Eleva a la vez brazos, pecho y piernas unos centímetros', 'Mantén 2 s y baja controlando'],
        ['Mirada al suelo: el cuello no se dobla hacia atrás', 'Aprieta glúteos y espalda'],
        ['Elevación pequeña y sin tirones', 'Respira durante la pausa'],
      ],
      orbit: ['Mantén arriba', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ESP-010': {
    ...PULL, ...ROW, ...ESP, name: 'Remo con mancuernas en banco inclinado (chest supported row)', level: 'Principiante',
    frame: { dist: 4.6, ty: 0.70, tz: 0.10, distLow: 4.3, tyLow: 0.68 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 14 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { free: { type: 'kfPose', hold: 'db',
      keys: [
        { u: 0, P: [0, 0.57, -0.06], rot: [55, 0, 0], nk: [-20, 0], L: [0.15, 0.08, -0.80, 15, 8], R: [-0.15, 0.08, -0.80, 15, -8], kL: [0, 0, 1], kR: [0, 0, 1], hL: [0.20, 0.24, 0.36], hR: [-0.20, 0.24, 0.36], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.57, -0.06], rot: [55, 0, 0], nk: [-20, 0], L: [0.15, 0.08, -0.80, 15, 8], R: [-0.15, 0.08, -0.80, 15, -8], kL: [0, 0, 1], kR: [0, 0, 1], hL: [0.22, 0.64, 0.18], hR: [-0.22, 0.64, 0.18], eL: [0.4, 0.4, -1], eR: [-0.4, 0.4, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'inclineBench', angle: 35, ry: Math.PI }] },
    captions: {
      intro: 'Pecho apoyado en un banco inclinado, una mancuerna en cada mano',
      reps: [
        ['Tira de las mancuernas hacia la cadera', 'Baja en 2 s hasta estirar los brazos'],
        ['El pecho no se despega del banco', 'Junta las escápulas arriba'],
        ['Sin impulso de la espalda baja', 'Codos cerca del cuerpo'],
      ],
      orbit: ['Mancuernas a la cadera', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
});
