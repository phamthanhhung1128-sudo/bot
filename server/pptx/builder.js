/**
 * Bộ dựng file PowerPoint (.pptx) thật từ dữ liệu deck.
 * Thiết kế 16:9, dùng shape + chart của pptxgenjs, không cần ảnh ngoài.
 */
import PptxGenJS from 'pptxgenjs';
import { getTheme } from '../../shared/themes.js';

const W = 13.333;
const H = 7.5;
const M = 0.85;
const HEAD_FONT = 'Calibri';
const BODY_FONT = 'Calibri';

function hex(color) {
  return String(color || '#FFFFFF').replace('#', '').toUpperCase();
}

function fitSize(text, base, min, softLimit = 46) {
  const len = String(text || '').length;
  if (len <= softLimit) return base;
  const ratio = softLimit / len;
  return Math.max(min, Math.round(base * (0.55 + ratio * 0.45)));
}

function noLine(color = 'FFFFFF') {
  return { color: hex(color), transparency: 100, width: 0 };
}

function addShape(slide, pptx, type, opts) {
  slide.addShape(type, {
    line: noLine(opts.fill?.color || '#FFFFFF'),
    ...opts
  });
}

function addBackground(slide, theme, style, variant = 'default') {
  slide.background = { color: hex(theme.bg) };

  if (style === 'minimal') {
    addShape(slide, null, 'rect', {
      x: 0, y: 0, w: 0.14, h: H,
      fill: { color: hex(theme.accent) }
    });
    return;
  }

  if (variant === 'cover' || variant === 'closing') {
    addShape(slide, null, 'ellipse', {
      x: 9.4, y: -1.9, w: 5.8, h: 5.8,
      fill: { color: hex(theme.accent), transparency: 84 }
    });
    addShape(slide, null, 'ellipse', {
      x: 10.9, y: 3.5, w: 4.2, h: 4.2,
      fill: { color: hex(theme.accent2), transparency: 88 }
    });
    addShape(slide, null, 'ellipse', {
      x: -1.6, y: 5.4, w: 3.6, h: 3.6,
      fill: { color: hex(theme.accent), transparency: 90 }
    });
    return;
  }

  // Trang nội dung: một vòng tròn lớn mờ ở góc phải
  addShape(slide, null, 'ellipse', {
    x: 11.6, y: -2.2, w: 4.4, h: 4.4,
    fill: { color: hex(theme.accent), transparency: 92 }
  });
  if (style === 'playful') {
    addShape(slide, null, 'ellipse', {
      x: -1.1, y: 5.9, w: 2.6, h: 2.6,
      fill: { color: hex(theme.accent2), transparency: 92 }
    });
  }
  if (style === 'corporate') {
    addShape(slide, null, 'rect', {
      x: 0, y: 0, w: W, h: 0.09,
      fill: { color: hex(theme.accent) }
    });
  }
}

function addHeader(slide, pptx, slideData, theme) {
  slide.addText(String(slideData.kicker || '').toUpperCase(), {
    x: M, y: 0.46, w: 10.5, h: 0.28,
    fontFace: BODY_FONT, fontSize: 9.5, bold: true, charSpacing: 1.4,
    color: hex(theme.accent2), fit: 'shrink'
  });
  slide.addText(String(slideData.title || ''), {
    x: M, y: 0.78, w: 11.6, h: 0.78,
    fontFace: HEAD_FONT, fontSize: fitSize(slideData.title, 30, 22, 44),
    bold: true, color: hex(theme.text), valign: 'top', fit: 'shrink'
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: M, y: 1.58, w: 0.7, h: 0.055,
    fill: { color: hex(theme.accent) }, line: noLine(theme.accent)
  });
}

function addFooter(slide, pptx, deck, index, theme) {
  const title = String(deck.title || '').slice(0, 72);
  slide.addText(title, {
    x: M, y: 7.03, w: 9.5, h: 0.28,
    fontFace: BODY_FONT, fontSize: 8, color: hex(theme.muted), fit: 'shrink'
  });
  slide.addText(String(index + 1).padStart(2, '0'), {
    x: 11.85, y: 7.0, w: 0.65, h: 0.3,
    fontFace: BODY_FONT, fontSize: 9, bold: true, color: hex(theme.muted), align: 'right'
  });
}

function renderCover(slide, pptx, deck, data, theme, style) {
  addBackground(slide, theme, style, 'cover');

  if (style === 'minimal') {
    addShape(slide, null, 'rect', {
      x: 0, y: 0, w: 0.14, h: H, fill: { color: hex(theme.accent) }
    });
  } else {
    addShape(slide, null, 'rect', {
      x: M, y: 1.5, w: 0.9, h: 0.075,
      fill: { color: hex(theme.accent2) }
    });
  }

  slide.addText(String(data.kicker || '').toUpperCase(), {
    x: M, y: 1.72, w: 9, h: 0.3,
    fontFace: BODY_FONT, fontSize: 11, bold: true, charSpacing: 2,
    color: hex(theme.accent2)
  });

  slide.addText(String(data.title || deck.title), {
    x: M, y: 2.08, w: 10.1, h: 2.25,
    fontFace: HEAD_FONT, fontSize: fitSize(data.title, 46, 24, 40),
    bold: true, color: hex(theme.text), valign: 'top', fit: 'shrink',
    lineSpacingMultiple: 0.92
  });

  slide.addText(String(data.subtitle || deck.subtitle || ''), {
    x: M, y: 4.42, w: 8.8, h: 0.75,
    fontFace: BODY_FONT, fontSize: 18, color: hex(theme.muted), valign: 'top', fit: 'shrink'
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: M, y: 6.15, w: 4.4, h: 0.012,
    fill: { color: hex(theme.muted), transparency: 55 }, line: noLine(theme.muted)
  });

  const meta = data.meta || {};
  slide.addText(`${meta.date || ''}   •   ${meta.presenter || 'SlideForge AI'}`, {
    x: M, y: 6.3, w: 8.2, h: 0.32,
    fontFace: BODY_FONT, fontSize: 10.5, color: hex(theme.muted)
  });

  slide.addText('SlideForge AI', {
    x: 10.4, y: 6.3, w: 2.1, h: 0.32,
    fontFace: BODY_FONT, fontSize: 10.5, bold: true,
    color: hex(theme.accent2), align: 'right'
  });
}

function renderAgenda(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const items = Array.isArray(data.items) ? data.items : [];
  const twoCols = items.length > 6;
  const perCol = twoCols ? Math.ceil(items.length / 2) : items.length;
  const rowH = twoCols ? Math.min(0.68, 4.4 / perCol) : Math.min(0.8, 4.7 / Math.max(1, perCol));
  const startY = 1.95;

  items.forEach((item, i) => {
    const col = twoCols ? (i >= perCol ? 1 : 0) : 0;
    const row = twoCols ? i - (col ? perCol : 0) : i;
    const x = M + col * 6.0;
    const y = startY + row * rowH;
    slide.addText(String(i + 1).padStart(2, '0'), {
      x, y, w: 0.62, h: 0.42,
      fontFace: HEAD_FONT, fontSize: 17, bold: true, color: hex(theme.accent), valign: 'middle'
    });
    slide.addText(String(item), {
      x: x + 0.68, y, w: 4.95, h: 0.42,
      fontFace: BODY_FONT, fontSize: 13.5, color: hex(theme.text), valign: 'middle', fit: 'shrink'
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.68, y: y + rowH - 0.06, w: 4.95, h: 0.008,
      fill: { color: hex(theme.muted), transparency: 78 }, line: noLine(theme.muted)
    });
  });

  if (data.meta) {
    slide.addText(String(data.meta), {
      x: M, y: 6.62, w: 8, h: 0.3,
      fontFace: BODY_FONT, fontSize: 10, color: hex(theme.muted)
    });
  }
  addFooter(slide, pptx, deck, index, theme);
}

function renderBullets(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const bullets = Array.isArray(data.bullets) ? data.bullets.slice(0, 6) : [];
  const n = Math.max(1, bullets.length);
  const areaY = 1.95;
  const areaH = 4.85;
  const rowH = Math.min(1.12, areaH / n);
  const titleSize = n >= 6 ? 14 : n >= 5 ? 14.5 : 15.5;
  const descSize = n >= 6 ? 10.5 : 11.5;

  bullets.forEach((bullet, i) => {
    const y = areaY + i * rowH;
    addShape(slide, null, 'roundRect', {
      x: M, y: y + 0.03, w: 11.63, h: rowH - 0.14, rectRadius: 0.06,
      fill: { color: hex(theme.card), transparency: 22 },
      line: { color: hex(theme.accent), transparency: 86, width: 0.5 }
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: M + 0.22, y: y + 0.2, w: 0.44, h: 0.44,
      fill: { color: hex(theme.accent), transparency: 82 },
      line: { color: hex(theme.accent), transparency: 45, width: 0.75 }
    });
    slide.addText(String(i + 1).padStart(2, '0'), {
      x: M + 0.22, y: y + 0.2, w: 0.44, h: 0.44,
      fontFace: BODY_FONT, fontSize: 9.5, bold: true,
      color: hex(theme.accent2), align: 'center', valign: 'middle'
    });
    slide.addText(
      [
        { text: String(bullet.title || ''), options: { bold: true, fontSize: titleSize, color: hex(theme.text), breakLine: true } },
        { text: String(bullet.desc || ''), options: { fontSize: descSize, color: hex(theme.muted) } }
      ],
      {
        x: M + 0.85, y: y + 0.11, w: 10.55, h: rowH - 0.3,
        fontFace: BODY_FONT, valign: 'top', fit: 'shrink', lineSpacingMultiple: 1.02
      }
    );
  });

  addFooter(slide, pptx, deck, index, theme);
}

function renderChecklist(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const items = Array.isArray(data.items) ? data.items.slice(0, 7) : [];
  const n = Math.max(1, items.length);
  const areaY = 1.95;
  const areaH = 4.85;
  const rowH = Math.min(0.9, areaH / n);

  items.forEach((item, i) => {
    const y = areaY + i * rowH;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: M, y: y + 0.02, w: 11.63, h: rowH - 0.12, rectRadius: 0.06,
      fill: { color: hex(theme.card), transparency: 28 },
      line: { color: hex(theme.accent2), transparency: 88, width: 0.5 }
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: M + 0.22, y: y + 0.18, w: 0.42, h: 0.42,
      fill: { color: hex(theme.accent2), transparency: 80 },
      line: { color: hex(theme.accent2), transparency: 40, width: 0.75 }
    });
    slide.addText('✓', {
      x: M + 0.22, y: y + 0.18, w: 0.42, h: 0.42,
      fontFace: BODY_FONT, fontSize: 13, bold: true,
      color: hex(theme.accent2), align: 'center', valign: 'middle'
    });
    slide.addText(String(item), {
      x: M + 0.85, y: y + 0.1, w: 10.55, h: rowH - 0.22,
      fontFace: BODY_FONT, fontSize: 14.5, color: hex(theme.text), valign: 'middle', fit: 'shrink'
    });
  });

  addFooter(slide, pptx, deck, index, theme);
}

function renderStats(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const items = Array.isArray(data.items) ? data.items.slice(0, 3) : [];
  const cardW = 3.62;
  const gap = 0.39;
  items.forEach((item, i) => {
    const x = M + i * (cardW + gap);
    addShape(slide, null, 'roundRect', {
      x, y: 2.05, w: cardW, h: 3.45, rectRadius: 0.08,
      fill: { color: hex(theme.card), transparency: 12 },
      line: { color: hex(theme.accent), transparency: 75, width: 0.75 }
    });
    addShape(slide, null, 'rect', {
      x: x + 0.3, y: 2.35, w: 0.5, h: 0.06,
      fill: { color: hex(i === 1 ? theme.accent2 : theme.accent) }
    });
    slide.addText(String(item.value || ''), {
      x: x + 0.28, y: 2.65, w: cardW - 0.56, h: 1.1,
      fontFace: HEAD_FONT, fontSize: 42, bold: true,
      color: hex(i === 1 ? theme.accent2 : theme.accent), valign: 'middle', fit: 'shrink'
    });
    slide.addText(String(item.label || ''), {
      x: x + 0.28, y: 3.8, w: cardW - 0.56, h: 1.4,
      fontFace: BODY_FONT, fontSize: 12.5, color: hex(theme.muted), valign: 'top', fit: 'shrink'
    });
  });

  if (data.note) {
    slide.addText(String(data.note), {
      x: M, y: 5.85, w: 11.5, h: 0.5,
      fontFace: BODY_FONT, fontSize: 9, italic: true, color: hex(theme.muted), fit: 'shrink'
    });
  }
  addFooter(slide, pptx, deck, index, theme);
}

function renderChart(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const labels = Array.isArray(data.labels) ? data.labels : [];
  const values = Array.isArray(data.values) ? data.values : [];
  if (labels.length && labels.length === values.length) {
    const maxVal = Math.max(...values, 1);
    slide.addChart(
      pptx.ChartType.bar,
      [{ name: 'Giá trị', labels, values }],
      {
        x: M, y: 1.85, w: 11.63, h: 4.35,
        barDir: 'bar',
        chartColors: [hex(theme.accent)],
        showValue: true,
        dataLabelColor: hex(theme.text),
        dataLabelFontSize: 11,
        dataLabelFontFace: BODY_FONT,
        dataLabelPosition: 'outEnd',
        catAxisLabelColor: hex(theme.muted),
        catAxisLabelFontSize: 12,
        catAxisLabelFontFace: BODY_FONT,
        valAxisLabelColor: hex(theme.muted),
        valAxisLabelFontSize: 9,
        valAxisMaxVal: Math.ceil(maxVal * 1.18),
        valGridLine: { color: hex(theme.muted), transparency: 82, size: 0.5 },
        catGridLine: { style: 'none' },
        showLegend: false,
        showTitle: false,
        barGapWidthPct: 55,
        valAxisLineShow: false,
        catAxisLineShow: false
      }
    );
  }
  if (data.note) {
    slide.addText(String(data.note), {
      x: M, y: 6.42, w: 11.5, h: 0.42,
      fontFace: BODY_FONT, fontSize: 9, italic: true, color: hex(theme.muted), fit: 'shrink'
    });
  }
  addFooter(slide, pptx, deck, index, theme);
}

function renderComparison(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const cardW = 5.62;
  const gap = 0.39;
  const cards = [
    { x: M, color: theme.accent, title: data.left?.title || 'Hiện tại', bullets: data.left?.bullets || [] },
    { x: M + cardW + gap, color: theme.accent2, title: data.right?.title || 'Tương lai', bullets: data.right?.bullets || [] }
  ];

  cards.forEach((card) => {
    addShape(slide, null, 'roundRect', {
      x: card.x, y: 1.95, w: cardW, h: 4.55, rectRadius: 0.08,
      fill: { color: hex(theme.card), transparency: 12 },
      line: { color: hex(card.color), transparency: 70, width: 0.75 }
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: card.x, y: 1.95, w: cardW, h: 0.72, rectRadius: 0.08,
      fill: { color: hex(card.color), transparency: 82 },
      line: noLine(card.color)
    });
    slide.addText(String(card.title), {
      x: card.x + 0.28, y: 1.95, w: cardW - 0.56, h: 0.72,
      fontFace: BODY_FONT, fontSize: 15, bold: true, color: hex(card.color),
      valign: 'middle', fit: 'shrink'
    });
    card.bullets.slice(0, 6).forEach((bullet, i) => {
      const y = 2.92 + i * 0.58;
      slide.addText('•', {
        x: card.x + 0.26, y, w: 0.25, h: 0.36,
        fontFace: BODY_FONT, fontSize: 16, bold: true, color: hex(card.color)
      });
      slide.addText(String(bullet), {
        x: card.x + 0.5, y, w: cardW - 0.78, h: 0.52,
        fontFace: BODY_FONT, fontSize: 12.5, color: hex(theme.text), valign: 'middle', fit: 'shrink'
      });
    });
  });

  addFooter(slide, pptx, deck, index, theme);
}

function renderTimeline(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style);
  addHeader(slide, pptx, data, theme);
  const steps = Array.isArray(data.steps) ? data.steps.slice(0, 6) : [];
  const n = Math.max(1, steps.length);
  const startX = M + 0.4;
  const endX = W - M - 0.4;
  const usable = endX - startX;
  const stepW = usable / n;
  const lineY = 2.75;

  slide.addShape(pptx.ShapeType.rect, {
    x: startX + stepW / 2, y: lineY, w: usable - stepW, h: 0.025,
    fill: { color: hex(theme.accent), transparency: 45 }, line: noLine(theme.accent)
  });

  steps.forEach((step, i) => {
    const cx = startX + stepW * i + stepW / 2;
    const color = i % 2 === 0 ? theme.accent : theme.accent2;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx - 0.31, y: lineY - 0.31, w: 0.62, h: 0.62,
      fill: { color: hex(theme.bg) },
      line: { color: hex(color), width: 1.25 }
    });
    slide.addText(String(i + 1), {
      x: cx - 0.31, y: lineY - 0.31, w: 0.62, h: 0.62,
      fontFace: BODY_FONT, fontSize: 13, bold: true, color: hex(color),
      align: 'center', valign: 'middle'
    });
    slide.addText(String(step.title || ''), {
      x: cx - stepW / 2 + 0.1, y: lineY + 0.52, w: stepW - 0.2, h: 0.6,
      fontFace: BODY_FONT, fontSize: 13, bold: true, color: hex(theme.text),
      align: 'center', valign: 'top', fit: 'shrink'
    });
    slide.addText(String(step.desc || ''), {
      x: cx - stepW / 2 + 0.1, y: lineY + 1.12, w: stepW - 0.2, h: 1.2,
      fontFace: BODY_FONT, fontSize: 10.5, color: hex(theme.muted),
      align: 'center', valign: 'top', fit: 'shrink'
    });
  });

  addFooter(slide, pptx, deck, index, theme);
}

function renderQuote(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style, 'cover');
  slide.addText(String(data.kicker || '').toUpperCase(), {
    x: M, y: 0.9, w: 10, h: 0.3,
    fontFace: BODY_FONT, fontSize: 9.5, bold: true, charSpacing: 1.4, color: hex(theme.accent2)
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.25, y: 1.65, w: 0.09, h: 3.4,
    fill: { color: hex(theme.accent) }
  });
  slide.addText('“', {
    x: 1.6, y: 1.25, w: 1.4, h: 1.3,
    fontFace: 'Georgia', fontSize: 96, bold: true, color: hex(theme.accent)
  });
  slide.addText(String(data.text || ''), {
    x: 2.15, y: 1.95, w: 9.6, h: 2.9,
    fontFace: HEAD_FONT, fontSize: fitSize(data.text, 30, 22, 70), italic: true,
    color: hex(theme.text), valign: 'top', fit: 'shrink', lineSpacingMultiple: 1.08
  });
  slide.addText(String(data.author ? `— ${data.author}` : ''), {
    x: 2.15, y: 5.05, w: 9.6, h: 0.4,
    fontFace: BODY_FONT, fontSize: 14, bold: true, color: hex(theme.accent2)
  });
  addFooter(slide, pptx, deck, index, theme);
}

function renderClosing(slide, pptx, deck, data, index, theme, style) {
  addBackground(slide, theme, style, 'closing');
  slide.addShape(pptx.ShapeType.rect, {
    x: W / 2 - 0.45, y: 1.9, w: 0.9, h: 0.075,
    fill: { color: hex(theme.accent2) }
  });
  slide.addText(String(data.title || 'Cảm ơn bạn đã lắng nghe!'), {
    x: 1.0, y: 2.25, w: 11.33, h: 1.2,
    fontFace: HEAD_FONT, fontSize: fitSize(data.title, 44, 30, 30), bold: true,
    color: hex(theme.text), align: 'center', valign: 'middle', fit: 'shrink'
  });
  slide.addText(String(data.subtitle || ''), {
    x: 1.8, y: 3.6, w: 9.73, h: 0.6,
    fontFace: BODY_FONT, fontSize: 19, color: hex(theme.muted), align: 'center', fit: 'shrink'
  });
  slide.addText(String(data.contact || 'Tạo bởi SlideForge AI'), {
    x: 1.8, y: 5.55, w: 9.73, h: 0.4,
    fontFace: BODY_FONT, fontSize: 12, bold: true, color: hex(theme.accent2), align: 'center'
  });
  addFooter(slide, pptx, deck, index, theme);
}

const RENDERERS = {
  cover: renderCover,
  agenda: renderAgenda,
  bullets: renderBullets,
  checklist: renderChecklist,
  stats: renderStats,
  chart: renderChart,
  comparison: renderComparison,
  timeline: renderTimeline,
  quote: renderQuote,
  closing: renderClosing
};

export async function buildPptx(deck) {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'SlideForge AI';
  pptx.company = 'SlideForge AI';
  pptx.subject = deck.subtitle || deck.topic || 'Bài thuyết trình';
  pptx.title = deck.title || 'Bài thuyết trình';
  pptx.lang = 'vi-VN';
  pptx.theme = {
    headFontFace: HEAD_FONT,
    bodyFontFace: BODY_FONT,
    lang: 'vi-VN'
  };

  const theme = getTheme(deck.theme);
  const style = ['modern', 'playful', 'minimal', 'corporate'].includes(deck.style) ? deck.style : 'modern';
  const slides = Array.isArray(deck.slides) ? deck.slides : [];

  slides.forEach((slideData, index) => {
    const slide = pptx.addSlide();
    const renderer = RENDERERS[slideData.layout] || renderBullets;
    renderer(slide, pptx, deck, slideData, index, theme, style);
    if (slideData.notes) slide.addNotes(String(slideData.notes));
  });

  return pptx.write({ outputType: 'nodebuffer' });
}
