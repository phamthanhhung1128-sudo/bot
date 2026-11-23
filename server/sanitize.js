/**
 * Làm sạch dữ liệu deck trước khi xuất file.
 * Chỉ giữ các trường hợp lệ và giới hạn độ dài để tránh dữ liệu lạ.
 */

const LAYOUTS = new Set([
  'cover', 'agenda', 'bullets', 'checklist', 'stats', 'chart',
  'comparison', 'timeline', 'quote', 'closing'
]);
const THEMES = new Set(['aurora', 'sunset', 'ocean', 'forest', 'royal', 'mono', 'candy']);
const STYLES = new Set(['modern', 'playful', 'minimal', 'corporate']);

function str(value, max = 400) {
  return typeof value === 'string' ? value.slice(0, max) : '';
}

function arr(value, maxItems = 10) {
  return Array.isArray(value) ? value.slice(0, maxItems) : [];
}

export function sanitizeDeck(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('Dữ liệu bài thuyết trình không hợp lệ.');
  }
  const rawSlides = Array.isArray(input.slides) ? input.slides : [];
  const slides = [];

  for (const raw of rawSlides.slice(0, 24)) {
    if (!raw || typeof raw !== 'object' || !LAYOUTS.has(raw.layout)) continue;
    const layout = raw.layout;
    const slide = { layout, kicker: str(raw.kicker, 160), title: str(raw.title, 200) };

    switch (layout) {
      case 'cover':
        slide.subtitle = str(raw.subtitle, 240);
        slide.meta = {
          presenter: str(raw?.meta?.presenter, 160) || 'Trình bày bởi SlideForge AI',
          date: str(raw?.meta?.date, 80)
        };
        break;
      case 'agenda':
        slide.items = arr(raw.items, 14).map((item) => str(typeof item === 'string' ? item : item?.title, 160));
        slide.meta = str(raw.meta, 160);
        break;
      case 'bullets':
        slide.bullets = arr(raw.bullets, 6).map((b) => ({
          title: str(b?.title, 160),
          desc: str(b?.desc, 300)
        })).filter((b) => b.title);
        break;
      case 'checklist':
        slide.items = arr(raw.items, 8).map((item) => str(typeof item === 'string' ? item : item?.title, 200));
        break;
      case 'stats':
        slide.items = arr(raw.items, 4).map((item) => ({
          value: str(item?.value, 60),
          label: str(item?.label, 240)
        })).filter((item) => item.value);
        slide.note = str(raw.note, 300);
        break;
      case 'chart': {
        const labels = arr(raw.labels, 6).map((l) => str(l, 80));
        const values = arr(raw.values, 6).map((v) => (Number.isFinite(Number(v)) ? Number(v) : 0));
        if (labels.length && labels.length === values.length) {
          slide.labels = labels;
          slide.values = values;
        }
        slide.note = str(raw.note, 300);
        break;
      }
      case 'comparison':
        slide.left = {
          title: str(raw?.left?.title, 160) || 'Hiện tại',
          bullets: arr(raw?.left?.bullets, 6).map((b) => str(b, 200))
        };
        slide.right = {
          title: str(raw?.right?.title, 160) || 'Tương lai',
          bullets: arr(raw?.right?.bullets, 6).map((b) => str(b, 200))
        };
        break;
      case 'timeline':
        slide.steps = arr(raw.steps, 6).map((step) => ({
          title: str(step?.title, 160),
          desc: str(step?.desc, 300)
        })).filter((step) => step.title);
        break;
      case 'quote':
        slide.text = str(raw.text, 400);
        slide.author = str(raw.author, 160);
        slide.title = '';
        break;
      case 'closing':
        slide.subtitle = str(raw.subtitle, 240);
        slide.contact = str(raw.contact, 160) || 'Tạo bởi SlideForge AI';
        break;
      default:
        break;
    }
    slide.notes = str(raw.notes, 1200);
    slides.push(slide);
  }

  if (!slides.length) throw new Error('Bài thuyết trình chưa có slide hợp lệ.');

  return {
    id: str(input.id, 80),
    title: str(input.title, 200) || 'Bài thuyết trình',
    subtitle: str(input.subtitle, 240),
    topic: str(input.topic, 200),
    category: str(input.category, 40),
    categoryLabel: str(input.categoryLabel, 80),
    theme: THEMES.has(input.theme) ? input.theme : 'aurora',
    style: STYLES.has(input.style) ? input.style : 'modern',
    language: 'vi',
    slideCount: slides.length,
    createdAt: str(input.createdAt, 40),
    slides
  };
}
