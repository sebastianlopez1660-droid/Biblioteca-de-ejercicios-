// Lote 68: reacción AG-REA-006 … 011 y coordinación AG-COO-001 … 004
import { EXERCISES } from './exercises.js';
import { AGI, AG_CONES, cut } from './ex_lote66.js';
import { REA, react } from './ex_lote67.js';
import { drillMove } from './ex_lote64.js';

const ORB_R = ['Reacción', 'Reacción: músculos que trabajan', 'Vuelve a la posición'];
const ORB_K = ['Coordinación', 'Coordinación: músculos que trabajan', 'Termina suave'];
export const COO = { ...AGI, sub: 'Coordinación', primary: ['Core', 'Cuádriceps', 'Glúteos'], secondary: ['Gastrocnemio y sóleo', 'Deltoides'] };
export const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
export const STAND_FR = { frame: { dist: 4.4, ty: 1.10, tz: 0.10, distLow: 4.2, tyLow: 1.05 }, views: { f34: { az: -40, el: 12 }, side: { az: -90, el: 6 }, front: { az: -15, el: 10 }, back34: { az: -145, el: 16 } }, orbit: { view: 'side', sweep: 110 } };

Object.assign(EXERCISES, {
  'AG-REA-006': {
    ...REA, name: 'Reacción con luces de entrenamiento', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.6, yaw: 40, v: 4.6, acc: 1.4, hold: 0.2 }) } },
    captions: {
      intro: 'En posición atlética frente a varias luces reactivas',
      reps: [
        ['Cuando se enciende una luz, corre a apagarla', 'Vuelve al centro y espera la siguiente'],
        ['Primer paso hacia la luz, sin dudar', 'Cadera baja en la espera'],
        ['Series de 20–30 s', 'Cambia la secuencia de luces'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-007': {
    ...REA, name: 'Reacción con balón soltado (ball drop reaction)', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.8, v: 4.8, acc: 1.2, hold: 0.1, rest: 1.4 }) } },
    captions: {
      intro: 'En posición atlética, a 3–5 m de un compañero con un balón en cada mano',
      reps: [
        ['El compañero suelta un balón: atrápalo antes del segundo bote', 'Sal en cuanto veas caer el balón'],
        ['Primer paso explosivo hacia el balón', 'Mirada en las manos del compañero'],
        ['Aumenta la distancia cuando lo atrapes fácil', 'Vuelve caminando a la posición'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-008': {
    ...REA, name: 'Reacción con silbato y dirección aleatoria', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.8, yaw: -90, v: 4.8, acc: 1.4, hold: 0.3 }) } },
    captions: {
      intro: 'En posición atlética en el centro de cuatro conos',
      reps: [
        ['Al silbato, el compañero señala una dirección y sales hacia ella', 'Adelante, atrás o a los lados'],
        ['Gira la cadera hacia la salida con el primer paso', 'Sin anticiparte'],
        ['Sprint de 5 m y vuelta al centro', 'Series cortas a máxima atención'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-009': {
    ...REA, name: 'Reacción 1 contra 1 (evasión)', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 55, v: 4.0, vc: 2.0, v2: 6.0 }) } },
    captions: {
      intro: 'Frente a un compañero defensor en un pasillo de conos',
      reps: [
        ['Avanza hacia el defensor y esquívalo con un cambio de dirección', 'Amaga hacia un lado y sal por el otro'],
        ['Cadera baja en el apoyo de corte', 'Acelera al superar al defensor'],
        ['El defensor solo reacciona, sin contacto', 'Cambiad de rol en cada repetición'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-010': {
    ...REA, name: 'Reacción con doble estímulo combinado (visual y auditivo)', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 2.0, yaw: -35, v: 5.0, acc: 1.5, hold: 0.3 }) } },
    captions: {
      intro: 'En posición atlética, atento a dos tipos de señal',
      reps: [
        ['La señal visual marca la dirección y la sonora el momento', 'Sal solo cuando se cumplan las dos'],
        ['Decide rápido y sal en diagonal', 'Primer paso explosivo'],
        ['Cambia las combinaciones en cada serie', 'Vuelve caminando al centro'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-011': {
    ...REA, name: 'Reacción con tiempo de decisión reducido', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.1, yaw: 45, v: 5.0, acc: 1.4, hold: 0.2, rest: 1.0 }) } },
    captions: {
      intro: 'En posición atlética, con señales cada vez más seguidas',
      reps: [
        ['Reacciona a cada señal con el menor tiempo posible', 'Los estímulos llegan más rápido en cada serie'],
        ['Peso en la parte delantera del pie, listo para salir', 'Primer paso corto y explosivo'],
        ['Series cortas: la calidad cae con la fatiga', 'Recupera por completo'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-COO-001': {
    ...COO, ...STAND_FR, name: 'Coordinación óculo-manual con lanzamiento y recepción', level: 'Principiante', primary: ['Deltoides', 'Bíceps', 'Core'], secondary: ['Antebrazo', 'Cuádriceps'],
    tempo: { down: 1.0, pause: 0.1, up: 1.0 }, phaseNames: { BAJADA: 'LANZA', SUBIDA: 'ATRAPA', PAUSA: 'VUELO', ARRIBA: 'BALÓN ARRIBA' }, holdLabel: 'BALÓN EN EL AIRE',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', ball: { r: 0.11 }, ballAt: 'K:bp',
      keys: [
        { u: 0, ...STAND, hL: [0.115, 1.20, 0.30], hR: [-0.115, 1.20, 0.30], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [-1, 0, 0.2, 0, 1, 0.4], pR: [1, 0, 0.2, 0, 1, 0.4], bp: [0, 1.21, 0.31] },
        { u: 0.35, ...STAND, P: [0, -0.03, -0.01], hL: [0.115, 1.55, 0.30], hR: [-0.115, 1.55, 0.30], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [-1, 0, 0.2, 0, 1, 0.4], pR: [1, 0, 0.2, 0, 1, 0.4], bp: [0, 1.62, 0.32] },
        { u: 1, ...STAND, hL: [0.13, 1.50, 0.30], hR: [-0.13, 1.50, 0.30], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [-0.6, 0.6, 0.3, 0, 1, 0.3], pR: [0.6, 0.6, 0.3, 0, 1, 0.3], bp: [0, 2.15, 0.34] },
      ] } },
    captions: {
      intro: 'De pie, balón entre las manos a la altura del pecho',
      reps: [
        ['Lanza el balón hacia arriba y atrápalo con las dos manos', 'Sigue el balón con la mirada'],
        ['Amortigua al recibir, con codos flexionados', 'Progresión: una mano o dando una palmada'],
        ['Lanzamientos a altura constante', 'Series de 20–30 s'],
      ],
      orbit: ['Balón en el aire', 'Coordinación: músculos que trabajan', 'Atrapa con suavidad'],
    },
  },
  'AG-COO-002': {
    ...COO, name: 'Coordinación óculo-pédica con control de balón', level: 'Principiante', primary: ['Cuádriceps', 'Flexores de cadera', 'Gastrocnemio y sóleo'], secondary: ['Core', 'Aductores'],
    cfg: { free: { ...drillMove(1.6, { cones: AG_CONES, cadence: 3.2, stance: 0.5, knee: 0.4, heel: 0.3, arm: 30, fly: 0, drop: 0.006 }), dribble: true, ball: { r: 0.11 } } },
    captions: {
      intro: 'Con un balón a los pies',
      reps: [
        ['Conduce el balón con toques cortos de ambos pies', 'El balón nunca se aleja más de un paso'],
        ['Mira al frente entre toques', 'Usa interior y exterior del pie'],
        ['Aumenta la velocidad poco a poco', 'Series de 20–30 s'],
      ],
      orbit: ORB_K,
    },
  },
  'AG-COO-003': {
    ...COO, name: 'Circuito de coordinación con obstáculos variados', level: 'Principiante', primary: ['Flexores de cadera', 'Cuádriceps', 'Gastrocnemio y sóleo'], secondary: ['Core', 'Glúteos'],
    cfg: { free: drillMove(2.0, { ladder: { w: 0.6, d: 0.9, rails: false, hurdleH: 0.18 }, cadence: 3.0, stance: 0.4, knee: 1.3, heel: 0.5, arm: 45, fly: 0.03 }) },
    captions: {
      intro: 'Recorrido con vallas bajas, aros y conos',
      reps: [
        ['Supera cada obstáculo sin perder el ritmo', 'Rodillas arriba sobre las vallas'],
        ['Adapta la zancada a cada obstáculo', 'Brazos coordinados con las piernas'],
        ['Mirada un par de obstáculos por delante', 'Primero técnica, después velocidad'],
      ],
      orbit: ORB_K,
    },
  },
  'AG-COO-004': {
    ...COO, ...STAND_FR, name: 'Coordinación cruzada (cross-crawl pattern)', level: 'Intermedio', primary: ['Flexores de cadera', 'Oblicuos', 'Core'], secondary: ['Glúteo medio', 'Deltoides'],
    tempo: { down: 1.0, pause: 0.4, up: 1.0 }, phaseNames: { BAJADA: 'RODILLA ARRIBA', SUBIDA: 'BAJA', PAUSA: 'MANO A RODILLA', ARRIBA: 'MANO A RODILLA' }, holdLabel: 'MANO A RODILLA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'R',
      keys: [
        { u: 0, ...STAND, lL: [2, 4, 0, 0], hL: [0.22, 0.86, 0.04], hR: [-0.22, 0.86, 0.04], eL: [0.3, -1, -0.3], eR: [-0.3, -1, -0.3], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
        { u: 1, ...STAND, rot: [10, -8, 0], lL: [92, 95, 0, 0], hR: [0.05, 1.00, 0.40], eR: [-0.4, -1, 0.2], pR: [0, -1, 0, 0, 0, 1], hL: [0.24, 0.92, -0.18], eL: [0.3, -1, -0.2], pL: [-1, 0, 0, 0, -1, -0.3] },
      ] } },
    captions: {
      intro: 'De pie, postura alta',
      reps: [
        ['Sube una rodilla y tócala con la mano contraria', 'Alterna lados de forma rítmica'],
        ['Gira el tronco hacia la rodilla, sin encorvarte', 'El brazo libre va hacia atrás'],
        ['Aumenta el ritmo sin perder el control', 'Series de 20–30 s'],
      ],
      orbit: ['Mano a rodilla', 'Coordinación cruzada: músculos que trabajan', 'Alterna de lado'],
    },
  },
});
