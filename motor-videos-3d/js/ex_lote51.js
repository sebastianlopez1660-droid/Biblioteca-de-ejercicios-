// Lote 51: pliometría, salto vertical PL-SVE-001 … 010
import { EXERCISES } from './exercises.js';
import { PLI, jumpKeys } from './ex_lote18.js';
import './ex_lote19.js';

export const PSV = { ...PLI, sub: 'Salto vertical', primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], secondary: ['Isquiotibiales', 'Core'] };
export const JFR = { frame: { tz: 0.0, dist: 6.0, ty: 1.30, distLow: 5.6, tyLow: 1.25 } };
export const JPH = { phaseNames: { BAJADA: 'SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE' };
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const sq = (k, pz, lean, arm, y = 0, z = 0, pitch = 0) => ({ L: [0, y, z, pitch], R: [0, y, z, pitch], k, pz, lean, arm });
const at = (o, u, extra = {}) => ({ ...o, u, ...extra });
export const UP = [at(sq(0.84, -0.06, 26, 45), 0), at(ST, 1)];
const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
// claves con giro: el giro se reparte entre despegue y aterrizaje
export const withYaw = (keys, a0, a1) => keys.map((k, i) => ({ ...k, yaw: i <= 2 ? a0 : (i === 3 ? (a0 + a1) / 2 : a1) }));
// pierna libre (saltos a una pierna)
const FREE_R = (keys) => keys.map((k, i) => ({ ...k, R: [0, i === 1 || i === keys.length - 1 ? 80 : 70, i === 2 ? 35 : 22, 20] }));

Object.assign(EXERCISES, {
  'PL-SVE-001': {
    ...PSV, ...JFR, ...JPH, name: 'Salto vertical con brazos fijos en la cadera', level: 'Intermedio', tempo: { down: 1.9, pause: 0.8, up: 1.2 }, rest: 0.8,
    cfg: { free: { type: 'jumpKF', stance: 0.14, armsHips: true, down: jumpKeys({ h: 0.26 }), up: UP } },
    captions: {
      intro: 'De pie con las manos en la cadera, pies al ancho de caderas',
      reps: [
        ['Baja rápido y salta extendiendo cadera, rodillas y tobillos', 'Sin ayuda de los brazos: todo sale de las piernas'],
        ['Aterriza suave sobre la parte delantera del pie', 'Rodillas alineadas con los pies'],
        ['Mide la altura para comparar con el salto con brazos', 'Recupera y repite'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'PL-SVE-002': {
    ...PSV, ...JFR, phaseNames: { BAJADA: 'SALTO CON GIRO', PAUSA: 'ATERRIZAJE', SUBIDA: 'SALTO DE VUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    secondary: ['Isquiotibiales', 'Core', 'Oblicuos'], name: 'Salto vertical con giro de 180°', level: 'Intermedio', tempo: { down: 1.9, pause: 0.8, up: 1.9 }, rest: 0.6,
    views: { f34: { az: -35 }, side: { az: -90 }, front: { az: -10 } },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: withYaw(jumpKeys({ h: 0.26 }), 0, 180), up: withYaw(jumpKeys({ h: 0.26 }), 180, 360) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta girando media vuelta en el aire', 'Aterriza mirando atrás y salta girando de vuelta'],
        ['El giro sale de la cadera y los hombros', 'Aterriza estable antes del siguiente salto'],
        ['Rodillas alineadas con los pies al caer', 'Alterna el sentido del giro entre series'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Salta girando de vuelta'],
    },
  },
  'PL-SVE-003': {
    ...PSV, ...JFR, phaseNames: { BAJADA: 'REBOTE', PAUSA: 'CONTACTO', SUBIDA: 'REBOTE', ARRIBA: 'INICIO' }, holdLabel: 'CONTACTO CORTO',
    name: 'Salto vertical repetido (rebote continuo)', level: 'Intermedio', tempo: { down: 1.1, pause: 0.1, up: 1.1 }, rest: 0,
    cfg: { free: { type: 'jumpKF', stance: 0.13, down: jumpKeys({ h: 0.22, cm: 0.90, absorb: 0.93 }), up: jumpKeys({ h: 0.22, cm: 0.90, absorb: 0.93 }) } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta y rebota de inmediato al tocar el suelo', 'Contactos cortos, como un muelle'],
        ['Tobillos firmes y rodillas poco flexionadas', 'Los brazos acompañan el ritmo'],
        ['Mantén la altura en todos los saltos', 'Series de 8–10 rebotes'],
      ],
      orbit: ['Rebota', 'Rebote: músculos que trabajan', 'Contacto corto'],
    },
  },
  'PL-SVE-004': {
    ...PSV, ...JFR, ...JPH, secondary: ['Glúteo medio', 'Core', 'Isquiotibiales'], name: 'Salto vertical a una pierna con contramovimiento', level: 'Intermedio', tempo: { down: 1.9, pause: 0.9, up: 1.2 }, rest: 0.6,
    cfg: { free: { type: 'jumpKF', stance: 0.09, free: 'R', down: FREE_R(jumpKeys({ h: 0.18 })), up: FREE_R(UP) } },
    captions: {
      intro: 'De pie sobre una pierna, la otra flexionada',
      reps: [
        ['Baja rápido y salta lo más alto posible con una pierna', 'Aterriza sobre la misma pierna y estabiliza'],
        ['La rodilla no se va hacia dentro al aterrizar', 'Brazos con impulso hacia arriba'],
        ['Cadera nivelada', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'PL-SVE-005': {
    ...like('TI-PLI-001', {}), ...PSV, secondary: ['Isquiotibiales', 'Core', 'Erectores espinales'], name: 'Salto vertical con chaleco lastrado', level: 'Intermedio',
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: jumpKeys({ h: 0.20, cm: 0.78 }), up: UP } },
    captions: {
      intro: 'De pie con un chaleco lastrado bien ajustado',
      reps: [
        ['Baja y salta con todo: el chaleco añade carga', 'Aterriza suave y amortigua'],
        ['Peso del chaleco moderado: 5–10 % del peso corporal', 'Espalda recta en el contramovimiento'],
        ['Pocas repeticiones de máxima calidad', 'Descansa bien entre series'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'PL-SVE-006': {
    ...PSV, ...JFR, ...JPH, name: 'Salto vertical con banda de resistencia', level: 'Intermedio', tempo: { down: 1.9, pause: 0.8, up: 1.2 }, rest: 0.8,
    cfg: { free: { type: 'jumpKF', stance: 0.14, beltBand: true, down: jumpKeys({ h: 0.20 }), up: UP } },
    captions: {
      intro: 'De pie con bandas ancladas al suelo y sujetas a la cintura',
      reps: [
        ['Salta contra la resistencia de las bandas', 'Aterriza suave: las bandas te frenan al bajar'],
        ['Extiende por completo cadera, rodillas y tobillos', 'Brazos con impulso hacia arriba'],
        ['Tensión moderada para no perder velocidad', 'Rodillas alineadas al caer'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'PL-SVE-007': {
    ...PSV, ...JFR, phaseNames: { BAJADA: 'SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    secondary: ['Flexores de cadera', 'Recto abdominal', 'Isquiotibiales'], name: 'Tuck jump (salto con rodillas al pecho)', level: 'Intermedio', tempo: { down: 1.9, pause: 0.8, up: 1.2 }, rest: 0.6,
    cfg: { free: { type: 'jumpKF', stance: 0.14,
      down: jumpKeys({ h: 0.30 }).map((k, i) => (i === 3 ? { ...k, L: [0, 0.78, 0.22, 40], R: [0, 0.78, 0.22, 40], k: 0.50, lean: 10, arm: 70 } : k)), up: UP } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Salta y lleva las rodillas al pecho en el aire', 'Estira las piernas antes de aterrizar'],
        ['Tronco erguido: las rodillas suben, el pecho no baja', 'Aterriza suave y amortigua'],
        ['Brazos al frente para equilibrarte', 'Recupera y repite'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'PL-SVE-008': {
    ...like('TI-PLI-002', {}), ...PSV, name: 'Salto vertical isométrico desde media sentadilla', level: 'Avanzado', tempo: { down: 1.6, pause: 3, up: 2.0 }, holdLabel: 'MEDIA SENTADILLA 3 s',
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Baja a media sentadilla y mantén 3 s sin moverte', 'Salta desde parado, sin rebote'],
        ['Brazos atrás durante la pausa', 'Aterriza suave y amortigua'],
        ['Desarrolla fuerza de arranque sin contramovimiento', 'Recupera y repite'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'PL-SVE-009': {
    ...PSV, ...JPH, name: 'Salto vertical con aproximación de pasos', level: 'Avanzado', tempo: { down: 2.4, pause: 0.8, up: 2.0 }, rest: 0.3,
    frame: { tz: -0.30, dist: 6.2, ty: 1.30, distLow: 5.8, tyLow: 1.25 }, views: { f34: { az: -60 }, side: { az: -90 }, front: { az: -35 }, back34: { az: -140 } },
    cfg: { free: { type: 'jumpKF', stance: 0.13,
      down: (() => {
        const J = jumpKeys({ h: 0.32, t0: 0.40 });
        return [at({ ...ST, L: [0, 0, -0.80, 0], R: [0, 0, -0.80, 0] }, 0), at({ ...ST, L: [0, 0.08, -0.50, 10], R: [0, 0, -0.80, 0], lean: 8, arm: 20 }, 0.14),
          at({ ...ST, L: [0, 0, -0.30, 0], R: [0, 0.06, -0.50, 10], lean: 10, arm: -10, k: 0.95 }, 0.26), ...J.slice(1)];
      })(),
      up: [at(sq(0.84, -0.06, 26, 45), 0), at(ST, 0.35), at({ ...ST, L: [0, 0.06, -0.35, 0], R: [0, 0, 0, 0] }, 0.6), at({ ...ST, L: [0, 0, -0.80, 0], R: [0, 0, -0.80, 0] }, 1)] } },
    captions: {
      intro: 'Dos o tres pasos por detrás de la zona de salto',
      reps: [
        ['Da dos pasos rápidos y bate con los dos pies', 'Salta transformando la carrera en altura'],
        ['Último paso más corto y brazos atrás', 'Brazos con fuerza hacia arriba al despegar'],
        ['Aterriza suave y estabiliza', 'Vuelve caminando al inicio'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'PL-SVE-010': {
    ...PSV, ...JFR, ...JPH, secondary: ['Deltoides', 'Isquiotibiales', 'Core'], name: 'Salto vertical con brazos libres (arm swing)', level: 'Avanzado', tempo: { down: 1.9, pause: 0.8, up: 1.2 }, rest: 0.8,
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: jumpKeys({ h: 0.34 }).map((k, i) => (i === 1 ? { ...k, arm: -60 } : i === 2 || i === 3 ? { ...k, arm: 175 } : k)), up: UP } },
    captions: {
      intro: 'De pie, pies al ancho de caderas y brazos relajados',
      reps: [
        ['Lleva los brazos atrás al bajar', 'Lánzalos con fuerza hacia arriba al despegar'],
        ['El impulso de los brazos suma altura', 'Extiende por completo el cuerpo en el aire'],
        ['Aterriza suave y amortigua', 'Recupera y repite'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
});
