import React, { useEffect, useState } from 'react';
import SlidePreview from './SlidePreview.jsx';
import { Plus, Trash, X } from './Icons.jsx';

function LinesField({ label, value, onChange, rows = 5, placeholder = 'Mỗi dòng một ý' }) {
  const [text, setText] = useState((value || []).join('\n'));
  useEffect(() => {
    setText((value || []).join('\n'));
  }, [JSON.stringify(value || [])]);

  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        rows={rows}
        value={text}
        placeholder={placeholder}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          onChange(
            next
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
          );
        }}
      />
    </div>
  );
}

function ChartFields({ slide, update }) {
  const [labels, setLabels] = useState((slide.labels || []).join(', '));
  const [values, setValues] = useState((slide.values || []).join(', '));
  const [error, setError] = useState('');

  useEffect(() => {
    setLabels((slide.labels || []).join(', '));
    setValues((slide.values || []).join(', '));
  }, [slide]);

  const commit = (nextLabels, nextValues) => {
    const ls = nextLabels.split(',').map((s) => s.trim()).filter(Boolean);
    const vs = nextValues.split(',').map((s) => Number(s.trim())).filter((n) => Number.isFinite(n));
    if (ls.length && ls.length === vs.length) {
      setError('');
      update({ labels: ls, values: vs });
    } else {
      setError('Số nhãn và số giá trị phải bằng nhau.');
    }
  };

  return (
    <>
      <div className="field">
        <label>Nhãn biểu đồ (cách nhau bằng dấu phẩy)</label>
        <input
          value={labels}
          onChange={(e) => {
            setLabels(e.target.value);
            commit(e.target.value, values);
          }}
          placeholder="Tài chính, Sản xuất, Y tế"
        />
      </div>
      <div className="field">
        <label>Giá trị (cách nhau bằng dấu phẩy)</label>
        <input
          value={values}
          onChange={(e) => {
            setValues(e.target.value);
            commit(labels, e.target.value);
          }}
          placeholder="73, 62, 55"
        />
      </div>
      {error ? <div className="field-error">{error}</div> : null}
    </>
  );
}

export default function SlideEditor({
  slide,
  themeId,
  deckTitle,
  index,
  onChange,
  onClose,
  onDelete,
  canDelete
}) {
  if (!slide) return null;

  const update = (patch) => onChange(patch);

  const updateBullet = (i, patch) =>
    update({ bullets: (slide.bullets || []).map((b, idx) => (idx === i ? { ...b, ...patch } : b)) });
  const addBullet = () =>
    update({ bullets: [...(slide.bullets || []), { title: 'Ý mới', desc: '' }] });
  const removeBullet = (i) => update({ bullets: (slide.bullets || []).filter((_, idx) => idx !== i) });

  const updateStat = (i, patch) =>
    update({ items: (slide.items || []).map((it, idx) => (idx === i ? { ...it, ...patch } : it)) });
  const addStat = () => update({ items: [...(slide.items || []), { value: '50%', label: 'Mô tả số liệu' }] });
  const removeStat = (i) => update({ items: (slide.items || []).filter((_, idx) => idx !== i) });

  const updateStep = (i, patch) =>
    update({ steps: (slide.steps || []).map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  const addStep = () => update({ steps: [...(slide.steps || []), { title: 'Bước mới', desc: 'Mô tả bước' }] });
  const removeStep = (i) => update({ steps: (slide.steps || []).filter((_, idx) => idx !== i) });

  const updateChecklist = (i, value) =>
    update({ items: (slide.items || []).map((it, idx) => (idx === i ? value : it)) });
  const addChecklist = () => update({ items: [...(slide.items || []), 'Việc cần làm'] });
  const removeChecklist = (i) => update({ items: (slide.items || []).filter((_, idx) => idx !== i) });

  const renderFields = () => {
    switch (slide.layout) {
      case 'cover':
        return (
          <>
            <div className="field">
              <label>Phụ đề</label>
              <input value={slide.subtitle || ''} onChange={(e) => update({ subtitle: e.target.value })} />
            </div>
            <div className="field-row">
              <div className="field">
                <label>Người trình bày</label>
                <input
                  value={slide.meta?.presenter || ''}
                  onChange={(e) => update({ meta: { ...(slide.meta || {}), presenter: e.target.value } })}
                />
              </div>
              <div className="field">
                <label>Ngày</label>
                <input
                  value={slide.meta?.date || ''}
                  onChange={(e) => update({ meta: { ...(slide.meta || {}), date: e.target.value } })}
                />
              </div>
            </div>
          </>
        );
      case 'agenda':
        return (
          <LinesField
            label="Các mục (mỗi dòng một mục)"
            value={slide.items || []}
            onChange={(items) => update({ items })}
            rows={9}
          />
        );
      case 'bullets':
        return (
          <div className="field">
            <label>Các ý chính</label>
            <div className="list-editor">
              {(slide.bullets || []).map((b, i) => (
                <div className="list-row" key={i}>
                  <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
                  <div className="list-inputs">
                    <input
                      value={b.title || ''}
                      onChange={(e) => updateBullet(i, { title: e.target.value })}
                      placeholder="Ý chính"
                    />
                    <input
                      value={b.desc || ''}
                      onChange={(e) => updateBullet(i, { desc: e.target.value })}
                      placeholder="Giải thích ngắn"
                    />
                  </div>
                  <button className="row-remove" onClick={() => removeBullet(i)} title="Xóa ý">
                    <Trash size={15} />
                  </button>
                </div>
              ))}
              <button className="btn ghost small" onClick={addBullet}>
                <Plus size={15} /> Thêm ý
              </button>
            </div>
          </div>
        );
      case 'checklist':
        return (
          <div className="field">
            <label>Checklist</label>
            <div className="list-editor">
              {(slide.items || []).map((item, i) => (
                <div className="list-row" key={i}>
                  <span className="list-index">✓</span>
                  <div className="list-inputs">
                    <input value={item || ''} onChange={(e) => updateChecklist(i, e.target.value)} />
                  </div>
                  <button className="row-remove" onClick={() => removeChecklist(i)} title="Xóa mục">
                    <Trash size={15} />
                  </button>
                </div>
              ))}
              <button className="btn ghost small" onClick={addChecklist}>
                <Plus size={15} /> Thêm mục
              </button>
            </div>
          </div>
        );
      case 'stats':
        return (
          <>
            <div className="field">
              <label>Các con số</label>
              <div className="list-editor">
                {(slide.items || []).map((item, i) => (
                  <div className="list-row" key={i}>
                    <div className="list-inputs two">
                      <input
                        value={item.value || ''}
                        onChange={(e) => updateStat(i, { value: e.target.value })}
                        placeholder="72%"
                      />
                      <input
                        value={item.label || ''}
                        onChange={(e) => updateStat(i, { label: e.target.value })}
                        placeholder="Mô tả"
                      />
                    </div>
                    <button className="row-remove" onClick={() => removeStat(i)} title="Xóa số liệu">
                      <Trash size={15} />
                    </button>
                  </div>
                ))}
                <button className="btn ghost small" onClick={addStat}>
                  <Plus size={15} /> Thêm số liệu
                </button>
              </div>
            </div>
            <div className="field">
              <label>Ghi chú nguồn số liệu</label>
              <input value={slide.note || ''} onChange={(e) => update({ note: e.target.value })} />
            </div>
          </>
        );
      case 'chart':
        return (
          <>
            <ChartFields slide={slide} update={update} />
            <div className="field">
              <label>Ghi chú</label>
              <input value={slide.note || ''} onChange={(e) => update({ note: e.target.value })} />
            </div>
          </>
        );
      case 'comparison':
        return (
          <>
            <div className="field-row">
              <div className="field">
                <label>Tiêu đề cột trái</label>
                <input
                  value={slide.left?.title || ''}
                  onChange={(e) => update({ left: { ...(slide.left || {}), title: e.target.value } })}
                />
              </div>
              <div className="field">
                <label>Tiêu đề cột phải</label>
                <input
                  value={slide.right?.title || ''}
                  onChange={(e) => update({ right: { ...(slide.right || {}), title: e.target.value } })}
                />
              </div>
            </div>
            <div className="field-row">
              <LinesField
                label="Các ý cột trái"
                value={slide.left?.bullets || []}
                onChange={(items) => update({ left: { ...(slide.left || {}), bullets: items } })}
              />
              <LinesField
                label="Các ý cột phải"
                value={slide.right?.bullets || []}
                onChange={(items) => update({ right: { ...(slide.right || {}), bullets: items } })}
              />
            </div>
          </>
        );
      case 'timeline':
        return (
          <div className="field">
            <label>Các bước</label>
            <div className="list-editor">
              {(slide.steps || []).map((step, i) => (
                <div className="list-row" key={i}>
                  <span className="list-index">{i + 1}</span>
                  <div className="list-inputs">
                    <input
                      value={step.title || ''}
                      onChange={(e) => updateStep(i, { title: e.target.value })}
                      placeholder="Tên bước"
                    />
                    <input
                      value={step.desc || ''}
                      onChange={(e) => updateStep(i, { desc: e.target.value })}
                      placeholder="Mô tả"
                    />
                  </div>
                  <button className="row-remove" onClick={() => removeStep(i)} title="Xóa bước">
                    <Trash size={15} />
                  </button>
                </div>
              ))}
              <button className="btn ghost small" onClick={addStep}>
                <Plus size={15} /> Thêm bước
              </button>
            </div>
          </div>
        );
      case 'quote':
        return (
          <>
            <div className="field">
              <label>Câu nói</label>
              <textarea rows={4} value={slide.text || ''} onChange={(e) => update({ text: e.target.value })} />
            </div>
            <div className="field">
              <label>Tác giả</label>
              <input value={slide.author || ''} onChange={(e) => update({ author: e.target.value })} />
            </div>
          </>
        );
      case 'closing':
        return (
          <>
            <div className="field">
              <label>Phụ đề</label>
              <input value={slide.subtitle || ''} onChange={(e) => update({ subtitle: e.target.value })} />
            </div>
            <div className="field">
              <label>Thông tin liên hệ</label>
              <input value={slide.contact || ''} onChange={(e) => update({ contact: e.target.value })} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="editor-overlay" onMouseDown={onClose}>
      <div className="editor-panel" onMouseDown={(e) => e.stopPropagation()}>
        <header className="editor-head">
          <div className="editor-head-title">
            <span className="eyebrow">Chỉnh sửa slide {index + 1}</span>
            <h2>{slide.title || slide.text || 'Slide không tiêu đề'}</h2>
          </div>
          <div className="editor-head-actions">
            {canDelete ? (
              <button className="btn ghost danger" onClick={onDelete}>
                <Trash size={16} /> Xóa slide
              </button>
            ) : null}
            <button className="icon-btn" onClick={onClose} title="Đóng">
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="editor-body">
          <div className="editor-form">
            <div className="field">
              <label>Nhãn nhỏ (kicker)</label>
              <input value={slide.kicker || ''} onChange={(e) => update({ kicker: e.target.value })} />
            </div>
            {slide.layout !== 'quote' ? (
              <div className="field">
                <label>Tiêu đề</label>
                <input value={slide.title || ''} onChange={(e) => update({ title: e.target.value })} />
              </div>
            ) : null}
            {renderFields()}
            <div className="field">
              <label>Ghi chú trình bày (speaker notes)</label>
              <textarea
                rows={4}
                value={slide.notes || ''}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder="Gợi ý những điều cần nói khi trình bày slide này..."
              />
            </div>
          </div>

          <div className="editor-preview">
            <span className="editor-preview-label">Xem trước trực tiếp</span>
            <SlidePreview slide={slide} themeId={themeId} deckTitle={deckTitle} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}
