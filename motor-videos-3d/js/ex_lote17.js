// Lote 17: trabajo unilateral TI-UNI-006 … 010 y bilateral TI-BIL-001 … 005
import { EXERCISES } from './exercises.js';
import { V3 } from './kin.js';
import { SPLCFG, SPLIT_FLOOR } from './exercises.js';
import { PUE, BR, MAT } from './ex_lote8.js';
import { PAN } from './ex_lote11.js';
import { PRESS_FR, PRESS_ITEMS } from './ex_lote16.js';

const UNI = { sub: 'Trabajo unilateral', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Core', 'Estabilizadores de cadera y rodilla'] };
const BIL = { family: 'squat', sub: 'Trabajo bilateral', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Isquiotibiales', 'Core'], tempo: { down: 2, pause: 0, up: 2 } };

Object.assign(EXERCISES, {
  'TI-UNI-006': {
    ...UNI, family: 'free', primary: ['Glúteos'], secondary: ['Isquiotibiales', 'Core'], name: 'Extensión de cadera unilateral en polea', level: 'Intermedio',
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN MÁXIMA',
    frame: { dist: 4.8, ty: 0.95, tz: 0.12, distLow: 4.2, tyLow: 0.92 },
    cfg: { free: { type: 'stand1', stance: 'L', leanB: 22, hands: 'grip', handX: 0.24, handY: 1.1, handZ: 0.48, flexB: 12, kneeB: 14, flexT: -32, kneeT: 8, plantB: 10, plantT: 20, cable: [0, 0.12, 0.54] },
      items: [{ kind: 'cableColumn', z: 0.70, handY: 1.1, handZ: 0.48, pulleyY: 0.12 }] },
    captions: {
      intro: 'Tobillera enganchada a la polea baja, frente a la columna y agarrado a ella',
      reps: [
        ['Lleva la pierna hacia atrás extendiendo la cadera', 'Vuelve en 2 s sin dejar que el peso caiga'],
        ['La espalda no se arquea: el movimiento sale del glúteo', 'Pierna de apoyo con la rodilla suave'],
        ['Aprieta 1 s atrás', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Pierna atrás', 'Extensión máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-UNI-007': {
    ...UNI, family: 'squat', name: 'Sentadilla pistol completa', level: 'Avanzado', tempo: { down: 3, pause: 0.5, up: 2 },
    frame: { tz: -0.05, dist: 4.8, ty: 0.95, tyLow: 0.70 }, views: { f34: { az: -45 } },
    cfg: { single: 'L', stance: 0.06, pelvisX: 0.03, toeOut: 6, hipBottom: 0.36, leanTop: 4, leanBot: 44, kneeOut: 0.03, arms: 'forward', freeExtTop: -30, freeExtBot: -136, freeFlexTop: 12, freeFlexBot: 2 },
    captions: {
      intro: 'De pie sobre una pierna, la otra estirada al frente',
      reps: [
        ['Baja en 3 s hasta el fondo sobre una sola pierna', 'Sube en 2 s sin apoyar la otra'],
        ['La pierna libre queda estirada sin tocar el suelo', 'Brazos al frente como contrapeso'],
        ['Talón de apoyo pegado al suelo', 'Rodilla alineada con el pie'],
      ],
      orbit: ['Baja hasta el fondo', 'Posición baja: músculos que trabajan', 'Sube con una sola pierna'],
    },
  },
  'TI-UNI-008': {
    ...UNI, family: 'squat', name: 'Split squat unilateral con banda', level: 'Avanzado', tempo: { down: 2, pause: 0.5, up: 2 },
    frame: { tz: -0.10, dist: 4.7, ty: 0.95, distLow: 4.0, tyLow: 0.70 },
    cfg: { ...SPLCFG, arms: 'band_gm', bandFoot: 'L', split: SPLIT_FLOOR },
    captions: {
      intro: 'Banda bajo el pie delantero y por detrás del cuello, en posición de zancada',
      reps: [
        ['Baja en 2 s en línea recta', 'Sube empujando con el pie delantero contra la banda'],
        ['La tensión de la banda aumenta al subir', 'Tronco erguido y core firme'],
        ['Rodilla delantera alineada con el pie', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube contra la banda'],
    },
  },
  'TI-UNI-009': {
    ...PUE, ...UNI, primary: ['Glúteos'], secondary: ['Isquiotibiales', 'Core'], name: 'Puente de glúteo unilateral con carga', level: 'Avanzado',
    cfg: { free: { ...BR, single: 'L', feetW: 0.10, arms: 'db' }, items: MAT },
    captions: {
      intro: 'Boca arriba, una mancuerna sobre la cadera y un solo pie apoyado',
      reps: [
        ['Empuja con el talón y sube la cadera', 'Baja en 2 s controlando'],
        ['La pelvis no se inclina hacia el lado de la pierna libre', 'Aprieta el glúteo 1 s arriba'],
        ['La mancuerna queda estable sobre la cadera', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Sube la cadera', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-UNI-010': {
    ...PAN, ...UNI, primary: ['Gastrocnemio y sóleo'], secondary: ['Estabilizadores de tobillo'], name: 'Elevación de talón unilateral con carga', level: 'Avanzado',
    cfg: { arms: 'hang', hold: 'db1', loadSide: 'L', free: { type: 'calf', single: 'L', maxPitch: 30 } },
    captions: {
      intro: 'De pie sobre una pierna con una mancuerna en la mano del mismo lado',
      reps: [
        ['Sube el talón lo más alto posible', 'Baja en 2 s controlando'],
        ['La rodilla queda estirada pero sin bloquear', 'El tobillo no se va hacia fuera'],
        ['Apóyate con la otra mano si lo necesitas', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Talón arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-BIL-001': {
    ...BIL, ...PRESS_FR, family: 'free', name: 'Prensa de piernas bilateral (leg press)', level: 'Principiante', tempo: { down: 2.5, pause: 0.5, up: 2 },
    cfg: { free: { type: 'legPress', seatY: 0.42, recline: 48, legAng: 42, dTop: 0.86, dBot: 0.50, footW: 0.15 }, items: PRESS_ITEMS },
    captions: {
      intro: 'Sentado en la prensa, pies al ancho de caderas en el centro de la plataforma',
      reps: [
        ['Baja la plataforma en 2–3 s flexionando las rodillas', 'Empuja con todo el pie hasta casi extender'],
        ['Rodillas alineadas con los pies', 'Espalda y cadera pegadas al respaldo'],
        ['No bloquees las rodillas arriba', 'Baja hasta donde la cadera no se despegue'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja con todo el pie'],
    },
  },
  'TI-BIL-002': {
    ...BIL, name: 'Sentadilla guiada bilateral en máquina', level: 'Principiante',
    cfg: { arms: 'smith', machine: 'smith', balance: 'bar', balanceZ: 0, midfootZ: 0.25, stance: 0.17, toeOut: 12, hipBottom: 0.435, leanTop: 1, leanBot: 19, kneeOut: 0.07 },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra guiada sobre el trapecio y pies algo adelantados',
      reps: [
        ['Baja en 2 s hasta muslos paralelos', 'Sube en 2 s empujando con todo el pie'],
        ['La guía marca el recorrido: tú controlas la profundidad', 'Espalda neutra y pecho arriba'],
        ['Rodillas alineadas con los pies', 'Exhala al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube empujando el suelo'],
    },
  },
  'TI-BIL-003': {
    ...BIL, primary: ['Isquiotibiales', 'Glúteos'], secondary: ['Erectores espinales', 'Cuádriceps', 'Antebrazos'], name: 'Peso muerto con barra bilateral', level: 'Principiante',
    tempo: { down: 1.2, pause: 0, up: 1.2 }, rest: 1.8, shortCaps: true, fromFloor: true, frame: { distLow: 4.45, tyLow: 0.90 }, views: { side: { az: -64, el: 8 } },
    cfg: { arms: 'hang', hold: 'bar', barTarget: 0.225, gripX: 0.245, stance: 0.13, toeOut: 10, leanTop: 1, leanBot: 65, leanCurve: (s) => Math.min(1, s / 0.55) ** 2 * (3 - 2 * Math.min(1, s / 0.55)), kneeOut: 0.05, chestExt: 2, neckK: 0.6 },
    captions: {
      intro: 'Barra sobre el medio pie, agarre al ancho de hombros',
      reps: [
        ['Empuja el suelo y sube con la barra pegada a las piernas', 'Baja controlando por el mismo camino'],
        ['Espalda neutra de principio a fin', 'Cadera y hombros suben a la vez'],
        ['Arriba, extiende la cadera sin arquear la espalda', 'Brazos estirados: solo sujetan'],
      ],
      orbit: ['Sube hasta el bloqueo', 'Bloqueo: músculos que trabajan', 'Baja con la barra cerca de las piernas'],
    },
  },
  'TI-BIL-004': {
    ...BIL, name: 'Hack squat bilateral', level: 'Intermedio',
    views: { hackR: { az: 105, el: 10 } }, orbit: { view: 'hackR', sweep: -210 },
    cfg: { arms: 'hack', machine: 'hack', recline: 38, travel: 0.45, stance: 0.17, toeOut: 12, plateTilt: 20, legAngle: 24, hipTop: V3(0, 1.085, -0.17), chestExt: 0, kneeOut: 0.07 },
    captions: {
      intro: 'Espalda apoyada en el respaldo y hombros bajo las almohadillas',
      reps: [
        ['Baja en 2 s hasta muslos paralelos a la plataforma', 'Sube empujando con todo el pie'],
        ['Espalda y cadera pegadas al respaldo', 'Pies al ancho de hombros'],
        ['Rodillas alineadas con los pies', 'No bloquees las rodillas arriba'],
      ],
      orbit: ['Rango completo', 'Posición baja: músculos que trabajan', 'Sube con las rodillas suaves'],
    },
  },
  'TI-BIL-005': {
    ...BIL, name: 'Sentadilla con cadenas bilateral', level: 'Intermedio', views: { side: { az: -64, el: 8 } },
    cfg: { arms: 'bar_high', stance: 0.175, toeOut: 18, hipBottom: 0.44, leanTop: 3, leanBot: 41, kneeOut: 0.08, chains: { n: 44 } },
    captions: {
      intro: 'Barra sobre el trapecio con una cadena colgando de cada lado',
      reps: [
        ['Al bajar, las cadenas se apoyan en el suelo y la carga disminuye', 'Al subir, se levantan y la carga aumenta'],
        ['Acelera al subir: la resistencia crece hacia arriba', 'Baja en 2 s controlando'],
        ['Rodillas alineadas con los pies', 'Espalda neutra y core firme'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube acelerando contra las cadenas'],
    },
  },
});
