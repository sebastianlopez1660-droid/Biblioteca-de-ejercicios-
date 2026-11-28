// Constructor de recorridos para la familia 'run': lista de tramos → perfiles temporales
// tramo: { d: duración s, v: velocidad m/s, yaw: grados o [inicio, fin] (curva), back: true (de espaldas),
//          shuf: 1 | -1 (paso lateral izquierda/derecha), low: bajada de cadera extra }
const smooth = (k) => k * k * (3 - 2 * k);
const prof = (pr, t) => { if (t <= pr[0][0]) return pr[0][1]; for (let i = 1; i < pr.length; i++) if (t <= pr[i][0]) { const [t0, a] = pr[i - 1], [t1, b] = pr[i]; return a + (b - a) * smooth((t - t0) / Math.max(1e-6, t1 - t0)); } return pr[pr.length - 1][1]; };

export function course(segs, { start = 0.5, rest = 1.2, vTurn = 0.6 } = {}) {
  const speeds = [[0, 0], [start, 0]], yaws = [], backs = [[0, 1]], shuffles = [[0, 0]], dys = [[0, 0], [start, 0]], widths = [[0, 0.09], [start, 0.09]], banks = [[0, 0], [start, 0]];
  const Y = (s) => (Array.isArray(s.yaw) ? s.yaw : [s.yaw ?? 0, s.yaw ?? 0]);
  let t = start;
  yaws.push([0, Y(segs[0])[0]], [start, Y(segs[0])[0]]);
  const info = [];
  segs.forEach((s, i) => {
    const [y0, y1] = Y(s), nx = segs[i + 1];
    const sharp = nx && (Math.abs(Y(nx)[0] - y1) > 50 || !!nx.back !== !!s.back || (nx.shuf || 0) !== (s.shuf || 0));
    const ts = t, te = t + s.d, ramp = Math.min(s.shuf ? 0.25 : 0.6, s.d / 2);
    speeds.push([ts + ramp, s.v]);
    if (sharp) speeds.push([te - 0.35, s.v], [te, vTurn]); else speeds.push([te, s.v]);
    yaws.push([ts + (i ? 0.25 : 0), y0], [te, y1]);
    backs.push([ts, s.back ? -1 : 1]); shuffles.push([ts, s.shuf || 0]);
    const base = s.shuf ? -0.10 : (s.back ? -0.05 : 0);
    dys.push([ts + 0.25, base - (s.low ?? 0)], [te - 0.3, base - (s.low ?? 0)]);
    if (sharp) dys.push([te, -0.13]);
    const w = s.shuf ? 0.19 : 0.09;
    widths.push([ts + 0.25, w], [te - 0.3, w]); if (sharp) widths.push([te, 0.17]);
    const rate = (y1 - y0) / s.d;
    const b = Math.abs(rate) > 1 ? -Math.sign(rate) * Math.min(18, Math.abs(rate) * Math.PI / 180 * s.v * 2.2) : 0;
    banks.push([ts + 0.35, b], [te - 0.2, b], [te, 0]);
    info.push({ ts, te, back: !!s.back, shuf: s.shuf || 0 });
    t = te;
  });
  const last = segs[segs.length - 1], yl = Y(last)[1];
  speeds.push([t + 0.8, 0]); dys.push([t + 0.6, -0.08], [t + 1.0, 0]); widths.push([t + 0.8, 0.12], [t + 1.1, 0.09]);
  const loop = t + 0.8 + rest;
  speeds.push([loop, 0]); dys.push([loop, 0]); widths.push([loop, 0.09]); banks.push([loop, 0]);
  const yEnd = Math.round(yl / 360) * 360;
  yaws.push([loop - 0.9, yl], [loop - 0.15, yEnd], [loop, yEnd]);
  backs.push([t + 0.9, 1]); shuffles.push([t, 0]);
  // inclinación del tronco según velocidad y aceleración; de espaldas, hacia delante; lateral, fija
  const leans = [];
  for (let k = 0; k <= loop + 1e-6; k += 0.1) {
    const tt = +k.toFixed(2), v = prof(speeds, tt), a = (prof(speeds, Math.min(loop, tt + 0.05)) - prof(speeds, Math.max(0, tt - 0.05))) / 0.1;
    const seg = info.find((g) => tt >= g.ts && tt < g.te);
    let l = Math.max(-12, Math.min(34, 3 + 0.9 * v + 5 * a));
    if (seg && seg.shuf) l = 10; else if (seg && seg.back) l = -(8 + Math.max(-4, Math.min(6, -2 * a)));
    leans.push([tt, +l.toFixed(1)]);
  }
  const sm = leans.map(([tt], i) => { let s = 0, n = 0; for (let j = Math.max(0, i - 2); j <= Math.min(leans.length - 1, i + 2); j++) { s += leans[j][1]; n++; } return [tt, +(s / n).toFixed(1)]; });
  sm[sm.length - 1][1] = sm[0][1];
  return { type: 'run', loop, speeds, yaws, backs, shuffles, dys, widths, banks, leans: sm };
}
