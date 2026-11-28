// Lote 74: AG-PER-011 y movilidad de tobillo MO-TOB-001 … 006, 008 … 010
import { EXERCISES } from './exercises.js';
import { AG_CONES } from './ex_lote66.js';
import { PER } from './ex_lote73.js';
import { course } from './course.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
export const MOB = { family: 'free', labelAll: true, primary: ['Gastrocnemio y sóleo'], secondary: ['Tibial anterior'] };
const TOB = { ...MOB, sub: 'Movilidad de tobillo' };
const SEAT = { P: [0, 0.545, -0.02], rot: [-2, 0, 0], nk: [6, 0], R: [-0.14, 0.075, 0.44, 0, -8], kR: [-0.1, 0.2, 1] };
const circ = (u, plant, rotY) => ({ u, ...SEAT, lL: [84, 14, plant, 0, rotY] });

Object.assign(EXERCISES, {
  'AG-PER-011': {
    ...PER, name: 'Ejercicio de agilidad reactiva en juego reducido (small-sided game drill)', level: 'Avanzado',
    cfg: { free: { ...course([{ d: 0.9, v: 3.8, yaw: 30 }, { d: 0.7, v: 2.6, shuf: -1 }, { d: 0.9, v: 4.6, yaw: -50 }, { d: 0.6, v: 2.8, yaw: -50, back: true }, { d: 1.1, v: 5.2, yaw: 20 }]), cones: AG_CONES } },
    captions: {
      intro: 'Juego reducido en un espacio pequeño marcado con conos',
      reps: [
        ['Reacciona a compañeros y oponentes con cambios constantes', 'Sprint, frenada, lateral y hacia atrás'],
        ['Decide rápido: lee el juego antes de moverte', 'Cadera baja en los cambios'],
        ['Partidos cortos de 1–2 min', 'Recupera entre partidos'],
      ],
      orbit: ['Juego reducido', 'Agilidad perceptiva: músculos que trabajan', 'Vuelve a la posición'],
    },
  },
  'MO-TOB-001': {
    ...TOB, name: 'Círculos de tobillo (ankle circles)', level: 'Principiante',
    tempo: { down: 1.6, pause: 0, up: 1.6 }, phaseNames: { BAJADA: 'CÍRCULO', SUBIDA: 'CÍRCULO', ARRIBA: 'CÍRCULO' }, holdLabel: 'CÍRCULO COMPLETO',
    frame: { dist: 4.0, ty: 0.62, tz: 0.25, distLow: 3.6, tyLow: 0.60 }, views: { f34: { az: -35, el: 14 }, side: { az: -80, el: 8 }, front: { az: -10, el: 12 }, back34: { az: 145, el: 22 } },
    cfg: { free: { type: 'kfPose', arms: 'hips', keys: [circ(0, -25, 0), circ(0.25, 0, 14), circ(0.5, 25, 0), circ(0.75, 0, -14), circ(1, -25, 0)] },
      items: [{ kind: 'box', h: 0.45, w: 0.70, d: 0.42, z: -0.06 }] },
    captions: {
      intro: 'Sentado, una pierna estirada con el pie en el aire',
      reps: [
        ['Dibuja círculos amplios con la punta del pie', 'Solo se mueve el tobillo'],
        ['Cambia de sentido tras 10 círculos', 'Movimiento lento y completo'],
        ['Repite con la otra pierna', 'Sin dolor durante todo el rango'],
      ],
      orbit: ['Círculos', 'Movilidad de tobillo: músculos que trabajan', 'Cambia de sentido'],
    },
  },
  'MO-TOB-002': {
    ...like('TI-MOV-008', {}), ...TOB, name: 'Movilidad de tobillo en apoyo de rodillas (ankle rocking)', level: 'Principiante',
    cfg: { free: { ...EXERCISES['TI-MOV-008'].cfg.free, bandAnkle: undefined } },
    captions: {
      intro: 'Con una rodilla en el suelo y el otro pie delante',
      reps: [
        ['Lleva la rodilla delantera hacia delante, sobre la punta del pie', 'El talón no se despega del suelo'],
        ['Vuelve atrás y repite de forma rítmica', 'Rodilla en línea con el segundo dedo'],
        ['10–15 balanceos por lado', 'Sin dolor en la parte delantera del tobillo'],
      ],
      orbit: ['Rodilla adelante', 'Movilidad de tobillo: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-TOB-003': {
    ...like('TI-MOV-008', {}), ...TOB, name: 'Deslizamiento de tobillo con banda de distracción articular', level: 'Intermedio',
    captions: {
      intro: 'Media rodilla en el suelo, banda anclada detrás rodeando el tobillo delantero',
      reps: [
        ['La banda tira del tobillo hacia atrás mientras llevas la rodilla adelante', 'El talón queda apoyado'],
        ['Mantén 2 s al final del recorrido', 'Rodilla en línea con el pie'],
        ['10–15 repeticiones por lado', 'Tensión de banda firme pero cómoda'],
      ],
      orbit: ['Rodilla adelante', 'Movilidad de tobillo: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-TOB-004': {
    ...like('TI-PAN-005', {}), ...TOB, name: 'Movilidad de tobillo en step o superficie elevada', level: 'Principiante',
    tempo: { down: 2.5, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'TALONES ABAJO', SUBIDA: 'SUBE', ARRIBA: 'PUNTILLAS' }, holdLabel: 'TALONES ABAJO',
    cfg: { arms: 'hips', free: { type: 'calf', stepH: 0.15, minPitch: -24, maxPitch: 8 }, items: [{ kind: 'box', h: 0.15, w: 0.62, d: 0.40, z: 0.30 }] },
    captions: {
      intro: 'De pie en el borde de un escalón, solo la punta de los pies apoyada',
      reps: [
        ['Deja bajar los talones por debajo del escalón', 'Sube despacio hasta la posición neutra'],
        ['Mantén 2 s abajo notando el estiramiento', 'Rodillas estiradas'],
        ['Sujétate a una pared si lo necesitas', '10–15 repeticiones'],
      ],
      orbit: ['Talones abajo', 'Movilidad de tobillo: músculos que trabajan', 'Sube despacio'],
    },
  },
  'MO-TOB-005': {
    ...like('TI-TIB-001', {}), ...TOB, name: 'Bombeo activo de tobillo (flexión plantar y dorsal alternada)', level: 'Principiante', primary: ['Tibial anterior', 'Gastrocnemio y sóleo'], secondary: [],
    tempo: { down: 1.0, pause: 0.2, up: 1.0 },
    cfg: { free: { ...EXERCISES['TI-TIB-001'].cfg.free, single: undefined, band: undefined, pitchB: 32, pitchT: -26 }, items: [{ kind: 'mat', z: 0.35, l: 1.6 }] },
    captions: {
      intro: 'Sentado con las piernas estiradas',
      reps: [
        ['Lleva las puntas de los pies hacia ti y después estíralas lejos', 'Movimiento rítmico y completo'],
        ['Solo se mueven los tobillos', 'Piernas relajadas sobre el suelo'],
        ['20–30 repeticiones', 'Útil para activar la circulación'],
      ],
      orbit: ['Puntas hacia ti', 'Movilidad de tobillo: músculos que trabajan', 'Puntas lejos'],
    },
  },
  'MO-TOB-006': {
    ...like('TI-MOV-007', {}), ...TOB, family: 'squat', primary: ['Gastrocnemio y sóleo'], secondary: ['Movilidad de cadera', 'Aductores'], name: 'Movilidad de tobillo en cuclillas profundas con talones apoyados', level: 'Intermedio',
    captions: {
      intro: 'De pie, pies algo más abiertos que la cadera',
      reps: [
        ['Baja a cuclillas profundas sin despegar los talones', 'Lleva las rodillas hacia delante y fuera'],
        ['Balancea el peso suavemente sobre cada tobillo', 'Pecho alto y manos juntas delante'],
        ['Mantén 20–30 s', 'Si los talones se levantan, apoya una cuña'],
      ],
      orbit: ['Cuclillas profundas', 'Movilidad de tobillo: músculos que trabajan', 'Sube despacio'],
    },
  },
  'MO-TOB-008': {
    ...like('TI-MOV-003', {}), ...TOB, family: 'squat', name: 'Movilidad de tobillo en cadena cerrada (rodilla sobre la punta del pie)', level: 'Intermedio',
    cfg: { ...EXERCISES['TI-MOV-003'].cfg, items: [] },
    captions: {
      intro: 'De pie con un pie adelantado, manos en la cadera',
      reps: [
        ['Lleva la rodilla delantera más allá de la punta del pie', 'El talón no se despega del suelo'],
        ['Vuelve y repite de forma controlada', 'Rodilla alineada con el segundo dedo'],
        ['10–15 repeticiones por lado', 'Aumenta el rango poco a poco'],
      ],
      orbit: ['Rodilla adelante', 'Movilidad de tobillo: músculos que trabajan', 'Vuelve atrás'],
    },
  },
  'MO-TOB-009': {
    ...like('TI-PAN-003', {}), ...TOB, name: 'Movilidad de tobillo en apoyo unipodal', level: 'Intermedio', secondary: ['Estabilizadores de tobillo'],
    tempo: { down: 2, pause: 1, up: 2 },
    captions: {
      intro: 'De pie sobre una pierna, con apoyo ligero en una pared si hace falta',
      reps: [
        ['Sube de puntillas y baja despacio con control', 'Recorre todo el rango del tobillo'],
        ['Rodilla de apoyo estable, sin irse hacia dentro', 'Pelvis nivelada'],
        ['10–12 repeticiones por lado', 'Movimiento lento'],
      ],
      orbit: ['Arriba', 'Movilidad de tobillo: músculos que trabajan', 'Baja despacio'],
    },
  },
  'MO-TOB-010': {
    ...like('TI-PAN-005', {}), ...TOB, primary: ['Gastrocnemio y sóleo'], secondary: [], name: 'Estiramiento de gastrocnemio en escalón (pasivo)', level: 'Principiante',
    tempo: { down: 3, pause: 3, up: 2 }, phaseNames: { BAJADA: 'TALONES ABAJO', SUBIDA: 'SUBE', ARRIBA: 'NEUTRO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { arms: 'hips', free: { type: 'calf', stepH: 0.15, minPitch: -26, maxPitch: -2 }, items: [{ kind: 'box', h: 0.15, w: 0.62, d: 0.40, z: 0.30 }] },
    captions: {
      intro: 'De pie en el borde de un escalón, piernas estiradas',
      reps: [
        ['Deja caer los talones por debajo del escalón', 'Mantén el estiramiento 20–30 s'],
        ['Rodillas estiradas para el gastrocnemio', 'Respira y relaja la pantorrilla'],
        ['Sube suavemente al terminar', 'Sin rebotes'],
      ],
      orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Sube suavemente'],
    },
  },
});
