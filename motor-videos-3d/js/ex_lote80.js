// Lote 80: movilidad de muñeca MO-MUN-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';

const MUN = { ...MOB, sub: 'Movilidad de muñeca', primary: ['Flexores del antebrazo', 'Extensores del antebrazo'], secondary: ['Antebrazo'] };
const SEAT_FR = { frame: { dist: 3.4, ty: 0.75, tz: 0.30, distLow: 3.2, tyLow: 0.72 }, views: { f34: { az: -35, el: 20 }, side: { az: -80, el: 10 }, front: { az: -10, el: 18 }, back34: { az: 150, el: 24 } } };
const STAND_FR = { frame: { dist: 3.8, ty: 1.20, tz: 0.15, distLow: 3.6, tyLow: 1.15 }, views: { f34: { az: -45, el: 12 }, side: { az: -85, el: 6 }, front: { az: -15, el: 10 }, back34: { az: -150, el: 16 } } };
const QUAD_FR = { frame: { dist: 3.8, ty: 0.42, tz: 0.15, distLow: 3.5, tyLow: 0.40 }, views: { f34: { az: -55, el: 20 }, side: { az: -90, el: 8 }, front: { az: -20, el: 26 }, back34: { az: -140, el: 30 } } };
// sentado con los antebrazos sobre los muslos y las manos libres más allá de las rodillas
const SEAT = { P: [0, 0.545, -0.02], rot: [24, 0, 0], nk: [14, 0], L: [0.15, 0.075, 0.44, 0, 8], kL: [0.1, 0.2, 1], R: [-0.15, 0.075, 0.44, 0, -8], kR: [-0.1, 0.2, 1],
  hL: [0.15, 0.645, 0.46], hR: [-0.15, 0.645, 0.46], eL: [0.2, -0.3, -1], eR: [-0.2, -0.3, -1] };
const ITEMS_SEAT = [{ kind: 'box', h: 0.45, w: 0.70, d: 0.42, z: -0.06 }];
// orientación de la mano: [normal de la palma, dirección de los dedos] para la izquierda; la derecha se refleja en X
const hand = (palm, fing) => ({ pL: [...palm, ...fing], pR: [-palm[0], palm[1], palm[2], -fing[0], fing[1], fing[2]] });
const N = hand([0, -1, 0], [0, 0, 1]);
const EXT = hand([0, -0.64, 0.77], [0, 0.77, 0.64]);
const FLX = hand([0, -0.5, -0.87], [0, -0.87, 0.5]);
const RAD = hand([0, -1, 0], [-0.6, 0, 0.8]);
const ULN = hand([0, -1, 0], [0.6, 0, 0.8]);
const SUPI = hand([0, 1, 0], [0, 0, 1]);
const NEUT = hand([-1, 0, 0], [0, 0, 1]);
const seatKeys = (seq) => seq.map(([u, h]) => ({ u, ...SEAT, ...h }));
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const ORB = ['Movilidad', 'Movilidad de muñeca: músculos que trabajan', 'Vuelve despacio'];

Object.assign(EXERCISES, {
  'MO-MUN-001': {
    ...MUN, ...SEAT_FR, name: 'Círculos de muñeca (wrist circles)', level: 'Principiante',
    tempo: { down: 1.4, pause: 0, up: 1.4 }, phaseNames: { BAJADA: 'CÍRCULO', SUBIDA: 'CÍRCULO', ARRIBA: 'CÍRCULO' }, holdLabel: 'CÍRCULO COMPLETO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: seatKeys([[0, FLX], [0.25, RAD], [0.5, EXT], [0.75, ULN], [1, FLX]]) }, items: ITEMS_SEAT },
    captions: {
      intro: 'Sentado, antebrazos apoyados en los muslos y manos libres',
      reps: [
        ['Dibuja círculos amplios con las manos', 'Solo se mueven las muñecas'],
        ['Cambia de sentido tras 10 círculos', 'Movimiento lento y completo'],
        ['Ideal antes de apoyos sobre las manos', 'Sin dolor'],
      ],
      orbit: ORB,
    },
  },
  'MO-MUN-002': {
    ...MUN, ...SEAT_FR, name: 'Flexión y extensión activa de muñeca', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.4, up: 1.2 }, phaseNames: { BAJADA: 'FLEXIÓN', SUBIDA: 'EXTENSIÓN', ARRIBA: 'EXTENSIÓN' }, holdLabel: 'FLEXIÓN',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: seatKeys([[0, EXT], [1, FLX]]) }, items: ITEMS_SEAT },
    captions: {
      intro: 'Sentado, antebrazos apoyados en los muslos y palmas hacia abajo',
      reps: [
        ['Sube las manos todo lo posible y después bájalas', 'El antebrazo no se despega del muslo'],
        ['Dedos relajados', 'Recorre todo el rango'],
        ['15–20 repeticiones', 'Movimiento lento'],
      ],
      orbit: ORB,
    },
  },
  'MO-MUN-003': {
    ...MUN, ...STAND_FR, primary: ['Flexores del antebrazo'], secondary: [], name: 'Estiramiento pasivo de flexores de muñeca', level: 'Principiante',
    tempo: { down: 2, pause: 3, up: 2 }, phaseNames: { BAJADA: 'ESTIRA', SUBIDA: 'SUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', keys: [
      { u: 0, ...STAND, hL: [0.16, 1.32, 0.56], eL: [0.3, -1, 0], pL: [0, 1, 0, 0, 0, 1], hR: [-0.24, 0.88, 0.05], eR: [-0.3, -1, -0.3], pR: [1, 0, 0, 0, -1, 0] },
      { u: 1, ...STAND, hL: [0.16, 1.32, 0.58], eL: [0.3, -1, 0], pL: [0, 0.3, 0.95, 0, -0.95, 0.3], hR: [0.12, 1.24, 0.62], eR: [-0.4, -1, 0], pR: [0, 0, -1, 1, 0, 0] },
    ] } },
    captions: {
      intro: 'De pie, un brazo estirado al frente con la palma hacia arriba',
      reps: [
        ['Con la otra mano, lleva los dedos hacia abajo y hacia ti', 'Codo estirado'],
        ['Mantén 20–30 s', 'Nota el estiramiento en la cara interna del antebrazo'],
        ['Cambia de brazo', 'Sin dolor'],
      ],
      orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Suelta despacio'],
    },
  },
  'MO-MUN-004': {
    ...MUN, ...STAND_FR, primary: ['Extensores del antebrazo'], secondary: [], name: 'Estiramiento pasivo de extensores de muñeca', level: 'Principiante',
    tempo: { down: 2, pause: 3, up: 2 }, phaseNames: { BAJADA: 'ESTIRA', SUBIDA: 'SUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', keys: [
      { u: 0, ...STAND, hL: [0.16, 1.32, 0.56], eL: [0.3, -1, 0], pL: [0, -1, 0, 0, 0, 1], hR: [-0.24, 0.88, 0.05], eR: [-0.3, -1, -0.3], pR: [1, 0, 0, 0, -1, 0] },
      { u: 1, ...STAND, hL: [0.16, 1.32, 0.58], eL: [0.3, -1, 0], pL: [0, -0.3, -0.95, 0, -0.95, 0.3], hR: [0.12, 1.34, 0.66], eR: [-0.4, -1, 0], pR: [0, 0, -1, 1, 0, 0] },
    ] } },
    captions: {
      intro: 'De pie, un brazo estirado al frente con la palma hacia abajo',
      reps: [
        ['Con la otra mano, lleva el dorso de la mano hacia ti', 'Codo estirado'],
        ['Mantén 20–30 s', 'Nota el estiramiento en la parte de arriba del antebrazo'],
        ['Cambia de brazo', 'Sin dolor'],
      ],
      orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Suelta despacio'],
    },
  },
  'MO-MUN-005': {
    ...MUN, ...QUAD_FR, primary: ['Flexores del antebrazo', 'Antebrazo'], secondary: ['Deltoides anterior'], name: 'Movilidad de muñeca en apoyo cuadrúpedo (wrist rocking)', level: 'Principiante',
    tempo: { down: 1.8, pause: 1, up: 1.8 }, phaseNames: { BAJADA: 'PESO ADELANTE', SUBIDA: 'ATRÁS', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'PESO SOBRE LAS MANOS',
    cfg: { free: { type: 'kfPose', keys: [{ u: 0, ...QUAD, ...QH }, { u: 1, ...QUAD, ...QH, P: [0, 0.62, 0.08], rot: [86, 0, 0], lL: [76, 92, 0, 0], lR: [76, 92, 0, 0] }] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros con los dedos hacia delante',
      reps: [
        ['Lleva el peso del cuerpo hacia delante sobre las manos', 'Vuelve atrás y repite'],
        ['Palmas completamente apoyadas', 'Prueba con los dedos hacia los lados o hacia atrás'],
        ['10–15 balanceos', 'Sin dolor en la muñeca'],
      ],
      orbit: ['Peso adelante', 'Movilidad de muñeca: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-MUN-006': {
    ...MUN, ...SEAT_FR, name: 'Movilidad de muñeca en desviación radial y cubital', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.4, up: 1.2 }, phaseNames: { BAJADA: 'HACIA EL PULGAR', SUBIDA: 'HACIA EL MEÑIQUE', ARRIBA: 'HACIA EL MEÑIQUE' }, holdLabel: 'DESVIACIÓN',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: seatKeys([[0, ULN], [1, RAD]]) }, items: ITEMS_SEAT },
    captions: {
      intro: 'Sentado, antebrazos apoyados en los muslos y palmas hacia abajo',
      reps: [
        ['Mueve las manos de lado: hacia el pulgar y hacia el meñique', 'El antebrazo no se mueve'],
        ['Recorre todo el rango', 'Dedos estirados y relajados'],
        ['15–20 repeticiones', 'Movimiento lento'],
      ],
      orbit: ORB,
    },
  },
  'MO-MUN-007': {
    ...MUN, ...SEAT_FR, primary: ['Antebrazo', 'Bíceps'], secondary: ['Flexores del antebrazo'], name: 'Movilidad de muñeca en pronación y supinación activa', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.4, up: 1.2 }, phaseNames: { BAJADA: 'PALMAS ARRIBA', SUBIDA: 'PALMAS ABAJO', ARRIBA: 'PALMAS ABAJO' }, holdLabel: 'PALMAS ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: seatKeys([[0, N], [0.5, NEUT], [1, SUPI]]) }, items: ITEMS_SEAT },
    captions: {
      intro: 'Sentado, antebrazos apoyados en los muslos',
      reps: [
        ['Gira las palmas hacia arriba y después hacia abajo', 'El codo y el antebrazo no se desplazan'],
        ['Recorre todo el giro', 'Movimiento lento'],
        ['15–20 repeticiones', 'Progresión: con un martillo o mancuerna ligera'],
      ],
      orbit: ORB,
    },
  },
  'MO-MUN-008': {
    ...MUN, ...STAND_FR, primary: ['Extensores del antebrazo'], secondary: ['Antebrazo'], name: 'Estiramiento de muñeca en flexión con banda', level: 'Intermedio',
    tempo: { down: 2, pause: 3, up: 2 }, phaseNames: { BAJADA: 'ESTIRA', SUBIDA: 'SUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { hands: ['open', 'grip'], free: { type: 'kfPose', relY: 'L', bands: [{ anchor: 'hR', to: 'hL' }], keys: [
      { u: 0, ...STAND, hL: [0.16, 1.30, 0.55], eL: [0.3, -1, 0], pL: [0, -1, 0, 0, 0, 1], hR: [-0.10, 1.10, 0.30], eR: [-0.4, -1, 0], pR: [1, 0, 0, 0, 1, 0] },
      { u: 1, ...STAND, hL: [0.16, 1.30, 0.57], eL: [0.3, -1, 0], pL: [0, -0.3, -0.95, 0, -0.95, 0.3], hR: [-0.06, 1.12, 0.22], eR: [-0.4, -1, 0], pR: [1, 0, 0, 0, 1, 0] },
    ] } },
    captions: {
      intro: 'Brazo estirado al frente, banda sobre el dorso de la mano y sujeta con la otra',
      reps: [
        ['Tira de la banda para llevar la muñeca a flexión', 'Mantén 20–30 s'],
        ['Codo estirado y hombro relajado', 'Tensión progresiva'],
        ['Cambia de brazo', 'Sin dolor'],
      ],
      orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Suelta despacio'],
    },
  },
  'MO-MUN-009': {
    ...MUN, ...QUAD_FR, primary: ['Antebrazo', 'Flexores del antebrazo'], secondary: ['Deltoides anterior'], name: 'Movilidad de muñeca en apoyo sobre los nudillos', level: 'Intermedio',
    tempo: { down: 1.8, pause: 1, up: 1.8 }, phaseNames: { BAJADA: 'PESO ADELANTE', SUBIDA: 'ATRÁS', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'APOYO EN NUDILLOS',
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', keys: [
      { u: 0, ...QUAD, ...QH, hL: [0.17, 0.06, 0.44], hR: [-0.17, 0.06, 0.44] },
      { u: 1, ...QUAD, ...QH, hL: [0.17, 0.06, 0.44], hR: [-0.17, 0.06, 0.44], P: [0, 0.62, 0.05], rot: [87, 0, 0], lL: [80, 92, 0, 0], lR: [80, 92, 0, 0] },
    ] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, apoyado sobre los puños cerrados',
      reps: [
        ['Balancea el peso adelante y atrás sobre los nudillos', 'Muñecas rectas y firmes'],
        ['Apoya en una superficie blanda', 'Aumenta el peso poco a poco'],
        ['10–15 balanceos', 'Sin dolor'],
      ],
      orbit: ['Apoyo en nudillos', 'Movilidad de muñeca: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-MUN-010': {
    ...MUN, ...QUAD_FR, primary: ['Flexores del antebrazo', 'Antebrazo'], secondary: ['Deltoides anterior', 'Tríceps'], name: 'Movilidad de muñeca en extensión bajo carga ligera controlada', level: 'Intermedio',
    tempo: { down: 2, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'CARGA', SUBIDA: 'DESCARGA', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN CON CARGA',
    cfg: { free: { type: 'kfPose', keys: [{ u: 0, ...QUAD, ...QH, P: [0, 0.58, -0.10], rot: [84, 0, 0], lL: [96, 92, 0, 0], lR: [96, 92, 0, 0] }, { u: 1, ...QUAD, ...QH, P: [0, 0.62, 0.14], rot: [84, 0, 0], lL: [70, 92, 0, 0], lR: [70, 92, 0, 0] }] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia con las manos algo por delante de los hombros',
      reps: [
        ['Lleva el peso hacia las manos aumentando la extensión de muñeca', 'Mantén 2–3 s y vuelve'],
        ['Carga controlada: solo hasta notar tensión', 'Codos estirados'],
        ['10 repeticiones', 'Sin dolor'],
      ],
      orbit: ['Extensión con carga', 'Movilidad de muñeca: músculos que trabajan', 'Descarga'],
    },
  },
});
