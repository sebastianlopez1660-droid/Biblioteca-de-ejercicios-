// Lote 65: técnica VE-TEC-009 … 011 y resistencia a la velocidad VE-RVE-001 … 007
import { EXERCISES } from './exercises.js';
import { VEL, RUN_FR, sprintProfile } from './ex_lote58.js';
import { CONES } from './ex_lote59.js';
import { paceProfile } from './ex_lote62.js';
import { TEC, drillMove } from './ex_lote64.js';

export const RVE = { ...VEL, ...RUN_FR, sub: 'Resistencia a la velocidad', primary: ['Isquiotibiales', 'Glúteos', 'Cuádriceps'], secondary: ['Gastrocnemio y sóleo', 'Core'] };
const run = (o, extra = {}) => ({ type: 'run', ...sprintProfile(o), cones: CONES, ...extra });
const ORB_T = ['Técnica', 'Técnica de carrera: músculos que trabajan', 'Termina suave'];
const ORB_R = ['Sprint repetido', 'Resistencia a la velocidad: músculos que trabajan', 'Recupera'];

// ida y vuelta: sprint, frenada, giro de 180° y vuelta (lanzaderas)
export function shuttle({ v1 = 6.0, v2 = 5.0, rest = 1.6 } = {}) {
  const T = [0, 0.5, 0.9, 2.6, 2.9, 3.7, 4.25, 4.65, 6.0, 6.3, 7.1];
  const loop = T[10] + rest;
  return {
    loop,
    speeds: [[0, 0], [0.5, 0], [0.9, v1 * 0.3], [2.6, v1], [2.9, v1], [3.7, 0], [4.25, 0], [4.65, v2 * 0.3], [6.0, v2], [6.3, v2], [7.1, 0], [loop, 0]],
    yaws: [[0, 0], [3.75, 0], [4.3, 180], [loop - 0.6, 180], [loop, 360]],
    leans: [[0, 4], [0.3, 4], [0.6, 34], [1.4, 20], [2.6, 10], [2.9, 8], [3.3, -12], [3.7, -3], [3.9, 20], [4.3, 30], [4.9, 26], [6.0, 10], [6.3, 8], [6.7, -10], [7.1, -3], [7.5, 6], [loop, 4]],
    dys: [[0, 0], [2.9, 0], [3.4, -0.15], [3.7, -0.19], [4.3, -0.17], [4.8, -0.04], [6.0, 0], [6.4, 0], [6.9, -0.12], [7.1, -0.14], [7.6, 0], [loop, 0]],
    widths: [[0, 0.09], [2.9, 0.09], [3.7, 0.16], [4.3, 0.14], [4.8, 0.09], [6.3, 0.09], [7.1, 0.14], [7.6, 0.09], [loop, 0.09]],
  };
}

Object.assign(EXERCISES, {
  'VE-TEC-009': {
    ...TEC, name: 'Drill de recuperación de pierna (leg cycling drill)', level: 'Avanzado',
    cfg: { free: { type: 'run', inPlace: true, speed: 0, oneLeg: 'R', cadence: 1.5, stance: 0.30, knee: 1.35, heel: 1.2, lean: 3, arm: 40, fly: 0, drop: 0, handsAt: [0.5, 1.12, 0.05], handSides: ['L'], handPalm: [1, 0, 0] },
      items: [{ kind: 'wall', x: 0.55, ry: -Math.PI / 2, w: 1.4, h: 2.3 }] },
    captions: {
      intro: 'De pie junto a una pared, una mano apoyada',
      reps: [
        ['Con la pierna libre dibuja el ciclo de carrera: talón al glúteo, rodilla arriba y apoyo', 'Pierna de apoyo firme y de puntillas'],
        ['El pie pasa por encima de la rodilla contraria', 'Apoyo activo bajo la cadera'],
        ['Cambia de pierna en cada serie', 'Primero lento, después más rápido'],
      ],
      orbit: ORB_T,
    },
  },
  'VE-TEC-010': {
    ...TEC, name: 'Drill de postura de tronco en carrera', level: 'Avanzado', primary: ['Core', 'Glúteos', 'Flexores de cadera'], secondary: ['Isquiotibiales', 'Gastrocnemio y sóleo'],
    cfg: { free: drillMove(4.2, { cones: CONES, lean: 6, twist: 2, arm: 45 }) },
    captions: {
      intro: 'Al inicio de un tramo de 30–40 m',
      reps: [
        ['Corre a ritmo medio con el tronco alto y estable', 'Pelvis neutra: ni hundida ni arqueada'],
        ['Imagina un hilo que tira de tu cabeza hacia arriba', 'Hombros relajados y bajos'],
        ['Mira al frente, no al suelo', 'Sin balanceo lateral del tronco'],
      ],
      orbit: ORB_T,
    },
  },
  'VE-TEC-011': {
    ...TEC, name: 'Bounding con pierna extendida (straight-leg bounding técnico)', level: 'Avanzado', primary: ['Isquiotibiales', 'Glúteos', 'Gastrocnemio y sóleo'], secondary: ['Flexores de cadera', 'Core'],
    cfg: { free: drillMove(2.8, { cones: CONES, cadence: 2.5, stance: 0.36, knee: 0.0, heel: 0.0, arm: 50, fly: 0.05, drop: 0.01, k: 0.985 }) },
    captions: {
      intro: 'Al inicio de un tramo de 15–20 m',
      reps: [
        ['Avanza con las piernas casi extendidas, como tijeras', 'Barre el suelo hacia atrás con cada apoyo'],
        ['Apoyo de punta bajo la cadera', 'Glúteos e isquiotibiales tiran de la pierna'],
        ['Tronco alto y brazos coordinados', 'Ritmo constante'],
      ],
      orbit: ORB_T,
    },
  },
  'VE-RVE-001': {
    ...RVE, name: 'Repeticiones de sprint 30-60 m con descanso incompleto (RSA)', level: 'Intermedio',
    cfg: { free: run({ acc: 2.6, hold: 1.8, vmax: 7.2, lean0: 40, rest: 1.2 }) },
    captions: {
      intro: 'Salida de un tramo de 30–60 m',
      reps: [
        ['Sprint máximo de 30–60 m', 'Recuperación corta: 20–30 s'],
        ['Mantén la técnica aunque llegue la fatiga', 'Apoyos rápidos y brazos enérgicos'],
        ['6–10 repeticiones por serie', 'Para si la velocidad cae mucho'],
      ],
      orbit: ORB_R,
    },
  },
  'VE-RVE-002': {
    ...RVE, name: 'Sprint 100 m con recuperación controlada', level: 'Intermedio',
    cfg: { free: run({ acc: 3.2, hold: 3.0, dec: 2.0, vmax: 7.8, lean0: 36, rest: 1.2 }) },
    captions: {
      intro: 'Salida de un tramo de 100 m',
      reps: [
        ['Sprint de 100 m al 90–95 %', 'Mantén la postura en los últimos metros'],
        ['Relaja hombros y cara a máxima velocidad', 'Frecuencia alta hasta el final'],
        ['Recuperación controlada de 2–3 min', 'Vuelve caminando'],
      ],
      orbit: ORB_R,
    },
  },
  'VE-RVE-003': {
    ...RVE, frame: { ...RUN_FR.frame, ty: RUN_FR.frame.ty + 0.5, tyLow: RUN_FR.frame.tyLow + 0.5 }, name: 'Series de sprint en cuesta con recuperación corta', level: 'Intermedio',
    cfg: { free: (() => { const p = run({ acc: 2.8, hold: 1.4, vmax: 5.6, lean0: 48, rest: 1.2 }); return { ...p, slope: 7, rampH: 0.5, leans: p.leans.map(([t, l]) => [t, l + 6]) }; })() },
    captions: {
      intro: 'Al pie de una cuesta de pendiente moderada',
      reps: [
        ['Sprint cuesta arriba de 20–40 m', 'Recupera bajando caminando'],
        ['Rodillas arriba y empuje completo', 'Inclínate con la pendiente'],
        ['6–10 repeticiones', 'Mantén la técnica con la fatiga'],
      ],
      orbit: ORB_R,
    },
  },
  'VE-RVE-004': {
    ...RVE, name: 'Sprint intermitente tipo Yo-Yo (protocolo intermitente)', level: 'Intermedio',
    phaseNames: { BAJADA: 'IDA Y VUELTA', SUBIDA: 'IDA Y VUELTA', PAUSA: 'IDA Y VUELTA', ARRIBA: 'IDA Y VUELTA' },
    cfg: { free: { type: 'run', cones: CONES, ...shuttle({ v1: 5.2, v2: 5.0, rest: 2.0 }) } },
    captions: {
      intro: 'Dos líneas separadas 20 m y una zona de recuperación',
      reps: [
        ['Ida y vuelta de 20 m al ritmo de la señal', 'Gira con control en cada línea'],
        ['Tras cada ida y vuelta, 10 s de recuperación activa', 'El ritmo sube por niveles'],
        ['Frena bajando la cadera antes de girar', 'Continúa hasta no llegar a tiempo'],
      ],
      orbit: ['Ida y vuelta', 'Resistencia intermitente: músculos que trabajan', 'Recupera'],
    },
  },
  'VE-RVE-005': {
    ...RVE, name: 'Circuito de sprints cortos repetidos (shuttle sprints)', level: 'Intermedio',
    phaseNames: { BAJADA: 'LANZADERA', SUBIDA: 'LANZADERA', PAUSA: 'LANZADERA', ARRIBA: 'LANZADERA' },
    cfg: { free: { type: 'run', cones: CONES, ...shuttle({ v1: 6.4, v2: 6.0, rest: 1.4 }) } },
    captions: {
      intro: 'Conos a 10–20 m para ir y volver',
      reps: [
        ['Sprint al cono, frena, gira y vuelve a máxima velocidad', 'Toca la línea con el pie en cada giro'],
        ['Baja la cadera para frenar antes del giro', 'Acelera con pasos cortos al salir'],
        ['Series de 4–6 lanzaderas', 'Recuperación corta entre series'],
      ],
      orbit: ['Lanzadera', 'Sprints repetidos: músculos que trabajan', 'Recupera'],
    },
  },
  'VE-RVE-006': {
    ...RVE, name: 'Sprint resistido en series con trineo', level: 'Intermedio',
    cfg: { free: run({ acc: 3.2, hold: 1.6, vmax: 5.4, lean0: 50, rest: 1.2 }, { tether: { to: [0, 0.22, -2.6] } }),
      items: [{ kind: 'box', w: 0.55, h: 0.22, d: 0.70, z: -2.95 }] },
    captions: {
      intro: 'Arnés a la cintura enganchado al trineo',
      reps: [
        ['Sprint arrastrando el trineo 15–20 m', 'Empuje potente y tronco inclinado'],
        ['Carga moderada: la técnica no debe romperse', 'Brazos enérgicos'],
        ['Series de 4–8 con recuperación corta', 'Vuelve caminando con el trineo'],
      ],
      orbit: ['Empuje máximo', 'Sprint resistido: músculos que trabajan', 'Recupera'],
    },
  },
  'VE-RVE-007': {
    ...RVE, name: 'Sprint con recuperación activa entre repeticiones', level: 'Intermedio',
    cfg: { free: { type: 'run', cones: CONES, ...paceProfile([[0, 2.6], [1.2, 2.6], [2.8, 7.2], [4.4, 7.2], [5.6, 2.6], [7.6, 2.6]]) } },
    captions: {
      intro: 'Trotando suave entre tramos de sprint',
      reps: [
        ['Sprint de 20–30 m y vuelve al trote sin parar', 'El trote es la recuperación'],
        ['Pasa del trote al sprint con un empuje potente', 'Postura alta durante el trote'],
        ['Series de 4–8 sprints', 'Respira de forma controlada al trotar'],
      ],
      orbit: ORB_R,
    },
  },
});
