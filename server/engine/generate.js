import {
  CATEGORIES,
  GENERIC_CHECKLIST,
  GENERIC_FAQ,
  GENERIC_INSIGHTS,
  detectCategory,
  generalBank
} from './content.js';
import { parsePrompt } from './parser.js';
import { THEMES } from '../../shared/themes.js';

const SEQUENCES = {
  technology: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'tips', 'faq', 'checklist', 'insights'],
  business: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'tips', 'faq', 'checklist', 'insights'],
  education: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'tips', 'faq', 'checklist', 'insights'],
  environment: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'faq', 'checklist', 'insights'],
  health: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'tips', 'faq', 'checklist', 'insights'],
  finance: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'faq', 'checklist', 'insights'],
  tourism: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'tips', 'faq', 'checklist', 'insights'],
  society: ['overview', 'pillars', 'comparison', 'challenges', 'timeline', 'quote', 'faq', 'checklist', 'insights'],
  general: ['overview', 'stats', 'pillars', 'chart', 'comparison', 'challenges', 'timeline', 'quote', 'tips', 'faq', 'checklist', 'insights']
};

const STYLE_IDS = ['modern', 'playful', 'minimal', 'corporate'];

function clamp(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function pickSections(category, count) {
  const seq = SEQUENCES[category] || SEQUENCES.general;
  const nonRecommendations = seq.filter((s) => s !== 'recommendations');
  if (count <= 0) return [];
  if (count === 1) return ['recommendations'];
  const head = nonRecommendations.slice(0, Math.max(0, count - 1));
  return [...head, 'recommendations'];
}

function baseSlide(layout, kicker, title, extra = {}) {
  return { layout, kicker, title, ...extra };
}

function buildSection(type, bank, topic) {
  switch (type) {
    case 'overview':
      return baseSlide('bullets', topic, bank.overview.title, { bullets: bank.overview.bullets });
    case 'stats':
      return baseSlide('stats', topic, bank.stats.title, { items: bank.stats.items, note: bank.stats.note });
    case 'pillars':
      return baseSlide('bullets', topic, bank.pillars.title, { bullets: bank.pillars.bullets });
    case 'chart':
      return baseSlide('chart', topic, bank.chart.title, {
        labels: bank.chart.labels,
        values: bank.chart.values,
        note: bank.chart.note
      });
    case 'comparison':
      return baseSlide('comparison', topic, bank.comparison.title, {
        left: bank.comparison.left,
        right: bank.comparison.right
      });
    case 'challenges':
      return baseSlide('bullets', topic, bank.challenges.title, { bullets: bank.challenges.bullets });
    case 'timeline':
      return baseSlide('timeline', topic, bank.timeline.title, { steps: bank.timeline.steps });
    case 'quote':
      return baseSlide('quote', topic, 'Câu nói truyền cảm hứng', {
        text: bank.quote.text,
        author: bank.quote.author
      });
    case 'tips':
      return baseSlide('bullets', topic, bank.tips.title, { bullets: bank.tips.bullets });
    case 'recommendations':
      return baseSlide('bullets', topic, bank.recommendations.title, { bullets: bank.recommendations.bullets });
    case 'faq': {
      const faq = GENERIC_FAQ(topic);
      return baseSlide('bullets', topic, faq.title, {
        bullets: faq.items.map((item) => ({ title: item.q, desc: item.a }))
      });
    }
    case 'checklist':
      return baseSlide('checklist', topic, GENERIC_CHECKLIST.title, {
        items: GENERIC_CHECKLIST.items
      });
    case 'insights':
      return baseSlide('bullets', topic, GENERIC_INSIGHTS.title, { bullets: GENERIC_INSIGHTS.items });
    default:
      return baseSlide('bullets', topic, bank.overview.title, { bullets: bank.overview.bullets });
  }
}

export function makeNotes(slide) {
  const parts = [];
  if (slide.layout === 'cover') {
    parts.push(`Chào audience và giới thiệu chủ đề “${slide.title}”.`);
    parts.push('Dừng 2 giây để mọi người đọc tiêu đề, sau đó nêu ngắn gọn lý do chủ đề này quan trọng.');
    return parts.join(' ');
  }
  if (slide.layout === 'agenda') {
    parts.push('Đi nhanh qua cấu trúc bài trình bày để audience biết mình sẽ nhận được gì.');
    parts.push('Nhấn mạnh phần có nhiều giá trị nhất và mời mọi người đặt câu hỏi ở cuối.');
    return parts.join(' ');
  }
  if (slide.layout === 'closing') {
    parts.push('Tóm tắt 1–2 điểm quan trọng nhất trong 30 giây.');
    parts.push('Cảm ơn audience và mở phần hỏi đáp; chuẩn bị sẵn 2–3 câu hỏi gợi ý nếu im lặng.');
    return parts.join(' ');
  }
  if (slide.layout === 'quote') {
    parts.push(`Đọc chậm câu nói: “${slide.text}” và nêu tên tác giả.`);
    parts.push('Dừng 3 giây, sau đó kết nối câu nói với thông điệp chính của bài.');
    return parts.join(' ');
  }
  if (slide.layout === 'stats') {
    parts.push(`Trình bày “${slide.title}” bằng cách đọc từng con số và giải thích ý nghĩa thực tế.`);
    parts.push('Nhấn mạnh con số gây ấn tượng nhất và nhắc lại rằng đây là số liệu minh họa cần thay bằng dữ liệu thật.');
    return parts.join(' ');
  }
  if (slide.layout === 'chart') {
    parts.push(`Chỉ vào các thanh cao nhất trong biểu đồ “${slide.title}” và so sánh với mức thấp nhất.`);
    parts.push('Rút ra một kết luận duy nhất, tránh đọc lại toàn bộ số liệu trên biểu đồ.');
    return parts.join(' ');
  }
  if (slide.layout === 'comparison') {
    parts.push(`Trình bày “${slide.title}” theo cột trái trước, cột phải sau để tạo sự đối chiếu.`);
    parts.push('Kết thúc bằng việc chỉ ra xu hướng đang chuyển dịch và ý nghĩa với audience.');
    return parts.join(' ');
  }
  if (slide.layout === 'timeline') {
    parts.push(`Đi từ trái sang phải qua các mốc của “${slide.title}”, nêu rõ thời gian và đầu ra của từng mốc.`);
    parts.push('Nhấn mạnh mốc gần nhất và điều cần làm ngay trong tuần này.');
    return parts.join(' ');
  }
  if (slide.layout === 'checklist') {
    parts.push('Đọc từng mục trong checklist và mời audience tự đánh dấu mức độ sẵn sàng.');
    parts.push('Chỉ ra mục nào thường bị bỏ sót nhất và đề xuất cách khắc phục.');
    return parts.join(' ');
  }
  parts.push(`Trình bày “${slide.title}”, mở đầu bằng ý chính đầu tiên.`);
  if (slide.bullets && slide.bullets.length) {
    parts.push(`Nhấn mạnh ý “${slide.bullets[0].title}” và giải thích bằng ví dụ cụ thể.`);
    if (slide.bullets[1]) parts.push(`Tiếp nối với “${slide.bullets[1].title}”.`);
  }
  parts.push('Kết thúc mỗi ý bằng một câu ngắn, dễ nhớ và chuyển ý mượt sang phần tiếp theo.');
  return parts.join(' ');
}

function vietnameseDate() {
  try {
    return new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  } catch {
    return new Date().toLocaleDateString('vi-VN');
  }
}

export function finalizeDeck(slides, meta) {
  const safeSlides = Array.isArray(slides) ? slides.filter(Boolean) : [];
  safeSlides.forEach((slide) => {
    slide.notes = slide.notes || makeNotes(slide);
    slide.id = slide.id || `s_${Math.random().toString(36).slice(2, 8)}`;
  });
  return {
    id: `deck_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    title: meta.title,
    subtitle: meta.subtitle,
    topic: meta.topic,
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    theme: meta.theme,
    style: meta.style,
    language: 'vi',
    slideCount: safeSlides.length,
    createdAt: new Date().toISOString(),
    slides: safeSlides
  };
}

export function generateDeck({ prompt = '', options = {} } = {}) {
  const parsed = parsePrompt(prompt, options);
  const topic = (parsed.topic || 'Xu hướng công nghệ 2026').slice(0, 160);
  const category = detectCategory(topic);
  const bank = category === 'general' ? generalBank(topic) : CATEGORIES[category];
  const total = clamp(parsed.slideCount, 4, 16);
  const theme = THEMES[parsed.theme] ? parsed.theme : 'aurora';
  const style = STYLE_IDS.includes(parsed.style) ? parsed.style : 'modern';
  const year = new Date().getFullYear();

  const hasAgenda = total >= 7;
  const middleCount = total - 2 - (hasAgenda ? 1 : 0);
  const sections = pickSections(category, middleCount);
  const middleSlides = sections.map((type) => buildSection(type, bank, topic));

  const cover = {
    layout: 'cover',
    kicker: `${bank.label.toUpperCase()} · ${year}`,
    title: topic,
    subtitle: bank.subtitle,
    meta: {
      presenter: 'Trình bày bởi SlideForge AI',
      date: vietnameseDate()
    }
  };

  const closing = {
    layout: 'closing',
    kicker: '',
    title: 'Cảm ơn bạn đã lắng nghe!',
    subtitle: topic,
    contact: 'Tạo bởi SlideForge AI'
  };

  const slides = [cover];
  if (hasAgenda) {
    slides.push({
      layout: 'agenda',
      kicker: topic,
      title: 'Nội dung trình bày',
      items: middleSlides.map((s) => s.title),
      meta: `${middleSlides.length + 2} slide · ước tính ${Math.max(4, Math.round(total * 1.5))} phút`
    });
  }
  slides.push(...middleSlides, closing);

  return finalizeDeck(slides, {
    title: topic,
    subtitle: bank.subtitle,
    topic,
    category: bank.id,
    categoryLabel: bank.label,
    theme,
    style
  });
}

export { pickSections, SEQUENCES };
