// Lote 73: agilidad perceptiva AG-PER-001 … 010
import { EXERCISES } from './exercises.js';
import { AGI, AG_CONES, cut } from './ex_lote66.js';
import { react, lateral } from './ex_lote67.js';
import { course } from './course.js';

const ORB = ['Decisión y salida', 'Agilidad perceptiva: músculos que trabajan', 'Vuelve a la posición'];
export const PER = { ...AGI, sub: 'Agilidad perceptiva', primary: ['Cuádriceps', 'Glúteos', 'Aductores'], secondary: ['Gastrocnemio y sóleo', 'Core'] };
const C = (segs, o = {}, extra = {}) => ({ ...course(segs, o), cones: AG_CONES, ...extra });
const LAT_C = { n: 6, d: 3, x: 1.6 };

Object.assign(EXERCISES, {
  'AG-PER-001': {
    ...PER, name: 'Ejercicio de agilidad con decisión táctica (read and react)', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: -50, v: 3.8, vc: 2.0, v2: 5.4 }) } },
    captions: {
      intro: 'Avanzando hacia un compañero que indica la salida',
      reps: [
        ['Lee el gesto del compañero y sal hacia el lado libre', 'Decide en el último momento'],
        ['Frena un poco antes de decidir', 'Corte firme y aceleración'],
        ['El compañero cambia la señal en cada repetición', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-002': {
    ...PER, name: 'Ejercicio de agilidad 1 contra 1 ante oponente real', level: 'Principiante',
    cfg: { free: { type: 'run', cones: LAT_C, ...lateral([[0.7, 1], [0.3, 0], [1.1, -1], [0.3, 0], [0.7, 1]], { v: 2.8 }) } },
    captions: {
      intro: 'Frente a un compañero en un pasillo de 3–5 m',
      reps: [
        ['El atacante intenta pasar y tú le cierras el paso', 'Desplazamientos laterales sin cruzar los pies'],
        ['Mira la cadera del oponente, no sus pies', 'Cadera baja y peso adelante'],
        ['Series de 5–10 s y cambio de rol', 'Sin contacto'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-003': {
    ...PER, name: 'Ejercicio de escaneo visual en movimiento (scanning drill)', level: 'Principiante', primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], secondary: ['Core', 'Esternocleidomastoideo'],
    cfg: { free: { ...C([{ d: 1.6, v: 3.4 }, { d: 1.6, v: 3.4, yaw: [0, 25] }, { d: 1.6, v: 3.4, yaw: [25, -25] }, { d: 1.0, v: 3.4, yaw: [-25, 0] }]) } },
    captions: {
      intro: 'Trotando por un espacio con compañeros alrededor',
      reps: [
        ['Gira la cabeza a ambos lados mientras corres', 'Busca información: compañeros, conos o señales'],
        ['Mantén la postura de carrera al mirar', 'Cuenta en voz alta lo que ves'],
        ['Mira antes de cada cambio de dirección', 'Series de 20–30 s'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-004': {
    ...PER, name: 'Ejercicio de anticipación con señales visuales', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.4, yaw: 60, v: 4.6, acc: 1.4, hold: 0.3 }) } },
    captions: {
      intro: 'En posición atlética frente al compañero',
      reps: [
        ['Lee la postura del compañero antes de su señal', 'Sal hacia el lado que anticipas'],
        ['Si fallas, frena y corrige rápido', 'Cadera baja en la espera'],
        ['El compañero intenta engañarte', 'Vuelve caminando a la posición'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-005': {
    ...PER, name: 'Ejercicio de agilidad con carga cognitiva (cuenta atrás en movimiento)', level: 'Intermedio',
    cfg: { free: C([{ d: 1.0, v: 4.0, yaw: 35 }, { d: 1.0, v: 4.0, yaw: -35 }, { d: 0.9, v: 2.8, shuf: 1 }, { d: 1.0, v: 4.2, yaw: 35 }]) },
    captions: {
      intro: 'Recorrido de conos con una tarea mental',
      reps: [
        ['Completa el recorrido contando hacia atrás de 3 en 3', 'No pares si te equivocas'],
        ['Mantén la técnica en cada cambio', 'Mirada al siguiente cono'],
        ['Cambia la tarea en cada serie', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-006': {
    ...PER, name: 'Ejercicio de discriminación de color y dirección', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.8, yaw: -60, v: 4.6, acc: 1.4, hold: 0.3 }) } },
    captions: {
      intro: 'En el centro de conos de colores',
      reps: [
        ['El compañero dice un color y una dirección: sal al cono correcto', 'Si el color no coincide, no salgas'],
        ['Primer paso hacia el cono, sin dudar', 'Cadera baja en la espera'],
        ['Cambia las combinaciones en cada serie', 'Vuelve caminando al centro'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-007': {
    ...PER, name: 'Ejercicio de toma de decisiones bajo fatiga', level: 'Intermedio',
    cfg: { free: C([{ d: 1.4, v: 5.4 }, { d: 1.2, v: 5.0, yaw: 180 }, { d: 1.2, v: 4.6, yaw: 120 }]) },
    captions: {
      intro: 'Tras una serie de sprints, con conos de decisión',
      reps: [
        ['Al final de la serie, el compañero indica un cono', 'Decide y sal aunque estés cansado'],
        ['Mantén la calidad del cambio de dirección', 'Frena bajando la cadera'],
        ['Controla la técnica con la fatiga', 'Recupera por completo después'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-008': {
    ...PER, name: 'Ejercicio de agilidad con múltiples estímulos simultáneos', level: 'Avanzado',
    cfg: { free: C([{ d: 0.9, v: 3.6, yaw: 40 }, { d: 0.8, v: 2.6, shuf: -1 }, { d: 1.0, v: 4.2, yaw: -40 }, { d: 0.8, v: 3.0, yaw: -40, back: true }, { d: 1.0, v: 4.4, yaw: 20 }]) },
    captions: {
      intro: 'Varios compañeros dan señales visuales y sonoras',
      reps: [
        ['Atiende solo a la señal que indica la consigna', 'Ignora las demás'],
        ['Cambia de dirección y de forma de desplazamiento', 'Adelante, lateral o hacia atrás'],
        ['Series cortas de máxima atención', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-009': {
    ...PER, name: 'Ejercicio de campo visual periférico en desplazamiento', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: LAT_C, ...lateral([[0.9, 1], [0.3, 0], [1.3, -1], [0.3, 0], [0.9, 1]], { v: 2.6 }) } },
    captions: {
      intro: 'Desplazándote lateralmente con la mirada fija al frente',
      reps: [
        ['Reacciona a señales que aparecen a los lados', 'No gires la cabeza: usa la visión periférica'],
        ['Pasos laterales sin cruzar los pies', 'Cadera baja y tronco erguido'],
        ['Señales cada vez más alejadas del centro', 'Series de 15–20 s'],
      ],
      orbit: ORB,
    },
  },
  'AG-PER-010': {
    ...PER, name: 'Ejercicio perceptivo con restricción de visión central', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.8, yaw: 70, v: 4.4, acc: 1.4, hold: 0.3 }) } },
    captions: {
      intro: 'En posición atlética con la visión central limitada (gafas o visera)',
      reps: [
        ['Reacciona a las señales que ves por la periferia', 'Sal hacia el estímulo detectado'],
        ['Mantén la cabeza estable', 'Primer paso hacia la señal'],
        ['Empieza con señales grandes y cercanas', 'Vuelve caminando a la posición'],
      ],
      orbit: ORB,
    },
  },
});
