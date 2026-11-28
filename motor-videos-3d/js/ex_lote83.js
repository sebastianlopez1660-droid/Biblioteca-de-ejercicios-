// Lote 83: estiramientos pasivos MO-PAS-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';
import './ex_lote76.js';
import './ex_lote77.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const PAS = { ...MOB, sub: 'Estiramientos pasivos', tempo: { down: 2.5, pause: 4, up: 2 }, holdLabel: 'ESTIRAMIENTO' };
const mk = (base, name, level, prim, sec, captions) => ({ ...like(base, {}), ...PAS, family: EXERCISES[base].family, primary: prim, secondary: sec, name, level, captions });
const ORB = ['Estiramiento mantenido', 'Estiramiento: músculos que trabajan', 'Suelta despacio'];
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0] };
const FLOOR_FR = { frame: { dist: 4.0, ty: 0.32, tz: 0.20, distLow: 3.6, tyLow: 0.32 }, views: { f34: { az: -55, el: 20 }, side: { az: -90, el: 8 }, front: { az: -25, el: 24 }, back34: { az: -140, el: 26 } } };
const SIDE = { P: [0.25, 0.21, 0], rot: [0, 0, 90], sp: [0, 0, -4], nk: [0, 0], lR: [80, 90, 0, 0] };
const SIDE_FR = { frame: { dist: 3.8, ty: 0.32, tz: 0.0, distLow: 3.5, tyLow: 0.30 }, views: { f34: { az: -30, el: 24 }, side: { az: 0, el: 14 }, front: { az: -60, el: 30 }, back34: { az: 30, el: 36 } } };

Object.assign(EXERCISES, {
  'MO-PAS-001': {
    ...PAS, ...FLOOR_FR, primary: ['Isquiotibiales'], secondary: ['Gastrocnemio y sóleo'], name: 'Estiramiento pasivo de isquiotibiales asistido con banda', level: 'Principiante', phaseNames: { BAJADA: 'SUBE LA PIERNA', SUBIDA: 'BAJA', ARRIBA: 'INICIO' },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', bands: [{ anchor: 'hL', to: 'aL' }, { anchor: 'hR', to: 'aL' }], keys: [
      { u: 0, ...SUP, lL: [30, 4, 0, 0], lR: [0, 2, 20, 0], hL: [0.14, 0.40, 0.10], hR: [0.02, 0.40, 0.10], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
      { u: 1, ...SUP, lL: [84, 2, -12, 0], lR: [0, 2, 20, 0], hL: [0.14, 0.46, -0.02], hR: [0.02, 0.46, -0.02], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, banda alrededor del pie y extremos en las manos',
      reps: [
        ['Sube la pierna estirada tirando suavemente de la banda', 'Mantén 20–30 s'],
        ['La otra pierna queda estirada en el suelo', 'Rodilla estirada, sin bloquear'],
        ['2–3 repeticiones por pierna', 'Respira y relaja la pierna'],
      ],
      orbit: ORB,
    },
  },
  'MO-PAS-002': {
    ...PAS, ...FLOOR_FR, primary: ['Cuádriceps'], secondary: ['Flexores de cadera'], name: 'Estiramiento pasivo de cuádriceps asistido en decúbito prono', level: 'Principiante', phaseNames: { BAJADA: 'TALÓN AL GLÚTEO', SUBIDA: 'SUELTA', ARRIBA: 'INICIO' },
    cfg: { hands: ['open', 'grip'], free: { type: 'kfPose', bands: [{ anchor: 'hL', to: 'aL' }], keys: [
      { u: 0, P: [0, 0.12, 0], rot: [88, 0, 0], nk: [-20, 0], lL: [-2, 70, 20, 0], lR: [0, 2, 40, 0], hL: [0.24, 0.16, 0.05], hR: [-0.16, 0.06, 0.58], eL: [0.6, 1, 0], eR: [-0.6, 0, -0.3], pL: [-1, 0, 0, 0, 0, -1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, P: [0, 0.12, 0], rot: [88, 0, 0], nk: [-20, 0], lL: [-6, 132, 20, 0], lR: [0, 2, 40, 0], hL: [0.24, 0.20, -0.12], hR: [-0.16, 0.06, 0.58], eL: [0.6, 1, 0], eR: [-0.6, 0, -0.3], pL: [-1, 0, 0, 0, 0, -1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: -0.05, l: 1.9 }] },
    captions: {
      intro: 'Boca abajo, banda alrededor del tobillo sujeta con la mano',
      reps: [
        ['Tira de la banda para llevar el talón hacia el glúteo', 'Mantén 20–30 s'],
        ['La cadera queda pegada al suelo', 'Sin arquear la zona lumbar'],
        ['2–3 repeticiones por pierna', 'Respira y relaja el muslo'],
      ],
      orbit: ORB,
    },
  },
  'MO-PAS-003': {
    ...PAS, ...FLOOR_FR, primary: ['Aductores'], secondary: ['Movilidad de cadera'], name: 'Estiramiento pasivo de aductores en mariposa (butterfly stretch)', level: 'Principiante', phaseNames: { BAJADA: 'INCLINA', SUBIDA: 'VUELVE', ARRIBA: 'SENTADO' },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.12, 0], rot: [4, 0, 0], nk: [6, 0], L: [0.05, 0.075, 0.42, 0, -70], kL: [1, 0.3, 0.3], R: [-0.05, 0.075, 0.42, 0, 70], kR: [-1, 0.3, 0.3], hL: [0.07, 0.12, 0.40], hR: [-0.07, 0.12, 0.40], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0, 1, -1, 0, 0], pR: [0, 0, 1, 1, 0, 0] },
      { u: 1, P: [0, 0.12, 0], rot: [30, 0, 0], sp: [6, 0, 0], nk: [10, 0], L: [0.05, 0.075, 0.42, 0, -70], kL: [1, 0.15, 0.3], R: [-0.05, 0.075, 0.42, 0, 70], kR: [-1, 0.15, 0.3], hL: [0.07, 0.12, 0.40], hR: [-0.07, 0.12, 0.40], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0, 1, -1, 0, 0], pR: [0, 0, 1, 1, 0, 0] },
    ] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'Sentado en el suelo, plantas de los pies juntas y manos en los pies',
      reps: [
        ['Inclina el tronco adelante con la espalda recta', 'Deja que las rodillas caigan hacia fuera'],
        ['Mantén 20–30 s respirando', 'No empujes las rodillas con fuerza'],
        ['2–3 repeticiones', 'Talones más cerca para estirar más'],
      ],
      orbit: ORB,
    },
  },
  'MO-PAS-004': mk('MO-CAD-004', 'Estiramiento pasivo de piriforme (figure-4 estático)', 'Principiante', ['Glúteos', 'Movilidad de cadera'], ['Isquiotibiales'], {
    intro: 'Boca arriba, tobillo cruzado sobre la rodilla contraria',
    reps: [
      ['Acerca la pierna de apoyo al pecho y mantén', 'Nota el estiramiento en el glúteo cruzado'],
      ['Mantén 20–30 s respirando', 'Cabeza y hombros en el suelo'],
      ['2–3 repeticiones por lado', 'Sin dolor en la rodilla'],
    ],
    orbit: ORB,
  }),
  'MO-PAS-005': mk('TS-MHO-003', 'Estiramiento pasivo de pectoral en marco de puerta (mantenido)', 'Principiante', ['Pectoral', 'Deltoides anterior'], ['Bíceps'], {
    intro: 'Antebrazos apoyados en el marco de una puerta, codos a la altura de los hombros',
    reps: [
      ['Adelanta el cuerpo hasta notar el estiramiento en el pecho', 'Mantén 20–30 s'],
      ['Hombros abajo y abdomen activo', 'Cambia la altura de los codos para variar'],
      ['2–3 repeticiones', 'Sin dolor en el hombro'],
    ],
    orbit: ORB,
  }),
  'MO-PAS-006': mk('TS-MHO-009', 'Estiramiento pasivo de dorsal ancho con banda desde altura', 'Intermedio', ['Dorsal ancho'], ['Tríceps', 'Movilidad de hombro'], {
    intro: 'Banda anclada en alto sujeta con una mano',
    reps: [
      ['Deja que la banda tire del brazo hacia arriba y lleva la cadera atrás', 'Mantén 20–30 s'],
      ['Inclina el tronco hacia el lado contrario para estirar más', 'Costillas abajo'],
      ['2–3 repeticiones por lado', 'Respira hacia el costado'],
    ],
    orbit: ORB,
  }),
  'MO-PAS-007': mk('MO-CAD-002', 'Estiramiento pasivo de flexores de cadera en decúbito lateral asistido', 'Intermedio', ['Flexores de cadera', 'Cuádriceps'], ['Glúteos'], {
    intro: 'Mostrado en su variante de rodillas junto a la pared (mismo estiramiento)',
    reps: [
      ['Tumbado de lado: lleva la pierna de arriba atrás con una banda en el tobillo', 'Mantén 20–30 s'],
      ['Pelvis estable y glúteo apretado', 'Sin arquear la zona lumbar'],
      ['2–3 repeticiones por lado', 'Respira y relaja'],
    ],
    orbit: ORB,
  }),
  'MO-PAS-008': mk('MO-CAD-003', 'Estiramiento pasivo de columna en flexión sostenida (variante mantenida)', 'Principiante', ['Erectores espinales'], ['Glúteos'], {
    intro: 'Boca arriba, manos sobre las rodillas',
    reps: [
      ['Lleva las rodillas al pecho y mantén la espalda redondeada', 'Mantén 30–60 s'],
      ['Balancéate suavemente de lado a lado si te alivia', 'Cuello relajado'],
      ['2–3 repeticiones', 'Respira hacia la zona lumbar'],
    ],
    orbit: ORB,
  }),
  'MO-PAS-009': mk('TS-MHO-012', 'Estiramiento pasivo de tríceps y dorsal por encima de la cabeza (mantenido)', 'Principiante', ['Tríceps', 'Dorsal ancho'], ['Movilidad de hombro'], {
    intro: 'De pie, un brazo por encima de la cabeza con el codo doblado',
    reps: [
      ['Con la otra mano, empuja el codo hacia atrás y hacia la cabeza', 'Mantén 20–30 s'],
      ['Costillas abajo, sin arquear la espalda', 'Inclina el tronco para estirar el dorsal'],
      ['2–3 repeticiones por brazo', 'Respira y relaja'],
    ],
    orbit: ORB,
  }),
  'MO-PAS-010': mk('TI-TIB-006', 'Estiramiento pasivo de pantorrilla con banda en decúbito supino', 'Principiante', ['Gastrocnemio y sóleo'], ['Isquiotibiales'], {
    intro: 'Boca arriba, banda alrededor de la parte delantera del pie',
    reps: [
      ['Lleva la punta del pie hacia ti con la banda', 'Mantén 20–30 s con la rodilla estirada'],
      ['Dobla un poco la rodilla para estirar el sóleo', 'Respira y relaja'],
      ['2–3 repeticiones por pierna', 'Sin rebotes'],
    ],
    orbit: ORB,
  }),
});
