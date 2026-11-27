// Lote 46: rotación CO-ROT-007 … 011 y flexión CO-FLE-001 … 005
import { EXERCISES } from './exercises.js';
import { STAND_FR } from './ex_lote42.js';
import { HANG_FR, hangKeys } from './ex_lote22.js';
import { ROT } from './ex_lote45.js';

export const FLE = { family: 'free', sub: 'Flexión de tronco', primary: ['Recto abdominal'], secondary: ['Oblicuos'], labelAll: true,
  phaseNames: { BAJADA: 'CONTRACCIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'CONTRACCIÓN MÁXIMA' };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.17, 0.08, 0, 0, 8], R: [-0.17, 0.08, 0, 0, -8] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const CABLE = 0xb9bec4;
const twoT = (side, y, r = 0.48, z0 = 0.05) => {
  const a = side * 45 * Math.PI / 180, x = r * Math.sin(a), z = z0 + r * Math.cos(a), c = Math.cos(a), s = Math.sin(a);
  return { sp: [0, side * 24, 0], nk: [0, side * 18], hL: [x + 0.04 * c, y, z - 0.04 * s], hR: [x - 0.04 * c, y, z + 0.04 * s], eL: [0.6, -1, 0], eR: [-0.6, -1, 0], pL: [-c, 0, s, s, 0, c], pR: [c, 0, -s, s, 0, c] };
};
const PIV = (side) => ({ L: [0.17, 0.08, 0, 0, 8 + (side > 0 ? 0 : -30)], R: [-0.17, 0.08, 0, 0, -8 + (side < 0 ? 0 : 30)] });
const ballT = (side, y, r) => { const t = twoT(side, y, r), c = t.hL.map((v, i) => (v + t.hR[i]) / 2); return { ...t, hL: [t.hL[0], t.hL[1], t.hL[2]], bp: [c[0], c[1] + 0.02, c[2] + 0.08] }; };
// tumbado boca arriba, cabeza hacia -z, rodillas flexionadas y pies apoyados
const SUP = { P: [0, 0.115, 0.05], rot: [-90, 0, 0], L: [0.13, 0.08, 0.50, 0, 6], R: [-0.13, 0.08, 0.50, 0, -6], kL: [0.15, 1, 0.2], kR: [-0.15, 1, 0.2] };
const HEAD = { aL: [150, 40, 130], aR: [150, 40, 130], pL: [0, 0, -1, -1, 0, 0], pR: [0, 0, -1, 1, 0, 0] };
const SUP_FR = { frame: { dist: 3.8, ty: 0.30, tz: 0.0, distLow: 3.5, tyLow: 0.30 },
  views: { f34: { az: 55, el: 20 }, side: { az: 90, el: 8 }, front: { az: 25, el: 26 }, back34: { az: 140, el: 26 } }, orbit: { view: 'side', sweep: 140 } };

Object.assign(EXERCISES, {
  'CO-ROT-007': {
    ...ROT, secondary: ['Recto abdominal', 'Transverso abdominal'], name: 'Rotación de tronco sentado en banco', level: 'Avanzado', tempo: { down: 1.5, pause: 0.3, up: 1.5 },
    phaseNames: { BAJADA: 'GIRO A UN LADO', SUBIDA: 'GIRO AL OTRO', ARRIBA: 'AL CENTRO' }, holdLabel: 'GIRO MÁXIMO',
    frame: { dist: 4.0, ty: 0.85, tz: 0.15, distLow: 3.7, tyLow: 0.82 }, views: { f34: { az: -30, el: 16 }, side: { az: -90, el: 8 }, front: { az: -5, el: 16 }, back34: { az: -150, el: 20 } }, orbit: { view: 'front', sweep: 140 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', ball: { r: 0.11 }, ballAt: 'K:bp',
      keys: (() => {
        const B = { P: [0, 0.545, -0.02], rot: [0, 0, 0], L: [0.15, 0.08, 0.44, 0, 8], R: [-0.15, 0.08, 0.44, 0, -8], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
        return [{ u: 0, ...B, ...ballT(1, 1.00, 0.44) }, { u: 1, ...B, ...ballT(-1, 1.00, 0.44) }];
      })() },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado en el banco, pies apoyados y balón al frente con los brazos estirados',
      reps: [
        ['Gira el tronco llevando el balón hacia un lado', 'Gira al otro lado pasando por el centro'],
        ['La cadera queda quieta sobre el banco', 'Espalda recta y pecho alto'],
        ['El giro sale del tronco', 'Ritmo controlado'],
      ],
      orbit: ['Giro máximo', 'Rotación: músculos que trabajan', 'Sigue girando'],
    },
  },
  'CO-ROT-008': {
    ...ROT, ...STAND_FR, secondary: ['Deltoides', 'Glúteos', 'Cuádriceps'], name: 'Golpe de leñador ascendente (low-to-high woodchopper)', level: 'Avanzado', tempo: { down: 1.5, pause: 0.3, up: 1.2 },
    phaseNames: { BAJADA: 'BAJA A LA RODILLA', SUBIDA: 'SUBE EN DIAGONAL', ARRIBA: 'BALÓN ARRIBA' }, holdLabel: 'CARGA ABAJO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', ball: { r: 0.11 }, ballAt: 'K:bp',
      keys: [{ u: 0, ...STAND, ...PIV(1), ...ballT(0.8, 1.78, 0.42) }, { u: 1, ...STAND, P: [0, -0.16, -0.06], rot: [22, 0, 0], ...PIV(-1), ...ballT(-0.9, 0.58, 0.40) }] } },
    captions: {
      intro: 'De pie, piernas separadas y balón medicinal en las manos',
      reps: [
        ['Baja el balón hacia la rodilla de un lado flexionando las piernas', 'Súbelo en diagonal por encima del hombro contrario'],
        ['Gira el tronco y pivota el pie de atrás', 'Empuja con las piernas al subir'],
        ['Brazos casi estirados', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Balón arriba', 'Rotación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-ROT-009': {
    ...ROT, ...STAND_FR, primary: ['Oblicuos', 'Glúteos'], secondary: ['Aductores', 'Transverso abdominal'], name: 'Rotación de cadera con banda en polea', level: 'Avanzado', tempo: { down: 1.5, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'GIRA LA CADERA', SUBIDA: 'VUELVE', ARRIBA: 'CADERA AL FRENTE' }, holdLabel: 'GIRO MÁXIMO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', bands: [{ anchor: [-1.00, 0.95, 0.10], to: 'beltR' }],
      keys: (() => {
        const A = { aL: [60, -20, 120], aR: [60, -20, 120], pL: [0, 0, -1, -1, 0, 0], pR: [0, 0, -1, 1, 0, 0] };
        return [{ u: 0, ...STAND, ...A, ...PIV(-1), rot: [2, -16, 0], sp: [0, 16, 0] }, { u: 1, ...STAND, ...A, ...PIV(1), rot: [2, 24, 0], sp: [0, -22, 0] }];
      })() },
      items: [{ kind: 'post', h: 1.00, x: -1.02, z: 0.10 }] },
    captions: {
      intro: 'De pie de lado al anclaje, banda alrededor de la cadera y brazos cruzados',
      reps: [
        ['Gira la cadera alejándola del anclaje', 'Vuelve despacio resistiendo la banda'],
        ['Los hombros miran al frente: gira la pelvis', 'Pivota sobre los pies'],
        ['Abdomen firme y rodillas suaves', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Cadera girada', 'Rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ROT-010': {
    ...like('CO-ROT-003', {}), name: 'Lanzamiento lateral de balón medicinal contra pared', level: 'Avanzado',
    views: { f34: { az: -20, el: 16 }, side: { az: -90, el: 8 }, front: { az: -5, el: 14 }, back34: { az: -160, el: 20 } },
    cfg: { ...EXERCISES['CO-ROT-003'].cfg, items: [{ kind: 'wall', x: 1.55, ry: -Math.PI / 2, w: 1.6, h: 2.2 }] },
    captions: {
      intro: 'De pie de lado a la pared, a un metro y medio, con el balón a la altura de la cadera',
      reps: [
        ['Carga girando hacia atrás y lanza el balón contra la pared', 'Recíbelo y encadena el siguiente lanzamiento'],
        ['La potencia sale de la cadera y el tronco', 'Pivota el pie de atrás'],
        ['Lanzamientos rápidos y controlados', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Carga', 'Rotación: músculos que trabajan', 'Lanza explosivo'],
    },
  },
  'CO-ROT-011': {
    ...like('CO-ROT-005', {}), name: 'Rotación de tronco en polea', level: 'Intermedio',
    cfg: { ...EXERCISES['CO-ROT-005'].cfg, free: { ...EXERCISES['CO-ROT-005'].cfg.free, bands: undefined, handles: ['R'], cable: true,
      rods: [{ from: [-1.00, 1.25, 0.10], to: 'hR', r: 0.006, color: CABLE }] } },
    captions: {
      intro: 'De pie de lado a la polea, agarre a la altura del pecho con los brazos estirados',
      reps: [
        ['Gira el tronco alejando el agarre de la polea', 'Vuelve en 2 s resistiendo el cable'],
        ['Los brazos siguen al pecho', 'Pivota el pie de atrás'],
        ['Peso moderado y sin tirones', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Giro máximo', 'Rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-FLE-001': {
    ...FLE, ...SUP_FR, name: 'Encogimiento abdominal (crunch)', level: 'Principiante', tempo: { down: 1.2, pause: 1, up: 1.5 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [{ u: 0, ...SUP, sp: [0, 0, 0], nk: [4, 0], ...HEAD }, { u: 1, ...SUP, sp: [34, 0, 0], nk: [14, 0], ...HEAD }] },
      items: [{ kind: 'mat', z: 0.0, l: 1.8 }] },
    captions: {
      intro: 'Boca arriba, rodillas flexionadas, pies apoyados y manos junto a la cabeza',
      reps: [
        ['Despega los hombros del suelo enrollando el tronco', 'Baja despacio sin apoyar del todo la cabeza'],
        ['No tires del cuello con las manos', 'La zona lumbar queda apoyada'],
        ['Exhala al subir', 'Recorrido corto y controlado'],
      ],
      orbit: ['Hombros arriba', 'Contracción: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-FLE-002': {
    ...FLE, ...HANG_FR, secondary: ['Flexores de cadera', 'Oblicuos', 'Antebrazo'], name: 'Elevación de piernas colgado (hanging leg raise)', level: 'Principiante', tempo: { down: 1.5, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'SUBE LAS PIERNAS', SUBIDA: 'BAJA', ARRIBA: 'COLGADO' }, holdLabel: 'PIERNAS ARRIBA',
    cfg: { free: { type: 'kfPose', hold: 'grip',
      keys: (() => { const h = hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] })[0];
        return [{ ...h, u: 0, lL: [4, 4, 20, 0], lR: [4, 4, 20, 0] }, { ...h, u: 1, P: [h.P[0], h.P[1] + 0.04, h.P[2] - 0.08], rot: [-16, 0, 0], sp: [14, 0, 0], lL: [100, 6, 20, 0], lR: [100, 6, 20, 0] }]; })() },
      items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de la barra con los brazos estirados',
      reps: [
        ['Sube las piernas estiradas hasta la horizontal', 'Bájalas en 2 s sin balancearte'],
        ['Enrolla la pelvis al final de la subida', 'Hombros activos, sin hundirte'],
        ['Si cuesta, flexiona un poco las rodillas', 'Exhala al subir'],
      ],
      orbit: ['Piernas arriba', 'Contracción: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-FLE-004': {
    ...FLE, secondary: ['Oblicuos', 'Dorsal ancho'], name: 'Abdominales en polea alta (cable crunch)', level: 'Intermedio', tempo: { down: 1.5, pause: 1, up: 2 },
    frame: { dist: 4.4, ty: 0.85, tz: 0.30, distLow: 4.1, tyLow: 0.80 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 14 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', cable: true, rods: [{ from: [0, 2.15, 0.70], to: 'hL', r: 0.006, color: CABLE }, { from: [0, 2.15, 0.70], to: 'hR', r: 0.006, color: CABLE }],
      keys: [
        { u: 0, P: [0, 0.56, -0.10], rot: [14, 0, 0], sp: [0, 0, 0], nk: [-4, 0], lL: [10, 95, 40, 0], lR: [10, 95, 40, 0], hL: [0.07, 1.34, 0.18], hR: [-0.07, 1.34, 0.18], eL: [0.4, -1, 0.3], eR: [-0.4, -1, 0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, P: [0, 0.54, -0.08], rot: [34, 0, 0], sp: [46, 0, 0], nk: [20, 0], lL: [32, 95, 40, 0], lR: [32, 95, 40, 0], hL: [0.07, 0.86, 0.56], hR: [-0.07, 0.86, 0.56], eL: [0.4, -1, 0.3], eR: [-0.4, -1, 0.3], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'mat', z: -0.10, l: 1.2 }, { kind: 'post', h: 2.20, z: 0.72 }] },
    captions: {
      intro: 'De rodillas frente a la polea alta, cuerda sujeta junto a la cabeza',
      reps: [
        ['Enrolla el tronco llevando los codos hacia los muslos', 'Vuelve arriba en 2 s'],
        ['La cadera queda quieta: flexiona la columna', 'Las manos no se separan de la cabeza'],
        ['Exhala al bajar', 'Peso moderado'],
      ],
      orbit: ['Codos abajo', 'Contracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-FLE-005': {
    ...FLE, ...SUP_FR, name: 'Encogimiento abdominal con disco', level: 'Intermedio', tempo: { down: 1.2, pause: 1, up: 1.5 },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', hold: 'plate',
      keys: [
        { u: 0, ...SUP, sp: [0, 0, 0], nk: [4, 0], hL: [0.10, 0.68, -0.42], hR: [-0.10, 0.68, -0.42], eL: [0.6, 0, 0], eR: [-0.6, 0, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0], pn: [0, 0, 1] },
        { u: 1, ...SUP, sp: [34, 0, 0], nk: [14, 0], hL: [0.10, 0.88, -0.24], hR: [-0.10, 0.88, -0.24], eL: [0.6, 0, 0], eR: [-0.6, 0, 0], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0], pn: [0, 0.3, 1] }] },
      items: [{ kind: 'mat', z: 0.0, l: 1.8 }] },
    captions: {
      intro: 'Boca arriba, rodillas flexionadas y un disco sujeto con los brazos estirados hacia el techo',
      reps: [
        ['Despega los hombros llevando el disco hacia el techo', 'Baja despacio'],
        ['Los brazos siguen estirados', 'La zona lumbar queda apoyada'],
        ['Exhala al subir', 'Disco ligero al principio'],
      ],
      orbit: ['Hombros arriba', 'Contracción: músculos que trabajan', 'Baja controlando'],
    },
  },
});

Object.assign(EXERCISES, {
  'CO-FLE-003': {
    ...like('CO-FLE-002', {}), name: 'Elevación de rodillas colgado (hanging knee raise)', level: 'Principiante',
    cfg: { ...EXERCISES['CO-FLE-002'].cfg, free: { ...EXERCISES['CO-FLE-002'].cfg.free,
      keys: EXERCISES['CO-FLE-002'].cfg.free.keys.map((k, i) => (i ? { ...k, lL: [108, 110, 20, 0], lR: [108, 110, 20, 0] } : k)) } },
    phaseNames: { BAJADA: 'SUBE LAS RODILLAS', SUBIDA: 'BAJA', ARRIBA: 'COLGADO' }, holdLabel: 'RODILLAS ARRIBA',
    captions: {
      intro: 'Colgado de la barra con los brazos estirados',
      reps: [
        ['Sube las rodillas hacia el pecho', 'Bájalas en 2 s sin balancearte'],
        ['Enrolla la pelvis al final de la subida', 'Hombros activos'],
        ['Controla la bajada', 'Exhala al subir'],
      ],
      orbit: ['Rodillas arriba', 'Contracción: músculos que trabajan', 'Baja controlando'],
    },
  },
});
