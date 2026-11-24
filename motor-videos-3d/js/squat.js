// Familia SENTADILLA: resolución biomecánica de la postura (equilibrio, IK de piernas y brazos) y coreografía.
import * as THREE from 'three';
import { V3, deg, lerp, clamp, smooth, easeInOutSine, qX, qY, qZ, rot, basisQuat, handOpenQ, handGrip, Skel } from './kin.js';
import * as PR from './props.js';

const BODY_MASS = 75;

// ------------------------------------------------------------------ postura
// s: profundidad 0 (de pie) → 1 (abajo)
export function squatPose(sk, cfg, s, cache = {}) {
  // altura de la carga con las piernas extendidas (referencia para los tirones desde el suelo)
  if (cfg.barTarget != null && cfg._yb0 == null) cfg._yb0 = squatPose(sk, { ...cfg, barTarget: null }, 0, {}).load.holdY;
  const toe = deg(cfg.toeOut ?? 15);
  const w = cfg.stance ?? 0.17;              // semidistancia entre tobillos
  const midZ = cfg.midfootZ ?? 0;
  const tilt = deg(cfg.plateTilt ?? 0);
  const footQ = { L: qY(toe), R: qY(-toe) };
  if (tilt) { footQ.L = qX(-tilt).multiply(footQ.L); footQ.R = qX(-tilt).multiply(footQ.R); }
  const ankle = {};
  for (const [side, sx] of [['L', 1], ['R', -1]]) {
    const mf = rot(footQ[side], V3(0, 0, 0.065));
    ankle[side] = V3(sx * w, (cfg.ankleY ?? sk.ANKLE_H), (cfg.ankleZ ?? (midZ - mf.z)));
  }
  const kLean = cfg.leanCurve ? cfg.leanCurve(s) : Math.pow(s, 0.85);
  const lean = deg(lerp(cfg.leanTop ?? 3, cfg.leanBot ?? 35, kLean));
  const chestExt = deg(cfg.chestExt ?? 4) * (0.4 + 0.6 * s);
  const tw = cfg.twist ? deg(cfg.twist) * smooth((s - 0.55) / 0.45) : 0;   // giro de tronco (abajo)
  const r = {
    pelvis: cfg.recline ? qX(-deg(cfg.recline)) : qX(lean),
    lumbar: qX(cfg.lumbarFlex ? deg(cfg.lumbarFlex) * s : 0).multiply(qY(tw * 0.4)),
    chest: qX(-chestExt).multiply(qY(tw * 0.6)),
    neck: qX(-(cfg.recline ? -deg(cfg.recline) * 0.55 : lean * 0.42 * (cfg.neckK ?? 1)) - deg(cfg.neckExtra ?? 0)),
    head: qX(-(cfg.recline ? -deg(cfg.recline) * 0.25 : lean * 0.16 * (cfg.neckK ?? 1))),
  };
  const kneePole = (side) => {
    if (cfg.split && cfg.split.mode === 'bench' && side === cfg.split.rear) return V3(0, -0.25, 1).normalize();
    const sx = side === 'L' ? 1 : -1;
    const f = rot(footQ[side], V3(sx * (cfg.kneeOut ?? 0.06), 0, 1));
    return f.normalize();
  };

  const toeFlexMap = { L: 0, R: 0 };
  const build = (pelvisPos) => {
    const P = sk.trunk(pelvisPos, r);
    for (const side of ['L', 'R']) {
      if (cfg.single && side !== cfg.single) {
        // pierna libre: sigue la inclinación de la pelvis hacia atrás, rodilla algo flexionada
        const lq = P.pelvis.q.clone();
        const ext = deg(cfg.freeExt ?? 6), flex = deg(lerp(cfg.freeFlexTop ?? 28, cfg.freeFlexBot ?? 6, s));
        const dT = rot(lq.clone().multiply(qX(ext)), V3(0, -1, 0));
        const dS = rot(lq.clone().multiply(qX(ext + flex)), V3(0, -1, 0));
        const A = P['hip_' + side].clone().add(dT.multiplyScalar(sk.LT * 0.999)).add(dS.multiplyScalar(sk.LS * 0.999));
        sk.leg(P, side, A, lq.clone().multiply(qX(ext + flex)), rot(lq.clone().multiply(qX(ext)), V3(0, 0, 1)));
        continue;
      }
      sk.leg(P, side, ankle[side], footQ[side], kneePole(side), toeFlexMap[side]);
    }
    const load = arms(sk, cfg, P, s);
    return { P, load };
  };

  // altura de la cadera
  const legMax = (sk.LT + sk.LS) * 0.9985;
  let yBot = cfg.hipBottom ?? 0.43;
  let zp = cache.zp ?? -0.06;
  let res;
  if (cfg.machine === 'hack') {
    const up = V3(0, Math.cos(deg(cfg.recline)), -Math.sin(deg(cfg.recline)));
    const p = cfg.hipTop.clone().add(up.clone().multiplyScalar(-cfg.travel * s));
    res = build(p);
    res.pelvisPos = p;
  } else if (cfg.split) {
    // postura de paso largo: pie delantero plano, pie trasero en la punta (suelo) o con el empeine sobre un banco
    const sp = cfg.split, k = cfg._rep ?? 0, up = !!cfg._up;
    const sxOf = (sd) => (sd === 'L' ? 1 : -1);
    const pX = cfg.pelvisX ?? 0;
    const lm = (sk.LT + sk.LS) * 0.9985;
    const conf = (F, sv) => {
      const Rs = F === 'L' ? 'R' : 'L';
      const o = { ankle: {}, footQ: {}, toe: { L: 0, R: 0 } };
      o.footQ[F] = qY(sxOf(F) * deg(cfg.toeOut ?? 6));
      o.ankle[F] = V3(sxOf(F) * w, sk.ANKLE_H + (sp.step ?? 0), sp.zF);
      if (sp.mode === 'bench') {
        o.footQ[Rs] = qX(deg(sp.benchPitch ?? 155));
        o.ankle[Rs] = V3(sxOf(Rs) * w, (sp.benchH ?? 0.43) + 0.035, sp.zR);
        o.toe[Rs] = deg(-20);
      } else {
        const pa = deg(lerp(sp.pTop ?? 35, sp.pBot ?? 62, sv));
        o.footQ[Rs] = qX(pa).multiply(qY(sxOf(Rs) * deg(4)));
        const m = sk.mtp.clone(); if (Rs === 'R') m.x = -m.x;
        o.ankle[Rs] = V3(sxOf(Rs) * w, 0.018, sp.zR).sub(rot(o.footQ[Rs], m));
        o.toe[Rs] = pa;
      }
      o.pz = Array.isArray(sp.pz) ? lerp(sp.pz[0], sp.pz[1], sv) : sp.pz;
      const ym = (sd) => { const dx = o.ankle[sd].x - (pX + 0.09 * sxOf(sd)), dz = o.pz - o.ankle[sd].z; return o.ankle[sd].y + Math.sqrt(Math.max(lm * lm - dx * dx - dz * dz, 0.01)); };
      o.yTop = Math.min(ym('L'), ym('R')) - (sp.topMargin ?? 0.012);
      o.y = lerp(o.yTop, sp.yBot, cfg.depthCurve ? cfg.depthCurve(sv) : sv);
      return o;
    };
    // en el salto las piernas se alternan en cada repetición
    const F0 = sp.jump ? (k % 2 === 0 ? sp.front : sp.rear) : sp.front;
    let o;
    if (sp.jump && up && (1 - s) > 0.4) {
      const f = smooth(((1 - s) - 0.4) / 0.6);
      const A = conf(F0, 0), B = conf(F0 === 'L' ? 'R' : 'L', 0);
      o = { ankle: {}, footQ: {}, toe: {}, pz: A.pz, y: A.yTop + 0.15 * Math.sin(Math.PI * f) };
      for (const sd of ['L', 'R']) {
        o.ankle[sd] = A.ankle[sd].clone().lerp(B.ankle[sd], f); o.ankle[sd].y += 0.12 * Math.sin(Math.PI * f);
        o.footQ[sd] = A.footQ[sd].clone().slerp(B.footQ[sd], f);
        o.toe[sd] = lerp(A.toe[sd], B.toe[sd], f);
      }
    } else {
      o = conf(F0, sp.jump && up ? 1 - (1 - s) / 0.4 : s);
    }
    for (const sd of ['L', 'R']) { ankle[sd] = o.ankle[sd]; footQ[sd] = o.footQ[sd]; toeFlexMap[sd] = o.toe[sd]; }
    const p = V3(pX, o.y, o.pz);
    res = build(p); res.pelvisPos = p;
  } else if (cfg.lunge) {
    // zancadas: un pie da el paso (al frente, atrás, al lado o cruzado) y la cadera baja
    const L = cfg.lunge, k = cfg._rep ?? 0, up = !!cfg._up;
    const mv = L.alt ? (k % 2 === 0 ? 'L' : 'R') : (L.mover || 'L');
    const stn = mv === 'L' ? 'R' : 'L';
    const sxOf = (sd) => (sd === 'L' ? 1 : -1);
    const mtpOf = (sd) => { const m = sk.mtp.clone(); if (sd === 'R') m.x = -m.x; return m; };
    const lm = (sk.LT + sk.LS) * 0.9985;
    const reach = (sd, px, pz) => { const dx = ankle[sd].x - (px + 0.09 * sxOf(sd)), dz = pz - ankle[sd].z; return ankle[sd].y + Math.sqrt(Math.max(lm * lm - dx * dx - dz * dz, 0.01)); };
    const toeQ = (sd, t) => qY(sxOf(sd) * deg(t));
    const pitched = (sd, mx, mz, pDeg) => { const q = qX(deg(pDeg)).multiply(toeQ(sd, 4)); return { q, a: V3(mx, 0.018, mz).sub(rot(q, mtpOf(sd))) }; };
    const lift = (f) => 0.08 * Math.sin(Math.PI * f);
    const u = smooth(clamp(s / 0.42, 0, 1)), v = smooth(clamp((s - 0.36) / 0.64, 0, 1));
    let px = L.px ?? 0, pz, y;
    if (L.type === 'lat') {
      footQ[stn] = toeQ(stn, 10); ankle[stn] = V3(L.xS, sk.ANKLE_H, -0.065);
      footQ[mv] = toeQ(mv, 20);
      ankle[mv] = V3(L.xS + 0.18, sk.ANKLE_H, -0.065).lerp(V3(L.xM, sk.ANKLE_H, -0.065), u); ankle[mv].y += lift(u);
      px = lerp(L.xS + 0.09, L.pxBot, 0.15 * u + 0.85 * v); pz = lerp(0, L.pzBot, v);
      y = Math.min(reach(stn, px, pz) - 0.004, reach(mv, px, pz) + (1 - u) * 0.6 - 0.01);
    } else {
      const Z0 = (L.z0 ?? 0) + (L.walk ? k * (L.zF - L.zR + 0.15) : 0);
      const zF = Z0 + L.zF, zR = Z0 + L.zR, pzB = Z0 + L.pz;
      const front = L.type === 'fwd' ? mv : stn, rear = front === 'L' ? 'R' : 'L';
      const rx = L.rearX ?? sxOf(rear) * w;
      footQ[front] = toeQ(front, 6);
      if (L.walk && up) {
        // zancada caminando, subida: el pie de atrás avanza hasta el de delante
        const wv = 1 - s, vr = smooth(clamp(wv / 0.6, 0, 1)), ur = smooth(clamp((wv - 0.45) / 0.55, 0, 1));
        ankle[front] = V3(sxOf(front) * w, sk.ANKLE_H, zF);
        const pd = lerp(L.pBot, L.pTop, vr) * (1 - ur);
        const pr = pitched(rear, rx, zR, lerp(L.pBot, L.pTop, vr));
        ankle[rear] = pr.a.clone().lerp(V3(sxOf(rear) * w, sk.ANKLE_H, zF), ur); ankle[rear].y += lift(ur);
        footQ[rear] = qX(deg(pd)).multiply(toeQ(rear, 4)); toeFlexMap[rear] = deg(pd);
        pz = lerp(pzB, zF + 0.065, ur);
        const yT = Math.min(reach(front, px, pz), reach(rear, px, pz) + ur * 0.6) - 0.012;
        y = lerp(L.yBot, yT, vr);
      } else {
        if (L.type === 'fwd') {
          const pd = lerp(0, L.pTop, u) + (L.pBot - L.pTop) * v;
          const pr = pitched(rear, rx, zR, pd); ankle[rear] = pr.a; footQ[rear] = pr.q; toeFlexMap[rear] = deg(pd);
          ankle[front] = V3(sxOf(front) * w, sk.ANKLE_H, zR - 0.15).lerp(V3(sxOf(front) * w, sk.ANKLE_H, zF), u); ankle[front].y += lift(u);
          pz = lerp(zR - 0.15 + 0.065, pzB, u);
        } else {
          ankle[front] = V3(sxOf(front) * w, sk.ANKLE_H, zF);
          if (u < 1) {
            const pd = lerp(0, L.pTop, u);
            const land = pitched(rear, rx, zR, L.pTop);
            ankle[rear] = V3(sxOf(rear) * w, sk.ANKLE_H, zF).lerp(land.a, u); ankle[rear].y += lift(u);
            footQ[rear] = qX(deg(pd)).multiply(toeQ(rear, 4)); toeFlexMap[rear] = deg(pd) * u;
          } else {
            const pd = L.pTop + (L.pBot - L.pTop) * v;
            const pr = pitched(rear, rx, zR, pd); ankle[rear] = pr.a; footQ[rear] = pr.q; toeFlexMap[rear] = deg(pd);
          }
          pz = lerp(zF + 0.065, pzB, u);
        }
        const msd = L.type === 'fwd' ? front : rear, ssd = L.type === 'fwd' ? rear : front;
        const yT = Math.min(reach(ssd, px, pz), reach(msd, px, pz) + (1 - u) * 0.6) - 0.012;
        y = lerp(yT, L.yBot, v);
      }
    }
    const p = V3(px, y, pz);
    res = build(p); res.pelvisPos = p;
  } else if (cfg.fixedZ != null) {
    const dx = w - 0.09, dz = cfg.fixedZ - ankle.L.z;
    const yTop = ankle.L.y + Math.sqrt(Math.max(legMax * legMax - dx * dx - dz * dz, 0.1));
    const p = V3(0, lerp(yTop, yBot, s), cfg.fixedZ);
    res = build(p); res.pelvisPos = p;
  } else {
    const stS = cfg.single || 'L';
    const pX = cfg.pelvisX ?? 0;
    const solve = (z) => {
      const dx = Math.abs(ankle[stS].x - (pX + (stS === 'L' ? 0.09 : -0.09))), dz = z - ankle[stS].z;
      const yTop = ankle[stS].y + Math.sqrt(Math.max(legMax * legMax - dx * dx - dz * dz, 0.1));
      let y = lerp(yTop, yBot, cfg.depthCurve ? cfg.depthCurve(s) : s);
      let out = build(V3(pX, y, z));
      if (cfg.barTarget != null && s > 1e-4) {
        // la cadera se coloca a la altura que deja la carga en su trayectoria (brazos colgando)
        const tgt = lerp(cfg._yb0, cfg.barTarget, s);
        for (let it = 0; it < 2; it++) { y = Math.min(yTop, y + (tgt - out.load.holdY)); out = build(V3(pX, y, z)); }
      }
      const p = V3(pX, y, z);
      out.pelvisPos = p;
      out.bal = balance(sk, cfg, out) - (cfg.balanceZ ?? midZ);
      return out;
    };
    let z0 = zp, z1 = zp + 0.02;
    let r0 = solve(z0), r1 = solve(z1);
    for (let i = 0; i < 14; i++) {
      if (Math.abs(r1.bal) < 2e-5) break;
      const dd = (r1.bal - r0.bal);
      const zn = Math.abs(dd) < 1e-9 ? z1 - r1.bal : z1 - r1.bal * (z1 - z0) / dd;
      z0 = z1; r0 = r1; z1 = clamp(zn, -0.6, 0.4); r1 = solve(z1);
    }
    res = r1; cache.zp = z1;
  }
  res.lean = lean;
  return res;
}

function balance(sk, cfg, out) {
  const { P, load } = out;
  if (cfg.balance === 'bar' && load.bar) return load.bar.p.z;
  const c = sk.com(P).multiplyScalar(BODY_MASS);
  let m = BODY_MASS;
  if (load.mass && load.massPos) { c.add(load.massPos.clone().multiplyScalar(load.mass)); m += load.mass; }
  return c.divideScalar(m).z;
}

// ------------------------------------------------------------------ brazos e implementos
export function arms(sk, cfg, P, s) {
  const load = { mass: 0 };
  const cq = P.chest.q;
  const C = (x, y, z) => sk.chestPoint(P, V3(x, y, z));      // punto en coordenadas de reposo del pecho → mundo
  const Cd = (x, y, z) => rot(cq, V3(x, y, z)).normalize();     // dirección en el marco del pecho → mundo
  const S = { L: sk.shoulder(P, 'L', cfg.shoShift || V3()), R: sk.shoulder(P, 'R', cfg.shoShift || V3()) };
  const mode = cfg.arms;
  const sides = [['L', 1], ['R', -1]];

  if (mode === 'forward') {
    for (const [side, sx] of sides) {
      const dir = V3(-sx * 0.10, -0.02 - 0.10 * (1 - s), 1).normalize();
      // brazos al frente, paralelos al suelo (dirección en mundo)
      const target = S[side].clone().add(dir.multiplyScalar(sk.LUA + sk.LFA - 0.012));
      const hq = handOpenQ(side, V3(0, -1, 0.05), V3(-sx * 0.06, -0.08, 1));
      sk.armIK(P, side, S[side], target, V3(sx * 0.15, -1, 0), V3(-sx, 0.25, 0), hq);
    }
  } else if (mode === 'clasp') {
    for (const [side, sx] of sides) {
      const B = C(sx * 0.028, 1.315, 0.205);
      const g = handGrip(side, B, Cd(0, 1, 0.15), Cd(-sx, 0, 0.1));
      sk.armIK(P, side, S[side], g.wrist, Cd(sx * 0.75, -1, -0.25), Cd(0, 1, 0.3), g.q);
    }
  } else if (mode === 'goblet') {
    const kbPos = C(0, 1.338, 0.205);
    const kbQ = cq.clone().multiply(qX(-deg(4)));
    load.kb = { p: kbPos, q: kbQ };
    load.mass = 16; load.massPos = kbPos.clone().add(rot(kbQ, V3(0, -0.12, 0)));
    for (const [side, sx] of sides) {
      const gl = V3(sx * 0.066, -0.022, 0);
      const B = kbPos.clone().add(rot(kbQ, gl));
      const g = handGrip(side, B, rot(kbQ, V3(0, 1, 0)), rot(kbQ, V3(-sx, 0, -0.35)));
      sk.armIK(P, side, S[side], g.wrist, Cd(sx * 0.35, -1, -0.15), Cd(0, 1, 0.2), g.q);
    }
  } else if (mode === 'bar_high' || mode === 'bar_low' || mode === 'smith') {
    const low = mode === 'bar_low';
    const barC = low ? C(0, 1.402, -0.150) : C(0, 1.478, -0.118);
    load.bar = { p: barC, q: cq.clone() };
    load.mass = mode === 'smith' ? 30 : 60; load.massPos = barC;
    const gx = low ? 0.37 : 0.30;
    for (const [side, sx] of sides) {
      const B = barC.clone().add(rot(cq, V3(sx * gx, 0, 0)));
      const g = handGrip(side, B, rot(cq, V3(-sx, 0, 0)), Cd(0, low ? -0.25 : -0.05, 1));
      const pole = low ? Cd(sx * 0.30, -1, -0.75) : Cd(sx * 0.15, -1, -0.30);
      sk.armIK(P, side, S[side], g.wrist, pole, Cd(-sx * 0.2, 0.3, 1), g.q);
    }
  } else if (mode === 'front') {
    // rack frontal: barra sobre los deltoides anteriores, junto a la garganta; muñecas extendidas,
    // dedos bajo la barra y codos altos (brazo casi paralelo al suelo)
    const barC = C(0, 1.482, 0.072);
    load.bar = { p: barC, q: cq.clone() };
    load.mass = 60; load.massPos = barC;
    for (const [side, sx] of sides) {
      const B = barC.clone().add(rot(cq, V3(sx * 0.215, 0, 0)));
      const fingers = Cd(-sx * 0.05, -0.80, -0.60);
      const palm = Cd(0, 0.60, -0.80);
      const hq = handOpenQ(side, palm, fingers);
      const hl = V3(sx * -0.020, -0.088, 0);
      const wrist = B.clone().sub(rot(hq, hl));
      sk.armIK(P, side, S[side], wrist, Cd(sx * 0.30, -0.55, 1), Cd(-sx * 0.3, 0.3, 1), hq);
    }
  } else if (mode === 'zercher') {
    const els = [];
    for (const [side, sx] of sides) {
      const dirU = Cd(-sx * 0.10, -0.62, 0.78);
      const dirF = Cd(-sx * 0.42, 0.88, -0.10);
      const hq = (() => {
        // puños juntos, pulgares arriba
        const g = handGrip(side, V3(), Cd(0.0, 1, 0.15), Cd(-sx, 0, 0.1));
        return g.q;
      })();
      sk.armFK(P, side, S[side], dirU, Cd(0, 1, 0.3), dirF, Cd(0, 0.2, 1), hq);
      const bis = dirU.clone().negate().add(dirF).normalize();
      els.push(P['elbow_' + side].clone().add(bis.multiplyScalar(0.036)));
    }
    const barC = els[0].clone().add(els[1]).multiplyScalar(0.5);
    load.bar = { p: barC, q: cq.clone() };
    load.mass = 60; load.massPos = barC;
  } else if (mode === 'overhead') {
    const Bs = [];
    for (const [side, sx] of sides) {
      const d = V3(sx * 0.42, 1, -0.05).normalize();
      const B = S[side].clone().add(d.clone().multiplyScalar(sk.LUA + sk.LFA - 0.012 + 0.098));
      const g = handGrip(side, B, V3(-sx, 0, 0), V3(1, 0, 0).cross(d));
      sk.armIK(P, side, S[side], g.wrist, V3(sx, 0, -0.3), V3(-sx, 0, 0.3), g.q);
      Bs.push(B);
    }
    const c = Bs[0].clone().add(Bs[1]).multiplyScalar(0.5);
    load.stick = { p: c, q: new THREE.Quaternion() }; load.mass = 2; load.massPos = c;
  } else if (mode === 'sides') {
    for (const [side, sx] of sides) {
      const d = V3(sx * 0.10, -1, 0.03).normalize();
      const target = S[side].clone().add(d.clone().multiplyScalar(sk.LUA + sk.LFA - 0.01));
      sk.armIK(P, side, S[side], target, V3(0, 0, -1), V3(0, 0, 1), handOpenQ(side, V3(-sx, 0, 0), d));
    }
  } else if (mode === 'db') {
    load.dbs = [];
    const fz = lerp(0.30, 0.05, smooth(s * 1.6));
    for (const [side, sx] of sides) {
      const d = V3(-sx * 0.02, -1, fz).normalize();
      const B = S[side].clone().add(d.clone().multiplyScalar(sk.LUA + sk.LFA - 0.012 + 0.098));
      const g = handGrip(side, B, V3(-sx, 0, 0), V3(1, 0, 0).cross(d));
      sk.armIK(P, side, S[side], g.wrist, V3(sx * 0.2, 0, -1), V3(-sx, 0, 0.2), g.q);
      load.dbs.push(B);
    }
    load.mass = 20; load.massPos = load.dbs[0].clone().add(load.dbs[1]).multiplyScalar(0.5);
  } else if (mode === 'swing2' || mode === 'swing1') {
    const at = cfg._armTop ?? 0;
    const a = deg(lerp(lerp(14, 86, at), -36, s));
    const d = V3(0, -Math.cos(a), Math.sin(a));
    const one = mode === 'swing1';
    const mid = S.L.clone().add(S.R).multiplyScalar(0.5);
    const Hc = mid.clone().add(d.clone().multiplyScalar(one ? 0.603 : 0.615));
    const kbQ = basisQuat(d.clone().negate(), V3(1, 0, 0).cross(d.clone().negate()));
    load.kb = { p: Hc.clone().add(d.clone().multiplyScalar(0.066)), q: kbQ };
    load.mass = 16; load.massPos = Hc.clone().add(d.clone().multiplyScalar(0.19));
    for (const [side, sx] of sides) {
      if (one && side === 'L') {
        const dl = V3(0.45, -1, -0.25 + 0.5 * (1 - s) * at).normalize();
        const target = S.L.clone().add(dl.clone().multiplyScalar(sk.LUA + sk.LFA - 0.02));
        sk.armIK(P, 'L', S.L, target, V3(0.3, 0, -1), V3(0, 0, 1), handOpenQ('L', V3(-1, 0, 0), dl));
        continue;
      }
      const B = Hc.clone().add(V3(one ? 0 : sx * 0.034, 0, 0));
      const g = handGrip(side, B, V3(-sx, 0, 0), V3(1, 0, 0).cross(d));
      const pole = V3(sx * 0.4, 0, 0).add(V3(0, d.z, -d.y).multiplyScalar(-1));
      sk.armIK(P, side, S[side], g.wrist, pole, V3(-sx, 0, 0), g.q);
    }
  } else if (mode === 'stick') {
    load.stick = { p: C(0, 1.34, -0.150), q: cq.clone() };
    const gR = handGrip('R', C(0, 1.555, -0.150), Cd(0, -1, 0), Cd(0, 0, 1));
    sk.armIK(P, 'R', S.R, gR.wrist, Cd(-0.7, 1, -0.1), Cd(0, -1, 0), gR.q);
    const gL = handGrip('L', C(0, 1.045, -0.150), Cd(0, 1, 0), Cd(0, 0, -1));
    sk.armIK(P, 'L', S.L, gL.wrist, Cd(1, -0.1, -0.5), Cd(0, 1, 0), gL.q);
  } else if (mode === 'band_gm') {
    const pts = {};
    for (const [side, sx] of sides) {
      const B = C(sx * 0.135, 1.375, 0.105);
      const g = handGrip(side, B, Cd(0, 1, -0.3), Cd(-sx, 0, -0.2));
      sk.armIK(P, side, S[side], g.wrist, Cd(sx * 0.5, -1, 0.1), Cd(0, 1, 0), g.q);
      const fs = cfg.bandFoot || cfg.single || side;
      const foot = P['foot_' + fs].p.clone().add(rot(P['foot_' + fs].q, V3((cfg.bandFoot || cfg.single) ? sx * 0.025 : 0, -0.078, 0.07)));
      pts[side] = { foot, hand: B, top: C(sx * 0.085, 1.497, -0.045), back: C(sx * 0.04, 1.485, -0.105) };
    }
    load.band = [];
    for (const k of ['L', 'R']) load.band.push([pts[k].foot, pts[k].hand], [pts[k].hand, pts[k].top], [pts[k].top, pts[k].back]);
    load.band.push([pts.L.back, pts.R.back], [pts.L.foot, pts.R.foot]);
  } else if (mode === 'hang') {
    // carga colgando de los brazos extendidos: barra, barra hexagonal, mancuernas a los lados o kettlebell en una mano
    const hold = cfg.hold;
    const Rr = sk.LUA + sk.LFA - 0.012 + 0.098;
    const gx = cfg.gripX ?? 0.24;
    const zMid = (cfg.midfootZ ?? 0) + (cfg.holdDz ?? 0.02);
    const legFront = (y) => {
      let zf = -9;
      for (const s2 of ['L', 'R']) {
        if (cfg.single && s2 !== cfg.single) continue;
        if (cfg.split && s2 === cfg.split.rear) continue;
        const segs = [[P['thigh_' + s2].p, P['knee_' + s2], 0.080, 0.054], [P['knee_' + s2], P['ankle_' + s2], 0.052, 0.036]];
        for (const [a, b, ra, rb] of segs) {
          if ((y - a.y) * (y - b.y) > 0) continue;
          const t = (y - a.y) / ((b.y - a.y) || 1e-6);
          zf = Math.max(zf, lerp(a.z, b.z, t) + lerp(ra, rb, t));
        }
      }
      return zf;
    };
    const one = hold === 'kb1' || hold === 'db1';
    const ls = cfg.loadSide || 'L';
    const holders = one ? [[ls, ls === 'L' ? 1 : -1]] : sides;
    const pts = {};
    for (const [side, sx] of holders) {
      const Sh = S[side];
      const dx = sx * (gx - 0.185);
      let hz = zMid - Sh.z, y = 0;
      for (let it = 0; it < 3; it++) {
        const hc = clamp(hz, -0.85 * Rr, 0.85 * Rr);
        y = Sh.y - Math.sqrt(Math.max(Rr * Rr - dx * dx - hc * hc, 1e-4));
        if (hold === 'bar') hz = Math.max(zMid, legFront(y) + 0.018) - Sh.z;
      }
      const hc = clamp(hz, -0.85 * Rr, 0.85 * Rr);
      y = Sh.y - Math.sqrt(Math.max(Rr * Rr - dx * dx - hc * hc, 1e-4));
      pts[side] = V3(Sh.x + dx, y, Sh.z + hc);
    }
    for (const [side, sx] of holders) {
      const pron = hold === 'bar' || hold === 'kb1' || hold === 'kb2';
      const axis = pron ? V3(-sx, 0, 0) : V3(0, 0, 1);
      const g = handGrip(side, pts[side], axis, pron ? V3(0, 0.1, -1) : V3(-sx, 0, 0));
      sk.armIK(P, side, S[side], g.wrist, V3(sx * 0.25, 0.1, -1), axis, g.q);
    }
    if (hold === 'bar' || hold === 'trap') {
      const c = pts.L.clone().add(pts.R).multiplyScalar(0.5);
      if (hold === 'bar') load.bar = { p: c, q: new THREE.Quaternion() }; else load.trap = { p: c };
      load.mass = 60; load.massPos = c; load.holdY = c.y;
    } else if (hold === 'dbside') {
      load.dbs = [pts.L, pts.R]; load.dbq = qY(Math.PI / 2);
      load.mass = 30; load.massPos = pts.L.clone().add(pts.R).multiplyScalar(0.5); load.holdY = load.massPos.y;
    } else if (hold === 'kb2') {
      const c = pts.L.clone().add(pts.R).multiplyScalar(0.5);
      load.kb = { p: c.clone().sub(V3(0, 0.066, 0)), q: new THREE.Quaternion() };
      load.mass = 24; load.massPos = load.kb.p.clone().add(V3(0, -0.12, 0)); load.holdY = c.y;
    } else {
      const pt = pts[ls];
      if (hold === 'kb1') { load.kb = { p: pt.clone().sub(V3(0, 0.066, 0)), q: new THREE.Quaternion() }; load.mass = 16; load.massPos = load.kb.p.clone().add(V3(0, -0.12, 0)); }
      else { load.dbs = [pt]; load.dbq = qY(Math.PI / 2); load.mass = 20; load.massPos = pt; }
      load.holdY = pt.y;
      const os = ls === 'L' ? 'R' : 'L', sxo = os === 'L' ? 1 : -1;
      const d = V3(sxo * 0.30, -1, 0.04).normalize();
      const tgt = S[os].clone().add(d.clone().multiplyScalar(sk.LUA + sk.LFA - 0.01));
      sk.armIK(P, os, S[os], tgt, V3(0, 0, -1), V3(0, 0, 1), handOpenQ(os, V3(-sxo, 0, 0), d));
    }
  } else if (mode === 'hips') {
    // manos en la cresta ilíaca, codos hacia afuera
    const pq = P.pelvis.q;
    for (const [side, sx] of sides) {
      const B = P.pelvis.p.clone().add(rot(pq, V3(sx * 0.165, 0.08, 0.005)));
      const hq = handOpenQ(side, rot(pq, V3(-sx, 0, 0)), rot(pq, V3(-sx * 0.25, -0.45, 1)));
      const wrist = B.clone().sub(rot(hq, V3(sx * -0.017, -0.062, 0)));
      sk.armIK(P, side, S[side], wrist, rot(P.chest.q, V3(sx, -0.2, -0.7)), rot(pq, V3(0, 0.3, 1)), hq);
    }
  } else if (mode === 'hack') {
    const sled = cfg._sledAt ? cfg._sledAt(P) : null;
    load.sled = sled;
    for (const [side, sx] of sides) {
      const Hn = sled.handle[side];
      const g = handGrip(side, Hn, sled.up.clone(), V3(-sx, 0, 0.2));
      sk.armIK(P, side, S[side], g.wrist, V3(sx * 0.6, -1, -0.2), V3(0, 1, 0.3), g.q);
    }
  }
  if (cfg.hipBand) {
    const pq = P.pelvis.q, pp = P.pelvis.p;
    const L = (x, y, z) => pp.clone().add(rot(pq, V3(x, y, z)));
    const A = cfg.hipBand.anchor;
    load.band = [[A, L(0.178, 0.0, -0.02)], [A, L(-0.178, 0.0, -0.02)], [L(0.178, 0, -0.02), L(0.13, -0.005, 0.085)], [L(-0.178, 0, -0.02), L(-0.13, -0.005, 0.085)],
      [L(0.13, -0.005, 0.085), L(0, -0.01, 0.118)], [L(-0.13, -0.005, 0.085), L(0, -0.01, 0.118)]];
  }
  return load;
}

// ------------------------------------------------------------------ escena de implementos
export function setupProps(scene, cfg) {
  const props = { list: [] };
  const add = (o) => { scene.add(o); props.list.push(o); return o; };
  if (['goblet', 'swing2', 'swing1'].includes(cfg.arms)) props.kb = add(PR.kettlebell());
  if (cfg.arms === 'overhead') props.stick = add(PR.stick(1.5, false));
  if (cfg.arms === 'stick') props.stick = add(PR.stick(1.25, true));
  if (cfg.arms === 'db') props.dbs = [add(PR.dumbbell()), add(PR.dumbbell())];
  if (cfg.arms === 'band_gm' || cfg.hipBand) props.band = Array.from({ length: 8 }, () => add(PR.bandSegment()));
  if (cfg.hipBand) { const po = add(PR.post(cfg.hipBand.anchor.y + 0.08)); po.position.set(0, 0, cfg.hipBand.anchor.z - 0.03); }
  if (cfg.wall) { props.wall = add(PR.wall()); props.wall.position.set(0, 0, cfg.wall.z); }
  if (['bar_high', 'bar_low', 'front', 'zercher'].includes(cfg.arms)) props.bar = add(PR.barbell());
  if (cfg.box) {
    props.box = add(PR.plyoBox(0.60, cfg.box.h, 0.50));
    props.box.position.set(0, 0, cfg.box.z);
  }
  if (cfg.machine === 'smith') {
    const sm = add(PR.smithMachine());
    props.smith = sm; props.smithBar = add(sm.userData.bar);
  }
  if (cfg.arms === 'hang') {
    if (cfg.hold === 'bar') props.bar = add(PR.barbell());
    if (cfg.hold === 'trap') props.trap = add(PR.trapBar());
    if (cfg.hold === 'dbside') props.dbs = [add(PR.dumbbell(1.5)), add(PR.dumbbell(1.5))];
    if (cfg.hold === 'kb1' || cfg.hold === 'kb2') props.kb = add(PR.kettlebell());
    if (cfg.hold === 'db1') props.dbs = [add(PR.dumbbell(1.2))];
  }
  if (cfg.split && cfg.split.mode === 'bench') {
    const b = add(PR.flatBench()); b.position.set((cfg.split.rear === 'R' ? -1 : 1) * (cfg.stance ?? 0.1), 0, cfg.split.zR + 0.07);
  }
  if (cfg.split && cfg.split.step) {
    const st = add(PR.plyoBox(0.40, cfg.split.step, 0.36)); st.position.set((cfg.split.front === 'L' ? 1 : -1) * (cfg.stance ?? 0.1), 0, cfg.split.zF + 0.06);
  }
  if (cfg.stepBox) { const b = cfg.stepBox; props.stepBox = add(PR.plyoBox(b.w ?? 0.60, b.h, b.d ?? 0.50)); props.stepBox.position.set(b.x ?? 0, 0, b.z); }
  if (cfg.platform) { const pl = add(PR.plyoBox(0.9, cfg.platform, 0.7)); pl.position.set(0, 0, cfg.midfootZ ?? 0); }
  // materiales de los discos/extremos de la barra que se atenúan si tapan al deportista
  const fade = new Set();
  const collect = (obj) => obj && obj.traverse(o => { if (o.isMesh && Math.abs(o.position.x) > 0.6) fade.add(o.material); });
  collect(props.bar); collect(props.smithBar); collect(props.trap);
  if (fade.size) props.fadeMats = [...fade];
  if (cfg.machine === 'hack') {
    const hm = add(PR.hackMachine(cfg.hackGeo));
    props.hack = hm; props.sled = add(hm.userData.sled);
  }
  return props;
}

export function applyProps(props, load, cfg) {
  if (props.kb && load.kb) { props.kb.position.copy(load.kb.p); props.kb.quaternion.copy(load.kb.q); }
  if (props.bar && load.bar) {
    props.bar.position.copy(load.bar.p);
    // la barra se mantiene horizontal: solo hereda la guiñada
    props.bar.quaternion.identity();
  }
  if (props.stick && load.stick) { props.stick.position.copy(load.stick.p); props.stick.quaternion.copy(load.stick.q); }
  if (props.dbs && load.dbs) load.dbs.forEach((b, i) => { props.dbs[i].position.copy(b); if (load.dbq) props.dbs[i].quaternion.copy(load.dbq); });
  if (props.trap && load.trap) props.trap.position.copy(load.trap.p);
  if (props.band) {
    const up = V3(0, 1, 0);
    props.band.forEach((m, i) => {
      const sg = load.band && load.band[i];
      m.visible = !!sg; if (!sg) return;
      const [a, b] = sg; const dv = b.clone().sub(a); const len = dv.length();
      m.position.copy(a).add(b).multiplyScalar(0.5); m.scale.set(1, len, 1);
      m.quaternion.setFromUnitVectors(up, dv.normalize());
    });
  }
  if (props.smithBar && load.bar) { props.smithBar.position.set(0, load.bar.p.y, load.bar.p.z); }
  if (props.sled && load.sled) { props.sled.position.copy(load.sled.origin); props.sled.quaternion.copy(load.sled.q); }
}
