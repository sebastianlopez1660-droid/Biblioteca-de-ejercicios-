// Lote 76: movilidad de columna MO-COL-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const COL = { ...MOB, sub: 'Movilidad de columna', primary: ['Erectores espinales', 'Oblicuos'], secondary: ['Core'] };
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const QUAD_FR = { frame: { dist: 4.0, ty: 0.45, tz: 0.10, distLow: 3.7, tyLow: 0.43 }, views: { f34: { az: -70, el: 16 }, side: { az: -90, el: 8 }, front: { az: -30, el: 22 }, back34: { az: -140, el: 28 } }, orbit: { view: 'side', sweep: 120 } };
const FLOOR_FR = { frame: { dist: 4.0, ty: 0.30, tz: 0.15, distLow: 3.6, tyLow: 0.30 }, views: { f34: { az: -60, el: 18 }, side: { az: -90, el: 8 }, front: { az: -30, el: 20 }, back34: { az: -140, el: 26 } } };
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0] };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8] };
const catCow = (cow, cat) => [
  { u: 0, ...QUAD, ...QH, sp: [cow, 0, 0], nk: [-24, 0] },
  { u: 1, ...QUAD, ...QH, sp: [cat, 0, 0], nk: [18, 0] },
];
// brazos en cruz que giran con el tronco (giro θ en grados alrededor del eje vertical)
const tArms = (th) => {
  const t = th * Math.PI / 180, c = Math.cos(t), s = Math.sin(t), R = 0.78;
  return { hL: [R * c, 1.40, -R * s], hR: [-R * c, 1.40, R * s], eL: [0, -1, 0], eR: [0, -1, 0], pL: [0, -1, 0, c, 0, -s], pR: [0, -1, 0, -c, 0, s] };
};

Object.assign(EXERCISES, {
  'MO-COL-001': {
    ...like('TS-MHO-005', {}), ...COL, primary: ['Oblicuos', 'Erectores espinales'], secondary: ['Romboides', 'Deltoides posterior'], name: 'Movilidad torácica en cuadrupedia con rotación (thread the needle torácico)', level: 'Principiante',
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Pasa un brazo por debajo del otro girando la parte alta de la espalda', 'Vuelve y abre el brazo hacia el techo'],
        ['La cadera no se mueve: gira desde el tórax', 'Mirada sigue a la mano'],
        ['8–10 repeticiones por lado', 'Respira al girar'],
      ],
      orbit: ['Rotación torácica', 'Movilidad de columna: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'MO-COL-002': {
    ...COL, ...QUAD_FR, primary: ['Erectores espinales', 'Recto abdominal'], secondary: ['Core'], name: 'Gato-camello (cat-cow)', level: 'Principiante',
    tempo: { down: 2, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'ESPALDA REDONDA', SUBIDA: 'ESPALDA HUNDIDA', ARRIBA: 'ESPALDA HUNDIDA' }, holdLabel: 'ESPALDA REDONDA',
    cfg: { free: { type: 'kfPose', keys: catCow(-16, 26) }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Redondea la espalda llevando la barbilla al pecho', 'Después húndela mirando al frente'],
        ['Movimiento lento, vértebra a vértebra', 'Coordina con la respiración'],
        ['10–15 repeticiones', 'Brazos estirados todo el tiempo'],
      ],
      orbit: ['Espalda redonda', 'Movilidad de columna: músculos que trabajan', 'Hunde la espalda'],
    },
  },
  'MO-COL-003': {
    ...COL, ...FLOOR_FR, primary: ['Erectores espinales'], secondary: ['Pectoral', 'Core'], name: 'Movilidad torácica con extensión sobre foam roller', level: 'Intermedio',
    tempo: { down: 2, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'EXTIENDE', SUBIDA: 'VUELVE', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.13, 0.05], rot: [-62, 0, 0], sp: [-4, 0, 0], nk: [24, 0], lL: [68, 90, 10, 0], lR: [68, 90, 10, 0], hL: [-0.06, 0.40, -0.22], hR: [0.06, 0.41, -0.20], eL: [0.8, -0.2, 0.3], eR: [-0.8, -0.2, 0.3], pL: [0, -0.88, -0.47, -1, 0, 0], pR: [0, -0.88, -0.47, 1, 0, 0] },
      { u: 1, P: [0, 0.13, 0.05], rot: [-70, 0, 0], sp: [-22, 0, 0], nk: [-2, 0], lL: [68, 90, 10, 0], lR: [68, 90, 10, 0], hL: [-0.06, 0.36, -0.26], hR: [0.06, 0.37, -0.24], eL: [0.8, -0.2, 0.3], eR: [-0.8, -0.2, 0.3], pL: [0, -0.95, -0.3, -1, 0, 0], pR: [0, -0.95, -0.3, 1, 0, 0] },
    ] }, items: [{ kind: 'mat', z: -0.10, l: 1.6 }, { kind: 'foamRoller', z: -0.30 }] },
    captions: {
      intro: 'Sentado con el rodillo bajo la parte media de la espalda, brazos cruzados sobre el pecho',
      reps: [
        ['Extiende la parte alta de la espalda sobre el rodillo', 'Vuelve sin despegar los glúteos del suelo'],
        ['Cuello relajado y glúteos en el suelo', 'Mueve el rodillo a otra altura tras varias repeticiones'],
        ['Sin extender la zona lumbar', '8–10 repeticiones por nivel'],
      ],
      orbit: ['Extensión torácica', 'Movilidad de columna: músculos que trabajan', 'Vuelve despacio'],
    },
  },
  'MO-COL-004': {
    ...COL, ...FLOOR_FR, primary: ['Oblicuos', 'Erectores espinales'], secondary: ['Glúteos', 'Core'], name: 'Rotación de columna tumbado (windshield wipers)', level: 'Principiante',
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: { BAJADA: 'RODILLAS A UN LADO', SUBIDA: 'AL OTRO LADO', ARRIBA: 'AL OTRO LADO' }, holdLabel: 'ROTACIÓN',
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, ...SUP, sp: [0, 0, 0], rot: [-88, 0, -32], lL: [45, 97, 10, 0], lR: [45, 97, 10, 0], aL: [0, 80, 0], aR: [0, 80, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, ...SUP, sp: [0, 0, 0], rot: [-88, 0, 32], lL: [45, 97, 10, 0], lR: [45, 97, 10, 0], aL: [0, 80, 0], aR: [0, 80, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, rodillas dobladas y brazos en cruz',
      reps: [
        ['Deja caer las rodillas juntas hacia un lado', 'Vuelve al centro y ve al otro lado'],
        ['Los hombros quedan apoyados en el suelo', 'Mirada al techo o al lado contrario'],
        ['10–12 repeticiones por lado', 'Movimiento lento'],
      ],
      orbit: ['Rotación', 'Movilidad de columna: músculos que trabajan', 'Al otro lado'],
    },
  },
  'MO-COL-005': {
    ...COL, ...QUAD_FR, primary: ['Erectores espinales', 'Recto abdominal'], secondary: ['Core'], name: 'Movilidad segmentaria de columna en flexo-extensión (segmental cat-cow)', level: 'Intermedio',
    tempo: { down: 3.5, pause: 1, up: 3.5 }, phaseNames: { BAJADA: 'VÉRTEBRA A VÉRTEBRA', SUBIDA: 'VÉRTEBRA A VÉRTEBRA', ARRIBA: 'ESPALDA HUNDIDA' }, holdLabel: 'ESPALDA REDONDA',
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, ...QUAD, ...QH, sp: [-16, 0, 0], nk: [-24, 0] },
      { u: 0.5, ...QUAD, ...QH, rot: [94, 0, 0], sp: [6, 0, 0], nk: [-6, 0] },
      { u: 1, ...QUAD, ...QH, rot: [98, 0, 0], sp: [28, 0, 0], nk: [20, 0] },
    ] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, columna neutra',
      reps: [
        ['Empieza el movimiento por la pelvis y sube vértebra a vértebra', 'Termina con la cabeza'],
        ['Vuelve en orden inverso, desde la cabeza', 'Muy lento y consciente'],
        ['5–8 repeticiones', 'Respira de forma continua'],
      ],
      orbit: ['Espalda redonda', 'Movilidad de columna: músculos que trabajan', 'Vuelve vértebra a vértebra'],
    },
  },
  'MO-COL-006': {
    ...like('CO-ROT-007', {}), ...COL, primary: ['Oblicuos', 'Erectores espinales'], secondary: ['Core'], name: 'Movilidad torácica sentado con rotación', level: 'Principiante',
    cfg: { ...EXERCISES['CO-ROT-007'].cfg, free: { ...EXERCISES['CO-ROT-007'].cfg.free, ball: undefined, ballAt: undefined } },
    captions: {
      intro: 'Sentado, pies en el suelo y brazos cruzados delante',
      reps: [
        ['Gira el tronco hacia un lado y después al otro', 'La cadera no se mueve'],
        ['Crece hacia arriba antes de girar', 'Mirada acompaña el giro'],
        ['10 repeticiones por lado', 'Movimiento lento'],
      ],
      orbit: ['Rotación torácica', 'Movilidad de columna: músculos que trabajan', 'Al otro lado'],
    },
  },
  'MO-COL-007': {
    ...COL, ...QUAD_FR, primary: ['Erectores espinales', 'Dorsal ancho'], secondary: ['Glúteos'], name: "Estiramiento de columna en postura del niño (child's pose)", level: 'Principiante',
    tempo: { down: 3, pause: 3, up: 2.5 }, phaseNames: { BAJADA: 'ATRÁS', SUBIDA: 'VUELVE', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, ...QUAD, ...QH },
      { u: 1, ...QUAD, P: [0, 0.34, -0.36], rot: [52, 0, 0], sp: [22, 0, 0], nk: [12, 0], lL: [136, 155, 0, 0], lR: [136, 155, 0, 0], hL: [0.18, 0.035, 0.62], hR: [-0.18, 0.035, 0.62], eL: [0.4, 0.3, -1], eR: [-0.4, 0.3, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia sobre una esterilla',
      reps: [
        ['Lleva los glúteos hacia los talones y los brazos lejos', 'Frente hacia el suelo'],
        ['Mantén 20–30 s respirando hacia la espalda', 'Relaja hombros y cuello'],
        ['Vuelve despacio a cuadrupedia', 'Rodillas separadas si hace falta'],
      ],
      orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Vuelve despacio'],
    },
  },
  'MO-COL-008': {
    ...COL, primary: ['Oblicuos', 'Erectores espinales'], secondary: ['Deltoides', 'Core'], name: 'Movilidad torácica de pie con rotación y brazos en cruz', level: 'Principiante',
    tempo: { down: 2, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'GIRA', SUBIDA: 'AL OTRO LADO', ARRIBA: 'AL OTRO LADO' }, holdLabel: 'ROTACIÓN',
    frame: { dist: 4.4, ty: 1.05, tz: 0.0, distLow: 4.2, tyLow: 1.0 }, views: { f34: { az: -30, el: 12 }, side: { az: -90, el: 6 }, front: { az: -10, el: 10 }, back34: { az: -150, el: 16 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', keys: [
      { u: 0, ...STAND, sp: [0, -38, 0], nk: [0, -10], ...tArms(-38) },
      { u: 1, ...STAND, sp: [0, 38, 0], nk: [0, 10], ...tArms(38) },
    ] } },
    captions: {
      intro: 'De pie, pies a la anchura de la cadera y brazos en cruz',
      reps: [
        ['Gira el tronco a un lado y al otro con los brazos en cruz', 'La pelvis mira al frente'],
        ['Los brazos acompañan al tronco', 'Rodillas algo flexionadas'],
        ['10–12 repeticiones por lado', 'Movimiento fluido'],
      ],
      orbit: ['Rotación', 'Movilidad de columna: músculos que trabajan', 'Al otro lado'],
    },
  },
  'MO-COL-009': {
    ...COL, ...QUAD_FR, primary: ['Erectores espinales', 'Dorsal ancho'], secondary: ['Pectoral', 'Tríceps'], name: 'Movilidad torácica en extensión sobre banco (thoracic extension drill)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 2, up: 2 }, phaseNames: { BAJADA: 'PECHO ABAJO', SUBIDA: 'VUELVE', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.58, -0.32], rot: [62, 0, 0], sp: [0, 0, 0], nk: [-8, 0], lL: [100, 95, 0, 0], lR: [100, 95, 0, 0], hL: [0.06, 0.62, 0.18], hR: [-0.06, 0.62, 0.18], eL: [0.14, 0.47, 0.42], eR: [-0.14, 0.47, 0.42], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
      { u: 1, P: [0, 0.50, -0.40], rot: [84, 0, 0], sp: [-22, 0, 0], nk: [-16, 0], lL: [118, 120, 0, 0], lR: [118, 120, 0, 0], hL: [0.06, 0.56, 0.12], hR: [-0.06, 0.56, 0.12], eL: [0.14, 0.47, 0.45], eR: [-0.14, 0.47, 0.45], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
    ] }, items: [{ kind: 'mat', z: -0.3, l: 1.2 }, { kind: 'flatBench', z: 0.30, len: 0.5, ry: Math.PI / 2 }] },
    captions: {
      intro: 'De rodillas frente a un banco, codos apoyados y manos tras la cabeza',
      reps: [
        ['Lleva la cadera atrás y deja caer el pecho hacia el suelo', 'Nota la extensión entre los omóplatos'],
        ['Mantén 2–3 s y vuelve', 'Abdomen activo para no arquear la zona lumbar'],
        ['8–10 repeticiones', 'Respira al bajar'],
      ],
      orbit: ['Extensión torácica', 'Movilidad de columna: músculos que trabajan', 'Vuelve despacio'],
    },
  },
  'MO-COL-010': {
    ...COL, ...FLOOR_FR, primary: ['Erectores espinales'], secondary: ['Recto abdominal'], name: 'Movilidad de columna en postura de la esfinge (sphinx extension)', level: 'Principiante',
    tempo: { down: 2.5, pause: 2.5, up: 2 }, phaseNames: { BAJADA: 'PECHO ARRIBA', SUBIDA: 'BAJA', ARRIBA: 'TUMBADO' }, holdLabel: 'ESFINGE',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.12, 0], rot: [88, 0, 0], nk: [-20, 0], lL: [0, 2, 40, 0], lR: [0, 2, 40, 0], hL: [0.16, 0.035, 0.58], hR: [-0.16, 0.035, 0.58], eL: [0.6, 0, -0.3], eR: [-0.6, 0, -0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, P: [0, 0.12, 0], rot: [84, 0, 0], sp: [-38, 0, 0], nk: [-20, 0], lL: [0, 2, 40, 0], lR: [0, 2, 40, 0], hL: [0.16, 0.035, 0.66], hR: [-0.16, 0.035, 0.66], eL: [0.3, -1, -0.2], eR: [-0.3, -1, -0.2], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: -0.05, l: 1.9 }] },
    captions: {
      intro: 'Boca abajo, antebrazos apoyados bajo los hombros',
      reps: [
        ['Sube el pecho apoyándote en los antebrazos', 'La pelvis queda en el suelo'],
        ['Mantén 20–30 s respirando', 'Hombros lejos de las orejas'],
        ['Baja despacio', 'Sin dolor lumbar'],
      ],
      orbit: ['Esfinge', 'Movilidad de columna: músculos que trabajan', 'Baja despacio'],
    },
  },
});
