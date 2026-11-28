// Uso: node poses.js "CODE:s:az:el,CODE:s:az:el" outdir → varias posturas en una sola página
const fs = require('fs'), path = require('path'), http = require('http');
const { chromium } = require('playwright');
const ROOT = '/home/claude/engine';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2' };
(async () => {
  const [list, out] = process.argv.slice(2);
  const srv = http.createServer((req, resp) => { let u = decodeURIComponent(req.url.split('?')[0]); if (u === '/') u = '/index.html'; const p = path.join(ROOT, u);
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { resp.writeHead(404); resp.end(); return; }
    resp.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(resp); }).listen(0);
  await new Promise((r) => srv.on('listening', r));
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  await page.goto(`http://localhost:${srv.address().port}/`);
  await page.waitForFunction('window.ENGINE_READY === true', null, { timeout: 120000 });
  fs.mkdirSync(out, { recursive: true });
  for (const it of list.split(',')) {
    const [c, s, az, el] = it.split(':');
    try {
      await page.evaluate((c) => window.ENGINE.setup(c), c);
      const url = await page.evaluate(([s, az, el]) => window.ENGINE.render(0, { s, act: 0.5, reveal: 1, noOverlay: true, cam: { az, el } }), [+s, +az, +el]);
      fs.writeFileSync(path.join(out, `${c}_s${s}_az${az}.jpg`), Buffer.from(url.split(',')[1], 'base64'));
    } catch (e) { console.log('ERR', c, e.message); }
  }
  await browser.close(); srv.close();
})();
