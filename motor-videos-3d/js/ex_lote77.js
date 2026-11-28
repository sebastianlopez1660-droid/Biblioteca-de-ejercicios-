// Lote 77: movilidad de cadera MO-CAD-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const CAD = { ...MOB, sub: 'Movilidad de cadera', primary: ['Movilidad de cadera', 'Glúteos'], secondary: ['Aductores', 'Flexores de cadera'] };
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const QUAD_FR = { frame: { dist: 4.0, ty: 0.45, tz: 0.10, distLow: 3.7, tyLow: 0.43 }, views: { f34: { az: -55, el: 20 }, side: { az: -90, el: 8 }, front: { az: -20, el: 26 }, back34: { az: -140, el: 30 } }, orbit: { view: 'front', sweep: 140 } };
const FLOOR_FR = { frame: { dist: 4.0, ty: 0.30, tz: 0.25, distLow: 3.6, tyLow: 0.30 }, views: { f34: { az: -40, el: 22 }, side: { az: -90, el: 8 }, front: { az: -20, el: 26 }, back34: { az: -140, el: 26 } } };
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0] };
const KNEEL_FR = { frame: { dist: 4.4, ty: 0.70, tz: 0.0, distLow: 4.0, tyLow: 0.66 }, views: { f34: { az: -70, el: 10 }, side: { az: -90, el: 6 }, front: { az: -35, el: 10 }, back34: { az: -140, el: 16 } } };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const KNEEL_BASE = { ...CAD, ...KNEEL_FR, primary: ['Flexores de cadera', 'Cuádriceps'], secondary: ['Glúteos', 'Core'], tempo: { down: 2.5, pause: 1.5, up: 2.5 }, phaseNames: { BAJADA: 'CADERA ADELANTE', SUBIDA: 'VUELVE', ARRIBA: 'INICIO' }, holdLabel: 'ESTIRAMIENTO' };
const ORB = ['Movilidad', 'Movilidad de cadera: músculos que trabajan', 'Vuelve despacio'];

Object.assign(EXERCISES, {
  'MO-CAD-001': {
    ...like('TI-MOV-001', {}), ...CAD, name: 'Movilidad de cadera en posición de sastre (90/90 con inclinación de tronco)', level: 'Principiante',
    captions: {
      intro: 'Sentado en el suelo con las piernas en 90/90',
      reps: [
        ['Inclina el tronco hacia la rodilla delantera con la espalda recta', 'Después cambia las rodillas al otro lado'],
        ['Pecho alto, sin redondear la espalda', 'Las dos rodillas cerca del suelo'],
        ['6–8 cambios por lado', 'Movimiento lento y controlado'],
      ],
      orbit: ORB,
    },
  },
  'MO-CAD-002': {
    ...KNEEL_BASE, name: 'Elevación de rodilla en pared (couch stretch dinámico)', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', arms: 'hips', keys: [
      { u: 0, P: [0, 0.52, -0.06], rot: [14, 0, 0], L: [0.12, 0.075, 0.42, 0, 6], kL: [0.1, 0.3, 1], R: [-0.10, 0.48, -0.66, -70, -4], kR: [0, -1, 0.1] },
      { u: 1, P: [0, 0.55, 0.06], rot: [-2, 0, 0], L: [0.12, 0.075, 0.42, 0, 6], kL: [0.1, 0.3, 1], R: [-0.10, 0.48, -0.66, -70, -4], kR: [0, -1, 0.1] },
    ] }, items: [{ kind: 'mat', z: -0.25, l: 1.2 }, { kind: 'wall', z: -0.74, w: 1.2, h: 1.6 }] },
    captions: {
      intro: 'Rodilla trasera apoyada junto a la pared y empeine contra ella, otro pie delante',
      reps: [
        ['Lleva la cadera adelante y endereza el tronco', 'Vuelve atrás y repite de forma rítmica'],
        ['Glúteo de la pierna trasera apretado', 'Sin arquear la zona lumbar'],
        ['8–10 repeticiones por lado', 'Usa un cojín bajo la rodilla'],
      ],
      orbit: ['Estiramiento', 'Movilidad de cadera: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-CAD-003': {
    ...CAD, ...FLOOR_FR, primary: ['Glúteos', 'Erectores espinales'], secondary: ['Movilidad de cadera'], name: 'Movilidad de cadera con rodillas al pecho en decúbito supino', level: 'Principiante',
    tempo: { down: 2, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'RODILLAS AL PECHO', SUBIDA: 'SUELTA', ARRIBA: 'INICIO' }, holdLabel: 'RODILLAS AL PECHO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, ...SUP, lL: [90, 90, 10, 0], lR: [90, 90, 10, 0], hL: [0.14, 0.50, 0.22], hR: [-0.14, 0.50, 0.22], eL: [0.6, 0, -1], eR: [-0.6, 0, -1], pL: [0, 0, -1, 0, 1, 0], pR: [0, 0, -1, 0, 1, 0] },
      { u: 1, ...SUP, nk: [20, 0], lL: [128, 120, 10, 0], lR: [128, 120, 10, 0], hL: [0.14, 0.42, 0.02], hR: [-0.14, 0.42, 0.02], eL: [0.6, 0, -1], eR: [-0.6, 0, -1], pL: [0, 0, -1, 0, 1, 0], pR: [0, 0, -1, 0, 1, 0] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, manos sobre las rodillas',
      reps: [
        ['Lleva las rodillas hacia el pecho con las manos', 'Suelta un poco y repite'],
        ['La zona lumbar se apoya en el suelo', 'Hombros y cuello relajados'],
        ['10 repeticiones o 30 s mantenido', 'Respira despacio'],
      ],
      orbit: ['Rodillas al pecho', 'Movilidad de cadera: músculos que trabajan', 'Suelta despacio'],
    },
  },
  'MO-CAD-004': {
    ...CAD, ...FLOOR_FR, primary: ['Glúteos', 'Movilidad de cadera'], secondary: ['Isquiotibiales'], name: 'Movilidad de rotación externa de cadera tumbado (figure-4 dinámico)', level: 'Principiante',
    tempo: { down: 2, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'ACERCA', SUBIDA: 'ALEJA', ARRIBA: 'INICIO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, ...SUP, lR: [45, 97, 10, 0], lL: [60, 100, 0, 0, 55], aL: [0, 30, 0], aR: [0, 30, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, ...SUP, lR: [95, 95, 10, 0], lL: [95, 100, 0, 0, 55], aL: [0, 30, 0], aR: [0, 30, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, un tobillo cruzado sobre la rodilla contraria',
      reps: [
        ['Acerca la pierna de apoyo hacia el pecho y vuelve', 'Nota el estiramiento en el glúteo cruzado'],
        ['Empuja suave la rodilla cruzada hacia fuera', 'Cabeza y hombros en el suelo'],
        ['10 repeticiones por lado', 'Movimiento lento'],
      ],
      orbit: ['Estiramiento', 'Movilidad de cadera: músculos que trabajan', 'Aleja despacio'],
    },
  },
  'MO-CAD-005': {
    ...CAD, ...QUAD_FR, primary: ['Aductores', 'Movilidad de cadera'], secondary: ['Glúteos'], name: 'Movilidad de aductores en posición de rana (frog stretch)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 2, up: 2 }, phaseNames: { BAJADA: 'CADERA ATRÁS', SUBIDA: 'ADELANTE', ARRIBA: 'INICIO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, ...QUAD, P: [0, 0.52, 0.05], lL: [90, 92, 0, 42], lR: [90, 92, 0, 42], hL: [0.17, 0.035, 0.50], hR: [-0.17, 0.035, 0.50], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, ...QUAD, P: [0, 0.44, -0.12], rot: [80, 0, 0], lL: [112, 92, 0, 46], lR: [112, 92, 0, 46], hL: [0.17, 0.035, 0.50], hR: [-0.17, 0.035, 0.50], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia con las rodillas muy separadas y los pies hacia fuera',
      reps: [
        ['Lleva la cadera hacia atrás sin juntar las rodillas', 'Vuelve adelante y repite'],
        ['Espalda recta y abdomen activo', 'Nota el estiramiento en la cara interna del muslo'],
        ['10 balanceos o 30 s mantenido', 'Usa cojines bajo las rodillas'],
      ],
      orbit: ['Estiramiento', 'Movilidad de cadera: músculos que trabajan', 'Vuelve adelante'],
    },
  },
  'MO-CAD-006': {
    ...KNEEL_BASE, name: 'Movilidad de cadera con banda en distracción articular', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', arms: 'hips', bands: [{ anchor: [-0.10, 0.50, -1.20], to: 'beltR' }], keys: [
      { u: 0, P: [0, 0.52, -0.06], rot: [10, 0, 0], L: [0.12, 0.075, 0.40, 0, 6], kL: [0.1, 0.3, 1], R: [-0.10, 0.10, -0.42, 70, -6], kR: [0, -1, 0.15] },
      { u: 1, P: [0, 0.55, 0.08], rot: [-2, 0, 0], L: [0.12, 0.075, 0.40, 0, 6], kL: [0.1, 0.3, 1], R: [-0.10, 0.10, -0.42, 70, -6], kR: [0, -1, 0.15] },
    ] }, items: [{ kind: 'mat', z: -0.2, l: 1.2 }, { kind: 'post', h: 0.6, x: -0.10, z: -1.22 }] },
    captions: {
      intro: 'Media rodilla en el suelo, banda anclada detrás rodeando la cadera de la pierna trasera',
      reps: [
        ['La banda tira de la cadera mientras la llevas adelante', 'Glúteo de la pierna trasera apretado'],
        ['Mantén 2–3 s al final', 'Tronco erguido, sin arquear la espalda'],
        ['10 repeticiones por lado', 'Tensión firme pero cómoda'],
      ],
      orbit: ['Cadera adelante', 'Movilidad de cadera: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-CAD-007': {
    ...like('TI-MOV-006', {}), ...CAD, name: 'Circunducción de cadera en cuadrupedia (hip CARs)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 0.5, up: 2.5 },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Dibuja el círculo más amplio posible con la rodilla', 'Adelante, al lado, atrás y vuelta'],
        ['La pelvis y la espalda no se mueven', 'Movimiento muy lento y controlado'],
        ['3–5 círculos por sentido y lado', 'Abdomen activo'],
      ],
      orbit: ORB,
    },
  },
  'MO-CAD-008': {
    ...like('TI-ZAN-009', {}), ...CAD, family: EXERCISES['TI-ZAN-009'].family, primary: ['Flexores de cadera', 'Oblicuos'], secondary: ['Glúteos', 'Cuádriceps'], name: 'Movilidad de flexores de cadera en zancada con rotación de tronco', level: 'Intermedio',
    captions: {
      intro: 'De pie, pies a la anchura de la cadera',
      reps: [
        ['Da una zancada y gira el tronco hacia la pierna delantera', 'Vuelve al centro y sube'],
        ['Rodilla trasera cerca del suelo', 'Nota el estiramiento delante de la cadera trasera'],
        ['6–8 repeticiones por lado', 'Movimiento controlado'],
      ],
      orbit: ORB,
    },
  },
  'MO-CAD-009': {
    ...like('TI-MOV-007', {}), ...CAD, family: 'squat', primary: ['Movilidad de cadera', 'Aductores'], secondary: ['Gastrocnemio y sóleo', 'Erectores espinales'], name: 'Movilidad de cadera en posición de sentadilla profunda asistida (ATG squat)', level: 'Intermedio',
    captions: {
      intro: 'De pie, pies algo más abiertos que la cadera y puntas hacia fuera',
      reps: [
        ['Baja a la sentadilla más profunda posible', 'Codos empujan las rodillas hacia fuera'],
        ['Mantén 20–30 s con el pecho alto', 'Balancea el peso suavemente'],
        ['Usa un apoyo delante si hace falta', 'Sube despacio'],
      ],
      orbit: ORB,
    },
  },
  'MO-CAD-010': {
    ...CAD, primary: ['Flexores de cadera', 'Glúteos'], secondary: ['Isquiotibiales', 'Core'], name: 'Movilidad de cadera en balanceo controlado de pie', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.2, up: 1.2 }, phaseNames: { BAJADA: 'ADELANTE', SUBIDA: 'ATRÁS', ARRIBA: 'ATRÁS' }, holdLabel: 'PIERNA ADELANTE',
    frame: { dist: 4.4, ty: 1.0, tz: 0.0, distLow: 4.2, tyLow: 0.98 }, views: { f34: { az: -75, el: 10 }, side: { az: -90, el: 6 }, front: { az: -40, el: 10 }, back34: { az: -130, el: 14 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', keys: [
      { u: 0, ...STAND, rot: [4, 0, 0], lR: [-24, 18, 10, 0], hL: [0.62, 1.20, 0.0], eL: [0.3, -1, -0.5], pL: [-1, 0, 0, 0, 1, 0], hR: [-0.24, 0.90, 0.05], eR: [-0.3, -1, -0.3], pR: [1, 0, 0, 0, -1, 0] },
      { u: 1, ...STAND, rot: [0, 0, 0], lR: [60, 12, 0, 0], hL: [0.62, 1.20, 0.0], eL: [0.3, -1, -0.5], pL: [-1, 0, 0, 0, 1, 0], hR: [-0.24, 0.90, 0.05], eR: [-0.3, -1, -0.3], pR: [1, 0, 0, 0, -1, 0] },
    ] }, items: [{ kind: 'wall', x: 0.70, ry: -Math.PI / 2, w: 1.4, h: 2.2 }] },
    captions: {
      intro: 'De pie de lado a una pared, una mano apoyada',
      reps: [
        ['Balancea la pierna libre adelante y atrás', 'Amplitud progresiva y controlada'],
        ['Tronco quieto y erguido', 'Pierna de apoyo con la rodilla algo flexionada'],
        ['10–15 balanceos por pierna', 'Después prueba de lado a lado'],
      ],
      orbit: ['Pierna adelante', 'Movilidad de cadera: músculos que trabajan', 'Atrás'],
    },
  },
});
