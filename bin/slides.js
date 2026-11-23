#!/usr/bin/env node
/**
 * SlideForge AI — dòng lệnh tạo file PowerPoint nhanh.
 *
 *   node bin/slides.js "Xu hướng AI 2026" --trang=10 --phong-cach=hiện đại --mau=aurora
 *   node bin/slides.js '/tao "Kế hoạch marketing 2026" --trang=8' --out=./ke-hoach.pptx
 */
import fs from 'node:fs';
import path from 'node:path';
import { generateDeck } from '../server/engine/generate.js';
import { buildPptx } from '../server/pptx/builder.js';

const HELP = `
✨ SlideForge AI — tạo slide PowerPoint bằng câu lệnh

Cách dùng:
  slideforge "Chủ đề của bạn" [tùy chọn]
  node bin/slides.js "Chủ đề của bạn" [tùy chọn]

Tùy chọn:
  --trang=10            Số slide (4–16, mặc định 10)
  --phong-cach=hiện đại modern | playful | minimal | corporate
  --mau=aurora          aurora | sunset | ocean | forest | royal | mono | candy
  --out=./file.pptx     Đường dẫn file xuất (mặc định: ./slideforge-<tên>.pptx)
  --help, -h            Hiện trợ giúp

Ví dụ:
  slideforge "Xu hướng AI 2026 và cơ hội cho doanh nghiệp" --trang=12 --mau=ocean
  slideforge '/tao "Kế hoạch marketing quý 1" --trang=8 --phong-cach=chuyên nghiệp'
`;

function slugify(text) {
  const slug = String(text || 'bai-trinh-bay')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || 'bai-trinh-bay';
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('--help') || args.includes('-h')) {
    console.log(HELP);
    process.exit(args.length ? 0 : 1);
  }

  let out = null;
  const rest = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--out' || arg === '-o') {
      out = args[i + 1];
      i += 1;
    } else if (arg.startsWith('--out=')) {
      out = arg.slice('--out='.length);
    } else {
      rest.push(arg);
    }
  }

  const prompt = rest.join(' ').trim();
  if (!prompt) {
    console.log(HELP);
    process.exit(1);
  }

  console.log('✨ Đang phân tích câu lệnh...');
  const deck = generateDeck({ prompt, options: {} });
  console.log(`   Chủ đề: ${deck.title}`);
  console.log(`   ${deck.slideCount} slide · bảng màu ${deck.theme} · phong cách ${deck.style}`);

  console.log('🎨 Đang dựng file PowerPoint...');
  const buffer = await buildPptx(deck);
  const file = path.resolve(out || `slideforge-${slugify(deck.title)}.pptx`);
  fs.writeFileSync(file, buffer);
  console.log(`✅ Đã tạo: ${file} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

main().catch((error) => {
  console.error('❌ Lỗi:', error.message);
  process.exit(1);
});
