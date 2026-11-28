// Lote 91: PR-TRO-007 … PR-TRO-016 (generado por gen.py a partir de ejercicios ya definidos)
import { EXERCISES } from './exercises.js';
import './ex_lote10.js';
import './ex_lote11.js';
import './ex_lote15.js';
import './ex_lote16.js';
import './ex_lote17.js';
import './ex_lote18.js';
import './ex_lote62.js';
import { DECLINE_SL } from './pr_custom.js';

Object.assign(EXERCISES, {
  "PR-TRO-007": { ...EXERCISES["TI-ERO-010"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps"], secondary: ["Glúteos"], name: "Extensión de rodilla en cadena cerrada con carga progresiva", level: "Intermedio",
    captions: { intro: "De pie con una banda detrás de la rodilla anclada delante", reps: [["Estira la rodilla contra la banda", "Aumenta la tensión progresivamente"], ["Peso sobre la pierna trabajada", "Aprieta el cuádriceps al final"], ["3 × 15", "Sin dolor intenso"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-008": { ...EXERCISES["TI-BIL-001"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps", "Glúteos"], secondary: ["Isquiotibiales"], name: "Prensa de piernas con énfasis excéntrico", level: "Intermedio",
    captions: { intro: "Sentado en la prensa, pies a la anchura de la cadera", reps: [["Baja la plataforma en 3–4 s", "Sube a ritmo normal"], ["Rodillas alineadas con los pies", "Rango sin dolor"], ["3 × 8–12", "Carga progresiva"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-009": { ...EXERCISES["TI-PRE-001"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps"], secondary: ["Glúteos", "Glúteo medio"], name: "Step down excéntrico lento (progresión de tendinopatía)", level: "Intermedio",
    captions: { intro: "De pie sobre un escalón con una pierna", reps: [["Baja el otro talón en 4 s controlando la rodilla", "Sube con ayuda si hace falta"], ["Rodilla alineada con el pie", "Pelvis nivelada"], ["3 × 10 por pierna", "Progresión: escalón más alto"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-010": { ...EXERCISES["TI-ERO-005"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps"], secondary: ["Glúteos"], name: "Isometría de cuádriceps en ángulo de rodilla de 60°", level: "Intermedio",
    captions: { intro: "Espalda apoyada en la pared, rodillas a unos 60°", reps: [["Mantén la posición 30–45 s", "Empuja el suelo con todo el pie"], ["Rodillas alineadas con los pies", "Espalda pegada a la pared"], ["5 repeticiones", "Ajusta el ángulo para que no duela"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-011": { ...EXERCISES["TI-PRE-009"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps", "Gastrocnemio y sóleo"], secondary: ["Glúteos"], name: "Progresión pliométrica de baja intensidad para el tendón rotuliano", level: "Avanzado",
    captions: { intro: "De pie, pies a la anchura de la cadera", reps: [["Saltos pequeños y elásticos en el sitio", "Aterrizajes suaves"], ["Pocas repeticiones al principio", "Sin dolor al día siguiente"], ["Progresa altura y volumen poco a poco", "Fase de carga elástica del tendón"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-012": { ...EXERCISES["TI-SEN-001"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps", "Glúteos"], secondary: ["Core"], name: "Sentadilla con pausa isométrica en el punto de dolor controlado", level: "Avanzado", tempo: { down: 2, pause: 3, up: 2 },
    captions: { intro: "De pie, pies a la anchura de la cadera", reps: [["Baja a la sentadilla y pausa 3 s en el punto de molestia controlada", "Sube despacio"], ["Rodillas alineadas", "Dolor tolerable (≤ 3/10)"], ["3 × 8", "Amplía el rango semana a semana"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-013": { ...EXERCISES["TI-PLI-001"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps", "Glúteos", "Gastrocnemio y sóleo"], secondary: ["Core"], name: "Salto vertical submáximo controlado (reintroducción elástica)", level: "Avanzado",
    captions: { intro: "De pie, pies a la anchura de la cadera", reps: [["Salto vertical al 60–70 % de tu máximo", "Aterrizaje suave y controlado"], ["Rodillas alineadas", "Sin dolor durante ni después"], ["3 × 5", "Reintroducción de la carga elástica"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-014": { ...EXERCISES["TI-UNI-005"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps", "Glúteos"], secondary: ["Isquiotibiales"], name: "Prensa unilateral con énfasis excéntrico", level: "Avanzado",
    captions: { intro: "Sentado en la prensa con un solo pie en la plataforma", reps: [["Baja la plataforma en 3–4 s con una pierna", "Sube con las dos si hace falta"], ["Rodilla alineada con el pie", "Rango sin dolor"], ["3 × 8–10 por pierna", "Carga progresiva"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
  "PR-TRO-015": { ...EXERCISES["VE-CRI-010"], labelAll: true, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps", "Isquiotibiales", "Glúteos"], secondary: ["Gastrocnemio y sóleo", "Core"], name: "Progresión de carrera con control de impacto (return to running)", level: "Avanzado",
    captions: { intro: "Superficie blanda y recorrido llano", reps: [["Carrera continua con pequeños cambios de ritmo", "Zancada corta y cadencia alta"], ["Apoyo bajo la cadera para reducir el impacto", "Sin dolor al día siguiente"], ["Aumenta el tiempo de forma progresiva", "Sigue la pauta del profesional"]], orbit: ["Carrera", "Retorno a la carrera: músculos que trabajan", "Termina suave"] } },
  "PR-TRO-016": { ...DECLINE_SL, sub: "Tendinopatía rotuliana", primary: ["Cuádriceps"], secondary: ["Glúteos", "Estabilizadores de cadera y rodilla"], name: "Test funcional de fuerza de cuádriceps (single-leg decline squat test)", level: "Avanzado",
    captions: { intro: "De pie sobre una pierna en la tabla declinada", reps: [["Sentadilla a una pierna hasta la profundidad máxima sin dolor", "Anota el ángulo y el dolor"], ["Compara con la otra pierna", "Repite la prueba cada 2–4 semanas"], ["Movimiento lento", "Siempre con el profesional"]], orbit: ["Control", "Tendinopatía rotuliana: músculos que trabajan", "Vuelve con control"] } },
});
