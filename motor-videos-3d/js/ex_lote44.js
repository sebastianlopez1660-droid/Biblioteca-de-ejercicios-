// Lote 44: anti-flexión CO-AFL-007 … 010 y anti-inclinación CO-AIN-001 … 006
import { EXERCISES } from './exercises.js';
import './ex_lote14.js';
import './ex_lote17.js';
import './ex_lote24.js';
import './ex_lote28.js';
import { STAND_FR } from './ex_lote42.js';
import './ex_lote43.js';

const AFL = { sub: 'Anti-flexión', primary: ['Erectores espinales'], secondary: ['Glúteos', 'Isquiotibiales'] };
export const AIN = { family: 'free', sub: 'Anti-inclinación', primary: ['Oblicuos', 'Cuadrado lumbar'], secondary: ['Glúteo medio', 'Transverso abdominal'], labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.16, 0.08, 0, 0, 8], R: [-0.16, 0.08, 0, 0, -8] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const isoKeys = (code, i) => { const f = EXERCISES[code].cfg.free, k = f.keys[i]; return { ...f, keys: [{ ...k, u: 0 }, { ...k, u: 1 }] }; };
// plancha lateral sobre el antebrazo derecho (cabeza hacia -x, pecho hacia +z)
export function sidePlankFA(th = 17, o = {}) {
  const t = th * Math.PI / 180, xf = o.xf ?? 0.80, t0 = (o.thArm ?? th) * Math.PI / 180;
  const P = [xf - 0.87 * Math.cos(t), 0.10 + 0.87 * Math.sin(t), 0];
  const P0x = xf - 0.87 * Math.cos(t0);
  return { P, rot: [0, 0, 90 - th], nk: [0, 0], L: [xf, 0.17, 0, 0, 0], R: [xf + 0.01, 0.08, 0, 0, 0], kL: [0, 1, 0.2], kR: [0, 1, 0.2],
    hR: [P0x - 0.48 * Math.cos(t0) - 0.02, 0.045, 0.27], eR: [0, -1, -0.3], pR: [0, -1, 0, 0, 0, 1] };
}
export const SIDE_FR = { frame: { dist: 4.0, ty: 0.40, tz: 0.10, distLow: 3.7, tyLow: 0.38 },
  views: { f34: { az: -25, el: 16 }, side: { az: 0, el: 8 }, front: { az: -50, el: 20 }, back34: { az: 30, el: 22 } }, orbit: { view: 'side', sweep: 120 } };
const SP = sidePlankFA(17);
const ARM_HIP = { aL: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0] };
const ARM_UP = { hL: [SP.P[0] - 0.36, 1.12, 0.06], eL: [0, 0, -1], pL: [0, 0, 1, 0, 1, 0] };

Object.assign(EXERCISES, {
  'CO-AFL-007': {
    ...like('CO-ARO-005', {}), ...AFL, primary: ['Erectores espinales', 'Glúteos'], secondary: ['Transverso abdominal', 'Isquiotibiales', 'Deltoides anterior'],
    name: 'Bird dog con énfasis en extensión lumbar', level: 'Avanzado', tempo: { down: 2, pause: 2, up: 2 },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Estira brazo y pierna contraria hasta la línea del tronco', 'Mantén 2 s apretando glúteo y espalda'],
        ['La pierna no sube por encima de la cadera', 'La zona lumbar no se hunde'],
        ['Alterna los lados', 'Movimiento lento y controlado'],
      ],
      orbit: ['Brazo y pierna estirados', 'Extensión: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-AFL-008': {
    ...like('TI-BIL-003', {}), ...AFL, primary: ['Erectores espinales', 'Glúteos'], secondary: ['Isquiotibiales', 'Trapecio superior', 'Antebrazo'],
    name: 'Peso muerto isométrico en rack (anti-flexión de columna)', level: 'Avanzado', fromFloor: false, shortCaps: false, rest: 0,
    tempo: { down: 2, pause: 5, up: 2 }, phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'SUBIDA', ARRIBA: 'DE PIE' }, holdLabel: 'TIRA SIN MOVER LA BARRA',
    cfg: { ...EXERCISES['TI-BIL-003'].cfg, barTarget: 0.50, leanBot: 42, items: [{ kind: 'rackPins', y: 0.47, zBar: true }] },
    captions: {
      intro: 'Barra apoyada en los soportes del rack a la altura de las rodillas',
      reps: [
        ['Agarra la barra y tira con fuerza máxima sin que se mueva', 'Mantén 5 s y suelta'],
        ['Espalda recta: el pecho alto y la columna no se redondea', 'Empuja el suelo con los pies'],
        ['Hombros sobre la barra y brazos estirados', 'Respira antes de cada tirón'],
      ],
      orbit: ['Tira fuerte', 'Isometría: músculos que trabajan', 'Mantén la espalda recta'],
    },
  },
  'CO-AFL-009': {
    ...like('TS-ESP-004', {}), ...AFL, secondary: ['Oblicuos', 'Glúteos', 'Isquiotibiales'], name: 'Hiperextensión con rotación controlada', level: 'Avanzado',
    cfg: { ...EXERCISES['TS-ESP-004'].cfg, free: { ...EXERCISES['TS-ESP-004'].cfg.free, alt: true,
      keys: EXERCISES['TS-ESP-004'].cfg.free.keys.map((k, i) => (i === 0 ? { ...k, sp: [(k.sp || [0])[0], 22, 0], nk: [(k.nk || [0])[0], 16] } : k)) } },
    captions: {
      intro: 'En el banco romano con la cadera apoyada y las manos detrás de la cabeza',
      reps: [
        ['Sube hasta alinear el cuerpo y gira el tronco hacia un lado', 'Vuelve al centro y baja controlando'],
        ['Rotación lenta y pequeña, sin tirones', 'Alterna el lado de giro'],
        ['La espalda no pasa de la línea del cuerpo', 'Aprieta glúteos arriba'],
      ],
      orbit: ['Cuerpo alineado', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-AFL-010': {
    ...like('TS-HOR-005', {}), ...AFL, primary: ['Erectores espinales', 'Dorsal ancho'], secondary: ['Romboides', 'Glúteos', 'Bíceps'],
    name: 'Sostén isométrico en suspensión (TRX, anti-flexión)', level: 'Avanzado', iso: true, tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null, labelAll: true,
    cfg: { ...EXERCISES['TS-HOR-005'].cfg, free: isoKeys('TS-HOR-005', 1) },
    captions: {
      intro: 'Inclinado hacia atrás con el pecho junto a las asas del TRX',
      reps: [
        ['Mantén el cuerpo recto de hombros a talones', 'Escápulas juntas y codos atrás'],
        ['La cadera no cae: glúteos y abdomen firmes', 'Respira de forma continua'],
        ['Más inclinación = más difícil', 'Series de 15–30 s'],
      ],
      orbit: ['Mantén la línea', 'Isometría: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-AIN-001': {
    ...AIN, ...SIDE_FR, name: 'Plancha lateral (side plank)', level: 'Principiante', iso: true, tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null,
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [{ u: 0, ...SP, ...ARM_HIP }, { u: 1, ...SP, ...ARM_HIP }] }, items: [{ kind: 'mat', z: 0.05, x: 0.1, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'De lado, apoyado en el antebrazo con el codo bajo el hombro',
      reps: [
        ['Cadera alta: cuerpo recto de cabeza a pies', 'Respira de forma continua'],
        ['La cadera no cae ni se va hacia atrás', 'Hombro de apoyo activo, sin hundirse'],
        ['Regresión: rodillas apoyadas', 'Series de 15–45 s por lado'],
      ],
      orbit: ['Cadera alta', 'Plancha lateral: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-AIN-002': {
    ...AIN, ...SIDE_FR, primary: ['Oblicuos', 'Glúteo medio'], name: 'Plancha lateral con elevación de pierna', level: 'Principiante',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'ELEVA LA PIERNA', SUBIDA: 'BAJA', ARRIBA: 'PLANCHA LATERAL' }, holdLabel: 'PIERNA ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [{ u: 0, ...SP, ...ARM_HIP, lL: [0, 2, 10, -6] }, { u: 1, ...SP, ...ARM_HIP, lL: [0, 2, 10, 30] }] },
      items: [{ kind: 'mat', z: 0.05, x: 0.1, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Plancha lateral sobre el antebrazo con las piernas estiradas',
      reps: [
        ['Eleva la pierna de arriba estirada', 'Bájala sin apoyarla del todo'],
        ['La cadera de abajo no cae', 'Pie de arriba mirando al frente'],
        ['Movimiento lento', 'Cambia de lado al terminar'],
      ],
      orbit: ['Pierna arriba', 'Plancha lateral: músculos que trabajan', 'Cadera alta'],
    },
  },
  'CO-AIN-003': {
    ...AIN, ...SIDE_FR, secondary: ['Transverso abdominal', 'Serrato anterior', 'Romboides'], name: 'Plancha lateral con rotación de brazo (reach through)', level: 'Principiante',
    tempo: { down: 2, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'PASA EL BRAZO', SUBIDA: 'ABRE', ARRIBA: 'BRAZO AL TECHO' }, holdLabel: 'BRAZO DEBAJO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, ...SP, ...ARM_UP }, { u: 1, ...SP, rot: [-12, 0, 90 - 17], sp: [0, 22, 0], nk: [0, 14], hL: [SP.P[0] - 0.34, 0.22, -0.30], eL: [0, 1, 0], pL: [0, -1, 0, 0, 0, -1] }] },
      items: [{ kind: 'mat', z: 0.05, x: 0.1, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Plancha lateral sobre el antebrazo con el brazo de arriba hacia el techo',
      reps: [
        ['Pasa el brazo por debajo del cuerpo girando el tronco', 'Vuelve a abrirlo hacia el techo'],
        ['La cadera no cae durante el giro', 'Sigue la mano con la mirada'],
        ['Movimiento lento y controlado', 'Cambia de lado al terminar'],
      ],
      orbit: ['Brazo debajo', 'Rotación: músculos que trabajan', 'Cadera alta'],
    },
  },
  'CO-AIN-004': {
    ...like('TI-EST-010', {}), ...AIN, secondary: ['Glúteo medio', 'Antebrazo', 'Trapecio superior'], name: 'Marcha lateral con carga unilateral tipo maletín (suitcase carry core)', level: 'Intermedio',
    frame: { dist: 5.0, ty: 0.95, tz: 0.0, distLow: 4.6, tyLow: 0.92 }, trackX: true,
    cfg: { free: { type: 'gait', lateral: true, carry: 'R', kneeBend: 10, lean: 2, width: 0.17, stepLen: 0.32, stepTime: 0.70, lift: 0.05 } },
    captions: {
      intro: 'De pie con una carga pesada en una mano',
      reps: [
        ['Camina de lado con pasos cortos sin inclinarte hacia la carga', 'Hombros y cadera nivelados'],
        ['Los pies no se cruzan', 'Abdomen firme y mirada al frente'],
        ['10–15 pasos hacia cada lado', 'Cambia de mano en la siguiente serie'],
      ],
      orbit: ['Sigue avanzando de lado', 'En marcha: músculos que trabajan', 'Tronco recto'],
    },
  },
  'CO-AIN-005': {
    ...like('TI-EST-010', {}), ...AIN, primary: ['Oblicuos', 'Deltoides', 'Manguito rotador'], secondary: ['Trapecio superior', 'Serrato anterior', 'Core'], name: "Marcha con kettlebell en posición de mesero (waiter's carry)", level: 'Intermedio',
    frame: { dist: 5.2, ty: 1.15, tz: 0.0, distLow: 4.8, tyLow: 1.10 },
    cfg: { free: { type: 'gait', carryOH: 'R', stepLen: 0.50, stepTime: 0.62, lift: 0.06 } },
    captions: {
      intro: 'De pie con una kettlebell sujeta con el brazo estirado por encima de la cabeza',
      reps: [
        ['Camina con pasos normales manteniendo el brazo vertical', 'Muñeca recta y bíceps junto a la oreja'],
        ['Costillas abajo: no arquees la espalda', 'Hombro activo, empujando hacia el techo'],
        ['Peso moderado', 'Cambia de brazo en la vuelta'],
      ],
      orbit: ['Brazo vertical', 'En marcha: músculos que trabajan', 'Sigue caminando'],
    },
  },
  'CO-AIN-006': {
    ...like('CO-ARO-001', {}), ...AIN, primary: ['Oblicuos', 'Transverso abdominal'], secondary: ['Aductores', 'Glúteos', 'Cuadrado lumbar'], name: 'Press Pallof en posición lateral', level: 'Intermedio',
    cfg: { ...EXERCISES['CO-ARO-001'].cfg, free: { ...EXERCISES['CO-ARO-001'].cfg.free,
      keys: EXERCISES['CO-ARO-001'].cfg.free.keys.map((k) => ({ ...k, P: [0, -0.10, -0.03], rot: [8, 0, 0], L: [0.36, 0.08, 0, 0, 16], R: [-0.36, 0.08, 0, 0, -16] })) } },
    captions: {
      intro: 'Piernas muy separadas y rodillas flexionadas, de lado al anclaje',
      reps: [
        ['Empuja las manos al frente sin girar el tronco', 'Mantén 2 s y vuelve al pecho'],
        ['Base ancha y baja: cadera estable', 'Rodillas en la línea de los pies'],
        ['La banda tira de lado: resiste', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Brazos al frente', 'Anti-rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
});
