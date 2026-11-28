// Familias con postura libre (lote 6 en adelante): subidas al cajón, puentes / hip thrust, cuadrupedia,
// curl femoral, extensión de rodilla. Cada familia coloca la pelvis (posición + orientación), el tronco y los
// objetivos de pies y manos; las piernas y los brazos se resuelven con IK de dos huesos.
// Convención: s = 0 posición inicial, s = 1 posición de máxima contracción (la que se muestra en la órbita).
import * as THREE from 'three';
import { V3, deg, lerp, clamp, smooth, qX, qY, qZ, rot, handOpenQ, handGrip, basisQuat } from './kin.js';
import { arms as squatArms, squatPose } from './squat.js';

const ID = () => new THREE.Quaternion();
const sxOf = (sd) => (sd === 'L' ? 1 : -1);
const other = (sd) => (sd === 'L' ? 'R' : 'L');
const LM = (sk) => (sk.LT + sk.LS) * 0.9985;
const mtpOf = (sk, sd) => { const m = sk.mtp.clone(); if (sd === 'R') m.x = -m.x; return m; };

// altura máxima de la pelvis para que la pierna 'sd' alcance 'ankle' (pelvis en x, z con orientación q)
function maxPelvisY(sk, q, px, pz, sd, ankle, k = 1) {
  const o = rot(q, sk.o['hip_' + sd]);
  const dx = ankle.x - (px + o.x), dz = ankle.z - (pz + o.z);
  const L = LM(sk) * k;
  return ankle.y + Math.sqrt(Math.max(L * L - dx * dx - dz * dz, 1e-4)) - o.y;
}
// pie apoyado en la punta (metatarsos fijos en el suelo) con inclinación 'pitch' (grados)
function toeStance(sk, sd, mtpWorld, pitch, toeOut = 6) {
  const q = qX(deg(pitch)).multiply(qY(sxOf(sd) * deg(toeOut)));
  return { q, a: mtpWorld.clone().sub(rot(q, mtpOf(sk, sd))), toe: deg(pitch) };
}
function uprightR(lean, o = {}) {
  return {
    pelvis: qY(deg(o.yaw ?? 0)).multiply(qX(lean)),
    lumbar: qY(deg(o.twist ?? 0) * 0.4), chest: qX(-deg(o.chestExt ?? 3)).multiply(qY(deg(o.twist ?? 0) * 0.6)),
    neck: qX(-lean * (o.neckK ?? 0.45)), head: qX(-lean * 0.15),
  };
}

// ------------------------------------------------------------------ subida al cajón (step up)
// s = 0: pie guía sobre el cajón y pie de apoyo en el suelo; s = 1: de pie sobre el cajón (o rodilla arriba)
function stepUp(sk, cfg, s) {
  const S = cfg.free, AH = sk.ANKLE_H, h = S.h;
  const lead = S.lead, trail = other(lead);
  const up = !!cfg._up;
  const u = smooth(clamp(s / (S.pEnd ?? 0.78), 0, 1));
  const lean = deg(lerp(S.leanB ?? 16, S.leanT ?? 2, smooth(clamp(s / 0.85, 0, 1))));
  const r = uprightR(lean, { yaw: S.yaw ? S.yaw * (1 - u) : 0 });
  const q = r.pelvis;
  const ankle = {}, fq = {}, toe = { L: 0, R: 0 };
  ankle[lead] = V3(S.leadA[0], h + AH, S.leadA[1]); fq[lead] = qY(sxOf(lead) * deg(S.toeOut ?? 6));
  const px = lerp(S.pB[0], S.pT[0], u), pz = lerp(S.pB[1], S.pT[1], u);
  // pie de apoyo: plano → punta → vuelo
  const flatQ = qY(sxOf(trail) * deg(6));
  const floorA = V3(S.trailB[0], AH, S.trailB[1]);
  const mtpW = floorA.clone().add(rot(flatQ, mtpOf(sk, trail))); mtpW.y = 0.018;
  const liftS = S.lift ?? 0.5, maxPitch = S.maxPitch ?? 38;
  let trailOnFloor = true;
  const pitch0 = lerp(0, maxPitch, smooth(clamp(s / liftS, 0, 1)));
  const ts = toeStance(sk, trail, mtpW, pitch0);
  if (s < liftS) {
    if (pitch0 < 0.5) { ankle[trail] = floorA; fq[trail] = flatQ; }
    else { ankle[trail] = ts.a; fq[trail] = ts.q; toe[trail] = ts.toe; }
  } else trailOnFloor = false;

  const yTop = maxPelvisY(sk, q, S.pT[0], S.pT[1], lead, ankle[lead]) - 0.012;
  const yBot = Math.min(maxPelvisY(sk, q, S.pB[0], S.pB[1], trail, floorA) - (S.trailBend ?? 0.03), yTop);
  let y = lerp(yBot, yTop, u);
  y = Math.min(y, maxPelvisY(sk, q, px, pz, lead, ankle[lead]) - 0.004);
  if (trailOnFloor) y = Math.min(y, maxPelvisY(sk, q, px, pz, trail, ankle[trail]) - 0.004);
  let bump = 0;
  if (S.hop && !up) { const f = clamp((s - 0.55) / 0.45, 0, 1); bump = 0.13 * Math.sin(Math.PI * f); }
  y += bump; ankle[lead].y += Math.max(0, bump - 0.02);
  const pelvisPos = V3(px, y, pz);
  const P = sk.trunk(pelvisPos, r);
  if (!trailOnFloor) {
    const f = smooth((s - liftS) / (1 - liftS));
    const ts1 = toeStance(sk, trail, mtpW, maxPitch);
    let At, Aq, pole = rot(fq[lead], V3(0, 0, 1));
    if (S.knee) {
      // rodilla al pecho: muslo horizontal al frente, pierna colgando
      const H = P['hip_' + trail];
      const K = H.clone().add(V3(sxOf(trail) * 0.01, 0.02, sk.LT * 0.97));
      At = K.clone().add(V3(0, -sk.LS * 0.97, -0.05)); Aq = qX(deg(28)).multiply(flatQ);
      pole = V3(0, 0.3, 1);
    } else {
      At = V3(S.trailT[0], h + AH, S.trailT[1]); Aq = flatQ;
    }
    ankle[trail] = ts1.a.clone().lerp(At, f); ankle[trail].y += (S.knee ? 0.04 : 0.16) * Math.sin(Math.PI * f);
    if (S.hop) ankle[trail].y += Math.max(0, bump - 0.02);
    fq[trail] = ts1.q.clone().slerp(Aq, f); toe[trail] = lerp(ts1.toe, 0, f);
    sk.leg(P, trail, ankle[trail], fq[trail], pole, toe[trail]);
  } else {
    sk.leg(P, trail, ankle[trail], fq[trail], rot(flatQ, V3(sxOf(trail) * 0.04, 0, 1)), toe[trail]);
  }
  sk.leg(P, lead, ankle[lead], fq[lead], rot(fq[lead], V3(sxOf(lead) * 0.05, 0, 1)), 0);
  const ac = { ...cfg, midfootZ: (P.chest.p.z + P.pelvis.p.z) / 2 - 0.02, holdDz: 0, single: null, split: null };
  const load = squatArms(sk, ac, P, s);
  return { P, load, pelvisPos, lean };
}

// bajada controlada desde el cajón: una pierna sostiene sobre el cajón, la otra baja a tocar el suelo con el talón
function stepDown(sk, cfg, s) {
  const S = cfg.free, AH = sk.ANKLE_H, h = S.h;
  const st = S.stance, fr = other(st);
  const lean = deg(lerp(2, S.leanB ?? 22, smooth(s)));
  const r = uprightR(lean);
  const q = r.pelvis;
  const ankle = {}, fq = {}, toe = { L: 0, R: 0 };
  ankle[st] = V3(sxOf(st) * 0.09, h + AH, 0); fq[st] = qY(sxOf(st) * deg(6));
  const px = lerp(0, sxOf(st) * 0.03, s), pz = lerp(0.0, S.pzB ?? -0.10, smooth(s));
  // pie libre: sobre el cajón → al frente por encima del borde → talón en el suelo
  const A0 = V3(sxOf(fr) * 0.09, h + AH, 0), A1 = V3(sxOf(fr) * 0.06, h + AH + 0.05, S.tapZ * 0.8), A2 = V3(sxOf(fr) * 0.05, AH + 0.012, S.tapZ);
  const k1 = smooth(clamp(s / 0.3, 0, 1)), k2 = smooth(clamp((s - 0.2) / 0.8, 0, 1));
  ankle[fr] = A0.clone().lerp(A1, k1).lerp(A2, k2); ankle[fr].y += 0.04 * Math.sin(Math.PI * k1) * (1 - k2);
  fq[fr] = qY(sxOf(fr) * deg(6)).slerp(qX(-deg(18)).multiply(qY(sxOf(fr) * deg(6))), k2);
  const yTop = maxPelvisY(sk, q, 0, 0, st, ankle[st]) - 0.012;
  const yLow = maxPelvisY(sk, q, px, pz, fr, A2, 0.995);
  const y = Math.min(lerp(yTop, yLow, smooth(s)), maxPelvisY(sk, q, px, pz, st, ankle[st]) - 0.004);
  const pelvisPos = V3(px, y, pz);
  const P = sk.trunk(pelvisPos, r);
  sk.leg(P, st, ankle[st], fq[st], rot(fq[st], V3(sxOf(st) * 0.05, 0, 1)), 0);
  sk.leg(P, fr, ankle[fr], fq[fr], V3(0, 0.1, 1), 0);
  const load = squatArms(sk, { ...cfg, single: st }, P, s);
  return { P, load, pelvisPos, lean };
}


// ------------------------------------------------------------------ utilidades de piernas y brazos libres
// pierna por ángulos en el marco de la pelvis: flex (cadera, + hacia delante), knee (flexión de rodilla), plant (tobillo)
function legByAngles(sk, P, sd, flex, knee, plant = 0, abd = 0, hAbd = 0) {
  const base = P.pelvis.q.clone().multiply(qY(sxOf(sd) * deg(hAbd))).multiply(qZ(sxOf(sd) * deg(abd))).multiply(qX(-deg(flex)));
  const thQ = base.clone(), shQ = base.clone().multiply(qX(deg(knee)));
  const H = P['hip_' + sd];
  const K = H.clone().add(rot(thQ, V3(0, -sk.LT * 0.999, 0)));
  const A = K.clone().add(rot(shQ, V3(0, -sk.LS * 0.999, 0)));
  const fq = shQ.clone().multiply(qX(deg(plant)));
  sk.leg(P, sd, A, fq, rot(thQ, V3(0, 0, 1)), 0);
}
// pierna recta en una dirección dada (mundo)
function legStraight(sk, P, sd, dir, front, plant = 15) {
  const d = dir.clone().normalize();
  const H = P['hip_' + sd];
  const A = H.clone().add(d.clone().multiplyScalar((sk.LT + sk.LS) * 0.997));
  const q = basisQuat(d.clone().negate(), front);
  sk.leg(P, sd, A, q.multiply(qX(deg(plant))), front, 0);
}
function armTo(sk, P, sd, wrist, pole, palm, fingers, shift) {
  const S = sk.shoulder(P, sd, shift || V3());
  sk.armIK(P, sd, S, wrist, pole, fingers.clone().cross(palm).multiplyScalar(sd === 'L' ? 1 : -1), handOpenQ(sd, palm, fingers));
}
function gripTo(sk, P, sd, B, axis, palm, pole, shift) {
  const S = sk.shoulder(P, sd, shift || V3());
  const g = handGrip(sd, B, axis, palm);
  sk.armIK(P, sd, S, g.wrist, pole, axis, g.q);
}
// banda elástica alrededor de los muslos, por encima de las rodillas (6 tramos)
function kneeBand(P) {
  const pt = (sd, x, z) => P['thigh_' + sd].p.clone().add(rot(P['thigh_' + sd].q, V3(x, -0.36, z)));
  const L = { o: pt('L', 0.068, 0.0), f: pt('L', 0.02, 0.058), b: pt('L', 0.02, -0.058) };
  const R = { o: pt('R', -0.068, 0.0), f: pt('R', -0.02, 0.058), b: pt('R', -0.02, -0.058) };
  return [[L.o, L.f], [L.f, R.f], [R.f, R.o], [R.o, R.b], [R.b, L.b], [L.b, L.o]];
}

// ------------------------------------------------------------------ boca arriba: hip thrust, puentes y curl femoral
// La espalda alta queda apoyada en un punto fijo (borde del banco o suelo) y el tronco gira alrededor de él.
function supine(sk, cfg, s, cache) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const sv = B.sMin != null ? lerp(B.sMin, 1, s) : s;
  const curlMode = !!B.curl;                    // curl femoral: la cadera ya está arriba
  const hipK = curlMode ? 1 : (B.split ? smooth(clamp(sv / B.split, 0, 1)) : sv);
  const curlK = curlMode ? sv : (B.split ? smooth(clamp((sv - B.split) / (1 - B.split), 0, 1)) : 0);
  const th = deg(lerp(B.thB, B.thT, hipK) + (B.thCurl ?? 0) * curlK);
  const neckF = deg(lerp(B.neckB ?? 8, B.neckT ?? 12, hipK));
  const r = { pelvis: qX(th - Math.PI / 2), lumbar: qX(deg(B.lumbar ?? 0)), chest: qX(deg(B.chest ?? 0)), neck: qX(neckF), head: qX(neckF * 0.35) };
  const P0 = sk.trunk(V3(), r);
  const c = sk.chestPoint(P0, V3(...B.contact));
  const pelvisPos = V3(...B.at).sub(c);
  const P = sk.trunk(pelvisPos, r);
  const load = { mass: 0, fband: [], dyn: {} };
  const t = cfg._t ?? 0;
  // pies: por defecto, con la cadera arriba la espinilla queda vertical (rodilla sobre el tobillo)
  const fy = (B.footY ?? 0) + AH;
  if (B.footZ == null && cache.footZ == null) {
    const rT = { ...r, pelvis: qX(deg(B.thT) - Math.PI / 2) };
    const PT = sk.trunk(V3(), rT);
    const PTt = sk.trunk(V3(...B.at).sub(sk.chestPoint(PT, V3(...B.contact))), rT);
    const hp = PTt.hip_L, dy = hp.y - (fy + sk.LS * (B.shinK ?? 1));
    cache.footZ = hp.z + Math.sqrt(Math.max(sk.LT * sk.LT - dy * dy, 0.01)) + (B.footDz ?? 0);
  }
  const footZ = B.footZ ?? cache.footZ;
  const sides = ['L', 'R'];
  let single = B.single || null;
  if (B.alternate) single = ((cfg._rep ?? 0) % 2 === 0) ? 'L' : 'R';
  const wob = B.wobble ? 0.10 * Math.sin(t * 5.3) : 0;
  for (const sd of sides) {
    const sx = sxOf(sd);
    if (single && sd !== single) continue;
    const pole = V3(sx * (B.kneeOut ?? 0.06) + wob, 1, 0.35);
    if (B.ball) {
      // talones sobre el balón suizo
      const bz = B.ball.z - (B.ball.roll ?? 0) * curlK;
      const R = B.ball.r;
      load.dyn.ball = { p: V3(0, R, bz), q: qX((B.ball.z - bz) / R) };
      const k = curlK;
      const A = V3(sx * (B.feetW ?? 0.10), lerp(2 * R + 0.035, 2 * R - 0.02, k), bz + lerp(-0.06, -0.16, k));
      const fq = qX(-deg(lerp(70, 10, k)));
      sk.leg(P, sd, A, fq, pole, 0);
    } else if (B.trx) {
      const an = V3(0, B.trx.y, B.trx.z);
      const z = lerp(B.trx.z0, B.trx.z1, curlK);
      const Lr = B.trx.len;
      const y = an.y - Math.sqrt(Math.max(Lr * Lr - (z - an.z) * (z - an.z), 0.01));
      const A = V3(sx * 0.10, y, z);
      sk.leg(P, sd, A, qX(-deg(lerp(60, 25, curlK))), pole, 0);
      load.fband.push([an.clone().add(V3(sx * 0.03, 0, 0)), A.clone().add(V3(0, 0.03, -0.02))]);
    } else if (B.slide) {
      const z = lerp(B.slide.z0, B.slide.z1, curlK);
      const A = V3(sx * 0.10, AH + 0.012 + 0.012 * curlK, z);
      sk.leg(P, sd, A, qX(-deg(lerp(55, 0, curlK))).multiply(qY(sx * deg(4))), pole, 0);
      (load.dyn.sliders ??= []).push(V3(sx * 0.10, 0, z + 0.02));
    } else if (B.wall) {
      const A = V3(sx * 0.11, B.wall.y, B.wall.z - AH - 0.01);
      sk.leg(P, sd, A, qX(-Math.PI / 2 + deg(8)), V3(sx * 0.05, 0.6, -1), 0);
    } else {
      const A = V3(sx * (B.feetW ?? 0.13), fy, footZ);
      sk.leg(P, sd, A, qY(sx * deg(B.toeOut ?? 8)), pole, 0);
    }
  }
  if (single) {
    const fr = other(single);
    // pierna libre: estirada en línea con el muslo de apoyo, o rodilla al pecho (marcha)
    let march = 0;
    if (B.march) {
      if (cfg._kind === 'rep' && /PAUSA/.test(cfg._phase || '')) march = Math.sin(Math.PI * clamp(cfg._prog ?? 0, 0, 1));
      if (cfg._kind === 'orbit' && /VISTA/.test(cfg._phase || '')) { const k = (cfg._prog ?? 0) * 4; march = Math.sin(Math.PI * (k % 1)); }
    }
    if (B.freeLeg === 'up') {
      legByAngles(sk, P, fr, B.freeFlex ?? 75, 4, 20);
    } else if (B.freeLeg === 'bent') {
      legByAngles(sk, P, fr, 95, 95, 10);
    } else {
      const dT = P['knee_' + single].clone().sub(P['hip_' + single]).normalize();
      legStraight(sk, P, fr, dT, rot(P.pelvis.q, V3(0, 0, 1)), 25);
    }
  }
  if (B.march) {
    // marcha: ambos pies apoyados salvo durante la pausa (una rodilla al pecho, alternando)
    let side = ((cfg._rep ?? 0) % 2 === 0) ? 'L' : 'R', m = 0;
    if (cfg._kind === 'rep' && /PAUSA/.test(cfg._phase || '')) m = Math.sin(Math.PI * clamp(cfg._prog ?? 0, 0, 1));
    if (cfg._kind === 'orbit' && /VISTA/.test(cfg._phase || '')) { const k = (cfg._prog ?? 0) * 4; m = Math.sin(Math.PI * (k % 1)); side = Math.floor(k) % 2 === 0 ? 'L' : 'R'; }
    if (m > 0.001) {
      const sx = sxOf(side);
      const A0 = V3(sx * (B.feetW ?? 0.13), fy, footZ);
      const H = P['hip_' + side];
      const Kt = H.clone().add(rot(P.pelvis.q, V3(0, -0.15, 0.40)));
      const At = Kt.clone().add(V3(0, -0.40, 0.08));
      const A = A0.clone().lerp(At, smooth(m));
      sk.leg(P, side, A, qY(sx * deg(8)).slerp(qX(deg(30)), smooth(m)), V3(sx * 0.06, 1, 0.35), 0);
    }
  }
  // brazos
  const am = B.arms || 'bench';
  if (am === 'bench') {
    for (const sd of sides) {
      const sx = sxOf(sd);
      armTo(sk, P, sd, V3(sx * 0.56, B.at[1] + 0.035, B.at[2] - 0.16), V3(sx * 0.4, -1, -0.6), V3(0, -1, 0), V3(sx * 0.3, 0, -1));
    }
  } else if (am === 'floor') {
    for (const sd of sides) {
      const sx = sxOf(sd);
      armTo(sk, P, sd, V3(sx * 0.29, 0.04, B.at[2] + 0.50), V3(sx * 1, 0.2, 0), V3(0, -1, 0), V3(sx * 0.05, 0, 1));
    }
  } else if (am === 'bar' || am === 'db') {
    // carga sobre la cadera
    const pq = P.pelvis.q;
    const c = P.pelvis.p.clone().add(rot(pq, V3(0, am === 'bar' ? -0.035 : -0.075, am === 'bar' ? 0.175 : 0.165)));
    if (am === 'bar') { load.bar = { p: c, q: ID() }; load.mass = 60; }
    else { load.dbs = [c]; load.dbq = ID(); load.mass = 20; }
    const gx = am === 'bar' ? 0.34 : 0.105;
    for (const sd of sides) {
      const sx = sxOf(sd);
      gripTo(sk, P, sd, c.clone().add(V3(sx * gx, 0, 0)), V3(-sx, 0, 0), am === 'bar' ? V3(0, -0.3, 1) : V3(-sx * 0.2, -1, 0.2), V3(sx * 0.8, -0.4, -0.5));
    }
  }
  if (B.hipBand) {
    const pq = P.pelvis.q, pp = P.pelvis.p;
    const Lp = (x, y, z) => pp.clone().add(rot(pq, V3(x, y, z)));
    const aL = V3(0.42, 0.03, B.hipBand.z), aR = V3(-0.42, 0.03, B.hipBand.z);
    const sL = Lp(0.17, -0.03, 0.06), sR = Lp(-0.17, -0.03, 0.06), fL = Lp(0.10, -0.03, 0.15), fR = Lp(-0.10, -0.03, 0.15);
    load.fband.push([aL, sL], [sL, fL], [fL, fR], [fR, sR], [sR, aR]);
  }
  if (B.kneeBand) load.fband.push(...kneeBand(P));
  return { P, load, pelvisPos, lean: th };
}

// ------------------------------------------------------------------ escena de implementos de las familias libres
export function setupFree(scene, cfg, PR, cache = {}, p0 = null) {
  const B = cfg.free, list = [];
  const add = (o) => { scene.add(o); list.push(o); return o; };
  const fp = { list };
  for (const it of (cfg.items || [])) {
    let o = null;
    if (it.kind === 'benchX') o = PR.benchX(it.len ?? 1.25, it.h ?? 0.43);
    else if (it.kind === 'box') o = PR.plyoBox(it.w ?? 0.6, it.h, it.d ?? 0.5);
    else if (it.kind === 'pad') o = PR.balancePad();
    else if (it.kind === 'wall') { o = PR.wall(it.w, it.h); if (it.flip) o.rotation.y = Math.PI; }
    else if (it.kind === 'rackPins') o = PR.rackPins(it.y ?? (p0 && p0.load.bar ? p0.load.bar.p.y - 0.03 : 0.4));
    else if (it.kind === 'trxAnchor') o = PR.trxAnchor(it.y);
    else if (it.kind === 'post') o = PR.post(it.h);
    else if (it.kind === 'mat') o = PR.mat(it.w ?? 0.6, it.l ?? 1.8);
    else if (it.kind === 'flatBench') o = PR.flatBench(it.len ?? 1.1, it.h ?? 0.43);
    else if (PR[it.kind]) o = PR[it.kind](it);
    if (!o) continue;
    let z = it.z ?? 0;
    if (it.zFoot) z = (cache.footZ ?? 0) + (it.dz ?? 0.03);
    if (it.zBar && p0 && p0.load.bar) z = p0.load.bar.p.z;
    o.position.set(it.x ?? 0, it.y0 ?? 0, z);
    if (it.ry) o.rotation.y = it.ry;
    add(o);
  }
  if (B && B.ball) fp.ball = add(PR.swissBall(B.ball.r));
  if (B && B.ball2) fp.ball2 = add(PR.swissBall(B.ball2.r));
  if (B && B.armMode === 'ball') fp.ball = add(PR.swissBall(0.11));
  if (B && B.board) fp.board = add(PR.balanceBoard());
  if (B && B.hold === 'bar') { fp.bar = add(PR.barbell(B.barOpts || {})); const fade = new Set(); fp.bar.traverse(o => { if (o.isMesh && Math.abs(o.position.x) > 0.6) fade.add(o.material); }); fp.fadeMats = [...fade]; }
  if (B && B.rods) fp.rods = B.rods.map((r) => add(PR.rod(r.r ?? 0.02, r.color ?? 0x2a2d31)));
  if (B && B.handles) fp.handles = B.handles.map(() => add(PR.handle()));
  if (B && B.plates) fp.plates = B.plates.map((pl) => { const g = PR.barbell({ half: 0.75, plates: 1 }); return add(g); });
  if (B && B.hold === 'db') fp.dbs = (B.holdSides || ['L', 'R']).map(() => add(PR.dumbbell(B.dbK ?? 1)));
  if (B && B.hold === 'plate') fp.plate = add(PR.plate());
  if (B && B.sidePlates) fp.sidePlates = [add(PR.plate(0.16)), add(PR.plate(0.16))];
  if (B && B.hangPlate) fp.hangPlate = add(PR.plate(0.12));
  if (B && B.wheel) fp.wheel = add(PR.plate(B.wheel.r ?? 0.10));
  if (B && B.sliderAt) fp.sliders = B.sliderAt.map(() => add(PR.slider()));
  if (B && B.type === 'run' && B.slope) add(PR.ramp({ slope: B.slope, h0: B.rampH ?? 0.5 }));
  if (B && B.type === 'run' && B.marks) fp.marks = B.marks.map((m) => add(PR[m.kind](m)));
  if (B && B.vest) fp.vest = add(PR.vest());
  if (B && B.type === 'run' && B.ladder) fp.ladder = add(PR.agilityLadder(B.ladder));
  if (B && B.cones) fp.cones = Array.from({ length: (B.cones.n ?? 6) * (B.cones.both === false ? 1 : 2) }, () => add(PR.cone()));
  if (B && B.hold === 'db1') fp.dbs = [add(PR.dumbbell(B.dbK ?? 1.2))];
  if (B && B.arms === 'bar') { fp.bar = add(PR.barbell()); const fade = new Set(); fp.bar.traverse(o => { if (o.isMesh && Math.abs(o.position.x) > 0.6) fade.add(o.material); }); fp.fadeMats = [...fade]; }
  if (B && (B.arms === 'db' || B.db || B.kneeLoad || B.footLoad)) fp.dbs = [add(PR.dumbbell(B.db || B.kneeLoad || B.footLoad ? 1.0 : 1.3))];
  if (B && B.ankleWeight) fp.ankleW = add(PR.ankleWeight());
  if (B && (B.type === 'legPressCalf' || B.type === 'legPress')) fp.sled = add(PR.legPressSled());
  if (B && B.slide) fp.sliders = [add(PR.slider()), add(PR.slider())];
  if (B && (B.carry || B.beltKb || B.handKb || B.carryOH || (B.carryFront && B.carryFront !== 'bag')) && B.carry !== 'both') fp.kb = add(PR.kettlebell());
  if (B && B.carry === 'both') fp.dbs = [add(PR.dumbbell(1.3)), add(PR.dumbbell(1.3))];
  if (B && (B.trx || B.hipBand || B.kneeBand || B.bands || B.cable || B.band || B.anchor || B.kneeBandLoop || B.ankleBand || B.bandAnkle || B.bandAnkles || B.beltBand || B.tether)) fp.fband = Array.from({ length: 12 }, () => add(PR.bandSegment((B.trx || B.tether) ? 0x16181a : (B.cable && !B.cableBand ? 0xb9bec4 : undefined), (B.trx || B.tether) ? 0.012 : (B.cable && !B.cableBand ? 0.0065 : undefined))));
  for (const k in (B && B.machine ? { m: 1 } : {})) fp.machine = add(PR[B.machine.kind](B.machine));
  return fp;
}
export function applyFree(fp, load) {
  if (fp.ball2 && load.dyn && load.dyn.ball2) fp.ball2.position.copy(load.dyn.ball2.p);
  if (fp.ball && load.dyn && load.dyn.ball) { fp.ball.position.copy(load.dyn.ball.p); fp.ball.quaternion.copy(load.dyn.ball.q); }
  if (fp.board && load.dyn && load.dyn.board) { fp.board.position.copy(load.dyn.board.p); fp.board.quaternion.copy(load.dyn.board.q); }
  if (fp.sliders && load.dyn && load.dyn.sliders) load.dyn.sliders.forEach((p, i) => fp.sliders[i].position.copy(p));
  if (fp.fband) {
    const up = V3(0, 1, 0);
    fp.fband.forEach((m, i) => {
      const sg = load.fband && load.fband[i];
      m.visible = !!sg; if (!sg) return;
      const [a, b] = sg; const dv = b.clone().sub(a); const len = dv.length();
      m.position.copy(a).add(b).multiplyScalar(0.5); m.scale.set(1, len, 1);
      m.quaternion.setFromUnitVectors(up, dv.normalize());
    });
  }
  if (fp.machine && fp.machine.userData.update) fp.machine.userData.update(load);
  if (fp.ankleW && load.dyn && load.dyn.ankleW) { fp.ankleW.position.copy(load.dyn.ankleW.p); fp.ankleW.quaternion.copy(load.dyn.ankleW.q); }
  if (fp.rods && load.dyn && load.dyn.rods) fp.rods.forEach((m, i) => {
    const sg = load.dyn.rods[i]; m.visible = !!sg; if (!sg) return;
    const [a, b] = sg, dv = b.clone().sub(a), len = dv.length();
    m.position.copy(a).add(b).multiplyScalar(0.5); m.scale.set(1, len, 1); m.quaternion.setFromUnitVectors(V3(0, 1, 0), dv.normalize());
  });
  if (fp.handles && load.dyn && load.dyn.handles) fp.handles.forEach((m, i) => { const h = load.dyn.handles[i]; if (h) { m.position.copy(h.p); m.quaternion.copy(h.q); } });
  if (fp.sidePlates && load.dyn && load.dyn.sidePlates) fp.sidePlates.forEach((m, i) => m.position.copy(load.dyn.sidePlates[i]));
  if (fp.marks && load.dyn && load.dyn.marks) fp.marks.forEach((m, i) => { const c = load.dyn.marks[i]; if (c) m.position.copy(c); });
  if (fp.ladder && load.dyn && load.dyn.ladderZ !== undefined) fp.ladder.position.z = load.dyn.ladderZ;
  if (fp.vest && load.dyn && load.dyn.vest) { fp.vest.position.copy(load.dyn.vest.p); fp.vest.quaternion.copy(load.dyn.vest.q); }
  if (fp.cones && load.dyn && load.dyn.cones) fp.cones.forEach((m, i) => { const c = load.dyn.cones[i]; if (c) m.position.copy(c); });
  if (fp.wheel && load.dyn && load.dyn.wheel) { fp.wheel.position.copy(load.dyn.wheel); fp.wheel.rotation.set(load.dyn.wheel.z / 0.10, 0, 0); }
  if (fp.hangPlate && load.dyn && load.dyn.hangPlate) { fp.hangPlate.position.copy(load.dyn.hangPlate); fp.hangPlate.rotation.set(0, Math.PI / 2, 0); }
  if (fp.plate && load.dyn && load.dyn.plate) { fp.plate.position.copy(load.dyn.plate.p); fp.plate.quaternion.copy(load.dyn.plate.q); }
  if (fp.sled && load.dyn && load.dyn.sled) { fp.sled.position.copy(load.dyn.sled.p); fp.sled.quaternion.copy(load.dyn.sled.q); }
}


// ------------------------------------------------------------------ de pie sobre una pierna: patadas de glúteo y curl de pie
function stand1(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const st = B.stance, wk = other(st);
  const lean = deg(lerp(B.leanB ?? 10, B.leanT ?? B.leanB ?? 10, s));
  const r = uprightR(lean, { neckK: B.neckK ?? 0.6, chestExt: B.chestExt ?? 2 });
  const q = r.pelvis;
  const A = V3(sxOf(st) * 0.09, (B.standY ?? 0) + AH, B.standZ ?? 0);
  const fq = qY(sxOf(st) * deg(6));
  const px = sxOf(st) * (B.shiftX ?? 0.03), pz = B.pz ?? -0.02;
  const y = maxPelvisY(sk, q, px, pz, st, A) - (B.bend ?? 0.02);
  const pelvisPos = V3(px, y, pz);
  const P = sk.trunk(pelvisPos, r);
  sk.leg(P, st, A, fq, rot(fq, V3(sxOf(st) * 0.05, 0, 1)), 0);
  legByAngles(sk, P, wk, lerp(B.flexB, B.flexT, s), lerp(B.kneeB, B.kneeT, s), lerp(B.plantB ?? 10, B.plantT ?? 10, s), lerp(B.abdB ?? 0, B.abdT ?? B.abdB ?? 0, s));
  const load = { mass: 0, fband: [], dyn: {} };
  const ank = P['ankle_' + wk];
  if (B.cable) load.fband.push([V3(...B.cable), ank.clone().add(V3(0, 0.02, 0))]);
  if (B.machine) {
    const piv = V3(sxOf(wk) * 0.30, B.machine.pivotY, B.machine.pivotZ);
    const foot = P['foot_' + wk];
    const plate = foot.p.clone().add(rot(foot.q, V3(0, -0.085, 0.03)));
    load.dyn.lever = { pivot: piv, end: plate, q: foot.q.clone(), side: wk };
  }
  const hs = B.hands || 'hips';
  if (hs === 'hips') Object.assign(load, squatArms(sk, { ...cfg, arms: 'hips' }, P, s));
  else for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), H = V3(sx * B.handX, B.handY, B.handZ);
    gripTo(sk, P, sd, H, V3(-sx, 0, 0), V3(0, -0.2, 1), V3(sx * 0.5, -1, -0.2));
  }
  return { P, load, pelvisPos, lean };
}

// ------------------------------------------------------------------ cuadrupedia (patada de glúteo / donkey kick)
function quadruped(sk, cfg, s) {
  const B = cfg.free;
  const wk = B.side, st = other(wk);
  const inc = deg(B.incline ?? 12);
  const r = { pelvis: qX(Math.PI / 2 - inc), lumbar: ID(), chest: ID(), neck: qX(deg(B.neck ?? -8)), head: qX(deg(-4)) };
  const q = r.pelvis;
  const hipY = 0.065 + sk.LT * 0.999;
  const o = rot(q, sk.o['hip_L']);
  const pelvisPos = V3(0, hipY - o.y, -o.z);
  const P = sk.trunk(pelvisPos, r);
  legByAngles(sk, P, st, 90 - (B.incline ?? 12), 90, 88);
  legByAngles(sk, P, wk, lerp(90 - (B.incline ?? 12), B.flexT ?? -12, s), lerp(90, B.kneeT ?? 88, s), 70, 0, lerp(0, B.abdT ?? 0, s));
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), S = sk.shoulder(P, sd);
    armTo(sk, P, sd, V3(S.x + sx * 0.01, 0.045, S.z + 0.02), V3(sx * 0.2, 0, -1), V3(0, -1, 0), V3(sx * 0.1, 0, 1));
  }
  const load = { mass: 0, fband: [], dyn: {} };
  if (B.db) {
    // mancuerna sujeta en el pliegue de la rodilla
    const K = P['knee_' + wk], th = P['thigh_' + wk];
    load.dbs = [K.clone().add(rot(th.q, V3(0, 0.055, -0.07)))]; load.dbq = th.q.clone().multiply(qZ(Math.PI / 2)); load.mass = 8;
  }
  return { P, load, pelvisPos, lean: inc };
}

// ------------------------------------------------------------------ curl nórdico: de rodillas, el cuerpo cae en bloque desde la rodilla
function nordic(sk, cfg, s) {
  const B = cfg.free;
  const phi = deg(lerp(0, B.maxAng ?? 68, s));
  const r = { pelvis: qX(phi), lumbar: ID(), chest: qX(-deg(2)), neck: qX(-deg(8) - phi * 0.25), head: qX(-phi * 0.1) };
  const K = { L: V3(0.10, 0.075, 0), R: V3(-0.10, 0.075, 0) };
  const hipW = K.L.clone().add(V3(0, Math.cos(phi), Math.sin(phi)).multiplyScalar(sk.LT * 0.999));
  const pelvisPos = hipW.clone().sub(rot(r.pelvis, sk.o.hip_L));
  const P = sk.trunk(pelvisPos, r);
  for (const sd of ['L', 'R']) {
    const A = K[sd].clone().add(V3(0, 0.005, -sk.LS * 0.999));
    sk.leg(P, sd, A, qX(deg(150)), V3(0, -0.4, 1), 0);
  }
  // brazos: listos frente al pecho → al final se adelantan hacia el suelo para frenar
  const k = smooth(clamp((s - 0.55) / 0.45, 0, 1));
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    const ready = sk.chestPoint(P, V3(sx * 0.17, 1.28, 0.24));
    const S = sk.shoulder(P, sd);
    const floor = V3(sx * 0.22, 0.05, Math.max(S.z + 0.12, 0.55));
    const W = ready.clone().lerp(floor, k);
    armTo(sk, P, sd, W, V3(sx * 0.6, -0.6, -0.4), rot(P.chest.q, V3(0, 0, 1)).lerp(V3(0, -1, 0), k).normalize(), rot(P.chest.q, V3(-sx * 0.1, 1, 0.2)).lerp(V3(0, 0, 1), k).normalize());
  }
  const load = { mass: 0, fband: [], dyn: {} };
  if (B.band) {
    const an = V3(...B.band);
    for (const sx of [1, -1]) load.fband.push([an.clone().add(V3(sx * 0.03, 0, 0)), sk.chestPoint(P, V3(sx * 0.12, 1.32, -0.115))]);
    load.fband.push([sk.chestPoint(P, V3(0.12, 1.32, -0.115)), sk.chestPoint(P, V3(-0.12, 1.32, -0.115))]);
  }
  return { P, load, pelvisPos, lean: phi };
}

// ------------------------------------------------------------------ boca abajo en máquina (curl femoral tumbado)
function prone(sk, cfg, s) {
  const B = cfg.free;
  const tilt = deg(B.hipTilt ?? 0);
  const r = { pelvis: qX(Math.PI / 2 + tilt), lumbar: ID(), chest: qX(-tilt * 0.6), neck: qX(-deg(18)), head: qX(-deg(6)) };
  const pelvisPos = V3(0, B.padY + 0.115, 0);
  const P = sk.trunk(pelvisPos, r);
  const kn = lerp(B.kneeB ?? 4, B.kneeT ?? 110, s);
  for (const sd of ['L', 'R']) legByAngles(sk, P, sd, -tilt * 180 / Math.PI, kn, -lerp(12, 4, s));
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    gripTo(sk, P, sd, V3(sx * 0.24, B.padY - 0.02, B.handZ ?? 0.66), V3(0, -1, 0), V3(-sx, 0, 0), V3(sx * 0.6, 0.3, -1));
  }
  const load = { mass: 0, fband: [], dyn: {} };
  const sh = P.shin_L, an = P.ankle_L;
  const roller = an.clone().add(rot(sh.q, V3(0, 0.07, -0.075)));
  load.dyn.lever = { pivot: P.knee_L.clone().setX(0.30), end: roller.setX(0), q: sh.q.clone(), roller: true };
  return { P, load, pelvisPos, lean: 0 };
}

// ------------------------------------------------------------------ sentado: curl femoral sentado, extensión de rodilla
function seated(sk, cfg, s) {
  const B = cfg.free;
  const rec = deg(B.recline ?? 10);
  const r = { pelvis: qX(-rec), lumbar: ID(), chest: qX(deg(2)), neck: qX(rec * 0.8), head: qX(rec * 0.2) };
  const pelvisPos = V3(0, B.seatY + 0.10, 0);
  const P = sk.trunk(pelvisPos, r);
  const flex = 90 - (B.recline ?? 10);
  const kn = lerp(B.kneeB, B.kneeT, s);
  const work = B.single ? [B.single] : ['L', 'R'];
  for (const sd of ['L', 'R']) {
    const k = work.includes(sd) ? kn : (B.restKnee ?? 90);
    legByAngles(sk, P, sd, flex, k, lerp(B.plantB ?? 0, B.plantT ?? 0, s));
  }
  const load = { mass: 0, fband: [], dyn: {} };
  const wk = work[0];
  const sh = P['shin_' + wk], an = P['ankle_' + wk];
  if (B.roller) {
    const side = B.roller === 'front' ? 1 : -1;
    const ro = an.clone().add(rot(sh.q, V3(0, 0.075, side * 0.075)));
    load.dyn.lever = { pivot: P['knee_' + wk].clone().setX(0.31), end: ro.setX(B.single ? ro.x : 0), q: sh.q.clone(), roller: true };
  }
  if (B.band) load.fband.push([V3(...B.band), an.clone().add(rot(sh.q, V3(0, 0.03, 0.05)))]);
  if (B.ankleWeight) load.dyn.ankleW = { p: an.clone().add(rot(sh.q, V3(0, 0.045, 0))), q: sh.q.clone() };
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    gripTo(sk, P, sd, V3(sx * (B.handX ?? 0.27), B.seatY + (B.handDy ?? 0.04), B.handZ ?? 0.12), V3(0, 0, 1), V3(-sx, 0, 0), V3(sx * 0.5, -0.2, -1));
  }
  return { P, load, pelvisPos, lean: -rec };
}

// ------------------------------------------------------------------ elevación de talones (de pie, en escalón, rodilla flexionada, sentado)
// s = 0 talones abajo (o por debajo del escalón), s = 1 de puntillas
function calf(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const pitch = lerp(B.minPitch ?? 0, B.maxPitch ?? 34, s);
  const stance = B.single ? [B.single] : ['L', 'R'];
  const fy = (B.stepH ?? 0);
  const W = B.feetW ?? 0.10;
  const mtpW = {}, A = {}, Q = {}, toe = {};
  for (const sd of stance) {
    const flatQ = qY(sxOf(sd) * deg(B.toeOut ?? 6));
    const a0 = V3(sxOf(sd) * (B.single ? 0.06 : W), fy + AH, B.footZ ?? 0);
    const m = a0.clone().add(rot(flatQ, mtpOf(sk, sd))); m.y = fy + 0.018; mtpW[sd] = m;
    if (B.heelPivot) {
      // puntera arriba: el talón queda fijo en el suelo y el pie gira sobre él
      const hl = V3(0, -AH + 0.012, -0.055);
      const h0 = a0.clone().add(rot(flatQ, hl));
      const q = qX(-deg(Math.abs(pitch))).multiply(flatQ);
      A[sd] = h0.clone().sub(rot(q, hl)); Q[sd] = q; toe[sd] = 0;
    } else {
      const ts = toeStance(sk, sd, m, pitch, B.toeOut ?? 6);
      A[sd] = ts.a; Q[sd] = ts.q; toe[sd] = Math.max(0, ts.toe);
    }
  }
  if (B.seatedCalf) {
    // sentado: muslos horizontales, la rodilla sube al levantar los talones
    const r = { pelvis: ID(), lumbar: ID(), chest: qX(deg(4)), neck: qX(deg(6)), head: ID() };
    const pelvisPos = V3(0, B.seatY + 0.10, -0.02);
    const P = sk.trunk(pelvisPos, r);
    for (const sd of ['L', 'R']) sk.leg(P, sd, A[sd], Q[sd], V3(sxOf(sd) * 0.05, 1, 0.6), toe[sd]);
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd), K = P['knee_' + sd];
      armTo(sk, P, sd, K.clone().add(V3(0, 0.075, -0.06)), V3(sx * 0.8, -0.2, -0.3), V3(0, -1, 0), V3(0, 0, 1));
    }
    const load = { mass: 0, fband: [], dyn: {} };
    if (B.kneeLoad) { load.dbs = [P.knee_L.clone().add(V3(-0.09, 0.09, -0.08))]; load.dbq = ID(); load.mass = 10; }
    return { P, load, pelvisPos, lean: 0 };
  }
  const lean = deg(B.lean ?? 2);
  const r = uprightR(lean, { neckK: B.neckK ?? 0.45 });
  const q = r.pelvis;
  const kf = B.kneeFlex ?? 0;
  const k = kf ? Math.sqrt(sk.LT ** 2 + sk.LS ** 2 + 2 * sk.LT * sk.LS * Math.cos(deg(kf))) / (sk.LT + sk.LS) : 0.997;
  const az = stance.reduce((a, sd) => a + A[sd].z, 0) / stance.length;
  const px = B.single ? sxOf(B.single) * 0.05 : 0, pz = az - (kf ? 0.10 : 0.02) + (B.pzOff ?? 0);
  let y = Infinity;
  for (const sd of stance) y = Math.min(y, maxPelvisY(sk, q, px, pz, sd, A[sd], k));
  const pelvisPos = V3(px, y, pz);
  const P = sk.trunk(pelvisPos, r);
  for (const sd of stance) sk.leg(P, sd, A[sd], Q[sd], rot(qY(sxOf(sd) * deg(6)), V3(sxOf(sd) * 0.05, 0, 1)), toe[sd]);
  if (B.single) legByAngles(sk, P, other(B.single), 2, 75, 20);
  const ac = { ...cfg, midfootZ: (P.chest.p.z + P.pelvis.p.z) / 2 - 0.02, holdDz: 0, single: null, split: null };
  const load = squatArms(sk, ac, P, s);
  return { P, load, pelvisPos, lean };
}

// ------------------------------------------------------------------ extensión terminal de rodilla de pie con banda detrás de la rodilla
function tke(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const wk = B.side ?? 'L', tr = other(wk);
  const kf = lerp(B.kneeB ?? 30, B.kneeT ?? 0, s);
  const lean = deg(lerp(8, 3, s));
  const r = uprightR(lean);
  const q = r.pelvis;
  const Aw = V3(sxOf(wk) * 0.09, AH, 0.06), Qw = qY(sxOf(wk) * deg(6));
  const k = Math.sqrt(sk.LT ** 2 + sk.LS ** 2 + 2 * sk.LT * sk.LS * Math.cos(deg(kf))) / (sk.LT + sk.LS);
  const px = sxOf(wk) * 0.04, pz = lerp(-0.07, -0.02, s);
  const y = maxPelvisY(sk, q, px, pz, wk, Aw, Math.min(k, 0.997));
  const pelvisPos = V3(px, y, pz);
  const P = sk.trunk(pelvisPos, r);
  sk.leg(P, wk, Aw, Qw, V3(sxOf(wk) * 0.05, 0, 1), 0);
  // la otra pierna, un paso atrás y apoyada en la punta
  const mt = V3(sxOf(tr) * 0.10, 0.018, -0.28);
  const ts = toeStance(sk, tr, mt, 28);
  sk.leg(P, tr, ts.a, ts.q, V3(0, 0, 1), ts.toe);
  const load = squatArms(sk, { ...cfg, arms: 'hips' }, P, s);
  load.fband = load.fband || []; load.dyn = load.dyn || {};
  const K = P['knee_' + wk], th = P['thigh_' + wk];
  const back = K.clone().add(rot(th.q, V3(0, 0.02, -0.065)));
  const an = V3(...B.anchor);
  const sL = K.clone().add(rot(th.q, V3(0.065, 0.02, -0.01))), sR = K.clone().add(rot(th.q, V3(-0.065, 0.02, -0.01)));
  load.fband.push([an.clone().add(V3(0.03, 0, 0)), sL], [sL, back], [back, sR], [sR, an.clone().add(V3(-0.03, 0, 0))]);
  return { P, load, pelvisPos, lean };
}

// ------------------------------------------------------------------ prensa inclinada a 45°: elevación de talones sobre la plataforma
function legPressCalf(sk, cfg, s) {
  const B = cfg.free;
  const rec = deg(B.recline ?? 48);
  const r = { pelvis: qX(-rec), lumbar: ID(), chest: qX(deg(4)), neck: qX(rec * 0.55), head: qX(rec * 0.15) };
  const pelvisPos = V3(0, B.seatY ?? 0.42, 0);
  const P = sk.trunk(pelvisPos, r);
  const ang = deg(B.legAng ?? 42);
  const d = V3(0, Math.sin(ang), Math.cos(ang));
  const toesDir = V3(0, Math.cos(ang), -Math.sin(ang));
  const plant = lerp(B.plantB ?? -12, B.plantT ?? 28, s);
  let foot = null;
  for (const sd of ['L', 'R']) legStraight(sk, P, sd, d.clone().add(V3(sxOf(sd) * 0.04, 0, 0)), toesDir, plant);
  const fL = P.foot_L, fR = P.foot_R;
  const mL = fL.p.clone().add(rot(fL.q, sk.mtp)), mR = fR.p.clone().add(rot(fR.q, V3(-sk.mtp.x, sk.mtp.y, sk.mtp.z)));
  const mid = mL.clone().add(mR).multiplyScalar(0.5);
  // la plataforma pasa por los metatarsos y es perpendicular a las piernas
  const plat = mid.clone().add(d.clone().multiplyScalar(0.03));
  const pq = new THREE.Quaternion().setFromUnitVectors(V3(0, 0, 1), d);
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    gripTo(sk, P, sd, P.pelvis.p.clone().add(V3(sx * 0.30, -0.02, 0.10)), V3(0, 0, 1), V3(-sx, 0, 0), V3(sx * 0.6, -0.3, -1));
  }
  return { P, load: { mass: 0, fband: [], dyn: { sled: { p: plat, q: pq, d } } }, pelvisPos, lean: -rec };
}


// ------------------------------------------------------------------ tobillo con el pie libre: sentado en banco (talón apoyado) o sentado en el suelo con piernas estiradas
// s = 0 pie relajado / en flexión plantar, s = 1 flexión dorsal (puntera hacia la espinilla)
function footSeat(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const pitch = lerp(B.pitchB ?? 0, B.pitchT ?? -28, s);    // negativo = puntera arriba
  const load = { mass: 0, fband: [], dyn: {} };
  let P, pelvisPos, rec;
  const work = B.single ? [B.single] : ['L', 'R'];
  if (B.pose === 'long' || B.pose === 'lying') {
    const lying = B.pose === 'lying';
    rec = deg(lying ? 88 : (B.recline ?? 14));
    const recD = lying ? 88 : (B.recline ?? 14);
    const r = { pelvis: qX(-rec), lumbar: qX(deg(lying ? 0 : 4)), chest: qX(deg(lying ? 0 : 4)), neck: qX(lying ? deg(14) : rec * 0.7), head: ID() };
    pelvisPos = V3(0, lying ? 0.115 : 0.105, 0);
    P = sk.trunk(pelvisPos, r);
    for (const sd of ['L', 'R']) {
      const bent = (B.bentOther && !work.includes(sd)) || (B.bentWork && work.includes(sd));
      legByAngles(sk, P, sd, bent ? 90 - recD + 38 : 90 - recD, bent ? 95 : 2, work.includes(sd) ? pitch : (bent ? -5 : 20));
    }
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd);
      if (B.handOnFoot && sd === (B.handOnFoot)) continue;
      if (lying) armTo(sk, P, sd, V3(sx * 0.30, 0.04, 0.05), V3(sx * 1, 0.2, 0), V3(0, -1, 0), V3(sx * 0.05, 0, 1));
      else armTo(sk, P, sd, V3(sx * 0.24, 0.05, -0.30), V3(sx * 0.6, 0.2, 1), V3(0, -1, 0), V3(sx * 0.15, 0, -1));
    }
  } else {
    rec = deg(B.recline ?? 0);
    const r = { pelvis: qX(-rec + deg(B.leanFwd ?? 0)), lumbar: ID(), chest: qX(deg(3)), neck: qX(deg(6)), head: ID() };
    pelvisPos = V3(0, B.seatY + 0.10, 0);
    P = sk.trunk(pelvisPos, r);
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd);
      const flatQ = qY(sx * deg(4));
      const hl = V3(0, -AH + 0.012, -0.055);
      const heel = V3(sx * 0.11, 0.0 + (B.heelY ?? 0), B.footZ ?? 0.46).add(V3(0, -hl.y - AH + AH, 0));
      const pq = work.includes(sd) ? qX(deg(pitch)).multiply(flatQ) : flatQ;
      const h0 = V3(sx * 0.11, (B.heelY ?? 0) + 0.012, (B.footZ ?? 0.46) - 0.055);
      const A = h0.clone().sub(rot(pq, hl));
      sk.leg(P, sd, A, pq, V3(sx * 0.05, 0.3, 1), 0);
    }
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd);
      gripTo(sk, P, sd, V3(sx * (B.handX ?? 0.27), B.seatY + 0.0, B.handZ ?? 0.04), V3(0, 0, 1), V3(-sx, 0, 0), V3(sx * 0.5, -0.2, -1));
    }
  }
  for (const sd of work) {
    const f = P['foot_' + sd];
    const dorsum = f.p.clone().add(rot(f.q, V3(0, 0.0, 0.09)));
    if (B.band) load.fband.push([V3(sxOf(sd) * 0.03 + (B.band[0] ?? 0), B.band[1], B.band[2]), dorsum.clone().add(rot(f.q, V3(0, 0.02, 0.01)))]);
  }
  if (B.footLoad) {
    // peso sobre el empeine: una mancuerna cruzada sobre los dos pies
    const fl = P.foot_L, fr = P.foot_R;
    const a = fl.p.clone().add(rot(fl.q, V3(0, 0.05, 0.08))), b = fr.p.clone().add(rot(fr.q, V3(0, 0.05, 0.08)));
    load.dbs = [a.add(b).multiplyScalar(0.5)]; load.dbq = fl.q.clone(); load.mass = 10;
  }
  if (B.handOnFoot) {
    const sd = B.handOnFoot, sx = sxOf(sd), w = work[0];
    const f = P['foot_' + w];
    armTo(sk, P, sd, f.p.clone().add(rot(f.q, V3(-sxOf(w) * 0.0, 0.07, 0.07))), V3(sx * 0.8, 0.3, -0.2), rot(f.q, V3(0, -1, 0)), rot(f.q, V3(0, 0, 1)));
  }
  return { P, load, pelvisPos, lean: -rec };
}

// ------------------------------------------------------------------ marcha (caminar sobre talones, marcha exagerada, en tándem, lateral con banda, con carga)
// Basada en el tiempo: tras la intro la persona camina sin parar; la cámara la sigue (def.track).
function gait(sk, cfg, s, cache) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const t = Math.max(0, (cfg._t ?? 0) - 1.7);
  const amp = smooth(clamp(t / 0.7, 0, 1));
  const st = B.stepTime ?? 0.6, T = 2 * st, sf = B.swing ?? 0.42;
  const stepLen = (B.stepLen ?? 0.55) * amp;
  const lateral = !!B.lateral;
  // avance acumulado (la amplitud crece al principio sin saltos de posición)
  const v = (B.stepLen ?? 0.55) / st;
  const dist = v * Math.max(0, t - 0.35) * (lateral ? 0.5 : 1);
  const yaw = 0;
  const bodyF = V3(Math.sin(yaw), 0, Math.cos(yaw));
  // lateral: el cuerpo mira a +z y avanza de lado hacia +x
  const fwd = lateral ? V3(1, 0, 0) : bodyF.clone();   // dirección de avance en el mundo
  const side = V3(Math.cos(yaw), 0, -Math.sin(yaw)); // +x del cuerpo
  const kneeBend = B.kneeBend ?? 0;
  const lean = deg(B.lean ?? 3);
  const W = B.width ?? 0.10;
  const foot = {};
  for (const sd of ['L', 'R']) {
    const off = sd === 'L' ? 0 : 0.5;
    const ph = t / T + off;
    const c = Math.floor(ph), f = ph - c;
    const land = (k) => v * Math.max(0, T * (k + sf - off) - 0.35) + (B.lead ?? 0.5) * (B.stepLen ?? 0.55) * 0.5;
    let along, lift = 0, u = 1;
    if (amp < 0.02) along = 0;
    else if (f < sf) { u = f / sf; along = lerp(land(c - 1), land(c), smooth(u)); lift = Math.sin(Math.PI * u); }
    else along = land(c);
    if (lateral) along = along * 0.5;
    if (B.twoIn && sd === 'R') along -= (B.stepLen ?? 0.55) * amp;
    const lat = B.tandem ? 0 : sxOf(sd) * W * (lateral ? (B.wide ?? 1.0) : 1);
    let pos = fwd.clone().multiplyScalar(along).add(side.clone().multiplyScalar(lat));
    foot[sd] = { pos, lift: lift * amp, swing: f < sf && amp >= 0.02, u };
  }
  // pelvis: avanza con el tiempo, un poco de balanceo vertical y lateral
  const bob = 0.012 * Math.cos(4 * Math.PI * t / T) * amp;
  const sway = lateral ? 0 : (B.tandem ? 0.012 : 0.025) * Math.sin(2 * Math.PI * t / T) * amp;
  const pelvisXZ = fwd.clone().multiplyScalar(dist).add(side.clone().multiplyScalar(sway));
  const r = uprightR(lean, { yaw: yaw * 180 / Math.PI + 4 * Math.sin(2 * Math.PI * t / T) * amp, neckK: 0.5 });
  const q = r.pelvis;
  const fq = {}, A = {};
  for (const sd of ['L', 'R']) {
    const F = foot[sd];
    const base = qY(yaw + sxOf(sd) * deg(B.toeOut ?? 6));
    let pitch = 0;
    if (B.heel) pitch = -24;                                    // caminar sobre los talones: puntera arriba siempre
    else if (F.swing) pitch = B.dorsi ? -22 * Math.sin(Math.PI * F.u) : -8 * Math.sin(Math.PI * F.u);
    fq[sd] = base.clone().multiply(qX(deg(pitch)));
    const h = (B.lift ?? 0.07) * F.lift;
    A[sd] = V3(F.pos.x, AH + h + (B.heel ? 0.03 : 0), F.pos.z);
  }
  let y = Infinity;
  const k = kneeBend ? Math.sqrt(sk.LT ** 2 + sk.LS ** 2 + 2 * sk.LT * sk.LS * Math.cos(deg(kneeBend))) / (sk.LT + sk.LS) : 0.985;
  for (const sd of ['L', 'R']) if (!foot[sd].swing) y = Math.min(y, maxPelvisY(sk, q, pelvisXZ.x, pelvisXZ.z, sd, A[sd], k));
  if (!isFinite(y)) y = maxPelvisY(sk, q, pelvisXZ.x, pelvisXZ.z, 'L', A.L, k);
  // con la rodilla alta (marcha exagerada) la pierna en vuelo sube más
  const pelvisPos = V3(pelvisXZ.x, y + bob, pelvisXZ.z);
  const P = sk.trunk(pelvisPos, r);
  for (const sd of ['L', 'R']) {
    const pole = bodyF.clone().add(side.clone().multiplyScalar(sxOf(sd) * (lateral ? 0.25 : 0.05)));
    if (B.highKnee && foot[sd].swing) {
      const m = Math.sin(Math.PI * foot[sd].u) * amp;
      const H = P['hip_' + sd];
      const K = H.clone().add(fwd.clone().multiplyScalar(sk.LT * 0.75 * m)).add(V3(0, -sk.LT * (1 - 0.55 * m), 0));
      if (B.open) K.add(V3(sxOf(sd) * B.open * m, -0.05 * m, -0.12 * m));
      const Ah = K.clone().add(V3(0, -sk.LS * 0.95, 0)).add(fwd.clone().multiplyScalar(-0.05 * m));
      const along = A[sd];
      const At = Ah.clone().lerp(along, 1 - m);
      sk.leg(P, sd, At, fq[sd], pole, 0);
    } else sk.leg(P, sd, A[sd], fq[sd], pole, 0);
  }
  // brazos: balanceo natural, en cruz (tándem) o con carga en una mano
  const load = { mass: 0, fband: [], dyn: {} };
  const swingA = Math.sin(2 * Math.PI * t / T) * amp;
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), S = sk.shoulder(P, sd);
    if ((B.carry && (sd === B.carry || B.carry === 'both')) || sd === B.carryOH || B.carryFront) continue;
    let W2;
    if (B.tandem) W2 = S.clone().add(side.clone().multiplyScalar(sx * 0.52)).add(V3(0, -0.06, 0));
    else if (B.armsHips) { W2 = null; }
    else {
      const sw = (sd === 'L' ? -1 : 1) * swingA * 0.16;
      W2 = S.clone().add(V3(0, -0.53, 0)).add(fwd.clone().multiplyScalar(sw)).add(side.clone().multiplyScalar(sx * 0.07));
    }
    if (W2) armTo(sk, P, sd, W2, side.clone().multiplyScalar(sx * 0.4).add(fwd.clone().multiplyScalar(-0.6)), B.tandem ? V3(0, -1, 0) : side.clone().multiplyScalar(-sx), B.tandem ? side.clone().multiplyScalar(sx) : fwd.clone());
  }
  if (B.armsHips) Object.assign(load, squatArms(sk, { ...cfg, arms: 'hips' }, P, s), { fband: [], dyn: {} });
  if (B.carry === 'both') {
    load.dbs = [];
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd), S = sk.shoulder(P, sd, V3(0, B.shr ?? 0, 0));
      const G = S.clone().add(V3(0, -0.645, 0)).add(side.clone().multiplyScalar(sx * 0.08));
      gripTo(sk, P, sd, G, fwd.clone(), side.clone().multiplyScalar(-sx), side.clone().multiplyScalar(sx), V3(0, B.shr ?? 0, 0));
      load.dbs.push(G);
    }
    load.dbq = qY(yaw + Math.PI / 2); load.mass = 40;
  } else if (B.carry) {
    const sd = B.carry, sx = sxOf(sd), S = sk.shoulder(P, sd);
    const G = S.clone().add(V3(0, -0.60, 0)).add(side.clone().multiplyScalar(sx * 0.10));
    gripTo(sk, P, sd, G, fwd.clone(), side.clone().multiplyScalar(-sx), side.clone().multiplyScalar(sx));
    load.kb = { p: G.clone().sub(V3(0, 0.066, 0)), q: qY(yaw) }; load.mass = 16;
  }
  if (B.carryFront) {
    const C = sk.chestPoint(P, V3(0, 1.27, 0.27));
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd);
      armTo(sk, P, sd, C.clone().add(side.clone().multiplyScalar(sx * 0.055)), side.clone().multiplyScalar(sx * 0.5).add(V3(0, -1, 0)), side.clone().multiplyScalar(-sx), V3(0, 1, 0));
    }
    if (B.carryFront === 'bag') load.dyn.rods = [[C.clone().add(V3(0, -0.06, 0.04)).add(side.clone().multiplyScalar(0.27)), C.clone().add(V3(0, -0.06, 0.04)).add(side.clone().multiplyScalar(-0.27))]];
    else load.kb = { p: C.clone().add(V3(0, -0.085, 0)), q: qY(yaw) };
    load.mass = 16;
  }
  if (B.carryOH) {
    const sd = B.carryOH, sx = sxOf(sd), S = sk.shoulder(P, sd);
    const G = S.clone().add(V3(0, 0.63, 0)).add(side.clone().multiplyScalar(sx * 0.04));
    gripTo(sk, P, sd, G, fwd.clone(), side.clone().multiplyScalar(-sx), side.clone().multiplyScalar(sx).add(V3(0, -0.3, 0)));
    load.kb = { p: G.clone().add(V3(0, -0.05, 0)).add(fwd.clone().multiplyScalar(-0.09)), q: qY(yaw).multiply(qX(Math.PI * 0.55)) }; load.mass = 12;
  }
  if (B.kneeBandLoop) load.fband.push(...kneeBand(P));
  if (B.ankleBand) {
    const pa = (sd) => P['ankle_' + sd].clone().add(V3(0, 0.05, 0));
    load.fband.push([pa('L'), pa('R')]);
  }
  return { P, load, pelvisPos, lean };
}


// ------------------------------------------------------------------ equilibrio: apoyo monopodal o bipodal sobre suelo, bosu, espuma o tabla
// s anima la flexión de la rodilla de apoyo (y el alcance de la pierna libre en el Y-balance).
function balance(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const t = cfg._t ?? 0;
  const st = B.stance || 'L', fr = other(st);
  const both = !!B.both;
  const sy = B.surfaceY ?? 0;
  const wob = (B.wobble ?? 0.6);
  const sway = deg(wob * (2.2 * Math.sin(t * 1.9) + 1.1 * Math.sin(t * 3.7 + 1.3)));
  const swayF = deg(wob * (1.6 * Math.sin(t * 1.5 + 0.7)));
  let push = 0;
  if (B.pushes) { const tp = Math.max(0, t - 2.2), k = tp % 2.6, n = Math.floor(tp / 2.6); push = (n % 2 ? -1 : 1) * deg(7) * (k / 0.18 < 1 ? k / 0.18 : Math.exp(-(k - 0.18) * 2.8) * Math.cos((k - 0.18) * 6)); }
  const kf = lerp(B.kneeB ?? 4, B.kneeT ?? 4, s);
  const lean = deg(lerp(B.leanB ?? 3, B.leanT ?? 3, s)) + swayF;
  const r = uprightR(lean, { neckK: 0.5 });
  r.pelvis = qZ(sway * 0.6 + push * 0.5).multiply(r.pelvis);
  r.chest = qZ(push * 0.5).multiply(r.chest);
  const q = r.pelvis;
  // tabla de equilibrio: inclinación lateral que cambia con el tiempo
  const tilt = B.board ? deg(6 * Math.sin(t * 1.25) + 2 * Math.sin(t * 2.9)) : 0;
  const footOn = (x, z) => {
    const y = sy + AH + (B.board ? x * Math.sin(tilt) : 0);
    return V3(x * (B.board ? Math.cos(tilt) : 1), y, z);
  };
  const A = {}, Q = {};
  const W = both ? (B.width ?? 0.12) : 0.05;
  A[st] = footOn(sxOf(st) * W, 0); Q[st] = qZ(B.board ? tilt : 0).multiply(qY(sxOf(st) * deg(6)));
  if (both) { A[fr] = footOn(sxOf(fr) * W, 0); Q[fr] = qZ(B.board ? tilt : 0).multiply(qY(sxOf(fr) * deg(6))); }
  const k = Math.sqrt(sk.LT ** 2 + sk.LS ** 2 + 2 * sk.LT * sk.LS * Math.cos(deg(kf))) / (sk.LT + sk.LS);
  const px = both ? 0 : sxOf(st) * 0.05 + Math.sin(sway) * 0.02, pz = -0.03 - (kf / 90) * 0.12;
  let y = maxPelvisY(sk, q, px, pz, st, A[st], Math.min(k, 0.995));
  if (both) y = Math.min(y, maxPelvisY(sk, q, px, pz, fr, A[fr], Math.min(k, 0.995)));
  const pelvisPos = V3(px, y, pz);
  const P = sk.trunk(pelvisPos, r);
  sk.leg(P, st, A[st], Q[st], V3(sxOf(st) * 0.05, 0, 1), 0);
  if (both) sk.leg(P, fr, A[fr], Q[fr], V3(sxOf(fr) * 0.05, 0, 1), 0);
  else {
    const fl = B.freeLeg || 'back';
    if (fl === 'back') legByAngles(sk, P, fr, 4, lerp(70, 85, s), 25);
    else if (fl === 'front') legByAngles(sk, P, fr, lerp(40, 75, s), lerp(70, 90, s), 15);
    else if (fl === 'knee') legByAngles(sk, P, fr, lerp(30, 95, s), lerp(60, 95, s), 15);
    else if (fl === 'reach') {
      // Y-balance: la punta del pie libre toca el suelo lejos, en una dirección distinta en cada repetición
      const dirs = [[0, 0.62], [sxOf(st) * 0.38, -0.48], [-sxOf(st) * 0.50, -0.40]];
      const rp = cfg._kind === 'orbit' ? 0 : (cfg._rep ?? 0) % 3;
      const d = dirs[rp];
      const target = V3(sxOf(fr) * 0.08 + d[0] * s, AH + 0.01 + (1 - s) * 0.10, d[1] * s);
      const ts = toeStance(sk, fr, target.clone().setY(0.018), 0);
      const aq = d[1] < 0 ? qX(deg(35)) : qX(deg(-10));
      sk.leg(P, fr, target, qY(sxOf(fr) * deg(8)).multiply(aq), V3(0, 0.2, 1), 0);
    }
  }
  // brazos
  const load = { mass: 0, fband: [], dyn: {} };
  const am = B.armMode || 'hips';
  if (am === 'hips') Object.assign(load, squatArms(sk, { ...cfg, arms: 'hips' }, P, s), { fband: [], dyn: {} });
  else {
    for (const sd of ['L', 'R']) {
      const sx = sxOf(sd), S = sk.shoulder(P, sd);
      let Wr, palm = V3(0, -1, 0), fing = V3(sx, 0, 0), pole = V3(sx * 0.5, -0.6, -0.4);
      if (am === 'out') { Wr = S.clone().add(V3(sx * 0.55, -0.05, 0.02)); }
      else if (am === 'swing') {
        // brazos que suben por delante hasta arriba y bajan
        const a = Math.PI * lerp(0.05, 0.95, (Math.sin(t * 2.0 + (sd === 'L' ? 0 : Math.PI)) + 1) / 2);
        Wr = S.clone().add(V3(sx * 0.06, -Math.cos(a) * 0.56, Math.sin(a) * 0.56 * 0.85));
        palm = V3(-sx, 0, 0); fing = V3(0, -Math.cos(a), Math.sin(a));
      } else if (am === 'ball') {
        // lanzar y recibir un balón delante del pecho
        const ph = (t * 0.9) % 1, up = Math.sin(Math.PI * ph);
        const C = sk.chestPoint(P, V3(0, 1.30, 0.30)).add(V3(0, 0, 0.10 * up));
        Wr = C.clone().add(V3(sx * 0.12, -0.02, 0));
        palm = V3(-sx, 0, 0); fing = V3(0, 0.3, 1);
        load.dyn.ball = { p: C.clone().add(V3(0, 0.05 + 0.38 * Math.max(0, Math.sin(Math.PI * ph)) ** 1.2, 0.12 + 0.25 * up)), q: qX(t * 4) };
      }
      armTo(sk, P, sd, Wr, pole, palm, fing);
    }
  }
  if (B.board) load.dyn.board = { p: V3(0, sy - 0.0125, 0), q: qZ(tilt) };
  return { P, load, pelvisPos, lean };
}

// ------------------------------------------------------------------ de lado (clamshell, abducción tumbado)
// Tumbado sobre el lado 'down', cabeza hacia +x (si down = L), pecho mirando a +z.
function sideLying(sk, cfg, s) {
  const B = cfg.free;
  const dn = B.down || 'L', up = other(dn), sd0 = sxOf(dn);
  const r = { pelvis: qZ(-sd0 * Math.PI / 2), lumbar: qZ(sd0 * deg(B.bend ?? 4)), chest: qZ(sd0 * deg(B.bend ?? 4)), neck: qZ(sd0 * deg(6)), head: ID() };
  const q = r.pelvis;
  const hipY = (B.floorY ?? 0.012) + 0.088;
  const o = rot(q, sk.o['hip_' + dn]);
  const pelvisPos = V3(B.px ?? -0.12, hipY - o.y, 0);
  const P = sk.trunk(pelvisPos, r);
  const flex = B.flex ?? 45, knee = B.knee ?? 90;
  legByAngles(sk, P, dn, flex, knee, 10);
  // pierna de arriba: tobillo fijo y la rodilla gira alrededor del eje cadera‑tobillo (clamshell)
  const H = P['hip_' + up];
  const base = P.pelvis.q.clone().multiply(qZ(sxOf(up) * deg(-3))).multiply(qX(-deg(flex)));
  const thQ = base.clone(), shQ = base.clone().multiply(qX(deg(knee)));
  const K0 = H.clone().add(rot(thQ, V3(0, -sk.LT * 0.999, 0)));
  const A0 = K0.clone().add(rot(shQ, V3(0, -sk.LS * 0.999, 0)));
  const pole0 = rot(thQ, V3(0, 0, 1));
  const mode = B.mode || 'clam';
  if (mode === 'clam') {
    const ax = A0.clone().sub(H).normalize();
    let ang = deg(lerp(0, B.open ?? 48, s));
    const tryQ = (a) => rot(new THREE.Quaternion().setFromAxisAngle(ax, a), pole0);
    let pole = tryQ(ang); if (pole.y < pole0.y) pole = tryQ(-ang);
    const fq = shQ.clone().multiply(qX(deg(10)));
    sk.leg(P, up, A0, fq, pole, 0);
  } else {
    // abducción con la pierna de arriba estirada
    const d = rot(P.pelvis.q.clone().multiply(qZ(sxOf(up) * deg(lerp(0, B.abd ?? 35, s)))).multiply(qX(-deg(B.legFlex ?? 8))), V3(0, -1, 0));
    legStraight(sk, P, up, d, rot(P.pelvis.q, V3(0, 0, 1)), 10);
  }
  // brazos: el de abajo estirado bajo la cabeza, el de arriba apoyado delante del pecho
  const head = rot(q, V3(0, 1, 0)), front = V3(0, 0, 1);
  const Sd = sk.shoulder(P, dn);
  armTo(sk, P, dn, Sd.clone().add(head.clone().multiplyScalar(0.50)).setY(0.055), V3(0, -1, 0.2), V3(0, 0, 1), head.clone());
  const Su = sk.shoulder(P, up);
  const Wu = Su.clone().add(head.clone().multiplyScalar(-0.02)).add(V3(0, 0, 0.30)).setY(0.04);
  armTo(sk, P, up, Wu, V3(0, 0.3, 1), V3(0, -1, 0), head.clone());
  const load = { mass: 0, fband: [], dyn: {} };
  if (B.kneeBand) load.fband.push(...kneeBand(P));
  if (B.dbThigh) {
    const k = P['knee_' + up], h = P['hip_' + up];
    load.dbs = [k.clone().lerp(h, 0.40).add(V3(0, 0.075, 0))];
    load.dbq = new THREE.Quaternion().setFromUnitVectors(V3(1, 0, 0), V3(0, 0, 1));
  }
  return { P, load, pelvisPos, lean: 0 };
}

// ------------------------------------------------------------------ aterrizaje de salto (landing mechanics)
// BAJADA: contramovimiento, despegue, vuelo y aterrizaje amortiguado; SUBIDA: se levanta desde la posición de aterrizaje.
function landing(sk, cfg, s, cache) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const dep = B.depth ?? 0.55, cm = B.cm ?? 0.40, h = B.height ?? 0.20;
  let ss = dep * s, dy = 0, tilt = 0;
  if (!cfg._up && cfg._kind === 'rep') {
    if (s < 0.25) ss = cm * smooth(s / 0.25);
    else if (s < 0.40) { const u = (s - 0.25) / 0.15; ss = cm * (1 - smooth(u)); tilt = -18 * smooth(u); dy = 0.03 * u; }
    else if (s < 0.74) { const u = (s - 0.40) / 0.34; ss = 0.02; dy = 0.03 + h * 4 * u * (1 - u) * 1.0 - 0.03 * u; tilt = -18 * (1 - u) - 4 * u; }
    else { const u = (s - 0.74) / 0.26; ss = dep * Math.sin(u * Math.PI / 2); tilt = -4 * (1 - Math.min(1, u * 4)); }
  }
  const c = { ...cfg, ankleY: AH + Math.max(0, dy), plateTilt: tilt };
  delete c.free;
  return squatPose(sk, c, ss, {});
}

// ------------------------------------------------------------------ prensa de piernas a 45° (bilateral o a una pierna)
// s = 0 piernas casi extendidas, s = 1 rodillas flexionadas (plataforma abajo)
function legPress(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const rec = deg(B.recline ?? 48);
  const r = { pelvis: qX(-rec), lumbar: ID(), chest: qX(deg(4)), neck: qX(rec * 0.55), head: qX(rec * 0.15) };
  const pelvisPos = V3(0, B.seatY ?? 0.42, 0);
  const P = sk.trunk(pelvisPos, r);
  const ang = deg(B.legAng ?? 42);
  const d = V3(0, Math.sin(ang), Math.cos(ang));
  const up = V3(0, Math.cos(ang), -Math.sin(ang));
  const hm = P.hip_L.clone().add(P.hip_R).multiplyScalar(0.5);
  const dist = lerp(B.dTop ?? 0.86, B.dBot ?? 0.50, s);
  const C = hm.clone().add(d.clone().multiplyScalar(dist)).add(up.clone().multiplyScalar(B.footUp ?? 0.04));
  const work = B.single ? [B.single] : ['L', 'R'];
  const fw = B.footW ?? 0.14;
  const fq0 = basisQuat(d.clone().negate(), up);
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    if (!work.includes(sd)) { legByAngles(sk, P, sd, B.restFlex ?? 42, B.restKnee ?? 88, 10, B.restAbd ?? 30); continue; }
    const fq = qY(0).multiply(fq0).multiply(qY(sx * deg(B.toeOut ?? 8)));
    const sole = C.clone().add(V3(B.single ? sx * 0.02 : sx * fw, 0, 0));
    const ankle = sole.clone().sub(rot(fq, V3(0, -AH, 0.065)));
    sk.leg(P, sd, ankle, fq, up.clone().add(V3(sx * (B.kneeOut ?? 0.12), 0, 0)), 0);
  }
  const pq = new THREE.Quaternion().setFromUnitVectors(V3(0, 0, 1), d);
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    gripTo(sk, P, sd, P.pelvis.p.clone().add(V3(sx * 0.30, -0.02, 0.10)), V3(0, 0, 1), V3(-sx, 0, 0), V3(sx * 0.6, -0.3, -1));
  }
  return { P, load: { mass: 0, fband: [], dyn: { sled: { p: C.clone().add(d.clone().multiplyScalar(0.007)), q: pq, d } } }, pelvisPos, lean: -rec };
}

// ------------------------------------------------------------------ saltos por fotogramas clave (pliometría)
// Cada clave: { u, L: [x, y, z, pitch], R: [...], k, pz, px, lean, arm }  (y = altura del tobillo sobre su posición de pie;
// pitch > 0 = puntas hacia abajo; k = fracción de la longitud de la pierna más exigida; arm = ángulo de los brazos, 0 abajo, 90 al frente)
// B.down: claves de la fase BAJADA (s 0→1); B.up: claves de la fase SUBIDA (de la posición de pausa a la inicial).
function kfInterp(keys, u) {
  if (u <= keys[0].u) return keys[0];
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i];
    if (u <= b.u) {
      const f = (b.ease === 'lin') ? (u - a.u) / (b.u - a.u) : smooth((u - a.u) / (b.u - a.u));
      const o = { u };
      for (const key of ['k', 'pz', 'px', 'lean', 'arm', 'armOut', 'yaw']) o[key] = lerp(a[key] ?? 0, b[key] ?? 0, f);
      if (a.P && b.P) o.P = a.P.map((v, j) => lerp(v, b.P[j], f) + (j === 1 && b.arcP ? b.arcP * 4 * ((u - a.u) / (b.u - a.u)) * (1 - (u - a.u) / (b.u - a.u)) : 0));
      for (const sd of ['L', 'R']) o[sd] = (a[sd] || [0, 0, 0, 0]).map((v, j) => {
        const w = (b[sd] || [0, 0, 0, 0])[j];
        // la altura del pie puede seguir una parábola entre dos claves (vuelo)
        if (j === 1 && b.arc) return lerp(v, w, (b.ease === 'lin') ? (u - a.u) / (b.u - a.u) : f) + b.arc * 4 * ((u - a.u) / (b.u - a.u)) * (1 - (u - a.u) / (b.u - a.u));
        return lerp(v, w, f);
      });
      o.free = (f < 0.5 ? a.free : b.free);
      return o;
    }
  }
  return keys[keys.length - 1];
}
function jumpKF(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  let K;
  const ri = cfg._rep ?? 0;
  const DN = B.repDown ? B.repDown[ri % B.repDown.length] : B.down;
  const UPK = B.repUp ? B.repUp[ri % B.repUp.length] : B.up;
  if (cfg._kind === 'rep' && cfg._up) K = kfInterp(UPK, 1 - s);
  else K = kfInterp(DN, s);
  const w = B.stance ?? 0.14, toe = deg(B.toeOut ?? 8);
  const zOff = (B.travel ?? 0) * Math.min(cfg._rep ?? 0, B.travelMax ?? 9), xOff = (B.travelX ?? 0) * Math.min(cfg._rep ?? 0, B.travelMax ?? 9);
  const A = {}, fq = {};
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), f = K[sd] || [0, 0, 0, 0];
    A[sd] = V3(sx * w + f[0] + xOff, AH + f[1], f[2] + zOff);
    fq[sd] = qX(deg(f[3] || 0)).multiply(qY(sx * toe));
  }
  const lean = deg(K.lean ?? 3);
  const yawD = K.yaw ?? 0, qy = qY(deg(yawD));
  const r = uprightR(lean, { neckK: 0.5, yaw: yawD });
  const q = r.pelvis;
  const free = K.free !== undefined ? K.free : (B.free ?? null);   // pierna que no apoya (saltos a una pierna)
  const sup = free ? [other(free)] : ['L', 'R'];
  if (yawD) {
    // giro sobre el eje vertical: los pies giran alrededor del centro de apoyo
    const cx = sup.reduce((a, sd) => a + A[sd].x, 0) / sup.length, cz = sup.reduce((a, sd) => a + A[sd].z, 0) / sup.length;
    for (const sd of ['L', 'R']) { const d = rot(qy, V3(A[sd].x - cx, 0, A[sd].z - cz)); A[sd].x = cx + d.x; A[sd].z = cz + d.z; fq[sd] = qy.clone().multiply(fq[sd]); }
  }
  const px = sup.reduce((a, sd) => a + A[sd].x, 0) / sup.length + (K.px ?? 0);
  const pz = sup.reduce((a, sd) => a + A[sd].z, 0) / sup.length + (K.pz ?? 0);
  let y = Infinity;
  for (const sd of sup) y = Math.min(y, maxPelvisY(sk, q, px, pz, sd, A[sd], Math.min(0.997, K.k ?? 0.985)));
  let pelvisPos = V3(px, y, pz);
  if (K.P) {
    // pelvis absoluta: altura relativa a la de pie
    const yStand = maxPelvisY(sk, q, 0, 0, 'L', V3(w, AH, 0), 0.985);
    pelvisPos = V3((K.P[0] ?? 0) + xOff, yStand + K.P[1], K.P[2] + zOff);
  }
  const P = sk.trunk(pelvisPos, r);
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    if (free === sd) {
      const f = K[sd] || [0, 0, 0, 0];
      // pierna libre: flexión de cadera f[0] y de rodilla f[1] (grados) en el marco de la pelvis
      legByAngles(sk, P, sd, f[2] ?? 10, f[1] ?? 60, f[3] ?? 15);
      continue;
    }
    sk.leg(P, sd, A[sd], fq[sd], rot(fq[sd], V3(sx * (B.kneeOut ?? 0.08), 0, 1)), 0);
  }
  // brazos: oscilan en el plano sagital
  const a = deg(K.arm ?? 0), ao = K.armOut ?? 0;
  const load = { mass: 0, fband: [], dyn: {} };
  if (B.armsHips) Object.assign(load, squatArms(sk, { ...cfg, arms: 'hips' }, P, s), { fband: [], dyn: {} });
  else for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), S = sk.shoulder(P, sd);
    const dir = rot(qy, V3(sx * (0.10 + ao), -Math.cos(a), Math.sin(a)).normalize());
    const Wr = S.clone().add(dir.clone().multiplyScalar(0.53));
    armTo(sk, P, sd, Wr, rot(qy, V3(sx * 0.3, -0.3, -1).add(V3(0, Math.sin(a) * 0.8, 0))), rot(qy, V3(-sx, 0, 0)), dir);
  }
  if (B.beltBand) for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), b = P.pelvis.p.clone().add(rot(P.pelvis.q, V3(sx * 0.12, -0.03, 0.04)));
    load.fband.push([V3(sx * 0.30 + (B.beltBandX ?? 0), 0.02, b.z), b]);
  }
  return { P, load, pelvisPos, lean };
}

// ------------------------------------------------------------------ pose general por fotogramas clave
// Claves (todas interpoladas; las listas se interpolan elemento a elemento):
//  P: [x, y, z] pelvis (mundo)          rot: [pitch, yaw, roll] de la pelvis (grados; pitch + = hacia delante)
//  sp: [pitch, yaw, roll] columna (lumbar + pecho a partes iguales)    nk: [pitch, yaw] cuello
//  L / R: tobillo [x, y, z, pitch, yaw]  (pitch + = puntas abajo)      kL / kR: dirección de la rodilla [x, y, z]
//  lL / lR: pierna por ángulos [flex, rodilla, tobillo, abd]
//  hL / hR: muñeca [x, y, z]            eL / eR: dirección del codo     pL / pR: palma [x,y,z] y dedos [x,y,z]
//  aL / aR: brazo por ángulos [flexión hombro, abducción, codo]
function kfAll(keys, u) {
  if (u <= keys[0].u) return keys[0];
  if (u >= keys[keys.length - 1].u) return keys[keys.length - 1];
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i];
    if (u <= b.u) {
      const g = (u - a.u) / (b.u - a.u), f = b.ease === 'lin' ? g : smooth(g);
      const o = { u };
      const ks = new Set([...Object.keys(a), ...Object.keys(b)]);
      for (const k of ks) {
        if (k === 'u' || k === 'ease') continue;
        const va = a[k] ?? b[k], vb = b[k] ?? a[k];
        if (Array.isArray(va)) o[k] = va.map((x, j) => lerp(x, vb[j] ?? x, f) + (k === 'P' && j === 1 && b.arc ? b.arc * 4 * g * (1 - g) : 0));
        else if (typeof va === 'number') o[k] = lerp(va, vb, f);
        else o[k] = f < 0.5 ? va : vb;
      }
      return o;
    }
  }
}
const kfNorm = (keys) => keys.map((k, i) => { if (!i) return k; const prev = { ...keys[i - 1] }; delete prev.ease; delete prev.arc; return k; }).reduce((acc, k, i) => {
  if (!i) { acc.push(k); return acc; }
  const prev = { ...acc[i - 1] }; delete prev.ease; delete prev.arc; acc.push({ ...prev, ...k }); return acc; }, []);
function kfMirror(K) {
  const o = { ...K };
  const nx = (a) => a && a.map((v, j) => (j === 0 ? -v : v));
  for (const [a, b] of [['L', 'R'], ['kL', 'kR'], ['lL', 'lR'], ['hL', 'hR'], ['eL', 'eR'], ['pL', 'pR'], ['aL', 'aR']]) {
    const va = K[a], vb = K[b];
    const conv = (v) => { if (!v) return v; if (a === 'lL' || a === 'aL') return v; if (a === 'pL') return v.map((x, j) => (j === 0 || j === 3 ? -x : x)); if (a === 'L') return v.map((x, j) => (j === 0 || j === 4 ? -x : x)); return nx(v); };
    o[a] = conv(vb); o[b] = conv(va);
  }
  if (K.P) o.P = nx(K.P);
  if (K.rot) o.rot = [K.rot[0], -K.rot[1], -K.rot[2]];
  if (K.sp) o.sp = [K.sp[0], -K.sp[1], -K.sp[2]];
  if (K.nk) o.nk = [K.nk[0], -(K.nk[1] ?? 0)];
  return o;
}
function kfPose(sk, cfg, s) {
  const B = cfg.free, AH = sk.ANKLE_H;
  if (!B._norm) { B.keys = kfNorm(B.keys); if (B.up) B.up = kfNorm(B.up); if (B.repKeys) B.repKeys = B.repKeys.map(kfNorm); B._norm = true; }
  const KEYS = (B.repKeys && cfg._kind === 'rep') ? B.repKeys[(cfg._rep ?? 0) % B.repKeys.length] : B.keys;
  let K;
  if (B.loop) K = kfAll(KEYS, ((cfg._t ?? 0) / B.loop) % 1);
  else if (cfg._kind === 'rep' && cfg._up && B.up) K = kfAll(B.up, 1 - s);
  else K = kfAll(KEYS, s);
  if (B.alt && ((cfg._rep ?? 0) % 2 === 1) && cfg._kind === 'rep') K = kfMirror(K);
  const zOff = (B.travel ?? 0) * Math.min(cfg._rep ?? 0, B.travelMax ?? 9);
  const ro = (K.rot || [0, 0, 0]).map(deg), sp = (K.sp || [0, 0, 0]).map(deg), nk = (K.nk || [0, 0]).map(deg);
  const half = (a, b, c) => qX(a / 2).multiply(qY(b / 2)).multiply(qZ(c / 2));
  const r = { pelvis: qY(ro[1]).multiply(qX(ro[0])).multiply(qZ(ro[2])), lumbar: half(sp[0], sp[1], sp[2]), chest: half(sp[0], sp[1], sp[2]),
    neck: qX(nk[0]).multiply(qY(nk[1])), head: qX(nk[0] * 0.3) };
  let py = K.P[1];
  if (B.relY) py += maxPelvisY(sk, r.pelvis, K.P[0], K.P[2], B.relY, V3(sxOf(B.relY) * 0.09, AH, 0), 0.985);
  const pelvisPos = V3(K.P[0], py, K.P[2] + zOff);
  const P = sk.trunk(pelvisPos, r);
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    if (K['l' + sd]) { const a = K['l' + sd]; legByAngles(sk, P, sd, a[0], a[1], a[2] ?? 0, a[3] ?? 0, a[4] ?? 0); continue; }
    const f = K[sd]; if (!f) continue;
    const fq = qY(deg(f[4] ?? sx * 6)).multiply(qX(deg(f[3] ?? 0)));
    const pole = K['k' + sd] ? V3(...K['k' + sd]) : rot(fq, V3(sx * 0.08, 0, 1));
    sk.leg(P, sd, V3(f[0], f[1], f[2] + zOff), fq, pole.normalize(), 0);
  }
  let armLoad = null;
  const grips = {};
  if (B.arms) armLoad = squatArms(sk, { ...cfg, arms: B.arms }, P, s);
  const shift = (K.shr || K.shz) ? V3(0, K.shr ?? 0, -(K.shr ?? 0) * 0.3 + (K.shz ?? 0)) : null;
  for (const sd of (B.arms ? [] : ['L', 'R'])) {
    const sx = sxOf(sd), S = sk.shoulder(P, sd, shift || V3());
    let W, pole, palm, fing;
    if (K['h' + sd]) {
      const h = K['h' + sd]; W = V3(h[0], h[1], h[2] + zOff);
      pole = K['e' + sd] ? V3(...K['e' + sd]) : V3(sx * 0.6, -0.4, -0.6);
    } else {
      const a = K['a' + sd] || [0, 8, 10];
      const cq = P.chest.q;
      const d1 = rot(cq, rot(qZ(sx * deg(a[1])).multiply(qX(-deg(a[0]))), V3(0, -1, 0)));
      const bendAx = rot(cq, rot(qZ(sx * deg(a[1])).multiply(qX(-deg(a[0]))), V3(1, 0, 0)));
      const d2 = d1.clone().applyAxisAngle(bendAx, -deg(a[2]));
      const gOff = (B.hold === 'bar' || B.hold === 'db' || B.hold === 'db1' || B.hold === 'grip' || B.hold === 'plate') ? 0.10 : 0;
      W = S.clone().add(d1.clone().multiplyScalar(sk.LUA * 0.999)).add(d2.clone().multiplyScalar(sk.LFA * 0.999 + gOff));
      pole = d1.clone().sub(d2).normalize();
      if (pole.lengthSq() < 1e-4) pole = rot(cq, V3(0, 0, -1));
    }
    const pp = K['p' + sd];
    palm = pp ? V3(pp[0], pp[1], pp[2]) : V3(-sx, 0, 0);
    fing = pp ? V3(pp[3], pp[4], pp[5]) : W.clone().sub(S).normalize();
    if ((B.hold === 'bar' || B.hold === 'db' || B.hold === 'db1' || B.hold === 'grip' || B.hold === 'plate') && (!B.holdSides || B.holdSides.includes(sd))) {
      // W es el punto de agarre; el eje del implemento va en pp[3..5] (por defecto X)
      const ax = pp ? V3(pp[3], pp[4], pp[5]).normalize() : V3(1, 0, 0);
      gripTo(sk, P, sd, W, ax, palm.normalize(), pole.normalize(), shift);
      grips[sd] = W.clone();
    } else armTo(sk, P, sd, W, pole.normalize(), palm.normalize(), fing.normalize(), shift);
  }
  const load = { ...(armLoad || {}), mass: 0, fband: [], dyn: {} };
  if (B.hold === 'bar' && grips.L && grips.R) load.bar = { p: grips.L.clone().add(grips.R).multiplyScalar(0.5), q: new THREE.Quaternion() };
  if (K.hand) load.hands = (B.handSides || ['L', 'R']).length === 2 ? [K.hand, K.hand] : (B.handSides[0] === 'L' ? [K.hand, B.otherHand || 'open'] : [B.otherHand || 'open', K.hand]);
  if (B.sidePlates) load.dyn.sidePlates = ['L', 'R'].map((sd) => (grips[sd] || P['wrist_' + sd]).clone().add(V3(0, -0.11, 0)));
  if (B.hangPlate && K.hp) load.dyn.hangPlate = V3(...K.hp);
  if (B.hold === 'plate' && grips.L && grips.R) {
    const c = grips.L.clone().add(grips.R).multiplyScalar(0.5), n = K.pn ? V3(...K.pn).normalize() : V3(0, 0, 1);
    load.dyn.plate = { p: c.add(V3(0, -0.13, 0)), q: new THREE.Quaternion().setFromUnitVectors(V3(1, 0, 0), n) };
  }
  if (B.hold === 'db1' && grips.L && grips.R) {
    const ax = K.dax ? V3(...K.dax) : (B.dbAxis ? V3(...B.dbAxis) : V3(0, 1, 0));
    load.dbs = [grips.L.clone().add(grips.R).multiplyScalar(0.5)]; load.dbq = new THREE.Quaternion().setFromUnitVectors(V3(1, 0, 0), ax.normalize());
  }
  if (B.hold === 'db') {
    const sides = B.holdSides || ['L', 'R'], s0 = sides[0];
    const ax = K['p' + s0] ? V3(K['p' + s0][3], K['p' + s0][4], K['p' + s0][5]).normalize() : V3(1, 0, 0);
    load.dbs = sides.map((sd) => grips[sd]).filter(Boolean); load.dbq = new THREE.Quaternion().setFromUnitVectors(V3(1, 0, 0), ax);
  }
  const ptOf = (v) => {
    if (typeof v !== 'string') return V3(...v);
    if (v === 'bar') return (grips.L && grips.R) ? grips.L.clone().add(grips.R).multiplyScalar(0.5) : P.chest.p.clone();
    if (v === 'beltL' || v === 'beltR') return P.pelvis.p.clone().add(rot(P.pelvis.q, V3(v === 'beltL' ? 0.12 : -0.12, -0.03, 0.06)));
    if (v.startsWith('K:')) return V3(...K[v.slice(2)]);
    if (v === 'kbTop') return P.pelvis.p.clone().add(V3(0, -0.36, 0.10));
    const sd = v.slice(1);
    if (v[0] === 'h') return (grips[sd] || P['wrist_' + sd]).clone();
    if (v[0] === 'k') return P['knee_' + sd].clone();
    if (v[0] === 'a') return P['ankle_' + sd].clone();
    return P.pelvis.p.clone();
  };
  if (B.beltKb) load.kb = { p: P.pelvis.p.clone().add(V3(0, -0.50, 0.10)), q: new THREE.Quaternion() };
  if (B.handKb) {
    const sd = B.handKb, g = (grips[sd] || P['wrist_' + sd]).clone(), pp = K['p' + sd];
    const up = pp ? V3(pp[0], pp[1], pp[2]).normalize() : V3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(V3(0, 1, 0), up);
    load.kb = { p: g.sub(rot(q, V3(0, 0.066, 0))), q };
  }
  if (B.rods) load.dyn.rods = B.rods.map((r) => {
    const a = ptOf(r.from), b = ptOf(r.to);
    if (r.ext) b.add(b.clone().sub(a).normalize().multiplyScalar(r.ext));
    return [a, b];
  });
  if (B.handles) load.dyn.handles = B.handles.map((sd) => {
    const pp = K['p' + sd], ax = pp ? V3(pp[3], pp[4], pp[5]).normalize() : V3(1, 0, 0);
    return { p: (grips[sd] || P['wrist_' + sd]).clone(), q: new THREE.Quaternion().setFromUnitVectors(V3(1, 0, 0), ax) };
  });
  if (B.wheel && B.wheelAt) load.dyn.wheel = ptOf(B.wheelAt);
  if (B.sliderAt) load.dyn.sliders = B.sliderAt.map((v) => ptOf(v).setY(0));
  if (B.ball && B.ballAt) load.dyn.ball = { p: ptOf(B.ballAt), q: new THREE.Quaternion() };
  if (B.ball2 && B.ball2At) load.dyn.ball2 = { p: ptOf(B.ball2At), q: new THREE.Quaternion() };
  if (B.bands) for (const bd of B.bands) load.fband.push([ptOf(bd.anchor), bd.to ? ptOf(bd.to) : (grips[bd.hand] || P['wrist_' + bd.hand]).clone()]);
  if (B.kneeBand) load.fband.push(...kneeBand(P));
  if (B.bandAnkle) load.fband.push([V3(...B.bandAnkle.anchor), P['ankle_' + B.bandAnkle.side].clone().add(V3(0, 0.02, 0.02))]);
  if (B.bandAnkles) load.fband.push([P.ankle_L.clone().add(V3(0, 0.03, 0)), P.ankle_R.clone().add(V3(0, 0.03, 0))]);
  return { P, load, pelvisPos, lean: ro[0] };
}


// ------------------------------------------------------------------ carrera (cinta: la pelvis no avanza, el suelo y los conos sí)
// Perfiles por tiempo: speeds [[t, v], ...] en m/s y leans [[t, grados], ...]; loop repite el perfil.
function profAt(pr, t, loop) {
  if (!pr || !pr.length) return 0;
  if (loop) t = t % loop;
  if (t <= pr[0][0]) return pr[0][1];
  for (let i = 1; i < pr.length; i++) if (t <= pr[i][0]) { const a = pr[i - 1], b = pr[i]; return lerp(a[1], b[1], smooth((t - a[0]) / Math.max(1e-6, b[0] - a[0]))); }
  return pr[pr.length - 1][1];
}
function run(sk, cfg, s, cache) {
  const B = cfg.free, AH = sk.ANKLE_H;
  const t = cfg._t ?? 0, loop = B.loop ?? 0;
  const vmax = B.speed ?? 6;
  const vAt = (tt) => (B.speeds ? profAt(B.speeds, tt, loop) : vmax * smooth(clamp((tt - 0.4) / 1.2, 0, 1)));
  // perfiles escalonados: carrera de espaldas (backs) y desplazamiento lateral (shuffles: 1 = hacia la izquierda, −1 = derecha)
  const stepAt = (pr, tt) => { const x = loop ? ((tt % loop) + loop) % loop : tt; let r = pr[0][1]; for (const [k, val] of pr) if (k <= x) r = val; return r; };
  const dirAt = (tt) => (B.backs ? stepAt(B.backs, tt) : (B.backward ? -1 : 1));
  const shufAt = (tt) => (B.shuffles ? stepAt(B.shuffles, tt) : (B.shuffle ?? 0));
  const cadAt = (tt) => { const v = vAt(tt); if (shufAt(tt)) return B.shufCad ?? (3.6 + 0.3 * v); return B.cadence ?? ((B.cad0 ?? 2.2) + (B.cadK ?? 0.22) * v); };
  // fase acumulada del ciclo de pierna (integración numérica, con caché por instancia)
  const dt = 1 / 120;
  if (!cache.run || cache.run.t > t) cache.run = { t: 0, ph: 0 };
  while (cache.run.t + dt <= t) { const tt = cache.run.t + dt / 2; cache.run.ph += cadAt(tt) / 2 * dt; cache.run.t += dt; }
  const ph = cache.run.ph + cadAt(t) / 2 * (t - cache.run.t);
  const v = vAt(t), cad = cadAt(t), T = 2 / cad;
  const still = v < 0.05 && B.inPlace === undefined;
  const beta = B.stance ?? clamp(0.62 - 0.045 * v, 0.24, 0.6);
  const dir = dirAt(t), shuf = shufAt(t);
  const a = (B.inPlace || shuf ? 0 : v * beta * T / 2) * dir;
  const knee = B.knee ?? clamp(0.45 + 0.08 * v, 0.4, 1.0), heel = B.heel ?? clamp(0.30 + 0.07 * v, 0.25, 0.95);
  const W = B.width ?? 0.09;
  const act = still ? 0 : (B.inPlace ? 1 : clamp(v / 1.5, 0, 1));
  const foot = {};
  let stanceW = null;
  for (const sd of ['L', 'R']) {
    const f = B.oneLeg && sd !== B.oneLeg ? 0 : ((ph + (sd === 'L' ? 0 : 0.5)) % 1 + 1) % 1;
    let z, y = 0, pitch = 0, sw = false;
    if (shuf) {
      // paso lateral (sin cruzar): la pierna avanza en el aire la mitad del ciclo y retrocede apoyada la otra mitad
      const sL = v * T, lift = (B.shufLift ?? 0.06) * act;
      let x;
      let zc = 0;
      if (f < 0.5) {
        const u = f / 0.5; x = lerp(-sL / 4, sL / 4, smooth(u)); y = lift * Math.sin(Math.PI * u); sw = true;
        // carioca: el pie que se mueve cruza por delante y por detrás de forma alterna
        if (B.carioca) { const cyc = Math.floor(ph + (sd === 'L' ? 0 : 0.5)); zc = (cyc % 2 ? 1 : -1) * 0.13 * Math.sin(Math.PI * u); }
      } else { const w = (f - 0.5) / 0.5; x = lerp(sL / 4, -sL / 4, w); stanceW = stanceW ?? w; }
      foot[sd] = { z: zc, y, pitch: 0, sw, x: x * shuf };
      continue;
    }
    if (f < beta) { const w = f / beta; z = a - 2 * a * w; pitch = B.inPlace ? 0 : 14 * smooth(clamp((w - 0.6) / 0.4, 0, 1)); stanceW = stanceW ?? w; }
    else {
      sw = true;
      const u = (f - beta) / (1 - beta);
      // trayectoria del tobillo respecto a la pelvis: talón atrás → rodilla delante → apoyo
      const pts = [[0, -a, 0], [0.32, -a * 0.35 - 0.10 * dir * act, (0.05 + heel * 0.42) * act], [0.66, (0.10 + 0.20 * knee) * dir * act, (0.06 + knee * 0.30) * act], [1, a, 0]];
      let i = 1; while (u > pts[i][0]) i++;
      const p0 = pts[i - 1], p1 = pts[i], k = smooth((u - p0[0]) / (p1[0] - p0[0]));
      z = lerp(p0[1], p1[1], k); y = lerp(p0[2], p1[2], k);
      pitch = -12 * Math.sin(Math.PI * u) * act + (u < 0.3 ? 30 * (1 - u / 0.3) * act : 0);
    }
    if (B.lateralStep) z = 0;
    foot[sd] = { z, y, pitch, sw };
  }
  const lean = deg(B.leans ? profAt(B.leans, t, loop) : (B.lean ?? (3 + 1.4 * v)));
  const twist = (B.twist ?? 5) * Math.sin(2 * Math.PI * ph) * act;
  // giro del cuerpo (salidas laterales), bajada de cadera (frenadas) y pendiente (rampa)
  const yawD = B.yaws ? profAt(B.yaws, t, loop) : (B.yaw ?? 0), qy = qY(deg(yawD));
  const dyNow = B.dys ? profAt(B.dys, t, loop) : (B.dy ?? 0);
  const Wn = B.widths ? profAt(B.widths, t, loop) : W;
  const sl = Math.tan(deg(B.slope ?? 0)), h0 = B.slope ? (B.rampH ?? 0.5) : 0;
  const r = uprightR(lean * dir, { neckK: 0.6, twist: -twist, yaw: yawD });
  const bank = B.banks ? profAt(B.banks, t, loop) : (B.bank ?? 0);
  if (bank) r.pelvis = qY(deg(yawD)).multiply(qZ(deg(bank))).multiply(qX(lean * dir));
  const q = r.pelvis;
  // altura de pelvis: bajada en el apoyo y vuelo
  const y0 = maxPelvisY(sk, q, 0, 0, 'L', rot(qy, V3(Wn, AH, 0)), B.k ?? clamp(0.975 - 0.006 * v, 0.93, 0.975));
  const bob = stanceW !== null ? -(B.drop ?? (0.012 + 0.004 * v)) * Math.sin(Math.PI * stanceW) * act : (B.fly ?? 0.025) * act;
  const pelvisPos = V3(0, y0 + bob + dyNow + h0 + (B.pz ?? 0) * sl, B.pz ?? 0);
  const P = sk.trunk(pelvisPos, r);
  for (const sd of ['L', 'R']) {
    const F = foot[sd], sx = sxOf(sd);
    const fq = qy.clone().multiply(qY(sx * deg(B.toeOut ?? 4))).multiply(qX(deg(F.pitch)));
    const off = rot(qy, V3(sx * Wn + (F.x ?? 0), 0, F.z + (B.footZ ?? 0.04) * dir));
    const A = V3(off.x, AH + F.y + h0, pelvisPos.z + off.z);
    A.y += A.z * sl;
    if (B.lifts && sd === 'L') { const h = profAt(B.lifts, t, loop); A.y += h; A.add(rot(qy, V3(0, 0, h * 0.35))); }
    sk.leg(P, sd, A, fq, rot(qy, V3(sx * 0.06, 0.1, dir)), 0);
  }
  // brazos: codo a 90°, braceo contrario a las piernas
  const armA = deg(B.arm ?? clamp(25 + 6 * v, 25, 70)) * act * (shuf ? 0.3 : 1);
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd), S = sk.shoulder(P, sd);
    if (B.handsAt && (!B.handSides || B.handSides.includes(sd))) { const h = B.handsAt; const hp = B.handPalm || [0, 0, 1]; armTo(sk, P, sd, V3(sx * h[0], h[1], h[2]), V3(sx * 0.6, -1, -0.2).normalize(), V3(sx * hp[0], hp[1], hp[2]).normalize(), V3(0, 1, 0)); continue; }
    const th = armA * Math.cos(2 * Math.PI * (ph + (sd === 'L' ? 0.5 : 0)) - 0.6) * dir;
    const cq = P.chest.q;
    const d1 = rot(cq, V3(sx * 0.12, -Math.cos(th), Math.sin(th)).normalize());
    const el = deg(B.elbow ?? 85);
    const d2 = rot(cq, V3(0, -Math.cos(th + el), Math.sin(th + el)));
    const Wr = S.clone().add(d1.clone().multiplyScalar(sk.LUA * 0.999)).add(d2.clone().multiplyScalar(sk.LFA * 0.95));
    armTo(sk, P, sd, Wr, d1.clone().sub(d2).normalize(), rot(cq, V3(-sx, 0, 0)), d2.clone());
  }
  const load = { mass: 0, fband: [], dyn: {} };
  if (B.tether) for (const sd of (B.tether.two ? ['L', 'R'] : ['C'])) {
    const sx = sd === 'C' ? 0 : sxOf(sd);
    const from = P.pelvis.p.clone().add(rot(P.pelvis.q, V3(sx * 0.12, -0.02, -0.10)));
    load.fband.push([from, V3(B.tether.to[0] + sx * 0.10, B.tether.to[1], B.tether.to[2])]);
  }
  // conos que pasan a los lados para dar sensación de avance
  if (B.cones) {
    const n = B.cones.n ?? 6, d = B.cones.d ?? 5, xx = B.cones.x ?? 1.4;
    const dist = (cache.run.dist ??= { t: 0, z: 0, x: 0 });
    if (dist.t > t) { dist.t = 0; dist.z = 0; dist.x = 0; }
    const yw = (tt) => (B.yaws ? deg(profAt(B.yaws, tt, loop)) : 0);
    const mv = (tt) => yw(tt) + (shufAt(tt) ? deg(90) * shufAt(tt) : 0);
    const fz = (tt) => vAt(tt) * dirAt(tt) * Math.cos(mv(tt)), fx = (tt) => vAt(tt) * dirAt(tt) * Math.sin(mv(tt));
    while (dist.t + dt <= t) { const tm = dist.t + dt / 2; dist.z += fz(tm) * dt; dist.x += fx(tm) * dt; dist.t += dt; }
    const off = dist.z + fz(t) * (t - dist.t), offX = dist.x + fx(t) * (t - dist.t), W2 = 4 * Math.abs(xx);
    load.dyn.cones = [];
    for (let i = 0; i < n; i++) {
      const z = ((i * d - off) % (n * d) + n * d) % (n * d) - d;
      for (const sxx of (B.cones.both === false ? [1] : [1, -1])) {
        const x = B.cones.line !== undefined ? B.cones.line - offX : (B.yaws || B.shuffles || B.shuffle) ? ((((sxx * xx - offX + W2 / 2) % W2) + W2) % W2) - W2 / 2 : sxx * xx;
        load.dyn.cones.push(V3(x, Math.max(0, h0 + z * sl), z));
      }
    }
  }
  // escalera de agilidad que pasa por debajo con el avance
  if (B.ladder) {
    const fwd = (tt) => vAt(tt) * dirAt(tt) * Math.cos(deg((B.yaws ? profAt(B.yaws, tt, loop) : (B.yaw ?? 0)) + 90 * shufAt(tt)));
    const lad = (cache.run.lad ??= { t: 0, z: 0 });
    if (lad.t > t) { lad.t = 0; lad.z = 0; }
    while (lad.t + dt <= t) { lad.z += fwd(lad.t + dt / 2) * dt; lad.t += dt; }
    const off = lad.z + fwd(t) * (t - lad.t), d = B.ladder.d ?? 0.46;
    load.dyn.ladderZ = -(((off % d) + d) % d) + (B.ladder.z ?? 0);
  }
  // marcas que llegan con el avance y quedan delante al frenar (obstáculo, cono de parada)
  if (B.marks) {
    const fwd = (tt) => vAt(tt) * dirAt(tt) * Math.cos(deg((B.yaws ? profAt(B.yaws, tt, loop) : (B.yaw ?? 0)) + 90 * shufAt(tt)));
    const distTo = (t1) => { let z = 0; for (let tt = 0; tt < t1; tt += dt) z += fwd(tt + dt / 2) * dt; return z; };
    cache.runMarks ??= { Dl: distTo(loop || 10), Ds: B.marks.map((m) => distTo(m.at)) };
    const tl = loop ? ((t % loop) + loop) % loop : t, Dnow = distTo(tl);
    load.dyn.marks = B.marks.map((m, i) => { const z = (m.z ?? 0.9) + cache.runMarks.Ds[i] - Dnow; return V3(m.x ?? 0, Math.max(0, h0 + z * sl), z); });
  }
  if (B.vest) load.dyn.vest = { p: sk.chestPoint(P, V3(0, 1.31, 0)), q: P.chest.q.clone() };
  if (B.dribble) { const r = (B.ball && B.ball.r) || 0.11, zb = 0.45 + 0.10 * Math.sin(2 * Math.PI * ph) * act; load.dyn.ball = { p: rot(qy, V3(0.03, r, zb)).add(V3(0, h0, 0)), q: qy.clone().multiply(qX(ph * 6)) }; }
  return { P, load, pelvisPos, lean };
}

const FAM_EXTRA = { kfPose, jumpKF, calf, tke, legPressCalf, legPress, footSeat, gait, balance, sideLying, landing, run };

const FAM = { stepUp, stepDown, supine, stand1, quadruped, nordic, prone, seated, ...FAM_EXTRA };
export function freePose(sk, cfg, s, cache = {}) {
  const f = FAM[cfg.free.type];
  if (!f) throw new Error('familia libre desconocida ' + cfg.free.type);
  return f(sk, cfg, s, cache);
}
