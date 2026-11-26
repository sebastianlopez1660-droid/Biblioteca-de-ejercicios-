# Uso: python3 pub.py CODIGO...  → sube los mp4 a GitHub (rama videos-3d), crea miniaturas y prepara
# /home/claude/work/pub_edits.json (edición del mapa) y /home/claude/work/pub_files.json (miniaturas a publicar)
import json, subprocess, sys, shutil, os
codes = sys.argv[1:]
REPO = '/home/claude/biblioteca-de-ejercicios-'
run = lambda *a, **k: subprocess.run(list(a), check=True, capture_output=True, text=True, **k).stdout.strip()
for c in codes:
    assert os.path.exists(f'/home/claude/engine/out/{c}.mp4'), c
    shutil.copy(f'/home/claude/engine/out/{c}.mp4', f'{REPO}/videos-3d/{c}.mp4')
run('git', '-C', REPO, 'add', 'videos-3d')
msg = f'Videos 3D de técnica: {codes[0]} … {codes[-1]} ({len(codes)} ejercicios)\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01WQrQBCLKBTDuaeJ8sNsdzG'
run('git', '-C', REPO, '-c', 'user.name=Claude', '-c', 'user.email=noreply@anthropic.com', 'commit', '-q', '-m', msg)
p = subprocess.run(['git', '-C', REPO, '-c', 'push.negotiate=true', 'push', 'origin', 'videos-3d'], capture_output=True, text=True)
print(p.stderr[-300:])
sha = run('git', '-C', REPO, 'rev-parse', 'HEAD')
meta = json.loads(run('node', 'dumpmeta.mjs', *codes, cwd='/home/claude/engine'))
B = f'https://cdn.jsdelivr.net/gh/sebastianlopez1660-droid/biblioteca-de-ejercicios-@{sha}/videos-3d/'
tail = open('/home/claude/work/map_tail.txt', encoding='utf-8').read()
parts = []
entries = {}
for c in codes:
    src = f'/home/claude/engine/out/{c}.mp4'
    d = float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src))
    run('ffmpeg', '-loglevel', 'error', '-y', '-ss', str(min(9, d / 3)), '-i', src, '-frames:v', '1', '-vf', 'scale=640:-2', '-q:v', '4', f'/home/claude/work/thumbs/{c}.jpg')
    run('ffmpeg', '-loglevel', 'error', '-y', '-i', f'/home/claude/work/thumbs/{c}.jpg', '-vf', 'scale=400:-2', '-q:v', '6', f'/home/claude/work/thumbs/{c}_s.jpg')
    e = {'ext': B + c + '.mp4', 'thumb': f'videos/sprites/{codes[0]}.jpg#{codes.index(c)}/{len(codes)}', 'prim': meta[c]['prim'], 'sec': meta[c]['sec'], 'dur': round(d, 1)}
    parts.append(json.dumps(c, ensure_ascii=False) + ':' + json.dumps(e, ensure_ascii=False, separators=(',', ':')))
    entries[c] = e
assert tail.endswith('}}')
new = tail[:-1] + ',' + ','.join(parts) + '}'
last = parts[-1]
newtail = last[last.index('"thumb"'):] + '}'
json.dump([{'old_text': tail, 'new_text': new}], open('/home/claude/work/pub_edits.json', 'w'), ensure_ascii=False)
ins = []
for c in codes: ins += ['-i', f'/home/claude/work/thumbs/{c}.jpg']
n = len(codes)
fc = ''.join(f'[{i}]scale=480:270[v{i}];' for i in range(n)) + ''.join(f'[v{i}]' for i in range(n)) + f'hstack=inputs={n}' if n > 1 else '[0]scale=480:270'
os.makedirs('/home/claude/work/sprites', exist_ok=True)
run('ffmpeg', '-loglevel', 'error', '-y', *ins, '-filter_complex', fc, '-q:v', '5', f'/home/claude/work/sprites/{codes[0]}.jpg')
json.dump([{'as': f'videos/sprites/{codes[0]}.jpg', 'path': f'/home/claude/work/sprites/{codes[0]}.jpg'}], open('/home/claude/work/pub_files.json', 'w'))
open('/home/claude/work/map_tail_next.txt', 'w', encoding='utf-8').write(newtail)
json.dump(entries, open('/home/claude/work/pub_entries.json', 'w'), ensure_ascii=False)
print('sha', sha); print('listo', len(codes))
