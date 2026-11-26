// Lote 25: TS-HOR-010 … 013 y verticales TS-VER-001 … 006
import { EXERCISES } from './exercises.js';
import { PULL, HANG_FR, hangKeys, STAND_FR } from './ex_lote22.js';
import { EMP, benchKeys, BENCH_FR, PUSH_FR } from './ex_lote21.js';
import { plankKey } from './ts_common.js';

const CABLE = 0xb9bec4;
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const SIDEFR = { frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 } };
const ROW = { phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA' };
const HOR = { sub: 'Horizontal' }, VER = { sub: 'Vertical' };
const OHP = { primary: ['Deltoides anterior', 'Deltoides medio'], secondary: ['Tríceps', 'Trapecio superior', 'Core'] };
const ring = (sx, y, z) => [sx * 0.25, y, z];

function pulldown(w, grip) {
  const pp = grip === 'neutral' ? [[-1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1]] : grip === 'sup' ? [[0, 0, -1, 1, 0, 0], [0, 0, -1, -1, 0, 0]] : [[0, 0, 1, 1, 0, 0], [0, 0, 1, -1, 0, 0]];
  const eTop = grip === 'pron' ? [1, -0.1, 0] : [0.5, -0.3, 0.6], eBot = grip === 'pron' ? [1, -1, -0.3] : [0.3, -1, -0.2];
  return [
    { u: 0, ...SEATBOX, rot: [-4, 0, 0], nk: [0, 0], hL: [w, 1.58, 0.06], hR: [-w, 1.58, 0.06], eL: eTop, eR: [-eTop[0], eTop[1], eTop[2]], pL: pp[0], pR: pp[1] },
    { u: 1, ...SEATBOX, rot: [-14, 0, 0], nk: [-6, 0], hL: [w, 1.08, 0.14], hR: [-w, 1.08, 0.14], eL: eBot, eR: [-eBot[0], eBot[1], eBot[2]], pL: pp[0], pR: pp[1] },
  ];
}
const PD_ITEMS = [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }];
const PD_FR = { frame: { dist: 4.8, ty: 1.30, tz: 0.05, distLow: 4.5, tyLow: 1.25 } };

Object.assign(EXERCISES, {
  'TS-HOR-010': {
    ...EMP, ...HOR, ...PUSH_FR, secondary: ['Tríceps', 'Deltoides anterior', 'Core'], name: 'Flexión de brazos con apoyo en anillas', level: 'Avanzado',
    frame: { dist: 4.8, ty: 0.70, tz: 0.15, distLow: 4.4, tyLow: 0.60 },
    cfg: { free: { type: 'kfPose', hold: 'grip', trx: true, handles: ['L', 'R'], bands: [{ anchor: [0.27, 2.60, 0.56], hand: 'L' }, { anchor: [-0.27, 2.60, 0.56], hand: 'R' }],
      keys: [
        { u: 0, ...plankKey(30), hL: ring(1, 0.22, 0.56), hR: ring(-1, 0.22, 0.56), eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, ...plankKey(13), hL: ring(1, 0.22, 0.56), hR: ring(-1, 0.22, 0.56), eL: [0.4, 0.2, -1], eR: [-0.4, 0.2, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'trxAnchor', y: 2.60, z: 0.56 }] },
    captions: {
      intro: 'Manos en las anillas cerca del suelo, cuerpo recto',
      reps: [
        ['Baja en 2 s manteniendo las anillas cerca del cuerpo', 'Empuja hasta estirar los brazos'],
        ['Las anillas se mueven: controla que no se abran', 'Abdomen y glúteos firmes'],
        ['Arriba, gira un poco las palmas hacia delante', 'Muy exigente para la estabilidad del hombro'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja estable'],
    },
  },
  'TS-HOR-011': {
    ...PULL, ...ROW, ...HOR, ...SIDEFR, name: 'Remo horizontal en máquina Hammer', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0.24, 0.30, 0.80], to: 'hL', ext: 0.03, r: 0.024 }, { from: [-0.24, 0.30, 0.80], to: 'hR', ext: 0.03, r: 0.024 }],
      keys: [
        { u: 0, ...SEATBOX, rot: [14, 0, 0], nk: [-4, 0], hL: [0.20, 0.90, 0.60], hR: [-0.20, 0.90, 0.60], eL: [0.6, -0.5, -0.2], eR: [-0.6, -0.5, -0.2], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...SEATBOX, rot: [10, 0, 0], nk: [-4, 0], hL: [0.22, 0.95, 0.12], hR: [-0.22, 0.95, 0.12], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }, { kind: 'post', h: 1.12, z: 0.36 }] },
    captions: {
      intro: 'Pecho apoyado en el soporte y asas al frente',
      reps: [
        ['Tira de las asas llevando los codos atrás', 'Vuelve en 2 s hasta estirar los brazos'],
        ['Cada brazo trabaja con su propia palanca', 'Junta las escápulas al final'],
        ['Pecho pegado al apoyo', 'Hombros abajo'],
      ],
      orbit: ['Codos atrás', 'Contracción máxima: músculos que trabajan', 'Estira controlando'],
    },
  },
  'TS-HOR-012': {
    ...EMP, ...HOR, ...BENCH_FR, name: 'Press horizontal en máquina Smith', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: benchKeys({ zTop: -0.38, zBot: -0.36 }) }, items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }, { kind: 'smithMachine', z: -0.37 }] },
    captions: {
      intro: 'Tumbado en el banco dentro de la máquina Smith, barra sobre el pecho',
      reps: [
        ['Baja la barra guiada en 2 s hasta el pecho', 'Empuja hasta estirar los brazos'],
        ['La guía fija el recorrido: coloca el banco para que la barra caiga sobre el pecho', 'Escápulas juntas'],
        ['Codos a 45–60° del cuerpo', 'Usa los seguros de la máquina'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-HOR-013': {
    ...PULL, ...ROW, ...HOR, ...SIDEFR, secondary: ['Bíceps', 'Romboides', 'Trapecio medio', 'Erectores espinales'], name: 'Remo con barra en T (T-bar row)', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handles: ['L'], rods: [{ from: [0, 0.04, -1.30], to: 'bar', ext: 0.30, r: 0.025 }],
      keys: [
        { u: 0, P: [0, -0.08, -0.14], rot: [46, 0, 0], sp: [-4, 0, 0], nk: [-22, 0], L: [0.16, 0.08, 0, 0, 10], R: [-0.16, 0.08, 0, 0, -10], hL: [0.05, 0.58, 0.30], hR: [-0.05, 0.58, 0.30], eL: [0.6, 0, -1], eR: [-0.6, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, P: [0, -0.08, -0.14], rot: [44, 0, 0], sp: [-6, 0, 0], nk: [-22, 0], L: [0.16, 0.08, 0, 0, 10], R: [-0.16, 0.08, 0, 0, -10], hL: [0.05, 0.90, 0.20], hR: [-0.05, 0.90, 0.20], eL: [0.5, 0.3, -1], eR: [-0.5, 0.3, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'post', h: 0.06, z: -1.30 }] },
    captions: {
      intro: 'De pie sobre la barra anclada, tronco inclinado y agarre en V',
      reps: [
        ['Tira del agarre hacia el pecho llevando los codos atrás', 'Baja en 2 s hasta estirar los brazos'],
        ['Espalda neutra y rodillas flexionadas', 'El tronco no sube al tirar'],
        ['Junta las escápulas arriba', 'Abdomen firme'],
      ],
      orbit: ['Agarre al pecho', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-VER-001': {
    ...EMP, ...VER, ...OHP, ...STAND_FR, name: 'Press militar de pie con barra', level: 'Principiante', frame: { dist: 5.0, ty: 1.35, tz: 0.0, distLow: 4.7, tyLow: 1.30 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.27, 2.02, -0.04], hR: [-0.27, 2.02, -0.04], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.6, 1, 1, 0, 0], pR: [0, 0.6, 1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [-8, 0], hL: [0.27, 1.50, 0.13], hR: [-0.27, 1.50, 0.13], eL: [0.4, -1, 0.8], eR: [-0.4, -1, 0.8], pL: [0, 0.8, 0.6, 1, 0, 0], pR: [0, 0.8, 0.6, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, barra apoyada delante de los hombros',
      reps: [
        ['Empuja la barra en línea recta por encima de la cabeza', 'Baja en 2 s hasta la clavícula'],
        ['Glúteos y abdomen firmes: la espalda no se arquea', 'Aparta la cabeza al pasar la barra'],
        ['Bloquea arriba con la barra sobre la mitad del pie', 'Exhala al empujar'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-VER-002': {
    ...EMP, ...VER, ...OHP, name: 'Press Arnold con mancuernas', level: 'Intermedio',
    frame: { dist: 4.8, ty: 1.25, tz: 0.05, distLow: 4.5, tyLow: 1.20 }, views: { f34: { az: -35, el: 10 }, side: { az: -80, el: 6 }, front: { az: -10, el: 10 } },
    cfg: { free: { type: 'kfPose', hold: 'db',
      keys: [
        { u: 0, ...SEATBOX, rot: [-2, 0, 0], nk: [0, 0], hL: [0.17, 1.58, 0.00], hR: [-0.17, 1.58, 0.00], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 0.55, ...SEATBOX, rot: [-2, 0, 0], nk: [0, 0], hL: [0.27, 1.20, 0.10], hR: [-0.27, 1.20, 0.10], eL: [1, -1, 0.3], eR: [-1, -1, 0.3], pL: [-1, 0.2, 0.3, 0, 0, 1], pR: [1, 0.2, 0.3, 0, 0, 1] },
        { u: 1, ...SEATBOX, rot: [-2, 0, 0], nk: [0, 0], hL: [0.13, 1.08, 0.18], hR: [-0.13, 1.08, 0.18], eL: [0.2, -1, 1], eR: [-0.2, -1, 1], pL: [0, 0.2, -1, 1, 0, 0], pR: [0, 0.2, -1, -1, 0, 0] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, mancuernas delante de los hombros con las palmas hacia ti',
      reps: [
        ['Empuja hacia arriba girando las palmas hacia delante', 'Baja en 2 s deshaciendo el giro'],
        ['Los codos se abren a medida que subes', 'Espalda recta y abdomen firme'],
        ['Movimiento fluido, sin tirones', 'Exhala al empujar'],
      ],
      orbit: ['Baja girando', 'Posición baja: músculos que trabajan', 'Empuja y gira'],
    },
  },
  'TS-VER-003': {
    ...EMP, ...VER, ...OHP, ...SIDEFR, name: 'Press de hombro sentado en máquina', level: 'Intermedio', frame: { dist: 4.6, ty: 1.20, tz: 0.10, distLow: 4.3, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0.36, 0.80, -0.45], to: 'hL', ext: 0.04, r: 0.022 }, { from: [-0.36, 0.80, -0.45], to: 'hR', ext: 0.04, r: 0.022 }],
      keys: [
        { u: 0, ...SEATBOX, rot: [-4, 0, 0], nk: [0, 0], hL: [0.22, 1.58, 0.02], hR: [-0.22, 1.58, 0.02], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 1, ...SEATBOX, rot: [-4, 0, 0], nk: [0, 0], hL: [0.30, 1.08, 0.08], hR: [-0.30, 1.08, 0.08], eL: [0.6, -1, 0.2], eR: [-0.6, -1, 0.2], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] }] },
      items: [{ kind: 'seatMachine', seatY: 0.47, recline: 4 }] },
    captions: {
      intro: 'Sentado con la espalda apoyada y las asas a la altura de los hombros',
      reps: [
        ['Empuja hacia arriba hasta casi estirar los brazos', 'Baja en 2 s hasta las orejas'],
        ['Espalda pegada al respaldo', 'No encojas los hombros'],
        ['Codos algo por delante del cuerpo', 'Exhala al empujar'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-VER-004': {
    ...PULL, ...VER, ...SIDEFR, ...PD_FR, name: 'Jalón al pecho agarre ancho', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.66, plates: 0 }, rods: [{ from: [0, 2.35, 0.06], to: 'bar', r: 0.006, color: CABLE }], keys: pulldown(0.44, 'pron') }, items: PD_ITEMS },
    captions: {
      intro: 'Sentado con los muslos fijos y agarre ancho en la barra',
      reps: [
        ['Tira de la barra hasta la parte alta del pecho', 'Sube en 2 s hasta estirar los brazos'],
        ['Codos hacia abajo y hacia fuera', 'Inclina un poco el tronco atrás'],
        ['Hombros lejos de las orejas', 'Sin balanceos'],
      ],
      orbit: ['Barra al pecho', 'Contracción máxima: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-VER-005': {
    ...PULL, ...VER, ...SIDEFR, ...PD_FR, name: 'Jalón al pecho agarre estrecho', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0, 2.35, 0.06], to: 'bar', r: 0.006, color: CABLE }], keys: pulldown(0.06, 'neutral') }, items: PD_ITEMS },
    captions: {
      intro: 'Sentado con los muslos fijos y agarre en V, palmas enfrentadas',
      reps: [
        ['Tira del agarre hasta el pecho', 'Sube en 2 s hasta estirar los brazos'],
        ['Codos pegados al cuerpo y hacia abajo', 'Saca el pecho al final del tirón'],
        ['Hombros abajo', 'Sin balanceos'],
      ],
      orbit: ['Agarre al pecho', 'Contracción máxima: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-VER-006': {
    ...PULL, ...VER, ...HANG_FR, name: 'Dominadas lastradas', level: 'Avanzado',
    cfg: { free: { type: 'kfPose', hold: 'grip', beltKb: true, cable: true, bands: [{ anchor: 'beltL', to: 'kbTop' }, { anchor: 'beltR', to: 'kbTop' }],
      keys: hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] }) }, items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Cinturón con lastre y colgado de la barra con agarre prono',
      reps: [
        ['Tira hasta pasar la barbilla por encima de la barra', 'Baja en 2 s hasta estirar los brazos'],
        ['El lastre cuelga quieto: sin balanceos', 'Escápulas abajo al empezar'],
        ['Domina antes 10 dominadas limpias sin lastre', 'Progresa con poco peso'],
      ],
      orbit: ['Barbilla sobre la barra', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
});
