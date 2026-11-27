// Lote 36: manguito rotador TS-MRO-002 … 011
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import './ex_lote26.js';
import './ex_lote35.js';

const MRO = { family: 'free', sub: 'Manguito rotador', primary: ['Manguito rotador'], secondary: ['Deltoides posterior'], tempo: { down: 2, pause: 0.5, up: 2 },
  phaseNames: { BAJADA: 'ROTACIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ROTACIÓN MÁXIMA', labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const FRONT_FR = { ...RAISE_FR, frame: { dist: 4.2, ty: 1.15, tz: 0.15, distLow: 4.0, tyLow: 1.10 } };
const MRO_VIEWS = { f34: { az: -35, el: 20 }, side: { az: -80, el: 12 }, front: { az: -10, el: 24 }, back34: { az: 160, el: 22 } };
const CABLE = 0xb9bec4;
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
// brazo izquierdo con el codo pegado al costado a 90°
const OUT = { hL: [0.52, 1.02, 0.14], eL: [0, -1, 0], pL: [0, 0, 1, 0, 1, 0] };
const FWD = { aL: [6, 4, 90], pL: [-1, 0, 0, 0, 1, 0] };
const IN = { hL: [0.02, 1.03, 0.24], eL: [0.3, -1, 0], pL: [-0.7, 0, -0.7, 0, 1, 0] };
const AR = { aR: [6, 8, 6] };
// tumbado boca arriba en el suelo, cabeza hacia -z; brazo izquierdo a 90/90
const SUP = { P: [0, 0.115, 0.10], rot: [-90, 0, 0], sp: [0, 0, 0], nk: [6, 0], lL: [40, 80, 0, 0], lR: [40, 80, 0, 0], aR: [4, 12, 4], pR: [1, 0, 0, 0, -1, 0] };
const SUP_FR = { frame: { dist: 3.8, ty: 0.30, tz: -0.10, distLow: 3.5, tyLow: 0.30 },
  views: { f34: { az: 40, el: 30 }, side: { az: 90, el: 14 }, front: { az: 10, el: 40 }, back34: { az: 140, el: 30 } }, orbit: { view: 'side', sweep: 140 } };
// tumbado de lado sobre el costado derecho, cabeza hacia -x, pecho hacia +z
const SIDE = { P: [0.25, 0.21, 0], rot: [0, 0, 90], sp: [0, 0, -4], nk: [0, 0], lL: [40, 70, 0, 0], lR: [40, 70, 0, 0], hR: [-0.62, 0.30, 0.16], eR: [0, -1, 0], pR: [0, -1, 0, -1, 0, 0] };
const SIDE_FR = { frame: { dist: 3.6, ty: 0.30, tz: 0.05, distLow: 3.3, tyLow: 0.30 },
  views: { f34: { az: -30, el: 22 }, side: { az: 0, el: 12 }, front: { az: -60, el: 30 }, back34: { az: -150, el: 28 } }, orbit: { view: 'side', sweep: 140 } };

const YTW = (() => {
        const B = { P: [0, 0.57, -0.06], rot: [55, 0, 0], nk: [-20, 0], L: [0.15, 0.08, -0.80, 15, 8], R: [-0.15, 0.08, -0.80, 15, -8], kL: [0, 0, 1], kR: [0, 0, 1] };
        const low = { hL: [0.18, 0.22, 0.34], hR: [-0.18, 0.22, 0.34], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [0, 0, 1, 0, -1, 0], pR: [0, 0, 1, 0, -1, 0] };
        const Y = { hL: [0.42, 1.08, 0.58], hR: [-0.42, 1.08, 0.58], eL: [1, 0.2, 0], eR: [-1, 0.2, 0], pL: [-1, 0, 0, 0.3, 0.5, 0.8], pR: [1, 0, 0, -0.3, 0.5, 0.8] };
        const T = { hL: [0.78, 0.76, 0.18], hR: [-0.78, 0.76, 0.18], eL: [0, 1, 0], eR: [0, 1, 0], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] };
        const W = { hL: [0.42, 0.88, 0.32], hR: [-0.42, 0.88, 0.32], eL: [0.6, 0.3, -1], eR: [-0.6, 0.3, -1], pL: [0, 0, 1, 0, 0.7, 0.7], pR: [0, 0, 1, 0, 0.7, 0.7] };
        return [Y, T, W, Y].map((k) => [{ u: 0, ...B, ...low }, { u: 1, ...B, ...k }]);
      })();

Object.assign(EXERCISES, {
  'TS-MRO-002': {
    ...MRO, ...FRONT_FR, views: MRO_VIEWS, name: 'Rotación interna de hombro con banda', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.95, 1.00, 0.20], hand: 'L' }],
      keys: [{ u: 0, ...STAND, ...OUT, ...AR }, { u: 1, ...STAND, ...IN, ...AR }] },
      items: [{ kind: 'post', h: 1.06, x: 0.97, z: 0.20 }] },
    captions: {
      intro: 'De pie, codo pegado al costado a 90° y banda anclada del mismo lado',
      reps: [
        ['Lleva la mano hacia el ombligo sin despegar el codo', 'Vuelve hacia fuera en 2 s'],
        ['El codo queda fijo junto al cuerpo', 'El antebrazo gira como una puerta'],
        ['Tensión ligera y controlada', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación interna', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-MRO-003': {
    ...MRO, ...SIDE_FR, name: 'Rotación externa con mancuerna en decúbito lateral', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'db', holdSides: ['L'],
      keys: [
        { u: 0, ...SIDE, hL: [0.08, 0.19, 0.27], eL: [1, 0.2, -0.2], pL: [0, -1, 0, 0, 0, 1] },
        { u: 1, ...SIDE, hL: [0.08, 0.70, 0.10], eL: [1, 0.2, -0.2], pL: [0, 0, 1, 0, 1, 0] }] },
      items: [{ kind: 'mat', z: 0.05, x: 0, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Tumbado de lado, codo de arriba pegado al costado a 90° y mancuerna ligera',
      reps: [
        ['Gira el antebrazo hacia arriba sin despegar el codo', 'Baja en 2 s'],
        ['Una toalla bajo el codo ayuda a mantener la posición', 'El tronco no rota hacia atrás'],
        ['Peso muy ligero', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-MRO-004': {
    ...MRO, secondary: ['Trapecio medio', 'Trapecio inferior', 'Romboides'], name: 'Ejercicio Y-T-W en banco inclinado', level: 'Principiante', tempo: { down: 1.5, pause: 1, up: 1.5 },
    phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ABAJO' }, holdLabel: 'MANTÉN ARRIBA',
    frame: { dist: 4.6, ty: 0.70, tz: 0.10, distLow: 4.3, tyLow: 0.68 }, views: { f34: { az: -55, el: 16 }, side: { az: -90, el: 8 }, front: { az: -20, el: 22 }, back34: { az: -150, el: 30 } }, orbit: { view: 'back34', sweep: 120 },
    cfg: { free: { type: 'kfPose', hold: 'grip',
      keys: YTW[0], repKeys: YTW },
      items: [{ kind: 'inclineBench', angle: 35, ry: Math.PI }] },
    captions: {
      intro: 'Pecho apoyado en un banco inclinado, brazos colgando',
      reps: [
        ['Y: eleva los brazos en diagonal, pulgares arriba', 'Baja en 2 s'],
        ['T: abre los brazos en cruz juntando las escápulas', 'Baja controlando'],
        ['W: codos flexionados atrás, escápulas juntas y abajo', 'Sin peso o con muy poco'],
      ],
      orbit: ['Mantén arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-MRO-005': {
    ...MRO, ...FRONT_FR, name: 'Rotación externa a 90° de abducción con banda', level: 'Intermedio',
    views: { f34: { az: -40, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 14 }, back34: { az: 150, el: 16 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.48, 1.00, 1.00], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, hL: [0.50, 1.38, 0.33], eL: [1, -0.3, -0.6], pL: [0, -1, 0, 0, 0, 1], ...AR },
        { u: 1, ...STAND, hL: [0.50, 1.72, 0.02], eL: [1, -0.3, -0.6], pL: [0, 0, 1, 0, 1, 0], ...AR }] },
      items: [{ kind: 'post', h: 1.06, x: 0.48, z: 1.02 }] },
    captions: {
      intro: 'De pie, brazo separado a la altura del hombro y codo a 90°, banda anclada delante',
      reps: [
        ['Gira el antebrazo hacia arriba hasta la vertical', 'Vuelve al frente en 2 s'],
        ['El codo no baja: queda a la altura del hombro', 'Solo gira el antebrazo'],
        ['Tensión ligera', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Antebrazo vertical', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-MRO-006': {
    ...MRO, ...RAISE_FR, primary: ['Manguito rotador', 'Deltoides medio'], secondary: ['Trapecio superior', 'Serrato anterior'], name: 'Elevación en plano escapular (scaption)', level: 'Intermedio',
    phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ABAJO' }, holdLabel: 'ALTURA DE HOMBROS',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'aL', hand: 'L' }, { anchor: 'aR', hand: 'R' }],
      keys: [
        { u: 0, ...STAND, aL: [8, 12, 4], aR: [8, 12, 4], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
        { u: 1, ...STAND, hL: [0.70, 1.48, 0.42], hR: [-0.70, 1.48, 0.42], eL: [0.5, -1, 0], eR: [-0.5, -1, 0], pL: [-0.5, 0, 0.85, 0.85, 0.1, 0.5], pR: [0.5, 0, 0.85, -0.85, 0.1, 0.5] }] } },
    captions: {
      intro: 'De pie sobre la banda, brazos a los lados con los pulgares hacia arriba',
      reps: [
        ['Eleva los brazos en diagonal, unos 30° por delante del cuerpo', 'Baja en 2 s'],
        ['Pulgares arriba durante todo el recorrido', 'Sube solo hasta la altura de los hombros'],
        ['Hombros lejos de las orejas', 'Tensión ligera'],
      ],
      orbit: ['Altura de hombros', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-MRO-007': {
    ...MRO, ...FRONT_FR, views: MRO_VIEWS, name: 'Rotación externa con polea baja', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handles: ['L'], cable: true, rods: [{ from: [-0.70, 0.30, 0.25], to: 'hL', r: 0.006, color: CABLE }],
      keys: [{ u: 0, ...STAND, ...IN, ...AR }, { u: 1, ...STAND, ...OUT, ...AR }] },
      items: [{ kind: 'post', h: 0.34, x: -0.72, z: 0.25 }] },
    captions: {
      intro: 'De pie de lado a la polea baja, codo pegado al costado a 90°',
      reps: [
        ['Gira el antebrazo hacia fuera sin despegar el codo', 'Vuelve en 2 s'],
        ['El cable tira en diagonal: el codo sigue fijo', 'Tronco quieto, sin girar'],
        ['Peso ligero', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-MRO-008': {
    ...MRO, ...FRONT_FR, views: MRO_VIEWS, name: 'Rotación interna con polea alta', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handles: ['L'], cable: true, rods: [{ from: [0.85, 1.80, 0.20], to: 'hL', r: 0.006, color: CABLE }],
      keys: [{ u: 0, ...STAND, ...OUT, ...AR }, { u: 1, ...STAND, ...IN, ...AR }] },
      items: [{ kind: 'post', h: 1.86, x: 0.87, z: 0.20 }] },
    captions: {
      intro: 'De pie de lado a la polea alta, codo pegado al costado a 90°',
      reps: [
        ['Lleva la mano hacia el ombligo sin despegar el codo', 'Vuelve hacia fuera en 2 s'],
        ['El codo queda fijo junto al cuerpo', 'Hombro abajo y atrás'],
        ['Peso ligero y controlado', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación interna', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-MRO-009': {
    ...like('TS-VER-012', {}), sub: 'Manguito rotador', primary: ['Manguito rotador', 'Deltoides anterior'], secondary: ['Deltoides medio', 'Tríceps'],
    name: 'Press de hombro con banda en rango controlado', level: 'Avanzado', tempo: { down: 2, pause: 0.5, up: 2 },
    captions: {
      intro: 'De pie sobre la banda, manos a la altura de los hombros',
      reps: [
        ['Empuja hacia arriba solo hasta donde no haya molestia', 'Baja en 2 s'],
        ['Codos ligeramente por delante del cuerpo', 'Hombros abajo, lejos de las orejas'],
        ['Rango sin dolor y tensión ligera', 'Abdomen firme'],
      ],
      orbit: ['Brazos arriba', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-MRO-010': {
    ...MRO, ...FRONT_FR, primary: ['Manguito rotador'], secondary: ['Serrato anterior', 'Deltoides'], name: 'Ejercicio de reloj (clock exercise) con banda', level: 'Avanzado',
    tempo: { down: 3, pause: 0.5, up: 1.5 }, phaseNames: { BAJADA: 'RELOJ', SUBIDA: 'REGRESO', ARRIBA: 'CENTRO' }, holdLabel: 'POSICIÓN FINAL',
    views: { f34: { az: -30, el: 12 }, side: { az: -80, el: 8 }, front: { az: -5, el: 10 }, back34: { az: 150, el: 16 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'hR', hand: 'L' }],
      keys: (() => {
        const H = (x, y) => ({ ...STAND, hL: [x, y, 0.52], eL: [0.6, -0.6, -0.4], pL: [0, 0, 1, 0, 1, 0], hR: [-0.12, 1.20, 0.50], eR: [-0.6, -0.8, -0.3], pR: [0, 0, 1, 0, 1, 0] });
        return [{ u: 0, ...H(0.14, 1.26) }, { u: 0.25, ...H(0.14, 1.58) }, { u: 0.5, ...H(0.48, 1.30) }, { u: 0.75, ...H(0.16, 0.98) }, { u: 1, ...H(0.40, 1.08) }];
      })() } },
    captions: {
      intro: 'De pie, brazos al frente a la altura del pecho con una banda entre las manos',
      reps: [
        ['Una mano fija y la otra recorre las horas del reloj', '12, 3, 6 y vuelta al centro'],
        ['Mantén la banda tensa en todo momento', 'Hombros abajo y abdomen firme'],
        ['Movimientos lentos y precisos', 'Cambia de mano al terminar la serie'],
      ],
      orbit: ['Recorre el reloj', 'Estabilidad: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TS-MRO-011': {
    ...MRO, ...SUP_FR, name: 'Rotación externa tumbado con mancuerna ligera', level: 'Avanzado',
    cfg: { free: { type: 'kfPose', hold: 'db', holdSides: ['L'],
      keys: [
        { u: 0, ...SUP, hL: [0.50, 0.44, -0.36], eL: [1, -0.6, 0], pL: [0, 0, 1, 1, 0, 0] },
        { u: 1, ...SUP, hL: [0.50, 0.17, -0.70], eL: [1, -0.6, 0], pL: [0, 1, 0, 1, 0, 0] }] },
      items: [{ kind: 'mat', z: -0.10, x: 0, l: 1.9 }] },
    captions: {
      intro: 'Tumbado boca arriba, brazo separado a la altura del hombro y codo a 90°',
      reps: [
        ['Lleva la mancuerna hacia atrás, en dirección a la cabeza', 'Vuelve a la vertical en 2 s'],
        ['El codo queda apoyado en el suelo', 'Solo gira el antebrazo'],
        ['Peso muy ligero', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
});
