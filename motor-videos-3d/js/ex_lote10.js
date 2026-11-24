// Lote 10: curl femoral TI-CFE-006 … 010 y extensión de rodilla TI-ERO-001 … 005
import { EXERCISES } from './exercises.js';
import { SUP_VIEWS } from './ex_lote7.js';
import { BR, MAT } from './ex_lote8.js';
import { CFE, NORDIC, BALLCURL } from './ex_lote9.js';

const ERO = { family: 'free', sub: 'Extensión de rodilla', primary: ['Cuádriceps'], secondary: [], tempo: { down: 2, pause: 1, up: 2 },
  phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'FLEXIÓN', ARRIBA: 'FLEXIONADA' }, holdLabel: 'EXTENSIÓN COMPLETA' };
const SEAT_FR = { dist: 4.4, ty: 0.72, tz: 0.18, distLow: 3.9, tyLow: 0.70 };

Object.assign(EXERCISES, {
  'TI-CFE-006': {
    ...CFE, labelAll: true, name: 'Curl femoral en balón suizo a una pierna', level: 'Intermedio', views: SUP_VIEWS, secondary: ['Glúteos', 'Gastrocnemio', 'Core'],
    frame: { dist: 4.4, ty: 0.42, tz: 0.42, distLow: 3.8, tyLow: 0.44 },
    cfg: { free: { ...BALLCURL, single: 'L', feetW: 0.04, freeLeg: 'up', freeFlex: 70 }, items: MAT },
    captions: {
      intro: 'Boca arriba, un talón sobre el balón, la otra pierna estirada hacia arriba y cadera elevada',
      reps: [
        ['Flexiona la rodilla y acerca el balón con un solo talón', 'Estira en 2 s controlando'],
        ['La pelvis no rota: mantén la cadera nivelada', 'Brazos apoyados para estabilizar'],
        ['Más difícil que a dos piernas: ve despacio', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Acerca el balón', 'Flexión máxima: músculos que trabajan', 'Estira controlando'],
    },
  },
  'TI-CFE-007': {
    ...CFE, labelAll: true, name: 'Curl femoral con deslizadores (sliders)', level: 'Avanzado', views: SUP_VIEWS, secondary: ['Glúteos', 'Gastrocnemio', 'Core'],
    frame: { dist: 4.3, ty: 0.30, tz: 0.42, distLow: 3.7, tyLow: 0.32 },
    cfg: { free: { ...BR, curl: true, thT: -14, thCurl: -14, slide: { z0: 1.20, z1: 0.72 } }, items: MAT },
    captions: {
      intro: 'Boca arriba, talones sobre los deslizadores y cadera elevada',
      reps: [
        ['Arrastra los talones hacia los glúteos manteniendo la cadera arriba', 'Desliza los pies hacia delante en 2 s'],
        ['Al estirar, la cadera no toca el suelo', 'Talones presionando los deslizadores'],
        ['Core firme y costillas abajo', 'Movimiento lento: el excéntrico es exigente'],
      ],
      orbit: ['Arrastra los talones', 'Flexión máxima: músculos que trabajan', 'Desliza hacia delante'],
    },
  },
  'TI-CFE-008': {
    ...CFE, name: 'Curl femoral de pie con banda', level: 'Avanzado',
    frame: { dist: 4.6, ty: 0.95, tz: 0.12, distLow: 4.0, tyLow: 0.85 },
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 6, hands: 'grip', handX: 0.22, handY: 1.05, handZ: 0.50, flexB: 0, kneeB: 2, flexT: 6, kneeT: 112, plantB: 5, plantT: -5, cable: [-0.09, 0.15, 0.47], cableBand: true },
      items: [{ kind: 'barre', handY: 1.05, handZ: 0.50, anchorY: 0.15 }] },
    captions: {
      intro: 'De pie frente a un apoyo, banda anclada abajo y sujeta al tobillo',
      reps: [
        ['Flexiona la rodilla llevando el talón hacia el glúteo', 'Vuelve en 2 s contra la tensión de la banda'],
        ['El muslo queda vertical: solo se mueve la rodilla', 'Aprieta 1 s arriba'],
        ['Tronco erguido y pierna de apoyo estable', 'Sin balancear el cuerpo'],
      ],
      orbit: ['Flexiona', 'Flexión máxima: músculos que trabajan', 'Extiende controlando'],
    },
  },
  'TI-CFE-009': {
    ...CFE, name: 'Curl femoral excéntrico asistido por compañero', level: 'Avanzado', tempo: { down: 5, pause: 0, up: 1.5 },
    phaseNames: { BAJADA: 'BAJADA EXCÉNTRICA', SUBIDA: 'REGRESO', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.6, ty: 0.75, tz: 0.15, distLow: 4.0, tyLow: 0.55 },
    cfg: { free: { ...NORDIC, maxAng: 64 }, items: [{ kind: 'anklePad', z: -0.43, y: 0.17 }] },
    captions: {
      intro: 'De rodillas: un compañero (o un soporte) sujeta firmemente tus tobillos',
      reps: [
        ['Baja en 5 s frenando con los isquiotibiales', 'Apóyate con las manos y vuelve arriba'],
        ['El compañero presiona los tobillos contra el suelo', 'Cuerpo recto de rodillas a cabeza'],
        ['Solo la fase de bajada: la subida es asistida', 'Detente si pierdes la línea de la cadera'],
      ],
      orbit: ['Baja frenando', 'Posición baja: músculos que trabajan', 'Vuelve arriba con ayuda de las manos'],
    },
  },
  'TI-CFE-010': {
    ...CFE, labelAll: true, name: 'Curl femoral en suspensión (TRX)', level: 'Avanzado', views: SUP_VIEWS, secondary: ['Glúteos', 'Gastrocnemio', 'Core'],
    frame: { dist: 4.6, ty: 0.55, tz: 0.42, distLow: 4.0, tyLow: 0.48 },
    cfg: { free: { ...BR, curl: true, thT: -18, thCurl: -8, trx: { y: 2.35, z: 1.05, len: 1.90, z0: 1.15, z1: 0.70 } }, items: [...MAT, { kind: 'trxAnchor', y: 2.35, z: 1.05 }] },
    captions: {
      intro: 'Boca arriba, talones en las cintas y cadera elevada',
      reps: [
        ['Flexiona las rodillas acercando los talones a los glúteos', 'Estira en 2 s sin dejar caer la cadera'],
        ['Cuerpo en línea al estirar', 'Talones empujando las cintas hacia abajo'],
        ['Brazos apoyados para estabilizar', 'Aprieta 1 s con las rodillas flexionadas'],
      ],
      orbit: ['Flexiona', 'Flexión máxima: músculos que trabajan', 'Estira controlando'],
    },
  },
  'TI-ERO-001': {
    ...ERO, name: 'Extensión de rodilla en máquina (leg extension)', level: 'Principiante', frame: SEAT_FR,
    cfg: { free: { type: 'seated', seatY: 0.52, recline: 12, kneeB: 92, kneeT: 4, roller: 'front', handX: 0.27, handZ: 0.12, plantB: 0, plantT: -10, machine: { kind: 'lever', rollerX: 0 } },
      items: [{ kind: 'seatMachine', seatY: 0.52, recline: 12 }] },
    captions: {
      intro: 'Sentado con la espalda apoyada y el rodillo sobre la parte baja de las espinillas',
      reps: [
        ['Extiende las rodillas hasta estirar las piernas', 'Baja en 2 s controlando el peso'],
        ['Aprieta el cuádriceps 1 s arriba', 'Agarra las asas y mantén la cadera en el asiento'],
        ['Rodillas alineadas con el eje de la máquina', 'Sin impulso ni golpe al final'],
      ],
      orbit: ['Extiende', 'Extensión completa: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-ERO-002': {
    ...ERO, name: 'Extensión de rodilla a una pierna en máquina', level: 'Principiante', frame: SEAT_FR,
    cfg: { free: { type: 'seated', seatY: 0.52, recline: 12, kneeB: 92, kneeT: 4, single: 'L', restKnee: 92, roller: 'front', handX: 0.27, handZ: 0.12, plantB: 0, plantT: -10, machine: { kind: 'lever', rollerLen: 0.40, rollerX: 0 } },
      items: [{ kind: 'seatMachine', seatY: 0.52, recline: 12 }] },
    captions: {
      intro: 'Sentado en la máquina, una sola pierna detrás del rodillo',
      reps: [
        ['Extiende la rodilla hasta estirar la pierna', 'Baja en 2 s controlando'],
        ['Corrige diferencias entre una pierna y otra', 'Aprieta 1 s arriba'],
        ['La otra pierna descansa flexionada', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Extiende', 'Extensión completa: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-ERO-003': {
    ...ERO, name: 'Extensión de rodilla con banda', level: 'Principiante', frame: SEAT_FR,
    cfg: { free: { type: 'seated', seatY: 0.47, recline: 0, kneeB: 92, kneeT: 4, single: 'L', restKnee: 92, band: [0.09, 0.06, 0.25], handX: 0.27, handZ: 0.04, handDy: 0.0, plantB: 0, plantT: -10 },
      items: [{ kind: 'box', h: 0.47, w: 0.62, d: 0.46, z: 0.0 }] },
    captions: {
      intro: 'Sentado en un banco o cajón, banda anclada atrás y alrededor del tobillo',
      reps: [
        ['Extiende la rodilla contra la banda', 'Vuelve en 2 s sin que la banda te tire'],
        ['Aprieta 1 s con la pierna estirada', 'Tronco erguido y manos sujetas al banco'],
        ['El muslo no se levanta del asiento', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Extiende', 'Extensión completa: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-ERO-004': {
    ...ERO, name: 'Extensión terminal de rodilla en silla (TKE)', level: 'Intermedio', frame: SEAT_FR, tempo: { down: 1.5, pause: 2, up: 1.5 },
    cfg: { free: { type: 'seated', seatY: 0.47, recline: 0, kneeB: 34, kneeT: 2, single: 'L', restKnee: 92, handX: 0.27, handZ: 0.04, handDy: 0.0, plantB: -5, plantT: -15 },
      items: [{ kind: 'box', h: 0.47, w: 0.62, d: 0.46, z: 0.0 }] },
    captions: {
      intro: 'Sentado, pierna casi estirada al frente: trabaja solo los últimos grados',
      reps: [
        ['Estira por completo la rodilla y bloquea', 'Vuelve a la ligera flexión sin bajar el muslo'],
        ['Aprieta el cuádriceps 2 s, sobre todo la parte interna', 'Punta del pie hacia ti'],
        ['Rango corto: de casi estirada a estirada', 'Útil en recuperación de rodilla'],
      ],
      orbit: ['Estira y bloquea', 'Extensión completa: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-ERO-005': {
    family: 'squat', sub: 'Extensión de rodilla', primary: ['Cuádriceps'], secondary: [], name: 'Sentadilla isométrica en pared con énfasis en cuádriceps', level: 'Intermedio',
    tempo: { down: 2, pause: 0, up: 2 }, iso: true,
    views: { hackR: { az: 100, el: 9 }, side: { az: -88, el: 4 } }, orbit: { view: 'hackR', sweep: -200 },
    frame: { tz: 0.15, dist: 4.5 },
    cfg: { arms: 'sides', fixedZ: 0, ankleZ: 0.36, stance: 0.12, toeOut: 2, hipBottom: 0.50, leanTop: 0, leanBot: 0, chestExt: 0, neckK: 0, kneeOut: 0.01, wall: { z: -0.128 } },
    captions: {
      intro: 'Espalda en la pared, pies más cerca de la pared y juntos',
      reps: [
        ['Deslízate hacia abajo hasta muslos paralelos al suelo', 'Mantén la posición'],
        ['Rodillas algo por delante de los tobillos: más trabajo de cuádriceps', 'Toda la espalda en contacto con la pared'],
        ['Rodillas alineadas con los pies', 'Respira de forma continua'],
      ],
      orbit: ['Peso repartido en todo el pie', 'Posición isométrica: músculos que trabajan', 'Para salir, empuja el suelo y sube'],
    },
  },
});
