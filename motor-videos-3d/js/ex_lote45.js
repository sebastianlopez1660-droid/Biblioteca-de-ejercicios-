// Lote 45: anti-inclinación CO-AIN-007 … 010 y rotación CO-ROT-001 … 006
import { EXERCISES } from './exercises.js';
import { STAND_FR } from './ex_lote42.js';
import { AIN, SIDE_FR, sidePlankFA } from './ex_lote44.js';

export const ROT = { family: 'free', sub: 'Rotación', primary: ['Oblicuos'], secondary: ['Recto abdominal', 'Transverso abdominal'], labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.17, 0.08, 0, 0, 8], R: [-0.17, 0.08, 0, 0, -8] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const CABLE = 0xb9bec4;
const MAT_X = { kind: 'mat', z: 0.05, x: 0.1, l: 1.9, ry: Math.PI / 2 };
// plancha lateral con el brazo estirado (mano derecha en el suelo)
function sidePlankHi(th = 30, xf = 0.78) {
  const t = th * Math.PI / 180, ax = [-Math.cos(t), Math.sin(t)], lx = [Math.sin(t), Math.cos(t)];
  const P = [xf + 0.87 * ax[0], 0.10 + 0.87 * ax[1], 0];
  const S = [xf + 1.35 * ax[0] - 0.19 * lx[0], 0.10 + 1.35 * ax[1] - 0.19 * lx[1]];
  return { P, rot: [0, 0, 90 - th], nk: [0, 0], L: [xf - 0.01, 0.17, 0.0, 0, 0], R: [xf, 0.08, 0.0, 0, 0], kL: [0, 1, 0.2], kR: [0, 1, 0.2], hR: [S[0], 0.035, 0.02], eR: [1, 0, 0], pR: [0, -1, 0, -1, 0, 0], S };
}
// sentado en el suelo con el tronco inclinado atrás (giro ruso); x > 0 = giro hacia la izquierda
const RUS = (u, side, feetUp) => {
  const a = side * 32 * Math.PI / 180, bx = 0.30 * Math.sin(a), bz = 0.06 + 0.24 * Math.cos(a);
  const legs = feetUp ? { lL: [96, 70, 20, 4], lR: [96, 70, 20, 4] } : { L: [0.13, 0.08, 0.52, 0, 8], R: [-0.13, 0.08, 0.52, 0, -8], kL: [0.2, 1, 0.3], kR: [-0.2, 1, 0.3] };
  const c = Math.cos(a), s = Math.sin(a);
  return { u, P: [0, 0.13, -0.10], rot: [-36, 0, 0], sp: [6, side * 26, 0], nk: [12, side * 14], ...legs, bp: [bx, 0.36, bz],
    hL: [bx + 0.10 * c, 0.37, bz - 0.10 * s], hR: [bx - 0.10 * c, 0.37, bz + 0.10 * s], eL: [0.6, -1, -0.3], eR: [-0.6, -1, -0.3],
    pL: [-c, 0, s, 0, 1, 0], pR: [c, 0, -s, 0, 1, 0] };
};
const SEAT_FR = { frame: { dist: 3.8, ty: 0.40, tz: 0.10, distLow: 3.5, tyLow: 0.38 },
  views: { f34: { az: -35, el: 20 }, side: { az: -90, el: 8 }, front: { az: -10, el: 24 }, back34: { az: -150, el: 26 } }, orbit: { view: 'front', sweep: 140 } };
// manos juntas con giro de tronco (y = altura, side = -1 derecha … +1 izquierda)
const twoT = (side, y, r = 0.48, z0 = 0.05) => {
  const a = side * 45 * Math.PI / 180, x = r * Math.sin(a), z = z0 + r * Math.cos(a), c = Math.cos(a), s = Math.sin(a);
  return { sp: [0, side * 24, 0], nk: [0, side * 18], hL: [x + 0.04 * c, y, z - 0.04 * s], hR: [x - 0.04 * c, y, z + 0.04 * s], eL: [0.6, -1, 0], eR: [-0.6, -1, 0], pL: [-c, 0, s, s, 0, c], pR: [c, 0, -s, s, 0, c] };
};
const PIV = (side) => ({ L: [0.17, 0.08, 0, side < 0 ? 0 : 0, 8 + (side > 0 ? 0 : -30)], R: [-0.17, 0.08, 0, 0, -8 + (side < 0 ? 0 : 30)] });

Object.assign(EXERCISES, {
  'CO-AIN-007': {
    ...AIN, ...SIDE_FR, secondary: ['Serrato anterior', 'Transverso abdominal', 'Glúteo medio'], name: 'Plancha lateral con alcance por debajo del cuerpo', level: 'Avanzado',
    frame: { dist: 4.2, ty: 0.50, tz: 0.05, distLow: 3.9, tyLow: 0.48 },
    tempo: { down: 2, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'ALCANCE ABAJO', SUBIDA: 'ABRE', ARRIBA: 'BRAZO AL TECHO' }, holdLabel: 'MANO BAJO EL CUERPO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: (() => {
        const { S, ...b } = sidePlankHi(30);
        return [{ u: 0, ...b, hL: [S[0] + 0.10, S[1] + 0.95, 0.06], eL: [0, 0, -1], pL: [0, 0, 1, 0, 1, 0] },
          { u: 1, ...b, rot: [-14, 0, 60], sp: [0, 24, 0], nk: [0, 16], hL: [S[0] + 0.16, 0.20, -0.32], eL: [0, 1, 0], pL: [0, -1, 0, 0, 0, -1] }];
      })() },
      items: [MAT_X] },
    captions: {
      intro: 'Plancha lateral con el brazo de apoyo estirado y el otro hacia el techo',
      reps: [
        ['Lleva la mano por debajo del cuerpo lo más lejos posible', 'Vuelve a abrir hacia el techo'],
        ['La cadera queda alta durante el alcance', 'El hombro de apoyo empuja el suelo'],
        ['Movimiento lento', 'Cambia de lado al terminar'],
      ],
      orbit: ['Mano debajo', 'Rotación: músculos que trabajan', 'Cadera alta'],
    },
  },
  'CO-AIN-008': {
    ...AIN, ...SIDE_FR, name: 'Elevación de cadera en plancha lateral (hip lift)', level: 'Avanzado',
    tempo: { down: 1.5, pause: 0.5, up: 1.5 }, phaseNames: { BAJADA: 'BAJA LA CADERA', SUBIDA: 'SUBE', ARRIBA: 'PLANCHA LATERAL' }, holdLabel: 'CADERA CERCA DEL SUELO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, ...sidePlankFA(17), aL: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0] }, { u: 1, ...sidePlankFA(6, { thArm: 17 }), sp: [0, 0, -30], aL: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0] }] },
      items: [MAT_X] },
    captions: {
      intro: 'Plancha lateral sobre el antebrazo con el cuerpo recto',
      reps: [
        ['Baja la cadera hasta casi tocar el suelo', 'Súbela por encima de la línea del cuerpo'],
        ['El movimiento sale del costado, no de los hombros', 'Codo bajo el hombro'],
        ['Ritmo controlado', 'Cambia de lado al terminar'],
      ],
      orbit: ['Cadera arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-AIN-009': {
    ...AIN, ...SIDE_FR, primary: ['Oblicuos', 'Glúteo medio'], secondary: ['Cuadrado lumbar', 'Aductores'], name: 'Plancha lateral con banda de resistencia', level: 'Avanzado',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'ABRE LA PIERNA', SUBIDA: 'CIERRA', ARRIBA: 'PLANCHA LATERAL' }, holdLabel: 'BANDA TENSA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', bands: [{ anchor: 'kL', to: 'kR' }],
      keys: [{ u: 0, ...sidePlankFA(17), aL: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0], lL: [0, 2, 10, -6] }, { u: 1, ...sidePlankFA(17), aL: [4, 6, 30], pL: [-1, 0, 0, 0, -1, 0], lL: [0, 2, 10, 24] }] },
      items: [MAT_X] },
    captions: {
      intro: 'Plancha lateral sobre el antebrazo con una mini banda por encima de las rodillas',
      reps: [
        ['Abre la pierna de arriba contra la banda', 'Ciérrala despacio'],
        ['La cadera de abajo sigue alta', 'Cuerpo en línea sin rotar'],
        ['Mantén 1 s con la pierna arriba', 'Cambia de lado al terminar'],
      ],
      orbit: ['Pierna arriba', 'Plancha lateral: músculos que trabajan', 'Cadera alta'],
    },
  },
  'CO-AIN-010': {
    ...like('TI-SEN-001', {}), sub: 'Anti-inclinación', primary: ['Oblicuos', 'Cuádriceps', 'Glúteos'], secondary: ['Cuadrado lumbar', 'Isquiotibiales'],
    name: 'Sentadilla con carga unilateral descentrada (offset squat)', level: 'Avanzado',
    cfg: { ...EXERCISES['TI-SEN-001'].cfg, arms: 'hang', hold: 'db1', loadSide: 'R', gripX: 0.24, hipBottom: 0.47, leanBot: 38 },
    captions: {
      intro: 'De pie con una mancuerna o kettlebell en una sola mano',
      reps: [
        ['Baja en sentadilla sin inclinarte hacia la carga', 'Sube empujando el suelo'],
        ['Hombros nivelados todo el recorrido', 'El costado contrario trabaja para mantenerte recto'],
        ['Rodillas en la línea de los pies', 'Cambia de mano en la siguiente serie'],
      ],
      orbit: ['Baja recto', 'Posición baja: músculos que trabajan', 'Sube sin inclinarte'],
    },
  },
  'CO-ROT-001': {
    ...ROT, ...SEAT_FR, secondary: ['Recto abdominal', 'Flexores de cadera'], name: 'Giro ruso (Russian twist)', level: 'Principiante', tempo: { down: 1.2, pause: 0.3, up: 1.2 },
    phaseNames: { BAJADA: 'GIRO A UN LADO', SUBIDA: 'GIRO AL OTRO', ARRIBA: 'AL CENTRO' }, holdLabel: 'GIRO MÁXIMO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', ball: { r: 0.11 }, ballAt: 'K:bp', keys: [RUS(0, 1, false), RUS(1, -1, false)] }, items: [{ kind: 'mat', z: 0.10, l: 1.4 }] },
    captions: {
      intro: 'Sentado con el tronco inclinado atrás, pies apoyados y balón al frente',
      reps: [
        ['Gira el tronco llevando el balón junto a la cadera', 'Gira al otro lado'],
        ['El giro sale del tronco, no solo de los brazos', 'Espalda recta, sin encorvarte'],
        ['Rodillas quietas', 'Exhala en cada giro'],
      ],
      orbit: ['Giro máximo', 'Rotación: músculos que trabajan', 'Sigue girando'],
    },
  },
  'CO-ROT-002': {
    ...like('CO-ARO-007', {}), ...ROT, secondary: ['Recto abdominal', 'Dorsal ancho', 'Glúteos'], name: 'Golpe de leñador con polea (cable woodchopper)', level: 'Principiante',
    phaseNames: { BAJADA: 'CORTE DIAGONAL', SUBIDA: 'VUELVE ARRIBA', ARRIBA: 'MANOS ARRIBA' }, holdLabel: 'GIRO COMPLETO',
    cfg: { ...EXERCISES['CO-ARO-007'].cfg, free: { ...EXERCISES['CO-ARO-007'].cfg.free,
      keys: [{ u: 0, ...STAND, ...PIV(-1), ...twoT(-1, 1.66, 0.50) }, { u: 1, ...STAND, P: [0, -0.06, -0.01], ...PIV(1), ...twoT(1, 0.92, 0.46) }] } },
    captions: {
      intro: 'De pie de lado a la polea alta, manos juntas en el agarre',
      reps: [
        ['Tira en diagonal hacia la cadera contraria girando el tronco', 'Vuelve arriba en 2 s'],
        ['Pivota el pie de atrás al girar', 'Brazos casi estirados'],
        ['La fuerza sale del tronco y la cadera', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Giro completo', 'Rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ROT-003': {
    ...ROT, ...STAND_FR, secondary: ['Glúteos', 'Deltoides', 'Recto abdominal'], name: 'Lanzamiento rotacional de balón medicinal', level: 'Principiante',
    tempo: { down: 1.5, pause: 0.2, up: 0.6 }, phaseNames: { BAJADA: 'CARGA', SUBIDA: 'LANZA', ARRIBA: 'LANZAMIENTO' }, holdLabel: 'CARGA',
    views: { f34: { az: -30, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 12 }, back34: { az: -150, el: 18 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', ball: { r: 0.11 }, ballAt: 'K:bp',
      keys: (() => {
        const T = (side, y, r, P) => { const t = twoT(side, y, r); const c = t.hL.map((v, i) => (v + t.hR[i]) / 2); return { ...STAND, P, ...PIV(side), ...t, bp: [c[0], c[1] + 0.02, c[2] + 0.07] }; };
        return [{ u: 0, ...T(0.7, 1.14, 0.56, [0, -0.02, -0.01]) }, { u: 1, ...T(-1, 0.94, 0.36, [0, -0.07, -0.01]) }];
      })() } },
    captions: {
      intro: 'De pie de lado a la pared con un balón medicinal a la altura de la cadera',
      reps: [
        ['Carga girando el tronco hacia atrás', 'Lanza con un giro explosivo de cadera y tronco'],
        ['Pivota el pie de atrás al lanzar', 'Brazos casi estirados'],
        ['Recoge el balón y repite', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Carga', 'Rotación: músculos que trabajan', 'Lanza explosivo'],
    },
  },
  'CO-ROT-004': {
    ...ROT, ...STAND_FR, secondary: ['Deltoides', 'Glúteos', 'Transverso abdominal'], name: 'Giro con barra en landmine (barbell landmine rotation)', level: 'Intermedio', tempo: { down: 2, pause: 0.3, up: 2 },
    phaseNames: { BAJADA: 'ARCO A UN LADO', SUBIDA: 'ARCO AL OTRO', ARRIBA: 'BARRA ARRIBA' }, holdLabel: 'BARRA A LA CADERA',
    views: { f34: { az: -50, el: 16 }, side: { az: -90, el: 8 }, front: { az: -20, el: 18 }, back34: { az: -150, el: 22 } },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', relY: 'L', rods: [{ from: [0, 0.05, 1.75], to: 'hL', ext: 0.10, r: 0.016, color: 0x9aa0a6 }],
      keys: (() => {
        const B = (u, x, y, z, side) => { const a = Math.atan2(x, 1.75 - z), c = Math.cos(a), s = Math.sin(a);
          return { u, ...STAND, ...PIV(side), sp: [0, side * 22, 0], nk: [0, side * 12], hL: [x + 0.03 * c, y + 0.03, z], hR: [x - 0.03 * c, y - 0.03, z - 0.02], eL: [0.6, -1, 0], eR: [-0.6, -1, 0], pL: [-c, 0, s, s * 0.6, 0.4, c * 0.6], pR: [c, 0, -s, s * 0.6, 0.4, c * 0.6] }; };
        return [B(0, 0.36, 1.02, 0.34, 1), B(0.5, 0.0, 1.50, 0.42, 0), B(1, -0.36, 1.02, 0.34, -1)];
      })() },
      items: [{ kind: 'post', h: 0.08, z: 1.75 }] },
    captions: {
      intro: 'De pie frente al landmine sujetando el extremo de la barra con los brazos estirados',
      reps: [
        ['Lleva la barra en arco hasta la cadera de un lado', 'Pasa por arriba hasta el otro lado'],
        ['Gira el tronco y pivota los pies', 'Brazos estirados todo el tiempo'],
        ['Controla la barra al bajar', 'Abdomen firme'],
      ],
      orbit: ['Barra a la cadera', 'Rotación: músculos que trabajan', 'Arco controlado'],
    },
  },
  'CO-ROT-005': {
    ...ROT, ...STAND_FR, secondary: ['Transverso abdominal', 'Glúteos'], name: 'Giro de torso con banda de pie', level: 'Intermedio', tempo: { down: 1.5, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'GIRO', SUBIDA: 'VUELVE', ARRIBA: 'HACIA EL ANCLAJE' }, holdLabel: 'GIRO MÁXIMO',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [-1.00, 1.25, 0.10], hand: 'R' }],
      keys: [{ u: 0, ...STAND, ...PIV(-1), ...twoT(-1, 1.26, 0.50) }, { u: 1, ...STAND, ...PIV(1), ...twoT(1, 1.26, 0.50) }] },
      items: [{ kind: 'post', h: 1.30, x: -1.02, z: 0.10 }] },
    captions: {
      intro: 'De pie de lado al anclaje, brazos estirados al frente sujetando la banda',
      reps: [
        ['Gira el tronco alejando las manos del anclaje', 'Vuelve despacio resistiendo la banda'],
        ['Los brazos siguen al pecho: no se mueven solos', 'Pivota el pie de atrás'],
        ['Abdomen firme', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Giro máximo', 'Rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ROT-006': {
    ...ROT, ...SEAT_FR, secondary: ['Recto abdominal', 'Flexores de cadera'], name: 'Giro ruso con balón medicinal', level: 'Intermedio', tempo: { down: 1.2, pause: 0.3, up: 1.2 },
    phaseNames: { BAJADA: 'GIRO A UN LADO', SUBIDA: 'GIRO AL OTRO', ARRIBA: 'AL CENTRO' }, holdLabel: 'GIRO MÁXIMO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', ball: { r: 0.12 }, ballAt: 'K:bp', keys: [RUS(0, 1, true), RUS(1, -1, true)] }, items: [{ kind: 'mat', z: 0.10, l: 1.4 }] },
    captions: {
      intro: 'Sentado con el tronco inclinado atrás, pies despegados del suelo y balón al frente',
      reps: [
        ['Gira y toca el suelo con el balón junto a la cadera', 'Gira al otro lado'],
        ['Pies en el aire y piernas quietas', 'Espalda recta, sin encorvarte'],
        ['Ritmo controlado', 'Regresión: apoya los talones'],
      ],
      orbit: ['Giro máximo', 'Rotación: músculos que trabajan', 'Sigue girando'],
    },
  },
});
