// Lote 56: drop jumps PL-DRJ-007 … 011 y bounding PL-BOU-001 … 005
import { EXERCISES } from './exercises.js';
import { PLI } from './ex_lote18.js';
import { dropKeys, stepBackUp } from './ex_lote19.js';
import { PDJ } from './ex_lote55.js';
import { seq } from './ex_lote54.js';

export const PBO = { ...PLI, sub: 'Bounding', primary: ['Glúteos', 'Isquiotibiales', 'Cuádriceps'], secondary: ['Gastrocnemio y sóleo', 'Flexores de cadera', 'Core'] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const mv = (keys, dx, dy, dz) => keys.map((k) => ({ ...k, L: [k.L[0] + dx, k.L[1] + dy, k.L[2] + dz, k.L[3]], R: [k.R[0] + dx, k.R[1] + dy, k.R[2] + dz, k.R[3]] }));
const DPH = { phaseNames: { BAJADA: 'CAÍDA Y REBOTE', PAUSA: 'ATERRIZAJE', SUBIDA: 'VUELVE AL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE' };
const DFR = { frame: { tz: 0.20, dist: 6.2, ty: 1.35, distLow: 5.8, tyLow: 1.30 }, views: { f34: { az: -50 }, side: { az: -80 } } };
const BOX = (h, z = 0.02) => ({ kind: 'box', w: 0.60, h, d: 0.45, z });
const BND = EXERCISES['TI-PLI-007'];
// bounding con la zancada escalada (sz) y vuelo extra (dy)
function bounds(sz, dy) {
  const f = BND.cfg.free, sc = (k) => {
    const fl = (k.u === 0.37 || k.u === 0.83) ? dy : 0;
    return { ...k, P: [k.P[0], k.P[1] + fl, k.P[2] * sz], L: [k.L[0], k.L[1] + (k.L[1] > 0.1 ? fl : 0), k.L[2] * sz, k.L[3]], R: [k.R[0], k.R[1] + (k.R[1] > 0.1 ? fl : 0), k.R[2] * sz, k.R[3]] };
  };
  return { ...f, travel: f.travel * sz, down: f.down.map(sc), up: f.up.map(sc) };
}

Object.assign(EXERCISES, {
  'PL-DRJ-007': {
    ...like('PL-DRJ-001', {}), name: 'Drop jump reactivo (tiempo de contacto minimizado)', level: 'Intermedio', tempo: { down: 1.9, pause: 0.8, up: 2.6 },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.30, 0.22).map((k, i) => (i === 4 ? { ...k, k: 0.93, lean: 14 } : k)), up: stepBackUp(0.30) }, items: [BOX(0.30)] },
    captions: {
      intro: 'De pie sobre un cajón bajo, al borde',
      reps: [
        ['Déjate caer y despega como si el suelo quemara', 'El contacto debe ser lo más breve posible'],
        ['Rodillas poco flexionadas al contactar', 'Tobillos firmes y apoyo en la parte delantera del pie'],
        ['Prioriza la rapidez sobre la altura', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Contacto mínimo', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-008': {
    ...like('PL-DRJ-002', {}), secondary: ['Isquiotibiales', 'Core', 'Erectores espinales'], name: 'Drop jump con chaleco lastrado', level: 'Avanzado',
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.30, 0.20), up: stepBackUp(0.30) }, items: [BOX(0.30)] },
    captions: {
      intro: 'De pie sobre un cajón bajo con un chaleco lastrado ajustado',
      reps: [
        ['Déjate caer y rebota hacia arriba con la carga', 'Aterriza suave y amortigua'],
        ['Cajón más bajo que sin chaleco', 'Contacto corto sin hundirte'],
        ['Pocas repeticiones de calidad', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterriza y estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-009': {
    ...PDJ, ...DFR, ...DPH, secondary: ['Oblicuos', 'Isquiotibiales', 'Core'], name: 'Drop jump con giro de 90°', level: 'Avanzado', tempo: { down: 2.3, pause: 0.8, up: 2.8 }, rest: 0.5,
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.30, 0.26).map((k, i) => ({ ...k, yaw: i < 6 ? 0 : i === 6 ? 45 : 90 })),
      up: stepBackUp(0.30).map((k, i) => ({ ...k, yaw: i === 0 ? 90 : i === 1 ? 45 : 0 })) }, items: [BOX(0.30)] },
    captions: {
      intro: 'De pie sobre un cajón bajo, al borde',
      reps: [
        ['Déjate caer y rebota girando un cuarto de vuelta en el aire', 'Aterriza estable mirando al lado'],
        ['El giro sale de la cadera y los hombros', 'Contacto corto antes de girar'],
        ['Alterna el sentido del giro', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterriza y estabiliza', 'Rebote: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-DRJ-010': {
    ...PDJ, ...DFR, phaseNames: { BAJADA: 'CAÍDA Y SALTO AL CAJÓN', PAUSA: 'SOBRE EL CAJÓN', SUBIDA: 'SEGUNDA CAÍDA Y REBOTE', ARRIBA: 'INICIO' }, holdLabel: 'SOBRE EL SEGUNDO CAJÓN',
    name: 'Drop jump doble (dos cajones consecutivos)', level: 'Avanzado', tempo: { down: 2.4, pause: 0.6, up: 2.4 }, rest: 0.6,
    frame: { tz: 0.70, dist: 6.6, ty: 1.35, distLow: 6.2, tyLow: 1.30 },
    cfg: { free: { type: 'jumpKF', stance: 0.14,
      down: dropKeys(0.30, 0.28).map((k, i) => { if (i < 6) return k; const y = i === 6 ? 0.58 : 0.30, z = i === 6 ? 0.75 : 1.00; return { ...k, L: [k.L[0], y, z, k.L[3]], R: [k.R[0], y, z, k.R[3]] }; }),
      up: mv(dropKeys(0.30, 0.26), 0, 0, 1.00) },
      items: [BOX(0.30), BOX(0.30, 1.02)] },
    captions: {
      intro: 'De pie sobre el primer de dos cajones bajos en fila',
      reps: [
        ['Déjate caer y rebota saltando al segundo cajón', 'Desde el segundo, vuelve a caer y rebota hacia arriba'],
        ['Contactos cortos en el suelo', 'Aterriza suave en el centro del cajón'],
        ['Cajones estables y bien separados', 'Calidad antes que velocidad'],
      ],
      orbit: ['Contacto corto', 'Rebote: músculos que trabajan', 'Encadena los cajones'],
    },
  },
  'PL-DRJ-011': {
    ...PDJ, ...DFR, phaseNames: { BAJADA: 'CAÍDA', PAUSA: 'ESTABILIZA', SUBIDA: 'VUELVE AL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE CLAVADO',
    primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], name: 'Drop jump con aterrizaje estabilizado (sin rebote posterior)', level: 'Avanzado', tempo: { down: 1.2, pause: 2.0, up: 2.6 }, rest: 0.5,
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.40, 0.2).slice(0, 5).map((k) => ({ ...k, u: k.u / 0.47 })).map((k, i, a) => (i === a.length - 1 ? { ...k, k: 0.83, lean: 28, arm: 40 } : k)), up: stepBackUp(0.40) }, items: [BOX(0.40)] },
    captions: {
      intro: 'De pie sobre un cajón de unos 40 cm, al borde',
      reps: [
        ['Déjate caer y aterriza clavando la posición', 'Mantén 2 s sin moverte'],
        ['Cadera atrás, rodillas alineadas y pecho al frente', 'Aterrizaje silencioso'],
        ['Aprende a frenar antes de rebotar', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterrizaje clavado', 'Frenado: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'PL-BOU-001': {
    ...like('TI-PLI-007', {}), ...PBO, secondary: ['Gastrocnemio y sóleo', 'Deltoides', 'Core'], name: 'Bounding alterno con brazos amplios', level: 'Intermedio',
    cfg: { free: { ...BND.cfg.free, down: BND.cfg.free.down.map((k) => ({ ...k, arm: k.arm > 30 ? k.arm + 30 : k.arm - 15, armOut: 0.15 })) } },
    captions: {
      intro: 'De pie, listo para impulsarte',
      reps: [
        ['Zancadas saltadas largas con braceo amplio', 'Los brazos suben a la altura de la cabeza'],
        ['Rodilla delantera arriba y empuje completo de la pierna de atrás', 'Contactos cortos'],
        ['Tronco erguido', 'Series de 6–10 zancadas'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-BOU-002': {
    ...like('TI-PLI-008', {}), ...PBO, secondary: ['Glúteo medio', 'Gastrocnemio y sóleo', 'Core'], name: 'Bounding a una pierna repetido', level: 'Intermedio', tempo: { down: 2.6, pause: 0.6, up: 1.0 },
    cfg: { free: (() => { const f = EXERCISES['TI-PLI-008'].cfg.free, d = f.down;
      return { ...f, travel: 1.30, down: seq(d, mv(d, 0, 0, 0.65)), up: mv(f.up, 0, 0, 0.65) }; })() },
    captions: {
      intro: 'De pie sobre una pierna',
      reps: [
        ['Encadena saltos hacia delante con la misma pierna', 'Estabiliza al final de cada serie'],
        ['La rodilla libre impulsa hacia delante', 'Rodilla de apoyo alineada al aterrizar'],
        ['Brazos coordinados', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
  'PL-BOU-003': {
    ...like('TI-PLI-007', {}), ...PBO, name: 'Bounding en cuesta ascendente', level: 'Intermedio',
    cfg: { free: { ...bounds(0.85, 0.04), down: bounds(0.85, 0.04).down.map((k) => ({ ...k, lean: k.lean + 8 })) } },
    captions: {
      intro: 'Al pie de una cuesta suave',
      reps: [
        ['Sube la cuesta con zancadas saltadas potentes', 'Inclina un poco el tronco hacia la pendiente'],
        ['Empuja con fuerza la pierna de atrás', 'Rodilla delantera arriba'],
        ['La cuesta reduce el impacto y aumenta el empuje', 'Vuelve caminando para recuperar'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'PL-BOU-004': {
    ...like('TI-PLI-007', {}), ...PBO, primary: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'], name: 'Bounding en cuesta descendente (controlado)', level: 'Intermedio',
    cfg: { free: { ...bounds(0.80, 0), down: bounds(0.80, 0).down.map((k) => ({ ...k, lean: Math.max(2, k.lean - 6) })) } },
    captions: {
      intro: 'Arriba de una cuesta suave',
      reps: [
        ['Baja la cuesta con zancadas saltadas cortas y controladas', 'Frena con cada apoyo'],
        ['Tronco erguido: no te inclines hacia delante', 'Rodillas alineadas al aterrizar'],
        ['Pendiente muy suave', 'Calidad del aterrizaje ante todo'],
      ],
      orbit: ['Aterriza y estabiliza', 'Frenado: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'PL-BOU-005': {
    ...like('TI-PLI-007', {}), ...PBO, name: 'Bounding sobre vallas bajas', level: 'Intermedio',
    cfg: { free: bounds(1.0, 0.06), items: [0, 1, 2, 3].flatMap((k) => [{ kind: 'hurdle', h: 0.25, z: 0.65 + k * 2.6 }, { kind: 'hurdle', h: 0.25, z: 1.95 + k * 2.6 }]) },
    captions: {
      intro: 'De pie frente a una fila de vallas bajas',
      reps: [
        ['Una zancada saltada por encima de cada valla', 'Alterna la pierna de impulso'],
        ['Rodilla delantera arriba para pasar la valla', 'Contactos cortos entre vallas'],
        ['Tronco erguido y braceo coordinado', 'Vuelve caminando al inicio'],
      ],
      orbit: ['Aterriza y estabiliza', 'Impulso: músculos que trabajan', 'Prepara la siguiente serie'],
    },
  },
});
