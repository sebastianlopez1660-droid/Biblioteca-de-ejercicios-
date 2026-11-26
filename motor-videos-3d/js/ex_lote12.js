// Lote 12: elevación de talones TI-PAN-006 … 010 y tibial anterior TI-TIB-001 … 005
import { EXERCISES } from './exercises.js';
import { PAN } from './ex_lote11.js';

const ORB_PAN = ['Sube hasta la punta de los pies', 'Arriba: músculos que trabajan', 'Baja controlando'];
export const TIB = { family: 'free', sub: 'Tibial anterior', primary: ['Tibial anterior'], secondary: [], tempo: { down: 2, pause: 0, up: 2 },
  phaseNames: { BAJADA: 'PUNTERA ARRIBA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'FLEXIÓN DORSAL',
  frame: { dist: 4.2, ty: 0.80, tz: 0.05, distLow: 3.6, tyLow: 0.62 } };
export const WALK = { phaseNames: { BAJADA: 'EN MARCHA', SUBIDA: 'EN MARCHA', PAUSA: 'EN MARCHA', ARRIBA: 'EN MARCHA' }, holdLabel: 'EN MARCHA', track: true };

Object.assign(EXERCISES, {
  'TI-PAN-006': {
    ...PAN, name: 'Elevación de talones con rodilla flexionada (énfasis sóleo)', level: 'Intermedio',
    cfg: { arms: 'hips', free: { type: 'calf', kneeFlex: 32, maxPitch: 30 } },
    captions: {
      intro: 'De pie con las rodillas flexionadas unos 30° y manos en la cintura',
      reps: [
        ['Sube a la punta de los pies sin estirar las rodillas', 'Baja en 2 s controlando'],
        ['Con la rodilla flexionada trabaja sobre todo el sóleo', 'Aprieta 1 s arriba'],
        ['El ángulo de la rodilla no cambia en toda la serie', 'Peso sobre el dedo gordo y el segundo dedo'],
      ],
      orbit: ORB_PAN,
    },
  },
  'TI-PAN-007': {
    ...PAN, name: 'Elevación de talones con barra', level: 'Avanzado', frame: { dist: 4.4, ty: 0.88, tz: 0.05, distLow: 3.8, tyLow: 0.72 },
    cfg: { arms: 'bar_high', free: { type: 'calf', maxPitch: 32 } },
    captions: {
      intro: 'Barra sobre el trapecio, pies al ancho de caderas',
      reps: [
        ['Sube a la punta de los pies en 1 s', 'Baja en 2 s hasta apoyar los talones'],
        ['Tronco erguido: la barra sube en vertical', 'Aprieta 1 s arriba'],
        ['Rodillas estiradas sin bloquear', 'Usa un rack o una máquina Smith para más seguridad'],
      ],
      orbit: ORB_PAN,
    },
  },
  'TI-PAN-008': {
    ...PAN, name: 'Elevación de talones con mancuerna a una pierna', level: 'Avanzado',
    cfg: { arms: 'hang', hold: 'db1', loadSide: 'L', free: { type: 'calf', single: 'L', maxPitch: 30 } },
    captions: {
      intro: 'De pie sobre una pierna con una mancuerna en la mano del mismo lado',
      reps: [
        ['Sube a la punta del pie de apoyo', 'Baja en 2 s controlando'],
        ['La mancuerna cuelga quieta junto a la pierna', 'Apoya la otra mano en una pared si lo necesitas'],
        ['Aprieta 1 s arriba', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ORB_PAN,
    },
  },
  'TI-PAN-009': {
    ...PAN, name: 'Elevación de talones isométrica con pausa', level: 'Avanzado', tempo: { down: 1, pause: 3, up: 2 },
    cfg: { arms: 'hips', free: { type: 'calf', maxPitch: 32 } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cintura',
      reps: [
        ['Sube a la punta de los pies y mantén 3 s', 'Baja en 2 s'],
        ['En la pausa, los talones no bajan ni un centímetro', 'Tobillos alineados: no se van hacia afuera'],
        ['Respira de forma continua durante la pausa', 'Rodillas estiradas sin bloquear'],
      ],
      orbit: ['Sube y mantén', 'Pausa arriba: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-PAN-010': {
    ...PAN, name: 'Elevación de talones excéntrica lenta', level: 'Avanzado', tempo: { down: 1, pause: 0.5, up: 4 },
    cfg: { arms: 'hips', free: { type: 'calf', maxPitch: 32 } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y manos en la cintura',
      reps: [
        ['Sube en 1 s', 'Baja en 4 s frenando con la pantorrilla'],
        ['La bajada lenta es la parte importante', 'Útil para prevenir y tratar molestias del tendón de Aquiles'],
        ['Para progresar, sube con dos pies y baja con uno', 'Rodillas estiradas sin bloquear'],
      ],
      orbit: ['Sube', 'Arriba: músculos que trabajan', 'Baja en 4 s'],
    },
  },
  'TI-TIB-001': {
    ...TIB, name: 'Flexión dorsal de tobillo con banda', level: 'Principiante',
    frame: { dist: 4.0, ty: 0.30, tz: 0.45, distLow: 3.4, tyLow: 0.30 }, views: { f34: { el: 14 }, side: { el: 8 }, front: { el: 14 }, back34: { az: 140, el: 22 } },
    cfg: { free: { type: 'footSeat', pose: 'long', single: 'L', pitchB: 28, pitchT: -14, band: [0.09, 0.10, 1.40] }, items: [{ kind: 'mat', z: 0.35, l: 1.6 }, { kind: 'post', h: 0.22, x: 0.12, z: 1.44 }] },
    captions: {
      intro: 'Sentado con las piernas estiradas y una banda anclada delante, sobre el empeine',
      reps: [
        ['Lleva la punta del pie hacia ti contra la banda', 'Vuelve en 2 s sin que la banda te tire'],
        ['Solo se mueve el tobillo: la pierna queda quieta', 'Recorrido completo, sin rebotes'],
        ['Mantén la tensión de la banda todo el tiempo', 'Cambia de pie al terminar la serie'],
      ],
      orbit: ['Punta hacia ti', 'Flexión dorsal: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TI-TIB-002': {
    ...TIB, name: 'Elevación de puntera de pie (toe raise)', level: 'Principiante',
    cfg: { arms: 'hips', free: { type: 'calf', heelPivot: true, maxPitch: 24 } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y peso sobre los talones',
      reps: [
        ['Levanta la punta de los pies apoyado en los talones', 'Bájala en 2 s sin dejarla caer'],
        ['Las rodillas no se doblan', 'Tronco erguido, sin echarse hacia atrás'],
        ['Si pierdes el equilibrio, apoya las manos en una pared', 'Movimiento lento y controlado'],
      ],
      orbit: ['Puntera arriba', 'Flexión dorsal: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-TIB-003': {
    ...TIB, ...WALK, name: 'Caminata en talones (heel walk)', level: 'Principiante',
    frame: { dist: 4.6, ty: 0.85, tz: 0.0, distLow: 4.0, tyLow: 0.80 },
    cfg: { free: { type: 'gait', heel: true, stepLen: 0.34, stepTime: 0.55, lift: 0.05, width: 0.10, armsHips: true } },
    captions: {
      intro: 'De pie, manos en la cintura',
      reps: [
        ['Camina apoyando solo los talones', 'La punta de los pies no toca el suelo'],
        ['Pasos cortos y tronco erguido', 'Mantén la punta del pie arriba todo el tiempo'],
        ['Notarás el trabajo en la parte delantera de la pierna', 'Haz tramos de 15–20 m'],
      ],
      orbit: ['Sigue caminando sobre los talones', 'En marcha: músculos que trabajan', 'Puntas arriba hasta terminar el tramo'],
    },
  },
  'TI-TIB-004': {
    ...TIB, name: 'Flexión dorsal con peso sobre el pie', level: 'Intermedio',
    frame: { dist: 4.1, ty: 0.55, tz: 0.25, distLow: 3.5, tyLow: 0.45 },
    cfg: { free: { type: 'footSeat', pose: 'bench', seatY: 0.47, footZ: 0.50, pitchB: 0, pitchT: -26, footLoad: true }, items: [{ kind: 'box', h: 0.47, w: 0.62, d: 0.46, z: -0.02 }] },
    captions: {
      intro: 'Sentado, talones apoyados y un peso sobre el empeine',
      reps: [
        ['Levanta la punta de los pies con el peso encima', 'Bájala en 2 s controlando'],
        ['Los talones no se despegan del suelo', 'Sujeta el peso para que no resbale'],
        ['Empieza con poco peso: el tibial es un músculo pequeño', 'Recorrido completo'],
      ],
      orbit: ['Puntera arriba', 'Flexión dorsal: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-TIB-005': {
    ...TIB, name: 'Tibialis raise contra pared', level: 'Intermedio',
    views: { f34: { az: -40 }, side: { az: -90 }, front: { az: -20 }, back34: { az: -130, el: 14 } }, orbit: { view: 'side', sweep: 180 },
    cfg: { arms: 'sides', free: { type: 'calf', heelPivot: true, maxPitch: 26, footZ: 0.32, pzOff: -0.32, lean: -2 }, items: [{ kind: 'wall', z: -0.17 }] },
    captions: {
      intro: 'Espalda y glúteos apoyados en la pared, pies un paso por delante',
      reps: [
        ['Levanta la punta de los pies apoyado en los talones', 'Bájala en 2 s sin tocar el suelo con fuerza'],
        ['Cuanto más lejos los pies de la pared, más difícil', 'Piernas estiradas y espalda en la pared'],
        ['Aprieta 1 s arriba', 'Movimiento controlado'],
      ],
      orbit: ['Puntera arriba', 'Flexión dorsal: músculos que trabajan', 'Baja controlando'],
    },
  },
});
