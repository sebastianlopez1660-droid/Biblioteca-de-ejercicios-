// Familias con postura libre (lote 6 en adelante): subidas al cajón, puentes / hip thrust, cuadrupedia,
// curl femoral, extensión de rodilla. Cada familia coloca la pelvis (posición + orientación), el tronco y los
// objetivos de pies y manos; las piernas y los brazos se resuelven con IK de dos huesos.
// Convención: s = 0 posición inicial, s = 1 posición de máxima contracción (la que se muestra en la órbita).
import * as THREE from 'three';
import { V3, deg, lerp, clamp, smooth, qX, qY, qZ, rot, handOpenQ, handGrip, basisQuat } from './kin.js';
import { arms as squatArms } from './squat.js';

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
function legByAngles(sk, P, sd, flex, knee, plant = 0, abd = 0) {
  const base = P.pelvis.q.clone().multiply(qZ(sxOf(sd) * deg(abd))).multiply(qX(-deg(flex)));
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
function armTo(sk, P, sd, wrist, pole, palm, fingers) {
  const S = sk.shoulder(P, sd);
  sk.armIK(P, sd, S, wrist, pole, fingers.clone().cross(palm).multiplyScalar(sd === 'L' ? 1 : -1), handOpenQ(sd, palm, fingers));
}
function gripTo(sk, P, sd, B, axis, palm, pole) {
  const S = sk.shoulder(P, sd);
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
  if (B && B.arms === 'bar') { fp.bar = add(PR.barbell()); const fade = new Set(); fp.bar.traverse(o => { if (o.isMesh && Math.abs(o.position.x) > 0.6) fade.add(o.material); }); fp.fadeMats = [...fade]; }
  if (B && (B.arms === 'db' || B.db)) fp.dbs = [add(PR.dumbbell(B.db ? 1.0 : 1.3))];
  if (B && B.slide) fp.sliders = [add(PR.slider()), add(PR.slider())];
  if (B && (B.trx || B.hipBand || B.kneeBand || B.bands || B.cable || B.band)) fp.fband = Array.from({ length: 12 }, () => add(PR.bandSegment(B.trx ? 0x16181a : (B.cable && !B.cableBand ? 0xb9bec4 : undefined), B.trx ? 0.012 : (B.cable && !B.cableBand ? 0.0065 : undefined))));
  for (const k in (B && B.machine ? { m: 1 } : {})) fp.machine = add(PR[B.machine.kind](B.machine));
  return fp;
}
export function applyFree(fp, load) {
  if (fp.ball && load.dyn && load.dyn.ball) { fp.ball.position.copy(load.dyn.ball.p); fp.ball.quaternion.copy(load.dyn.ball.q); }
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
  legByAngles(sk, P, wk, lerp(B.flexB, B.flexT, s), lerp(B.kneeB, B.kneeT, s), lerp(B.plantB ?? 10, B.plantT ?? 10, s));
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
  legByAngles(sk, P, wk, lerp(90 - (B.incline ?? 12), B.flexT ?? -12, s), lerp(90, 88, s), 70);
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
  for (const sd of ['L', 'R']) {
    const sx = sxOf(sd);
    gripTo(sk, P, sd, V3(sx * (B.handX ?? 0.27), B.seatY + (B.handDy ?? 0.04), B.handZ ?? 0.12), V3(0, 0, 1), V3(-sx, 0, 0), V3(sx * 0.5, -0.2, -1));
  }
  return { P, load, pelvisPos, lean: -rec };
}

const FAM = { stepUp, stepDown, supine, stand1, quadruped, nordic, prone, seated };
export function freePose(sk, cfg, s, cache = {}) {
  const f = FAM[cfg.free.type];
  if (!f) throw new Error('familia libre desconocida ' + cfg.free.type);
  return f(sk, cfg, s, cache);
}
