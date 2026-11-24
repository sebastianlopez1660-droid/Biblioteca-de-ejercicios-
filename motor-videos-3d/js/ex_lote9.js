// Lote 9: TI-PUE-009, TI-PUE-010, patadas de glúteo TI-PAT-001 … 003 y curl femoral TI-CFE-001 … 005
import { EXERCISES } from './exercises.js';
import { SUP_VIEWS } from './ex_lote7.js';
import { PUE, BR, MAT } from './ex_lote8.js';

export const CURL_NAMES = { BAJADA: 'FLEXIÓN', SUBIDA: 'EXTENSIÓN', ARRIBA: 'EXTENDIDA' };
export const CFE = { family: 'free', sub: 'Curl femoral', primary: ['Isquiotibiales'], secondary: ['Glúteos', 'Gastrocnemio'], tempo: { down: 2, pause: 1, up: 2 },
  phaseNames: CURL_NAMES, holdLabel: 'FLEXIÓN MÁXIMA' };
const PAT = { family: 'free', sub: 'Patada de glúteo', primary: ['Glúteos'], secondary: ['Isquiotibiales', 'Core'], tempo: { down: 2, pause: 1, up: 2 },
  phaseNames: { BAJADA: 'PATADA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN MÁXIMA' };
export const NORDIC = { type: 'nordic', maxAng: 68 };
export const SUPCURL = { labelAll: true };
export const BALLCURL = { ...BR, curl: true, thT: -24, thCurl: -4, feetW: 0.09, ball: { r: 0.32, z: 1.17, roll: 0.42 } };

Object.assign(EXERCISES, {
  'TI-PUE-009': {
    ...PUE, name: 'Puente de glúteo con carga en cadera', level: 'Avanzado',
    cfg: { free: { ...BR, arms: 'db' }, items: MAT },
    captions: {
      intro: 'Boca arriba con una carga sobre la cadera, sujeta con las dos manos',
      reps: [
        ['Empuja con los talones y sube la cadera con la carga estable', 'Baja controlando'],
        ['Aprieta glúteos 1 s arriba', 'La carga no debe rodar: manos firmes'],
        ['Costillas abajo durante todo el recorrido', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Sube la cadera', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-PUE-010': {
    ...PUE, name: 'Puente de glúteo isométrico contra pared', level: 'Avanzado', iso: true, holdLabel: null,
    views: { ...SUP_VIEWS, f34: { az: -58, el: 16 }, front: { az: -118, el: 22 } }, orbit: { view: 'back34', sweep: 165 },
    frame: { dist: 4.3, ty: 0.36, tz: 0.42, distLow: 3.7, tyLow: 0.36 },
    cfg: { free: { ...BR, thT: -24, wall: { y: 0.46, z: 0.95 } }, items: [...MAT, { kind: 'wall', flip: true, z: 0.95, w: 1.1, h: 0.95 }] },
    captions: {
      intro: 'Boca arriba con las plantas de los pies apoyadas en la pared',
      reps: [
        ['Empuja la pared con los pies y sube la cadera', 'Mantén la cadera arriba sin moverte'],
        ['Glúteos apretados todo el tiempo', 'Rodillas a unos 90°'],
        ['Respira de forma continua', 'Costillas abajo y core activo'],
      ],
      orbit: ['Cadera arriba', 'Posición isométrica: músculos que trabajan', 'Baja despacio al terminar'],
    },
  },
  'TI-PAT-001': {
    ...PAT, name: 'Patada de glúteo en máquina (glute kickback machine)', level: 'Principiante',
    frame: { dist: 4.8, ty: 0.95, tz: 0.0, distLow: 4.2, tyLow: 0.95 },
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 40, standY: 0.09, hands: 'grip', handX: 0.22, handY: 1.0, handZ: 0.55, flexB: 50, kneeB: 75, flexT: -16, kneeT: 18, plantB: 5, plantT: 15,
      machine: { kind: 'lever', plate: true, pivotY: 0.95, pivotZ: -0.02 } },
      items: [{ kind: 'kickFrame', handY: 1.0, handZ: 0.55, standX: 0.09, towerX: -0.36, pivotZ: -0.02 }] },
    captions: {
      intro: 'Antebrazos en el apoyo, un pie en la plataforma y el otro en la placa',
      reps: [
        ['Empuja la placa hacia atrás extendiendo la cadera', 'Vuelve controlando hasta flexionar la cadera'],
        ['Aprieta el glúteo 1 s al final', 'La espalda no se arquea: el movimiento sale de la cadera'],
        ['Pelvis cuadrada, sin girar hacia el lado que patea', 'Core activo durante toda la serie'],
      ],
      orbit: ['Empuja la placa atrás', 'Extensión: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-PAT-002': {
    ...PAT, name: 'Patada de glúteo en polea (cable kickback)', level: 'Intermedio',
    frame: { dist: 4.8, ty: 0.95, tz: 0.12, distLow: 4.2, tyLow: 0.92 },
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 22, hands: 'grip', handX: 0.24, handY: 1.1, handZ: 0.48, flexB: 12, kneeB: 14, flexT: -32, kneeT: 8, plantB: 10, plantT: 20, cable: [0, 0.12, 0.54] },
      items: [{ kind: 'cableColumn', z: 0.70, handY: 1.1, handZ: 0.48, pulleyY: 0.12 }] },
    captions: {
      intro: 'Tobillera enganchada a la polea baja, frente a la columna y agarrado a ella',
      reps: [
        ['Lleva la pierna atrás extendiendo la cadera', 'Vuelve controlando la tensión del cable'],
        ['Aprieta el glúteo 1 s atrás', 'No arquees la zona lumbar para ganar recorrido'],
        ['Rodilla casi estirada y movimiento lento', 'La pierna de apoyo, ligeramente flexionada'],
      ],
      orbit: ['Pierna atrás', 'Extensión: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-PAT-003': {
    ...PAT, name: 'Patada de glúteo con mancuerna en cuadrupedia (donkey kick)', level: 'Intermedio', views: SUP_VIEWS,
    frame: { dist: 4.4, ty: 0.48, tz: 0.05, distLow: 3.8, tyLow: 0.50 },
    cfg: { free: { type: 'quadruped', side: 'R', db: true, flexT: -12 }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia: manos bajo los hombros y rodillas bajo la cadera, mancuerna detrás de la rodilla',
      reps: [
        ['Sube la pierna con la rodilla a 90°: la planta mira al techo', 'Baja controlando sin apoyar la rodilla'],
        ['Aprieta el glúteo 1 s arriba', 'La espalda queda neutra: no la arquees'],
        ['Sujeta la mancuerna en el pliegue de la rodilla', 'Pelvis nivelada, sin girar'],
      ],
      orbit: ['Sube la pierna', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-CFE-001': {
    ...CFE, name: 'Curl femoral tumbado en máquina', level: 'Principiante', views: SUP_VIEWS,
    frame: { dist: 4.6, ty: 0.75, tz: 0.05, distLow: 4.0, tyLow: 0.78 },
    cfg: { free: { type: 'prone', padY: 0.62, kneeB: 4, kneeT: 112, handZ: 0.66, machine: { kind: 'lever', rollerX: 0 } }, items: [{ kind: 'curlBench', padY: 0.62 }] },
    captions: {
      intro: 'Boca abajo, rodillas justo fuera del cojín y rodillo sobre los tobillos',
      reps: [
        ['Flexiona las rodillas llevando el rodillo hacia los glúteos', 'Baja en 2 s sin estirar de golpe'],
        ['La cadera queda pegada al cojín', 'Aprieta 1 s arriba'],
        ['Agarra las asas para fijar el tronco', 'Rango completo, sin rebotes'],
      ],
      orbit: ['Flexiona', 'Flexión máxima: músculos que trabajan', 'Extiende controlando'],
    },
  },
  'TI-CFE-002': {
    ...CFE, name: 'Curl femoral sentado en máquina', level: 'Principiante',
    frame: { dist: 4.6, ty: 0.78, tz: 0.18, distLow: 4.0, tyLow: 0.76 },
    cfg: { free: { type: 'seated', seatY: 0.50, recline: 12, kneeB: 0, kneeT: 100, roller: 'back', handX: 0.27, handZ: 0.12, plantB: -10, plantT: 0, machine: { kind: 'lever', rollerX: 0 } },
      items: [{ kind: 'seatMachine', seatY: 0.50, recline: 12, thighPad: true }] },
    captions: {
      intro: 'Sentado, rodillo bajo los tobillos y almohadilla fija sobre los muslos',
      reps: [
        ['Lleva el rodillo hacia abajo y atrás flexionando las rodillas', 'Vuelve en 2 s hasta estirar sin bloquear'],
        ['Espalda apoyada en el respaldo', 'Aprieta 1 s al final del recorrido'],
        ['Rodillas alineadas con el eje de la máquina', 'Movimiento controlado, sin balanceo'],
      ],
      orbit: ['Flexiona', 'Flexión máxima: músculos que trabajan', 'Extiende controlando'],
    },
  },
  'TI-CFE-003': {
    ...CFE, name: 'Curl femoral nórdico (nordic hamstring curl)', level: 'Principiante', tempo: { down: 4, pause: 0, up: 1.5 },
    phaseNames: { BAJADA: 'BAJADA EXCÉNTRICA', SUBIDA: 'REGRESO', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.6, ty: 0.75, tz: 0.15, distLow: 4.0, tyLow: 0.55 },
    cfg: { free: NORDIC, items: [{ kind: 'anklePad', z: -0.43, y: 0.17 }] },
    captions: {
      intro: 'De rodillas con los tobillos sujetos y el cuerpo recto de rodillas a cabeza',
      reps: [
        ['Déjate caer hacia delante en 4 s frenando con los isquiotibiales', 'Apóyate con las manos y vuelve arriba'],
        ['Cadera extendida: el cuerpo baja en bloque', 'Frena todo lo que puedas antes de apoyar las manos'],
        ['Las manos solo amortiguan la caída', 'Usa la fuerza de los brazos para volver a subir'],
      ],
      orbit: ['Baja frenando', 'Posición baja: músculos que trabajan', 'Empuja con las manos y vuelve arriba'],
    },
  },
  'TI-CFE-004': {
    ...CFE, name: 'Curl femoral nórdico asistido con banda', level: 'Intermedio', tempo: { down: 4, pause: 0, up: 1.5 },
    phaseNames: { BAJADA: 'BAJADA EXCÉNTRICA', SUBIDA: 'REGRESO', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.8, ty: 0.85, tz: 0.0, distLow: 4.1, tyLow: 0.60 },
    cfg: { free: { ...NORDIC, maxAng: 74, band: [0, 1.80, -0.78] }, items: [{ kind: 'anklePad', z: -0.43, y: 0.17 }, { kind: 'post', h: 1.88, z: -0.80 }] },
    captions: {
      intro: 'De rodillas, tobillos sujetos y una banda desde atrás sujeta al pecho',
      reps: [
        ['Baja en 4 s: la banda te ayuda a frenar', 'Apóyate con las manos y vuelve arriba'],
        ['Cuerpo recto de rodillas a cabeza', 'Cuanto más gruesa la banda, más ayuda'],
        ['Frena con los isquiotibiales en todo el recorrido', 'Progresa reduciendo la ayuda de la banda'],
      ],
      orbit: ['Baja frenando', 'Posición baja: músculos que trabajan', 'Vuelve arriba'],
    },
  },
  'TI-CFE-005': {
    ...CFE, labelAll: true, name: 'Curl femoral en balón suizo a dos piernas', level: 'Intermedio', views: SUP_VIEWS,
    secondary: ['Glúteos', 'Gastrocnemio', 'Core'],
    frame: { dist: 4.4, ty: 0.38, tz: 0.42, distLow: 3.8, tyLow: 0.40 },
    cfg: { free: BALLCURL, items: MAT },
    captions: {
      intro: 'Boca arriba, talones sobre el balón y cadera elevada',
      reps: [
        ['Flexiona las rodillas y acerca el balón a los glúteos', 'Estira las piernas en 2 s'],
        ['La cadera no baja durante el curl', 'Talones presionando el balón'],
        ['Brazos apoyados para estabilizar', 'Aprieta 1 s con el balón cerca'],
      ],
      orbit: ['Acerca el balón', 'Flexión máxima: músculos que trabajan', 'Estira controlando'],
    },
  },
});
