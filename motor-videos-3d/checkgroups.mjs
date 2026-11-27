import fs from 'fs';
const ex = await import('/home/claude/engine/js/exercises.js');
for (const f of fs.readdirSync('/home/claude/engine/js').filter((f) => /^ex_lote\d+\.js$/.test(f))) await import('/home/claude/engine/js/' + f);
const keys = new Set(Object.keys(ex.GROUPS));
const used = new Set();
for (const [c, d] of Object.entries(ex.EXERCISES)) for (const m of [...(d.primary || []), ...(d.secondary || [])]) if (!keys.has(m)) used.add(m + ' <- ' + c.slice(0, 6));
console.log([...keys].join(' | '));
console.log('SIN GRUPO:', [...new Set([...used].map((s) => s.split(' <- ')[0]))].join(' | '));
