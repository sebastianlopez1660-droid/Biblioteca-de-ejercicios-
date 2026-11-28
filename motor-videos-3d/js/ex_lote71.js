// Lote 71: circuitos de conos AG-CON-003 … 011 y curvas AG-CUR-001
import { EXERCISES } from './exercises.js';
import { AGI, AG_CONES } from './ex_lote66.js';
import { CON } from './ex_lote70.js';
import { course } from './course.js';

const ORB_C = ['Circuito de conos', 'Agilidad: músculos que trabajan', 'Vuelve caminando'];
export const CUR = { ...AGI, sub: 'Carrera en curva', primary: ['Cuádriceps', 'Glúteos', 'Aductores'], secondary: ['Glúteo medio', 'Gastrocnemio y sóleo', 'Core'] };
const C = (segs, o = {}, extra = {}) => ({ ...course(segs, o), cones: AG_CONES, ...extra });
// estrella: sprint hacia cada cono y vuelta de espaldas al centro
const star = (angs, v = 4.6) => angs.flatMap((a) => [{ d: 1.1, v, yaw: a }, { d: 1.0, v: 3.0, yaw: a, back: true }]);
const slalom = (n, ang, v, d) => Array.from({ length: n }, (_, i) => ({ d, v, yaw: i % 2 ? -ang : ang }));

Object.assign(EXERCISES, {
  'AG-CON-003': {
    ...CON, name: 'Circuito de conos en estrella (star drill)', level: 'Principiante',
    cfg: { free: C(star([0, 60, -60])) },
    captions: {
      intro: 'Un cono central y cinco conos alrededor a 5 m',
      reps: [
        ['Sprint del centro a un cono y vuelta de espaldas al centro', 'Repite hacia cada cono de la estrella'],
        ['Frena bajando la cadera antes de volver', 'De espaldas, pasos cortos y tronco adelante'],
        ['Cambia el orden de los conos', 'Mirada al frente en todo el recorrido'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-004': {
    ...EXERCISES['AG-COD-007'], ...CON, name: 'T-test de agilidad', level: 'Intermedio',
    captions: {
      intro: 'Cuatro conos en T: 10 m de base y 5 m a cada lado',
      reps: [
        ['Sprint al cono central y desplazamiento lateral a la izquierda', 'Lateral a la derecha hasta el otro cono'],
        ['Vuelve lateral al centro y termina de espaldas', 'Toca cada cono con la mano'],
        ['Cronometra el recorrido completo', 'Pasos laterales sin cruzar los pies'],
      ],
      orbit: ['Test de agilidad', 'Agilidad: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'AG-CON-005': {
    ...CON, name: 'Circuito de conos en L', level: 'Intermedio',
    cfg: { free: C([{ d: 1.1, v: 4.6 }, { d: 1.1, v: 4.4, yaw: 180 }, { d: 1.6, v: 4.4, yaw: [180, 270] }, { d: 1.4, v: 4.8, yaw: [270, 360] }]) },
    captions: {
      intro: 'Tres conos en forma de L separados 5 m',
      reps: [
        ['Sprint al segundo cono, toca y vuelve al primero', 'Vuelve a salir y rodea el segundo cono'],
        ['Rodea el tercer cono por dentro y regresa', 'Inclínate hacia dentro en cada giro'],
        ['Cronometra el recorrido', 'Alterna el sentido en cada serie'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-006': {
    ...CON, name: 'Test de agilidad de Illinois', level: 'Intermedio',
    cfg: { free: C([{ d: 1.6, v: 5.2 }, { d: 1.6, v: 5.2, yaw: 180 }, { d: 0.6, v: 3.4, yaw: 90 }, ...slalom(4, 50, 3.6, 0.6).map((s) => ({ ...s, yaw: s.yaw })), { d: 1.4, v: 5.4, yaw: 0 }]) },
    captions: {
      intro: 'Recorrido de 10 × 5 m con cuatro conos centrales',
      reps: [
        ['Sprint de 10 m, giro y vuelta', 'Zigzag entre los conos centrales'],
        ['Último tramo de ida y vuelta a máxima velocidad', 'Frena con pasos cortos en cada giro'],
        ['Cronometra el recorrido completo', 'Empieza tumbado boca abajo para el test oficial'],
      ],
      orbit: ['Test de agilidad', 'Agilidad: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'AG-CON-007': {
    ...CON, name: 'Conos en zigzag con cambio de ritmo', level: 'Intermedio',
    cfg: { free: C([{ d: 0.9, v: 3.4, yaw: 35 }, { d: 0.8, v: 5.2, yaw: -35 }, { d: 0.9, v: 3.4, yaw: 35 }, { d: 0.8, v: 5.4, yaw: -35 }, { d: 0.9, v: 3.6, yaw: 35 }, { d: 1.0, v: 6.0, yaw: 0 }]) },
    captions: {
      intro: 'Conos en zigzag separados 4–5 m',
      reps: [
        ['Alterna tramos suaves y rápidos entre los conos', 'Acelera al salir de cada cono'],
        ['Frena con pasos cortos antes de cada cambio', 'Cadera baja en los apoyos'],
        ['Termina con un sprint recto', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-008': {
    ...CON, name: 'Conos con desplazamiento lateral entre postes', level: 'Avanzado', primary: ['Aductores', 'Glúteo medio', 'Cuádriceps'], secondary: ['Gastrocnemio y sóleo', 'Core'],
    cfg: { free: C([{ d: 1.0, v: 4.4 }, { d: 1.0, v: 2.8, shuf: 1 }, { d: 0.6, v: 3.4, yaw: 0 }, { d: 1.0, v: 2.8, shuf: -1 }, { d: 0.6, v: 3.4 }, { d: 1.0, v: 2.8, shuf: 1 }]) },
    captions: {
      intro: 'Postes o conos altos en dos filas desplazadas',
      reps: [
        ['Avanza hasta un poste y desplázate lateral al siguiente', 'Alterna avance y desplazamiento lateral'],
        ['Pasos laterales sin cruzar los pies', 'Cadera baja y tronco erguido'],
        ['No toques los postes', 'Cambia el lado de inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-009': {
    ...CON, name: 'Circuito de conos combinado con sprint final', level: 'Avanzado',
    cfg: { free: C([{ d: 0.8, v: 3.8, yaw: 40 }, { d: 0.8, v: 3.8, yaw: -40 }, { d: 0.9, v: 2.8, shuf: -1 }, { d: 0.8, v: 3.8, yaw: 40 }, { d: 2.0, v: 6.8, yaw: 0 }]) },
    captions: {
      intro: 'Circuito corto de conos y una recta final de 10–20 m',
      reps: [
        ['Completa los cambios de dirección del circuito', 'Al salir del último cono, sprint máximo'],
        ['Primeros pasos del sprint cortos y potentes', 'Inclínate al acelerar'],
        ['Cronometra el recorrido', 'Recupera por completo'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-010': {
    ...CON, name: 'Conos con recogida de objeto (pick-up drill)', level: 'Avanzado', primary: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'], secondary: ['Erectores espinales', 'Core'],
    cfg: { free: C([{ d: 1.2, v: 4.4 }, { d: 0.6, v: 0.4, low: 0.30 }, { d: 1.2, v: 4.4, yaw: 180 }, { d: 0.6, v: 0.4, yaw: 180, low: 0.30 }]) },
    captions: {
      intro: 'Conos a 5 m con un objeto junto a cada uno',
      reps: [
        ['Corre al cono, agáchate y recoge el objeto', 'Llévalo al otro cono y deja allí el objeto'],
        ['Baja con la cadera, espalda recta', 'Frena antes de agacharte'],
        ['Alterna la mano de recogida', 'Cronometra el recorrido'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CON-011': {
    ...CON, name: 'Conos con doble vuelta (figure-8 drill)', level: 'Avanzado', primary: ['Cuádriceps', 'Glúteos', 'Aductores'], secondary: ['Glúteo medio', 'Core'],
    cfg: { free: C([{ d: 3.0, v: 4.2, yaw: [0, 360] }, { d: 3.0, v: 4.2, yaw: [360, 0] }]) },
    captions: {
      intro: 'Dos conos separados 5 m',
      reps: [
        ['Corre en ocho rodeando los dos conos', 'Inclínate hacia dentro en cada curva'],
        ['Pasos cortos en las curvas y largos en el cruce', 'Mirada al siguiente cono'],
        ['Cambia el sentido en cada serie', 'Mantén la velocidad constante'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-CUR-001': {
    ...CUR, name: 'Sprint en curva de radio amplio', level: 'Principiante',
    cfg: { free: C([{ d: 1.2, v: 5.6 }, { d: 2.6, v: 6.0, yaw: [0, 75] }, { d: 1.0, v: 6.0, yaw: 75 }]) },
    captions: {
      intro: 'Curva amplia marcada con conos por el interior',
      reps: [
        ['Corre la curva pegado a los conos interiores', 'Inclina todo el cuerpo hacia dentro'],
        ['Brazo exterior con más amplitud', 'Pie exterior empuja hacia el interior'],
        ['Cambia el sentido de la curva entre series', 'Recupera caminando'],
      ],
      orbit: ['Curva', 'Carrera en curva: músculos que trabajan', 'Frena progresivamente'],
    },
  },
});
