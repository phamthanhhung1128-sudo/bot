import React, { useEffect, useRef, useState } from 'react';
import { getTheme } from '../../shared/themes.js';

const BASE_W = 960;
const BASE_H = 540;

function Header({ slide }) {
  return (
    <div className="s-head">
      {slide.kicker ? <div className="s-kicker">{slide.kicker}</div> : null}
      {slide.title ? <h2 className="s-title">{slide.title}</h2> : null}
      <div className="s-rule" />
    </div>
  );
}

function Footer({ deckTitle, index }) {
  return (
    <div className="s-footer">
      <span className="s-footer-title">{deckTitle}</span>
      <span className="s-footer-num">{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}

function Cover({ slide }) {
  const len = (slide.title || '').length;
  const size = len > 90 ? 32 : len > 64 ? 38 : len > 44 ? 44 : len > 28 ? 50 : 56;
  return (
    <div className="s-cover">
      <div className="s-cover-glow s-cover-glow-a" />
      <div className="s-cover-glow s-cover-glow-b" />
      <div className="s-cover-inner">
        {slide.kicker ? <div className="s-kicker">{slide.kicker}</div> : null}
        <h1 className="s-cover-title" style={{ fontSize: size }}>
          {slide.title}
        </h1>
        <div className="s-cover-bar" />
        <p className="s-cover-sub">{slide.subtitle}</p>
      </div>
      <div className="s-cover-meta">
        <span>{slide.meta?.date}</span>
        <span className="s-dot">•</span>
        <span>{slide.meta?.presenter}</span>
      </div>
      <div className="s-cover-brand">SlideForge AI</div>
    </div>
  );
}

function Agenda({ slide }) {
  const items = slide.items || [];
  const twoCols = items.length > 6;
  return (
    <>
      <Header slide={slide} />
      <div className={`s-agenda ${twoCols ? 'two-col' : ''}`}>
        {items.map((item, i) => (
          <div className="s-agenda-item" key={i}>
            <span className="s-agenda-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="s-agenda-text">{item}</span>
          </div>
        ))}
      </div>
      {slide.meta ? <div className="s-agenda-meta">{slide.meta}</div> : null}
    </>
  );
}

function Bullets({ slide, check = false }) {
  const items = slide.bullets || [];
  const rows = check
    ? (slide.items || []).map((item) => ({ title: item, desc: '' }))
    : items;
  return (
    <>
      <Header slide={slide} />
      <div className={`s-bullets ${rows.length >= 5 ? 'compact' : ''}`}>
        {rows.map((item, i) => (
          <div className="s-bullet" key={i}>
            <span className={`s-badge ${check ? 'check' : ''}`}>
              {check ? '✓' : String(i + 1).padStart(2, '0')}
            </span>
            <div className="s-bullet-text">
              <div className="s-bullet-title">{item.title}</div>
              {item.desc ? <div className="s-bullet-desc">{item.desc}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Stats({ slide }) {
  return (
    <>
      <Header slide={slide} />
      <div className="s-stats">
        {(slide.items || []).map((item, i) => (
          <div className="s-stat" key={i}>
            <div className="s-stat-bar" style={{ background: i === 1 ? 'var(--s-accent2)' : 'var(--s-accent)' }} />
            <div className="s-stat-value">{item.value}</div>
            <div className="s-stat-label">{item.label}</div>
          </div>
        ))}
      </div>
      {slide.note ? <div className="s-note">{slide.note}</div> : null}
    </>
  );
}

function Chart({ slide }) {
  const values = slide.values || [];
  const max = Math.max(...values, 1);
  return (
    <>
      <Header slide={slide} />
      <div className="s-chart">
        {(slide.labels || []).map((label, i) => (
          <div className="s-chart-row" key={i}>
            <span className="s-chart-label">{label}</span>
            <div className="s-chart-track">
              <div className="s-chart-bar" style={{ width: `${Math.max(6, (values[i] / max) * 100)}%` }}>
                <span className="s-chart-value">{values[i]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {slide.note ? <div className="s-note">{slide.note}</div> : null}
    </>
  );
}

function Comparison({ slide }) {
  return (
    <>
      <Header slide={slide} />
      <div className="s-compare">
        <div className="s-compare-col left">
          <div className="s-compare-head">{slide.left?.title}</div>
          <ul>
            {(slide.left?.bullets || []).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="s-compare-col right">
          <div className="s-compare-head">{slide.right?.title}</div>
          <ul>
            {(slide.right?.bullets || []).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function Timeline({ slide }) {
  const steps = slide.steps || [];
  return (
    <>
      <Header slide={slide} />
      <div className="s-timeline">
        <div className="s-timeline-line" />
        {steps.map((step, i) => (
          <div className="s-step" key={i}>
            <div className={`s-step-dot ${i % 2 ? 'alt' : ''}`}>{i + 1}</div>
            <div className="s-step-title">{step.title}</div>
            <div className="s-step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Quote({ slide }) {
  return (
    <div className="s-quote">
      <div className="s-kicker">{slide.kicker}</div>
      <div className="s-quote-bar" />
      <div className="s-quote-mark">“</div>
      <p className="s-quote-text">{slide.text}</p>
      <div className="s-quote-author">{slide.author ? `— ${slide.author}` : ''}</div>
    </div>
  );
}

function Closing({ slide }) {
  return (
    <div className="s-closing">
      <div className="s-closing-glow" />
      <div className="s-closing-bar" />
      <h1>{slide.title}</h1>
      <p>{slide.subtitle}</p>
      <span>{slide.contact}</span>
    </div>
  );
}

export default function SlidePreview({ slide, themeId, deckTitle = '', index = 0, className = '' }) {
  const stageRef = useRef(null);
  const [scale, setScale] = useState(0.35);
  const theme = getTheme(themeId);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const update = () => setScale(el.clientWidth / BASE_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!slide) {
    return <div className={`slide-stage ${className}`} ref={stageRef} />;
  }

  const styleVars = {
    '--s-bg': theme.bg,
    '--s-bg2': theme.bg2,
    '--s-card': theme.card,
    '--s-accent': theme.accent,
    '--s-accent2': theme.accent2,
    '--s-text': theme.text,
    '--s-muted': theme.muted,
    '--s-line': theme.line
  };

  const renderContent = () => {
    switch (slide.layout) {
      case 'cover':
        return <Cover slide={slide} />;
      case 'agenda':
        return (
          <>
            <Agenda slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'bullets':
        return (
          <>
            <Bullets slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'checklist':
        return (
          <>
            <Bullets slide={slide} check />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'stats':
        return (
          <>
            <Stats slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'chart':
        return (
          <>
            <Chart slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'comparison':
        return (
          <>
            <Comparison slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'timeline':
        return (
          <>
            <Timeline slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'quote':
        return (
          <>
            <Quote slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
      case 'closing':
        return <Closing slide={slide} />;
      default:
        return (
          <>
            <Header slide={slide} />
            <Footer deckTitle={deckTitle} index={index} />
          </>
        );
    }
  };

  return (
    <div className={`slide-stage ${className}`} ref={stageRef} style={styleVars}>
      <div className="slide-canvas" style={{ transform: `scale(${scale})` }}>
        {renderContent()}
      </div>
    </div>
  );
}
