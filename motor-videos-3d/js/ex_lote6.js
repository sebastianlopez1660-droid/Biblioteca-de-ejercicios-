// Lote 6: TI-ZAN-009, TI-ZAN-010 y subidas al cajón TI-STU-001 … TI-STU-008
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';

GROUPS['Gastrocnemio'] = ['gastrocnemio'];
ANCHORS['Gastrocnemio'] = [
  { seg: 'shin_L', p: [0.0, -0.12, -0.055], n: [0.2, 0, -1] },
  { seg: 'shin_R', p: [0.0, -0.12, -0.055], n: [-0.2, 0, -1] },
];

const ZAN = { family: 'squat', sub: 'Zancadas', primary: ['Cuádriceps'], secondary: ['Glúteos', 'Isquiotibiales', 'Aductores'] };
const STU = {
  family: 'free', sub: 'Step ups', primary: ['Cuádriceps'], secondary: ['Glúteos', 'Isquiotibiales'], tempo: { down: 2, pause: 0, up: 2 },
  phaseNames: { BAJADA: 'SUBIDA', SUBIDA: 'BAJADA', ARRIBA: 'ABAJO' }, holdLabel: 'ARRIBA',
  frame: { dist: 5.4, ty: 1.2, distLow: 4.9, tyLow: 1.28, tz: 0.22 },
};
const BOX = { x: 0, z: 0.49, h: 0.35 };
const FRONT = { type: 'stepUp', lead: 'L', h: 0.35, leadA: [0.10, 0.36], trailB: [-0.10, 0.0], trailT: [-0.10, 0.36], pB: [0.0, 0.08], pT: [0.0, 0.37], leanB: 16, leanT: 2 };
const SCFG = { stance: 0.10, toeOut: 6, kneeOut: 0.04 };
const ORB_UP = ['Sube hasta quedar de pie sobre el cajón', 'Arriba: músculos que trabajan', 'Baja controlando con la pierna de arriba'];

Object.assign(EXERCISES, {
  'TI-ZAN-009': {
    ...ZAN, name: 'Zancada con rotación de tronco', level: 'Avanzado', tempo: { down: 2, pause: 1, up: 2 },
    secondary: ['Glúteos', 'Isquiotibiales', 'Aductores', 'Core'], frame: { tz: -0.22, dist: 4.7, distLow: 3.9, tyLow: 0.62 },
    cfg: { stance: 0.10, toeOut: 6, leanTop: 2, leanBot: 6, chestExt: 2, neckK: 0.3, kneeOut: 0.04, arms: 'clasp', twist: 38,
      lunge: { zF: 0.30, zR: -0.58, pz: -0.05, yBot: 0.535, pTop: 35, pBot: 62, type: 'fwd', mover: 'L' } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos juntas frente al pecho',
      reps: [
        ['Paso largo al frente, baja y gira el tronco hacia la pierna delantera', 'Vuelve al centro y empuja para regresar'],
        ['Gira desde el tronco: la cadera sigue mirando al frente', 'Rodilla delantera estable, alineada con el pie'],
        ['Exhala durante el giro y mantén el core firme', 'Giro lento y controlado, sin impulso'],
      ],
      orbit: ['Paso al frente, baja y gira', 'Posición baja con giro: músculos que trabajan', 'Vuelve al centro y regresa'],
    },
  },
  'TI-ZAN-010': {
    ...ZAN, name: 'Zancada con salto (versión pliométrica)', level: 'Avanzado', tempo: { down: 1, pause: 0, up: 0.6 }, rest: 1.0, shortCaps: true, upLabel: 'SALTO',
    frame: { tz: -0.10, dist: 4.6, distLow: 3.9, tyLow: 0.62 },
    cfg: { stance: 0.10, toeOut: 6, leanTop: 2, leanBot: 6, chestExt: 2, neckK: 0.3, kneeOut: 0.04, arms: 'hips',
      split: { front: 'L', rear: 'R', mode: 'floor', zF: 0.30, zR: -0.58, pTop: 35, pBot: 62, pz: -0.05, yBot: 0.535, jump: true } },
    captions: {
      intro: 'Posición de zancada con manos en la cadera y tronco erguido',
      reps: [
        ['Baja y salta con fuerza: cambia de pierna en el aire'],
        ['Aterriza suave sobre la parte media del pie y absorbe bajando'],
        ['Rodilla delantera alineada con el pie al caer'],
      ],
      orbit: ['Baja absorbiendo la caída', 'Posición baja: músculos que trabajan', 'Salta de nuevo y cambia de pierna'],
    },
  },
  'TI-STU-001': {
    ...STU, name: 'Step up frontal', level: 'Principiante',
    cfg: { ...SCFG, free: FRONT, stepBox: BOX, arms: 'hips' },
    captions: {
      intro: 'Frente al cajón con un pie apoyado completo encima',
      reps: [
        ['Sube empujando con el talón del pie de arriba', 'Baja controlando con la misma pierna'],
        ['El pie de abajo solo acompaña: no te impulses con él', 'Tronco ligeramente inclinado y espalda neutra'],
        ['Rodilla alineada con la punta del pie', 'Extiende cadera y rodilla arriba sin bloquear de golpe'],
      ],
      orbit: ORB_UP,
    },
  },
  'TI-STU-002': {
    ...STU, name: 'Step up lateral', level: 'Principiante', secondary: ['Glúteos', 'Isquiotibiales', 'Aductores'],
    frame: { dist: 5.4, ty: 1.2, distLow: 4.9, tyLow: 1.28, tz: 0.0 },
    cfg: { ...SCFG, stepBox: { x: -0.20, z: 0.0, h: 0.35 }, arms: 'hips',
      free: { type: 'stepUp', lead: 'R', h: 0.35, leadA: [-0.27, -0.04], trailB: [0.37, -0.04], trailT: [-0.07, -0.04], pB: [0.15, -0.02], pT: [-0.17, 0.0], leanB: 12, leanT: 2, maxPitch: 22 } },
    captions: {
      intro: 'De lado al cajón, con el pie cercano apoyado encima',
      reps: [
        ['Sube de lado empujando con la pierna de arriba', 'Baja de lado controlando el descenso'],
        ['La pierna de abajo no empuja: solo acompaña', 'Cadera y hombros mirando al frente'],
        ['Rodilla alineada con la punta del pie', 'Trabaja también el glúteo medio de la pierna de arriba'],
      ],
      orbit: ORB_UP,
    },
  },
  'TI-STU-003': {
    ...STU, name: 'Step up con rodilla al pecho', level: 'Principiante', secondary: ['Glúteos', 'Isquiotibiales', 'Core'],
    tempo: { down: 2, pause: 1, up: 2 },
    cfg: { ...SCFG, free: { ...FRONT, knee: true, pT: [0.0, 0.33], lift: 0.45 }, stepBox: BOX, arms: 'hips' },
    captions: {
      intro: 'Frente al cajón con un pie apoyado completo encima',
      reps: [
        ['Sube y lleva la otra rodilla hacia el pecho', 'Baja la pierna libre y vuelve abajo controlando'],
        ['Mantén el equilibrio un instante arriba', 'Tronco erguido y core activo'],
        ['Rodilla de apoyo alineada con la punta del pie', 'Empuja con el talón del pie de arriba'],
      ],
      orbit: ['Sube y eleva la rodilla', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-STU-004': {
    ...STU, name: 'Step up con mancuernas', level: 'Intermedio',
    cfg: { ...SCFG, free: FRONT, stepBox: BOX, arms: 'hang', hold: 'dbside', gripX: 0.235 },
    captions: {
      intro: 'Una mancuerna en cada mano y un pie apoyado sobre el cajón',
      reps: [
        ['Sube empujando con el talón del pie de arriba', 'Baja controlando con la misma pierna'],
        ['Brazos relajados: las mancuernas cuelgan a los lados', 'Hombros atrás y espalda neutra'],
        ['Rodilla alineada con la punta del pie', 'El pie de abajo no se impulsa'],
      ],
      orbit: ORB_UP,
    },
  },
  'TI-STU-005': {
    ...STU, name: 'Step up con barra', level: 'Intermedio', secondary: ['Glúteos', 'Isquiotibiales', 'Core'],
    views: { side: { az: -64, el: 8 } },
    cfg: { ...SCFG, free: { ...FRONT, leanB: 10 }, stepBox: BOX, arms: 'bar_high' },
    captions: {
      intro: 'Barra sobre el trapecio y un pie apoyado sobre el cajón',
      reps: [
        ['Sube empujando con el talón del pie de arriba', 'Baja controlando con la misma pierna'],
        ['Tronco erguido: la barra sube y baja en vertical', 'Codos abajo y escápulas juntas'],
        ['Rodilla alineada con la punta del pie', 'Cajón bajo: con carga, prioriza la estabilidad'],
      ],
      orbit: ORB_UP,
    },
  },
  'TI-STU-006': {
    ...STU, name: 'Step up con salto', level: 'Intermedio', tempo: { down: 0.9, pause: 0.3, up: 1.6 }, rest: 0.9, shortCaps: true,
    cfg: { ...SCFG, free: { ...FRONT, hop: true, lift: 0.45 }, stepBox: BOX, arms: 'hips' },
    captions: {
      intro: 'Frente al cajón con un pie apoyado completo encima',
      reps: [
        ['Empuja fuerte con la pierna de arriba y despega'],
        ['Aterriza suave sobre el cajón con las rodillas flexionadas'],
        ['Baja controlando y repite con la misma pierna'],
      ],
      orbit: ['Empuja y salta', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-STU-007': {
    ...STU, name: 'Step up cruzado', level: 'Avanzado', secondary: ['Glúteos', 'Isquiotibiales', 'Aductores'],
    frame: { dist: 5.4, ty: 1.2, distLow: 4.9, tyLow: 1.28, tz: 0.02 },
    cfg: { ...SCFG, stepBox: { x: -0.25, z: 0.05, h: 0.35 }, arms: 'hips',
      free: { type: 'stepUp', lead: 'L', h: 0.35, leadA: [-0.12, 0.08], trailB: [0.20, 0.0], trailT: [-0.38, 0.06], pB: [0.06, 0.02], pT: [-0.25, 0.06], leanB: 12, leanT: 2, yaw: -22, toeOut: -10, maxPitch: 26 } },
    captions: {
      intro: 'De lado al cajón: la pierna lejana cruza por delante y apoya el pie encima',
      reps: [
        ['Sube empujando con la pierna que cruzó', 'Baja controlando y vuelve a cruzar'],
        ['La cadera gira un poco al cruzar y se cuadra al subir', 'Tronco erguido y core activo'],
        ['Rodilla alineada con la punta del pie', 'Trabaja el glúteo medio y los aductores'],
      ],
      orbit: ORB_UP,
    },
  },
  'TI-STU-008': {
    ...STU, name: 'Step up excéntrico controlado', level: 'Avanzado', tempo: { down: 1.5, pause: 0, up: 4 },
    cfg: { ...SCFG, free: FRONT, stepBox: BOX, arms: 'hips' },
    captions: {
      intro: 'Frente al cajón con un pie apoyado completo encima',
      reps: [
        ['Sube con decisión empujando con el talón', 'Baja en 4 s: la pierna de arriba frena todo el descenso'],
        ['El pie de abajo toca el suelo suave, sin dejarse caer', 'Tronco ligeramente inclinado y espalda neutra'],
        ['Rodilla alineada con la punta del pie', 'La fase lenta de bajada es la que más fuerza construye'],
      ],
      orbit: ['Sube con decisión', 'Arriba: músculos que trabajan', 'Baja en 4 s controlando'],
    },
  },
});
