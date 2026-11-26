// Lote 26: verticales TS-VER-007 … 013 y pectoral TS-PEC-001 … 003
import { EXERCISES } from './exercises.js';
import { PULL, HANG_FR, hangKeys, STAND_FR } from './ex_lote22.js';
import { EMP, BENCH_FR } from './ex_lote21.js';

const CABLE = 0xb9bec4;
const D = Math.PI / 180;
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const STAG = { P: [0, -0.03, -0.02], rot: [4, 0, 0], L: [0.12, 0.08, 0.22, 0, 6], R: [-0.13, 0.08, -0.30, 10, -6] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const VER = { sub: 'Vertical' }, PEC = { sub: 'Pectoral' };
const OHP = { primary: ['Deltoides anterior', 'Deltoides medio'], secondary: ['Tríceps', 'Trapecio superior', 'Core'] };
const SIDEFR = { frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 } };
const OH_FR = { frame: { dist: 5.0, ty: 1.35, tz: 0.0, distLow: 4.7, tyLow: 1.30 } };
const FLY = { primary: ['Pectoral'], secondary: ['Deltoides anterior'], phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'CIERRE', ARRIBA: 'BRAZOS ARRIBA' }, holdLabel: 'ESTIRAMIENTO' };
const add = (a, b, k = 1) => a.map((v, i) => v + b[i] * k);

// aperturas tumbado (plano o inclinado)
function flyKeys(ang) {
  const th = -(90 - ang) * D, up = [0, Math.cos(th), Math.sin(th)], fr = [0, -Math.sin(th), Math.cos(th)];
  const P = ang > 0 ? [0, 0.565, 0.02] : [0, 0.53, -0.02];
  const sh = add(add(P, up, 0.48), fr, -0.03);
  const legs = ang > 0 ? { L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1] }
    : { L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1] };
  const base = { P, rot: [-(90 - ang), 0, 0], sp: [-6, 0, 0], nk: [-12, 0], ...legs };
  const top = add(sh, fr, 0.58), lowY = sh[1] - 0.02;
  return [
    { ...base, u: 0, hL: [0.10, top[1], top[2]], hR: [-0.10, top[1], top[2]], eL: [1, -0.3, 0], eR: [-1, -0.3, 0], pL: [-1, 0, 0, ...up], pR: [1, 0, 0, ...up] },
    { ...base, u: 1, hL: [0.66, lowY, sh[2] + 0.04], hR: [-0.66, lowY, sh[2] + 0.04], eL: [0.2, -1, 0], eR: [-0.2, -1, 0], pL: [-0.2, 1, 0, ...up], pR: [0.2, 1, 0, ...up] },
  ];
}

Object.assign(EXERCISES, {
  'TS-VER-007': {
    ...EMP, ...VER, ...OHP, ...STAND_FR, ...OH_FR, name: 'Press vertical en polea baja a una mano', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L'], bands: [{ anchor: [0.32, 0.15, 0.10], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.16, 2.00, 0.00], eL: [1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], aR: [8, 12, 80] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.28, 1.50, 0.06], eL: [0.6, -1, 0.3], pL: [0, 0.3, 1, 1, 0, 0], aR: [8, 12, 80] }] },
      items: [{ kind: 'post', h: 0.22, x: 0.34, z: 0.10 }] },
    captions: {
      intro: 'De pie junto a la polea baja, asa a la altura del hombro',
      reps: [
        ['Empuja el asa hacia arriba hasta estirar el brazo', 'Baja en 2 s hasta el hombro'],
        ['El tronco no se inclina hacia el lado de la carga', 'Abdomen firme'],
        ['Codo algo por delante del cuerpo', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-VER-008': {
    ...EMP, ...VER, ...STAND_FR, ...OH_FR, primary: ['Deltoides anterior'], secondary: ['Trapecio superior', 'Serrato anterior'], name: 'Elevación de brazo en polea vertical', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'ELEVACIÓN', ARRIBA: 'BRAZO ARRIBA' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L'], bands: [{ anchor: [0.16, 0.15, -0.45], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [170, 6, 6], pL: [-1, 0, 0, 0, 1, 0], aR: [8, 12, 80] },
        { u: 1, ...STAND, nk: [0, 0], aL: [8, 6, 6], pL: [-1, 0, 0, 0, -1, 0], aR: [8, 12, 80] }] },
      items: [{ kind: 'post', h: 0.22, x: 0.16, z: -0.48 }] },
    captions: {
      intro: 'De espaldas a la polea baja, asa en la mano y brazo estirado',
      reps: [
        ['Eleva el brazo estirado por delante hasta arriba', 'Baja en 2 s controlando el cable'],
        ['Codo casi recto durante todo el recorrido', 'El tronco no se arquea al subir'],
        ['Peso ligero y movimiento continuo', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Brazo abajo: músculos que trabajan', 'Eleva el brazo'],
    },
  },
  'TS-VER-009': {
    ...EMP, ...VER, ...OHP, ...STAND_FR, ...OH_FR, name: 'Press de hombro con kettlebell', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handKb: 'L',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.15, 2.00, -0.02], eL: [1, -0.2, 0], pL: [0, 0.2, 1, 1, 0, 0.3], aR: [8, 14, 80] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.12, 1.42, 0.14], eL: [0.2, -1, 0.3], pL: [-0.7, 0.2, 0.7, 0.7, 0, 0.7], aR: [8, 14, 80] }] } },
    captions: {
      intro: 'Kettlebell en posición de rack: apoyada sobre el antebrazo, junto al pecho',
      reps: [
        ['Empuja la kettlebell hacia arriba girando la palma hacia delante', 'Baja en 2 s de vuelta al rack'],
        ['Muñeca recta: la kettlebell descansa sobre el antebrazo', 'Glúteos y abdomen firmes'],
        ['Brazo estirado junto a la oreja arriba', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Baja al rack', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-VER-010': {
    ...EMP, ...VER, ...OHP, name: 'Press vertical en TRX (pike push-up)', level: 'Intermedio',
    frame: { dist: 4.8, ty: 0.85, tz: -0.10, distLow: 4.5, tyLow: 0.80 }, views: { f34: { az: -55, el: 10 }, side: { az: -90, el: 4 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 14 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', trx: true, bands: [{ anchor: [0.05, 2.50, -0.85], to: 'aL' }, { anchor: [-0.05, 2.50, -0.85], to: 'aR' }],
      keys: [
        { u: 0, P: [0, 1.00, -0.06], rot: [131, 0, 0], nk: [-10, 0], L: [0.10, 0.60, -0.84, 60, 6], R: [-0.10, 0.60, -0.84, 60, -6], kL: [0, -0.3, 1], kR: [0, -0.3, 1],
          hL: [0.22, 0.035, 0.44], hR: [-0.22, 0.035, 0.44], eL: [0.5, 0, 1], eR: [-0.5, 0, 1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.95, -0.02], rot: [150, 0, 0], nk: [-14, 0], L: [0.10, 0.60, -0.84, 60, 6], R: [-0.10, 0.60, -0.84, 60, -6], kL: [0, -0.3, 1], kR: [0, -0.3, 1],
          hL: [0.22, 0.035, 0.44], hR: [-0.22, 0.035, 0.44], eL: [0.7, 0, 0.3], eR: [-0.7, 0, 0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'trxAnchor', y: 2.50, z: -0.85 }] },
    captions: {
      intro: 'Pies en las cinchas, manos en el suelo y cadera alta en forma de V invertida',
      reps: [
        ['Flexiona los codos llevando la cabeza hacia el suelo', 'Empuja hasta estirar los brazos'],
        ['La cadera queda arriba durante todo el movimiento', 'La cabeza baja por delante de las manos'],
        ['Abdomen firme para no balancearte', 'Progresión hacia el pino'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-VER-011': {
    ...PULL, ...VER, ...HANG_FR, name: 'Dominadas negativas (excéntricas)', level: 'Avanzado', tempo: { down: 1, pause: 1, up: 4 },
    phaseNames: { BAJADA: 'SUBE ARRIBA', PAUSA: 'MANTÉN ARRIBA', SUBIDA: 'BAJADA LENTA', ARRIBA: 'COLGADO' }, holdLabel: 'ARRIBA',
    cfg: { free: { type: 'kfPose', hold: 'grip', keys: hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] }) }, items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra; sube con ayuda de un cajón o de un salto',
      reps: [
        ['Colócate arriba con la barbilla sobre la barra', 'Baja muy lento, en 4–5 s'],
        ['Controla todo el recorrido hasta estirar los brazos', 'Escápulas activas abajo'],
        ['Ideal para progresar hacia la dominada completa', 'Pocas repeticiones de calidad'],
      ],
      orbit: ['Arriba', 'Contracción máxima: músculos que trabajan', 'Baja muy lento'],
    },
  },
  'TS-VER-012': {
    ...EMP, ...VER, ...OHP, ...STAND_FR, ...OH_FR, name: 'Press vertical con banda de pie', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'aL', hand: 'L' }, { anchor: 'aR', hand: 'R' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.17, 2.00, -0.02], hR: [-0.17, 2.00, -0.02], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.28, 1.50, 0.06], hR: [-0.28, 1.50, 0.06], eL: [0.6, -1, 0.3], eR: [-0.6, -1, 0.3], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie sobre la banda, extremos a la altura de los hombros',
      reps: [
        ['Empuja hacia arriba hasta estirar los brazos', 'Baja en 2 s hasta los hombros'],
        ['La tensión crece al subir: termina con control', 'Abdomen firme, sin arquear la espalda'],
        ['Codos algo por delante del cuerpo', 'Ajusta la tensión pisando más banda'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-VER-013': {
    ...PULL, ...VER, ...SIDEFR, name: 'Jalón al pecho con agarre supino', level: 'Intermedio', frame: { dist: 4.8, ty: 1.30, tz: 0.05, distLow: 4.5, tyLow: 1.25 },
    cfg: { free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.62, plates: 0 }, rods: [{ from: [0, 2.35, 0.06], to: 'bar', r: 0.006, color: CABLE }],
      keys: [
        { u: 0, ...SEATBOX, nk: [0, 0], hL: [0.20, 1.58, 0.06], hR: [-0.20, 1.58, 0.06], eL: [0.5, -0.3, 0.6], eR: [-0.5, -0.3, 0.6], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0] },
        { u: 1, ...SEATBOX, rot: [-14, 0, 0], nk: [-6, 0], hL: [0.20, 1.08, 0.14], hR: [-0.20, 1.08, 0.14], eL: [0.3, -1, -0.2], eR: [-0.3, -1, -0.2], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, barra agarrada con las palmas hacia ti al ancho de hombros',
      reps: [
        ['Tira de la barra hasta el pecho', 'Sube en 2 s hasta estirar los brazos'],
        ['Codos hacia abajo y pegados al cuerpo', 'Más trabajo de bíceps que con agarre prono'],
        ['Hombros abajo', 'Sin balanceos'],
      ],
      orbit: ['Barra al pecho', 'Contracción máxima: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-PEC-001': {
    ...EMP, ...PEC, ...FLY, ...BENCH_FR, name: 'Aperturas con mancuernas en banco plano', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: flyKeys(0) }, items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, mancuernas sobre el pecho con las palmas enfrentadas',
      reps: [
        ['Abre los brazos en arco hasta notar el estiramiento del pecho', 'Ciérralos por el mismo arco hasta arriba'],
        ['Codos ligeramente flexionados y fijos', 'No bajes más allá de la línea de los hombros'],
        ['Escápulas juntas y apoyadas', 'Peso moderado'],
      ],
      orbit: ['Abre controlando', 'Estiramiento: músculos que trabajan', 'Cierra en arco'],
    },
  },
  'TS-PEC-002': {
    ...EMP, ...PEC, ...FLY, frame: { dist: 4.4, ty: 0.85, tz: -0.10, distLow: 4.1, tyLow: 0.80 }, views: { f34: { az: -60, el: 18 }, side: { az: -90, el: 8 }, front: { az: -25, el: 22 }, back34: { az: -150, el: 22 } }, orbit: { view: 'side', sweep: 150 },
    primary: ['Pectoral', 'Deltoides anterior'], name: 'Aperturas con mancuernas en banco inclinado', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: flyKeys(30) }, items: [{ kind: 'inclineBench', angle: 30 }] },
    captions: {
      intro: 'Banco inclinado a unos 30°, mancuernas sobre el pecho',
      reps: [
        ['Abre los brazos en arco hasta notar el estiramiento', 'Ciérralos por el mismo arco hasta arriba'],
        ['Codos ligeramente flexionados y fijos', 'Más trabajo de la parte superior del pecho'],
        ['Escápulas juntas', 'Peso moderado'],
      ],
      orbit: ['Abre controlando', 'Estiramiento: músculos que trabajan', 'Cierra en arco'],
    },
  },
  'TS-PEC-003': {
    ...EMP, ...PEC, ...FLY, ...STAND_FR, name: 'Cruce de poleas (cable crossover)', level: 'Principiante', frame: { dist: 5.2, ty: 1.30, tz: 0.0, distLow: 4.9, tyLow: 1.25 },
    phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'CRUCE', ARRIBA: 'MANOS JUNTAS' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L', 'R'], bands: [{ anchor: [0.78, 2.05, -0.20], hand: 'L' }, { anchor: [-0.78, 2.05, -0.20], hand: 'R' }],
      keys: [
        { u: 0, ...STAG, rot: [16, 0, 0], nk: [-6, 0], hL: [0.06, 1.05, 0.42], hR: [-0.06, 1.05, 0.42], eL: [1, 0.2, -0.3], eR: [-1, 0.2, -0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...STAG, rot: [16, 0, 0], nk: [-6, 0], hL: [0.66, 1.52, 0.02], hR: [-0.66, 1.52, 0.02], eL: [0.3, -1, -0.2], eR: [-0.3, -1, -0.2], pL: [-0.6, -0.4, 0.6, 0, 1, 0], pR: [0.6, -0.4, 0.6, 0, 1, 0] }] },
      items: [{ kind: 'post', h: 2.12, x: 0.80, z: -0.22 }, { kind: 'post', h: 2.12, x: -0.80, z: -0.22 }] },
    captions: {
      intro: 'De pie entre las poleas altas, tronco algo inclinado y un pie adelantado',
      reps: [
        ['Junta las manos delante y abajo en un arco amplio', 'Vuelve en 2 s abriendo los brazos'],
        ['Codos ligeramente flexionados y fijos', 'Aprieta el pecho 1 s con las manos juntas'],
        ['El tronco no se mueve', 'Peso moderado y recorrido completo'],
      ],
      orbit: ['Abre controlando', 'Apertura: músculos que trabajan', 'Cruza las manos'],
    },
  },
});
