# Uso: python3 patch.py CODE...  → corrige la línea de subtítulo (región) de videos ya renderizados
# Compara el fotograma t=1.0 del video con el renderizado nuevo y pega el recuadro que cambia durante todo el video.
import sys, subprocess, os
import numpy as np
from PIL import Image
REPO = '/home/claude/biblioteca-de-ejercicios-/videos-3d'
OUT = '/home/claude/work/fixsub/out'
os.makedirs(OUT, exist_ok=True)
for c in sys.argv[1:]:
    src = f"{os.environ.get('SRC', REPO)}/{c}.mp4"
    old = f'/tmp/fixold_{c}.png'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ss', '1.0', '-frames:v', '1', old], check=True)
    A = np.asarray(Image.open(old).convert('L')).astype(int)
    newp = f'/tmp/fixnew/{c}.jpg'
    Bimg = Image.open(newp).convert('RGB')
    Bm = np.asarray(Bimg.convert('L')).astype(int)
    # línea de subtítulo: base en y=116 (título de 1 línea) o y=150 (2 líneas)
    best = None
    for base in (116, 150):
        by0, by1 = base - 14, base + 5
        D = np.abs(A[by0:by1, 40:600] - Bm[by0:by1, 40:600]) > 45
        cols = np.nonzero(D.any(axis=0))[0]
        if len(cols) and (best is None or D.sum() > best[0]): best = (D.sum(), base, cols)
    if best is None or best[0] < 20:
        print('SIN CAMBIO', c); continue
    _, base, cols = best
    end = cols[0]
    for x in cols:
        if x - end > 25: break
        end = x
    bx0, bx1 = 40 + cols[0] - 3, 40 + end + 4
    by0, by1 = base - 15, base + 6
    patch = Bimg.crop((bx0, by0, bx1, by1))
    pp = f'/tmp/fixpatch_{c}.png'; patch.save(pp)
    dst = f'{OUT}/{c}.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-i', pp, '-filter_complex', f'[0][1]overlay={bx0}:{by0}',
                    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dst], check=True)
    print('ok', c, (bx0, by0, bx1, by1))
