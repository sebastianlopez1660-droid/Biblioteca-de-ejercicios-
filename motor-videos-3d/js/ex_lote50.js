// Lote 50: core dinámico CO-CDI-006 … 010 y core estático CO-CES-001 … 005
import { EXERCISES } from './exercises.js';
import { plankKey, handsFloor } from './ts_common.js';
import { CDI } from './ex_lote49.js';

export const CES = { family: 'free', sub: 'Core estático', primary: ['Recto abdominal', 'Transverso abdominal', 'Oblicuos'], secondary: ['Glúteos', 'Erectores espinales'], labelAll: true };
const ISO = { iso: true, tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const HF = handsFloor(21);
const FW = (w) => ({ L: [w, ...plankKey(21).L.slice(1)], R: [-w, ...plankKey(21).R.slice(1)] });
const PK = { ...plankKey(21), ...FW(0.12) };
const PUSH_FR = { frame: { dist: 4.4, ty: 0.42, tz: 0.15, distLow: 4.0, tyLow: 0.38 },
  views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 22 }, back34: { az: -140, el: 26 } }, orbit: { view: 'side', sweep: 160 } };
const SUP_FR = { frame: { dist: 3.9, ty: 0.32, tz: 0.0, distLow: 3.6, tyLow: 0.32 },
  views: { f34: { az: 55, el: 20 }, side: { az: 90, el: 8 }, front: { az: 25, el: 26 }, back34: { az: 140, el: 26 } }, orbit: { view: 'side', sweep: 140 } };
const MAT = [{ kind: 'mat', z: 0.0, l: 1.9 }];
// gira una clave un ángulo a (grados) alrededor del eje vertical
const POS = ['P', 'L', 'R', 'hL', 'hR', 'kL', 'kR', 'eL', 'eR'];
function rotY(k, a) {
  const r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
  const tv = (x, z) => [x * c + z * s, -x * s + z * c];
  const o = { ...k };
  for (const n of POS) if (o[n]) { const v = [...o[n]]; [v[0], v[2]] = tv(v[0], v[2]); if ((n === 'L' || n === 'R') && v.length > 4) v[4] = v[4] + a; o[n] = v; }
  for (const n of ['pL', 'pR']) if (o[n]) { const v = [...o[n]]; [v[0], v[2]] = tv(v[0], v[2]); [v[3], v[5]] = tv(v[3], v[5]); o[n] = v; }
  o.rot = [(k.rot || [0, 0, 0])[0], (k.rot || [0, 0, 0])[1] + a, (k.rot || [0, 0, 0])[2]];
  return o;
}
const rot180 = (k) => rotY(k, 180);

Object.assign(EXERCISES, {
  'CO-CDI-006': {
    ...CDI, primary: ['Oblicuos', 'Deltoides', 'Transverso abdominal'], secondary: ['Antebrazo', 'Glúteos', 'Cuádriceps'], name: 'Battle ropes con rotación de tronco', level: 'Intermedio',
    tempo: { down: 0.5, pause: 0, up: 0.5 }, phaseNames: { BAJADA: 'ONDA', SUBIDA: 'ONDA', ARRIBA: 'POSICIÓN ATLÉTICA' }, holdLabel: 'ONDA',
    frame: { dist: 4.8, ty: 0.85, tz: 0.50, distLow: 4.5, tyLow: 0.80 }, views: { f34: { az: -50, el: 14 }, side: { az: -90, el: 6 }, front: { az: -20, el: 14 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 140 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', alt: true,
      rods: [{ from: [0.16, 0.06, 2.4], to: 'hL', r: 0.02, color: 0x2c2f33 }, { from: [-0.16, 0.06, 2.4], to: 'hR', r: 0.02, color: 0x2c2f33 }],
      keys: (() => {
        const B = { P: [0, -0.14, -0.06], rot: [16, 0, 0], nk: [-10, 0], L: [0.22, 0.08, 0.05, 0, 14], R: [-0.22, 0.08, 0.05, 0, -14], kL: [0.3, 0.2, 1], kR: [-0.3, 0.2, 1], eL: [0.6, -1, -0.2], eR: [-0.6, -1, -0.2], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] };
        return [{ u: 0, ...B, rot: [16, -12, 0], sp: [0, -12, 0], hL: [0.14, 1.02, 0.46], hR: [-0.28, 0.62, 0.42] }, { u: 1, ...B, rot: [16, 12, 0], sp: [0, 12, 0], hL: [0.28, 0.62, 0.42], hR: [-0.14, 1.02, 0.46] }];
      })() },
      items: [{ kind: 'post', h: 0.12, z: 2.4 }] },
    captions: {
      intro: 'Postura atlética con un extremo de cuerda en cada mano',
      reps: [
        ['Haz ondas alternas girando el tronco hacia cada lado', 'La rotación nace de la cadera y el tronco'],
        ['Rodillas flexionadas y espalda recta', 'Pies firmes en el suelo'],
        ['Ritmo rápido y constante', 'Series de 20–30 s'],
      ],
      orbit: ['Sigue con las ondas', 'Core dinámico: músculos que trabajan', 'Ritmo constante'],
    },
  },
  'CO-CDI-007': {
    ...CDI, ...PUSH_FR, secondary: ['Flexores de cadera', 'Deltoides', 'Cuádriceps'], name: 'Plancha con salto de rodillas al pecho (plank jack)', level: 'Avanzado',
    tempo: { down: 0.6, pause: 0.2, up: 0.6 }, phaseNames: { BAJADA: 'SALTO AL PECHO', SUBIDA: 'SALTO ATRÁS', ARRIBA: 'PLANCHA' }, holdLabel: 'RODILLAS AL PECHO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [{ u: 0, ...PK, ...HF }, { u: 0.5, ...PK, P: [PK.P[0], PK.P[1] + 0.12, PK.P[2] + 0.08], rot: [80, 0, 0], ...HF, L: [0.13, 0.30, -0.40, 50, 6], R: [-0.13, 0.30, -0.40, 50, -6], kL: [0, -1, 0.5], kR: [0, -1, 0.5] },
        { u: 1, P: [PK.P[0], PK.P[1] + 0.06, PK.P[2] + 0.10], rot: [92, 0, 0], sp: [18, 0, 0], nk: [-20, 0], ...HF, L: [0.15, 0.10, -0.12, 45, 8], R: [-0.15, 0.10, -0.12, 45, -8], kL: [0.2, -1, 0.6], kR: [-0.2, -1, 0.6] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con las manos bajo los hombros',
      reps: [
        ['Salta llevando las dos rodillas hacia el pecho', 'Vuelve saltando a la plancha'],
        ['Hombros sobre las manos en todo momento', 'Aterriza suave con la punta de los pies'],
        ['Abdomen firme al volver: la cadera no cae', 'Ritmo controlado'],
      ],
      orbit: ['Rodillas al pecho', 'Core dinámico: músculos que trabajan', 'Vuelve a la plancha'],
    },
  },
  'CO-CDI-008': {
    ...like('CO-ROT-006', {}), ...CDI, primary: ['Oblicuos', 'Recto abdominal'], secondary: ['Flexores de cadera', 'Transverso abdominal'], name: 'Giro ruso dinámico con balón medicinal', level: 'Avanzado',
    tempo: { down: 0.7, pause: 0.1, up: 0.7 },
    captions: {
      intro: 'Sentado con el tronco inclinado atrás, pies despegados y balón medicinal al frente',
      reps: [
        ['Gira rápido de lado a lado tocando el suelo con el balón', 'Mantén los pies en el aire'],
        ['La velocidad no rompe la postura: espalda recta', 'Piernas quietas'],
        ['Series de 20–30 s', 'Exhala en cada giro'],
      ],
      orbit: ['Giro rápido', 'Core dinámico: músculos que trabajan', 'Sigue el ritmo'],
    },
  },
  'CO-CDI-009': {
    ...like('CO-CDI-002', {}), name: 'Burpee con giro de 180°', level: 'Avanzado', tempo: { down: 1.8, pause: 0.3, up: 1.8 },
    phaseNames: { BAJADA: 'SALTO CON GIRO Y PLANCHA', SUBIDA: 'SUBE Y SALTA GIRANDO', ARRIBA: 'DE PIE' }, holdLabel: 'PLANCHA',
    orbit: { view: 'f34', sweep: 120 },
    cfg: { ...EXERCISES['CO-CDI-002'].cfg, free: (() => {
      const f = EXERCISES['CO-CDI-002'].cfg.free, [st, sq, pl] = f.keys;
      const air = (a) => rotY({ P: [0, 1.12, 0], rot: [0, 0, 0], nk: [4, 0], L: [0.13, 0.28, 0.02, 40, 8], R: [-0.13, 0.28, 0.02, 40, -8], aL: [170, 14, 6], aR: [170, 14, 6] }, a);
      return { type: 'kfPose', keys: [{ ...st, u: 0 }, { ...air(90), u: 0.25 }, { ...rot180(st), u: 0.42 }, { ...rot180(sq), u: 0.7 }, { ...rot180(pl), u: 1 }] };
    })() },
    captions: {
      intro: 'De pie con los pies a la anchura de la cadera',
      reps: [
        ['Salta girando media vuelta y baja a plancha', 'Sube, recoge los pies y salta girando de vuelta'],
        ['Aterriza suave antes de bajar', 'En la plancha: abdomen firme'],
        ['Controla el giro con el tronco y los brazos', 'Ritmo constante'],
      ],
      orbit: ['Plancha', 'Core dinámico: músculos que trabajan', 'Salta girando'],
    },
  },
  'CO-CDI-010': {
    ...CDI, ...PUSH_FR, primary: ['Oblicuos', 'Recto abdominal'], secondary: ['Flexores de cadera', 'Deltoides'], name: 'Escalador con rotación de cadera (cross-body mountain climber)', level: 'Avanzado',
    tempo: { down: 0.6, pause: 0.15, up: 0.6 }, phaseNames: { BAJADA: 'RODILLA CRUZADA', SUBIDA: 'PIERNA ATRÁS', ARRIBA: 'PLANCHA' }, holdLabel: 'RODILLA AL CODO CONTRARIO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true, keys: [{ u: 0, ...PK, ...HF }, { u: 1, ...PK, rot: [69, 0, -6], sp: [4, -10, 0], ...HF, L: [-0.10, 0.24, -0.14, 30, -30], kL: [-1, -0.6, 0.3] }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Posición alta de flexión con las manos bajo los hombros',
      reps: [
        ['Lleva la rodilla hacia el codo contrario', 'Cambia de pierna rápido'],
        ['La cadera gira un poco pero no sube', 'Hombros sobre las manos'],
        ['Ritmo rápido y controlado', 'Series de 20–40 s'],
      ],
      orbit: ['Rodilla cruzada', 'Core dinámico: músculos que trabajan', 'Sigue el ritmo'],
    },
  },
  'CO-CES-001': { ...like('CO-AEX-001', {}), ...CES, ...ISO, name: 'Plancha abdominal isométrica (sostén prolongado)', level: 'Principiante' },
  'CO-CES-002': { ...like('CO-AIN-001', {}), ...CES, ...ISO, primary: ['Oblicuos', 'Cuadrado lumbar'], secondary: ['Glúteo medio', 'Transverso abdominal'], name: 'Plancha lateral isométrica', level: 'Principiante' },
  'CO-CES-003': {
    ...CES, ...SUP_FR, ...ISO, secondary: ['Flexores de cadera', 'Cuádriceps'], name: 'Hollow body hold', level: 'Principiante',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: (() => { const k = { P: [0, 0.115, 0.0], rot: [-90, 0, 0], sp: [22, 0, 0], nk: [16, 0], lL: [24, 2, 30, 0], lR: [24, 2, 30, 0], aL: [160, 8, 6], aR: [160, 8, 6], pL: [0, 1, 0, 0, 0, -1], pR: [0, 1, 0, 0, 0, -1] };
        return [{ u: 0, ...k }, { u: 1, ...k }]; })() },
      items: MAT },
    captions: {
      intro: 'Boca arriba con brazos estirados atrás y piernas estiradas',
      reps: [
        ['Despega hombros y piernas del suelo: el cuerpo forma una barca', 'La zona lumbar pegada al suelo'],
        ['Cuanto más bajas las piernas, más difícil', 'Respira sin perder la posición'],
        ['Regresión: rodillas flexionadas o brazos al lado', 'Series de 15–30 s'],
      ],
      orbit: ['Mantén la barca', 'Isometría: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-CES-004': {
    ...CES, ...SUP_FR, ...ISO, secondary: ['Flexores de cadera', 'Deltoides anterior'], name: 'Dead bug isométrico (posición sostenida)', level: 'Intermedio',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: (() => { const k = { P: [0, 0.115, 0.0], rot: [-90, 0, 0], sp: [4, 0, 0], nk: [6, 0], lL: [18, 4, 30, 0], lR: [90, 90, 20, 0], aL: [90, 6, 4], aR: [168, 8, 4], pL: [-1, 0, 0, 0, 1, 0], pR: [0, 1, 0, 0, 0, -1] };
        return [{ u: 0, ...k }, { u: 1, ...k }]; })() },
      items: MAT },
    captions: {
      intro: 'Boca arriba: un brazo estirado atrás y la pierna contraria estirada cerca del suelo',
      reps: [
        ['Mantén la posición con la zona lumbar pegada al suelo', 'El otro brazo vertical y la otra rodilla a 90°'],
        ['Abdomen activo: la espalda no se arquea', 'Respira de forma continua'],
        ['Cambia de lado en la siguiente serie', 'Series de 15–30 s'],
      ],
      orbit: ['Mantén la posición', 'Isometría: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-CES-005': {
    ...CES, ...ISO, primary: ['Recto abdominal', 'Flexores de cadera', 'Tríceps'], secondary: ['Cuádriceps', 'Deltoides', 'Serrato anterior'], name: 'L-sit', level: 'Intermedio',
    frame: { dist: 3.8, ty: 0.42, tz: 0.15, distLow: 3.5, tyLow: 0.40 }, views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 6 }, front: { az: -25, el: 16 }, back34: { az: -140, el: 20 } }, orbit: { view: 'side', sweep: 140 },
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', hold: 'grip',
      keys: (() => { const k = { P: [0, 0.44, -0.04], rot: [-6, 0, 0], sp: [8, 0, 0], nk: [0, 0], lL: [88, 2, 25, 0], lR: [88, 2, 25, 0], hL: [0.24, 0.26, 0.02], hR: [-0.24, 0.26, 0.02], eL: [0, 0, -1], eR: [0, 0, -1], pL: [0, 1, 0, 0, 0, 1], pR: [0, 1, 0, 0, 0, 1], shr: -0.02 };
        return [{ u: 0, ...k }, { u: 1, ...k }]; })() },
      items: [{ kind: 'box', h: 0.24, w: 0.06, d: 0.40, x: 0.25, z: 0.02 }, { kind: 'box', h: 0.24, w: 0.06, d: 0.40, x: -0.25, z: 0.02 }] },
    captions: {
      intro: 'Manos en paralelas bajas junto a la cadera, piernas estiradas al frente',
      reps: [
        ['Empuja hacia abajo y despega el cuerpo: piernas en horizontal', 'Mantén la posición respirando'],
        ['Hombros abajo, lejos de las orejas', 'Piernas juntas y rodillas estiradas'],
        ['Regresión: una pierna o rodillas flexionadas', 'Series de 10–20 s'],
      ],
      orbit: ['Mantén la L', 'Isometría: músculos que trabajan', 'Respira y aguanta'],
    },
  },
});
