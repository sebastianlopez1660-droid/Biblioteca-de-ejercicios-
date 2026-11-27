// Lote 57: bounding PL-BOU-006 … 011 y saltos reactivos PL-REJ-001 … 004
import { EXERCISES } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';
import './ex_lote19.js';
import { UP } from './ex_lote51.js';
import { latJump } from './ex_lote53.js';
import { PBO } from './ex_lote56.js';
import { seq } from './ex_lote54.js';

export const PRE = { ...PLI, sub: 'Saltos reactivos', primary: ['Cuádriceps', 'Gastrocnemio y sóleo', 'Glúteos'], secondary: ['Isquiotibiales', 'Core'] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const BND = EXERCISES['TI-PLI-007'];
function bounds(sz, dy) {
  const f = BND.cfg.free, sc = (k) => {
    const fl = (k.u === 0.37 || k.u === 0.83) ? dy : 0;
    return { ...k, P: [k.P[0], k.P[1] + fl, k.P[2] * sz], L: [k.L[0], k.L[1] + (k.L[1] > 0.1 ? fl : 0), k.L[2] * sz, k.L[3]], R: [k.R[0], k.R[1] + (k.R[1] > 0.1 ? fl : 0), k.R[2] * sz, k.R[3]] };
  };
  return { ...f, travel: f.travel * sz, down: f.down.map(sc), up: f.up.map(sc) };
}
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const READY = { L: [0.04, 0, 0, 0], R: [-0.04, 0, 0, 0], k: 0.90, pz: -0.03, lean: 18, arm: 25 };
// posición atlética de espera y salto explosivo al estímulo
const reactJump = (h = 0.28) => {
  const J = jumpKeys({ h, t0: 0.40, cm: 0.86 });
  return [{ ...ST, u: 0 }, { ...READY, u: 0.18 }, { ...READY, u: 0.40, arm: 20 }, ...J.slice(2)];
};
const RFR = { frame: { tz: 0.0, dist: 6.0, ty: 1.30, distLow: 5.6, tyLow: 1.25 } };
const RPH = { phaseNames: { BAJADA: 'ESPERA Y SALTA', PAUSA: 'ATERRIZAJE', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE' };

Object.assign(EXERCISES, {
  'PL-BOU-006': {
    ...like('TI-PLI-007', {}), ...PBO, secondary: ['Gastrocnemio y sóleo', 'Core', 'Erectores espinales'], name: 'Bounding con chaleco lastrado', level: 'Intermedio',
    cfg: { free: bounds(0.85, -0.02) },
    captions: {
      intro: 'De pie con un chaleco lastrado bien ajustado',
      reps: [
        ['Zancadas saltadas con la carga del chaleco', 'Mantén la técnica aunque la zancada sea más corta'],
        ['Rodilla delantera arriba y empuje completo', 'Tronco erguido'],
        ['Carga ligera: 5–10 % del peso corporal', 'Series cortas'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-BOU-007': {
    ...like('TI-PLI-005', {}), ...PBO, primary: ['Glúteo medio', 'Glúteos', 'Cuádriceps'], secondary: ['Aductores', 'Gastrocnemio y sóleo', 'Core'], name: 'Bounding lateral (lateral bounding series)', level: 'Intermedio',
    captions: {
      intro: 'De pie sobre una pierna en posición atlética',
      reps: [
        ['Impúlsate de lado y aterriza sobre una pierna', 'Encadena los impulsos de un lado a otro'],
        ['Empuja con toda la pierna de apoyo', 'Rodilla alineada al aterrizar'],
        ['Tronco estable y brazos coordinados', 'Series de 6–8 impulsos por lado'],
      ],
      orbit: ['Aterriza estable', 'Impulso lateral: músculos que trabajan', 'Salta de vuelta'],
    },
  },
  'PL-BOU-008': {
    ...like('TI-PLI-007', {}), ...PBO, name: 'Bounding para distancia (conteo de zancadas)', level: 'Avanzado',
    cfg: { free: bounds(1.10, 0) },
    captions: {
      intro: 'De pie al inicio de una distancia marcada',
      reps: [
        ['Recorre la distancia con el menor número de zancadas', 'Cuenta las zancadas en cada serie'],
        ['Empuje largo y potente en cada apoyo', 'Rodilla delantera alta'],
        ['Compara el conteo entre series', 'Vuelve caminando al inicio'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Cuenta las zancadas'],
    },
  },
  'PL-BOU-009': {
    ...like('TI-PLI-007', {}), ...PBO, primary: ['Glúteos', 'Gastrocnemio y sóleo', 'Cuádriceps'], name: 'Bounding con énfasis vertical (máxima altura)', level: 'Avanzado',
    cfg: { free: bounds(0.80, 0.14) },
    captions: {
      intro: 'De pie, listo para impulsarte',
      reps: [
        ['Zancadas saltadas buscando la máxima altura', 'Rodilla delantera arriba con fuerza'],
        ['Empuja el suelo hacia abajo en cada apoyo', 'Brazos con impulso hacia arriba'],
        ['Menos distancia y más tiempo en el aire', 'Aterrizajes controlados'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-BOU-010': {
    ...like('TI-PLI-007', {}), ...PBO, name: 'Bounding con énfasis horizontal (máxima distancia)', level: 'Avanzado',
    cfg: { free: bounds(1.20, -0.03) },
    captions: {
      intro: 'De pie, listo para impulsarte',
      reps: [
        ['Zancadas saltadas buscando la máxima distancia', 'Empuja el suelo hacia atrás en cada apoyo'],
        ['Vuelo bajo y largo', 'Brazos con braceo amplio'],
        ['Aterriza bajo el centro de gravedad', 'Series de 6–8 zancadas'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-BOU-011': {
    ...like('TI-PLI-007', {}), ...PBO, secondary: ['Gastrocnemio y sóleo', 'Tibial anterior', 'Core'], name: 'Bounding en superficie de arena', level: 'Avanzado',
    cfg: { free: bounds(0.85, 0) },
    captions: {
      intro: 'En una superficie de arena firme',
      reps: [
        ['Zancadas saltadas sobre la arena', 'La arena absorbe el impacto y exige más empuje'],
        ['Rodilla delantera arriba y tronco erguido', 'Apoyo activo de todo el pie'],
        ['Menos impacto en las articulaciones', 'Zancadas algo más cortas que en pista'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-REJ-001': {
    ...PRE, ...RFR, ...RPH, name: 'Salto reactivo con estímulo visual', level: 'Intermedio', tempo: { down: 2.4, pause: 0.8, up: 1.2 }, rest: 0.6,
    cfg: { free: { type: 'jumpKF', stance: 0.15, down: reactJump(0.28), up: UP } },
    captions: {
      intro: 'En posición atlética mirando al compañero o a una señal luminosa',
      reps: [
        ['Espera atento y salta en cuanto veas la señal', 'Reacciona lo más rápido posible'],
        ['Rodillas flexionadas y peso en la parte delantera del pie', 'Aterriza suave y vuelve a la posición'],
        ['El compañero varía el tiempo de la señal', 'Series cortas para mantener la atención'],
      ],
      orbit: ['Aterriza y estabiliza', 'Reacción: músculos que trabajan', 'Vuelve a la espera'],
    },
  },
  'PL-REJ-002': {
    ...PRE, ...RFR, ...RPH, name: 'Salto reactivo con estímulo auditivo', level: 'Intermedio', tempo: { down: 2.4, pause: 0.8, up: 1.2 }, rest: 0.6,
    cfg: { free: { type: 'jumpKF', stance: 0.15, down: reactJump(0.26), up: UP } },
    captions: {
      intro: 'En posición atlética, atento a la señal sonora',
      reps: [
        ['Salta en cuanto oigas la palmada o el silbato', 'Reacciona sin anticiparte'],
        ['Peso en la parte delantera del pie', 'Aterriza suave y vuelve a la posición'],
        ['Puedes cerrar los ojos para aislar el sonido', 'Varía el tiempo entre señales'],
      ],
      orbit: ['Aterriza y estabiliza', 'Reacción: músculos que trabajan', 'Vuelve a la espera'],
    },
  },
  'PL-REJ-003': {
    ...PRE, ...RFR, phaseNames: { BAJADA: 'SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'CAMBIO DE DIRECCIÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    secondary: ['Glúteo medio', 'Aductores', 'Core'], name: 'Salto reactivo con cambio de dirección tras aterrizaje', level: 'Intermedio', tempo: { down: 1.9, pause: 0.3, up: 1.8 }, rest: 0.6,
    views: { f34: { az: -30 }, side: { az: -80 }, front: { az: -10 } },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: jumpKeys({ h: 0.26, absorb: 0.84 }), repUp: [0.6, -0.6, 0.6, -0.6].map((dx) => seq(latJump({ dx, h: 0.12, cm: 0.95, absorb: 0.90 }), latJump({ dx: -dx, x0: dx, h: 0.12, cm: 0.95 }))), up: seq(latJump({ dx: 0.6, h: 0.12, cm: 0.95, absorb: 0.90 }), latJump({ dx: -0.6, x0: 0.6, h: 0.12, cm: 0.95 })) } },
    captions: {
      intro: 'De pie en posición atlética',
      reps: [
        ['Salta, aterriza y sal de inmediato hacia el lado indicado', 'El compañero señala la dirección al aterrizar'],
        ['Aterriza con la cadera baja para poder cambiar rápido', 'Primer paso explosivo'],
        ['Rodillas alineadas en el cambio', 'Alterna los lados'],
      ],
      orbit: ['Aterriza y cambia', 'Cambio de dirección: músculos que trabajan', 'Sal rápido'],
    },
  },
  'PL-REJ-004': {
    ...like('PL-MUL-004', {}), ...PRE, name: 'Salto reactivo de vallas con contacto mínimo', level: 'Intermedio',
    captions: {
      intro: 'De pie frente a una fila de vallas bajas',
      reps: [
        ['Salta las vallas con el contacto más corto posible', 'Reacciona al suelo como un muelle'],
        ['Tobillos firmes y rodillas arriba', 'Brazos con impulso en cada salto'],
        ['Calidad del contacto antes que velocidad', 'Recupera al final de la fila'],
      ],
      orbit: ['Sigue saltando', 'Reacción: músculos que trabajan', 'Contactos mínimos'],
    },
  },
});
