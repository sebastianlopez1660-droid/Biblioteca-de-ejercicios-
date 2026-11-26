// Lote 23: tracciones TS-TRA-003 … 012
import { EXERCISES } from './exercises.js';
import { PULL, HANG_FR, hangKeys, STAND_FR } from './ex_lote22.js';

const CABLE = 0xb9bec4;
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const SIDEFR = { frame: { dist: 4.6, ty: 1.00, tz: 0.15, distLow: 4.3, tyLow: 0.95 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 16 } }, orbit: { view: 'side', sweep: 160 } };
const ROW = { phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA' };

// remo invertido: talones apoyados en z = 1.0, cabeza hacia -z
function invKey(phi, u, hands) {
  const t = phi * Math.PI / 180;
  return { u, P: [0, 0.08 + 0.87 * Math.sin(t), 1.0 - 0.87 * Math.cos(t)], rot: [-(90 - phi), 0, 0], nk: [-4, 0],
    L: [0.10, 0.08, 1.0, -20, 6], R: [-0.10, 0.08, 1.0, -20, -6], kL: [0, 1, 0], kR: [0, 1, 0], ...hands };
}
const INV_H = { hL: [0.32, 1.00, -0.24], hR: [-0.32, 1.00, -0.24], eL: [1, -0.6, 0.2], eR: [-1, -0.6, 0.2], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] };

Object.assign(EXERCISES, {
  'TS-TRA-003': {
    ...PULL, ...HANG_FR, name: 'Dominadas asistidas con banda', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'grip', keys: hangKeys({ w: 0.31, palm: [0, 0, 1], elbow: [1, -0.3, 0.1] }).map((k) => ({ ...k, lL: [40, 90, 25, 0], lR: [40, 90, 25, 0] })),
      bands: [{ anchor: [0.05, 2.25, 0.0], to: 'kL' }, { anchor: [-0.05, 2.25, 0.0], to: 'kR' }, { anchor: 'kL', to: 'kR' }] }, items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Banda colgada de la barra y apoyada bajo las rodillas',
      reps: [
        ['Tira hasta pasar la barbilla por encima de la barra', 'Baja en 2 s hasta estirar los brazos'],
        ['La banda ayuda más abajo, donde cuesta más', 'Escápulas abajo al empezar cada repetición'],
        ['Usa bandas más finas a medida que progreses', 'Sin balanceos'],
      ],
      orbit: ['Barbilla sobre la barra', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRA-004': {
    ...PULL, ...SIDEFR, name: 'Jalón al pecho en polea (lat pulldown)', level: 'Principiante', frame: { dist: 4.8, ty: 1.30, tz: 0.05, distLow: 4.5, tyLow: 1.25 },
    cfg: { free: { type: 'kfPose', hold: 'bar', barOpts: { half: 0.62, plates: 0 }, rods: [{ from: [0, 2.35, 0.06], to: 'bar', r: 0.006, color: CABLE }],
      keys: [
        { u: 0, ...SEATBOX, rot: [-4, 0, 0], nk: [0, 0], hL: [0.38, 1.58, 0.06], hR: [-0.38, 1.58, 0.06], eL: [1, -0.1, 0], eR: [-1, -0.1, 0], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] },
        { u: 1, ...SEATBOX, rot: [-14, 0, 0], nk: [-6, 0], hL: [0.36, 1.08, 0.14], hR: [-0.36, 1.08, 0.14], eL: [1, -1, -0.3], eR: [-1, -1, -0.3], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado con los muslos fijos y la barra agarrada algo más ancha que los hombros',
      reps: [
        ['Tira de la barra hasta la parte alta del pecho', 'Sube en 2 s hasta estirar los brazos'],
        ['Inclina un poco el tronco atrás, sin balancearte', 'Lleva los codos hacia abajo y atrás'],
        ['Hombros lejos de las orejas', 'Aprieta la espalda abajo 1 s'],
      ],
      orbit: ['Barra al pecho', 'Contracción máxima: músculos que trabajan', 'Sube controlando'],
    },
  },
  'TS-TRA-005': {
    ...PULL, ...ROW, ...SIDEFR, secondary: ['Bíceps', 'Romboides', 'Trapecio medio', 'Erectores espinales'], name: 'Remo con barra', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar',
      keys: [
        { u: 0, P: [0, -0.07, -0.14], rot: [48, 0, 0], sp: [-4, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8], hL: [0.25, 0.62, 0.25], hR: [-0.25, 0.62, 0.25], eL: [0.6, 0, -1], eR: [-0.6, 0, -1], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0] },
        { u: 1, P: [0, -0.07, -0.14], rot: [46, 0, 0], sp: [-6, 0, 0], nk: [-20, 0], L: [0.14, 0.08, 0, 0, 8], R: [-0.14, 0.08, 0, 0, -8], hL: [0.25, 0.92, 0.18], hR: [-0.25, 0.92, 0.18], eL: [0.5, 0.3, -1], eR: [-0.5, 0.3, -1], pL: [0, 0, -1, 1, 0, 0], pR: [0, 0, -1, -1, 0, 0] }] } },
    captions: {
      intro: 'Tronco inclinado unos 45°, rodillas flexionadas y barra colgando',
      reps: [
        ['Tira de la barra hacia la parte baja del pecho', 'Baja en 2 s hasta estirar los brazos'],
        ['Espalda neutra: el tronco no sube al tirar', 'Codos hacia atrás, cerca del cuerpo'],
        ['Junta las escápulas arriba', 'Abdomen firme durante toda la serie'],
      ],
      orbit: ['Tira hacia el pecho', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRA-006': {
    ...PULL, ...ROW, ...SIDEFR, name: 'Remo con mancuerna a una mano', level: 'Intermedio',
    frame: { dist: 4.6, ty: 0.80, tz: 0.0, distLow: 4.3, tyLow: 0.80 }, views: { f34: { az: -50, el: 14 }, side: { az: -90, el: 8 }, front: { az: -25, el: 14 }, back34: { az: -150, el: 20 } },
    cfg: { free: { type: 'kfPose', hold: 'db',
      keys: [
        { u: 0, P: [0.02, 0.80, -0.16], rot: [76, 0, 0], sp: [-4, 0, 0], nk: [-30, 0], L: [0.20, 0.53, -0.66, -40, 0], kL: [0, -1, 0.2], R: [-0.24, 0.08, -0.12, 0, -10], kR: [-0.2, 0.3, 1],
          hL: [0.20, 0.50, 0.46], eL: [0.5, 0, -1], pL: [0, -1, 0, 0, 0, 1], hR: [-0.20, 0.36, 0.26], eR: [-0.6, 0, -1], pR: [1, 0, 0, 0, 0, 1] },
        { u: 1, P: [0.02, 0.80, -0.16], rot: [74, -4, 0], sp: [-4, -6, 0], nk: [-30, 0], L: [0.20, 0.53, -0.66, -40, 0], kL: [0, -1, 0.2], R: [-0.24, 0.08, -0.12, 0, -10], kR: [-0.2, 0.3, 1],
          hL: [0.20, 0.50, 0.46], eL: [0.5, 0, -1], pL: [0, -1, 0, 0, 0, 1], hR: [-0.20, 0.72, 0.06], eR: [-0.3, 0.6, -1], pR: [1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'flatBench', len: 1.25, z: 0.60, x: 0.20 }] },
    captions: {
      intro: 'Rodilla y mano del mismo lado sobre el banco, espalda paralela al suelo',
      reps: [
        ['Tira de la mancuerna hacia la cadera', 'Baja en 2 s hasta estirar el brazo'],
        ['El codo pasa cerca del cuerpo', 'El tronco no gira al tirar'],
        ['Espalda neutra y mirada al suelo', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Mancuerna a la cadera', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRA-007': {
    ...PULL, ...ROW, ...SIDEFR, name: 'Remo en máquina sentado', level: 'Principiante',
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0.22, 0.45, 0.95], to: 'hL', ext: 0.03, r: 0.022 }, { from: [-0.22, 0.45, 0.95], to: 'hR', ext: 0.03, r: 0.022 }],
      keys: [
        { u: 0, ...SEATBOX, rot: [6, 0, 0], nk: [0, 0], hL: [0.17, 0.93, 0.62], hR: [-0.17, 0.93, 0.62], eL: [0.6, -0.4, -0.2], eR: [-0.6, -0.4, -0.2], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
        { u: 1, ...SEATBOX, rot: [0, 0, 0], nk: [0, 0], hL: [0.20, 0.92, 0.14], hR: [-0.20, 0.92, 0.14], eL: [0.5, -0.2, -1], eR: [-0.5, -0.2, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] }] },
      items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }, { kind: 'post', h: 1.0, z: 0.40 }] },
    captions: {
      intro: 'Sentado con el pecho apoyado y las asas al frente',
      reps: [
        ['Tira de las asas llevando los codos atrás', 'Vuelve en 2 s hasta estirar los brazos'],
        ['Junta las escápulas al final del tirón', 'Pecho pegado al apoyo'],
        ['Hombros abajo, lejos de las orejas', 'Sin impulso con el tronco'],
      ],
      orbit: ['Codos atrás', 'Contracción máxima: músculos que trabajan', 'Estira los brazos controlando'],
    },
  },
  'TS-TRA-008': {
    ...PULL, ...ROW, ...SIDEFR, name: 'Remo en polea baja', level: 'Principiante', frame: { dist: 4.8, ty: 0.80, tz: 0.35, distLow: 4.5, tyLow: 0.78 },
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], rods: [{ from: [0, 0.32, 1.45], to: 'bar', r: 0.006, color: CABLE }],
      keys: [
        { u: 0, P: [0, 0.48, -0.05], rot: [16, 0, 0], nk: [0, 0], L: [0.14, 0.40, 0.88, -20, 8], R: [-0.14, 0.40, 0.88, -20, -8], kL: [0.1, 1, 0.2], kR: [-0.1, 1, 0.2],
          hL: [0.05, 0.80, 0.72], hR: [-0.05, 0.80, 0.72], eL: [0.6, -0.5, 0], eR: [-0.6, -0.5, 0], pL: [-1, 0, 0, 0, 0.3, 1], pR: [1, 0, 0, 0, 0.3, 1] },
        { u: 1, P: [0, 0.48, -0.05], rot: [0, 0, 0], sp: [-6, 0, 0], nk: [0, 0], L: [0.14, 0.40, 0.88, -20, 8], R: [-0.14, 0.40, 0.88, -20, -8], kL: [0.1, 1, 0.2], kR: [-0.1, 1, 0.2],
          hL: [0.05, 0.82, 0.18], hR: [-0.05, 0.82, 0.18], eL: [0.4, -0.2, -1], eR: [-0.4, -0.2, -1], pL: [-1, 0, 0, 0, 0.3, 1], pR: [1, 0, 0, 0, 0.3, 1] }] },
      items: [{ kind: 'box', h: 0.38, w: 0.36, d: 0.90, z: 0.10 }, { kind: 'box', h: 0.45, w: 0.50, d: 0.08, z: 0.98 }, { kind: 'post', h: 0.40, z: 1.48 }] },
    captions: {
      intro: 'Sentado con los pies en el apoyo, rodillas suaves y agarre neutro',
      reps: [
        ['Tira del agarre hacia el abdomen llevando los codos atrás', 'Vuelve en 2 s estirando los brazos'],
        ['Tronco casi quieto: no te balancees', 'Pecho arriba y escápulas juntas al final'],
        ['Codos pegados al cuerpo', 'Exhala al tirar'],
      ],
      orbit: ['Agarre al abdomen', 'Contracción máxima: músculos que trabajan', 'Estira los brazos controlando'],
    },
  },
  'TS-TRA-009': {
    ...PULL, ...ROW, name: 'Remo invertido (bodyweight row)', level: 'Principiante',
    frame: { dist: 4.8, ty: 0.72, tz: 0.30, distLow: 4.5, tyLow: 0.70 }, views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 6 }, front: { az: -30, el: 18 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 160 },
    cfg: { free: { type: 'kfPose', hold: 'grip', keys: [invKey(14, 0, INV_H), invKey(34, 1, { ...INV_H, eL: [1, -1, 0.3], eR: [-1, -1, 0.3] })] },
      items: [{ kind: 'pullupBar', h: 1.0, w: 0.75 }] },
    captions: {
      intro: 'Colgado bajo una barra baja, cuerpo recto y talones apoyados',
      reps: [
        ['Tira del pecho hacia la barra', 'Baja en 2 s hasta estirar los brazos'],
        ['Cuerpo recto como en una plancha', 'Junta las escápulas arriba'],
        ['Más horizontal = más difícil', 'Codos a unos 45° del cuerpo'],
      ],
      orbit: ['Pecho a la barra', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRA-010': {
    ...PULL, ...ROW, ...STAND_FR, primary: ['Deltoides posterior', 'Trapecio medio'], secondary: ['Manguito rotador', 'Romboides'], name: 'Face pull en polea', level: 'Intermedio',
    frame: { dist: 4.8, ty: 1.40, tz: 0.30, distLow: 4.5, tyLow: 1.35 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', cable: true, bands: [{ anchor: [0, 1.76, 1.05], to: 'hL' }, { anchor: [0, 1.76, 1.05], to: 'hR' }],
      keys: [
        { u: 0, ...STAND, rot: [-3, 0, 0], nk: [0, 0], hL: [0.08, 1.70, 0.62], hR: [-0.08, 1.70, 0.62], eL: [1, 0, -0.3], eR: [-1, 0, -0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, ...STAND, rot: [-3, 0, 0], nk: [0, 0], hL: [0.24, 1.68, 0.08], hR: [-0.24, 1.68, 0.08], eL: [1, 0.2, -0.6], eR: [-1, 0.2, -0.6], pL: [-0.3, -0.2, 1, 0, 1, 0], pR: [0.3, -0.2, 1, 0, 1, 0] }] },
      items: [{ kind: 'post', h: 1.85, z: 1.08 }] },
    captions: {
      intro: 'Cuerda en la polea alta, a la altura de la cara',
      reps: [
        ['Tira de la cuerda hacia la cara separando las manos', 'Vuelve en 2 s estirando los brazos'],
        ['Codos altos y hacia fuera', 'Al final, los pulgares apuntan atrás'],
        ['Junta las escápulas sin arquear la espalda', 'Peso moderado y técnica limpia'],
      ],
      orbit: ['Cuerda a la cara', 'Contracción máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-TRA-011': {
    ...PULL, ...HANG_FR, name: 'Dominadas con agarre neutro', level: 'Avanzado',
    cfg: { free: { type: 'kfPose', hold: 'grip', handles: ['L', 'R'], keys: hangKeys({ w: 0.26, palm: [-1, 0, 0], elbow: [0.5, -0.4, 0.6] }).map((k) => ({ ...k, pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] })) },
      items: [{ kind: 'pullupBar', h: 2.25 }] },
    captions: {
      intro: 'Colgado de las asas paralelas, palmas enfrentadas',
      reps: [
        ['Tira hasta pasar la barbilla por encima de las asas', 'Baja en 2 s hasta estirar los brazos'],
        ['Codos hacia abajo y pegados al cuerpo', 'Agarre más cómodo para los hombros'],
        ['Sin balanceos', 'Recorrido completo en cada repetición'],
      ],
      orbit: ['Barbilla arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-TRA-012': {
    ...PULL, ...ROW, ...SIDEFR, name: 'Remo con banda elástica', level: 'Principiante', frame: { dist: 4.4, ty: 0.55, tz: 0.35, distLow: 4.1, tyLow: 0.52 },
    cfg: { free: { type: 'kfPose', hold: 'grip', bands: [{ anchor: [0.06, 0.12, 0.92], to: 'hL' }, { anchor: [-0.06, 0.12, 0.92], to: 'hR' }],
      keys: [
        { u: 0, P: [0, 0.105, 0], rot: [10, 0, 0], nk: [0, 0], lL: [84, 6, 10, 0], lR: [84, 6, 10, 0], hL: [0.10, 0.55, 0.62], hR: [-0.10, 0.55, 0.62], eL: [0.6, -0.5, 0], eR: [-0.6, -0.5, 0], pL: [-1, 0, 0, 0, 0.3, 1], pR: [1, 0, 0, 0, 0.3, 1] },
        { u: 1, P: [0, 0.105, 0], rot: [-2, 0, 0], sp: [-6, 0, 0], nk: [0, 0], lL: [84, 6, 10, 0], lR: [84, 6, 10, 0], hL: [0.20, 0.58, 0.14], hR: [-0.20, 0.58, 0.14], eL: [0.4, -0.2, -1], eR: [-0.4, -0.2, -1], pL: [-1, 0, 0, 0, 0.3, 1], pR: [1, 0, 0, 0, 0.3, 1] }] },
      items: [{ kind: 'mat', z: 0.35, l: 1.5 }] },
    captions: {
      intro: 'Sentado en el suelo, piernas estiradas y banda pasada por los pies',
      reps: [
        ['Tira de la banda hacia la cintura llevando los codos atrás', 'Vuelve en 2 s estirando los brazos'],
        ['Espalda recta: no te inclines hacia atrás', 'Junta las escápulas al final'],
        ['Hombros abajo', 'Ajusta la tensión acortando la banda'],
      ],
      orbit: ['Codos atrás', 'Contracción máxima: músculos que trabajan', 'Estira los brazos controlando'],
    },
  },
});
