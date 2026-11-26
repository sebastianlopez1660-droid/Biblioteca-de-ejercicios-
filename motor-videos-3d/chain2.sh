#!/bin/bash
# Encadena lotes: espera a que termine el batch_snap en curso y lanza los siguientes (uno por línea en queue.txt)
while true; do
  while pgrep -f "batch_snap.sh" > /dev/null; do sleep 15; done
  L=$(head -1 queue.txt 2>/dev/null); [ -z "$L" ] && exit 0
  sed -i 1d queue.txt
  set -- $L; N=$1; shift
  ./batch_snap.sh $N "$@" > out/batch_$N.log 2>&1
done
