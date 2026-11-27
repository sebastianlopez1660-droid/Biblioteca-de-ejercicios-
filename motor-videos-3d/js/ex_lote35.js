// Lote 35: antebrazo TS-ANT-005 … 013 y manguito TS-MRO-001
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { HANG_FR, hangKeys } from './ex_lote22.js';
import './ex_lote31.js';
import './ex_lote33.js';
import './ex_lote34.js';

const ANT = { family: 'free', sub: 'Antebrazo', primary: ['Flexores del antebrazo'], secondary: [], tempo: { down: 1, pause: 0.5, up: 1.5 },
  phaseNames: { BAJADA: 'FLEXIÓN DE MUÑECA', SUBIDA: 'BAJADA', ARRIBA: 'MUÑECA ABAJO' }, holdLabel: 'CONTRACCIÓN MÁXIMA', labelAll: true };
const MRO = { family: 'free', sub: 'Manguito rotador', primary: ['Manguito rotador'], secondary: ['Deltoides posterior'], tempo: { down: 2, pause: 0.5, up: 2 },
  phaseNames: { BAJADA: 'ROTACIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ROTACIÓN MÁXIMA', labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SEATW = { P: [0, 0.545, -0.02], rot: [26, 0, 0], nk: [-12, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const WR_FR = { frame: { dist: 3.6, ty: 0.65, tz: 0.30, distLow: 3.4, tyLow: 0.65 }, views: { f34: { az: -55, el: 16 }, side: { az: -90, el: 8 }, front: { az: -25, el: 18 }, back34: { az: -140, el: 22 } }, orbit: { view: 'side', sweep: 140 } };
const FRONT_FR = { ...RAISE_FR, frame: { dist: 4.2, ty: 1.15, tz: 0.15, distLow: 4.0, tyLow: 1.10 } };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const ROT = (u, palm, ax) => ({ u, ...SEATW, hL: [0.16, 0.615, 0.53], eL: [0.3, -1, -0.2], pL: [...palm, ...ax], hR: [-0.18, 0.61, 0.44], eR: [-0.3, -1, -0.2], pR: [0, -1, 0, 0, 0, 1] });

Object.assign(EXERCISES, {
  'TS-ANT-005': {
    ...ANT, ...WR_FR, primary: ['Antebrazo'], name: 'Rotación de muñeca con mancuerna (pronación/supinación)', level: 'Intermedio', tempo: { down: 2, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'PRONACIÓN', SUBIDA: 'SUPINACIÓN', ARRIBA: 'PALMA ARRIBA' }, holdLabel: 'PALMA ABAJO',
    cfg: { hands: ['grip', 'open'], free: { type: 'kfPose', hold: 'db', holdSides: ['L'], dbK: 0.8,
      keys: [ROT(0, [0, 1, 0], [1, 0, 0]), ROT(0.5, [-1, 0, 0], [0, 1, 0]), ROT(1, [0, -1, 0], [-1, 0.2, 0])] }, items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, antebrazo sobre el muslo y mancuerna ligera en la mano',
      reps: [
        ['Gira la palma hacia abajo despacio', 'Vuelve a girarla hacia arriba'],
        ['El antebrazo no se mueve: solo gira la muñeca', 'Sujeta la mancuerna por un extremo para más dificultad'],
        ['Movimiento lento en todo el rango', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Palma abajo', 'Rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-ANT-006': {
    ...ANT, ...RAISE_FR, primary: ['Flexores del antebrazo'], name: 'Curl de antebrazo tras la espalda (reverse wrist curl)', level: 'Intermedio',
    views: { f34: { az: -130, el: 10 }, side: { az: -90, el: 6 }, front: { az: -160, el: 8 }, back34: { az: -30, el: 10 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.24, 0.79, -0.13], hR: [-0.24, 0.79, -0.13], eL: [0.3, 0, 1], eR: [-0.3, 0, 1], pL: [0, -0.2, -1, 1, 0, 0], pR: [0, -0.2, -1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.24, 0.86, -0.19], hR: [-0.24, 0.86, -0.19], eL: [0.3, 0, 1], eR: [-0.3, 0, 1], pL: [0, 0.6, -0.8, 1, 0, 0], pR: [0, 0.6, -0.8, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, barra sujeta por detrás de los muslos con las palmas hacia atrás',
      reps: [
        ['Sube la barra flexionando las muñecas hacia atrás', 'Baja en 2 s'],
        ['Brazos estirados y quietos', 'Solo se mueven las muñecas'],
        ['Peso moderado', 'Muchas repeticiones'],
      ],
      orbit: ['Muñecas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ANT-007': {
    ...ANT, ...FRONT_FR, name: 'Squeeze de dinamómetro (grip trainer)', level: 'Intermedio', tempo: { down: 0.8, pause: 1, up: 1 },
    phaseNames: { BAJADA: 'APRIETA', SUBIDA: 'SUELTA', ARRIBA: 'MANO ABIERTA' }, holdLabel: 'APRIETA FUERTE',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handles: ['L', 'R'],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.20, 1.05, 0.30], hR: [-0.20, 1.05, 0.30], eL: [0.4, -1, -0.3], eR: [-0.4, -1, -0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0], hand: 'open' },
        { u: 0.4, hand: 'grip' }, { u: 1, hand: 'grip' }] } },
    captions: {
      intro: 'De pie, un aparato de agarre en cada mano',
      reps: [
        ['Cierra la mano apretando con todos los dedos', 'Mantén 1 s y suelta despacio'],
        ['Muñeca recta mientras aprietas', 'Brazos relajados'],
        ['Series largas o apretones máximos cortos', 'Trabaja las dos manos por igual'],
      ],
      orbit: ['Aprieta', 'Contracción: músculos que trabajan', 'Suelta controlando'],
    },
  },
  'TS-ANT-008': {
    ...like('TS-ANT-001', {}), name: 'Curl de muñeca en polea baja', level: 'Avanzado',
    cfg: { free: { ...EXERCISES['TS-ANT-001'].cfg.free, barOpts: { half: 0.36, plates: 0 }, rods: [{ from: [0, 0.15, 0.95], to: 'bar', r: 0.006, color: 0xb9bec4 }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }, { kind: 'post', h: 0.22, z: 0.98 }] },
    captions: {
      intro: 'Sentado frente a la polea baja, antebrazos sobre los muslos y palmas arriba',
      reps: [
        ['Sube la barra flexionando solo las muñecas', 'Baja en 2 s'],
        ['El cable mantiene la tensión en todo el recorrido', 'Antebrazos apoyados'],
        ['Peso ligero', 'Muchas repeticiones'],
      ],
      orbit: ['Muñecas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ANT-009': {
    ...ANT, ...FRONT_FR, primary: ['Antebrazo'], secondary: ['Deltoides anterior'], name: 'Rodillo de muñeca (wrist roller)', level: 'Avanzado', tempo: { down: 3, pause: 0.5, up: 3 },
    phaseNames: { BAJADA: 'ENROLLA', SUBIDA: 'DESENROLLA', ARRIBA: 'PESO ABAJO' }, holdLabel: 'PESO ARRIBA',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.24, plates: 0 }, hangPlate: true, cable: true, rods: [{ from: 'bar', to: 'K:hp', r: 0.004, color: 0xe8e2d0 }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.12, 1.30, 0.55], hR: [-0.12, 1.30, 0.55], eL: [0.5, -0.5, 0], eR: [-0.5, -0.5, 0], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0], hp: [0, 0.20, 0.56] },
        { u: 0.25, hL: [0.12, 1.32, 0.53], pL: [0, 0.5, -0.8, 1, 0, 0] }, { u: 0.5, hL: [0.12, 1.30, 0.55], pL: [0, 0, -1, 1, 0, 0], hR: [-0.12, 1.32, 0.53], pR: [0, 0.5, -0.8, -1, 0, 0] },
        { u: 0.75, hL: [0.12, 1.32, 0.53], pL: [0, 0.5, -0.8, 1, 0, 0], hR: [-0.12, 1.30, 0.55], pR: [0, 0, -1, -1, 0, 0] },
        { u: 1, hL: [0.12, 1.30, 0.55], pL: [0, 0, -1, 1, 0, 0], hR: [-0.12, 1.32, 0.53], pR: [0, 0.5, -0.8, -1, 0, 0], hp: [0, 1.05, 0.56] }] } },
    captions: {
      intro: 'De pie, brazos al frente sujetando el rodillo con la cuerda y el peso colgando',
      reps: [
        ['Gira el rodillo alternando las muñecas para enrollar la cuerda', 'Desenróllala despacio hasta abajo'],
        ['Brazos estirados al frente y quietos', 'Movimientos cortos de muñeca'],
        ['El antebrazo arde: es normal', 'Peso ligero'],
      ],
      orbit: ['Peso arriba', 'Enrollado: músculos que trabajan', 'Desenrolla controlando'],
    },
  },
  'TS-ANT-010': {
    ...ANT, ...HANG_FR, primary: ['Antebrazo'], secondary: ['Dorsal ancho', 'Manguito rotador'], name: 'Colgado en barra (dead hang)', level: 'Avanzado', iso: true,
    tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null,
    cfg: { free: { type: 'kfPose', hold: 'grip', keys: [hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] })[0], { ...hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] })[0], u: 1 }] }, items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra con los brazos estirados',
      reps: [
        ['Mantén el agarre el mayor tiempo posible', 'Respira de forma continua'],
        ['Hombros activos: no te hundas del todo', 'Cuerpo quieto, sin balanceos'],
        ['Series de 20–60 s', 'Baja apoyando los pies en un cajón'],
      ],
      orbit: ['Mantén el agarre', 'Colgado: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'TS-ANT-011': {
    ...like('TS-BIC-012', {}), sub: 'Antebrazo', primary: ['Antebrazo', 'Bíceps'], secondary: [], name: 'Curl de antebrazo con toalla en polea', level: 'Avanzado',
    captions: {
      intro: 'De pie frente a la polea baja, una toalla en cada mano',
      reps: [
        ['Sube la toalla flexionando los codos sin soltarla', 'Baja en 2–3 s'],
        ['El agarre de la toalla exige mucho al antebrazo', 'Codos pegados al cuerpo'],
        ['Aprieta fuerte en todo el recorrido', 'Sin balanceos'],
      ],
      orbit: ['Toalla arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ANT-012': {
    ...ANT, ...RAISE_FR, primary: ['Antebrazo'], secondary: ['Trapecio superior'], name: 'Agarre de plato (plate pinch)', level: 'Avanzado', iso: true, tempo: { down: 2, pause: 0, up: 2 },
    phaseNames: null, holdLabel: null,
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', sidePlates: true,
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [2, 10, 6], aR: [2, 10, 6], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
        { u: 1, ...STAND, nk: [0, 0], aL: [2, 10, 6], aR: [2, 10, 6], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] }] } },
    captions: {
      intro: 'De pie, un disco sujeto en cada mano solo con los dedos (pinza)',
      reps: [
        ['Pellizca los discos con el pulgar y los dedos', 'Mantén el agarre 20–40 s'],
        ['Brazos estirados a los lados', 'Hombros atrás y abajo'],
        ['Discos lisos: la superficie hace el ejercicio más difícil', 'Puedes caminar mientras los sujetas'],
      ],
      orbit: ['Mantén la pinza', 'Agarre: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'TS-ANT-013': {
    ...ANT, ...FRONT_FR, primary: ['Extensores del antebrazo'], name: 'Extensión de dedos con banda elástica', level: 'Avanzado', tempo: { down: 1, pause: 1, up: 1.5 },
    phaseNames: { BAJADA: 'ABRE LA MANO', SUBIDA: 'CIERRA', ARRIBA: 'MANO CERRADA' }, holdLabel: 'MANO ABIERTA',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.16, 1.10, 0.32], hR: [-0.16, 1.10, 0.32], eL: [0.4, -1, -0.3], eR: [-0.4, -1, -0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1], hand: 'grip' },
        { u: 0.5, hand: 'open' }, { u: 1, hand: 'open' }] } },
    captions: {
      intro: 'De pie, una goma alrededor de los dedos de cada mano',
      reps: [
        ['Abre los dedos contra la goma todo lo que puedas', 'Mantén 1 s y cierra despacio'],
        ['Muñeca recta', 'Movimiento lento y controlado'],
        ['Compensa el trabajo de agarre', 'Series de 15–25 repeticiones'],
      ],
      orbit: ['Mano abierta', 'Extensión: músculos que trabajan', 'Cierra despacio'],
    },
  },
  'TS-MRO-001': {
    ...MRO, ...FRONT_FR, primary: ['Manguito rotador'], name: 'Rotación externa de hombro con banda', level: 'Principiante',
    views: { f34: { az: -35, el: 20 }, side: { az: -80, el: 12 }, front: { az: -10, el: 24 }, back34: { az: 160, el: 22 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [-0.60, 1.00, 0.30], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [6, 4, 90], pL: [-1, 0, 0, 0, 1, 0], aR: [6, 8, 6] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.52, 1.02, 0.14], eL: [0, -1, 0], pL: [0, 0, 1, 0, 1, 0], aR: [6, 8, 6] }] },
      items: [{ kind: 'post', h: 1.06, x: -0.62, z: 0.30 }] },
    captions: {
      intro: 'De pie, codo pegado al costado a 90° y banda anclada al lado contrario',
      reps: [
        ['Gira el antebrazo hacia fuera sin despegar el codo', 'Vuelve en 2 s'],
        ['El codo queda fijo junto al cuerpo', 'Puedes poner una toalla entre codo y costado'],
        ['Tensión ligera: es un músculo pequeño', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
});
