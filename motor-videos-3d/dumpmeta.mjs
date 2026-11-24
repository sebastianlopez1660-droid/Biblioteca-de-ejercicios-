import { EXERCISES } from './js/exercises.js';
import './js/ex_lote6.js'; import './js/ex_lote7.js'; import './js/ex_lote8.js'; import './js/ex_lote9.js'; import './js/ex_lote10.js';
const out = {};
for (const c of process.argv.slice(2)) { const d = EXERCISES[c]; out[c] = { prim: d.primary.join(' · '), sec: d.secondary.join(' · ') }; }
console.log(JSON.stringify(out));
