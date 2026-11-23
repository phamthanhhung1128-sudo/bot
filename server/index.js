import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateDeck } from './engine/generate.js';
import { generateDeckWithLLM, getAIInfo } from './engine/llm.js';
import { buildPptx } from './pptx/builder.js';
import { sanitizeDeck } from './sanitize.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '3mb' }));

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

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'SlideForge AI',
    ai: getAIInfo(),
    uptime: Math.round(process.uptime())
  });
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt = '', options = {} } = req.body || {};
    if (typeof prompt !== 'string' || prompt.trim().length < 2) {
      return res.status(400).json({ error: 'Vui lòng nhập chủ đề hoặc câu lệnh để tạo slide.' });
    }
    if (prompt.length > 1000) {
      return res.status(400).json({ error: 'Câu lệnh quá dài (tối đa 1000 ký tự).' });
    }

    let deck = null;
    let source = 'local';
    if (getAIInfo().hasKey) {
      deck = await generateDeckWithLLM({ prompt, options });
      if (deck) source = 'cloud';
    }
    if (!deck) {
      deck = generateDeck({ prompt, options });
      source = 'local';
    }

    res.json({ ok: true, source, ai: getAIInfo(), deck });
  } catch (error) {
    console.error('[generate]', error);
    res.status(500).json({ error: error.message || 'Không thể tạo bài thuyết trình.' });
  }
});

app.post('/api/export', async (req, res) => {
  try {
    const deck = sanitizeDeck(req.body?.deck);
    const buffer = await buildPptx(deck);
    const filename = `${slugify(deck.title)}.pptx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
    );
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('[export]', error);
    res.status(400).json({ error: error.message || 'Không thể xuất file PowerPoint.' });
  }
});

// Phục vụ giao diện đã build
const dist = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(dist)) {
  app.use(
    express.static(dist, {
      index: false,
      maxAge: '1h',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('index.html')) res.setHeader('Cache-Control', 'no-cache');
      }
    })
  );
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    // Không trả index.html cho các file tĩnh bị thiếu (CSS/JS/ảnh...)
    if (req.path.startsWith('/assets/') || !req.accepts('html')) {
      return res.status(404).send('Not found');
    }
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(path.join(dist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res
      .status(503)
      .send('Giao diện chưa được build. Chạy lệnh: <code>npm run build</code> rồi khởi động lại.');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ SlideForge AI đang chạy tại http://localhost:${PORT}`);
  console.log(`   AI engine: ${getAIInfo().mode} (${getAIInfo().model})`);
});
