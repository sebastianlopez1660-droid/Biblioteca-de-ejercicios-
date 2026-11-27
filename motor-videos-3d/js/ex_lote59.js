// Lote 59: saltos reactivos PL-REJ-008 … 011, sprint VE-SPR-008 … 011 y aceleración VE-ACE-001, 002
import { EXERCISES } from './exercises.js';
import { jumpKeys } from './ex_lote18.js';
import { latJump } from './ex_lote53.js';
import { PRE } from './ex_lote57.js';
import { VEL, RUN_FR, sprintProfile } from './ex_lote58.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const mv = (keys, dx, dy, dz) => keys.map((k) => ({ ...k, L: [k.L[0] + dx, k.L[1] + dy, k.L[2] + dz, k.L[3]], R: [k.R[0] + dx, k.R[1] + dy, k.R[2] + dz, k.R[3]] }));
export const CONES = { n: 6, d: 4, x: 1.5 };
export const ACE = { ...VEL, sub: 'Aceleración', primary: ['Cuádriceps', 'Glúteos', 'Flexores de cadera'], secondary: ['Gastrocnemio y sóleo', 'Core'] };
const SPR = { ...VEL, sub: 'Sprint' };
const run = (o, extra = {}) => ({ type: 'run', ...sprintProfile(o), cones: CONES, ...extra });

Object.assign(EXERCISES, {
  'PL-REJ-008': {
    ...like('PL-REJ-001', {}), secondary: ['Deltoides', 'Isquiotibiales', 'Core'], name: 'Salto reactivo con recepción de balón (catch and jump)', level: 'Avanzado',
    cfg: { free: { ...EXERCISES['PL-REJ-001'].cfg.free, down: EXERCISES['PL-REJ-001'].cfg.free.down.map((k, i, a) => (i >= a.length - 4 && i <= a.length - 3 ? { ...k, arm: 178 } : k)) } },
    captions: {
      intro: 'En posición atlética, el compañero sostiene un balón',
      reps: [
        ['Salta a atrapar el balón en el punto más alto', 'El compañero lo lanza en momentos distintos'],
        ['Brazos arriba con fuerza al despegar', 'Aterriza suave con el balón'],
        ['Mirada en el balón durante todo el salto', 'Devuelve el balón y vuelve a la espera'],
      ],
      orbit: ['Aterriza y estabiliza', 'Reacción: músculos que trabajan', 'Vuelve a la espera'],
    },
  },
  'PL-REJ-009': {
    ...PRE, frame: { tz: 0.10, dist: 6.0, ty: 1.20, distLow: 5.6, tyLow: 1.10 }, views: { f34: { az: -40 }, side: { az: -80 }, front: { az: -15 } },
    phaseNames: { BAJADA: 'SALTO A LA SEÑAL', PAUSA: 'ESTABILIZA', SUBIDA: 'VUELVE AL CENTRO', ARRIBA: 'CENTRO' }, holdLabel: 'ESTABILIZA',
    secondary: ['Glúteo medio', 'Aductores', 'Core'], name: 'Salto reactivo multidireccional', level: 'Avanzado', tempo: { down: 1.6, pause: 0.5, up: 1.5 }, rest: 0.4,
    cfg: { free: { type: 'jumpKF', stance: 0.13, down: latJump({ dx: 0.50, h: 0.18 }), up: latJump({ dx: -0.50, x0: 0.50, h: 0.16 }),
      repDown: [latJump({ dx: 0.50, h: 0.18 }), jumpKeys({ h: 0.20, land: [0, 0.55] }), latJump({ dx: -0.50, h: 0.18 }), jumpKeys({ h: 0.16, land: [0, -0.45] })],
      repUp: [latJump({ dx: -0.50, x0: 0.50, h: 0.16 }), mv(jumpKeys({ h: 0.14, land: [0, -0.55] }), 0, 0, 0.55), latJump({ dx: 0.50, x0: -0.50, h: 0.16 }), mv(jumpKeys({ h: 0.14, land: [0, 0.45] }), 0, 0, -0.45)] } },
    captions: {
      intro: 'En el centro de una cruz marcada en el suelo, posición atlética',
      reps: [
        ['Salta en la dirección que indique el compañero', 'Vuelve saltando al centro'],
        ['Adelante, atrás o a los lados: reacciona sin anticiparte', 'Aterriza estable en cada salto'],
        ['Rodillas alineadas en todas las direcciones', 'Series cortas de máxima atención'],
      ],
      orbit: ['Estabiliza', 'Reacción: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'PL-REJ-010': {
    ...like('PL-SHO-007', {}), ...PRE, name: 'Salto reactivo con obstáculo inesperado', level: 'Avanzado',
    captions: {
      intro: 'Avanzando con saltos cortos; el compañero coloca obstáculos bajos',
      reps: [
        ['Ajusta el salto al obstáculo que aparece', 'Supéralo sin romper el ritmo'],
        ['Mirada al frente para detectarlo a tiempo', 'Rodillas arriba al saltar'],
        ['Aterrizajes suaves', 'Obstáculos blandos para más seguridad'],
      ],
      orbit: ['Aterriza y estabiliza', 'Reacción: músculos que trabajan', 'Sigue avanzando'],
    },
  },
  'PL-REJ-011': {
    ...like('PL-SHO-011', {}), ...PRE, primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], name: 'Salto reactivo de precisión (diana en el suelo)', level: 'Avanzado',
    cfg: { ...EXERCISES['PL-SHO-011'].cfg, free: { ...EXERCISES['PL-SHO-011'].cfg.free, travel: 0, down: jumpKeys({ h: 0.24, land: [0.065, 1.0] }), up: mv(jumpKeys({ h: 0.10, land: [-0.065, -1.0], cm: 0.95 }), 0, 0.065, 1.0) },
      items: [{ kind: 'foamPad', z: 1.0 }] },
    track: false, frame: { tz: 0.5, dist: 6.0, ty: 1.20, distLow: 5.6, tyLow: 1.10 },
    captions: {
      intro: 'De pie frente a una diana marcada en el suelo',
      reps: [
        ['Salta y aterriza con los dos pies dentro de la diana', 'Clava el aterrizaje sin moverte'],
        ['Controla la distancia, no la fuerza máxima', 'Rodillas alineadas al caer'],
        ['Cambia la distancia de la diana entre series', 'Vuelve saltando atrás con calma'],
      ],
      orbit: ['Aterrizaje clavado', 'Precisión: músculos que trabajan', 'Vuelve al inicio'],
    },
  },
  'VE-SPR-008': {
    ...SPR, ...RUN_FR, name: 'Sprint asistido en bajada (downhill assisted)', level: 'Avanzado',
    cfg: { free: run({ acc: 2.6, hold: 1.6, vmax: 8.8, lean0: 30 }) },
    captions: {
      intro: 'En lo alto de una pendiente muy suave (1–3 %)',
      reps: [
        ['Corre cuesta abajo aprovechando la pendiente para ir más rápido', 'Mantén la frecuencia alta'],
        ['No frenes con los talones: apoyos bajo la cadera', 'Tronco erguido'],
        ['Pendiente mínima para no alterar la técnica', 'Recupera caminando de vuelta'],
      ],
      orbit: ['Velocidad supramáxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-009': {
    ...SPR, ...RUN_FR, name: 'Sprint con arnés de resistencia', level: 'Avanzado',
    cfg: { free: run({ acc: 3.0, hold: 1.4, vmax: 6.2, lean0: 48 }, { tether: { to: [0, 0.95, -2.4], two: true } }) },
    captions: {
      intro: 'Con el arnés a la cintura; un compañero sujeta las cintas por detrás',
      reps: [
        ['Sprint contra la resistencia que da el compañero', 'Empuja el suelo con fuerza en cada paso'],
        ['Tronco inclinado y brazos enérgicos', 'El compañero cede la resistencia de forma constante'],
        ['10–20 m por repetición', 'Opción: el compañero suelta y sigues libre'],
      ],
      orbit: ['Empuje máximo', 'Sprint resistido: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-010': {
    ...SPR, ...RUN_FR, name: 'Sprint flotante (fly 20 m)', level: 'Avanzado',
    cfg: { free: run({ acc: 4.2, hold: 2.2, vmax: 8.8, lean0: 14 }) },
    captions: {
      intro: 'Zona de impulso de 20–30 m antes de los 20 m cronometrados',
      reps: [
        ['Acelera de forma progresiva en la zona de impulso', 'Entra lanzado y mantén la velocidad máxima 20 m'],
        ['Postura alta y relajada a máxima velocidad', 'Rodillas arriba y apoyos rápidos'],
        ['Frena progresivamente tras la marca', 'Recupera 3–4 min'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-SPR-011': {
    ...SPR, ...RUN_FR, name: 'Sprint con cambio de ritmo final (float-sprint)', level: 'Avanzado',
    cfg: { free: { type: 'run', cones: CONES, loop: 10.5,
      speeds: [[0, 0], [0.5, 0], [3.0, 8.0], [4.2, 8.0], [5.0, 6.8], [6.2, 6.8], [7.0, 8.6], [8.0, 8.6], [9.6, 0], [10.5, 0]],
      leans: [[0, 4], [0.4, 4], [0.7, 35], [1.6, 20], [3.0, 10], [8.0, 10], [8.8, -8], [9.6, -4], [10.0, 3], [10.5, 4]] } },
    captions: {
      intro: 'De pie en la salida de un recorrido con tres tramos marcados',
      reps: [
        ['Sprint, después un tramo flotando relajado y de nuevo sprint', 'Mantén la técnica en el tramo suave'],
        ['En el tramo flotante baja la tensión, no la postura', 'Vuelve a acelerar de forma explosiva'],
        ['Tramos de 20–30 m', 'Recupera caminando'],
      ],
      orbit: ['Velocidad máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-001': {
    ...ACE, ...RUN_FR, name: 'Aceleración desde posición de pie', level: 'Intermedio',
    cfg: { free: run({ acc: 2.0, hold: 0.3, dec: 1.6, rest: 1.4, vmax: 6.2, lean0: 40 }) },
    captions: {
      intro: 'De pie con un pie adelantado y el peso sobre él',
      reps: [
        ['Déjate caer hacia delante y arranca con pasos cortos y potentes', 'Empuja el suelo hacia atrás'],
        ['Tronco inclinado en línea con la pierna de empuje', 'Brazos enérgicos'],
        ['10 m a máxima intensidad', 'Recupera caminando'],
      ],
      orbit: ['Aceleración', 'Arranque: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-ACE-002': {
    ...ACE, ...RUN_FR, name: 'Aceleración desde posición de tres puntos', level: 'Intermedio',
    cfg: { free: run({ acc: 2.2, hold: 0.3, dec: 1.6, rest: 1.4, vmax: 6.4, lean0: 55 }) },
    captions: {
      intro: 'En posición de tres puntos: una mano en el suelo y cadera alta',
      reps: [
        ['Empuja con las dos piernas y lanza el brazo al frente', 'Primeros pasos cortos y rápidos'],
        ['Tronco bajo en la salida', 'Endereza el tronco poco a poco'],
        ['10 m a máxima intensidad', 'Recupera caminando'],
      ],
      orbit: ['Aceleración', 'Arranque: músculos que trabajan', 'Frena progresivamente'],
    },
  },
});
