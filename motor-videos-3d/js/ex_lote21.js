// Lote 21: activación TI-ACT-006 … 010 y empujes TS-EMP-001 … 005
import { EXERCISES } from './exercises.js';
import { WALK } from './ex_lote12.js';
import { plankKey, handsFloor } from './ts_common.js';

const ACT = { sub: 'Activación', secondary: ['Core'] };
export const EMP = { family: 'free', sub: 'Empujes', primary: ['Pectoral'], secondary: ['Tríceps', 'Deltoides anterior'], tempo: { down: 2, pause: 0.5, up: 1.5 },
  phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE', ARRIBA: 'ARRIBA' }, labelAll: true };
export const PUSH_FR = { frame: { dist: 4.4, ty: 0.42, tz: 0.15, distLow: 4.0, tyLow: 0.38 },
  views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 22 }, back34: { az: -140, el: 26 } }, orbit: { view: 'side', sweep: 160 } };
const pk = (th, u, o = {}) => ({ u, ...plankKey(th, o), ...handsFloor(o.thTop ?? th, o) });

// press tumbado en banco plano (cabeza hacia -z)
export function benchKeys({ top = 1.10, bot = 0.66, zTop = -0.44, zBot = -0.34, w = 0.40, palm = [0, 1, 0.35, 1, 0, 0], arch = -8 } = {}) {
  const base = { P: [0, 0.53, -0.02], rot: [-90, 0, 0], sp: [arch, 0, 0], nk: [-14, 0],
    L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1],
    eL: [0.6, -1, 0.25], eR: [-0.6, -1, 0.25], pL: palm, pR: [palm[0], palm[1], palm[2], -palm[3], palm[4], palm[5]] };
  return [{ ...base, u: 0, hL: [w, top, zTop], hR: [-w, top, zTop] }, { ...base, u: 1, hL: [w, bot, zBot], hR: [-w, bot, zBot] }];
}
export const BENCH_FR = { frame: { dist: 4.2, ty: 0.70, tz: -0.10, distLow: 3.9, tyLow: 0.66 },
  views: { f34: { az: -60, el: 22 }, side: { az: -90, el: 10 }, front: { az: -25, el: 30 }, back34: { az: -150, el: 28 } }, orbit: { view: 'side', sweep: 150 } };

Object.assign(EXERCISES, {
  'TI-ACT-006': {
    ...ACT, family: 'squat', primary: ['Glúteo medio', 'Cuádriceps'], name: 'Sentadilla con banda para activación de glúteo medio', level: 'Intermedio',
    tempo: { down: 2, pause: 1, up: 2 }, frame: { tz: 0.0, dist: 4.6 }, views: { f34: { az: -25 }, front: { az: 0 } },
    cfg: { arms: 'forward', stance: 0.16, toeOut: 10, hipBottom: 0.56, leanTop: 2, leanBot: 34, kneeOut: 0.11, kneeLoop: true },
    captions: {
      intro: 'Mini banda sobre las rodillas, pies algo más abiertos que la cadera',
      reps: [
        ['Baja empujando las rodillas hacia fuera contra la banda', 'Mantén 1 s abajo con la banda tensa'],
        ['Siente la parte lateral de la cadera trabajando', 'Rodillas en la línea de los pies'],
        ['Profundidad media: es una activación', 'Sube sin dejar que las rodillas se cierren'],
      ],
      orbit: ['Baja con las rodillas afuera', 'Posición baja: músculos que trabajan', 'Sube manteniendo la tensión'],
    },
  },
  'TI-ACT-007': {
    ...ACT, ...WALK, family: 'free', primary: ['Glúteo medio'], name: 'Marcha con banda en tobillos (ankle band walk)', level: 'Avanzado',
    tempo: { down: 2, pause: 0, up: 2 }, frame: { dist: 4.9, ty: 0.86, tz: 0.0, distLow: 4.4, tyLow: 0.82 },
    cfg: { free: { type: 'gait', kneeBend: 24, lean: 12, width: 0.15, stepLen: 0.30, stepTime: 0.75, lift: 0.05, ankleBand: true, armsHips: true } },
    captions: {
      intro: 'Mini banda en los tobillos, en media sentadilla',
      reps: [
        ['Camina hacia delante con pasos cortos y la banda tensa', 'Los pies siempre separados'],
        ['Rodillas hacia fuera en cada paso', 'Mantén la altura de la cadera'],
        ['Tramos de 10–15 pasos', 'Puedes alternar hacia delante y hacia atrás'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Banda siempre tensa'],
    },
  },
  'TI-ACT-008': {
    ...ACT, family: 'free', primary: ['Core', 'Glúteos'], secondary: ['Flexores de cadera'], name: 'Dead bug con activación de cadera', level: 'Avanzado', labelAll: true,
    tempo: { down: 2, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'BRAZO Y PIERNA OPUESTOS',
    frame: { dist: 4.0, ty: 0.32, tz: 0.15, distLow: 3.6, tyLow: 0.32 }, views: { f34: { az: -50, el: 24 }, side: { az: -90, el: 12 }, front: { az: -20, el: 30 }, back34: { az: 140, el: 30 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [
        { u: 0, P: [0, 0.115, 0], rot: [-90, 0, 0], sp: [4, 0, 0], nk: [10, 0], lL: [90, 90, 0, 0], lR: [90, 90, 0, 0], aL: [90, 4, 4], aR: [90, 4, 4], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, P: [0, 0.115, 0], rot: [-90, 0, 0], sp: [4, 0, 0], nk: [10, 0], lL: [90, 90, 0, 0], lR: [12, 6, 10, 0], aL: [168, 6, 4], aR: [90, 4, 4], pL: [0, 1, 0, 0, 0, -1], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, brazos al techo y caderas y rodillas a 90°',
      reps: [
        ['Estira un brazo atrás y la pierna contraria al frente', 'Vuelve y cambia de lado'],
        ['La zona lumbar no se despega del suelo', 'Exhala al extender'],
        ['Movimiento lento y controlado', 'Siente el glúteo al estirar la pierna'],
      ],
      orbit: ['Brazo y pierna opuestos', 'Extensión: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TI-ACT-009': {
    ...ACT, family: 'free', primary: ['Tibial anterior'], secondary: [], name: 'Activación de tibial anterior previa a la carrera', level: 'Avanzado',
    tempo: { down: 0.8, pause: 0.3, up: 0.8 }, phaseNames: { BAJADA: 'PUNTERA ARRIBA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'FLEXIÓN DORSAL',
    frame: { dist: 4.2, ty: 0.80, tz: 0.05, distLow: 3.6, tyLow: 0.62 },
    cfg: { arms: 'hips', free: { type: 'calf', heelPivot: true, maxPitch: 26 } },
    captions: {
      intro: 'De pie, manos en la cintura',
      reps: [
        ['Sube las puntas de los pies rápido y bájalas controlando', 'Ritmo ágil, como un rebote suave'],
        ['Los talones no se despegan del suelo', 'Rodillas estiradas pero sin bloquear'],
        ['20–30 repeticiones antes de correr', 'Siente la parte delantera de la pierna'],
      ],
      orbit: ['Puntas arriba', 'Flexión dorsal: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-ACT-010': {
    ...ACT, ...WALK, family: 'free', primary: ['Cuádriceps', 'Gastrocnemio y sóleo'], secondary: ['Core'], name: 'Escalera de coordinación ligera (activación neuromuscular)', level: 'Avanzado',
    tempo: { down: 2, pause: 0, up: 2 }, frame: { dist: 5.0, ty: 0.86, tz: 0.0, distLow: 4.6, tyLow: 0.82 },
    views: { f34: { az: -45, el: 18 }, side: { az: -80, el: 14 }, front: { az: -15, el: 22 }, back34: { az: -150, el: 24 } },
    cfg: { free: { type: 'gait', twoIn: true, stepLen: 0.225, stepTime: 0.30, lift: 0.08, width: 0.10, kneeBend: 14, lean: 8 }, items: [{ kind: 'ladder', n: 50, z0: -0.25 }] },
    captions: {
      intro: 'De pie al inicio de la escalera de agilidad',
      reps: [
        ['Dos apoyos en cada casilla: un pie y luego el otro', 'Pasos cortos y rápidos sobre la parte delantera del pie'],
        ['Brazos coordinados con las piernas', 'Mirada al frente, no a los pies'],
        ['Ritmo ligero: es una activación', 'Repite 2–4 pasadas'],
      ],
      orbit: ['Sigue el ritmo', 'En marcha: músculos que trabajan', 'Dos apoyos por casilla'],
    },
  },
  'TS-EMP-001': {
    ...EMP, ...PUSH_FR, name: 'Flexión de brazos (push-up)', level: 'Principiante',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [pk(21, 0), pk(5, 1, { thTop: 21 })] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Manos bajo los hombros y cuerpo recto de la cabeza a los talones',
      reps: [
        ['Baja en 2 s hasta casi tocar el suelo con el pecho', 'Empuja el suelo hasta estirar los brazos'],
        ['Codos a unos 45° del cuerpo, no abiertos en cruz', 'Abdomen y glúteos firmes: la cadera no cae'],
        ['Cabeza en línea con la columna', 'Exhala al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja el suelo'],
    },
  },
  'TS-EMP-002': {
    ...EMP, ...PUSH_FR, name: 'Flexión de brazos con rodillas apoyadas (regresión)', level: 'Principiante',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [pk(33, 0, { knees: true, zA: -0.40 }), pk(8, 1, { knees: true, zA: -0.40, thTop: 33 })] }, items: [{ kind: 'mat', z: 0.15, l: 1.6 }] },
    captions: {
      intro: 'Rodillas apoyadas, manos bajo los hombros y cuerpo recto de rodillas a cabeza',
      reps: [
        ['Baja en 2 s llevando el pecho hacia el suelo', 'Empuja hasta estirar los brazos'],
        ['La cadera queda alineada: no la subas', 'Codos a unos 45° del cuerpo'],
        ['Progresa a la flexión completa cuando hagas 15 limpias', 'Exhala al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja el suelo'],
    },
  },
  'TS-EMP-003': {
    ...EMP, ...PUSH_FR, name: 'Flexión de brazos con pies elevados', level: 'Principiante', secondary: ['Deltoides anterior', 'Tríceps'],
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [pk(2, 0, { ankleY: 0.53 }), pk(-15, 1, { ankleY: 0.53, thTop: 2 })] },
      items: [{ kind: 'box', h: 0.45, w: 0.50, d: 0.40, z: -0.80 }] },
    captions: {
      intro: 'Pies sobre un cajón, manos en el suelo bajo los hombros',
      reps: [
        ['Baja en 2 s hasta casi tocar el suelo con el pecho', 'Empuja hasta estirar los brazos'],
        ['Cuerpo recto: la cadera no se dobla', 'Más carga en la parte alta del pecho y el hombro'],
        ['Codos a unos 45° del cuerpo', 'Exhala al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja el suelo'],
    },
  },
  'TS-EMP-004': {
    ...EMP, ...PUSH_FR, name: 'Flexión de brazos con palmada (versión pliométrica)', level: 'Principiante', tempo: { down: 1.2, pause: 0.2, up: 1.6 }, rest: 0.6,
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE Y PALMADA', ARRIBA: 'ARRIBA' },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [pk(21, 0), pk(5, 1, { thTop: 21 })],
      up: [pk(5, 0, { thTop: 21 }), pk(24, 0.22, { thTop: 21 }),
        { ...plankKey(28), u: 0.40, hL: [0.03, 0.42, 0.46], hR: [-0.03, 0.42, 0.46], eL: [0.8, -0.4, -0.4], eR: [-0.8, -0.4, -0.4], pL: [-1, 0, 0, 0, 0.5, 1], pR: [1, 0, 0, 0, 0.5, 1] },
        { ...pk(22, 0.62, { thTop: 21 }) }, pk(13, 0.80, { thTop: 21 }), pk(21, 1)] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición de flexión: manos bajo los hombros y cuerpo recto',
      reps: [
        ['Baja y empuja explosivo para despegar las manos', 'Da una palmada y apoya las manos de nuevo'],
        ['Aterriza con los codos suaves para amortiguar', 'El cuerpo sigue recto en el aire'],
        ['Pocas repeticiones y de máxima calidad', 'Domina antes la flexión normal'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja explosivo'],
    },
  },
  'TS-EMP-005': {
    ...EMP, ...BENCH_FR, name: 'Press de banca con barra', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: benchKeys({}) }, items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, pies firmes en el suelo y agarre algo más ancho que los hombros',
      reps: [
        ['Baja la barra en 2 s hasta la parte baja del pecho', 'Empuja hasta estirar los brazos sobre los hombros'],
        ['Escápulas juntas y hacia abajo durante todo el movimiento', 'Codos a 45–60° del cuerpo'],
        ['Glúteos apoyados en el banco', 'Muñecas rectas sobre los codos'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja la barra arriba'],
    },
  },
});
