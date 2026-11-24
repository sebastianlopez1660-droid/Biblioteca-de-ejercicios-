// Cinemática del maniquí: cadena del tronco, IK de dos huesos, orientación de manos y pies, centro de masas.
import * as THREE from 'three';

export const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
export const deg = (d) => d * Math.PI / 180;
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
export const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
export const smoother = (t) => { t = clamp(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); };
export const easeInOutSine = (t) => { t = clamp(t, 0, 1); return 0.5 - 0.5 * Math.cos(Math.PI * t); };

export const qAxis = (axis, ang) => new THREE.Quaternion().setFromAxisAngle(axis.clone().normalize(), ang);
export const qX = (a) => qAxis(V3(1, 0, 0), a);
export const qY = (a) => qAxis(V3(0, 1, 0), a);
export const qZ = (a) => qAxis(V3(0, 0, 1), a);
export const qMul = (...qs) => qs.reduce((acc, q) => acc.multiply(q), new THREE.Quaternion());
export const rot = (q, v) => v.clone().applyQuaternion(q);

// cuaternión a partir de los ejes locales Y y (pista de) Z en mundo
export function basisQuat(yAxis, zHint) {
  const Y = yAxis.clone().normalize();
  let Z = zHint.clone().sub(Y.clone().multiplyScalar(zHint.dot(Y)));
  if (Z.lengthSq() < 1e-10) {
    Z = V3(0, 0, 1).sub(Y.clone().multiplyScalar(Y.z));
    if (Z.lengthSq() < 1e-10) Z = V3(1, 0, 0);
  }
  Z.normalize();
  const X = new THREE.Vector3().crossVectors(Y, Z).normalize();
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
}
// cuaternión a partir de los ejes locales X y Z
export function basisQuatXZ(xAxis, zAxis) {
  const Z = zAxis.clone().normalize();
  let X = xAxis.clone().sub(Z.clone().multiplyScalar(xAxis.dot(Z))).normalize();
  const Y = new THREE.Vector3().crossVectors(Z, X).normalize();
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
}

export function twoBoneIK(A, C, L1, L2, pole) {
  const D = C.clone().sub(A);
  let d = D.length();
  const n = D.clone().divideScalar(Math.max(d, 1e-9));
  d = clamp(d, Math.abs(L1 - L2) + 1e-4, L1 + L2 - 1e-4);
  const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(L1 * L1 - a * a, 0));
  let pp = pole.clone().sub(n.clone().multiplyScalar(pole.dot(n)));
  if (pp.lengthSq() < 1e-10) pp = V3(0, 0, 1);
  pp.normalize();
  const B = A.clone().add(n.clone().multiplyScalar(a)).add(pp.multiplyScalar(h));
  const Creal = B.clone().add(C.clone().sub(B).normalize().multiplyScalar(L2));
  return { B, C: Creal };
}

export const MASS = {
  head: 0.081, pelvis: 0.142, lumbar: 0.139, chest: 0.216,
  upperarm: 0.028, forearm: 0.016, hand: 0.006, thigh: 0.100, shin: 0.0465, foot: 0.0145,
};

export class Skel {
  constructor(J, mtp) {
    this.J = J; this.mtp = mtp;
    const d = (a, b) => J[b].clone().sub(J[a]);
    this.o = {
      lumbar: d('pelvis', 'lumbar'), chest: d('lumbar', 'chest'), neck: d('chest', 'neck'), head: d('neck', 'head'),
      hip_L: d('pelvis', 'hip_L'), hip_R: d('pelvis', 'hip_R'),
      sho_L: d('chest', 'shoulder_L'), sho_R: d('chest', 'shoulder_R'),
    };
    this.LT = J.hip_L.distanceTo(J.knee_L);
    this.LS = J.knee_L.distanceTo(J.ankle_L);
    this.LUA = J.shoulder_L.distanceTo(J.elbow_L);
    this.LFA = J.elbow_L.distanceTo(J.wrist_L);
    this.ANKLE_H = J.ankle_L.y; // altura del tobillo sobre la planta
  }
  // cadena del tronco. r: rotaciones relativas {pelvis (mundo), lumbar, chest, neck, head}
  trunk(pelvisPos, r) {
    const P = {};
    P.pelvis = { p: pelvisPos.clone(), q: r.pelvis.clone() };
    const chain = [['lumbar', 'pelvis'], ['chest', 'lumbar'], ['neck', 'chest'], ['head', 'neck']];
    for (const [c, par] of chain) {
      const pq = P[par].q;
      P[c] = { p: P[par].p.clone().add(rot(pq, this.o[c])), q: pq.clone().multiply(r[c] || new THREE.Quaternion()) };
    }
    P.hip_L = P.pelvis.p.clone().add(rot(P.pelvis.q, this.o.hip_L));
    P.hip_R = P.pelvis.p.clone().add(rot(P.pelvis.q, this.o.hip_R));
    return P;
  }
  shoulder(P, side, shift = V3()) {
    return P.chest.p.clone().add(rot(P.chest.q, this.o['sho_' + side].clone().add(shift)));
  }
  // punto en coordenadas locales del pecho (reposo) → mundo
  chestPoint(P, local) {
    const rel = local.clone().sub(this.J.chest);
    return P.chest.p.clone().add(rot(P.chest.q, rel));
  }
  // pierna: cadera → tobillo, rodilla apuntando a 'pole'
  leg(P, side, ankle, footQ, pole, toeFlex = 0) {
    const H = P['hip_' + side];
    const { B: K, C: A } = twoBoneIK(H, ankle, this.LT, this.LS, pole);
    const dT = K.clone().sub(H).normalize();
    const dS = A.clone().sub(K).normalize();
    P['thigh_' + side] = { p: H.clone(), q: basisQuat(dT.clone().negate(), pole) };
    P['shin_' + side] = { p: K.clone(), q: basisQuat(dS.clone().negate(), pole) };
    P['foot_' + side] = { p: A.clone(), q: footQ.clone() };
    const m = this.mtp.clone(); if (side === 'R') m.x = -m.x;
    P['toes_' + side] = { p: A.clone().add(rot(footQ, m)), q: footQ.clone().multiply(qX(-toeFlex)) };
    P['knee_' + side] = K; P['ankle_' + side] = A;
    return P;
  }
  // brazo por IK: hombro → muñeca, codo apuntando a 'pole'; thumb: dirección del pulgar del antebrazo
  armIK(P, side, S, wrist, pole, thumb, handQ) {
    const { B: E, C: Wr } = twoBoneIK(S, wrist, this.LUA, this.LFA, pole);
    const dU = E.clone().sub(S).normalize();
    const dF = Wr.clone().sub(E).normalize();
    // la cara anterior del brazo mira hacia el interior del ángulo del codo
    const mid = S.clone().add(Wr).multiplyScalar(0.5);
    let ant = mid.clone().sub(E);
    if (ant.lengthSq() < 1e-6) ant = pole.clone().negate();
    P['upperarm_' + side] = { p: S.clone(), q: basisQuat(dU.clone().negate(), ant) };
    P['forearm_' + side] = { p: E.clone(), q: basisQuat(dF.clone().negate(), thumb) };
    P['hand_' + side] = { p: Wr.clone(), q: handQ.clone() };
    P['elbow_' + side] = E; P['wrist_' + side] = Wr;
    return P;
  }
  // brazo por cinemática directa: direcciones del brazo y del antebrazo
  armFK(P, side, S, dirU, antU, dirF, thumb, handQ) {
    const E = S.clone().add(dirU.clone().normalize().multiplyScalar(this.LUA));
    const Wr = E.clone().add(dirF.clone().normalize().multiplyScalar(this.LFA));
    P['upperarm_' + side] = { p: S.clone(), q: basisQuat(dirU.clone().negate(), antU) };
    P['forearm_' + side] = { p: E.clone(), q: basisQuat(dirF.clone().negate(), thumb) };
    P['hand_' + side] = { p: Wr.clone(), q: handQ.clone() };
    P['elbow_' + side] = E; P['wrist_' + side] = Wr;
    return P;
  }
  // centro de masas del cuerpo (fracciones de Winter) en mundo
  com(P) {
    const acc = V3(); let m = 0;
    const add = (w, p) => { acc.add(p.clone().multiplyScalar(w)); m += w; };
    add(MASS.pelvis, P.pelvis.p.clone().add(rot(P.pelvis.q, V3(0, 0.03, -0.01))));
    add(MASS.lumbar, P.lumbar.p.clone().add(rot(P.lumbar.q, V3(0, 0.07, 0.01))));
    add(MASS.chest, P.chest.p.clone().add(rot(P.chest.q, V3(0, 0.16, -0.01))));
    add(MASS.head, P.head.p.clone().add(rot(P.head.q, V3(0, 0.09, 0.02))));
    for (const s of ['L', 'R']) {
      add(MASS.thigh, P['thigh_' + s].p.clone().lerp(P['knee_' + s], 0.433));
      add(MASS.shin, P['knee_' + s].clone().lerp(P['ankle_' + s], 0.433));
      add(MASS.foot, P['foot_' + s].p.clone().add(rot(P['foot_' + s].q, V3(0, -0.05, 0.06))));
      add(MASS.upperarm, P['upperarm_' + s].p.clone().lerp(P['elbow_' + s], 0.436));
      add(MASS.forearm, P['elbow_' + s].clone().lerp(P['wrist_' + s], 0.43));
      add(MASS.hand, P['hand_' + s].p.clone().add(rot(P['hand_' + s].q, V3(0, -0.07, 0))));
    }
    return acc.divideScalar(m);
  }
}

// orientación de la mano. palm: hacia dónde mira la palma; fingers: dirección muñeca→dedos (mano abierta)
export function handOpenQ(side, palm, fingers) {
  const Y = fingers.clone().negate().normalize();
  const Xh = side === 'L' ? palm.clone().negate() : palm.clone();
  const X = Xh.sub(Y.clone().multiplyScalar(Xh.dot(Y))).normalize();
  const Z = new THREE.Vector3().crossVectors(X, Y).normalize();
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
}
// agarre de una barra: axisThumb = eje de la barra apuntando al lado del pulgar; palm = hacia dónde mira la palma
// devuelve {q, wrist} dado el punto de contacto B sobre la barra
export const GRIP_LOCAL = V3(-0.006, -0.098, 0);
export function handGrip(side, B, axisThumb, palm) {
  const Z = axisThumb.clone().normalize();
  const Xh = side === 'L' ? palm.clone().negate() : palm.clone();
  const X = Xh.sub(Z.clone().multiplyScalar(Xh.dot(Z))).normalize();
  const Y = new THREE.Vector3().crossVectors(Z, X).normalize();
  const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
  const gl = GRIP_LOCAL.clone(); if (side === 'R') gl.x = -gl.x;
  const wrist = B.clone().sub(rot(q, gl));
  return { q, wrist };
}
