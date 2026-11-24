// Núcleo del motor: escena, materiales con pintura muscular, maniquí y luces.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

export const W = 1280, H = 720;
export const MAXH = 20;

// Colores (sRGB) de la pintura muscular
export const COLORS = {
  skin: 0xe0ddd9,
  primary: [0.80, 0.07, 0.07],
  secondary: [0.96, 0.53, 0.36],
  tendon: [0.94, 0.86, 0.82],
};

function b64ToBuf(b64) {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8.buffer;
}

export function makeRenderer() {
  const Q = new URLSearchParams(location.search);
  // MSAA desactivado por defecto (SwiftShader lo hace ~2,4x más lento); se suaviza con FXAA
  const renderer = new THREE.WebGLRenderer({ antialias: Q.get('aa') === '1', alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  return renderer;
}

// Paso FXAA sobre el lienzo (mantiene el alfa premultiplicado)
export function makeFXAA(renderer) {
  const fb = new THREE.FramebufferTexture(W, H);
  fb.minFilter = THREE.LinearFilter; fb.magFilter = THREE.LinearFilter;
  const mat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(FXAAShader.uniforms),
    vertexShader: FXAAShader.vertexShader, fragmentShader: FXAAShader.fragmentShader,
    blending: THREE.NoBlending, depthTest: false, depthWrite: false,
  });
  mat.uniforms.tDiffuse.value = fb;
  mat.uniforms.resolution.value.set(1 / W, 1 / H);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  quad.frustumCulled = false; scene.add(quad);
  const origin = new THREE.Vector2(0, 0);
  return () => {
    renderer.copyFramebufferToTexture(origin, fb);
    renderer.render(scene, cam);
  };
}

export function makeScene(renderer) {
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const Q = new URLSearchParams(location.search);
  if (Q.get('env') !== '0') scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environmentIntensity = 0.42;

  const hemi = new THREE.HemisphereLight(0xffffff, 0x3a3f3e, 0.32);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff6ee, 2.55);
  key.position.set(2.2, 5.0, 3.4);
  key.castShadow = true;
  const sm = parseInt(Q.get('sm') || '1536'); key.shadow.mapSize.set(sm, sm);
  key.shadow.camera.left = -1.8; key.shadow.camera.right = 1.8;
  key.shadow.camera.top = 2.6; key.shadow.camera.bottom = -1.2;
  key.shadow.camera.near = 1; key.shadow.camera.far = 12;
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.012;
  key.shadow.radius = 4;
  scene.add(key); scene.add(key.target);

  const fill = new THREE.DirectionalLight(0xe8f0ff, 0.5);
  fill.position.set(-3.5, 2.2, 2.5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 1.6);
  rim.position.set(-1.0, 3.0, -4.0);
  scene.add(rim);

  // suelo: sombras de contacto + disco de luz suave
  const shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12),
    new THREE.ShadowMaterial({ opacity: 0.32 }));
  shadowFloor.rotation.x = -Math.PI / 2;
  shadowFloor.receiveShadow = true;
  scene.add(shadowFloor);

  const discTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(255,255,255,0.20)');
    gr.addColorStop(0.55, 'rgba(255,255,255,0.07)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const disc = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2),
    new THREE.MeshBasicMaterial({ map: discTex, transparent: true, depthWrite: false, toneMapped: false }));
  disc.rotation.x = -Math.PI / 2; disc.position.y = 0.001;
  scene.add(disc);

  return { scene, key, fill, rim, hemi, shadowFloor, disc };
}

// ------------------------------------------------------------ material con músculos
export function makeMuscleMaterial(opts = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color: opts.color ?? COLORS.skin, roughness: opts.roughness ?? 0.52, metalness: 0.0,
    envMapIntensity: 0.9,
  });
  const U = {
    uCount: { value: 0 },
    uHC: { value: Array.from({ length: MAXH }, () => new THREE.Vector3()) },
    uHX: { value: Array.from({ length: MAXH }, () => new THREE.Vector3()) },
    uHY: { value: Array.from({ length: MAXH }, () => new THREE.Vector3()) },
    uHZ: { value: Array.from({ length: MAXH }, () => new THREE.Vector3()) },
    uHR: { value: Array.from({ length: MAXH }, () => new THREE.Vector3(1, 1, 1)) },
    uHP: { value: Array.from({ length: MAXH }, () => new THREE.Vector4()) },
    uHB: { value: Array.from({ length: MAXH }, () => new THREE.Vector3(9, 9, 9)) },
    uColP: { value: new THREE.Color().setRGB(...COLORS.primary, THREE.SRGBColorSpace) },
    uColS: { value: new THREE.Color().setRGB(...COLORS.secondary, THREE.SRGBColorSpace) },
    uColT: { value: new THREE.Color().setRGB(...COLORS.tendon, THREE.SRGBColorSpace) },
    uAct: { value: 0 },
    uBump: { value: 0.0045 },
    uReveal: { value: 1 },
  };
  mat.userData.U = U;
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vRest;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvRest = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\n' + MUSCLE_GLSL)
      .replace('#include <color_fragment>',
        'muscleEval();\n#include <color_fragment>\ndiffuseColor.rgb = mix(diffuseColor.rgb, gMCol, gMask);')
      .replace('#include <roughnessmap_fragment>',
        '#include <roughnessmap_fragment>\nroughnessFactor = mix(roughnessFactor, 0.36, gMask);')
      .replace('#include <normal_fragment_maps>',
        '#include <normal_fragment_maps>\nif (gMask > 0.001) { vec2 dHdxy = vec2(dFdx(gHeight), dFdy(gHeight)) * uBump; normal = perturbNormalM(-vViewPosition, normal, dHdxy, faceDirection); }')
      .replace('#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance += gMCol * gMask * gPrim * uAct * 0.22;');
  };
  mat.customProgramCacheKey = () => 'muscle-v3';
  return mat;
}

const MUSCLE_GLSL = /* glsl */`
#define MAXH ${MAXH}
varying vec3 vRest;
uniform int uCount;
uniform vec3 uHC[MAXH]; uniform vec3 uHX[MAXH]; uniform vec3 uHY[MAXH]; uniform vec3 uHZ[MAXH];
uniform vec3 uHR[MAXH]; uniform vec4 uHP[MAXH]; uniform vec3 uHB[MAXH];
uniform vec3 uColP; uniform vec3 uColS; uniform vec3 uColT;
uniform float uAct; uniform float uBump; uniform float uReveal;
float gMask; float gHeight; vec3 gMCol; float gPrim;
float hash13(vec3 p){ p = fract(p*0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec3 p){
  vec3 i = floor(p); vec3 f = fract(p); f = f*f*(3.0 - 2.0*f);
  float a = hash13(i), b = hash13(i+vec3(1,0,0)), c = hash13(i+vec3(0,1,0)), d = hash13(i+vec3(1,1,0));
  float e = hash13(i+vec3(0,0,1)), g = hash13(i+vec3(1,0,1)), h = hash13(i+vec3(0,1,1)), k = hash13(i+vec3(1,1,1));
  return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y), mix(mix(e,g,f.x), mix(h,k,f.x), f.y), f.z);
}
vec3 perturbNormalM(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDir){
  vec3 vSigmaX = normalize(dFdx(surf_pos.xyz)); vec3 vSigmaY = normalize(dFdy(surf_pos.xyz));
  vec3 vN = surf_norm;
  vec3 R1 = cross(vSigmaY, vN); vec3 R2 = cross(vN, vSigmaX);
  float fDet = dot(vSigmaX, R1) * faceDir;
  vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);
}
void muscleEval(){
  gMask = 0.0; gHeight = 0.0; gMCol = vec3(0.0); gPrim = 0.0;
  if (uCount == 0) return;
  float best = 1e3; float second = 1e3;
  vec3 bq = vec3(0.0); vec3 bR = vec3(1.0); vec4 bP = vec4(0.0); vec3 bB = vec3(9.0);
  for (int i = 0; i < MAXH; i++) {
    if (i >= uCount) break;
    vec3 d = vRest - uHC[i];
    vec3 q = vec3(dot(d, uHX[i]), dot(d, uHY[i]), dot(d, uHZ[i]));
    float xa = abs(q.x);
    float lim = pow(max(1.0 - xa*xa, 1e-4), uHP[i].x);
    float s = max(xa, abs(q.y) / lim);
    s = max(s, abs(q.z));
    if (s < best) { second = best; best = s; bq = q; bR = uHR[i]; bP = uHP[i]; bB = uHB[i]; }
    else if (s < second) { second = s; }
  }
  if (best >= 1.08) return;
  vec3 qm = bq * bR;
  float n1 = vnoise(vec3(qm.x*10.0, qm.y*250.0, qm.z*250.0));
  float n2 = vnoise(vec3(qm.x*23.0, qm.y*640.0, qm.z*640.0) + 7.31);
  float fib = n1*0.62 + n2*0.38;
  float belly = 1.0 - clamp(best*best, 0.0, 1.0);
  float tend = smoothstep(1.0 - bP.y, 1.0 - bP.y*0.3, abs(bq.x));
  float band = 0.0;
  band = max(band, 1.0 - smoothstep(0.004, 0.010, abs(bq.x - bB.x) * bR.x));
  band = max(band, 1.0 - smoothstep(0.004, 0.010, abs(bq.x - bB.y) * bR.x));
  band = max(band, 1.0 - smoothstep(0.004, 0.010, abs(bq.x - bB.z) * bR.x));
  float dd = second - best;
  float wdd = max(fwidth(dd), 1e-4);
  float sept = second < 1.0 ? 1.0 - smoothstep(wdd * 0.6, wdd * 2.2, dd) : 0.0;
  float edge = smoothstep(0.62, 1.0, best);
  float aa = fwidth(best) * 1.2 + 0.01;
  float inside = 1.0 - smoothstep(1.0 - aa, 1.0, best);
  float prim = bP.z > 1.5 ? 1.0 : 0.0;
  vec3 base = mix(uColS, uColP, prim);
  vec3 col = base * (0.62 + 0.58*fib) * (0.80 + 0.30*belly) * (1.0 - 0.22*edge);
  col *= 1.0 + 0.18 * uAct * prim;
  col = mix(col, uColT, clamp(tend*0.92 + band*0.9, 0.0, 1.0));
  col = mix(col, uColT, sept*0.85);
  gMCol = col; gMask = inside * uReveal; gPrim = prim;
  gHeight = (fib*0.75 + belly*1.2 - band*0.6 - sept*0.5 - tend*0.3) * inside;
}
`;

// carga las regiones musculares activas en el material
export function setMuscleHeads(mat, heads, levels) {
  const U = mat.userData.U;
  let n = 0;
  for (const h of heads) {
    const lv = levels[h.group] || 0;
    if (!lv || n >= MAXH) continue;
    const [a, b, c] = h.r;
    U.uHC.value[n].set(...h.c);
    U.uHX.value[n].set(h.X[0] / a, h.X[1] / a, h.X[2] / a);
    U.uHY.value[n].set(h.Y[0] / b, h.Y[1] / b, h.Y[2] / b);
    U.uHZ.value[n].set(h.Z[0] / c, h.Z[1] / c, h.Z[2] / c);
    U.uHR.value[n].set(a, b, c);
    U.uHP.value[n].set(h.e, h.tendon, lv, 0);
    const bl = h.bands || [];
    U.uHB.value[n].set(bl[0] ?? 9, bl[1] ?? 9, bl[2] ?? 9);
    n++;
  }
  U.uCount.value = n;
  return n;
}

// ------------------------------------------------------------ maniquí
export async function loadBody(url) {
  const r = await fetch(url);
  return r.json();
}

function geomFromSeg(seg) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(b64ToBuf(seg.position)), 3));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(b64ToBuf(seg.normal)), 3));
  g.setIndex(new THREE.BufferAttribute(new Uint32Array(b64ToBuf(seg.index)), 1));
  if (seg.skinned) {
    g.setAttribute('skinIndex', new THREE.BufferAttribute(new Uint16Array(b64ToBuf(seg.skinIndex)), 4));
    g.setAttribute('skinWeight', new THREE.BufferAttribute(new Float32Array(b64ToBuf(seg.skinWeight)), 4));
  }
  g.computeBoundingSphere();
  return g;
}

export class Rig {
  constructor(body, scene) {
    this.body = body;
    this.J = {};
    for (const k in body.joints) this.J[k] = new THREE.Vector3(...body.joints[k]);
    this.mtp = new THREE.Vector3(...body.mtp_local);
    this.root = new THREE.Group();
    scene.add(this.root);
    this.meshes = {};
    this.mats = {};
    const segs = body.segments;
    // torso con piel (4 huesos)
    const tg = geomFromSeg(segs.torso);
    const tm = makeMuscleMaterial();
    this.bones = {};
    const boneList = [];
    for (const name of segs.torso.bones) {
      const b = new THREE.Bone();
      b.position.copy(this.J[name]);
      this.bones[name] = b; boneList.push(b);
      this.root.add(b);
    }
    this.root.updateMatrixWorld(true);
    const inv = boneList.map(b => new THREE.Matrix4().makeTranslation(b.position.x, b.position.y, b.position.z).invert());
    const skel = new THREE.Skeleton(boneList, inv);
    const torso = new THREE.SkinnedMesh(tg, tm);
    torso.bind(skel, new THREE.Matrix4());
    torso.castShadow = true; torso.receiveShadow = true;
    torso.frustumCulled = false;
    this.root.add(torso);
    this.meshes.torso = torso; this.mats.torso = tm;
    torso.userData.heads = segs.torso.heads;
    // segmentos rígidos
    for (const name in segs) {
      if (name === 'torso') continue;
      const g = geomFromSeg(segs[name]);
      const m = makeMuscleMaterial();
      const mesh = new THREE.Mesh(g, m);
      mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.userData.heads = segs[name].heads || [];
      this.root.add(mesh);
      this.meshes[name] = mesh; this.mats[name] = m;
    }
    this.setHands('open', 'open');
  }
  setHands(l, r) {
    this.handL = l; this.handR = r;
    this.meshes.handopen_L.visible = l === 'open';
    this.meshes.handgrip_L.visible = l === 'grip';
    this.meshes.handopen_R.visible = r === 'open';
    this.meshes.handgrip_R.visible = r === 'grip';
  }
  setMuscles(levels) {
    for (const name in this.meshes) {
      const mesh = this.meshes[name];
      setMuscleHeads(mesh.material, mesh.userData.heads, levels);
    }
  }
  setActivation(a) {
    for (const name in this.mats) this.mats[name].userData.U.uAct.value = a;
  }
  // P: transformaciones en mundo {p: Vector3, q: Quaternion}
  applyPose(P) {
    for (const b of ['pelvis', 'lumbar', 'chest', 'neck']) {
      this.bones[b].position.copy(P[b].p); this.bones[b].quaternion.copy(P[b].q);
    }
    const set = (mesh, t) => { mesh.position.copy(t.p); mesh.quaternion.copy(t.q); };
    set(this.meshes.head, P.head);
    for (const s of ['L', 'R']) {
      set(this.meshes['thigh_' + s], P['thigh_' + s]);
      set(this.meshes['shin_' + s], P['shin_' + s]);
      set(this.meshes['foot_' + s], P['foot_' + s]);
      set(this.meshes['toes_' + s], P['toes_' + s]);
      set(this.meshes['upperarm_' + s], P['upperarm_' + s]);
      set(this.meshes['forearm_' + s], P['forearm_' + s]);
      set(this.meshes['handopen_' + s], P['hand_' + s]);
      set(this.meshes['handgrip_' + s], P['hand_' + s]);
    }
  }
}
