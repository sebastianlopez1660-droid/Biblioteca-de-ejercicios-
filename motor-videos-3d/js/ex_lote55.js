// Lote 55: multisaltos PL-MUL-008 … 011 y drop jumps PL-DRJ-001 … 006
import { EXERCISES } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';
import { dropKeys, stepBackUp } from './ex_lote19.js';
import { JPH } from './ex_lote51.js';
import { broad } from './ex_lote52.js';
import { latJump } from './ex_lote53.js';
import { PMU, seq } from './ex_lote54.js';

export const PDJ = { ...PLI, sub: 'Drop jump', primary: ['Gastrocnemio y sóleo', 'Cuádriceps', 'Glúteos'], secondary: ['Isquiotibiales', 'Core'] };
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const sq = (k, pz, lean, arm, y = 0, z = 0, pitch = 0) => ({ L: [0, y, z, pitch], R: [0, y, z, pitch], k, pz, lean, arm });
const at = (o, u, extra = {}) => ({ ...o, u, ...extra });
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const mv = (keys, dx, dy, dz) => keys.map((k) => ({ ...k, L: [k.L[0] + dx, k.L[1] + dy, k.L[2] + dz, k.L[3]], R: [k.R[0] + dx, k.R[1] + dy, k.R[2] + dz, k.R[3]] }));
const DPH = { phaseNames: { BAJADA: 'CAÍDA Y REBOTE', PAUSA: 'ATERRIZAJE', SUBIDA: 'VUELVE AL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE' };
const DFR = { frame: { tz: 0.20, dist: 6.2, ty: 1.35, distLow: 5.8, tyLow: 1.30 }, views: { f34: { az: -50 }, side: { az: -80 } } };
const BOX = (h) => [{ kind: 'box', w: 0.60, h, d: 0.45, z: 0.02 }];
// vuelve caminando desde (x, z) hasta el cajón y sube
function walkBack(h, x = 0, z = 0.45) {
  const sb = stepBackUp(h);
  const mid = [x / 2, (z + 0.45) / 2];
  const head = [at({ ...sq(0.85, -0.06, 26, 45, 0, z), L: [x, 0, z, 0], R: [x, 0, z, 0] }, 0), at({ ...ST, L: [x, 0, z, 0], R: [x, 0, z, 0] }, 0.12),
    { u: 0.24, L: [mid[0], 0.06, mid[1], 0], R: [x, 0, z, 0], k: 0.985, pz: 0, lean: 4, arm: 6 }, { u: 0.36, L: [mid[0], 0, mid[1], 0], R: [0, 0.06, 0.45, 0], k: 0.985, pz: 0, lean: 4, arm: 6 },
    { u: 0.46, L: [0, 0, 0.45, 0], R: [0, 0, 0.45, 0], k: 0.985, pz: 0, lean: 3, arm: 4 }];
  return [...head, ...sb.slice(2).map((k) => ({ ...k, u: 0.46 + (k.u - 0.25) / 0.75 * 0.54 }))];
}

Object.assign(EXERCISES, {
  'PL-MUL-008': {
    ...like('PL-SHO-008', {}), ...PMU, name: 'Serie combinada salto en profundidad + salto horizontal', level: 'Avanzado',
    captions: {
      intro: 'De pie sobre un cajón bajo',
      reps: [
        ['Déjate caer y encadena un salto horizontal al tocar el suelo', 'Aterriza estable al final'],
        ['Contacto corto: no te quedes abajo', 'Brazos con impulso al frente'],
        ['Rodillas alineadas en cada contacto', 'Vuelve caminando al cajón'],
      ],
      orbit: ['Contacto corto', 'Multisaltos: músculos que trabajan', 'Salta lejos'],
    },
  },
  'PL-MUL-009': {
    ...PMU, phaseNames: { BAJADA: 'VERTICAL, HORIZONTAL Y LATERAL', PAUSA: 'ESTABILIZA', SUBIDA: 'SALTO LATERAL DE VUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ESTABILIZA',
    frame: { tz: 0.0, dist: 6.2, ty: 1.20, distLow: 5.8, tyLow: 1.10 }, views: { f34: { az: -50 }, side: { az: -90 }, front: { az: -25 }, back34: { az: -140 } }, track: true,
    name: 'Circuito de multisaltos mixto (vertical-horizontal-lateral)', level: 'Avanzado', tempo: { down: 3.6, pause: 0.6, up: 1.2 }, rest: 0.2,
    cfg: { free: { type: 'jumpKF', stance: 0.13, travel: 0.90, travelMax: 3,
      down: seq(jumpKeys({ h: 0.28, cm: 0.86, absorb: 0.90 }), broad(0.90, 0.20), mv(latJump({ dx: 0.45, h: 0.18 }), 0, 0, 0.90)),
      up: mv(latJump({ dx: -0.45, x0: 0.45, h: 0.18 }), 0, 0, 0.90) } },
    captions: {
      intro: 'De pie en posición atlética',
      reps: [
        ['Encadena un salto vertical, uno hacia delante y uno lateral', 'Estabiliza y vuelve con un salto lateral'],
        ['Cambia de dirección sin perder el control', 'Contactos cortos entre saltos'],
        ['Rodillas alineadas en todos los aterrizajes', 'Calidad antes que velocidad'],
      ],
      orbit: ['Estabiliza', 'Multisaltos: músculos que trabajan', 'Siguiente combinación'],
    },
  },
  'PL-MUL-010': {
    ...like('PL-SVE-011', {}), ...PMU, name: 'Multisaltos sobre obstáculos de altura variable', level: 'Avanzado',
    cfg: { ...EXERCISES['PL-SVE-011'].cfg, free: { ...EXERCISES['PL-SVE-011'].cfg.free,
      repDown: [0.36, 0.46, 0.40, 0.50].map((h) => jumpKeys({ h, land: [0, 0.80], cm: 0.86, absorb: 0.90 })) },
      items: [0.24, 0.34, 0.28, 0.38].map((h, i) => ({ kind: 'hurdle', h, z: 0.40 + i * 0.80 })) },
    captions: {
      intro: 'De pie frente a una fila de obstáculos de distintas alturas',
      reps: [
        ['Salta cada obstáculo ajustando la altura del salto', 'Encadena los saltos con contactos cortos'],
        ['Sube más las rodillas en los obstáculos altos', 'Brazos con impulso en cada salto'],
        ['Mirada al siguiente obstáculo', 'Aterrizajes suaves y alineados'],
      ],
      orbit: ['Sigue saltando', 'Multisaltos: músculos que trabajan', 'Ajusta la altura'],
    },
  },
  'PL-MUL-011': {
    ...like('PL-SVE-003', {}), ...PMU, primary: ['Gastrocnemio y sóleo', 'Cuádriceps'], name: 'Multisaltos de contacto mínimo (rebote rápido continuo)', level: 'Avanzado', tempo: { down: 0.8, pause: 0.05, up: 0.8 },
    cfg: { free: { type: 'jumpKF', stance: 0.12, down: jumpKeys({ h: 0.16, cm: 0.95, absorb: 0.96 }), up: jumpKeys({ h: 0.16, cm: 0.95, absorb: 0.96 }) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y rodillas casi estiradas',
      reps: [
        ['Rebota con los tobillos con el mínimo tiempo en el suelo', 'Como si el suelo quemara'],
        ['Rodillas casi estiradas y tobillos firmes', 'Apoyo en la parte delantera del pie'],
        ['Saltos bajos y muy rápidos', 'Series de 10–15 s'],
      ],
      orbit: ['Rebota', 'Rebote: músculos que trabajan', 'Contacto mínimo'],
    },
  },
  'PL-DRJ-001': {
    ...PDJ, ...DFR, ...DPH, name: 'Drop jump desde cajón bajo (20-30 cm)', level: 'Intermedio', tempo: { down: 2.2, pause: 0.8, up: 2.6 }, rest: 0.5,
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.25, 0.24), up: stepBackUp(0.25) }, items: BOX(0.25) },
    captions: {
      intro: 'De pie sobre un cajón bajo de 20–30 cm, al borde',
      reps: [
        ['Déjate caer con los dos pies a la vez', 'Rebota al instante y salta hacia arriba'],
        ['Contacto lo más corto posible', 'Talones casi sin tocar el suelo'],
        ['Altura baja para aprender la técnica', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterriza y estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-002': {
    ...PDJ, ...DFR, ...DPH, name: 'Drop jump desde cajón medio (40 cm)', level: 'Intermedio', tempo: { down: 2.3, pause: 0.8, up: 2.8 }, rest: 0.5,
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.40, 0.30), up: stepBackUp(0.40) }, items: BOX(0.40) },
    captions: {
      intro: 'De pie sobre un cajón de unos 40 cm, al borde',
      reps: [
        ['Déjate caer y rebota de inmediato hacia arriba', 'Brazos arriba con fuerza en el despegue'],
        ['Contacto corto: no te hundas al caer', 'Rodillas alineadas con los pies'],
        ['Aterriza suave tras el salto', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterriza y estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-003': {
    ...like('PL-SHO-008', {}), ...PDJ, name: 'Drop jump con salto horizontal posterior', level: 'Intermedio',
    captions: {
      intro: 'De pie sobre un cajón bajo',
      reps: [
        ['Déjate caer y rebota en un salto hacia delante', 'Aterriza estable con los dos pies'],
        ['Contacto corto en el suelo', 'Brazos con impulso al frente'],
        ['Rodillas alineadas al aterrizar', 'Vuelve caminando al cajón'],
      ],
      orbit: ['Contacto corto', 'Rebote: músculos que trabajan', 'Salta lejos'],
    },
  },
  'PL-DRJ-004': {
    ...PDJ, ...DFR, ...DPH, secondary: ['Glúteo medio', 'Isquiotibiales', 'Core'], name: 'Drop jump a una pierna', level: 'Intermedio', tempo: { down: 2.2, pause: 0.9, up: 2.6 }, rest: 0.5,
    cfg: { free: { type: 'jumpKF', stance: 0.10,
      down: dropKeys(0.20, 0.16).map((k, i) => ({ ...k, free: 'R', R: [0, i === 4 || i === 8 ? 80 : 70, i === 5 ? 35 : 22, 20] })),
      up: stepBackUp(0.20) }, items: BOX(0.20) },
    captions: {
      intro: 'De pie sobre un cajón muy bajo, al borde',
      reps: [
        ['Déjate caer sobre una pierna y rebota hacia arriba', 'Aterriza sobre la misma pierna y estabiliza'],
        ['La rodilla no se va hacia dentro', 'Cajón bajo: la carga sobre una pierna es alta'],
        ['Brazos para equilibrar', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-005': {
    ...PDJ, ...DFR, ...DPH, secondary: ['Glúteo medio', 'Aductores', 'Core'], name: 'Drop jump con salto lateral posterior', level: 'Intermedio', tempo: { down: 2.3, pause: 0.8, up: 2.8 }, rest: 0.5,
    views: { f34: { az: -30 }, side: { az: -80 }, front: { az: -10 } },
    cfg: { free: { type: 'jumpKF', stance: 0.14,
      down: dropKeys(0.30, 0.22).map((k, i) => { const x = i === 6 ? 0.25 : i >= 7 ? 0.50 : 0; return { ...k, armOut: i >= 5 ? 0.2 : 0, L: [x, k.L[1], k.L[2], k.L[3]], R: [x, k.R[1], k.R[2], k.R[3]] }; }),
      up: walkBack(0.30, 0.50, 0.45) }, items: BOX(0.30) },
    captions: {
      intro: 'De pie sobre un cajón bajo, al borde',
      reps: [
        ['Déjate caer y rebota con un salto hacia un lado', 'Aterriza estable y frena'],
        ['Contacto corto antes del salto lateral', 'Rodillas alineadas al aterrizar'],
        ['Alterna el lado del salto', 'Vuelve caminando al cajón'],
      ],
      orbit: ['Aterriza y estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-006': {
    ...PDJ, ...DFR, ...DPH, name: 'Drop jump sobre valla baja', level: 'Intermedio', tempo: { down: 2.3, pause: 0.8, up: 3.0 }, rest: 0.4,
    frame: { tz: 0.45, dist: 6.4, ty: 1.35, distLow: 6.0, tyLow: 1.30 },
    cfg: { free: { type: 'jumpKF', stance: 0.14,
      down: dropKeys(0.30, 0.40).map((k, i) => { const dz = i === 6 ? 0.25 : i >= 7 ? 0.50 : 0; return { ...k, L: [k.L[0], k.L[1], k.L[2] + dz, k.L[3]], R: [k.R[0], k.R[1], k.R[2] + dz, k.R[3]] }; }),
      up: walkBack(0.30, 0, 0.95) }, items: [...BOX(0.30), { kind: 'hurdle', h: 0.30, z: 0.72 }] },
    captions: {
      intro: 'De pie sobre un cajón bajo con una valla delante',
      reps: [
        ['Déjate caer y rebota saltando por encima de la valla', 'Aterriza suave al otro lado'],
        ['Contacto corto antes del salto', 'Rodillas arriba para superar la valla'],
        ['Rodillas alineadas al aterrizar', 'Vuelve caminando al cajón'],
      ],
      orbit: ['Aterriza y estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
});
