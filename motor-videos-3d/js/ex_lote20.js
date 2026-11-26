// Lote 20: movilidad TI-MOV-006 … 010 y activación TI-ACT-001 … 005
import { EXERCISES } from './exercises.js';
import { PUE, BR, MAT } from './ex_lote8.js';
import { WALK } from './ex_lote12.js';
import { SIDE_VIEWS, CLAM_NAMES } from './ex_lote15.js';

const MOV = { family: 'free', sub: 'Movilidad', primary: ['Movilidad de cadera'], secondary: ['Core'], tempo: { down: 2.5, pause: 1, up: 2.5 } };
const ACT = { sub: 'Activación', secondary: ['Core'] };

Object.assign(EXERCISES, {
  'TI-MOV-006': {
    ...MOV, primary: ['Glúteo medio', 'Movilidad de cadera'], name: 'Movilidad de cadera en cuadrupedia (fire hydrant dinámico)', level: 'Intermedio',
    tempo: { down: 1.8, pause: 0.6, up: 1.8 }, labelAll: true,
    phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'CIERRE', ARRIBA: 'INICIO' }, holdLabel: 'APERTURA MÁXIMA',
    frame: { dist: 4.2, ty: 0.55, tz: 0.0, distLow: 3.8, tyLow: 0.55 }, views: { f34: { az: -35, el: 18 }, side: { az: -75, el: 12 }, front: { az: 0, el: 16 }, back34: { az: 150, el: 26 } },
    cfg: { free: { type: 'quadruped', side: 'R', flexT: 78, kneeT: 90, abdT: 58 }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia: manos bajo los hombros y rodillas bajo las caderas',
      reps: [
        ['Abre la rodilla hacia el lado sin girar el tronco', 'Vuelve en 2 s controlando'],
        ['Espalda neutra: la pelvis no se inclina', 'La rodilla se mantiene doblada a 90°'],
        ['Movimiento fluido y en rango cómodo', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Abre la cadera', 'Apertura máxima: músculos que trabajan', 'Cierra controlando'],
    },
  },
  'TI-MOV-007': {
    ...MOV, family: 'squat', primary: ['Movilidad de cadera'], secondary: ['Gastrocnemio y sóleo', 'Aductores', 'Core'], name: 'Sentadilla profunda de movilidad (deep squat hold)', level: 'Avanzado',
    iso: true, tempo: { down: 2.5, pause: 0, up: 2 }, frame: { tz: 0.0, dist: 4.5, ty: 0.85, tyLow: 0.62 },
    cfg: { arms: 'clasp', stance: 0.19, toeOut: 22, hipBottom: 0.30, leanTop: 3, leanBot: 30, kneeOut: 0.10 },
    captions: {
      intro: 'De pie, pies algo más abiertos que la cadera y puntas hacia fuera',
      reps: [
        ['Baja hasta la sentadilla más profunda que controles', 'Talones apoyados y pecho arriba'],
        ['Empuja las rodillas hacia fuera con los codos', 'Mantén 30–60 s respirando tranquilo'],
        ['Puedes balancearte suave de un lado a otro', 'Sube despacio al terminar'],
      ],
      orbit: ['Mantén la posición profunda', 'Sentadilla profunda: músculos que se estiran', 'Respira y relaja'],
    },
  },
  'TI-MOV-008': {
    ...MOV, primary: ['Gastrocnemio y sóleo'], secondary: ['Tibial anterior'], name: 'Movilización de tobillo con banda', level: 'Avanzado',
    tempo: { down: 2, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'RODILLA ADELANTE', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'RODILLA ADELANTE',
    frame: { dist: 4.4, ty: 0.62, tz: 0.0, distLow: 4.0, tyLow: 0.60 }, views: { f34: { az: -60, el: 12 }, side: { az: -90, el: 6 }, front: { az: -30, el: 12 }, back34: { az: -140, el: 18 } },
    cfg: { free: { type: 'kfPose', arms: 'hips', bandAnkle: { side: 'L', anchor: [0.10, 0.13, -0.78] },
      keys: [
        { u: 0, P: [0, 0.54, -0.10], rot: [2, 0, 0], L: [0.11, 0.075, 0.30, 0, 6], kL: [0.1, 0.3, 1], R: [-0.10, 0.10, -0.50, 70, -6], kR: [0, -1, 0.15] },
        { u: 1, P: [0, 0.50, 0.04], rot: [6, 0, 0], L: [0.11, 0.075, 0.30, 0, 6], kL: [0.1, 0, 1], R: [-0.10, 0.10, -0.40, 70, -6], kR: [0, -1, 0.15] }] },
      items: [{ kind: 'mat', z: 0.0, l: 1.4 }, { kind: 'post', h: 0.20, x: 0.10, z: -0.80 }] },
    captions: {
      intro: 'Rodilla trasera apoyada y banda tirando del tobillo delantero hacia atrás',
      reps: [
        ['Lleva la rodilla delantera hacia delante sin despegar el talón', 'Vuelve en 2 s'],
        ['La banda tira del tobillo hacia atrás para que la articulación deslice', 'La rodilla sigue la línea del segundo dedo'],
        ['Mantén 1–2 s adelante', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Rodilla adelante', 'Flexión de tobillo: músculos que se estiran', 'Vuelve controlando'],
    },
  },
  'TI-MOV-009': {
    ...MOV, name: 'Rotación interna/externa de cadera sentado', level: 'Avanzado', labelAll: true,
    tempo: { down: 2.5, pause: 0.5, up: 2.5 }, phaseNames: { BAJADA: 'ROTACIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ROTACIÓN EXTERNA',
    frame: { dist: 4.2, ty: 0.65, tz: 0.2, distLow: 3.8, tyLow: 0.62 }, views: { f34: { az: -25, el: 14 }, side: { az: -60, el: 10 }, front: { az: 0, el: 12 }, back34: { az: 150, el: 22 } },
    cfg: { free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.545, -0.02], rot: [-2, 0, 0], nk: [6, 0], L: [0.12, 0.075, 0.44, 0, 6], kL: [0.1, 0.2, 1], R: [-0.20, 0.075, 0.44, 0, -10], kR: [-0.1, 0.2, 1],
          hL: [0.27, 0.47, 0.02], hR: [-0.27, 0.47, 0.02], eL: [1, 0, -0.3], eR: [-1, 0, -0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 0.45, L: [0.44, 0.17, 0.40, 10, 30], kL: [0, 0.2, 1] },
        { u: 1, L: [-0.02, 0.17, 0.40, 10, -30], kL: [0.15, 0.3, 1] }] },
      items: [{ kind: 'box', h: 0.45, w: 0.70, d: 0.42, z: -0.06 }] },
    captions: {
      intro: 'Sentado al borde del banco, rodillas a 90° y espalda recta',
      reps: [
        ['Lleva el pie hacia fuera girando el muslo hacia dentro', 'Luego llévalo hacia dentro girando el muslo hacia fuera'],
        ['La rodilla queda quieta: el muslo gira sobre su eje', 'Tronco erguido, sin inclinarte'],
        ['Movimiento lento en todo el rango', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TI-MOV-010': {
    ...MOV, ...WALK, name: 'Movilidad dinámica de cadera caminando (walking hip openers)', level: 'Avanzado',
    frame: { dist: 4.8, ty: 0.92, tz: 0.0, distLow: 4.2, tyLow: 0.90 },
    cfg: { free: { type: 'gait', highKnee: true, open: 0.26, armsHips: true, stepLen: 0.42, stepTime: 0.95, lift: 0.12, width: 0.10 } },
    captions: {
      intro: 'De pie, manos en la cintura',
      reps: [
        ['En cada paso sube la rodilla al frente y ábrela hacia fuera', 'Apoya el pie y repite con la otra pierna'],
        ['Tronco erguido: solo se mueve la cadera', 'Círculos amplios y controlados'],
        ['Tramos de 10–15 m', 'Puedes hacerlo también hacia atrás (cerrando)'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Abre la cadera en cada paso'],
    },
  },
  'TI-ACT-001': {
    ...ACT, ...WALK, family: 'free', primary: ['Glúteo medio'], name: 'Marcha lateral con banda (band walk)', level: 'Principiante',
    tempo: { down: 2, pause: 0, up: 2 }, trackX: true, frame: { dist: 5.1, ty: 0.86, tz: 0.0, distLow: 4.6, tyLow: 0.82 },
    cfg: { free: { type: 'gait', lateral: true, kneeBend: 26, lean: 14, width: 0.15, stepLen: 0.28, stepTime: 0.7, lift: 0.04, ankleBand: true, armsHips: true } },
    captions: {
      intro: 'Mini banda en los tobillos, rodillas algo flexionadas',
      reps: [
        ['Da pasos laterales cortos manteniendo la banda tensa', 'Los pies no llegan a juntarse'],
        ['Puntas al frente y rodillas alineadas', 'Cadera a la misma altura en todo el recorrido'],
        ['10–15 pasos por lado', 'Siente el trabajo en la parte lateral de la cadera'],
      ],
      orbit: ['Sigue avanzando de lado', 'En marcha: músculos que trabajan', 'Banda siempre tensa'],
    },
  },
  'TI-ACT-002': {
    ...PUE, ...ACT, primary: ['Glúteos', 'Glúteo medio'], secondary: ['Isquiotibiales', 'Core'], name: 'Puente de glúteo de activación', level: 'Principiante',
    tempo: { down: 1.5, pause: 2, up: 2 },
    cfg: { free: { ...BR, kneeBand: true, kneeOut: 0.16, feetW: 0.15 }, items: MAT },
    captions: {
      intro: 'Boca arriba, pies apoyados y mini banda sobre las rodillas',
      reps: [
        ['Sube la cadera apretando los glúteos', 'Mantén 2 s arriba con las rodillas abiertas'],
        ['Rodillas empujando suave contra la banda', 'Costillas abajo: no arquees la espalda'],
        ['Baja en 2 s', 'Pocas repeticiones y muy conscientes antes del entrenamiento'],
      ],
      orbit: ['Sube y aprieta', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-ACT-003': {
    ...ACT, family: 'free', primary: ['Glúteo medio'], name: 'Clamshell de activación', level: 'Principiante', labelAll: true,
    tempo: { down: 1.5, pause: 2, up: 2 }, phaseNames: CLAM_NAMES, holdLabel: 'APERTURA MÁXIMA', views: SIDE_VIEWS,
    frame: { dist: 3.7, ty: 0.28, tz: 0.0, distLow: 3.3, tyLow: 0.28 },
    cfg: { free: { type: 'sideLying', down: 'L', mode: 'clam', open: 42, kneeBand: true }, items: [{ kind: 'mat', z: 0.0, x: -0.05, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Tumbado de lado, caderas y rodillas flexionadas, mini banda sobre las rodillas',
      reps: [
        ['Abre la rodilla de arriba y mantén 2 s', 'Cierra en 2 s sin soltar la tensión'],
        ['Caderas apiladas: la pelvis no rota hacia atrás', 'Los pies quedan juntos'],
        ['Siente el trabajo en la parte lateral de la cadera', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Abre la rodilla', 'Apertura máxima: músculos que trabajan', 'Cierra controlando'],
    },
  },
  'TI-ACT-004': {
    ...ACT, family: 'free', primary: ['Cuádriceps'], secondary: [], name: 'Extensión terminal de rodilla con banda (activación de cuádriceps)', level: 'Intermedio',
    tempo: { down: 1.5, pause: 2, up: 1.5 }, phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN MÁXIMA',
    frame: { dist: 4.4, ty: 0.85, tz: 0.15, distLow: 3.8, tyLow: 0.70 },
    cfg: { free: { type: 'tke', side: 'L', kneeB: 30, kneeT: 0, anchor: [0.09, 0.44, 0.82] }, items: [{ kind: 'post', h: 0.62, x: 0.09, z: 0.86 }] },
    captions: {
      intro: 'Banda anclada delante a la altura de la rodilla y pasada por detrás de ella',
      reps: [
        ['Estira la rodilla por completo contra la banda', 'Mantén 2 s apretando el cuádriceps'],
        ['Siente sobre todo la parte interna del muslo', 'El pie de apoyo no se mueve'],
        ['Vuelve a flexionar un poco sin soltar la tensión', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Estira la rodilla', 'Extensión máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-ACT-005': {
    ...ACT, family: 'free', primary: ['Isquiotibiales'], secondary: ['Gastrocnemio'], name: 'Activación de isquiotibiales con banda', level: 'Intermedio',
    tempo: { down: 1.5, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'FLEXIÓN', SUBIDA: 'EXTENSIÓN', ARRIBA: 'INICIO' }, holdLabel: 'FLEXIÓN MÁXIMA',
    frame: { dist: 4.6, ty: 0.95, tz: 0.12, distLow: 4.0, tyLow: 0.85 },
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 6, hands: 'grip', handX: 0.22, handY: 1.05, handZ: 0.50, flexB: 0, kneeB: 2, flexT: 6, kneeT: 105, plantB: 5, plantT: -5, cable: [-0.09, 0.15, 0.47], cableBand: true },
      items: [{ kind: 'barre', handY: 1.05, handZ: 0.50, anchorY: 0.15 }] },
    captions: {
      intro: 'De pie frente a un apoyo, banda anclada abajo y sujeta al tobillo',
      reps: [
        ['Lleva el talón hacia el glúteo contra la banda', 'Mantén 1–2 s y baja en 2 s'],
        ['El muslo queda vertical: solo se mueve la rodilla', 'Cadera quieta y tronco estable'],
        ['Contracción suave y consciente', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Talón al glúteo', 'Flexión máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
});
