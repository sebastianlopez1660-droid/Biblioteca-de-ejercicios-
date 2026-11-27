// Lote 63: VE-CRI-011 y frecuencia de zancada VE-FRE-001 … 009
import { EXERCISES } from './exercises.js';
import { VEL, RUN_FR } from './ex_lote58.js';
import { CONES } from './ex_lote59.js';
import { CRI, paceProfile } from './ex_lote62.js';

export const FRE = { ...VEL, ...RUN_FR, sub: 'Frecuencia de zancada', primary: ['Flexores de cadera', 'Gastrocnemio y sóleo'], secondary: ['Core', 'Cuádriceps'] };
const DRILL = { phaseNames: { BAJADA: 'EJERCICIO', SUBIDA: 'EJERCICIO', PAUSA: 'EJERCICIO', ARRIBA: 'EJERCICIO' }, holdLabel: 'EJERCICIO' };
export const LADDER = { w: 0.46, d: 0.46, z: 0.23 };
// en el sitio: sin desplazamiento, cadencia fija
export const spot = (o) => ({ type: 'run', inPlace: true, speed: 0, ...o });
const ORB = ['Ritmo constante', 'Frecuencia: músculos que trabajan', 'Termina suave'];

Object.assign(EXERCISES, {
  'VE-CRI-011': {
    ...CRI, name: 'Cambio de ritmo en pareja (persecución)', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: CONES, ...paceProfile([[0, 0], [0.5, 0], [1.8, 4.0], [2.8, 4.0], [3.8, 7.4], [4.8, 7.4], [5.6, 4.6], [6.4, 4.6], [7.2, 7.4], [8.0, 7.4], [9.4, 0], [10.6, 0]]) } },
    captions: {
      intro: 'Dos corredores en fila, separados 2–3 m',
      reps: [
        ['El de delante cambia de ritmo cuando quiere', 'El de detrás reacciona y mantiene la distancia'],
        ['Acelera y suelta según el compañero', 'Mirada al frente, postura alta'],
        ['Cambiad de rol en cada serie', 'Recupera caminando'],
      ],
      orbit: ['Cambio de ritmo', 'Carrera: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-FRE-001': {
    ...FRE, ...DRILL, name: 'Skipping alto (high knees / skip A en el sitio)', level: 'Intermedio',
    cfg: { free: spot({ cadence: 3.6, knee: 1.45, heel: 0.35, lean: 3, arm: 55, fly: 0.03, drop: 0.012, ladder: LADDER }) },
    captions: {
      intro: 'De pie en un hueco de la escalera, postura alta',
      reps: [
        ['Sube las rodillas a la altura de la cadera, alternando', 'Apoya sobre la parte delantera del pie'],
        ['Tronco erguido: no te eches atrás', 'Brazos coordinados con las piernas'],
        ['Contactos cortos y rápidos', 'Series de 10–15 s'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-002': {
    ...FRE, ...DRILL, name: 'Skipping bajo rápido (fast feet)', level: 'Intermedio',
    cfg: { free: spot({ cadence: 5.4, knee: 0.15, heel: 0.12, lean: 6, arm: 30, k: 0.94, fly: 0.008, drop: 0.006, width: 0.11, ladder: LADDER }) },
    captions: {
      intro: 'En posición atlética, rodillas algo flexionadas',
      reps: [
        ['Pasos muy rápidos y cortos sobre la punta de los pies', 'Los pies apenas se separan del suelo'],
        ['Máxima frecuencia sin perder el ritmo', 'Brazos cortos y rápidos'],
        ['Series de 5–10 s', 'Recupera por completo'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-003': {
    ...FRE, ...DRILL, name: 'Carrera de tobillos rápidos en el sitio', level: 'Intermedio',
    cfg: { free: spot({ cadence: 4.6, knee: 0.05, heel: 0.05, lean: 4, arm: 28, k: 0.975, fly: 0.012, drop: 0.004, ladder: LADDER }) },
    captions: {
      intro: 'De pie, piernas casi extendidas',
      reps: [
        ['Rebota con los tobillos, sin doblar las rodillas', 'Tobillos firmes, contactos muy breves'],
        ['Empuja el suelo con la parte delantera del pie', 'Tronco alto y estable'],
        ['Series de 10–15 s', 'Mantén el ritmo constante'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-004': {
    ...FRE, ...DRILL, name: 'Escalera de agilidad para frecuencia de zancada', level: 'Intermedio',
    cfg: { free: { type: 'run', ladder: LADDER, loop: 7.0, cadence: 4.6, stance: 0.42, knee: 0.7, heel: 0.3, width: 0.06,
      speeds: [[0, 0], [0.5, 0], [1.2, 2.1], [5.2, 2.1], [6.0, 0], [7.0, 0]], leans: [[0, 4], [0.5, 4], [1.0, 12], [5.2, 9], [6.0, 2], [7.0, 4]] } },
    captions: {
      intro: 'Frente a la escalera de agilidad',
      reps: [
        ['Un apoyo en cada hueco, lo más rápido posible', 'Rodillas arriba y apoyos de punta'],
        ['No pises los peldaños', 'Brazos rápidos y coordinados'],
        ['Mira al frente, no a los pies', 'Sal de la escalera acelerando'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-005': {
    ...FRE, ...DRILL, name: 'Talones a glúteo rápido (butt kicks)', level: 'Intermedio', primary: ['Isquiotibiales', 'Gastrocnemio y sóleo'], secondary: ['Flexores de cadera', 'Core'],
    cfg: { free: spot({ cadence: 3.8, knee: 0.05, heel: 1.4, lean: 4, arm: 40, fly: 0.02, ladder: LADDER }) },
    captions: {
      intro: 'De pie en un hueco de la escalera, postura alta',
      reps: [
        ['Lleva los talones hacia los glúteos, alternando rápido', 'Rodillas apuntando al suelo'],
        ['Apoya sobre la parte delantera del pie', 'Tronco erguido'],
        ['Series de 10–15 s', 'Brazos coordinados'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-006': {
    ...FRE, ...DRILL, name: 'Carrera en el sitio a cadencia máxima', level: 'Intermedio',
    cfg: { free: spot({ cadence: 4.8, knee: 0.75, heel: 0.45, lean: 5, arm: 50, fly: 0.02, ladder: LADDER }) },
    captions: {
      intro: 'De pie, postura de carrera',
      reps: [
        ['Corre en el sitio a la máxima frecuencia posible', 'Rodillas a media altura'],
        ['Brazos tan rápidos como las piernas', 'Contactos cortos de punta'],
        ['Series de 5–10 s a tope', 'Recupera por completo'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-007': {
    ...FRE, ...DRILL, name: 'Skip A con desplazamiento', level: 'Intermedio',
    cfg: { free: { type: 'run', ladder: LADDER, loop: 7.0, cadence: 3.4, stance: 0.38, knee: 1.45, heel: 0.35, arm: 55, fly: 0.03,
      speeds: [[0, 0], [0.5, 0], [1.2, 1.5], [5.4, 1.5], [6.2, 0], [7.0, 0]], leans: [[0, 3], [7.0, 3]] } },
    captions: {
      intro: 'Al inicio de un tramo de 15–20 m',
      reps: [
        ['Avanza con skipping: rodilla arriba y apoyo bajo la cadera', 'Pie en flexión dorsal al subir'],
        ['Ritmo constante y tronco erguido', 'Brazo contrario a la pierna'],
        ['Contactos activos, sin hundirte', 'Avanza poco a poco'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-008': {
    ...FRE, ...DRILL, name: 'Skip B con desplazamiento', level: 'Avanzado', primary: ['Flexores de cadera', 'Isquiotibiales'], secondary: ['Gastrocnemio y sóleo', 'Core'],
    cfg: { free: { type: 'run', ladder: LADDER, loop: 7.0, cadence: 2.9, stance: 0.34, knee: 1.6, heel: 0.3, arm: 55, fly: 0.03,
      speeds: [[0, 0], [0.5, 0], [1.2, 1.4], [5.4, 1.4], [6.2, 0], [7.0, 0]], leans: [[0, 3], [7.0, 3]] } },
    captions: {
      intro: 'Al inicio de un tramo de 15–20 m',
      reps: [
        ['Sube la rodilla, extiende la pierna al frente y arrastra el pie hacia atrás', 'El pie cae bajo la cadera'],
        ['Movimiento de zarpazo activo', 'Tronco erguido y brazos coordinados'],
        ['Ritmo constante', 'Domina el skip A antes'],
      ],
      orbit: ORB,
    },
  },
  'VE-FRE-009': {
    ...FRE, ...DRILL, name: 'Ciclo de pierna rápido con banda elástica', level: 'Avanzado',
    cfg: { free: spot({ cadence: 3.4, knee: 1.25, heel: 0.9, lean: 5, arm: 50, fly: 0.02, tether: { to: [0, 1.0, -1.7] } }) },
    captions: {
      intro: 'Banda elástica a la cintura anclada detrás',
      reps: [
        ['Ciclo de pierna rápido: talón al glúteo, rodilla arriba y apoyo', 'La banda te obliga a mantener la postura'],
        ['Apoyo activo bajo la cadera', 'Tronco firme sin irte hacia delante'],
        ['Series de 10–15 s', 'Brazos coordinados'],
      ],
      orbit: ORB,
    },
  },
});
