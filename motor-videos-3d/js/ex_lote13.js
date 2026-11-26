// Lote 13: tibial anterior TI-TIB-006 … 010 y estabilidad TI-EST-001 … 005
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';
import { V3 } from './kin.js';
import { TIB, WALK } from './ex_lote12.js';

GROUPS['Estabilizadores de cadera y rodilla'] = ['gluteo_medio', 'tfl', 'aductores'];
ANCHORS['Estabilizadores de cadera y rodilla'] = [
  { bone: 'pelvis', p: [0.150, 1.000, -0.040], n: [1, 0, -0.3] },
  { bone: 'pelvis', p: [-0.150, 1.000, -0.040], n: [-1, 0, -0.3] },
];
GROUPS['Glúteo medio'] = ['gluteo_medio'];
ANCHORS['Glúteo medio'] = ANCHORS['Estabilizadores de cadera y rodilla'];

const EST = { sub: 'Estabilidad', primary: ['Estabilizadores de cadera y rodilla'], secondary: ['Core', 'Cuádriceps'], tempo: { down: 3, pause: 1, up: 2 } };
const BOSU_SQ = { arms: 'forward', stance: 0.13, toeOut: 10, hipBottom: 0.62, leanTop: 2, leanBot: 38, kneeOut: 0.06, ankleY: 0.29 };

Object.assign(EXERCISES, {
  'TI-TIB-006': {
    ...TIB, name: 'Flexión dorsal con banda en tumbado', level: 'Intermedio',
    frame: { dist: 4.0, ty: 0.22, tz: 0.30, distLow: 3.4, tyLow: 0.22 }, views: { f34: { el: 16 }, side: { el: 10 }, front: { el: 18 }, back34: { az: 140, el: 24 } },
    cfg: { free: { type: 'footSeat', pose: 'lying', single: 'L', pitchB: 28, pitchT: -14, band: [0.09, 0.12, 1.28] }, items: [{ kind: 'mat', z: 0.1, l: 1.9 }, { kind: 'post', h: 0.24, x: 0.12, z: 1.32 }] },
    captions: {
      intro: 'Tumbado boca arriba, piernas estiradas y banda anclada delante sobre el empeine',
      reps: [
        ['Lleva la punta del pie hacia ti contra la banda', 'Vuelve en 2 s controlando'],
        ['La pierna queda apoyada: solo se mueve el tobillo', 'Recorrido completo'],
        ['Buena opción si estar de pie molesta', 'Cambia de pie al terminar la serie'],
      ],
      orbit: ['Punta hacia ti', 'Flexión dorsal: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-TIB-007': {
    ...TIB, ...WALK, name: 'Marcha con dorsiflexión activa exagerada', level: 'Avanzado',
    frame: { dist: 4.8, ty: 0.88, tz: 0.0, distLow: 4.2, tyLow: 0.82 },
    cfg: { free: { type: 'gait', highKnee: true, dorsi: true, stepLen: 0.42, stepTime: 0.75, lift: 0.12, width: 0.10 } },
    captions: {
      intro: 'De pie, listo para caminar',
      reps: [
        ['Eleva la rodilla y lleva la punta del pie hacia arriba en cada paso', 'Apoya primero el talón'],
        ['Exagera la flexión del tobillo durante todo el vuelo del pie', 'Brazos coordinados con las piernas'],
        ['Ritmo lento y controlado', 'Tramos de 15–20 m'],
      ],
      orbit: ['Sigue marchando', 'En marcha: músculos que trabajan', 'Puntas arriba en cada paso'],
    },
  },
  'TI-TIB-008': {
    ...TIB, name: 'Tibialis raise con barra apoyada', level: 'Avanzado',
    frame: { dist: 4.1, ty: 0.55, tz: 0.25, distLow: 3.5, tyLow: 0.45 },
    cfg: { free: { type: 'footSeat', pose: 'bench', seatY: 0.47, footZ: 0.50, pitchB: 0, pitchT: -26, footLoad: true }, items: [{ kind: 'box', h: 0.47, w: 0.62, d: 0.46, z: -0.02 }] },
    captions: {
      intro: 'Sentado, talones apoyados y una barra corta con discos sobre los empeines',
      reps: [
        ['Levanta la punta de los pies elevando la barra', 'Bájala en 2 s controlando'],
        ['Los talones no se despegan del suelo', 'Sujeta la barra con un pie a cada lado'],
        ['Progresa poco a poco: el tibial anterior es pequeño', 'Recorrido completo, sin rebote'],
      ],
      orbit: ['Puntera arriba', 'Flexión dorsal: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-TIB-009': {
    ...TIB, name: 'Flexión dorsal isométrica con resistencia manual', level: 'Avanzado', iso: true, holdLabel: null,
    frame: { dist: 4.0, ty: 0.40, tz: 0.30, distLow: 3.4, tyLow: 0.36 }, views: { f34: { el: 14 }, side: { el: 8 }, front: { el: 14 }, back34: { az: 140, el: 22 } },
    cfg: { free: { type: 'footSeat', pose: 'long', recline: -8, single: 'L', bentWork: true, handOnFoot: 'L', pitchB: 0, pitchT: -6 }, items: [{ kind: 'mat', z: 0.3, l: 1.6 }] },
    captions: {
      intro: 'Sentado, con la mano sobre el empeine del pie que trabaja',
      reps: [
        ['Intenta subir la punta del pie mientras la mano lo frena', 'Mantén el empuje sin que el pie se mueva'],
        ['Empuje progresivo, al 60–80% de tu fuerza', 'Mantén 20–30 s'],
        ['Respira de forma continua', 'Cambia de pie al terminar'],
      ],
      orbit: ['Empuja contra la mano', 'Posición isométrica: músculos que trabajan', 'Suelta poco a poco'],
    },
  },
  'TI-TIB-010': {
    ...TIB, name: 'Ejercicio de dorsiflexión en sentadilla contra pared', level: 'Avanzado',
    views: { f34: { az: -40 }, side: { az: -90 }, front: { az: -20 }, back34: { az: -130, el: 14 } }, orbit: { view: 'side', sweep: 180 },
    cfg: { arms: 'sides', free: { type: 'calf', heelPivot: true, maxPitch: 22, kneeFlex: 80, footZ: 0.45, pzOff: -0.34, lean: 0 }, items: [{ kind: 'wall', z: -0.16 }] },
    captions: {
      intro: 'En sentadilla isométrica contra la pared, rodillas a unos 90°',
      reps: [
        ['Sin moverte de la sentadilla, levanta la punta de los pies', 'Bájala en 2 s'],
        ['Los talones quedan apoyados y la espalda en la pared', 'Trabajan a la vez cuádriceps y tibial'],
        ['Rodillas alineadas con los pies', 'Respira de forma continua'],
      ],
      orbit: ['Puntera arriba', 'Flexión dorsal: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-EST-001': {
    ...EST, family: 'squat', name: 'Sentadilla en superficie inestable (bosu)', level: 'Principiante', frame: { tz: 0.0, dist: 4.7, ty: 1.05, tyLow: 0.85 },
    cfg: { ...BOSU_SQ, items: [{ kind: 'bosu', z: 0.02 }] },
    captions: {
      intro: 'De pie sobre la cúpula del bosu, pies al ancho de caderas',
      reps: [
        ['Baja en 3 s controlando el equilibrio', 'Sube en 2 s empujando con todo el pie'],
        ['Rodillas alineadas con los pies: no se van hacia dentro', 'Profundidad moderada: prioriza el control'],
        ['Core firme y mirada al frente', 'Si pierdes el equilibrio, reduce el rango'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube estable'],
    },
  },
  'TI-EST-002': {
    ...EST, family: 'squat', name: 'Zancada en superficie inestable', level: 'Principiante', frame: { tz: -0.10, dist: 4.7, ty: 1.0, distLow: 4.0, tyLow: 0.72 },
    cfg: { stance: 0.10, toeOut: 6, leanTop: 2, leanBot: 6, chestExt: 2, neckK: 0.3, kneeOut: 0.04, arms: 'hips',
      split: { front: 'L', rear: 'R', mode: 'floor', zF: 0.30, zR: -0.58, pTop: 35, pBot: 62, pz: -0.05, yBot: 0.62, step: 0.21, noBox: true },
      items: [{ kind: 'bosu', x: 0.10, z: 0.34 }] },
    captions: {
      intro: 'Pie delantero sobre el bosu y pie trasero en el suelo, en posición de zancada',
      reps: [
        ['Baja en 3 s con el peso sobre la pierna del bosu', 'Sube en 2 s sin perder el equilibrio'],
        ['Rodilla delantera alineada con el pie', 'Tronco erguido y core firme'],
        ['Movimiento lento: la inestabilidad es el estímulo', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube estable'],
    },
  },
  'TI-EST-003': {
    ...EST, family: 'squat', sub: 'Estabilidad', name: 'Peso muerto a una pierna sobre bosu', level: 'Principiante', secondary: ['Core', 'Isquiotibiales', 'Glúteos'],
    frame: { tz: -0.05, dist: 4.9, ty: 1.05, tyLow: 0.95 },
    cfg: { stance: 0.06, toeOut: 8, hipBottom: 1.10, leanTop: 2, leanBot: 62, kneeOut: 0.03, chestExt: 2, neckK: 0.55, single: 'R', pelvisX: -0.03, arms: 'hips', ankleY: 0.29,
      items: [{ kind: 'bosu', x: -0.06, z: 0.0 }] },
    captions: {
      intro: 'De pie sobre el bosu con una pierna; la otra se despega del suelo',
      reps: [
        ['Inclina el tronco en 3 s mientras la pierna libre sube atrás', 'Vuelve arriba apretando el glúteo de apoyo'],
        ['Cadera cuadrada y rodilla de apoyo desbloqueada', 'El tobillo trabaja para mantener el equilibrio'],
        ['Rango moderado: prioriza la estabilidad', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Inclina controlando', 'Posición baja: músculos que trabajan', 'Vuelve arriba estable'],
    },
  },
  'TI-EST-004': {
    ...EST, family: 'free', name: 'Step up sobre superficie inestable', level: 'Intermedio', tempo: { down: 2, pause: 1, up: 2 },
    phaseNames: { BAJADA: 'SUBIDA', SUBIDA: 'BAJADA', ARRIBA: 'ABAJO' }, holdLabel: 'ARRIBA',
    frame: { dist: 5.2, ty: 1.12, distLow: 4.7, tyLow: 1.20, tz: 0.22 },
    cfg: { stance: 0.10, toeOut: 6, kneeOut: 0.04, arms: 'hips',
      free: { type: 'stepUp', lead: 'L', h: 0.21, leadA: [0.10, 0.36], trailB: [-0.10, 0.0], trailT: [-0.10, 0.36], pB: [0.0, 0.08], pT: [0.0, 0.37], leanB: 12, leanT: 2 },
      items: [{ kind: 'bosu', z: 0.40 }] },
    captions: {
      intro: 'Frente al bosu con un pie apoyado sobre la cúpula',
      reps: [
        ['Sube empujando con la pierna del bosu y estabiliza arriba', 'Baja controlando con la misma pierna'],
        ['Mantén 1 s el equilibrio arriba', 'Rodilla alineada con el pie'],
        ['El pie de abajo no se impulsa', 'Core firme durante todo el movimiento'],
      ],
      orbit: ['Sube y estabiliza', 'Arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-EST-005': {
    ...EST, family: 'squat', name: 'Sentadilla con perturbación externa (banda)', level: 'Intermedio', frame: { tz: 0.0, dist: 4.9 },
    views: { f34: { az: -20 }, front: { az: 10 } },
    cfg: { arms: 'forward', stance: 0.15, toeOut: 12, hipBottom: 0.50, leanTop: 2, leanBot: 40, kneeOut: 0.07, hipBand: { anchor: V3(-1.05, 0.92, 0.0) } },
    captions: {
      intro: 'Banda alrededor de la cadera, anclada a un lado y con tensión',
      reps: [
        ['Baja en 3 s sin dejar que la banda te desplace', 'Sube en 2 s manteniendo la cadera centrada'],
        ['Las rodillas no se van hacia el lado de la banda', 'Reparte el peso por igual en los dos pies'],
        ['Core firme: la banda intenta sacarte del eje', 'Cambia el lado del anclaje en la siguiente serie'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube centrado'],
    },
  },
});
