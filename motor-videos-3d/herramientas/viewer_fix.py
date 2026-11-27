# Cambia la URL del video (ext) en las fichas cifradas del visor para los códigos de oldsha.json
import json, hashlib, base64, os, glob
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
S = '/home/claude/share'
NEW = 'b45b9eff98a73370b637f21283ad9eb49ef30811'
recs = json.load(open(f'{S}/recs_all.json'))
for f in glob.glob(f'{S}/b/*.json'): recs.update(json.load(open(f)))
ll = json.load(open(f'{S}/llaves.json'))
old = json.load(open('/home/claude/work/fixsub/oldsha.json'))
touched, n = set(), 0
for code, sha in old.items():
    k = ll[code]
    i = hashlib.sha256(('id:' + k).encode()).hexdigest()[:20]
    key = hashlib.sha256(('key:' + k).encode()).digest()[:16]
    raw = base64.b64decode(recs[i])
    d = json.loads(AESGCM(key).decrypt(raw[:12], raw[12:], None))
    v = d.get('video')
    if not v or sha not in v['ext']: print('sin video/sha', code); continue
    v['ext'] = v['ext'].replace(sha, NEW); n += 1
    iv = os.urandom(12)
    recs[i] = base64.b64encode(iv + AESGCM(key).encrypt(iv, json.dumps(d, ensure_ascii=False, separators=(',', ':')).encode(), None)).decode()
    touched.add(int(i[:2], 16) % 64)
files = []
for b in sorted(touched):
    json.dump({i: v for i, v in recs.items() if int(i[:2], 16) % 64 == b}, open(f'{S}/b/{b}.json', 'w'), separators=(',', ':'))
    files.append({'as': f'b/{b}.json', 'path': f'{S}/b/{b}.json'})
json.dump(recs, open(f'{S}/recs_all.json', 'w'), separators=(',', ':'))
json.dump(files, open('/home/claude/work/fixsub/viewer_files.json', 'w'))
print('cambiadas', n, 'cubetas', len(files))
