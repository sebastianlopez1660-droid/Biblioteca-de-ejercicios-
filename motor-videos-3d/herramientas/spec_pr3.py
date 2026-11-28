TOB = 'Prevención de tobillo'
FAS = 'Fascia plantar'
LUM = 'Rehabilitación lumbar'
EST = 'Estabilidad articular'
PRO = 'Propiocepción'
MOVT = 'Movilidad de tobillo'
Q, I, G, GM, CORE = 'Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Glúteo medio', 'Core'
ET, EC, GS, TIB = 'Estabilizadores de tobillo', 'Estabilizadores de cadera y rodilla', 'Gastrocnemio y sóleo', 'Tibial anterior'
TA, ER, OB = 'Transverso abdominal', 'Erectores espinales', 'Oblicuos'
B3 = lambda a, b, c, d, e, f: [[a, b], [c, d], [e, f]]
SPEC = {
  'MO-TOB-007': ('custom:FOOT_ROLLER', MOVT, [GS], [TIB], 'De pie, el pie sobre un rodillo pequeño (variante de la pantorrilla)', B3(
    'Rueda el pie adelante y atrás sobre el rodillo', 'Presión moderada y constante',
    'Detente 10–20 s en los puntos más tensos', 'Respira y relaja la pierna',
    '1–2 min por pie', 'Para la pantorrilla, siéntate con ella sobre el rodillo')),
  'PR-TOB-001': ('TI-PRE-008', TOB, [ET], [GS, EC], 'De pie sobre una pierna en una superficie inestable', B3(
    'Mantén el equilibrio con pequeñas correcciones del tobillo', 'Rodilla algo flexionada',
    'Mirada al frente', 'Pelvis nivelada',
    '3 × 30 s por pierna', 'Fase inicial tras el esguince')),
  'PR-TOB-002': ('TI-EQU-001', TOB, [ET], [GS, GM], 'De pie sobre la pierna lesionada, junto a un apoyo', B3(
    'Mantén el equilibrio sin apoyarte', 'Toca el apoyo solo si lo necesitas',
    'Rodilla algo flexionada', 'Peso repartido en todo el pie',
    '3–5 × 30 s', 'Progresión: ojos cerrados')),
  'PR-TOB-003': ('TI-TIB-006', TOB, ['Estabilizadores de tobillo'], [TIB], 'Sentado o tumbado con una banda alrededor del pie', B3(
    'Lleva el pie hacia fuera contra la banda (eversión)', 'Vuelve despacio',
    'Solo se mueve el tobillo', 'Rango sin dolor',
    '3 × 15', 'Músculos peroneos: clave tras el esguince')),
  'PR-TOB-004': ('TI-TIB-006', TOB, ['Estabilizadores de tobillo'], [GS], 'Sentado o tumbado con una banda alrededor del pie', B3(
    'Lleva el pie hacia dentro y abajo contra la banda (inversión)', 'Vuelve despacio',
    'Solo se mueve el tobillo', 'Rango sin dolor',
    '3 × 15', 'Trabaja el tibial posterior')),
  'PR-TOB-005': ('TI-PRE-009', TOB, [ET, Q], [G, GS], 'De pie, preparado para saltar', B3(
    'Salta y aterriza estable sobre el antepié y después todo el pie', 'Clava la recepción 2 s',
    'Tobillo firme, sin ceder hacia fuera', 'Rodillas alineadas',
    'Volumen bajo', 'Progresión: aterrizaje a una pierna')),
  'PR-TOB-006': ('TI-UNI-010', TOB, [GS], [ET], 'De pie, apoyo ligero para el equilibrio', B3(
    'Elevación de talón con carga creciente por fases', 'Sube rápido, baja en 3 s',
    'Tobillo recto, sin irse hacia fuera', 'Recorrido completo',
    '3 × 12–15', 'Primero con dos piernas, después con una')),
  'PR-TOB-007': ('TI-EQU-006', TOB, [ET], [EC, CORE], 'De pie sobre una tabla inestable', B3(
    'Mantén el equilibrio mientras un compañero te perturba', 'Reacciona sin bajar la mirada',
    'Rodillas algo flexionadas', 'Tronco estable',
    '3 × 30 s', 'Empujes suaves e impredecibles')),
  'PR-TOB-008': ('TI-PLI-005', TOB, [ET, GM], [Q, GS], 'De pie sobre una pierna junto a una línea', B3(
    'Salto lateral corto con aterrizaje estable', 'Mantén 2 s antes del siguiente',
    'Tobillo firme al caer', 'Distancia corta al principio',
    '6–8 por lado', 'Fase de reintroducción')),
  'PR-TOB-009': ('TI-EST-008', TOB, [ET, EC], [GM, CORE], 'De pie sobre una pierna en el centro de una estrella', B3(
    'Alcanza lo más lejos posible con el otro pie en varias direcciones', 'Vuelve al centro sin apoyar',
    'Rodilla de apoyo alineada', 'Pelvis estable',
    '3 vueltas por pierna', 'Compara el alcance con la otra pierna')),
  'PR-TOB-010': ('VE-TEC-010', TOB, [GS, Q, I], [ET, CORE], 'Recorrido recto y llano', B3(
    'Carrera suave en línea recta', 'Sin cambios de dirección',
    'Apoyo estable del pie', 'Sin dolor ni inflamación al día siguiente',
    'Aumenta el tiempo progresivamente', 'Sigue la pauta del profesional'), ['Carrera suave', 'Retorno a la carrera: músculos que trabajan', 'Termina caminando']),
  'PR-TOB-011': ('AG-COD-004', TOB, [ET, Q, G], [GM, CORE], 'Recorrido con un cono de corte suave', B3(
    'Cambios de dirección a baja velocidad', 'Apoyo firme del tobillo',
    'Cadera baja en el corte', 'Sin dolor',
    'Aumenta ángulo y velocidad por fases', 'Vuelve caminando'), ['Cambio de dirección', 'Agilidad: músculos que trabajan', 'Vuelve caminando']),
  'PR-TOB-012': ('TI-EQU-001', TOB, ['Estabilizadores de tobillo'], [GS], 'De pie descalzo, pie apoyado', B3(
    'Acorta el pie elevando el arco sin doblar los dedos (pie corto)', 'Mantén 5 s',
    'Primero sentado, después de pie y a una pierna', 'Dedos relajados',
    '10 repeticiones', 'Fortalece la musculatura intrínseca')),
  'PR-TOB-013': ('TI-PLI-008', TOB, [ET, Q], [G, GS], 'De pie sobre una pierna', B3(
    'Pequeño salto y aterrizaje a una pierna estable', 'Mantén 2–3 s',
    'Tobillo y rodilla alineados', 'Aterrizaje suave',
    '6–8 por pierna', 'Aumenta la distancia poco a poco')),
  'PR-TOB-014': ('PL-REJ-003', TOB, [ET, GS, Q], [G, CORE], 'En posición atlética', B3(
    'Saltos reactivos con cambios de dirección a la señal', 'Aterrizajes estables',
    'Tobillo firme en cada apoyo', 'Sin miedo al apoyo',
    'Series cortas', 'Fase avanzada de la recuperación')),
  'PR-TOB-015': ('TI-EQU-002', TOB, [ET], [EC, CORE], 'De pie sobre una pierna, brazos cruzados', B3(
    'Cierra los ojos y mantén el equilibrio el máximo tiempo', 'Para al apoyar el otro pie',
    'Anota el tiempo', 'Compara con la otra pierna',
    '3 intentos por pierna', 'Prueba de control postural')),
  'PR-TOB-016': ('AG-PER-011', TOB, [ET, Q, G], [GS, CORE], 'Situaciones de juego reales y controladas', B3(
    'Integra saltos, cortes y aceleraciones de tu deporte', 'Intensidad creciente',
    'Sin dolor ni sensación de inestabilidad', 'Usa vendaje o tobillera si te lo indican',
    'Última fase antes del alta', 'Con el visto bueno del profesional')),
  'PR-FAS-001': ('TI-TIB-006', FAS, [GS], ['Estabilizadores de tobillo'], 'Tumbado con una banda alrededor de la parte delantera del pie', B3(
    'Lleva los dedos y el pie hacia ti con la banda', 'Mantén 20–30 s',
    'Nota el estiramiento en la planta y la pantorrilla', 'Rodilla estirada',
    '3 repeticiones', 'Especialmente útil al levantarse')),
  'PR-FAS-002': ('custom:FOOT_BALL', FAS, ['Estabilizadores de tobillo'], [GS], 'De pie, una pelota pequeña bajo la planta del pie', B3(
    'Rueda la pelota desde el talón hasta los dedos', 'Presión moderada',
    'Detente en los puntos sensibles 10–20 s', 'Sin dolor intenso',
    '1–2 min por pie', 'Puedes hacerlo sentado')),
  'PR-FAS-003': ('TI-EQU-001', FAS, ['Estabilizadores de tobillo'], [GS], 'De pie descalzo', B3(
    'Pie corto: eleva el arco acercando la base de los dedos al talón', 'Mantén 5 s',
    'Los dedos no se encogen', 'Primero sentado, luego de pie',
    '10 repeticiones', 'Fortalece la musculatura intrínseca')),
  'PR-FAS-004': ('TI-TIB-002', FAS, ['Estabilizadores de tobillo'], [TIB], 'Sentado o de pie con una toalla bajo los dedos', B3(
    'Arrastra la toalla hacia ti encogiendo los dedos', 'Estira y repite',
    'El talón queda apoyado', 'Movimiento completo de los dedos',
    '3 × 30 s', 'Progresión: peso sobre la toalla')),
  'PR-FAS-005': ('TI-PAN-010', FAS, [GS], ['Estabilizadores de tobillo'], 'De pie en un escalón, toalla enrollada bajo los dedos', B3(
    'Sube con las dos piernas y baja en 3 s con una', 'Los dedos en extensión tensan la fascia',
    'Recorrido completo', 'Carga progresiva con mochila',
    '3 × 12', 'Protocolo de carga para la fascitis plantar')),
  'PR-FAS-006': ('MO-TOB-010', FAS, [GS], [], 'De pie en el borde de un escalón', B3(
    'Deja caer los talones y mantén 20–30 s', 'Repite con la rodilla algo flexionada para el sóleo',
    'Sin rebotes', 'Respira y relaja',
    '3 repeticiones por posición', 'Una pantorrilla rígida carga más la fascia')),
  'PR-FAS-007': ('custom:FOOT_ROLLER', FAS, ['Estabilizadores de tobillo'], [GS], 'De pie, el pie sobre un rodillo pequeño o una botella', B3(
    'Rueda la planta del talón a los dedos', 'Presión moderada y constante',
    'Botella fría para aliviar el dolor', 'Sin dolor intenso',
    '1–2 min por pie', 'Antes de caminar por la mañana')),
  'PR-FAS-008': ('TI-PAN-003', FAS, [GS, 'Estabilizadores de tobillo'], [], 'De pie sobre una pierna', B3(
    'Sube de puntillas llevando el talón ligeramente hacia dentro', 'Baja despacio',
    'Arco del pie elevado durante el movimiento', 'Sin dejar caer el tobillo hacia dentro',
    '3 × 12 por pierna', 'Cadena cerrada para el tibial posterior')),
  'PR-FAS-009': ('TI-EST-006', FAS, ['Estabilizadores de tobillo', EC], [GM], 'De pie sobre una pierna descalzo', B3(
    'Mantén el arco elevado (pie corto) mientras haces equilibrio', 'Flexiona un poco la rodilla',
    'Los dedos no se encogen', 'Pelvis nivelada',
    '3 × 30 s por pierna', 'Progresión: superficie blanda')),
  'PR-FAS-010': ('TI-EQU-010', FAS, ['Estabilizadores de tobillo'], [GS, CORE], 'De pie, aumentando el tiempo en bipedestación', B3(
    'Aumenta de forma progresiva el tiempo de pie', 'Alterna el peso entre los pies',
    'Calzado con buen soporte', 'Superficie blanda al principio',
    'Registra el tiempo sin dolor', 'Pausas activas cada cierto tiempo')),
  'PR-FAS-011': ('TI-TIB-002', FAS, ['Estabilizadores de tobillo'], [TIB], 'Sentado o de pie, descalzo', B3(
    'Separa los dedos, elévalos y bájalos de uno en uno', 'Sube el dedo gordo dejando los demás abajo y al revés',
    'Movimiento controlado', 'Sin calambres',
    '10 repeticiones de cada', 'Mejora el control del pie')),
  'PR-FAS-012': ('TI-EQU-005', FAS, ['Estabilizadores de tobillo'], [GS, CORE], 'Caminando en una superficie llana', B3(
    'Camina con pasos controlados apoyando talón, planta y dedos', 'Calzado adecuado',
    'Aumenta el tiempo de marcha progresivamente', 'Cambia de superficie poco a poco',
    'Sin dolor al día siguiente', 'Sigue la pauta del profesional')),
  'PR-FAS-013': ('TI-PAN-010', FAS, [GS], ['Estabilizadores de tobillo'], 'De pie en un escalón con los dedos extendidos sobre una toalla', B3(
    'Bajada lenta del talón en 3–5 s', 'Sube con las dos piernas',
    'Dedos en extensión durante todo el movimiento', 'Carga progresiva',
    '3 × 12', 'Cada dos días')),
  'PR-FAS-014': ('MO-PAS-001', FAS, [I, GS], [], 'Boca arriba con una banda en la parte delantera del pie', B3(
    'Sube la pierna estirada tirando de los dedos hacia ti', 'Estira a la vez la planta, la pantorrilla y el isquiotibial',
    'Mantén 20–30 s', 'Rodilla estirada',
    '2–3 repeticiones por pierna', 'Sin rebotes')),
  'PR-FAS-015': ('VE-TEC-007', FAS, [GS, Q], ['Estabilizadores de tobillo', CORE], 'Superficie blanda y llana', B3(
    'Trote suave alternando con tramos de caminata', 'Zancada corta y cadencia alta',
    'Sin dolor durante ni al día siguiente', 'Calzado con buena amortiguación',
    'Aumenta el tiempo de trote poco a poco', 'Sigue la pauta del profesional'), ['Trote suave', 'Retorno a la carrera: músculos que trabajan', 'Termina caminando']),
  'PR-FAS-016': ('TI-PLI-008', FAS, [GS, Q], ['Estabilizadores de tobillo', G], 'De pie sobre una pierna', B3(
    'Saltos a una pierna para valorar la tolerancia a la carga', 'Anota el dolor de 0 a 10',
    'Compara con la otra pierna', 'Aterrizaje suave',
    '2–3 series cortas', 'Siempre con el profesional')),
  'PR-LUM-001': ('custom:PELVIC_TILT', LUM, [TA, 'Recto abdominal'], [ER], 'Boca arriba, rodillas dobladas y pies apoyados', B3(
    'Bascula la pelvis aplanando la zona lumbar', 'Vuelve a la posición neutra',
    'Movimiento pequeño y sin dolor', 'Respira de forma tranquila',
    '10–15 repeticiones', 'Primer paso del control lumbar')),
  'PR-LUM-002': ('CO-ARO-005', LUM, [ER, TA, G], [OB], 'En cuadrupedia, columna neutra', B3(
    'Estira un brazo o una pierna sin mover la espalda', 'Después brazo y pierna contraria',
    'Pelvis nivelada', 'Movimiento lento',
    '8–10 por lado', 'Progresión temprana')),
  'PR-LUM-003': ('TI-PUE-001', LUM, [G], [I, TA], 'Boca arriba, rodillas dobladas', B3(
    'Eleva la cadera apretando los glúteos', 'Baja vértebra a vértebra',
    'Sin arquear la zona lumbar arriba', 'Abdomen activo',
    '10–12 repeticiones', 'Rango cómodo')),
  'PR-LUM-004': ('TI-ACT-008', LUM, [TA, 'Flexores de cadera'], ['Recto abdominal'], 'Boca arriba, rodillas dobladas', B3(
    'Eleva una rodilla a 90° sin mover la pelvis', 'Bájala y alterna (marcha en el suelo)',
    'Zona lumbar estable', 'Respiración tranquila',
    '8–10 por lado', 'Progresión: estirar la pierna')),
  'PR-LUM-005': ('MO-COL-010', LUM, [ER], ['Recto abdominal'], 'Boca abajo, apoyado sobre los antebrazos', B3(
    'Mantén la extensión sobre los antebrazos 20–30 s', 'Relaja los glúteos',
    'Pelvis en el suelo', 'Sin dolor que baje a la pierna',
    '3–5 repeticiones', 'Útil si la extensión alivia')),
  'PR-LUM-006': ('MO-COL-002', LUM, [ER, 'Recto abdominal'], [CORE], 'En cuadrupedia', B3(
    'Alterna flexión y extensión de la espalda en un rango cómodo', 'Movimiento lento',
    'Sin dolor', 'Coordina con la respiración',
    '10 repeticiones', 'Movilidad terapéutica')),
  'PR-LUM-007': ('TS-ESC-011', LUM, [TA, ER], [OB, 'Deltoides'], 'En cuadrupedia, columna neutra', B3(
    'Eleva un brazo hacia delante sin mover el tronco', 'Progresión: pierna y después brazo y pierna',
    'Pelvis nivelada', 'Abdomen activo',
    '8–10 por lado', 'Sin dolor')),
  'PR-LUM-008': ('TI-BIS-001', LUM, [G, I], [ER, CORE], 'De pie con una banda o bastón', B3(
    'Practica la bisagra de cadera con la espalda neutra', 'Lleva la cadera atrás',
    'El bastón toca cabeza, espalda y sacro', 'Rodillas algo flexionadas',
    '10–12 repeticiones', 'Base para levantar peso con seguridad')),
  'PR-LUM-009': ('TI-EQU-005', LUM, [TA, GM], [ER, 'Estabilizadores de tobillo'], 'Caminando en línea recta', B3(
    'Camina activando suavemente el abdomen', 'Postura alta y pasos controlados',
    'Brazos relajados', 'Respira con normalidad',
    '5–10 min', 'Aumenta el tiempo progresivamente')),
  'PR-LUM-010': ('TI-SEN-007', LUM, [Q, G], [CORE, ER], 'De pie frente a un cajón', B3(
    'Siéntate en el cajón con la espalda neutra y levántate', 'Altura del cajón según tolerancia',
    'Peso en los talones', 'Pecho alto',
    '10–12 repeticiones', 'Baja el cajón al progresar')),
  'PR-LUM-011': ('CO-AFL-010', LUM, [CORE, 'Dorsal ancho'], [ER], 'Colgado parcialmente de las cintas con los pies en el suelo', B3(
    'Deja que el peso del cuerpo descomprima suavemente la espalda', 'Mantén 20–30 s',
    'Respira y relaja la zona lumbar', 'Pies apoyados para regular la carga',
    '3–5 repeticiones', 'Sin dolor')),
  'PR-LUM-012': ('TI-PRE-003', LUM, [GM], [G, TA], 'Tumbado de lado, rodillas dobladas', B3(
    'Abre la rodilla de arriba sin mover la pelvis', 'Baja despacio',
    'Pies juntos', 'Pelvis perpendicular al suelo',
    '15 por lado', 'Progresión: con banda')),
  'PR-LUM-013': ('TI-PMU-001', LUM, [G, I, ER], [CORE], 'De pie con una carga mínima delante', B3(
    'Peso muerto con la espalda neutra y la carga cerca del cuerpo', 'Empuja el suelo para subir',
    'Carga mínima al principio', 'Sin dolor',
    '3 × 8–10', 'Aumenta la carga gradualmente')),
  'PR-LUM-014': ('CO-AEX-001', LUM, [TA, ER], ['Recto abdominal', OB], 'En plancha sobre los antebrazos', B3(
    'Mantén la postura neutra el máximo tiempo cómodo', 'Construye resistencia postural',
    'Cuerpo en línea', 'Respira con normalidad',
    'Series de 20–40 s', 'En la oficina, levántate cada 30–45 min')),
  'PR-LUM-015': ('TI-PMU-003', LUM, [G, I, ER], [CORE], 'De pie con barra o mancuernas', B3(
    'Levantamiento con técnica de bisagra y carga progresiva', 'Simula los gestos de tu trabajo o deporte',
    'Espalda neutra en todo el recorrido', 'Abdomen activo',
    '3 × 6–10', 'Progresión según tolerancia')),
  'PR-LUM-016': ('CO-CES-002', LUM, [OB, TA], [GM], 'En plancha lateral', B3(
    'Mantén el máximo tiempo con buena técnica', 'Registra el tiempo de cada lado',
    'Compara con las pruebas de flexión y extensión', 'Cuerpo en línea',
    '1 intento por lado', 'Prueba de resistencia del core')),
  'PR-EST-001': ('TI-EQU-008', EST, [EC, Q], [GM, ET], 'De pie sobre una pierna, un compañero delante', B3(
    'El compañero empuja suavemente y tú mantienes la rodilla estable', 'Reacciona sin perder la postura',
    'Rodilla algo flexionada y alineada', 'Empujes impredecibles',
    '3 × 30 s por pierna', 'Progresión: sobre bosu')),
  'PR-EST-002': ('CO-AIN-002', EST, [GM, OB], ['Cuadrado lumbar', 'Transverso abdominal'], 'En plancha lateral', B3(
    'Eleva la pierna de arriba manteniendo la cadera alta', 'Baja despacio',
    'Cuerpo en línea', 'Sin rotar la pelvis',
    '8–12 por lado', 'Progresión: apoyo en superficie inestable')),
  'PR-EST-003': ('TI-EST-001', EST, [Q, G, EC], [ET, CORE], 'De pie sobre un bosu', B3(
    'Sentadilla controlando tobillo, rodilla y cadera a la vez', 'Rodillas alineadas',
    'Peso repartido', 'Movimiento lento',
    '3 × 10', 'Cadena cinética cerrada')),
  'PR-EST-004': ('TI-EST-002', EST, [Q, G, EC], [ET, CORE], 'Con el pie delantero sobre una superficie inestable', B3(
    'Zancada estable controlando todas las articulaciones', 'Rodilla delantera alineada',
    'Tronco erguido', 'Bajada lenta',
    '3 × 8 por pierna', 'Progresión multiarticular')),
  'PR-EST-005': ('TS-PRV-008', EST, ['Manguito rotador', 'Serrato anterior'], [CORE], 'En plancha con las manos sobre superficies distintas', B3(
    'Mantén la plancha cambiando el apoyo de las manos', 'Hombros estables',
    'Cuerpo en línea', 'Escápulas activas',
    '3 × 20–30 s', 'Sin dolor')),
  'PR-EST-006': ('CO-AEX-010', EST, [TA, 'Recto abdominal'], [OB, ER], 'En plancha', B3(
    'Un compañero perturba el tronco y tú mantienes la posición', 'Reacciona sin perder la línea',
    'Abdomen activo', 'Respira con normalidad',
    '3 × 20–30 s', 'Perturbaciones suaves al principio')),
  'PR-EST-007': ('TI-EQU-009', EST, [EC, ET], [GM, CORE], 'De pie con los dos pies', B3(
    'Pasa de dos apoyos a uno de forma controlada', 'Estabiliza 2–3 s en cada cambio',
    'Rodilla de apoyo alineada', 'Pelvis nivelada',
    '10 cambios por pierna', 'Progresión: sobre superficie inestable')),
  'PR-EST-008': ('TI-UNI-001', EST, [Q, G, EC], [GM, ET], 'De pie sobre una pierna, banda tirando de la rodilla hacia dentro', B3(
    'Sentadilla a una pierna resistiendo la banda', 'Rodilla alineada con el pie',
    'Pelvis nivelada', 'Movimiento lento',
    '3 × 8 por pierna', 'Fase avanzada')),
  'PR-EST-009': ('TI-EQU-006', EST, [ET, EC], [CORE], 'De pie con los dos pies sobre una plataforma inestable', B3(
    'Mantén el equilibrio con el cuerpo alineado', 'Correcciones pequeñas',
    'Rodillas algo flexionadas', 'Mirada al frente',
    '3 × 30–45 s', 'Progresión: ojos cerrados')),
  'PR-EST-010': ('VE-DEC-001', EST, [Q, G, EC], [CORE, I], 'Recorrido corto con zona de frenada', B3(
    'Carrera suave y frenada controlada', 'Baja la cadera al frenar',
    'Rodillas alineadas en la frenada', 'Velocidad progresiva',
    '6–8 repeticiones', 'Sin dolor'), ['Frenada controlada', 'Desaceleración: músculos que trabajan', 'Vuelve caminando']),
  'PR-EST-011': ('TI-PRE-009', EST, [Q, G, EC], [GS, CORE], 'De pie, con ayuda o supervisión', B3(
    'Salto y aterrizaje con estabilización completa', 'Clava la recepción',
    'Rodillas alineadas', 'Aterrizaje suave',
    'Volumen bajo y progresivo', 'Retorno al deporte')),
  'PR-EST-012': ('CO-ARO-005', EST, [TA, ER, G], [OB, 'Deltoides'], 'En cuadrupedia con una carga ligera', B3(
    'Bird dog con lastre ligero en tobillo o mano', 'Tronco totalmente quieto',
    'Pelvis nivelada', 'Movimiento lento',
    '8 por lado', 'Carga externa ligera')),
  'PR-EST-013': ('AG-COD-001', EST, [Q, G, EC], ['Aductores', CORE], 'Gesto específico de tu deporte', B3(
    'Repite el gesto de tu deporte con control articular', 'Calidad antes que velocidad',
    'Rodillas alineadas en apoyos y cortes', 'Intensidad progresiva',
    'Series cortas', 'Sin dolor'), ['Gesto deportivo', 'Estabilidad: músculos que trabajan', 'Vuelve caminando']),
  'PR-EST-014': ('TI-EST-002', EST, [G, Q, OB], [EC, CORE], 'En zancada, un compañero aplica empujones suaves', B3(
    'Mantén la zancada estable ante las perturbaciones', 'Tronco firme',
    'Rodilla delantera alineada', 'Reacciona sin perder la base',
    '3 × 20 s por lado', 'Empujes impredecibles')),
  'PR-EST-015': ('TI-EST-008', EST, [EC, ET], [GM, CORE], 'De pie sobre una pierna en el centro de la Y', B3(
    'Alcanza adelante, atrás-dentro y atrás-fuera con el otro pie', 'Mide la distancia de cada dirección',
    'Compara entre piernas', 'Sin apoyar el pie que alcanza',
    '3 intentos por dirección', 'Prueba de estabilidad dinámica')),
  'PR-EST-016': ('AG-PER-011', EST, [Q, G, EC], [ET, CORE], 'Circuito con saltos, cortes y apoyos inestables', B3(
    'Encadena tareas de estabilidad a intensidad de juego', 'Calidad en cada apoyo',
    'Rodillas y tobillos alineados', 'Sin dolor ni inestabilidad',
    'Última fase antes del alta', 'Con el visto bueno del profesional')),
  'PR-PRO-001': ('TI-EST-007', PRO, [EC, Q], [ET, CORE], 'De pie sobre una superficie inestable, ojos cerrados', B3(
    'Sentadilla parcial sin ver, controlando la rodilla', 'Abre los ojos si pierdes el equilibrio',
    'Rodillas alineadas', 'Movimiento lento',
    '3 × 8', 'Propiocepción de rodilla')),
  'PR-PRO-002': ('TI-EQU-006', PRO, [ET], [EC, GS], 'De pie sobre un plato de Freeman', B3(
    'Mantén el plato equilibrado sin tocar el suelo con el borde', 'Después haz círculos controlados',
    'Rodillas algo flexionadas', 'Mirada al frente',
    '3 × 30–45 s', 'Progresión: a una pierna')),
  'PR-PRO-003': ('TI-EQU-004', PRO, [GM, EC], [CORE, ET], 'De pie sobre una pierna', B3(
    'Mantén el equilibrio mientras lanzas y recibes un balón', 'La tarea extra pone a prueba la cadera',
    'Pelvis nivelada', 'Rodilla estable',
    '3 × 30 s por pierna', 'Tarea dual')),
  'PR-PRO-004': ('TS-PRV-012', PRO, ['Manguito rotador', 'Serrato anterior'], ['Deltoides'], 'De pie o en apoyo inestable frente a una pared', B3(
    'Lanza y recibe un balón ligero contra la pared', 'Mantén el hombro estable',
    'Ritmo constante', 'Sin dolor',
    '3 × 30 s', 'Propiocepción de hombro')),
  'PR-PRO-005': ('TI-EQU-008', PRO, [EC, ET], [CORE, GM], 'De pie sobre una pierna, un compañero detrás', B3(
    'El compañero te desequilibra sin avisar', 'Recupera la postura rápidamente',
    'Rodilla algo flexionada', 'Tronco firme',
    '3 × 30 s por pierna', 'Perturbaciones impredecibles')),
  'PR-PRO-006': ('TI-EQU-010', PRO, [ET, EC], [GS, CORE], 'De pie sobre una cama elástica o superficie blanda', B3(
    'Pequeños rebotes controlados y equilibrio a una pierna', 'Aterriza estable',
    'Rodillas algo flexionadas', 'Mirada al frente',
    '3 × 30 s', 'Progresión: tareas con balón')),
  'PR-PRO-007': ('TI-EST-006', PRO, [EC, Q], [GM, ET], 'De pie sobre una pierna', B3(
    'Mantén la rodilla estable mientras resuelves una tarea mental', 'Por ejemplo, contar hacia atrás',
    'Rodilla alineada', 'Pelvis nivelada',
    '3 × 30 s por pierna', 'Tarea dual')),
  'PR-PRO-008': ('TI-EST-008', PRO, [EC, ET], [GM, CORE], 'De pie sobre una pierna', B3(
    'Desplaza un objeto con el otro pie a distintos puntos', 'Vuelve al centro sin apoyar',
    'Rodilla alineada', 'Pelvis estable',
    '3 vueltas por pierna', 'Aumenta la distancia poco a poco')),
  'PR-PRO-009': ('TI-EQU-006', PRO, [ET, EC], [CORE], 'De pie sobre una plataforma inestable multidireccional', B3(
    'Mantén el equilibrio y mueve los brazos o el tronco', 'Correcciones globales',
    'Rodillas algo flexionadas', 'Respira con normalidad',
    '3 × 30–45 s', 'Propiocepción global')),
  'PR-PRO-010': ('CO-EXT-007', PRO, [ER, TA], [G, OB], 'Sobre un balón suizo', B3(
    'Mantén la posición mientras un compañero mueve el balón', 'Tronco estable',
    'Pies bien apoyados', 'Movimientos suaves al principio',
    '3 × 20–30 s', 'Propiocepción de tronco')),
  'PR-PRO-011': ('TI-EQU-004', PRO, [EC, ET], [CORE, GM], 'Superficie inestable y gesto de tu deporte', B3(
    'Combina equilibrio con el gesto deportivo', 'Por ejemplo, recibir un pase',
    'Rodilla y tobillo estables', 'Intensidad progresiva',
    '3 × 30 s', 'Específico del deporte')),
  'PR-PRO-012': ('TI-PRE-008', PRO, ['Estabilizadores de tobillo'], [GS, EC], 'De pie sobre una superficie inestable con una banda que tira del tobillo', B3(
    'Mantén el equilibrio contra la tracción de la banda', 'Cambia la dirección del tirón',
    'Rodilla algo flexionada', 'Tobillo firme',
    '3 × 30 s', 'Progresión: ojos cerrados')),
  'PR-PRO-013': ('TI-EQU-003', PRO, [ET, EC], [GM, CORE], 'Junto a una superficie estable y otra inestable', B3(
    'Pasa de la superficie estable a la inestable y estabiliza', 'Mantén 3 s en cada cambio',
    'Rodilla alineada', 'Mirada al frente',
    '10 cambios por pierna', 'Progresión: con salto')),
  'PR-PRO-014': ('TI-EQU-002', PRO, [ET, EC], [CORE], 'De pie sobre una pierna', B3(
    'Reduce la información visual: mirada arriba, gafas, ojos cerrados', 'Mantén el equilibrio en cada fase',
    'Rodilla algo flexionada', 'Pelvis nivelada',
    '3 × 30 s por fase', 'Avanza solo si dominas la anterior')),
  'PR-PRO-015': ('TI-EQU-002', PRO, [ET], [EC, CORE], 'De pie sobre una pierna con los ojos cerrados', B3(
    'Mide cuánto tiempo mantienes el equilibrio', 'Para al apoyar el otro pie o abrir los ojos',
    'Brazos cruzados', 'Compara entre piernas',
    '3 intentos por pierna', 'Prueba de control postural')),
  'PR-PRO-016': ('AG-PER-011', PRO, [EC, ET, Q], [CORE, G], 'Circuito de juego con superficies y tareas variadas', B3(
    'Integra equilibrio, saltos y cambios de dirección', 'Ritmo de competición',
    'Control en cada apoyo', 'Sin dolor ni inseguridad',
    'Fase final del retorno', 'Con el visto bueno del profesional')),
}
