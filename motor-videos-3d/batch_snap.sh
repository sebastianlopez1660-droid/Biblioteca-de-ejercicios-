#!/bin/bash
# Uso: batch_snap.sh NOMBRE CODIGO...   (renderiza desde una copia congelada del motor)
N=$1; shift
SNAP=/home/claude/snap_$N
rm -rf $SNAP; mkdir -p $SNAP
cp -r /home/claude/engine/index.html /home/claude/engine/render.js /home/claude/engine/body.json /home/claude/engine/js $SNAP/
ln -s /home/claude/engine/node_modules $SNAP/node_modules
for c in "$@"; do
  echo "=== $c $(date +%H:%M:%S)"
  node $SNAP/render.js video $c /home/claude/engine/out/$c.mp4 2 2>&1 | grep -E "frames|render|ok|Error|PAGEERROR"
  rm -rf /home/claude/engine/out/frames_$c
done
echo "=== FIN $(date +%H:%M:%S)"
