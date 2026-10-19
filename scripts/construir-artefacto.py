#!/usr/bin/env python3
"""Genera la versión de la biblioteca para publicarla como artefacto de Claude.

El artefacto envuelve la página con su propio <html>, <head> y <body>, así que aquí se
quitan los de index.html y se conserva todo lo demás tal cual: estilos, datos y código.
El mismo index.html detecta solo si está dentro de Claude (window.claude) y en ese caso
guarda en la cuenta de Claude en vez de en la nube de Vercel.

Uso: python3 scripts/construir-artefacto.py [salida.html]
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
salida = Path(sys.argv[1]) if len(sys.argv) > 1 else RAIZ / 'artefacto.html'

html = (RAIZ / 'index.html').read_text(encoding='utf-8')

def quitar(patron, texto, veces=1):
    nuevo, n = re.subn(patron, '', texto, flags=re.IGNORECASE)
    if n != veces:
        sys.exit(f'No se encontró exactamente {veces} vez "{patron}" (hay {n}).')
    return nuevo

for patron in [r'<!DOCTYPE html>\s*', r'<html[^>]*>\s*', r'<head>\s*', r'<meta charset="[^"]*">\s*',
               r'<meta name="viewport"[^>]*>\s*', r'</head>\s*', r'<body>\s*', r'</body>\s*', r'</html>\s*']:
    html = quitar(patron, html)

html = quitar(r'<title>[^<]*</title>\s*', html)
# El marco del artefacto pone la letra base en 14px; la app está diseñada sobre los 16px del navegador.
ajustes = '<style>:root{color-scheme:dark}body{font-size:16px}</style>\n'
html = '<title>Biblioteca de Ejercicios</title>\n' + ajustes + html

salida.write_text(html, encoding='utf-8')
print(f'{salida} ({len(html.encode("utf-8")) / 1e6:.2f} MB)')
