import React, { useEffect, useRef, useState } from 'react';
import { THEME_LIST, THEMES } from '../shared/themes.js';
import SlidePreview from './components/SlidePreview.jsx';
import SlideEditor from './components/SlideEditor.jsx';
import Confetti from './components/Confetti.jsx';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Command,
  Download,
  Grid,
  Help,
  Layers,
  Palette,
  Pencil,
  Presentation,
  Refresh,
  Sparkles,
  Trash,
  Type,
  X,
  Zap
} from './components/Icons.jsx';

const STYLES = [
  { id: 'modern', label: 'Hiện đại' },
  { id: 'playful', label: 'Trẻ trung' },
  { id: 'minimal', label: 'Tối giản' },
  { id: 'corporate', label: 'Chuyên nghiệp' }
];

const EXAMPLES = [
  {
    icon: '🤖',
    prompt: 'Xu hướng AI 2026 và cơ hội cho doanh nghiệp Việt Nam',
    slides: 10,
    theme: 'aurora',
    style: 'modern'
  },
  {
    icon: '📈',
    prompt: 'Kế hoạch marketing sản phẩm mới cho startup',
    slides: 10,
    theme: 'sunset',
    style: 'playful'
  },
  {
    icon: '🌱',
    prompt: 'Biến đổi khí hậu và hành động vì môi trường',
    slides: 10,
    theme: 'forest',
    style: 'minimal'
  },
  {
    icon: '🎓',
    prompt: 'Phương pháp học tập hiệu quả cho sinh viên',
    slides: 10,
    theme: 'ocean',
    style: 'corporate'
  }
];

const QUICK_COMMANDS = [
  { label: 'AI 2026', prompt: '/tao "Xu hướng AI 2026" --trang=10 --phong-cach=hiện đại' },
  { label: 'Marketing', prompt: '/tao "Kế hoạch marketing quý 1" --trang=8 --mau=sunset' },
  { label: 'Khí hậu', prompt: '/tao "Biến đổi khí hậu" --trang=12 --phong-cach=tối giản' }
];

const FEATURE_ITEMS = ['Dàn ý thông minh', 'Nội dung tiếng Việt', 'Xuất .pptx chuẩn', 'Chỉnh sửa trực tiếp'];

const THINKING_STEPS = ['Phân tích chủ đề', 'Dựng dàn ý', 'Viết nội dung', 'Thiết kế slide'];

function slugify(text) {
  return String(text || 'bai-trinh-bay')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'bai-trinh-bay';
}

export function Thinking({ progress, prompt }) {
  const stepIndex = progress >= 100 ? 4 : progress < 28 ? 0 : progress < 55 ? 1 : progress < 82 ? 2 : 3;
  return (
    <section className="thinking-card">
      <div className="orb" aria-hidden="true">
        <span className="orb-core" />
        <span className="orb-ring ring-a" />
        <span className="orb-ring ring-b" />
        <span className="orb-spark spark-a" />
        <span className="orb-spark spark-b" />
      </div>
      <span className="eyebrow">Đang xử lý câu lệnh</span>
      <h2 className="thinking-title">AI đang dựng bài thuyết trình cho bạn...</h2>
      <p className="thinking-prompt">“{prompt}”</p>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="thinking-steps">
        {THINKING_STEPS.map((label, i) => (
          <div className={`thinking-step ${i < stepIndex ? 'done' : ''} ${i === stepIndex ? 'active' : ''}`} key={label}>
            <span className="step-mark">
              {i < stepIndex ? <Check size={14} /> : <span className="step-dot" />}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="thinking-hint">Mẹo: bạn có thể dùng cú pháp <code>/tao "chủ đề" --trang=10</code> để chỉ định nhanh.</p>
    </section>
  );
}

export function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="help-panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="help-head">
          <div>
            <span className="eyebrow">Cú pháp lệnh</span>
            <h2>Điều khiển SlideForge bằng câu lệnh</h2>
          </div>
          <button className="icon-btn" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>
        <p className="help-lead">
          Bạn có thể gõ một câu nói tự nhiên hoặc dùng lệnh slash để chỉ định chính xác. Ví dụ:
        </p>
        <div className="code-block">/tao "Xu hướng AI 2026" --trang=10 --phong-cach=hiện đại --mau=aurora</div>
        <div className="help-grid">
          <div className="help-item">
            <code>/tao "chủ đề"</code>
            <span>Tạo slide từ chủ đề trong ngoặc kép</span>
          </div>
          <div className="help-item">
            <code>--trang=12</code>
            <span>Số slide, từ 4 đến 16</span>
          </div>
          <div className="help-item">
            <code>--phong-cach=...</code>
            <span>hiện đại · trẻ trung · tối giản · chuyên nghiệp</span>
          </div>
          <div className="help-item">
            <code>--mau=...</code>
            <span>aurora · sunset · ocean · forest · royal · mono · candy</span>
          </div>
          <div className="help-item">
            <code>/help</code>
            <span>Mở lại bảng hướng dẫn này</span>
          </div>
        </div>
        <p className="help-note">
          Ngoài ra, chỉ cần nói tự nhiên: “Làm slide 12 trang về biến đổi khí hậu, phong cách tối giản, màu xanh
          lá”.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [slides, setSlides] = useState(10);
  const [theme, setTheme] = useState('aurora');
  const [style, setStyle] = useState('modern');
  const [phase, setPhase] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [deck, setDeck] = useState(null);
  const [source, setSource] = useState('local');
  const [aiInfo, setAiInfo] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [exporting, setExporting] = useState(false);
  const timerRef = useRef(null);
  const toastTimer = useRef(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setAiInfo(data.ai))
      .catch(() => {});
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [toast]);

  const showToast = (text, type = 'success') => setToast({ text, type, id: Date.now() });

  const runGenerate = async (overridePrompt, overrideOptions) => {
    const text = String(overridePrompt ?? prompt).trim();
    if (!text) {
      showToast('Hãy nhập chủ đề hoặc câu lệnh trước đã nhé.', 'warn');
      return;
    }
    if (text.toLowerCase().startsWith('/help')) {
      setShowHelp(true);
      return;
    }

    cancelRef.current = false;
    setPhase('thinking');
    setProgress(3);
    setDeck(null);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress((p) => Math.min(92, p + 2.6 + Math.random() * 6.5));
    }, 150);

    try {
      const options = overrideOptions || { slides, theme, style };
      const [response] = await Promise.all([
        fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: text, options })
        }),
        new Promise((resolve) => setTimeout(resolve, 2100))
      ]);
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.deck) {
        throw new Error(data.error || 'Không thể tạo bài thuyết trình. Vui lòng thử lại.');
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (cancelRef.current) return;
      setProgress(100);
      setDeck(data.deck);
      setSource(data.source || 'local');
      if (data.ai) setAiInfo(data.ai);
      // Đồng bộ điều khiển với kết quả thực tế (câu lệnh có thể ghi đè)
      if (data.deck.slideCount) setSlides(data.deck.slideCount);
      if (data.deck.theme) setTheme(data.deck.theme);
      if (data.deck.style) setStyle(data.deck.style);
      await new Promise((resolve) => setTimeout(resolve, 550));
      if (cancelRef.current) return;
      setPhase('done');
    } catch (error) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('idle');
      showToast(error.message || 'Có lỗi xảy ra, thử lại nhé.', 'error');
    }
  };

  const handleGenerate = () => runGenerate();

  const cancelGenerate = () => {
    cancelRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    setPhase('idle');
  };

  const handleExport = async () => {
    if (!deck || exporting) return;
    setExporting(true);
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deck })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Không xuất được file PowerPoint.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${slugify(deck.title)}.pptx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      setConfettiKey((key) => key + 1);
      showToast('Đã tải file .pptx — mở ngay bằng PowerPoint nhé! 🎉');
    } catch (error) {
      showToast(error.message || 'Xuất file thất bại.', 'error');
    } finally {
      setExporting(false);
    }
  };

  const updateSlide = (index, patch) => {
    setDeck((current) =>
      current
        ? {
            ...current,
            slides: current.slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide))
          }
        : current
    );
  };

  const deleteSlide = (index) => {
    setDeck((current) => {
      if (!current || current.slides.length <= 4) return current;
      const slidesNext = current.slides.filter((_, i) => i !== index);
      return { ...current, slides: slidesNext, slideCount: slidesNext.length };
    });
    setEditIndex(-1);
    showToast('Đã xóa slide.');
  };

  const resetStudio = () => {
    setPhase('idle');
    setDeck(null);
    setEditIndex(-1);
    setProgress(0);
  };

  const applyExample = (example) => {
    setPrompt(example.prompt);
    setSlides(example.slides);
    setTheme(example.theme);
    setStyle(example.style);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    runGenerate(example.prompt, {
      slides: example.slides,
      theme: example.theme,
      style: example.style
    });
  };

  const styleLabel = (id) => STYLES.find((item) => item.id === id)?.label || 'Hiện đại';
  const themeName = THEMES[deck?.theme]?.name || 'Aurora';

  return (
    <div className="app">
      <div className="bg-fx" aria-hidden="true">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
        <div className="grid-overlay" />
      </div>

      <Confetti fireKey={confettiKey} />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>
          <span className="brand-name">
            SlideForge <span className="brand-ai">AI</span>
          </span>
          <span className="brand-tag">PowerPoint Studio</span>
        </div>
        <div className="topbar-right">
          <span className="status-chip" title={aiInfo?.model}>
            <span className="status-dot" />
            AI: {aiInfo?.mode === 'cloud' ? 'Cloud' : 'Local'}
          </span>
          <button className="ghost-btn" onClick={() => setShowHelp(true)}>
            <Help size={15} />
            Cú pháp lệnh
          </button>
        </div>
      </header>

      {phase === 'done' && deck ? (
        <main className="studio">
          <div className="studio-bar">
            <button className="icon-btn back" onClick={resetStudio} title="Tạo bài khác">
              <ArrowLeft size={18} />
            </button>
            <div className="studio-info">
              <span className="eyebrow">
                {deck.categoryLabel} · {deck.slideCount} slide · {themeName} · {styleLabel(deck.style)}
              </span>
              <h1>{deck.title}</h1>
            </div>
            <div className="studio-actions">
              <button className="btn ghost" onClick={handleGenerate}>
                <Refresh size={16} />
                Tạo lại
              </button>
              <button className="btn primary" onClick={handleExport} disabled={exporting}>
                <Download size={17} />
                {exporting ? 'Đang xuất...' : 'Tải .pptx'}
              </button>
            </div>
          </div>

          <div className="studio-meta">
            <div className="studio-meta-left">
              <span className="status-chip soft">
                <span className="status-dot" />
                {source === 'cloud' ? 'Nội dung bởi AI cloud' : 'Nội dung bởi AI local'}
              </span>
              <span className="studio-hint">
                <Pencil size={14} /> Bấm vào slide để chỉnh sửa nội dung, ghi chú trình bày
              </span>
            </div>
            <div className="studio-palette">
              <span>Bảng màu</span>
              {THEME_LIST.map((item) => (
                <button
                  key={item.id}
                  title={item.name}
                  aria-label={item.name}
                  className={`theme-dot small ${deck.theme === item.id ? 'active' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent2})` }}
                  onClick={() => setDeck((current) => (current ? { ...current, theme: item.id } : current))}
                />
              ))}
            </div>
          </div>

          <div className="slide-grid">
            {deck.slides.map((slide, i) => (
              <div className="slide-card" key={slide.id || i} onClick={() => setEditIndex(i)}>
                <SlidePreview slide={slide} themeId={deck.theme} deckTitle={deck.title} index={i} />
                <div className="slide-card-overlay">
                  <Pencil size={15} />
                  Chỉnh sửa
                </div>
                <span className="slide-card-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>

          <div className="studio-footer">
            <span>
              <Zap size={14} /> File .pptx tương thích PowerPoint, Keynote và Google Slides
            </span>
            <button className="btn primary" onClick={handleExport} disabled={exporting}>
              <Download size={17} />
              {exporting ? 'Đang xuất...' : 'Tải xuống bài thuyết trình'}
            </button>
          </div>
        </main>
      ) : (
        <main className="hero">
          {phase === 'thinking' ? (
            <Thinking progress={progress} prompt={prompt} />
          ) : (
            <>
              <section className="hero-copy">
                <span className="eyebrow-pill">
                  <span className="pill-dot" />
                  AI POWERPOINT STUDIO · MIỄN PHÍ SỬ DỤNG
                </span>
                <h1>
                  Biến ý tưởng thành <span className="gradient-text">slide PowerPoint</span> trong vài giây
                </h1>
                <p className="hero-sub">
                  Gõ một câu lệnh, AI sẽ dựng dàn ý, viết nội dung tiếng Việt và thiết kế bài thuyết trình đẹp mắt.
                  Tải về file <strong>.pptx</strong> mở ngay trong PowerPoint.
                </p>
              </section>

              <section className="composer-wrap">
                <div className="composer">
                  <div className="composer-top">
                    <span className="composer-icon">
                      <Command size={18} />
                    </span>
                    <textarea
                      value={prompt}
                      aria-label="Câu lệnh hoặc chủ đề tạo slide"
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                          e.preventDefault();
                          handleGenerate();
                        }
                      }}
                      placeholder='Ví dụ: /tao "Xu hướng AI 2026" --trang=10 --phong-cach=hiện đại'
                      rows={3}
                      autoFocus
                    />
                  </div>
                  <div className="composer-bottom">
                    <div className="quick-chips">
                      {QUICK_COMMANDS.map((item) => (
                        <button key={item.label} onClick={() => setPrompt(item.prompt)} title={item.prompt}>
                          <span className="chip-slash">/</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <button className="btn primary generate-btn" onClick={handleGenerate}>
                      <Sparkles size={18} />
                      Tạo slide ngay
                    </button>
                  </div>
                </div>

                <div className="options">
                  <div className="option-group">
                    <span className="option-label">
                      <Layers size={15} /> Số trang
                    </span>
                    <div className="stepper">
                      <button onClick={() => setSlides((s) => Math.max(4, s - 1))} aria-label="Giảm số trang">
                        −
                      </button>
                      <span>{slides}</span>
                      <button onClick={() => setSlides((s) => Math.min(16, s + 1))} aria-label="Tăng số trang">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="option-group grow">
                    <span className="option-label">
                      <Type size={15} /> Phong cách
                    </span>
                    <div className="segmented">
                      {STYLES.map((item) => (
                        <button
                          key={item.id}
                          className={style === item.id ? 'active' : ''}
                          onClick={() => setStyle(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="option-group">
                    <span className="option-label">
                      <Palette size={15} /> Bảng màu
                    </span>
                    <div className="theme-dots">
                      {THEME_LIST.map((item) => (
                        <button
                          key={item.id}
                          title={item.name}
                          aria-label={item.name}
                          className={`theme-dot ${theme === item.id ? 'active' : ''}`}
                          style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent2})` }}
                          onClick={() => setTheme(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="examples">
                  {EXAMPLES.map((example) => (
                    <button key={example.prompt} className="example-card" onClick={() => applyExample(example)}>
                      <span className="example-icon">{example.icon}</span>
                      <span className="example-text">{example.prompt}</span>
                      <ArrowRight size={15} className="example-arrow" />
                    </button>
                  ))}
                </div>

                <div className="feature-strip">
                  {FEATURE_ITEMS.map((item) => (
                    <span key={item}>
                      <Check size={14} />
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}

          {phase === 'thinking' ? (
            <div className="thinking-actions">
              <button className="btn ghost" onClick={cancelGenerate}>
                <X size={16} /> Hủy
              </button>
            </div>
          ) : null}

          <footer className="hero-footer">
            <span>
              <Presentation size={15} /> SlideForge AI — tạo bài thuyết trình bằng câu lệnh
            </span>
            <span className="footer-sep">·</span>
            <span>Xuất .pptx tương thích PowerPoint, Keynote, Google Slides</span>
          </footer>
        </main>
      )}

      {editIndex >= 0 && deck ? (
        <SlideEditor
          key={deck.slides[editIndex]?.id || editIndex}
          slide={deck.slides[editIndex]}
          themeId={deck.theme}
          deckTitle={deck.title}
          index={editIndex}
          onChange={(patch) => updateSlide(editIndex, patch)}
          onClose={() => setEditIndex(-1)}
          onDelete={() => deleteSlide(editIndex)}
          canDelete={deck.slides.length > 4}
        />
      ) : null}

      {showHelp ? <HelpModal onClose={() => setShowHelp(false)} /> : null}

      {toast ? (
        <div className={`toast ${toast.type}`} key={toast.id}>
          {toast.type === 'success' ? <Check size={16} /> : null}
          {toast.type === 'error' ? <X size={16} /> : null}
          {toast.type === 'warn' ? <span className="toast-dot" /> : null}
          {toast.text}
        </div>
      ) : null}
    </div>
  );
}
