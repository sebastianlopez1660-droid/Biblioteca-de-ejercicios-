// Lote 67: cambios de dirección AG-COD-007 … 011 y reacción AG-REA-001 … 005
import { EXERCISES } from './exercises.js';
import { AGI, AG_CONES, cut, zigzag } from './ex_lote66.js';

const ORB_C = ['Cambio de dirección', 'Agilidad: músculos que trabajan', 'Vuelve caminando'];
const ORB_R = ['Reacción', 'Reacción: músculos que trabajan', 'Vuelve a la posición'];
export const REA = { ...AGI, sub: 'Reacción', primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], secondary: ['Core', 'Aductores'] };

// espera en posición atlética y salida explosiva (yaw = dirección de salida)
export function react({ wait = 1.6, yaw = 0, v = 5.6, acc = 1.8, hold = 0.4, rest = 1.2 } = {}) {
  const t1 = wait, t2 = t1 + acc, t3 = t2 + hold, t4 = t3 + 1.3, loop = t4 + rest;
  const turn = Math.abs(yaw) > 1;
  return {
    loop,
    speeds: [[0, 0], [t1, 0], [t1 + 0.35, v * 0.35], [t2, v], [t3, v], [t4, 0], [loop, 0]],
    yaws: [[0, 0], [t1, 0], [t1 + (turn ? 0.3 : 0.01), yaw], [loop - 0.7, yaw], [loop - 0.1, 0], [loop, 0]],
    leans: [[0, 12], [t1, 12], [t1 + 0.15, 38], [t1 + 0.9, 24], [t2, 10], [t3, 8], [t3 + 0.6, -8], [t4, -3], [t4 + 0.4, 6], [loop - 0.4, 12], [loop, 12]],
    dys: [[0, -0.09], [t1, -0.10], [t1 + 0.3, -0.03], [t1 + 0.8, 0], [t3, 0], [t4, -0.06], [loop - 0.4, -0.09], [loop, -0.09]],
    widths: [[0, 0.15], [t1, 0.15], [t1 + 0.4, 0.09], [t4, 0.11], [loop - 0.4, 0.15], [loop, 0.15]],
  };
}
// desplazamientos laterales cortos (espejo): [[duración, sentido]] con sentido 1 = izquierda, −1 = derecha, 0 = quieto
export function lateral(seq, { v = 2.6, rest = 1.0 } = {}) {
  const speeds = [[0, 0]], shuffles = [[0, 0]];
  let t = 0.6;
  speeds.push([t, 0]);
  for (const [d, sgn] of seq) {
    shuffles.push([t, sgn]);
    if (sgn) speeds.push([t + 0.2, v], [t + d - 0.2, v], [t + d, 0]); else speeds.push([t + d, 0]);
    t += d;
  }
  const loop = t + rest;
  shuffles.push([t, 0]); speeds.push([loop, 0]);
  return { loop, speeds, shuffles, leans: [[0, 12], [loop, 12]], dys: [[0, -0.11], [loop, -0.11]], widths: [[0, 0.19], [loop, 0.19]], k: 0.97 };
}

Object.assign(EXERCISES, {
  'AG-COD-007': {
    ...AGI, name: 'Cambio de dirección en T (T-drill)', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, loop: 11.0,
      speeds: [[0, 0], [0.5, 0], [0.9, 1.8], [2.0, 5.4], [2.3, 5.4], [2.9, 0], [3.0, 0], [3.25, 2.8], [3.9, 2.8], [4.15, 0], [4.25, 0], [4.5, 3.0], [5.75, 3.0], [6.0, 0], [6.1, 0], [6.35, 2.8], [6.95, 2.8], [7.2, 0], [7.35, 0], [7.8, 3.2], [9.0, 3.2], [9.5, 0], [11.0, 0]],
      shuffles: [[0, 0], [2.95, 1], [4.2, -1], [6.05, 1], [7.25, 0]],
      backs: [[0, 1], [7.3, -1], [10.2, 1]],
      leans: [[0, 4], [0.4, 4], [0.7, 30], [1.4, 18], [2.0, 10], [2.3, 8], [2.7, -8], [2.95, 10], [7.25, 10], [7.4, -12], [9.4, -12], [9.6, 2], [10.2, 4], [11.0, 4]],
      dys: [[0, 0], [2.3, 0], [2.8, -0.12], [2.95, -0.11], [7.25, -0.11], [7.6, -0.06], [9.4, -0.06], [9.8, 0], [11.0, 0]],
      widths: [[0, 0.09], [2.5, 0.09], [2.9, 0.17], [2.95, 0.19], [7.25, 0.19], [7.6, 0.1], [11.0, 0.09]] } },
    captions: {
      intro: 'Cuatro conos en forma de T',
      reps: [
        ['Sprint al cono central y desplazamiento lateral a la izquierda', 'Cruza al cono derecho sin cruzar los pies'],
        ['Vuelve al centro con pasos laterales', 'Termina corriendo de espaldas a la salida'],
        ['Cadera baja durante los desplazamientos', 'Toca cada cono con la mano'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-008': {
    ...AGI, name: 'Cambio de dirección con salida a sprint', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: -70, v: 4.4, vc: 1.4, v2: 7.0 }) } },
    captions: {
      intro: 'Tramo de aproximación y cono de corte',
      reps: [
        ['Corre a ritmo medio, corta en el cono y sal a sprint máximo', 'La salida es lo más importante'],
        ['Apoyo de corte bajo y firme', 'Primeros pasos tras el corte cortos y explosivos'],
        ['Alterna el lado del corte', 'Recupera por completo'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-009': {
    ...AGI, name: 'Cambio de dirección con conducción de balón', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 80, v: 3.8, vc: 1.2 }), dribble: true, ball: { r: 0.11 } } },
    captions: {
      intro: 'Conduciendo el balón hacia un cono',
      reps: [
        ['Conduce, frena el balón en el cono y sal en otra dirección', 'Toques cortos antes del cambio'],
        ['Usa el exterior o el interior del pie para girar', 'Cuerpo entre el balón y el cono'],
        ['Mira al frente entre toques', 'Alterna el lado del cambio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-010': {
    ...AGI, name: 'Cambio de dirección con chaleco lastrado', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 90, v: 4.6, vc: 1.2 }), vest: true } },
    captions: {
      intro: 'Con chaleco lastrado, frente a un cono de giro',
      reps: [
        ['Corre, frena y gira 90° controlando el peso extra', 'Baja más la cadera que sin chaleco'],
        ['Apoyo firme y tronco estable en el giro', 'Sal con pasos cortos y potentes'],
        ['Carga moderada: 5–10 % del peso corporal', 'Alterna el lado del giro'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-011': {
    ...AGI, name: 'Cambio de dirección con doble corte (double cut drill)', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: AG_CONES, ...zigzag({ ang: 45, v: 4.6, seg: 1.0, n: 2 }) } },
    captions: {
      intro: 'Dos conos de corte muy próximos',
      reps: [
        ['Corta hacia un lado y enseguida hacia el otro', 'Dos apoyos de corte seguidos'],
        ['Cadera baja durante los dos cortes', 'El segundo corte, más explosivo'],
        ['Alterna el lado del primer corte', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-REA-001': {
    ...REA, name: 'Salida reactiva a señal visual', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.8 }) } },
    captions: {
      intro: 'En posición atlética, mirando al compañero',
      reps: [
        ['Sal en cuanto veas la señal (mano, cono o luz)', 'Sin anticiparte'],
        ['Primer paso explosivo y corto', 'Tronco inclinado en la salida'],
        ['Sprint de 5–10 m', 'Vuelve caminando a la posición'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-002': {
    ...REA, name: 'Salida reactiva a señal auditiva', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 2.2 }) } },
    captions: {
      intro: 'En posición atlética, atento al sonido',
      reps: [
        ['Sal en cuanto oigas la palmada o el silbato', 'Cambia el tiempo de espera en cada repetición'],
        ['Primer paso explosivo y corto', 'Brazos enérgicos desde el inicio'],
        ['Sprint de 5–10 m', 'Vuelve caminando a la posición'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-003': {
    ...REA, name: 'Reacción a movimiento de compañero (mirror drill)', level: 'Principiante', primary: ['Aductores', 'Glúteo medio', 'Cuádriceps'], secondary: ['Gastrocnemio y sóleo', 'Core'],
    cfg: { free: { type: 'run', cones: { n: 6, d: 3, x: 1.6 }, ...lateral([[0.9, 1], [0.4, 0], [1.4, -1], [0.3, 0], [0.8, 1], [0.5, 0], [0.9, -1]]) } },
    captions: {
      intro: 'Frente a un compañero, entre dos conos',
      reps: [
        ['Copia los desplazamientos del compañero como un espejo', 'Pasos laterales sin cruzar los pies'],
        ['Cadera baja y peso en la parte delantera del pie', 'Mirada al tronco del compañero'],
        ['Series de 10–15 s y cambio de rol', 'Reacciona, no adivines'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-004': {
    ...REA, name: 'Reacción con persecución (chase drill)', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.6, v: 6.6, acc: 2.2, hold: 0.8 }) } },
    captions: {
      intro: 'Dos atletas en fila, separados 1–2 m',
      reps: [
        ['Cuando sale el de delante, persíguelo para tocarlo', 'Reacciona a su salida, no a una señal'],
        ['Primer paso explosivo', 'Sprint de 10–15 m'],
        ['Cambiad de rol en cada repetición', 'Vuelve caminando'],
      ],
      orbit: ORB_R,
    },
  },
  'AG-REA-005': {
    ...REA, name: 'Reacción con discriminación de color', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...react({ wait: 1.8, yaw: -45, v: 5.0, acc: 1.6, hold: 0.3 }) } },
    captions: {
      intro: 'En posición atlética frente a conos de varios colores',
      reps: [
        ['El compañero dice un color y sales hacia ese cono', 'Decide rápido y sal en diagonal'],
        ['Primer paso hacia el cono correcto', 'Cadera baja en la salida'],
        ['Cambia el orden de los colores', 'Vuelve caminando al centro'],
      ],
      orbit: ORB_R,
    },
  },
});
