// Lote 8: TI-HIP-009, TI-HIP-010 y puentes de glúteo TI-PUE-001 … TI-PUE-008
import { EXERCISES } from './exercises.js';
import { SUP_VIEWS, BRIDGE_NAMES, HT } from './ex_lote7.js';

const HIP = {
  family: 'free', sub: 'Hip thrust', primary: ['Glúteos'], secondary: ['Isquiotibiales', 'Core'], tempo: { down: 1, pause: 1, up: 1 },
  phaseNames: BRIDGE_NAMES, holdLabel: 'ARRIBA', views: SUP_VIEWS, labelAll: true,
  frame: { dist: 4.3, ty: 0.46, tz: 0.28, distLow: 3.75, tyLow: 0.48 },
};
const HT_ITEMS = [{ kind: 'benchX', z: -0.15 }];
export const PUE = {
  family: 'free', sub: 'Puente de glúteo', primary: ['Glúteos'], secondary: ['Isquiotibiales', 'Core'], tempo: { down: 2, pause: 1, up: 2 },
  phaseNames: BRIDGE_NAMES, holdLabel: 'ARRIBA', views: SUP_VIEWS, labelAll: true,
  frame: { dist: 4.2, ty: 0.30, tz: 0.30, distLow: 3.6, tyLow: 0.30 },
};
export const BR = { type: 'supine', contact: [0, 1.36, -0.112], at: [0, 0.004, 0.0], thB: 1, thT: -26, neckB: 4, neckT: 12, arms: 'floor', kneeOut: 0.06, feetW: 0.13, toeOut: 6, footDz: 0.12 };
export const MAT = [{ kind: 'mat', z: 0.32, l: 1.9 }];
const ORB = ['Sube la cadera hasta alinear hombros, cadera y rodillas', 'Arriba: músculos que trabajan', 'Baja vértebra a vértebra'];

Object.assign(EXERCISES, {
  'TI-HIP-009': {
    ...HIP, name: 'Hip thrust en rango parcial (pin press)', level: 'Avanzado', tempo: { down: 0.8, pause: 1, up: 0.8 },
    cfg: { free: { ...HT, arms: 'bar', sMin: 0.45 }, items: [...HT_ITEMS, { kind: 'rackPins', zBar: true }] },
    captions: {
      intro: 'La barra parte apoyada en los topes, a media altura del recorrido',
      reps: [
        ['Empuja la barra desde los topes hasta la extensión de cadera'],
        ['Rango corto: trabajas la parte alta, donde el glúteo es más fuerte'],
        ['Baja hasta apoyar en los topes sin rebotar'],
      ],
      orbit: ['Sube desde los topes', 'Arriba: músculos que trabajan', 'Baja hasta los topes'],
    },
  },
  'TI-HIP-010': {
    ...HIP, name: 'Hip thrust con banda alrededor de rodillas', level: 'Avanzado', secondary: ['Isquiotibiales', 'Core'],
    cfg: { free: { ...HT, kneeBand: true, kneeOut: 0.16, feetW: 0.16 }, items: HT_ITEMS },
    captions: {
      intro: 'Mini banda por encima de las rodillas y espalda alta en el banco',
      reps: [
        ['Sube la cadera empujando las rodillas hacia afuera contra la banda'],
        ['La banda activa el glúteo medio: rodillas en la línea de los pies'],
        ['Arriba aprieta glúteos 1 s sin que las rodillas se cierren'],
      ],
      orbit: ORB_HT_K(),
    },
  },
  'TI-PUE-001': {
    ...PUE, name: 'Puente de glúteo básico', level: 'Principiante',
    cfg: { free: BR, items: MAT },
    captions: {
      intro: 'Boca arriba, rodillas flexionadas, pies apoyados y brazos a los lados',
      reps: [
        ['Empuja con los talones y sube la cadera en 2 s', 'Baja en 2 s hasta apoyar la cadera'],
        ['Aprieta glúteos 1 s arriba', 'Costillas abajo: no arquees la zona lumbar'],
        ['Rodillas alineadas con los pies', 'Los brazos apoyan pero no empujan'],
      ],
      orbit: ORB,
    },
  },
  'TI-PUE-002': {
    ...PUE, name: 'Puente de glúteo a una pierna', level: 'Principiante',
    cfg: { free: { ...BR, single: 'L', feetW: 0.10 }, items: MAT },
    captions: {
      intro: 'Boca arriba con un pie apoyado y la otra pierna estirada',
      reps: [
        ['Empuja con el talón de apoyo y sube la cadera', 'Baja controlando'],
        ['La pierna libre sigue la línea del muslo', 'La pelvis sube nivelada, sin rotar'],
        ['Aprieta el glúteo de apoyo arriba', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ORB,
    },
  },
  'TI-PUE-003': {
    ...PUE, name: 'Puente de glúteo con marcha (marching bridge)', level: 'Principiante', secondary: ['Isquiotibiales', 'Core'],
    tempo: { down: 2, pause: 2, up: 2 },
    cfg: { free: { ...BR, march: true }, items: MAT },
    captions: {
      intro: 'Boca arriba, rodillas flexionadas y pies apoyados',
      reps: [
        ['Sube la cadera y, arriba, lleva una rodilla al pecho', 'Apoya el pie y baja la cadera'],
        ['La cadera no cae al levantar el pie', 'Core firme: pelvis nivelada'],
        ['Alterna la pierna en cada repetición', 'Movimiento lento y controlado'],
      ],
      orbit: ['Sube la cadera', 'Marcha arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-PUE-004': {
    ...PUE, name: 'Puente de glúteo con banda', level: 'Intermedio',
    cfg: { free: { ...BR, kneeBand: true, kneeOut: 0.16, feetW: 0.15 }, items: MAT },
    captions: {
      intro: 'Mini banda por encima de las rodillas, boca arriba y pies apoyados',
      reps: [
        ['Sube la cadera empujando las rodillas hacia afuera', 'Baja sin que las rodillas se junten'],
        ['La banda activa el glúteo medio', 'Rodillas alineadas con los pies'],
        ['Aprieta glúteos 1 s arriba', 'Costillas abajo durante todo el recorrido'],
      ],
      orbit: ORB,
    },
  },
  'TI-PUE-005': {
    ...PUE, name: 'Puente de glúteo con pausa isométrica', level: 'Intermedio', tempo: { down: 2, pause: 3, up: 2 },
    cfg: { free: BR, items: MAT },
    captions: {
      intro: 'Boca arriba, rodillas flexionadas y pies apoyados',
      reps: [
        ['Sube en 2 s y mantén 3 s arriba', 'Baja en 2 s'],
        ['En la pausa, la cadera no cae', 'Glúteos apretados durante toda la pausa'],
        ['Respira de forma continua durante la pausa', 'Costillas abajo y core activo'],
      ],
      orbit: ['Sube y mantén', 'Pausa arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-PUE-006': {
    ...PUE, name: 'Puente de glúteo con piernas alternas', level: 'Intermedio',
    cfg: { free: { ...BR, alternate: true, feetW: 0.10 }, items: MAT },
    captions: {
      intro: 'Boca arriba: en cada repetición se estira una pierna distinta',
      reps: [
        ['Pierna izquierda estirada: sube con el talón derecho', 'Baja controlando'],
        ['Cambia: estira la otra pierna y sube', 'La pelvis sube nivelada'],
        ['Alterna en cada repetición', 'Aprieta el glúteo de apoyo arriba'],
      ],
      orbit: ORB,
    },
  },
  'TI-PUE-007': {
    ...PUE, name: 'Puente de hombros con isquiotibiales en balón suizo', level: 'Avanzado', secondary: ['Isquiotibiales', 'Core'],
    frame: { dist: 4.4, ty: 0.38, tz: 0.42, distLow: 3.8, tyLow: 0.40 },
    cfg: { free: { ...BR, thT: -20, feetW: 0.09, ball: { r: 0.32, z: 1.15 } }, items: MAT },
    captions: {
      intro: 'Boca arriba con los talones sobre el balón y piernas casi estiradas',
      reps: [
        ['Presiona el balón con los talones y sube la cadera', 'Baja controlando'],
        ['El balón no debe moverse: controla con los isquiotibiales', 'Cuerpo en línea de hombros a talones'],
        ['Brazos apoyados para estabilizar', 'Aprieta glúteos arriba'],
      ],
      orbit: ['Sube la cadera', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-PUE-008': {
    ...PUE, name: 'Puente con curl femoral en balón suizo', level: 'Avanzado', secondary: ['Isquiotibiales', 'Core'], primary: ['Glúteos', 'Isquiotibiales'],
    tempo: { down: 3, pause: 1, up: 3 },
    frame: { dist: 4.4, ty: 0.38, tz: 0.40, distLow: 3.8, tyLow: 0.40 },
    cfg: { free: { ...BR, thT: -20, thCurl: -8, feetW: 0.09, split: 0.4, ball: { r: 0.32, z: 1.15, roll: 0.42 } }, items: MAT },
    captions: {
      intro: 'Boca arriba con los talones sobre el balón',
      reps: [
        ['Sube la cadera y acerca el balón flexionando las rodillas', 'Estira las piernas y baja la cadera'],
        ['La cadera se mantiene alta mientras flexionas', 'Talones presionando el balón'],
        ['Movimiento controlado, sin tirones', 'Core firme durante todo el recorrido'],
      ],
      orbit: ['Sube y flexiona', 'Posición final: músculos que trabajan', 'Estira y baja'],
    },
  },
});
function ORB_HT_K() { return ['Sube empujando las rodillas hacia afuera', 'Arriba: músculos que trabajan', 'Baja controlando']; }
