// Lote 64: VE-FRE-010, 011 y técnica de carrera VE-TEC-001 … 008
import { EXERCISES } from './exercises.js';
import { VEL, RUN_FR, sprintProfile } from './ex_lote58.js';
import { CONES } from './ex_lote59.js';
import { FRE, LADDER, spot } from './ex_lote63.js';

const like = (code, extra) => ({ ...EXERCISES[code], ...extra });
const DRILL = { phaseNames: { BAJADA: 'EJERCICIO', SUBIDA: 'EJERCICIO', PAUSA: 'EJERCICIO', ARRIBA: 'EJERCICIO' }, holdLabel: 'EJERCICIO' };
export const TEC = { ...VEL, ...RUN_FR, ...DRILL, sub: 'Técnica de carrera', primary: ['Flexores de cadera', 'Isquiotibiales', 'Glúteos'], secondary: ['Gastrocnemio y sóleo', 'Core'] };
// desplazamiento lento y constante (drills)
export const drillMove = (v, o = {}) => ({ type: 'run', loop: 7.0, speeds: [[0, 0], [0.5, 0], [1.2, v], [5.4, v], [6.2, 0], [7.0, 0]], leans: [[0, 3], [7.0, 3]], ...o });
const ORB = ['Técnica', 'Técnica de carrera: músculos que trabajan', 'Termina suave'];

Object.assign(EXERCISES, {
  'VE-FRE-010': {
    ...FRE, name: 'Sprint corto con foco en cadencia máxima', level: 'Avanzado',
    phaseNames: VEL.phaseNames, holdLabel: VEL.holdLabel,
    cfg: { free: { type: 'run', cones: CONES, ...sprintProfile({ acc: 2.2, hold: 1.0, vmax: 7.2, lean0: 38 }), cad0: 2.6, cadK: 0.26 } },
    captions: {
      intro: 'Salida de un tramo corto de 20–30 m',
      reps: [
        ['Sprint pensando en pasos rápidos, no largos', 'Apoyos de punta bajo la cadera'],
        ['Brazos rápidos para marcar la frecuencia', 'Rodillas arriba sin alargar la zancada'],
        ['Recupera por completo entre series', 'Frena progresivamente'],
      ],
      orbit: ['Frecuencia máxima', 'Sprint: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-FRE-011': {
    ...FRE, ...DRILL, name: 'Carrera sobre marcas de contacto rápido', level: 'Avanzado',
    cfg: { free: { type: 'run', ladder: { w: 0.5, d: 1.1, rails: false }, loop: 7.5, cadence: 4.4, stance: 0.34,
      speeds: [[0, 0], [0.5, 0], [1.5, 4.8], [5.6, 4.8], [6.6, 0], [7.5, 0]], leans: [[0, 4], [0.5, 4], [1.0, 16], [2.0, 10], [5.6, 10], [6.2, -6], [6.6, -2], [7.5, 4]] } },
    captions: {
      intro: 'Marcas en el suelo a distancia fija (1–1,2 m)',
      reps: [
        ['Pisa cada marca con contactos muy cortos', 'El suelo quema: despega rápido'],
        ['Rodilla arriba y apoyo bajo la cadera', 'Brazos rápidos y coordinados'],
        ['Acorta la distancia entre marcas para subir la frecuencia', 'Recupera caminando'],
      ],
      orbit: ['Contactos rápidos', 'Frecuencia: músculos que trabajan', 'Frena progresivamente'],
    },
  },
  'VE-TEC-001': {
    ...TEC, name: 'Skipping técnico A (A-skip)', level: 'Intermedio',
    cfg: { free: drillMove(1.5, { cones: CONES, cadence: 3.4, stance: 0.38, knee: 1.45, heel: 0.35, arm: 55, fly: 0.03 }) },
    captions: {
      intro: 'Al inicio de un tramo de 15–20 m, postura alta',
      reps: [
        ['Sube la rodilla con el pie en flexión dorsal', 'Apoya activo bajo la cadera'],
        ['Brazo contrario a la pierna, codo a 90°', 'Tronco erguido, sin echarte atrás'],
        ['Ritmo constante y contactos cortos', 'Avanza poco a poco'],
      ],
      orbit: ORB,
    },
  },
  'VE-TEC-002': {
    ...TEC, name: 'Skipping técnico B (B-skip)', level: 'Intermedio',
    cfg: { free: drillMove(1.4, { cones: CONES, cadence: 2.9, stance: 0.34, knee: 1.6, heel: 0.3, arm: 55, fly: 0.03 }) },
    captions: {
      intro: 'Al inicio de un tramo de 15–20 m, postura alta',
      reps: [
        ['Sube la rodilla, extiende la pierna y barre el suelo hacia atrás', 'El pie cae bajo la cadera'],
        ['Zarpazo activo con los isquiotibiales', 'Tronco erguido y estable'],
        ['Domina el skip A antes de este', 'Ritmo constante'],
      ],
      orbit: ORB,
    },
  },
  'VE-TEC-003': {
    ...TEC, name: 'Talón al glúteo caminando (heel-to-butt drill)', level: 'Intermedio', primary: ['Isquiotibiales', 'Flexores de cadera'],
    cfg: { free: drillMove(0.9, { cones: CONES, cadence: 1.9, stance: 0.58, knee: 0.15, heel: 1.35, arm: 35, fly: 0, drop: 0.004 }) },
    captions: {
      intro: 'De pie, postura alta',
      reps: [
        ['Caminando, lleva el talón hacia el glúteo en cada paso', 'Rodilla apuntando al suelo'],
        ['Apoya sobre la parte delantera del pie', 'Tronco erguido'],
        ['Movimiento controlado y rítmico', 'Brazos coordinados'],
      ],
      orbit: ORB,
    },
  },
  'VE-TEC-004': {
    ...TEC, name: 'Rodillas altas caminando (walking high knees)', level: 'Intermedio',
    cfg: { free: drillMove(0.9, { cones: CONES, cadence: 1.8, stance: 0.6, knee: 1.5, heel: 0.3, arm: 45, fly: 0, drop: 0.004 }) },
    captions: {
      intro: 'De pie, postura alta',
      reps: [
        ['Caminando, sube la rodilla a la altura de la cadera', 'Ponte de puntillas en la pierna de apoyo'],
        ['Pie en flexión dorsal al subir', 'Tronco erguido y brazos coordinados'],
        ['Movimiento controlado', 'Pausa breve arriba en cada paso'],
      ],
      orbit: ORB,
    },
  },
  'VE-TEC-005': {
    ...TEC, name: 'Drill técnico contra pared (wall drill)', level: 'Intermedio', primary: ['Flexores de cadera', 'Glúteos', 'Cuádriceps'],
    views: { f34: { az: -70, el: 10 }, side: { az: -90, el: 6 }, front: { az: -40, el: 10 }, back34: { az: -130, el: 14 } },
    cfg: { free: spot({ cadence: 1.4, stance: 0.55, knee: 1.25, heel: 0.35, lean: 40, footZ: -0.36, dy: -0.11, fly: 0, drop: 0.004, handsAt: [0.2, 1.18, 0.80] }),
      items: [{ kind: 'wall', flip: true, z: 0.86, w: 1.4, h: 2.3 }] },
    captions: {
      intro: 'Manos en la pared, cuerpo inclinado unos 45° en línea recta',
      reps: [
        ['Sube una rodilla al frente con el pie en flexión dorsal', 'Cambia de pierna con un gesto rápido'],
        ['Cuerpo recto de los talones a la cabeza', 'Apoyo de punta bajo la cadera'],
        ['Empieza con cambios sueltos, después en series', 'Cadera alta: no la dejes caer'],
      ],
      orbit: ['Posición de aceleración', 'Técnica de arranque: músculos que trabajan', 'Termina suave'],
    },
  },
  'VE-TEC-006': {
    ...TEC, name: 'Drill de acción de brazos (arm drive drill)', level: 'Intermedio', primary: ['Deltoides', 'Core'], secondary: ['Dorsal ancho', 'Flexores de cadera'],
    cfg: { free: spot({ cadence: 2.8, stance: 0.999, knee: 0, heel: 0, lean: 4, arm: 68, fly: 0, drop: 0, twist: 3, width: 0.1, footZ: 0.04 }) },
    captions: {
      intro: 'De pie, pies a la anchura de la cadera, codos a 90°',
      reps: [
        ['Mueve los brazos como al correr: mano a la altura de la cara delante', 'Atrás, la mano pasa junto a la cadera'],
        ['Movimiento desde el hombro, no desde el codo', 'Hombros relajados y tronco quieto'],
        ['Aumenta la velocidad sin perder la amplitud', 'Series de 10–15 s'],
      ],
      orbit: ['Braceo', 'Acción de brazos: músculos que trabajan', 'Termina suave'],
    },
  },
  'VE-TEC-007': {
    ...TEC, name: 'Drill de apoyo en el antepié (forefoot running drill)', level: 'Intermedio', primary: ['Gastrocnemio y sóleo', 'Flexores de cadera'], secondary: ['Cuádriceps', 'Core'],
    cfg: { free: drillMove(2.6, { cones: CONES, cadence: 3.2, stance: 0.36, knee: 0.55, heel: 0.45, arm: 40, fly: 0.03 }) },
    captions: {
      intro: 'Al inicio de un tramo de 20–30 m',
      reps: [
        ['Trota apoyando primero la parte delantera del pie', 'El talón casi no toca el suelo'],
        ['Apoyo bajo la cadera, no por delante', 'Tobillo firme en cada contacto'],
        ['Contactos cortos y elásticos', 'Postura alta'],
      ],
      orbit: ORB,
    },
  },
  'VE-TEC-008': {
    ...TEC, name: 'Carrera técnica en escalera de agilidad', level: 'Avanzado',
    cfg: { free: { type: 'run', ladder: LADDER, loop: 7.0, cadence: 4.4, stance: 0.42, knee: 0.9, heel: 0.35, width: 0.06,
      speeds: [[0, 0], [0.5, 0], [1.2, 2.0], [5.2, 2.0], [6.0, 0], [7.0, 0]], leans: [[0, 4], [0.5, 4], [1.0, 10], [5.2, 6], [6.0, 2], [7.0, 4]] } },
    captions: {
      intro: 'Frente a la escalera de agilidad',
      reps: [
        ['Un apoyo por hueco con técnica de carrera completa', 'Rodilla arriba y pie en flexión dorsal'],
        ['Apoyos de punta bajo la cadera', 'Brazos amplios y coordinados'],
        ['Mirada al frente', 'Calidad antes que velocidad'],
      ],
      orbit: ORB,
    },
  },
});
