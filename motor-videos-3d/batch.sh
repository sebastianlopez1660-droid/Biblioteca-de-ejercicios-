#!/bin/bash
# Renderiza una lista de ejercicios en secuencia
cd /home/claude/engine
for c in "$@"; do
  echo "=== $c $(date +%H:%M:%S)"
  node render.js video $c out/$c.mp4 2 2>&1 | grep -E "frames|render|ok|Error|PAGEERROR" 
  rm -rf out/frames_$c
done
echo "=== FIN $(date +%H:%M:%S)"
