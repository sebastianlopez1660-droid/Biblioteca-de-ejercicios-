// Lote 15: equilibrio TI-EQU-006 … 010 y prevención TI-PRE-001 … 005
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';

GROUPS['Estabilizadores de tobillo'] = ['peroneos', 'tibial_anterior', 'soleo'];
ANCHORS['Estabilizadores de tobillo'] = [
  { seg: 'shin_L', p: [0.050, -0.22, 0.0], n: [1, 0, 0.2] },
  { seg: 'shin_R', p: [-0.050, -0.22, 0.0], n: [-1, 0, 0.2] },
];
import { WALK } from './ex_lote12.js';
import { PUE, BR, MAT } from './ex_lote8.js';

const EQU = { family: 'free', sub: 'Equilibrio', primary: ['Estabilizadores de tobillo, rodilla y cadera'], secondary: ['Core'], tempo: { down: 2, pause: 0, up: 2 }, iso: true,
  frame: { dist: 4.5, ty: 0.95, tz: 0.0, distLow: 3.9, tyLow: 0.92 } };
const ORB_EQU = ['Mantén el equilibrio', 'Apoyo monopodal: músculos que trabajan', 'Respira y sigue estable'];
const PRE = { sub: 'Prevención', secondary: ['Core', 'Estabilizadores de tobillo'] };
export const SIDE_VIEWS = { f34: { az: 28, el: 30 }, side: { az: 0, el: 58 }, front: { az: 0, el: 14 }, back34: { az: 150, el: 32 } };
export const CLAM_NAMES = { BAJADA: 'APERTURA', SUBIDA: 'CIERRE', ARRIBA: 'INICIO' };

Object.assign(EXERCISES, {
  'TI-EQU-006': {
    ...EQU, name: 'Equilibrio en tabla inestable (balance board)', level: 'Intermedio', frame: { dist: 4.5, ty: 0.98, tz: 0.0, distLow: 3.9, tyLow: 0.95 },
    cfg: { free: { type: 'balance', both: true, board: true, surfaceY: 0.085, width: 0.12, kneeB: 12, kneeT: 14, armMode: 'out', wobble: 0.5 } },
    captions: {
      intro: 'De pie sobre la tabla, pies al ancho de caderas',
      reps: [
        ['Mantén la tabla nivelada sin que los bordes toquen el suelo', 'Rodillas ligeramente flexionadas'],
        ['Corrige con los tobillos, no con los brazos', 'Mirada fija en un punto'],
        ['Mantén 20–40 s', 'Hombros relajados'],
      ],
      orbit: ['Mantén la tabla nivelada', 'Equilibrio: músculos que trabajan', 'Respira y sigue estable'],
    },
  },
  'TI-EQU-007': {
    ...EQU, name: 'Apoyo monopodal con movimiento de brazos', level: 'Avanzado',
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 8, kneeT: 10, freeLeg: 'back', armMode: 'swing', wobble: 0.8 } },
    captions: {
      intro: 'De pie sobre una pierna',
      reps: [
        ['Sube y baja los brazos alternando sin perder el equilibrio', 'Rodilla de apoyo ligeramente flexionada'],
        ['El movimiento de los brazos desplaza tu centro de gravedad', 'Pelvis nivelada'],
        ['Mantén 30 s y cambia de pierna', 'Movimientos amplios y controlados'],
      ],
      orbit: ['Sigue moviendo los brazos', 'Apoyo monopodal: músculos que trabajan', 'Mantén el equilibrio'],
    },
  },
  'TI-EQU-008': {
    ...EQU, name: 'Equilibrio con perturbación de compañero', level: 'Avanzado',
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 14, kneeT: 16, freeLeg: 'back', armMode: 'hips', wobble: 0.5, pushes: true } },
    captions: {
      intro: 'Sobre una pierna; un compañero te empujará suavemente',
      reps: [
        ['El compañero empuja hombros o cadera en distintas direcciones', 'Recupera la posición sin apoyar el otro pie'],
        ['Rodilla de apoyo flexionada para absorber el empujón', 'Core firme antes de cada empuje'],
        ['Empujes suaves e impredecibles', 'Series de 20–30 s por pierna'],
      ],
      orbit: ['Absorbe y recupera', 'Apoyo monopodal: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TI-EQU-009': {
    ...EQU, iso: false, name: 'Apoyo monopodal con flexión de rodilla contraria', level: 'Avanzado',
    phaseNames: { BAJADA: 'SUBE LA RODILLA', SUBIDA: 'BAJA LA RODILLA', ARRIBA: 'INICIO' }, holdLabel: 'RODILLA ARRIBA',
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 8, kneeT: 10, freeLeg: 'knee', armMode: 'hips', wobble: 0.6 } },
    captions: {
      intro: 'De pie sobre una pierna, manos en la cintura',
      reps: [
        ['Sube la rodilla libre hasta la altura de la cadera', 'Bájala en 2 s sin apoyar el pie'],
        ['Tronco erguido: no te inclines hacia atrás', 'La pierna de apoyo se mantiene estable'],
        ['Pelvis nivelada durante todo el movimiento', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Rodilla arriba', 'Apoyo monopodal: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-EQU-010': {
    ...EQU, name: 'Equilibrio sobre superficie de espuma (foam pad)', level: 'Avanzado', frame: { dist: 4.5, ty: 0.97, tz: 0.0, distLow: 3.9, tyLow: 0.95 },
    cfg: { free: { type: 'balance', stance: 'L', surfaceY: 0.065, kneeB: 8, kneeT: 10, freeLeg: 'back', armMode: 'out', wobble: 1.0 }, items: [{ kind: 'foamPad', x: 0.05, z: 0.0 }] },
    captions: {
      intro: 'Un pie en el centro de la espuma',
      reps: [
        ['Levanta el otro pie y mantén el equilibrio', 'La espuma obliga al tobillo a corregir sin parar'],
        ['Rodilla de apoyo ligeramente flexionada', 'Pelvis nivelada'],
        ['Mantén 20–30 s y cambia de pierna', 'Progresión: cierra los ojos'],
      ],
      orbit: ORB_EQU,
    },
  },
  'TI-PRE-001': {
    ...PRE, family: 'free', primary: ['Glúteo medio', 'Cuádriceps'], name: 'Step down controlado (control excéntrico de rodilla)', level: 'Principiante',
    tempo: { down: 3, pause: 0.5, up: 2 },
    frame: { dist: 5.2, ty: 1.10, distLow: 4.6, tyLow: 1.0, tz: 0.08 },
    cfg: { stance: 0.10, toeOut: 6, kneeOut: 0.04, stepBox: { x: 0.02, z: -0.08, h: 0.20 }, arms: 'forward',
      free: { type: 'stepDown', stance: 'L', h: 0.20, tapZ: 0.30, leanB: 18, pzB: -0.08 } },
    captions: {
      intro: 'De pie sobre un escalón bajo con una pierna; la otra queda libre al frente',
      reps: [
        ['Baja en 3 s flexionando la pierna de apoyo', 'Toca el suelo con el talón y vuelve arriba'],
        ['La rodilla sigue la línea del segundo dedo: no se va hacia dentro', 'Pelvis nivelada'],
        ['La pierna libre solo toca el suelo', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Baja controlando la rodilla', 'Posición baja: músculos que trabajan', 'Sube empujando con la pierna de apoyo'],
    },
  },
  'TI-PRE-002': {
    ...PRE, ...WALK, family: 'free', primary: ['Glúteo medio'], name: 'Marcha lateral con banda (monster walk)', level: 'Principiante',
    tempo: { down: 2, pause: 0, up: 2 }, trackX: true, frame: { dist: 5.1, ty: 0.86, tz: 0.0, distLow: 4.6, tyLow: 0.82 },
    cfg: { free: { type: 'gait', lateral: true, kneeBend: 32, lean: 18, width: 0.17, stepLen: 0.30, stepTime: 0.75, lift: 0.04, kneeBandLoop: true, armsHips: true } },
    captions: {
      intro: 'Mini banda sobre las rodillas, en media sentadilla',
      reps: [
        ['Da pasos laterales cortos sin que los pies se junten', 'La banda siempre en tensión'],
        ['Rodillas hacia fuera, alineadas con los pies', 'Mantén la altura de la cadera'],
        ['Tronco estable, sin balancearte', '10–15 pasos por lado'],
      ],
      orbit: ['Sigue avanzando de lado', 'En marcha: músculos que trabajan', 'Rodillas hacia fuera'],
    },
  },
  'TI-PRE-003': {
    ...PRE, family: 'free', primary: ['Glúteo medio'], name: 'Clamshell con banda', level: 'Principiante', labelAll: true,
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: CLAM_NAMES, holdLabel: 'APERTURA MÁXIMA', views: SIDE_VIEWS,
    frame: { dist: 3.7, ty: 0.28, tz: 0.0, distLow: 3.3, tyLow: 0.28 },
    cfg: { free: { type: 'sideLying', down: 'L', mode: 'clam', open: 46, kneeBand: true }, items: [{ kind: 'mat', z: 0.0, x: -0.05, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Tumbado de lado, caderas y rodillas flexionadas, mini banda sobre las rodillas',
      reps: [
        ['Abre la rodilla de arriba sin separar los pies', 'Cierra en 2 s controlando la banda'],
        ['La pelvis no rota hacia atrás: caderas apiladas', 'El movimiento sale de la cadera'],
        ['Aprieta 1 s arriba', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Abre la rodilla', 'Apertura máxima: músculos que trabajan', 'Cierra controlando'],
    },
  },
  'TI-PRE-004': {
    ...PUE, ...PRE, primary: ['Glúteo medio', 'Glúteos'], secondary: ['Isquiotibiales', 'Core'], name: 'Puente de glúteo con banda en rodillas', level: 'Intermedio',
    cfg: { free: { ...BR, kneeBand: true, kneeOut: 0.16, feetW: 0.15 }, items: MAT },
    captions: {
      intro: 'Boca arriba, pies apoyados y mini banda por encima de las rodillas',
      reps: [
        ['Sube la cadera empujando las rodillas hacia fuera contra la banda', 'Baja en 2 s sin que las rodillas se cierren'],
        ['Rodillas alineadas con los pies durante todo el movimiento', 'Empuja con los talones'],
        ['Arriba aprieta glúteos 1 s', 'Costillas abajo, sin arquear la espalda'],
      ],
      orbit: ['Sube la cadera', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-PRE-005': {
    ...PRE, family: 'squat', primary: ['Glúteo medio', 'Cuádriceps'], name: 'Control de valgo de rodilla en sentadilla', level: 'Intermedio',
    tempo: { down: 3, pause: 1, up: 2 }, frame: { tz: 0.0, dist: 4.6 }, views: { f34: { az: -25 }, front: { az: 0 } },
    cfg: { arms: 'forward', stance: 0.15, toeOut: 10, hipBottom: 0.52, leanTop: 2, leanBot: 38, kneeOut: 0.10, kneeLoop: true },
    captions: {
      intro: 'Mini banda sobre las rodillas, pies al ancho de caderas',
      reps: [
        ['Baja en 3 s empujando las rodillas hacia fuera contra la banda', 'Sube en 2 s sin que se cierren'],
        ['Rodillas alineadas con el segundo dedo del pie', 'Todo el pie apoyado'],
        ['La banda te avisa si la rodilla se va hacia dentro', 'Profundidad que puedas controlar'],
      ],
      orbit: ['Baja controlando las rodillas', 'Posición baja: músculos que trabajan', 'Sube sin cerrar las rodillas'],
    },
  },
});
