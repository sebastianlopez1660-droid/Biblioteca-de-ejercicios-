// Renderizador: sirve el motor, lo abre en Chromium sin ventana y genera fotogramas / video.
// Uso:
//   node render.js still CODE out_dir t1,t2,...           (fotogramas sueltos)
//   node render.js pose CODE out_dir s:az:el,...           (posturas sin overlay)
//   node render.js video CODE out.mp4 [workers]
const http = require('http'), fs = require('fs'), path = require('path');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright');

const ROOT = __dirname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' };
function serve() {
  return new Promise((res) => {
    const srv = http.createServer((req, resp) => {
      let u = decodeURIComponent(req.url.split('?')[0]);
      if (u === '/') u = '/index.html';
      const p = path.join(ROOT, u);
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { resp.writeHead(404); resp.end(); return; }
      resp.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream' });
      fs.createReadStream(p).pipe(resp);
    }).listen(0, () => res(srv));
  });
}

async function openPage(port) {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('PAGE', m.type(), m.text()); });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto(`http://localhost:${port}/`);
  await page.waitForFunction('window.ENGINE_READY === true', null, { timeout: 120000 });
  return { browser, page };
}

const save = (dataUrl, file) => fs.writeFileSync(file, Buffer.from(dataUrl.split(',')[1], 'base64'));

(async () => {
  const [mode, code, outArg, extra] = process.argv.slice(2);
  const srv = await serve();
  const port = srv.address().port;
  try {
    if (mode === 'still' || mode === 'pose') {
      const { browser, page } = await openPage(port);
      const info = await page.evaluate((c) => window.ENGINE.setup(c), code);
      console.log(JSON.stringify(info));
      fs.mkdirSync(outArg, { recursive: true });
      const items = (extra || '0').split(',');
      for (const it of items) {
        let url, name;
        if (mode === 'still') {
          const t = parseFloat(it);
          url = await page.evaluate((t) => window.ENGINE.render(t), t);
          name = `${code}_t${it}.jpg`;
        } else {
          const [s, az, el, dist, ty] = it.split(':').map(Number);
          url = await page.evaluate(([s, az, el, dist, ty]) => window.ENGINE.render(0, { s, act: 0.5, reveal: 1, noOverlay: true, cam: { az, el: el ?? 6, ...(dist ? { dist } : {}), ...(ty ? { ty } : {}) } }), [s, az, el, dist, ty]);
          name = `${code}_s${s}_az${az}.jpg`;
        }
        save(url, path.join(outArg, name));
      }
      await browser.close();
    } else if (mode === 'video') {
      const workers = parseInt(extra || '2', 10);
      const fps = 24;
      const tmp = path.join(path.dirname(outArg), 'frames_' + code);
      fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
      const pages = await Promise.all(Array.from({ length: workers }, () => openPage(port)));
      const infos = await Promise.all(pages.map(p => p.page.evaluate((c) => window.ENGINE.setup(c), code)));
      const dur = infos[0].duration;
      const N = Math.round(dur * fps);
      console.log(`frames ${N}, duración ${dur.toFixed(2)} s`);
      const t0 = Date.now();
      const chunk = Math.ceil(N / workers);
      await Promise.all(pages.map(async ({ page }, w) => {
        for (let i = w * chunk; i < Math.min(N, (w + 1) * chunk); i++) {
          const url = await page.evaluate((t) => window.ENGINE.render(t, { q: 0.93 }), i / fps);
          save(url, path.join(tmp, String(i).padStart(5, '0') + '.jpg'));
          if (i % 60 === 0) console.log(`  w${w} frame ${i} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
        }
      }));
      await Promise.all(pages.map(p => p.browser.close()));
      console.log(`render ${((Date.now() - t0) / 1000).toFixed(0)} s`);
      const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(fps), '-i', path.join(tmp, '%05d.jpg'),
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outArg], { stdio: 'inherit' });
      if (r.status !== 0) throw new Error('ffmpeg falló');
      console.log('ok', outArg, (fs.statSync(outArg).size / 1e6).toFixed(2), 'MB');
    }
  } finally {
    srv.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
