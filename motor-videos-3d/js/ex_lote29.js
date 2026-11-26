// Lote 29: espalda TS-ESP-011 … 013 y deltoides TS-DEL-001 … 007
import { EXERCISES } from './exercises.js';
import { PULL, STAND_FR } from './ex_lote22.js';
import './ex_lote25.js';
import './ex_lote28.js';

const CABLE = 0xb9bec4;
const ESP = { sub: 'Espalda' }, DEL = { sub: 'Deltoides' };
const ROW = { phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA' };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const SIDEFR = { frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 } };
export const RAISE = { family: 'free', tempo: { down: 1.5, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ABAJO' }, holdLabel: 'BRAZOS ARRIBA', labelAll: true };
export const RAISE_FR = { frame: { dist: 4.8, ty: 1.20, tz: 0.0, distLow: 4.5, tyLow: 1.15 }, views: { f34: { az: -30, el: 10 }, side: { az: -80, el: 6 }, front: { az: 0, el: 8 }, back34: { az: 160, el: 14 } } };

Object.assign(EXERCISES, {
  'TS-ESP-011': {
    ...PULL, ...ESP, ...SIDEFR, name: 'Jalón unilateral en polea alta', level: 'Intermedio', frame: { dist: 4.8, ty: 1.20, tz: 0.05, distLow: 4.5, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L'], cable: true, bands: [{ anchor: [0.16, 2.35, 0.15], hand: 'L' }],
      keys: [
        { u: 0, ...SEATBOX, rot: [-2, 0, -6], nk: [0, 0], hL: [0.18, 1.58, 0.08], eL: [0.6, -0.2, 0.3], pL: [-1, 0, 0, 0, 0, 1], aR: [15, 10, 40] },
        { u: 1, ...SEATBOX, rot: [-8, 0, 4], nk: [0, 0], hL: [0.22, 1.06, 0.12], eL: [0.4, -1, -0.3], pL: [-1, 0, 0, 0, 0, 1], aR: [15, 10, 40] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado bajo la polea alta, asa en una mano y brazo estirado',
      reps: [
        ['Tira del asa hacia el hombro llevando el codo abajo', 'Sube en 2 s estirando el brazo'],
        ['El tronco se inclina un poco hacia el lado que trabaja', 'Hombro lejos de la oreja'],
        ['Siente el dorsal estirarse arriba', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Codo abajo', 'Contracción máxima: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-ESP-012': {
    ...PULL, ...ROW, ...ESP, ...SIDEFR, name: 'Remo en máquina Hammer unilateral', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L'], rods: [{ from: [0.24, 0.30, 0.80], to: 'hL', ext: 0.03, r: 0.024 }],
      keys: [
        { u: 0, ...SEATBOX, rot: [14, -6, 0], nk: [-4, 0], hL: [0.20, 0.90, 0.60], eL: [0.6, -0.5, -0.2], pL: [-1, 0, 0, 0, 1, 0], aR: [40, 12, 70] },
        { u: 1, ...SEATBOX, rot: [10, 8, 0], nk: [-4, 0], hL: [0.22, 0.95, 0.12], eL: [0.5, 0, -1], pL: [-1, 0, 0, 0, 1, 0], aR: [40, 12, 70] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }, { kind: 'post', h: 1.12, z: 0.36 }] },
    captions: {
      intro: 'Pecho apoyado y un asa en la mano que trabaja',
      reps: [
        ['Tira del asa llevando el codo atrás', 'Vuelve en 2 s estirando el brazo'],
        ['El pecho no se despega del apoyo', 'Junta la escápula al final'],
        ['Corrige diferencias entre lados', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Codo atrás', 'Contracción máxima: músculos que trabajan', 'Estira controlando'],
    },
  },
  'TS-ESP-013': {
    ...EXERCISES['TS-ESP-004'], ...ESP, primary: ['Erectores espinales', 'Oblicuos'], name: 'Extensión de espalda con rotación de tronco', level: 'Avanzado',
    phaseNames: { BAJADA: 'EXTENSIÓN Y GIRO', SUBIDA: 'BAJADA', ARRIBA: 'POSICIÓN BAJA' }, holdLabel: 'ARRIBA CON GIRO',
    cfg: { free: { type: 'kfPose', alt: true,
      keys: [
        { u: 0, P: [0, 0.80, 0.06], rot: [108, 0, 0], sp: [22, 0, 0], nk: [12, 0], L: [0.10, 0.17, -0.56, -30, 6], R: [-0.10, 0.17, -0.56, -30, -6], kL: [0, -1, 0.3], kR: [0, -1, 0.3], aL: [40, -25, 135], aR: [40, -25, 135], pL: [-0.3, 0, -1, -1, 0, 0], pR: [0.3, 0, -1, 1, 0, 0] },
        { u: 1, P: [0, 0.80, 0.06], rot: [45, 0, 0], sp: [-4, 34, 0], nk: [-4, 10], L: [0.10, 0.17, -0.56, -30, 6], R: [-0.10, 0.17, -0.56, -30, -6], kL: [0, -1, 0.3], kR: [0, -1, 0.3], aL: [40, -25, 135], aR: [40, -25, 135], pL: [-0.3, 0, -1, -1, 0, 0], pR: [0.3, 0, -1, 1, 0, 0] }] },
      items: [{ kind: 'romanChair' }] },
    captions: {
      intro: 'En el banco de hiperextensiones, tronco abajo y brazos cruzados',
      reps: [
        ['Sube el tronco y gíralo hacia un lado al llegar arriba', 'Baja en 2 s y alterna el lado del giro'],
        ['El giro sale del tronco, no de los hombros', 'Arriba, sin pasar de la línea del cuerpo'],
        ['Movimiento lento y controlado', 'Añade una mancuerna al pecho para progresar'],
      ],
      orbit: ['Arriba con giro', 'Extensión con giro: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-001': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides medio'], secondary: ['Trapecio superior', 'Deltoides anterior'], name: 'Elevaciones laterales con mancuernas', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [2, 8, 6], aR: [2, 8, 6], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, ...STAND, nk: [0, 0], aL: [8, 86, 14], aR: [8, 86, 14], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] } },
    captions: {
      intro: 'De pie con una mancuerna en cada mano a los lados',
      reps: [
        ['Eleva los brazos hacia los lados hasta la altura de los hombros', 'Baja en 2 s controlando'],
        ['Codos ligeramente flexionados y por delante de las manos', 'Hombros abajo: no los encojas'],
        ['Peso ligero y sin impulso', 'Sube con los codos, no con las manos'],
      ],
      orbit: ['Brazos a la altura de los hombros', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-002': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides anterior'], secondary: ['Pectoral', 'Serrato anterior'], name: 'Elevaciones frontales con mancuernas', level: 'Principiante',
    views: { f34: { az: -50, el: 10 }, side: { az: -88, el: 6 }, front: { az: -20, el: 8 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [4, 6, 6], aR: [4, 6, 6], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0] },
        { u: 1, ...STAND, nk: [0, 0], aL: [90, 8, 8], aR: [90, 8, 8], pL: [0, -1, 0, 1, 0, 0], pR: [0, -1, 0, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, mancuernas delante de los muslos',
      reps: [
        ['Eleva los brazos al frente hasta la altura de los hombros', 'Baja en 2 s controlando'],
        ['Codos casi estirados', 'El tronco no se balancea'],
        ['Peso ligero', 'Puedes alternar brazos'],
      ],
      orbit: ['Brazos al frente', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-003': {
    ...RAISE, ...DEL, ...SIDEFR, primary: ['Deltoides posterior'], secondary: ['Romboides', 'Trapecio medio'], name: 'Elevaciones posteriores (pájaros) con mancuernas', level: 'Principiante',
    views: { f34: { az: -35, el: 14 }, side: { az: -90, el: 6 }, front: { az: -10, el: 16 }, back34: { az: 160, el: 20 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db',
      keys: [
        { u: 0, P: [0, -0.07, -0.14], rot: [52, 0, 0], sp: [-4, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8], hL: [0.10, 0.64, 0.30], hR: [-0.10, 0.64, 0.30], eL: [1, 0.3, 0], eR: [-1, 0.3, 0], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, P: [0, -0.07, -0.14], rot: [52, 0, 0], sp: [-6, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8], hL: [0.70, 1.10, 0.24], hR: [-0.70, 1.10, 0.24], eL: [0.2, 1, 0], eR: [-0.2, 1, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] } },
    captions: {
      intro: 'Tronco inclinado hacia delante, mancuernas colgando bajo los hombros',
      reps: [
        ['Abre los brazos hacia los lados hasta la altura del tronco', 'Baja en 2 s controlando'],
        ['Codos ligeramente flexionados', 'Espalda neutra y cuello relajado'],
        ['Peso muy ligero: el deltoides posterior es pequeño', 'Sin impulso del tronco'],
      ],
      orbit: ['Brazos abiertos', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-004': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides medio'], secondary: ['Trapecio superior'], name: 'Elevaciones laterales en polea', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L'], bands: [{ anchor: [-0.30, 0.15, 0.04], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [12, -8, 12], pL: [-1, 0, 0, 0, 0, 1], aR: [8, 14, 60] },
        { u: 1, ...STAND, nk: [0, 0], aL: [8, 86, 14], pL: [0, -1, 0, 0, 0, 1], aR: [8, 14, 60] }] },
      items: [{ kind: 'post', h: 0.22, x: -0.32, z: 0.04 }] },
    captions: {
      intro: 'De lado a la polea baja, asa en la mano más alejada',
      reps: [
        ['Eleva el brazo hacia el lado hasta la altura del hombro', 'Baja en 2 s cruzando por delante del cuerpo'],
        ['El cable mantiene la tensión en todo el recorrido', 'Codo ligeramente flexionado'],
        ['Tronco quieto', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Brazo arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-005': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides medio'], secondary: ['Trapecio superior'], name: 'Elevaciones laterales en máquina', level: 'Principiante',
    frame: { dist: 4.6, ty: 1.00, tz: 0.10, distLow: 4.3, tyLow: 0.95 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'],
      keys: [
        { u: 0, ...SEATBOX, nk: [0, 0], aL: [10, 12, 90], aR: [10, 12, 90], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...SEATBOX, nk: [0, 0], aL: [10, 84, 90], aR: [10, 84, 90], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'seatMachine', seatY: 0.47, recline: 0 }] },
    captions: {
      intro: 'Sentado con los brazos junto a los cojines de la máquina',
      reps: [
        ['Eleva los codos hacia los lados hasta la altura de los hombros', 'Baja en 2 s controlando'],
        ['Empuja con los codos, no con las manos', 'Hombros abajo'],
        ['Espalda pegada al respaldo', 'Sin impulso'],
      ],
      orbit: ['Codos arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-006': { ...EXERCISES['TS-VER-002'], ...DEL, name: 'Press Arnold sentado', level: 'Intermedio' },
  'TS-DEL-007': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides medio'], secondary: ['Trapecio superior'], name: 'Elevación lateral a una mano apoyado en banco', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db',
      keys: [
        { u: 0, ...STAND, rot: [2, 0, -10], nk: [0, 0], aL: [6, 12, 12], pL: [-1, 0, 0, 0, 0, 1], hR: [-0.48, 1.00, 0.02], eR: [-0.4, -1, 0], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, ...STAND, rot: [2, 0, -10], nk: [0, 0], aL: [8, 92, 14], pL: [0, -1, 0, 0, 0, 1], hR: [-0.48, 1.00, 0.02], eR: [-0.4, -1, 0], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'post', h: 1.10, x: -0.52, z: 0.02 }] },
    captions: {
      intro: 'Agarrado a un soporte con una mano e inclinado hacia el lado contrario',
      reps: [
        ['Eleva el brazo hacia el lado hasta la altura del hombro', 'Baja en 2 s controlando'],
        ['La inclinación aumenta el recorrido del deltoides', 'Codo ligeramente flexionado'],
        ['Peso ligero', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Brazo arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
});
