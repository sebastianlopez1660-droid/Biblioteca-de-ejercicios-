// Lote 33: bíceps TS-BIC-011 … 013 y tríceps TS-TRI-001 … 007
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { BENCH_FR } from './ex_lote21.js';

const D = Math.PI / 180;
const BIC = { family: 'free', sub: 'Bíceps', primary: ['Bíceps'], secondary: ['Antebrazo'], tempo: { down: 1.5, pause: 0.5, up: 2.5 },
  phaseNames: { BAJADA: 'FLEXIÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA', labelAll: true };
const TRI = { family: 'free', sub: 'Tríceps', primary: ['Tríceps'], secondary: [], tempo: { down: 1.5, pause: 0.5, up: 2 },
  phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'CODOS FLEXIONADOS' }, holdLabel: 'EXTENSIÓN COMPLETA', labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const STAG = { P: [0, -0.03, -0.02], rot: [8, 0, 0], L: [0.12, 0.08, 0.22, 0, 6], R: [-0.13, 0.08, -0.30, 10, -6] };
const INCL = { P: [0, 0.57, -0.06], rot: [55, 0, 0], nk: [-20, 0], L: [0.15, 0.08, -0.80, 15, 8], R: [-0.15, 0.08, -0.80, 15, -8], kL: [0, 0, 1], kR: [0, 0, 1] };
const HINGE = { P: [0, -0.07, -0.14], rot: [50, 0, 0], sp: [-4, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8] };
const CURL_FR = { ...RAISE_FR, views: { f34: { az: -45, el: 10 }, side: { az: -85, el: 6 }, front: { az: -15, el: 8 }, back34: { az: 160, el: 14 } } };
const sup = (a) => [0, Math.sin(a * D), Math.cos(a * D)];
const pron = (a) => [0, -Math.sin(a * D), -Math.cos(a * D)];
// brazos por ángulos (f flexión de hombro, e codo); mode: sup | ham | pron; tilt: inclinación del tronco
function armKey(u, e, { f = 4, abd = 8, mode = 'sup', base = STAND, sides = ['L', 'R'], tilt = 0, extra = {} } = {}) {
  const k = { u, ...base, nk: [0, 0], ...extra };
  for (const sd of sides) {
    const sx = sd === 'L' ? 1 : -1, a = e + f - tilt;
    k['a' + sd] = [f, abd, e];
    k['p' + sd] = mode === 'sup' ? [...sup(a), sx, 0, 0] : mode === 'pron' ? [...pron(a), sx, 0, 0] : [-sx, 0, 0, ...sup(a)];
  }
  return k;
}
const two = (e0, e1, o = {}) => [armKey(0, e0, o), armKey(1, e1, o)];
const PULLEY_HI = [0, 2.10, 0.36];

Object.assign(EXERCISES, {
  'TS-BIC-011': {
    ...BIC, name: 'Curl spider', level: 'Avanzado',
    frame: { dist: 4.6, ty: 0.70, tz: 0.10, distLow: 4.3, tyLow: 0.68 }, views: { f34: { az: -45, el: 14 }, side: { az: -90, el: 6 }, front: { az: -15, el: 16 }, back34: { az: 160, el: 22 } },
    cfg: { free: { type: 'kfPose', hold: 'db', keys: two(6, 130, { f: 55, abd: 6, base: INCL, tilt: 55 }) }, items: [{ kind: 'inclineBench', angle: 35, ry: Math.PI }] },
    captions: {
      intro: 'Pecho apoyado en un banco inclinado, brazos colgando en vertical',
      reps: [
        ['Sube las mancuernas sin mover los codos', 'Baja en 3 s hasta estirar'],
        ['Los brazos quedan verticales: el bíceps trabaja arriba del todo', 'Sin impulso'],
        ['Aprieta 1 s arriba', 'Peso moderado'],
      ],
      orbit: ['Mancuernas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-012': {
    ...BIC, ...CURL_FR, primary: ['Bíceps', 'Antebrazo'], secondary: [], name: 'Curl con cuerda en polea', level: 'Intermedio', frame: { dist: 4.8, ty: 1.10, tz: 0.15, distLow: 4.5, tyLow: 1.05 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, bands: [{ anchor: [0, 0.15, 0.48], hand: 'L' }, { anchor: [0, 0.15, 0.48], hand: 'R' }], keys: two(8, 135, { mode: 'ham', abd: 4 }) },
      items: [{ kind: 'post', h: 0.22, z: 0.50 }] },
    captions: {
      intro: 'De pie frente a la polea baja, cuerda con las palmas enfrentadas',
      reps: [
        ['Sube la cuerda flexionando los codos', 'Baja en 2–3 s'],
        ['Agarre martillo: trabajan bíceps, braquial y antebrazo', 'Codos pegados al cuerpo'],
        ['Separa un poco las manos arriba', 'Sin balanceos'],
      ],
      orbit: ['Cuerda arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-013': {
    ...BIC, ...CURL_FR, name: 'Curl isométrico con pausa', level: 'Intermedio', tempo: { down: 1.5, pause: 4, up: 2 },
    phaseNames: { BAJADA: 'FLEXIÓN', PAUSA: 'PAUSA A 90°', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'PAUSA A 90°',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', keys: two(8, 90) } },
    captions: {
      intro: 'De pie con una mancuerna en cada mano y palmas al frente',
      reps: [
        ['Sube hasta 90° de codo y mantén 4 s', 'Baja controlando'],
        ['Durante la pausa, los codos no se mueven', 'Respira de forma continua'],
        ['Aprieta el bíceps en la pausa', 'Hombros abajo'],
      ],
      orbit: ['Pausa a 90°', 'Posición isométrica: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRI-001': {
    ...TRI, ...CURL_FR, name: 'Extensión de codo en polea alta (pushdown)', level: 'Principiante', frame: { dist: 4.8, ty: 1.20, tz: 0.15, distLow: 4.5, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.34, plates: 0 }, rods: [{ from: PULLEY_HI, to: 'bar', r: 0.006, color: 0xb9bec4 }], keys: two(100, 6, { mode: 'pron', f: 0, abd: 6, base: { ...STAND, rot: [8, 0, 0] } }) },
      items: [{ kind: 'post', h: 2.18, z: 0.40 }] },
    captions: {
      intro: 'De pie frente a la polea alta, barra corta con agarre prono y codos pegados',
      reps: [
        ['Empuja la barra hacia abajo hasta estirar los codos', 'Sube en 2 s hasta 90°'],
        ['Solo se mueven los antebrazos: los codos quedan quietos', 'Tronco algo inclinado y firme'],
        ['Aprieta el tríceps abajo 1 s', 'Sin encoger los hombros'],
      ],
      orbit: ['Codos estirados', 'Extensión completa: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-TRI-002': {
    ...TRI, ...CURL_FR, name: 'Extensión de codo con cuerda en polea', level: 'Principiante', frame: { dist: 4.8, ty: 1.20, tz: 0.15, distLow: 4.5, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, bands: [{ anchor: PULLEY_HI, hand: 'L' }, { anchor: PULLEY_HI, hand: 'R' }],
      keys: [armKey(0, 100, { mode: 'ham', f: 0, abd: 2, base: { ...STAND, rot: [8, 0, 0] } }), armKey(1, 6, { mode: 'ham', f: 0, abd: 14, base: { ...STAND, rot: [8, 0, 0] } })] },
      items: [{ kind: 'post', h: 2.18, z: 0.40 }] },
    captions: {
      intro: 'De pie frente a la polea alta, cuerda con las palmas enfrentadas',
      reps: [
        ['Empuja hacia abajo y separa los extremos de la cuerda al final', 'Sube en 2 s hasta 90°'],
        ['Codos pegados al cuerpo y quietos', 'Tronco firme'],
        ['Aprieta el tríceps abajo 1 s', 'Sin balanceos'],
      ],
      orbit: ['Codos estirados', 'Extensión completa: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-TRI-003': {
    ...TRI, ...BENCH_FR, name: 'Press francés con barra (skull crusher)', level: 'Intermedio',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EXTENSIÓN', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'POSICIÓN BAJA',
    cfg: { free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.62, plates: 1 },
      keys: [
        { u: 0, P: [0, 0.53, -0.02], rot: [-90, 0, 0], sp: [-4, 0, 0], nk: [-12, 0], L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1],
          aL: [84, 6, 4], aR: [84, 6, 4], pL: [0, 0.2, 1, 1, 0, 0], pR: [0, 0.2, 1, -1, 0, 0] },
        { u: 1, P: [0, 0.53, -0.02], rot: [-90, 0, 0], sp: [-4, 0, 0], nk: [-12, 0], L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1],
          aL: [96, 6, 118], aR: [96, 6, 118], pL: [0, 1, -0.2, 1, 0, 0], pR: [0, 1, -0.2, -1, 0, 0] }] },
      items: [{ kind: 'flatBench', len: 1.15, z: 0.22 }] },
    captions: {
      intro: 'Tumbado en el banco, barra sobre los hombros con los brazos estirados',
      reps: [
        ['Flexiona los codos bajando la barra hacia la frente', 'Extiende los codos hasta arriba'],
        ['Los brazos quedan casi quietos: solo se mueven los antebrazos', 'Codos hacia el techo, sin abrirlos'],
        ['Baja controlando', 'Peso moderado'],
      ],
      orbit: ['Baja hacia la frente', 'Posición baja: músculos que trabajan', 'Extiende los codos'],
    },
  },
  'TS-TRI-004': {
    ...TRI, ...CURL_FR, name: 'Extensión de codo con mancuerna sobre la cabeza', level: 'Principiante', frame: { dist: 5.0, ty: 1.35, tz: 0.0, distLow: 4.7, tyLow: 1.30 },
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EXTENSIÓN', ARRIBA: 'BRAZOS ARRIBA' }, holdLabel: 'POSICIÓN BAJA',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db1', dbK: 1.3,
      keys: [
        { u: 0, ...STAND, nk: [0, 0], hL: [0.045, 2.04, -0.02], hR: [-0.045, 2.04, -0.02], eL: [0.4, 0.2, 1], eR: [-0.4, 0.2, 1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], dax: [0, 1, 0] },
        { u: 1, ...STAND, nk: [0, 0], hL: [0.045, 1.58, -0.20], hR: [-0.045, 1.58, -0.20], eL: [0.3, 1, 0.3], eR: [-0.3, 1, 0.3], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], dax: [0, 0.6, 0.8] }] } },
    captions: {
      intro: 'De pie, una mancuerna sujeta con las dos manos por encima de la cabeza',
      reps: [
        ['Baja la mancuerna por detrás de la cabeza flexionando los codos', 'Extiende hasta estirar los brazos'],
        ['Codos apuntando al techo, cerca de la cabeza', 'Abdomen firme: no arquees la espalda'],
        ['Estira bien el tríceps abajo', 'Peso moderado'],
      ],
      orbit: ['Baja detrás de la cabeza', 'Posición baja: músculos que trabajan', 'Extiende los codos'],
    },
  },
  'TS-TRI-005': {
    ...TRI, primary: ['Tríceps'], secondary: ['Pectoral', 'Deltoides anterior'], name: 'Fondos en banco (bench dips)', level: 'Principiante',
    phaseNames: { BAJADA: 'BAJADA', SUBIDA: 'EXTENSIÓN', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'POSICIÓN BAJA',
    frame: { dist: 4.6, ty: 0.65, tz: 0.15, distLow: 4.3, tyLow: 0.60 }, views: { f34: { az: -50, el: 10 }, side: { az: -90, el: 4 }, front: { az: -25, el: 10 }, back34: { az: -150, el: 14 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.60, -0.14], rot: [-4, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0.72, -10, 8], R: [-0.12, 0.08, 0.72, -10, -8], kL: [0, 1, 0.3], kR: [0, 1, 0.3], hL: [0.20, 0.48, -0.30], hR: [-0.20, 0.48, -0.30], eL: [0.2, 0, -1], eR: [-0.2, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.34, -0.12], rot: [4, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0.72, -10, 8], R: [-0.12, 0.08, 0.72, -10, -8], kL: [0, 1, 0.3], kR: [0, 1, 0.3], hL: [0.20, 0.48, -0.30], hR: [-0.20, 0.48, -0.30], eL: [0.2, 0.2, -1], eR: [-0.2, 0.2, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'box', h: 0.45, w: 0.70, d: 0.40, z: -0.45 }] },
    captions: {
      intro: 'Manos en el borde de un banco detrás de ti y piernas estiradas delante',
      reps: [
        ['Baja flexionando los codos hasta unos 90°', 'Empuja hasta estirar los brazos'],
        ['La espalda baja cerca del banco', 'Codos hacia atrás, no hacia los lados'],
        ['Rodillas flexionadas = más fácil', 'Si molesta el hombro, reduce el rango'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Empuja arriba'],
    },
  },
  'TS-TRI-006': {
    ...TRI, name: 'Patada de tríceps con mancuerna (kickback)', level: 'Principiante',
    phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'CODO A 90°' },
    frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', keys: two(90, 4, { mode: 'ham', f: -40, abd: 6, base: HINGE, tilt: 50 }) } },
    captions: {
      intro: 'Tronco inclinado, brazos pegados al cuerpo y codos a 90°',
      reps: [
        ['Extiende los codos llevando las mancuernas atrás', 'Vuelve a 90° en 2 s'],
        ['El brazo queda quieto y paralelo al tronco', 'Espalda neutra'],
        ['Aprieta el tríceps 1 s con el codo estirado', 'Peso ligero'],
      ],
      orbit: ['Codos estirados', 'Extensión completa: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-TRI-007': {
    ...TRI, ...CURL_FR, name: 'Extensión de codo a una mano en polea', level: 'Intermedio', frame: { dist: 4.8, ty: 1.20, tz: 0.15, distLow: 4.5, tyLow: 1.15 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, handles: ['L'], bands: [{ anchor: [0.10, 2.10, 0.36], hand: 'L' }],
      keys: [armKey(0, 100, { mode: 'ham', f: 0, abd: 4, sides: ['L'], base: { ...STAND, rot: [6, 0, 0] }, extra: { hR: [-0.25, 0.95, 0.20], eR: [-1, -0.3, -0.3], pR: [1, 0, 0, 0, 0, 1] } }),
        armKey(1, 6, { mode: 'ham', f: 0, abd: 4, sides: ['L'], base: { ...STAND, rot: [6, 0, 0] }, extra: { hR: [-0.25, 0.95, 0.20], eR: [-1, -0.3, -0.3], pR: [1, 0, 0, 0, 0, 1] } })] },
      items: [{ kind: 'post', h: 2.18, x: 0.10, z: 0.40 }] },
    captions: {
      intro: 'De pie frente a la polea alta con un asa en una mano',
      reps: [
        ['Empuja el asa hacia abajo hasta estirar el codo', 'Sube en 2 s hasta 90°'],
        ['El codo queda pegado al costado', 'Corrige diferencias entre brazos'],
        ['Aprieta abajo 1 s', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Codo estirado', 'Extensión completa: músculos que trabajan', 'Sube controlando'],
    },
  },
});
