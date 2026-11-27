// Lote 41: prevención de hombro TS-PRV-010 … 013 y core anti-extensión CO-AEX-001 … 006
import { EXERCISES } from './exercises.js';
import { PUSH_FR } from './ex_lote21.js';
import { plankKey, handsFloor, shoulderZ } from './ts_common.js';
import './ex_lote40.js';

export const CORE_FR = { frame: { dist: 4.3, ty: 0.40, tz: 0.10, distLow: 4.0, tyLow: 0.38 },
  views: { f34: { az: -55, el: 18 }, side: { az: -90, el: 8 }, front: { az: -20, el: 22 }, back34: { az: -140, el: 26 } }, orbit: { view: 'side', sweep: 160 } };
export const AEX = { family: 'free', sub: 'Anti-extensión', primary: ['Recto abdominal', 'Transverso abdominal'], secondary: ['Oblicuos', 'Glúteos'], labelAll: true };
const ISO = { iso: true, tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
// plancha sobre antebrazos
export function forearmPlank(o = {}) {
  const th = o.th ?? 9, k = plankKey(th, o), [, sz] = shoulderZ(th, o), w = o.w ?? 0.14;
  return { ...k, hL: [w, 0.045, sz + 0.27], hR: [-w, 0.045, sz + 0.27], eL: [0.1, -1, -0.4], eR: [-0.1, -1, -0.4], pL: [0, -1, 0, -0.2, 0, 1], pR: [0, -1, 0, 0.2, 0, 1] };
}
const FP = forearmPlank();
// plancha lateral sobre la mano derecha (cabeza hacia -x, pecho hacia +z)
function sidePlank(th = 30, xf = 0.78) {
  const t = th * Math.PI / 180, ax = [-Math.cos(t), Math.sin(t)], lx = [Math.sin(t), Math.cos(t)];
  const P = [xf + 0.87 * ax[0], 0.10 + 0.87 * ax[1], 0];
  const S = [xf + 1.35 * ax[0] - 0.19 * lx[0], 0.10 + 1.35 * ax[1] - 0.19 * lx[1]];
  return { P, rot: [0, 0, 90 - th], nk: [0, 0], L: [xf - 0.01, 0.17, 0.0, 0, 0], R: [xf, 0.08, 0.0, 0, 0], kL: [0, 1, 0.2], kR: [0, 1, 0.2],
    hR: [S[0], 0.035, 0.02], eR: [1, 0, 0], pR: [0, -1, 0, -1, 0, 0], S };
}

Object.assign(EXERCISES, {
  'TS-PRV-010': {
    ...like('TS-MRO-007', {}), sub: 'Prevención de hombro', name: 'Fortalecimiento de rotadores externos en polea (protocolo de prevención)', level: 'Avanzado',
    captions: {
      intro: 'De pie de lado a la polea, codo pegado al costado a 90° y toalla bajo el codo',
      reps: [
        ['Gira el antebrazo hacia fuera sin despegar el codo', 'Vuelve en 2–3 s'],
        ['2–3 veces por semana como prevención', 'Tronco quieto, sin girar'],
        ['Peso ligero y técnica perfecta', 'Cambia de brazo al terminar la serie'],
      ],
      orbit: ['Rotación externa', 'Rotación máxima: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'TS-PRV-011': {
    family: 'free', sub: 'Prevención de hombro', primary: ['Manguito rotador', 'Serrato anterior'], secondary: ['Oblicuos', 'Glúteo medio'], name: 'Estabilidad de hombro en plancha lateral', level: 'Avanzado', labelAll: true,
    tempo: { down: 2, pause: 2, up: 2 }, phaseNames: { BAJADA: 'BRAZO ARRIBA', SUBIDA: 'BRAZO ABAJO', ARRIBA: 'PLANCHA LATERAL' }, holdLabel: 'MANTÉN',
    frame: { dist: 4.2, ty: 0.50, tz: 0.0, distLow: 3.9, tyLow: 0.48 }, views: { f34: { az: -20, el: 14 }, side: { az: 0, el: 8 }, front: { az: -45, el: 18 }, back34: { az: 30, el: 20 } }, orbit: { view: 'side', sweep: 120 },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: (() => {
        const k = sidePlank(30), { S, ...b } = k;
        return [{ u: 0, ...b, aL: [6, 10, 8] }, { u: 1, ...b, hL: [S[0] + 0.12, S[1] + 0.95, 0.06], eL: [0, 0, -1], pL: [0, 0, 1, 0, 1, 0] }];
      })() },
      items: [{ kind: 'mat', z: 0.0, x: 0.1, l: 1.9, ry: Math.PI / 2 }] },
    captions: {
      intro: 'Plancha lateral con el brazo de apoyo estirado bajo el hombro',
      reps: [
        ['Eleva el brazo libre hacia el techo', 'Mantén 2 s y bájalo'],
        ['Empuja el suelo: el hombro de apoyo no se hunde', 'Cadera alta y cuerpo en línea'],
        ['Regresión: apoya la rodilla de abajo', 'Cambia de lado al terminar'],
      ],
      orbit: ['Brazo arriba', 'Estabilidad: músculos que trabajan', 'Cadera alta'],
    },
  },
  'TS-PRV-012': {
    ...like('TS-ESC-013', {}), sub: 'Prevención de hombro', primary: ['Manguito rotador', 'Serrato anterior'], name: 'Ejercicio de propiocepción de hombro con balón contra pared', level: 'Avanzado',
    captions: {
      intro: 'De pie frente a la pared, brazo estirado presionando un balón',
      reps: [
        ['Dibuja con el balón círculos, cruces o letras sin dejar de presionar', 'Cambia de dirección sin perder el control'],
        ['Puedes cerrar los ojos para más dificultad', 'Hombro abajo, lejos de la oreja'],
        ['Movimientos pequeños y precisos', '20–30 s por brazo'],
      ],
      orbit: ['Presiona el balón', 'Propiocepción: músculos que trabajan', 'Sigue con movimientos pequeños'],
    },
  },
  'TS-PRV-013': {
    ...like('TS-EMP-008', {}), sub: 'Prevención de hombro', primary: ['Deltoides anterior', 'Manguito rotador'], secondary: ['Tríceps', 'Trapecio superior', 'Serrato anterior'],
    name: 'Progresión de carga en press por encima de la cabeza (return to sport)', level: 'Avanzado', tempo: { down: 2.5, pause: 0.5, up: 1.5 },
    captions: {
      intro: 'De pie con una mancuerna en cada mano a la altura de los hombros',
      reps: [
        ['Empuja hacia arriba en un rango sin dolor', 'Baja en 2–3 s'],
        ['Sube la carga poco a poco semana a semana', 'Primero rango, luego repeticiones, luego peso'],
        ['Abdomen firme y costillas abajo', 'Sigue las pautas de tu fisioterapeuta'],
      ],
      orbit: ['Brazos arriba', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-AEX-001': {
    ...AEX, ...CORE_FR, ...ISO, name: 'Plancha abdominal (front plank)', level: 'Principiante',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [{ u: 0, ...FP }, { u: 1, ...FP }] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Antebrazos en el suelo con los codos bajo los hombros',
      reps: [
        ['Cuerpo recto de la cabeza a los talones', 'Respira de forma continua'],
        ['Aprieta abdomen y glúteos: la cadera no cae', 'Tampoco la subas en pico'],
        ['Mirada al suelo y cuello neutro', 'Series de 20–60 s'],
      ],
      orbit: ['Mantén la línea', 'Plancha: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-AEX-002': {
    ...AEX, ...CORE_FR, primary: ['Recto abdominal', 'Transverso abdominal', 'Glúteos'], secondary: ['Oblicuos', 'Isquiotibiales'], name: 'Plancha con elevación de pierna', level: 'Principiante',
    tempo: { down: 1.5, pause: 1.5, up: 1.5 }, phaseNames: { BAJADA: 'ELEVA LA PIERNA', SUBIDA: 'BAJA', ARRIBA: 'PLANCHA' }, holdLabel: 'PIERNA ARRIBA',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', alt: true, keys: [{ u: 0, ...FP }, { u: 1, ...FP, L: [FP.L[0], 0.34, FP.L[2] + 0.02, FP.L[3], FP.L[4]] }] }, items: [{ kind: 'mat', z: 0.05, l: 1.9 }] },
    captions: {
      intro: 'Plancha sobre antebrazos con el cuerpo recto',
      reps: [
        ['Eleva una pierna estirada unos centímetros', 'Mantén 1–2 s y bájala'],
        ['La cadera no rota ni se inclina', 'Aprieta el glúteo de la pierna que sube'],
        ['Alterna las piernas', 'Abdomen firme todo el tiempo'],
      ],
      orbit: ['Pierna arriba', 'Plancha: músculos que trabajan', 'Cadera quieta'],
    },
  },
  'CO-AEX-003': {
    ...like('TS-ESC-012', {}), ...AEX, primary: ['Recto abdominal', 'Transverso abdominal', 'Oblicuos'], secondary: ['Serrato anterior', 'Deltoides anterior'],
    name: 'Plancha con toque alterno de hombro (shoulder taps anti-rotación)', level: 'Principiante',
    captions: {
      intro: 'Posición alta de flexión con los pies algo separados',
      reps: [
        ['Toca el hombro contrario sin mover la cadera', 'Apoya y cambia de mano'],
        ['Imagina un vaso de agua sobre la espalda baja', 'Abdomen y glúteos firmes'],
        ['Lento y controlado', 'Más separación de pies = más fácil'],
      ],
      orbit: ['Toca el hombro', 'Anti-rotación: músculos que trabajan', 'Cadera quieta'],
    },
  },
  'CO-AEX-004': {
    ...AEX, ...CORE_FR, secondary: ['Dorsal ancho', 'Serrato anterior', 'Flexores de cadera'], name: 'Rueda abdominal (ab wheel rollout)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'RUEDA AL FRENTE', SUBIDA: 'VUELVE', ARRIBA: 'DE RODILLAS' }, holdLabel: 'CUERPO ESTIRADO',
    cfg: { hands: ['grip', 'grip'], free: { type: 'kfPose', wheel: { r: 0.10 }, wheelAt: 'K:wh',
      keys: [
        { u: 0, P: [0, 0.50, -0.32], rot: [62, 0, 0], sp: [10, 0, 0], nk: [-20, 0], lL: [72, 102, 40, 0], lR: [72, 102, 40, 0],
          hL: [0.07, 0.10, 0.20], hR: [-0.07, 0.10, 0.20], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], wh: [0, 0.10, 0.20] },
        { u: 1, ...plankKey(18, { knees: true, zA: -0.40 }), sp: [6, 0, 0], nk: [-10, 0],
          hL: [0.07, 0.10, 0.98], hR: [-0.07, 0.10, 0.98], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1], wh: [0, 0.10, 0.98] }] },
      items: [{ kind: 'mat', z: 0.10, l: 1.9 }] },
    captions: {
      intro: 'De rodillas, manos en la rueda bajo los hombros',
      reps: [
        ['Rueda hacia delante estirando el cuerpo', 'Vuelve tirando con el abdomen'],
        ['La espalda baja no se hunde: pelvis metida', 'Llega solo hasta donde controles'],
        ['Brazos estirados todo el tiempo', 'Exhala al volver'],
      ],
      orbit: ['Cuerpo estirado', 'Anti-extensión: músculos que trabajan', 'Vuelve con el abdomen'],
    },
  },
  'CO-AEX-005': {
    ...AEX, ...CORE_FR, secondary: ['Serrato anterior', 'Dorsal ancho', 'Glúteos'], name: 'Fallout desde rodillas (knee plank fallout)', level: 'Intermedio',
    tempo: { down: 2.5, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'CAE HACIA DELANTE', SUBIDA: 'VUELVE', ARRIBA: 'DE RODILLAS' }, holdLabel: 'BRAZOS AL FRENTE',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose',
      keys: [
        { u: 0, P: [0, 0.56, -0.26], rot: [18, 0, 0], nk: [-6, 0], lL: [28, 100, 40, 0], lR: [28, 100, 40, 0],
          hL: [0.18, 1.02, 0.30], hR: [-0.18, 1.02, 0.30], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [0, -0.3, 1, 0, 1, 0.3], pR: [0, -0.3, 1, 0, 1, 0.3], hand: 'open' },
        { u: 1, ...plankKey(30, { knees: true, zA: -0.40 }), nk: [-8, 0],
          hL: [0.17, 0.10, 0.92], hR: [-0.17, 0.10, 0.92], eL: [0.4, -1, 0], eR: [-0.4, -1, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] }] },
      items: [{ kind: 'mat', z: 0.10, l: 1.9 }] },
    captions: {
      intro: 'De rodillas con el cuerpo erguido y los brazos al frente',
      reps: [
        ['Déjate caer hacia delante en bloque y recíbete con las manos', 'Empuja y vuelve a la posición erguida'],
        ['Cadera extendida: el cuerpo cae como una tabla', 'Abdomen y glúteos firmes'],
        ['Controla la caída con las manos y los hombros', 'Progresa alejando las manos'],
      ],
      orbit: ['Cuerpo en bloque', 'Anti-extensión: músculos que trabajan', 'Vuelve arriba'],
    },
  },
  'CO-AEX-006': {
    ...AEX, ...CORE_FR, secondary: ['Serrato anterior', 'Flexores de cadera', 'Deltoides anterior'], name: 'Plancha con deslizadores (sliding plank)', level: 'Intermedio',
    tempo: { down: 2, pause: 0.5, up: 2 }, phaseNames: { BAJADA: 'DESLIZA ATRÁS', SUBIDA: 'VUELVE', ARRIBA: 'PLANCHA' }, holdLabel: 'CUERPO ESTIRADO',
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', sliderAt: ['aL', 'aR'],
      keys: [{ u: 0, ...FP }, { u: 1, ...forearmPlank({ th: 7, zA: -0.98 }), hL: FP.hL, hR: FP.hR }] },
      items: [{ kind: 'mat', z: 0.05, l: 2.0 }] },
    captions: {
      intro: 'Plancha sobre antebrazos con los pies sobre deslizadores',
      reps: [
        ['Desliza los pies hacia atrás alejando los codos del cuerpo', 'Vuelve tirando desde el abdomen'],
        ['La espalda baja no se hunde', 'Cuerpo recto en todo el recorrido'],
        ['Recorrido corto al principio', 'Respira de forma continua'],
      ],
      orbit: ['Cuerpo estirado', 'Anti-extensión: músculos que trabajan', 'Vuelve controlando'],
    },
  },
});
