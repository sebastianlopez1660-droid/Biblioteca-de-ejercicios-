# -*- coding: utf-8 -*-
"""
Genera el maniquí 3D (segmentos rígidos + torso con piel) a partir de campos de
distancia con signo (SDF) y marching cubes, y define las regiones musculares
(cabezas) en coordenadas locales de cada segmento. Exporta body.json para el motor.

Convención (mundo, pose de reposo): Y arriba, +Z hacia delante (anterior),
+X = izquierda del sujeto. Unidades: metros.
"""
import json, base64, math, sys
import numpy as np
from skimage.measure import marching_cubes
import fast_simplification

# ---------------------------------------------------------------- primitivas SDF
def _v(a): return np.asarray(a, dtype=np.float64)

def sd_sphere(P, c, r):
    return np.linalg.norm(P - _v(c), axis=1) - r

def sd_ellipsoid(P, c, r):
    r = _v(r); d = P - _v(c)
    k0 = np.linalg.norm(d / r, axis=1)
    k1 = np.linalg.norm(d / (r * r), axis=1)
    return k0 * (k0 - 1.0) / np.maximum(k1, 1e-12)

def sd_capsule(P, a, b, r):
    a = _v(a); b = _v(b); pa = P - a; ba = b - a
    h = np.clip((pa @ ba) / (ba @ ba), 0.0, 1.0)
    return np.linalg.norm(pa - h[:, None] * ba, axis=1) - r

def sd_roundcone(P, a, b, r1, r2):
    a = _v(a); b = _v(b)
    ba = b - a; l2 = ba @ ba; rr = r1 - r2; a2 = l2 - rr * rr; il2 = 1.0 / l2
    pa = P - a
    y = pa @ ba
    z = y - l2
    xv = pa * l2 - np.outer(y, ba)
    x2 = np.sum(xv * xv, axis=1)
    y2 = y * y * l2
    z2 = z * z * l2
    k = np.sign(rr) * rr * rr * x2
    out = np.empty(len(P))
    m1 = np.sign(z) * a2 * z2 > k
    m2 = (~m1) & (np.sign(y) * a2 * y2 < k)
    m3 = ~(m1 | m2)
    out[m1] = np.sqrt(x2[m1] + z2[m1]) * il2 - r2
    out[m2] = np.sqrt(x2[m2] + y2[m2]) * il2 - r1
    out[m3] = (np.sqrt(x2[m3] * a2 * il2) + y[m3] * rr) * il2 - r1
    return out

def sd_rbox(P, c, half, r):
    q = np.abs(P - _v(c)) - _v(half) + r
    return (np.linalg.norm(np.maximum(q, 0.0), axis=1)
            + np.minimum(np.max(q, axis=1), 0.0) - r)

def sd_halfspace_y_above(P, y0):
    # negativo por encima de y0 (para recortar la planta del pie)
    return y0 - P[:, 1]

def smin(a, b, k):
    if k <= 0: return np.minimum(a, b)
    h = np.maximum(k - np.abs(a - b), 0.0) / k
    return np.minimum(a, b) - h * h * k * 0.25

def smax(a, b, k):
    return -smin(-a, -b, k)

class Shape:
    """Lista de operaciones SDF: ('add'|'sub'|'int', func, k)."""
    def __init__(self):
        self.ops = []
        self.bounds = []  # (min, max) de cada primitiva añadida
    def add(self, f, k=0.0, bb=None):
        self.ops.append(('add', f, k));
        if bb is not None: self.bounds.append(bb)
        return self
    def sub(self, f, k=0.0):
        self.ops.append(('sub', f, k)); return self
    def inter(self, f, k=0.0):
        self.ops.append(('int', f, k)); return self
    def __call__(self, P):
        d = None
        for op, f, k in self.ops:
            v = f(P)
            if d is None:
                d = v
            elif op == 'add':
                d = smin(d, v, k)
            elif op == 'sub':
                d = smax(d, -v, k)
            else:
                d = smax(d, v, k)
        return d

def bb_sphere(c, r): c = _v(c); return (c - r, c + r)
def bb_ell(c, r): c = _v(c); r = _v(r); return (c - r, c + r)
def bb_cap(a, b, r): a = _v(a); b = _v(b); return (np.minimum(a, b) - r, np.maximum(a, b) + r)
def bb_box(c, h): c = _v(c); h = _v(h); return (c - h, c + h)

# helpers that add primitive + bounds
def S_sphere(sh, c, r, k=0.0): return sh.add(lambda P, c=c, r=r: sd_sphere(P, c, r), k, bb_sphere(c, r))
def S_ell(sh, c, r, k=0.0): return sh.add(lambda P, c=c, r=r: sd_ellipsoid(P, c, r), k, bb_ell(c, r))
def S_cap(sh, a, b, r, k=0.0): return sh.add(lambda P, a=a, b=b, r=r: sd_capsule(P, a, b, r), k, bb_cap(a, b, r))
def S_rcone(sh, a, b, r1, r2, k=0.0): return sh.add(lambda P, a=a, b=b, r1=r1, r2=r2: sd_roundcone(P, a, b, r1, r2), k, bb_cap(a, b, max(r1, r2)))
def S_box(sh, c, h, r, k=0.0): return sh.add(lambda P, c=c, h=h, r=r: sd_rbox(P, c, h, r), k, bb_box(c, h))

# ---------------------------------------------------------------- articulaciones (reposo)
J = {
    'pelvis':     (0.0, 0.950, 0.000),
    'lumbar':     (0.0, 1.035, -0.020),
    'chest':      (0.0, 1.175, -0.025),
    'neck':       (0.0, 1.480, -0.040),
    'head':       (0.0, 1.585, -0.020),
    'hip_L':      (0.090, 0.950, 0.000),
    'knee_L':     (0.090, 0.510, 0.000),
    'ankle_L':    (0.090, 0.080, 0.000),
    'shoulder_L': (0.185, 1.430, -0.030),
    'elbow_L':    (0.185, 1.130, -0.030),
    'wrist_L':    (0.185, 0.875, -0.030),
}
# MTP (dedos) en coordenadas locales del pie
MTP_LOCAL = (0.008, -0.062, 0.150)
for k in list(J):
    if k.endswith('_L'):
        x, y, z = J[k]
        J[k[:-2] + '_R'] = (-x, y, z)

R_HIP = 0.083; R_KNEE = 0.050; R_ANKLE = 0.033
R_SHO = 0.051; R_ELB = 0.036; R_WRI = 0.025; R_NECKTOP = 0.050
EPS = 0.0016  # la esfera duplicada del segmento 'interior' es un poco menor para evitar z-fighting

# ---------------------------------------------------------------- formas
def torso_shape():
    sh = Shape()
    S_ell(sh, (0, 0.990, -0.005), (0.160, 0.105, 0.115))                 # pelvis
    for s in (1, -1):
        S_sphere(sh, (s * 0.090, 0.950, 0.0), R_HIP - EPS, 0.035)          # cadera (=muslo)
        S_ell(sh, (s * 0.066, 0.950, -0.064), (0.080, 0.098, 0.064), 0.04)   # glúteos
    S_ell(sh, (0, 1.000, 0.052), (0.126, 0.085, 0.066), 0.05)            # vientre bajo
    S_ell(sh, (0, 0.893, 0.008), (0.052, 0.050, 0.066), 0.04)            # entrepierna
    S_ell(sh, (0, 1.110, 0.000), (0.131, 0.100, 0.097), 0.06)            # cintura
    S_ell(sh, (0, 1.160, 0.030), (0.112, 0.120, 0.072), 0.05)            # abdomen frontal
    S_ell(sh, (0, 1.296, -0.012), (0.147, 0.205, 0.112), 0.06)           # caja torácica
    for s in (1, -1):
        S_ell(sh, (s * 0.064, 1.356, 0.068), (0.078, 0.060, 0.045), 0.04)  # pectorales
        S_ell(sh, (s * 0.114, 1.290, -0.038), (0.056, 0.130, 0.075), 0.05)  # dorsales
        S_cap(sh, (s * 0.168, 1.440, -0.030), (s * 0.030, 1.468, -0.036), 0.044, 0.05)  # cintura escapular
        S_sphere(sh, (s * 0.185, 1.430, -0.030), R_SHO - EPS, 0.03)        # hombro (=brazo)
    S_ell(sh, (0, 1.430, -0.064), (0.115, 0.074, 0.056), 0.05)           # trapecio / espalda alta
    S_rcone(sh, (0, 1.440, -0.034), (0, 1.585, -0.020), 0.060, 0.051, 0.05)  # cuello
    S_sphere(sh, (0, 1.585, -0.020), R_NECKTOP, 0.02)
    # surco de la columna (resta suave)
    sh.sub(lambda P: sd_capsule(P, (0, 1.03, -0.118), (0, 1.40, -0.118), 0.010), 0.025)
    return sh

def thigh_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_HIP)
    S_rcone(sh, (0.004, -0.030, 0.0), (0, -0.440, 0.0), 0.084, 0.050, 0.03)
    S_ell(sh, (0.008, -0.210, 0.030), (0.066, 0.175, 0.058), 0.03)   # cuádriceps
    S_ell(sh, (0.034, -0.230, 0.004), (0.046, 0.165, 0.058), 0.03)   # vasto lateral
    S_ell(sh, (-0.030, -0.345, 0.024), (0.040, 0.075, 0.042), 0.03)  # vasto medial
    S_ell(sh, (0.0, -0.210, -0.030), (0.063, 0.165, 0.055), 0.03)    # isquios
    S_ell(sh, (-0.030, -0.120, -0.004), (0.052, 0.120, 0.062), 0.03) # aductores
    S_sphere(sh, (0, -0.440, 0), R_KNEE, 0.02)
    S_ell(sh, (0, -0.425, 0.042), (0.026, 0.030, 0.016), 0.015)      # rótula
    return sh

def shin_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_KNEE - EPS)
    S_rcone(sh, (0, -0.030, 0.0), (0, -0.430, 0.0), 0.047, 0.031, 0.03)
    S_ell(sh, (-0.016, -0.115, -0.030), (0.034, 0.085, 0.034), 0.03)  # gemelo medial
    S_ell(sh, (0.018, -0.105, -0.027), (0.030, 0.075, 0.030), 0.03)   # gemelo lateral
    S_ell(sh, (0.0, -0.215, -0.018), (0.040, 0.110, 0.034), 0.03)     # sóleo
    S_ell(sh, (0.012, -0.140, 0.022), (0.020, 0.120, 0.020), 0.02)    # tibial anterior
    S_cap(sh, (0, -0.300, -0.022), (0, -0.425, -0.028), 0.015, 0.02)  # Aquiles
    S_sphere(sh, (0, -0.430, 0), R_ANKLE, 0.02)
    S_sphere(sh, (0.030, -0.425, 0.0), 0.013, 0.012)                  # maléolos
    S_sphere(sh, (-0.026, -0.418, 0.004), 0.013, 0.012)
    return sh

def foot_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_ANKLE - EPS)
    S_ell(sh, (0.0, -0.050, -0.035), (0.032, 0.032, 0.040), 0.02)    # talón
    S_ell(sh, (0.006, -0.050, 0.050), (0.040, 0.034, 0.092), 0.03)   # mediopié
    S_ell(sh, (0.008, -0.062, 0.128), (0.047, 0.020, 0.042), 0.02)   # antepié
    sh.inter(lambda P: sd_halfspace_y_above(P, -0.080), 0.006)
    return sh

def toes_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), 0.018)
    S_ell(sh, (0.0, -0.002, 0.028), (0.044, 0.016, 0.036), 0.015)
    sh.inter(lambda P: sd_halfspace_y_above(P, -0.018), 0.004)
    return sh

def upperarm_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_SHO)
    S_ell(sh, (0.010, -0.052, 0.0), (0.052, 0.088, 0.056), 0.03)      # deltoides
    S_rcone(sh, (0, -0.060, 0), (0, -0.300, 0), 0.045, 0.036, 0.03)
    S_ell(sh, (0.0, -0.175, 0.022), (0.035, 0.085, 0.032), 0.025)     # bíceps
    S_ell(sh, (0.0, -0.145, -0.022), (0.040, 0.105, 0.036), 0.025)    # tríceps
    S_sphere(sh, (0, -0.300, 0), R_ELB, 0.02)
    return sh

def forearm_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_ELB - EPS)
    S_rcone(sh, (0, -0.020, 0), (0, -0.255, 0), 0.040, 0.024, 0.03)
    S_ell(sh, (0.0, -0.075, 0.0), (0.042, 0.085, 0.037), 0.03)
    S_ell(sh, (0.0, -0.235, 0.0), (0.018, 0.030, 0.027), 0.02)       # muñeca (más ancha en z)
    S_sphere(sh, (0, -0.255, 0), R_WRI, 0.015)
    return sh

def hand_open_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_WRI - EPS)
    S_box(sh, (0.0, -0.052, 0.0), (0.015, 0.045, 0.040), 0.013, 0.015)
    for z, L in ((0.027, 0.070), (0.009, 0.080), (-0.009, 0.076), (-0.026, 0.062)):
        a = (0.0, -0.092, z); b = (-0.012, -0.092 - L, z * 1.05)
        S_cap(sh, a, b, 0.0093, 0.008)
    S_cap(sh, (-0.006, -0.028, 0.034), (-0.022, -0.074, 0.060), 0.0105, 0.012)  # pulgar
    return sh

def hand_grip_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_WRI - EPS)
    S_box(sh, (0.0, -0.050, 0.0), (0.015, 0.040, 0.040), 0.013, 0.015)
    S_cap(sh, (-0.006, -0.098, -0.034), (-0.006, -0.098, 0.034), 0.022, 0.012)  # dedos cerrados
    S_cap(sh, (-0.010, -0.036, 0.036), (-0.032, -0.080, 0.034), 0.0105, 0.010)  # pulgar
    return sh

def head_shape():
    sh = Shape()
    S_sphere(sh, (0, 0, 0), R_NECKTOP - EPS)
    S_ell(sh, (0, 0.115, 0.000), (0.077, 0.100, 0.096), 0.03)   # cráneo
    S_ell(sh, (0, 0.062, 0.040), (0.060, 0.074, 0.068), 0.035)  # cara
    S_ell(sh, (0, 0.010, 0.060), (0.040, 0.030, 0.040), 0.03)   # mentón / mandíbula
    S_ell(sh, (0, 0.078, 0.106), (0.011, 0.024, 0.016), 0.012)  # nariz
    S_ell(sh, (0, 0.113, 0.087), (0.055, 0.014, 0.020), 0.015)  # arco superciliar
    for s in (1, -1):
        S_ell(sh, (s * 0.045, 0.076, 0.075), (0.022, 0.016, 0.018), 0.015)  # pómulos
        S_ell(sh, (s * 0.077, 0.086, 0.000), (0.010, 0.028, 0.018), 0.01)   # orejas
    S_ell(sh, (0, 0.036, 0.097), (0.022, 0.008, 0.010), 0.01)   # labios
    for s in (1, -1):
        sh.sub(lambda P, s=s: sd_sphere(P, (s * 0.030, 0.094, 0.101), 0.0135), 0.012)
    return sh

# ---------------------------------------------------------------- malla
def build_mesh(shape, h, margin=0.012, target_tris=None, label=''):
    lo = np.min([b[0] for b in shape.bounds], axis=0) - margin
    hi = np.max([b[1] for b in shape.bounds], axis=0) + margin
    nx, ny, nz = [int(math.ceil((hi[i] - lo[i]) / h)) + 1 for i in range(3)]
    xs = lo[0] + np.arange(nx) * h
    ys = lo[1] + np.arange(ny) * h
    zs = lo[2] + np.arange(nz) * h
    X, Y, Z = np.meshgrid(xs, ys, zs, indexing='ij')
    P = np.stack([X.ravel(), Y.ravel(), Z.ravel()], axis=1)
    vol = np.empty(len(P))
    CH = 2_000_000
    for i in range(0, len(P), CH):
        vol[i:i + CH] = shape(P[i:i + CH])
    vol = vol.reshape(nx, ny, nz)
    verts, faces, _, _ = marching_cubes(vol, level=0.0, spacing=(h, h, h))
    verts = verts + lo
    faces = faces.astype(np.int64)
    # orientación: normales de cara hacia fuera (gradiente del SDF)
    if target_tris and len(faces) > target_tris:
        ratio = 1.0 - target_tris / len(faces)
        v2, f2 = fast_simplification.simplify(verts.astype(np.float32), faces.astype(np.int32), target_reduction=ratio)
        verts, faces = v2.astype(np.float64), f2.astype(np.int64)
    # proyectar vértices de vuelta a la superficie (unas iteraciones de Newton)
    for _ in range(2):
        d = shape(verts)
        g = sdf_grad(shape, verts)
        verts = verts - d[:, None] * g
    nrm = sdf_grad(shape, verts)
    fn = np.cross(verts[faces[:, 1]] - verts[faces[:, 0]], verts[faces[:, 2]] - verts[faces[:, 0]])
    cen = verts[faces].mean(axis=1)
    out = np.sum(fn * sdf_grad(shape, cen), axis=1)
    if np.mean(out < 0) > 0.5:
        faces = faces[:, [0, 2, 1]]
    print(f'  {label:12s} grid {nx}x{ny}x{nz}  verts {len(verts):6d}  tris {len(faces):6d}', file=sys.stderr)
    return verts, nrm, faces

def sdf_grad(shape, P, e=4e-4):
    ex = np.array([e, 0, 0]); ey = np.array([0, e, 0]); ez = np.array([0, 0, e])
    g = np.stack([shape(P + ex) - shape(P - ex),
                  shape(P + ey) - shape(P - ey),
                  shape(P + ez) - shape(P - ez)], axis=1)
    n = np.linalg.norm(g, axis=1, keepdims=True)
    return g / np.maximum(n, 1e-12)

def raycast(shape, origin, direction, maxd=0.5):
    o = _v(origin); dvec = _v(direction); dvec = dvec / np.linalg.norm(dvec)
    t0 = 0.0; step = 0.002
    if shape(o[None])[0] > 0:
        raise ValueError(f'origen fuera del cuerpo {origin}')
    t = 0.0
    while t < maxd:
        t += step
        if shape((o + dvec * t)[None])[0] > 0:
            break
    a, b = t - step, t
    for _ in range(40):
        m = 0.5 * (a + b)
        if shape((o + dvec * m)[None])[0] > 0: b = m
        else: a = m
    p = o + dvec * (0.5 * (a + b))
    n = sdf_grad(shape, p[None])[0]
    return p, n

# ---------------------------------------------------------------- músculos (cabezas)
# Cada cabeza: región elipsoidal/lente sobre la piel, con eje X a lo largo de las fibras.
#  limb: (t_metros_desde_articulación_proximal, theta_grados) 0=anterior, 90=lateral, 180=posterior, -90=medial
#  torso: (y_mundo, azimut_grados) 0=frente, 90=izquierda(+x), 180=espalda

def limb_point(shape, L, t, theta, side=1, axis_dir=(0, -1, 0), z_off=0.0):
    th = math.radians(theta)
    o = np.array([0.0, -t, z_off])
    d = np.array([math.sin(th) * side, 0.0, math.cos(th)])
    return raycast(shape, o, d)

def torso_point(shape, y, theta, zc=-0.012, xc=0.0):
    th = math.radians(theta)
    # el eje del cuello está algo más atrás; ajustar el centro según la altura
    if y > 1.47: zc = -0.030
    o = np.array([xc, y, zc])
    d = np.array([math.sin(th), 0.0, math.cos(th)])
    return raycast(shape, o, d)

def make_head(shape, kind, p0, p1, w, c=0.045, e=0.6, tendon=0.12, bands=None,
              mid_theta=None, name='', group='', inset=0.004, extend=1.04, side=1, L=None, xc=0.0):
    if kind == 'limb':
        P0, N0 = limb_point(shape, L, p0[0], p0[1], side)
        P1, N1 = limb_point(shape, L, p1[0], p1[1], side)
        mt = 0.5 * (p0[0] + p1[0])
        mth = mid_theta if mid_theta is not None else 0.5 * (p0[1] + p1[1])
        PM, NM = limb_point(shape, L, mt, mth, side)
    else:
        P0, N0 = torso_point(shape, p0[0], p0[1], xc=xc)
        P1, N1 = torso_point(shape, p1[0], p1[1], xc=xc)
        my = 0.5 * (p0[0] + p1[0])
        mth = mid_theta if mid_theta is not None else 0.5 * (p0[1] + p1[1])
        PM, NM = torso_point(shape, my, mth, xc=xc)
    X = P1 - P0; a = np.linalg.norm(X) * 0.5 * extend; X = X / np.linalg.norm(X)
    N = (N0 + N1 + 2 * NM); N = N / np.linalg.norm(N)
    Z = N - (N @ X) * X; Z = Z / np.linalg.norm(Z)
    Y = np.cross(Z, X)
    C = 0.5 * (P0 + P1)
    # centro: sobre la superficie en la dirección de la normal media
    C = PM + (C - PM) - ((C - PM) @ Z) * Z  # proyecta el punto medio de la cuerda al plano tangente de PM
    C = C - Z * inset
    out = dict(name=name, group=group, c=C.tolist(), X=X.tolist(), Y=Y.tolist(), Z=Z.tolist(),
               r=[float(a), float(w), float(c)], e=float(e), tendon=float(tendon))
    if bands:
        # bandas dadas como alturas/posiciones en mundo (torso) → coordenada normalizada sobre X
        bl = []
        for by in bands:
            # punto del eje del músculo a esa altura: resolver C + X*s, con y = by
            s = (by - C[1]) / X[1] if abs(X[1]) > 1e-6 else 0.0
            bl.append(float(s / a))
        out['bands'] = bl
    return out

def mirror_head(h):
    m = dict(h)
    m['c'] = [-h['c'][0], h['c'][1], h['c'][2]]
    m['X'] = [-h['X'][0], h['X'][1], h['X'][2]]
    m['Y'] = [-h['Y'][0], h['Y'][1], h['Y'][2]]
    m['Z'] = [-h['Z'][0], h['Z'][1], h['Z'][2]]
    m['name'] = h['name'].replace('_L', '_R')
    return m

def heads_thigh(sh):
    H = []
    L = 0.44
    H.append(make_head(sh, 'limb', (0.04, 6), (0.405, 0), 0.037, e=0.55, tendon=0.15, name='recto_femoral_L', group='cuadriceps', L=L))
    H.append(make_head(sh, 'limb', (0.06, 70), (0.400, 40), 0.050, e=0.5, tendon=0.12, name='vasto_lateral_L', group='cuadriceps', L=L, mid_theta=62))
    H.append(make_head(sh, 'limb', (0.20, -44), (0.418, -16), 0.036, e=0.5, tendon=0.10, name='vasto_medial_L', group='cuadriceps', L=L))
    H.append(make_head(sh, 'limb', (0.03, 45), (0.20, -10), 0.011, e=0.9, tendon=0.05, name='sartorio_a_L', group='sartorio', L=L))
    H.append(make_head(sh, 'limb', (0.20, -10), (0.42, -95), 0.011, e=0.9, tendon=0.10, name='sartorio_b_L', group='sartorio', L=L))
    H.append(make_head(sh, 'limb', (0.03, -74), (0.31, -100), 0.046, e=0.5, tendon=0.10, name='aductor_largo_L', group='aductores', L=L))
    H.append(make_head(sh, 'limb', (0.05, -128), (0.42, -120), 0.020, e=0.7, tendon=0.15, name='gracil_L', group='aductores', L=L))
    H.append(make_head(sh, 'limb', (0.05, 156), (0.41, 130), 0.048, e=0.5, tendon=0.15, name='biceps_femoral_L', group='isquiotibiales', L=L))
    H.append(make_head(sh, 'limb', (0.05, 204), (0.41, 222), 0.048, e=0.5, tendon=0.15, name='semitendinoso_L', group='isquiotibiales', L=L))
    H.append(make_head(sh, 'limb', (0.00, 72), (0.13, 84), 0.022, e=0.6, tendon=0.25, name='tfl_L', group='tfl', L=L))
    H.append(make_head(sh, 'limb', (0.00, -12), (0.10, -40), 0.024, e=0.55, tendon=0.15, name='iliopsoas_L', group='flexores_cadera', L=L))
    return H

def heads_shin(sh):
    L = 0.43; H = []
    H.append(make_head(sh, 'limb', (0.015, -150), (0.205, 183), 0.032, e=0.55, tendon=0.16, name='gemelo_medial_L', group='gastrocnemio', L=L))
    H.append(make_head(sh, 'limb', (0.015, 146), (0.185, 175), 0.028, e=0.55, tendon=0.16, name='gemelo_lateral_L', group='gastrocnemio', L=L))
    H.append(make_head(sh, 'limb', (0.13, 128), (0.36, 172), 0.022, e=0.6, tendon=0.30, name='soleo_lat_L', group='soleo', L=L))
    H.append(make_head(sh, 'limb', (0.13, -132), (0.36, -172), 0.022, e=0.6, tendon=0.30, name='soleo_med_L', group='soleo', L=L))
    H.append(make_head(sh, 'limb', (0.05, 34), (0.37, 12), 0.016, e=0.7, tendon=0.26, name='tibial_anterior_L', group='tibial_anterior', L=L))
    H.append(make_head(sh, 'limb', (0.06, 96), (0.37, 122), 0.013, e=0.7, tendon=0.25, name='peroneo_L', group='peroneos', L=L))
    return H

def heads_upperarm(sh):
    L = 0.30; H = []
    H.append(make_head(sh, 'limb', (0.005, 30), (0.135, 72), 0.028, e=0.55, tendon=0.12, name='deltoide_ant_L', group='deltoide_anterior', L=L))
    H.append(make_head(sh, 'limb', (-0.010, 95), (0.145, 86), 0.032, e=0.55, tendon=0.12, name='deltoide_med_L', group='deltoide_medio', L=L))
    H.append(make_head(sh, 'limb', (0.005, 152), (0.135, 104), 0.028, e=0.55, tendon=0.12, name='deltoide_post_L', group='deltoide_posterior', L=L))
    H.append(make_head(sh, 'limb', (0.08, 4), (0.285, 0), 0.026, e=0.75, tendon=0.16, name='biceps_L', group='biceps', L=L))
    H.append(make_head(sh, 'limb', (0.17, 62), (0.285, 34), 0.014, e=0.7, tendon=0.12, name='braquial_L', group='braquial', L=L))
    H.append(make_head(sh, 'limb', (0.06, 196), (0.275, 180), 0.022, e=0.7, tendon=0.18, name='triceps_largo_L', group='triceps', L=L))
    H.append(make_head(sh, 'limb', (0.08, 148), (0.250, 170), 0.020, e=0.7, tendon=0.15, name='triceps_lat_L', group='triceps', L=L))
    return H

def heads_forearm(sh):
    L = 0.255; H = []
    H.append(make_head(sh, 'limb', (0.00, 40), (0.21, 18), 0.017, e=0.7, tendon=0.22, name='braquiorradial_L', group='antebrazo_extensores', L=L))
    H.append(make_head(sh, 'limb', (0.02, -72), (0.22, -82), 0.030, e=0.6, tendon=0.25, name='flexores_L', group='antebrazo_flexores', L=L))
    H.append(make_head(sh, 'limb', (0.02, 112), (0.22, 100), 0.027, e=0.6, tendon=0.25, name='extensores_L', group='antebrazo_extensores', L=L))
    return H

def heads_torso(sh):
    H = []
    T = lambda *a, **k: H.append(make_head(sh, 'torso', *a, **k))
    T((1.035, 168), (0.875, 116), 0.060, c=0.065, e=0.55, tendon=0.10, name='gluteo_mayor_L', group='gluteo_mayor', mid_theta=150)
    T((1.060, 140), (0.985, 100), 0.036, c=0.05, e=0.5, tendon=0.12, name='gluteo_medio_L', group='gluteo_medio')
    T((0.925, 6), (1.355, 13), 0.038, c=0.04, e=0.32, tendon=0.06, name='recto_abdominal_L', group='recto_abdominal',
      bands=[1.068, 1.165, 1.262], mid_theta=9)
    T((1.285, 58), (1.030, 30), 0.048, c=0.045, e=0.5, tendon=0.10, name='oblicuo_ext_L', group='oblicuos', mid_theta=52)
    T((1.320, 63), (1.225, 78), 0.026, c=0.04, e=0.55, tendon=0.10, name='serrato_L', group='serrato')
    T((1.432, 7), (1.412, 50), 0.022, c=0.04, e=0.5, tendon=0.10, name='pectoral_clav_L', group='pectoral')
    T((1.318, 5), (1.398, 54), 0.046, c=0.045, e=0.5, tendon=0.10, name='pectoral_est_L', group='pectoral', mid_theta=24)
    T((1.100, 162), (1.360, 106), 0.058, c=0.05, e=0.6, tendon=0.10, name='dorsal_L', group='dorsal', mid_theta=128)
    T((1.255, 172), (1.370, 112), 0.032, c=0.045, e=0.55, tendon=0.10, name='dorsal_sup_L', group='dorsal')
    T((1.560, 168), (1.452, 112), 0.024, c=0.045, e=0.55, tendon=0.10, name='trapecio_sup_L', group='trapecio_superior', mid_theta=140)
    T((1.432, 178), (1.432, 132), 0.030, c=0.045, e=0.5, tendon=0.10, name='trapecio_med_L', group='trapecio_medio', mid_theta=155)
    T((1.250, 176), (1.405, 146), 0.030, c=0.045, e=0.55, tendon=0.10, name='trapecio_inf_L', group='trapecio_inferior')
    T((1.385, 174), (1.330, 150), 0.024, c=0.04, e=0.5, tendon=0.08, name='romboides_L', group='romboides')
    T((1.360, 152), (1.410, 124), 0.025, c=0.045, e=0.5, tendon=0.10, name='infraespinoso_L', group='manguito_rotador')
    T((1.300, 140), (1.360, 118), 0.015, c=0.045, e=0.6, tendon=0.10, name='redondo_L', group='manguito_rotador')
    T((0.985, 172), (1.330, 168), 0.026, c=0.04, e=0.4, tendon=0.10, name='erector_L', group='erectores', mid_theta=171)
    T((1.050, 150), (1.150, 148), 0.020, c=0.04, e=0.5, tendon=0.10, name='cuadrado_lumbar_L', group='cuadrado_lumbar')
    T((0.985, 34), (1.105, 55), 0.040, c=0.04, e=0.5, tendon=0.10, name='transverso_L', group='transverso')
    T((1.590, 92), (1.470, 18), 0.012, c=0.03, e=0.6, tendon=0.15, name='ecm_L', group='esternocleidomastoideo')
    T((0.965, 28), (0.905, 40), 0.022, c=0.04, e=0.5, tendon=0.10, name='psoas_L', group='flexores_cadera')
    return H

def foot_heads():
    # región plantar, definida en bruto
    return [dict(name='plantar_L', group='pie_intrinsecos', c=[0.006, -0.079, 0.050],
                 X=[0, 0, 1], Y=[1, 0, 0], Z=[0, -1, 0], r=[0.105, 0.034, 0.012], e=0.6, tendon=0.2)]

# ---------------------------------------------------------------- exportación
def b64(arr, dt):
    return base64.b64encode(np.ascontiguousarray(arr, dtype=dt).tobytes()).decode('ascii')

def pack(verts, nrm, faces, extra=None):
    d = dict(position=b64(verts, np.float32), normal=b64(nrm, np.float32),
             index=b64(faces.ravel(), np.uint32), nv=int(len(verts)), nf=int(len(faces)))
    if extra: d.update(extra)
    return d

def mirror_mesh(verts, nrm, faces):
    v = verts.copy(); v[:, 0] *= -1
    n = nrm.copy(); n[:, 0] *= -1
    f = faces[:, [0, 2, 1]].copy()
    return v, n, f

def torso_skin(verts):
    x, y = np.abs(verts[:, 0]), verts[:, 1]
    def ss(a, b, v):
        t = np.clip((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
    s1 = ss(1.010, 1.080, y)
    s2 = ss(1.150, 1.225, y)
    s3 = ss(1.470, 1.540, y) * (1 - ss(0.055, 0.090, x))
    w = np.stack([1 - s1, s1 * (1 - s2), s2 * (1 - s3), s2 * s3], axis=1)
    w = w / w.sum(axis=1, keepdims=True)
    idx = np.tile(np.array([0, 1, 2, 3], dtype=np.uint16), (len(verts), 1))
    return idx, w

def main(out_path):
    body = dict(joints={k: list(v) for k, v in J.items()}, mtp_local=list(MTP_LOCAL), segments={})
    S = body['segments']

    print('torso', file=sys.stderr)
    tsh = torso_shape()
    v, n, f = build_mesh(tsh, 0.0032, target_tris=46000, label='torso')
    idx, w = torso_skin(v)
    th = heads_torso(tsh)
    th = th + [mirror_head(h) for h in th]
    S['torso'] = pack(v, n, f, dict(skinned=True, bones=['pelvis', 'lumbar', 'chest', 'neck'],
                                    skinIndex=b64(idx, np.uint16), skinWeight=b64(w, np.float32),
                                    origin=[0, 0, 0], heads=th))

    def rigid(name, shape, h, tris, heads=None, origin=None, mirror=True):
        v, n, f = build_mesh(shape, h, target_tris=tris, label=name)
        hl = heads or []
        S[name + '_L'] = pack(v, n, f, dict(origin=list(origin('L')), heads=hl))
        vr, nr, fr = mirror_mesh(v, n, f)
        S[name + '_R'] = pack(vr, nr, fr, dict(origin=list(origin('R')), heads=[mirror_head(x) for x in hl]))

    tsh2 = thigh_shape();    rigid('thigh', tsh2, 0.0030, 12000, heads_thigh(tsh2), lambda s: J['hip_' + s])
    ssh = shin_shape();      rigid('shin', ssh, 0.0028, 9000, heads_shin(ssh), lambda s: J['knee_' + s])
    fsh = foot_shape();      rigid('foot', fsh, 0.0024, 5000, foot_heads(), lambda s: J['ankle_' + s])
    tosh = toes_shape();     rigid('toes', tosh, 0.0020, 1500, [], lambda s: (0, 0, 0))
    ush = upperarm_shape();  rigid('upperarm', ush, 0.0026, 8000, heads_upperarm(ush), lambda s: J['shoulder_' + s])
    fash = forearm_shape();  rigid('forearm', fash, 0.0024, 6000, heads_forearm(fash), lambda s: J['elbow_' + s])
    rigid('handopen', hand_open_shape(), 0.0016, 5000, [], lambda s: J['wrist_' + s])
    rigid('handgrip', hand_grip_shape(), 0.0018, 4000, [], lambda s: J['wrist_' + s])

    hsh = head_shape()
    v, n, f = build_mesh(hsh, 0.0022, target_tris=14000, label='head')
    S['head'] = pack(v, n, f, dict(origin=list(J['head']), heads=[]))

    with open(out_path, 'w') as fp:
        json.dump(body, fp)
    tot = sum(s['nf'] for s in S.values())
    print('triángulos totales (todas las variantes de mano incluidas):', tot, file=sys.stderr)

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'body.json')
