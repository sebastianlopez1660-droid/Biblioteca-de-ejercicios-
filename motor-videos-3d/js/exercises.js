// Definiciones del lote 1 (sentadillas) y coreografía común: repeticiones, cámaras, subtítulos y etiquetas.
import * as THREE from 'three';
import { V3, deg, lerp, clamp, smooth, smoother, easeInOutSine, rot } from './kin.js';

export const GROUPS = {
  'Cuádriceps': ['cuadriceps'],
  'Glúteos': ['gluteo_mayor', 'gluteo_medio'],
  'Isquiotibiales': ['isquiotibiales'],
  'Core': ['recto_abdominal', 'oblicuos', 'erectores'],
  'Aductores': ['aductores'],
  'Erectores espinales': ['erectores'],
};

// Anclajes para las etiquetas anatómicas (en el marco local del segmento o, en el torso, en reposo)
export const ANCHORS = {
  'Cuádriceps': [
    { seg: 'thigh_L', p: [0.022, -0.20, 0.080], n: [0.30, 0, 1] },
    { seg: 'thigh_R', p: [-0.022, -0.20, 0.080], n: [-0.30, 0, 1] },
    { seg: 'thigh_L', p: [0.075, -0.22, 0.020], n: [1, 0, 0.25] },
    { seg: 'thigh_R', p: [-0.075, -0.22, 0.020], n: [-1, 0, 0.25] },
  ],
  'Glúteos': [
    { bone: 'pelvis', p: [0.085, 0.955, -0.140], n: [0.35, 0, -1] },
    { bone: 'pelvis', p: [-0.085, 0.955, -0.140], n: [-0.35, 0, -1] },
  ],
  'Isquiotibiales': [
    { seg: 'thigh_L', p: [0.010, -0.25, -0.072], n: [0.2, 0, -1] },
    { seg: 'thigh_R', p: [-0.010, -0.25, -0.072], n: [-0.2, 0, -1] },
  ],
  'Core': [
    { bone: 'lumbar', p: [0.035, 1.120, 0.100], n: [0.2, 0, 1] },
    { bone: 'lumbar', p: [0.030, 1.110, -0.110], n: [0.2, 0, -1] },
    { bone: 'lumbar', p: [0.125, 1.140, 0.030], n: [1, 0, 0.3] },
    { bone: 'lumbar', p: [-0.125, 1.140, 0.030], n: [-1, 0, 0.3] },
  ],
  'Erectores espinales': [
    { bone: 'lumbar', p: [0.035, 1.130, -0.112], n: [0.25, 0, -1] },
    { bone: 'lumbar', p: [-0.035, 1.130, -0.112], n: [-0.25, 0, -1] },
    { bone: 'chest', p: [0.05, 1.26, -0.118], n: [0.6, 0, -1] },
    { bone: 'chest', p: [-0.05, 1.26, -0.118], n: [-0.6, 0, -1] },
  ],
  'Aductores': [
    { seg: 'thigh_L', p: [-0.065, -0.15, 0.000], n: [-1, 0, 0.1] },
    { seg: 'thigh_R', p: [0.065, -0.15, 0.000], n: [1, 0, 0.1] },
  ],
};

const SQUAT_BASE = {
  family: 'squat',
  primary: ['Cuádriceps'],
  secondary: ['Glúteos', 'Isquiotibiales', 'Core'],
  tempo: { down: 2, pause: 0, up: 2 },
};

const C_COMMON = {
  feet: 'Pies al ancho de hombros, puntas ligeramente hacia afuera',
  down: 'Baja en 2 s: cadera atrás y abajo, peso repartido en todo el pie',
  up: 'Sube en 2 s empujando el suelo y exhala al subir',
  knees: 'Rodillas alineadas con la punta de los pies, sin colapsar hacia adentro',
  spine: 'Pecho erguido, core activo y columna neutra en todo el recorrido',
  heels: 'Talones apoyados todo el tiempo',
  depth: 'Profundidad: la cadera llega a la altura de la rodilla o un poco más abajo',
};

export const EXERCISES = {
  'TI-SEN-001': {
    ...SQUAT_BASE, name: 'Sentadilla con peso corporal', level: 'Principiante',
    cfg: { arms: 'forward', stance: 0.165, toeOut: 15, hipBottom: 0.425, leanTop: 2, leanBot: 45, kneeOut: 0.07 },
    captions: {
      intro: 'Pies al ancho de hombros y brazos al frente para equilibrar',
      reps: [
        [C_COMMON.down, C_COMMON.up],
        [C_COMMON.spine, C_COMMON.heels],
        [C_COMMON.knees, 'Empuja con todo el pie hasta extender cadera y rodillas'],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Vuelve arriba sin bloquear de golpe las rodillas'],
    },
  },
  'TI-SEN-002': {
    ...SQUAT_BASE, name: 'Sentadilla goblet', level: 'Principiante',
    cfg: { arms: 'goblet', stance: 0.18, toeOut: 18, hipBottom: 0.405, leanTop: 2, leanBot: 33, kneeOut: 0.09 },
    captions: {
      intro: 'Kettlebell pegada al pecho, sujeta por los cuernos y codos abajo',
      reps: [
        [C_COMMON.down, C_COMMON.up],
        ['Tronco erguido: la carga delante ayuda a mantener el pecho alto', C_COMMON.heels],
        ['Codos por dentro de las rodillas al llegar abajo', C_COMMON.knees],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Sube empujando el suelo con la kettlebell cerca del cuerpo'],
    },
  },
  'TI-SEN-003': {
    ...SQUAT_BASE, name: 'Sentadilla con barra alta (back squat alto)', level: 'Principiante',
    cfg: { arms: 'bar_high', stance: 0.175, toeOut: 18, hipBottom: 0.425, leanTop: 3, leanBot: 41, kneeOut: 0.08 },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra sobre el trapecio superior, agarre algo más ancho que los hombros',
      reps: [
        [C_COMMON.down, C_COMMON.up],
        ['La barra baja y sube en línea recta sobre el medio del pie', C_COMMON.spine],
        [C_COMMON.knees, 'Codos abajo y escápulas juntas para fijar la barra'],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Sube con la barra sobre el medio pie, sin adelantar el pecho'],
    },
  },
  'TI-SEN-004': {
    ...SQUAT_BASE, name: 'Sentadilla con barra baja (back squat bajo)', level: 'Principiante',
    cfg: { arms: 'bar_low', stance: 0.205, toeOut: 22, hipBottom: 0.445, leanTop: 4, leanBot: 49, kneeOut: 0.10 },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra sobre el deltoides posterior, debajo de la espina de la escápula',
      reps: [
        ['Baja en 2 s llevando la cadera atrás: más inclinación del tronco', C_COMMON.up],
        ['La barra se mantiene sobre el medio pie en todo el recorrido', C_COMMON.spine],
        ['Rodillas hacia afuera, en la línea de los pies', 'Agarre ancho y codos atrás para sostener la barra'],
      ],
      orbit: ['Profundidad: muslos paralelos al suelo', 'Posición baja: músculos que trabajan', 'Sube empujando la cadera y el pecho a la vez'],
    },
  },
  'TI-SEN-005': {
    ...SQUAT_BASE, name: 'Sentadilla frontal con barra', level: 'Intermedio',
    cfg: { arms: 'front', stance: 0.17, toeOut: 15, hipBottom: 0.405, leanTop: 2, leanBot: 28, kneeOut: 0.08, shoShift: V3(0, 0.025, 0.03) },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra en rack frontal sobre los deltoides, codos altos',
      reps: [
        ['Baja en 2 s con el tronco lo más vertical posible', C_COMMON.up],
        ['Codos altos todo el tiempo para que la barra no ruede', C_COMMON.heels],
        [C_COMMON.knees, 'Al subir, empuja los codos hacia arriba'],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Sube con el pecho alto y la barra sobre el medio pie'],
    },
  },
  'TI-SEN-006': {
    ...SQUAT_BASE, name: 'Sentadilla sumo', level: 'Intermedio',
    secondary: ['Glúteos', 'Aductores', 'Isquiotibiales', 'Core'],
    cfg: { arms: 'clasp', stance: 0.325, toeOut: 38, hipBottom: 0.47, leanTop: 2, leanBot: 18, kneeOut: 0.12 },
    captions: {
      intro: 'Postura amplia (1,5–2 veces los hombros) y puntas hacia afuera',
      reps: [
        ['Baja en 2 s con el tronco erguido entre las piernas', C_COMMON.up],
        ['Rodillas empujan hacia afuera, en la línea de los pies', C_COMMON.spine],
        ['Mayor trabajo de aductores y glúteos por la postura amplia', C_COMMON.heels],
      ],
      orbit: ['Profundidad: muslos paralelos al suelo', 'Posición baja: músculos que trabajan', 'Sube apretando glúteos sin juntar las rodillas'],
    },
  },
  'TI-SEN-007': {
    ...SQUAT_BASE, name: 'Sentadilla en caja (box squat)', level: 'Intermedio',
    tempo: { down: 2, pause: 0.8, up: 2 },
    cfg: { arms: 'forward', stance: 0.205, toeOut: 20, hipBottom: 0.495, leanTop: 2, leanBot: 50, kneeOut: 0.09, balanceZ: -0.075, box: { h: 0.42 } },
    captions: {
      intro: 'Cajón detrás, a la altura que deja los muslos paralelos al suelo',
      reps: [
        ['Siéntate atrás hacia el cajón en 2 s, con la tibia casi vertical', 'Pausa breve sin relajar el tronco y sube empujando el suelo'],
        ['Toca el cajón con control: sin dejarte caer ni rebotar', C_COMMON.spine],
        [C_COMMON.knees, 'Sube con los talones y la cadera a la vez'],
      ],
      orbit: ['Profundidad marcada por el cajón', 'Posición sentada: músculos que trabajan', 'Despega del cajón sin balanceo del tronco'],
    },
  },
  'TI-SEN-008': {
    ...SQUAT_BASE, name: 'Sentadilla hack en máquina', level: 'Intermedio',
    views: { hackR: { az: 105, el: 10 } }, orbit: { view: 'hackR', sweep: -210 },
    cfg: { arms: 'hack', machine: 'hack', recline: 38, travel: 0.45, stance: 0.17, toeOut: 12, plateTilt: 20, legAngle: 24, hipTop: V3(0, 1.085, -0.17), chestExt: 0, kneeOut: 0.07 },
    captions: {
      intro: 'Espalda completamente apoyada y hombros bajo las almohadillas',
      reps: [
        ['Baja en 2 s hasta muslos paralelos a la plataforma', 'Sube en 2 s empujando con todo el pie, sin bloquear rodillas'],
        ['La espalda y la cadera no se despegan del respaldo', 'Pies al centro de la plataforma, al ancho de hombros'],
        [C_COMMON.knees, 'Exhala al subir y mantén el core firme'],
      ],
      orbit: ['Rango completo sin despegar los talones', 'Posición baja: músculos que trabajan', 'Termina arriba con las rodillas suaves'],
    },
  },
  'TI-SEN-009': {
    ...SQUAT_BASE, name: 'Sentadilla en máquina Smith', level: 'Avanzado',
    cfg: { arms: 'smith', machine: 'smith', balance: 'bar', balanceZ: 0, midfootZ: 0.25, stance: 0.17, toeOut: 12, hipBottom: 0.435, leanTop: 1, leanBot: 19, kneeOut: 0.07 },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra sobre el trapecio y pies un poco adelantados respecto a la barra',
      reps: [
        ['Baja en 2 s: la guía marca un recorrido vertical de la barra', C_COMMON.up],
        ['Pies adelantados para mantener el tronco erguido', C_COMMON.spine],
        [C_COMMON.knees, 'Al terminar, gira la barra y asegúrala en los ganchos'],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Sube empujando el suelo sin bloquear de golpe'],
    },
  },
  'TI-SEN-010': {
    ...SQUAT_BASE, name: 'Sentadilla zercher', level: 'Avanzado',
    cfg: { arms: 'zercher', stance: 0.18, toeOut: 18, hipBottom: 0.41, leanTop: 2, leanBot: 29, kneeOut: 0.09, shoShift: V3(0, 0, 0.015) },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra en el pliegue de los codos y manos juntas frente al pecho',
      reps: [
        ['Baja en 2 s con el tronco erguido y la barra pegada al cuerpo', C_COMMON.up],
        ['Core muy activo: la carga delante exige más al tronco', C_COMMON.heels],
        ['Codos por dentro de las rodillas al llegar abajo', C_COMMON.knees],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Sube con los codos altos y el pecho erguido'],
    },
  },
};

// ------------------------------------------------------------------ lote 2
const HINGE_BASE = {
  family: 'squat', sub: 'Bisagra de cadera',
  primary: ['Isquiotibiales'], secondary: ['Glúteos', 'Erectores espinales'],
  tempo: { down: 2, pause: 1, up: 2 },
};
const HCFG = { stance: 0.15, toeOut: 8, hipBottom: 0.908, leanTop: 2, leanBot: 66, kneeOut: 0.03, chestExt: 2, neckK: 0.55 };
const H_COMMON = {
  down: 'Baja en 2 s empujando la cadera hacia atrás; las rodillas apenas se flexionan',
  up: 'Sube en 2 s llevando la cadera adelante y apretando glúteos',
  spine: 'Espalda neutra de la cabeza al sacro: no redondees la zona lumbar',
  knees: 'Rodillas desbloqueadas pero quietas: si se doblan mucho, es una sentadilla',
  feel: 'Pausa 1 s abajo sintiendo el estiramiento de los isquiotibiales',
  weight: 'Peso en el medio pie y talones; los dedos no se levantan',
  orbit: 'Posición baja: músculos que trabajan',
};
Object.assign(EXERCISES, {
  'TI-SEN-011': {
    ...SQUAT_BASE, name: 'Sentadilla overhead', level: 'Avanzado',
    frame: { dist: 5.2, ty: 1.06, distLow: 4.0, tyLow: 0.86 },
    cfg: { arms: 'overhead', stance: 0.185, toeOut: 20, hipBottom: 0.43, leanTop: 2, leanBot: 40, kneeOut: 0.09, neckK: 0.8 },
    captions: {
      intro: 'Palo sobre la cabeza con agarre ancho y codos bloqueados',
      reps: [
        [C_COMMON.down, C_COMMON.up],
        ['El palo se mantiene sobre el medio pie: brazos verticales todo el tiempo', C_COMMON.spine],
        [C_COMMON.knees, 'Empuja el palo hacia el techo mientras subes'],
      ],
      orbit: [C_COMMON.depth, 'Posición baja: músculos que trabajan', 'Sube sin que el palo se vaya hacia delante'],
    },
  },
  'TI-SEN-012': {
    ...SQUAT_BASE, name: 'Sentadilla isométrica en pared (wall sit)', level: 'Avanzado', iso: true,
    views: { hackR: { az: 100, el: 9 }, side: { az: -88, el: 4 } }, orbit: { view: 'hackR', sweep: -200 },
    frame: { tz: 0.15, dist: 4.5 },
    cfg: { arms: 'sides', fixedZ: 0, ankleZ: 0.43, stance: 0.15, toeOut: 4, hipBottom: 0.515, leanTop: 0, leanBot: 0, chestExt: 0, neckK: 0, kneeOut: 0.02, wall: { z: -0.128 } },
    captions: {
      intro: 'Espalda apoyada en la pared y pies adelantados, al ancho de caderas',
      reps: [
        ['Deslízate hacia abajo hasta que los muslos queden paralelos al suelo', 'Mantén la posición: rodillas a 90° y justo encima de los tobillos'],
        ['Rodillas a 90° sobre los tobillos', 'Toda la espalda y la cabeza en contacto con la pared'],
        ['Rodillas alineadas con los pies, sin dejarlas caer hacia adentro', 'Respira de forma continua; no apoyes las manos en los muslos'],
      ],
      orbit: ['Peso repartido en todo el pie', 'Posición isométrica: músculos que trabajan', 'Para salir, empuja el suelo y deslízate hacia arriba'],
    },
  },
  'TI-BIS-001': {
    ...HINGE_BASE, name: 'Bisagra de cadera con banda (hip hinge drill)', level: 'Principiante',
    cfg: { ...HCFG, arms: 'clasp', leanBot: 60, hipBand: { anchor: V3(0, 0.93, -1.35) } },
    frame: { tz: -0.25, dist: 4.7 },
    captions: {
      intro: 'Banda anclada detrás, a la altura del pliegue de la cadera',
      reps: [
        ['La banda tira de la cadera hacia atrás: síguela en 2 s con la espalda neutra', H_COMMON.up],
        [H_COMMON.knees, 'Extiende la cadera contra la banda hasta quedar erguido'],
        [H_COMMON.spine, H_COMMON.weight],
      ],
      orbit: [H_COMMON.feel, H_COMMON.orbit, 'Sube venciendo la banda con los glúteos, sin arquear la espalda'],
    },
  },
  'TI-BIS-002': {
    ...HINGE_BASE, name: 'Buenos días con barra', level: 'Principiante',
    cfg: { ...HCFG, arms: 'bar_high', leanBot: 62, hipBottom: 0.905 },
    views: { side: { az: -64, el: 8 } },
    captions: {
      intro: 'Barra sobre el trapecio, pies al ancho de caderas y rodillas desbloqueadas',
      reps: [
        [H_COMMON.down, H_COMMON.up],
        ['El tronco se inclina como un bloque: la barra no rueda hacia el cuello', H_COMMON.spine],
        [H_COMMON.knees, H_COMMON.weight],
      ],
      orbit: [H_COMMON.feel, H_COMMON.orbit, 'Sube con la cadera, no tirando de la espalda'],
    },
  },
  'TI-BIS-003': {
    ...HINGE_BASE, name: 'Buenos días con banda', level: 'Principiante',
    cfg: { ...HCFG, arms: 'band_gm', leanBot: 62 },
    captions: {
      intro: 'Pisa la banda y pásala por detrás del cuello, sobre el trapecio',
      reps: [
        [H_COMMON.down, 'Sube en 2 s: la banda resiste más cuanto más te extiendes'],
        ['Manos sujetan la banda junto a los hombros para que no se mueva', H_COMMON.spine],
        [H_COMMON.knees, H_COMMON.weight],
      ],
      orbit: [H_COMMON.feel, H_COMMON.orbit, 'Termina erguido apretando glúteos, sin hiperextender la zona lumbar'],
    },
  },
  'TI-BIS-004': {
    ...HINGE_BASE, name: 'Kettlebell swing a dos manos', level: 'Intermedio',
    tempo: { down: 1.1, pause: 0, up: 0.75 },
    cfg: { ...HCFG, arms: 'swing2', stance: 0.21, toeOut: 14, hipBottom: 0.845, leanTop: 0, leanBot: 52, kneeOut: 0.06 },
    frame: { tz: 0.12, dist: 4.7 },
    captions: {
      intro: 'Kettlebell colgando con los brazos relajados y pies algo más anchos que la cadera',
      reps: [
        ['Lleva la kettlebell atrás entre las piernas con una bisagra de cadera', 'Extiende la cadera de golpe: la kettlebell sube por inercia, no con los brazos'],
        ['Espalda neutra y antebrazos pegados a los muslos en el balanceo atrás', 'Arriba: cuerpo en línea, glúteos y abdomen apretados, sin echarse atrás'],
        ['Las rodillas se flexionan poco: es bisagra, no sentadilla', 'La kettlebell llega a la altura del pecho con los brazos sueltos'],
      ],
      orbit: ['En el trabajo real se encadenan las repeticiones sin pausa', 'Posición de carga: músculos que trabajan', 'Golpe de cadera y exhala al subir'],
    },
  },
  'TI-BIS-005': {
    ...HINGE_BASE, name: 'Kettlebell swing a una mano', level: 'Intermedio',
    tempo: { down: 1.1, pause: 0, up: 0.75 },
    cfg: { ...HCFG, arms: 'swing1', stance: 0.21, toeOut: 14, hipBottom: 0.845, leanTop: 0, leanBot: 52, kneeOut: 0.06 },
    frame: { tz: 0.12, dist: 4.7 },
    captions: {
      intro: 'Una mano en el centro del asa; el brazo libre acompaña el movimiento',
      reps: [
        ['Lleva la kettlebell atrás entre las piernas con una bisagra de cadera', 'Extiende la cadera de golpe: el brazo solo guía la kettlebell'],
        ['Hombros cuadrados al frente: no dejes que la carga gire el tronco', 'Arriba: cuerpo en línea, glúteos y abdomen apretados'],
        ['Hombro del brazo que trabaja "encajado", lejos de la oreja', 'La kettlebell llega a la altura del pecho; cambia de mano al completar la serie'],
      ],
      orbit: ['En el trabajo real se encadenan las repeticiones sin pausa', 'Posición de carga: músculos que trabajan', 'Golpe de cadera y exhala al subir'],
    },
  },
  'TI-BIS-006': {
    ...HINGE_BASE, name: 'Cargada de cadera con palo (broomstick hinge)', level: 'Intermedio',
    cfg: { ...HCFG, arms: 'stick', leanBot: 62, neckK: 0, chestExt: 0 },
    captions: {
      intro: 'Palo a lo largo de la espalda: toca cabeza, espalda alta y sacro',
      reps: [
        [H_COMMON.down, H_COMMON.up],
        ['Los tres puntos de contacto no se pierden: si el palo se despega, la espalda se movió', 'Una mano sujeta el palo tras la nuca y la otra en la zona lumbar'],
        [H_COMMON.knees, H_COMMON.weight],
      ],
      orbit: [H_COMMON.feel, H_COMMON.orbit, 'Sube manteniendo los tres puntos de contacto'],
    },
  },
  'TI-BIS-007': {
    ...HINGE_BASE, name: 'Bisagra de cadera con mancuerna (patrón RDL)', level: 'Avanzado',
    cfg: { ...HCFG, arms: 'db', leanBot: 68, hipBottom: 0.90 },
    captions: {
      intro: 'Mancuernas delante de los muslos, hombros atrás y rodillas desbloqueadas',
      reps: [
        [H_COMMON.down, H_COMMON.up],
        ['Las mancuernas bajan pegadas a las piernas, hasta media tibia', H_COMMON.spine],
        [H_COMMON.knees, 'Hombros "en los bolsillos": no dejes que la carga redondee la espalda alta'],
      ],
      orbit: [H_COMMON.feel, H_COMMON.orbit, 'Sube con la cadera; las mancuernas rozan las piernas'],
    },
  },
  'TI-BIS-008': {
    ...HINGE_BASE, name: 'Bisagra de cadera contra pared', level: 'Avanzado',
    views: { hackR: { az: 100, el: 9 } }, orbit: { view: 'hackR', sweep: -200 },
    frame: { tz: -0.12, dist: 4.6, distLow: 4.0, tyLow: 0.80 },
    cfg: { ...HCFG, arms: 'clasp', leanBot: 56, hipBottom: 0.91, wall: { auto: true } },
    captions: {
      intro: 'De espaldas a la pared, a un pie de distancia aproximadamente',
      reps: [
        ['Lleva la cadera atrás en 2 s hasta tocar la pared con los glúteos', H_COMMON.up],
        ['La pared es la referencia: se toca con la cadera, no con la espalda', H_COMMON.spine],
        [H_COMMON.knees, 'Cuando sea fácil, aléjate un poco más de la pared'],
      ],
      orbit: [H_COMMON.feel, H_COMMON.orbit, 'Sube apretando glúteos hasta quedar erguido'],
    },
  },
});

// ------------------------------------------------------------------ lote 3 (bisagras a una pierna y peso muerto)
Object.assign(GROUPS, { 'Trapecio': ['trapecio_superior', 'trapecio_medio', 'trapecio_inferior'], 'Antebrazos': ['antebrazo_flexores', 'antebrazo_extensores'] });
Object.assign(ANCHORS, { 'Trapecio': [
  { bone: 'chest', p: [0.075, 1.465, -0.080], n: [0.35, 0.4, -1] },
  { bone: 'chest', p: [-0.075, 1.465, -0.080], n: [-0.35, 0.4, -1] },
] });
const META3 = {"TI-BIS-009": {"name": "Buenos días a una pierna", "level": "Avanzado"}, "TI-BIS-010": {"name": "Bisagra de cadera unilateral con kettlebell", "level": "Avanzado"}, "TI-PMU-001": {"name": "Peso muerto convencional", "level": "Principiante"}, "TI-PMU-002": {"name": "Peso muerto sumo", "level": "Principiante"}, "TI-PMU-003": {"name": "Peso muerto rumano (RDL)", "level": "Principiante"}, "TI-PMU-004": {"name": "Peso muerto rumano a una pierna", "level": "Intermedio"}, "TI-PMU-005": {"name": "Peso muerto con trap bar", "level": "Intermedio"}, "TI-PMU-006": {"name": "Peso muerto piernas rígidas (stiff-leg deadlift)", "level": "Intermedio"}, "TI-PMU-007": {"name": "Peso muerto déficit", "level": "Avanzado"}, "TI-PMU-008": {"name": "Peso muerto con mancuernas", "level": "Avanzado"}};
const PMU_BASE = {
  family: 'squat', sub: 'Peso muerto', primary: ['Isquiotibiales'],
  secondary: ['Glúteos', 'Erectores espinales', 'Trapecio', 'Antebrazos'],
  tempo: { down: 1, pause: 0, up: 1 }, rest: 1.8, shortCaps: true,
};
const FLOOR = { fromFloor: true, frame: { distLow: 4.45, tyLow: 0.90 } };
const SINGLE = { single: 'R', stance: 0.06, pelvisX: -0.03 };
const PULL = { arms: 'hang', hold: 'bar', barTarget: 0.225, gripX: 0.245, stance: 0.13, toeOut: 10, leanTop: 1, leanBot: 65, leanCurve: (s) => smooth(s / 0.55), kneeOut: 0.05, chestExt: 2, neckK: 0.6 };
const PMU_ORBIT_FLOOR = ['Sube hasta el bloqueo', 'Bloqueo: músculos que trabajan', 'Baja controlando, con la barra cerca de las piernas'];
Object.assign(EXERCISES, {
  'TI-BIS-009': {
    ...HINGE_BASE, ...META3['TI-BIS-009'], frame: { tz: -0.05, dist: 4.8 },
    cfg: { ...HCFG, ...SINGLE, arms: 'band_gm', leanBot: 66, hipBottom: 0.90 },
    captions: {
      intro: 'Banda bajo el pie de apoyo y por detrás del cuello; la otra pierna se despega del suelo',
      reps: [
        ['Inclina el tronco en 2 s mientras la pierna libre sube hacia atrás', 'Sube en 2 s apretando el glúteo de la pierna de apoyo'],
        ['Cadera cuadrada: no la abras hacia el lado de la pierna libre', 'Rodilla de apoyo desbloqueada y estable'],
        ['Tronco y pierna libre forman una línea recta', 'Peso en el medio pie de apoyo, sin perder el equilibrio'],
      ],
      orbit: ['Pausa 1 s abajo con el tronco y la pierna libre en línea', H_COMMON.orbit, 'Sube con control; al terminar la serie, cambia de pierna'],
    },
  },
  'TI-BIS-010': {
    ...HINGE_BASE, ...META3['TI-BIS-010'], frame: { tz: -0.05, dist: 4.8 },
    cfg: { ...HCFG, ...SINGLE, arms: 'hang', hold: 'kb1', gripX: 0.12, leanBot: 72, hipBottom: 0.90 },
    captions: {
      intro: 'Kettlebell en la mano contraria a la pierna de apoyo, brazo relajado',
      reps: [
        ['Baja en 2 s llevando la cadera atrás y la pierna libre hacia atrás', 'Sube en 2 s empujando el suelo con el pie de apoyo'],
        ['La kettlebell baja en vertical, hacia el pie de apoyo', 'Cadera cuadrada al suelo, sin rotar el tronco'],
        ['Rodilla de apoyo desbloqueada pero quieta', 'Espalda neutra; la mirada acompaña al tronco'],
      ],
      orbit: ['Pausa 1 s abajo sintiendo el estiramiento del isquiotibial', H_COMMON.orbit, 'Sube y cambia de lado al completar la serie'],
    },
  },
  'TI-PMU-001': {
    ...PMU_BASE, ...FLOOR, ...META3['TI-PMU-001'], views: { side: { az: -64, el: 8 } },
    cfg: { ...PULL },
    captions: {
      intro: 'Barra sobre el medio pie, tibias cerca de la barra y agarre justo por fuera de las piernas',
      reps: [
        ['Empuja el suelo: cadera y hombros suben a la vez, con la barra pegada a las piernas'],
        ['Arriba bloquea cadera y rodillas sin echarte atrás; baja en el orden inverso'],
        ['Espalda neutra y brazos rectos; cada repetición vuelve a apoyarse en el suelo'],
      ],
      orbit: PMU_ORBIT_FLOOR,
    },
  },
  'TI-PMU-002': {
    ...PMU_BASE, ...FLOOR, ...META3['TI-PMU-002'],
    secondary: ['Glúteos', 'Aductores', 'Erectores espinales', 'Trapecio', 'Antebrazos'],
    cfg: { ...PULL, gripX: 0.16, stance: 0.37, toeOut: 40, leanBot: 51, leanCurve: (s) => smooth(s / 0.6), kneeOut: 0.14, chestExt: 3, neckK: 0.7 },
    captions: {
      intro: 'Postura muy amplia, puntas hacia afuera y agarre por dentro de las piernas',
      reps: [
        ['Empuja el suelo hacia los lados con las rodillas abiertas y el pecho alto'],
        ['Tronco más vertical que en el convencional; la barra sube en línea recta'],
        ['Bloquea arriba apretando glúteos y vuelve a apoyar la barra con control'],
      ],
      orbit: ['Sube hasta el bloqueo', 'Bloqueo: músculos que trabajan', 'Baja con las rodillas hacia afuera'],
    },
  },
  'TI-PMU-003': {
    ...PMU_BASE, ...META3['TI-PMU-003'], views: { side: { az: -64, el: 8 } },
    cfg: { arms: 'hang', hold: 'bar', gripX: 0.24, stance: 0.13, toeOut: 8, hipBottom: 0.895, leanTop: 2, leanBot: 66, kneeOut: 0.03, chestExt: 2, neckK: 0.55 },
    captions: {
      intro: 'De pie con la barra frente a los muslos y agarre al ancho de los hombros',
      reps: [
        ['Baja la barra pegada a los muslos llevando la cadera atrás; rodillas casi quietas'],
        ['Llega hasta media tibia o hasta donde mantengas la espalda neutra'],
        ['Sube extendiendo la cadera y aprieta glúteos arriba'],
      ],
      orbit: ['Baja sintiendo el estiramiento de los isquiotibiales', 'Posición baja: músculos que trabajan', 'Sube con la barra cerca de las piernas'],
    },
  },
  'TI-PMU-004': {
    ...PMU_BASE, ...META3['TI-PMU-004'], frame: { tz: -0.05, dist: 4.8 },
    cfg: { ...SINGLE, arms: 'hang', hold: 'bar', gripX: 0.24, toeOut: 6, hipBottom: 0.90, leanTop: 2, leanBot: 72, kneeOut: 0.03, chestExt: 2, neckK: 0.55 },
    captions: {
      intro: 'Barra en las manos, peso en una pierna y la otra apenas despegada del suelo',
      reps: [
        ['Baja en 1 s: el tronco va adelante mientras la pierna libre sube atrás'],
        ['Cadera cuadrada al suelo; la barra baja en vertical cerca de la pierna de apoyo'],
        ['Sube apretando el glúteo de apoyo; cambia de pierna al terminar la serie'],
      ],
      orbit: ['Tronco y pierna libre en línea', 'Posición baja: músculos que trabajan', 'Sube sin rotar la cadera'],
    },
  },
  'TI-PMU-005': {
    ...PMU_BASE, ...FLOOR, ...META3['TI-PMU-005'],
    cfg: { ...PULL, hold: 'trap', stance: 0.15, toeOut: 12, leanBot: 55, leanCurve: (s) => smooth(s / 0.6), kneeOut: 0.06, chestExt: 3, neckK: 0.7 },
    captions: {
      intro: 'Dentro de la barra hexagonal, agarre neutro en las asas y pies al ancho de caderas',
      reps: [
        ['Empuja el suelo con las piernas y el pecho alto: la carga sube alineada con el cuerpo'],
        ['Tronco más erguido que en el peso muerto con barra recta'],
        ['Bloquea arriba sin echarte atrás y baja la barra de forma controlada'],
      ],
      orbit: ['Sube hasta el bloqueo', 'Bloqueo: músculos que trabajan', 'Baja flexionando cadera y rodillas a la vez'],
    },
  },
  'TI-PMU-006': {
    ...PMU_BASE, ...META3['TI-PMU-006'], views: { side: { az: -64, el: 8 } },
    cfg: { arms: 'hang', hold: 'bar', gripX: 0.24, stance: 0.12, toeOut: 6, hipBottom: 0.928, leanTop: 2, leanBot: 80, kneeOut: 0.02, chestExt: 1, neckK: 0.5 },
    captions: {
      intro: 'De pie con la barra frente a los muslos y las piernas casi rectas',
      reps: [
        ['Baja con las rodillas casi extendidas, llevando la cadera hacia atrás'],
        ['Baja solo hasta donde puedas mantener la espalda neutra'],
        ['Sube extendiendo la cadera, con la barra pegada a las piernas'],
      ],
      orbit: ['Estiramiento máximo de los isquiotibiales', 'Posición baja: músculos que trabajan', 'Sube apretando glúteos'],
    },
  },
  'TI-PMU-007': {
    ...PMU_BASE, ...FLOOR, ...META3['TI-PMU-007'], views: { side: { az: -64, el: 8 } },
    cfg: { ...PULL, platform: 0.06, ankleY: 0.14, leanBot: 68 },
    captions: {
      intro: 'De pie sobre una plataforma baja: la barra queda más lejos y el recorrido es mayor',
      reps: [
        ['Empuja la plataforma: cadera y hombros suben a la vez'],
        ['Posición inicial más baja: mantén la espalda neutra desde el suelo'],
        ['Bloquea arriba y vuelve a apoyar la barra con control'],
      ],
      orbit: PMU_ORBIT_FLOOR,
    },
  },
  'TI-PMU-008': {
    ...PMU_BASE, ...META3['TI-PMU-008'],
    cfg: { ...PULL, hold: 'dbside', barTarget: 0.19, gripX: 0.235, leanBot: 57, leanCurve: (s) => smooth(s / 0.6), chestExt: 3, neckK: 0.7 },
    captions: {
      intro: 'Mancuernas a los lados con agarre neutro y pies al ancho de caderas',
      reps: [
        ['Baja en 1 s llevando la cadera atrás y flexionando las rodillas'],
        ['Las mancuernas bajan junto a los pies, con los brazos rectos'],
        ['Sube empujando el suelo y bloquea apretando glúteos'],
      ],
      orbit: ['Baja con la espalda neutra', 'Posición baja: músculos que trabajan', 'Sube con las mancuernas pegadas a los costados'],
    },
  },
});

// ------------------------------------------------------------------ lote 4 (peso muerto sumo con kettlebell, búlgaro y split squats)
const META4 = {"TI-PMU-009": {"name": "Peso muerto sumo con kettlebell", "level": "Avanzado"}, "TI-PMU-010": {"name": "Peso muerto a una pierna con apoyo en banco", "level": "Avanzado"}, "TI-SPL-001": {"name": "Split squat estático", "level": "Principiante"}, "TI-SPL-002": {"name": "Split squat búlgaro (pie trasero elevado)", "level": "Principiante"}, "TI-SPL-003": {"name": "Split squat búlgaro con mancuernas", "level": "Principiante"}, "TI-SPL-004": {"name": "Split squat con barra", "level": "Intermedio"}, "TI-SPL-005": {"name": "Split squat isométrico con pausa", "level": "Intermedio"}, "TI-SPL-006": {"name": "Split squat con pie delantero elevado (déficit)", "level": "Intermedio"}, "TI-SPL-007": {"name": "Split squat con banda de resistencia", "level": "Avanzado"}, "TI-SPL-008": {"name": "Split squat con pie trasero elevado y carga unilateral", "level": "Avanzado"}};
const SPL_BASE = { family: 'squat', sub: 'Split squat', primary: ['Cuádriceps'], secondary: ['Glúteos', 'Aductores'], tempo: { down: 2, pause: 0, up: 2 } };
const SPLIT_FLOOR = { front: 'L', rear: 'R', mode: 'floor', zF: 0.30, zR: -0.58, pTop: 35, pBot: 62, pz: -0.05, yBot: 0.535 };
const SPLIT_BENCH = { front: 'L', rear: 'R', mode: 'bench', zF: 0.30, zR: -0.46, pz: -0.05, yBot: 0.52 };
const SPLCFG = { stance: 0.10, toeOut: 6, leanTop: 2, leanBot: 6, chestExt: 2, neckK: 0.3, kneeOut: 0.04 };
const FR_FLOOR = { tz: -0.10, dist: 4.6, distLow: 3.9, tyLow: 0.62 };
const FR_BENCH = { tz: -0.22, dist: 4.9, distLow: 4.1, tyLow: 0.62 };
const SPL_ORBIT = ['Rodilla delantera a unos 90° y tronco erguido', 'Posición baja: músculos que trabajan', 'Sube sin cambiar la posición de los pies'];
Object.assign(EXERCISES, {
  'TI-PMU-009': {
    ...PMU_BASE, ...FLOOR, ...META4['TI-PMU-009'],
    secondary: ['Glúteos', 'Aductores', 'Erectores espinales', 'Trapecio', 'Antebrazos'],
    cfg: { ...PULL, hold: 'kb2', barTarget: 0.28, gripX: 0.035, stance: 0.30, toeOut: 35, leanBot: 44, leanCurve: (s) => smooth(s / 0.6), kneeOut: 0.12, chestExt: 3, neckK: 0.7 },
    captions: {
      intro: 'Kettlebell en el suelo entre los pies, postura amplia y puntas hacia afuera',
      reps: [
        ['Empuja el suelo con las rodillas abiertas y sube con la espalda neutra'],
        ['Brazos rectos: la kettlebell sube en vertical entre las piernas'],
        ['Bloquea arriba apretando glúteos y vuelve a apoyarla con control'],
      ],
      orbit: ['Sube hasta el bloqueo', 'Bloqueo: músculos que trabajan', 'Baja con las rodillas hacia afuera'],
    },
  },
  'TI-PMU-010': {
    ...PMU_BASE, ...META4['TI-PMU-010'], frame: { ...FR_BENCH, distLow: 4.5, tyLow: 0.80 },
    cfg: { arms: 'hang', hold: 'bar', gripX: 0.24, stance: 0.10, toeOut: 6, leanTop: 2, leanBot: 62, chestExt: 2, neckK: 0.55, kneeOut: 0.03,
      split: { front: 'L', rear: 'R', mode: 'bench', zF: 0.05, zR: -0.70, pz: [0.05, -0.12], yBot: 0.83 } },
    captions: {
      intro: 'Pie trasero apoyado en el banco y barra en las manos: casi todo el peso en la pierna delantera',
      reps: [
        ['Baja en 1 s llevando la cadera atrás; la rodilla delantera apenas se flexiona'],
        ['La barra baja pegada a la pierna delantera, con la espalda neutra'],
        ['Sube extendiendo la cadera; cambia de pierna al terminar la serie'],
      ],
      orbit: ['Estiramiento del isquiotibial delantero', 'Posición baja: músculos que trabajan', 'Sube apretando el glúteo de la pierna delantera'],
    },
  },
  'TI-SPL-001': {
    ...SPL_BASE, ...META4['TI-SPL-001'], frame: FR_FLOOR,
    cfg: { ...SPLCFG, arms: 'hips', split: SPLIT_FLOOR },
    captions: {
      intro: 'Un pie adelante y el otro atrás, apoyado en la punta; manos en la cadera',
      reps: [
        ['Baja en 2 s en vertical: la rodilla trasera va hacia el suelo', 'Sube en 2 s empujando con el pie delantero'],
        ['Tronco erguido y cadera cuadrada al frente', 'La rodilla trasera se acerca al suelo sin tocarlo'],
        ['Rodilla delantera alineada con la punta del pie', 'Peso repartido, algo más en la pierna delantera'],
      ],
      orbit: SPL_ORBIT,
    },
  },
  'TI-SPL-002': {
    ...SPL_BASE, ...META4['TI-SPL-002'], frame: FR_BENCH,
    cfg: { ...SPLCFG, arms: 'hips', split: SPLIT_BENCH },
    captions: {
      intro: 'Empeine del pie trasero sobre el banco y pie delantero bien adelantado',
      reps: [
        ['Baja en 2 s en vertical: la rodilla trasera va hacia el suelo', 'Sube en 2 s empujando con el pie delantero'],
        ['El pie trasero solo apoya: el trabajo es de la pierna delantera', 'Tronco erguido y cadera cuadrada'],
        ['Rodilla delantera alineada con la punta del pie', 'Talón delantero siempre apoyado'],
      ],
      orbit: SPL_ORBIT,
    },
  },
  'TI-SPL-003': {
    ...SPL_BASE, ...META4['TI-SPL-003'], frame: FR_BENCH,
    cfg: { ...SPLCFG, arms: 'hang', hold: 'dbside', gripX: 0.235, split: SPLIT_BENCH },
    captions: {
      intro: 'Pie trasero sobre el banco y una mancuerna en cada mano',
      reps: [
        ['Baja en 2 s en vertical con los brazos colgando', 'Sube en 2 s empujando con el pie delantero'],
        ['Hombros atrás y tronco erguido: las mancuernas no tiran del pecho', 'Rodilla delantera alineada con la punta del pie'],
        ['La rodilla trasera baja hacia el suelo sin tocarlo', 'Talón delantero siempre apoyado'],
      ],
      orbit: SPL_ORBIT,
    },
  },
  'TI-SPL-004': {
    ...SPL_BASE, ...META4['TI-SPL-004'], frame: FR_FLOOR, views: { side: { az: -64, el: 8 } },
    cfg: { ...SPLCFG, arms: 'bar_high', split: SPLIT_FLOOR },
    captions: {
      intro: 'Barra sobre el trapecio y postura de paso largo, pie trasero en la punta',
      reps: [
        ['Baja en 2 s en vertical: la barra baja en línea recta', 'Sube en 2 s empujando con el pie delantero'],
        ['Codos abajo y escápulas juntas para fijar la barra', 'Tronco erguido y cadera cuadrada'],
        ['Rodilla delantera alineada con la punta del pie', 'La rodilla trasera se acerca al suelo sin tocarlo'],
      ],
      orbit: SPL_ORBIT,
    },
  },
  'TI-SPL-005': {
    ...SPL_BASE, ...META4['TI-SPL-005'], frame: FR_FLOOR, tempo: { down: 2, pause: 3, up: 2 },
    cfg: { ...SPLCFG, arms: 'hips', split: SPLIT_FLOOR },
    captions: {
      intro: 'Postura de paso largo con las manos en la cadera',
      reps: [
        ['Baja en 2 s y mantén 3 s abajo sin apoyar la rodilla', 'Sube en 2 s empujando con el pie delantero'],
        ['En la pausa: rodilla delantera a 90° y tronco quieto', 'Respira durante la pausa sin perder la tensión'],
        ['Rodilla delantera alineada con la punta del pie', 'Peso repartido, algo más en la pierna delantera'],
      ],
      orbit: ['Baja hasta la posición de pausa', 'Pausa isométrica: músculos que trabajan', 'Sube sin cambiar la posición de los pies'],
    },
  },
  'TI-SPL-006': {
    ...SPL_BASE, ...META4['TI-SPL-006'], frame: FR_FLOOR,
    cfg: { ...SPLCFG, arms: 'hips', split: { ...SPLIT_FLOOR, step: 0.15, yBot: 0.51 } },
    captions: {
      intro: 'Pie delantero sobre un escalón bajo: el recorrido es mayor',
      reps: [
        ['Baja en 2 s más allá del nivel habitual, con control', 'Sube en 2 s empujando con el pie delantero'],
        ['Tronco erguido; la cadera baja en vertical', 'Talón delantero bien apoyado en el escalón'],
        ['Rodilla delantera alineada con la punta del pie', 'La rodilla trasera se acerca al suelo sin tocarlo'],
      ],
      orbit: SPL_ORBIT,
    },
  },
  'TI-SPL-007': {
    ...SPL_BASE, ...META4['TI-SPL-007'], frame: FR_FLOOR,
    cfg: { ...SPLCFG, arms: 'band_gm', bandFoot: 'L', split: SPLIT_FLOOR },
    captions: {
      intro: 'Banda bajo el pie delantero y por detrás del cuello',
      reps: [
        ['Baja en 2 s en vertical; la banda se afloja abajo', 'Sube en 2 s contra la banda, que resiste más arriba'],
        ['Manos sujetan la banda junto a los hombros', 'Tronco erguido y cadera cuadrada'],
        ['Rodilla delantera alineada con la punta del pie', 'La rodilla trasera se acerca al suelo sin tocarlo'],
      ],
      orbit: SPL_ORBIT,
    },
  },
  'TI-SPL-008': {
    ...SPL_BASE, ...META4['TI-SPL-008'], frame: FR_BENCH,
    cfg: { ...SPLCFG, arms: 'hang', hold: 'db1', loadSide: 'R', gripX: 0.235, split: SPLIT_BENCH },
    captions: {
      intro: 'Pie trasero sobre el banco y mancuerna en la mano contraria a la pierna delantera',
      reps: [
        ['Baja en 2 s en vertical sin inclinarte hacia la mancuerna', 'Sube en 2 s empujando con el pie delantero'],
        ['Hombros nivelados: la carga de un lado exige más al core', 'Rodilla delantera alineada con la punta del pie'],
        ['La rodilla trasera baja hacia el suelo sin tocarlo', 'Cambia la mancuerna de mano al cambiar de pierna'],
      ],
      orbit: SPL_ORBIT,
    },
  },
});

// ------------------------------------------------------------------ lote 5 (split squat con salto y con giro, zancadas)
const META5 = {"TI-SPL-009": {"name": "Split squat con salto (versión pliométrica ligera)", "level": "Avanzado"}, "TI-SPL-010": {"name": "Split squat con rotación de tronco", "level": "Avanzado"}, "TI-ZAN-001": {"name": "Zancada frontal", "level": "Principiante"}, "TI-ZAN-002": {"name": "Zancada hacia atrás (reverse lunge)", "level": "Principiante"}, "TI-ZAN-003": {"name": "Zancada lateral", "level": "Principiante"}, "TI-ZAN-004": {"name": "Zancada cruzada (curtsy lunge)", "level": "Intermedio"}, "TI-ZAN-005": {"name": "Zancada caminando (walking lunge)", "level": "Intermedio"}, "TI-ZAN-006": {"name": "Zancada con torso inclinado (foco glúteo)", "level": "Intermedio"}, "TI-ZAN-007": {"name": "Zancada con mancuernas", "level": "Avanzado"}, "TI-ZAN-008": {"name": "Zancada con barra", "level": "Avanzado"}};
const ZAN_BASE = { family: 'squat', sub: 'Zancadas', primary: ['Cuádriceps'], secondary: ['Glúteos', 'Isquiotibiales', 'Aductores'], tempo: { down: 2, pause: 0, up: 2 } };
const LUNGE = { zF: 0.30, zR: -0.58, pz: -0.05, yBot: 0.535, pTop: 35, pBot: 62 };
const ZCFG = { stance: 0.10, toeOut: 6, leanTop: 2, leanBot: 6, chestExt: 2, neckK: 0.3, kneeOut: 0.04 };
Object.assign(EXERCISES, {
  'TI-SPL-009': {
    ...SPL_BASE, ...META5['TI-SPL-009'], frame: FR_FLOOR, tempo: { down: 1, pause: 0, up: 0.6 }, rest: 1.0, shortCaps: true, upLabel: 'SALTO',
    cfg: { ...SPLCFG, arms: 'hips', split: { ...SPLIT_FLOOR, jump: true } },
    captions: {
      intro: 'Postura de paso largo, manos en la cadera y tronco erguido',
      reps: [
        ['Baja controlado y salta: las piernas cambian de posición en el aire'],
        ['Aterriza suave, con la rodilla flexionada y el tronco erguido'],
        ['Rodilla delantera alineada con el pie al caer; salto corto y rápido'],
      ],
      orbit: ['Baja absorbiendo con las piernas', 'Posición baja: músculos que trabajan', 'Salta de nuevo y cambia de pierna'],
    },
  },
  'TI-SPL-010': {
    ...SPL_BASE, ...META5['TI-SPL-010'], frame: FR_FLOOR, tempo: { down: 2, pause: 1, up: 2 },
    secondary: ['Glúteos', 'Aductores', 'Core'],
    cfg: { ...SPLCFG, arms: 'clasp', twist: 35, split: SPLIT_FLOOR },
    captions: {
      intro: 'Postura de paso largo y manos juntas frente al pecho',
      reps: [
        ['Baja en 2 s y gira el tronco hacia la pierna delantera', 'Vuelve al centro y sube en 2 s'],
        ['La cadera queda cuadrada al frente: gira solo el tronco', 'Rodilla delantera estable, sin irse hacia adentro'],
        ['Exhala durante el giro y mantén el core firme', 'El giro es controlado, sin impulso'],
      ],
      orbit: ['Baja y gira hacia la pierna delantera', 'Posición baja con giro: músculos que trabajan', 'Vuelve al centro y sube'],
    },
  },
  'TI-ZAN-001': {
    ...ZAN_BASE, ...META5['TI-ZAN-001'], frame: { tz: -0.22, dist: 4.7, distLow: 3.9, tyLow: 0.62 },
    cfg: { ...ZCFG, arms: 'hips', lunge: { ...LUNGE, type: 'fwd', mover: 'L' } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cadera',
      reps: [
        ['Da un paso largo al frente y baja en vertical', 'Empuja con el pie delantero para volver a la posición inicial'],
        ['Tronco erguido; la rodilla trasera baja hacia el suelo', 'Vuelve con un solo impulso, sin pasos intermedios'],
        ['Rodilla delantera alineada con la punta del pie', 'Talón delantero apoyado al bajar y al empujar'],
      ],
      orbit: ['Paso al frente y baja', 'Posición baja: músculos que trabajan', 'Empuja y vuelve atrás'],
    },
  },
  'TI-ZAN-002': {
    ...ZAN_BASE, ...META5['TI-ZAN-002'], frame: { tz: 0.0, dist: 4.7, distLow: 3.9, tyLow: 0.62 },
    cfg: { ...ZCFG, arms: 'hips', lunge: { ...LUNGE, type: 'back', mover: 'R' } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cadera',
      reps: [
        ['Da un paso largo atrás apoyando la punta y baja en vertical', 'Empuja con el pie delantero y vuelve a juntar los pies'],
        ['El peso se queda en la pierna delantera', 'Tronco erguido y cadera cuadrada'],
        ['Rodilla delantera alineada con la punta del pie', 'La rodilla trasera se acerca al suelo sin tocarlo'],
      ],
      orbit: ['Paso atrás y baja', 'Posición baja: músculos que trabajan', 'Empuja con la pierna delantera para volver'],
    },
  },
  'TI-ZAN-003': {
    ...ZAN_BASE, ...META5['TI-ZAN-003'], frame: { tz: -0.05, dist: 4.6, distLow: 3.9, tyLow: 0.68 },
    cfg: { ...ZCFG, arms: 'clasp', leanBot: 35, chestExt: 3, neckK: 0.6, lunge: { type: 'lat', mover: 'L', xS: -0.45, xM: 0.50, pxBot: 0.27, pzBot: -0.16 } },
    captions: {
      intro: 'De pie con los pies juntos y las manos frente al pecho',
      reps: [
        ['Da un paso amplio al lado y lleva la cadera atrás sobre esa pierna', 'Empuja con la pierna flexionada para volver al centro'],
        ['La otra pierna queda estirada, con el pie apoyado', 'Pecho alto y espalda neutra, con el tronco algo inclinado'],
        ['Rodilla flexionada alineada con la punta del pie', 'Peso en el talón de la pierna que trabaja'],
      ],
      orbit: ['Paso al lado y baja', 'Posición baja: músculos que trabajan', 'Empuja para volver al centro'],
    },
  },
  'TI-ZAN-004': {
    ...ZAN_BASE, ...META5['TI-ZAN-004'], frame: { tz: -0.05, dist: 4.6, distLow: 3.9, tyLow: 0.62 },
    cfg: { ...ZCFG, arms: 'hips', lunge: { zF: 0.10, zR: -0.38, pz: -0.10, yBot: 0.56, pTop: 35, pBot: 60, type: 'back', mover: 'R', rearX: 0.16, px: 0.03 } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cadera',
      reps: [
        ['Lleva una pierna atrás y cruzada, como en una reverencia, y baja', 'Empuja con la pierna delantera y vuelve a la posición inicial'],
        ['Cadera mirando al frente: no gires la pelvis con el cruce', 'Tronco erguido durante todo el recorrido'],
        ['Rodilla delantera alineada con la punta del pie', 'Trabaja más el glúteo medio de la pierna delantera'],
      ],
      orbit: ['Cruza atrás y baja', 'Posición baja: músculos que trabajan', 'Empuja para volver'],
    },
  },
  'TI-ZAN-005': {
    ...ZAN_BASE, ...META5['TI-ZAN-005'], track: true, frame: { tz: 0.0, dist: 4.8, distLow: 4.0, tyLow: 0.62 },
    cfg: { ...ZCFG, arms: 'hips', lunge: { ...LUNGE, type: 'fwd', alt: true, walk: true, z0: -0.2 } },
    captions: {
      intro: 'De pie con las manos en la cadera: la zancada avanza paso a paso',
      reps: [
        ['Paso largo al frente y baja en vertical', 'Sube y lleva el pie de atrás junto al de delante'],
        ['Alterna la pierna en cada paso', 'Tronco erguido y mirada al frente'],
        ['Rodilla delantera alineada con la punta del pie', 'Mantén la misma longitud de paso'],
      ],
      orbit: ['Siguiente paso y baja', 'Posición baja: músculos que trabajan', 'Sube y junta los pies'],
    },
  },
  'TI-ZAN-006': {
    ...ZAN_BASE, ...META5['TI-ZAN-006'], frame: { tz: 0.0, dist: 4.7, distLow: 3.9, tyLow: 0.62 },
    cfg: { ...ZCFG, arms: 'hips', leanBot: 30, neckK: 0.5, lunge: { ...LUNGE, pz: -0.10, yBot: 0.55, type: 'back', mover: 'R' } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cadera',
      reps: [
        ['Paso atrás y baja inclinando el tronco con la espalda neutra', 'Empuja con el pie delantero y vuelve a juntar los pies'],
        ['La inclinación del tronco aumenta el trabajo de los glúteos', 'Espalda recta: la inclinación sale de la cadera'],
        ['Rodilla delantera alineada con la punta del pie', 'Peso en el talón delantero'],
      ],
      orbit: ['Paso atrás y baja inclinado', 'Posición baja: músculos que trabajan', 'Empuja para volver'],
    },
  },
  'TI-ZAN-007': {
    ...ZAN_BASE, ...META5['TI-ZAN-007'], frame: { tz: -0.22, dist: 4.7, distLow: 3.9, tyLow: 0.62 },
    cfg: { ...ZCFG, arms: 'hang', hold: 'dbside', gripX: 0.235, lunge: { ...LUNGE, type: 'fwd', mover: 'L' } },
    captions: {
      intro: 'De pie con una mancuerna en cada mano, a los lados',
      reps: [
        ['Paso largo al frente y baja en vertical', 'Empuja con el pie delantero para volver'],
        ['Brazos relajados: las mancuernas cuelgan a los lados', 'Tronco erguido y hombros atrás'],
        ['Rodilla delantera alineada con la punta del pie', 'La rodilla trasera se acerca al suelo sin tocarlo'],
      ],
      orbit: ['Paso al frente y baja', 'Posición baja: músculos que trabajan', 'Empuja y vuelve atrás'],
    },
  },
  'TI-ZAN-008': {
    ...ZAN_BASE, ...META5['TI-ZAN-008'], frame: { tz: 0.0, dist: 4.7, distLow: 3.9, tyLow: 0.62 }, views: { side: { az: -64, el: 8 } },
    cfg: { ...ZCFG, arms: 'bar_high', lunge: { ...LUNGE, type: 'back', mover: 'R' } },
    captions: {
      intro: 'Barra sobre el trapecio y pies al ancho de caderas',
      reps: [
        ['Paso largo atrás y baja en vertical', 'Empuja con el pie delantero y vuelve a juntar los pies'],
        ['Codos abajo y escápulas juntas para fijar la barra', 'Tronco erguido: la barra sube y baja en vertical'],
        ['Rodilla delantera alineada con la punta del pie', 'Con carga, el paso atrás es más estable que al frente'],
      ],
      orbit: ['Paso atrás y baja', 'Posición baja: músculos que trabajan', 'Empuja para volver'],
    },
  },
});

// ------------------------------------------------------------------ coreografía
export const VIEWS = {
  f34: { az: -34, el: 6, label: 'VISTA 3/4 FRONTAL' },
  side: { az: -90, el: 4, label: 'VISTA LATERAL' },
  front: { az: 0, el: 6, label: 'VISTA FRONTAL' },
  back: { az: 180, el: 7, label: 'VISTA POSTERIOR' },
  back34: { az: 152, el: 10, label: 'VISTA POSTERIOR' },
  hackR: { az: 105, el: 10, label: 'VISTA LATERAL' },
};

export function viewsFor(def) {
  const v = {}; for (const k in VIEWS) v[k] = { ...VIEWS[k], ...((def.views || {})[k] || {}) }; return v;
}

export function buildTimeline(def) {
  const T = def.tempo;
  const top = def.rest ?? 0.95;
  const steps = [];
  let t = 0;
  const push = (st) => { st.t0 = t; t += st.dur; st.t1 = t; steps.push(st); };
  push({ kind: 'intro', dur: 1.7, view: 'f34' });
  const ov = (def.orbit && def.orbit.view) || 'back34';
  const order = [['f34', 'side'], ['side', 'front'], ['front', ov]];
  order.forEach(([v, nv], i) => push({ kind: 'rep', rep: i, view: v, next: nv, down: T.down, pause: T.pause, up: T.up, top, dur: T.down + T.pause + T.up + top }));
  const hold = 6.4;
  push({ kind: 'orbit', view: ov, down: T.down, hold, up: T.up, dur: T.down + hold + T.up });
  push({ kind: 'outro', dur: 0.9, view: ov });
  return { steps, duration: t };
}

function stepAt(tl, t) {
  for (const s of tl.steps) if (t < s.t1) return s;
  return tl.steps[tl.steps.length - 1];
}

// estado de la animación en el instante t
export function stateAt(def, tl, t) {
  const st = stepAt(tl, t);
  const u = t - st.t0;
  const out = { step: st, s: 0, act: 0, phase: '', progress: null, caption: null, viewKey: st.view, labelsAlpha: 0 };
  const T = def.tempo;
  if (st.kind === 'intro') {
    out.phase = 'POSICIÓN INICIAL'; out.caption = { text: def.captions.intro, t0: st.t0, t1: st.t1 + 0.0 };
  } else if (st.kind === 'rep') {
    const cap = def.captions.reps[st.rep];
    if (u < st.down) {
      out.s = easeInOutSine(u / st.down); out.phase = `BAJADA · ${fmt(T.down)} s`; out.progress = u / st.down; out.act = 0.35;
      out.caption = { text: cap[0], t0: st.t0, t1: st.t0 + st.down + st.pause };
    } else if (u < st.down + st.pause) {
      out.s = 1; out.phase = `PAUSA · ${fmt(T.pause)} s`; out.progress = (u - st.down) / st.pause; out.act = 0.55;
      out.caption = { text: cap[0], t0: st.t0, t1: st.t0 + st.down + st.pause };
    } else if (u < st.down + st.pause + st.up) {
      const k = (u - st.down - st.pause) / st.up;
      out.s = 1 - easeInOutSine(k); out.phase = `SUBIDA · ${fmt(T.up)} s`; out.progress = k; out.act = 0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, k * 1.3));
      out.caption = { text: cap[1], t0: st.t0 + st.down + st.pause, t1: st.t1 };
    } else {
      out.s = 0; out.phase = 'ARRIBA'; out.progress = 1; out.act = 0;
      out.caption = { text: cap[1], t0: st.t0 + st.down + st.pause, t1: st.t1 };
    }
    out.rep = st.rep + 1;
  } else if (st.kind === 'orbit') {
    const cap = def.captions.orbit;
    if (u < st.down) {
      out.s = easeInOutSine(u / st.down); out.phase = `BAJADA · ${fmt(T.down)} s`; out.progress = u / st.down; out.act = 0.35;
      out.caption = { text: cap[0], t0: st.t0, t1: st.t0 + st.down };
    } else if (u < st.down + st.hold) {
      out.s = 1; out.phase = (def.orbit && def.orbit.sweep && Math.abs(def.orbit.sweep) < 360) ? 'VISTA PANORÁMICA' : 'VISTA 360°';
      out.progress = (u - st.down) / st.hold; out.act = 0.5;
      out.caption = { text: cap[1], t0: st.t0 + st.down, t1: st.t0 + st.down + st.hold };
      const k = (u - st.down) / st.hold;
      out.labelsAlpha = smooth((k - 0.03) / 0.08) * (1 - smooth((k - 0.90) / 0.08));
    } else {
      const k = (u - st.down - st.hold) / st.up;
      out.s = 1 - easeInOutSine(k); out.phase = `SUBIDA · ${fmt(T.up)} s`; out.progress = k; out.act = 0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, k * 1.3));
      out.caption = { text: cap[2], t0: st.t0 + st.down + st.hold, t1: st.t1 };
    }
  } else {
    out.phase = 'FIN'; out.caption = null;
  }
  // un solo subtítulo por repetición (tempos rápidos) y ventanas más largas en la órbita
  if (st.kind === 'rep' && def.captions.reps[st.rep].length === 1) out.caption = { text: def.captions.reps[st.rep][0], t0: st.t0, t1: st.t1 };
  if (def.shortCaps) {
    const oc = def.captions.orbit, orb = tl.steps.find(k => k.kind === 'orbit');
    const ex = 2.2 - T.down, a = orb.t0 + orb.down + ex, b = orb.t0 + orb.down + orb.hold;
    if (st.kind === 'orbit') out.caption = t < a ? { text: oc[0], t0: orb.t0, t1: a } : (t < b ? { text: oc[1], t0: a, t1: b } : { text: oc[2], t0: b, t1: tl.duration });
    else if (st.kind === 'outro') out.caption = { text: oc[2], t0: b, t1: tl.duration };
  }
  // tirones desde el suelo: la repetición empieza abajo (se invierte la profundidad y las fases)
  if (def.fromFloor) {
    out.s = 1 - out.s;
    out.phase = out.phase.replace('BAJADA', '#').replace('SUBIDA', 'BAJADA').replace('#', 'SUBIDA').replace('PAUSA', 'BLOQUEO').replace('ARRIBA', 'EN EL SUELO');
    if (out.phase.startsWith('SUBIDA')) out.act = 0.85; else if (out.phase.startsWith('BAJADA')) out.act = 0.45;
    if (st.kind === 'orbit') out.topLabel = 'BLOQUEO ARRIBA';
  }
  // transparencia del subtítulo
  if (out.caption) {
    const fi = 0.28;
    out.caption.alpha = smooth((t - out.caption.t0) / fi) * (1 - smooth((t - (out.caption.t1 - fi)) / fi));
  }
  out.reveal = smooth(t / 1.1);
  // armTop: 0 = brazos colgando en reposo, 1 = final del impulso (swing)
  if (st.kind === 'rep') { const tt = st.down + st.pause; out.armTop = u < tt ? 0 : (u < tt + st.up ? 1 : 1 - smooth((u - tt - st.up) / (st.top * 0.8))); }
  else if (st.kind === 'orbit') out.armTop = u < st.down ? 0 : 1;
  else if (st.kind === 'outro') out.armTop = 1 - smooth(u / (st.dur * 0.8));
  else out.armTop = 0;
  if (def.iso) {
    const first = tl.steps[1], orb = tl.steps.find(k => k.kind === 'orbit');
    const tA = first.t0 + first.down, tB = orb.t0 + orb.down + orb.hold;
    if (t >= tA && t < tB) {
      out.s = 1; out.act = 0.75; out.rep = null; out.topLabel = 'ISOMÉTRICO';
      if (st.kind !== 'orbit' || u < st.down) { out.phase = 'MANTÉN LA POSICIÓN'; }
      out.progress = (t - tA) / (tB - tA);
    } else if (t < tA) out.topLabel = 'ENTRADA';
  }
  out.up = (st.kind === 'rep' && u >= st.down + st.pause) || (st.kind === 'orbit' && u >= st.down + st.hold) || st.kind === 'outro';
  out.repIdx = st.kind === 'rep' ? st.rep : (st.kind === 'orbit' || st.kind === 'outro' ? 3 : 0);
  if (def.upLabel) out.phase = out.phase.replace('SUBIDA', def.upLabel);
  if (def.phaseNames) out.phase = out.phase.replace(/BAJADA|SUBIDA|PAUSA|ARRIBA/g, (m) => def.phaseNames[m] ?? m);
  if (def.holdLabel && st.kind === 'orbit') out.topLabel = def.holdLabel;
  return out;
}
const fmt = (x) => (Math.round(x * 10) / 10).toString().replace('.', ',');

// cámara: acimut, elevación, distancia y objetivo
export function cameraAt(def, tl, t, frame) {
  const st = stepAt(tl, t);
  const u = t - st.t0;
  const base = { dist: frame.dist, ty: frame.ty };
  let az, el, dist = base.dist, ty = base.ty;
  const VV = viewsFor(def); const V = (k) => VV[k];
  if (st.kind === 'intro') {
    const k = easeInOutSine(u / st.dur);
    az = V('f34').az - 10 * (1 - k); el = V('f34').el; dist = base.dist + 0.55 * (1 - k);
  } else if (st.kind === 'rep') {
    const a = V(st.view), b = V(st.next);
    const tt = st.down + st.pause + st.up;
    const k = u < tt ? 0 : easeInOutSine((u - tt) / st.top);
    let azB = b.az; if (azB - a.az > 180) azB -= 360; if (a.az - azB > 180) azB += 360;
    az = lerp(a.az, azB, k); el = lerp(a.el, b.el, k);
  } else if (st.kind === 'orbit') {
    const a = V(st.view);
    const sweep = (def.orbit && def.orbit.sweep) ?? 360;
    if (u < st.down) {
      az = a.az; el = a.el;
      const k = easeInOutSine(u / st.down);
      dist = lerp(base.dist, frame.distLow, k); ty = lerp(base.ty, frame.tyLow, k);
    } else if (u < st.down + st.hold) {
      const k = (u - st.down) / st.hold;
      az = a.az + sweep * easeInOutSine(k); el = a.el + 6 * Math.sin(Math.PI * k);
      dist = frame.distLow; ty = frame.tyLow;
    } else {
      const k = easeInOutSine((u - st.down - st.hold) / st.up);
      az = a.az + sweep; el = a.el; dist = lerp(frame.distLow, base.dist, k); ty = lerp(frame.tyLow, base.ty, k);
    }
  } else {
    const sweep = (def.orbit && def.orbit.sweep) ?? 360;
    az = V(st.view).az + sweep; el = V(st.view).el;
  }
  return { az, el, dist, ty, tz: frame.tz || 0 };
}

export function viewLabelAt(tl, t, cam) {
  let a = ((cam.az % 360) + 540) % 360 - 180; // -180..180
  const A = Math.abs(a);
  if (A < 17) return 'VISTA FRONTAL';
  if (A < 62) return 'VISTA 3/4 FRONTAL';
  if (A < 118) return 'VISTA LATERAL';
  if (A < 163) return 'VISTA 3/4 POSTERIOR';
  return 'VISTA POSTERIOR';
}

// etiquetas anatómicas visibles
export function labelsAt(def, rig, camera, alpha, W, H) {
  if (alpha <= 0.01) return [];
  const out = [];
  const camPos = camera.position;
  const groups = [...def.primary.map(n => [n, 2]), ...def.secondary.map(n => [n, 1])];
  const dyMap = { 'Cuádriceps': 0, 'Glúteos': -26, 'Isquiotibiales': 34, 'Core': -40, 'Aductores': 20, 'Erectores espinales': -44 };
  for (const [name, lv] of groups) {
    const anchors = ANCHORS[name]; if (!anchors) continue;
    let best = null;
    for (const a of anchors) {
      let p, n;
      if (a.seg) {
        const m = rig.meshes[a.seg];
        p = V3(...a.p).applyQuaternion(m.quaternion).add(m.position);
        n = V3(...a.n).normalize().applyQuaternion(m.quaternion);
      } else {
        const b = rig.bones[a.bone];
        const rel = V3(...a.p).sub(rig.J[a.bone]);
        p = rel.applyQuaternion(b.quaternion).add(b.position);
        n = V3(...a.n).normalize().applyQuaternion(b.quaternion);
      }
      const facing = n.dot(camPos.clone().sub(p).normalize());
      if (!best || facing > best.facing) best = { p, facing };
    }
    const sp = best.p.clone().project(camera);
    const x = (sp.x * 0.5 + 0.5) * W, y = (-sp.y * 0.5 + 0.5) * H;
    const a = alpha * (def.labelAll ? Math.max(0.85, smooth((best.facing + 0.02) / 0.22)) : smooth((best.facing + 0.02) / 0.22));
    out.push({ x, y, text: name, color: lv === 2 ? '#d4251f' : '#ec8a78', alpha: a, side: x < W / 2 ? -1 : 1, reach: 120, dy: dyMap[name] || 0 });
  }
  // columnas alineadas a cada lado y separación vertical mínima entre etiquetas
  for (const side of [-1, 1]) {
    const L = out.filter(o => o.side === side && o.alpha > 0.02).sort((a, b) => a.y - b.y);
    if (!L.length) continue;
    const colX = side < 0 ? Math.min(...L.map(o => o.x)) - 70 : Math.max(...L.map(o => o.x)) + 70;
    let prev = -1e9;
    for (const o of L) {
      let ly = Math.max(o.y + o.dy * 0.4, prev + 40);
      prev = ly;
      o.reach = Math.abs(colX - o.x); o.dy = ly - o.y;
    }
  }
  return out;
}
export { SPLCFG, SPLIT_FLOOR, SPLIT_BENCH, HCFG, SINGLE };
