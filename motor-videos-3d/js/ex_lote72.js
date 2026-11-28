// Lote 72: carrera en curva AG-CUR-002 … 011
import { EXERCISES } from './exercises.js';
import { AG_CONES } from './ex_lote66.js';
import { CUR } from './ex_lote71.js';
import { course } from './course.js';

const C = (segs, o = {}, extra = {}) => ({ ...course(segs, o), cones: AG_CONES, ...extra });
const ORB = ['Curva', 'Carrera en curva: músculos que trabajan', 'Frena progresivamente'];

Object.assign(EXERCISES, {
  'AG-CUR-002': {
    ...CUR, name: 'Sprint en curva de radio cerrado', level: 'Principiante',
    cfg: { free: C([{ d: 1.1, v: 4.8 }, { d: 1.8, v: 4.2, yaw: [0, 120] }, { d: 1.0, v: 5.2, yaw: 120 }]) },
    captions: {
      intro: 'Curva cerrada marcada con conos por el interior',
      reps: [
        ['Entra en la curva frenando un poco y acelera al salir', 'Pasos más cortos dentro de la curva'],
        ['Inclínate hacia dentro desde los tobillos', 'Pie exterior empuja hacia el interior'],
        ['Cambia el sentido de la curva entre series', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-003': {
    ...CUR, name: 'Carrera en curva con técnica de inclinación', level: 'Principiante',
    cfg: { free: C([{ d: 1.2, v: 4.6 }, { d: 3.0, v: 4.8, yaw: [0, 110] }, { d: 0.8, v: 4.8, yaw: 110 }]) },
    captions: {
      intro: 'Curva media marcada con conos por el interior',
      reps: [
        ['Inclina el cuerpo entero hacia el interior de la curva', 'No dobles solo el tronco'],
        ['Hombro interior un poco más bajo', 'Brazo exterior cruza ligeramente por delante'],
        ['Velocidad moderada para cuidar la técnica', 'Cambia el sentido entre series'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-004': {
    ...CUR, name: 'Carrera en ochos (figure-8 running)', level: 'Intermedio',
    cfg: { free: C([{ d: 3.2, v: 4.4, yaw: [0, 360] }, { d: 3.2, v: 4.4, yaw: [360, 0] }]) },
    captions: {
      intro: 'Dos conos separados 6–8 m',
      reps: [
        ['Corre en ocho alrededor de los dos conos', 'Cambia la inclinación en cada cruce'],
        ['Pasos cortos en las curvas', 'Mirada al siguiente cono'],
        ['Mantén una velocidad constante', 'Cambia el sentido en cada serie'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-005': {
    ...CUR, name: 'Carrera en curva con cambio de dirección al salir', level: 'Intermedio',
    cfg: { free: C([{ d: 1.0, v: 4.6 }, { d: 2.0, v: 4.6, yaw: [0, 90] }, { d: 1.3, v: 5.2, yaw: 0 }]) },
    captions: {
      intro: 'Curva marcada con conos y un cono de corte a la salida',
      reps: [
        ['Corre la curva y, al salir, corta hacia el otro lado', 'Frena un poco antes del corte'],
        ['Cambia la inclinación del cuerpo en el corte', 'Pie exterior firme en el apoyo'],
        ['Acelera tras el corte', 'Cambia el sentido entre series'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-006': {
    ...CUR, name: 'Slalom curvo continuo', level: 'Intermedio',
    cfg: { free: C([{ d: 1.0, v: 4.4, yaw: [0, 40] }, { d: 1.4, v: 4.4, yaw: [40, -40] }, { d: 1.4, v: 4.4, yaw: [-40, 40] }, { d: 1.4, v: 4.4, yaw: [40, -40] }, { d: 0.8, v: 4.4, yaw: [-40, 0] }]) },
    captions: {
      intro: 'Conos en línea separados 3–4 m',
      reps: [
        ['Rodea los conos con curvas suaves, sin frenar', 'Cambia la inclinación en cada cono'],
        ['Pasos cortos y rápidos', 'Brazos para equilibrar'],
        ['Mantén la velocidad constante', 'Vuelve caminando'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-007': {
    ...CUR, name: 'Carrera en círculo (circle running)', level: 'Intermedio',
    cfg: { free: C([{ d: 1.0, v: 4.4, yaw: [0, 60] }, { d: 4.6, v: 4.6, yaw: [60, 360] }]) },
    captions: {
      intro: 'Círculo de 5–8 m de radio marcado con conos',
      reps: [
        ['Corre alrededor del círculo a ritmo constante', 'Inclinación constante hacia el centro'],
        ['Pie exterior empuja hacia dentro en cada apoyo', 'Brazo exterior más amplio'],
        ['Cambia el sentido en cada serie', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-008': {
    ...CUR, name: 'Carrera en curva con banda de resistencia', level: 'Avanzado',
    cfg: { free: C([{ d: 1.0, v: 3.8 }, { d: 3.2, v: 4.0, yaw: [0, 100] }, { d: 0.8, v: 4.0, yaw: 100 }], {}, { tether: { to: [1.8, 1.0, 0.4] } }) },
    captions: {
      intro: 'Banda a la cintura sujeta por un compañero desde el interior',
      reps: [
        ['Corre la curva resistiendo el tirón hacia dentro', 'Mantén la inclinación correcta'],
        ['Pie exterior firme y cadera estable', 'Tronco alineado con las piernas'],
        ['Tensión moderada de la banda', 'Cambia el sentido entre series'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-009': {
    ...CUR, name: 'Sprint en curva a máxima velocidad', level: 'Avanzado',
    cfg: { free: C([{ d: 1.6, v: 6.6 }, { d: 2.4, v: 7.0, yaw: [0, 70] }, { d: 1.0, v: 7.0, yaw: 70 }]) },
    captions: {
      intro: 'Curva amplia tipo pista de atletismo',
      reps: [
        ['Sprint máximo manteniendo la línea de la curva', 'Inclinación de todo el cuerpo hacia dentro'],
        ['Brazo exterior cruza por delante', 'Apoyos rápidos bajo la cadera'],
        ['Recupera por completo entre series', 'Frena progresivamente'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-010': {
    ...CUR, name: 'Carrera en curva seguida de sprint lineal', level: 'Avanzado',
    cfg: { free: C([{ d: 1.0, v: 4.8 }, { d: 2.2, v: 5.2, yaw: [0, 90] }, { d: 2.2, v: 7.0, yaw: 90 }]) },
    captions: {
      intro: 'Curva marcada con conos y una recta a la salida',
      reps: [
        ['Corre la curva y acelera a sprint máximo en la recta', 'Endereza el cuerpo al salir de la curva'],
        ['Primeros pasos de la recta potentes', 'Brazos enérgicos'],
        ['Cambia el sentido de la curva entre series', 'Frena progresivamente'],
      ],
      orbit: ORB,
    },
  },
  'AG-CUR-011': {
    ...CUR, name: 'Carrera en serpentina (serpentine run)', level: 'Avanzado',
    cfg: { free: C([{ d: 0.9, v: 4.6, yaw: [0, 60] }, { d: 1.6, v: 4.6, yaw: [60, -60] }, { d: 1.6, v: 4.6, yaw: [-60, 60] }, { d: 1.6, v: 4.6, yaw: [60, -60] }, { d: 0.9, v: 4.6, yaw: [-60, 0] }]) },
    captions: {
      intro: 'Recorrido en serpentina marcado con conos',
      reps: [
        ['Corre las curvas encadenadas sin frenar', 'Cambia la inclinación de un lado a otro'],
        ['Pasos cortos al cambiar de curva', 'Mirada a la siguiente curva'],
        ['Aumenta la velocidad poco a poco', 'Vuelve caminando'],
      ],
      orbit: ORB,
    },
  },
});
