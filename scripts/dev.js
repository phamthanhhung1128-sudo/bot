/**
 * Chạy song song API server (cổng 3000) và Vite dev server (cổng 5173).
 * Dùng cho phát triển: npm run dev
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const children = [
  spawn(process.execPath, ['server/index.js'], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js'], { cwd: root, stdio: 'inherit' })
];

let shuttingDown = false;
const shutdown = () => {
  if (shuttingDown) return;
  shuttingDown = true;
  children.forEach((child) => child.kill());
  setTimeout(() => process.exit(0), 300);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
