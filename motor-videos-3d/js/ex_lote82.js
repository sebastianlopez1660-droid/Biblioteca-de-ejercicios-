// Lote 82: movilidad activa MO-ACT-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';
import './ex_lote75.js';
import './ex_lote76.js';
import './ex_lote80.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const ACT = { ...MOB, sub: 'Movilidad activa' };
const mk = (base, name, level, prim, sec, captions) => ({ ...like(base, {}), ...ACT, family: EXERCISES[base].family, primary: prim, secondary: sec, name, level, captions });
const ORB = ['Control activo', 'Movilidad activa: músculos que trabajan', 'Vuelve despacio'];
const SUP = { P: [0, 0.115, 0], rot: [-88, 0, 0], sp: [0, 0, 0], nk: [12, 0], lR: [45, 97, 10, 0], aL: [0, 30, 0], aR: [0, 30, 0], pL: [0, -1, 0, 0, 0, 1], pR: [0, -1, 0, 0, 0, 1] };

Object.assign(EXERCISES, {
  'MO-ACT-001': mk('TI-MOV-005', 'Control activo de elevación de pierna recta (variante de movilidad)', 'Principiante', ['Flexores de cadera', 'Cuádriceps'], ['Isquiotibiales', 'Core'], {
    intro: 'Boca arriba, piernas estiradas',
    reps: [
      ['Sube una pierna estirada lo más alto posible sin ayuda', 'Baja despacio sin dejarla caer'],
      ['La otra pierna queda pegada al suelo', 'Zona lumbar estable'],
      ['8–10 repeticiones por pierna', 'Rodilla estirada todo el recorrido'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-002': mk('TI-MOV-002', 'Círculos activos de cadera de pie sin apoyo (standing hip CARs)', 'Intermedio', ['Movilidad de cadera', 'Glúteo medio'], ['Flexores de cadera', 'Core'], {
    intro: 'De pie sobre una pierna, sin apoyo',
    reps: [
      ['Dibuja con la rodilla el círculo más amplio posible', 'Adelante, al lado, atrás y vuelta'],
      ['Pelvis y tronco quietos', 'Pierna de apoyo firme'],
      ['3–5 círculos por sentido y pierna', 'Muy lento'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-003': mk('TS-MHO-001', 'Círculos activos de hombro de pie sin apoyo (standing shoulder CARs)', 'Intermedio', ['Movilidad de hombro', 'Manguito rotador'], ['Deltoides', 'Trapecio'], {
    intro: 'De pie, brazo relajado al lado del cuerpo',
    reps: [
      ['Dibuja el círculo más amplio posible con el brazo estirado', 'Muy lento y en todo el rango'],
      ['El tronco no se mueve', 'Costillas abajo y abdomen activo'],
      ['3–5 círculos por sentido y brazo', 'Sin dolor'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-004': mk('MO-COL-006', 'Rotación activa de columna torácica sentado sin apoyo', 'Principiante', ['Oblicuos', 'Erectores espinales'], ['Core'], {
    intro: 'Sentado sin respaldo, brazos cruzados sobre el pecho',
    reps: [
      ['Gira el tronco lo máximo posible con tu propia fuerza', 'Mantén 2 s y gira al otro lado'],
      ['Pelvis quieta y espalda alta', 'Mirada acompaña el giro'],
      ['8–10 repeticiones por lado', 'Sin impulso'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-005': mk('TI-TIB-001', 'Flexión activa de tobillo en cadena abierta contra resistencia', 'Principiante', ['Tibial anterior'], ['Gastrocnemio y sóleo'], {
    intro: 'Sentado con las piernas estiradas, banda anclada delante sobre el empeine',
    reps: [
      ['Lleva la punta del pie hacia ti contra la banda', 'Vuelve despacio'],
      ['Solo se mueve el tobillo', 'Recorre todo el rango'],
      ['15–20 repeticiones', 'Tensión ligera'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-006': mk('TS-MRO-006', 'Elevación activa de brazo en plano escapular (active scaption)', 'Principiante', ['Deltoides', 'Serrato anterior'], ['Manguito rotador', 'Trapecio inferior'], {
    intro: 'De pie, brazos a los lados y pulgares hacia arriba',
    reps: [
      ['Eleva los brazos en diagonal, a unos 30° por delante del cuerpo', 'Sube hasta donde controles y baja despacio'],
      ['Hombros lejos de las orejas', 'Sin arquear la espalda'],
      ['10–12 repeticiones', 'Carga muy ligera o sin peso'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-007': {
    ...ACT, primary: ['Movilidad de cadera', 'Glúteos'], secondary: ['Aductores', 'Glúteo medio'], name: 'Rotación activa de cadera en decúbito supino (active hip rotation)', level: 'Principiante',
    tempo: { down: 1.5, pause: 0.5, up: 1.5 }, phaseNames: { BAJADA: 'ROTACIÓN INTERNA', SUBIDA: 'ROTACIÓN EXTERNA', ARRIBA: 'ROTACIÓN EXTERNA' }, holdLabel: 'ROTACIÓN',
    frame: { dist: 4.0, ty: 0.32, tz: 0.25, distLow: 3.6, tyLow: 0.32 }, views: { f34: { az: -30, el: 24 }, side: { az: -90, el: 8 }, front: { az: -10, el: 28 }, back34: { az: -140, el: 26 } },
    cfg: { free: { type: 'kfPose', keys: [
      { u: 0, ...SUP, lL: [90, 90, 0, 0, 38] },
      { u: 1, ...SUP, lL: [90, 90, 0, 0, -32] },
    ] }, items: [{ kind: 'mat', z: 0.15, l: 1.9 }] },
    captions: {
      intro: 'Boca arriba, una cadera y rodilla a 90° con el pie en el aire',
      reps: [
        ['Mueve el pie hacia fuera y hacia dentro girando la cadera', 'La rodilla queda sobre la cadera'],
        ['Pelvis apoyada y estable', 'Recorre todo el rango sin compensar'],
        ['10–12 repeticiones por pierna', 'Movimiento lento'],
      ],
      orbit: ORB,
    },
  },
  'MO-ACT-008': mk('CO-AFL-001', 'Extensión activa de columna en decúbito prono (active spinal extension)', 'Principiante', ['Erectores espinales'], ['Glúteos', 'Trapecio inferior'], {
    intro: 'Boca abajo, brazos junto al cuerpo o en W',
    reps: [
      ['Despega el pecho del suelo con la fuerza de la espalda', 'Mantén 2 s y baja despacio'],
      ['Mirada al suelo, cuello largo', 'Piernas relajadas en el suelo'],
      ['10–12 repeticiones', 'Sin dolor lumbar'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-009': mk('MO-MUN-002', 'Movilidad activa de muñeca contra gravedad', 'Principiante', ['Extensores del antebrazo', 'Flexores del antebrazo'], ['Antebrazo'], {
    intro: 'Sentado, antebrazos apoyados en los muslos',
    reps: [
      ['Sube la mano contra la gravedad y bájala despacio', 'Después gira el antebrazo y repite'],
      ['El antebrazo no se mueve', 'Todo el rango, sin peso'],
      ['15 repeticiones por posición', 'Movimiento controlado'],
    ],
    orbit: ORB,
  }),
  'MO-ACT-010': mk('MO-ROD-001', 'Control articular activo de rodilla en cadena abierta (knee CARs)', 'Principiante', ['Cuádriceps', 'Isquiotibiales'], ['Flexores de cadera'], {
    intro: 'Sentado en un cajón, pies en el suelo',
    reps: [
      ['Estira y dobla la rodilla en todo su rango con control', 'Añade pequeñas rotaciones del pie al final'],
      ['Muslo apoyado y quieto', 'Movimiento lento'],
      ['5–8 repeticiones por pierna', 'Sin dolor'],
    ],
    orbit: ORB,
  }),
});
