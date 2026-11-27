// Lote 40: movilidad TS-MHO-013 y prevención de hombro TS-PRV-001 … 009
import { EXERCISES } from './exercises.js';
import { RAISE_FR } from './ex_lote29.js';
import { PUSH_FR } from './ex_lote21.js';
import { plankKey, handsFloor } from './ts_common.js';
import './ex_lote39.js';

const PRV = { family: 'free', sub: 'Prevención de hombro', primary: ['Manguito rotador', 'Trapecio medio'], secondary: ['Serrato anterior', 'Romboides'], tempo: { down: 2, pause: 1, up: 2 }, labelAll: true };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.12, 0.08, 0, 0, 8], R: [-0.12, 0.08, 0, 0, -8] };
const FRONT_FR = { ...RAISE_FR, frame: { dist: 4.2, ty: 1.15, tz: 0.15, distLow: 4.0, tyLow: 1.10 } };
const V_FRONT = { f34: { az: -35, el: 14 }, side: { az: -90, el: 8 }, front: { az: -10, el: 12 }, back34: { az: -150, el: 18 } };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const both = (o) => {
  const m = (v, n) => (n[0] === 'p' ? [-v[0], v[1], v[2], -v[3], v[4], v[5]] : [-v[0], v[1], v[2]]);
  const r = {}; for (const [k, v] of Object.entries(o)) { r[k] = v; if (k.endsWith('L')) r[k.slice(0, -1) + 'R'] = m(v, k); } return r;
};
const HF = handsFloor(21);
const FW = (w) => ({ L: [w, ...plankKey(21).L.slice(1)], R: [-w, ...plankKey(21).R.slice(1)] });
const PK = { ...plankKey(21), ...FW(0.18) };
// YTWL de pie con banda entre las manos
const YTWL = (() => {
  const low = both({ hL: [0.16, 1.30, 0.50], eL: [0.4, -1, 0], pL: [0, -1, 0, 0, 0, 1] });
  const Y = both({ hL: [0.52, 2.00, 0.22], eL: [1, 0, 0], pL: [0, 0, 1, 0.3, 1, 0] });
  const T = both({ hL: [0.78, 1.38, 0.10], eL: [0.3, -1, 0], pL: [0, -1, 0, 0, 0, 1] });
  const W = both({ hL: [0.46, 1.50, -0.04], eL: [0.6, -1, -0.3], pL: [0, 0, 1, 0, 1, 0] });
  const Lr = both({ hL: [0.50, 1.03, 0.16], eL: [0, -1, 0], pL: [0, 0, 1, 0, 1, 0] });
  const Lf = both({ hL: [0.16, 1.03, 0.34], eL: [0.2, -1, 0], pL: [0, 0, 1, 0, 1, 0] });
  return [[low, Y], [low, T], [{ ...Y }, W], [Lf, Lr]].map(([a, b]) => [{ u: 0, ...STAND, ...a }, { u: 1, ...STAND, ...b }]);
})();

Object.assign(EXERCISES, {
  'TS-MHO-013': {
    family: 'free', sub: 'Movilidad de hombro', primary: ['Movilidad de hombro', 'Tríceps'], secondary: ['Manguito rotador'], name: 'Movilidad dinámica de hombro con cuerda o toalla', level: 'Avanzado', labelAll: true,
    ...FRONT_FR, views: { f34: { az: -140, el: 12 }, side: { az: -90, el: 6 }, front: { az: -170, el: 10 }, back34: { az: -40, el: 12 } }, orbit: { view: 'side', sweep: 140 },
    tempo: { down: 2, pause: 1, up: 2 }, phaseNames: { BAJADA: 'TIRA HACIA ARRIBA', SUBIDA: 'TIRA HACIA ABAJO', ARRIBA: 'TOALLA DETRÁS' }, holdLabel: 'MANO DE ABAJO ARRIBA',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', rods: [{ from: 'hL', to: 'hR', r: 0.018, color: 0xe8e2d0 }],
      keys: [
        { u: 0, ...STAND, hL: [0.05, 1.66, -0.14], eL: [0.3, 1, 0], pL: [1, 0, 0, 0, -1, 0], hR: [-0.06, 0.98, -0.16], eR: [-0.6, -0.4, -0.2], pR: [-1, 0, 0, 0, 1, 0] },
        { u: 1, ...STAND, hL: [0.05, 1.84, -0.10], eL: [0.3, 1, 0], pL: [1, 0, 0, 0, -1, 0], hR: [-0.05, 1.18, -0.18], eR: [-0.6, -0.4, -0.2], pR: [-1, 0, 0, 0, 1, 0] }] } },
    captions: {
      intro: 'De pie, toalla detrás de la espalda: una mano arriba tras la nuca y otra abajo',
      reps: [
        ['La mano de arriba tira y sube la de abajo por la espalda', 'Luego la de abajo tira y baja la de arriba'],
        ['Movimiento lento como un sedal', 'Espalda recta, sin arquearla'],
        ['Rango cómodo y sin dolor', 'Cambia la posición de los brazos al terminar'],
      ],
      orbit: ['Mano de abajo arriba', 'Movilidad: zona que trabaja', 'Sigue tirando despacio'],
    },
  },
  'TS-PRV-001': {
    ...PRV, ...FRONT_FR, views: V_FRONT, primary: ['Trapecio inferior', 'Trapecio medio', 'Manguito rotador'], secondary: ['Romboides', 'Deltoides posterior'], name: 'Programa YTWL completo con banda', level: 'Principiante',
    phaseNames: { BAJADA: 'TENSA LA BANDA', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'MANTÉN',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'hR', hand: 'L' }], keys: YTWL[0], repKeys: YTWL } },
    captions: {
      intro: 'De pie con una banda sujeta entre las manos',
      reps: [
        ['Y: brazos arriba en diagonal abriendo la banda', 'T: abre los brazos en cruz a la altura del pecho'],
        ['W: baja los codos junto al cuerpo juntando las escápulas', 'L: codos a 90° pegados al costado, gira hacia fuera'],
        ['Hombros abajo en todas las letras', '8–10 repeticiones de cada una'],
      ],
      orbit: ['Mantén la letra', 'Activación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-PRV-002': {
    ...like('TS-MRO-001', {}), sub: 'Prevención de hombro', name: 'Rotación externa progresiva post-lesión', level: 'Principiante', tempo: { down: 2.5, pause: 1, up: 2.5 },
    captions: {
      intro: 'De pie, codo pegado al costado a 90° y banda muy ligera anclada al lado contrario',
      reps: [
        ['Gira el antebrazo hacia fuera solo hasta donde no haya dolor', 'Vuelve despacio en 2–3 s'],
        ['Empieza con la banda más suave y aumenta poco a poco', 'Toalla entre el codo y el costado'],
        ['Progresa en rango, luego en repeticiones y al final en tensión', 'Sigue las pautas de tu fisioterapeuta'],
      ],
      orbit: ['Rotación externa', 'Rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-PRV-003': {
    ...PRV, ...PUSH_FR, primary: ['Serrato anterior', 'Manguito rotador'], secondary: ['Core', 'Deltoides'], name: 'Estabilización de hombro en cadena cerrada (plancha con perturbación)', level: 'Principiante',
    tempo: { down: 1.2, pause: 1, up: 1.2 }, phaseNames: { BAJADA: 'TRANSFIERE EL PESO', SUBIDA: 'AL CENTRO', ARRIBA: 'PLANCHA' }, holdLabel: 'RESISTE',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true, bands: [{ anchor: 'hL', to: 'hR' }],
      keys: [{ u: 0, ...PK, ...HF }, { u: 1, ...PK, P: [PK.P[0] + 0.06, PK.P[1] - 0.005, PK.P[2] + 0.03], rot: [69, 3, 3], ...HF }] },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Plancha alta con una mini banda en las muñecas',
      reps: [
        ['Lleva el peso hacia una mano y resiste', 'Vuelve al centro y cambia de lado'],
        ['Un compañero puede empujarte suavemente los hombros', 'El cuerpo responde sin perder la línea'],
        ['Empuja el suelo con las dos manos', 'Abdomen firme y respiración continua'],
      ],
      orbit: ['Resiste', 'Estabilidad: músculos que trabajan', 'Mantén la línea'],
    },
  },
  'TS-PRV-004': {
    ...like('TS-MRO-001', {}), sub: 'Prevención de hombro', name: 'Fortalecimiento excéntrico de manguito rotador con banda', level: 'Principiante',
    tempo: { down: 1, pause: 0.5, up: 4 }, phaseNames: { BAJADA: 'ROTACIÓN', SUBIDA: 'EXCÉNTRICO LENTO', ARRIBA: 'INICIO' }, holdLabel: 'ROTACIÓN MÁXIMA',
    captions: {
      intro: 'De pie, codo pegado al costado a 90° y banda anclada al lado contrario',
      reps: [
        ['Gira hacia fuera rápido (puedes ayudarte con la otra mano)', 'Vuelve muy despacio, en 4 s'],
        ['La fase lenta es la importante', 'El codo no se despega del cuerpo'],
        ['Tensión moderada', '3 series de 10–15 repeticiones'],
      ],
      orbit: ['Rotación externa', 'Rotación: músculos que trabajan', 'Vuelve muy despacio'],
    },
  },
  'TS-PRV-005': {
    ...PRV, ...FRONT_FR, primary: ['Serrato anterior', 'Trapecio inferior'], secondary: ['Manguito rotador', 'Deltoides anterior'], name: 'Control motor escapular en press por encima de la cabeza', level: 'Intermedio',
    views: { f34: { az: -105, el: 12 }, side: { az: -88, el: 8 }, front: { az: -130, el: 12 }, back34: { az: -160, el: 16 } }, orbit: { view: 'side', sweep: 80 },
    tempo: { down: 2.5, pause: 1, up: 2.5 }, phaseNames: { BAJADA: 'DESLIZA ARRIBA', SUBIDA: 'BAJA', ARRIBA: 'ANTEBRAZOS EN LA PARED' }, holdLabel: 'BRAZOS ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', relY: 'L', bands: [{ anchor: 'hL', to: 'hR' }],
      keys: [
        { u: 0, ...STAND, P: [0, -0.012, -0.02], rot: [4, 0, 0], ...both({ hL: [0.18, 1.52, 0.38], eL: [0.3, -1, 0.3], pL: [0, 0, 1, 0, 1, 0] }) },
        { u: 1, ...STAND, P: [0, -0.012, 0.0], rot: [4, 0, 0], ...both({ hL: [0.26, 2.00, 0.36], eL: [0.3, -1, 0.3], pL: [0, 0, 1, 0, 1, 0] }) }] },
      items: [{ kind: 'wall', flip: true, z: 0.43, w: 1.1, h: 2.3 }] },
    captions: {
      intro: 'De frente a la pared, antebrazos apoyados a la altura de los hombros y mini banda en las muñecas',
      reps: [
        ['Desliza los antebrazos hacia arriba separando las escápulas', 'Baja despacio manteniendo la banda tensa'],
        ['Las escápulas suben y giran hacia fuera al deslizar', 'Hombros lejos de las orejas'],
        ['Abre ligeramente las manos contra la banda', 'Sin dolor durante todo el rango'],
      ],
      orbit: ['Brazos arriba', 'Control escapular: músculos que trabajan', 'Baja despacio'],
    },
  },
  'TS-PRV-006': {
    ...PRV, ...FRONT_FR, primary: ['Trapecio inferior', 'Dorsal ancho'], secondary: ['Manguito rotador'], name: 'Ejercicio de descompresión subacromial (movilidad + fuerza)', level: 'Intermedio',
    views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 8 }, front: { az: -25, el: 14 }, back34: { az: -150, el: 18 } }, orbit: { view: 'side', sweep: 130 },
    phaseNames: { BAJADA: 'HOMBRO ABAJO', SUBIDA: 'REGRESO', ARRIBA: 'BRAZO ARRIBA' }, holdLabel: 'ESCÁPULA ABAJO',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0.24, 2.30, 1.10], hand: 'L' }],
      keys: [
        { u: 0, ...STAND, hL: [0.24, 2.00, 0.42], eL: [1, 0, 0], pL: [0, 0, 1, 0, 1, 0.3], shr: 0.04, aR: [6, 8, 8] },
        { u: 1, ...STAND, hL: [0.24, 1.72, 0.58], eL: [1, 0, 0], pL: [0, -0.4, 1, 0, 1, 0.4], shr: -0.02, aR: [6, 8, 8] }] },
      items: [{ kind: 'post', h: 2.36, x: 0.24, z: 1.12 }] },
    captions: {
      intro: 'De pie, brazo estirado hacia arriba sujetando una banda anclada alta delante',
      reps: [
        ['Baja el hombro alejándolo de la oreja y tira un poco hacia abajo', 'Vuelve arriba sin encoger el hombro'],
        ['El brazo sigue estirado', 'Siente cómo la escápula baja y se pega a las costillas'],
        ['Movimiento corto y lento', 'Sin dolor'],
      ],
      orbit: ['Hombro abajo', 'Depresión escapular: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-PRV-007': {
    ...PRV, ...FRONT_FR, primary: ['Romboides', 'Trapecio medio'], secondary: ['Deltoides posterior', 'Bíceps'], name: 'Fortalecimiento de romboides con banda', level: 'Intermedio',
    views: { f34: { az: -55, el: 14 }, side: { az: -90, el: 8 }, front: { az: -25, el: 14 }, back34: { az: -150, el: 22 } }, orbit: { view: 'back34', sweep: 120 },
    phaseNames: { BAJADA: 'TIRÓN', SUBIDA: 'REGRESO', ARRIBA: 'BRAZOS ESTIRADOS' }, holdLabel: 'ESCÁPULAS JUNTAS',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: [0, 1.30, 1.10], hand: 'L' }, { anchor: [0, 1.30, 1.10], hand: 'R' }],
      keys: [
        { u: 0, ...STAND, ...both({ hL: [0.18, 1.32, 0.62], eL: [0.6, -1, 0], pL: [0, -1, 0, 0, 0, 1] }) },
        { u: 1, ...STAND, ...both({ hL: [0.24, 1.33, 0.20], eL: [1, 0.1, -0.4], pL: [0, -1, 0, 0, 0, 1] }) }] },
      items: [{ kind: 'post', h: 1.36, x: 0, z: 1.12 }] },
    captions: {
      intro: 'De pie frente al anclaje, banda a la altura del pecho y brazos estirados',
      reps: [
        ['Tira con los codos abiertos hacia los lados', 'Junta las escápulas y vuelve en 2 s'],
        ['Codos a la altura de los hombros o algo por debajo', 'Pecho alto y hombros abajo'],
        ['Mantén 1 s con las escápulas juntas', 'Sin arquear la espalda'],
      ],
      orbit: ['Escápulas juntas', 'Contracción: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-PRV-008': {
    ...PRV, ...PUSH_FR, primary: ['Serrato anterior', 'Manguito rotador'], secondary: ['Core', 'Tríceps'], name: 'Control neuromuscular de hombro en superficie inestable', level: 'Intermedio',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'TRANSFIERE EL PESO', SUBIDA: 'AL CENTRO', ARRIBA: 'PLANCHA' }, holdLabel: 'ESTABILIZA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true,
      keys: (() => {
        const H = { ...HF, hL: [HF.hL[0], HF.hL[1] + 0.06, HF.hL[2]], hR: [HF.hR[0], HF.hR[1] + 0.06, HF.hR[2]] };
        const P0 = { ...PK, P: [PK.P[0], PK.P[1] + 0.03, PK.P[2]] };
        return [{ u: 0, ...P0, ...H }, { u: 1, ...P0, P: [P0.P[0] + 0.05, P0.P[1], P0.P[2] + 0.02], rot: [69, 2, 3], ...H }];
      })() },
      items: [{ kind: 'mat', z: 0.05, l: 1.9 }, { kind: 'foamPad', z: handsFloor(21).hL[2] }] },
    captions: {
      intro: 'Plancha alta con las manos sobre una superficie inestable',
      reps: [
        ['Transfiere el peso de una mano a otra controlando la inestabilidad', 'Vuelve al centro'],
        ['Empuja la superficie: el hombro no se hunde', 'Cuerpo recto y abdomen firme'],
        ['Movimientos pequeños y controlados', 'Progresión: levanta una mano unos segundos'],
      ],
      orbit: ['Estabiliza', 'Control: músculos que trabajan', 'Mantén la línea'],
    },
  },
  'TS-PRV-009': {
    ...PRV, ...FRONT_FR, views: V_FRONT, primary: ['Trapecio inferior', 'Romboides'], secondary: ['Manguito rotador', 'Dorsal ancho'], name: 'Ejercicio de reeducación postural de hombro', level: 'Avanzado',
    phaseNames: { BAJADA: 'BAJA A LA W', SUBIDA: 'SUBE', ARRIBA: 'BRAZOS ARRIBA' }, holdLabel: 'ESCÁPULAS ABAJO Y ATRÁS', tempo: { down: 2, pause: 1.5, up: 2 },
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', bands: [{ anchor: 'hR', hand: 'L' }],
      keys: [
        { u: 0, ...STAND, nk: [0, 0], ...both({ hL: [0.34, 2.02, 0.08], eL: [1, 0, 0], pL: [0, 0, 1, 0.3, 1, 0] }) },
        { u: 1, ...STAND, nk: [4, 0], ...both({ hL: [0.50, 1.56, -0.06], eL: [0.6, -1, -0.3], pL: [0, 0, 1, 0, 1, 0] }) }] } },
    captions: {
      intro: 'De pie, banda sujeta con los brazos estirados por encima de la cabeza',
      reps: [
        ['Baja los codos hacia los costados formando una W', 'Abre la banda y junta las escápulas'],
        ['Barbilla ligeramente hacia atrás, cuello largo', 'Pecho alto sin arquear la espalda'],
        ['Mantén 1–2 s en la W', 'Vuelve arriba despacio'],
      ],
      orbit: ['Escápulas atrás', 'Postura: músculos que trabajan', 'Vuelve arriba'],
    },
  },
});
