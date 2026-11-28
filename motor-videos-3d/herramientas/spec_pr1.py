LCA = 'Prevención LCA'
ISQ = 'Prevención de isquiotibiales'
ADU = 'Prevención de aductores'
Q, I, G, GM, CORE = 'Cuádriceps', 'Isquiotibiales', 'Glúteos', 'Glúteo medio', 'Core'
EST = 'Estabilizadores de cadera y rodilla'
AD = 'Aductores'
SPEC = {
  'PR-LCA-001': ('TI-UNI-001', LCA, [Q, I, EST], [G, CORE], 'De pie sobre una pierna, apoyo ligero delante y mini banda en la rodilla', [
    ['Baja a media sentadilla a una pierna', 'La rodilla sigue la línea del segundo dedo'],
    ['Si la banda tira de la rodilla hacia dentro, empuja hacia fuera', 'Pelvis nivelada y tronco estable'],
    ['8–12 repeticiones por pierna', 'Calidad antes que profundidad']]),
  'PR-LCA-002': ('PL-SHO-011', LCA, [Q, G, EST], [I, CORE], 'De pie, pies a la anchura de la cadera', [
    ['Salta y aterriza en tres tiempos: contacto, amortiguación y estabilización', 'Clava la recepción 2–3 s'],
    ['Rodillas alineadas con los pies al caer', 'Cadera atrás y pecho adelante'],
    ['Aterrizaje silencioso', 'Progresión: más distancia o a una pierna']]),
  'PR-LCA-003': ('PL-SVE-007', LCA, [Q, G, 'Gastrocnemio y sóleo'], [CORE, 'Flexores de cadera'], 'De pie en el centro de una marca, observado por el entrenador', [
    ['Saltos continuos con rodillas al pecho durante 10 s', 'El entrenador revisa la técnica'],
    ['Rodillas separadas y alineadas en cada aterrizaje', 'Cae siempre en la misma marca'],
    ['Corrige un fallo cada serie', 'Si aparece el valgo, para']]),
  'PR-LCA-004': ('TI-ZAN-001', LCA, [Q, G, EST], [GM, CORE], 'De pie frente a un espejo si es posible', [
    ['Da una zancada controlando que la rodilla no se vaya hacia dentro', 'Rodilla sobre el segundo dedo'],
    ['Pelvis nivelada y tronco erguido', 'Baja despacio'],
    ['8–10 repeticiones por pierna', 'Empuja con todo el pie al volver']]),
  'PR-LCA-005': ('TI-PRE-001', LCA, [Q, G, EST], [GM, 'Gastrocnemio y sóleo'], 'De pie sobre un escalón con una pierna', [
    ['Baja el otro talón al suelo corrigiendo la rodilla hacia fuera', 'Control excéntrico lento'],
    ['Pelvis nivelada, sin dejar caer la cadera', 'Rodilla alineada con el pie'],
    ['Progresión: escalón más alto', '8–12 repeticiones por pierna']]),
  'PR-LCA-006': ('TI-PRE-005', LCA, [Q, G, GM], [AD, CORE], 'De pie con una mini banda por encima de las rodillas', [
    ['Haz sentadillas empujando las rodillas contra la banda', 'Las rodillas no se juntan en ningún momento'],
    ['Peso repartido en todo el pie', 'Pecho alto'],
    ['10–15 repeticiones', 'Banda de tensión moderada']]),
  'PR-LCA-007': ('TI-PRE-009', LCA, [Q, G, 'Gastrocnemio y sóleo'], [EST, CORE], 'De pie sobre una marca, pies a la anchura de la cadera', [
    ['Saltos pequeños y aterrizajes suaves y estables', 'Primero bilaterales y en el sitio'],
    ['Rodillas alineadas en cada aterrizaje', 'Sin dolor ni inestabilidad'],
    ['Progresión gradual de altura y dirección', 'Volumen bajo al principio']]),
  'PR-LCA-008': ('TI-PLI-005', LCA, [GM, Q, EST], ['Estabilizadores de tobillo', CORE], 'De pie sobre una pierna junto a una línea', [
    ['Salta lateralmente y aterriza estable sobre la otra pierna', 'Mantén 2 s antes del siguiente salto'],
    ['Rodilla alineada y cadera estable', 'Distancia corta al principio'],
    ['6–8 saltos por lado', 'Solo en fase intermedia de la recuperación']]),
  'PR-LCA-009': ('TI-EQU-003', LCA, [EST, Q], ['Estabilizadores de tobillo', CORE], 'De pie sobre una pierna en una superficie inestable', [
    ['Flexiona ligeramente la rodilla manteniendo el equilibrio', 'Rodilla alineada con el pie'],
    ['Pelvis nivelada y tronco quieto', 'Mirada al frente'],
    ['30–45 s por pierna', 'Progresión: ojos cerrados o perturbaciones']]),
  'PR-LCA-010': ('TI-ERO-010', LCA, [Q], [G, EST], 'De pie con una banda detrás de la rodilla anclada delante', [
    ['Estira la rodilla contra la banda hasta bloquearla', 'Vuelve despacio'],
    ['Peso sobre la pierna trabajada', 'Aprieta el cuádriceps al final'],
    ['15–20 repeticiones', 'Respeta las indicaciones del fisioterapeuta']]),
  'PR-LCA-011': ('TI-STU-010', LCA, [Q, G], [EST, 'Gastrocnemio y sóleo'], 'De pie sobre un escalón con una pierna', [
    ['Baja el otro pie hacia el suelo en 3–4 s', 'Toca con el talón y sube'],
    ['Rodilla alineada con el pie', 'Sin dejar caer la cadera'],
    ['8–12 repeticiones por pierna', 'Sin dolor anterior de rodilla']]),
  'PR-LCA-012': ('TI-ACT-005', LCA, [I], [G, EST], 'Con la banda indicada en la posición de inicio', [
    ['Activa los isquiotibiales de forma controlada', 'Mantén la tensión 2–3 s'],
    ['Movimiento lento y sin compensaciones', 'Rodilla estable'],
    ['10–15 repeticiones', 'Protege el ligamento en las primeras fases']]),
  'PR-LCA-013': ('TI-PLI-001', LCA, [Q, G, 'Gastrocnemio y sóleo'], [I, CORE], 'De pie, pies a la anchura de la cadera', [
    ['Salto vertical con los dos pies y aterrizaje controlado', 'Amortigua con cadera y rodillas'],
    ['Rodillas alineadas al despegar y al caer', 'Brazos ayudan al impulso'],
    ['Progresión gradual del volumen', 'Solo con el alta del profesional']]),
  'PR-LCA-014': ('PL-SHO-001', LCA, [Q, G, EST], [I, CORE], 'De pie detrás de una línea', [
    ['Salta hacia delante y clava la recepción', 'Mantén 2–3 s la posición'],
    ['Rodillas alineadas al aterrizar', 'Cadera atrás y tronco estable'],
    ['Aumenta la distancia poco a poco', 'Si hay valgo, reduce la distancia']]),
  'PR-LCA-015': ('TI-PLI-008', LCA, [Q, G, 'Gastrocnemio y sóleo'], [EST, CORE], 'De pie sobre una pierna detrás de una línea', [
    ['Salta lo más lejos posible a una pierna y aterriza estable', 'Compara la distancia con la otra pierna'],
    ['Recepción mantenida 2 s', 'Rodilla alineada'],
    ['3 intentos por pierna', 'Un índice de simetría ≥ 90 % orienta el retorno']]),
  'PR-LCA-016': ('VE-ACE-011', LCA, [Q, I, G], ['Gastrocnemio y sóleo', CORE], 'Recorrido recto de 30–60 m', [
    ['Carrera progresiva en línea recta, sin cambios de dirección', 'Empieza al 50–60 % de velocidad'],
    ['Zancada relajada y simétrica', 'Sin dolor ni inflamación al día siguiente'],
    ['Aumenta la velocidad cada sesión', 'Sigue la progresión de tu fisioterapeuta']], ['Carrera progresiva', 'Retorno a la carrera: músculos que trabajan', 'Frena progresivamente']),
  'PR-ISQ-001': ('TI-PRE-007', ISQ, [I], [G, 'Gastrocnemio y sóleo'], 'De rodillas, un compañero sujeta los tobillos', [
    ['Déjate caer hacia delante frenando con los isquiotibiales', 'Cadera estirada, cuerpo recto'],
    ['Frena hasta donde controles y apóyate con las manos', 'Vuelve empujando con las manos'],
    ['3 series de 4–6 en prevención', 'Aumenta el rango poco a poco']]),
  'PR-ISQ-002': ('TI-CFE-009', ISQ, [I], ['Gastrocnemio y sóleo'], 'En la máquina o con ayuda, posición de inicio del curl', [
    ['Sube con ayuda y baja en 3–5 s solo con la pierna afectada', 'Fase excéntrica lenta'],
    ['Sin dolor durante el ejercicio', 'Cadera pegada al banco'],
    ['Progresión de carga semana a semana', '3 series de 6–10']]),
  'PR-ISQ-003': ('TI-PUE-007', ISQ, [I, G], [CORE, 'Erectores espinales'], 'Boca arriba con los pies sobre un apoyo', [
    ['Eleva la cadera y mantén con las rodillas casi estiradas', 'Nota el trabajo en la parte de atrás del muslo'],
    ['Pelvis nivelada', 'Baja despacio'],
    ['8–12 repeticiones', 'Progresión: a una pierna']]),
  'PR-ISQ-004': ('TI-PMU-003', ISQ, [I, G], ['Erectores espinales', CORE], 'De pie con una barra o mancuernas ligeras', [
    ['Baja llevando la cadera atrás con la espalda recta', 'Rodillas algo flexionadas'],
    ['Nota el estiramiento sin dolor', 'Sube apretando los glúteos'],
    ['Carga baja al reintroducir', 'Aumenta la carga de forma progresiva']]),
  'PR-ISQ-005': ('VE-TEC-010', ISQ, [I, G, Q], ['Gastrocnemio y sóleo', CORE], 'Recorrido recto y llano', [
    ['Carrera suave a baja velocidad', 'Zancada corta y relajada'],
    ['Sin molestias en la parte de atrás del muslo', 'Postura alta'],
    ['Aumenta el tiempo antes que la velocidad', 'Sigue los criterios de tu fisioterapeuta']], ['Carrera suave', 'Retorno a la carrera: músculos que trabajan', 'Termina caminando']),
  'PR-ISQ-006': ('TI-CFE-007', ISQ, [I], [G, CORE], 'Boca arriba, talones sobre deslizadores y cadera elevada', [
    ['Desliza los pies lejos frenando con los isquiotibiales', 'Vuelve recogiendo los talones'],
    ['Cadera elevada durante todo el recorrido', 'Fase de ida lenta (3–4 s)'],
    ['6–10 repeticiones', 'Progresión: a una pierna']]),
  'PR-ISQ-007': ('CO-AFL-006', ISQ, [I, G], ['Erectores espinales'], 'En el banco romano a 45°, cadera en el borde del apoyo', [
    ['Baja flexionando la cadera en 3–4 s', 'Sube apretando glúteos e isquiotibiales'],
    ['Espalda recta, el movimiento es de cadera', 'Sin rebotes abajo'],
    ['8–12 repeticiones', 'Añade carga cuando sea fácil']]),
  'PR-ISQ-008': ('TI-PUE-010', ISQ, [I, G], [CORE], 'Boca arriba, pies apoyados en la pared con rodillas a 90°', [
    ['Eleva la cadera y empuja los talones contra la pared', 'Mantén 20–30 s'],
    ['Pelvis nivelada', 'Intensidad cómoda, sin dolor'],
    ['3–5 repeticiones', 'Primera fase tras la lesión']]),
  'PR-ISQ-009': ('VE-CRI-006', ISQ, [I, G, Q], ['Gastrocnemio y sóleo', CORE], 'Recorrido recto de 40–60 m', [
    ['Carrera progresiva hasta un sprint submáximo', 'Empieza al 60 % y sube cada serie'],
    ['Zancada relajada en la aceleración', 'Para ante cualquier tirón'],
    ['Pocas repeticiones con descanso completo', 'Sigue el protocolo de tu fisioterapeuta']], ['Velocidad progresiva', 'Retorno al sprint: músculos que trabajan', 'Frena progresivamente']),
  'PR-ISQ-010': ('MO-ROD-001', ISQ, [I], ['Gastrocnemio y sóleo'], 'Sentado al borde de un cajón, espalda algo redondeada', [
    ['Estira la rodilla mientras llevas la cabeza atrás', 'Al doblar la rodilla, baja la barbilla'],
    ['Movimiento suave de vaivén, sin mantener la tensión', 'Sin dolor ni hormigueo intenso'],
    ['10–15 repeticiones', 'Movilización del nervio, no estiramiento']]),
  'PR-ISQ-011': ('TI-HIP-007', ISQ, [I, G], [CORE, EST], 'Espalda en un banco, pies sobre una superficie inestable', [
    ['Eleva la cadera estabilizando los pies', 'Mantén 2 s arriba'],
    ['Pelvis nivelada', 'Progresión: una sola pierna'],
    ['8–12 repeticiones', 'Movimiento controlado']]),
  'PR-ISQ-012': ('CO-EXT-001', ISQ, [I, G, 'Erectores espinales'], [CORE], 'En el banco romano con el ángulo indicado', [
    ['Baja lento controlando con la parte de atrás del muslo', 'Sube apretando los glúteos'],
    ['Aumenta el ángulo del banco al progresar', 'Espalda neutra'],
    ['6–10 repeticiones', 'Fase excéntrica de 3–4 s']]),
  'PR-ISQ-013': ('TI-ZAN-001', ISQ, [I, G, Q], [CORE], 'De pie, pies a la anchura de la cadera', [
    ['Da una zancada larga con el tronco algo inclinado adelante', 'Frena la bajada con la pierna delantera'],
    ['Bajada lenta (3 s)', 'Rodilla delantera alineada'],
    ['8–10 repeticiones por pierna', 'Empuja con el talón al volver']]),
  'PR-ISQ-014': ('TI-PUE-005', ISQ, [I, G], [CORE], 'Boca arriba, rodillas dobladas, para una prueba de fuerza', [
    ['Empuja con los talones y mantén la máxima tensión 3–5 s', 'Compara ambas piernas'],
    ['Pelvis estable', 'Sin dolor durante la prueba'],
    ['2–3 intentos por pierna', 'Registra el resultado para comparar']]),
  'PR-ISQ-015': ('TI-PLI-007', ISQ, [I, G, Q], ['Gastrocnemio y sóleo', CORE], 'Recorrido recto de 20–30 m', [
    ['Zancadas saltadas suaves, con poca amplitud', 'Aterriza bajo la cadera'],
    ['Aumenta la amplitud poco a poco', 'Sin molestias en el isquiotibial'],
    ['2–4 series cortas', 'Solo tras superar la carrera rápida']]),
  'PR-ISQ-016': ('VE-SPR-010', ISQ, [I, G, Q], ['Gastrocnemio y sóleo', CORE], 'Zona de impulso y tramo cronometrado', [
    ['Alcanza la velocidad máxima de forma progresiva', 'Mantén la técnica relajada'],
    ['Pocas repeticiones con recuperación completa', 'Para ante cualquier molestia'],
    ['Última fase del retorno', 'Con el alta del profesional']], ['Velocidad máxima', 'Retorno al sprint: músculos que trabajan', 'Frena progresivamente']),
  'PR-ADU-001': ('custom:COPEN', ADU, [AD], ['Oblicuos', CORE], 'Plancha lateral sobre el antebrazo, pie de arriba sobre un banco', [
    ['Eleva la pierna de abajo hasta el banco', 'Baja despacio sin tocar el suelo si puedes'],
    ['Cuerpo en línea de la cabeza a los pies', 'Cadera elevada'],
    ['3 series de 6–10 por lado', 'Uno de los mejores preventivos de aductores']]),
  'PR-ADU-002': ('custom:COPEN_KNEE', ADU, [AD], ['Oblicuos', CORE], 'Plancha lateral con la rodilla de arriba apoyada en el banco', [
    ['Eleva la cadera y la pierna de abajo hacia el banco', 'Baja despacio'],
    ['Palanca corta: más fácil que la versión completa', 'Cuerpo en línea'],
    ['3 series de 8–10 por lado', 'Progresa al pie sobre el banco']]),
  'PR-ADU-003': ('custom:ADD_SQ', ADU, [AD], [CORE], 'Boca arriba, rodillas dobladas y un balón entre ellas', [
    ['Aprieta el balón con las rodillas y mantén 5 s', 'Suelta y repite'],
    ['Pelvis y espalda apoyadas', 'Intensidad sin dolor en la ingle'],
    ['5–10 repeticiones', 'Sube la intensidad de forma progresiva']]),
  'PR-ADU-004': ('custom:ADD_BAND', ADU, [AD], [GM, CORE], 'De pie de lado a un anclaje, banda en el tobillo cercano', [
    ['Lleva la pierna hacia dentro cruzando por delante', 'Vuelve despacio controlando la banda'],
    ['Tronco erguido, sin inclinarte', 'Apoyo ligero en una pared si hace falta'],
    ['12–15 repeticiones por pierna', 'Movimiento controlado']]),
  'PR-ADU-005': ('TI-ZAN-003', ADU, [AD, G, Q], [GM, CORE], 'De pie, pies juntos', [
    ['Paso lateral amplio bajando la cadera hacia atrás', 'La pierna estirada nota el estiramiento del aductor'],
    ['Empuja con la pierna flexionada para volver', 'Pecho alto'],
    ['8–10 repeticiones por lado', 'Aumenta la amplitud poco a poco']]),
  'PR-ADU-006': ('custom:ADD_SQ', ADU, [AD], [CORE], 'Boca arriba, rodillas dobladas y puño o balón entre las rodillas', [
    ['Aprieta con fuerza 5 s y relaja', 'Prueba con rodillas a 45° y a 90°'],
    ['Sin dolor en la ingle', 'Respira durante el apretón'],
    ['5–10 repeticiones', 'Sirve también para controlar la evolución']]),
  'PR-ADU-007': ('custom:ADD_CABLE', ADU, [AD], [GM, CORE], 'De pie de lado a la polea baja, tobillera en la pierna cercana', [
    ['Lleva la pierna hacia dentro cruzando por delante', 'Vuelve despacio controlando el cable'],
    ['Tronco erguido y apoyo firme', 'Sin balanceos'],
    ['10–12 repeticiones por pierna', 'Carga progresiva']]),
  'PR-ADU-008': ('TI-SEN-006', ADU, [AD, G, Q], [CORE], 'De pie, pies muy abiertos y puntas hacia fuera', [
    ['Baja en sentadilla sumo con las rodillas hacia fuera', 'Sube empujando el suelo'],
    ['Rodillas alineadas con los pies', 'Espalda recta'],
    ['Carga progresiva', '8–12 repeticiones']]),
}
