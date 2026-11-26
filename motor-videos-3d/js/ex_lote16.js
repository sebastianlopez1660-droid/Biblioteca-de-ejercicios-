// Lote 16: prevención TI-PRE-006 … 010 y trabajo unilateral TI-UNI-001 … 005
import { EXERCISES } from './exercises.js';
import { SPLCFG, SPLIT_FLOOR, HCFG, SINGLE } from './exercises.js';
import { NORDIC } from './ex_lote9.js';
import { STU, FRONT, SCFG } from './ex_lote6.js';

const PRE = { sub: 'Prevención', secondary: ['Core', 'Estabilizadores de tobillo'] };
const UNI = { sub: 'Trabajo unilateral', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Core', 'Estabilizadores de cadera y rodilla'] };
const ST1 = { family: 'free', tempo: { down: 2, pause: 1, up: 2 }, frame: { dist: 4.4, ty: 0.85, tz: 0.0, distLow: 4.0, tyLow: 0.80 },
  views: { f34: { az: -25, el: 10 }, side: { az: -70, el: 8 }, front: { az: 0, el: 8 }, back34: { az: 160, el: 16 } } };
export const PRESS_FR = { frame: { dist: 4.8, ty: 0.80, tz: 0.40, distLow: 4.2, tyLow: 0.80 },
  views: { f34: { az: -55, el: 10 }, side: { az: -90, el: 6 }, front: { az: -125, el: 14 }, back34: { az: 150, el: 18 } } };
export const PRESS_ITEMS = [{ kind: 'legPressSeat', seatY: 0.42, recline: 48, legAng: 42 }];

Object.assign(EXERCISES, {
  'TI-PRE-006': {
    ...PRE, ...ST1, primary: ['Aductores'], name: 'Fortalecimiento de aductores con banda', level: 'Intermedio',
    phaseNames: { BAJADA: 'ADUCCIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'PIERNA CRUZADA',
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 3, leanT: 3, hands: 'hips', flexB: 2, kneeB: 4, flexT: 6, kneeT: 4, plantB: 10, plantT: 10, abdB: 24, abdT: -8, cable: [-0.96, 0.15, 0.0], cableBand: true },
      items: [{ kind: 'post', h: 0.24, x: -0.99, z: 0.0 }] },
    captions: {
      intro: 'Banda en el tobillo, anclada al lado de la pierna que trabaja',
      reps: [
        ['Lleva la pierna hacia dentro cruzando por delante', 'Vuelve en 2 s sin dejar que la banda tire'],
        ['Tronco erguido: no te inclines hacia la banda', 'La pierna de apoyo queda firme'],
        ['Movimiento lento y controlado', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Cruza la pierna', 'Aducción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-PRE-007': {
    ...PRE, family: 'free', primary: ['Isquiotibiales'], secondary: ['Glúteos', 'Gastrocnemio'], name: 'Nordic hamstring curl progresivo', level: 'Avanzado',
    tempo: { down: 4, pause: 0, up: 1.5 },
    phaseNames: { BAJADA: 'BAJADA EXCÉNTRICA', SUBIDA: 'REGRESO', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.8, ty: 0.85, tz: 0.0, distLow: 4.1, tyLow: 0.60 },
    cfg: { free: { ...NORDIC, maxAng: 60, band: [0, 1.80, -0.78] }, items: [{ kind: 'anklePad', z: -0.43, y: 0.17 }, { kind: 'post', h: 1.88, z: -0.80 }] },
    captions: {
      intro: 'De rodillas, tobillos sujetos y una banda en el pecho que te ayuda',
      reps: [
        ['Baja en 4 s manteniendo el cuerpo recto de rodillas a cabeza', 'Vuelve arriba con ayuda de la banda'],
        ['Cadera extendida: no te dobles por la cintura', 'Frena con los isquiotibiales todo lo que puedas'],
        ['Progresión: banda más fina o más rango cada semana', 'Pocas repeticiones y de calidad'],
      ],
      orbit: ['Baja frenando', 'Posición baja: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-PRE-008': {
    ...PRE, family: 'free', primary: ['Estabilizadores de tobillo, rodilla y cadera'], secondary: ['Core', 'Glúteo medio'], name: 'Estabilización de tobillo en superficie inestable', level: 'Avanzado',
    tempo: { down: 2, pause: 0, up: 2 }, frame: { dist: 4.8, ty: 0.85, tz: 0.0, distLow: 4.3, tyLow: 0.72 },
    cfg: { free: { type: 'balance', stance: 'L', surfaceY: 0.065, kneeB: 6, kneeT: 30, freeLeg: 'reach', armMode: 'hips', leanT: 14, wobble: 0.7 }, items: [{ kind: 'foamPad', x: 0.05, z: 0.0 }] },
    captions: {
      intro: 'Sobre una pierna encima de la espuma, manos en la cintura',
      reps: [
        ['Toca el suelo al frente con la punta del pie libre', 'Vuelve sin perder el equilibrio'],
        ['Ahora atrás y en diagonal', 'El tobillo de apoyo corrige sin parar'],
        ['Atrás y hacia fuera', 'Rodilla de apoyo alineada con el pie'],
      ],
      orbit: ['Alcanza y vuelve', 'Máximo alcance: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TI-PRE-009': {
    ...PRE, family: 'free', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Glúteo medio', 'Gastrocnemio', 'Core'], name: 'Control neuromuscular en aterrizaje de salto (landing mechanics)', level: 'Avanzado',
    tempo: { down: 1.7, pause: 1.2, up: 1.6 }, rest: 0.8,
    phaseNames: { BAJADA: 'SALTO Y ATERRIZAJE', PAUSA: 'ESTABILIZA', SUBIDA: 'SUBIDA', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: { tz: 0.0, dist: 5.3, ty: 1.12, tyLow: 1.0 },
    cfg: { arms: 'forward', stance: 0.15, toeOut: 10, hipBottom: 0.62, leanTop: 2, leanBot: 34, kneeOut: 0.08, free: { type: 'landing', depth: 1, cm: 0.55, height: 0.22 } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta y aterriza suave sobre la parte delantera del pie', 'Amortigua flexionando cadera y rodillas'],
        ['Al caer, las rodillas no se van hacia dentro', 'Mantén 2 s la posición de aterrizaje'],
        ['Aterrizaje silencioso y estable', 'Pecho al frente y peso repartido en los dos pies'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TI-PRE-010': {
    ...PRE, ...ST1, primary: ['Glúteo medio'], name: 'Abducción de cadera de pie con banda', level: 'Avanzado',
    phaseNames: { BAJADA: 'ABDUCCIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'PIERNA AFUERA',
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 3, leanT: 5, hands: 'hips', flexB: 2, kneeB: 4, flexT: 2, kneeT: 4, plantB: 10, plantT: 10, abdB: 0, abdT: 32, cable: [0.07, 0.13, 0.0], cableBand: true } },
    captions: {
      intro: 'Banda alrededor de los tobillos, de pie sobre una pierna',
      reps: [
        ['Lleva la pierna hacia fuera contra la banda', 'Vuelve en 2 s controlando'],
        ['Tronco erguido: no te inclines hacia el lado contrario', 'La punta del pie mira al frente'],
        ['El movimiento sale de la cadera, no de la cintura', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Pierna afuera', 'Abducción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-UNI-001': {
    ...UNI, family: 'squat', name: 'Sentadilla a una pierna asistida (regresión de pistol)', level: 'Principiante', tempo: { down: 3, pause: 1, up: 2 },
    frame: { tz: -0.05, dist: 4.8, ty: 0.95, tyLow: 0.75 }, views: { f34: { az: -45 } },
    cfg: { single: 'L', stance: 0.06, pelvisX: 0.03, toeOut: 6, hipBottom: 0.50, leanTop: 4, leanBot: 40, kneeOut: 0.03, arms: 'forward', freeExtTop: -30, freeExtBot: -118, freeFlexTop: 12, freeFlexBot: 6,
      items: [{ kind: 'box', h: 0.42, w: 0.50, d: 0.40, z: -0.42 }] },
    captions: {
      intro: 'De pie sobre una pierna delante de un cajón, la otra estirada al frente',
      reps: [
        ['Baja en 3 s hasta sentarte suave en el cajón', 'Sube en 2 s empujando con el pie de apoyo'],
        ['Brazos al frente como contrapeso', 'La rodilla de apoyo sigue la línea del pie'],
        ['No te dejes caer: toca el cajón y sube', 'Baja la altura del cajón para progresar'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube con una sola pierna'],
    },
  },
  'TI-UNI-002': {
    ...UNI, family: 'squat', name: 'Zancada estática a una pierna con apoyo', level: 'Principiante', tempo: { down: 3, pause: 1, up: 2 },
    frame: { tz: -0.10, dist: 4.7, ty: 0.95, distLow: 4.0, tyLow: 0.70 },
    cfg: { ...SPLCFG, arms: 'hang', hold: 'db1', loadSide: 'R', gripX: 0.235, split: SPLIT_FLOOR },
    captions: {
      intro: 'Posición de zancada con una mancuerna en la mano del lado de la pierna trasera',
      reps: [
        ['Baja en 3 s en línea recta, sin dar pasos', 'Sube en 2 s empujando con el pie delantero'],
        ['La mano libre puede apoyarse en una pared o un soporte', 'Tronco erguido y core firme'],
        ['Rodilla delantera alineada con el pie', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube con la pierna delantera'],
    },
  },
  'TI-UNI-003': {
    ...UNI, family: 'squat', sub: 'Trabajo unilateral', primary: ['Isquiotibiales', 'Glúteos'], name: 'Peso muerto rumano a una pierna con mancuerna', level: 'Principiante',
    tempo: { down: 3, pause: 0.5, up: 2 }, frame: { tz: -0.05, dist: 4.8 },
    cfg: { ...HCFG, ...SINGLE, arms: 'hang', hold: 'db1', loadSide: 'L', gripX: 0.12, leanBot: 70, hipBottom: 0.90 },
    captions: {
      intro: 'De pie sobre la pierna derecha, mancuerna en la mano izquierda',
      reps: [
        ['Inclina el tronco en 3 s mientras la pierna libre sube atrás', 'Sube en 2 s apretando el glúteo de apoyo'],
        ['Cadera cuadrada: no la abras hacia el lado de la pierna libre', 'La mancuerna baja cerca de la pierna'],
        ['Espalda neutra y rodilla de apoyo desbloqueada', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Inclina controlando', 'Posición baja: músculos que trabajan', 'Sube apretando el glúteo'],
    },
  },
  'TI-UNI-004': {
    ...STU, ...UNI, family: 'free', name: 'Step up unilateral con carga', level: 'Intermedio',
    cfg: { ...SCFG, free: FRONT, stepBox: { x: 0, z: 0.49, h: 0.35 }, arms: 'hang', hold: 'dbside', gripX: 0.235 },
    captions: {
      intro: 'Una mancuerna en cada mano y un pie sobre el cajón',
      reps: [
        ['Sube empujando solo con la pierna de arriba', 'Baja en 2 s controlando con la misma pierna'],
        ['El pie de abajo no se impulsa', 'Rodilla alineada con la punta del pie'],
        ['Tronco erguido y mancuernas colgando a los lados', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Sube con una pierna', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-UNI-005': {
    ...UNI, ...PRESS_FR, family: 'free', name: 'Prensa unilateral en máquina', level: 'Intermedio', tempo: { down: 2.5, pause: 0.5, up: 2 },
    cfg: { free: { type: 'legPress', single: 'L', seatY: 0.42, recline: 48, legAng: 42, dTop: 0.86, dBot: 0.52 }, items: PRESS_ITEMS },
    captions: {
      intro: 'En la prensa con un solo pie en el centro de la plataforma',
      reps: [
        ['Baja la plataforma en 2–3 s flexionando la rodilla', 'Empuja con todo el pie hasta casi extender'],
        ['La rodilla sigue la línea del pie', 'Espalda y cadera pegadas al respaldo'],
        ['No bloquees la rodilla arriba', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja con todo el pie'],
    },
  },
});
