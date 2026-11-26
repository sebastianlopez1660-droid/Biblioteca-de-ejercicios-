// Lote 18: trabajo bilateral TI-BIL-006 … 010 y pliometría TI-PLI-001 … 005
import { EXERCISES } from './exercises.js';
import { SPLCFG, SPLIT_FLOOR } from './exercises.js';
import { PAN } from './ex_lote11.js';

const BIL = { family: 'squat', sub: 'Trabajo bilateral', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Isquiotibiales', 'Core'], tempo: { down: 2, pause: 0, up: 2 } };
export const PLI = { family: 'free', sub: 'Pliometría', primary: ['Cuádriceps', 'Glúteos', 'Gastrocnemio y sóleo'], secondary: ['Isquiotibiales', 'Core'], shortCaps: true };
const SEAT_FR = { dist: 4.4, ty: 0.72, tz: 0.18, distLow: 3.9, tyLow: 0.70 };
const SUP_VIEWS = { f34: { el: 16 }, side: { el: 10 }, front: { el: 16 }, back34: { az: 138, el: 24 } };

// posiciones base de las claves
const ST = { L: [0, 0, 0, 0], R: [0, 0, 0, 0], k: 0.985, pz: 0, lean: 3, arm: 4 };
const sq = (k, pz, lean, arm, y = 0, z = 0, pitch = 0) => ({ L: [0, y, z, pitch], R: [0, y, z, pitch], k, pz, lean, arm });
const at = (o, u, extra = {}) => ({ ...o, u, ...extra });
// contramovimiento + salto vertical + aterrizaje amortiguado (en el sitio o hacia un punto [y, z])
export function jumpKeys({ h = 0.30, land = [0, 0], cm = 0.80, absorb = 0.84, t0 = 0 } = {}) {
  const [ly, lz] = land;
  return [
    at(ST, t0),
    at(sq(cm, -0.07, 32, -40), t0 + (1 - t0) * 0.30),
    at(sq(0.997, 0.0, 6, 150, 0.035, 0, 32), t0 + (1 - t0) * 0.45),
    at(sq(0.99, 0.02, 4, 140, ly + h, lz * 0.55, 22), t0 + (1 - t0) * 0.64),
    at(sq(0.975, 0.0, 8, 60, ly, lz, 8), t0 + (1 - t0) * 0.82),
    at(sq(absorb, -0.06, 26, 45, ly, lz, 0), 1),
  ];
}

Object.assign(EXERCISES, {
  'TI-BIL-006': {
    ...PAN, sub: 'Trabajo bilateral', name: 'Elevación de talones bilateral en máquina', level: 'Intermedio',
    frame: { tz: 0.0, dist: 4.6, ty: 0.95, distLow: 4.2, tyLow: 0.95 }, views: { side: { az: -64, el: 8 } },
    cfg: { arms: 'smith', machine: 'smith', free: { type: 'calf', stepH: 0.10, minPitch: -14, maxPitch: 30 }, items: [{ kind: 'box', h: 0.10, w: 0.62, d: 0.40, z: 0.10 }] },
    captions: {
      intro: 'Barra guiada sobre los hombros y la punta de los pies sobre el escalón',
      reps: [
        ['Sube los talones lo más alto posible', 'Baja en 2 s por debajo del escalón'],
        ['Rodillas estiradas pero sin bloquear', 'El peso sobre el dedo gordo y el segundo dedo'],
        ['Pausa 1 s arriba', 'Recorrido completo en cada repetición'],
      ],
      orbit: ['Talones arriba', 'Contracción máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-BIL-007': {
    family: 'free', sub: 'Trabajo bilateral', primary: ['Cuádriceps'], secondary: [], tempo: { down: 2, pause: 1, up: 2 },
    phaseNames: { BAJADA: 'EXTENSIÓN', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'EXTENSIÓN MÁXIMA',
    name: 'Extensión de rodilla bilateral en máquina', level: 'Avanzado', frame: SEAT_FR,
    cfg: { free: { type: 'seated', seatY: 0.52, recline: 12, kneeB: 92, kneeT: 4, roller: 'front', handX: 0.27, handZ: 0.12, plantB: 0, plantT: -10, machine: { kind: 'lever', rollerX: 0 } },
      items: [{ kind: 'seatMachine', seatY: 0.52, recline: 12 }] },
    captions: {
      intro: 'Sentado con la espalda apoyada y el rodillo sobre la parte baja de las espinillas',
      reps: [
        ['Extiende las rodillas hasta casi estirarlas', 'Baja en 2 s controlando el peso'],
        ['Aprieta el cuádriceps 1 s arriba', 'Agárrate a las asas para no despegar la cadera'],
        ['Rodilla alineada con el eje de la máquina', 'Sin balanceos ni impulso'],
      ],
      orbit: ['Extiende', 'Extensión máxima: músculos que trabajan', 'Baja controlando'],
    },
  },
  'TI-BIL-008': {
    family: 'free', sub: 'Trabajo bilateral', primary: ['Isquiotibiales'], secondary: ['Gastrocnemio'], tempo: { down: 2, pause: 1, up: 2 },
    phaseNames: { BAJADA: 'FLEXIÓN', SUBIDA: 'EXTENSIÓN', ARRIBA: 'INICIO' }, holdLabel: 'FLEXIÓN MÁXIMA',
    name: 'Curl femoral bilateral en máquina', level: 'Avanzado', views: SUP_VIEWS,
    frame: { dist: 4.6, ty: 0.75, tz: 0.05, distLow: 4.0, tyLow: 0.78 },
    cfg: { free: { type: 'prone', padY: 0.62, kneeB: 4, kneeT: 112, handZ: 0.66, machine: { kind: 'lever', rollerX: 0 } }, items: [{ kind: 'curlBench', padY: 0.62 }] },
    captions: {
      intro: 'Boca abajo, rodillas justo fuera del cojín y rodillo sobre los tobillos',
      reps: [
        ['Flexiona las rodillas llevando los talones hacia los glúteos', 'Extiende en 2 s sin soltar la tensión'],
        ['La cadera queda pegada al banco', 'Agárrate a las asas'],
        ['Aprieta 1 s arriba', 'Sin impulso ni rebote abajo'],
      ],
      orbit: ['Flexiona', 'Flexión máxima: músculos que trabajan', 'Extiende controlando'],
    },
  },
  'TI-BIL-009': {
    ...BIL, name: 'Sentadilla con mancuernas bilateral (dumbbell squat)', level: 'Avanzado', frame: { tz: 0.0, dist: 4.6 },
    cfg: { arms: 'hang', hold: 'dbside', gripX: 0.235, stance: 0.16, toeOut: 14, hipBottom: 0.46, leanTop: 2, leanBot: 36, kneeOut: 0.07 },
    captions: {
      intro: 'Una mancuerna en cada mano, brazos estirados a los lados',
      reps: [
        ['Baja en 2 s hasta muslos paralelos', 'Sube en 2 s empujando con todo el pie'],
        ['Las mancuernas cuelgan a los lados sin balancearse', 'Pecho arriba y espalda neutra'],
        ['Rodillas alineadas con los pies', 'Exhala al subir'],
      ],
      orbit: ['Baja controlando', 'Posición baja: músculos que trabajan', 'Sube empujando el suelo'],
    },
  },
  'TI-BIL-010': {
    ...BIL, primary: ['Isquiotibiales', 'Glúteos'], secondary: ['Erectores espinales', 'Core'], name: 'Peso muerto rumano bilateral con barra', level: 'Avanzado',
    tempo: { down: 3, pause: 0, up: 2 }, frame: { tz: -0.05, dist: 4.8 }, views: { side: { az: -64, el: 8 } },
    cfg: { arms: 'hang', hold: 'bar', gripX: 0.24, stance: 0.13, toeOut: 8, hipBottom: 0.895, leanTop: 2, leanBot: 66, kneeOut: 0.03, chestExt: 2, neckK: 0.55 },
    captions: {
      intro: 'De pie con la barra en las manos, agarre al ancho de hombros',
      reps: [
        ['Lleva la cadera atrás y baja la barra pegada a los muslos', 'Sube en 2 s extendiendo la cadera'],
        ['Rodillas ligeramente flexionadas y fijas', 'Espalda neutra durante todo el recorrido'],
        ['Baja hasta notar tensión en los isquiotibiales', 'Arriba, aprieta glúteos sin arquear'],
      ],
      orbit: ['Cadera atrás', 'Posición baja: músculos que trabajan', 'Sube extendiendo la cadera'],
    },
  },
  'TI-PLI-001': {
    ...PLI, name: 'Salto vertical con contramovimiento (CMJ)', level: 'Principiante', tempo: { down: 1.9, pause: 0.8, up: 1.2 }, rest: 0.8,
    phaseNames: { BAJADA: 'SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'REGRESO', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: { tz: 0.0, dist: 6.0, ty: 1.30, distLow: 5.6, tyLow: 1.25 },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: jumpKeys({ h: 0.30 }), up: [at(sq(0.84, -0.06, 26, 45), 0), at(ST, 1)] } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Baja rápido llevando los brazos atrás', 'Salta extendiendo cadera, rodillas y tobillos'],
        ['Los brazos suben con fuerza al despegar', 'Aterriza suave y amortigua'],
        ['Rodillas alineadas con los pies al caer', 'Recupera y repite: máxima altura en cada salto'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve a la posición inicial'],
    },
  },
  'TI-PLI-002': {
    ...PLI, name: 'Salto en sentadilla (squat jump)', level: 'Principiante', tempo: { down: 1.6, pause: 1.2, up: 2.0 }, rest: 0.6,
    phaseNames: { BAJADA: 'BAJADA', PAUSA: 'PAUSA ABAJO', SUBIDA: 'SALTO', ARRIBA: 'INICIO' }, holdLabel: 'POSICIÓN BAJA',
    frame: { tz: 0.0, dist: 6.0, ty: 1.30, distLow: 5.6, tyLow: 1.25 },
    cfg: { free: { type: 'jumpKF', stance: 0.15, down: [at(ST, 0), at(sq(0.78, -0.08, 34, 60), 1)],
      up: [at(sq(0.78, -0.08, 34, 60), 0), at(sq(0.997, 0.0, 6, 150, 0.035, 0, 32), 0.14), at(sq(0.99, 0.02, 4, 140, 0.30, 0, 22), 0.34), at(sq(0.975, 0.0, 8, 60, 0, 0, 8), 0.52), at(sq(0.85, -0.06, 26, 45), 0.70), at(ST, 1)] } },
    captions: {
      intro: 'De pie, pies al ancho de caderas',
      reps: [
        ['Baja a sentadilla y mantén 1 s sin rebote', 'Salta desde abajo con toda la fuerza'],
        ['Sin contramovimiento: la pausa elimina el rebote', 'Aterriza suave y amortigua'],
        ['Rodillas alineadas con los pies', 'Recupera la postura antes de la siguiente'],
      ],
      orbit: ['Pausa abajo', 'Posición baja: músculos que trabajan', 'Salta y aterriza suave'],
    },
  },
  'TI-PLI-003': {
    ...PLI, name: 'Salto a cajón (box jump)', level: 'Principiante', tempo: { down: 1.9, pause: 0.8, up: 2.4 }, rest: 0.6,
    phaseNames: { BAJADA: 'SALTO', PAUSA: 'ATERRIZAJE', SUBIDA: 'BAJA DEL CAJÓN', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE EN EL CAJÓN',
    frame: { tz: 0.25, dist: 6.2, ty: 1.40, distLow: 5.8, tyLow: 1.35 }, views: { f34: { az: -50 }, side: { az: -80 } },
    cfg: { free: { type: 'jumpKF', stance: 0.14, down: jumpKeys({ h: 0.22, land: [0.40, 0.55] }),
      up: [at(sq(0.84, -0.06, 26, 45, 0.40, 0.55), 0), at(sq(0.985, 0, 3, 4, 0.40, 0.55), 0.30),
        { u: 0.48, L: [0, 0.40, 0.55, 0], R: [0, 0.48, 0.28, 0], k: 0.97, pz: -0.10, lean: 10, arm: 20 },
        { u: 0.64, L: [0, 0.40, 0.55, 0], R: [0, 0, 0.0, 0], k: 0.97, pz: 0, lean: 8, arm: 10 },
        { u: 0.82, L: [0, 0.46, 0.26, 0], R: [0, 0, 0.0, 0], k: 0.985, pz: 0, lean: 4, arm: 4 },
        at(ST, 1)] },
      items: [{ kind: 'box', w: 0.60, h: 0.40, d: 0.50, z: 0.64 }] },
    captions: {
      intro: 'De pie frente al cajón, a medio paso de distancia',
      reps: [
        ['Contramovimiento con los brazos atrás y salta al cajón', 'Aterriza suave con todo el pie sobre el cajón'],
        ['Cae en media sentadilla, rodillas alineadas', 'Ponte de pie arriba antes de bajar'],
        ['Baja del cajón paso a paso, sin saltar hacia atrás', 'Prioriza la técnica sobre la altura'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Baja del cajón con cuidado'],
    },
  },
  'TI-PLI-004': {
    ...PLI, family: 'squat', primary: ['Cuádriceps', 'Glúteos'], secondary: ['Isquiotibiales', 'Gastrocnemio y sóleo', 'Core'], name: 'Salto en split (split jump / scissor jump)', level: 'Intermedio',
    frame: { tz: -0.10, dist: 4.8, distLow: 4.1, tyLow: 0.62 }, tempo: { down: 1, pause: 0, up: 0.6 }, rest: 1.0, upLabel: 'SALTO',
    cfg: { ...SPLCFG, arms: 'hips', split: { ...SPLIT_FLOOR, jump: true } },
    captions: {
      intro: 'Posición de zancada, manos en la cadera y tronco erguido',
      reps: [
        ['Baja y salta cambiando de pierna en el aire', 'Aterriza en zancada y amortigua'],
        ['Tronco erguido durante el salto', 'Rodilla delantera alineada con el pie'],
        ['Aterrizaje suave y estable', 'Mantén el ritmo sin perder la técnica'],
      ],
      orbit: ['Aterriza en zancada', 'Posición baja: músculos que trabajan', 'Salta y cambia de pierna'],
    },
  },
  'TI-PLI-005': {
    ...PLI, name: 'Salto lateral a una pierna', level: 'Intermedio', tempo: { down: 1.7, pause: 0.9, up: 1.9 }, rest: 0.5,
    phaseNames: { BAJADA: 'SALTO', PAUSA: 'ESTABILIZA', SUBIDA: 'SALTO DE VUELTA', ARRIBA: 'INICIO' }, holdLabel: 'ATERRIZAJE',
    frame: { tz: 0.0, dist: 5.4, ty: 1.10, distLow: 5.0, tyLow: 1.0 }, views: { f34: { az: -20 }, side: { az: -60 }, front: { az: 0 } },
    cfg: { free: { type: 'jumpKF', stance: 0.09, free: 'R',
      down: [{ u: 0, L: [0, 0, 0, 0], R: [0, 70, 20, 20], k: 0.985, lean: 4, arm: 8, armOut: 0.25 },
        { u: 0.32, L: [0, 0, 0, 0], R: [0, 80, 25, 20], k: 0.86, pz: -0.05, lean: 24, arm: -20, armOut: 0.3 },
        { u: 0.46, L: [0, 0.03, 0, 30], R: [0, 70, 15, 20], k: 0.997, lean: 6, arm: 60, armOut: 0.3 },
        { u: 0.66, L: [0.24, 0.20, 0, 20], R: [0, 75, 20, 20], k: 0.99, lean: 4, arm: 50, armOut: 0.35 },
        { u: 0.82, L: [0.48, 0, 0, 6], R: [0, 75, 20, 20], k: 0.975, lean: 8, arm: 30, armOut: 0.35 },
        { u: 1, L: [0.48, 0, 0, 0], R: [0, 80, 25, 20], k: 0.87, pz: -0.05, lean: 22, arm: 20, armOut: 0.3 }],
      up: [{ u: 0, L: [0.48, 0, 0, 0], R: [0, 80, 25, 20], k: 0.87, pz: -0.05, lean: 22, arm: 20, armOut: 0.3 },
        { u: 0.20, L: [0.48, 0.03, 0, 30], R: [0, 70, 15, 20], k: 0.997, lean: 6, arm: 50, armOut: 0.3 },
        { u: 0.42, L: [0.24, 0.18, 0, 20], R: [0, 75, 20, 20], k: 0.99, lean: 4, arm: 40, armOut: 0.3 },
        { u: 0.60, L: [0, 0, 0, 6], R: [0, 75, 20, 20], k: 0.975, lean: 8, arm: 25, armOut: 0.3 },
        { u: 0.78, L: [0, 0, 0, 0], R: [0, 80, 25, 20], k: 0.87, pz: -0.05, lean: 20, arm: 15, armOut: 0.3 },
        { u: 1, L: [0, 0, 0, 0], R: [0, 70, 20, 20], k: 0.985, lean: 4, arm: 8, armOut: 0.25 }] } },
    captions: {
      intro: 'De pie sobre una pierna',
      reps: [
        ['Salta hacia el lado y aterriza sobre la misma pierna', 'Estabiliza 1 s y vuelve saltando'],
        ['La rodilla no se va hacia dentro al aterrizar', 'Aterrizaje suave sobre la parte delantera del pie'],
        ['Brazos abiertos para equilibrarte', 'Cambia de pierna al terminar la serie'],
      ],
      orbit: ['Aterriza y estabiliza', 'Aterrizaje: músculos que trabajan', 'Vuelve saltando'],
    },
  },
});
