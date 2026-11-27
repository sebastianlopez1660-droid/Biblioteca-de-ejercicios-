// Lote 66: VE-RVE-008 … 011 y cambios de dirección AG-COD-001 … 006
import { EXERCISES } from './exercises.js';
import { VEL, RUN_FR, sprintProfile } from './ex_lote58.js';
import { CONES } from './ex_lote59.js';
import { RVE, shuttle } from './ex_lote65.js';

const run = (o, extra = {}) => ({ type: 'run', ...sprintProfile(o), cones: CONES, ...extra });
const ORB_R = ['Sprint repetido', 'Resistencia a la velocidad: músculos que trabajan', 'Recupera'];
export const AGI = { ...VEL, ...RUN_FR, sub: 'Cambio de dirección', primary: ['Cuádriceps', 'Glúteos', 'Aductores'], secondary: ['Core', 'Gastrocnemio y sóleo'],
  phaseNames: { BAJADA: 'EJERCICIO', SUBIDA: 'EJERCICIO', PAUSA: 'EJERCICIO', ARRIBA: 'EJERCICIO' }, holdLabel: 'EJERCICIO' };
export const AG_CONES = { n: 6, d: 3, x: 1.3 };
const ORB_C = ['Cambio de dirección', 'Agilidad: músculos que trabajan', 'Vuelve caminando'];

// carrera, apoyo de corte con cadera baja, giro de 'angle' grados (positivo = izquierda) y salida
export function cut({ angle = 90, v = 5.0, vc = 1.6, rest = 1.4, v2 = v } = {}) {
  const sg = Math.sign(angle) || 1, loop = 6.2 + rest;
  return {
    loop,
    speeds: [[0, 0], [0.5, 0], [0.9, v * 0.3], [2.3, v], [2.8, v], [3.3, vc], [3.6, vc], [4.8, v2], [5.3, v2], [6.2, 0], [loop, 0]],
    yaws: [[0, 0], [3.3, 0], [3.6, angle], [loop - 1.0, angle], [loop - 0.2, 0], [loop, 0]],
    banks: [[0, 0], [3.0, 0], [3.3, -sg * 12], [3.6, -sg * 14], [4.2, 0], [loop, 0]],
    leans: [[0, 4], [0.4, 4], [0.7, 30], [1.5, 18], [2.3, 10], [2.8, 8], [3.15, -8], [3.4, 4], [3.7, 24], [4.4, 16], [4.8, 10], [5.3, 8], [5.8, -8], [6.2, -3], [6.6, 4], [loop, 4]],
    dys: [[0, 0], [2.8, 0], [3.3, -0.14], [3.6, -0.13], [4.2, 0], [5.3, 0], [5.8, -0.08], [6.2, -0.10], [6.8, 0], [loop, 0]],
    widths: [[0, 0.09], [2.8, 0.09], [3.3, 0.16], [3.6, 0.14], [4.2, 0.09], [loop, 0.09]],
  };
}
// zigzag: tramos diagonales alternos con apoyos de corte
export function zigzag({ ang = 35, v = 4.2, seg = 1.5, n = 3, rest = 1.4 } = {}) {
  const speeds = [[0, 0], [0.5, 0], [1.3, v]], yaws = [[0, ang], [0.5, ang]], banks = [[0, 0], [0.5, 0]], dys = [[0, 0], [0.5, 0]], leans = [[0, 4], [0.4, 4], [0.7, 22], [1.3, 10]];
  let t = 1.3 + seg * 0.5, side = 1;
  for (let i = 0; i < n; i++) {
    speeds.push([t, v], [t + 0.25, v * 0.55], [t + 0.45, v * 0.55], [t + 0.8, v]);
    yaws.push([t + 0.2, side * ang], [t + 0.45, -side * ang]);
    banks.push([t, 0], [t + 0.25, side * 12], [t + 0.5, side * 10], [t + 0.9, 0]);
    dys.push([t, 0], [t + 0.25, -0.10], [t + 0.45, -0.09], [t + 0.85, 0]);
    leans.push([t, 10], [t + 0.25, 0], [t + 0.5, 14], [t + 0.9, 10]);
    side = -side; t += seg;
  }
  const end = t, loop = end + 0.9 + rest;
  speeds.push([end, v], [end + 0.9, 0], [loop, 0]);
  yaws.push([loop - 0.8, side * ang], [loop - 0.2, ang], [loop, ang]);
  banks.push([loop, 0]); dys.push([end + 0.5, -0.06], [end + 0.9, -0.08], [end + 1.3, 0], [loop, 0]); leans.push([end, 10], [end + 0.5, -8], [end + 0.9, -3], [end + 1.3, 4], [loop, 4]);
  return { loop, speeds, yaws, banks, dys, leans };
}

Object.assign(EXERCISES, {
  'VE-RVE-008': {
    ...RVE, name: 'Series de sprint con densidad creciente (descanso decreciente)', level: 'Avanzado',
    cfg: { free: run({ acc: 2.6, hold: 1.4, vmax: 7.2, lean0: 40, rest: 0.8 }) },
    captions: {
      intro: 'Salida de un tramo de 30–40 m',
      reps: [
        ['Sprint máximo con descanso cada vez más corto', 'Por ejemplo: 60 s, 45 s, 30 s…'],
        ['Mantén la técnica aunque llegue la fatiga', 'Brazos enérgicos hasta el final'],
        ['Para si la velocidad cae más de un 10 %', 'Vuelve caminando'],
      ],
      orbit: ORB_R,
    },
  },
  'VE-RVE-009': {
    ...RVE, name: 'Sprint prolongado submáximo (150-300 m)', level: 'Avanzado',
    cfg: { free: run({ acc: 3.0, hold: 3.6, dec: 2.0, vmax: 6.4, lean0: 30, rest: 1.2 }) },
    captions: {
      intro: 'Salida de un tramo de 150–300 m',
      reps: [
        ['Carrera rápida al 80–90 % durante todo el tramo', 'Reparte el esfuerzo: no salgas a tope'],
        ['Relaja hombros y cara', 'Mantén la frecuencia en el tramo final'],
        ['Recuperación completa de 3–5 min', 'Vuelve caminando'],
      ],
      orbit: ORB_R,
    },
  },
  'VE-RVE-010': {
    ...RVE, frame: { ...RUN_FR.frame, ty: RUN_FR.frame.ty + 0.5, tyLow: RUN_FR.frame.tyLow + 0.5 }, name: 'Sprint en cuesta descendente repetido (controlado)', level: 'Avanzado',
    cfg: { free: (() => { const p = run({ acc: 2.6, hold: 1.6, vmax: 7.4, lean0: 26, rest: 1.2 }); return { ...p, slope: -5, rampH: 0.5, leans: p.leans.map(([t, l]) => [t, l - 4]) }; })() },
    captions: {
      intro: 'En lo alto de una cuesta muy suave',
      reps: [
        ['Sprint cuesta abajo controlando la velocidad', 'Apoyos bajo la cadera, no por delante'],
        ['Frecuencia alta y tronco erguido', 'No frenes con los talones'],
        ['Pendiente mínima y pocas repeticiones', 'Recupera subiendo caminando'],
      ],
      orbit: ORB_R,
    },
  },
  'VE-RVE-011': {
    ...RVE, name: 'Test de sprints repetidos (protocolo RSA de evaluación)', level: 'Avanzado',
    phaseNames: { BAJADA: 'IDA Y VUELTA', SUBIDA: 'IDA Y VUELTA', PAUSA: 'IDA Y VUELTA', ARRIBA: 'IDA Y VUELTA' },
    cfg: { free: { type: 'run', cones: CONES, ...shuttle({ v1: 6.4, v2: 6.2, rest: 1.2 }) } },
    captions: {
      intro: 'Dos líneas separadas 20 m y un cronómetro',
      reps: [
        ['Sprint de ida y vuelta a máxima velocidad', 'Se cronometra cada repetición'],
        ['Descanso fijo y corto entre sprints (20–25 s)', 'Sal siempre desde la misma posición'],
        ['Anota el mejor tiempo y la media', 'La caída de rendimiento indica la fatiga'],
      ],
      orbit: ['Ida y vuelta', 'Sprints repetidos: músculos que trabajan', 'Recupera'],
    },
  },
  'AG-COD-001': {
    ...AGI, name: 'Cambio de dirección en V (V-cut)', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 140, v: 4.6, vc: 1.0 }) } },
    captions: {
      intro: 'Tres conos formando una V',
      reps: [
        ['Corre al cono del vértice, apoya y sal hacia el otro cono', 'Baja la cadera antes del apoyo'],
        ['Empuja con el pie exterior para cambiar de dirección', 'Tronco hacia la nueva dirección'],
        ['Alterna el lado de salida', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-002': {
    ...AGI, name: 'Cambio de dirección en L (L-cut)', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: -90, v: 4.6, vc: 1.4 }) } },
    captions: {
      intro: 'Dos tramos en ángulo recto marcados con conos',
      reps: [
        ['Corre recto, apoya en el cono y gira 90°', 'Sal acelerando por el segundo tramo'],
        ['Frena con pasos cortos antes del giro', 'Pie exterior firme en el apoyo'],
        ['Alterna giros a izquierda y derecha', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-003': {
    ...AGI, name: 'Cambio de dirección en zigzag con conos', level: 'Principiante',
    cfg: { free: { type: 'run', cones: AG_CONES, ...zigzag({}) } },
    captions: {
      intro: 'Conos en zigzag separados 3–5 m',
      reps: [
        ['Corre de cono a cono cambiando de dirección en cada uno', 'Apoyo con el pie exterior'],
        ['Baja la cadera en cada cambio', 'Mirada al siguiente cono'],
        ['Mantén el ritmo durante todo el zigzag', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-004': {
    ...AGI, name: 'Cambio de dirección a 45°', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 45, v: 5.4, vc: 3.2 }) } },
    captions: {
      intro: 'Tramo recto con un cono de corte a 45°',
      reps: [
        ['Corre y corta a 45° sin perder casi velocidad', 'Apoyo exterior bajo el centro de masas'],
        ['Inclina el cuerpo hacia la nueva dirección', 'Rodilla alineada con el pie'],
        ['Alterna el lado del corte', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-005': {
    ...AGI, name: 'Cambio de dirección a 90°', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 90, v: 5.2, vc: 1.4 }) } },
    captions: {
      intro: 'Tramo recto con un cono de giro a 90°',
      reps: [
        ['Frena antes del cono y gira 90° con un apoyo firme', 'Sal con pasos cortos y potentes'],
        ['Cadera baja y tronco firme en el apoyo', 'Brazos para ayudar al giro'],
        ['Alterna el lado del giro', 'Vuelve caminando al inicio'],
      ],
      orbit: ORB_C,
    },
  },
  'AG-COD-006': {
    ...AGI, name: 'Cambio de dirección a 180° (corte completo)', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: AG_CONES, ...cut({ angle: 180, v: 5.2, vc: 0.5, rest: 1.6 }) } },
    captions: {
      intro: 'Dos líneas separadas 5–10 m',
      reps: [
        ['Sprint a la línea, frena, gira 180° y vuelve', 'Frena en los últimos 2–3 pasos'],
        ['Apoyo de giro bajo y amplio', 'Gira la cadera hacia la salida'],
        ['Alterna el pie de giro', 'Acelera con pasos cortos al volver'],
      ],
      orbit: ORB_C,
    },
  },
});
