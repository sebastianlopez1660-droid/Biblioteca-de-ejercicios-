// valida que todos los módulos del motor se importan (excepto los que usan el DOM)
import fs from 'fs';
const skip = new Set(['main.js', 'overlay.js']);
let bad = 0;
const num = (f) => +((f.match(/\d+/) || [0])[0]);
for (const f of fs.readdirSync('./js').filter((f) => f.endsWith('.js') && !skip.has(f)).sort((a, b) => (a.startsWith('ex_lote') && b.startsWith('ex_lote') ? num(a) - num(b) : a.localeCompare(b)))) {
  try { await import('./js/' + f); } catch (e) { bad++; console.log('ERR', f, e.message); }
}
console.log(bad ? `FALLOS: ${bad}` : 'todo ok');
