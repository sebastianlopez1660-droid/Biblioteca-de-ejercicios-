ADU = 'Prevención de aductores'
PUB = 'Prevención de pubalgia'
TRO = 'Tendinopatía rotuliana'
MRO = 'Rehabilitación de manguito rotador'
Q, I, G, GM, CORE, AD = 'Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Glúteo medio', 'Core', 'Aductores'
EST = 'Estabilizadores de cadera y rodilla'
OB, TA, RA = 'Oblicuos', 'Transverso abdominal', 'Recto abdominal'
MR, DEL, SER, TRI = 'Manguito rotador', 'Deltoides', 'Serrato anterior', 'Trapecio inferior'
SPEC = {
  'PR-ADU-009': ('TI-PLI-005', ADU, [AD, GM, Q], ['Estabilizadores de tobillo', CORE], 'De pie sobre una pierna, preparado para saltar de lado', [
    ['Salta lateralmente y frena el cuerpo al aterrizar', 'Clava la recepción 2 s'],
    ['Rodilla alineada y cadera baja al frenar', 'Distancia corta al principio'],
    ['6–8 saltos por lado', 'Sin dolor en la ingle']]),
  'PR-ADU-010': ('CO-CDI-005', ADU, [AD, GM, G], [CORE, 'Estabilizadores de tobillo'], 'De pie sobre una pierna', [
    ['Salto lateral de patinador con recepción controlada', 'Frena con la cadera baja'],
    ['Tronco estable al aterrizar', 'Rodilla alineada con el pie'],
    ['8–10 por lado', 'Aumenta distancia y ritmo poco a poco']]),
  'PR-ADU-011': ('MO-CAD-005', ADU, [AD, 'Movilidad de cadera'], [G], 'En cuadrupedia con las rodillas separadas', [
    ['Balancea la cadera atrás y adelante abriendo los aductores', 'Sin forzar el rango'],
    ['Espalda recta y abdomen activo', 'Movimiento lento'],
    ['10 balanceos antes del trabajo de fuerza', 'Sin dolor en la ingle']]),
  'PR-ADU-012': ('AG-COD-005', ADU, [AD, Q, G], [GM, CORE], 'Recorrido con un cono de giro', [
    ['Cambios de dirección progresivos que cargan los aductores', 'Empieza a velocidad baja'],
    ['Apoyo exterior firme y cadera baja', 'Sin dolor durante ni después'],
    ['Aumenta el ángulo y la velocidad poco a poco', 'Sigue la pauta del profesional']], ['Cambio de dirección', 'Agilidad: músculos que trabajan', 'Vuelve caminando']),
  'PR-ADU-013': ('custom:ADD_BAND', ADU, [AD], [GM, CORE], 'Mostrado de pie; tumbado de lado, la banda va en el tobillo de abajo', [
    ['Lleva la pierna hacia dentro contra la banda', 'Vuelve despacio'],
    ['Pelvis estable, sin rotar', 'Movimiento controlado'],
    ['12–15 repeticiones por pierna', 'Tensión progresiva']]),
  'PR-ADU-014': ('custom:COPEN', ADU, [AD], [OB, CORE], 'Plancha lateral con el pie de arriba sobre el banco', [
    ['Mantén la plancha y sube la pierna de abajo al banco', 'Baja despacio sin apoyar'],
    ['Cuerpo en línea y cadera alta', 'Nivel avanzado: rango completo'],
    ['3 series de 8–12 por lado', 'Para si aparece dolor en la ingle']]),
  'PR-ADU-015': ('custom:ADD_SQ', ADU, [AD], [CORE], 'Boca arriba, rodillas dobladas, para la prueba de fuerza', [
    ['Aprieta al máximo durante 3–5 s', 'Registra el valor si usas dinamómetro'],
    ['Compara con mediciones anteriores', 'Valora también el dolor (0–10)'],
    ['2–3 intentos', 'Descansa entre intentos']]),
  'PR-ADU-016': ('AG-COD-006', ADU, [AD, Q, G], [GM, CORE], 'Dos líneas separadas 5–10 m', [
    ['Sprint y cambio de dirección de 180° progresivos', 'Empieza al 50–60 % de intensidad'],
    ['Frena con pasos cortos antes del giro', 'Sin dolor durante ni después'],
    ['Última fase del retorno al deporte', 'Con el alta del profesional']], ['Cambio de dirección', 'Agilidad: músculos que trabajan', 'Vuelve caminando']),
  'PR-PUB-001': ('TI-ACT-008', PUB, [TA, RA], [AD, 'Flexores de cadera'], 'Boca arriba, brazos al techo y rodillas a 90°', [
    ['Estira un brazo y la pierna contraria sin despegar la zona lumbar', 'Vuelve y alterna'],
    ['Abdomen activo y respiración tranquila', 'Movimiento lento'],
    ['8–10 por lado', 'Base del trabajo de pubis']]),
  'PR-PUB-002': ('CO-AEX-001', PUB, [TA, RA, AD], [OB, 'Glúteos'], 'En plancha sobre los antebrazos', [
    ['Mantén la plancha apretando los muslos entre sí', 'Activa los aductores sin perder la postura'],
    ['Cuerpo en línea, sin hundir la cadera', 'Respira con normalidad'],
    ['20–40 s', 'Progresión: balón entre los tobillos']]),
  'PR-PUB-003': ('TI-ACT-002', PUB, [G, AD], [TA, I], 'Boca arriba, rodillas dobladas y un balón o cojín entre ellas', [
    ['Aprieta el balón y eleva la cadera', 'Baja sin dejar de apretar'],
    ['Pelvis nivelada', 'Glúteos firmes arriba'],
    ['10–12 repeticiones', 'Sin dolor en la ingle']]),
  'PR-PUB-004': ('custom:PELVIC_TILT', PUB, [TA, RA], ['Erectores espinales'], 'Boca arriba, rodillas dobladas y pies apoyados', [
    ['Aplana la zona lumbar contra el suelo inclinando la pelvis', 'Vuelve a la posición neutra'],
    ['Movimiento pequeño y controlado', 'Glúteos relajados'],
    ['10–15 repeticiones', 'Coordina con la respiración']]),
  'PR-PUB-005': ('custom:COPEN_KNEE', PUB, [AD, OB], [TA, GM], 'Plancha lateral con la rodilla de arriba apoyada en un banco', [
    ['Aprieta la rodilla contra el banco y eleva la cadera', 'Mantén o sube la pierna de abajo'],
    ['Cuerpo en línea', 'Sin dolor en el pubis'],
    ['3 series de 15–30 s por lado', 'Progresa el tiempo poco a poco']]),
  'PR-PUB-006': ('custom:COPEN_KNEE', PUB, [AD], [OB, CORE], 'Plancha lateral corta con la rodilla sobre el banco', [
    ['Movimiento de rango reducido: sube y baja poco la cadera', 'Sin dolor en el pubis'],
    ['Cuerpo en línea', 'Ritmo lento'],
    ['3 series de 6–8 por lado', 'Aumenta el rango según tolerancia']]),
  'PR-PUB-007': ('TI-ZAN-003', PUB, [AD, G, Q], [GM, CORE], 'De pie, pies juntos', [
    ['Zancada lateral cargando el aductor de forma progresiva', 'Vuelve empujando con la pierna flexionada'],
    ['Rango cómodo al principio', 'Pecho alto'],
    ['8–10 por lado', 'Añade carga cuando no haya dolor']]),
  'PR-PUB-008': ('TI-EQU-001', PUB, [GM, AD, TA], [EST, 'Estabilizadores de tobillo'], 'De pie sobre una pierna', [
    ['Mantén el equilibrio con la pelvis nivelada', 'Abdomen activo'],
    ['Pierna libre cerca de la de apoyo', 'Mirada al frente'],
    ['30–45 s por pierna', 'Progresión: ojos cerrados o superficie blanda']]),
  'PR-PUB-009': ('TI-PUE-003', PUB, [G, TA], [AD, I], 'Puente de glúteo con los brazos en el suelo', [
    ['Mantén la cadera arriba y levanta un pie cada vez', 'Pelvis sin rotar al marchar'],
    ['Abdomen y aductores activos', 'Ritmo lento'],
    ['10–12 marchas por lado', 'Sin dolor en la ingle']]),
  'PR-PUB-010': ('TI-PMU-004', PUB, [I, G, OB], [GM, TA], 'De pie sobre una pierna', [
    ['Bisagra de cadera a una pierna sin dejar que la pelvis gire', 'Caderas paralelas al suelo'],
    ['Espalda recta y abdomen activo', 'Baja hasta donde controles'],
    ['8–10 por pierna', 'Carga ligera al principio']]),
  'PR-PUB-011': ('VE-TEC-010', PUB, [Q, I, G], [AD, CORE], 'Recorrido recto y llano', [
    ['Carrera suave en línea recta', 'Sin cambios de dirección todavía'],
    ['Zancada corta y relajada', 'Sin dolor en el pubis'],
    ['Aumenta tiempo antes que velocidad', 'Sigue la pauta del profesional']], ['Carrera suave', 'Retorno a la carrera: músculos que trabajan', 'Termina caminando']),
  'PR-PUB-012': ('CO-AIN-002', PUB, [OB, AD], [GM, TA], 'En plancha lateral', [
    ['Combina la plancha lateral con la activación de la pierna', 'Mantén la cadera alta'],
    ['Oblicuos y aductores trabajan juntos', 'Movimiento lento'],
    ['8–10 por lado', 'Sin dolor']]),
  'PR-PUB-013': ('custom:ADD_SQ', PUB, [AD], [TA], 'Boca arriba, rodillas dobladas y balón entre las rodillas', [
    ['Aprieta el balón y aumenta el tiempo de sostén cada semana', 'De 10 s hasta 45–60 s'],
    ['Intensidad sin dolor', 'Respira con normalidad'],
    ['3–5 repeticiones', 'Registra el tiempo alcanzado']]),
  'PR-PUB-014': ('AG-COD-004', PUB, [AD, Q, G], [OB, CORE], 'Tramo recto con un cono de corte suave', [
    ['Cambios de dirección suaves controlando la pelvis', 'Velocidad baja'],
    ['Tronco estable en el apoyo', 'Sin dolor en el pubis'],
    ['Aumenta el ángulo poco a poco', 'Vuelve caminando']], ['Cambio de dirección', 'Agilidad: músculos que trabajan', 'Vuelve caminando']),
  'PR-PUB-015': ('custom:ADD_CABLE', PUB, [AD], [OB, CORE], 'De pie de lado a la polea baja', [
    ['Aducción con la velocidad y el rango de tu deporte', 'Por ejemplo, el gesto de golpeo'],
    ['Tronco estable', 'Carga progresiva'],
    ['8–10 por pierna', 'Sin dolor durante ni después']]),
  'PR-PUB-016': ('custom:ADD_SQ', PUB, [AD], [TA], 'Boca arriba, rodillas dobladas y balón entre las rodillas', [
    ['Aprieta progresivamente y valora el dolor de 0 a 10', 'Prueba con rodillas a 0°, 45° y 90°'],
    ['Compara entre sesiones', 'Para si el dolor supera 3/10'],
    ['Herramienta de seguimiento', 'Siempre con el profesional']]),
  'PR-TRO-001': ('custom:SPANISH', TRO, [Q], [G, 'Gastrocnemio y sóleo'], 'De pie con una banda gruesa detrás de las rodillas anclada delante', [
    ['Siéntate atrás con las tibias verticales', 'Mantén 30–45 s'],
    ['La banda sostiene las rodillas', 'Tronco erguido'],
    ['5 repeticiones', 'Efecto analgésico en el tendón']]),
  'PR-TRO-002': ('custom:SPANISH', TRO, [Q], [G], 'De pie con la banda detrás de las rodillas, anclaje firme delante', [
    ['Baja a la sentadilla española con las tibias verticales', 'Mantén la isometría'],
    ['Peso en los talones', 'Tensión de banda alta'],
    ['5 × 45 s', 'Sin dolor mayor de 3/10']]),
  'PR-TRO-003': ('TI-ERO-001', TRO, [Q], [], 'Sentado en la máquina de extensión de rodilla', [
    ['Empuja y mantén la rodilla en un ángulo sin dolor', 'Isometría de 30–45 s'],
    ['Carga alta pero tolerable', 'Respira durante la contracción'],
    ['5 repeticiones', 'Alivia el dolor del tendón']]),
  'PR-TRO-004': ('custom:DECLINE_SL', TRO, [Q], [G, 'Estabilizadores de cadera y rodilla'], 'De pie sobre una pierna en una tabla declinada a 25°', [
    ['Baja en 3 s a una pierna', 'Sube con ayuda de la otra pierna'],
    ['Rodilla alineada con el pie', 'Tronco erguido'],
    ['3 × 15 por pierna', 'Molestia leve tolerable (≤ 3/10)']]),
  'PR-TRO-005': ('custom:DECLINE', TRO, [Q], [G], 'De pie en una tabla declinada, carga ligera', [
    ['Sentadilla excéntrica lenta en la tabla', 'Añade carga cuando sea indoloro'],
    ['Rodillas alineadas', 'Talones apoyados en la tabla'],
    ['3 × 10–15', 'Progresión semanal']]),
  'PR-TRO-006': ('TI-PLI-003', TRO, [Q, G, 'Gastrocnemio y sóleo'], [CORE], 'De pie frente a un cajón bajo', [
    ['Salta al cajón y baja controlando el aterrizaje', 'Énfasis en la fase de frenado'],
    ['Aterrizaje suave', 'Rodillas alineadas'],
    ['Volumen bajo: 3 × 5', 'Solo sin dolor en la carga lenta']]),
  'PR-TRO-007': ('TI-ERO-010', TRO, [Q], [G], 'De pie con una banda detrás de la rodilla anclada delante', [
    ['Estira la rodilla contra la banda', 'Aumenta la tensión progresivamente'],
    ['Peso sobre la pierna trabajada', 'Aprieta el cuádriceps al final'],
    ['3 × 15', 'Sin dolor intenso']]),
  'PR-TRO-008': ('TI-BIL-001', TRO, [Q, G], [I], 'Sentado en la prensa, pies a la anchura de la cadera', [
    ['Baja la plataforma en 3–4 s', 'Sube a ritmo normal'],
    ['Rodillas alineadas con los pies', 'Rango sin dolor'],
    ['3 × 8–12', 'Carga progresiva']]),
  'PR-TRO-009': ('TI-PRE-001', TRO, [Q], [G, GM], 'De pie sobre un escalón con una pierna', [
    ['Baja el otro talón en 4 s controlando la rodilla', 'Sube con ayuda si hace falta'],
    ['Rodilla alineada con el pie', 'Pelvis nivelada'],
    ['3 × 10 por pierna', 'Progresión: escalón más alto']]),
  'PR-TRO-010': ('TI-ERO-005', TRO, [Q], [G], 'Espalda apoyada en la pared, rodillas a unos 60°', [
    ['Mantén la posición 30–45 s', 'Empuja el suelo con todo el pie'],
    ['Rodillas alineadas con los pies', 'Espalda pegada a la pared'],
    ['5 repeticiones', 'Ajusta el ángulo para que no duela']]),
  'PR-TRO-011': ('TI-PRE-009', TRO, [Q, 'Gastrocnemio y sóleo'], [G], 'De pie, pies a la anchura de la cadera', [
    ['Saltos pequeños y elásticos en el sitio', 'Aterrizajes suaves'],
    ['Pocas repeticiones al principio', 'Sin dolor al día siguiente'],
    ['Progresa altura y volumen poco a poco', 'Fase de carga elástica del tendón']]),
  'PR-TRO-012': ('TI-SEN-001', TRO, [Q, G], [CORE], 'De pie, pies a la anchura de la cadera', [
    ['Baja a la sentadilla y pausa 3 s en el punto de molestia controlada', 'Sube despacio'],
    ['Rodillas alineadas', 'Dolor tolerable (≤ 3/10)'],
    ['3 × 8', 'Amplía el rango semana a semana']], None, 'tempo: { down: 2, pause: 3, up: 2 }'),
  'PR-TRO-013': ('TI-PLI-001', TRO, [Q, G, 'Gastrocnemio y sóleo'], [CORE], 'De pie, pies a la anchura de la cadera', [
    ['Salto vertical al 60–70 % de tu máximo', 'Aterrizaje suave y controlado'],
    ['Rodillas alineadas', 'Sin dolor durante ni después'],
    ['3 × 5', 'Reintroducción de la carga elástica']]),
  'PR-TRO-014': ('TI-UNI-005', TRO, [Q, G], [I], 'Sentado en la prensa con un solo pie en la plataforma', [
    ['Baja la plataforma en 3–4 s con una pierna', 'Sube con las dos si hace falta'],
    ['Rodilla alineada con el pie', 'Rango sin dolor'],
    ['3 × 8–10 por pierna', 'Carga progresiva']]),
  'PR-TRO-015': ('VE-CRI-010', TRO, [Q, I, G], ['Gastrocnemio y sóleo', CORE], 'Superficie blanda y recorrido llano', [
    ['Carrera continua con pequeños cambios de ritmo', 'Zancada corta y cadencia alta'],
    ['Apoyo bajo la cadera para reducir el impacto', 'Sin dolor al día siguiente'],
    ['Aumenta el tiempo de forma progresiva', 'Sigue la pauta del profesional']], ['Carrera', 'Retorno a la carrera: músculos que trabajan', 'Termina suave']),
  'PR-TRO-016': ('custom:DECLINE_SL', TRO, [Q], [G, EST], 'De pie sobre una pierna en la tabla declinada', [
    ['Sentadilla a una pierna hasta la profundidad máxima sin dolor', 'Anota el ángulo y el dolor'],
    ['Compara con la otra pierna', 'Repite la prueba cada 2–4 semanas'],
    ['Movimiento lento', 'Siempre con el profesional']]),
  'PR-MRO-001': ('TS-PRV-002', MRO, [MR], [DEL, TRI], 'De pie o tumbado según la fase, con banda o mancuerna ligera', [
    ['Rotación externa con carga que aumenta por fases', 'Codo pegado al cuerpo'],
    ['Movimiento sin dolor', 'Baja despacio'],
    ['3 × 12–15', 'Progresa solo sin dolor']]),
  'PR-MRO-002': ('TS-MRO-001', MRO, [MR], ['Deltoides posterior'], 'De pie, codo a 90° pegado al cuerpo, mano contra una pared o banda', [
    ['Empuja hacia fuera sin mover el brazo y mantén 20–30 s', 'Isometría en un rango sin dolor'],
    ['Intensidad moderada', 'Hombro abajo y relajado'],
    ['5 repeticiones', 'Fase temprana de la rehabilitación']]),
  'PR-MRO-003': ('TS-MRO-002', MRO, [MR, 'Pectoral'], [], 'De pie, codo a 90° pegado al cuerpo', [
    ['Empuja hacia dentro sin mover el brazo y mantén 20–30 s', 'Rango sin dolor'],
    ['Intensidad moderada', 'Hombro estable'],
    ['5 repeticiones', 'Fase temprana de la rehabilitación']]),
  'PR-MRO-004': ('TS-MRO-006', MRO, [DEL, SER], [MR, TRI], 'De pie con mancuernas muy ligeras o sin carga', [
    ['Eleva los brazos en el plano de la escápula hasta 90°', 'Baja despacio'],
    ['Pulgares hacia arriba', 'Sin encoger los hombros'],
    ['3 × 12–15', 'Rango indoloro']]),
  'PR-MRO-005': ('TS-MHO-002', MRO, ['Movilidad de hombro'], [MR], 'Boca arriba o de pie con un bastón agarrado con las dos manos', [
    ['El brazo sano guía al operado por el rango permitido', 'Movimiento pasivo y lento'],
    ['Sin dolor ni forzar', 'Respeta los límites del cirujano'],
    ['10–15 repeticiones', 'Varias veces al día']]),
  'PR-MRO-006': ('TS-MHO-009', MRO, ['Movilidad de hombro', MR], [SER], 'De frente a la pared, mano apoyada', [
    ['Desliza la mano hacia arriba por la pared con ayuda', 'Baja despacio'],
    ['Sube un poco más cada día', 'Hombro abajo'],
    ['10–15 repeticiones', 'Sin dolor']]),
  'PR-MRO-007': ('TS-PRV-004', MRO, [MR], [DEL, SER], 'En apoyo de manos (pared, banco o suelo según la fase)', [
    ['Trabaja la estabilidad del hombro con el brazo cargado', 'Escápula activa'],
    ['Sin dolor', 'Aumenta la carga cambiando la inclinación'],
    ['3 × 20–30 s', 'Respira con normalidad']]),
  'PR-MRO-008': ('TS-PRV-013', MRO, [DEL, MR], [SER, 'Tríceps'], 'De pie con carga ligera', [
    ['Press por encima de la cabeza en un rango tolerable', 'Aumenta carga y rango por fases'],
    ['Costillas abajo', 'Escápulas activas'],
    ['3 × 8–12', 'Sin dolor']]),
  'PR-MRO-009': ('TS-PRV-008', MRO, [MR, SER], [CORE, DEL], 'En plancha sobre las manos', [
    ['Mantén el hombro estable mientras desplazas el peso', 'Escápulas separadas'],
    ['Cuerpo en línea', 'Fase avanzada'],
    ['3 × 20–30 s', 'Sin dolor']]),
  'PR-MRO-010': ('CO-ROT-003', MRO, [MR, DEL], [OB, CORE], 'De pie con un balón ligero', [
    ['Lanzamientos submáximos con técnica controlada', 'Empieza al 50 % de intensidad'],
    ['Pocas repeticiones', 'Sin dolor durante ni después'],
    ['Aumenta distancia e intensidad por fases', 'Sigue el programa del profesional']]),
  'PR-MRO-011': ('TS-ESC-013', MRO, [MR, SER], [DEL, TRI], 'De pie con el brazo estirado apoyando un balón en la pared', [
    ['Mantén el balón estable mientras el compañero lo empuja en distintas direcciones', 'Reacciona sin perder la posición'],
    ['Hombro abajo y codo estirado', 'Empujes suaves al principio'],
    ['3 × 20–30 s', 'Sin dolor']]),
  'PR-MRO-012': ('TS-PRV-010', MRO, [MR], ['Deltoides posterior', TRI], 'De pie de lado a la polea', [
    ['Gira hacia fuera rápido y vuelve lento en 3–4 s', 'Énfasis excéntrico'],
    ['Codo pegado al cuerpo', 'Carga moderada'],
    ['3 × 8–12', 'Sin dolor']]),
  'PR-MRO-013': ('TS-PRV-006', MRO, [TRI, 'Dorsal ancho'], [MR], 'De pie con banda o polea', [
    ['Movimientos que bajan la cabeza del húmero mientras elevas el brazo', 'Carga funcional progresiva'],
    ['Hombros lejos de las orejas', 'Rango sin dolor'],
    ['3 × 10–12', 'Integra en gestos de tu deporte']]),
  'PR-MRO-014': ('TS-TRA-003', MRO, ['Dorsal ancho', MR], ['Bíceps', TRI], 'Colgado de la barra con una banda de ayuda', [
    ['Dominadas asistidas en un rango sin dolor', 'Reduce la ayuda por fases'],
    ['Escápulas activas al empezar el tirón', 'Baja controlando'],
    ['3 × 5–8', 'Solo con el alta del profesional']]),
  'PR-MRO-015': ('TS-MRO-001', MRO, [MR], ['Deltoides posterior'], 'De pie, codo a 90° pegado al cuerpo', [
    ['Prueba de fuerza de rotación externa e interna', 'Compara con el hombro sano'],
    ['Registra el resultado', 'Sin dolor durante la prueba'],
    ['2–3 intentos por lado', 'Siempre con el profesional']]),
  'PR-MRO-016': ('CO-ROT-003', MRO, [MR, DEL], [OB, CORE], 'De pie con un balón ligero', [
    ['Lanzamientos a velocidad creciente hasta el máximo', 'Técnica completa del gesto'],
    ['Recuperación completa entre series', 'Para ante cualquier dolor'],
    ['Última fase del retorno', 'Con el alta del profesional']]),
}
