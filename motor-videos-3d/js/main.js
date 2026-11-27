import * as THREE from 'three';
import { makeRenderer, makeScene, makeFXAA, loadBody, Rig, W, H } from './core.js';
import { Skel, V3, deg, rot, smooth } from './kin.js';
import { squatPose, setupProps, applyProps } from './squat.js';
import { freePose, setupFree, applyFree } from './free.js';
import * as PR from './props.js';
const poseOf = (sk, cfg, s, cache) => (cfg.free ? freePose : squatPose)(sk, cfg, s, cache);
import './ex_lote6.js';
import './ex_lote7.js';
import './ex_lote8.js';
import './ex_lote9.js';
import './ex_lote10.js';
import './ex_lote11.js';
import './ex_lote12.js';
import './ex_lote13.js';
import './ex_lote14.js';
import './ex_lote15.js';
import './ex_lote16.js';
import './ex_lote17.js';
import './ex_lote18.js';
import './ex_lote19.js';
import './ex_lote20.js';
import './groups_ts.js';
import './ex_lote21.js';
import './ex_lote22.js';
import './ex_lote23.js';
import './ex_lote24.js';
import './ex_lote25.js';
import './ex_lote26.js';
import './ex_lote27.js';
import './ex_lote28.js';
import './ex_lote29.js';
import './ex_lote30.js';
import './ex_lote31.js';
import './ex_lote32.js';
import './ex_lote33.js';
import './ex_lote34.js';
import './ex_lote35.js';
import './ex_lote36.js';
import './ex_lote37.js';
import './ex_lote38.js';
import './ex_lote39.js';
import './ex_lote40.js';
import './ex_lote41.js';
import './ex_lote42.js';
import './ex_lote43.js';
import './ex_lote44.js';
import './ex_lote45.js';
import './ex_lote46.js';
import './ex_lote47.js';
import './ex_lote48.js';
import './ex_lote49.js';
import './ex_lote50.js';
import './ex_lote51.js';
import './ex_lote52.js';
import { EXERCISES, GROUPS, buildTimeline, stateAt, cameraAt, viewLabelAt, labelsAt } from './exercises.js';
import { HACK_SLED } from './props.js';
import { makeBackground, drawOverlay } from './overlay.js';

const renderer = makeRenderer();
const env = makeScene(renderer);
const fxaa = new URLSearchParams(location.search).get('aa') === '1' ? null : makeFXAA(renderer);
const body = await loadBody('/body.json');
const rig = new Rig(body, env.scene);
const sk = new Skel(rig.J, rig.mtp);
const camera = new THREE.PerspectiveCamera(27, W / H, 0.1, 40);
const bg = makeBackground();
const out = document.createElement('canvas'); out.width = W; out.height = H;
const g2 = out.getContext('2d');

let cur = null;

function gripModes(arms, cfg = {}) {
  if (cfg.hands) return cfg.hands;
  if (arms === 'hang' && (cfg.hold === 'kb1' || cfg.hold === 'db1')) return (cfg.loadSide || 'L') === 'L' ? ['grip', 'open'] : ['open', 'grip'];
  if (arms === 'hips') return ['open', 'open'];
  if (arms === 'forward' || arms === 'front' || arms === 'sides') return ['open', 'open'];
  if (arms === 'swing1') return ['open', 'grip'];
  return ['grip', 'grip'];
}

function setup(code) {
  const def = EXERCISES[code];
  if (!def) throw new Error('ejercicio desconocido ' + code);
  if (cur && cur.props) for (const o of cur.props.list) env.scene.remove(o);
  const cfg = { ...def.cfg };
  // músculos
  const levels = {};
  for (const n of def.secondary) for (const gname of GROUPS[n]) levels[gname] = 1;
  for (const n of def.primary) for (const gname of GROUPS[n]) levels[gname] = 2;
  rig.setMuscles(levels);
  const [hl, hr] = gripModes(cfg.arms, cfg);
  rig.setHands(hl, hr);

  // geometría específica
  if (cfg.machine === 'hack') {
    const rec = deg(cfg.recline);
    const gam = deg(cfg.legAngle);
    const yz = Math.sqrt(0.862 * 0.862 - Math.pow(cfg.stance - 0.09, 2));
    cfg.ankleY = cfg.hipTop.y - yz * Math.cos(gam);
    cfg.ankleZ = cfg.hipTop.z + yz * Math.sin(gam);
    cfg._sledAt = (P) => {
      const q = P.pelvis.q.clone();
      const origin = sk.chestPoint(P, V3(0, 1.20, -0.114));
      const up = rot(q, V3(0, 1, 0));
      const handle = { L: origin.clone().add(rot(q, HACK_SLED.handle.L)), R: origin.clone().add(rot(q, HACK_SLED.handle.R)) };
      return { origin, q, up, handle };
    };
  }
  const cache = {};
  const p0 = poseOf(sk, cfg, 0, cache);
  const p1 = poseOf(sk, cfg, 1, {});
  if (cfg.box) {
    cfg.box.z = p1.P.pelvis.p.z - 0.075 - 0.13;
  }
  if (cfg.wall && cfg.wall.auto) cfg.wall.z = p1.P.pelvis.p.clone().add(rot(p1.P.pelvis.q, V3(0, -0.01, -0.132))).z - 0.004;
  if (cfg.machine === 'hack') {
    const tilt = deg(cfg.plateTilt);
    const fq = new THREE.Quaternion().setFromAxisAngle(V3(1, 0, 0), -tilt);
    const mf = V3(0, cfg.ankleY, cfg.ankleZ).add(rot(fq, V3(0, -0.080, 0.065)));
    const sled0 = cfg._sledAt(p0.P);
    cfg.hackGeo = {
      up: sled0.up.clone(), sledQ: sled0.q.clone(),
      railPoint: sled0.origin.clone().add(rot(sled0.q, V3(0, 0, HACK_SLED.railZ))),
      plateCenter: mf.clone().add(rot(fq, V3(0, 0, 0.02))), plateTilt: tilt,
    };
  }
  const props = setupProps(env.scene, cfg);
  if (cfg.free || cfg.items) { props.free = setupFree(env.scene, cfg, PR, cache, p0); props.list.push(...props.free.list); for (const k of ['bar', 'dbs', 'kb', 'fadeMats']) if (props.free[k]) props[k] = props.free[k]; }
  const tl = buildTimeline(def);

  // encuadre
  let frame = { dist: 4.45, ty: 0.90, distLow: 3.45, tyLow: 0.64, tz: 0 };
  if (cfg.machine === 'hack') frame = { dist: 5.0, ty: 0.98, distLow: 4.1, tyLow: 0.84, tz: 0.05 };
  if (cfg.machine === 'smith') frame = { dist: 4.9, ty: 1.0, distLow: 4.0, tyLow: 0.8, tz: 0.02 };
  if (cfg.box) frame.tz = -0.08;
  if (def.frame) frame = { ...frame, ...def.frame };
  cur = { code, def, cfg, cache, props, tl, frame };
  const diag = (pp) => {
    const P = pp.P;
    const kneeAng = (s) => P['hip_' + s].clone().sub(P['knee_' + s]).angleTo(P['ankle_' + s].clone().sub(P['knee_' + s])) * 180 / Math.PI;
    const shin = (s) => P['knee_' + s].clone().sub(P['ankle_' + s]).angleTo(V3(0, 1, 0)) * 180 / Math.PI;
    return { hipY: +P.pelvis.p.y.toFixed(3), hipZ: +P.pelvis.p.z.toFixed(3), knee: +kneeAng('L').toFixed(1), shinFromVertical: +shin('L').toFixed(1),
      kneeZ: +P.knee_L.z.toFixed(3), toeZ: +(P.toes_L.p.z + 0.06).toFixed(3), lean: +(pp.lean * 180 / Math.PI).toFixed(1),
      bar: pp.load.bar ? pp.load.bar.p.toArray().map(v => +v.toFixed(3)) : null };
  };
  return { duration: tl.duration, top: diag(p0), bottom: diag(p1) };
}

function placeLights(cam) {
  const a = deg(cam.az);
  const T = V3(cam.tx ?? 0, cam.ty, cam.tz);
  const R = (v) => V3(v.x * Math.cos(a) + v.z * Math.sin(a), v.y, -v.x * Math.sin(a) + v.z * Math.cos(a));
  env.key.position.copy(T).add(R(V3(2.2, 4.4, 3.6)));
  env.key.target.position.copy(T);
  env.fill.position.copy(T).add(R(V3(-3.6, 1.6, 2.4)));
  env.rim.position.copy(T).add(R(V3(-1.2, 2.8, -4.0)));
  env.key.target.updateMatrixWorld();
}

function render(t, opts = {}) {
  const { def, cfg, cache, props, tl, frame } = cur;
  const st = stateAt(def, tl, t);
  const s = opts.s ?? st.s;
  cfg._armTop = opts.armTop ?? st.armTop ?? 0;
  cfg._rep = st.repIdx ?? 0; cfg._up = !!st.up;
  cfg._kind = st.step.kind; cfg._phase = st.phase; cfg._prog = st.progress; cfg._t = t;
  const pose = poseOf(sk, cfg, s, cache);
  rig.applyPose(pose.P);
  applyProps(props, pose.load, cfg);
  if (props.free) applyFree(props.free, pose.load);
  if (pose.load && pose.load.hands) rig.setHands(...pose.load.hands);
  rig.setActivation(opts.act ?? st.act);
  for (const k in rig.mats) rig.mats[k].userData.U.uReveal.value = opts.reveal ?? st.reveal;
  const cam = opts.cam ? { ...cameraAt(def, tl, t, frame), ...opts.cam } : cameraAt(def, tl, t, frame);
  cam.tx = 0;
  if (def.track && pose.pelvisPos) { cam.tz = pose.pelvisPos.z + (frame.tz || 0); env.disc.position.z = pose.pelvisPos.z; if (def.trackX) { cam.tx = pose.pelvisPos.x; env.disc.position.x = pose.pelvisPos.x; } }
  const T = V3(cam.tx, cam.ty, cam.tz);
  const a = deg(cam.az), e = deg(cam.el);
  camera.position.set(T.x + cam.dist * Math.sin(a) * Math.cos(e), T.y + cam.dist * Math.sin(e), T.z + cam.dist * Math.cos(a) * Math.cos(e));
  camera.lookAt(T);
  camera.updateMatrixWorld();
  placeLights(cam);
  // discos semitransparentes cuando tapan al deportista (vistas laterales)
  if (props.fadeMats) {
    const side = Math.abs(Math.sin(deg(cam.az)));
    const op = 1 - 0.72 * smooth((side - 0.84) / 0.13);
    for (const m of props.fadeMats) { m.opacity = op; m.transparent = op < 0.999; m.depthWrite = op >= 0.999; }
  }
  renderer.render(env.scene, camera);
  if (fxaa) fxaa();
  g2.drawImage(bg, 0, 0);
  g2.drawImage(renderer.domElement, 0, 0);
  if (!opts.noOverlay) {
    const labels = labelsAt(def, rig, camera, st.labelsAlpha, W, H);
    drawOverlay(g2, {
      code: cur.code, name: def.name, subtitle: `${def.region || 'Tren Inferior'} · ${def.sub || 'Sentadillas'} · ${def.level}`,
      primaryNames: def.primary.join(' · '), secondaryNames: def.secondary.join(' · '),
      caption: st.caption, viewLabel: viewLabelAt(tl, t, cam),
      tempo: st.step.kind === 'outro' ? null : {
        top: st.topLabel ? st.topLabel : st.rep ? `REPETICIÓN ${st.rep}/3` : (st.step.kind === 'orbit' ? 'POSICIÓN BAJA' : 'PREPARACIÓN'),
        phase: st.phase, progress: st.progress,
      },
      labels,
    });
  }
  return out.toDataURL('image/jpeg', opts.q ?? 0.92);
}

function profile(t) {
  const gl = renderer.getContext(); const px = new Uint8Array(4);
  const T = {}; let t0 = performance.now();
  const { def, cfg, cache, props, tl, frame } = cur;
  const st = stateAt(def, tl, t);
  for (let i = 0; i < 5; i++) poseOf(sk, cfg, st.s, cache);
  T.solve = (performance.now() - t0) / 5;
  render(t); // calentamiento
  t0 = performance.now();
  for (let i = 0; i < 3; i++) { renderer.render(env.scene, camera); if (fxaa) fxaa(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); }
  T.gl = (performance.now() - t0) / 3;
  t0 = performance.now();
  for (let i = 0; i < 3; i++) { g2.drawImage(bg, 0, 0); g2.drawImage(renderer.domElement, 0, 0); }
  T.compose = (performance.now() - t0) / 3;
  t0 = performance.now();
  for (let i = 0; i < 3; i++) out.toDataURL('image/jpeg', 0.92);
  T.jpeg = (performance.now() - t0) / 3;
  t0 = performance.now();
  for (let i = 0; i < 3; i++) render(t);
  T.total = (performance.now() - t0) / 3;
  return T;
}
window.ENGINE = { setup, render, profile, list: Object.keys(EXERCISES) };
await document.fonts.load('600 31px "Space Grotesk"');
await document.fonts.load('400 15px "Inter"');
await document.fonts.load('600 27px "Inter"');
await document.fonts.load('500 14px "IBM Plex Mono"');
await document.fonts.ready;
window.ENGINE_READY = true;
