// Shim to strip --root flag injected by Claude preview_start tool.
// This Vite version does not support --root as a CLI option.
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Strip --root <value> from injected args
const extra = process.argv.slice(2);
const filtered = [];
for (let i = 0; i < extra.length; i++) {
  if (extra[i] === '--root') { i++; } else { filtered.push(extra[i]); }
}

const vite = resolve(__dirname, 'node_modules/.bin/vite');
const child = spawn(vite, filtered, { cwd: __dirname, stdio: 'inherit', shell: true });
child.on('exit', (code) => process.exit(code ?? 0));
