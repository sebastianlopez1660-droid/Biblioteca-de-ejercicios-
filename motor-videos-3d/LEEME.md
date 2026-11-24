# Motor de videos 3D — Biblioteca de Ejercicios

Código que genera los videos de técnica de la carpeta `videos-3d/` (rama `videos-3d`).

- `js/` — motor Three.js: `squat.js` (familias de pie: sentadillas, bisagras, pesos muertos, split squats, zancadas),
  `free.js` (familias con postura libre: subidas al cajón, hip thrust y puentes boca arriba, cuadrupedia, curl nórdico,
  curl tumbado y sentado, extensión de rodilla), `exercises.js` + `ex_lote6.js` … `ex_lote10.js` (definiciones por ejercicio),
  `props.js` (implementos y máquinas), `overlay.js`, `main.js`.
- `body.json` no se incluye (5,9 MB): se regenera con `python3 build_body.py body.json`.
- Render: `npm install`, luego `./batch_snap.sh NOMBRE CODIGO...` (Chromium sin ventana + ffmpeg).
- Publicación: `pub.py CODIGO...` sube los mp4 a esta rama, crea miniaturas y prepara la edición del mapa `videos-3d` de la página.
