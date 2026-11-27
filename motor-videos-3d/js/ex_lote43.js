// Lote 43: anti-rotación CO-ARO-007 … 010 y anti-flexión CO-AFL-001 … 006
import { EXERCISES, SPLCFG, SPLIT_FLOOR, HCFG } from './exercises.js';
import './ex_lote14.js';
import './ex_lote15.js';
import './ex_lote28.js';
import { STAND_FR, ARO } from './ex_lote42.js';
import { CORE_FR } from './ex_lote41.js';

const AFL = { sub: 'Anti-flexión', primary: ['Erectores espinales'], secondary: ['Glúteos', 'Isquiotibiales'] };
const STAND = { P: [0, -0.012, -0.01], rot: [2, 0, 0], nk: [0, 0], L: [0.16, 0.08, 0, 0, 8], R: [-0.16, 0.08, 0, 0, -8] };
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const CABLE = 0xb9bec4;
const two = (x, y, z) => ({ hL: [x + 0.04, y, z], hR: [x - 0.04, y, z], eL: [0.6, -1, 0], eR: [-0.6, -1, 0], pL: [-1, 0, 0, 0, 0, 1], pR: [1, 0, 0, 0, 0, 1] });
// plancha invertida (boca arriba, cabeza hacia -z)
const REV = (() => {
  const th = 22.5, t = th * Math.PI / 180, zf = 0.80, d = [0, Math.sin(t), -Math.cos(t)];
  const P = [0, 0.08 + 0.87 * d[1], zf + 0.87 * d[2]], sz = zf + 1.35 * d[2];
  return { P, rot: [-(90 - th), 0, 0], nk: [10, 0], L: [0.11, 0.08, zf, -70, 4], R: [-0.11, 0.08, zf, -70, -4], kL: [0, 1, 0], kR: [0, 1, 0],
    hL: [0.22, 0.035, sz - 0.04], hR: [-0.22, 0.035, sz - 0.04], eL: [0.3, 0, -1], eR: [-0.3, 0, -1], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };
})();

Object.assign(EXERCISES, {
  'CO-ARO-007': {
    ...ARO, ...STAND_FR, secondary: ['Recto abdominal', 'Dorsal ancho', 'Glúteos'], name: 'Chop anti-rotación en polea alta', level: 'Avanzado', tempo: { down: 1.5, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'CORTE DIAGONAL', SUBIDA: 'VUELVE ARRIBA', ARRIBA: 'MANOS ARRIBA' }, holdLabel: 'TRONCO ESTABLE',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handles: ['R'], cable: true, rods: [{ from: [-0.95, 2.05, 0.05], to: 'hR', r: 0.006, color: CABLE }],
      keys: [{ u: 0, ...STAND, ...two(-0.38, 1.62, 0.36) }, { u: 1, ...STAND, P: [0, -0.04, -0.01], ...two(0.26, 0.98, 0.36) }] },
      items: [{ kind: 'post', h: 2.10, x: -0.97, z: 0.05 }] },
    captions: {
      intro: 'De pie de lado a la polea alta, manos juntas en el agarre arriba',
      reps: [
        ['Tira en diagonal hacia la cadera contraria con los brazos', 'Vuelve arriba en 2 s'],
        ['Cadera y pecho miran al frente: el tronco no gira', 'Rodillas ligeramente flexionadas'],
        ['Los brazos hacen el recorrido, el abdomen frena la rotación', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Manos abajo', 'Anti-rotación: músculos que trabajan', 'Vuelve controlando'],
    },
  },
  'CO-ARO-008': {
    ...ARO, ...STAND_FR, secondary: ['Recto abdominal', 'Deltoides anterior', 'Glúteos'], name: 'Lift anti-rotación en polea baja', level: 'Avanzado', tempo: { down: 1.5, pause: 0.5, up: 2 },
    phaseNames: { BAJADA: 'ELEVACIÓN DIAGONAL', SUBIDA: 'VUELVE ABAJO', ARRIBA: 'MANOS ABAJO' }, holdLabel: 'TRONCO ESTABLE',
    cfg: { free: { type: 'kfPose', relY: 'L', hold: 'grip', handles: ['R'], cable: true, rods: [{ from: [-0.95, 0.20, 0.05], to: 'hR', r: 0.006, color: CABLE }],
      keys: [{ u: 0, ...STAND, P: [0, -0.04, -0.01], ...two(-0.30, 0.92, 0.34) }, { u: 1, ...STAND, ...two(0.30, 1.62, 0.36) }] },
      items: [{ kind: 'post', h: 0.26, x: -0.97, z: 0.05 }] },
    captions: {
      intro: 'De pie de lado a la polea baja, manos juntas en el agarre junto a la rodilla',
      reps: [
        ['Sube en diagonal hasta por encima del hombro contrario', 'Baja en 2 s'],
        ['El tronco no gira: los brazos dibujan la diagonal', 'Empuja el suelo con las piernas'],
        ['Abdomen firme y costillas abajo', 'Cambia de lado al terminar la serie'],
      ],
      orbit: ['Manos arriba', 'Anti-rotación: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-ARO-009': {
    ...ARO, family: 'squat', primary: ['Oblicuos', 'Cuádriceps', 'Glúteos'], secondary: ['Cuadrado lumbar', 'Glúteo medio'], name: 'Zancada estática con carga descentrada (offset lunge)', level: 'Avanzado',
    tempo: { down: 2, pause: 0.5, up: 2 }, frame: { tz: -0.10, dist: 4.7, distLow: 3.9, tyLow: 0.66 },
    cfg: { ...SPLCFG, arms: 'hang', hold: 'db1', loadSide: 'R', gripX: 0.235, split: SPLIT_FLOOR },
    captions: {
      intro: 'Zancada estática con una mancuerna en una sola mano',
      reps: [
        ['Baja en vertical sin inclinarte hacia la mancuerna', 'Sube empujando con el pie delantero'],
        ['Hombros nivelados: el tronco no se dobla de lado', 'Abdomen firme durante todo el recorrido'],
        ['Rodilla delantera alineada con el pie', 'Cambia la carga de mano en la siguiente serie'],
      ],
      orbit: ['Baja recto', 'Posición baja: músculos que trabajan', 'Sube sin inclinarte'],
    },
  },
  'CO-ARO-010': {
    ...like('TI-EST-010', {}), ...ARO, primary: ['Oblicuos', 'Cuadrado lumbar'], secondary: ['Antebrazo', 'Trapecio superior', 'Glúteo medio'],
    name: 'Marcha con carga unilateral en anti-rotación (suitcase carry core)', level: 'Avanzado',
    captions: {
      intro: 'De pie con una carga pesada en una sola mano',
      reps: [
        ['Camina con pasos normales sin inclinarte hacia la carga', 'Hombros y cadera nivelados'],
        ['El abdomen y el costado contrario trabajan para mantenerte recto', 'Mirada al frente'],
        ['Recorridos de 20–30 m', 'Cambia de mano en la vuelta'],
      ],
      orbit: ['Sigue caminando', 'En marcha: músculos que trabajan', 'Tronco recto'],
    },
  },
  'CO-AFL-001': {
    ...like('TS-ESP-009', {}), ...AFL, secondary: ['Glúteos', 'Isquiotibiales', 'Trapecio medio'], name: 'Superman (extensión lumbar isométrica)', level: 'Principiante',
    tempo: { down: 1.5, pause: 4, up: 1.5 }, holdLabel: 'MANTÉN 5 s',
    captions: {
      intro: 'Tumbado boca abajo con los brazos estirados por delante',
      reps: [
        ['Eleva brazos, pecho y piernas unos centímetros', 'Mantén 5 s y baja'],
        ['Mirada al suelo: cuello largo', 'Aprieta glúteos y espalda'],
        ['Elevación pequeña: no fuerces la zona lumbar', 'Respira durante la pausa'],
      ],
      orbit: ['Mantén arriba', 'Isometría: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-AFL-002': {
    ...like('TS-ESP-007', {}), ...AFL, name: 'Buenos días isométricos con banda', level: 'Principiante', tempo: { down: 2, pause: 4, up: 2 }, holdLabel: 'MANTÉN LA BISAGRA',
    cfg: { ...HCFG, arms: 'band_gm', leanBot: 52, hipBottom: 0.905 },
    captions: {
      intro: 'De pie sobre la banda con el otro extremo detrás de la nuca',
      reps: [
        ['Inclina el tronco llevando la cadera atrás y mantén', 'Sube apretando los glúteos'],
        ['Espalda recta en toda la pausa: la banda intenta doblarte', 'Rodillas ligeramente flexionadas'],
        ['Mantén 4–5 s abajo', 'Respira sin perder la posición'],
      ],
      orbit: ['Mantén la bisagra', 'Isometría: músculos que trabajan', 'Sube controlando'],
    },
  },
  'CO-AFL-003': {
    ...like('TS-ESP-007', {}), ...AFL, name: 'Good morning con pausa isométrica', level: 'Principiante', tempo: { down: 3, pause: 3, up: 2 }, holdLabel: 'PAUSA ISOMÉTRICA',
    captions: {
      intro: 'De pie con las manos detrás de la cabeza o cruzadas al pecho',
      reps: [
        ['Baja en 3 s llevando la cadera atrás', 'Pausa de 3 s abajo y sube'],
        ['La espalda no se redondea durante la pausa', 'Peso en los talones'],
        ['Baja solo hasta notar los isquiotibiales', 'Sube apretando los glúteos'],
      ],
      orbit: ['Pausa abajo', 'Isometría: músculos que trabajan', 'Sube controlando'],
    },
  },
  'CO-AFL-004': {
    family: 'free', ...AFL, ...CORE_FR, primary: ['Erectores espinales', 'Glúteos'], secondary: ['Isquiotibiales', 'Tríceps', 'Deltoides posterior'], name: 'Plancha reversa (reverse plank)', level: 'Intermedio',
    iso: true, tempo: { down: 2, pause: 0, up: 2 }, phaseNames: null, holdLabel: null, labelAll: true,
    views: { f34: { az: 55, el: 18 }, side: { az: 90, el: 8 }, front: { az: 20, el: 22 }, back34: { az: 140, el: 24 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [{ u: 0, ...REV }, { u: 1, ...REV }] }, items: [{ kind: 'mat', z: 0.10, l: 1.9 }] },
    captions: {
      intro: 'Sentado con las piernas estiradas y las manos apoyadas detrás',
      reps: [
        ['Eleva la cadera hasta formar una línea de hombros a talones', 'Mantén respirando'],
        ['Glúteos apretados: la cadera no cae', 'Hombros abajo, lejos de las orejas'],
        ['Mirada al techo, cuello relajado', 'Series de 15–30 s'],
      ],
      orbit: ['Mantén la línea', 'Plancha reversa: músculos que trabajan', 'Respira y aguanta'],
    },
  },
  'CO-AFL-005': {
    ...like('TI-PRE-004', {}), ...AFL, primary: ['Glúteos', 'Erectores espinales'], secondary: ['Isquiotibiales', 'Glúteo medio'], name: 'Puente de glúteo con extensión lumbar controlada', level: 'Intermedio',
    tempo: { down: 2, pause: 1.5, up: 2 },
    captions: {
      intro: 'Boca arriba, pies apoyados y mini banda por encima de las rodillas',
      reps: [
        ['Eleva la cadera apretando glúteos hasta alinear el cuerpo', 'Baja vértebra a vértebra'],
        ['Arriba no arquees de más la zona lumbar', 'Rodillas hacia fuera contra la banda'],
        ['Mantén 1–2 s arriba', 'Exhala al subir'],
      ],
      orbit: ['Cadera arriba', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
  'CO-AFL-006': {
    ...like('TS-ESP-004', {}), ...AFL, name: 'Extensión de espalda en banco romano', level: 'Intermedio',
    captions: {
      intro: 'En el banco romano con la cadera apoyada y los pies sujetos',
      reps: [
        ['Baja el tronco con la espalda recta', 'Sube hasta alinear el cuerpo, sin pasarte'],
        ['Brazos cruzados al pecho o detrás de la cabeza', 'Sube apretando glúteos'],
        ['Movimiento controlado, sin rebotes', 'Arriba: cuerpo en línea recta'],
      ],
      orbit: ['Cuerpo alineado', 'Extensión: músculos que trabajan', 'Baja controlando'],
    },
  },
});
