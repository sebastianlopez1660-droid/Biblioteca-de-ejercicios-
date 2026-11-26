// Lote 27: pectoral TS-PEC-004 … 013
import { EXERCISES } from './exercises.js';
import { STAND_FR } from './ex_lote22.js';
import { EMP, BENCH_FR, PUSH_FR, benchKeys } from './ex_lote21.js';
import { plankKey, handsFloor } from './ts_common.js';

const D = Math.PI / 180;
const STAG = { P: [0, -0.03, -0.02], rot: [4, 0, 0], L: [0.12, 0.08, 0.22, 0, 6], R: [-0.13, 0.08, -0.30, 10, -6] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const PEC = { sub: 'Pectoral' };
const FLY = { primary: ['Pectoral'], secondary: ['Deltoides anterior'], phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'CIERRE', ARRIBA: 'BRAZOS JUNTOS' }, holdLabel: 'ESTIRAMIENTO' };
const add = (a, b, k = 1) => a.map((v, i) => v + b[i] * k);
const pk = (th, u, o = {}) => ({ u, ...plankKey(th, o), ...handsFloor(o.thTop ?? th, o) });
const CABLE_FLY = (anchorY, anchorZ, handY, inZ, w0 = 0.64) => ({
  bands: [{ anchor: [0.78, anchorY, anchorZ], hand: 'L' }, { anchor: [-0.78, anchorY, anchorZ], hand: 'R' }],
  keys: [
    { u: 0, ...STAG, rot: [8, 0, 0], nk: [-2, 0], hL: [0.06, handY, inZ], hR: [-0.06, handY, inZ], eL: [1, -0.2, -0.3], eR: [-1, -0.2, -0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
    { u: 1, ...STAG, rot: [8, 0, 0], nk: [-2, 0], hL: [w0, handY + 0.04, 0.02], hR: [-w0, handY + 0.04, 0.02], eL: [0.3, -1, -0.2], eR: [-0.3, -1, -0.2], pL: [-0.6, 0, 0.7, 0, 1, 0], pR: [0.6, 0, 0.7, 0, 1, 0] }],
});
function flyDecline() {
  const ang = -15, th = -(90 - ang) * D, up = [0, Math.cos(th), Math.sin(th)], fr = [0, -Math.sin(th), Math.cos(th)];
  const P = [0, 0.62, 0.0], sh = add(add(P, up, 0.48), fr, -0.03), top = add(sh, fr, 0.58);
  const base = { P, rot: [-(90 - ang), 0, 0], sp: [-6, 0, 0], nk: [-12, 0], lL: [38, 98, 0, 0], lR: [38, 98, 0, 0] };
  return [
    { ...base, u: 0, hL: [0.10, top[1], top[2]], hR: [-0.10, top[1], top[2]], eL: [1, -0.3, 0], eR: [-1, -0.3, 0], pL: [-1, 0, 0, ...up], pR: [1, 0, 0, ...up] },
    { ...base, u: 1, hL: [0.66, sh[1] - 0.02, sh[2] + 0.04], hR: [-0.66, sh[1] - 0.02, sh[2] + 0.04], eL: [0.2, -1, 0], eR: [-0.2, -1, 0], pL: [-0.2, 1, 0, ...up], pR: [0.2, 1, 0, ...up] },
  ];
}
const DBB = (palm) => benchKeys({ top: 1.10, bot: 0.66, zTop: -0.44, zBot: -0.38, w: 0.20 }).map((k, i) => ({ ...k, ...(i ? { hL: [0.30, 0.66, -0.38], hR: [-0.30, 0.66, -0.38] } : {}), ...(palm ? { pL: palm[0], pR: palm[1] } : {}) }));

Object.assign(EXERCISES, {
  'TS-PEC-004': {
    ...EMP, ...PEC, ...FLY, name: 'Pec deck (máquina de aperturas)', level: 'Principiante',
    frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -35, el: 14 }, side: { az: -80, el: 8 }, front: { az: -10, el: 14 }, back34: { az: -150, el: 18 } },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0.22, 1.62, -0.10], to: 'hL', ext: 0.05, r: 0.022 }, { from: [-0.22, 1.62, -0.10], to: 'hR', ext: 0.05, r: 0.022 }],
      keys: [
        { u: 0, ...SEATBOX, nk: [0, 0], hL: [0.07, 1.00, 0.42], hR: [-0.07, 1.00, 0.42], eL: [1, -0.3, -0.2], eR: [-1, -0.3, -0.2], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...SEATBOX, nk: [0, 0], hL: [0.60, 1.02, 0.04], hR: [-0.60, 1.02, 0.04], eL: [0.3, -1, -0.2], eR: [-0.3, -1, -0.2], pL: [-0.7, 0, 0.7, 0, 1, 0], pR: [0.7, 0, 0.7, 0, 1, 0] }] },
      items: [{ kind: 'seatMachine', seatY: 0.47, recline: 4 }] },
    captions: {
      intro: 'Sentado con la espalda apoyada y los brazos abiertos en las asas',
      reps: [
        ['Junta las asas delante del pecho en un arco', 'Vuelve en 2 s hasta notar el estiramiento'],
        ['Codos ligeramente flexionados y a la altura del pecho', 'Espalda pegada al respaldo'],
        ['Aprieta 1 s con las manos juntas', 'Sin que el peso choque atrás'],
      ],
      orbit: ['Abre controlando', 'Apertura: músculos que trabajan', 'Junta las asas'],
    },
  },
  'TS-PEC-005': {
    ...EMP, ...PEC, ...FLY, ...STAND_FR, name: 'Aperturas con banda elástica', level: 'Principiante', frame: { dist: 5.0, ty: 1.25, tz: 0.10, distLow: 4.7, tyLow: 1.20 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', ...CABLE_FLY(1.30, -0.75, 1.28, 0.55), bands: [{ anchor: [0.18, 1.30, -0.75], hand: 'L' }, { anchor: [-0.18, 1.30, -0.75], hand: 'R' }] },
      items: [{ kind: 'post', h: 1.36, z: -0.78 }] },
    captions: {
      intro: 'Banda anclada detrás a la altura del pecho, brazos abiertos',
      reps: [
        ['Junta las manos delante del pecho en un arco amplio', 'Vuelve en 2 s abriendo los brazos'],
        ['Codos ligeramente flexionados y fijos', 'Tronco quieto'],
        ['Aprieta el pecho 1 s con las manos juntas', 'Ajusta la tensión alejándote del anclaje'],
      ],
      orbit: ['Abre controlando', 'Apertura: músculos que trabajan', 'Junta las manos'],
    },
  },
  'TS-PEC-006': {
    ...EMP, ...PEC, ...STAND_FR, secondary: ['Tríceps', 'Deltoides anterior', 'Core'], name: 'Press de pecho a una mano en polea', level: 'Intermedio',
    phaseNames: { BAJADA: 'REGRESO', SUBIDA: 'EMPUJE', ARRIBA: 'BRAZO ESTIRADO' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L'], bands: [{ anchor: [0.40, 1.30, -0.60], hand: 'L' }],
      keys: [
        { u: 0, ...STAG, L: [0.12, 0.08, -0.28, 10, 6], R: [-0.13, 0.08, 0.22, 0, -6], rot: [4, -6, 0], nk: [0, 6], hL: [0.06, 1.32, 0.62], eL: [1, -0.5, -0.3], pL: [-1, 0, 0, 0, 1, 0], aR: [10, 15, 85] },
        { u: 1, ...STAG, L: [0.12, 0.08, -0.28, 10, 6], R: [-0.13, 0.08, 0.22, 0, -6], rot: [4, 6, 0], nk: [0, -6], hL: [0.26, 1.30, 0.12], eL: [1, -0.5, -0.6], pL: [-1, 0, 0, 0, 1, 0], aR: [10, 15, 85] }] },
      items: [{ kind: 'post', h: 1.40, x: 0.42, z: -0.63 }] },
    captions: {
      intro: 'De espaldas a la polea, asa en una mano a la altura del pecho',
      reps: [
        ['Empuja el asa hacia delante hasta estirar el brazo', 'Vuelve en 2 s controlando'],
        ['El tronco resiste el giro', 'Abdomen firme y cadera quieta'],
        ['Termina con la mano delante del centro del pecho', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Vuelve controlando', 'Posición de inicio: músculos que trabajan', 'Empuja adelante'],
    },
  },
  'TS-PEC-007': {
    ...EMP, ...PEC, ...PUSH_FR, name: 'Flexiones con apoyo de manos amplio', level: 'Intermedio',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [pk(20, 0, { handW: 0.38 }), pk(5, 1, { thTop: 20, handW: 0.38 })] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Manos más abiertas que los hombros y cuerpo recto',
      reps: [
        ['Baja en 2 s hasta casi tocar el suelo con el pecho', 'Empuja hasta estirar los brazos'],
        ['Más trabajo de pecho y menos de tríceps', 'Abdomen y glúteos firmes'],
        ['No abras tanto que molesten los hombros', 'Exhala al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja el suelo'],
    },
  },
  'TS-PEC-008': {
    ...EMP, ...PEC, ...BENCH_FR, primary: ['Pectoral', 'Dorsal ancho'], secondary: ['Tríceps', 'Serrato anterior'], name: 'Pull-over con mancuerna', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'SUBIDA', ARRIBA: 'SOBRE EL PECHO' }, holdLabel: 'ESTIRAMIENTO',
    cfg: { free: { type: 'kfPose', hold: 'db1', dbK: 1.3,
      keys: [
        { u: 0, P: [0, 0.53, -0.02], rot: [-90, 0, 0], sp: [-6, 0, 0], nk: [-12, 0], L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1],
          hL: [0.045, 1.08, -0.46], hR: [-0.045, 1.08, -0.46], eL: [1, 0, 0.3], eR: [-1, 0, 0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0], dax: [0, 1, 0] },
        { u: 1, P: [0, 0.53, -0.02], rot: [-90, 0, 0], sp: [-10, 0, 0], nk: [-12, 0], L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1],
          hL: [0.045, 0.62, -1.02], hR: [-0.045, 0.62, -1.02], eL: [1, 0, 0], eR: [-1, 0, 0], pL: [-1, 0, 0, 0, 0, -1], pR: [1, 0, 0, 0, 0, -1], dax: [0, 0, -1] }] },
      items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, una mancuerna sujeta con las dos manos sobre el pecho',
      reps: [
        ['Lleva la mancuerna hacia atrás por encima de la cabeza en arco', 'Vuelve sobre el pecho por el mismo arco'],
        ['Codos ligeramente flexionados y fijos', 'Costillas abajo: no arquees la espalda'],
        ['Baja solo hasta donde controles', 'Peso moderado'],
      ],
      orbit: ['Baja en arco', 'Estiramiento: músculos que trabajan', 'Sube sobre el pecho'],
    },
  },
  'TS-PEC-009': {
    ...EMP, ...PEC, ...FLY, frame: { dist: 4.4, ty: 0.85, tz: -0.10, distLow: 4.1, tyLow: 0.80 }, views: { f34: { az: -60, el: 18 }, side: { az: -90, el: 8 }, front: { az: -25, el: 22 }, back34: { az: -150, el: 22 } }, orbit: { view: 'side', sweep: 150 },
    name: 'Aperturas en banco declinado', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: flyDecline() }, items: [{ kind: 'inclineBench', angle: -15, seatH: 0.50, legHook: true }] },
    captions: {
      intro: 'Banco declinado, piernas sujetas y mancuernas sobre el pecho',
      reps: [
        ['Abre los brazos en arco hasta notar el estiramiento', 'Ciérralos por el mismo arco'],
        ['Codos ligeramente flexionados y fijos', 'Más trabajo de la parte inferior del pecho'],
        ['Escápulas juntas', 'Peso moderado'],
      ],
      orbit: ['Abre controlando', 'Estiramiento: músculos que trabajan', 'Cierra en arco'],
    },
  },
  'TS-PEC-010': {
    ...EMP, ...PEC, ...BENCH_FR, name: 'Press de pecho isométrico con pausa', level: 'Intermedio', tempo: { down: 2, pause: 3, up: 1.5 },
    phaseNames: { BAJADA: 'BAJADA', PAUSA: 'PAUSA ISOMÉTRICA', SUBIDA: 'EMPUJE', ARRIBA: 'ARRIBA' }, holdLabel: 'PAUSA ISOMÉTRICA',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: DBB().map((k, i) => (i ? { ...k, hL: [0.30, 0.74, -0.38], hR: [-0.30, 0.74, -0.38] } : k)) }, items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco con una mancuerna en cada mano',
      reps: [
        ['Baja en 2 s y mantén 3 s a pocos centímetros del pecho', 'Empuja hasta arriba sin rebote'],
        ['Durante la pausa, la tensión no se pierde', 'Escápulas juntas y apoyadas'],
        ['Respira de forma controlada en la pausa', 'Codos a 45–60° del cuerpo'],
      ],
      orbit: ['Pausa abajo', 'Posición isométrica: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-PEC-011': {
    ...EMP, ...PEC, ...FLY, ...STAND_FR, name: 'Aperturas de pie con polea', level: 'Intermedio', frame: { dist: 5.2, ty: 1.25, tz: 0.0, distLow: 4.9, tyLow: 1.20 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L', 'R'], ...CABLE_FLY(1.30, -0.30, 1.28, 0.50) },
      items: [{ kind: 'post', h: 1.40, x: 0.80, z: -0.32 }, { kind: 'post', h: 1.40, x: -0.80, z: -0.32 }] },
    captions: {
      intro: 'De pie entre dos poleas a la altura del pecho, brazos abiertos',
      reps: [
        ['Junta las manos delante del pecho en un arco amplio', 'Vuelve en 2 s abriendo los brazos'],
        ['Codos ligeramente flexionados y fijos', 'Un pie adelantado para estabilizar'],
        ['Aprieta 1 s con las manos juntas', 'El tronco no se mueve'],
      ],
      orbit: ['Abre controlando', 'Apertura: músculos que trabajan', 'Junta las manos'],
    },
  },
  'TS-PEC-012': {
    ...EMP, ...PEC, ...BENCH_FR, secondary: ['Tríceps', 'Deltoides anterior'], name: 'Press de pecho con mancuernas en agarre neutro', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'db', keys: DBB([[-1, 0.5, 0, 0, 0, 1], [1, 0.5, 0, 0, 0, 1]]).map((k, i) => ({ ...k, ...(i ? { hL: [0.24, 0.66, -0.36], hR: [-0.24, 0.66, -0.36], eL: [0.3, -1, 0.5], eR: [-0.3, -1, 0.5] } : {}) })) },
      items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, mancuernas con las palmas enfrentadas',
      reps: [
        ['Baja en 2 s con los codos cerca del cuerpo', 'Empuja hasta estirar los brazos'],
        ['Agarre neutro: más cómodo para los hombros', 'Escápulas juntas'],
        ['Antebrazos verticales', 'Pies firmes en el suelo'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-PEC-013': {
    ...EMP, ...PEC, ...PUSH_FR, primary: ['Tríceps', 'Pectoral'], secondary: ['Deltoides anterior'], name: 'Flexiones con manos juntas (diamante)', level: 'Intermedio',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [pk(21, 0, { handW: 0.06 }), pk(6, 1, { thTop: 21, handW: 0.06 })].map((k) => ({ ...k, eL: [0.2, 0.2, -1], eR: [-0.2, 0.2, -1], pL: [0, -1, 0, -0.6, 0, 0.8], pR: [0, -1, 0, 0.6, 0, 0.8] })) },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Manos juntas bajo el pecho formando un rombo con pulgares e índices',
      reps: [
        ['Baja en 2 s llevando el pecho hacia las manos', 'Empuja hasta estirar los brazos'],
        ['Codos pegados al cuerpo, hacia atrás', 'Cuerpo recto de la cabeza a los talones'],
        ['Mucho trabajo de tríceps', 'Regresión: con rodillas apoyadas'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja el suelo'],
    },
  },
});
