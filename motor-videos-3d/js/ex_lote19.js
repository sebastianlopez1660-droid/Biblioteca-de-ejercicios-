// Lote 19: pliometría TI-PLI-006 … 010 y movilidad TI-MOV-001 … 005
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';
import { SPLCFG, SPLIT_FLOOR } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';

GROUPS['Movilidad de cadera'] = ['gluteos', 'aductores', 'gluteo_medio'];
ANCHORS['Movilidad de cadera'] = [
  { bone: 'pelvis', p: [0.150, 1.000, -0.040], n: [1, 0, -0.3] },
  { bone: 'pelvis', p: [-0.150, 1.000, -0.040], n: [-1, 0, -0.3] },
];

const MOV = { family: 'free', sub: 'Movilidad', primary: ['Movilidad de cadera'], secondary: ['Core'], tempo: { down: 2.5, pause: 1, up: 2.5 } };
const SUP_VIEWS = { f34: { el: 16 }, side: { el: 10 }, front: { el: 16 }, back34: { az: 138, el: 24 } };
const at = (o, u, extra = {}) => ({ ...o, u, ...extra });
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const sq = (k, pz, lean, arm, y = 0, z = 0, pitch = 0) => ({ L: [0, y, z, pitch], R: [0, y, z, pitch], k, pz, lean, arm });
// caída desde el cajón (altura h), rebote y salto vertical
function dropKeys(h, jh) {
  return [
    at(sq(0.985, 0, 3, 4, h, 0), 0),
    at(sq(0.99, 0.04, 8, -25, h + 0.02, 0.10, 10), 0.12),
    { u: 0.30, ...sq(0.99, 0.02, 6, -35, 0.10, 0.36, 18), ease: 'lin' },
    at(sq(0.95, -0.02, 12, -40, 0, 0.45, 4), 0.40),
    at(sq(0.86, -0.05, 24, -45, 0, 0.45, 0), 0.47),
    at(sq(0.997, 0.0, 6, 150, 0.035, 0.45, 32), 0.57),
    at(sq(0.99, 0.02, 4, 140, jh, 0.45, 22), 0.74),
    at(sq(0.975, 0.0, 8, 60, 0, 0.45, 8), 0.88),
    at(sq(0.85, -0.06, 26, 45, 0, 0.45, 0), 1),
  ];
}
// volver a subir al cajón paso a paso
function stepBackUp(h) {
  return [
    at(sq(0.85, -0.06, 26, 45, 0, 0.45), 0), at(sq(0.985, 0, 3, 4, 0, 0.45), 0.25),
    { u: 0.45, L: [0, 0, 0.45, 0], R: [0, h + 0.10, 0.22, 0], k: 0.985, pz: 0, lean: 6, arm: 8 },
    { u: 0.60, L: [0, 0, 0.45, 0], R: [0, h, 0.0, 0], k: 0.985, pz: 0, lean: 8, arm: 8 },
    { u: 0.80, L: [0, h + 0.10, 0.22, 0], R: [0, h, 0.0, 0], k: 0.985, pz: 0, lean: 4, arm: 6 },
    at(sq(0.985, 0, 3, 4, h, 0), 1),
  ];
}
const JFR = { tz: 0.20, dist: 6.2, ty: 1.35, distLow: 5.8, tyLow: 1.30 };

Object.assign(EXERCISES, {
  'TI-PLI-006': {
    ...PLI, name: 'Drop jump (salto de caída)', level: 'Intermedio', tempo: { down: 2.2, pause: 0.8, up: 2.6 }, rest: 0.5,
    phaseNames: { BAJADA: 'CAÍDA Y REBOTE', PAUSA: 'ATERRIZAJE', SUBIDA: 'VUELVE AL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: JFR, views: { f34: { az: -50 }, side: { az: -80 } },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.30, 0.26), up: stepBackUp(0.30) }, items: [{ kind: 'box', w: 0.60, h: 0.30, d: 0.45, z: 0.02 }] },
    captions: {
      intro: 'De pie sobre un cajón bajo, al borde',
      reps: [
        ['Déjate caer del cajón con los dos pies a la vez', 'Rebota al instante y salta hacia arriba'],
        ['Contacto con el suelo lo más corto posible', 'Talones casi sin tocar el suelo'],
        ['Aterriza suave tras el salto', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'TI-PLI-007': {
    ...PLI, name: 'Bounding (zancada de potencia)', level: 'Avanzado', tempo: { down: 2.0, pause: 0.6, up: 1.0 }, rest: 0.3, track: true,
    phaseNames: { BAJADA: 'ZANCADAS', PAUSA: 'ESTABILIZA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: { tz: 0.0, dist: 6.0, ty: 1.10, distLow: 5.6, tyLow: 1.05 }, views: { f34: { az: -60 }, side: { az: -90 }, front: { az: -35 }, back34: { az: -140 } },
    cfg: { free: { type: 'jumpKF', stance: 0.10, travel: 2.6, travelMax: 3,
      down: [
        { u: 0, P: [0, 0, 0], L: [0, 0, 0, 0], R: [0, 0, 0, 0], lean: 3, arm: 4 },
        { u: 0.10, P: [0, -0.07, -0.02], L: [0, 0, 0, 0], R: [0, 0, 0, 0], lean: 14, arm: -30 },
        { u: 0.22, P: [0, 0.02, 0.28], L: [0, 0.03, 0.04, 35], R: [0, 0.42, 0.55, -5], lean: 12, arm: 70 },
        { u: 0.37, P: [0, 0.14, 0.78], L: [0, 0.30, 0.28, 30], R: [0, 0.34, 1.00, 0], lean: 8, arm: 40 },
        { u: 0.50, P: [0, -0.03, 1.18], L: [0, 0.26, 0.82, 30], R: [0, 0, 1.30, 0], lean: 10, arm: -10 },
        { u: 0.57, P: [0, -0.08, 1.30], L: [0, 0.32, 1.16, 30], R: [0, 0, 1.30, 0], lean: 14, arm: -30 },
        { u: 0.68, P: [0, 0.02, 1.58], L: [0, 0.42, 1.85, -5], R: [0, 0.03, 1.34, 35], lean: 12, arm: 70 },
        { u: 0.83, P: [0, 0.14, 2.08], L: [0, 0.34, 2.30, 0], R: [0, 0.30, 1.58, 30], lean: 8, arm: 40 },
        { u: 1, P: [0, -0.06, 2.52], L: [0, 0, 2.60, 0], R: [0, 0.26, 2.15, 30], lean: 14, arm: 10 }],
      up: [
        { u: 0, P: [0, -0.06, 2.52], L: [0, 0, 2.60, 0], R: [0, 0.26, 2.15, 30], lean: 14, arm: 10 },
        { u: 0.5, P: [0, -0.03, 2.58], L: [0, 0, 2.60, 0], R: [0, 0.05, 2.50, 0], lean: 8, arm: 6 },
        { u: 1, P: [0, 0, 2.60], L: [0, 0, 2.60, 0], R: [0, 0, 2.60, 0], lean: 3, arm: 4 }] } },
    captions: {
      intro: 'De pie, listo para saltar hacia delante',
      reps: [
        ['Empuja con una pierna y vuela llevando la otra rodilla arriba', 'Aterriza sobre esa pierna y vuelve a impulsar'],
        ['Zancadas largas con fase de vuelo', 'Brazos coordinados con las piernas'],
        ['Contacto activo con la parte delantera del pie', 'Tronco erguido y mirada al frente'],
      ],
      orbit: ['Estabiliza el aterrizaje', 'Aterrizaje: músculos que trabajan', 'Recupera y repite'],
    },
  },
  'TI-PLI-008': {
    ...PLI, name: 'Salto a una pierna (single leg hop)', level: 'Avanzado', tempo: { down: 1.7, pause: 0.9, up: 1.0 }, rest: 0.4, track: true,
    phaseNames: { BAJADA: 'SALTO', PAUSA: 'ESTABILIZA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: { tz: 0.0, dist: 5.6, ty: 1.10, distLow: 5.2, tyLow: 1.0 }, views: { f34: { az: -55 }, side: { az: -90 }, front: { az: -30 }, back34: { az: -140 } },
    cfg: { free: { type: 'jumpKF', stance: 0.09, free: 'R', travel: 0.65, travelMax: 3,
      down: [{ u: 0, L: [0, 0, 0, 0], R: [0, 70, 20, 20], k: 0.985, lean: 4, arm: 8 },
        { u: 0.30, L: [0, 0, 0, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 26, arm: -35 },
        { u: 0.45, L: [0, 0.03, 0.05, 32], R: [0, 70, 35, 20], k: 0.997, lean: 8, arm: 80 },
        { u: 0.64, L: [0, 0.20, 0.36, 20], R: [0, 75, 30, 20], k: 0.99, lean: 6, arm: 60 },
        { u: 0.82, L: [0, 0, 0.65, 6], R: [0, 75, 20, 20], k: 0.975, lean: 10, arm: 30 },
        { u: 1, L: [0, 0, 0.65, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 24, arm: 25 }],
      up: [{ u: 0, L: [0, 0, 0.65, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 24, arm: 25 },
        { u: 1, L: [0, 0, 0.65, 0], R: [0, 70, 20, 20], k: 0.985, lean: 4, arm: 8 }] } },
    captions: {
      intro: 'De pie sobre una pierna',
      reps: [
        ['Salta hacia delante y aterriza sobre la misma pierna', 'Mantén 1 s el aterrizaje sin moverte'],
        ['La rodilla sigue la línea del pie al caer', 'Amortigua flexionando cadera y rodilla'],
        ['Brazos coordinados para equilibrarte', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Prepara el siguiente salto'],
    },
  },
  'TI-PLI-009': {
    ...PLI, name: 'Salto en profundidad con rebote (depth jump)', level: 'Avanzado', tempo: { down: 2.3, pause: 0.8, up: 2.8 }, rest: 0.5,
    phaseNames: { BAJADA: 'CAÍDA Y SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'VUELVE AL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: { ...JFR, dist: 6.4, ty: 1.45 }, views: { f34: { az: -50 }, side: { az: -80 } },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: dropKeys(0.45, 0.34), up: stepBackUp(0.45) }, items: [{ kind: 'box', w: 0.60, h: 0.45, d: 0.45, z: 0.02 }] },
    captions: {
      intro: 'De pie sobre un cajón alto, al borde',
      reps: [
        ['Déjate caer y salta lo más alto posible al tocar el suelo', 'Brazos arriba con fuerza en el despegue'],
        ['Amortigua y rebota en un solo movimiento', 'Rodillas alineadas con los pies'],
        ['Aterriza suave y estabiliza', 'Vuelve a subir al cajón paso a paso'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve al cajón'],
    },
  },
  'TI-PLI-010': {
    ...PLI, name: 'Salto a cajón a una pierna', level: 'Avanzado', tempo: { down: 1.9, pause: 0.9, up: 2.6 }, rest: 0.5,
    phaseNames: { BAJADA: 'SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'BAJA DEL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE EN EL CAJÓN',
    frame: { tz: 0.25, dist: 6.0, ty: 1.30, distLow: 5.6, tyLow: 1.25 }, views: { f34: { az: -50 }, side: { az: -80 } },
    cfg: { free: { type: 'jumpKF', stance: 0.09,
      down: [{ u: 0, free: 'R', L: [0, 0, 0, 0], R: [0, 70, 20, 20], k: 0.985, lean: 4, arm: 8 },
        { u: 0.30, free: 'R', L: [0, 0, 0, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 26, arm: -35 },
        { u: 0.45, free: 'R', L: [0, 0.03, 0.05, 32], R: [0, 70, 40, 20], k: 0.997, lean: 8, arm: 90 },
        { u: 0.64, free: 'R', L: [0, 0.42, 0.30, 20], R: [0, 75, 35, 20], k: 0.99, lean: 6, arm: 70 },
        { u: 0.82, free: 'R', L: [0, 0.30, 0.50, 6], R: [0, 75, 20, 20], k: 0.975, lean: 10, arm: 40 },
        { u: 1, free: 'R', L: [0, 0.30, 0.50, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 24, arm: 30 }],
      up: [{ u: 0, free: 'R', L: [0, 0.30, 0.50, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 24, arm: 30 },
        { u: 0.22, free: 'R', L: [0, 0.30, 0.50, 0], R: [0, 30, 5, 10], k: 0.985, lean: 4, arm: 8 },
        { u: 0.34, free: null, L: [0, 0.30, 0.50, 0], R: [0, 0.33, 0.50, 0], k: 0.985, lean: 4, arm: 6 },
        { u: 0.50, free: null, L: [0, 0.30, 0.50, 0], R: [0, 0.40, 0.25, 0], k: 0.97, pz: -0.08, lean: 10, arm: 15 },
        { u: 0.64, free: null, L: [0, 0.30, 0.50, 0], R: [0, 0, 0.0, 0], k: 0.97, pz: 0, lean: 8, arm: 10 },
        { u: 0.82, free: null, L: [0, 0.38, 0.24, 0], R: [0, 0, 0.0, 0], k: 0.985, pz: 0, lean: 4, arm: 4 },
        { u: 0.92, free: null, L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, lean: 4, arm: 4 },
        { u: 1, free: 'R', L: [0, 0, 0, 0], R: [0, 70, 20, 20], k: 0.985, lean: 4, arm: 8 }] },
      items: [{ kind: 'box', w: 0.60, h: 0.30, d: 0.50, z: 0.59 }] },
    captions: {
      intro: 'De pie sobre una pierna frente a un cajón bajo',
      reps: [
        ['Contramovimiento y salta al cajón con una sola pierna', 'Aterriza sobre la misma pierna'],
        ['Rodilla alineada con el pie al aterrizar', 'Mantén 1 s el equilibrio arriba'],
        ['Baja del cajón paso a paso', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Baja del cajón con cuidado'],
    },
  },
  'TI-MOV-001': {
    ...MOV, name: 'Movilidad de cadera 90/90', level: 'Principiante', labelAll: true,
    phaseNames: { BAJADA: 'CAMBIO DE LADO', SUBIDA: 'REGRESO', PAUSA: 'POSICIÓN 90/90', ARRIBA: 'INICIO' }, holdLabel: 'POSICIÓN 90/90',
    frame: { dist: 3.8, ty: 0.32, tz: 0.15, distLow: 3.4, tyLow: 0.32 }, views: { f34: { az: -30, el: 30 }, side: { az: -70, el: 24 }, front: { az: 0, el: 34 }, back34: { az: 150, el: 34 } },
    cfg: { free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.105, 0], rot: [4, 18, 0], sp: [8, 6, 0], nk: [6, 0], L: [0.08, 0.075, 0.60, 35, -80], kL: [1, 0.1, 0.2], R: [-0.66, 0.075, 0.02, 35, -100], kR: [0, 0.1, 1],
          hL: [0.30, 0.03, -0.14], hR: [-0.30, 0.03, -0.14], eL: [0.2, 0, -1], eR: [-0.2, 0, -1], pL: [0, -1, 0, 0.3, 0, -1], pR: [0, -1, 0, -0.3, 0, -1] },
        { u: 0.5, P: [0, 0.105, 0], rot: [-6, 0, 0], sp: [4, 0, 0], nk: [6, 0], L: [0.28, 0.075, 0.48, 0, 6], kL: [0.2, 1, 0.2], R: [-0.28, 0.075, 0.48, 0, -6], kR: [-0.2, 1, 0.2] },
        { u: 1, P: [0, 0.105, 0], rot: [4, -18, 0], sp: [8, -6, 0], nk: [6, 0], L: [0.66, 0.075, 0.02, 35, 100], kL: [0, 0.1, 1], R: [-0.08, 0.075, 0.60, 35, 80], kR: [-1, 0.1, 0.2] }] },
      items: [{ kind: 'mat', z: 0.15, l: 1.4, w: 1.2 }] },
    captions: {
      intro: 'Sentado en el suelo: una pierna delante y otra al lado, rodillas a 90°',
      reps: [
        ['Gira las dos rodillas hacia el otro lado sin levantar la cadera', 'Llega a la posición 90/90 contraria'],
        ['Tronco erguido: crece hacia arriba', 'Usa las manos de apoyo si lo necesitas'],
        ['Movimiento lento y en rango cómodo', 'Respira en cada posición'],
      ],
      orbit: ['Cambia de lado', 'Posición 90/90: músculos que trabajan', 'Vuelve al lado inicial'],
    },
  },
  'TI-MOV-002': {
    ...MOV, name: 'Círculos de cadera de pie', level: 'Principiante', tempo: { down: 3, pause: 0, up: 3 },
    phaseNames: { BAJADA: 'CÍRCULO HACIA FUERA', SUBIDA: 'CÍRCULO HACIA DENTRO', ARRIBA: 'INICIO' }, holdLabel: 'RODILLA AL LADO',
    frame: { dist: 4.6, ty: 0.95, tz: 0.0, distLow: 4.2, tyLow: 0.95 },
    cfg: { free: { type: 'kfPose', relY: 'L', arms: 'hips',
      keys: [
        { u: 0, P: [0.03, -0.01, -0.02], rot: [3, 0, 0], L: [0.09, 0.08, 0, 0, 6], lR: [2, 6, 10, 0] },
        { u: 0.33, P: [0.03, -0.015, -0.02], rot: [4, 0, 0], L: [0.09, 0.08, 0, 0, 6], lR: [85, 95, 15, 0] },
        { u: 0.66, P: [0.03, -0.015, -0.02], rot: [3, 0, 0], L: [0.09, 0.08, 0, 0, 6], lR: [60, 95, 15, 50] },
        { u: 1, P: [0.03, -0.01, -0.02], rot: [3, 0, 0], L: [0.09, 0.08, 0, 0, 6], lR: [8, 60, 15, 30] }] } },
    captions: {
      intro: 'De pie sobre una pierna, manos en la cintura',
      reps: [
        ['Sube la rodilla al frente y ábrela hacia el lado', 'Baja dibujando un círculo y vuelve en sentido contrario'],
        ['Círculos amplios y controlados', 'Tronco quieto: solo se mueve la cadera'],
        ['Apóyate en una pared si lo necesitas', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Rodilla al lado', 'Máxima apertura: músculos que trabajan', 'Cierra el círculo'],
    },
  },
  'TI-MOV-003': {
    ...MOV, family: 'squat', primary: ['Gastrocnemio y sóleo'], secondary: ['Tibial anterior'], name: 'Movilidad de tobillo rodilla a la pared (knee to wall)', level: 'Principiante',
    tempo: { down: 2, pause: 1, up: 2 }, frame: { tz: 0.05, dist: 5.2, ty: 0.88, distLow: 4.8, tyLow: 0.80 },
    phaseNames: { BAJADA: 'RODILLA A LA PARED', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'RODILLA EN LA PARED',
    views: { f34: { az: -78, el: 10 }, side: { az: -95, el: 6 }, front: { az: -125, el: 10 }, back34: { az: -150, el: 14 } }, orbit: { view: 'side', sweep: 90 },
    cfg: { ...SPLCFG, arms: 'hips', leanTop: 2, leanBot: 2, split: { front: 'L', rear: 'R', mode: 'floor', zF: 0.22, zR: -0.38, pTop: 25, pBot: 40, pz: [-0.10, 0.10], yBot: 0.72 },
      items: [{ kind: 'wall', z: 0.52, flip: true, w: 0.9, h: 1.3 }] },
    captions: {
      intro: 'Frente a la pared, pie delantero a unos 10 cm',
      reps: [
        ['Lleva la rodilla hacia la pared sin levantar el talón', 'Vuelve en 2 s'],
        ['La rodilla va en la línea del segundo dedo', 'Si tocas fácil, aleja un poco el pie'],
        ['Mantén 1 s en la pared', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Rodilla a la pared', 'Flexión de tobillo: músculos que se estiran', 'Vuelve controlando'],
    },
  },
  'TI-MOV-004': {
    ...MOV, family: 'squat', primary: ['Movilidad de cadera'], secondary: ['Isquiotibiales', 'Core'], name: 'Zancada con apertura de cadera (lunge with hip opener)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 1.5, up: 2 }, frame: { tz: -0.10, dist: 4.6, distLow: 3.9, tyLow: 0.62 },
    phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'APERTURA DE CADERA',
    cfg: { ...SPLCFG, arms: 'clasp', twist: 40, leanBot: 18, split: { ...SPLIT_FLOOR, zF: 0.40, zR: -0.66, yBot: 0.50 } },
    captions: {
      intro: 'De pie, listo para dar un paso largo al frente',
      reps: [
        ['Baja en zancada profunda y gira el tronco hacia la pierna delantera', 'Vuelve al centro y sube'],
        ['Cadera baja: notarás el estiramiento delante de la cadera trasera', 'Rodilla delantera sobre el tobillo'],
        ['Respira durante la apertura', 'Cambia de pierna en la siguiente serie'],
      ],
      orbit: ['Abre la cadera', 'Apertura: músculos que trabajan', 'Vuelve al centro'],
    },
  },
  'TI-MOV-005': {
    ...MOV, primary: ['Isquiotibiales'], secondary: ['Core', 'Cuádriceps'], name: 'Elevación activa de pierna recta (active straight leg raise)', level: 'Intermedio',
    labelAll: true, tempo: { down: 2, pause: 1, up: 2 }, views: SUP_VIEWS,
    phaseNames: { BAJADA: 'SUBE LA PIERNA', SUBIDA: 'BAJA LA PIERNA', ARRIBA: 'INICIO' }, holdLabel: 'PIERNA ARRIBA',
    frame: { dist: 4.0, ty: 0.30, tz: 0.30, distLow: 3.6, tyLow: 0.32 },
    cfg: { free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0], lL: [0, 2, 20, 0], lR: [0, 2, 20, 0],
          aL: [0, 10, 4], aR: [0, 10, 4], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
        { u: 1, P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0], lL: [72, 2, -5, 0], lR: [0, 2, 20, 0],
          aL: [0, 10, 4], aR: [0, 10, 4], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, piernas estiradas y brazos a los lados',
      reps: [
        ['Sube una pierna recta lo más alto que puedas', 'Bájala en 2 s controlando'],
        ['La otra pierna queda pegada al suelo', 'La rodilla que sube no se dobla'],
        ['Pelvis estable: no la giras ni la levantas', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Pierna arriba', 'Máxima elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
});
export { dropKeys, stepBackUp };
