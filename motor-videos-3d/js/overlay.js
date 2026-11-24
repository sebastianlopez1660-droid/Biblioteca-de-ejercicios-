// Capa 2D: fondo, cabecera, leyenda de músculos, subtítulos de técnica, tempo y etiquetas anatómicas.
import { W, H } from './core.js';
import { clamp, smooth } from './kin.js';

const C = {
  text: '#f5f5f5', dim: '#b5afaf', faint: '#7b7676',
  accent: '#8b0d14', accentText: '#e8786e',
  prim: '#d4251f', sec: '#ec8a78',
};

export function makeBackground() {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(W * 0.5, H * 0.46, 40, W * 0.5, H * 0.52, W * 0.72);
  gr.addColorStop(0, '#454c4d');
  gr.addColorStop(0.45, '#2c3233');
  gr.addColorStop(1, '#111415');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  // ruido muy suave para evitar bandas en el degradado
  const img = g.getImageData(0, 0, W, H); const d = img.data;
  let seed = 1337;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < d.length; i += 4) { const n = (rnd() - 0.5) * 3.2; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(img, 0, 0);
  return c;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

function spaced(g, text, x, y, sp, align = 'left') {
  // texto con espaciado entre letras
  let wsum = 0; for (const ch of text) wsum += g.measureText(ch).width + sp; wsum -= sp;
  let cx = align === 'right' ? x - wsum : x;
  for (const ch of text) { g.fillText(ch, cx, y); cx += g.measureText(ch).width + sp; }
  return wsum;
}

function wrap(g, text, maxW) {
  const words = text.split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur); return lines;
}

export function drawOverlay(g, st) {
  // degradados suaves arriba y abajo para legibilidad
  let gr = g.createLinearGradient(0, H - 210, 0, H);
  gr.addColorStop(0, 'rgba(8,9,10,0)'); gr.addColorStop(1, 'rgba(8,9,10,0.62)');
  g.fillStyle = gr; g.fillRect(0, H - 210, W, 210);
  gr = g.createLinearGradient(0, 0, 0, 150);
  gr.addColorStop(0, 'rgba(8,9,10,0.45)'); gr.addColorStop(1, 'rgba(8,9,10,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, 150);

  g.textBaseline = 'alphabetic';
  // ---------- cabecera
  const hx = 44, hy = 46;
  g.font = '500 14px "IBM Plex Mono"';
  const cw = spaced(g, st.code, -9999, -9999, 0.6) + 18;
  g.strokeStyle = 'rgba(139,13,20,0.9)'; g.lineWidth = 1.2; g.fillStyle = 'rgba(139,13,20,0.18)';
  roundRect(g, hx, hy - 17, cw, 25, 5); g.fill(); g.stroke();
  g.fillStyle = C.accentText; spaced(g, st.code, hx + 9, hy + 1, 0.6);
  g.font = '600 31px "Space Grotesk"'; g.fillStyle = C.text;
  g.shadowColor = 'rgba(0,0,0,0.45)'; g.shadowBlur = 8;
  const nameLines = wrap(g, st.name, 600);
  nameLines.forEach((ln, i) => g.fillText(ln, hx, hy + 44 + i * 34));
  g.shadowBlur = 0;
  g.font = '400 15px "Inter"'; g.fillStyle = C.dim;
  g.fillText(st.subtitle, hx, hy + 44 + (nameLines.length - 1) * 34 + 26);

  // ---------- leyenda de músculos
  const rx = W - 44; let ry = 46;
  g.font = '500 12px "IBM Plex Mono"'; g.fillStyle = C.faint; g.textAlign = 'left';
  const lw = 300;
  spaced(g, 'MÚSCULOS', rx - lw, ry, 1.6);
  ry += 26;
  const row = (color, label, names) => {
    g.fillStyle = color; g.beginPath(); g.arc(rx - lw + 6, ry - 5, 6, 0, Math.PI * 2); g.fill();
    g.font = '600 15px "Inter"'; g.fillStyle = C.text; g.fillText(label, rx - lw + 20, ry);
    g.font = '400 15px "Inter"'; g.fillStyle = C.dim;
    const lines = wrap(g, names, lw - 20);
    lines.forEach((ln, i) => g.fillText(ln, rx - lw + 20, ry + 21 + i * 20));
    ry += 21 + lines.length * 20 + 12;
  };
  row(C.prim, 'Principal', st.primaryNames);
  if (st.secondaryNames) row(C.sec, 'Secundarios', st.secondaryNames);

  // ---------- subtítulo de técnica (abajo a la izquierda)
  if (st.caption && st.caption.alpha > 0.01) {
    const a = st.caption.alpha;
    g.globalAlpha = a;
    const bx = 44, by = H - 58;
    g.font = '600 26px "Inter"';
    const lines = wrap(g, st.caption.text, 500);
    const top = by - (lines.length - 1) * 34;
    g.font = '500 13px "IBM Plex Mono"'; g.fillStyle = C.dim;
    if (st.viewLabel) spaced(g, st.viewLabel, bx + 18, top - 40, 1.8);
    g.fillStyle = C.accent; g.fillRect(bx, top - 26, 4, (lines.length - 1) * 34 + 36);
    g.font = '600 26px "Inter"'; g.fillStyle = C.text;
    g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 10;
    lines.forEach((ln, i) => g.fillText(ln, bx + 18, top + i * 34));
    g.shadowBlur = 0; g.globalAlpha = 1;
  }

  // ---------- tempo (abajo a la derecha)
  if (st.tempo) {
    const tx = W - 44, ty = H - 92;
    g.textAlign = 'right';
    g.font = '500 13px "IBM Plex Mono"'; g.fillStyle = C.faint;
    spaced(g, st.tempo.top, tx, ty, 1.6, 'right');
    g.font = '600 22px "Space Grotesk"'; g.fillStyle = C.text;
    g.fillText(st.tempo.phase, tx, ty + 30);
    const bw = 210, bh = 5, bx = tx - bw, by = ty + 46;
    g.fillStyle = 'rgba(255,255,255,0.14)'; roundRect(g, bx, by, bw, bh, 2.5); g.fill();
    if (st.tempo.progress != null) {
      g.fillStyle = st.tempo.color || C.prim;
      roundRect(g, bx, by, Math.max(bh, bw * clamp(st.tempo.progress, 0, 1)), bh, 2.5); g.fill();
    }
    g.textAlign = 'left';
  }

  // ---------- etiquetas anatómicas
  if (st.labels) {
    for (const L of st.labels) {
      if (L.alpha < 0.02) continue;
      g.globalAlpha = L.alpha;
      const dirx = L.side;
      const ex = L.x + dirx * L.reach, ey = L.y + L.dy;
      g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(L.x, L.y); g.lineTo(L.x + dirx * L.reach * 0.55, ey); g.lineTo(ex, ey); g.stroke();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(L.x, L.y, 3.6, 0, Math.PI * 2); g.fill();
      g.fillStyle = L.color; g.beginPath(); g.arc(L.x, L.y, 2.2, 0, Math.PI * 2); g.fill();
      g.font = '600 17px "Inter"';
      const tw = g.measureText(L.text).width;
      const px = dirx > 0 ? ex + 8 : ex - 8 - tw - 22;
      g.fillStyle = 'rgba(14,15,16,0.78)'; roundRect(g, px - 2, ey - 16, tw + 26, 30, 7); g.fill();
      g.fillStyle = L.color; g.beginPath(); g.arc(px + 10, ey - 1, 4.5, 0, Math.PI * 2); g.fill();
      g.fillStyle = C.text; g.fillText(L.text, px + 20, ey + 5);
      g.globalAlpha = 1;
    }
  }
}
