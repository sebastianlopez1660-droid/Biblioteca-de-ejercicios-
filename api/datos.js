// Guarda y devuelve los datos de la app en Upstash.
//
// Esto vive en el servidor y no en el navegador por una razón concreta: el token de Upstash
// da acceso total de lectura y borrado a la base. Si estuviera dentro del index.html,
// cualquiera que abriera la página podría ver el código fuente, sacar el token y leer los
// datos de todas las personas evaluadas. Aquí el token nunca sale del servidor de Vercel.
//
// La protección de cara al usuario es una contraseña que se establece desde la propia app
// la primera vez. No se guarda tal cual: se guarda su huella (scrypt con sal aleatoria), que
// no permite recuperar la contraseña original ni siquiera teniendo acceso a la base.

const crypto = require('crypto');

const CLAVE_AUTH = 'biblioteca:auth';
const CLAVE_DATOS = 'biblioteca:datos';
const MIN_PASSWORD = 8;

// La integración de Upstash en Vercel inyecta las credenciales sola, pero el nombre de las
// variables cambia según cómo se haya conectado la base (marketplace de Upstash, o Vercel KV).
// Se aceptan los dos juegos de nombres para no depender de cuál se usó al conectarla.
function credenciales(){
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return (url && token) ? { url, token } : null;
}

// Un único punto de entrada a Upstash, por su API REST: se le manda el comando como lista
// (["SET", clave, valor]) en el cuerpo, que admite valores largos sin problemas de codificación.
async function redis(comando){
  const cred = credenciales();
  if(!cred) throw new Error('sin-credenciales');
  const r = await fetch(cred.url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + cred.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(comando)
  });
  if(!r.ok){
    const texto = await r.text().catch(function(){ return ''; });
    throw new Error('Upstash respondió ' + r.status + ' ' + texto.slice(0, 200));
  }
  const json = await r.json();
  return json.result;
}

function huella(password, salt){
  return crypto.scryptSync(String(password), salt, 64).toString('hex');
}

// Comparación en tiempo constante: comparar con === filtraría información sobre cuántos
// caracteres iniciales son correctos, lo que facilita adivinar la contraseña por partes.
function coincide(a, b){
  const ba = Buffer.from(String(a), 'hex');
  const bb = Buffer.from(String(b), 'hex');
  if(ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

async function leerAuth(){
  const crudo = await redis(['GET', CLAVE_AUTH]);
  if(!crudo) return null;
  try{ return JSON.parse(crudo); }catch(e){ return null; }
}

// Pausa tras un intento fallido. No hace invulnerable a la fuerza bruta, pero la vuelve
// lenta: sin esto se podrían probar miles de contraseñas por minuto contra este endpoint.
function esperar(ms){
  return new Promise(function(resolve){ setTimeout(resolve, ms); });
}

async function autorizar(password){
  const auth = await leerAuth();
  if(!auth) return { ok: false, codigo: 'sin-configurar' };
  if(!password || !coincide(huella(password, auth.salt), auth.hash)){
    await esperar(1000);
    return { ok: false, codigo: 'password-incorrecta' };
  }
  return { ok: true };
}

module.exports = async function handler(req, res){
  res.setHeader('Cache-Control', 'no-store');

  if(!credenciales()){
    return res.status(500).json({
      error: 'sin-credenciales',
      detalle: 'No se encontraron las credenciales de Upstash. En Vercel: pestaña Storage, ' +
               'conecta la base de datos al proyecto, y vuelve a desplegar.'
    });
  }

  const cuerpo = (req.body && typeof req.body === 'object') ? req.body : {};
  const accion = req.method === 'GET'
    ? ((req.query && req.query.accion) || 'estado')
    : (cuerpo.accion || '');

  try{
    // ¿Ya hay una contraseña puesta? Lo consulta la app al arrancar, antes de pedir nada.
    if(accion === 'estado'){
      const auth = await leerAuth();
      return res.status(200).json({ configurada: !!auth, desde: auth ? auth.creado : null });
    }

    // Primera vez: se reclama la base poniéndole contraseña. Solo funciona si no había ninguna.
    if(accion === 'registrar'){
      const auth = await leerAuth();
      if(auth) return res.status(409).json({ error: 'ya-configurada', desde: auth.creado });
      const password = String(cuerpo.password || '');
      if(password.length < MIN_PASSWORD){
        return res.status(400).json({ error: 'password-corta', minimo: MIN_PASSWORD });
      }
      const salt = crypto.randomBytes(16).toString('hex');
      const registro = { salt: salt, hash: huella(password, salt), creado: new Date().toISOString() };
      // NX: si entre la comprobación de arriba y esta línea alguien se adelantó, no lo pisa.
      const puesto = await redis(['SET', CLAVE_AUTH, JSON.stringify(registro), 'NX']);
      if(!puesto) return res.status(409).json({ error: 'ya-configurada' });
      return res.status(200).json({ ok: true, creado: registro.creado });
    }

    if(accion === 'leer'){
      const permiso = await autorizar(cuerpo.password);
      if(!permiso.ok) return res.status(401).json({ error: permiso.codigo });
      const crudo = await redis(['GET', CLAVE_DATOS]);
      if(!crudo) return res.status(200).json({ vacio: true });
      let guardado;
      try{ guardado = JSON.parse(crudo); }catch(e){ return res.status(200).json({ vacio: true }); }
      return res.status(200).json(guardado);
    }

    if(accion === 'guardar'){
      const permiso = await autorizar(cuerpo.password);
      if(!permiso.ok) return res.status(401).json({ error: permiso.codigo });
      if(!cuerpo.datos || typeof cuerpo.datos !== 'object'){
        return res.status(400).json({ error: 'datos-invalidos' });
      }
      const registro = {
        datos: cuerpo.datos,
        actualizado: cuerpo.actualizado || new Date().toISOString(),
        dispositivo: String(cuerpo.dispositivo || '').slice(0, 60)
      };
      await redis(['SET', CLAVE_DATOS, JSON.stringify(registro)]);
      return res.status(200).json({ ok: true, actualizado: registro.actualizado });
    }

    return res.status(400).json({ error: 'accion-desconocida' });
  }catch(e){
    return res.status(500).json({ error: 'fallo-servidor', detalle: String(e.message || e).slice(0, 300) });
  }
};
