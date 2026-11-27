// Lote 49: core funcional CO-CFU-006 … 010 y core dinámico CO-CDI-001 … 005
import { EXERCISES } from './exercises.js';
import './ex_lote18.js';
import { plankKey, handsFloor, shoulderZ } from './ts_common.js';
import { CFU } from './ex_lote48.js';

export const CDI = { family: 'free', sub: 'Core dinámico', primary: ['Recto abdominal', 'Oblicuos', 'Transverso abdominal'], secondary: ['Flexores de cadera', 'Deltoides'], labelAll: true };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const HF = handsFloor(21);
const FW = (w) => ({ L: [w, ...plankKey(21).L.slice(1)], R: [-w, ...plankKey(21).R.slice(1)] });
const PK = { ...plankKey(21), ...FW(0.12) };
const PUSH_FR = { frame: { dist: 4.4, ty: 0.42, tz: 0.15, distLow: 4.0, tyLow: 0.38 },
  views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 22 }, back34: { az: -140, el: 26 } }, orbit: { view: 'side', sweep: 160 } };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const BEAR = { P: [0, 0.64, -0.05], rot: [86, 0, 0], nk: [-14, 0], L: [0.13, 0.10, -0.52, 62, 6], R: [-0.13, 0.10, -0.52, 62, -6], kL: [0, -1, 0.4], kR: [0, -1, 0.4], ...QH };
const BAG = 0x6b6a3c;

Object.assign(EXERCISES, {
  'CO-CFU-006': {
    ...CFU, primary: ['Transverso abdominal', 'Deltoides', 'Cuádriceps'], secondary: ['Oblicuos', 'Serrato anterior', 'Glúteos'], name: 'Oso caminando (bear crawl)', level: 'Intermedio',
    tempo: { down: 0.9, pause: 0.2, up: 0.9 }, phaseNames: { BAJADA: 'PASO AL FRENTE', SUBIDA: 'PASO ATRÁS', ARRIBA: 'RODILLAS SUSPENDIDAS' }, holdLabel: 'MANO Y PIE CONTRARIOS',
    frame: { dist: 4.2, ty: 0.42, tz: 0.10, distLow: 3.9, tyLow: 0.40 }, views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 22 }, back34: { az: -140, el: 26 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [{ u: 0, ...BEAR }, { u: 0.5, ...BEAR, P: [0, 0.65, 0.03], hR: [-0.17, 0.10, 0.58], L: [0.13, 0.16, -0.38, 62, 6] }, { u: 1, ...BEAR, P: [0, 0.64, 0.10], hR: [-0.17, 0.035, 0.66], L: [0.13, 0.10, -0.30, 62, 6] }] },
      items: [{ kind: 'mat', z: 0.10, l: 2.0 }] },
    captions: {
      intro: 'En cuadrupedia con las rodillas suspendidas a unos centímetros del suelo',
      reps: [
        ['Avanza mano y pie contrarios a la vez con pasos cortos', 'Retrocede con el mismo patrón'],
        ['La espalda queda plana como una mesa', 'Rodillas siempre bajas'],
        ['Cadera quieta, sin balanceos', 'Respira de forma continua'],
      ],
      orbit: ['Mano y pie contrarios', 'Estabilidad: músculos que trabajan', 'Sigue avanzando'],
    },
  },
  'CO-CFU-007': {
    ...like('CO-CFU-002', {}), name: 'Arrastre de cuerda con rotación de tronco', level: 'Avanzado',
    captions: {
      intro: 'Postura atlética frente a la carga, cuerda sujeta con los brazos estirados',
      reps: [
        ['Recoge la cuerda mano sobre mano girando el tronco en cada tirón', 'Mantén la cadera baja y estable'],
        ['La fuerza nace en las piernas y el tronco', 'Espalda recta en todo momento'],
        ['Tirones rápidos y continuos', 'Respira en cada tirón'],
      ],
      orbit: ['Tirón con giro', 'Rotación: músculos que trabajan', 'Sigue tirando'],
    },
  },
  'CO-CFU-008': {
    ...CFU, primary: ['Oblicuos', 'Glúteos', 'Erectores espinales'], secondary: ['Cuádriceps', 'Deltoides', 'Bíceps'], name: 'Elevación de saco de arena con rotación de tronco', level: 'Avanzado',
    tempo: { down: 1.6, pause: 0.5, up: 1.8 }, phaseNames: { BAJADA: 'SUBE AL HOMBRO', SUBIDA: 'BAJA AL SUELO', ARRIBA: 'SACO EN EL SUELO' }, holdLabel: 'SACO AL HOMBRO',
    frame: { dist: 4.6, ty: 0.85, tz: 0.15, distLow: 4.3, tyLow: 0.80 }, views: { f34: { az: -30, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 14 }, back34: { az: -150, el: 18 } }, orbit: { view: 'front', sweep: 140 },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', alt: true, rods: [{ from: 'K:s0', to: 'K:s1', r: 0.13, color: BAG }],
      keys: [
        { u: 0, P: [0, 0.50, -0.20], rot: [46, -24, 0], sp: [6, -18, 0], nk: [-20, -10], L: [0.22, 0.08, 0.02, 0, 14], R: [-0.22, 0.08, 0.02, 0, -14], kL: [0.3, 0.2, 1], kR: [-0.3, 0.2, 1],
          hL: [-0.12, 0.26, 0.36], hR: [-0.38, 0.26, 0.20], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, 1, 0, 0, 0, 1], pR: [0, 1, 0, 0, 0, 1], s0: [-0.10, 0.13, 0.42], s1: [-0.42, 0.13, 0.18] },
        { u: 0.5, P: [0, 0.80, -0.08], rot: [16, -6, 0], sp: [0, -4, 0], nk: [-4, 0], L: [0.22, 0.08, 0.02, 0, 14], R: [-0.22, 0.08, 0.02, 0, -14], kL: [0.3, 0.2, 1], kR: [-0.3, 0.2, 1],
          hL: [0.10, 1.06, 0.30], hR: [-0.16, 1.02, 0.28], eL: [0.4, -1, -0.2], eR: [-0.4, -1, -0.2], pL: [0, 1, 0, 0, 0, 1], pR: [0, 1, 0, 0, 0, 1], s0: [0.22, 1.12, 0.32], s1: [-0.26, 1.10, 0.30] },
        { u: 1, P: [0, 0.92, -0.02], rot: [2, 22, 0], sp: [0, 16, 0], nk: [0, 10], L: [0.22, 0.08, 0.02, 0, 28], R: [-0.22, 0.08, 0.02, 0, 10], kL: [0.3, 0.2, 1], kR: [-0.3, 0.2, 1],
          hL: [0.30, 1.40, 0.14], hR: [0.02, 1.36, 0.22], eL: [0.6, -1, -0.2], eR: [-0.4, -1, 0], pL: [0, 1, 0, 0, 0, 1], pR: [0, 1, 0, 0, 0, 1], s0: [0.46, 1.52, 0.04], s1: [0.04, 1.47, 0.24] }] },
      items: [] },
    captions: {
      intro: 'Saco de arena en el suelo junto a un pie, agarrado por los extremos',
      reps: [
        ['Levántalo con las piernas y llévalo al hombro contrario girando', 'Bájalo al suelo por el mismo camino'],
        ['Espalda recta al recoger el saco', 'Pivota el pie de atrás al girar'],
        ['Alterna el lado en cada repetición', 'Exhala al subir'],
      ],
      orbit: ['Saco al hombro', 'Rotación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-CFU-009': {
    ...like('CO-CFU-001', {}), primary: ['Transverso abdominal', 'Erectores espinales', 'Bíceps'], secondary: ['Deltoides anterior', 'Glúteos', 'Antebrazo'], name: 'Carga de sacos con desplazamiento (sandbag carry)', level: 'Avanzado',
    cfg: { free: { type: 'gait', carryFront: 'bag', rods: [{ r: 0.14, color: BAG }], stepLen: 0.46, stepTime: 0.62, lift: 0.06 } },
    captions: {
      intro: 'De pie abrazando un saco de arena contra el pecho',
      reps: [
        ['Camina con pasos normales sin inclinarte hacia atrás', 'Saco pegado al pecho y codos cerrados'],
        ['Abdomen firme y costillas abajo', 'Mirada al frente'],
        ['Recorridos de 20–30 m', 'Respira de forma continua'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Tronco firme'],
    },
  },
  'CO-CFU-010': {
    ...like('TI-BIS-004', {}), sub: 'Core funcional', primary: ['Glúteos', 'Transverso abdominal', 'Erectores espinales'], secondary: ['Isquiotibiales', 'Deltoides', 'Antebrazo'],
    name: 'Kettlebell swing con énfasis en control de core', level: 'Avanzado',
    captions: {
      intro: 'Pies a la anchura de los hombros con la kettlebell entre las manos',
      reps: [
        ['Lleva la cadera atrás y proyéctala al frente con fuerza', 'La kettlebell sube por el impulso de la cadera'],
        ['Arriba: glúteos y abdomen apretados, cuerpo como una tabla', 'No arquees la espalda al final'],
        ['Los brazos guían, no levantan', 'Exhala en cada impulso'],
      ],
      orbit: ['Bisagra', 'Impulso de cadera: músculos que trabajan', 'Cuerpo firme arriba'],
    },
  },
  'CO-CDI-001': {
    ...CDI, ...PUSH_FR, name: 'Mountain climbers', level: 'Principiante', tempo: { down: 0.5, pause: 0.1, up: 0.5 },
    phaseNames: { BAJADA: 'RODILLA AL PECHO', SUBIDA: 'PIERNA ATRÁS', ARRIBA: 'PLANCHA' }, holdLabel: 'RODILLA ADELANTE',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true, keys: [{ u: 0, ...PK, ...HF }, { u: 1, ...PK, ...HF, L: [0.12, 0.24, -0.16, 30, 6], kL: [0, -1, 0.3] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con las manos bajo los hombros',
      reps: [
        ['Lleva una rodilla al pecho y cambia de pierna rápido', 'Como si corrieras en el sitio'],
        ['La cadera no sube ni cae', 'Hombros sobre las manos'],
        ['Ritmo rápido pero controlado', 'Series de 20–40 s'],
      ],
      orbit: ['Rodilla al pecho', 'Core dinámico: músculos que trabajan', 'Sigue el ritmo'],
    },
  },
  'CO-CDI-002': {
    ...CDI, primary: ['Recto abdominal', 'Cuádriceps', 'Pectoral'], secondary: ['Glúteos', 'Deltoides', 'Tríceps'], name: 'Burpee (énfasis en core dinámico)', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.3, up: 1.4 }, phaseNames: { BAJADA: 'ABAJO A PLANCHA', SUBIDA: 'PIES DENTRO Y SALTO', ARRIBA: 'DE PIE' }, holdLabel: 'PLANCHA',
    frame: { dist: 4.8, ty: 0.75, tz: 0.10, distLow: 4.5, tyLow: 0.70 }, views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 6 }, front: { az: -25, el: 16 }, back34: { az: -140, el: 20 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: (() => {
        const z = HF.hL[2];
        const st = { P: [0, 0.93, 0], rot: [2, 0, 0], nk: [0, 0], L: [0.13, 0.08, 0, 0, 8], R: [-0.13, 0.08, 0, 0, -8], aL: [6, 10, 10], aR: [6, 10, 10] };
        const sq = { P: [0, 0.52, -0.02], rot: [52, 0, 0], nk: [-20, 0], L: [0.13, 0.08, 0, 0, 8], R: [-0.13, 0.08, 0, 0, -8], kL: [0.2, 0.2, 1], kR: [-0.2, 0.2, 1], ...HF, hL: [0.24, 0.035, z - 0.10], hR: [-0.24, 0.035, z - 0.10] };
        return [{ u: 0, ...st }, { u: 0.45, ...sq }, { u: 1, ...PK, ...HF, hL: [0.24, 0.035, z - 0.10], hR: [-0.24, 0.035, z - 0.10] }];
      })(),
      up: (() => {
        const z = HF.hL[2];
        const sq = { P: [0, 0.52, -0.02], rot: [52, 0, 0], nk: [-20, 0], L: [0.13, 0.08, 0, 0, 8], R: [-0.13, 0.08, 0, 0, -8], kL: [0.2, 0.2, 1], kR: [-0.2, 0.2, 1], ...HF, hL: [0.24, 0.035, z - 0.10], hR: [-0.24, 0.035, z - 0.10] };
        return [{ u: 0, ...PK, ...HF, hL: [0.24, 0.035, z - 0.10], hR: [-0.24, 0.035, z - 0.10] }, { u: 0.35, ...sq },
          { u: 0.7, P: [0, 1.12, 0], rot: [0, 0, 0], nk: [4, 0], L: [0.13, 0.28, 0.02, 40, 8], R: [-0.13, 0.28, 0.02, 40, -8], aL: [170, 14, 6], aR: [170, 14, 6] },
          { u: 1, P: [0, 0.93, 0], rot: [2, 0, 0], nk: [0, 0], L: [0.13, 0.08, 0, 0, 8], R: [-0.13, 0.08, 0, 0, -8], aL: [6, 10, 10], aR: [6, 10, 10] }];
      })() },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'De pie con los pies a la anchura de la cadera',
      reps: [
        ['Agáchate, apoya las manos y lleva los pies atrás a plancha', 'Recoge los pies y salta con los brazos arriba'],
        ['En la plancha: abdomen firme y cadera alineada', 'Aterriza suave y encadena'],
        ['Ritmo constante', 'Regresión: da los pasos atrás en lugar de saltar'],
      ],
      orbit: ['Plancha', 'Core dinámico: músculos que trabajan', 'Salta arriba'],
    },
  },
  'CO-CDI-003': {
    ...like('CO-FLE-007', {}), ...CDI, secondary: ['Flexores de cadera', 'Cuádriceps'], name: 'V-up dinámico con giro', level: 'Principiante', tempo: { down: 1, pause: 0.3, up: 1.4 },
    cfg: { ...EXERCISES['CO-FLE-007'].cfg, free: { ...EXERCISES['CO-FLE-007'].cfg.free, alt: true,
      keys: EXERCISES['CO-FLE-007'].cfg.free.keys.map((k, i) => (i ? { ...k, sp: [12, 22, 0], nk: [10, 14], hL: [-0.10, 0.78, 0.42], hR: [-0.30, 0.76, 0.36] } : k)) } },
    captions: {
      intro: 'Tumbado boca arriba con brazos y piernas estirados',
      reps: [
        ['Sube tronco y piernas y lleva las manos hacia un lado de los pies', 'Baja y alterna el lado'],
        ['El giro sale del tronco', 'Piernas juntas y estiradas'],
        ['Regresión: rodillas flexionadas', 'Exhala al subir'],
      ],
      orbit: ['Posición en V con giro', 'Core dinámico: músculos que trabajan', 'Abre controlando'],
    },
  },
  'CO-CDI-004': {
    ...CDI, ...PUSH_FR, primary: ['Oblicuos', 'Recto abdominal'], secondary: ['Flexores de cadera', 'Glúteo medio', 'Deltoides'], name: 'Plancha dinámica con toque de tobillo cruzado (spiderman plank)', level: 'Intermedio',
    tempo: { down: 1, pause: 0.5, up: 1 }, phaseNames: { BAJADA: 'RODILLA AL CODO', SUBIDA: 'PIERNA ATRÁS', ARRIBA: 'PLANCHA' }, holdLabel: 'RODILLA AL CODO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true, keys: [{ u: 0, ...PK, ...HF }, { u: 1, ...PK, rot: [69, 0, 3], sp: [0, 0, 8], ...HF, L: [0.40, 0.22, -0.14, 20, 50], kL: [1, 0, 0.3] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con el cuerpo recto',
      reps: [
        ['Lleva la rodilla por fuera hacia el codo del mismo lado', 'Vuelve atrás y alterna'],
        ['La cadera no sube: el costado trabaja', 'Hombros sobre las manos'],
        ['Movimiento controlado', 'Exhala al acercar la rodilla'],
      ],
      orbit: ['Rodilla al codo', 'Core dinámico: músculos que trabajan', 'Vuelve a la plancha'],
    },
  },
  'CO-CDI-005': {
    ...like('TI-PLI-005', {}), sub: 'Core dinámico', primary: ['Glúteo medio', 'Oblicuos', 'Cuádriceps'], secondary: ['Glúteos', 'Gastrocnemio y sóleo', 'Core'], name: 'Skater jumps con control de core', level: 'Intermedio',
    captions: {
      intro: 'De pie sobre una pierna con el tronco ligeramente inclinado',
      reps: [
        ['Salta de lado como un patinador y aterriza sobre una pierna', 'Estabiliza y salta de vuelta'],
        ['Al aterrizar el tronco no se tuerce ni cae', 'Rodilla alineada con el pie'],
        ['Brazos acompañan el salto', 'Aterrizajes suaves y controlados'],
      ],
      orbit: ['Aterriza estable', 'Core dinámico: músculos que trabajan', 'Salta de vuelta'],
    },
  },
});
