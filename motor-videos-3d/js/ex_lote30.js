// Lote 30: deltoides TS-DEL-008 … 014 y trapecio TS-TPZ-001 … 003
import { EXERCISES } from './exercises.js';
import { RAISE, RAISE_FR } from './ex_lote29.js';
import './ex_lote28.js';

const DEL = { sub: 'Deltoides' }, TPZ = { sub: 'Trapecio' };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const STAG = { P: [0, -0.03, -0.02], rot: [4, 0, 0], L: [0.12, 0.08, 0.22, 0, 6], R: [-0.13, 0.08, -0.30, 10, -6] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const INCL = { P: [0, 0.57, -0.06], rot: [55, 0, 0], nk: [-20, 0], L: [0.15, 0.08, -0.80, 15, 8], R: [-0.15, 0.08, -0.80, 15, -8], kL: [0, 0, 1], kR: [0, 0, 1] };
const INCL_FR = { frame: { dist: 4.6, ty: 0.75, tz: 0.10, distLow: 4.3, tyLow: 0.72 }, views: { f34: { az: -45, el: 14 }, side: { az: -90, el: 6 }, front: { az: -15, el: 16 }, back34: { az: 160, el: 22 } } };
const SHRUG = { family: 'free', primary: ['Trapecio superior'], secondary: ['Antebrazo'], tempo: { down: 1, pause: 1, up: 1.5 },
  phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'HOMBROS ABAJO' }, holdLabel: 'HOMBROS ARRIBA', labelAll: true };
const DBSIDE = (shr) => ({ aL: [2, 8, 6], aR: [2, 8, 6], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], shr });
const BARFRONT = (y, shr, w = 0.24) => ({ hL: [w, y, 0.10], hR: [-w, y, 0.10], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0], shr });

Object.assign(EXERCISES, {
  'TS-DEL-008': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides anterior'], secondary: ['Pectoral', 'Trapecio superior'], name: 'Elevaciones frontales con disco', level: 'Intermedio',
    views: { f34: { az: -50, el: 10 }, side: { az: -88, el: 6 }, front: { az: -20, el: 8 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'plate',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.17, 0.92, 0.24], hR: [-0.17, 0.92, 0.24], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], pn: [0, 0, 1] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.17, 1.48, 0.56], hR: [-0.17, 1.48, 0.56], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0], pn: [0, 1, 0] }] } },
    captions: {
      intro: 'De pie, un disco sujeto con las dos manos delante de los muslos',
      reps: [
        ['Eleva el disco al frente hasta la altura de los ojos', 'Baja en 2 s controlando'],
        ['Brazos casi estirados', 'El tronco no se balancea hacia atrás'],
        ['Peso moderado', 'Exhala al subir'],
      ],
      orbit: ['Disco arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-009': {
    ...RAISE, ...DEL, ...INCL_FR, primary: ['Deltoides posterior'], secondary: ['Romboides', 'Trapecio medio'], name: 'Elevaciones posteriores en banco inclinado', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'db',
      keys: [
        { u: 0, ...INCL, hL: [0.12, 0.26, 0.36], hR: [-0.12, 0.26, 0.36], eL: [1, 0.3, 0], eR: [-1, 0.3, 0], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, ...INCL, hL: [0.70, 0.78, 0.30], hR: [-0.70, 0.78, 0.30], eL: [0.2, 1, 0], eR: [-0.2, 1, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'inclineBench', angle: 35, ry: Math.PI }] },
    captions: {
      intro: 'Pecho apoyado en un banco inclinado, mancuernas colgando',
      reps: [
        ['Abre los brazos hacia los lados hasta la línea del tronco', 'Baja en 2 s controlando'],
        ['El apoyo evita el impulso del tronco', 'Codos ligeramente flexionados'],
        ['Peso muy ligero', 'Junta un poco las escápulas arriba'],
      ],
      orbit: ['Brazos abiertos', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-010': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides medio'], secondary: ['Trapecio superior'], name: 'Elevaciones laterales con banda elástica', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'aR', hand: 'L' }, { anchor: 'aL', hand: 'R' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [2, 8, 6], aR: [2, 8, 6], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, ...STAND, nk: [0, 0], aL: [8, 84, 14], aR: [8, 84, 14], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] } },
    captions: {
      intro: 'De pie sobre la banda, cruzada delante de las piernas',
      reps: [
        ['Eleva los brazos hacia los lados hasta los hombros', 'Baja en 2 s controlando la banda'],
        ['La tensión crece arriba: no subas los hombros', 'Codos ligeramente flexionados'],
        ['Tronco quieto', 'Ajusta la tensión pisando más banda'],
      ],
      orbit: ['Brazos arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-011': {
    ...RAISE, ...DEL, primary: ['Deltoides anterior', 'Deltoides medio'], secondary: ['Tríceps', 'Trapecio superior'], name: 'Press militar sentado con mancuernas', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EMPUJE', ARRIBA: 'ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.8, ty: 1.15, tz: 0.05, distLow: 4.5, tyLow: 1.10 }, views: { f34: { az: -35, el: 10 }, side: { az: -80, el: 6 }, front: { az: -10, el: 10 } },
    cfg: { free: { type: 'kfPose', hold: 'db',
      keys: [
        { u: 0, ...SEATBOX, rot: [-2, 0, 0], nk: [0, 0], hL: [0.17, 1.58, 0.00], hR: [-0.17, 1.58, 0.00], eL: [1, -0.2, 0], eR: [-1, -0.2, 0], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] },
        { u: 1, ...SEATBOX, rot: [-2, 0, 0], nk: [0, 0], hL: [0.30, 1.08, 0.06], hR: [-0.30, 1.08, 0.06], eL: [0.6, -1, 0.3], eR: [-0.6, -1, 0.3], pL: [0, 0.3, 1, 1, 0, 0], pR: [0, 0.3, 1, -1, 0, 0] }] },
      items: [{ kind: 'seatMachine', seatY: 0.47, recline: 0 }] },
    captions: {
      intro: 'Sentado con respaldo, mancuernas a la altura de los hombros',
      reps: [
        ['Empuja las mancuernas hacia arriba hasta casi juntarlas', 'Baja en 2 s hasta las orejas'],
        ['Espalda apoyada: el tronco no se arquea', 'Antebrazos verticales'],
        ['Codos algo por delante del cuerpo', 'Exhala al empujar'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-DEL-012': {
    ...RAISE, ...DEL, ...INCL_FR, primary: ['Trapecio inferior', 'Deltoides'], secondary: ['Romboides', 'Manguito rotador'], name: 'Elevación en Y con mancuernas ligeras', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', hold: 'db',
      keys: [
        { u: 0, ...INCL, aL: [55, 8, 4], aR: [55, 8, 4], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, ...INCL, aL: [165, 34, 4], aR: [165, 34, 4], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'inclineBench', angle: 35, ry: Math.PI }] },
    captions: {
      intro: 'Pecho apoyado en un banco inclinado, mancuernas muy ligeras colgando',
      reps: [
        ['Eleva los brazos estirados hasta formar una Y con el cuerpo', 'Baja en 2 s controlando'],
        ['Pulgares hacia arriba', 'Lleva las escápulas hacia atrás y abajo'],
        ['Peso muy ligero: es un ejercicio de control', 'Sin encoger los hombros'],
      ],
      orbit: ['Brazos en Y', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-DEL-013': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides'], secondary: ['Trapecio superior', 'Serrato anterior'], name: 'Elevaciones en 6 direcciones (delt complex)', level: 'Avanzado',
    tempo: { down: 3, pause: 0.6, up: 3 }, phaseNames: { BAJADA: 'LATERAL · FRONTAL · ARRIBA', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ABAJO' }, holdLabel: 'BRAZOS ARRIBA',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db',
      keys: [
        { u: 0, ...STAND, nk: [0, 0], aL: [2, 8, 6], aR: [2, 8, 6], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 0.34, ...STAND, nk: [0, 0], aL: [8, 86, 12], aR: [8, 86, 12], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 0.67, ...STAND, nk: [0, 0], aL: [88, 14, 10], aR: [88, 14, 10], pL: [0, -1, 0, 1, 0, 0], pR: [0, -1, 0, -1, 0, 0] },
        { u: 1, ...STAND, nk: [0, 0], aL: [168, 16, 8], aR: [168, 16, 8], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie con mancuernas ligeras a los lados',
      reps: [
        ['Eleva lateral hasta los hombros, lleva los brazos al frente y súbelos arriba', 'Vuelve por el mismo camino'],
        ['Seis tramos encadenados sin soltar la tensión', 'Codos casi estirados'],
        ['Peso muy ligero', 'Movimiento fluido y controlado'],
      ],
      orbit: ['Brazos arriba', 'Elevación completa: músculos que trabajan', 'Vuelve por el mismo camino'],
    },
  },
  'TS-DEL-014': {
    ...RAISE, ...DEL, ...RAISE_FR, primary: ['Deltoides posterior'], secondary: ['Romboides', 'Trapecio medio'], name: 'Abducción de hombro de pie en polea (reverse cable fly)', level: 'Intermedio',
    phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS CRUZADOS' }, holdLabel: 'BRAZOS ABIERTOS',
    views: { f34: { az: -30, el: 10 }, side: { az: -80, el: 6 }, front: { az: -5, el: 10 }, back34: { az: 160, el: 14 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L', 'R'], bands: [{ anchor: [-0.80, 1.45, 0.75], hand: 'L' }, { anchor: [0.80, 1.45, 0.75], hand: 'R' }],
      keys: [
        { u: 0, ...STAG, nk: [0, 0], hL: [-0.06, 1.42, 0.55], hR: [0.06, 1.40, 0.55], eL: [1, 0, -0.2], eR: [-1, 0, -0.2], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...STAG, nk: [0, 0], hL: [0.74, 1.42, 0.04], hR: [-0.74, 1.42, 0.04], eL: [0.2, -1, 0], eR: [-0.2, -1, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'post', h: 1.52, x: 0.82, z: 0.78 }, { kind: 'post', h: 1.52, x: -0.82, z: 0.78 }] },
    captions: {
      intro: 'De pie entre dos poleas a la altura de los hombros, cables cruzados',
      reps: [
        ['Abre los brazos hacia los lados y atrás', 'Vuelve en 2 s cruzando los cables'],
        ['Codos ligeramente flexionados y a la altura de los hombros', 'Junta las escápulas al final'],
        ['Peso ligero', 'Tronco quieto'],
      ],
      orbit: ['Brazos abiertos', 'Apertura: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-TPZ-001': {
    ...SHRUG, ...TPZ, ...RAISE_FR, name: 'Encogimientos de hombros con barra (shrugs)', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', keys: [{ u: 0, ...STAND, nk: [0, 0], ...BARFRONT(0.80, 0) }, { u: 1, ...STAND, nk: [0, 0], ...BARFRONT(0.875, 0.075) }] } },
    captions: {
      intro: 'De pie, barra colgando delante de los muslos',
      reps: [
        ['Sube los hombros hacia las orejas', 'Mantén 1 s y baja controlando'],
        ['Brazos estirados: no flexiones los codos', 'Sin girar los hombros'],
        ['Cuello relajado y mirada al frente', 'Recorrido completo'],
      ],
      orbit: ['Hombros arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-002': {
    ...SHRUG, ...TPZ, ...RAISE_FR, name: 'Encogimientos de hombros con mancuernas', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', keys: [{ u: 0, ...STAND, nk: [0, 0], ...DBSIDE(0) }, { u: 1, ...STAND, nk: [0, 0], ...DBSIDE(0.075) }] } },
    captions: {
      intro: 'De pie, una mancuerna en cada mano a los lados',
      reps: [
        ['Sube los hombros hacia las orejas', 'Mantén 1 s y baja controlando'],
        ['Brazos estirados y relajados', 'Movimiento vertical, sin círculos'],
        ['Cuello relajado', 'Recorrido completo'],
      ],
      orbit: ['Hombros arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TPZ-003': {
    ...SHRUG, ...TPZ, ...RAISE_FR, name: 'Encogimientos de hombros en máquina', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', keys: [{ u: 0, ...STAND, nk: [0, 0], ...BARFRONT(0.80, 0, 0.26) }, { u: 1, ...STAND, nk: [0, 0], ...BARFRONT(0.875, 0.075, 0.26) }] },
      items: [{ kind: 'smithMachine', z: 0.10 }] },
    captions: {
      intro: 'De pie en la máquina guiada, barra delante de los muslos',
      reps: [
        ['Sube los hombros hacia las orejas', 'Mantén 1 s y baja controlando'],
        ['La guía permite cargar más con seguridad', 'Brazos estirados'],
        ['Cuello relajado', 'Recorrido completo'],
      ],
      orbit: ['Hombros arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
});
