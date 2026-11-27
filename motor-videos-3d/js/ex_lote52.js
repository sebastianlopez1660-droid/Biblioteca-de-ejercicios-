// Lote 52: pliometría PL-SVE-011 y salto horizontal PL-SHO-001 … 009
import { EXERCISES } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';
import './ex_lote19.js';
import { PSV, JPH, withYaw } from './ex_lote51.js';

export const PSH = { ...PLI, sub: 'Salto horizontal', primary: ['Glúteos', 'Cuádriceps', 'Isquiotibiales'], secondary: ['Gastrocnemio y sóleo', 'Core'] };
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const sq = (k, pz, lean, arm, y = 0, z = 0, pitch = 0) => ({ L: [0, y, z, pitch], R: [0, y, z, pitch], k, pz, lean, arm });
const at = (o, u, extra = {}) => ({ ...o, u, ...extra });
const shiftZ = (keys, dz) => keys.map((k) => ({ ...k, L: [k.L[0], k.L[1], k.L[2] + dz, k.L[3]], R: [k.R[0], k.R[1], k.R[2] + dz, k.R[3]] }));
export const UPZ = (z) => [at(sq(0.84, -0.06, 26, 45, 0, z), 0), at({ ...ST, L: [0, 0, z, 0], R: [0, 0, z, 0] }, 1)];
// salto horizontal: más inclinación y brazos más largos
export const broad = (d, h = 0.24) => jumpKeys({ h, land: [0, d], cm: 0.80 }).map((k, i) => (i === 1 ? { ...k, lean: 40, arm: -55 } : i === 2 ? { ...k, lean: 24, arm: 120 } : k));
// varios saltos encadenados en una misma fase
function chain(n, d, h) {
  const out = [];
  for (let j = 0; j < n; j++) {
    const ks = shiftZ(broad(d, h), j * d), u0 = j / n, du = 1 / n;
    ks.forEach((k, i) => { if (j > 0 && i === 0) return; out.push({ ...k, u: u0 + k.u * du }); });
  }
  return out;
}
const TR = { frame: { tz: 0.0, dist: 6.2, ty: 1.20, distLow: 5.8, tyLow: 1.10 }, views: { f34: { az: -60 }, side: { az: -90 }, front: { az: -35 }, back34: { az: -140 } }, track: true };
const hurdles = (z0, dz, n, h = 0.30) => Array.from({ length: n }, (_, i) => ({ kind: 'hurdle', h, z: z0 + i * dz }));
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });

Object.assign(EXERCISES, {
  'PL-SVE-011': {
    ...PSV, ...TR, ...JPH, name: 'Salto vertical continuo sobre vallas bajas', level: 'Avanzado', tempo: { down: 1.6, pause: 0.2, up: 0.6 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 0.80, travelMax: 3, down: jumpKeys({ h: 0.42, land: [0, 0.80], cm: 0.86, absorb: 0.90 }), up: UPZ(0.80).map((k, i) => (i ? { ...k, k: 0.93 } : k)) },
      items: hurdles(0.40, 0.80, 4, 0.30) },
    captions: {
      intro: 'De pie frente a una fila de vallas bajas',
      reps: [
        ['Salta cada valla subiendo las rodillas', 'Encadena los saltos con contactos cortos'],
        ['Despega y aterriza con los dos pies', 'Brazos con impulso en cada salto'],
        ['Altura por encima de distancia', 'Rodillas alineadas al aterrizar'],
      ],
      orbit: ['Sigue saltando', 'Salto: músculos que trabajan', 'Contactos cortos'],
    },
  },
  'PL-SHO-001': {
    ...PSH, ...TR, ...JPH, name: 'Salto horizontal a pies juntos (standing long jump)', level: 'Intermedio', tempo: { down: 2.0, pause: 0.8, up: 1.0 }, rest: 0.4,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 1.30, travelMax: 3, down: broad(1.30), up: UPZ(1.30) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas detrás de la línea',
      reps: [
        ['Brazos atrás, flexiona y salta hacia delante lo más lejos posible', 'Aterriza con los dos pies y estabiliza'],
        ['Lanza los brazos al frente al despegar', 'Extiende cadera, rodillas y tobillos'],
        ['Aterriza amortiguando con la cadera atrás', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'PL-SHO-002': {
    ...PSH, ...TR, phaseNames: { BAJADA: 'TRES SALTOS', PAUSA: 'ATERRIZAJE', SUBIDA: 'DE PIE', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE FINAL',
    name: 'Triple salto horizontal (triple broad jump)', level: 'Intermedio', tempo: { down: 3.6, pause: 0.8, up: 0.8 }, rest: 0.3,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 3.00, travelMax: 2, down: chain(3, 1.0, 0.22), up: UPZ(3.0) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas detrás de la línea',
      reps: [
        ['Encadena tres saltos horizontales seguidos', 'Contactos cortos entre saltos'],
        ['Brazos con impulso en cada salto', 'Mantén la distancia en el tercero'],
        ['Último aterrizaje estable y controlado', 'Vuelve caminando al inicio'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-SHO-003': {
    ...like('TI-PLI-008', {}), ...PSH, secondary: ['Glúteo medio', 'Gastrocnemio y sóleo', 'Core'], name: 'Salto horizontal a una pierna', level: 'Intermedio',
    captions: {
      intro: 'De pie sobre una pierna',
      reps: [
        ['Salta hacia delante y aterriza sobre la misma pierna', 'Estabiliza 1–2 s antes del siguiente salto'],
        ['La rodilla no se va hacia dentro', 'Brazos para equilibrar'],
        ['Distancia moderada y aterrizaje perfecto', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'PL-SHO-004': {
    ...PSH, ...TR, phaseNames: { BAJADA: 'SALTO', PAUSA: 'CONTACTO', SUBIDA: 'SALTO', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO',
    name: 'Salto horizontal repetido (multiple broad jumps)', level: 'Intermedio', tempo: { down: 1.4, pause: 0.1, up: 1.4 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 2.0, travelMax: 2, down: broad(1.0, 0.22), up: shiftZ(broad(1.0, 0.22), 1.0).map((k, i) => (i === 0 ? at(sq(0.84, -0.06, 26, 45, 0, 1.0), 0) : k)) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta hacia delante y encadena el siguiente salto al tocar el suelo', 'Contactos cortos y elásticos'],
        ['Brazos con impulso en cada salto', 'Tronco estable'],
        ['Mantén la distancia en todos los saltos', 'Series de 4–6 saltos'],
      ],
      orbit: ['Sigue saltando', 'Salto: músculos que trabajan', 'Contactos cortos'],
    },
  },
  'PL-SHO-005': {
    ...PSH, ...TR, ...JPH, secondary: ['Gastrocnemio y sóleo', 'Core', 'Erectores espinales'], name: 'Salto horizontal con chaleco lastrado', level: 'Intermedio', tempo: { down: 2.0, pause: 0.8, up: 1.0 }, rest: 0.4,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 1.0, travelMax: 3, down: broad(1.0, 0.18), up: UPZ(1.0) } },
    captions: {
      intro: 'De pie con un chaleco lastrado bien ajustado',
      reps: [
        ['Salta hacia delante con máxima intención', 'Aterriza con los dos pies y estabiliza'],
        ['Carga moderada: 5–10 % del peso corporal', 'Espalda recta en el contramovimiento'],
        ['Pocas repeticiones de calidad', 'Aterriza con la cadera atrás'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'PL-SHO-006': {
    ...PSH, ...TR, ...JPH, primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], name: 'Salto horizontal hacia atrás', level: 'Intermedio', tempo: { down: 1.9, pause: 0.8, up: 1.0 }, rest: 0.4,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: -0.70, travelMax: 3, down: jumpKeys({ h: 0.20, land: [0, -0.70] }).map((k, i) => (i === 1 ? { ...k, lean: 18, arm: 60 } : i === 2 ? { ...k, lean: -6, arm: -30 } : k)), up: UPZ(-0.70) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta hacia atrás con los dos pies', 'Aterriza sobre la parte delantera del pie y amortigua'],
        ['Mira al frente, no hacia atrás', 'Distancia corta y controlada'],
        ['Rodillas alineadas al caer', 'Asegúrate de tener espacio detrás'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'PL-SHO-007': {
    ...PSH, ...TR, ...JPH, name: 'Salto horizontal sobre obstáculo bajo', level: 'Intermedio', tempo: { down: 2.0, pause: 0.8, up: 1.0 }, rest: 0.4,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 1.20, travelMax: 3, down: broad(1.20, 0.36), up: UPZ(1.20) }, items: hurdles(0.60, 1.20, 4, 0.30) },
    captions: {
      intro: 'De pie detrás de un obstáculo bajo',
      reps: [
        ['Salta por encima del obstáculo hacia delante', 'Aterriza con los dos pies y estabiliza'],
        ['Sube las rodillas para superar la altura', 'Brazos con impulso al frente'],
        ['Aterriza suave al otro lado', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'PL-SHO-008': {
    ...PSH, ...TR, phaseNames: { BAJADA: 'CAÍDA DEL CAJÓN', PAUSA: 'CONTACTO', SUBIDA: 'SALTO HORIZONTAL', ARRIBA: 'SOBRE EL CAJÓN' }, holdLabel: 'CONTACTO CORTO',
    name: 'Salto horizontal desde cajón (depth to broad jump)', level: 'Avanzado', tempo: { down: 1.4, pause: 0.2, up: 1.6 }, rest: 0.6, track: false,
    frame: { tz: 0.30, dist: 6.4, ty: 1.20, distLow: 6.0, tyLow: 1.10 },
    cfg: { free: { type: 'jumpKF', stance: 0.13,
      down: [at({ ...ST, L: [0, 0.40, -0.55, 0], R: [0, 0.40, -0.55, 0] }, 0), at({ ...ST, L: [0, 0.46, -0.40, -10], R: [0, 0.40, -0.55, 0], lean: 6, arm: 20 }, 0.25),
        at({ ...ST, L: [0, 0.22, -0.20, 10], R: [0, 0.24, -0.22, 10], lean: 8, arm: 40, k: 0.97 }, 0.55), at(sq(0.86, -0.05, 30, -40, 0, 0), 1)],
      up: shiftZ(broad(1.2, 0.24), 0).map((k, i) => (i === 0 ? { ...sq(0.86, -0.05, 30, -40, 0, 0), u: 0 } : k)) },
      items: [{ kind: 'box', h: 0.40, w: 0.60, d: 0.50, z: -0.55 }] },
    captions: {
      intro: 'De pie sobre un cajón bajo',
      reps: [
        ['Déjate caer del cajón y aterriza con los dos pies', 'Rebota de inmediato en un salto horizontal'],
        ['Contacto corto en el suelo', 'Brazos con impulso al frente'],
        ['Aterriza estable al final', 'Vuelve caminando al cajón'],
      ],
      orbit: ['Contacto corto', 'Rebote: músculos que trabajan', 'Salta lejos'],
    },
  },
  'PL-SHO-009': {
    ...PSH, ...TR, phaseNames: { BAJADA: 'SALTO CON GIRO', PAUSA: 'ATERRIZAJE', SUBIDA: 'SALTO DE VUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    secondary: ['Oblicuos', 'Gastrocnemio y sóleo', 'Core'], name: 'Salto horizontal con giro de 180°', level: 'Avanzado', tempo: { down: 2.0, pause: 0.8, up: 2.0 }, rest: 0.4, track: false,
    frame: { tz: 0.45, dist: 6.2, ty: 1.20, distLow: 5.8, tyLow: 1.10 },
    cfg: { free: { type: 'jumpKF', stance: 0.13, down: withYaw(jumpKeys({ h: 0.22, land: [0, 0.90] }), 0, 180), up: withYaw(shiftZ(jumpKeys({ h: 0.22, land: [0, -0.90] }), 0.90), 180, 360) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta hacia delante girando media vuelta en el aire', 'Aterriza estable y vuelve con otro salto con giro'],
        ['El giro sale de la cadera y los hombros', 'Aterriza con las rodillas alineadas'],
        ['Distancia moderada', 'Alterna el sentido del giro entre series'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Salta girando de vuelta'],
    },
  },
});
