// Lote 14: estabilidad TI-EST-006 … 010 y equilibrio TI-EQU-001 … 005
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';
import { WALK } from './ex_lote12.js';

GROUPS['Estabilizadores de tobillo, rodilla y cadera'] = ['peroneos', 'tibial_anterior', 'soleo', 'gluteo_medio'];
ANCHORS['Estabilizadores de tobillo, rodilla y cadera'] = [
  { seg: 'shin_L', p: [0.050, -0.20, 0.0], n: [1, 0, 0.2] },
  { seg: 'shin_R', p: [-0.050, -0.20, 0.0], n: [-1, 0, 0.2] },
  { bone: 'pelvis', p: [0.150, 1.000, -0.040], n: [1, 0, -0.3] },
  { bone: 'pelvis', p: [-0.150, 1.000, -0.040], n: [-1, 0, -0.3] },
];

const EST = { sub: 'Estabilidad', primary: ['Estabilizadores de cadera y rodilla'], secondary: ['Core', 'Cuádriceps'], tempo: { down: 3, pause: 1, up: 2 } };
const EQU = { family: 'free', sub: 'Equilibrio', primary: ['Estabilizadores de tobillo, rodilla y cadera'], secondary: ['Core'], tempo: { down: 2, pause: 0, up: 2 }, iso: true,
  frame: { dist: 4.5, ty: 0.95, tz: 0.0, distLow: 3.9, tyLow: 0.92 } };
const ORB_EQU = ['Mantén el equilibrio', 'Apoyo monopodal: músculos que trabajan', 'Respira y sigue estable'];
const BOSU_SQ = { arms: 'forward', stance: 0.13, toeOut: 10, hipBottom: 0.70, leanTop: 2, leanBot: 30, kneeOut: 0.06, ankleY: 0.29 };

Object.assign(EXERCISES, {
  'TI-EST-006': {
    ...EST, family: 'free', name: 'Control de rodilla en apoyo monopodal', level: 'Intermedio', phaseNames: null,
    frame: { dist: 4.6, ty: 1.08, tz: 0.0, distLow: 4.0, tyLow: 1.0 },
    cfg: { free: { type: 'balance', stance: 'L', surfaceY: 0.21, kneeB: 5, kneeT: 38, freeLeg: 'back', armMode: 'hips', leanT: 12, wobble: 0.5 }, items: [{ kind: 'bosu', x: 0.05, z: 0.0 }] },
    captions: {
      intro: 'De pie sobre el bosu con una sola pierna',
      reps: [
        ['Flexiona la rodilla de apoyo en 3 s', 'Vuelve arriba en 2 s'],
        ['La rodilla sigue la línea del segundo dedo: no se va hacia dentro', 'Pelvis nivelada'],
        ['Rango corto y muy controlado', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Flexiona controlando', 'Posición baja: músculos que trabajan', 'Vuelve arriba estable'],
    },
  },
  'TI-EST-007': {
    ...EST, family: 'squat', name: 'Sentadilla con ojos cerrados (progresión propioceptiva)', level: 'Avanzado', frame: { tz: 0.0, dist: 4.7, ty: 1.05, tyLow: 0.90 },
    cfg: { ...BOSU_SQ, items: [{ kind: 'bosu', z: 0.02 }] },
    captions: {
      intro: 'Sobre el bosu, pies al ancho de caderas; cierra los ojos antes de empezar',
      reps: [
        ['Con los ojos cerrados, baja en 3 s', 'Sube en 2 s sin abrir los ojos'],
        ['Sin la vista, el equilibrio depende de tobillos, rodillas y cadera', 'Profundidad moderada'],
        ['Si pierdes el equilibrio, abre los ojos y reduce el rango', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Baja con los ojos cerrados', 'Posición baja: músculos que trabajan', 'Sube estable'],
    },
  },
  'TI-EST-008': {
    ...EST, family: 'free', name: 'Y-balance en apoyo monopodal', level: 'Avanzado',
    frame: { dist: 4.9, ty: 0.85, tz: 0.0, distLow: 4.3, tyLow: 0.70 },
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 4, kneeT: 42, freeLeg: 'reach', armMode: 'hips', leanT: 18, wobble: 0.3 } },
    captions: {
      intro: 'De pie sobre una pierna, manos en la cintura',
      reps: [
        ['Alcanza al frente con la punta del pie libre', 'Vuelve al centro sin apoyar peso'],
        ['Ahora hacia atrás y en diagonal, por detrás de la pierna de apoyo', 'La rodilla de apoyo no se va hacia dentro'],
        ['Atrás y hacia fuera, lo más lejos que controles', 'Solo toca el suelo: el peso sigue en la pierna de apoyo'],
      ],
      orbit: ['Alcanza lejos', 'Máximo alcance: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TI-EST-009': {
    ...EST, family: 'squat', name: 'Sentadilla con carga asimétrica (offset load)', level: 'Avanzado', frame: { tz: 0.0, dist: 4.6 },
    secondary: ['Core', 'Cuádriceps', 'Glúteos'],
    cfg: { arms: 'hang', hold: 'kb1', loadSide: 'R', gripX: 0.20, stance: 0.15, toeOut: 12, hipBottom: 0.56, leanTop: 2, leanBot: 36, kneeOut: 0.07 },
    captions: {
      intro: 'Una kettlebell en una sola mano, a un lado del cuerpo',
      reps: [
        ['Baja en 3 s sin inclinarte hacia la carga', 'Sube en 2 s con el tronco recto'],
        ['El core evita que el tronco se doble hacia el lado de la carga', 'Hombros nivelados'],
        ['Rodillas alineadas con los pies', 'Cambia la carga de mano en la siguiente serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube recto'],
    },
  },
  'TI-EST-010': {
    ...EST, ...WALK, family: 'free', name: 'Marcha con carga unilateral (suitcase carry)', level: 'Avanzado', secondary: ['Core', 'Glúteos'],
    frame: { dist: 4.8, ty: 0.92, tz: 0.0, distLow: 4.2, tyLow: 0.90 },
    cfg: { free: { type: 'gait', carry: 'R', stepLen: 0.55, stepTime: 0.58, lift: 0.07 } },
    captions: {
      intro: 'De pie con una kettlebell pesada en una mano',
      reps: [
        ['Camina con pasos normales sin inclinarte hacia la carga', 'Hombros y cadera nivelados'],
        ['El brazo con la carga queda estirado junto al cuerpo', 'Core firme en cada paso'],
        ['Tramos de 20–30 m y cambia de mano', 'Mirada al frente'],
      ],
      orbit: ['Sigue caminando recto', 'En marcha: músculos que trabajan', 'Hombros nivelados hasta el final'],
    },
  },
  'TI-EQU-001': {
    ...EQU, name: 'Apoyo monopodal estático', level: 'Principiante',
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 6, kneeT: 8, freeLeg: 'back', armMode: 'hips', wobble: 0.6 } },
    captions: {
      intro: 'De pie, manos en la cintura',
      reps: [
        ['Levanta un pie y mantén el equilibrio', 'Rodilla de apoyo ligeramente flexionada'],
        ['Pelvis nivelada: no dejes caer el lado de la pierna libre', 'Mirada fija en un punto'],
        ['Mantén 30 s y cambia de pierna', 'Respira de forma continua'],
      ],
      orbit: ORB_EQU,
    },
  },
  'TI-EQU-002': {
    ...EQU, name: 'Apoyo monopodal con ojos cerrados', level: 'Principiante',
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 6, kneeT: 8, freeLeg: 'back', armMode: 'hips', wobble: 1.0 } },
    captions: {
      intro: 'De pie sobre una pierna; cuando estés estable, cierra los ojos',
      reps: [
        ['Con los ojos cerrados, mantén el equilibrio', 'Los tobillos hacen pequeñas correcciones constantes'],
        ['Rodilla de apoyo ligeramente flexionada', 'Pelvis nivelada'],
        ['Si te caes, abre los ojos y vuelve a empezar', 'Hazlo cerca de una pared por seguridad'],
      ],
      orbit: ORB_EQU,
    },
  },
  'TI-EQU-003': {
    ...EQU, name: 'Apoyo monopodal sobre bosu', level: 'Principiante', frame: { dist: 4.6, ty: 1.08, tz: 0.0, distLow: 4.0, tyLow: 1.05 },
    cfg: { free: { type: 'balance', stance: 'L', surfaceY: 0.21, kneeB: 8, kneeT: 10, freeLeg: 'back', armMode: 'out', wobble: 1.1 }, items: [{ kind: 'bosu', x: 0.05, z: 0.0 }] },
    captions: {
      intro: 'Un pie en el centro de la cúpula del bosu',
      reps: [
        ['Levanta el otro pie y mantén el equilibrio', 'Brazos abiertos para ayudarte'],
        ['Rodilla de apoyo ligeramente flexionada', 'El tobillo trabaja sin parar'],
        ['Mantén 20–30 s y cambia de pierna', 'Mirada al frente'],
      ],
      orbit: ORB_EQU,
    },
  },
  'TI-EQU-004': {
    ...EQU, name: 'Apoyo monopodal con lanzamiento y recepción de balón', level: 'Intermedio',
    cfg: { free: { type: 'balance', stance: 'L', kneeB: 10, kneeT: 12, freeLeg: 'back', armMode: 'ball', wobble: 0.8 } },
    captions: {
      intro: 'De pie sobre una pierna con un balón en las manos',
      reps: [
        ['Lanza el balón hacia arriba y recíbelo sin apoyar el otro pie', 'Mantén la rodilla de apoyo flexionada'],
        ['Puedes lanzarlo contra una pared o a un compañero', 'Pelvis nivelada en cada recepción'],
        ['Series de 30 s con cada pierna', 'Lanzamientos controlados'],
      ],
      orbit: ['Lanza y recibe', 'Apoyo monopodal: músculos que trabajan', 'Sigue sin apoyar el pie'],
    },
  },
  'TI-EQU-005': {
    ...EQU, ...WALK, iso: false, name: 'Equilibrio dinámico en línea recta (tandem walk)', level: 'Intermedio',
    frame: { dist: 4.6, ty: 0.95, tz: 0.0, distLow: 4.0, tyLow: 0.92 },
    cfg: { free: { type: 'gait', tandem: true, stepLen: 0.27, stepTime: 0.9, lift: 0.05, toeOut: 0 } },
    captions: {
      intro: 'De pie sobre una línea recta, brazos abiertos',
      reps: [
        ['Camina poniendo el talón justo delante de la punta del otro pie', 'Pasos lentos sobre la línea'],
        ['Brazos abiertos para equilibrarte', 'Mirada al frente, no a los pies'],
        ['Tramos de 5–10 m', 'Progresión: hazlo hacia atrás o con los ojos cerrados'],
      ],
      orbit: ['Sigue sobre la línea', 'En marcha: músculos que trabajan', 'Talón delante de la punta'],
    },
  },
});
