// Lote 78: movilidad de hombro MO-HOM-001 … 010
import { EXERCISES } from './exercises.js';
import { MOB } from './ex_lote74.js';
import './ex_lote76.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
export const HOM = { ...MOB, sub: 'Movilidad de hombro', primary: ['Movilidad de hombro', 'Manguito rotador'], secondary: ['Deltoides', 'Pectoral'] };
const mk = (base, name, level, captions, extra = {}) => ({ ...like(base, {}), ...HOM, family: EXERCISES[base].family, name, level, captions, ...extra });
const ORB = ['Movilidad', 'Movilidad de hombro: músculos que trabajan', 'Vuelve despacio'];

Object.assign(EXERCISES, {
  'MO-HOM-001': mk('TS-MHO-009', 'Movilidad de hombro con banda en distracción articular', 'Intermedio', {
    intro: 'Banda anclada a la altura del hombro rodeando la parte alta del brazo',
    reps: [
      ['Aléjate para que la banda tire suavemente del hombro', 'Mueve el brazo en el rango cómodo'],
      ['Hombro relajado, sin encoger', 'Mantén 2–3 s en cada posición'],
      ['1–2 min por lado', 'Sin dolor'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-002': mk('TS-MHO-002', 'Circunducción de hombro en cuadrupedia (shoulder CARs)', 'Intermedio', {
    intro: 'De pie o en cuadrupedia, con un bastón para guiar el recorrido',
    reps: [
      ['Dibuja el círculo más amplio posible con el brazo', 'Muy lento, sin mover el tronco'],
      ['Adelante, arriba, atrás y vuelta', 'Abdomen activo'],
      ['3–5 círculos por sentido', 'Sin dolor ni chasquidos molestos'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-003': mk('TS-ESC-002', 'Deslizamiento de hombro en pared (wall shoulder slide)', 'Principiante', {
    intro: 'De espaldas a la pared, brazos en W apoyados',
    reps: [
      ['Desliza los brazos hacia arriba sin despegarlos de la pared', 'Baja despacio a la W'],
      ['Zona lumbar cerca de la pared', 'Sube solo hasta donde mantengas el contacto'],
      ['10–12 repeticiones', 'Movimiento lento'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-004': mk('MO-COL-007', 'Estiramiento de dorsal ancho en cuadrupedia', 'Principiante', {
    intro: 'En cuadrupedia, manos un poco por delante de los hombros',
    reps: [
      ['Lleva la cadera hacia los talones con los brazos estirados', 'Hunde el pecho hacia el suelo'],
      ['Mantén 20–30 s respirando', 'Lleva las manos a un lado para estirar más un dorsal'],
      ['Vuelve despacio', 'Cuello relajado'],
    ],
    orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Vuelve despacio'],
  }, { primary: ['Dorsal ancho', 'Movilidad de hombro'], secondary: ['Erectores espinales'] }),
  'MO-HOM-005': mk('TS-MRO-005', 'Movilidad de hombro en rotación externa con banda a 90° de abducción', 'Intermedio', {
    intro: 'Brazo a 90° de abducción y codo a 90°, banda anclada delante',
    reps: [
      ['Gira el antebrazo hacia arriba y atrás sin mover el codo', 'Vuelve despacio'],
      ['Codo a la altura del hombro', 'Escápula estable'],
      ['12–15 repeticiones', 'Tensión ligera de la banda'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-006': mk('TS-MHO-004', 'Movilidad glenohumeral avanzada en decúbito lateral', 'Avanzado', {
    intro: 'Tumbado de lado sobre el hombro a trabajar, codo a 90°',
    reps: [
      ['Lleva el antebrazo hacia el suelo con ayuda de la otra mano', 'Vuelve y repite en el rango cómodo'],
      ['Escápula apoyada y estable', 'Presión suave, sin dolor'],
      ['10 repeticiones o 30 s mantenido', 'Respira y relaja el hombro'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-007': mk('TS-MHO-013', 'Movilidad de hombro con bastón por detrás de la espalda', 'Intermedio', {
    intro: 'De pie, bastón sujeto con agarre ancho',
    reps: [
      ['Pasa el bastón por encima de la cabeza hasta detrás de la espalda', 'Vuelve por el mismo camino'],
      ['Brazos estirados todo el recorrido', 'Abre el agarre si no llegas'],
      ['8–10 repeticiones', 'Sin arquear la zona lumbar'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-008': mk('TS-MHO-003', 'Estiramiento de manguito rotador en puerta con rotación', 'Intermedio', {
    intro: 'Antebrazo apoyado en el marco de una puerta, codo a la altura del hombro',
    reps: [
      ['Gira el tronco hacia el lado contrario hasta notar el estiramiento', 'Mantén 20–30 s'],
      ['Hombro abajo y relajado', 'Cambia la altura del codo para variar'],
      ['2–3 repeticiones por lado', 'Sin dolor'],
    ],
    orbit: ['Estiramiento', 'Estiramiento: músculos que trabajan', 'Vuelve despacio'],
  }),
  'MO-HOM-009': mk('TS-MHO-005', 'Movilidad de hombro en cuadrupedia con retroceso de cadera (thread the needle)', 'Intermedio', {
    intro: 'En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera',
    reps: [
      ['Pasa un brazo por debajo del otro y lleva la cadera atrás', 'Apoya el hombro en el suelo si llegas'],
      ['Mantén 2–3 s y vuelve abriendo el brazo', 'Mirada sigue a la mano'],
      ['8 repeticiones por lado', 'Respira al girar'],
    ],
    orbit: ORB,
  }),
  'MO-HOM-010': mk('TS-MHO-012', 'Movilidad de hombro con banda en flexión completa', 'Intermedio', {
    intro: 'De pie, banda o toalla sujeta por encima de la cabeza',
    reps: [
      ['Lleva los brazos hacia arriba y atrás hasta la flexión completa', 'Mantén 2 s y vuelve'],
      ['Costillas abajo: no arquees la espalda', 'Hombros lejos de las orejas'],
      ['10–12 repeticiones', 'Sin dolor'],
    ],
    orbit: ORB,
  }),
});
