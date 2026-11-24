// Lote 7: TI-STU-009, TI-STU-010 y hip thrust TI-HIP-001 … TI-HIP-008
import { EXERCISES } from './exercises.js';

const STU = {
  family: 'free', sub: 'Step ups', primary: ['Cuádriceps'], secondary: ['Glúteos', 'Isquiotibiales'], tempo: { down: 2, pause: 0, up: 2 },
  phaseNames: { BAJADA: 'SUBIDA', SUBIDA: 'BAJADA', ARRIBA: 'ABAJO' }, holdLabel: 'ARRIBA',
};
export const SUP_VIEWS = { f34: { el: 16 }, side: { el: 10 }, front: { el: 16 }, back34: { az: 138, el: 24 } };
export const BRIDGE_NAMES = { BAJADA: 'SUBIDA', SUBIDA: 'BAJADA', ARRIBA: 'ABAJO' };
const HIP = {
  family: 'free', sub: 'Hip thrust', primary: ['Glúteos'], secondary: ['Isquiotibiales', 'Core'], tempo: { down: 1, pause: 1, up: 1 },
  phaseNames: BRIDGE_NAMES, holdLabel: 'ARRIBA', views: SUP_VIEWS, labelAll: true,
  frame: { dist: 4.3, ty: 0.46, tz: 0.28, distLow: 3.75, tyLow: 0.48 },
};
export const HT = { type: 'supine', contact: [0, 1.31, -0.105], at: [0, 0.435, 0.0], thB: 30, thT: -3, neckB: 8, neckT: 30, arms: 'bench', kneeOut: 0.07, feetW: 0.15, toeOut: 10 };
const HT_ITEMS = [{ kind: 'benchX', z: -0.15 }];
const ORB_HT = ['Sube hasta alinear hombros, cadera y rodillas', 'Arriba: músculos que trabajan', 'Baja controlando hasta casi tocar el suelo'];

Object.assign(EXERCISES, {
  'TI-STU-009': {
    ...STU, name: 'Step up en banco alto', level: 'Avanzado', tempo: { down: 2.2, pause: 0, up: 2.2 },
    frame: { dist: 5.9, ty: 1.32, distLow: 5.3, tyLow: 1.42, tz: 0.22 },
    cfg: { stance: 0.10, toeOut: 6, kneeOut: 0.04, stepBox: { x: 0, z: 0.49, h: 0.60 }, arms: 'hips',
      free: { type: 'stepUp', lead: 'L', h: 0.60, leadA: [0.10, 0.36], trailB: [-0.10, -0.02], trailT: [-0.10, 0.36], pB: [0.0, 0.10], pT: [0.0, 0.37], leanB: 28, leanT: 2, trailBend: 0.02, maxPitch: 45, lift: 0.55 } },
    captions: {
      intro: 'Frente a un banco o cajón alto, con un pie apoyado completo encima',
      reps: [
        ['Inclina el tronco y sube empujando con el talón de arriba', 'Baja controlando con la misma pierna'],
        ['Más altura = más trabajo de glúteo y más rango de rodilla', 'No te impulses con el pie de abajo'],
        ['Rodilla alineada con la punta del pie', 'Espalda neutra durante la inclinación'],
      ],
      orbit: ['Sube hasta quedar de pie sobre el banco', 'Arriba: músculos que trabajan', 'Baja controlando con la pierna de arriba'],
    },
  },
  'TI-STU-010': {
    family: 'free', sub: 'Step ups', primary: ['Cuádriceps'], secondary: ['Glúteos', 'Isquiotibiales'], name: 'Step down controlado (excéntrico)', level: 'Avanzado',
    tempo: { down: 3, pause: 0.5, up: 2 },
    frame: { dist: 5.3, ty: 1.15, distLow: 4.7, tyLow: 1.05, tz: 0.08 },
    cfg: { stance: 0.10, toeOut: 6, kneeOut: 0.04, stepBox: { x: 0.02, z: -0.08, h: 0.30 }, arms: 'forward',
      free: { type: 'stepDown', stance: 'L', h: 0.30, tapZ: 0.34, leanB: 24, pzB: -0.10 } },
    captions: {
      intro: 'De pie sobre el cajón con una pierna; la otra queda libre al frente',
      reps: [
        ['Baja en 3 s flexionando la pierna de apoyo', 'Toca el suelo con el talón y sube sin apoyar peso'],
        ['La rodilla de apoyo sigue la línea del pie, sin irse hacia adentro', 'Cadera atrás y tronco algo inclinado'],
        ['La pierna libre solo toca: todo el peso sigue arriba', 'Pelvis nivelada, sin dejar caer un lado'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube empujando con la pierna de apoyo'],
    },
  },
  'TI-HIP-001': {
    ...HIP, name: 'Hip thrust con peso corporal', level: 'Principiante',
    cfg: { free: HT, items: HT_ITEMS },
    captions: {
      intro: 'Espalda alta apoyada en el borde del banco, pies firmes y rodillas flexionadas',
      reps: [
        ['Empuja con los talones y sube la cadera hasta alinear el cuerpo'],
        ['Arriba aprieta glúteos 1 s con la barbilla recogida'],
        ['Costillas abajo: sube con la cadera, no arqueando la zona lumbar'],
      ],
      orbit: ORB_HT,
    },
  },
  'TI-HIP-002': {
    ...HIP, name: 'Hip thrust con barra', level: 'Principiante',
    cfg: { free: { ...HT, arms: 'bar' }, items: HT_ITEMS },
    captions: {
      intro: 'Barra sobre el pliegue de la cadera, idealmente con almohadilla',
      reps: [
        ['Empuja con los talones y sube la barra en vertical'],
        ['Arriba: espinillas verticales y glúteos apretados 1 s'],
        ['Barbilla recogida y costillas abajo durante todo el recorrido'],
      ],
      orbit: ORB_HT,
    },
  },
  'TI-HIP-003': {
    ...HIP, name: 'Hip thrust a una pierna', level: 'Principiante',
    cfg: { free: { ...HT, single: 'L', freeLeg: 'bent' }, items: HT_ITEMS },
    captions: {
      intro: 'Espalda alta en el banco, un pie apoyado y la otra rodilla recogida',
      reps: [
        ['Empuja con el talón de apoyo y sube la cadera'],
        ['La pelvis sube nivelada, sin girar hacia un lado'],
        ['Aprieta el glúteo de la pierna de apoyo 1 s arriba'],
      ],
      orbit: ORB_HT,
    },
  },
  'TI-HIP-004': {
    ...HIP, name: 'Hip thrust con banda', level: 'Intermedio',
    cfg: { free: { ...HT, hipBand: { z: 0.48 } }, items: HT_ITEMS },
    captions: {
      intro: 'Banda sobre la cadera, anclada al suelo a ambos lados',
      reps: [
        ['Empuja con los talones contra la tensión de la banda'],
        ['La banda resiste más arriba: aprieta glúteos 1 s'],
        ['Baja controlando, sin dejar que la banda te tire'],
      ],
      orbit: ORB_HT,
    },
  },
  'TI-HIP-005': {
    ...HIP, name: 'Hip thrust con pausa isométrica', level: 'Intermedio', tempo: { down: 1, pause: 3, up: 1 },
    cfg: { free: HT, items: HT_ITEMS },
    captions: {
      intro: 'Espalda alta apoyada en el banco y pies firmes',
      reps: [
        ['Sube y sostén 3 s arriba con los glúteos apretados'],
        ['En la pausa, la cadera no cae: cuerpo alineado'],
        ['Barbilla recogida y costillas abajo durante la pausa'],
      ],
      orbit: ['Sube y mantén', 'Pausa arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-HIP-006': {
    ...HIP, name: 'Hip thrust con pies elevados', level: 'Intermedio',
    cfg: { free: { ...HT, arms: 'bar', footY: 0.30, thT: -8, shinK: 0.9 }, items: [...HT_ITEMS, { kind: 'box', h: 0.30, w: 0.6, d: 0.42, zFoot: true, dz: 0.04 }] },
    captions: {
      intro: 'Espalda alta en el banco y pies sobre un cajón bajo',
      reps: [
        ['Empuja con los talones sobre el cajón y sube la cadera'],
        ['Mayor rango: la cadera baja más que con los pies en el suelo'],
        ['Aprieta glúteos arriba 1 s sin arquear la zona lumbar'],
      ],
      orbit: ORB_HT,
    },
  },
  'TI-HIP-007': {
    ...HIP, name: 'Hip thrust con pies en superficie inestable', level: 'Avanzado', secondary: ['Isquiotibiales', 'Core', 'Aductores'],
    cfg: { free: { ...HT, footY: 0.065, wobble: true }, items: [...HT_ITEMS, { kind: 'pad', zFoot: true, dz: 0.04 }] },
    captions: {
      intro: 'Espalda alta en el banco y pies sobre una superficie inestable',
      reps: [
        ['Sube la cadera manteniendo los pies firmes sobre la base'],
        ['Las rodillas buscan estabilidad: contrólalas en la línea de los pies'],
        ['Core activo arriba durante 1 s'],
      ],
      orbit: ORB_HT,
    },
  },
  'TI-HIP-008': {
    ...HIP, name: 'Hip thrust con mancuerna', level: 'Avanzado',
    cfg: { free: { ...HT, arms: 'db' }, items: HT_ITEMS },
    captions: {
      intro: 'Mancuerna sobre la cadera, sujeta con las dos manos',
      reps: [
        ['Empuja con los talones y sube la cadera con la mancuerna estable'],
        ['Arriba aprieta glúteos 1 s con la barbilla recogida'],
        ['Baja controlando sin que la mancuerna ruede'],
      ],
      orbit: ORB_HT,
    },
  },
});
