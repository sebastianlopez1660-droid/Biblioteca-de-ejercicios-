// Lote 11: extensión de rodilla TI-ERO-006 … 010 y elevación de talones TI-PAN-001 … 005
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';

GROUPS['Gastrocnemio y sóleo'] = ['gastrocnemio', 'soleo'];
ANCHORS['Gastrocnemio y sóleo'] = [
  { seg: 'shin_L', p: [0.0, -0.12, -0.055], n: [0.2, 0, -1] },
  { seg: 'shin_R', p: [0.0, -0.12, -0.055], n: [-0.2, 0, -1] },
];
GROUPS['Tibial anterior'] = ['tibial_anterior'];
ANCHORS['Tibial anterior'] = [
  { seg: 'shin_L', p: [0.028, -0.14, 0.045], n: [0.4, 0, 1] },
  { seg: 'shin_R', p: [-0.028, -0.14, 0.045], n: [-0.4, 0, 1] },
];

export const ERO = { family: 'free', sub: 'Extensión de rodilla', primary: ['Cuádriceps'], secondary: [], tempo: { down: 2, pause: 1, up: 2 },
  phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'FLEXIÓN', ARRIBA: 'FLEXIONADA' }, holdLabel: 'EXTENSIÓN COMPLETA' };
const SEAT_FR = { dist: 4.4, ty: 0.72, tz: 0.18, distLow: 3.9, tyLow: 0.70 };
export const PAN = { family: 'free', sub: 'Pantorrillas', primary: ['Gastrocnemio y sóleo'], secondary: [], tempo: { down: 1, pause: 1, up: 2 },
  phaseNames: { BAJADA: 'SUBIDA', SUBIDA: 'BAJADA', ARRIBA: 'ABAJO' }, holdLabel: 'ARRIBA',
  frame: { dist: 4.2, ty: 0.80, tz: 0.05, distLow: 3.6, tyLow: 0.62 } };
const ORB_PAN = ['Sube hasta la punta de los pies', 'Arriba: músculos que trabajan', 'Baja controlando'];

Object.assign(EXERCISES, {
  'TI-ERO-006': {
    ...ERO, name: 'Extensión de rodilla en polea baja', level: 'Intermedio', frame: SEAT_FR,
    cfg: { free: { type: 'seated', seatY: 0.47, recline: 0, kneeB: 92, kneeT: 4, single: 'L', restKnee: 92, band: [0, 0.12, -0.62], cable: true, handX: 0.17, handZ: 0.02, handDy: 0.0, plantB: 0, plantT: -10 },
      items: [{ kind: 'benchX', len: 0.8, h: 0.47, z: -0.15, ry: Math.PI / 2 }, { kind: 'cableColumn', ry: Math.PI, handY: 1.1, pulleyY: 0.12 }] },
    captions: {
      intro: 'Sentado en un banco, tobillera enganchada a la polea baja que queda detrás',
      reps: [
        ['Extiende la rodilla contra la tensión del cable', 'Vuelve en 2 s sin dejar que el cable te tire'],
        ['El muslo queda apoyado en el banco', 'Aprieta el cuádriceps 1 s arriba'],
        ['Tronco erguido y manos sujetas al banco', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Extiende', 'Extensión completa: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-ERO-007': {
    ...ERO, name: 'Extensión de rodilla sentado con lastre en tobillo', level: 'Avanzado', frame: SEAT_FR,
    cfg: { free: { type: 'seated', seatY: 0.47, recline: 0, kneeB: 92, kneeT: 4, single: 'L', restKnee: 92, ankleWeight: true, handX: 0.27, handZ: 0.04, handDy: 0.0, plantB: 0, plantT: -10 },
      items: [{ kind: 'box', h: 0.47, w: 0.62, d: 0.46, z: 0.0 }] },
    captions: {
      intro: 'Sentado, con un lastre ajustado al tobillo de la pierna que trabaja',
      reps: [
        ['Extiende la rodilla elevando el lastre', 'Baja en 2 s controlando el peso'],
        ['El muslo no se despega del asiento', 'Aprieta 1 s con la pierna estirada'],
        ['Punta del pie hacia ti durante todo el recorrido', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Extiende', 'Extensión completa: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-ERO-008': {
    ...ERO, name: 'Extensión terminal de rodilla con banda de pie', level: 'Avanzado', tempo: { down: 1.5, pause: 2, up: 1.5 },
    frame: { dist: 4.4, ty: 0.85, tz: 0.15, distLow: 3.8, tyLow: 0.70 },
    cfg: { free: { type: 'tke', side: 'L', kneeB: 30, kneeT: 0, anchor: [0.09, 0.44, 0.82] }, items: [{ kind: 'post', h: 0.62, x: 0.09, z: 0.86 }] },
    captions: {
      intro: 'Banda anclada delante, a la altura de la rodilla, y pasada por detrás de ella',
      reps: [
        ['Estira la rodilla por completo empujando la banda hacia atrás', 'Vuelve a flexionar ligeramente sin soltar la tensión'],
        ['Aprieta el cuádriceps 2 s, sobre todo la parte interna', 'El pie de apoyo no se mueve'],
        ['Rango corto: de rodilla algo flexionada a estirada', 'Muy usado tras lesiones de rodilla'],
      ],
      orbit: ['Estira la rodilla', 'Extensión completa: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-ERO-009': {
    ...ERO, name: 'Extensión de rodilla excéntrica controlada', level: 'Avanzado', frame: SEAT_FR, tempo: { down: 1.5, pause: 0.5, up: 4 },
    cfg: { free: { type: 'seated', seatY: 0.52, recline: 12, kneeB: 92, kneeT: 4, roller: 'front', handX: 0.27, handZ: 0.12, plantB: 0, plantT: -10, machine: { kind: 'lever', rollerX: 0 } },
      items: [{ kind: 'seatMachine', seatY: 0.52, recline: 12 }] },
    captions: {
      intro: 'Sentado en la máquina con el rodillo sobre la parte baja de las espinillas',
      reps: [
        ['Sube en 1,5 s hasta estirar las piernas', 'Baja en 4 s frenando el peso'],
        ['La bajada lenta es la parte importante', 'Usa menos peso que en la extensión normal'],
        ['Espalda apoyada y manos en las asas', 'Sin rebote abajo'],
      ],
      orbit: ['Extiende', 'Extensión completa: músculos que trabajan', 'Baja en 4 s'],
    },
  },
  'TI-ERO-010': {
    family: 'squat', sub: 'Extensión de rodilla', primary: ['Cuádriceps'], secondary: [], name: 'Extensión de rodilla en cadena cerrada contra pared', level: 'Avanzado',
    tempo: { down: 2, pause: 1, up: 2 },
    views: { hackR: { az: 100, el: 9 }, side: { az: -88, el: 4 } }, orbit: { view: 'hackR', sweep: -200 },
    frame: { tz: 0.15, dist: 4.5 },
    cfg: { arms: 'sides', fixedZ: 0, ankleZ: 0.40, stance: 0.12, toeOut: 2, hipBottom: 0.66, leanTop: 0, leanBot: 0, chestExt: 0, neckK: 0, kneeOut: 0.01, wall: { z: -0.128 } },
    captions: {
      intro: 'Espalda apoyada en la pared y pies un paso por delante',
      reps: [
        ['Desliza la espalda hasta flexionar las rodillas unos 45°', 'Empuja el suelo y vuelve a estirar las rodillas'],
        ['Los pies quedan fijos: la rodilla se estira con el pie apoyado', 'Rodillas alineadas con la punta de los pies'],
        ['Rango parcial y controlado, sin dolor', 'Aprieta el cuádriceps arriba'],
      ],
      orbit: ['Desliza hacia abajo', 'Posición baja: músculos que trabajan', 'Empuja y estira las rodillas'],
    },
  },
  'TI-PAN-001': {
    ...PAN, name: 'Elevación de talones de pie (standing calf raise)', level: 'Principiante',
    cfg: { arms: 'hips', free: { type: 'calf', maxPitch: 34 } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cintura',
      reps: [
        ['Sube a la punta de los pies en 1 s', 'Baja en 2 s hasta apoyar los talones'],
        ['Aprieta 1 s arriba', 'Peso sobre el dedo gordo y el segundo dedo'],
        ['Rodillas estiradas sin bloquear', 'Tobillos en línea: no se van hacia afuera'],
      ],
      orbit: ORB_PAN,
    },
  },
  'TI-PAN-002': {
    ...PAN, name: 'Elevación de talones sentado (seated calf raise)', level: 'Principiante', frame: { dist: 4.1, ty: 0.62, tz: 0.15, distLow: 3.6, tyLow: 0.55 },
    cfg: { free: { type: 'calf', seatedCalf: true, seatY: 0.47, footZ: 0.40, maxPitch: 36 }, items: [{ kind: 'box', h: 0.47, w: 0.62, d: 0.46, z: -0.06 }] },
    captions: {
      intro: 'Sentado con las rodillas a 90° y las manos sobre las rodillas',
      reps: [
        ['Eleva los talones empujando con la punta de los pies', 'Baja en 2 s hasta apoyar los talones'],
        ['Con la rodilla flexionada trabaja más el sóleo', 'Aprieta 1 s arriba'],
        ['Puedes apoyar un peso sobre los muslos para progresar', 'Recorrido completo, sin rebotes'],
      ],
      orbit: ORB_PAN,
    },
  },
  'TI-PAN-003': {
    ...PAN, name: 'Elevación de talones a una pierna', level: 'Principiante',
    cfg: { arms: 'hips', free: { type: 'calf', single: 'L', maxPitch: 32 } },
    captions: {
      intro: 'De pie sobre una pierna, la otra flexionada detrás',
      reps: [
        ['Sube a la punta del pie de apoyo', 'Baja en 2 s controlando'],
        ['La cadera se mantiene nivelada', 'Si pierdes el equilibrio, apoya una mano en la pared'],
        ['Aprieta 1 s arriba', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ORB_PAN,
    },
  },
  'TI-PAN-004': {
    ...PAN, name: 'Elevación de talones en prensa (leg press)', level: 'Intermedio',
    frame: { dist: 4.8, ty: 0.80, tz: 0.40, distLow: 4.2, tyLow: 0.80 },
    views: { f34: { az: -55, el: 10 }, side: { az: -90, el: 6 }, front: { az: -125, el: 14 }, back34: { az: 150, el: 18 } },
    cfg: { free: { type: 'legPressCalf', seatY: 0.42, recline: 48, legAng: 42, plantB: -12, plantT: 28 }, items: [{ kind: 'legPressSeat', seatY: 0.42, recline: 48, legAng: 42 }] },
    captions: {
      intro: 'Sentado en la prensa, piernas estiradas y solo la punta de los pies sobre la plataforma',
      reps: [
        ['Empuja la plataforma con la punta de los pies', 'Vuelve en 2 s dejando bajar los talones'],
        ['Rodillas estiradas pero sin bloquear', 'Aprieta 1 s con los tobillos extendidos'],
        ['Mantén los seguros de la prensa puestos', 'Recorrido completo del tobillo'],
      ],
      orbit: ['Empuja con la punta de los pies', 'Extensión del tobillo: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-PAN-005': {
    ...PAN, name: 'Elevación de talones en step (step calf raise)', level: 'Intermedio', frame: { dist: 4.2, ty: 0.88, tz: 0.08, distLow: 3.6, tyLow: 0.72 },
    cfg: { arms: 'hips', free: { type: 'calf', stepH: 0.15, minPitch: -18, maxPitch: 30 }, items: [{ kind: 'box', h: 0.15, w: 0.62, d: 0.40, z: 0.30 }] },
    captions: {
      intro: 'De pie en el borde de un escalón, solo la punta de los pies apoyada',
      reps: [
        ['Sube a la punta de los pies desde el estiramiento', 'Baja en 2 s por debajo del escalón'],
        ['Más rango que en el suelo: estira bien abajo', 'Aprieta 1 s arriba'],
        ['Rodillas estiradas sin bloquear', 'Usa una pared o barandilla para el equilibrio'],
      ],
      orbit: ORB_PAN,
    },
  },
});
