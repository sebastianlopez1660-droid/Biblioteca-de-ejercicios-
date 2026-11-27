// Lote 38: escápula TS-ESC-009 … 013, abducción/aducción TI-ABD-001 … 003 y movilidad de hombro TS-MHO-001, 002
import { EXERCISES, GROUPS, ANCHORS } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { PUSH_FR } from './ex_lote21.js';
import { SIDE_VIEWS } from './ex_lote15.js';
import { plankKey, handsFloor, shoulderZ } from './ts_common.js';
import './groups_ts.js';
import './ex_lote37.js';

GROUPS['Movilidad de hombro'] = [...GROUPS['Manguito rotador'], 'deltoide_anterior', 'deltoide_medio', 'deltoide_posterior'];
ANCHORS['Movilidad de hombro'] = ANCHORS['Manguito rotador'];

const ESC = { family: 'free', sub: 'Escápula', primary: ['Serrato anterior', 'Romboides', 'Trapecio medio'], secondary: ['Manguito rotador', 'Core'], tempo: { down: 1.5, pause: 1, up: 1.5 },
  phaseNames: { BAJADA: 'ACTIVACIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'MANTÉN', labelAll: true };
const MHO = { family: 'free', sub: 'Movilidad de hombro', primary: ['Movilidad de hombro'], secondary: ['Manguito rotador'], tempo: { down: 2.5, pause: 0.5, up: 2.5 }, labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const FRONT_FR = { ...RAISE_FR, frame: { dist: 4.2, ty: 1.15, tz: 0.15, distLow: 4.0, tyLow: 1.10 } };
const HF = handsFloor(21);
const FW = (w) => ({ L: [w, ...plankKey(21).L.slice(1)], R: [-w, ...plankKey(21).R.slice(1)] });
const PK = plankKey(21);
const [SY, SZ] = shoulderZ(21);
// cuadrupedia (cabeza hacia +z)
const QUAD = { P: [0, 0.60, -0.05], rot: [90, 0, 0], nk: [-10, 0], lL: [90, 92, 0, 0], lR: [90, 92, 0, 0] };
const QH = { hL: [0.17, 0.035, 0.44], hR: [-0.17, 0.035, 0.44], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
const QUAD_FR = { frame: { dist: 4.0, ty: 0.48, tz: 0.15, distLow: 3.7, tyLow: 0.46 },
  views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 24 }, back34: { az: -140, el: 28 } }, orbit: { view: 'side', sweep: 150 } };
// sentado en máquina de abductores / aductores
const PAD = 0x3a3f45;
const seatAbd = (u, a) => {
  const r = a * Math.PI / 180, kx = 0.09 + 0.43 * Math.sin(r), kz = 0.43 * Math.cos(r);
  const out = (sx, d) => [sx * (kx + d * Math.cos(r)), 0, kz - d * Math.sin(r)];
  const pO = out(1, 0.075), pI = out(1, -0.075);
  return { u, P: [0, 0.545, -0.02], rot: [-6, 0, 0], nk: [6, 0], lL: [88, 92, 0, 0, a], lR: [88, 92, 0, 0, a],
    hL: [0.25, 0.52, 0.06], hR: [-0.25, 0.52, 0.06], eL: [0.4, 0, -1], eR: [-0.4, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1],
    oL0: [pO[0], 0.49, pO[2]], oL1: [pO[0], 0.64, pO[2]], oR0: [-pO[0], 0.49, pO[2]], oR1: [-pO[0], 0.64, pO[2]],
    iL0: [pI[0], 0.49, pI[2]], iL1: [pI[0], 0.64, pI[2]], iR0: [-pI[0], 0.49, pI[2]], iR1: [-pI[0], 0.64, pI[2]] };
};
const padRods = (k) => ['L', 'R'].map((sd) => ({ from: `K:${k}${sd}0`, to: `K:${k}${sd}1`, r: 0.048, color: PAD }));
const SEAT_FR = { frame: { dist: 3.9, ty: 0.70, tz: 0.15, distLow: 3.6, tyLow: 0.68 },
  views: { f34: { az: -35, el: 26 }, side: { az: -80, el: 14 }, front: { az: -5, el: 34 }, back34: { az: 150, el: 30 } }, orbit: { view: 'front', sweep: 120 } };

Object.assign(EXERCISES, {
  'TS-ESC-009': {
    ...EXERCISES['TS-ESC-001'], name: 'Push-up plus con banda de resistencia', level: 'Avanzado',
    cfg: { hands: ['open', 'open'], free: { ...EXERCISES['TS-ESC-001'].cfg.free,
      keys: EXERCISES['TS-ESC-001'].cfg.free.keys.map((k, i) => ({ ...k, bL: [0.25, SY + 0.07 + i * 0.03, SZ - 0.02], bR: [-0.25, SY + 0.07 + i * 0.03, SZ - 0.02] })),
      bands: [{ anchor: 'hL', to: 'K:bL' }, { anchor: 'K:bL', to: 'K:bR' }, { anchor: 'K:bR', to: 'hR' }] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con una banda por la espalda sujeta bajo las manos',
      reps: [
        ['Empuja el suelo contra la banda y separa las escápulas', 'Vuelve juntándolas despacio'],
        ['Los codos no se doblan', 'Cadera y abdomen firmes'],
        ['La banda añade resistencia al final del empuje', 'Movimiento corto y controlado'],
      ],
      orbit: ['Separa las escápulas', 'Protracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-ESC-010': {
    ...ESC, ...PUSH_FR, primary: ['Serrato anterior', 'Manguito rotador'], secondary: ['Core', 'Oblicuos'], name: 'Estabilización escapular en apoyo unilateral', level: 'Avanzado',
    tempo: { down: 1.5, pause: 2, up: 1.5 }, phaseNames: { BAJADA: 'BRAZO AL FRENTE', SUBIDA: 'APOYA', ARRIBA: 'DOS APOYOS' }, holdLabel: 'UN SOLO APOYO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [
        { u: 0, ...PK, ...FW(0.20), ...HF },
        { u: 1, ...PK, P: [PK.P[0] - 0.02, PK.P[1], PK.P[2]], rot: [69, 0, -3], ...FW(0.20), ...HF,
          hL: [0.24, SY + 0.02, SZ + 0.58], eL: [1, -0.3, 0], pL: [-1, 0, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con los pies algo separados',
      reps: [
        ['Despega una mano y llévala al frente', 'Mantén 2 s y apoya'],
        ['La cadera no rota ni cae hacia un lado', 'Empuja el suelo con la mano de apoyo'],
        ['Alterna los brazos', 'Abdomen firme durante todo el ejercicio'],
      ],
      orbit: ['Un solo apoyo', 'Estabilidad: músculos que trabajan', 'Mantén el cuerpo quieto'],
    },
  },
  'TS-ESC-011': {
    ...ESC, ...QUAD_FR, primary: ['Trapecio inferior', 'Serrato anterior'], secondary: ['Core', 'Deltoides anterior'], name: 'Elevación de brazo en cuadrupedia (bird dog superior)', level: 'Avanzado',
    tempo: { down: 1.5, pause: 1.5, up: 1.5 }, phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'CUADRUPEDIA' }, holdLabel: 'BRAZO ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [{ u: 0, ...QUAD, ...QH }, { u: 1, ...QUAD, rot: [90, 0, -2], ...QH, hL: [0.20, 0.66, 1.08], eL: [1, -0.4, 0], pL: [-1, 0, 0, 0, 0.3, 1] }] },
      items: [{ kind: 'mat', z: 0.10, l: 1.6 }] },
    captions: {
      intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
      reps: [
        ['Eleva un brazo al frente con el pulgar hacia arriba', 'Mantén 1–2 s y baja'],
        ['La espalda no se mueve ni rota', 'Empuja el suelo con la mano de apoyo'],
        ['Alterna los brazos', 'Brazo a la altura de la oreja'],
      ],
      orbit: ['Brazo arriba', 'Elevación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-ESC-012': {
    ...ESC, ...PUSH_FR, primary: ['Serrato anterior', 'Core'], secondary: ['Oblicuos', 'Manguito rotador', 'Deltoides anterior'], name: 'Plancha con toque de hombro (shoulder taps)', level: 'Avanzado',
    tempo: { down: 0.8, pause: 0.4, up: 0.8 }, phaseNames: { BAJADA: 'TOQUE', SUBIDA: 'APOYA', ARRIBA: 'PLANCHA' }, holdLabel: 'TOCA EL HOMBRO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: [
        { u: 0, ...PK, ...FW(0.18), ...HF },
        { u: 1, ...PK, rot: [69, 0, -2], ...FW(0.18), ...HF,
          hL: [-0.16, SY - 0.05, SZ + 0.06], eL: [1, -0.6, 0.2], pL: [0, -0.3, -1, -1, 0, 0] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión, pies algo separados',
      reps: [
        ['Toca el hombro contrario con una mano', 'Apoya y cambia de mano'],
        ['La cadera no se balancea de lado a lado', 'Abdomen y glúteos firmes'],
        ['Ritmo controlado, sin prisa', 'Separa más los pies para facilitarlo'],
      ],
      orbit: ['Toca el hombro', 'Estabilidad: músculos que trabajan', 'Cadera quieta'],
    },
  },
  'TS-ESC-013': {
    ...ESC, ...FRONT_FR, primary: ['Serrato anterior', 'Manguito rotador'], secondary: ['Deltoides', 'Core'], name: 'Estabilización escapular con balón medicinal contra pared', level: 'Avanzado',
    tempo: { down: 2.5, pause: 0, up: 2.5 }, phaseNames: { BAJADA: 'CÍRCULOS', SUBIDA: 'CÍRCULOS', ARRIBA: 'BALÓN EN EL CENTRO' }, holdLabel: 'PRESIÓN CONSTANTE',
    views: { f34: { az: -110, el: 14 }, side: { az: -90, el: 8 }, front: { az: -130, el: 12 }, back34: { az: -160, el: 18 } }, orbit: { view: 'side', sweep: 90 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', ball: { r: 0.11 }, ballAt: 'K:bp',
      keys: (() => {
        const C = (dx, dy) => ({ ...STAND, rot: [5, 0, 0], hL: [0.20 + dx, 1.40 + dy, 0.52], eL: [0.5, -1, 0], pL: [0, 0, 1, 0, 1, 0], bp: [0.20 + dx, 1.42 + dy, 0.66], aR: [6, 8, 8] });
        return [{ u: 0, ...C(0, 0) }, { u: 0.25, ...C(0.07, 0.07) }, { u: 0.5, ...C(0, 0.10) }, { u: 0.75, ...C(-0.07, 0.05) }, { u: 1, ...C(0, 0) }];
      })() },
      items: [{ kind: 'wall', flip: true, z: 0.77, w: 1.1, h: 2.0 }] },
    captions: {
      intro: 'De pie frente a la pared, brazo estirado presionando un balón a la altura del hombro',
      reps: [
        ['Dibuja círculos pequeños con el balón sin dejar de presionar', 'Cambia de sentido cada pocas vueltas'],
        ['El brazo queda estirado', 'Hombro abajo, lejos de la oreja'],
        ['Círculos pequeños y controlados', '20–30 s por brazo'],
      ],
      orbit: ['Presiona el balón', 'Estabilidad: músculos que trabajan', 'Sigue con círculos pequeños'],
    },
  },
  'TI-ABD-001': {
    family: 'free', sub: 'Abductores', primary: ['Glúteo medio'], secondary: ['Glúteos'], name: 'Abducción de cadera en máquina', level: 'Principiante', ...SEAT_FR,
    tempo: { down: 1.5, pause: 1, up: 2 }, phaseNames: { BAJADA: 'APERTURA', SUBIDA: 'CIERRE', ARRIBA: 'PIERNAS JUNTAS' }, holdLabel: 'APERTURA MÁXIMA', labelAll: true,
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', rods: padRods('o'), keys: [seatAbd(0, 2), seatAbd(1, 34)] }, items: [{ kind: 'seatMachine', seatY: 0.47, recline: 6 }] },
    captions: {
      intro: 'Sentado en la máquina, espalda apoyada y almohadillas por fuera de las rodillas',
      reps: [
        ['Abre las piernas empujando las almohadillas hacia fuera', 'Cierra en 2 s sin dejar que el peso choque'],
        ['La espalda no se despega del respaldo', 'Sujeta las asas para estabilizarte'],
        ['Aprieta 1 s en la apertura máxima', 'Recorrido completo y sin impulso'],
      ],
      orbit: ['Abre las piernas', 'Apertura máxima: músculos que trabajan', 'Cierra controlando'],
    },
  },
  'TI-ABD-002': {
    family: 'free', sub: 'Aductores', primary: ['Aductores'], secondary: [], name: 'Aducción de cadera en máquina', level: 'Principiante', ...SEAT_FR,
    tempo: { down: 1.5, pause: 1, up: 2 }, phaseNames: { BAJADA: 'CIERRE', SUBIDA: 'APERTURA', ARRIBA: 'PIERNAS ABIERTAS' }, holdLabel: 'PIERNAS JUNTAS', labelAll: true,
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', rods: padRods('i'), keys: [seatAbd(0, 36), seatAbd(1, 3)] }, items: [{ kind: 'seatMachine', seatY: 0.47, recline: 6 }] },
    captions: {
      intro: 'Sentado en la máquina, espalda apoyada y almohadillas por dentro de las rodillas',
      reps: [
        ['Junta las piernas apretando las almohadillas', 'Abre en 2 s controlando el peso'],
        ['La espalda no se despega del respaldo', 'Sujeta las asas para estabilizarte'],
        ['Aprieta 1 s con las piernas juntas', 'Apertura cómoda, sin forzar'],
      ],
      orbit: ['Junta las piernas', 'Contracción máxima: músculos que trabajan', 'Abre controlando'],
    },
  },
  'TI-ABD-003': {
    family: 'free', sub: 'Abductores', primary: ['Glúteo medio'], secondary: ['Glúteos', 'Core'], name: 'Abducción de cadera acostado con mancuerna', level: 'Principiante', labelAll: true,
    tempo: { down: 1.5, pause: 1, up: 2 }, phaseNames: { BAJADA: 'ELEVACIÓN', SUBIDA: 'BAJADA', ARRIBA: 'PIERNAS JUNTAS' }, holdLabel: 'PIERNA ARRIBA', views: SIDE_VIEWS,
    frame: { dist: 3.8, ty: 0.30, tz: 0.0, distLow: 3.4, tyLow: 0.30 },
    cfg: { free: { type: 'sideLying', down: 'L', mode: 'abd', abd: 36, flex: 30, knee: 70, hold: 'db', holdSides: ['R'], dbK: 0.8, dbThigh: true },
      items: [{ kind: 'mat', z: 0.0, x: -0.05, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Tumbado de lado, pierna de abajo flexionada y mancuerna apoyada sobre el muslo de arriba',
      reps: [
        ['Eleva la pierna de arriba estirada', 'Baja en 2 s sin apoyarla del todo'],
        ['El pie apunta al frente, no hacia el techo', 'La pelvis no rota hacia atrás'],
        ['Sujeta la mancuerna con la mano de arriba', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Pierna arriba', 'Elevación máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-MHO-001': {
    ...MHO, ...FRONT_FR, secondary: ['Deltoides', 'Manguito rotador'], name: 'Círculos de brazo (arm circles)', level: 'Principiante', tempo: { down: 2, pause: 0, up: 2 },
    phaseNames: { BAJADA: 'CÍRCULOS HACIA DELANTE', SUBIDA: 'CÍRCULOS HACIA ATRÁS', ARRIBA: 'BRAZOS EN CRUZ' }, holdLabel: 'BRAZOS EN CRUZ',
    views: { f34: { az: -35, el: 12 }, side: { az: -90, el: 6 }, front: { az: -5, el: 10 }, back34: { az: -150, el: 16 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L',
      keys: (() => {
        const C = (a) => { const r = a * Math.PI / 180, y = 1.44 + 0.13 * Math.sin(r), z = 0.13 * Math.cos(r);
          return { ...STAND, hL: [0.82, y, z], hR: [-0.82, y, z], eL: [0, -1, 0], eR: [0, -1, 0], pL: [0, -1, 0, 1, 0, 0], pR: [0, -1, 0, -1, 0, 0] }; };
        return [0, 90, 180, 270, 360, 450, 540].map((a, i) => ({ u: i / 6, ...C(a) }));
      })() } },
    captions: {
      intro: 'De pie, brazos estirados en cruz a la altura de los hombros',
      reps: [
        ['Dibuja círculos pequeños hacia delante', 'Luego cambia el sentido hacia atrás'],
        ['Brazos estirados y hombros abajo', 'Aumenta poco a poco el tamaño de los círculos'],
        ['Ritmo suave y continuo', '15–20 s en cada sentido'],
      ],
      orbit: ['Brazos en cruz', 'Movilidad: zona que trabaja', 'Sigue con círculos suaves'],
    },
  },
  'TS-MHO-002': {
    ...MHO, ...FRONT_FR, secondary: ['Pectoral', 'Deltoides anterior'], name: 'Movilidad de hombro con bastón (shoulder CARs con palo)', level: 'Principiante', tempo: { down: 3, pause: 0.5, up: 3 },
    phaseNames: { BAJADA: 'PASA HACIA ATRÁS', SUBIDA: 'VUELVE AL FRENTE', ARRIBA: 'BASTÓN DELANTE' }, holdLabel: 'BASTÓN DETRÁS',
    views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -15, el: 10 }, back34: { az: -150, el: 14 } },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.78, plates: 0 },
      keys: [
        { u: 0, ...STAND, hL: [0.58, 0.98, 0.30], hR: [-0.58, 0.98, 0.30], eL: [1, 0, 0], eR: [-1, 0, 0], pL: [0, -1, 0, 1, 0, 0], pR: [0, -1, 0, -1, 0, 0] },
        { u: 0.5, ...STAND, hL: [0.60, 2.04, 0.0], hR: [-0.60, 2.04, 0.0], eL: [1, 0, 0], eR: [-1, 0, 0], pL: [0, 0, 1, 1, 0, 0], pR: [0, 0, 1, -1, 0, 0] },
        { u: 1, ...STAND, hL: [0.62, 1.12, -0.36], hR: [-0.62, 1.12, -0.36], eL: [1, 0, 0], eR: [-1, 0, 0], pL: [0, 1, 0, 1, 0, 0], pR: [0, 1, 0, -1, 0, 0] }] } },
    captions: {
      intro: 'De pie, bastón sujeto con agarre muy abierto delante de la cadera',
      reps: [
        ['Pasa el bastón por encima de la cabeza hasta detrás', 'Vuelve al frente por el mismo camino'],
        ['Brazos estirados todo el tiempo', 'Si los codos se doblan, abre más el agarre'],
        ['Movimiento lento y sin dolor', 'Abdomen firme: la espalda no se arquea'],
      ],
      orbit: ['Bastón detrás', 'Movilidad: zona que trabaja', 'Vuelve al frente despacio'],
    },
  },
});
