// Lote 58: saltos reactivos PL-REJ-005 … 007 y sprint VE-SPR-001 … 007
import { EXERCISES } from './exercises.js';
import { jumpKeys } from './ex_lote18.js';
import { UP } from './ex_lote51.js';
import { latJump } from './ex_lote53.js';
import { PRE } from './ex_lote57.js';
import { seq } from './ex_lote54.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const READY = { L: [0.04, 0, 0, 0], R: [-0.04, 0, 0, 0], k: 0.90, pz: -0.03, lean: 18, arm: 25 };
const RFR = { frame: { tz: 0.0, dist: 6.0, ty: 1.30, distLow: 5.6, tyLow: 1.25 } };
// carrera
export const RUNPH = { phaseNames: { BAJADA: 'EN CARRERA', SUBIDA: 'EN CARRERA', PAUSA: 'EN CARRERA', ARRIBA: 'EN CARRERA' }, holdLabel: 'EN CARRERA' };
export const VEL = { family: 'free', sub: 'Velocidad', primary: ['Isquiotibiales', 'Glúteos', 'Cuádriceps', 'Gastrocnemio y sóleo'], secondary: ['Flexores de cadera', 'Core'], labelAll: true, ...RUNPH, tempo: { down: 3, pause: 0, up: 3 } };
export const RUN_FR = { frame: { dist: 5.0, ty: 0.98, tz: 0.0, distLow: 4.6, tyLow: 0.95 },
  views: { f34: { az: -60, el: 10 }, side: { az: -90, el: 4 }, front: { az: -30, el: 10 }, back34: { az: -140, el: 14 } }, orbit: { view: 'side', sweep: 120 } };
// perfil de un sprint repetido: arranque, mantenimiento, frenado y pausa
export function sprintProfile({ acc = 2.6, hold = 1.0, dec = 1.8, rest = 1.4, vmax = 7.5, lean0 = 40 } = {}) {
  const t1 = 0.5, t2 = t1 + acc, t3 = t2 + hold, t4 = t3 + dec, t5 = t4 + rest;
  return { loop: t5, speeds: [[0, 0], [t1, 0], [t1 + 0.4, vmax * 0.3], [t2, vmax], [t3, vmax], [t4, 0], [t5, 0]],
    leans: [[0, 4], [t1 - 0.2, 4], [t1 + 0.1, lean0], [t1 + 0.9, lean0 * 0.6], [t2, 10], [t3, 10], [t3 + dec * 0.5, -8], [t4, -4], [t4 + 0.5, 3], [t5, 4]] };
}
const CONES = { n: 6, d: 4, x: 1.5 };

Object.assign(EXERCISES, {
  'PL-REJ-005': {
    ...like('TI-PLI-003', {}), ...PRE, name: 'Salto reactivo a cajón con elección de altura', level: 'Intermedio',
    captions: {
      intro: 'De pie frente a cajones de distintas alturas',
      reps: [
        ['El compañero señala un cajón y saltas a él', 'Reacciona y ajusta la altura del salto'],
        ['Aterriza suave en el centro del cajón', 'Baja del cajón con control'],
        ['Varía el cajón en cada repetición', 'Calidad del aterrizaje ante todo'],
      ],
      orbit: ['Aterriza arriba', 'Reacción: músculos que trabajan', 'Baja controlando'],
    },
  },
  'PL-REJ-006': {
    ...like('PL-REJ-001', {}), name: 'Salto reactivo en pareja', level: 'Intermedio',
    captions: {
      intro: 'Frente a un compañero, en posición atlética',
      reps: [
        ['Salta cuando tu compañero salte o te dé la señal', 'Imita su salto lo más rápido posible'],
        ['Peso en la parte delantera del pie', 'Aterriza suave y vuelve a la posición'],
        ['Cambiad de rol cada serie', 'Variad el momento del salto'],
      ],
      orbit: ['Aterriza y estabiliza', 'Reacción: músculos que trabajan', 'Vuelve a la espera'],
    },
  },
  'PL-REJ-007': {
    ...PRE, ...RFR, phaseNames: { BAJADA: 'ESPERA Y SALTA', PAUSA: 'ESTABILIZA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ESTABILIZA',
    secondary: ['Glúteo medio', 'Core', 'Isquiotibiales'], name: 'Salto reactivo unipodal con estímulo', level: 'Intermedio', tempo: { down: 2.4, pause: 1.0, up: 1.2 }, rest: 0.6,
    cfg: { free: { type: 'jumpKF', stance: 0.09, free: 'R',
      down: (() => { const J = jumpKeys({ h: 0.16, t0: 0.40, cm: 0.88 }); return [{ ...ST, u: 0 }, { ...READY, u: 0.18 }, { ...READY, u: 0.40 }, ...J.slice(2)].map((k, i) => ({ ...k, R: [0, i === 2 ? 80 : 72, i === 3 ? 32 : 22, 20] })); })(),
      up: UP.map((k) => ({ ...k, R: [0, 72, 22, 20] })) } },
    captions: {
      intro: 'De pie sobre una pierna, atento a la señal',
      reps: [
        ['Salta con una pierna en cuanto recibas la señal', 'Aterriza sobre la misma pierna y estabiliza'],
        ['La rodilla no se va hacia dentro', 'Brazos para equilibrar'],
        ['Señales impredecibles', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Estabiliza', 'Reacción: músculos que trabajan', 'Vuelve a la espera'],
    },
  },
  'VE-SPR-001': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint lineal 20 m', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 2.4, hold: 0.6, vmax: 7.2 }), cones: CONES } },
    captions: {
      intro: 'De pie en la línea de salida, pie adelantado',
      reps: [
        ['Arranca con el tronco inclinado y empuja fuerte el suelo', 'Ve enderezándote a medida que ganas velocidad'],
        ['Brazos a 90° con braceo enérgico', 'Apoyos bajo la cadera sobre el antepié'],
        ['20 m a máxima intensidad', 'Recupera caminando 1–2 min'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-002': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint lineal 40 m', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 2.8, hold: 2.0, vmax: 8.0 }), cones: CONES } },
    captions: {
      intro: 'De pie en la línea de salida, pie adelantado',
      reps: [
        ['Fase de aceleración con el tronco inclinado', 'Pasa a postura erguida al llegar a velocidad máxima'],
        ['Rodillas altas y apoyos activos bajo la cadera', 'Hombros relajados'],
        ['40 m a máxima intensidad', 'Recupera 2–3 min entre repeticiones'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-003': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint lineal 60 m', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 3.0, hold: 3.5, dec: 2.4, vmax: 8.4 }), cones: CONES } },
    captions: {
      intro: 'De pie en la línea de salida, pie adelantado',
      reps: [
        ['Acelera progresivamente durante los primeros 20–30 m', 'Mantén la velocidad máxima sin tensarte'],
        ['Postura alta, cadera adelantada', 'Braceo amplio y relajado'],
        ['Frena de forma progresiva tras la meta', 'Recupera 3–4 min'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-004': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint con salida de tres puntos', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 2.6, hold: 1.0, vmax: 7.5, lean0: 55 }), cones: CONES } },
    captions: {
      intro: 'En posición de tres puntos: una mano en el suelo y cadera alta',
      reps: [
        ['Empuja con las dos piernas y lanza el brazo contrario al frente', 'Primeros pasos cortos y potentes'],
        ['Tronco muy inclinado en la salida', 'Ve enderezándote paso a paso'],
        ['Mirada al suelo al principio, al frente después', 'Recupera caminando'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-005': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint con salida de bloques', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 2.8, hold: 1.2, vmax: 8.0, lean0: 60 }), cones: CONES } },
    captions: {
      intro: 'Pies en los bloques, manos detrás de la línea',
      reps: [
        ['Al disparo empuja los dos bloques y lanza los brazos', 'Salida baja con el tronco casi horizontal'],
        ['Primeros apoyos detrás de la cadera', 'Endereza el tronco de forma progresiva'],
        ['Ajusta los bloques a tu longitud de piernas', 'Recupera caminando'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-006': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint resistido con paracaídas', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 3.0, hold: 1.5, vmax: 6.6, lean0: 45 }), cones: CONES, tether: { to: [0, 1.0, -3.2] } } },
    captions: {
      intro: 'Con el paracaídas sujeto a la cintura',
      reps: [
        ['Sprint contra la resistencia del paracaídas', 'Mantén la técnica: no te encorves'],
        ['Inclinación algo mayor que en el sprint libre', 'Brazos enérgicos'],
        ['20–30 m por repetición', 'Recupera caminando'],
      ],
      orbit: ['Velocidad máxima', 'Sprint resistido: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-007': {
    ...VEL, ...RUN_FR, sub: 'Sprint', name: 'Sprint resistido con trineo de arrastre', level: 'Intermedio',
    cfg: { free: { type: 'run', ...sprintProfile({ acc: 3.2, hold: 1.5, vmax: 5.6, lean0: 50 }), cones: CONES, tether: { to: [0, 0.22, -2.6] } },
      items: [{ kind: 'box', w: 0.55, h: 0.22, d: 0.70, z: -2.95 }] },
    captions: {
      intro: 'Con el arnés del trineo sujeto a la cintura',
      reps: [
        ['Empuja fuerte el suelo para arrastrar el trineo', 'Tronco inclinado y empuje completo de la pierna'],
        ['Carga que no rompa la técnica de carrera', 'Brazos enérgicos'],
        ['10–20 m por repetición', 'Recupera caminando'],
      ],
      orbit: ['Empuje máximo', 'Sprint resistido: músculos que trabajan', 'Frena progresivamente'],
    },
  },
});
