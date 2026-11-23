# ✨ SlideForge AI

**Biến một câu lệnh thành bài thuyết trình PowerPoint hoàn chỉnh.**

SlideForge AI là ứng dụng web + công cụ dòng lệnh giúp bạn tạo file `.pptx` thật chỉ bằng cách gõ chủ đề. AI sẽ tự dựng dàn ý, viết nội dung tiếng Việt, thiết kế slide và xuất file mở được ngay trong PowerPoint, Keynote hoặc Google Slides.

```
/tao "Xu hướng AI 2026" --trang=10 --phong-cac=hiện đại --mau=aurora
```

## 🎯 Tính năng

- **Tạo slide bằng câu lệnh** — hỗ trợ lệnh slash (`/tao`) và câu nói tự nhiên tiếng Việt.
- **Nội dung có cấu trúc** — tự nhận diện chủ đề (công nghệ, kinh doanh, giáo dục, môi trường, sức khỏe, tài chính, du lịch, xã hội) và sinh dàn ý phù hợp.
- **Nhiều loại slide** — trang bìa, mục lục, bullet, số liệu, biểu đồ, so sánh, lộ trình, câu nói truyền cảm hứng, checklist, kết thúc.
- **7 bảng màu & 4 phong cách** — Aurora, Sunset, Ocean, Forest, Royal, Mono, Candy; hiện đại, trẻ trung, tối giản, chuyên nghiệp.
- **Xuất .pptx chuẩn** — dùng `pptxgenjs`, file tương thích Microsoft PowerPoint, Keynote, Google Slides.
- **Chỉnh sửa trực tiếp** — sửa tiêu đề, ý chính, số liệu, biểu đồ và **ghi chú trình bày (speaker notes)** ngay trên giao diện.
- **Xem trước trực tiếp** — từng slide được render y hệt trong trình duyệt.
- **CLI** — tạo file PowerPoint ngay trong terminal, không cần mở giao diện.
- **Hoạt động offline** — bộ máy nội dung cục bộ, không bắt buộc API key. Có thể bật AI cloud (OpenAI-compatible) nếu muốn nội dung phong phú hơn.

## 🚀 Cài đặt & chạy

Yêu cầu: **Node.js 20+** (khuyên dùng 22).

```bash
npm install
npm run build
npm start
```

Mở **http://localhost:3000**.

> Chế độ phát triển: `npm run dev` sẽ chạy song song API (cổng 3000) và Vite (cổng 5173, proxy `/api`).

## 💬 Cách dùng

### 1. Giao diện web

1. Gõ chủ đề hoặc câu lệnh vào ô lệnh.
2. Chọn số trang (4–16), phong cách và bảng màu.
3. Bấm **Tạo slide ngay** — AI sẽ dựng bài trong vài giây.
4. Bấm vào slide để chỉnh sửa, đổi bảng màu, rồi bấm **Tải .pptx**.

### 2. Câu lệnh (slash command)

| Cú pháp | Ý nghĩa |
| --- | --- |
| `/tao "chủ đề"` | Tạo slide từ chủ đề trong ngoặc kép |
| `--trang=12` | Số slide, từ 4 đến 16 |
| `--phong-cac=...` | `hiện đại` · `trẻ trung` · `tối giản` · `chuyên nghiệp` |
| `--mau=...` | `aurora` · `sunset` · `ocean` · `forest` · `royal` · `mono` · `candy` |
| `/help` | Mở bảng hướng dẫn trong giao diện |

Ví dụ:

```
/tao "Kế hoạch marketing quý 1" --trang=8 --mau=sunset --phong-cac=trẻ trung
```

Cũng có thể nói tự nhiên:

```
Làm slide 12 trang về biến đổi khí hậu, phong cách tối giản, màu xanh lá
```

### 3. Dòng lệnh (CLI)

```bash
node bin/slides.js "Xu hướng AI 2026 và cơ hội cho doanh nghiệp" --trang=12 --mau=ocean
node bin/slides.js '/tao "Kế hoạch marketing quý 1" --trang=8 --phong-cac=chuyên nghiệp' --out=./ke-hoach.pptx
```

Tùy chọn: `--trang=`, `--phong-cac=`, `--mau=`, `--out=`, `--help`.

## 🧠 Nguồn nội dung AI

Mặc định, SlideForge dùng **bộ máy nội dung cục bộ** (`slideforge-local`): nhận diện chủ đề bằng từ khóa, chọn ngân hàng nội dung chuyên sâu và dựng dàn ý theo cấu trúc đã kiểm chứng. Ưu điểm: nhanh, không tốn phí, chạy offline.

Muốn dùng mô hình ngôn ngữ lớn, đặt biến môi trường trước khi chạy:

```bash
export OPENAI_API_KEY="sk-..."
export OPENAI_MODEL="gpt-4o-mini"        # tùy chọn
export OPENAI_BASE_URL="https://api.openai.com/v1"  # tùy chọn, tương thích OpenAI
npm start
```

Nếu không có key hoặc cuộc gọi thất bại, ứng dụng **tự động quay về bộ máy cục bộ** — luôn tạo được slide.

## 📁 Cấu trúc thư mục

```
.
├── server/
│   ├── index.js              # Express API + phục vụ giao diện
│   ├── sanitize.js           # Làm sạch dữ liệu trước khi xuất
│   ├── engine/
│   │   ├── parser.js         # Phân tích câu lệnh tiếng Việt
│   │   ├── content.js        # Ngân hàng nội dung theo chủ đề
│   │   ├── generate.js       # Dựng dàn ý & nội dung deck
│   │   └── llm.js            # Tích hợp AI cloud (tùy chọn)
│   └── pptx/
│       └── builder.js        # Dựng file .pptx bằng pptxgenjs
├── src/
│   ├── App.jsx               # Giao diện chính
│   ├── components/           # SlidePreview, SlideEditor, Confetti, Icons
│   └── styles.css
├── shared/themes.js          # Bảng màu dùng chung cho web & pptx
├── bin/slides.js             # CLI
├── index.html
└── vite.config.js
```

## 🔌 API

| Method | Endpoint | Mô tả |
| --- | --- | --- |
| `GET` | `/api/health` | Trạng thái dịch vụ & chế độ AI |
| `POST` | `/api/generate` | `{ prompt, options: { slides, theme, style } }` → `{ deck, source }` |
| `POST` | `/api/export` | `{ deck }` → tải file `.pptx` |

Ví dụ:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Xu hướng AI 2026","options":{"slides":10,"theme":"aurora","style":"modern"}}'
```

## 📝 Ghi chú

- Các slide **số liệu/biểu đồ** có ghi chú “minh họa” — hãy thay bằng dữ liệu thực tế của bạn trước khi trình bày.
- File `.pptx` sử dụng font **Calibri** (có sẵn trên Windows/macOS Office) nên mở đẹp trên hầu hết máy.
- Nội dung tiếng Việt được viết theo cấu trúc thuyết trình: bối cảnh → số liệu → trụ cột → so sánh → thách thức → lộ trình → khuyến nghị.

## 🛠️ Công nghệ

- **Giao diện:** React 19 + Vite 8, CSS thuần (glassmorphism, animation).
- **Backend:** Node.js + Express.
- **Xuất PowerPoint:** [pptxgenjs](https://github.com/gitbrent/PptxGenJS).
- **AI:** bộ máy nội dung cục bộ + tùy chọn OpenAI-compatible API.

---

MIT License · Làm với 💜 cho người Việt.
