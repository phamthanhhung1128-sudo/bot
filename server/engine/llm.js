/**
 * Tích hợp AI đám mây (tùy chọn).
 * Nếu có biến môi trường OPENAI_API_KEY (hoặc AI_API_KEY), nội dung sẽ được sinh bởi
 * mô hình ngôn ngữ lớn. Nếu không có key hoặc gọi thất bại, hệ thống tự fallback
 * về bộ máy nội dung cục bộ — ứng dụng luôn hoạt động.
 */
import { finalizeDeck, makeNotes } from './generate.js';
import { parsePrompt } from './parser.js';

const BASE_URL = process.env.OPENAI_BASE_URL || process.env.AI_BASE_URL || 'https://api.openai.com/v1';
const MODEL = process.env.OPENAI_MODEL || process.env.AI_MODEL || 'gpt-4o-mini';
const API_KEY = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || '';

const VALID_LAYOUTS = new Set([
  'cover', 'agenda', 'bullets', 'checklist', 'stats', 'chart',
  'comparison', 'timeline', 'quote', 'closing'
]);

export function getAIInfo() {
  return {
    mode: API_KEY ? 'cloud' : 'local',
    model: API_KEY ? MODEL : 'slideforge-local',
    hasKey: Boolean(API_KEY)
  };
}

function clamp(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function str(value, max = 300) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function extractJson(text) {
  if (!text) return null;
  let t = String(text).trim();
  t = t.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(t);
  } catch {
    /* thử tìm JSON bên trong */
  }
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(t.slice(start, end + 1));
    } catch {
      return null;
    }
  }
  return null;
}

function normalizeBullets(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => {
      if (typeof item === 'string') return { title: str(item, 120), desc: '' };
      if (!item || typeof item !== 'object') return null;
      return {
        title: str(item.title ?? item.text ?? item.point, 120),
        desc: str(item.desc ?? item.description ?? item.detail, 240)
      };
    })
    .filter((item) => item && item.title)
    .slice(0, 6);
}

function normalizeSlide(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const layout = VALID_LAYOUTS.has(raw.layout) ? raw.layout : 'bullets';
  const slide = {
    layout,
    kicker: str(raw.kicker, 120),
    title: str(raw.title, 160)
  };
  switch (layout) {
    case 'cover':
      slide.subtitle = str(raw.subtitle, 220);
      slide.meta = {
        presenter: str(raw?.meta?.presenter, 120) || 'Trình bày bởi SlideForge AI',
        date: str(raw?.meta?.date, 60)
      };
      break;
    case 'agenda':
      slide.items = (Array.isArray(raw.items) ? raw.items : [])
        .map((item) => (typeof item === 'string' ? str(item, 120) : str(item?.title, 120)))
        .filter(Boolean)
        .slice(0, 14);
      break;
    case 'bullets':
      slide.bullets = normalizeBullets(raw.bullets ?? raw.items);
      break;
    case 'checklist':
      slide.items = (Array.isArray(raw.items) ? raw.items : [])
        .map((item) => (typeof item === 'string' ? str(item, 160) : str(item?.title, 160)))
        .filter(Boolean)
        .slice(0, 8);
      break;
    case 'stats':
      slide.items = (Array.isArray(raw.items) ? raw.items : [])
        .map((item) => ({
          value: str(item?.value, 40),
          label: str(item?.label ?? item?.desc, 180)
        }))
        .filter((item) => item.value)
        .slice(0, 4);
      slide.note = str(raw.note, 240);
      break;
    case 'chart':
      slide.labels = (Array.isArray(raw.labels) ? raw.labels : []).map((l) => str(l, 60)).filter(Boolean).slice(0, 6);
      slide.values = (Array.isArray(raw.values) ? raw.values : [])
        .map((v) => (Number.isFinite(Number(v)) ? Number(v) : 0))
        .slice(0, 6);
      slide.note = str(raw.note, 240);
      if (slide.labels.length !== slide.values.length) return null;
      break;
    case 'comparison': {
      const left = normalizeBullets(raw.left?.bullets ?? raw.left);
      const right = normalizeBullets(raw.right?.bullets ?? raw.right);
      slide.left = { title: str(raw.left?.title, 120) || 'Hiện tại', bullets: left.map((b) => b.title) };
      slide.right = { title: str(raw.right?.title, 120) || 'Tương lai', bullets: right.map((b) => b.title) };
      break;
    }
    case 'timeline':
      slide.steps = (Array.isArray(raw.steps) ? raw.steps : [])
        .map((step) => ({ title: str(step?.title, 120), desc: str(step?.desc, 220) }))
        .filter((step) => step.title)
        .slice(0, 6);
      break;
    case 'quote':
      slide.text = str(raw.text ?? raw.title, 320);
      slide.author = str(raw.author, 120);
      if (!slide.text) return null;
      slide.title = '';
      break;
    case 'closing':
      slide.subtitle = str(raw.subtitle, 220);
      slide.contact = str(raw.contact, 120) || 'Tạo bởi SlideForge AI';
      break;
    default:
      break;
  }
  return slide;
}

function buildPrompt(topic, count, style, theme) {
  return `Tạo một bài thuyết trình PowerPoint tiếng Việt về chủ đề: "${topic}".
Yêu cầu:
- Tổng cộng ${count} slide, slide đầu là cover, slide cuối là closing.
- Nội dung chuyên sâu, có cấu trúc, tiếng Việt tự nhiên, phù hợp thuyết trình.
- Phong cách thiết kế: ${style}. Bảng màu: ${theme}.
- Các slide giữa nên đa dạng: tổng quan, con số, trụ cột, biểu đồ, so sánh, thách thức, lộ trình, câu nói truyền cảm hứng, mẹo, khuyến nghị.
- Mỗi bullet gồm "title" (ngắn, mạnh) và "desc" (một câu giải thích).
- Số liệu phải ghi rõ là minh họa trong trường "note".

Trả về DUY NHẤT một JSON hợp lệ theo đúng schema sau, không markdown, không giải thích:
{
  "title": "Tiêu đề bài",
  "subtitle": "Phụ đề",
  "slides": [
    {"layout":"cover","kicker":"NHÃN","title":"Tiêu đề","subtitle":"Phụ đề","meta":{"presenter":"Người trình bày","date":"Ngày"}},
    {"layout":"agenda","kicker":"Chủ đề","title":"Nội dung trình bày","items":["Mục 1","Mục 2"]},
    {"layout":"bullets","kicker":"Chủ đề","title":"Tiêu đề slide","bullets":[{"title":"Ý chính","desc":"Giải thích"}]},
    {"layout":"stats","kicker":"Chủ đề","title":"Tiêu đề","items":[{"value":"72%","label":"Mô tả"}],"note":"Số liệu minh họa"},
    {"layout":"chart","kicker":"Chủ đề","title":"Tiêu đề","labels":["A","B","C"],"values":[10,20,30],"note":"Ghi chú"},
    {"layout":"comparison","kicker":"Chủ đề","title":"Tiêu đề","left":{"title":"Cột trái","bullets":["Ý 1","Ý 2"]},"right":{"title":"Cột phải","bullets":["Ý 1","Ý 2"]}},
    {"layout":"timeline","kicker":"Chủ đề","title":"Tiêu đề","steps":[{"title":"Bước","desc":"Mô tả"}]},
    {"layout":"quote","kicker":"Chủ đề","text":"Câu nói","author":"Tác giả"},
    {"layout":"closing","kicker":"","title":"Cảm ơn bạn đã lắng nghe!","subtitle":"Chủ đề","contact":"Tạo bởi SlideForge AI"}
  ]
}`;
}

export async function generateDeckWithLLM({ prompt = '', options = {} } = {}) {
  if (!API_KEY) return null;
  const parsed = parsePrompt(prompt, options);
  const topic = parsed.topic || 'Xu hướng công nghệ 2026';
  const count = clamp(parsed.slideCount, 4, 16);
  const style = parsed.style || 'modern';
  const theme = parsed.theme || 'aurora';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(`${BASE_URL.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'Bạn là chuyên gia viết nội dung và thiết kế bài thuyết trình. Luôn trả về JSON hợp lệ, không có văn bản ngoài JSON.'
          },
          { role: 'user', content: buildPrompt(topic, count, style, theme) }
        ]
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      console.warn(`[llm] HTTP ${response.status} — fallback về bộ máy cục bộ`);
      return null;
    }
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const json = extractJson(content);
    if (!json || !Array.isArray(json.slides)) return null;

    const slides = json.slides.map(normalizeSlide).filter(Boolean);
    if (slides.length < 4) return null;

    if (slides[0].layout !== 'cover') {
      slides.unshift({
        layout: 'cover',
        kicker: 'BÀI TRÌNH BÀY',
        title: topic,
        subtitle: str(json.subtitle, 220),
        meta: { presenter: 'Trình bày bởi SlideForge AI', date: new Date().toLocaleDateString('vi-VN') }
      });
    }
    if (slides[slides.length - 1].layout !== 'closing') {
      slides.push({
        layout: 'closing',
        kicker: '',
        title: 'Cảm ơn bạn đã lắng nghe!',
        subtitle: topic,
        contact: 'Tạo bởi SlideForge AI'
      });
    }
    slides.forEach((slide) => {
      slide.notes = slide.notes || makeNotes(slide);
    });

    return finalizeDeck(slides, {
      title: str(json.title, 160) || topic,
      subtitle: str(json.subtitle, 220),
      topic,
      category: 'ai',
      categoryLabel: 'AI tạo',
      theme,
      style
    });
  } catch (error) {
    console.warn('[llm] không thể kết nối, dùng bộ máy cục bộ:', error.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}
