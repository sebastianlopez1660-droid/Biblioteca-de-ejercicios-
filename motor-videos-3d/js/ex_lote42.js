// Lote 42: core anti-extensión CO-AEX-007 … 010 y anti-rotación CO-ARO-001 … 006
import { EXERCISES } from './exercises.js';
import { plankKey, handsFloor, shoulderZ } from './ts_common.js';
import { CORE_FR, AEX, forearmPlank } from './ex_lote41.js';

export const ARO = { family: 'free', sub: 'Anti-rotación', primary: ['Oblicuos', 'Transverso abdominal'], secondary: ['Recto abdominal', 'Glúteo medio'], labelAll: true };
const ISO = { iso: true, tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.15, 0.08, 0, 0, 8], R: [-0.15, 0.08, 0, 0, -8] };
export const STAND_FR = { frame: { dist: 4.4, ty: 1.00, tz: 0.15, distLow: 4.1, tyLow: 0.95 },
  views: { f34: { az: -35, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 12 }, back34: { az: -150, el: 18 } }, orbit: { view: 'front', sweep: 140 } };
const FP = forearmPlank();
const HF = handsFloor(21);
const FW = (w) => ({ L: [w, ...plankKey(21).L.slice(1)], R: [-w, ...plankKey(21).R.slice(1)] });
const PK = { ...plankKey(21), ...FW(0.20) };
const [SY, SZ] = shoulderZ(21);
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
// press Pallof: manos juntas en el esternón y cable desde la derecha (x negativo)
const PAL = (u, out, extra = {}) => ({ u, hL: [0.03, 1.22 + (extra.dy ?? 0), 0.20 + out], hR: [-0.03, 1.22 + (extra.dy ?? 0), 0.20 + out], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] });
const CABLE = 0xb9bec4;

Object.assign(EXERCISES, {
  'CO-AEX-007': {
    ...AEX, ...CORE_FR, ...ISO, secondary: ['Serrato anterior', 'Dorsal ancho', 'Glúteos'], name: 'Plancha larga con barra (long-lever plank)', level: 'Avanzado',
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.70 },
      keys: (() => {
        const k = forearmPlank({ th: 8, zA: -0.92 }), z = k.hL[2] + 0.22;
        const b = { ...k, hL: [0.16, 0.225, z], hR: [-0.16, 0.225, z], eL: [0.1, -1, -0.6], eR: [-0.1, -1, -0.6], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] };
        return [{ u: 0, ...b }, { u: 1, ...b }];
      })() },
      items: [{ kind: 'mat', z: 0.05, l: 2.0 }] },
    captions: {
      intro: 'Plancha con los antebrazos apoyados lejos, por delante de la cabeza',
      reps: [
        ['Codos por delante de los hombros: palanca más larga', 'Mantén el cuerpo recto'],
        ['Pelvis metida y glúteos apretados', 'La espalda baja no se hunde'],
        ['Series cortas de 10–20 s', 'Respira de forma continua'],
      ],
      orbit: ['Mantén la línea', 'Anti-extensión: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-AEX-008': {
    ...AEX, ...CORE_FR, ...ISO, name: 'Plancha con banda resistida en anti-extensión', level: 'Avanzado',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [{ u: 0, ...FP }, { u: 1, ...FP }],
      bands: [{ anchor: [0.10, 0.05, 0.10], to: 'beltL' }, { anchor: [-0.10, 0.05, 0.10], to: 'beltR' }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Plancha sobre antebrazos con una banda sobre la cadera anclada al suelo',
      reps: [
        ['La banda tira de la cadera hacia abajo: no la dejes caer', 'Mantén el cuerpo recto'],
        ['Pelvis metida y abdomen firme', 'Aprieta los glúteos'],
        ['Series de 20–40 s', 'Respira de forma continua'],
      ],
      orbit: ['Resiste la banda', 'Anti-extensión: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-AEX-009': {
    ...AEX, ...CORE_FR, secondary: ['Oblicuos', 'Deltoides anterior', 'Tríceps'], name: 'Plancha con press de mancuerna sobre la cabeza', level: 'Avanzado',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'PRESS AL FRENTE', SUBIDA: 'VUELVE', ARRIBA: 'PLANCHA' }, holdLabel: 'BRAZO ESTIRADO',
    cfg: { hands: ['open', 'grip'], free: { type: 'kfPose', alt: true, hold: 'db', holdSides: ['L'], dbK: 0.8,
      keys: [
        { u: 0, ...PK, ...HF, hL: [0.24, 0.10, SZ + 0.03], eL: [0.6, 0.1, -1], pL: [-1, 0, 0, 0, 0, 1] },
        { u: 1, ...PK, rot: [69, 0, -2], ...HF, hL: [0.24, SY + 0.10, SZ + 0.60], eL: [1, -0.2, 0], pL: [-1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con una mancuerna ligera bajo una mano',
      reps: [
        ['Lleva la mancuerna al frente estirando el brazo', 'Vuelve a apoyarla y cambia de lado'],
        ['La cadera no rota ni cae', 'Pies separados para más estabilidad'],
        ['Peso ligero y movimiento lento', 'Abdomen y glúteos firmes'],
      ],
      orbit: ['Brazo al frente', 'Anti-extensión: músculos que trabajan', 'Cadera quieta'],
    },
  },
  'CO-AEX-010': {
    ...AEX, ...CORE_FR, name: 'Plancha con perturbación externa (anti-extensión dinámica)', level: 'Avanzado',
    tempo: { down: 0.8, pause: 0.6, up: 0.8 }, phaseNames: { BAJADA: 'PERTURBACIÓN', SUBIDA: 'RECUPERA', ARRIBA: 'PLANCHA' }, holdLabel: 'RESISTE',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [{ u: 0, ...FP }, { u: 1, ...FP, P: [FP.P[0] + 0.03, FP.P[1] - 0.012, FP.P[2]], rot: [FP.rot[0], 2, 3] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Plancha sobre antebrazos; un compañero da toques suaves en la espalda o la cadera',
      reps: [
        ['Responde a cada toque sin perder la línea', 'Vuelve rápido a la posición'],
        ['Abdomen activo antes de cada perturbación', 'La espalda baja no se hunde'],
        ['Toques variados en dirección e intensidad', 'Series de 20–30 s'],
      ],
      orbit: ['Resiste', 'Anti-extensión: músculos que trabajan', 'Mantén la línea'],
    },
  },
  'CO-ARO-001': {
    ...ARO, ...STAND_FR, name: 'Press Pallof de pie', level: 'Principiante', tempo: { down: 1.5, pause: 2, up: 1.5 },
    phaseNames: { BAJADA: 'PRESS', SUBIDA: 'VUELVE', ARRIBA: 'MANOS AL PECHO' }, holdLabel: 'RESISTE LA ROTACIÓN',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [-1.00, 1.22, 0.10], hand: 'R' }],
      keys: [{ ...STAND, ...PAL(0, 0) }, { ...STAND, ...PAL(1, 0.44) }] },
      items: [{ kind: 'post', h: 1.28, x: -1.02, z: 0.10 }] },
    captions: {
      intro: 'De pie de lado al anclaje, banda tensa y manos juntas en el pecho',
      reps: [
        ['Empuja las manos al frente sin dejar que el tronco gire', 'Mantén 2 s y vuelve al pecho'],
        ['La banda tira hacia el lado: resiste', 'Cadera y hombros mirando al frente'],
        ['Rodillas ligeramente flexionadas', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Brazos al frente', 'Anti-rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ARO-002': {
    ...ARO, ...STAND_FR, name: 'Press Pallof de rodillas', level: 'Principiante', tempo: { down: 1.5, pause: 2, up: 1.5 },
    frame: { dist: 4.2, ty: 0.80, tz: 0.15, distLow: 3.9, tyLow: 0.78 },
    phaseNames: { BAJADA: 'PRESS', SUBIDA: 'VUELVE', ARRIBA: 'MANOS AL PECHO' }, holdLabel: 'RESISTE LA ROTACIÓN',
    cfg: { free: { type: 'kfPose', hold: 'grip', bands: [{ anchor: [-1.00, 0.84, 0.10], hand: 'R' }],
      keys: (() => {
        const K = { P: [0, 0.56, -0.06], rot: [0, 0, 0], nk: [0, 0], lL: [0, 95, 40, 0], lR: [0, 95, 40, 0] };
        return [{ ...K, ...PAL(0, 0, { dy: -0.38 }) }, { ...K, ...PAL(1, 0.44, { dy: -0.38 }) }];
      })() },
      items: [{ kind: 'mat', z: -0.10, l: 1.2 }, { kind: 'post', h: 0.90, x: -1.02, z: 0.10 }] },
    captions: {
      intro: 'De rodillas, tronco erguido y de lado al anclaje con las manos en el pecho',
      reps: [
        ['Empuja las manos al frente sin girar el tronco', 'Mantén 2 s y vuelve al pecho'],
        ['Glúteos apretados: la cadera no se dobla', 'Hombros y cadera mirando al frente'],
        ['De rodillas no puedes compensar con las piernas', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Brazos al frente', 'Anti-rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ARO-003': {
    ...ARO, ...STAND_FR, secondary: ['Glúteo medio', 'Cuádriceps'], name: 'Press Pallof con paso lateral', level: 'Principiante', tempo: { down: 2, pause: 1.5, up: 2 },
    phaseNames: { BAJADA: 'PRESS Y PASO', SUBIDA: 'VUELVE', ARRIBA: 'MANOS AL PECHO' }, holdLabel: 'RESISTE LA ROTACIÓN',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [-1.10, 1.18, 0.10], hand: 'R' }],
      keys: [
        { ...STAND, ...PAL(0, 0) },
        { ...STAND, ...PAL(0.5, 0.44) },
        { ...STAND, P: [0.16, -0.05, -0.01], L: [0.42, 0.08, 0, 0, 8], R: [-0.10, 0.08, 0, 0, -8], ...PAL(1, 0.44), hL: [0.19, 1.19, 0.64], hR: [0.13, 1.19, 0.64] }] },
      items: [{ kind: 'post', h: 1.24, x: -1.12, z: 0.10 }] },
    captions: {
      intro: 'De pie de lado al anclaje, banda tensa y manos juntas en el pecho',
      reps: [
        ['Empuja al frente y da pasos laterales alejándote del anclaje', 'Vuelve con pasos cortos sin girar'],
        ['Los brazos quedan estirados al frente', 'La tensión aumenta al alejarte'],
        ['Rodillas algo flexionadas y cadera estable', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Brazos al frente', 'Anti-rotación: músculos que trabajan', 'Pasos controlados'],
    },
  },
  'CO-ARO-004': {
    ...ARO, primary: ['Oblicuos', 'Cuadrado lumbar'], secondary: ['Dorsal ancho', 'Romboides', 'Glúteo medio'], name: 'Plancha lateral con tracción de banda', level: 'Intermedio',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZO ESTIRADO' }, holdLabel: 'CADERA ARRIBA',
    frame: { dist: 4.0, ty: 0.40, tz: 0.10, distLow: 3.7, tyLow: 0.38 }, views: { f34: { az: -25, el: 16 }, side: { az: 0, el: 8 }, front: { az: -50, el: 20 }, back34: { az: 30, el: 22 } }, orbit: { view: 'side', sweep: 120 },
    cfg: { free: { type: 'kfPose', hold: 'grip', holdSides: ['L'], bands: [{ anchor: [-0.42, 0.40, 1.05], hand: 'L' }],
      keys: (() => {
        const th = 17, t = th * Math.PI / 180, xf = 0.80;
        const P = [xf - 0.87 * Math.cos(t), 0.10 + 0.87 * Math.sin(t), 0];
        const b = { P, rot: [0, 0, 90 - th], nk: [0, 0], L: [xf, 0.17, 0, 0, 0], R: [xf + 0.01, 0.08, 0, 0, 0], kL: [0, 1, 0.2], kR: [0, 1, 0.2],
          hR: [P[0] - 0.48 * Math.cos(t) - 0.02, 0.045, 0.27], eR: [0, -1, -0.3], pR: [0, -1, 0, 0, 0, 1] };
        return [{ u: 0, ...b, hL: [-0.40, 0.48, 0.60], eL: [0, 1, 0], pL: [0, 0, 1, 0, 1, 0] }, { u: 1, ...b, hL: [-0.30, 0.56, 0.12], eL: [0.2, 1, -0.6], pL: [0, 0, 1, 0, 1, 0] }];
      })() },
      items: [{ kind: 'mat', z: 0.0, x: 0.1, l: 1.9, ry: Math.PI / 2 }, { kind: 'post', h: 0.44, x: -0.42, z: 1.07 }] },
    captions: {
      intro: 'Plancha lateral sobre el antebrazo, la mano libre sujeta una banda anclada delante',
      reps: [
        ['Tira de la banda hacia el pecho sin que la cadera baje', 'Estira el brazo despacio'],
        ['El tronco no rota hacia el anclaje', 'Cadera alta y cuerpo en línea'],
        ['Regresión: rodilla de abajo apoyada', 'Cambia de lado al terminar'],
      ],
      orbit: ['Tira de la banda', 'Estabilidad: músculos que trabajan', 'Cadera alta'],
    },
  },
  'CO-ARO-005': {
    ...ARO, primary: ['Transverso abdominal', 'Glúteos', 'Erectores espinales'], secondary: ['Oblicuos', 'Deltoides anterior'], name: 'Bird dog (perro de caza)', level: 'Intermedio',
    tempo: { down: 1.5, pause: 1.5, up: 1.5 }, phaseNames: { BAJADA: 'EXTIENDE', SUBIDA: 'VUELVE', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'BRAZO Y PIERNA ESTIRADOS',
    frame: { dist: 4.2, ty: 0.48, tz: 0.10, distLow: 3.9, tyLow: 0.46 }, views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 24 }, back34: { az: -140, el: 28 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [{ u: 0, ...QUAD, ...QH }, { u: 1, ...QUAD, ...QH, lL: [-4, 4, 30, 0], hR: [-0.20, 0.66, 1.08], eR: [-1, -0.4, 0], pR: [1, 0, 0, 0, 0.3, 1] }] },
      items: [{ kind: 'mat', z: 0.10, l: 1.8 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Estira a la vez un brazo y la pierna contraria', 'Mantén 2 s y vuelve'],
        ['La espalda no se mueve: imagina un vaso encima', 'La cadera no rota hacia el lado de la pierna'],
        ['Alterna los lados', 'Brazo y pierna en línea con el tronco'],
      ],
      orbit: ['Brazo y pierna estirados', 'Estabilidad: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ARO-006': {
    ...ARO, ...CORE_FR, secondary: ['Dorsal ancho', 'Romboides', 'Recto abdominal'], name: 'Plancha con tirón de banda (anti-rotación)', level: 'Intermedio',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'PLANCHA' }, holdLabel: 'CADERA QUIETA',
    cfg: { hands: ['grip', 'open'], free: { type: 'kfPose', hold: 'grip', holdSides: ['L'], bands: [{ anchor: [0.55, 0.06, 1.05], hand: 'L' }],
      keys: [
        { u: 0, ...PK, ...HF, hL: [0.24, 0.07, SZ + 0.03], eL: [0.6, 0.1, -1], pL: [-1, 0, 0, 0, 0, 1] },
        { u: 1, ...PK, rot: [69, 0, -2], ...HF, hL: [0.22, SY - 0.10, SZ - 0.18], eL: [0.6, 1, -0.5], pL: [-1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }, { kind: 'post', h: 0.10, x: 0.57, z: 1.07 }] },
    captions: {
      intro: 'Posición alta de flexión con una mano sujetando una banda anclada delante',
      reps: [
        ['Tira de la banda hacia la cadera sin rotar el tronco', 'Vuelve a apoyar la mano despacio'],
        ['Pies separados y cadera quieta', 'La mano de apoyo empuja el suelo'],
        ['Abdomen y glúteos firmes', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Tira de la banda', 'Anti-rotación: músculos que trabajan', 'Cadera quieta'],
    },
  },
});
