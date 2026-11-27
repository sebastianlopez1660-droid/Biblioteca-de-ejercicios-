// Lote 48: extensión CO-EXT-006 … 010 y core funcional CO-CFU-001 … 005
import { EXERCISES } from './exercises.js';
import './ex_lote6.js';
import './ex_lote14.js';
import './ex_lote28.js';
import { plankKey, handsFloor, shoulderZ } from './ts_common.js';
import './ex_lote47.js';

const EXT = { sub: 'Extensión de tronco', primary: ['Erectores espinales'], secondary: ['Glúteos', 'Isquiotibiales'] };
export const CFU = { family: 'free', sub: 'Core funcional', primary: ['Transverso abdominal', 'Oblicuos', 'Recto abdominal'], secondary: ['Glúteos', 'Erectores espinales'], labelAll: true };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const HEAD = { aL: [150, 40, 130], aR: [150, 40, 130], pL: [0, 0, -1, -1, 0, 0], pR: [0, 0, -1, 1, 0, 0] };
const ESP4 = EXERCISES['TS-ESP-004'];
// tumbado boca abajo en un banco plano con la cadera en el borde (cabeza hacia +z)
const RH = { P: [0, 0.60, -0.04], rot: [90, 0, 0], sp: [0, 0, 0], nk: [-14, 0], hL: [0.20, 0.42, 0.62], hR: [-0.20, 0.42, 0.62], eL: [0.6, 0.3, -1], eR: [-0.6, 0.3, -1], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] };
const RH_FR = { frame: { dist: 4.2, ty: 0.55, tz: 0.15, distLow: 3.9, tyLow: 0.52 }, views: { f34: { az: -60, el: 16 }, side: { az: -90, el: 6 }, front: { az: -30, el: 20 }, back34: { az: -140, el: 24 } }, orbit: { view: 'side', sweep: 150 } };
const HF = handsFloor(21);
const FW = (w) => ({ L: [w, ...plankKey(21).L.slice(1)], R: [-w, ...plankKey(21).R.slice(1)] });
const PK = { ...plankKey(21), ...FW(0.22) };
const [SY, SZ] = shoulderZ(21);

Object.assign(EXERCISES, {
  'CO-EXT-006': {
    ...like('TS-ESP-004', {}), ...EXT, name: 'Hiperextensión con pausa isométrica', level: 'Intermedio', tempo: { down: 2, pause: 3, up: 2 },
    phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'BAJADA', ARRIBA: 'TRONCO ABAJO' }, holdLabel: 'PAUSA ARRIBA 3 s',
    cfg: { ...ESP4.cfg, free: { ...ESP4.cfg.free, keys: ESP4.cfg.free.keys.map((k) => ({ ...k, u: 1 - k.u })).reverse() } },
    captions: {
      intro: 'En el banco romano con el tronco abajo y las manos cruzadas al pecho',
      reps: [
        ['Sube hasta alinear el cuerpo y mantén 3 s', 'Baja controlando'],
        ['En la pausa: glúteos apretados y espalda neutra', 'No pases de la línea del cuerpo'],
        ['Respira durante la pausa', 'Sin balanceos'],
      ],
      orbit: ['Pausa arriba', 'Isometría: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-EXT-007': {
    family: 'free', ...EXT, name: 'Extensión de espalda en balón suizo (prono)', level: 'Avanzado', labelAll: true, tempo: { down: 2, pause: 1, up: 2 },
    phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'BAJADA', ARRIBA: 'SOBRE EL BALÓN' }, holdLabel: 'CUERPO ALINEADO',
    frame: { dist: 4.2, ty: 0.55, tz: 0.10, distLow: 3.9, tyLow: 0.52 }, views: { f34: { az: -60, el: 14 }, side: { az: -90, el: 6 }, front: { az: -30, el: 18 }, back34: { az: -140, el: 22 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', ball: { r: 0.33 }, ballAt: [0, 0.33, 0.02],
      keys: [
        { u: 0, P: [0, 0.66, -0.06], rot: [124, 0, 0], sp: [14, 0, 0], nk: [-6, 0], L: [0.16, 0.08, -0.90, 60, 6], R: [-0.16, 0.08, -0.90, 60, -6], kL: [0, -1, 0.2], kR: [0, -1, 0.2], ...HEAD },
        { u: 1, P: [0, 0.66, -0.06], rot: [96, 0, 0], sp: [-8, 0, 0], nk: [-14, 0], L: [0.16, 0.08, -0.90, 60, 6], R: [-0.16, 0.08, -0.90, 60, -6], kL: [0, -1, 0.2], kR: [0, -1, 0.2], ...HEAD }] } },
    captions: {
      intro: 'Cadera apoyada sobre el balón, pies separados en el suelo y manos junto a la cabeza',
      reps: [
        ['Extiende el tronco hasta alinearlo con las piernas', 'Baja abrazando el balón'],
        ['Pies firmes: el balón no rueda', 'No pases de la línea del cuerpo'],
        ['Aprieta glúteos arriba', 'Movimiento controlado'],
      ],
      orbit: ['Cuerpo alineado', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-EXT-008': {
    ...like('TS-ESP-004', {}), ...EXT, primary: ['Erectores espinales', 'Glúteos'], secondary: ['Isquiotibiales'], name: 'Extensión combinada de cadera y espalda', level: 'Avanzado', tempo: { down: 2.5, pause: 0.5, up: 2.5 },
    captions: {
      intro: 'En el banco romano con el tronco alineado',
      reps: [
        ['Baja primero redondeando la espalda y luego doblando la cadera', 'Sube estirando la cadera y después la espalda'],
        ['Movimiento segmentado y lento', 'Glúteos apretados al final'],
        ['No pases de la línea del cuerpo', 'Respira en cada repetición'],
      ],
      orbit: ['Cuerpo alineado', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-EXT-009': {
    family: 'free', ...EXT, ...RH_FR, primary: ['Glúteos', 'Erectores espinales'], secondary: ['Isquiotibiales'], name: 'Reverse hyperextension en banco', level: 'Avanzado', labelAll: true,
    tempo: { down: 1.5, pause: 1, up: 2 }, phaseNames: { BAJADA: 'PIERNAS ARRIBA', SUBIDA: 'BAJA', ARRIBA: 'PIERNAS COLGANDO' }, holdLabel: 'PIERNAS ALINEADAS',
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', keys: [{ u: 0, ...RH, lL: [78, 6, 30, 0], lR: [78, 6, 30, 0] }, { u: 1, ...RH, sp: [-4, 0, 0], lL: [-4, 4, 30, 0], lR: [-4, 4, 30, 0] }] },
      items: [{ kind: 'flatBench', len: 1.15, h: 0.50, z: 0.52 }] },
    captions: {
      intro: 'Tumbado boca abajo en el banco con la cadera en el borde y las piernas colgando',
      reps: [
        ['Eleva las piernas estiradas hasta la línea del cuerpo', 'Bájalas despacio'],
        ['Aprieta los glúteos arriba', 'Sujétate bien al banco'],
        ['Sin impulso ni balanceo', 'No arquees de más la zona lumbar'],
      ],
      orbit: ['Piernas alineadas', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-EXT-010': {
    family: 'free', ...EXT, ...RH_FR, primary: ['Glúteos', 'Erectores espinales'], secondary: ['Isquiotibiales', 'Oblicuos'], name: 'Extensión lumbar unilateral alternando piernas', level: 'Avanzado', labelAll: true,
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'PIERNA ARRIBA', SUBIDA: 'BAJA', ARRIBA: 'PIERNAS COLGANDO' }, holdLabel: 'PIERNA ALINEADA',
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', alt: true, keys: [{ u: 0, ...RH, lL: [78, 6, 30, 0], lR: [78, 6, 30, 0] }, { u: 1, ...RH, lL: [-4, 4, 30, 0], lR: [78, 6, 30, 0] }] },
      items: [{ kind: 'flatBench', len: 1.15, h: 0.50, z: 0.52 }] },
    captions: {
      intro: 'Tumbado boca abajo en el banco con la cadera en el borde y las piernas colgando',
      reps: [
        ['Eleva una pierna estirada hasta la línea del cuerpo', 'Bájala y alterna'],
        ['La pelvis no rota hacia la pierna que sube', 'Aprieta el glúteo arriba'],
        ['Movimiento controlado', 'Sujétate bien al banco'],
      ],
      orbit: ['Pierna alineada', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-CFU-001': {
    ...like('TI-EST-010', {}), ...CFU, primary: ['Transverso abdominal', 'Erectores espinales'], secondary: ['Bíceps', 'Deltoides anterior', 'Glúteos'],
    name: "Marcha con carga en el pecho (front-loaded carry / farmer's carry)", level: 'Principiante',
    cfg: { free: { type: 'gait', carryFront: true, stepLen: 0.50, stepTime: 0.60, lift: 0.06 } },
    captions: {
      intro: 'De pie con una kettlebell sujeta por los cuernos a la altura del pecho',
      reps: [
        ['Camina con pasos normales sin inclinarte hacia atrás', 'Codos abajo y carga pegada al pecho'],
        ['Costillas abajo: no arquees la espalda', 'Mirada al frente'],
        ['Recorridos de 20–30 m', 'Respira de forma continua'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Tronco firme'],
    },
  },
  'CO-CFU-002': {
    ...CFU, primary: ['Oblicuos', 'Dorsal ancho'], secondary: ['Glúteos', 'Cuádriceps', 'Bíceps'], name: 'Arrastre de trineo con rotación de tronco', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.3, up: 1.2 }, phaseNames: { BAJADA: 'TIRÓN CON GIRO', SUBIDA: 'BRAZO AL FRENTE', ARRIBA: 'BRAZOS AL FRENTE' }, holdLabel: 'GIRO MÁXIMO',
    frame: { dist: 4.8, ty: 0.85, tz: 0.50, distLow: 4.5, tyLow: 0.80 }, views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 6 }, front: { az: -25, el: 16 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', holdSides: ['L'], alt: true, rods: [{ from: [0, 0.22, 1.75], to: 'hL', r: 0.012, color: 0xd9c9a3 }],
      keys: [
        { u: 0, P: [0, -0.10, -0.06], rot: [18, 0, 0], nk: [-8, 0], L: [0.18, 0.08, 0.20, 0, 10], R: [-0.18, 0.08, -0.25, 0, -10], kL: [0.2, 0.3, 1], kR: [-0.2, 0.3, 1],
          hL: [0.06, 1.08, 0.62], eL: [0.6, -1, 0], pL: [-1, 0, 0, 0, 0, 1], aR: [30, 10, 60] },
        { u: 1, P: [0, -0.10, -0.06], rot: [14, 20, 0], sp: [0, 22, 0], nk: [-8, -14], L: [0.18, 0.08, 0.20, 0, 10], R: [-0.18, 0.08, -0.25, 0, -10], kL: [0.2, 0.3, 1], kR: [-0.2, 0.3, 1],
          hL: [0.30, 0.98, -0.06], eL: [0.6, 0.2, -1], pL: [-1, 0, 0, 0, 0, 1], aR: [50, 10, 40] }] },
      items: [{ kind: 'box', h: 0.30, w: 0.55, d: 0.70, z: 1.95 }] },
    captions: {
      intro: 'Postura atlética frente al trineo, sujetando la cuerda o cinta',
      reps: [
        ['Tira de la cuerda hacia la cadera girando el tronco', 'Alterna los brazos mano sobre mano'],
        ['Las piernas empujan y la cadera queda baja', 'Espalda recta en todo momento'],
        ['Ritmo constante', 'Recoge la cuerda hasta traer el trineo'],
      ],
      orbit: ['Tirón con giro', 'Rotación: músculos que trabajan', 'Sigue tirando'],
    },
  },
  'CO-CFU-003': {
    ...CFU, primary: ['Oblicuos', 'Recto abdominal', 'Manguito rotador'], secondary: ['Deltoides', 'Tríceps', 'Glúteos'], name: 'Turkish get-up (parcial, énfasis en core)', level: 'Principiante',
    tempo: { down: 3, pause: 1, up: 3 }, phaseNames: { BAJADA: 'SUBE AL CODO Y A LA MANO', SUBIDA: 'VUELVE AL SUELO', ARRIBA: 'TUMBADO' }, holdLabel: 'APOYADO EN LA MANO',
    frame: { dist: 4.0, ty: 0.55, tz: -0.05, distLow: 3.7, tyLow: 0.52 }, views: { f34: { az: 40, el: 18 }, side: { az: 90, el: 8 }, front: { az: 15, el: 22 }, back34: { az: 140, el: 24 } }, orbit: { view: 'side', sweep: 130 },
    cfg: { hands: ['open', 'grip'], free: { type: 'kfPose', handKb: 'R', hold: 'grip', holdSides: ['R'],
      keys: [
        { u: 0, P: [0, 0.115, 0.05], rot: [-90, 0, 0], nk: [4, 0], lL: [4, 4, 20, 10], R: [-0.14, 0.08, 0.50, 0, -6], kR: [-0.2, 1, 0.2], hL: [0.42, 0.04, -0.05], eL: [0, 1, 0], pL: [0, -1, 0, 0, 0, 1], hR: [-0.20, 0.72, -0.42], eR: [-1, 0, 0.3], pR: [0, 1, 0, 0, 0, 1] },
        { u: 0.5, P: [0, 0.12, 0.05], rot: [-60, 0, 8], sp: [14, 10, 0], nk: [8, -10], lL: [4, 4, 20, 10], R: [-0.14, 0.08, 0.50, 0, -6], kR: [-0.2, 1, 0.2], hL: [0.42, 0.04, -0.05], eL: [0, 1, 0], pL: [0, -1, 0, 0, 0, 1], hR: [-0.16, 0.98, -0.30], eR: [-1, 0, 0.3], pR: [0, 1, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.13, 0.05], rot: [-32, 0, 14], sp: [8, 14, 0], nk: [6, -14], lL: [4, 4, 20, 10], R: [-0.14, 0.08, 0.50, 0, -6], kR: [-0.2, 1, 0.2], hL: [0.42, 0.04, -0.10], eL: [1, 0, 0], pL: [0, -1, 0, 0, 0, 1], hR: [-0.12, 1.16, -0.16], eR: [-1, 0, 0.3], pR: [0, 1, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.0, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba con una kettlebell sujeta con el brazo estirado hacia el techo',
      reps: [
        ['Sube apoyándote primero en el codo y después en la mano', 'Vuelve al suelo por el mismo camino'],
        ['La kettlebell siempre vertical sobre el hombro', 'Mira la kettlebell durante todo el movimiento'],
        ['Pierna del lado de la carga flexionada y empujando', 'Cambia de lado al terminar'],
      ],
      orbit: ['Apoyado en la mano', 'Estabilidad: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-CFU-004': {
    ...CFU, primary: ['Oblicuos', 'Transverso abdominal'], secondary: ['Dorsal ancho', 'Deltoides', 'Serrato anterior'], name: 'Plancha con arrastre de peso (plank drag)', level: 'Intermedio',
    tempo: { down: 1.5, pause: 0.5, up: 1 }, phaseNames: { BAJADA: 'ARRASTRA', SUBIDA: 'APOYA', ARRIBA: 'PLANCHA' }, holdLabel: 'PESO AL OTRO LADO',
    frame: { dist: 4.3, ty: 0.40, tz: 0.10, distLow: 4.0, tyLow: 0.38 }, views: { f34: { az: -45, el: 22 }, side: { az: -90, el: 8 }, front: { az: -15, el: 28 }, back34: { az: -140, el: 28 } }, orbit: { view: 'front', sweep: 140 },
    cfg: { hands: ['grip', 'open'], free: { type: 'kfPose', alt: true, handKb: 'L', hold: 'grip', holdSides: ['L'],
      keys: [
        { u: 0, ...PK, ...HF, hL: [-0.34, 0.17, SZ - 0.10], eL: [0.4, 0.4, -1], pL: [0, 1, 0, 0, 0, 1] },
        { u: 1, ...PK, rot: [69, 0, -2], ...HF, hL: [0.42, 0.17, SZ - 0.10], eL: [0.6, 0.4, -1], pL: [0, 1, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con una kettlebell en el suelo junto a una mano',
      reps: [
        ['Pasa la mano contraria por debajo y arrastra la kettlebell al otro lado', 'Apoya y repite con la otra mano'],
        ['La cadera no rota ni cae', 'Pies separados para más estabilidad'],
        ['Arrastra, no levantes la carga', 'Abdomen y glúteos firmes'],
      ],
      orbit: ['Peso al otro lado', 'Anti-rotación: músculos que trabajan', 'Cadera quieta'],
    },
  },
  'CO-CFU-005': {
    ...like('TI-ZAN-009', {}), sub: 'Core funcional', primary: ['Oblicuos', 'Cuádriceps', 'Glúteos'], secondary: ['Transverso abdominal', 'Deltoides anterior'],
    name: 'Zancada con rotación de tronco cargada', level: 'Intermedio',
    cfg: { ...EXERCISES['TI-ZAN-009'].cfg, arms: 'goblet' },
    captions: {
      intro: 'De pie con una kettlebell sujeta a la altura del pecho',
      reps: [
        ['Da un paso al frente y gira el tronco hacia la pierna delantera', 'Vuelve al centro y regresa'],
        ['La rodilla delantera queda alineada mientras giras', 'Kettlebell pegada al pecho'],
        ['Alterna las piernas', 'Abdomen firme durante el giro'],
      ],
      orbit: ['Giro abajo', 'Rotación: músculos que trabajan', 'Vuelve al centro'],
    },
  },
});
