// Lote 54: salto lateral PL-SLA-009 … 011 y multisaltos PL-MUL-001 … 007
import { EXERCISES } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';
import './ex_lote19.js';
import { JPH } from './ex_lote51.js';
import { UPZ, broad } from './ex_lote52.js';
import { PSL, latJump } from './ex_lote53.js';

export const PMU = { ...PLI, sub: 'Multisaltos', primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], secondary: ['Isquiotibiales', 'Core'] };
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const sq = (k, pz, lean, arm, y = 0, z = 0, pitch = 0) => ({ L: [0, y, z, pitch], R: [0, y, z, pitch], k, pz, lean, arm });
const at = (o, u, extra = {}) => ({ ...o, u, ...extra });
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const mv = (keys, dx, dy, dz) => keys.map((k) => ({ ...k, L: [k.L[0] + dx, k.L[1] + dy, k.L[2] + dz, k.L[3]], R: [k.R[0] + dx, k.R[1] + dy, k.R[2] + dz, k.R[3]] }));
// salto en diagonal: avance dz y desplazamiento lateral dx, desde (x0, z0)
export function diag(dx, dz, x0 = 0, z0 = 0, h = 0.20) {
  return mv(jumpKeys({ h, land: [0, dz], cm: 0.86, absorb: 0.88 }), 0, 0, 0).map((k, i) => {
    const f = i <= 2 ? 0 : i === 3 ? 0.5 : 1;
    return { ...k, armOut: 0.2, L: [x0 + dx * f, k.L[1], z0 + k.L[2], k.L[3]], R: [x0 + dx * f, k.R[1], z0 + k.R[2], k.R[3]] };
  });
}
// concatena fases de salto en una sola
export function seq(...parts) {
  const out = [], n = parts.length;
  parts.forEach((ks, j) => ks.forEach((k, i) => { if (j > 0 && i === 0) return; out.push({ ...k, u: (j + k.u) / n }); }));
  return out;
}
const TR = { frame: { tz: 0.0, dist: 6.2, ty: 1.20, distLow: 5.8, tyLow: 1.10 }, views: { f34: { az: -60 }, side: { az: -90 }, front: { az: -35 }, back34: { az: -140 } }, track: true };
const LFR = { frame: { tz: 0.0, dist: 5.8, ty: 1.15, distLow: 5.4, tyLow: 1.05 }, views: { f34: { az: -25 }, side: { az: -70 }, front: { az: -5 }, back34: { az: -150 } } };
const hurdles = (z0, dz, n, h = 0.30) => Array.from({ length: n }, (_, i) => ({ kind: 'hurdle', h, z: z0 + i * dz }));

Object.assign(EXERCISES, {
  'PL-SLA-009': {
    ...PSL, ...TR, phaseNames: { BAJADA: 'SALTO DIAGONAL', PAUSA: 'CONTACTO', SUBIDA: 'SALTO DIAGONAL', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO',
    name: 'Salto en zigzag lateral', level: 'Avanzado', tempo: { down: 1.2, pause: 0.1, up: 1.2 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.12, travel: 1.0, travelMax: 3, down: diag(0.45, 0.50), up: diag(-0.45, 0.50, 0.45, 0.50) } },
    captions: {
      intro: 'De pie con los pies juntos al inicio de la línea',
      reps: [
        ['Salta en diagonal hacia delante alternando de lado', 'Encadena los saltos en zigzag'],
        ['Contactos cortos y rodillas alineadas', 'Tronco estable mirando al frente'],
        ['Brazos para equilibrar', 'Mantén el ritmo en todo el recorrido'],
      ],
      orbit: ['Sigue en zigzag', 'Multisaltos: músculos que trabajan', 'Contactos cortos'],
    },
  },
  'PL-SLA-010': {
    ...PSL, ...LFR, phaseNames: { BAJADA: 'SALTO CONTRA LA BANDA', PAUSA: 'ATERRIZAJE', SUBIDA: 'SALTO DE VUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    name: 'Salto lateral con banda de resistencia', level: 'Avanzado', tempo: { down: 1.3, pause: 0.4, up: 1.3 }, rest: 0.2,
    cfg: { free: { type: 'jumpKF', stance: 0.12, beltBand: true, beltBandX: -1.1, down: latJump({ dx: 0.50, h: 0.20 }), up: latJump({ dx: -0.50, x0: 0.50, h: 0.20 }) },
      items: [{ kind: 'post', h: 0.10, x: -1.12 }] },
    captions: {
      intro: 'De pie con una banda a la cintura anclada a un lado',
      reps: [
        ['Salta alejándote del anclaje contra la resistencia', 'Aterriza estable y vuelve saltando'],
        ['La banda tira de ti: controla el aterrizaje', 'Rodillas alineadas con los pies'],
        ['Tensión moderada', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Salto lateral: músculos que trabajan', 'Salta de vuelta'],
    },
  },
  'PL-SLA-011': {
    ...PSL, ...LFR, phaseNames: { BAJADA: 'DOBLE SALTO', PAUSA: 'ESTABILIZA', SUBIDA: 'DOBLE SALTO', ARRIBA: 'INICIO' }, holdLabel: 'ESTABILIZA',
    name: 'Salto lateral doble (dos direcciones consecutivas)', level: 'Avanzado', tempo: { down: 2.0, pause: 0.6, up: 2.0 }, rest: 0.2,
    cfg: { free: { type: 'jumpKF', stance: 0.12, down: seq(latJump({ dx: 0.50, h: 0.18, absorb: 0.92 }), latJump({ dx: -0.50, x0: 0.50, h: 0.18 })), up: seq(latJump({ dx: -0.50, h: 0.18, absorb: 0.92 }), latJump({ dx: 0.50, x0: -0.50, h: 0.18 })) } },
    captions: {
      intro: 'De pie en posición atlética',
      reps: [
        ['Salta a un lado y rebota de inmediato al lado contrario', 'Estabiliza y repite hacia el otro lado'],
        ['El primer aterrizaje es un rebote corto', 'El segundo, frenado y estable'],
        ['Rodillas alineadas en todos los contactos', 'Tronco estable'],
      ],
      orbit: ['Estabiliza', 'Salto lateral: músculos que trabajan', 'Repite al otro lado'],
    },
  },
  'PL-MUL-001': {
    ...PMU, ...TR, phaseNames: { BAJADA: 'SALTO AL CAJÓN', PAUSA: 'ESTABILIZA', SUBIDA: 'BAJA AL FRENTE', ARRIBA: 'INICIO' }, holdLabel: 'SOBRE EL CAJÓN',
    name: 'Serie de saltos a cajones de altura creciente', level: 'Intermedio', tempo: { down: 1.9, pause: 0.6, up: 1.5 }, rest: 0.2,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 1.30, travelMax: 3,
      down: jumpKeys({ h: 0.22, land: [0.30, 0.65] }),
      repDown: [0.30, 0.40, 0.50, 0.60].map((h) => jumpKeys({ h: 0.22, land: [h, 0.65] })),
      up: mv(jumpKeys({ h: 0.10, land: [-0.30, 0.65], cm: 0.95 }), 0, 0.30, 0.65),
      repUp: [0.30, 0.40, 0.50, 0.60].map((h) => mv(jumpKeys({ h: 0.10, land: [-h, 0.65], cm: 0.95 }), 0, h, 0.65)) },
      items: [0.30, 0.40, 0.50, 0.60].map((h, i) => ({ kind: 'box', w: 0.60, h, d: 0.45, z: 0.65 + i * 1.30 })) },
    captions: {
      intro: 'Fila de cajones de altura creciente separados por un paso',
      reps: [
        ['Salta al primer cajón, baja al frente y salta al siguiente', 'Cada cajón es un poco más alto'],
        ['Aterriza suave en el centro del cajón', 'Baja con control antes del siguiente salto'],
        ['Si un cajón es demasiado alto, detén la serie', 'Calidad antes que altura'],
      ],
      orbit: ['Estabiliza arriba', 'Multisaltos: músculos que trabajan', 'Baja al frente'],
    },
  },
  'PL-MUL-002': {
    ...PMU, ...TR, phaseNames: { BAJADA: 'SALTO VERTICAL', PAUSA: 'CONTACTO', SUBIDA: 'SALTO HORIZONTAL', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO',
    name: 'Serie combinada vertical-horizontal (combo jump series)', level: 'Intermedio', tempo: { down: 1.4, pause: 0.15, up: 1.6 }, rest: 0.2,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 1.10, travelMax: 3, down: jumpKeys({ h: 0.32, cm: 0.84, absorb: 0.88 }), up: broad(1.10, 0.22).map((k, i) => (i === 0 ? at(sq(0.88, -0.05, 24, 40), 0) : k)) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta hacia arriba y al caer encadena un salto hacia delante', 'Alterna altura y distancia'],
        ['Contacto corto entre saltos', 'Brazos con impulso en cada despegue'],
        ['Aterrizaje final estable', 'Series de 3–4 combinaciones'],
      ],
      orbit: ['Encadena', 'Multisaltos: músculos que trabajan', 'Contacto corto'],
    },
  },
  'PL-MUL-003': {
    ...like('TI-PLI-007', {}), ...PMU, secondary: ['Glúteo medio', 'Isquiotibiales', 'Core'], name: 'Multisaltos alternando una pierna (alternating single-leg multi-hops)', level: 'Intermedio',
    captions: {
      intro: 'De pie, listo para impulsarte con una pierna',
      reps: [
        ['Salta alternando piernas: cada pie aterriza y despega', 'Encadena los saltos sin pausas'],
        ['Rodilla de la pierna libre al frente', 'Brazos contrarios a las piernas'],
        ['Contactos cortos y tronco erguido', 'Distancia moderada'],
      ],
      orbit: ['Aterriza y estabiliza', 'Multisaltos: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-MUL-004': {
    ...like('PL-SVE-011', {}), ...PMU, name: 'Serie de vallas bajas con recuperación mínima', level: 'Intermedio', tempo: { down: 1.3, pause: 0.1, up: 0.5 },
    captions: {
      intro: 'De pie frente a una fila de vallas bajas',
      reps: [
        ['Salta las vallas encadenando contactos mínimos', 'Sin pausas entre vallas'],
        ['Rodillas arriba y aterrizaje sobre la parte delantera del pie', 'Brazos con impulso en cada salto'],
        ['Recupera al final de la fila', 'Series cortas de máxima calidad'],
      ],
      orbit: ['Sigue saltando', 'Multisaltos: músculos que trabajan', 'Contactos mínimos'],
    },
  },
  'PL-MUL-005': {
    ...PMU, ...TR, phaseNames: { BAJADA: 'SALTOS', PAUSA: 'CONTACTO', SUBIDA: 'SALTOS', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO',
    name: 'Multisaltos en escalera de agilidad con salto a dos piernas', level: 'Intermedio', tempo: { down: 1.0, pause: 0.05, up: 1.0 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.10, travel: 0.90, travelMax: 3, down: seq(diag(0, 0.45, 0, 0, 0.14), diag(0, 0.45, 0, 0.45, 0.14)).map((k) => ({ ...k, k: Math.max(k.k, 0.9) })),
      up: seq(diag(0, 0.45, 0, 0.90, 0.14), diag(0, 0.45, 0, 1.35, 0.14)).map((k) => ({ ...k, k: Math.max(k.k, 0.9) })) },
      items: [{ kind: 'ladder', n: 12, z0: -0.25 }] },
    captions: {
      intro: 'De pie al inicio de la escalera de agilidad',
      reps: [
        ['Salta con los dos pies dentro de cada casilla', 'Contactos rápidos y continuos'],
        ['Saltos bajos y precisos, sin pisar los travesaños', 'Brazos acompañan el ritmo'],
        ['Mirada al frente', 'Recorre la escalera y vuelve caminando'],
      ],
      orbit: ['Sigue saltando', 'Multisaltos: músculos que trabajan', 'Contactos rápidos'],
    },
  },
  'PL-MUL-006': {
    ...PMU, ...TR, phaseNames: { BAJADA: 'CINCO SALTOS', PAUSA: 'ATERRIZAJE', SUBIDA: 'DE PIE', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE FINAL',
    primary: ['Glúteos', 'Cuádriceps', 'Isquiotibiales'], name: 'Prueba de 5 saltos horizontales consecutivos', level: 'Intermedio', tempo: { down: 5.0, pause: 1.0, up: 0.8 }, rest: 0.3,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 4.0, travelMax: 1, down: seq(...[0, 1, 2, 3, 4].map((j) => mv(broad(0.80, 0.20), 0, 0, j * 0.80))), up: UPZ(4.0) } },
    captions: {
      intro: 'De pie detrás de la línea de salida',
      reps: [
        ['Encadena cinco saltos horizontales a pies juntos', 'Mide la distancia total al final'],
        ['Contactos cortos entre saltos', 'Brazos con impulso en cada salto'],
        ['Último aterrizaje clavado', 'Registra la marca para comparar'],
      ],
      orbit: ['Aterrizaje final', 'Multisaltos: músculos que trabajan', 'Mide la distancia'],
    },
  },
  'PL-MUL-007': {
    ...PMU, ...LFR, phaseNames: { BAJADA: 'SALTO AL BANCO', PAUSA: 'ARRIBA', SUBIDA: 'SALTO ABAJO', ARRIBA: 'INICIO' }, holdLabel: 'SOBRE EL BANCO',
    name: 'Multisaltos verticales sobre banco', level: 'Intermedio', tempo: { down: 1.2, pause: 0.2, up: 1.1 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.11, down: latJump({ dx: 0.40, h: 0.22, y0: 0.43, absorb: 0.90 }), up: mv(latJump({ dx: -0.40, x0: 0.40, h: 0.08, y0: -0.43, cm: 0.95, absorb: 0.88 }), 0, 0.43, 0).map((k, i) => (i >= 4 ? { ...k, L: [k.L[0], 0, k.L[2], k.L[3]], R: [k.R[0], 0, k.R[2], k.R[3]] } : k)) },
      items: [{ kind: 'flatBench', len: 1.1, h: 0.43, x: 0.40 }] },
    captions: {
      intro: 'De pie junto a un banco estable',
      reps: [
        ['Salta de lado para subir al banco con los dos pies', 'Vuelve saltando al suelo y repite'],
        ['Aterriza suave en el centro del banco', 'Contactos cortos en el suelo'],
        ['Banco firme y antideslizante', 'Series de 6–10 saltos'],
      ],
      orbit: ['Sobre el banco', 'Multisaltos: músculos que trabajan', 'Salta abajo'],
    },
  },
});
