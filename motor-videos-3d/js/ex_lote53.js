// Lote 53: salto horizontal PL-SHO-010, 011 y salto lateral PL-SLA-001 … 008
import { EXERCISES } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';
import './ex_lote19.js';
import { JPH } from './ex_lote51.js';
import { PSH } from './ex_lote52.js';

export const PSL = { ...PLI, sub: 'Salto lateral', primary: ['Glúteo medio', 'Cuádriceps', 'Gastrocnemio y sóleo'], secondary: ['Aductores', 'Glúteos', 'Core'] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
// desplaza lateralmente (x) las claves de un salto a partir del despegue; y0 = altura de aterrizaje
export function latJump({ dx = 0.35, h = 0.22, y0 = 0, x0 = 0, cm = 0.84, absorb = 0.88 } = {}) {
  const ks = jumpKeys({ h, land: [y0, 0], cm, absorb });
  return ks.map((k, i) => {
    const f = i <= 2 ? 0 : i === 3 ? 0.5 : 1, x = x0 + dx * f;
    const lean = i === 3 ? 6 : k.lean;
    const y = (i <= 2) ? (k.L[1] + (x0 !== 0 || y0 === 0 ? 0 : 0)) : k.L[1];
    return { ...k, lean, armOut: 0.20, L: [x, y + (i <= 2 ? startY : 0), k.L[2], k.L[3]], R: [x, y + (i <= 2 ? startY : 0), k.R[2], k.R[3]] };
  });
}
let startY = 0;
const LJ = (o) => { startY = o.ys ?? 0; const r = latJump(o); startY = 0; return r; };
const SLA_B = () => ({ ...PSL, ...FR, phaseNames: { BAJADA: 'SALTO A UN LADO', PAUSA: 'CONTACTO', SUBIDA: 'SALTO AL OTRO', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO', rest: 0 });
const FR = { frame: { tz: 0.0, dist: 5.8, ty: 1.15, distLow: 5.4, tyLow: 1.05 }, views: { f34: { az: -25 }, side: { az: -70 }, front: { az: -5 }, back34: { az: -150 } } };

Object.assign(EXERCISES, {
  'PL-SHO-010': {
    ...like('TI-PLI-007', {}), ...PSH, name: 'Salto horizontal alterno de piernas (bounding corto)', level: 'Avanzado',
    captions: {
      intro: 'De pie, listo para impulsarte',
      reps: [
        ['Encadena zancadas saltadas cortas alternando piernas', 'Rodilla delantera arriba en cada impulso'],
        ['Empuja el suelo hacia atrás con fuerza', 'Brazos contrarios a las piernas'],
        ['Contactos cortos y tronco erguido', 'Distancia moderada, máxima calidad'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-SHO-011': {
    ...like('PL-SHO-001', {}), name: 'Salto horizontal con aterrizaje controlado (stick the landing)', level: 'Avanzado', tempo: { down: 2.0, pause: 2.0, up: 1.0 },
    holdLabel: 'CLAVA EL ATERRIZAJE',
    captions: {
      intro: 'De pie, pies al ancho de caderas detrás de la línea',
      reps: [
        ['Salta hacia delante y clava el aterrizaje sin moverte', 'Mantén 2 s la posición de aterrizaje'],
        ['Cadera atrás, pecho al frente y rodillas alineadas', 'Los pies no se mueven al caer'],
        ['Distancia que puedas controlar', 'Calidad del aterrizaje antes que distancia'],
      ],
      orbit: ['Aterrizaje clavado', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'PL-SLA-001': {
    ...PSL, ...FR, phaseNames: { BAJADA: 'SALTO A UN LADO', PAUSA: 'CONTACTO', SUBIDA: 'SALTO AL OTRO', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO',
    name: 'Salto lateral sobre línea (lateral line hops)', level: 'Intermedio', tempo: { down: 0.9, pause: 0.1, up: 0.9 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.11, down: LJ({ dx: 0.36, h: 0.12, cm: 0.92, absorb: 0.93 }), up: LJ({ dx: -0.36, x0: 0.36, h: 0.12, cm: 0.92, absorb: 0.93 }) },
      items: [{ kind: 'box', w: 0.03, h: 0.006, d: 1.2, x: 0.18 }] },
    captions: {
      intro: 'De pie junto a una línea en el suelo, pies juntos',
      reps: [
        ['Salta de lado a lado de la línea sin pisarla', 'Contactos rápidos sobre la parte delantera del pie'],
        ['Saltos bajos y rápidos', 'Tronco estable y mirada al frente'],
        ['Series de 10–20 s', 'Brazos relajados para equilibrar'],
      ],
      orbit: ['Sigue saltando', 'Saltos laterales: músculos que trabajan', 'Contactos rápidos'],
    },
  },
  'PL-SLA-002': {
    ...PSL, ...FR, phaseNames: { BAJADA: 'SALTO AL CAJÓN', PAUSA: 'ESTABILIZA', SUBIDA: 'BAJA DEL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'SOBRE EL CAJÓN',
    name: 'Salto lateral a cajón (lateral box jump)', level: 'Intermedio', tempo: { down: 1.8, pause: 0.8, up: 1.4 }, rest: 0.5,
    cfg: { free: { type: 'jumpKF', stance: 0.12, down: LJ({ dx: 0.55, h: 0.22, y0: 0.40 }), up: LJ({ dx: -0.55, x0: 0.55, h: 0.10, ys: 0.40, cm: 0.95, absorb: 0.86 }) },
      items: [{ kind: 'box', w: 0.60, h: 0.40, d: 0.55, x: 0.55 }] },
    captions: {
      intro: 'De pie de lado junto a un cajón bajo',
      reps: [
        ['Salta de lado y aterriza sobre el cajón con los dos pies', 'Estabiliza y baja con control al lado de inicio'],
        ['Brazos con impulso hacia arriba y hacia el cajón', 'Aterriza suave en el centro del cajón'],
        ['Altura del cajón que domines', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Estabiliza arriba', 'Salto lateral: músculos que trabajan', 'Baja controlando'],
    },
  },
  'PL-SLA-003': {
    ...SLA_B(), name: 'Salto lateral repetido continuo', level: 'Intermedio', tempo: { down: 1.1, pause: 0.1, up: 1.1 },
    cfg: { free: { type: 'jumpKF', stance: 0.12, down: LJ({ dx: 0.60, h: 0.20, cm: 0.88, absorb: 0.90 }), up: LJ({ dx: -0.60, x0: 0.60, h: 0.20, cm: 0.88, absorb: 0.90 }) } },
    captions: {
      intro: 'De pie con los pies juntos y las rodillas ligeramente flexionadas',
      reps: [
        ['Salta de lado a lado encadenando los saltos', 'Aterriza y rebota de inmediato'],
        ['Empuja con fuerza hacia el lado contrario', 'Tronco estable y rodillas alineadas'],
        ['Mantén la distancia en todos los saltos', 'Series de 15–30 s'],
      ],
      orbit: ['Sigue saltando', 'Saltos laterales: músculos que trabajan', 'Rebota rápido'],
    },
  },
  'PL-SLA-004': {
    ...SLA_B(), name: 'Salto lateral sobre valla baja', level: 'Intermedio', tempo: { down: 1.4, pause: 0.3, up: 1.4 },
    phaseNames: { BAJADA: 'SALTO SOBRE LA VALLA', PAUSA: 'ATERRIZAJE', SUBIDA: 'SALTO DE VUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    cfg: { free: { type: 'jumpKF', stance: 0.12, down: LJ({ dx: 0.64, h: 0.42 }), up: LJ({ dx: -0.64, x0: 0.64, h: 0.42 }) }, items: [{ kind: 'hurdle', h: 0.30, w: 0.70, x: 0.32, ry: Math.PI / 2 }] },
    captions: {
      intro: 'De pie de lado junto a una valla baja',
      reps: [
        ['Salta de lado por encima de la valla', 'Aterriza y vuelve saltando al otro lado'],
        ['Sube las rodillas para superar la valla', 'Brazos con impulso arriba'],
        ['Aterrizaje suave y estable', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Aterriza y estabiliza', 'Salto lateral: músculos que trabajan', 'Salta de vuelta'],
    },
  },
  'PL-SLA-005': {
    ...like('CO-CDI-005', {}), ...PSL, primary: ['Glúteo medio', 'Glúteos', 'Cuádriceps'], name: 'Skater jump con extensión completa', level: 'Intermedio',
    captions: {
      intro: 'De pie sobre una pierna, rodilla ligeramente flexionada',
      reps: [
        ['Empuja de lado con extensión completa de cadera y rodilla', 'Aterriza sobre una pierna y estabiliza'],
        ['Busca distancia lateral en cada salto', 'La rodilla no se va hacia dentro'],
        ['Brazos acompañan el impulso', 'Aterrizajes suaves'],
      ],
      orbit: ['Aterriza estable', 'Impulso lateral: músculos que trabajan', 'Salta de vuelta'],
    },
  },
  'PL-SLA-006': {
    ...like('TI-PLI-005', {}), ...PSL, name: 'Salto lateral a una pierna con estabilización de 3 segundos', level: 'Intermedio', tempo: { down: 1.7, pause: 3, up: 1.9 }, holdLabel: 'ESTABILIZA 3 s',
    captions: {
      intro: 'De pie sobre una pierna',
      reps: [
        ['Salta de lado y aterriza sobre la misma pierna', 'Mantén 3 s sin moverte antes de volver'],
        ['Rodilla alineada y cadera nivelada', 'Brazos para equilibrar'],
        ['Aterrizaje silencioso', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Estabiliza 3 s', 'Aterrizaje: músculos que trabajan', 'Salta de vuelta'],
    },
  },
  'PL-SLA-007': {
    ...SLA_B(), name: 'Salto lateral con cambio de dirección posterior', level: 'Intermedio', tempo: { down: 1.2, pause: 0.05, up: 1.0 },
    phaseNames: { BAJADA: 'SALTO LATERAL', PAUSA: 'FRENA', SUBIDA: 'CAMBIO DE DIRECCIÓN', ARRIBA: 'INICIO' }, holdLabel: 'FRENA',
    cfg: { free: { type: 'jumpKF', stance: 0.13, down: LJ({ dx: 0.70, h: 0.20, absorb: 0.82 }), up: LJ({ dx: -0.70, x0: 0.70, h: 0.18, cm: 0.92 }) } },
    captions: {
      intro: 'De pie en posición atlética',
      reps: [
        ['Salta de lado, frena al aterrizar y vuelve de inmediato', 'El cambio de dirección es explosivo'],
        ['Aterriza con la cadera baja para frenar', 'Rodillas alineadas con los pies'],
        ['Tronco estable durante el cambio', 'Series cortas y de calidad'],
      ],
      orbit: ['Frena', 'Cambio de dirección: músculos que trabajan', 'Sal rápido'],
    },
  },
  'PL-SLA-008': {
    ...SLA_B(), name: 'Salto lateral sobre banco', level: 'Avanzado', tempo: { down: 1.5, pause: 0.4, up: 1.5 },
    phaseNames: { BAJADA: 'SALTO SOBRE EL BANCO', PAUSA: 'ATERRIZAJE', SUBIDA: 'SALTO DE VUELTA', ARRIBA: 'INICIO' },
    cfg: { free: { type: 'jumpKF', stance: 0.12, down: LJ({ dx: 0.80, h: 0.62 }), up: LJ({ dx: -0.80, x0: 0.80, h: 0.62 }) }, items: [{ kind: 'flatBench', len: 1.1, h: 0.43, x: 0.40 }] },
    captions: {
      intro: 'De pie de lado junto a un banco',
      reps: [
        ['Salta de lado por encima del banco', 'Aterriza y vuelve saltando al otro lado'],
        ['Rodillas arriba para superar el banco', 'Brazos con impulso arriba'],
        ['Aterrizaje suave y estable', 'Solo si dominas el salto sobre valla baja'],
      ],
      orbit: ['Aterriza y estabiliza', 'Salto lateral: músculos que trabajan', 'Salta de vuelta'],
    },
  },
});
