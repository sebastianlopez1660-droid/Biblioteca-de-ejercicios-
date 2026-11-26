// Utilidades para ejercicios de tren superior con kfPose
export const deg2 = (d) => d * Math.PI / 180;
// Plancha / flexión: pivote en los tobillos (zA), cuerpo recto con inclinación th (grados sobre la horizontal).
// Devuelve una clave con pelvis, rotación y pies. knees: apoyo en rodillas (regresión).
export function plankKey(th, o = {}) {
  const t = deg2(th);
  const AHt = o.ankleY ?? 0.10, zA = o.zA ?? -0.78;
  const dP = o.knees ? 0.50 : 0.87;
  const pivotY = o.knees ? 0.06 : AHt;
  const P = [0, pivotY + dP * Math.sin(t), zA + dP * Math.cos(t)];
  const key = { P, rot: [90 - th, 0, 0], nk: [o.neck ?? -6, 0] };
  if (o.knees) {
    // muslos en la línea del cuerpo, espinillas en el suelo hacia atrás
    key.lL = [0, 95, 40, 0]; key.lR = [0, 95, 40, 0];
  } else {
    const fp = Math.max(30, 90 - th - 8);
    key.L = [0.10, AHt + (o.feetY ?? 0), zA, fp, 6]; key.R = [-0.10, AHt + (o.feetY ?? 0), zA, fp, -6];
    key.kL = [0, -1, 0.2]; key.kR = [0, -1, 0.2];
  }
  return key;
}
export function shoulderZ(th, o = {}) {
  const t = deg2(th);
  const k = plankKey(th, o);
  return [k.P[1] + 0.48 * Math.sin(t) + 0.03 * Math.cos(t), k.P[2] + 0.48 * Math.cos(t) - 0.03 * Math.sin(t)];
}
// manos apoyadas en el suelo bajo los hombros (posición alta)
export function handsFloor(thTop, o = {}) {
  const [, sz] = shoulderZ(thTop, o);
  const w = o.handW ?? 0.24, y = o.handY ?? 0.035;
  return { hL: [w, y, sz + 0.03], hR: [-w, y, sz + 0.03], eL: [0.55, 0.1, -1], eR: [-0.55, 0.1, -1], pL: [0, -1, 0, -0.15, 0, 1], pR: [0, -1, 0, 0.15, 0, 1] };
}
