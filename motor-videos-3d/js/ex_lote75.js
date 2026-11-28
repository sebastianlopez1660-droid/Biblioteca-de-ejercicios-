// Lote 75: movilidad de rodilla MO-ROD-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const ROD = { ...MOB, sub: 'Movilidad de rodilla', primary: ['Cuádriceps', 'Isquiotibiales'], secondary: ['Gastrocnemio y sóleo'] };
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const QUAD_FR = { frame: { dist: 4.0, ty: 0.45, tz: 0.10, distLow: 3.7, tyLow: 0.43 }, views: { f34: { az: -55, el: 20 }, side: { az: -90, el: 8 }, front: { az: -20, el: 26 }, back34: { az: -140, el: 30 } }, orbit: { view: 'side', sweep: 120 } };
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0] };
const SUP_FR = { frame: { dist: 4.0, ty: 0.30, tz: 0.30, distLow: 3.6, tyLow: 0.32 } };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };

Object.assign(EXERCISES, {
  'MO-ROD-001': {
    ...like('TI-ERO-007', {}), ...ROD, primary: ['Cuádriceps'], secondary: ['Isquiotibiales'], name: 'Movilidad de rodilla en flexo-extensión activa sentado', level: 'Principiante',
    tempo: { down: 1.5, pause: 0.5, up: 1.5 },
    cfg: { free: { ...EXERCISES['TI-ERO-007'].cfg.free, ankleWeight: false } },
    captions: {
      intro: 'Sentado en un banco o cajón, pies en el suelo',
      reps: [
        ['Estira la rodilla del todo y vuelve a doblarla', 'Movimiento lento y completo'],
        ['Al estirar, lleva la punta del pie hacia ti', 'Muslo apoyado en el asiento'],
        ['15–20 repeticiones por pierna', 'Sin dolor en todo el rango'],
      ],
      orbit: ['Rodilla estirada', 'Movilidad de rodilla: músculos que trabajan', 'Dobla despacio'],
    },
  },
  'MO-ROD-002': {
    ...ROD, ...QUAD_FR, name: 'Movilidad de rodilla en cuadrupedia (knee rocking)', level: 'Principiante', primary: ['Cuádriceps', 'Movilidad de cadera'], secondary: ['Gastrocnemio y sóleo'],
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: { BAJADA: 'ATRÁS', SUBIDA: 'ADELANTE', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'CADERA A LOS TALONES',
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, ...QUAD, ...QH },
      { u: 1, ...QUAD, ...QH, P: [0, 0.40, -0.30], rot: [62, 0, 0], nk: [-4, 0], lL: [128, 150, 0, 0], lR: [128, 150, 0, 0] },
    ] }, items: [{ kind: 'mat', z: 0.1, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Lleva la cadera hacia los talones sin mover manos ni rodillas', 'Vuelve a la cuadrupedia'],
        ['Rodillas se doblan al máximo cómodo', 'Espalda larga, sin redondear'],
        ['10–15 balanceos lentos', 'Respira al ir atrás'],
      ],
      orbit: ['Cadera a los talones', 'Movilidad de rodilla: músculos que trabajan', 'Vuelve adelante'],
    },
  },
  'MO-ROD-003': {
    ...ROD, primary: ['Cuádriceps'], secondary: [], name: 'Automovilización de rótula (patellar mobilization)', level: 'Principiante',
    tempo: { down: 1.2, pause: 0.3, up: 1.2 }, phaseNames: { BAJADA: 'DESLIZA', SUBIDA: 'DESLIZA', ARRIBA: 'RÓTULA' }, holdLabel: 'RÓTULA DESPLAZADA',
    frame: { dist: 3.8, ty: 0.55, tz: 0.30, distLow: 3.5, tyLow: 0.52 }, views: { f34: { az: -40, el: 20 }, side: { az: -80, el: 10 }, front: { az: -15, el: 18 }, back34: { az: 145, el: 24 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.545, -0.02], rot: [24, 0, 0], nk: [18, 0], lL: [86, 4, 10, 0], R: [-0.14, 0.075, 0.44, 0, -8], kR: [-0.1, 0.2, 1], hL: [0.14, 0.60, 0.43], hR: [0.03, 0.60, 0.44], eL: [0.5, -0.3, 0], eR: [-0.6, -0.3, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, P: [0, 0.545, -0.02], rot: [24, 0, 0], nk: [18, 0], lL: [86, 4, 10, 0], R: [-0.14, 0.075, 0.44, 0, -8], kR: [-0.1, 0.2, 1], hL: [0.14, 0.60, 0.47], hR: [0.03, 0.60, 0.48], eL: [0.5, -0.3, 0], eR: [-0.6, -0.3, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'box', h: 0.45, w: 0.70, d: 0.42, z: -0.06 }, { kind: 'box', h: 0.42, w: 0.40, d: 0.36, z: 0.88 }] },
    captions: {
      intro: 'Sentado con la pierna estirada y relajada sobre un apoyo',
      reps: [
        ['Con los dedos, desliza la rótula arriba, abajo y a los lados', 'Movimientos pequeños y suaves'],
        ['El cuádriceps debe estar relajado', 'Mantén 2–3 s en cada dirección'],
        ['1–2 min por rodilla', 'Sin dolor'],
      ],
      orbit: ['Rótula desplazada', 'Movilidad de rodilla: músculos que trabajan', 'Cambia de dirección'],
    },
  },
  'MO-ROD-004': {
    ...ROD, ...SUP_FR, name: 'Movilidad de rodilla con banda en flexión asistida', level: 'Intermedio',
    tempo: { down: 2, pause: 1.5, up: 2 }, phaseNames: { BAJADA: 'DOBLA', SUBIDA: 'ESTIRA', ARRIBA: 'PIERNA ESTIRADA' }, holdLabel: 'FLEXIÓN MÁXIMA',
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', bands: [{ anchor: 'hL', to: 'aL' }, { anchor: 'hR', to: 'aL' }], keys: [
      { u: 0, ...SUP, lL: [8, 4, 10, 0], lR: [0, 2, 20, 0], hL: [0.16, 0.42, 0.30], hR: [0.02, 0.42, 0.30], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
      { u: 1, ...SUP, lL: [88, 128, 10, 0], lR: [0, 2, 20, 0], hL: [0.16, 0.48, 0.12], hR: [0.02, 0.48, 0.12], eL: [0.5, 0, -1], eR: [-0.5, 0, -1], pL: [-1, 0, 0, 0, 1, 0], pR: [1, 0, 0, 0, 1, 0] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, banda alrededor del pie y extremos en las manos',
      reps: [
        ['Tira de la banda para doblar la rodilla más allá de lo que llegas solo', 'Mantén 2 s y estira la pierna'],
        ['El talón se acerca al glúteo', 'Tirón suave y progresivo'],
        ['10–15 repeticiones', 'Sin dolor intenso'],
      ],
      orbit: ['Flexión máxima', 'Movilidad de rodilla: músculos que trabajan', 'Estira despacio'],
    },
  },
  'MO-ROD-005': {
    ...like('TI-MOV-007', {}), ...ROD, family: 'squat', primary: ['Cuádriceps', 'Movilidad de cadera'], secondary: ['Gastrocnemio y sóleo', 'Aductores'], name: 'Movilidad de rodilla en sentadilla profunda asistida', level: 'Intermedio',
    captions: {
      intro: 'De pie frente a un apoyo, pies algo más abiertos que la cadera',
      reps: [
        ['Baja a sentadilla profunda ayudándote del apoyo', 'Rodillas dobladas al máximo cómodo'],
        ['Mantén 20–30 s abajo respirando', 'Talones en el suelo si puedes'],
        ['Sube despacio usando las manos', 'Sin dolor en las rodillas'],
      ],
      orbit: ['Sentadilla profunda', 'Movilidad de rodilla: músculos que trabajan', 'Sube despacio'],
    },
  },
  'MO-ROD-006': {
    ...like('TI-ERO-007', {}), ...ROD, primary: ['Cuádriceps'], secondary: ['Isquiotibiales'], name: 'Deslizamiento tibiofemoral con banda', level: 'Intermedio',
    tempo: { down: 2, pause: 1, up: 2 },
    cfg: { free: { ...EXERCISES['TI-ERO-007'].cfg.free, ankleWeight: false, kneeB: 100, kneeT: 30 } },
    captions: {
      intro: 'Sentado, banda anclada detrás rodeando la parte alta de la tibia',
      reps: [
        ['La banda tira de la tibia mientras estiras la rodilla', 'Movimiento lento y controlado'],
        ['Mantén 2 s al final del recorrido', 'Muslo apoyado en el asiento'],
        ['10–15 repeticiones', 'Sin dolor durante el deslizamiento'],
      ],
      orbit: ['Rodilla estirada', 'Movilidad de rodilla: músculos que trabajan', 'Dobla despacio'],
    },
  },
  'MO-ROD-007': {
    ...like('TI-PRE-001', {}), ...ROD, family: 'squat', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Glúteo medio', 'Gastrocnemio y sóleo'], name: 'Movilidad de rodilla en descenso controlado (step down)', level: 'Intermedio',
    captions: {
      intro: 'De pie sobre un escalón bajo con una pierna',
      reps: [
        ['Baja el otro pie hacia el suelo doblando la rodilla de apoyo', 'Toca con el talón y sube'],
        ['Rodilla alineada con el pie, sin irse hacia dentro', 'Movimiento lento'],
        ['10–12 repeticiones por pierna', 'Aumenta la altura poco a poco'],
      ],
      orbit: ['Rodilla doblada', 'Movilidad de rodilla: músculos que trabajan', 'Sube despacio'],
    },
  },
  'MO-ROD-008': {
    ...like('TI-MOV-009', {}), ...ROD, primary: ['Isquiotibiales', 'Cuádriceps'], secondary: ['Tibial anterior'], name: 'Rotación interna/externa de tibia sentado', level: 'Principiante',
    captions: {
      intro: 'Sentado, rodilla doblada a 90° y pie apoyado',
      reps: [
        ['Gira el pie hacia dentro y hacia fuera desde la rodilla', 'El muslo no se mueve'],
        ['Movimiento lento y en todo el rango', 'Talón como eje del giro'],
        ['15–20 repeticiones por pierna', 'Sin dolor'],
      ],
      orbit: ['Rotación', 'Movilidad de rodilla: músculos que trabajan', 'Gira al otro lado'],
    },
  },
  'MO-ROD-009': {
    ...ROD, primary: ['Cuádriceps'], secondary: ['Isquiotibiales'], name: 'Movilidad de rodilla en decúbito prono (prone knee bend)', level: 'Principiante',
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: { BAJADA: 'DOBLA', SUBIDA: 'ESTIRA', ARRIBA: 'PIERNA ESTIRADA' }, holdLabel: 'TALÓN AL GLÚTEO',
    frame: { dist: 4.0, ty: 0.30, tz: 0.10, distLow: 3.6, tyLow: 0.30 }, views: { f34: { az: -60, el: 18 }, side: { az: -90, el: 8 }, front: { az: -30, el: 20 }, back34: { az: -140, el: 26 } },
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, P: [0, 0.12, 0], rot: [88, 0, 0], nk: [-20, 0], lL: [0, 2, 40, 0], lR: [0, 2, 40, 0], hL: [0.16, 0.06, 0.62], hR: [-0.16, 0.06, 0.62], eL: [0.6, 0, -0.3], eR: [-0.6, 0, -0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
      { u: 1, P: [0, 0.12, 0], rot: [88, 0, 0], nk: [-20, 0], lL: [-4, 128, 20, 0], lR: [0, 2, 40, 0], hL: [0.16, 0.06, 0.62], hR: [-0.16, 0.06, 0.62], eL: [0.6, 0, -0.3], eR: [-0.6, 0, -0.3], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] },
    ] }, items: [{ kind: 'mat', z: -0.05, l: 1.9 }] },
    captions: {
      intro: 'Boca abajo, piernas estiradas y frente sobre las manos',
      reps: [
        ['Dobla una rodilla llevando el talón hacia el glúteo', 'Baja despacio hasta estirar'],
        ['La cadera queda pegada al suelo', 'Movimiento lento y completo'],
        ['10–15 repeticiones por pierna', 'Sin arquear la zona lumbar'],
      ],
      orbit: ['Talón al glúteo', 'Movilidad de rodilla: músculos que trabajan', 'Estira despacio'],
    },
  },
  'MO-ROD-010': {
    ...ROD, primary: ['Cuádriceps'], secondary: ['Flexores de cadera'], name: 'Estiramiento pasivo de cuádriceps de pie', level: 'Principiante',
    tempo: { down: 2, pause: 3, up: 2 }, phaseNames: { BAJADA: 'TALÓN AL GLÚTEO', SUBIDA: 'SUELTA', ARRIBA: 'DE PIE' }, holdLabel: 'ESTIRAMIENTO',
    frame: { dist: 4.4, ty: 1.0, tz: 0.0, distLow: 4.2, tyLow: 0.98 }, views: { f34: { az: -70, el: 10 }, side: { az: -90, el: 6 }, front: { az: -30, el: 10 }, back34: { az: -140, el: 14 } },
    cfg: { hands: ['open', 'grip'], free: { type: 'kfPose', relY: 'R', keys: [
      { u: 0, ...STAND, lL: [2, 4, 0, 0], hL: [0.22, 0.86, 0.04], hR: [-0.22, 0.86, 0.04], eL: [0.3, -1, -0.3], eR: [-0.3, -1, -0.3], pL: [-1, 0, 0, 0, -1, 0], pR: [1, 0, 0, 0, -1, 0] },
      { u: 1, ...STAND, lL: [-8, 140, 30, 0], hL: [0.14, 0.74, -0.24], eL: [0.4, -0.2, -1], pL: [0, 0, 1, 0, -1, 0], hR: [-0.40, 1.30, 0.10], eR: [-1, -0.5, 0], pR: [1, 0, 0, 0, 1, 0] },
    ] } },
    captions: {
      intro: 'De pie sobre una pierna, apoyo ligero en una pared si hace falta',
      reps: [
        ['Sujeta el tobillo y lleva el talón hacia el glúteo', 'Rodillas juntas y cadera adelante'],
        ['Mantén 20–30 s sin arquear la espalda', 'Respira y relaja el muslo'],
        ['Cambia de pierna', 'Sin dolor en la rodilla'],
      ],
      orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Suelta despacio'],
    },
  },
});
