// Lote 39: movilidad de hombro TS-MHO-003 … 012
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import './ex_lote38.js';

const MHO = { family: 'free', sub: 'Movilidad de hombro', primary: ['Movilidad de hombro'], secondary: ['Manguito rotador'], tempo: { down: 2.5, pause: 0.5, up: 2.5 }, labelAll: true };
const STR = { tempo: { down: 2.5, pause: 3, up: 2 }, phaseNames: { BAJADA: 'ENTRA EN EL ESTIRAMIENTO', SUBIDA: 'SAL DESPACIO', ARRIBA: 'POSICIÓN INICIAL' }, holdLabel: 'MANTÉN Y RESPIRA' };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const FRONT_FR = { ...RAISE_FR, frame: { dist: 4.2, ty: 1.15, tz: 0.15, distLow: 4.0, tyLow: 1.10 } };
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const QUAD_FR = { frame: { dist: 4.0, ty: 0.45, tz: 0.15, distLow: 3.7, tyLow: 0.43 },
  views: { f34: { az: -55, el: 20 }, side: { az: -90, el: 8 }, front: { az: -20, el: 26 }, back34: { az: -140, el: 30 } }, orbit: { view: 'front', sweep: 140 } };
// tumbado sobre el costado derecho, cabeza hacia -x, pecho hacia +z
const SIDE = { P: [0.25, 0.21, 0], rot: [0, 0, 90], sp: [0, 0, -4], nk: [0, 0], lL: [80, 90, 0, 0], lR: [80, 90, 0, 0] };
const SIDE_FR = { frame: { dist: 3.6, ty: 0.30, tz: 0.10, distLow: 3.3, tyLow: 0.30 },
  views: { f34: { az: -30, el: 24 }, side: { az: 0, el: 14 }, front: { az: -60, el: 32 }, back34: { az: 30, el: 40 } }, orbit: { view: 'side', sweep: 120 } };
const G = 0x3a3f45;

Object.assign(EXERCISES, {
  'TS-MHO-003': {
    ...MHO, ...STR, ...FRONT_FR, primary: ['Pectoral'], secondary: ['Deltoides anterior'], name: 'Estiramiento de puerta (doorway stretch pectoral)', level: 'Principiante',
    views: { f34: { az: -60, el: 16 }, side: { az: -90, el: 8 }, front: { az: -30, el: 14 }, back34: { az: -140, el: 20 } }, orbit: { view: 'side', sweep: 120 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'R',
      keys: (() => {
        const A = { hL: [0.58, 1.62, 0.02], hR: [-0.58, 1.62, 0.02], eL: [1, 0, 0], eR: [-1, 0, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] };
        return [
          { u: 0, ...STAND, P: [0, -0.012, -0.08], L: [0.12, 0.08, 0.10, 0, 8], R: [-0.12, 0.08, -0.25, 0, -8], ...A },
          { u: 1, ...STAND, P: [0, -0.03, 0.08], rot: [4, 0, 0], sp: [-4, 0, 0], L: [0.12, 0.08, 0.34, 0, 8], R: [-0.12, 0.08, -0.25, 0, -8], kL: [0.1, 0.2, 1], ...A },
        ];
      })(),
      rods: [{ from: [0.62, 0, 0.0], to: [0.62, 2.05, 0.0], r: 0.035, color: G }, { from: [-0.62, 0, 0.0], to: [-0.62, 2.05, 0.0], r: 0.035, color: G }, { from: [-0.62, 2.05, 0.0], to: [0.62, 2.05, 0.0], r: 0.035, color: G }] } },
    captions: {
      intro: 'En el marco de una puerta, antebrazos apoyados a los lados con los codos a la altura del hombro',
      reps: [
        ['Da un paso al frente hasta notar el estiramiento en el pecho', 'Mantén 20–30 s respirando'],
        ['Abdomen firme: la espalda baja no se arquea', 'Hombros abajo, lejos de las orejas'],
        ['Estiramiento suave, sin dolor', 'Prueba con los codos más altos o más bajos'],
      ],
      orbit: ['Pecho al frente', 'Estiramiento: zona que trabaja', 'Sal despacio'],
    },
  },
  'TS-MHO-004': {
    ...MHO, ...STR, ...SIDE_FR, secondary: ['Deltoides posterior'], name: 'Estiramiento del durmiente (sleeper stretch)', level: 'Principiante',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, ...SIDE, hR: [-0.22, 0.38, 0.32], eR: [0, -1, 0.2], pR: [1, 0, 0, 0, 1, 0], hL: [-0.18, 0.44, 0.33], eL: [0.6, 0.6, 0.5], pL: [-1, 0, 0, 0, 0, 1] },
        { u: 1, ...SIDE, hR: [0.02, 0.16, 0.32], eR: [0, -1, 0.2], pR: [0, 1, 0, 1, 0, 0], hL: [0.04, 0.24, 0.34], eL: [0.6, 0.6, 0.5], pL: [0, -1, 0, 1, 0, 0] }] },
      items: [{ kind: 'mat', z: 0.10, x: 0, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Tumbado de lado, brazo de abajo al frente con el codo a 90° y el antebrazo vertical',
      reps: [
        ['Con la otra mano empuja suavemente el antebrazo hacia el suelo', 'Mantén 20–30 s'],
        ['El hombro de abajo queda bajo el cuerpo, sin despegarse', 'Notarás el estiramiento detrás del hombro'],
        ['Presión suave, sin dolor', 'Cambia de lado al terminar'],
      ],
      orbit: ['Antebrazo hacia abajo', 'Estiramiento: zona que trabaja', 'Suelta despacio'],
    },
  },
  'TS-MHO-005': {
    ...MHO, ...QUAD_FR, primary: ['Movilidad de hombro', 'Romboides'], secondary: ['Oblicuos', 'Deltoides posterior'], name: 'Movilidad de hombro en cuadrupedia (thread the needle)', level: 'Intermedio',
    phaseNames: { BAJADA: 'PASA EL BRAZO', SUBIDA: 'VUELVE', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'HOMBRO AL SUELO', tempo: { down: 2.5, pause: 2, up: 2.5 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, ...QUAD, ...QH },
        { u: 1, ...QUAD, P: [0, 0.54, -0.12], rot: [96, -6, 0], sp: [0, -40, 0], nk: [-10, -20], ...QH, hL: [-0.62, 0.06, 0.42], eL: [0, 1, 0], pL: [0, 1, 0, -1, 0, 0] }] },
      items: [{ kind: 'mat', z: 0.10, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Pasa un brazo por debajo del cuerpo hacia el lado contrario', 'Apoya el hombro y mantén 2–3 s'],
        ['Gira el pecho y la cabeza siguiendo al brazo', 'La cadera queda sobre las rodillas'],
        ['Vuelve y repite', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Hombro al suelo', 'Rotación: zona que trabaja', 'Vuelve despacio'],
    },
  },
  'TS-MHO-006': {
    ...MHO, ...FRONT_FR, primary: ['Manguito rotador'], secondary: ['Romboides', 'Deltoides posterior'], name: 'Rotación de manguito con banda en movilidad activa', level: 'Intermedio',
    phaseNames: { BAJADA: 'ROTACIÓN EXTERNA', SUBIDA: 'REGRESO', ARRIBA: 'MANOS AL FRENTE' }, holdLabel: 'ROTACIÓN MÁXIMA', tempo: { down: 2, pause: 1, up: 2 },
    views: { f34: { az: -30, el: 22 }, side: { az: -80, el: 12 }, front: { az: -5, el: 26 }, back34: { az: 160, el: 24 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'hR', hand: 'L' }],
      keys: [
        { u: 0, ...STAND, hL: [0.16, 1.03, 0.34], hR: [-0.16, 1.03, 0.34], eL: [0.2, -1, 0], eR: [-0.2, -1, 0], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] },
        { u: 1, ...STAND, hL: [0.50, 1.03, 0.16], hR: [-0.50, 1.03, 0.16], eL: [0, -1, 0], eR: [0, -1, 0], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] }] } },
    captions: {
      intro: 'De pie, codos pegados al costado a 90° y banda entre las manos',
      reps: [
        ['Gira los antebrazos hacia fuera estirando la banda', 'Vuelve al frente en 2 s'],
        ['Los codos no se despegan del cuerpo', 'Junta suavemente las escápulas'],
        ['Rango completo y sin dolor', 'Tensión ligera'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-MHO-007': {
    ...MHO, ...SIDE_FR, primary: ['Movilidad de hombro', 'Pectoral'], secondary: ['Oblicuos'], name: 'Movilidad torácica en cuadrupedia (open book thoracic)', level: 'Intermedio',
    phaseNames: { BAJADA: 'ABRE EL LIBRO', SUBIDA: 'CIERRA', ARRIBA: 'BRAZOS JUNTOS' }, holdLabel: 'PECHO ABIERTO', tempo: { down: 2.5, pause: 2, up: 2.5 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, ...SIDE, hR: [-0.22, 0.10, 0.62], eR: [0, -1, 0], pR: [0, 1, 0, 0, 0, 1], hL: [-0.22, 0.16, 0.62], eL: [0, 1, 0], pL: [0, -1, 0, 0, 0, 1] },
        { u: 0.5, ...SIDE, sp: [0, 20, -4], nk: [0, 10], hR: [-0.22, 0.10, 0.62], eR: [0, -1, 0], pR: [0, 1, 0, 0, 0, 1], hL: [-0.24, 0.78, 0.10], eL: [0, 1, 0], pL: [0, 0, 1, 0, 1, 0] },
        { u: 1, ...SIDE, sp: [0, 40, -4], nk: [0, 30], hR: [-0.22, 0.10, 0.62], eR: [0, -1, 0], pR: [0, 1, 0, 0, 0, 1], hL: [-0.26, 0.22, -0.52], eL: [0, 1, 0], pL: [0, 1, 0, 0, 0, -1] }] },
      items: [{ kind: 'mat', z: 0.10, x: 0, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Tumbado de lado con rodillas flexionadas y brazos estirados al frente, palmas juntas',
      reps: [
        ['Abre el brazo de arriba hacia el otro lado como un libro', 'Sigue la mano con la mirada'],
        ['Las rodillas no se separan ni se mueven', 'Gira el pecho, no solo el brazo'],
        ['Mantén 2–3 s abierto y cierra despacio', 'Respira al abrir'],
      ],
      orbit: ['Pecho abierto', 'Rotación: zona que trabaja', 'Cierra despacio'],
    },
  },
  'TS-MHO-008': {
    ...MHO, ...STR, ...FRONT_FR, primary: ['Deltoides posterior', 'Movilidad de hombro'], secondary: ['Romboides'], name: 'Estiramiento cruzado de hombro (cross-body stretch)', level: 'Intermedio',
    views: { f34: { az: -30, el: 14 }, side: { az: -80, el: 8 }, front: { az: -5, el: 12 }, back34: { az: 150, el: 18 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L',
      keys: [
        { u: 0, ...STAND, hL: [-0.30, 1.36, 0.36], eL: [0.3, -0.4, 1], pL: [0, 0, 1, -1, 0, 0], hR: [-0.04, 1.30, 0.40], eR: [-1, -0.6, 0], pR: [0, 0, -1, 1, 0, 0] },
        { u: 1, ...STAND, hL: [-0.46, 1.36, 0.18], eL: [0.3, -0.4, 1], pL: [0, 0, 1, -1, 0, 0], hR: [-0.10, 1.30, 0.28], eR: [-1, -0.6, 0], pR: [0, 0, -1, 1, 0, 0] }] } },
    captions: {
      intro: 'De pie, un brazo estirado cruzado por delante del pecho',
      reps: [
        ['Con el otro antebrazo acerca el brazo al pecho', 'Mantén 20–30 s'],
        ['El hombro estirado no sube hacia la oreja', 'Presiona por encima del codo, no sobre él'],
        ['Estiramiento suave', 'Cambia de brazo al terminar'],
      ],
      orbit: ['Brazo al pecho', 'Estiramiento: zona que trabaja', 'Suelta despacio'],
    },
  },
  'TS-MHO-009': {
    ...MHO, ...STR, primary: ['Movilidad de hombro', 'Dorsal ancho'], secondary: ['Tríceps'], name: 'Movilidad de hombro con banda en pared', level: 'Avanzado',
    frame: { dist: 4.6, ty: 1.10, tz: 0.30, distLow: 4.3, tyLow: 1.00 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -140, el: 16 } }, orbit: { view: 'side', sweep: 130 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.24, 1.95, 1.02], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, P: [0, -0.012, -0.04], hL: [0.24, 1.86, 0.36], eL: [1, -0.2, 0], pL: [0, 0, 1, 0, 1, 0], aR: [6, 8, 8] },
        { u: 1, ...STAND, P: [0, -0.04, -0.28], rot: [42, 0, 0], sp: [-8, 0, 0], nk: [-30, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8], hL: [0.24, 1.66, 0.62], eL: [1, -0.2, 0], pL: [0, -1, 0, 0, 0.5, 1], aR: [30, 10, 30] }] },
      items: [{ kind: 'wall', flip: true, z: 1.06, w: 1.2, h: 2.2 }] },
    captions: {
      intro: 'De pie frente a la pared, una mano sujeta una banda anclada arriba',
      reps: [
        ['Lleva la cadera atrás dejando que la banda estire el brazo hacia arriba', 'Mantén 20–30 s respirando'],
        ['Pecho hacia el suelo y brazo junto a la oreja', 'La banda tracciona suavemente el hombro'],
        ['Sin dolor', 'Cambia de brazo al terminar'],
      ],
      orbit: ['Brazo arriba', 'Estiramiento: zona que trabaja', 'Sal despacio'],
    },
  },
  'TS-MHO-010': {
    ...MHO, ...FRONT_FR, primary: ['Trapecio superior', 'Movilidad de hombro'], secondary: ['Antebrazo'], name: 'Círculos de hombro con mancuerna ligera', level: 'Avanzado', tempo: { down: 2, pause: 0, up: 2 },
    phaseNames: { BAJADA: 'HOMBROS ARRIBA Y ATRÁS', SUBIDA: 'HOMBROS ABAJO Y DELANTE', ARRIBA: 'HOMBROS RELAJADOS' }, holdLabel: 'HOMBROS ATRÁS',
    views: { f34: { az: -45, el: 10 }, side: { az: -90, el: 6 }, front: { az: -10, el: 10 }, back34: { az: -150, el: 14 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', dbK: 0.8,
      keys: (() => {
        const A = { aL: [2, 8, 4], aR: [2, 8, 4], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] };
        return [{ u: 0, ...STAND, ...A, shz: 0.03 }, { u: 0.35, ...STAND, ...A, shr: 0.06, shz: 0.02 }, { u: 0.7, ...STAND, ...A, shr: 0.03, shz: -0.03 }, { u: 1, ...STAND, ...A, shr: -0.005, shz: -0.03 }];
      })() } },
    captions: {
      intro: 'De pie, una mancuerna ligera en cada mano con los brazos relajados',
      reps: [
        ['Sube los hombros, llévalos atrás y bájalos dibujando un círculo', 'Luego cambia el sentido'],
        ['Brazos estirados: solo se mueven los hombros', 'Cuello largo y relajado'],
        ['Círculos amplios y lentos', '10 círculos en cada sentido'],
      ],
      orbit: ['Hombros atrás', 'Movilidad: músculos que trabajan', 'Sigue con círculos lentos'],
    },
  },
  'TS-MHO-011': {
    ...MHO, ...FRONT_FR, primary: ['Manguito rotador', 'Movilidad de hombro'], secondary: ['Deltoides'], name: 'Movilidad activa de hombro 90/90', level: 'Avanzado',
    phaseNames: { BAJADA: 'ROTACIÓN INTERNA', SUBIDA: 'ROTACIÓN EXTERNA', ARRIBA: 'ANTEBRAZOS ARRIBA' }, holdLabel: 'ANTEBRAZOS ABAJO', tempo: { down: 2.5, pause: 1, up: 2.5 },
    views: { f34: { az: -40, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 14 }, back34: { az: 150, el: 16 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L',
      keys: [
        { u: 0, ...STAND, hL: [0.50, 1.70, 0.0], hR: [-0.50, 1.70, 0.0], eL: [1, -0.3, -0.6], eR: [-1, -0.3, -0.6], pL: [0, 0, 1, 0, 1, 0], pR: [0, 0, 1, 0, 1, 0] },
        { u: 0.5, ...STAND, hL: [0.50, 1.40, 0.28], hR: [-0.50, 1.40, 0.28], eL: [1, -0.3, -0.6], eR: [-1, -0.3, -0.6], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, ...STAND, hL: [0.50, 1.20, 0.12], hR: [-0.50, 1.20, 0.12], eL: [1, -0.3, -0.6], eR: [-1, -0.3, -0.6], pL: [0, 0, -1, 0, -1, 0.4], pR: [0, 0, -1, 0, -1, 0.4] }] } },
    captions: {
      intro: 'De pie, brazos separados a la altura de los hombros y codos a 90°, antebrazos verticales',
      reps: [
        ['Gira los antebrazos hacia delante y abajo sin bajar los codos', 'Vuelve a subirlos hasta la vertical'],
        ['Los codos quedan a la altura de los hombros', 'Solo giran los antebrazos'],
        ['Rango completo y lento', 'Sin dolor'],
      ],
      orbit: ['Antebrazos abajo', 'Rotación: músculos que trabajan', 'Vuelve arriba'],
    },
  },
  'TS-MHO-012': {
    ...MHO, ...STR, ...FRONT_FR, primary: ['Tríceps', 'Dorsal ancho'], secondary: ['Movilidad de hombro'], name: 'Estiramiento de tríceps y dorsal (overhead stretch)', level: 'Avanzado',
    views: { f34: { az: -30, el: 12 }, side: { az: -90, el: 8 }, front: { az: -5, el: 10 }, back34: { az: -160, el: 16 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L',
      keys: [
        { u: 0, ...STAND, hL: [0.10, 1.70, -0.12], eL: [0.2, 1, 0.1], pL: [-1, 0, 0, 0, -1, 0], hR: [0.20, 1.82, 0.02], eR: [-1, 0.3, 0.2], pR: [0, -1, 0, 1, 0, 0] },
        { u: 1, ...STAND, rot: [2, 0, -8], sp: [0, 0, -8], hL: [-0.02, 1.62, -0.12], eL: [0.2, 1, 0.1], pL: [-1, 0, 0, 0, -1, 0], hR: [0.10, 1.80, 0.02], eR: [-1, 0.3, 0.2], pR: [0, -1, 0, 1, 0, 0] }] } },
    captions: {
      intro: 'De pie, un brazo por encima de la cabeza con el codo flexionado y la mano detrás de la nuca',
      reps: [
        ['Con la otra mano empuja el codo hacia la cabeza', 'Inclina un poco el tronco hacia ese lado'],
        ['Mantén 20–30 s respirando', 'Abdomen firme: no arquees la espalda'],
        ['Estiramiento suave', 'Cambia de brazo al terminar'],
      ],
      orbit: ['Codo atrás', 'Estiramiento: zona que trabaja', 'Suelta despacio'],
    },
  },
});
