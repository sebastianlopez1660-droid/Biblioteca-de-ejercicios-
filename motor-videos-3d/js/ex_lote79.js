// Lote 79: movilidad de escápula MO-ESC-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';
import './ex_lote76.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const ESCM = { ...MOB, sub: 'Movilidad de escápula', primary: ['Serrato anterior', 'Trapecio medio', 'Romboides'], secondary: ['Trapecio inferior', 'Movilidad de hombro'] };
const mk = (base, name, level, captions, extra = {}) => ({ ...like(base, {}), ...ESCM, family: EXERCISES[base].family, name, level, captions, ...extra });
const ORB = ['Movilidad', 'Movilidad escapular: músculos que trabajan', 'Vuelve despacio'];
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0], lL: [45, 97, 10, 0], lR: [45, 97, 10, 0] };

Object.assign(EXERCISES, {
  'MO-ESC-001': mk('TS-ESC-007', 'Círculos escapulares en cuadrupedia', 'Principiante', {
    intro: 'En cuadrupedia, brazos estirados bajo los hombros',
    reps: [
      ['Dibuja círculos con las escápulas: juntar, bajar, separar y subir', 'Los brazos no se doblan'],
      ['Movimiento lento y amplio', 'Cambia de sentido tras 5 círculos'],
      ['Espalda neutra, sin hundir la zona lumbar', '2–3 series de 10 círculos'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-002': mk('TS-ESC-002', 'Deslizamiento escapular activo en pared (movilidad, no fuerza)', 'Principiante', {
    intro: 'De espaldas a la pared, brazos en W apoyados',
    reps: [
      ['Desliza los brazos arriba notando cómo giran las escápulas', 'Baja despacio y junta las escápulas'],
      ['Sin carga: busca el rango, no el esfuerzo', 'Hombros lejos de las orejas'],
      ['10–12 repeticiones', 'Respira de forma tranquila'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-003': mk('TS-ESC-003', 'Movilidad de escápula con banda en protracción-retracción', 'Principiante', {
    intro: 'De pie, banda ligera sujeta con los brazos estirados al frente',
    reps: [
      ['Junta las escápulas abriendo la banda y después sepáralas', 'Los codos no se doblan'],
      ['Movimiento lento en todo el rango', 'Cuello relajado'],
      ['12–15 repeticiones', 'Tensión ligera'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-004': {
    ...ESCM, primary: ['Serrato anterior', 'Movilidad de hombro'], secondary: ['Pectoral', 'Romboides'], name: 'Movilidad de escápula en decúbito supino con brazo elevado', level: 'Principiante',
    tempo: { down: 1.5, pause: 1, up: 1.5 }, phaseNames: { BAJADA: 'EMPUJA AL TECHO', SUBIDA: 'BAJA LA ESCÁPULA', ARRIBA: 'ESCÁPULA ABAJO' }, holdLabel: 'ESCÁPULA SEPARADA',
    frame: { dist: 4.0, ty: 0.32, tz: 0.15, distLow: 3.6, tyLow: 0.32 }, views: { f34: { az: -40, el: 24 }, side: { az: -90, el: 8 }, front: { az: -20, el: 28 }, back34: { az: -140, el: 28 } },
    cfg: { hands: ['open', 'open'], free: { type: 'kfPose', keys: [
      { u: 0, ...SUP, hL: [0.19, 0.64, -0.40], eL: [1, 0, 0], pL: [-1, 0, 0, 0, 1, 0], hR: [-0.19, 0.64, -0.40], eR: [-1, 0, 0], pR: [1, 0, 0, 0, 1, 0] },
      { u: 1, ...SUP, shz: 0.05, hL: [0.17, 0.72, -0.40], eL: [1, 0, 0], pL: [-1, 0, 0, 0, 1, 0], hR: [-0.17, 0.72, -0.40], eR: [-1, 0, 0], pR: [1, 0, 0, 0, 1, 0] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, rodillas dobladas y brazos estirados hacia el techo',
      reps: [
        ['Empuja las manos hacia el techo separando las escápulas del suelo', 'Vuelve dejando que se junten'],
        ['Codos estirados todo el tiempo', 'Movimiento pequeño y controlado'],
        ['12–15 repeticiones', 'Cuello relajado'],
      ],
      orbit: ORB,
    },
  },
  'MO-ESC-005': mk('TS-PRV-005', 'Rotación escapular hacia arriba y abajo (upward/downward rotation drill)', 'Intermedio', {
    intro: 'De frente a la pared, antebrazos apoyados a la altura de los hombros',
    reps: [
      ['Desliza los brazos arriba: las escápulas giran hacia arriba', 'Al bajar, giran hacia abajo'],
      ['Hombros lejos de las orejas', 'Movimiento lento y consciente'],
      ['10–12 repeticiones', 'Sin dolor'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-006': mk('TS-MHO-002', 'Movilidad de escápula con bastón en elevación', 'Principiante', {
    intro: 'De pie, bastón con agarre ancho delante del cuerpo',
    reps: [
      ['Eleva el bastón por encima de la cabeza dejando subir las escápulas', 'Baja despacio y relájalas'],
      ['Brazos estirados', 'Costillas abajo'],
      ['10–12 repeticiones', 'Movimiento fluido'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-007': mk('TS-ESC-001', 'Protracción escapular activa en apoyo cuadrúpedo', 'Principiante', {
    intro: 'En apoyo de manos, brazos estirados',
    reps: [
      ['Separa las escápulas empujando el suelo', 'Después deja que se junten sin doblar los codos'],
      ['Tronco quieto: solo se mueven las escápulas', 'Abdomen activo'],
      ['12–15 repeticiones', 'Movimiento controlado'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-008': mk('TS-MHO-004', 'Circunducción de escápula en decúbito lateral', 'Intermedio', {
    intro: 'Tumbado de lado, brazo de arriba apoyado',
    reps: [
      ['Mueve la escápula en círculos: arriba, atrás, abajo y adelante', 'Movimiento amplio y lento'],
      ['El tronco no gira', 'Cambia de sentido tras 5 círculos'],
      ['2 series por lado', 'Respira de forma tranquila'],
    ],
    orbit: ORB,
  }),
  'MO-ESC-009': mk('MO-COL-003', 'Movilidad de escápula sobre foam roller bajo la columna torácica', 'Intermedio', {
    intro: 'Rodillo bajo la parte media de la espalda, brazos cruzados',
    reps: [
      ['Extiende la parte alta de la espalda sobre el rodillo', 'Nota cómo se abren las escápulas'],
      ['Glúteos en el suelo', 'Respira hondo en cada repetición'],
      ['8–10 repeticiones', 'Cambia la altura del rodillo'],
    ],
    orbit: ORB,
  }, { primary: ['Erectores espinales', 'Romboides'], secondary: ['Movilidad de hombro'] }),
  'MO-ESC-010': mk('CO-CFU-006', 'Movilidad escapular dinámica en desplazamiento (bear crawl)', 'Intermedio', {
    intro: 'En cuadrupedia con las rodillas a un palmo del suelo',
    reps: [
      ['Avanza moviendo mano y pie contrarios a la vez', 'Escápulas activas en cada apoyo'],
      ['Rodillas bajas y espalda plana', 'Pasos cortos y controlados'],
      ['10–15 m por serie', 'Mirada al suelo delante'],
    ],
    orbit: ORB,
  }, { primary: ['Serrato anterior', 'Deltoides', 'Core'], secondary: ['Cuádriceps', 'Trapecio medio'] }),
});
