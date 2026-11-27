// Lote 62: cambios de ritmo VE-CRI-001 … 010
import { EXERCISES } from './exercises.js';
import { VEL, RUN_FR } from './ex_lote58.js';
import { CONES } from './ex_lote59.js';

export const CRI = { ...VEL, ...RUN_FR, sub: 'Cambio de ritmo', primary: ['Isquiotibiales', 'Glúteos', 'Cuádriceps'], secondary: ['Core', 'Gastrocnemio y sóleo'] };

const profV = (sp, t) => { for (let i = 1; i < sp.length; i++) if (t <= sp[i][0]) { const [t0, v0] = sp[i - 1], [t1, v1] = sp[i]; const k = (t - t0) / Math.max(1e-6, t1 - t0); const s = k * k * (3 - 2 * k); return v0 + (v1 - v0) * s; } return sp[sp.length - 1][1]; };
// perfil de velocidades → inclinación del tronco según velocidad y aceleración (suavizada)
export function paceProfile(speeds, { kv = 0.9, ka = 5.0, base = 3, max = 34, min = -12 } = {}) {
  const loop = speeds[speeds.length - 1][0], h = 0.1, raw = [];
  for (let t = 0; t <= loop + 1e-6; t += h) {
    const v = profV(speeds, t), a = (profV(speeds, Math.min(loop, t + 0.05)) - profV(speeds, Math.max(0, t - 0.05))) / 0.1;
    raw.push([+t.toFixed(2), Math.max(min, Math.min(max, base + kv * v + ka * a))]);
  }
  const leans = raw.map(([t], i) => { let s = 0, n = 0; for (let j = Math.max(0, i - 3); j <= Math.min(raw.length - 1, i + 3); j++) { s += raw[j][1]; n++; } return [t, +(s / n).toFixed(2)]; });
  leans[leans.length - 1][1] = leans[0][1];
  return { loop, speeds, leans };
}
const pace = (speeds, extra = {}) => ({ type: 'run', cones: CONES, ...paceProfile(speeds), ...extra });
const ORB = ['Cambio de ritmo', 'Carrera: músculos que trabajan', 'Frena progresivamente'];

Object.assign(EXERCISES, {
  'VE-CRI-001': {
    ...CRI, name: 'Sprint con cambio de ritmo (surge run)', level: 'Intermedio',
    cfg: { free: pace([[0, 0], [0.5, 0], [2.0, 4.5], [3.4, 4.5], [4.3, 7.6], [5.6, 7.6], [6.6, 4.5], [7.4, 4.5], [8.8, 0], [10.0, 0]]) },
    captions: {
      intro: 'Recorrido de 60–80 m con una zona de cambio marcada',
      reps: [
        ['Corre a ritmo medio y, en la zona marcada, acelera de golpe', 'Vuelve al ritmo medio tras el tramo rápido'],
        ['El cambio sale de empujar más fuerte el suelo', 'Sin perder la postura alta'],
        ['Tramos rápidos de 10–20 m', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-002': {
    ...CRI, name: 'Carrera con aceleración-desaceleración alternada (fartlek corto)', level: 'Intermedio',
    cfg: { free: pace([[0, 0], [0.5, 0], [2.3, 6.4], [2.9, 6.4], [3.9, 3.2], [4.5, 3.2], [5.8, 6.4], [6.4, 6.4], [7.4, 3.2], [8.0, 3.2], [9.2, 0], [10.4, 0]]) },
    captions: {
      intro: 'Recorrido con conos cada 10–15 m',
      reps: [
        ['Acelera hasta un cono y suelta el ritmo hasta el siguiente', 'Alterna rápido y suave sin parar'],
        ['Frena bajando la frecuencia, no con los talones', 'Vuelve a acelerar con pasos potentes'],
        ['Series de 4–6 cambios', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-003': {
    ...CRI, name: 'Cambios de ritmo en distancia fija (ins-and-outs)', level: 'Intermedio',
    cfg: { free: pace([[0, 0], [0.5, 0], [2.6, 7.4], [3.6, 7.4], [4.4, 6.0], [5.4, 6.0], [6.2, 7.6], [7.2, 7.6], [8.6, 0], [9.8, 0]]) },
    captions: {
      intro: 'Recorrido de 60 m dividido en tres tramos de 20 m',
      reps: [
        ['Tramo rápido, tramo flotante y tramo rápido', 'En el tramo flotante relaja sin frenar'],
        ['Mantén la técnica al cambiar de ritmo', 'Postura alta y apoyos rápidos'],
        ['Recupera por completo entre series', 'Frena progresivamente al final'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-004': {
    ...CRI, name: 'Carrera con variación de ritmo cada 10 m', level: 'Intermedio',
    cfg: { free: pace([[0, 0], [0.5, 0], [1.8, 4.0], [3.0, 4.0], [3.6, 6.2], [4.6, 6.2], [5.3, 4.0], [6.3, 4.0], [6.9, 6.4], [7.9, 6.4], [9.2, 0], [10.4, 0]]) },
    captions: {
      intro: 'Recorrido con un cono cada 10 m',
      reps: [
        ['Cambia de ritmo en cada cono: suave, rápido, suave…', 'Cambios claros y controlados'],
        ['Acelera empujando y suelta relajando los hombros', 'Mantén la frecuencia de paso'],
        ['4–6 tramos por serie', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-005': {
    ...CRI, name: 'Cambio de ritmo con salida desde trote', level: 'Intermedio',
    cfg: { free: pace([[0, 3.0], [1.6, 3.0], [3.4, 7.4], [4.6, 7.4], [5.8, 3.0], [7.4, 3.0]]) },
    captions: {
      intro: 'Trotando de forma relajada',
      reps: [
        ['A la marca, pasa del trote al sprint', 'Inclina el cuerpo y empuja fuerte'],
        ['Brazos más rápidos para subir la frecuencia', 'Vuelve al trote tras 15–20 m'],
        ['Repite sin parar entre cambios', 'Postura alta durante el trote'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-006': {
    ...CRI, name: 'Carrera progresiva con sprint final', level: 'Intermedio',
    cfg: { free: pace([[0, 0], [0.5, 0], [1.6, 3.0], [3.6, 4.6], [5.2, 5.8], [6.2, 8.0], [7.4, 8.0], [8.9, 0], [10.2, 0]]) },
    captions: {
      intro: 'Recorrido de 60–80 m',
      reps: [
        ['Empieza suave y sube el ritmo poco a poco', 'Los últimos 20 m, sprint máximo'],
        ['Cada tramo un poco más rápido', 'En el sprint final, rodillas arriba'],
        ['Mantén la técnica hasta el final', 'Frena progresivamente'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-007': {
    ...CRI, name: 'Cambio de ritmo en curva', level: 'Intermedio',
    cfg: { free: { ...pace([[0, 0], [0.5, 0], [2.0, 4.6], [3.2, 4.6], [4.2, 7.0], [5.6, 7.0], [7.0, 0], [8.4, 0]]),
      banks: [[0, 0], [0.5, 0], [2.0, 6], [3.2, 6], [4.2, 11], [5.6, 11], [7.0, 0], [8.4, 0]], cones: { ...CONES, both: false, x: -1.4 } } },
    captions: {
      intro: 'Recorrido en curva marcado con conos por el interior',
      reps: [
        ['Corre la curva a ritmo medio y acelera en la segunda mitad', 'Inclina el cuerpo hacia el interior'],
        ['Brazo exterior con más amplitud', 'Pie exterior empuja hacia dentro de la curva'],
        ['Cambia el sentido de la curva entre series', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-008': {
    ...CRI, name: 'Carrera con cambios de ritmo dirigidos por señal', level: 'Avanzado',
    cfg: { free: pace([[0, 0], [0.5, 0], [2.0, 4.2], [2.8, 4.2], [3.8, 7.2], [4.6, 7.2], [5.4, 4.2], [6.6, 4.2], [7.4, 7.0], [8.0, 7.0], [9.4, 0], [10.6, 0]]) },
    captions: {
      intro: 'Corriendo a ritmo medio, atento a la señal del compañero',
      reps: [
        ['Con cada señal, cambia de ritmo al instante', 'Rápido o suave según la consigna'],
        ['Reacciona sin perder la postura', 'Acelera empujando el suelo'],
        ['Señales a intervalos irregulares', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-009': {
    ...CRI, name: 'Cambio de ritmo con desaceleración y nueva aceleración', level: 'Avanzado',
    cfg: { free: { ...pace([[0, 0], [0.5, 0], [2.9, 6.6], [3.4, 6.6], [4.3, 1.8], [4.8, 1.8], [6.4, 7.0], [7.2, 7.0], [8.6, 0], [10.0, 0]]),
      dys: [[0, 0], [3.4, 0], [4.1, -0.14], [4.8, -0.10], [5.3, 0], [10.0, 0]], widths: [[0, 0.09], [3.4, 0.09], [4.3, 0.15], [4.8, 0.12], [5.4, 0.09], [10.0, 0.09]] } },
    captions: {
      intro: 'Recorrido con una zona de frenada en el centro',
      reps: [
        ['Sprint, frena casi hasta parar y vuelve a acelerar', 'Baja la cadera al frenar'],
        ['De la frenada a la aceleración sin pausa', 'Primeros pasos cortos y potentes'],
        ['Tronco firme en todo el recorrido', 'Recupera caminando'],
      ],
      orbit: ORB,
    },
  },
  'VE-CRI-010': {
    ...CRI, name: 'Carrera de tempo con variaciones de ritmo', level: 'Avanzado',
    cfg: { free: pace([[0, 0], [0.5, 0], [1.6, 4.4], [3.0, 4.4], [3.8, 5.7], [5.0, 5.7], [5.8, 4.4], [7.0, 4.4], [8.2, 0], [9.6, 0]]) },
    captions: {
      intro: 'Carrera continua a ritmo de tempo (70–80 %)',
      reps: [
        ['Sube el ritmo unos segundos y vuelve al tempo', 'Cambios suaves y controlados'],
        ['Respiración y postura estables', 'Hombros relajados'],
        ['Bloques de 2–4 min con variaciones', 'Termina trotando suave'],
      ],
      orbit: ORB,
    },
  },
});
