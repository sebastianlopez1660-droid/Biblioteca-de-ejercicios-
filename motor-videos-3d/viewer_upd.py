# Uso: python3 viewer_upd.py  → añade el video a las fichas cifradas del visor para los códigos de pub_entries.json
# Escribe /home/claude/share/b/<N>.json, /home/claude/share/t/<rand>.jpg y /home/claude/work/viewer_files.json
import json, hashlib, base64, os, glob, secrets, string, shutil
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
S = '/home/claude/share'
recs = json.load(open(f'{S}/recs_all.json'))
for f in glob.glob(f'{S}/b/*.json'):          # las cubetas locales son las publicadas más recientes
    recs.update(json.load(open(f)))
ll = json.load(open(f'{S}/llaves.json'))
ent = json.load(open('/home/claude/work/pub_entries.json'))
abc = string.ascii_lowercase + string.digits
touched, files = set(), []
for code, e in ent.items():
    k = ll[code]
    i = hashlib.sha256(('id:' + k).encode()).hexdigest()[:20]
    key = hashlib.sha256(('key:' + k).encode()).digest()[:16]
    raw = base64.b64decode(recs[i])
    d = json.loads(AESGCM(key).decrypt(raw[:12], raw[12:], None))
    # miniatura incrustada (data URL): no añade archivos al visor
    thumb = 'data:image/jpeg;base64,' + base64.b64encode(open(f'/home/claude/work/thumbs/{code}_s.jpg', 'rb').read()).decode()
    d['video'] = {'ext': e['ext'], 'thumb': thumb, 'prim': e['prim'], 'sec': e['sec']}
    iv = os.urandom(12)
    ct = AESGCM(key).encrypt(iv, json.dumps(d, ensure_ascii=False, separators=(',', ':')).encode(), None)
    recs[i] = base64.b64encode(iv + ct).decode()
    touched.add(int(i[:2], 16) % 64)
for n in sorted(touched):
    b = {i: v for i, v in recs.items() if int(i[:2], 16) % 64 == n}
    json.dump(b, open(f'{S}/b/{n}.json', 'w'), separators=(',', ':'))
    files.append({'as': f'b/{n}.json', 'path': f'{S}/b/{n}.json'})
json.dump(recs, open(f'{S}/recs_all.json', 'w'), separators=(',', ':'))
json.dump(files, open('/home/claude/work/viewer_files.json', 'w'))
print('fichas', len(ent), 'cubetas', sorted(touched), 'archivos', len(files))
