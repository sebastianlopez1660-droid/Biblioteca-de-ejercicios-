# Generador de lotes por reutilización: python3 gen.py spec_modulo NN CODIGO...
# spec: dict CODIGO -> (base | 'custom:NOMBRE', sub, prim, sec, intro, [[a,b],[a,b],[a,b]], orbit|None, extra|None)
import json, re, sys, glob, importlib.util, os
JS = '/home/claude/engine/js'
data = {e['codigo']: e for e in json.load(open('/home/claude/biblioteca/data.json'))}
spec_path, nn = sys.argv[1], int(sys.argv[2])
codes = sys.argv[3:]
spec = importlib.util.spec_from_file_location('spec', spec_path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
S = m.SPEC
def where(code):
    for f in sorted(glob.glob(f'{JS}/ex_lote*.js')) + [f'{JS}/exercises.js']:
        if f"'{code}':" in open(f, encoding='utf-8').read(): return os.path.basename(f)
    raise SystemExit('base no encontrada ' + code)
js = lambda v: json.dumps(v, ensure_ascii=False)
imports, customs, out = set(), set(), []
for c in codes:
    base, sub, prim, sec, intro, reps, orbit, extra = (list(S[c]) + [None, None])[:8]
    d = data[c]
    name, level = d['nombre'], d['nivel']
    if orbit is None: orbit = ['Control', f'{sub}: músculos que trabajan', 'Vuelve con control']
    caps = f"captions: {{ intro: {js(intro)}, reps: {js(reps)}, orbit: {js(orbit)} }}"
    ex = (', ' + extra) if extra else ''
    if base.startswith('custom:'):
        cn = base.split(':')[1]; customs.add(cn)
        out.append(f"  {js(c)}: {{ ...{cn}, sub: {js(sub)}, primary: {js(prim)}, secondary: {js(sec)}, name: {js(name)}, level: {js(level)}{ex},\n    {caps} }},")
    else:
        f = where(base)
        if f.startswith('ex_lote'): imports.add(f)
        out.append(f"  {js(c)}: {{ ...EXERCISES[{js(base)}], labelAll: true, sub: {js(sub)}, primary: {js(prim)}, secondary: {js(sec)}, name: {js(name)}, level: {js(level)}{ex},\n    {caps} }},")
head = f"// Lote {nn}: {codes[0]} … {codes[-1]} (generado por gen.py a partir de ejercicios ya definidos)\nimport {{ EXERCISES }} from './exercises.js';\n"
head += ''.join(f"import './{f}';\n" for f in sorted(imports, key=lambda s: int(re.findall(r'\d+', s)[0])))
if customs: head += f"import {{ {', '.join(sorted(customs))} }} from './pr_custom.js';\n"
open(f'{JS}/ex_lote{nn}.js', 'w', encoding='utf-8').write(head + '\nObject.assign(EXERCISES, {\n' + '\n'.join(out) + '\n});\n')
print('ok', nn, len(codes))
