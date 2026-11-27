// Lote 32: bíceps TS-BIC-001 … 010
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';

const BIC = { family: 'free', sub: 'Bíceps', primary: ['Bíceps'], secondary: ['Antebrazo'], tempo: { down: 1.5, pause: 0.5, up: 2.5 },
  phaseNames: { BAJADA: 'FLEXIÓN', SUBIDA: 'BAJADA', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'CONTRACCIÓN MÁXIMA', labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const SEATBOX = { P: [0, 0.545, -0.02], rot: [-4, 0, 0], L: [0.17, 0.08, 0.44, 0, 10], R: [-0.17, 0.08, 0.44, 0, -10], kL: [0.15, 1, 0.3], kR: [-0.15, 1, 0.3] };
const CURL_FR = { ...RAISE_FR, views: { f34: { az: -45, el: 10 }, side: { az: -85, el: 6 }, front: { az: -15, el: 8 }, back34: { az: 160, el: 14 } } };
const D = Math.PI / 180;
// palma supina / eje martillo para un codo flexionado e grados (antebrazo en el plano sagital)
const sup = (e) => [0, Math.sin(e * D), Math.cos(e * D)];
const PALM_SUP = (e) => [...sup(e)];
// clave de curl con brazos por ángulos: e = flexión del codo, f = flexión del hombro, mode 'sup' | 'ham'
function curlKey(u, e, { f = 4, abd = 8, mode = 'sup', base = STAND, sides = ['L', 'R'], extra = {} } = {}) {
  const k = { u, ...base, nk: [0, 0], ...extra };
  for (const sd of sides) {
    const sx = sd === 'L' ? 1 : -1;
    k['a' + sd] = [f, abd, e];
    k['p' + sd] = mode === 'sup' ? [...PALM_SUP(e + f), sx, 0, 0] : [-sx, 0, 0, ...sup(e + f)];
  }
  return k;
}
const curl = (e0, e1, o = {}) => [curlKey(0, e0, o), curlKey(1, e1, o)];

Object.assign(EXERCISES, {
  'TS-BIC-001': {
    ...BIC, ...CURL_FR, name: 'Curl de bíceps con barra', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', keys: curl(8, 140) } },
    captions: {
      intro: 'De pie, barra con agarre supino al ancho de hombros',
      reps: [
        ['Flexiona los codos y sube la barra hasta los hombros', 'Baja en 2–3 s hasta estirar los brazos'],
        ['Codos pegados al cuerpo y quietos', 'Sin balancear el tronco'],
        ['Aprieta el bíceps arriba 1 s', 'Muñecas rectas'],
      ],
      orbit: ['Barra arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-002': {
    ...BIC, ...CURL_FR, name: 'Curl de bíceps con mancuernas', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', keys: curl(8, 140) } },
    captions: {
      intro: 'De pie, una mancuerna en cada mano con las palmas al frente',
      reps: [
        ['Sube las mancuernas flexionando los codos', 'Baja en 2–3 s hasta estirar los brazos'],
        ['Codos pegados al cuerpo', 'Sin impulso del tronco'],
        ['Puedes alternar brazos', 'Aprieta arriba 1 s'],
      ],
      orbit: ['Mancuernas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-003': {
    ...BIC, ...CURL_FR, primary: ['Bíceps', 'Antebrazo'], secondary: [], name: 'Curl martillo (hammer curl)', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', keys: curl(8, 135, { mode: 'ham' }) } },
    captions: {
      intro: 'De pie, mancuernas a los lados con las palmas enfrentadas',
      reps: [
        ['Sube las mancuernas sin girar las muñecas', 'Baja en 2–3 s'],
        ['Pulgares hacia arriba todo el recorrido', 'Codos pegados al cuerpo'],
        ['Trabaja también el braquial y el antebrazo', 'Sin balanceos'],
      ],
      orbit: ['Mancuernas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-004': {
    ...BIC, name: 'Curl en banco Scott (preacher curl)', level: 'Intermedio',
    frame: { dist: 4.4, ty: 1.00, tz: 0.15, distLow: 4.1, tyLow: 0.98 }, views: { f34: { az: -55, el: 12 }, side: { az: -90, el: 6 }, front: { az: -25, el: 12 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { free: { type: 'kfPose', hold: 'bar', keys: curl(12, 125, { f: 48, abd: 10, base: { ...SEATBOX, rot: [10, 0, 0] } }) }, items: [{ kind: 'preacher', padY: 0.98, padZ: 0.30 }] },
    captions: {
      intro: 'Sentado en el banco Scott, brazos apoyados sobre el cojín inclinado',
      reps: [
        ['Sube la barra flexionando los codos', 'Baja en 3 s casi hasta estirar'],
        ['Los brazos no se despegan del cojín', 'Sin impulso: el apoyo aísla el bíceps'],
        ['No bloquees los codos abajo', 'Aprieta arriba 1 s'],
      ],
      orbit: ['Barra arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-005': {
    ...BIC, name: 'Curl concentrado', level: 'Intermedio',
    frame: { dist: 4.2, ty: 0.85, tz: 0.15, distLow: 3.9, tyLow: 0.82 }, views: { f34: { az: -35, el: 14 }, side: { az: -80, el: 8 }, front: { az: -10, el: 14 }, back34: { az: 160, el: 18 } },
    cfg: { free: { type: 'kfPose', hold: 'db', keys: curl(10, 135, { f: 30, abd: -4, sides: ['L'], base: { ...SEATBOX, L: [0.26, 0.08, 0.44, 0, 20], R: [-0.26, 0.08, 0.44, 0, -20], rot: [30, 0, 0] },
      extra: { hR: [-0.24, 0.62, 0.40], eR: [-1, 0, -0.2], pR: [0, -1, 0, 0, 0, 1] } }) }, items: [{ kind: 'box', h: 0.47, w: 0.45, d: 0.40, z: -0.04 }] },
    captions: {
      intro: 'Sentado, tronco inclinado y codo apoyado en la cara interna del muslo',
      reps: [
        ['Sube la mancuerna hacia el hombro', 'Baja en 3 s hasta casi estirar'],
        ['El codo no se mueve del muslo', 'La otra mano apoyada en la rodilla'],
        ['Aprieta 1 s arriba', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Mancuerna arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-006': {
    ...BIC, ...CURL_FR, name: 'Curl en polea baja', level: 'Principiante', frame: { dist: 4.8, ty: 1.10, tz: 0.15, distLow: 4.5, tyLow: 1.05 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.40, plates: 0 }, rods: [{ from: [0, 0.15, 0.48], to: 'bar', r: 0.006, color: 0xb9bec4 }], keys: curl(8, 140) },
      items: [{ kind: 'post', h: 0.22, z: 0.50 }] },
    captions: {
      intro: 'De pie frente a la polea baja, barra corta con agarre supino',
      reps: [
        ['Flexiona los codos y sube la barra hasta los hombros', 'Baja en 2–3 s'],
        ['El cable mantiene la tensión también abajo', 'Codos pegados al cuerpo'],
        ['Sin balanceos', 'Aprieta arriba 1 s'],
      ],
      orbit: ['Barra arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-007': {
    ...BIC, ...CURL_FR, name: 'Curl con barra Z (EZ bar curl)', level: 'Intermedio',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'bar', barOpts: { half: 0.62, plates: 1 }, keys: curl(8, 138, { abd: 5 }) } },
    captions: {
      intro: 'De pie, barra Z con agarre en la parte angulada',
      reps: [
        ['Sube la barra flexionando los codos', 'Baja en 2–3 s'],
        ['El agarre semisupino es más cómodo para las muñecas', 'Codos pegados al cuerpo'],
        ['Sin balanceos', 'Aprieta arriba 1 s'],
      ],
      orbit: ['Barra arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-008': {
    ...BIC, ...CURL_FR, name: 'Curl 21 (técnica de rango parcial)', level: 'Avanzado', tempo: { down: 1.2, pause: 0.3, up: 1.5 },
    phaseNames: { BAJADA: 'FLEXIÓN', SUBIDA: 'BAJADA', ARRIBA: 'INICIO' },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'db', keys: curl(8, 140), repKeys: [curl(8, 80), curl(80, 140), curl(8, 140)] } },
    captions: {
      intro: 'De pie con una mancuerna en cada mano: 7 repeticiones por cada tramo',
      reps: [
        ['Tramo 1: de abajo hasta la mitad (codo a 90°)', 'Baja controlando'],
        ['Tramo 2: de la mitad hasta arriba', 'Sin bajar de los 90°'],
        ['Tramo 3: recorrido completo', '7 + 7 + 7 = 21 repeticiones'],
      ],
      orbit: ['Mancuernas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-009': {
    ...BIC, ...CURL_FR, name: 'Curl con banda elástica', level: 'Principiante',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'aL', hand: 'L' }, { anchor: 'aR', hand: 'R' }], keys: curl(8, 140) } },
    captions: {
      intro: 'De pie sobre la banda, extremos en las manos con las palmas al frente',
      reps: [
        ['Sube las manos hacia los hombros contra la banda', 'Baja en 2–3 s'],
        ['La tensión crece arriba: aprieta 1 s', 'Codos pegados al cuerpo'],
        ['Sin balanceos', 'Ajusta la tensión pisando más banda'],
      ],
      orbit: ['Manos arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TS-BIC-010': {
    ...BIC, name: 'Curl inclinado con mancuernas', level: 'Intermedio',
    frame: { dist: 4.4, ty: 0.85, tz: -0.10, distLow: 4.1, tyLow: 0.80 }, views: { f34: { az: -60, el: 14 }, side: { az: -90, el: 6 }, front: { az: -25, el: 16 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 150 },
    cfg: { free: { type: 'kfPose', hold: 'db', keys: curl(6, 130, { f: -38, abd: 10, base: { P: [0, 0.565, 0.02], rot: [-38, 0, 0], L: [0.26, 0.08, 0.50, 0, 14], R: [-0.26, 0.08, 0.50, 0, -14], kL: [0.25, 1, 0.1], kR: [-0.25, 1, 0.1] } }) },
      items: [{ kind: 'inclineBench', angle: 52 }] },
    captions: {
      intro: 'Sentado en un banco inclinado, brazos colgando por detrás del tronco',
      reps: [
        ['Sube las mancuernas sin adelantar los codos', 'Baja en 3 s hasta estirar los brazos'],
        ['La inclinación estira el bíceps al principio', 'Hombros apoyados en el respaldo'],
        ['Peso moderado', 'Aprieta arriba 1 s'],
      ],
      orbit: ['Mancuernas arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
});
