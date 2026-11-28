// Lote 81: movilidad dinámica MO-DIN-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';
import { plankKey } from './ts_common.js';
import './ex_lote68.js';
import './ex_lote77.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const DIN = { ...MOB, sub: 'Movilidad dinámica', primary: ['Movilidad de cadera', 'Glúteos', 'Oblicuos'], secondary: ['Isquiotibiales', 'Core'] };
const mk = (base, name, level, captions, extra = {}) => ({ ...like(base, {}), ...DIN, family: EXERCISES[base].family, name, level, captions, ...extra });
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const LOW_FR = { frame: { dist: 4.4, ty: 0.70, tz: 0.30, distLow: 4.0, tyLow: 0.62 }, views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 6 }, front: { az: -25, el: 14 }, back34: { az: -140, el: 18 } } };
const ORB = ['Movilidad dinámica', 'Movilidad: músculos que trabajan', 'Vuelve despacio'];
// sentadilla profunda: pies abiertos, rodillas hacia fuera
const DEEP = { P: [0, 0.40, -0.16], rot: [32, 0, 0], nk: [-12, 0], L: [0.21, 0.075, 0.04, 0, 24], R: [-0.21, 0.075, 0.04, 0, -24], kL: [0.5, 0.2, 1], kR: [-0.5, 0.2, 1] };
// zancada baja con la mano derecha en el suelo (world's greatest stretch)
const WGS = { P: [0, 0.44, -0.06], rot: [58, 0, 0], nk: [-10, 0], L: [0.14, 0.075, 0.62, 0, 6], kL: [0.1, 0.3, 1], R: [-0.10, 0.10, -0.62, 70, -6], kR: [0, -1, 0.1] };

Object.assign(EXERCISES, {
  'MO-DIN-001': mk('TI-ZAN-009', 'Zancada con giro de tronco y alcance', 'Principiante', {
    intro: 'De pie, pies a la anchura de la cadera',
    reps: [
      ['Da una zancada y gira el tronco hacia la pierna delantera', 'Alcanza lejos con los brazos'],
      ['Rodilla delantera sobre el pie', 'Vuelve al centro y cambia de pierna'],
      ['6–8 repeticiones por lado', 'Movimiento fluido'],
    ],
    orbit: ORB,
  }),
  'MO-DIN-002': {
    ...DIN, ...LOW_FR, primary: ['Movilidad de cadera', 'Oblicuos'], secondary: ['Aductores', 'Movilidad de hombro'], name: 'Sentadilla profunda con rotación de brazo hacia el techo', level: 'Intermedio',
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: { BAJADA: 'BRAZO AL TECHO', SUBIDA: 'VUELVE', ARRIBA: 'MANOS JUNTAS' }, holdLabel: 'ROTACIÓN',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, ...DEEP, hL: [0.05, 0.78, 0.22], hR: [-0.05, 0.78, 0.22], eL: [1, -0.3, 0.2], eR: [-1, -0.3, 0.2], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
      { u: 1, ...DEEP, sp: [0, 34, -6], nk: [-20, 20], hL: [0.42, 1.55, -0.05], eL: [1, 0, 0], pL: [0, 0, 1, 0, 1, 0], hR: [-0.14, 0.70, 0.30], eR: [-1, -0.3, 0.2], pR: [1, 0, 0, 0, 1, 0] },
    ] } },
    captions: {
      intro: 'En sentadilla profunda, codos por dentro de las rodillas',
      reps: [
        ['Gira el tronco y lleva un brazo hacia el techo', 'Vuelve y cambia de brazo'],
        ['Mirada sigue a la mano', 'Talones en el suelo y pecho alto'],
        ['6–8 repeticiones por lado', 'Movimiento lento'],
      ],
      orbit: ['Rotación', 'Movilidad: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'MO-DIN-003': mk('AG-COO-004', 'Marcha con elevación de rodilla y rotación de tronco', 'Principiante', {
    intro: 'De pie, postura alta',
    reps: [
      ['Sube una rodilla y gira el tronco hacia ella', 'Codo contrario hacia la rodilla'],
      ['Avanza alternando lados', 'Pierna de apoyo estirada'],
      ['10–20 m', 'Ritmo controlado'],
    ],
    orbit: ORB,
  }, { primary: ['Flexores de cadera', 'Oblicuos'], secondary: ['Glúteos', 'Core'] }),
  'MO-DIN-004': mk('MO-CAD-010', 'Balanceo dinámico de pierna en plano frontal (leg swings)', 'Principiante', {
    intro: 'De pie de lado a una pared, una mano apoyada',
    reps: [
      ['Balancea la pierna adelante y atrás con amplitud creciente', 'Tronco quieto'],
      ['Pierna de apoyo con la rodilla algo flexionada', 'Ritmo fluido, sin tirones'],
      ['10–15 balanceos por pierna', 'Ideal en el calentamiento'],
    ],
    orbit: ORB,
  }, { primary: ['Flexores de cadera', 'Isquiotibiales'], secondary: ['Glúteos', 'Core'] }),
  'MO-DIN-005': {
    ...DIN, primary: ['Aductores', 'Glúteo medio'], secondary: ['Core'], name: 'Balanceo dinámico de pierna en plano lateral (leg swings laterales)', level: 'Principiante',
    tempo: { down: 1.1, pause: 0.2, up: 1.1 }, phaseNames: { BAJADA: 'AFUERA', SUBIDA: 'CRUZA', ARRIBA: 'CRUZA' }, holdLabel: 'PIERNA AFUERA',
    frame: { dist: 4.4, ty: 1.0, tz: 0.0, distLow: 4.2, tyLow: 0.98 }, views: { f34: { az: -150, el: 10 }, side: { az: -120, el: 6 }, front: { az: -170, el: 10 }, back34: { az: -150, el: 14 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', keys: [
      { u: 0, ...STAND, rot: [6, 0, 0], lR: [14, 6, 0, -22], hL: [0.24, 1.32, 0.42], hR: [-0.24, 1.32, 0.42], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] },
      { u: 1, ...STAND, rot: [6, 0, 0], lR: [6, 6, 0, 42], hL: [0.24, 1.32, 0.42], hR: [-0.24, 1.32, 0.42], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] },
    ] }, items: [{ kind: 'wall', flip: true, z: 0.50, w: 1.4, h: 2.2 }] },
    captions: {
      intro: 'De frente a una pared, manos apoyadas',
      reps: [
        ['Balancea la pierna de lado: hacia fuera y cruzando por delante', 'Amplitud creciente y controlada'],
        ['Cadera y tronco estables', 'Pierna de apoyo con la rodilla algo flexionada'],
        ['10–15 balanceos por pierna', 'Ideal en el calentamiento'],
      ],
      orbit: ['Pierna afuera', 'Movilidad: músculos que trabajan', 'Cruza por delante'],
    },
  },
  'MO-DIN-006': mk('TI-ZAN-003', 'Zancada lateral con alcance al suelo', 'Principiante', {
    intro: 'De pie, pies juntos',
    reps: [
      ['Da un paso lateral amplio y baja la cadera atrás', 'Alcanza el suelo junto al pie con las manos'],
      ['La pierna contraria queda estirada', 'Pecho alto al subir'],
      ['6–8 repeticiones por lado', 'Movimiento controlado'],
    ],
    orbit: ORB,
  }, { primary: ['Aductores', 'Glúteos', 'Cuádriceps'], secondary: ['Isquiotibiales', 'Core'] }),
  'MO-DIN-007': mk('TS-MHO-001', 'Marcha con círculos de brazo amplios', 'Principiante', {
    intro: 'De pie o caminando despacio, brazos estirados',
    reps: [
      ['Dibuja círculos amplios con los brazos mientras caminas', 'Primero hacia delante, después hacia atrás'],
      ['Brazos estirados y relajados', 'Tronco erguido'],
      ['10–15 círculos por sentido', 'Movimiento fluido'],
    ],
    orbit: ORB,
  }, { primary: ['Movilidad de hombro', 'Deltoides'], secondary: ['Trapecio', 'Core'] }),
  'MO-DIN-008': {
    ...DIN, primary: ['Isquiotibiales', 'Core', 'Deltoides'], secondary: ['Gastrocnemio y sóleo', 'Serrato anterior'], name: 'Inchworm (caminata de oruga con flexión de cadera)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 0.8, up: 2.5 }, phaseNames: { BAJADA: 'MANOS ADELANTE', SUBIDA: 'MANOS ATRÁS', ARRIBA: 'MANOS AL SUELO' }, holdLabel: 'PLANCHA',
    frame: { dist: 5.0, ty: 0.55, tz: 0.55, distLow: 4.6, tyLow: 0.50 }, views: { f34: { az: -70, el: 14 }, side: { az: -90, el: 6 }, front: { az: -40, el: 14 }, back34: { az: -130, el: 18 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.92, -0.08], rot: [118, 0, 0], sp: [12, 0, 0], nk: [-10, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8], kL: [0, 0.2, 1], kR: [0, 0.2, 1], hL: [0.16, 0.035, 0.32], hR: [-0.16, 0.035, 0.32], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, ...plankKey(22, { zA: 0.0 }), hL: [0.17, 0.035, 1.22], hR: [-0.17, 0.035, 1.22], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: 0.55, l: 1.9 }] },
    captions: {
      intro: 'De pie, flexiona la cadera y apoya las manos en el suelo',
      reps: [
        ['Camina con las manos hacia delante hasta la plancha', 'Vuelve caminando con las manos hacia los pies'],
        ['Rodillas lo más estiradas posible', 'Abdomen firme en la plancha'],
        ['5–8 repeticiones', 'Movimiento lento'],
      ],
      orbit: ['Plancha', 'Movilidad: músculos que trabajan', 'Vuelve hacia los pies'],
    },
  },
  'MO-DIN-009': mk('TI-STU-001', 'Escalón dinámico con rotación de tronco (dynamic step-through)', 'Intermedio', {
    intro: 'De pie frente a un escalón o cajón bajo',
    reps: [
      ['Sube al escalón y gira el tronco hacia la pierna de arriba', 'Baja y cambia de pierna'],
      ['Rodilla alineada con el pie', 'Tronco erguido al girar'],
      ['8–10 repeticiones por lado', 'Ritmo controlado'],
    ],
    orbit: ORB,
  }, { primary: ['Glúteos', 'Cuádriceps', 'Oblicuos'], secondary: ['Movilidad de cadera', 'Core'] }),
  'MO-DIN-010': {
    ...DIN, ...LOW_FR, primary: ['Movilidad de cadera', 'Flexores de cadera', 'Oblicuos'], secondary: ['Isquiotibiales', 'Movilidad de hombro'], name: "Movilidad dinámica global (world's greatest stretch)", level: 'Intermedio',
    tempo: { down: 2, pause: 1.2, up: 2 }, phaseNames: { BAJADA: 'BRAZO AL TECHO', SUBIDA: 'MANO AL SUELO', ARRIBA: 'MANOS ABAJO' }, holdLabel: 'ROTACIÓN',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, ...WGS, hL: [0.02, 0.035, 0.52], hR: [-0.16, 0.035, 0.48], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, ...WGS, sp: [0, 44, -4], nk: [-10, 30], hL: [0.40, 1.30, 0.16], eL: [1, 0, 0], pL: [0, 0, 1, 0, 1, 0], hR: [-0.16, 0.035, 0.48], eR: [-0.3, 0, -1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: 0.0, l: 1.9 }] },
    captions: {
      intro: 'En zancada larga, mano contraria apoyada junto al pie delantero',
      reps: [
        ['Gira el tronco y lleva el brazo hacia el techo', 'Vuelve y apoya la mano dentro del pie'],
        ['Rodilla trasera estirada o apoyada', 'Mirada sigue a la mano'],
        ['5 repeticiones por lado', 'Respira en cada giro'],
      ],
      orbit: ['Rotación', 'Movilidad: músculos que trabajan', 'Mano al suelo'],
    },
  },
});
