// Lote 69: coordinación AG-COO-005 … 011 y escalera AG-ESC-001 … 003
import { EXERCISES } from './exercises.js';
import { AGI, AG_CONES } from './ex_lote66.js';
import { lateral } from './ex_lote67.js';
import { COO, STAND, STAND_FR } from './ex_lote68.js';
import { drillMove } from './ex_lote64.js';
import { LADDER } from './ex_lote63.js';

const ORB_K = ['Coordinación', 'Coordinación: músculos que trabajan', 'Termina suave'];
const ORB_E = ['Pies rápidos', 'Escalera: músculos que trabajan', 'Sal de la escalera'];
export const ESC = { ...AGI, sub: 'Escalera de agilidad', primary: ['Gastrocnemio y sóleo', 'Flexores de cadera'], secondary: ['Cuádriceps', 'Core'] };
// desplazamiento lateral a lo largo de la escalera (cuerpo de lado, avance en +Z)
export const sideLadder = (v, o = {}) => ({ type: 'run', yaw: 90, loop: 7.0, speeds: [[0, 0], [0.5, 0], [0.9, v], [5.6, v], [6.2, 0], [7.0, 0]], shuffles: [[0, -1]],
  ladder: LADDER, leans: [[0, 10], [7.0, 10]], dys: [[0, -0.08], [7.0, -0.08]], widths: [[0, 0.17], [7.0, 0.17]], ...o });

Object.assign(EXERCISES, {
  'AG-COO-005': {
    ...COO, name: 'Coordinación de brazos y piernas en carrera (skip contralateral)', level: 'Intermedio', primary: ['Flexores de cadera', 'Deltoides', 'Core'], secondary: ['Gastrocnemio y sóleo', 'Glúteos'],
    cfg: { free: drillMove(1.5, { cones: AG_CONES, cadence: 3.2, stance: 0.38, knee: 1.4, heel: 0.35, arm: 72, fly: 0.03 }) },
    captions: {
      intro: 'Al inicio de un tramo de 15–20 m',
      reps: [
        ['Skipping marcando el brazo contrario a la rodilla que sube', 'Brazo amplio: mano a la altura de la cara'],
        ['Ritmo constante y tronco erguido', 'Apoyo activo bajo la cadera'],
        ['Exagera el braceo para fijar el patrón', 'Avanza poco a poco'],
      ],
      orbit: ORB_K,
    },
  },
  'AG-COO-006': {
    ...COO, ...STAND_FR, name: 'Ejercicio de coordinación con dos balones', level: 'Intermedio', primary: ['Deltoides', 'Antebrazo', 'Core'], secondary: ['Tríceps', 'Cuádriceps'],
    tempo: { down: 0.55, pause: 0, up: 0.55 }, phaseNames: { BAJADA: 'BOTE', SUBIDA: 'BOTE', PAUSA: 'BOTE', ARRIBA: 'BOTE' }, holdLabel: 'BOTE ALTERNO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', ball: { r: 0.11 }, ballAt: 'K:bp', ball2: { r: 0.11 }, ball2At: 'K:bq',
      keys: [
        { u: 0, ...STAND, P: [0, -0.06, -0.02], rot: [14, 0, 0], hL: [0.26, 0.86, 0.36], hR: [-0.26, 1.05, 0.34], eL: [0.5, -1, -0.2], eR: [-0.5, -1, -0.2], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1], bp: [0.26, 0.74, 0.37], bq: [-0.26, 0.11, 0.40] },
        { u: 1, ...STAND, P: [0, -0.06, -0.02], rot: [14, 0, 0], hL: [0.26, 1.05, 0.34], hR: [-0.26, 0.86, 0.36], eL: [0.5, -1, -0.2], eR: [-0.5, -1, -0.2], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1], bp: [0.26, 0.11, 0.40], bq: [-0.26, 0.74, 0.37] },
      ] } },
    captions: {
      intro: 'De pie, un balón en cada mano',
      reps: [
        ['Bota los dos balones de forma alterna', 'Empuja el balón con los dedos, no con la palma'],
        ['Rodillas algo flexionadas y mirada al frente', 'Mantén un ritmo regular'],
        ['Progresión: bote simultáneo o caminando', 'Series de 20–30 s'],
      ],
      orbit: ['Bote alterno', 'Coordinación: músculos que trabajan', 'Mantén el ritmo'],
    },
  },
  'AG-COO-007': {
    ...COO, ...STAND_FR, name: 'Coordinación rítmica con palmas y pasos', level: 'Intermedio', primary: ['Deltoides', 'Glúteo medio', 'Core'], secondary: ['Aductores', 'Gastrocnemio y sóleo'],
    tempo: { down: 0.7, pause: 0.15, up: 0.7 }, phaseNames: { BAJADA: 'PASO Y PALMADA', SUBIDA: 'JUNTA', PAUSA: 'PALMADA', ARRIBA: 'PALMADA' }, holdLabel: 'PALMADA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'R',
      keys: [
        { u: 0, ...STAND, L: [0.10, 0.08, 0, 0, 8], R: [-0.10, 0.08, 0, 0, -8], hL: [0.24, 0.88, 0.06], hR: [-0.24, 0.88, 0.06], eL: [0.3, -1, -0.3], eR: [-0.3, -1, -0.3], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
        { u: 1, ...STAND, P: [0.10, -0.03, -0.01], L: [0.40, 0.08, 0, 0, 12], R: [-0.10, 0.08, 0, 0, -8], hL: [0.03, 1.98, 0.16], hR: [-0.03, 1.98, 0.16], eL: [0.6, 0, 0], eR: [-0.6, 0, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
      ] } },
    captions: {
      intro: 'De pie, pies juntos y brazos a los lados',
      reps: [
        ['Paso lateral y palmada por encima de la cabeza a la vez', 'Vuelve juntando pies y bajando brazos'],
        ['Sigue un ritmo marcado: palmas o música', 'Alterna el lado del paso'],
        ['Añade combinaciones: palmada delante, detrás…', 'Mantén el ritmo constante'],
      ],
      orbit: ['Paso y palmada', 'Coordinación rítmica: músculos que trabajan', 'Mantén el ritmo'],
    },
  },
  'AG-COO-008': {
    ...COO, name: 'Coordinación en superficie inestable con desplazamiento', level: 'Avanzado', primary: ['Gastrocnemio y sóleo', 'Glúteo medio', 'Core'], secondary: ['Cuádriceps', 'Estabilizadores de tobillo'],
    cfg: { free: drillMove(0.8, { ladder: { w: 0.5, d: 0.62, rails: false, pads: true, z: 0.31 }, cadence: 1.6, stance: 0.62, knee: 0.5, heel: 0.3, arm: 25, fly: 0, drop: 0.004 }) },
    captions: {
      intro: 'Fila de cojines o superficies blandas',
      reps: [
        ['Camina pisando cada cojín con control', 'Estabiliza el apoyo antes del siguiente paso'],
        ['Rodilla alineada con el pie al apoyar', 'Tronco erguido y mirada al frente'],
        ['Progresión: pasos laterales o con balón', 'Avanza despacio'],
      ],
      orbit: ORB_K,
    },
  },
  'AG-COO-009': {
    ...COO, name: 'Circuito de coordinación multitarea (cognitivo-motor)', level: 'Avanzado', primary: ['Aductores', 'Glúteo medio', 'Cuádriceps'], secondary: ['Gastrocnemio y sóleo', 'Core'],
    cfg: { free: { type: 'run', cones: { n: 6, d: 3, x: 1.6 }, ...lateral([[0.8, 1], [0.3, 0], [1.2, -1], [0.3, 0], [0.8, 1], [0.4, 0], [1.0, -1]]) } },
    captions: {
      intro: 'Circuito de desplazamientos con tareas mentales',
      reps: [
        ['Desplázate mientras resuelves una tarea: contar, decir colores…', 'El compañero cambia la consigna'],
        ['Mantén la técnica aunque pienses en otra cosa', 'Pasos laterales sin cruzar los pies'],
        ['Aumenta la dificultad de la tarea poco a poco', 'Series de 20–30 s'],
      ],
      orbit: ORB_K,
    },
  },
  'AG-COO-010': {
    ...COO, name: 'Coordinación de patrón cruzado sobre banco (step-over)', level: 'Avanzado', primary: ['Flexores de cadera', 'Glúteo medio', 'Aductores'], secondary: ['Core', 'Gastrocnemio y sóleo'],
    cfg: { free: sideLadder(1.3, { ladder: { w: 0.7, d: 1.3, rails: false, hurdleH: 0.30, z: 0.65 }, shufLift: 0.36, shufCad: 2.6, arm: 40 }) },
    captions: {
      intro: 'De lado junto a un banco bajo',
      reps: [
        ['Pasa el banco de lado, una pierna y después la otra', 'Rodilla arriba para no tocarlo'],
        ['Brazo contrario a la pierna que pasa', 'Tronco erguido y mirada al frente'],
        ['Ritmo constante a un lado y al otro', 'Series de 20–30 s'],
      ],
      orbit: ORB_K,
    },
  },
  'AG-COO-011': {
    ...COO, ...STAND_FR, name: 'Coordinación bilateral asimétrica (brazo y pierna contraria)', level: 'Avanzado', primary: ['Glúteos', 'Deltoides', 'Core'], secondary: ['Isquiotibiales', 'Erectores espinales'],
    tempo: { down: 1.2, pause: 0.8, up: 1.2 }, phaseNames: { BAJADA: 'EXTIENDE', SUBIDA: 'VUELVE', PAUSA: 'EQUILIBRIO', ARRIBA: 'EQUILIBRIO' }, holdLabel: 'EQUILIBRIO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'R',
      keys: [
        { u: 0, ...STAND, lL: [2, 4, 0, 0], hL: [0.22, 0.86, 0.04], hR: [-0.22, 0.86, 0.04], eL: [0.3, -1, -0.3], eR: [-0.3, -1, -0.3], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
        { u: 1, ...STAND, rot: [12, 0, 0], lL: [-24, 8, 10, 0], hR: [-0.14, 1.95, 0.42], eR: [-1, 0, 0], pR: [1, 0, 0, 0, 1, 0.3], hL: [0.24, 0.90, -0.06], eL: [0.3, -1, -0.3], pL: [-1, 0, 0, 0, -1, 0] },
      ] } },
    captions: {
      intro: 'De pie, postura alta',
      reps: [
        ['Lleva una pierna atrás y eleva el brazo contrario', 'Cuerpo en línea de la mano al pie'],
        ['Mantén el equilibrio 2 s y vuelve', 'Alterna lados en cada repetición'],
        ['Pelvis nivelada y abdomen firme', 'Movimiento lento y controlado'],
      ],
      orbit: ['Equilibrio', 'Coordinación: músculos que trabajan', 'Vuelve con control'],
    },
  },
  'AG-ESC-001': {
    ...ESC, name: 'Escalera in-in-out-out', level: 'Principiante',
    cfg: { free: sideLadder(1.5, { shufCad: 4.4 }) },
    captions: {
      intro: 'De lado a la escalera, al inicio',
      reps: [
        ['Dentro, dentro, fuera, fuera en cada casilla', 'Avanza de lado a lo largo de la escalera'],
        ['Apoyos de punta, rápidos y ligeros', 'Rodillas algo flexionadas'],
        ['Brazos coordinados con los pies', 'Mirada al frente'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-ESC-002': {
    ...ESC, name: 'Escalera ickey shuffle', level: 'Principiante',
    cfg: { free: { type: 'run', ladder: LADDER, loop: 7.0, cadence: 4.6, stance: 0.45, knee: 0.5, heel: 0.3, width: 0.19, twist: 8,
      speeds: [[0, 0], [0.5, 0], [1.2, 1.6], [5.2, 1.6], [6.0, 0], [7.0, 0]], leans: [[0, 6], [7.0, 6]], dys: [[0, -0.05], [7.0, -0.05]] } },
    captions: {
      intro: 'De frente a la escalera, a un lado de ella',
      reps: [
        ['Dentro, dentro, fuera: cada vez sales por un lado', 'Avanza una casilla en cada secuencia'],
        ['Ritmo de tres apoyos rápidos', 'Apoyos de punta y ligeros'],
        ['Brazos coordinados', 'Mirada al frente'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-ESC-003': {
    ...ESC, name: 'Escalera carioca (lateral con cruce de piernas)', level: 'Principiante', primary: ['Aductores', 'Glúteo medio', 'Gastrocnemio y sóleo'], secondary: ['Oblicuos', 'Flexores de cadera'],
    cfg: { free: sideLadder(1.6, { carioca: true, widths: [[0, 0.04], [7.0, 0.04]], shufCad: 3.2, shufLift: 0.08, twist: 14, dys: [[0, -0.04], [7.0, -0.04]] }) },
    captions: {
      intro: 'De lado a la escalera, al inicio',
      reps: [
        ['Avanza de lado cruzando un pie por delante y otro por detrás', 'Gira la cadera, los hombros miran al frente'],
        ['Apoyos rápidos de punta', 'Ritmo constante'],
        ['Cambia de lado en cada serie', 'Brazos abiertos para equilibrar'],
      ],
      orbit: ORB_E,
    },
  },
});
