// Lote 60: aceleración VE-ACE-003 … 011 y desaceleración VE-DEC-001
import { EXERCISES } from './exercises.js';
import { VEL, RUN_FR, sprintProfile } from './ex_lote58.js';
import { ACE, CONES } from './ex_lote59.js';

const run = (o, extra = {}) => ({ type: 'run', ...sprintProfile(o), cones: CONES, ...extra });
export const DEC = { ...VEL, sub: 'Desaceleración', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Core', 'Isquiotibiales'] };
const rampFrame = (h) => ({ frame: { ...RUN_FR.frame, ty: RUN_FR.frame.ty + h, tyLow: RUN_FR.frame.tyLow + h } });

// sprint corto + frenada: bajada de cadera, apoyos más anchos y tronco atrás; termina en posición atlética
export function brakeProfile({ acc = 2.4, vmax = 6.4, hold = 0.5, dec = 1.0, rest = 1.8, drop = 0.21, lean0 = 38, back = -14, wide = 0.17 } = {}) {
  const t1 = 0.5, t2 = t1 + acc, t3 = t2 + hold, t4 = t3 + dec, t5 = t4 + rest;
  return {
    loop: t5, _stop: t4,
    speeds: [[0, 0], [t1, 0], [t1 + 0.4, vmax * 0.3], [t2, vmax], [t3, vmax], [t4, 0], [t5, 0]],
    leans: [[0, 4], [t1 - 0.2, 4], [t1 + 0.1, lean0], [t1 + 0.9, lean0 * 0.6], [t2, 10], [t3, 8], [t3 + dec * 0.45, back], [t4, back * 0.3], [t4 + 0.35, 16], [t5 - 0.5, 16], [t5, 4]],
    dys: [[0, 0], [t3, 0], [t3 + dec * 0.6, -drop * 0.8], [t4, -drop], [t5 - 0.5, -drop], [t5, 0]],
    widths: [[0, 0.09], [t3, 0.09], [t4, wide], [t5 - 0.5, wide], [t5, 0.09]],
  };
}

Object.assign(EXERCISES, {
  'VE-ACE-003': {
    ...ACE, ...RUN_FR, name: 'Aceleración desde posición tumbada', level: 'Intermedio',
    cfg: { free: { ...run({ acc: 2.4, hold: 0.3, dec: 1.6, rest: 1.4, vmax: 6.2, lean0: 62 }),
      dys: [[0, -0.30], [0.5, -0.30], [1.3, 0], [5.6, 0], [6.2, -0.30]] } },
    captions: {
      intro: 'Tumbado boca abajo, manos bajo los hombros',
      reps: [
        ['A la señal, levántate con un empuje de brazos y arranca', 'Primeros pasos bajos y potentes'],
        ['No te pongas de pie antes de correr: sal ya inclinado', 'Brazos enérgicos'],
        ['10 m a máxima intensidad', 'Vuelve caminando y túmbate de nuevo'],
      ],
      orbit: ['Aceleración', 'Arranque: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-004': {
    ...ACE, ...RUN_FR, name: 'Aceleración con salida lateral', level: 'Intermedio',
    cfg: { free: { ...run({ acc: 2.4, hold: 0.3, dec: 1.6, rest: 1.6, vmax: 6.2, lean0: 40 }),
      yaws: [[0, 90], [0.5, 90], [0.95, 0], [5.8, 0], [6.4, 90]] } },
    captions: {
      intro: 'De pie de lado a la dirección de carrera, en posición atlética',
      reps: [
        ['Gira la cadera hacia la carrera con un paso cruzado', 'Arranca en línea recta sin pausa'],
        ['Empuja con la pierna de atrás al girar', 'Tronco inclinado tras el giro'],
        ['Alterna el lado de salida', 'Recupera caminando'],
      ],
      orbit: ['Aceleración', 'Arranque: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-005': {
    ...ACE, ...RUN_FR, name: 'Aceleración con resistencia manual de compañero', level: 'Intermedio',
    cfg: { free: run({ acc: 2.8, hold: 0.8, dec: 1.6, rest: 1.4, vmax: 4.6, lean0: 52 }, { tether: { to: [0, 1.05, -1.3], two: true } }) },
    captions: {
      intro: 'Un compañero detrás sujeta una cinta alrededor de tu cintura',
      reps: [
        ['Arranca empujando contra la resistencia del compañero', 'Pasos cortos y potentes'],
        ['Tronco inclinado y empuje completo de cadera', 'El compañero cede poco a poco'],
        ['5–10 m con resistencia', 'Opción: el compañero suelta y sigues libre'],
      ],
      orbit: ['Empuje máximo', 'Arranque resistido: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-006': {
    ...ACE, ...RUN_FR, ...rampFrame(0.5), name: 'Aceleración en cuesta ascendente', level: 'Intermedio',
    cfg: { free: (() => { const p = run({ acc: 2.8, hold: 0.8, dec: 1.6, rest: 1.4, vmax: 5.2, lean0: 50 }); return { ...p, slope: 8, rampH: 0.5, leans: p.leans.map(([t, l]) => [t, l + 6]) }; })() },
    captions: {
      intro: 'Al pie de una cuesta de pendiente moderada',
      reps: [
        ['Arranca cuesta arriba con pasos cortos y potentes', 'Empuja el suelo hacia atrás'],
        ['Rodillas arriba y brazos enérgicos', 'Inclínate con la pendiente, no desde la cintura'],
        ['10–20 m de subida', 'Recupera bajando caminando'],
      ],
      orbit: ['Aceleración en subida', 'Arranque: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-007': {
    ...ACE, ...RUN_FR, name: 'Aceleración con trineo ligero', level: 'Intermedio',
    cfg: { free: run({ acc: 3.0, hold: 1.0, vmax: 5.4, lean0: 50 }, { tether: { to: [0, 0.22, -2.6] } }),
      items: [{ kind: 'box', w: 0.55, h: 0.18, d: 0.70, z: -2.95 }] },
    captions: {
      intro: 'Arnés a la cintura enganchado a un trineo con poca carga',
      reps: [
        ['Arranca arrastrando el trineo sin perder la técnica', 'Pasos potentes y tronco inclinado'],
        ['Carga ligera: no más del 10–20 % del peso corporal', 'Brazos enérgicos'],
        ['10–20 m por repetición', 'Recupera caminando'],
      ],
      orbit: ['Empuje máximo', 'Arranque resistido: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-008': {
    ...ACE, ...RUN_FR, name: 'Aceleración con salida reactiva a estímulo', level: 'Avanzado',
    cfg: { free: run({ acc: 2.2, hold: 0.3, dec: 1.6, rest: 2.4, vmax: 6.2, lean0: 42 }) },
    captions: {
      intro: 'En posición de salida, atento a la señal del compañero',
      reps: [
        ['Arranca en cuanto oigas o veas la señal', 'Sin anticiparte: espera el estímulo'],
        ['Primer paso explosivo y corto', 'Tronco inclinado en la salida'],
        ['Cambia el tipo de señal: voz, palmada o luz', 'Recupera caminando'],
      ],
      orbit: ['Aceleración', 'Reacción: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-009': {
    ...ACE, ...RUN_FR, name: 'Aceleración de 10 m con foco técnico', level: 'Avanzado',
    cfg: { free: run({ acc: 2.2, hold: 0.2, dec: 1.6, rest: 1.6, vmax: 6.0, lean0: 45 }) },
    captions: {
      intro: 'De pie en la salida de un tramo de 10 m',
      reps: [
        ['Inclinación de todo el cuerpo en línea con la pierna de empuje', 'Apoyos por detrás de la cadera'],
        ['Rodilla al frente y tobillo firme', 'Brazos amplios y enérgicos'],
        ['Una sola consigna técnica por serie', 'Recupera por completo'],
      ],
      orbit: ['Aceleración', 'Arranque: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-010': {
    ...ACE, ...RUN_FR, name: 'Aceleración con arrastre de paracaídas', level: 'Avanzado',
    cfg: { free: run({ acc: 3.0, hold: 1.4, vmax: 6.0, lean0: 46 }, { tether: { to: [0, 1.05, -1.75] } }),
      items: [{ kind: 'chute', z: -2.45, y0: 1.05, lines: 0.7 }] },
    captions: {
      intro: 'Paracaídas enganchado a la cintura con el arnés',
      reps: [
        ['Arranca y acelera: el paracaídas se abre detrás', 'Mantén la técnica de carrera'],
        ['Tronco inclinado y empuje potente', 'No te dejes frenar: frecuencia alta'],
        ['20–30 m por repetición', 'Recupera caminando'],
      ],
      orbit: ['Empuje máximo', 'Aceleración resistida: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-011': {
    ...ACE, ...RUN_FR, name: 'Aceleración progresiva (build-up run)', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: CONES, loop: 9.5,
      speeds: [[0, 0], [0.5, 0], [1.2, 2.0], [3.2, 4.5], [5.4, 7.2], [6.4, 7.2], [8.0, 0], [9.5, 0]],
      leans: [[0, 4], [0.5, 4], [0.9, 12], [3.2, 9], [5.4, 10], [6.4, 10], [7.2, -8], [8.0, -4], [8.6, 3], [9.5, 4]] } },
    captions: {
      intro: 'De pie en la salida de un tramo de 40–60 m',
      reps: [
        ['Empieza trotando y sube la velocidad poco a poco', 'Termina cerca de tu máxima velocidad'],
        ['Cada tramo, un poco más rápido y relajado', 'Postura alta y apoyos rápidos'],
        ['Ideal como calentamiento antes de sprints', 'Recupera caminando'],
      ],
      orbit: ['Velocidad alta', 'Carrera progresiva: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-DEC-001': {
    ...DEC, ...RUN_FR, name: 'Desaceleración lineal controlada tras sprint', level: 'Intermedio',
    phaseNames: { BAJADA: 'SPRINT Y FRENADA', SUBIDA: 'SPRINT Y FRENADA', PAUSA: 'SPRINT Y FRENADA', ARRIBA: 'SPRINT Y FRENADA' }, holdLabel: 'FRENADA',
    cfg: { free: { type: 'run', cones: CONES, ...brakeProfile({}) } },
    captions: {
      intro: 'En la salida de un tramo de sprint con un cono de frenada',
      reps: [
        ['Sprint hasta el cono y frena en pocos pasos', 'Baja la cadera al frenar'],
        ['Apoyos más anchos y cortos en la frenada', 'Tronco firme, sin irte hacia delante'],
        ['Termina quieto en posición atlética', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Frenada controlada', 'Desaceleración: músculos que trabajan', 'Vuelve caminando'],
    },
  },
});
