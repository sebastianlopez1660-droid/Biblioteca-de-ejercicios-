// Lote 61: desaceleración VE-DEC-002 … 011
import { EXERCISES } from './exercises.js';
import { RUN_FR } from './ex_lote58.js';
import { CONES } from './ex_lote59.js';
import { DEC, brakeProfile } from './ex_lote60.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const BRK = { ...DEC, ...RUN_FR, phaseNames: { BAJADA: 'SPRINT Y FRENADA', SUBIDA: 'SPRINT Y FRENADA', PAUSA: 'SPRINT Y FRENADA', ARRIBA: 'SPRINT Y FRENADA' }, holdLabel: 'FRENADA' };
const brake = (o = {}, extra = {}) => ({ type: 'run', cones: CONES, ...brakeProfile(o), ...extra });
const stopCones = (bp, z = 0.9) => [{ kind: 'cone', at: bp._stop, z, x: 0.55 }, { kind: 'cone', at: bp._stop, z, x: -0.55 }];
const ORB = ['Frenada controlada', 'Desaceleración: músculos que trabajan', 'Vuelve caminando'];

const bp2 = brakeProfile({ dec: 0.75 });
const bp5 = brakeProfile({ dec: 1.3, vmax: 5.6 });
const bp6 = brakeProfile({});
const bp7 = brakeProfile({ wide: 0.12 });
const bp10 = brakeProfile({ rest: 2.6, drop: 0.25 });
const bp11 = brakeProfile({ hold: 1.2 });

Object.assign(EXERCISES, {
  'VE-DEC-002': {
    ...BRK, name: 'Frenado en tres pasos (3-step deceleration)', level: 'Intermedio',
    cfg: { free: { ...brake({ dec: 0.75 }), marks: stopCones(bp2) } },
    captions: {
      intro: 'En la salida de un tramo de sprint con una línea de frenada',
      reps: [
        ['Sprint y frena en solo tres pasos al llegar a la línea', 'Cada paso más corto y más bajo'],
        ['Abre la base de apoyo en el último paso', 'Cadera atrás y tronco firme'],
        ['Termina quieto en posición atlética', 'Rodillas alineadas con los pies'],
      ],
      orbit: ORB,
    },
  },
  'VE-DEC-003': {
    ...BRK, name: 'Desaceleración con cambio de dirección posterior', level: 'Intermedio',
    phaseNames: { BAJADA: 'FRENADA Y CAMBIO', SUBIDA: 'FRENADA Y CAMBIO', PAUSA: 'FRENADA Y CAMBIO', ARRIBA: 'FRENADA Y CAMBIO' },
    cfg: { free: { type: 'run', cones: CONES, loop: 9.0,
      speeds: [[0, 0], [0.5, 0], [0.9, 1.8], [2.9, 6.0], [3.3, 6.0], [4.2, 0], [4.8, 0], [5.2, 1.5], [6.4, 4.8], [7.4, 0], [9.0, 0]],
      yaws: [[0, 0], [4.25, 0], [4.85, 180], [8.3, 180], [9.0, 360]],
      leans: [[0, 4], [0.3, 4], [0.6, 38], [1.4, 23], [2.9, 10], [3.3, 8], [3.7, -14], [4.2, -4], [4.4, 20], [4.85, 30], [5.4, 30], [6.4, 10], [6.8, -10], [7.4, -3], [7.8, 14], [8.6, 14], [9.0, 4]],
      dys: [[0, 0], [3.3, 0], [3.8, -0.17], [4.2, -0.21], [4.85, -0.18], [5.4, -0.05], [6.4, 0], [6.9, -0.15], [7.4, -0.18], [8.6, -0.16], [9.0, 0]],
      widths: [[0, 0.09], [3.3, 0.09], [4.2, 0.17], [4.85, 0.14], [5.4, 0.09], [6.4, 0.09], [7.4, 0.16], [8.6, 0.16], [9.0, 0.09]] } },
    captions: {
      intro: 'En la salida de un tramo de sprint con un cono de giro',
      reps: [
        ['Sprint, frena antes del cono y gira para volver', 'Baja la cadera antes de girar'],
        ['Frena primero, después cambia de dirección', 'Pie exterior firme en el giro'],
        ['Acelera de vuelta con pasos cortos', 'Alterna el lado de giro'],
      ],
      orbit: ['Frenada y cambio de dirección', 'Desaceleración: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'VE-DEC-004': {
    ...like('PL-SHO-011', {}), primary: DEC.primary, secondary: DEC.secondary, sub: 'Desaceleración', name: 'Desaceleración tras salto horizontal', level: 'Intermedio',
    captions: {
      intro: 'De pie, pies a la anchura de la cadera',
      reps: [
        ['Salta hacia delante y frena el cuerpo al aterrizar', 'Clava la recepción sin dar pasos extra'],
        ['Aterriza con cadera atrás y rodillas flexionadas', 'Absorbe con las dos piernas a la vez'],
        ['Mantén 2 s la posición de frenado', 'Rodillas alineadas con los pies'],
      ],
      orbit: ['Recepción clavada', 'Desaceleración: músculos que trabajan', 'Vuelve al inicio'],
    },
  },
  'VE-DEC-005': {
    ...BRK, name: 'Desaceleración escalonada en distancia decreciente', level: 'Intermedio',
    cfg: { free: { ...brake({ dec: 1.3, vmax: 5.6 }), marks: stopCones(bp5) } },
    captions: {
      intro: 'Tramo de sprint con varias líneas de frenada cada vez más cerca',
      reps: [
        ['Primera serie: frena con mucho espacio', 'Cada serie la zona de frenada es más corta'],
        ['Más corta la distancia, más baja la cadera', 'Apoyos cortos y rápidos'],
        ['Termina quieto en posición atlética', 'Tronco firme, sin irte hacia delante'],
      ],
      orbit: ORB,
    },
  },
  'VE-DEC-006': {
    ...BRK, name: 'Desaceleración ante obstáculo', level: 'Intermedio',
    cfg: { free: { ...brake({}), marks: [{ kind: 'hurdle', at: bp6._stop, z: 0.85, h: 0.5 }] } },
    captions: {
      intro: 'Tramo de sprint con un obstáculo blando al final',
      reps: [
        ['Sprint hacia el obstáculo y frena antes de tocarlo', 'Mira el obstáculo para calcular la frenada'],
        ['Baja la cadera y abre la base de apoyo', 'Tronco firme y brazos para equilibrar'],
        ['Termina quieto delante del obstáculo', 'Rodillas alineadas con los pies'],
      ],
      orbit: ORB,
    },
  },
  'VE-DEC-007': {
    ...BRK, name: 'Desaceleración unipodal (single-leg deceleration)', level: 'Intermedio',
    cfg: { free: { ...brake({ wide: 0.12 }), lifts: [[0, 0], [bp7._stop, 0], [bp7._stop + 0.3, 0.22], [bp7.loop - 0.5, 0.22], [bp7.loop, 0]], marks: stopCones(bp7) } },
    captions: {
      intro: 'Tramo de sprint con una línea de frenada',
      reps: [
        ['Sprint y frena hasta quedar sobre una sola pierna', 'Sostén el equilibrio 2 s'],
        ['Rodilla de apoyo alineada con el pie', 'Cadera atrás y tronco firme'],
        ['Alterna la pierna de frenada', 'Reduce la velocidad si pierdes el control'],
      ],
      orbit: ['Frenada a una pierna', 'Desaceleración: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'VE-DEC-008': {
    ...BRK, name: 'Desaceleración con chaleco lastrado', level: 'Avanzado',
    cfg: { free: { ...brake({ vmax: 5.8 }), vest: true } },
    captions: {
      intro: 'Con un chaleco lastrado ajustado al tronco',
      reps: [
        ['Sprint y frena controlando el peso extra', 'Baja más la cadera que sin chaleco'],
        ['Apoyos cortos y base amplia al frenar', 'Tronco firme: el chaleco no debe moverse'],
        ['Carga moderada: 5–10 % del peso corporal', 'Termina quieto en posición atlética'],
      ],
      orbit: ORB,
    },
  },
  'VE-DEC-009': {
    ...BRK, frame: { ...RUN_FR.frame, ty: RUN_FR.frame.ty + 0.5, tyLow: RUN_FR.frame.tyLow + 0.5 }, name: 'Frenado en descenso de cuesta (controlado)', level: 'Avanzado',
    cfg: { free: (() => { const p = brake({ vmax: 5.4 }); return { ...p, slope: -6, rampH: 0.5, leans: p.leans.map(([t, l]) => [t, l - 4]) }; })() },
    captions: {
      intro: 'En lo alto de una cuesta suave',
      reps: [
        ['Corre cuesta abajo y frena de forma controlada', 'Frenar en bajada exige más a los cuádriceps'],
        ['Pasos cortos y cadera baja al frenar', 'No te eches demasiado atrás'],
        ['Empieza a poca velocidad y sube poco a poco', 'Termina quieto en posición atlética'],
      ],
      orbit: ORB,
    },
  },
  'VE-DEC-010': {
    ...BRK, name: 'Desaceleración con parada y sostenimiento (stick)', level: 'Avanzado', holdLabel: 'SOSTÉN',
    cfg: { free: { ...brake({ rest: 2.6, drop: 0.25 }), marks: stopCones(bp10) } },
    captions: {
      intro: 'Tramo de sprint con una línea de parada',
      reps: [
        ['Sprint y para en seco en la línea', 'Sostén la posición baja 3 s sin moverte'],
        ['Cadera atrás, pecho arriba y rodillas firmes', 'Peso repartido en todo el pie'],
        ['Si das pasos extra, reduce la velocidad', 'Vuelve caminando'],
      ],
      orbit: ['Parada sostenida', 'Desaceleración: músculos que trabajan', 'Vuelve caminando'],
    },
  },
  'VE-DEC-011': {
    ...BRK, name: 'Desaceleración reactiva ante señal', level: 'Avanzado',
    cfg: { free: brake({ hold: 1.2 }) },
    captions: {
      intro: 'Corriendo a velocidad alta, atento a la señal del compañero',
      reps: [
        ['Frena en cuanto oigas o veas la señal', 'Sin anticiparte: espera el estímulo'],
        ['Baja la cadera y abre la base de apoyo', 'Tronco firme al frenar'],
        ['Cambia el momento de la señal en cada repetición', 'Termina quieto en posición atlética'],
      ],
      orbit: ORB,
    },
  },
});
