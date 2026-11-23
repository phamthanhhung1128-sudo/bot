/**
 * Bộ phân tích câu lệnh / prompt tiếng Việt.
 * Hỗ trợ cả lệnh slash (/tao "chủ đề" --trang=10) và câu nói tự nhiên.
 */

const STYLE_PATTERNS = [
  ['playful', /(trẻ trung|vui nhộn|tươi sáng|playful|vibrant|fun)/i],
  ['minimal', /(tối giản|tinh tế|minimal|clean)/i],
  ['corporate', /(chuyên nghiệp|trang trọng|corporate|business)/i],
  ['modern', /(hiện đại|modern|trendy)/i]
];

const THEME_PATTERNS = [
  ['aurora', /(aurora|tím|violet|purple|midnight)/i],
  ['sunset', /(sunset|hoàng hôn|cam cháy|coral)/i],
  ['ocean', /(ocean|biển cả|xanh dương|sea blue)/i],
  ['forest', /(forest|rừng|xanh lá|emerald|nature green)/i],
  ['royal', /(royal|vàng gold|gold|hoàng gia)/i],
  ['mono', /(mono|đen trắng|black and white)/i],
  ['candy', /(candy|hồng pastel|pastel pink)/i]
];

const LEADING_VERBS = [
  /^(?:hãy|giúp\s+(?:tôi|mình|em)|giúp|làm\s+giúp|tạo\s+giúp|làm|tạo|soạn|viết)\s+/i,
  /^(?:tôi\s+(?:muốn|cần|đang)\s+)/i,
  /^(?:cho\s+(?:tôi|mình)\s+)/i
];

const SLIDE_PHRASE = /^(?:một\s+|cái\s+)?(?:bài\s+)?(?:slide|bài\s+thuyết\s+trình|bản\s+trình\s+bày|powerpoint|ppt|file\s*pp)\b[\s:,\-–]*(?:về|cho|chủ\s+đề|về\s+chủ\s+đề)?[\s:,\-]*/i;

const ENGLISH_LEADING = /^(?:please\s+)?(?:make|create|generate|build|write)\s+(?:me\s+)?(?:a\s+)?(?:presentation|slides?|deck|powerpoint|ppt)\b[\s:,\-]*(?:about|on|for|of)?[\s:,\-]*/i;

function clamp(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function stripFlags(text) {
  return text.replace(/--[\w-]+(?:=(?:"[^"]*"|(?:(?!--).)*))?/g, ' ');
}

function stripStyleWords(text) {
  let t = text;
  // "phong cách X" / "style X" — bỏ cả cụm giá trị phía sau
  t = t.replace(/(?:phong\s*cách|style)\s*[:=]?\s*(?:"[^"]*"|[^,;]{0,40})/gi, ' ');
  // Từ phong cách đứng cuối câu (thường đứng sau dấu phẩy)
  t = t.replace(
    /(?:^|,)\s*(?:rất\s+|khá\s+)?(?:hiện đại|modern|trẻ trung|vui nhộn|sinh động|tươi sáng|playful|tối giản|tinh tế|minimal|gọn gàng|chuyên nghiệp|trang trọng|corporate)\s*$/gi,
    ' '
  );
  return t;
}

function stripCounts(text) {
  let t = text;
  t = t.replace(/\b\d{1,2}\s*(?:trang|slides?|bài\s*slide|trang\s*slide)\b/gi, ' ');
  t = t.replace(/\b(?:số\s*trang|slidenumber|slide\s*count)\s*[:=]?\s*\d{1,2}\b/gi, ' ');
  return t;
}

function stripLeadingPhrases(text) {
  let t = text;
  let changed = true;
  let guard = 0;
  while (changed && guard < 8) {
    changed = false;
    guard += 1;
    for (const re of LEADING_VERBS) {
      if (re.test(t)) {
        t = t.replace(re, '');
        changed = true;
      }
    }
    if (SLIDE_PHRASE.test(t)) {
      t = t.replace(SLIDE_PHRASE, '');
      changed = true;
    }
    if (ENGLISH_LEADING.test(t)) {
      t = t.replace(ENGLISH_LEADING, '');
      changed = true;
    }
    t = t.replace(/^(?:về|cho|chủ\s*đề)\s*[:\-]?\s*/i, '');
  }
  return t;
}

const THEME_PHRASES =
  /(?<![A-Za-zÀ-ỹ0-9])(?:màu|bảng\s*màu|theme|bảng\s*color)\s*[:=]?\s*(?:xanh\s*lá|xanh\s*dương|aurora|sunset|ocean|forest|royal|mono|candy|tím|hồng|cam|vàng|đen\s*trắng)(?![A-Za-zÀ-ỹ0-9])/gi;

function cleanupTopic(text) {
  let t = stripFlags(text);
  t = t.replace(/[“”"']/g, ' ');
  t = stripCounts(t);
  t = stripStyleWords(t);
  t = t.replace(THEME_PHRASES, ' ');
  t = stripLeadingPhrases(t);
  t = t.replace(/\s+/g, ' ').trim();
  t = t.replace(/(\s*,\s*)+/g, ', ');
  t = t.replace(/^[\s,;:\-–—.]+|[\s,;:\-–—.]+$/g, '');
  t = t.replace(/\s*(?:nhé|nha|nhen|ạ|giúp\s*mình|giúp\s*tôi|đi\s*nhé)\s*$/gi, '');
  t = t.replace(/\s+/g, ' ').trim();
  // Viết hoa chữ cái đầu
  if (t) t = t.charAt(0).toUpperCase() + t.slice(1);
  return t;
}

function extractFlags(text) {
  const flags = {};
  const parts = String(text).split(/(?=--)/);
  for (const part of parts) {
    if (!part.startsWith('--')) continue;
    const body = part.slice(2);
    const eq = body.indexOf('=');
    if (eq === -1) {
      flags[body.trim().toLowerCase()] = '';
      continue;
    }
    const key = body.slice(0, eq).trim().toLowerCase();
    let value = body.slice(eq + 1).trim();
    value = value.replace(/^["']|["']$/g, '').trim();
    flags[key] = value;
  }
  return flags;
}

function flagValue(flags, keys) {
  for (const key of keys) {
    if (flags[key] !== undefined) return flags[key];
  }
  return undefined;
}

function detectFromText(text, patterns) {
  for (const [id, re] of patterns) {
    if (re.test(text)) return id;
  }
  return null;
}

export function parsePrompt(raw, uiOptions = {}) {
  const original = String(raw || '').trim();
  let text = original;
  let command = null;

  // 1. Lệnh slash
  if (text.startsWith('/')) {
    const m = text.match(/^\/([a-z]+)\s*/i);
    if (m) {
      command = m[1].toLowerCase();
      text = text.slice(m[0].length).trim();
    }
  }

  const flags = extractFlags(text);

  // 2. Chủ đề trong ngoặc kép
  let topic = '';
  const quoted = text.match(/"([^"]{2,})"/) || text.match(/[“”]([^“”]{2,})[“”]/);
  if (quoted) {
    topic = quoted[1].trim();
  }

  const withoutQuotes = text.replace(/"[^"]*"|[“”][^“”]*[“”]/g, ' ');
  const cleaned = cleanupTopic(withoutQuotes);
  if (!topic) topic = cleaned;

  // 3. Số trang
  let slideCount = null;
  const flagSlides = flagValue(flags, ['trang', 'so-trang', 'slides', 'slide', 'n']);
  if (flagSlides !== undefined) slideCount = clamp(flagSlides, 4, 16, null);
  if (slideCount === null) {
    const m = text.match(/(\d{1,2})\s*(?:trang|slides?|bài\s*slide|trang\s*slide)/i);
    if (m) slideCount = clamp(m[1], 4, 16, null);
  }

  // 4. Phong cách
  let style = null;
  const flagStyle = flagValue(flags, ['phong-cach', 'style', 'kieu']);
  if (flagStyle) {
    style = detectFromText(flagStyle, STYLE_PATTERNS);
    if (!style) style = 'modern';
  }
  if (!style) style = detectFromText(text, STYLE_PATTERNS);

  // 5. Bảng màu
  let theme = null;
  const flagTheme = flagValue(flags, ['mau', 'theme', 'color', 'bang-mau']);
  if (flagTheme) {
    const guess = detectFromText(flagTheme, THEME_PATTERNS);
    const known = ['aurora', 'sunset', 'ocean', 'forest', 'royal', 'mono', 'candy'];
    theme = known.includes(flagTheme.toLowerCase()) ? flagTheme.toLowerCase() : guess;
  }
  if (!theme) theme = detectFromText(text, THEME_PATTERNS);

  // 6. Câu lệnh trong prompt là ý muốn rõ ràng → ưu tiên hơn lựa chọn mặc định trên giao diện
  const finalTopic = (uiOptions.topic && String(uiOptions.topic).trim()) || topic || '';
  const finalSlides = slideCount !== null ? slideCount : clamp(uiOptions.slides, 4, 16, 10);
  const finalStyle = style || uiOptions.style || 'modern';
  const finalTheme = theme || uiOptions.theme || 'aurora';

  return {
    command,
    topic: finalTopic,
    slideCount: finalSlides,
    style: finalStyle,
    theme: finalTheme,
    flags
  };
}

export const COMMANDS = {
  tao: 'Tạo slide từ chủ đề',
  create: 'Tạo slide từ chủ đề',
  slide: 'Tạo slide từ chủ đề',
  ppt: 'Tạo slide từ chủ đề',
  help: 'Xem hướng dẫn'
};
