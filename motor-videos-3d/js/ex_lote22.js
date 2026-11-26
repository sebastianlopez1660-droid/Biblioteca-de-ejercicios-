// Lote 22: empujes TS-EMP-006 … 013 y tracciones TS-TRA-001 … 002
import { EXERCISES } from './exercises.js';
import { EMP, benchKeys, BENCH_FR } from './ex_lote21.js';

const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const STAG = { P: [0, -0.03, -0.02], rot: [4, 0, 0], L: [0.12, 0.08, 0.22, 0, 6], R: [-0.13, 0.08, -0.30, 10, -6] };
export const STAND_FR = { frame: { dist: 4.6, ty: 1.20, tz: 0.0, distLow: 4.3, tyLow: 1.15 }, views: { f34: { az: -40, el: 10 }, side: { az: -85, el: 6 }, front: { az: -10, el: 10 } } };
const SEAT = { P: [0, 0.555, -0.03], rot: [-8, 0, 0], L: [0.17, 0.08, 0.46, 0, 10], R: [-0.17, 0.08, 0.46, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const SEAT_FR = { frame: { dist: 4.4, ty: 1.00, tz: 0.15, distLow: 4.1, tyLow: 0.98 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 } } };
export const PULL = { family: 'free', sub: 'Tracciones', primary: ['Dorsal ancho'], secondary: ['Bíceps', 'Romboides', 'Trapecio medio'], tempo: { down: 2, pause: 0.5, up: 1.5 },
  phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'BAJADA', ARRIBA: 'INICIO' }, holdLabel: 'CONTRACCIÓN MÁXIMA', labelAll: true };
export const HANG_FR = { frame: { dist: 5.2, ty: 1.55, tz: 0.0, distLow: 4.9, tyLow: 1.55 }, views: { f34: { az: -40, el: 6 }, side: { az: -85, el: 4 }, front: { az: -15, el: 4 }, back34: { az: 160, el: 10 } } };
// dominadas: s = 0 colgado con brazos estirados, s = 1 barbilla sobre la barra
export function hangKeys({ w = 0.30, palm = [0, 0, 1], elbow = [1, -0.4, 0], bar = 2.25 } = {}) {
  const lg = { lL: [18, 55, 25, 0], lR: [18, 55, 25, 0] };
  const pp = (sx) => [palm[0] * sx, palm[1], palm[2], 1, 0, 0];
  return [
    { u: 0, P: [0, bar - 1.08, -0.02], rot: [3, 0, 0], sp: [-2, 0, 0], nk: [0, 0], ...lg, hL: [w, bar, 0], hR: [-w, bar, 0], eL: elbow, eR: [-elbow[0], elbow[1], elbow[2]], pL: pp(1), pR: pp(-1) },
    { u: 1, P: [0, bar - 0.60, -0.10], rot: [-4, 0, 0], sp: [-8, 0, 0], nk: [-12, 0], ...lg, hL: [w, bar, 0], hR: [-w, bar, 0], eL: elbow, eR: [-elbow[0], elbow[1], elbow[2]], pL: pp(1), pR: pp(-1) },
  ];
}

Object.assign(EXERCISES, {
  'TS-EMP-006': {
    ...EMP, ...BENCH_FR, name: 'Press de banca con mancuernas', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: benchKeys({ top: 1.10, bot: 0.66, zTop: -0.44, zBot: -0.38, w: 0.24, palm: [0, 1, 0.35, 1, 0, 0] }).map((k, i) => (i ? { ...k, hL: [0.33, 0.66, -0.38], hR: [-0.33, 0.66, -0.38] } : k)) },
      items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco con una mancuerna en cada mano sobre el pecho',
      reps: [
        ['Baja las mancuernas en 2 s hasta los lados del pecho', 'Empuja hasta juntarlas arriba sobre los hombros'],
        ['Escápulas juntas y apoyadas en el banco', 'Codos a 45–60° del cuerpo'],
        ['Antebrazos verticales en todo el recorrido', 'Pies firmes en el suelo'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-EMP-007': {
    ...EMP, ...STAND_FR, primary: ['Deltoides anterior', 'Deltoides medio'], secondary: ['Tríceps', 'Trapecio superior', 'Core'], name: 'Press militar con barra', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE', ARRIBA: 'ARRIBA' }, frame: { dist: 5.0, ty: 1.35, tz: 0.0, distLow: 4.7, tyLow: 1.30 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.27, 2.02, -0.04], hR: [-0.27, 2.02, -0.04], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.6, 1, 1, 0, 0], pR: [0, 0.6, 1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [-8, 0], hL: [0.27, 1.50, 0.13], hR: [-0.27, 1.50, 0.13], eL: [0.4, -1, 0.8], eR: [-0.4, -1, 0.8], pL: [0, 0.8, 0.6, 1, 0, 0], pR: [0, 0.8, 0.6, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, barra apoyada delante de los hombros y agarre al ancho de hombros',
      reps: [
        ['Empuja la barra en línea recta por encima de la cabeza', 'Baja en 2 s hasta la clavícula'],
        ['Glúteos y abdomen firmes: no arquees la espalda', 'Aparta la cabeza al pasar la barra y vuelve a meterla'],
        ['Arriba, la barra queda sobre la mitad del pie', 'Codos algo por delante de la barra abajo'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-EMP-008': {
    ...EMP, ...STAND_FR, primary: ['Deltoides anterior', 'Deltoides medio'], secondary: ['Tríceps', 'Trapecio superior', 'Core'], name: 'Press militar con mancuernas', level: 'Intermedio',
    frame: { dist: 5.0, ty: 1.35, tz: 0.0, distLow: 4.7, tyLow: 1.30 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.17, 2.02, -0.02], hR: [-0.17, 2.02, -0.02], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.30, 1.50, 0.04], hR: [-0.30, 1.50, 0.04], eL: [0.6, -1, 0.3], eR: [-0.6, -1, 0.3], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, una mancuerna en cada mano a la altura de los hombros',
      reps: [
        ['Empuja las mancuernas hacia arriba hasta casi juntarlas', 'Baja en 2 s hasta la altura de las orejas'],
        ['Abdomen firme: la espalda no se arquea', 'Antebrazos verticales'],
        ['Codos ligeramente por delante del cuerpo', 'Exhala al empujar'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-EMP-009': {
    ...EMP, ...SEAT_FR, name: 'Press de pecho en máquina', level: 'Intermedio', phaseNames: { BAJADA: 'REGRESO', SUBIDA: 'EMPUJE', ARRIBA: 'BRAZOS ESTIRADOS' },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0.34, 1.70, -0.22], to: 'hL', ext: 0.04, r: 0.022 }, { from: [-0.34, 1.70, -0.22], to: 'hR', ext: 0.04, r: 0.022 }],
      keys: [
        { u: 0, ...SEAT, nk: [0, 0], hL: [0.21, 1.02, 0.58], hR: [-0.21, 1.02, 0.58], eL: [1, -0.3, -0.2], eR: [-1, -0.3, -0.2], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...SEAT, nk: [0, 0], hL: [0.25, 1.00, 0.14], hR: [-0.25, 1.00, 0.14], eL: [1, -0.6, -0.4], eR: [-1, -0.6, -0.4], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'seatMachine', seatY: 0.47, recline: 8 }] },
    captions: {
      intro: 'Sentado con la espalda apoyada y las asas a la altura del pecho',
      reps: [
        ['Empuja las asas hasta casi estirar los brazos', 'Vuelve en 2 s sin dejar que el peso choque'],
        ['Espalda y cabeza pegadas al respaldo', 'Hombros abajo, lejos de las orejas'],
        ['No bloquees los codos', 'Exhala al empujar'],
      ],
      orbit: ['Vuelve controlando', 'Posición de inicio: músculos que trabajan', 'Empuja las asas'],
    },
  },
  'TS-EMP-010': {
    ...EMP, ...SEAT_FR, primary: ['Deltoides anterior', 'Deltoides medio'], secondary: ['Tríceps', 'Trapecio superior'], name: 'Press de hombro en máquina', level: 'Intermedio',
    frame: { dist: 4.6, ty: 1.20, tz: 0.10, distLow: 4.3, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0.36, 0.80, -0.45], to: 'hL', ext: 0.04, r: 0.022 }, { from: [-0.36, 0.80, -0.45], to: 'hR', ext: 0.04, r: 0.022 }],
      keys: [
        { u: 0, ...SEAT, rot: [-4, 0, 0], nk: [0, 0], hL: [0.22, 1.58, 0.02], hR: [-0.22, 1.58, 0.02], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 1, ...SEAT, rot: [-4, 0, 0], nk: [0, 0], hL: [0.30, 1.08, 0.08], hR: [-0.30, 1.08, 0.08], eL: [0.6, -1, 0.2], eR: [-0.6, -1, 0.2], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] }] },
      items: [{ kind: 'seatMachine', seatY: 0.47, recline: 4 }] },
    captions: {
      intro: 'Sentado con la espalda apoyada y las asas a la altura de los hombros',
      reps: [
        ['Empuja las asas hacia arriba hasta casi estirar los brazos', 'Baja en 2 s hasta la altura de las orejas'],
        ['Espalda pegada al respaldo', 'No encojas los hombros hacia las orejas'],
        ['Codos ligeramente por delante del cuerpo', 'Exhala al empujar'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-EMP-011': {
    ...EMP, primary: ['Pectoral', 'Tríceps'], secondary: ['Deltoides anterior'], name: 'Fondos en paralelas (dips)', level: 'Avanzado',
    frame: { dist: 4.8, ty: 1.20, tz: 0.0, distLow: 4.5, tyLow: 1.10 }, views: { f34: { az: -50, el: 8 }, side: { az: -90, el: 4 }, front: { az: -20, el: 8 }, back34: { az: -150, el: 14 } },
    cfg: { free: { type: 'kfPose', hold: 'grip',
      keys: [
        { u: 0, P: [0, 1.20, -0.02], rot: [4, 0, 0], nk: [4, 0], lL: [12, 80, 25, 0], lR: [12, 80, 25, 0], hL: [0.26, 1.135, 0.0], hR: [-0.26, 1.135, 0.0], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.90, -0.06], rot: [20, 0, 0], nk: [6, 0], lL: [24, 85, 25, 0], lR: [24, 85, 25, 0], hL: [0.26, 1.135, 0.0], hR: [-0.26, 1.135, 0.0], eL: [0.3, 0.2, -1], eR: [-0.3, 0.2, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'dipBars', h: 1.12, w: 0.26 }] },
    captions: {
      intro: 'Brazos estirados sobre las paralelas y rodillas flexionadas',
      reps: [
        ['Baja en 2 s inclinando el tronco hacia delante', 'Empuja hasta estirar los brazos'],
        ['Baja hasta que los hombros queden a la altura de los codos', 'Codos hacia atrás, sin abrirlos'],
        ['Hombros abajo: no los subas hacia las orejas', 'Si molesta el hombro, reduce el rango'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-EMP-012': {
    ...EMP, ...STAND_FR, primary: ['Deltoides anterior', 'Pectoral'], secondary: ['Tríceps', 'Serrato anterior', 'Core'], name: 'Press landmine', level: 'Intermedio',
    frame: { dist: 5.0, ty: 1.25, tz: 0.40, distLow: 4.7, tyLow: 1.20 }, views: { f34: { az: -50, el: 10 }, side: { az: -90, el: 6 }, front: { az: -25, el: 10 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', rods: [{ from: [0, 0.04, 1.75], to: 'hL', ext: 0.16, r: 0.025 }],
      keys: [
        { u: 0, ...STAG, nk: [0, 0], hL: [0.06, 1.78, 0.66], eL: [0.4, -1, 0], pL: [0, -0.6, -1, 1, 0, 0], aR: [10, 15, 80] },
        { u: 1, ...STAG, nk: [0, 0], hL: [0.14, 1.43, 0.18], eL: [0.3, -1, 0.2], pL: [0, 0.2, 1, 0.2, 0.9, -0.4], aR: [10, 15, 80] }] },
      items: [{ kind: 'post', h: 0.06, z: 1.75 }] },
    captions: {
      intro: 'Extremo de la barra a la altura del hombro, de pie con un pie adelantado',
      reps: [
        ['Empuja la barra hacia arriba y adelante hasta estirar el brazo', 'Baja en 2 s hasta el hombro'],
        ['Abdomen firme: el tronco no rota', 'El hombro se desliza hacia delante al final'],
        ['Buena opción si el press vertical molesta', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba y adelante'],
    },
  },
  'TS-EMP-013': {
    ...EMP, ...STAND_FR, name: 'Press con banda elástica de pie', level: 'Intermedio', phaseNames: { BAJADA: 'REGRESO', SUBIDA: 'EMPUJE', ARRIBA: 'BRAZOS ESTIRADOS' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.15, 1.30, -0.75], hand: 'L' }, { anchor: [-0.15, 1.30, -0.75], hand: 'R' }],
      keys: [
        { u: 0, ...STAG, nk: [0, 0], hL: [0.12, 1.32, 0.62], hR: [-0.12, 1.32, 0.62], eL: [1, -0.4, -0.3], eR: [-1, -0.4, -0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...STAG, nk: [0, 0], hL: [0.24, 1.30, 0.13], hR: [-0.24, 1.30, 0.13], eL: [1, -0.6, -0.5], eR: [-1, -0.6, -0.5], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'post', h: 1.36, z: -0.78 }] },
    captions: {
      intro: 'Banda anclada detrás a la altura del pecho, un pie adelantado',
      reps: [
        ['Empuja hacia delante hasta casi estirar los brazos', 'Vuelve en 2 s controlando la banda'],
        ['Abdomen firme: el tronco no se mueve', 'Hombros abajo y atrás'],
        ['La tensión crece al estirar los brazos', 'Exhala al empujar'],
      ],
      orbit: ['Vuelve controlando', 'Posición de inicio: músculos que trabajan', 'Empuja adelante'],
    },
  },
  'TS-TRA-001': {
    ...PULL, ...HANG_FR, name: 'Dominadas pronas (pull-up)', level: 'Avanzado',
    cfg: { free: { type: 'kfPose', hold: 'grip', keys: hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] }) }, items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra con agarre prono algo más ancho que los hombros',
      reps: [
        ['Tira de los codos hacia abajo hasta pasar la barbilla por encima de la barra', 'Baja en 2 s hasta estirar los brazos'],
        ['Empieza llevando las escápulas hacia abajo', 'Sin balanceos ni impulso de piernas'],
        ['Pecho hacia la barra', 'Recorrido completo en cada repetición'],
      ],
      orbit: ['Barbilla sobre la barra', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRA-002': {
    ...PULL, ...HANG_FR, secondary: ['Bíceps', 'Romboides', 'Trapecio medio'], name: 'Dominadas supinas (chin-up)', level: 'Avanzado',
    cfg: { free: { type: 'kfPose', hold: 'grip', keys: hangKeys({ w: 0.20, palm: [0, 0, -1], elbow: [0.4, -0.5, 0.8] }) }, items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra con las palmas hacia ti, al ancho de hombros',
      reps: [
        ['Tira hasta pasar la barbilla por encima de la barra', 'Baja en 2 s hasta estirar los brazos'],
        ['Codos hacia abajo y hacia delante', 'Más trabajo de bíceps que la dominada prona'],
        ['Sin balanceos', 'Recorrido completo en cada repetición'],
      ],
      orbit: ['Barbilla sobre la barra', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
});
