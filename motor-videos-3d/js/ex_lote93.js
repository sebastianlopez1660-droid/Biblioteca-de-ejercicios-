// Lote 93: PR-MRO-011 … PR-TOB-003 (generado por gen.py a partir de ejercicios ya definidos)
import { EXERCISES } from './exercises.js';
import './ex_lote13.js';
import './ex_lote14.js';
import './ex_lote16.js';
import './ex_lote23.js';
import './ex_lote35.js';
import './ex_lote38.js';
import './ex_lote40.js';
import './ex_lote41.js';
import './ex_lote45.js';
import { FOOT_ROLLER } from './pr_custom.js';

Object.assign(EXERCISES, {
  "PR-MRO-011": { ...EXERCISES["TS-ESC-013"], labelAll: true, sub: "Rehabilitación de manguito rotador", primary: ["Manguito rotador", "Serrato anterior"], secondary: ["Deltoides", "Trapecio inferior"], name: "Resistencia rítmica de hombro (rhythmic stabilization)", level: "Avanzado",
    captions: { intro: "De pie con el brazo estirado apoyando un balón en la pared", reps: [["Mantén el balón estable mientras el compañero lo empuja en distintas direcciones", "Reacciona sin perder la posición"], ["Hombro abajo y codo estirado", "Empujes suaves al principio"], ["3 × 20–30 s", "Sin dolor"]], orbit: ["Control", "Rehabilitación de manguito rotador: músculos que trabajan", "Vuelve con control"] } },
  "PR-MRO-012": { ...EXERCISES["TS-PRV-010"], labelAll: true, sub: "Rehabilitación de manguito rotador", primary: ["Manguito rotador"], secondary: ["Deltoides posterior", "Trapecio inferior"], name: "Fortalecimiento excéntrico de rotadores externos (protocolo de tendinopatía)", level: "Avanzado",
    captions: { intro: "De pie de lado a la polea", reps: [["Gira hacia fuera rápido y vuelve lento en 3–4 s", "Énfasis excéntrico"], ["Codo pegado al cuerpo", "Carga moderada"], ["3 × 8–12", "Sin dolor"]], orbit: ["Control", "Rehabilitación de manguito rotador: músculos que trabajan", "Vuelve con control"] } },
  "PR-MRO-013": { ...EXERCISES["TS-PRV-006"], labelAll: true, sub: "Rehabilitación de manguito rotador", primary: ["Trapecio inferior", "Dorsal ancho"], secondary: ["Manguito rotador"], name: "Progresión de descompresión subacromial en carga funcional", level: "Avanzado",
    captions: { intro: "De pie con banda o polea", reps: [["Movimientos que bajan la cabeza del húmero mientras elevas el brazo", "Carga funcional progresiva"], ["Hombros lejos de las orejas", "Rango sin dolor"], ["3 × 10–12", "Integra en gestos de tu deporte"]], orbit: ["Control", "Rehabilitación de manguito rotador: músculos que trabajan", "Vuelve con control"] } },
  "PR-MRO-014": { ...EXERCISES["TS-TRA-003"], labelAll: true, sub: "Rehabilitación de manguito rotador", primary: ["Dorsal ancho", "Manguito rotador"], secondary: ["Bíceps", "Trapecio inferior"], name: "Progresión de carga en dominadas tras lesión de hombro", level: "Avanzado",
    captions: { intro: "Colgado de la barra con una banda de ayuda", reps: [["Dominadas asistidas en un rango sin dolor", "Reduce la ayuda por fases"], ["Escápulas activas al empezar el tirón", "Baja controlando"], ["3 × 5–8", "Solo con el alta del profesional"]], orbit: ["Control", "Rehabilitación de manguito rotador: músculos que trabajan", "Vuelve con control"] } },
  "PR-MRO-015": { ...EXERCISES["TS-MRO-001"], labelAll: true, sub: "Rehabilitación de manguito rotador", primary: ["Manguito rotador"], secondary: ["Deltoides posterior"], name: "Test funcional de fuerza de rotadores (evaluación clínica adaptada)", level: "Avanzado",
    captions: { intro: "De pie, codo a 90° pegado al cuerpo", reps: [["Prueba de fuerza de rotación externa e interna", "Compara con el hombro sano"], ["Registra el resultado", "Sin dolor durante la prueba"], ["2–3 intentos por lado", "Siempre con el profesional"]], orbit: ["Control", "Rehabilitación de manguito rotador: músculos que trabajan", "Vuelve con control"] } },
  "PR-MRO-016": { ...EXERCISES["CO-ROT-003"], labelAll: true, sub: "Rehabilitación de manguito rotador", primary: ["Manguito rotador", "Deltoides"], secondary: ["Oblicuos", "Core"], name: "Progresión de lanzamiento a máxima velocidad (fase final de return to throw)", level: "Avanzado",
    captions: { intro: "De pie con un balón ligero", reps: [["Lanzamientos a velocidad creciente hasta el máximo", "Técnica completa del gesto"], ["Recuperación completa entre series", "Para ante cualquier dolor"], ["Última fase del retorno", "Con el alta del profesional"]], orbit: ["Control", "Rehabilitación de manguito rotador: músculos que trabajan", "Vuelve con control"] } },
  "MO-TOB-007": { ...FOOT_ROLLER, sub: "Movilidad de tobillo", primary: ["Gastrocnemio y sóleo"], secondary: ["Tibial anterior"], name: "Automovilización de tobillo con foam roller", level: "Avanzado",
    captions: { intro: "De pie, el pie sobre un rodillo pequeño (variante de la pantorrilla)", reps: [["Rueda el pie adelante y atrás sobre el rodillo", "Presión moderada y constante"], ["Detente 10–20 s en los puntos más tensos", "Respira y relaja la pierna"], ["1–2 min por pie", "Para la pantorrilla, siéntate con ella sobre el rodillo"]], orbit: ["Control", "Movilidad de tobillo: músculos que trabajan", "Vuelve con control"] } },
  "PR-TOB-001": { ...EXERCISES["TI-PRE-008"], labelAll: true, sub: "Prevención de tobillo", primary: ["Estabilizadores de tobillo"], secondary: ["Gastrocnemio y sóleo", "Estabilizadores de cadera y rodilla"], name: "Propiocepción de tobillo en superficie inestable (fase temprana)", level: "Principiante",
    captions: { intro: "De pie sobre una pierna en una superficie inestable", reps: [["Mantén el equilibrio con pequeñas correcciones del tobillo", "Rodilla algo flexionada"], ["Mirada al frente", "Pelvis nivelada"], ["3 × 30 s por pierna", "Fase inicial tras el esguince"]], orbit: ["Control", "Prevención de tobillo: músculos que trabajan", "Vuelve con control"] } },
  "PR-TOB-002": { ...EXERCISES["TI-EQU-001"], labelAll: true, sub: "Prevención de tobillo", primary: ["Estabilizadores de tobillo"], secondary: ["Gastrocnemio y sóleo", "Glúteo medio"], name: "Equilibrio monopodal post-esguince (fase inicial)", level: "Principiante",
    captions: { intro: "De pie sobre la pierna lesionada, junto a un apoyo", reps: [["Mantén el equilibrio sin apoyarte", "Toca el apoyo solo si lo necesitas"], ["Rodilla algo flexionada", "Peso repartido en todo el pie"], ["3–5 × 30 s", "Progresión: ojos cerrados"]], orbit: ["Control", "Prevención de tobillo: músculos que trabajan", "Vuelve con control"] } },
  "PR-TOB-003": { ...EXERCISES["TI-TIB-006"], labelAll: true, sub: "Prevención de tobillo", primary: ["Estabilizadores de tobillo"], secondary: ["Tibial anterior"], name: "Fortalecimiento de peroneos con banda (protocolo de esguince lateral)", level: "Principiante",
    captions: { intro: "Sentado o tumbado con una banda alrededor del pie", reps: [["Lleva el pie hacia fuera contra la banda (eversión)", "Vuelve despacio"], ["Solo se mueve el tobillo", "Rango sin dolor"], ["3 × 15", "Músculos peroneos: clave tras el esguince"]], orbit: ["Control", "Prevención de tobillo: músculos que trabajan", "Vuelve con control"] } },
});
