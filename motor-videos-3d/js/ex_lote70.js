// Lote 70: escalera AG-ESC-004 … 011 y conos AG-CON-001, 002
import { EXERCISES } from './exercises.js';
import { AGI, AG_CONES, zigzag } from './ex_lote66.js';
import { ESC, sideLadder } from './ex_lote69.js';
import { LADDER } from './ex_lote63.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const ORB_E = ['Pies rápidos', 'Escalera: músculos que trabajan', 'Sal de la escalera'];
const ORB_C = ['Circuito de conos', 'Agilidad: músculos que trabajan', 'Vuelve caminando'];
export const CON = { ...AGI, sub: 'Circuitos de conos' };
// recorrido por la escalera de frente con velocidad constante
const thru = (v, o = {}) => ({ type: 'run', ladder: LADDER, loop: 7.0, speeds: [[0, 0], [0.5, 0], [1.2, v], [5.2, v], [6.0, 0], [7.0, 0]], leans: [[0, 4], [0.5, 4], [1.0, 10], [5.2, 7], [6.0, 2], [7.0, 4]], ...o });
const hopsMUL = EXERCISES['PL-MUL-005'];
const oneFoot = (keys) => keys.map((k, i) => (i >= keys.length / 2 ? { ...k, free: 'L' } : k));

Object.assign(EXERCISES, {
  'AG-ESC-004': {
    ...ESC, name: 'Escalera con un pie por casilla (one-in drill)', level: 'Intermedio',
    cfg: { free: thru(2.1, { cadence: 4.6, stance: 0.42, knee: 0.8, heel: 0.35, width: 0.05 }) },
    captions: {
      intro: 'De frente a la escalera de agilidad',
      reps: [
        ['Un solo apoyo en cada casilla, alternando pies', 'Lo más rápido posible sin pisar los peldaños'],
        ['Apoyos de punta bajo la cadera', 'Rodillas arriba y brazos rápidos'],
        ['Mirada al frente', 'Sal de la escalera acelerando'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-ESC-005': {
    ...ESC, name: 'Escalera con dos pies por casilla (two-in drill)', level: 'Intermedio',
    cfg: { free: thru(1.15, { cadence: 5.0, stance: 0.45, knee: 0.55, heel: 0.3, width: 0.09 }) },
    captions: {
      intro: 'De frente a la escalera de agilidad',
      reps: [
        ['Los dos pies entran en cada casilla antes de avanzar', 'Ritmo rápido: derecha, izquierda, avanza'],
        ['Apoyos de punta, ligeros y cortos', 'Brazos coordinados con los pies'],
        ['Mirada al frente', 'Sal de la escalera acelerando'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-ESC-006': {
    ...ESC, name: 'Escalera lateral rápida', level: 'Intermedio', primary: ['Aductores', 'Glúteo medio', 'Gastrocnemio y sóleo'], secondary: ['Cuádriceps', 'Core'],
    cfg: { free: sideLadder(1.9, { shufCad: 5.2, shufLift: 0.05 }) },
    captions: {
      intro: 'De lado a la escalera, al inicio',
      reps: [
        ['Avanza de lado con los dos pies en cada casilla', 'Pasos laterales rápidos sin cruzar'],
        ['Cadera baja y peso en la parte delantera del pie', 'Hombros mirando al frente'],
        ['Cambia de lado en cada serie', 'Brazos cortos y rápidos'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-ESC-007': {
    ...ESC, name: 'Escalera con giro de 180°', level: 'Intermedio',
    cfg: { free: { type: 'run', ladder: LADDER, loop: 8.0, cadence: 4.4, stance: 0.42, knee: 0.7, heel: 0.3, width: 0.06,
      speeds: [[0, 0], [0.5, 0], [1.2, 1.8], [3.2, 1.8], [3.5, 0.5], [3.9, 0.5], [4.4, 1.5], [6.4, 1.5], [7.0, 0], [8.0, 0]],
      yaws: [[0, 0], [3.4, 0], [3.95, 180], [7.2, 180], [7.9, 360], [8.0, 360]], backs: [[0, 1], [3.7, -1], [7.1, 1]],
      leans: [[0, 4], [0.5, 4], [1.0, 10], [3.2, 7], [3.7, 4], [4.0, -8], [6.4, -8], [7.0, -2], [7.1, 4], [8.0, 4]] } },
    captions: {
      intro: 'De frente a la escalera de agilidad',
      reps: [
        ['Avanza con apoyos rápidos y, a mitad, gira 180°', 'Termina la escalera hacia atrás'],
        ['Gira sobre la parte delantera de los pies', 'Mantén el ritmo tras el giro'],
        ['Alterna el sentido del giro', 'Mirada al frente después de girar'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-ESC-008': {
    ...like('PL-MUL-005', {}), sub: 'Escalera de agilidad', primary: ['Gastrocnemio y sóleo', 'Cuádriceps', 'Glúteos'], secondary: ['Flexores de cadera', 'Core'],
    name: 'Escalera con salto a dos pies', level: 'Avanzado',
    captions: {
      intro: 'De pie al inicio de la escalera de agilidad',
      reps: [
        ['Salta con los dos pies juntos a cada casilla', 'Contactos cortos y elásticos'],
        ['Saltos bajos y precisos', 'Brazos acompañan el ritmo'],
        ['Sin pisar los peldaños', 'Recorre la escalera y vuelve caminando'],
      ],
      orbit: ['Sigue saltando', 'Saltos en escalera: músculos que trabajan', 'Contactos rápidos'],
    },
  },
  'AG-ESC-009': {
    ...ESC, name: 'Escalera con salida a sprint al finalizar', level: 'Avanzado', primary: ['Gastrocnemio y sóleo', 'Flexores de cadera', 'Cuádriceps'], secondary: ['Glúteos', 'Core'],
    cfg: { free: { type: 'run', ladder: LADDER, loop: 8.6, cadence: undefined, cad0: 4.6, cadK: 0.0, stance: 0.42, knee: 0.8, heel: 0.4, width: 0.06,
      speeds: [[0, 0], [0.5, 0], [1.2, 2.1], [3.8, 2.1], [5.6, 6.4], [6.4, 6.4], [7.4, 0], [8.6, 0]],
      leans: [[0, 4], [0.5, 4], [1.0, 10], [3.8, 8], [4.2, 26], [5.6, 12], [6.4, 10], [6.9, -8], [7.4, -2], [8.0, 4], [8.6, 4]] } },
    captions: {
      intro: 'De frente a la escalera, con un cono 5–10 m después',
      reps: [
        ['Recorre la escalera con pies rápidos', 'Al salir, sprint máximo hasta el cono'],
        ['Inclínate y alarga la zancada al salir', 'Brazos enérgicos en el sprint'],
        ['Cambia el patrón de la escalera en cada serie', 'Recupera caminando'],
      ],
      orbit: ['Pies rápidos y sprint', 'Escalera y sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'AG-ESC-010': {
    ...like('PL-MUL-005', {}), sub: 'Escalera de agilidad', primary: ['Gastrocnemio y sóleo', 'Cuádriceps', 'Glúteo medio'], secondary: ['Glúteos', 'Core'],
    cfg: { ...hopsMUL.cfg, free: { ...hopsMUL.cfg.free, down: oneFoot(hopsMUL.cfg.free.down), up: oneFoot(hopsMUL.cfg.free.up) } },
    name: 'Escalera hopscotch', level: 'Avanzado',
    captions: {
      intro: 'De pie al inicio de la escalera de agilidad',
      reps: [
        ['Alterna saltos a dos pies y a un pie por las casillas', 'Como la rayuela'],
        ['Aterriza suave y estable en cada apoyo', 'Rodilla alineada con el pie a una pierna'],
        ['Mirada al frente', 'Cambia la pierna de apoyo en cada serie'],
      ],
      orbit: ['Sigue saltando', 'Saltos en escalera: músculos que trabajan', 'Contactos rápidos'],
    },
  },
  'AG-ESC-011': {
    ...ESC, name: 'Escalera con patrón cruzado avanzado', level: 'Avanzado', primary: ['Aductores', 'Glúteo medio', 'Gastrocnemio y sóleo'], secondary: ['Oblicuos', 'Flexores de cadera'],
    cfg: { free: sideLadder(2.0, { carioca: true, widths: [[0, 0.04], [7.0, 0.04]], shufCad: 4.2, shufLift: 0.10, twist: 16, dys: [[0, -0.05], [7.0, -0.05]] }) },
    captions: {
      intro: 'De lado a la escalera, al inicio',
      reps: [
        ['Avanza de lado cruzando los pies por delante y por detrás a ritmo alto', 'Un cruce por casilla'],
        ['Cadera suelta y hombros al frente', 'Apoyos de punta, ligeros'],
        ['Domina la carioca básica antes', 'Cambia de lado en cada serie'],
      ],
      orbit: ORB_E,
    },
  },
  'AG-CON-001': {
    ...CON, name: 'Slalom de conos en línea recta', level: 'Principiante',
    cfg: { free: { type: 'run', cones: { n: 8, d: 2.0, x: 1, both: false, line: 0.9 }, ...zigzag({ ang: 30, v: 3.8, seg: 0.9, n: 4 }) } },
    captions: {
      intro: 'Conos en línea separados 1,5–2 m',
      reps: [
        ['Pasa entre los conos en zigzag', 'Pasos cortos al rodear cada cono'],
        ['Inclina el cuerpo hacia dentro del giro', 'Cadera baja y mirada al siguiente cono'],
        ['Ida y vuelta', 'Aumenta la velocidad poco a poco'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-002': {
    ...CON, name: 'Circuito de conos en cuadrado (box drill)', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, loop: 10.6,
      speeds: [[0, 0], [0.5, 0], [0.9, 1.6], [2.0, 4.8], [2.3, 4.8], [2.9, 0], [3.0, 0], [3.25, 2.8], [4.4, 2.8], [4.65, 0], [4.8, 0], [5.3, 3.0], [6.6, 3.0], [7.0, 0], [7.1, 0], [7.35, 2.8], [8.5, 2.8], [8.75, 0], [10.6, 0]],
      shuffles: [[0, 0], [2.95, -1], [4.7, 0], [7.05, 1], [8.8, 0]],
      backs: [[0, 1], [4.75, -1], [7.05, 1]],
      leans: [[0, 4], [0.4, 4], [0.7, 28], [1.4, 16], [2.0, 10], [2.3, 8], [2.7, -8], [2.95, 10], [4.7, 10], [4.8, -12], [7.0, -12], [7.05, 10], [8.8, 10], [9.2, 4], [10.6, 4]],
      dys: [[0, 0], [2.3, 0], [2.8, -0.12], [2.95, -0.11], [4.7, -0.11], [5.0, -0.06], [7.0, -0.06], [7.05, -0.11], [8.8, -0.11], [9.3, 0], [10.6, 0]],
      widths: [[0, 0.09], [2.5, 0.09], [2.9, 0.17], [2.95, 0.19], [4.7, 0.19], [4.9, 0.1], [7.0, 0.1], [7.05, 0.19], [8.8, 0.19], [9.3, 0.09], [10.6, 0.09]] } },
    captions: {
      intro: 'Cuatro conos en cuadrado de 5 m',
      reps: [
        ['Sprint adelante, lateral a la derecha, atrás y lateral a la izquierda', 'Rodea el cuadrado sin parar'],
        ['Cadera baja en los desplazamientos laterales', 'Cambios de dirección en cada cono'],
        ['Cambia el sentido en cada serie', 'Mirada al frente en todo el recorrido'],
      ],
      orbit: ORB_C,
    },
  },
});
