// Lote 102: estabilidad de core isométrica CO-CES-006 … 010 (posturas sostenidas a partir de ejercicios ya definidos)
import { EXERCISES } from './exercises.js';
import './ex_lote41.js';
import './ex_lote42.js';
import './ex_lote44.js';
import './ex_lote50.js';

const CES = { sub: 'Estabilidad isométrica', primary: ['Transverso abdominal', 'Recto abdominal', 'Oblicuos'], secondary: ['Deltoides', 'Glúteos'], labelAll: true,
  iso: true, tempo: { down: 1.5, pause: 6, up: 1.5 }, holdLabel: 'SOSTÉN' };
// convierte la clave i de un ejercicio kfPose en una postura que se mantiene
const hold = (code, i) => {
  const d = EXERCISES[code], f = d.cfg.free, ks = f.keys, k = ks[i < 0 ? ks.length + i : i];
  return { ...d, cfg: { ...d.cfg, free: { ...f, keys: [{ ...ks[0], u: 0 }, { ...k, u: 1 }] } } };
};

Object.assign(EXERCISES, {
  'CO-CES-006': {
    ...EXERCISES['CO-CES-003'], ...CES, name: 'Sostén en V con piernas extendidas (hollow hold)', level: 'Intermedio',
    captions: {
      intro: 'Boca arriba, brazos por encima de la cabeza',
      reps: [
        ['Eleva hombros y piernas estiradas formando una V suave', 'Zona lumbar pegada al suelo'],
        ['Mantén 20–30 s respirando', 'Si la espalda se despega, dobla las rodillas'],
        ['3–4 series', 'Barbilla un poco hacia el pecho'],
      ],
      orbit: ['Sostén', 'Core isométrico: músculos que trabajan', 'Baja con control'],
    },
  },
  'CO-CES-007': {
    ...hold('CO-AEX-003', 0), ...CES, name: 'Plancha con brazos extendidos (high plank hold)', level: 'Avanzado',
    captions: {
      intro: 'Manos bajo los hombros y brazos estirados',
      reps: [
        ['Mantén el cuerpo recto de la cabeza a los talones', 'Empuja el suelo separando las escápulas'],
        ['Abdomen y glúteos firmes', 'Mantén 30–60 s'],
        ['3–4 series', 'Sin hundir la cadera'],
      ],
      orbit: ['Sostén', 'Core isométrico: músculos que trabajan', 'Baja con control'],
    },
  },
  'CO-CES-008': {
    ...EXERCISES['CO-AFL-010'], ...CES, name: 'Sostén isométrico en suspensión (TRX plank)', level: 'Avanzado',
    captions: {
      intro: 'Pies en las cinchas de suspensión y apoyo de antebrazos o manos',
      reps: [
        ['Mantén la plancha sin que las cinchas se balanceen', 'Cuerpo recto de la cabeza a los talones'],
        ['Abdomen y glúteos firmes', 'Mantén 20–40 s'],
        ['3–4 series', 'Respira con normalidad'],
      ],
      orbit: ['Sostén', 'Core isométrico: músculos que trabajan', 'Baja con control'],
    },
  },
  'CO-CES-009': {
    ...hold('CO-ARO-005', -1), ...CES, primary: ['Erectores espinales', 'Transverso abdominal', 'Glúteos'], secondary: ['Oblicuos', 'Deltoides'], name: 'Bird dog isométrico (sostenido)', level: 'Avanzado',
    captions: {
      intro: 'En cuadrupedia, columna neutra',
      reps: [
        ['Estira brazo y pierna contraria y mantén 10–15 s', 'Pelvis nivelada y tronco quieto'],
        ['Mano y talón lejos, sin subir por encima del tronco', 'Respira con normalidad'],
        ['Alterna lados: 3–5 por lado', 'Movimiento de entrada lento'],
      ],
      orbit: ['Sostén', 'Core isométrico: músculos que trabajan', 'Vuelve con control'],
    },
  },
  'CO-CES-010': {
    ...hold('CO-AEX-002', -1), ...CES, primary: ['Transverso abdominal', 'Glúteos', 'Recto abdominal'], secondary: ['Oblicuos', 'Deltoides'], name: 'Plancha con elevación de pierna sostenida', level: 'Avanzado',
    captions: {
      intro: 'En plancha sobre los antebrazos',
      reps: [
        ['Eleva una pierna estirada y mantén 10–20 s', 'La pelvis no gira ni se hunde'],
        ['Glúteo de la pierna elevada apretado', 'Cuerpo en línea'],
        ['Alterna piernas: 3 por lado', 'Respira con normalidad'],
      ],
      orbit: ['Sostén', 'Core isométrico: músculos que trabajan', 'Baja con control'],
    },
  },
});
