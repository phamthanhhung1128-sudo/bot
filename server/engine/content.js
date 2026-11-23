/**
 * Kho nội dung tiếng Việt cho bộ máy tạo slide.
 * Mỗi chủ đề được nhận diện theo từ khóa, sau đó lấy nội dung chuyên sâu từ ngân hàng dưới đây.
 * Các số liệu trong phần "stats"/"chart" mang tính minh họa cho bài trình bày.
 */

const GENERIC_FAQ = (topic) => ({
  title: 'Câu hỏi thường gặp',
  items: [
    { q: 'Bắt đầu từ đâu là hợp lý nhất?', a: 'Hãy chọn một bài toán nhỏ, đo lường được kết quả trong 30 ngày rồi mở rộng dần.' },
    { q: 'Cần chuẩn bị những nguồn lực gì?', a: 'Ưu tiên con người và dữ liệu trước; công nghệ chỉ phát huy tác dụng khi quy trình đã rõ ràng.' },
    { q: 'Làm sao biết cách làm này hiệu quả?', a: 'Đặt 2–3 chỉ số cụ thể ngay từ đầu và rà soát theo tuần thay vì theo cảm tính.' },
    { q: `Điều gì quan trọng nhất khi triển khai ${topic}?`, a: 'Sự cam kết của người đứng đầu và một lộ trình đủ nhỏ để duy trì đà.' }
  ]
});

const GENERIC_CHECKLIST = {
  title: 'Checklist trước khi triển khai',
  items: [
    'Mục tiêu được viết rõ ràng, có chỉ số đo lường',
    'Phạm vi và thời gian hoàn thành được thống nhất',
    'Người phụ trách từng đầu việc được chỉ định',
    'Rủi ro chính đã được liệt kê và có phương án dự phòng',
    'Có mốc đánh giá và cơ chế điều chỉnh định kỳ'
  ]
};

const GENERIC_INSIGHTS = {
  title: '5 điều cần nhớ',
  items: [
    { title: 'Bắt đầu nhỏ', desc: 'Một thử nghiệm nhỏ thành công còn giá trị hơn một kế hoạch lớn chưa bao giờ chạy.' },
    { title: 'Đo lường liên tục', desc: 'Không có số liệu thì không có cải tiến — hãy chọn chỉ số trước khi hành động.' },
    { title: 'Coi trọng con người', desc: 'Mọi chiến lược đều đi qua con người; đầu tư năng lực là đầu tư bền vững nhất.' },
    { title: 'Giữ nhịp đều đặn', desc: 'Tiến bộ nhỏ mỗi ngày tạo ra kết quả lớn hơn nỗ lực dồn dập rồi bỏ dở.' },
    { title: 'Sẵn sàng thích ứng', desc: 'Bối cảnh thay đổi nhanh; kế hoạch tốt là kế hoạch biết điều chỉnh.' }
  ]
};

export const CATEGORIES = {
  technology: {
    id: 'technology',
    label: 'Công nghệ',
    subtitle: 'Xu hướng, cơ hội và lộ trình hành động',
    keywords: [
      'công nghệ', 'technology', 'ai', 'trí tuệ nhân tạo', 'artificial intelligence',
      'phần mềm', 'software', 'dữ liệu', 'data', 'blockchain', 'cloud', 'máy học',
      'machine learning', 'robot', 'tự động hóa', 'automation', 'chuyển đổi số',
      'digital transformation', 'iot', 'api', 'lập trình', 'app', 'smartphone',
      'meta', 'vr', 'ar', 'chatbot', 'llm', 'mô hình lớn', 'số hóa', 'bán dẫn', 'chip'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Tốc độ thay đổi chưa từng có', desc: 'Công nghệ mới xuất hiện và trở nên phổ biến chỉ trong vài tháng thay vì vài năm.' },
        { title: 'Dữ liệu trở thành tài sản cốt lõi', desc: 'Mọi quyết định quan trọng ngày càng cần được kiểm chứng bằng dữ liệu thực tế.' },
        { title: 'Lợi thế thuộc về người hành động sớm', desc: 'Tổ chức nào thử nghiệm và điều chỉnh nhanh hơn sẽ tạo được khoảng cách lớn.' },
        { title: 'Con người vẫn là trung tâm', desc: 'Công nghệ chỉ phát huy giá trị khi đi cùng kỹ năng và quy trình phù hợp.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '72%', label: 'tổ chức tăng đầu tư cho công nghệ trong 12 tháng tới' },
        { value: '3,5x', label: 'hiệu quả quy trình khi được tự động hóa đúng chỗ' },
        { value: '56%', label: 'nhân sự cần bổ sung kỹ năng số mới' }
      ],
      note: 'Số liệu minh họa cho bài trình bày — hãy thay bằng dữ liệu thực tế của bạn.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Nền tảng dữ liệu vững chắc', desc: 'Dữ liệu sạch, tập trung và có thể tin cậy là điều kiện tiên quyết.' },
        { title: 'Con người & kỹ năng số', desc: 'Đào tạo liên tục để đội ngũ tự tin làm chủ công cụ mới.' },
        { title: 'Quy trình & bảo mật', desc: 'Chuẩn hóa quy trình, đi kèm cơ chế bảo vệ dữ liệu và người dùng.' }
      ]
    },
    chart: {
      title: 'Mức độ áp dụng theo lĩnh vực',
      labels: ['Tài chính', 'Sản xuất', 'Y tế', 'Bán lẻ', 'Giáo dục'],
      values: [73, 62, 55, 48, 40],
      note: 'Tỷ lệ % tổ chức đã áp dụng ít nhất một giải pháp công nghệ lõi (minh họa).'
    },
    comparison: {
      title: 'Trước đây và hiện nay',
      left: {
        title: 'Cách làm truyền thống',
        bullets: ['Quy trình thủ công, nhiều rủi ro sai sót', 'Dữ liệu phân mảnh, khó tổng hợp', 'Quyết định dựa trên cảm tính', 'Mở rộng tốn nhiều nhân lực']
      },
      right: {
        title: 'Cách làm hiện đại',
        bullets: ['Tự động hóa, tối ưu thời gian', 'Dữ liệu tập trung, phân tích theo thời gian thực', 'Quyết định dựa trên bằng chứng', 'Mở rộng nhanh với chi phí thấp hơn']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Thiếu kỹ năng số', desc: 'Khoảng cách năng lực giữa các bộ phận khiến việc áp dụng không đồng đều.' },
        { title: 'Chi phí đầu tư ban đầu', desc: 'Cần lộ trình đầu tư theo giai đoạn để giảm áp lực dòng tiền.' },
        { title: 'An toàn & quyền riêng tư', desc: 'Rủi ro dữ liệu tăng theo quy mô và số lượng hệ thống kết nối.' },
        { title: 'Kháng cự thay đổi', desc: 'Người dùng cần thấy lợi ích rõ ràng trước khi thay đổi thói quen.' }
      ]
    },
    timeline: {
      title: 'Lộ trình triển khai',
      steps: [
        { title: 'Đánh giá hiện trạng', desc: 'Tháng 1–2 · Kiểm kê quy trình, dữ liệu và năng lực hiện có.' },
        { title: 'Thí điểm quy mô nhỏ', desc: 'Tháng 3–4 · Chọn một quy trình, đo kết quả rõ ràng.' },
        { title: 'Nhân rộng & đào tạo', desc: 'Tháng 5–6 · Chuẩn hóa và lan tỏa ra toàn tổ chức.' },
        { title: 'Tối ưu liên tục', desc: 'Liên tục · Theo dõi chỉ số và cải tiến từng quý.' }
      ]
    },
    quote: {
      text: 'Mọi công nghệ đủ tiên tiến đều không thể phân biệt với phép màu.',
      author: 'Arthur C. Clarke'
    },
    tips: {
      title: 'Mẹo thực thi hiệu quả',
      bullets: [
        { title: 'Bắt đầu từ một quy trình', desc: 'Chọn quy trình gây khó chịu nhất để có tác động tức thì.' },
        { title: 'Đo trước — tối ưu sau', desc: 'Ghi nhận thời gian, chi phí, tỷ lệ sai sót trước khi thay đổi.' },
        { title: 'Đào tạo song song', desc: 'Mỗi công cụ mới cần kèm một buổi thực hành ngắn cho người dùng.' },
        { title: 'Giữ nguyên tắc bảo mật', desc: 'Phân quyền tối thiểu và sao lưu dữ liệu từ ngày đầu.' }
      ]
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Chọn một bài toán nhỏ', desc: 'Triển khai trong 30 ngày để tạo thắng lợi sớm và niềm tin.' },
        { title: 'Đầu tư vào con người trước', desc: 'Đào tạo trước khi mua công cụ: kỹ năng quyết định 70% thành công.' },
        { title: 'Chuẩn hóa dữ liệu ngay từ đầu', desc: 'Một nguồn dữ liệu tin cậy quan trọng hơn nhiều công cụ rời rạc.' },
        { title: 'Thiết lập vòng cải tiến', desc: 'Rà soát hằng tháng, điều chỉnh hằng quý, dám dừng cái không hiệu quả.' }
      ]
    }
  },

  business: {
    id: 'business',
    label: 'Kinh doanh',
    subtitle: 'Chiến lược tăng trưởng và thực thi',
    keywords: [
      'kinh doanh', 'business', 'startup', 'marketing', 'bán hàng', 'sales',
      'doanh nghiệp', 'thương mại', 'khách hàng', 'customer', 'thương hiệu',
      'brand', 'chiến lược', 'strategy', 'quản lý', 'quản trị', 'tăng trưởng',
      'growth', 'sản phẩm', 'product', 'kênh phân phối', 'dịch vụ'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Thị trường thay đổi nhanh hơn bao giờ hết', desc: 'Hành vi khách hàng dịch chuyển sang kênh số, vòng đời sản phẩm ngắn lại.' },
        { title: 'Lợi thế cạnh tranh đến từ tốc độ học hỏi', desc: 'Tổ chức nào thử nghiệm và điều chỉnh nhanh hơn sẽ đi trước.' },
        { title: 'Dữ liệu là tài sản chiến lược', desc: 'Mọi quyết định quan trọng cần được kiểm chứng bằng dữ liệu thực tế.' },
        { title: 'Con người là yếu tố quyết định', desc: 'Chiến lược chỉ có giá trị khi được thực thi bởi đội ngũ phù hợp.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '68%', label: 'khách hàng sẵn sàng trả thêm cho một trải nghiệm tốt' },
        { value: '3x', label: 'hiệu quả thu về từ việc giữ chân khách hàng hiện tại' },
        { value: '55%', label: 'doanh nghiệp tăng ngân sách cho kênh số' }
      ],
      note: 'Số liệu minh họa cho bài trình bày — hãy thay bằng dữ liệu thực tế của bạn.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Định vị rõ ràng', desc: 'Nói được bạn khác biệt ở đâu và vì sao khách hàng nên chọn bạn.' },
        { title: 'Vận hành hiệu quả', desc: 'Tối ưu chi phí, quy trình và năng suất ở từng đầu việc.' },
        { title: 'Trải nghiệm khách hàng', desc: 'Mỗi điểm chạm đều phải nhất quán và tạo cảm giác được chăm sóc.' }
      ]
    },
    chart: {
      title: 'Ưu tiên đầu tư của doanh nghiệp',
      labels: ['Marketing số', 'Công nghệ', 'Vận hành', 'Nhân sự', 'CSKH'],
      values: [26, 24, 20, 16, 14],
      note: 'Tỷ trọng ngân sách dự kiến (minh họa) — tổng 100%.'
    },
    comparison: {
      title: 'Hai cách tiếp cận thị trường',
      left: {
        title: 'Kênh truyền thống',
        bullets: ['Phụ thuộc trung gian và đại lý', 'Khó đo lường hiệu quả từng bước', 'Mở rộng chậm, chi phí cao', 'Dữ liệu khách hàng phân tán']
      },
      right: {
        title: 'Kênh số',
        bullets: ['Tiếp cận trực tiếp khách hàng mục tiêu', 'Đo lường theo thời gian thực', 'Mở rộng nhanh với chi phí thấp hơn', 'Xây dựng dữ liệu khách hàng lâu dài']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Ngân sách hạn chế', desc: 'Cần phân bổ theo ưu tiên và đo được hiệu quả từng đồng chi phí.' },
        { title: 'Thiếu nhân sự số', desc: 'Kỹ năng phân tích và vận hành kênh số đang khan hiếm.' },
        { title: 'Dữ liệu phân mảnh', desc: 'Dữ liệu nằm rời rạc ở nhiều nơi khiến việc ra quyết định chậm.' },
        { title: 'Áp lực tăng trưởng ngắn hạn', desc: 'Cần cân bằng giữa chỉ tiêu trước mắt và nền tảng dài hạn.' }
      ]
    },
    timeline: {
      title: 'Lộ trình triển khai',
      steps: [
        { title: 'Xác định mục tiêu & KPI', desc: 'Tháng 1 · Chỉ 2–3 chỉ số then chốt, có mốc thời gian.' },
        { title: 'Thí điểm kênh số', desc: 'Tháng 2–3 · Chạy chiến dịch nhỏ, đo chi phí trên mỗi khách hàng.' },
        { title: 'Đào tạo & chuẩn hóa', desc: 'Tháng 4–5 · Xây quy trình, tài liệu và bảng đo lường.' },
        { title: 'Nhân rộng & tối ưu', desc: 'Tháng 6+ · Tăng ngân sách cho kênh hiệu quả, cắt kênh kém.' }
      ]
    },
    quote: {
      text: 'Khách hàng không hài lòng nhất là nguồn học hỏi lớn nhất của bạn.',
      author: 'Bill Gates'
    },
    tips: {
      title: 'Mẹo thực thi hiệu quả',
      bullets: [
        { title: 'Đặt KPI trước khi chạy chiến dịch', desc: 'Không có chỉ số thì không thể biết nên tiếp tục hay dừng.' },
        { title: 'Bắt đầu với ngân sách nhỏ', desc: 'Thử nghiệm, đo lường rồi mới mở rộng.' },
        { title: 'Tái sử dụng nội dung', desc: 'Một bài viết hay có thể thành 10 định dạng trên nhiều kênh.' },
        { title: 'Nghe phản hồi thường xuyên', desc: 'Khách hàng luôn nói ra điều họ cần — nếu ta chịu khó hỏi.' }
      ]
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Chọn 1–2 kênh trọng tâm', desc: 'Làm thật tốt một kênh hiệu quả hơn làm hời hợt năm kênh.' },
        { title: 'Xây bảng đo lường đơn giản', desc: 'Một trang tính, cập nhật hằng tuần, cả đội cùng nhìn.' },
        { title: 'Phát triển nội dung từ câu hỏi thật', desc: 'Trả lời đúng điều khách hàng đang tìm kiếm sẽ tạo ra khác biệt.' },
        { title: 'Rà soát chiến lược mỗi quý', desc: 'Dừng đúng lúc và tăng tốc đúng chỗ là kỹ năng của người làm chiến lược.' }
      ]
    }
  },

  education: {
    id: 'education',
    label: 'Giáo dục',
    subtitle: 'Phương pháp, kỹ năng và động lực học tập',
    keywords: [
      'giáo dục', 'education', 'học tập', 'học', 'đào tạo', 'training',
      'sinh viên', 'student', 'học sinh', 'trường', 'e-learning', 'kỹ năng',
      'skill', 'dạy học', 'teaching', 'lớp học', 'gia sư', 'ôn thi'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Học tập chuyển từ ghi nhớ sang vận dụng', desc: 'Giá trị nằm ở khả năng giải quyết vấn đề, không phải số trang ghi chép.' },
        { title: 'Kỹ năng số và tư duy phản biện là nền tảng', desc: 'Đây là hai năng lực cần cho hầu hết công việc trong tương lai.' },
        { title: 'Học qua trải nghiệm tạo dấu ấn sâu hơn', desc: 'Làm, giảng lại và áp dụng giúp ghi nhớ lâu hơn nhiều lần.' },
        { title: 'Động lực nội tại quyết định sự bền vững', desc: 'Mục tiêu cá nhân rõ ràng giúp duy trì nhịp học lâu dài.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '75%', label: 'kiến thức bị lãng quên nếu không được ôn tập lại' },
        { value: '2x', label: 'hiệu quả ghi nhớ khi học chủ động so với nghe giảng thụ động' },
        { value: '30%', label: 'cải thiện khả năng tập trung khi chia nhỏ phiên học' }
      ],
      note: 'Số liệu minh họa — nên điều chỉnh theo bối cảnh và dữ liệu thực tế.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Mục tiêu rõ ràng', desc: 'Biết mình học để làm gì và đo tiến độ bằng sản phẩm cụ thể.' },
        { title: 'Phương pháp chủ động', desc: 'Tự đặt câu hỏi, thực hành, giảng lại và kiểm tra định kỳ.' },
        { title: 'Môi trường hỗ trợ', desc: 'Cộng đồng, mentor và không gian học giảm ma sát mỗi ngày.' }
      ]
    },
    chart: {
      title: 'Hiệu quả ghi nhớ theo phương pháp',
      labels: ['Nghe giảng', 'Đọc tài liệu', 'Xem minh họa', 'Thảo luận', 'Thực hành'],
      values: [5, 10, 20, 50, 75],
      note: 'Tỷ lệ ghi nhớ ước tính (minh họa) — nhóm học chủ động ghi nhớ cao hơn rõ rệt.'
    },
    comparison: {
      title: 'Học thụ động và học chủ động',
      left: {
        title: 'Học thụ động',
        bullets: ['Nghe và chép lại nguyên văn', 'Ôn dồn vào buổi cuối', 'Không kiểm tra mức độ hiểu', 'Dễ chán và bỏ cuộc giữa chừng']
      },
      right: {
        title: 'Học chủ động',
        bullets: ['Tự đặt câu hỏi trước khi đọc', 'Làm bài tập và giảng lại cho người khác', 'Kiểm tra ngắt quãng hằng tuần', 'Nhịp đều đặn, tiến bộ đo được']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Thiếu động lực', desc: 'Không thấy ý nghĩa của việc học dẫn đến trì hoãn và bỏ dở.' },
        { title: 'Quá nhiều nguồn thông tin', desc: 'Chọn sai tài liệu khiến người học mất phương hướng.' },
        { title: 'Không có lộ trình', desc: 'Học dàn trải, thiếu mốc kiểm tra nên khó đánh giá tiến bộ.' },
        { title: 'Áp lực thành tích', desc: 'So sánh bản thân với người khác làm giảm sự tự tin.' }
      ]
    },
    timeline: {
      title: 'Lộ trình 6 tuần',
      steps: [
        { title: 'Đặt mục tiêu SMART', desc: 'Tuần 1 · Cụ thể, đo được, có thời hạn.' },
        { title: 'Lập kế hoạch 30 ngày', desc: 'Tuần 1 · Chia nhỏ mục tiêu thành nhiệm vụ hằng ngày.' },
        { title: 'Học & thực hành', desc: 'Tuần 2–5 · Học 30–45 phút/ngày, làm bài tập ngay.' },
        { title: 'Đánh giá & điều chỉnh', desc: 'Tuần 6 · Kiểm tra thành quả, điều chỉnh lộ trình.' }
      ]
    },
    quote: {
      text: 'Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới.',
      author: 'Nelson Mandela'
    },
    tips: {
      title: 'Mẹo học tập hiệu quả',
      bullets: [
        { title: 'Học theo khối ngắn', desc: '25–50 phút tập trung rồi nghỉ 5–10 phút.' },
        { title: 'Dùng kỹ thuật chủ động', desc: 'Tự hỏi, làm bài tập, giảng lại — thay vì chỉ đọc.' },
        { title: 'Ôn tập ngắt quãng', desc: 'Ôn lại sau 1 ngày, 3 ngày, 1 tuần và 1 tháng.' },
        { title: 'Ghi chú bằng sơ đồ', desc: 'Sơ đồ tư duy giúp thấy mối liên hệ thay vì ghi nhớ rời rạc.' }
      ]
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Chọn một kỹ năng trọng tâm', desc: 'Một kỹ năng trong 30 ngày hiệu quả hơn năm kỹ năng cùng lúc.' },
        { title: 'Duy trì nhịp hằng ngày', desc: '30 phút mỗi ngày thắng 5 giờ dồn vào cuối tuần.' },
        { title: 'Tìm cộng đồng học tập', desc: 'Có người đồng hành giúp duy trì động lực và trách nhiệm.' },
        { title: 'Đo bằng sản phẩm thực tế', desc: 'Một bài thuyết trình, một dự án nhỏ — kết quả nhìn thấy được.' }
      ]
    }
  },

  environment: {
    id: 'environment',
    label: 'Môi trường',
    subtitle: 'Dữ liệu, giải pháp và hành động xanh',
    keywords: [
      'môi trường', 'environment', 'khí hậu', 'climate', 'biến đổi khí hậu',
      'xanh', 'green', 'năng lượng tái tạo', 'renewable', 'rác', 'tái chế',
      'recycle', 'carbon', 'net zero', 'bền vững', 'sustainable', 'ô nhiễm',
      'pollution', 'nông nghiệp', 'đô thị xanh'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Biến đổi khí hậu là thách thức toàn cầu', desc: 'Nhiệt độ tăng và thời tiết cực đoan ảnh hưởng trực tiếp đến đời sống.' },
        { title: 'Nguồn lực đang bị khai thác vượt ngưỡng', desc: 'Mô hình tuyến tính — lấy, dùng, vứt — không còn bền vững.' },
        { title: 'Chuyển đổi xanh mở ra cơ hội mới', desc: 'Năng lượng sạch, kinh tế tuần hoàn và nông nghiệp bền vững tạo việc làm.' },
        { title: 'Mỗi hành động đều có ý nghĩa', desc: 'Cá nhân, doanh nghiệp và chính phủ cùng tạo nên sự thay đổi quy mô lớn.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '+1,1°C', label: 'nhiệt độ trung bình toàn cầu so với thời kỳ tiền công nghiệp' },
        { value: '8 triệu tấn', label: 'rác thải nhựa đổ ra đại dương mỗi năm' },
        { value: '30%', label: 'mục tiêu giảm phát thải vào năm 2030 của nhiều quốc gia' }
      ],
      note: 'Số liệu tham khảo từ các báo cáo công khai; nên kiểm chứng và cập nhật theo nguồn mới nhất.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Năng lượng sạch', desc: 'Ưu tiên điện mặt trời, gió và hiệu suất năng lượng trong vận hành.' },
        { title: 'Kinh tế tuần hoàn', desc: 'Thiết kế để tái sử dụng, sửa chữa và tái chế thay vì bỏ đi.' },
        { title: 'Bảo tồn hệ sinh thái', desc: 'Bảo vệ rừng, đất và nước — nền tảng của mọi hoạt động kinh tế.' }
      ]
    },
    chart: {
      title: 'Nguồn phát thải theo lĩnh vực',
      labels: ['Năng lượng', 'Giao thông', 'Công nghiệp', 'Xây dựng', 'Nông nghiệp'],
      values: [34, 23, 21, 11, 6],
      note: 'Tỷ trọng phát thải ước tính (minh họa) — có thể thay đổi theo quốc gia và phương pháp đo.'
    },
    comparison: {
      title: 'Kinh tế tuyến tính và tuần hoàn',
      left: {
        title: 'Kinh tế tuyến tính',
        bullets: ['Lấy nguyên liệu — sản xuất — vứt bỏ', 'Lãng phí tài nguyên và chi phí xử lý', 'Phụ thuộc nguồn cung mới', 'Gánh nặng rác thải cho thế hệ sau']
      },
      right: {
        title: 'Kinh tế tuần hoàn',
        bullets: ['Thiết kế để bền, sửa được và tái chế', 'Giảm chi phí nguyên liệu qua tái sử dụng', 'Tạo việc làm mới từ tái chế', 'Giảm phát thải và ô nhiễm']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Chi phí chuyển đổi', desc: 'Đầu tư ban đầu lớn trong khi lợi ích đến theo thời gian.' },
        { title: 'Thiếu cơ chế khuyến khích', desc: 'Chính sách và ưu đãi chưa đủ mạnh ở nhiều địa phương.' },
        { title: 'Nhận thức chưa đồng đều', desc: 'Một bộ phận vẫn xem môi trường là chuyện của nhà nước.' },
        { title: 'Áp lực tăng trưởng ngắn hạn', desc: 'KPI tài chính khiến doanh nghiệp chậm thay đổi mô hình.' }
      ]
    },
    timeline: {
      title: 'Lộ trình hành động',
      steps: [
        { title: 'Đo lường dấu chân carbon', desc: 'Tháng 1 · Xác định nguồn phát thải chính của tổ chức.' },
        { title: 'Ưu tiên giải pháp chi phí thấp', desc: 'Tháng 2 · Tiết kiệm năng lượng, giảm rác thải văn phòng.' },
        { title: 'Chuyển đổi năng lượng', desc: 'Tháng 3–6 · Điện mặt trời, thiết bị hiệu suất cao.' },
        { title: 'Báo cáo & cải tiến', desc: 'Liên tục · Công khai tiến độ và đặt mục tiêu mới.' }
      ]
    },
    quote: {
      text: 'Chúng ta sẽ không có xã hội nếu chúng ta hủy hoại môi trường.',
      author: 'Margaret Mead'
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Bắt đầu từ đo lường', desc: 'Không thể giảm thứ mình không đo — hãy có số liệu từ tháng đầu tiên.' },
        { title: 'Ưu tiên giải pháp kép', desc: 'Chọn việc vừa giảm chi phí vừa giảm phát thải để tạo động lực.' },
        { title: 'Truyền thông nội bộ', desc: 'Nhân viên cần hiểu vì sao thay đổi và họ được lợi gì.' },
        { title: 'Công khai mục tiêu', desc: 'Cam kết minh bạch tạo trách nhiệm giải trình và niềm tin.' }
      ]
    }
  },

  health: {
    id: 'health',
    label: 'Sức khỏe',
    subtitle: 'Thói quen, dự phòng và sức khỏe bền vững',
    keywords: [
      'sức khỏe', 'health', 'y tế', 'dinh dưỡng', 'nutrition', 'tập luyện',
      'exercise', 'thể thao', 'tinh thần', 'mental', 'bệnh', 'khám chữa',
      'ngủ', 'sleep', 'lối sống', 'wellness', 'yoga', 'chạy bộ'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Sức khỏe là nền tảng của mọi thành quả', desc: 'Năng lượng và sự tập trung quyết định chất lượng công việc.' },
        { title: 'Phòng bệnh hiệu quả hơn chữa bệnh', desc: 'Thói quen hằng ngày ảnh hưởng lớn hơn nhiều lần điều trị.' },
        { title: 'Thói quen nhỏ lặp lại tạo kết quả lớn', desc: '10 phút vận động mỗi ngày vẫn hơn một buổi tập dồn vào cuối tuần.' },
        { title: 'Sức khỏe tinh thần quan trọng ngang thể chất', desc: 'Ngủ đủ, kết nối xã hội và quản lý stress là một phần của sức khỏe.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '150 phút', label: 'vận động vừa phải mỗi tuần theo khuyến nghị chung' },
        { value: '7–9 giờ', label: 'thời gian ngủ phù hợp cho người trưởng thành' },
        { value: '80%', label: 'bệnh tim mạch có thể phòng ngừa bằng lối sống lành mạnh' }
      ],
      note: 'Theo khuyến nghị chung của các tổ chức y tế — tham khảo ý kiến chuyên gia cho trường hợp cá nhân.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Dinh dưỡng hợp lý', desc: 'Đủ chất, đa dạng rau xanh, hạn chế đường và thực phẩm chế biến sẵn.' },
        { title: 'Vận động đều đặn', desc: 'Kết hợp cardio, lực và giãn cơ — đều đặn quan trọng hơn cường độ.' },
        { title: 'Ngủ & tinh thần', desc: 'Giờ ngủ cố định, giảm màn hình trước khi ngủ và giữ kết nối xã hội.' }
      ]
    },
    chart: {
      title: 'Đóng góp của thói quen vào năng lượng hằng ngày',
      labels: ['Ngủ đủ', 'Vận động', 'Ăn uống', 'Giảm stress', 'Kết nối xã hội'],
      values: [30, 25, 20, 15, 10],
      note: 'Tỷ trọng ước tính (minh họa) — dùng để ưu tiên thói quen nên cải thiện trước.'
    },
    comparison: {
      title: 'Lối sống thụ động và chủ động',
      left: {
        title: 'Lối sống thụ động',
        bullets: ['Ngồi nhiều, ít vận động', 'Ngủ muộn, giấc ngủ không đều', 'Ăn uống tùy tiện, nhiều đường', 'Stress tích tụ, ít chia sẻ']
      },
      right: {
        title: 'Lối sống chủ động',
        bullets: ['Vận động ngắn nhưng đều mỗi ngày', 'Giờ ngủ và thức dậy cố định', 'Bữa ăn có chuẩn bị trước', 'Có thời gian phục hồi và kết nối']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Thiếu thời gian', desc: 'Công việc dồn dập khiến việc tự chăm sóc bị hoãn lại.' },
        { title: 'Môi trường làm việc tĩnh', desc: 'Ngồi liên tục nhiều giờ làm giảm trao đổi chất.' },
        { title: 'Thông tin dinh dưỡng trái chiều', desc: 'Quá nhiều lời khuyên khiến người ta không biết bắt đầu.' },
        { title: 'Khó duy trì thói quen', desc: 'Mục tiêu quá lớn dễ dẫn đến bỏ cuộc chỉ sau vài ngày.' }
      ]
    },
    timeline: {
      title: 'Lộ trình 4 tuần',
      steps: [
        { title: 'Khởi động 10 phút/ngày', desc: 'Tuần 1 · Đi bộ, giãn cơ — tạo thói quen trước.' },
        { title: 'Chuẩn hóa giấc ngủ', desc: 'Tuần 2 · Giờ ngủ cố định, hạn chế màn hình trước ngủ.' },
        { title: 'Chỉnh sửa bữa ăn', desc: 'Tuần 3 · Thêm rau, giảm nước ngọt và đồ chiên rán.' },
        { title: 'Duy trì & đo lường', desc: 'Tuần 4+ · Ghi chép năng lượng, giấc ngủ và cảm xúc.' }
      ]
    },
    quote: {
      text: 'Hãy chăm sóc cơ thể bạn. Đó là nơi duy nhất bạn phải sống.',
      author: 'Jim Rohn'
    },
    tips: {
      title: 'Mẹo duy trì thói quen',
      bullets: [
        { title: 'Chuẩn bị bữa ăn trước', desc: 'Sơ chế nguyên liệu cho 3–4 ngày để tránh ăn vội.' },
        { title: 'Đặt giờ ngủ cố định', desc: 'Cơ thể hoạt động tốt hơn khi có nhịp sinh học ổn định.' },
        { title: 'Vận động ngắn nhưng đều', desc: '10 phút mỗi ngày dễ duy trì hơn 60 phút mỗi tuần.' },
        { title: 'Hạn chế màn hình trước ngủ', desc: '60 phút không đèn xanh giúp dễ vào giấc hơn.' }
      ]
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Chỉ bắt đầu một thói quen', desc: 'Thành công với một thay đổi nhỏ tạo đà cho thay đổi lớn.' },
        { title: 'Đặt mục tiêu theo tuần', desc: 'Linh hoạt hơn mục tiêu hằng ngày và vẫn giữ được nhịp.' },
        { title: 'Tìm bạn đồng hành', desc: 'Cam kết với người khác giúp tỷ lệ duy trì cao hơn rõ rệt.' },
        { title: 'Khám sức khỏe định kỳ', desc: '6–12 tháng/lần để phát hiện sớm và điều chỉnh kịp thời.' }
      ]
    }
  },

  finance: {
    id: 'finance',
    label: 'Tài chính',
    subtitle: 'Quản lý dòng tiền, đầu tư và tăng trưởng',
    keywords: [
      'tài chính', 'finance', 'đầu tư', 'invest', 'chứng khoán', 'stock',
      'ngân hàng', 'bank', 'tiết kiệm', 'saving', 'fintech', 'crypto',
      'tiền mã hóa', 'ngân sách', 'budget', 'dòng tiền', 'cash flow',
      'lợi nhuận', 'profit', 'doanh thu', 'revenue'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Kỷ luật tài chính quan trọng hơn thu nhập cao', desc: 'Chi tiêu hợp lý và tiết kiệm đều đặn tạo nền tảng bền vững.' },
        { title: 'Dòng tiền quyết định sự bền vững', desc: 'Một tổ chức có lãi vẫn có thể phá sản nếu dòng tiền bị gián đoạn.' },
        { title: 'Đa dạng hóa giảm rủi ro', desc: 'Không đặt toàn bộ nguồn lực vào một tài sản hay một kênh duy nhất.' },
        { title: 'Mục tiêu rõ ràng giúp quyết định dễ hơn', desc: 'Có mục tiêu cụ thể, việc chi tiêu và đầu tư trở nên có định hướng.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '20%', label: 'thu nhập nên dành cho tiết kiệm và đầu tư' },
        { value: '3–6 tháng', label: 'chi phí sinh hoạt cần có trong quỹ dự phòng' },
        { value: '10%', label: 'lợi suất dài hạn bình quân của một danh mục đa dạng' }
      ],
      note: 'Nguyên tắc tham khảo phổ biến — không phải khuyến nghị đầu tư cá nhân.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Ngân sách & dòng tiền', desc: 'Biết tiền vào — ra ở đâu để kiểm soát thay vì bị kiểm soát.' },
        { title: 'Quỹ dự phòng', desc: 'Đệm tài chính giúp vượt qua biến cố mà không bán tài sản lúc xấu.' },
        { title: 'Đầu tư dài hạn', desc: 'Thời gian và kỷ luật quan trọng hơn việc đoán thị trường.' }
      ]
    },
    chart: {
      title: 'Phân bổ danh mục mẫu',
      labels: ['Cổ phiếu', 'Trái phiếu', 'Tiền mặt', 'Vàng', 'Khác'],
      values: [45, 25, 10, 10, 10],
      note: 'Cấu trúc danh mục minh họa — cần điều chỉnh theo độ tuổi, mục tiêu và khẩu vị rủi ro.'
    },
    comparison: {
      title: 'Hai cách quản lý tiền',
      left: {
        title: 'Chi tiêu cảm tính',
        bullets: ['Không biết tiền đi đâu', 'Tiết kiệm phần còn lại sau chi tiêu', 'Đuổi theo cơ hội “hot”', 'Dễ hoảng loạn khi thị trường giảm']
      },
      right: {
        title: 'Chi tiêu có kế hoạch',
        bullets: ['Ghi chép và phân loại chi tiêu', 'Tiết kiệm trước, chi tiêu sau', 'Danh mục đa dạng, đầu tư định kỳ', 'Giữ kỷ luật qua các chu kỳ thị trường']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Thiếu quỹ dự phòng', desc: 'Một sự cố nhỏ có thể biến thành khủng hoảng tài chính.' },
        { title: 'Đuổi theo lợi nhuận cao', desc: 'Lợi suất cao thường đi kèm rủi ro cao — cần hiểu rõ trước khi đặt cược.' },
        { title: 'Chi phí ẩn', desc: 'Phí quản lý, thuế và chi phí giao dịch âm thầm bào mòn lợi nhuận.' },
        { title: 'Không ghi chép chi tiêu', desc: 'Không có dữ liệu thì không thể tối ưu.' }
      ]
    },
    timeline: {
      title: 'Lộ trình tài chính 6 tháng',
      steps: [
        { title: 'Ghi chép chi tiêu', desc: 'Tháng 1 · Biết chính xác tiền đi đâu.' },
        { title: 'Xây quỹ dự phòng', desc: 'Tháng 2–3 · Tích lũy 3–6 tháng chi phí sinh hoạt.' },
        { title: 'Đặt ngân sách & tự động hóa', desc: 'Tháng 4 · Tự động chuyển tiết kiệm ngay khi nhận lương.' },
        { title: 'Đầu tư dài hạn', desc: 'Tháng 5+ · Đầu tư định kỳ, đa dạng hóa.' }
      ]
    },
    quote: {
      text: 'Đừng tiết kiệm phần còn lại sau khi chi tiêu, hãy chi tiêu phần còn lại sau khi tiết kiệm.',
      author: 'Warren Buffett'
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Tự động hóa tiết kiệm', desc: 'Chuyển tiền vào quỹ tiết kiệm ngay khi nhận lương.' },
        { title: 'Xây quỹ dự phòng trước', desc: '3–6 tháng chi phí sinh hoạt là lớp bảo vệ đầu tiên.' },
        { title: 'Đa dạng hóa và giữ kỷ luật', desc: 'Đầu tư định kỳ, tránh tất tay theo cảm xúc.' },
        { title: 'Rà soát định kỳ', desc: 'Xem lại danh mục mỗi quý, không phản ứng theo tin tức ngắn hạn.' }
      ]
    }
  },

  tourism: {
    id: 'tourism',
    label: 'Du lịch',
    subtitle: 'Trải nghiệm, điểm đến và xu hướng mới',
    keywords: [
      'du lịch', 'tourism', 'travel', 'văn hóa', 'culture', 'ẩm thực',
      'food', 'điểm đến', 'destination', 'khách sạn', 'hotel', 'resort',
      'tour', 'người dân', 'lễ hội', 'nghỉ dưỡng', 'du khách'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Du lịch phục hồi mạnh mẽ', desc: 'Nhu cầu đi và trải nghiệm tăng nhanh sau giai đoạn giãn cách.' },
        { title: 'Du khách ưu tiên trải nghiệm chân thực', desc: 'Thay vì check-in, họ muốn tìm hiểu văn hóa và cuộc sống địa phương.' },
        { title: 'Bền vững trở thành tiêu chí lựa chọn', desc: 'Nhiều du khách sẵn sàng chi trả thêm cho dịch vụ thân thiện môi trường.' },
        { title: 'Công nghệ định hình hành trình', desc: 'Từ tìm kiếm, đặt dịch vụ đến chia sẻ trải nghiệm đều diễn ra trên kênh số.' }
      ]
    },
    stats: {
      title: 'Những con số biết nói',
      items: [
        { value: '70%', label: 'du khách tìm kiếm trải nghiệm văn hóa địa phương' },
        { value: '40%', label: 'sẵn sàng chi trả thêm cho du lịch bền vững' },
        { value: '60%', label: 'đặt dịch vụ qua kênh số trước chuyến đi' }
      ],
      note: 'Số liệu minh họa xu hướng — nên đối chiếu với báo cáo thị trường mục tiêu.'
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Điểm đến độc đáo', desc: 'Một câu chuyện riêng biệt khó sao chép hơn nhiều điểm đến tương tự.' },
        { title: 'Trải nghiệm bản địa', desc: 'Hợp tác cùng cộng đồng để tạo sản phẩm chân thực và bền vững.' },
        { title: 'Dịch vụ số hóa', desc: 'Đặt phòng, thanh toán và chăm sóc khách hàng liền mạch trên mọi kênh.' }
      ]
    },
    chart: {
      title: 'Động cơ lựa chọn điểm đến',
      labels: ['Thiên nhiên', 'Văn hóa', 'Ẩm thực', 'Giá cả', 'Tiện ích'],
      values: [30, 25, 20, 15, 10],
      note: 'Tỷ trọng ước tính (minh họa) — dùng để ưu tiên đầu tư sản phẩm du lịch.'
    },
    comparison: {
      title: 'Du lịch đại trà và du lịch trải nghiệm',
      left: {
        title: 'Du lịch đại trà',
        bullets: ['Lịch trình dày, ít thời gian trải nghiệm', 'Một khuôn mẫu cho mọi khách', 'Giá cạnh tranh gay gắt', 'Ít kết nối với cộng đồng địa phương']
      },
      right: {
        title: 'Du lịch trải nghiệm',
        bullets: ['Ít điểm đến nhưng sâu hơn', 'Cá nhân hóa theo sở thích', 'Giá trị cao hơn từ chất lượng', 'Cộng đồng địa phương được hưởng lợi']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Tính mùa vụ', desc: 'Doanh thu dồn vào cao điểm tạo áp lực hạ tầng và nhân sự.' },
        { title: 'Áp lực lên hạ tầng', desc: 'Du lịch tăng nhanh dễ vượt khả năng chịu tải của điểm đến.' },
        { title: 'Cạnh tranh về giá', desc: 'Cạnh tranh giá khiến chất lượng dịch vụ bị xuống cấp.' },
        { title: 'Thiếu nhân lực chất lượng', desc: 'Ngành cần nhân sự có kỹ năng ngoại ngữ và dịch vụ.' }
      ]
    },
    timeline: {
      title: 'Lộ trình phát triển sản phẩm',
      steps: [
        { title: 'Nghiên cứu khách hàng mục tiêu', desc: 'Tháng 1 · Xác định phân khúc và mong muốn cốt lõi.' },
        { title: 'Thiết kế trải nghiệm đặc trưng', desc: 'Tháng 2 · Xây dựng câu chuyện và hành trình riêng.' },
        { title: 'Số hóa kênh phân phối', desc: 'Tháng 3 · Đặt phòng, thanh toán, đánh giá trực tuyến.' },
        { title: 'Đo lường & mở rộng', desc: 'Tháng 4+ · Theo dõi đánh giá và điều chỉnh sản phẩm.' }
      ]
    },
    quote: {
      text: 'Thế giới là một cuốn sách và những ai không đi du lịch chỉ đọc được một trang.',
      author: 'Thánh Augustine'
    },
    tips: {
      title: 'Mẹo thiết kế trải nghiệm',
      bullets: [
        { title: 'Bắt đầu từ câu chuyện địa phương', desc: 'Câu chuyện thật luôn thuyết phục hơn quảng cáo.' },
        { title: 'Cá nhân hóa hành trình', desc: 'Cho phép khách chọn nhịp độ và sở thích của mình.' },
        { title: 'Chăm sóc sau chuyến đi', desc: 'Gửi cảm ơn, xin đánh giá và gợi ý chuyến tiếp theo.' },
        { title: 'Hợp tác với cộng đồng', desc: 'Người địa phương là người kể chuyện tốt nhất.' }
      ]
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Xác định phân khúc rõ ràng', desc: 'Một sản phẩm cho tất cả thường không chạm được ai.' },
        { title: 'Hợp tác cùng cộng đồng', desc: 'Chia sẻ lợi ích để trải nghiệm bền vững và chân thực.' },
        { title: 'Đầu tư truyền thông chân thực', desc: 'Hình ảnh thật, đánh giá thật tạo niềm tin dài hạn.' },
        { title: 'Đo lường trải nghiệm', desc: 'Hỏi khách sau mỗi chuyến đi và cải tiến liên tục.' }
      ]
    }
  },

  society: {
    id: 'society',
    label: 'Xã hội',
    subtitle: 'Dữ liệu, chính sách và hành động cộng đồng',
    keywords: [
      'xã hội', 'society', 'cộng đồng', 'community', 'đô thị', 'urban',
      'giao thông', 'transport', 'an toàn', 'safety', 'pháp luật', 'law',
      'chính sách', 'policy', 'người dân', 'công dân', 'tình nguyện', 'volunteer'
    ],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: 'Đô thị hóa tạo áp lực lên hạ tầng', desc: 'Dân số tăng nhanh đòi hỏi giao thông, nhà ở và dịch vụ theo kịp.' },
        { title: 'An sinh xã hội cần thích ứng', desc: 'Biến động kinh tế khiến các tầng lớp dễ tổn thương cần được bảo vệ.' },
        { title: 'Cộng đồng đóng vai trò then chốt', desc: 'Sự tham gia của người dân quyết định tính bền vững của chính sách.' },
        { title: 'Công nghệ giúp tăng minh bạch', desc: 'Dữ liệu mở và dịch vụ công trực tuyến tạo niềm tin và hiệu quả.' }
      ]
    },
    pillars: {
      title: 'Ba trụ cột cốt lõi',
      bullets: [
        { title: 'Chính sách hợp lý', desc: 'Thiết kế dựa trên bằng chứng và lắng nghe tiếng nói của người dân.' },
        { title: 'Hạ tầng hiện đại', desc: 'Đầu tư đồng bộ giao thông, y tế, giáo dục và không gian công cộng.' },
        { title: 'Sự tham gia của người dân', desc: 'Tạo kênh để người dân góp ý, giám sát và cùng thực hiện.' }
      ]
    },
    comparison: {
      title: 'Quản lý tập trung và quản trị đa chiều',
      left: {
        title: 'Quản lý tập trung',
        bullets: ['Quyết định từ trên xuống', 'Chậm thích ứng với địa phương', 'Người dân ít tham gia', 'Khó đo lường hiệu quả thực tế']
      },
      right: {
        title: 'Quản trị đa chiều',
        bullets: ['Phân quyền rõ ràng', 'Linh hoạt theo từng địa phương', 'Người dân cùng giám sát', 'Dữ liệu phản hồi liên tục']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Ngân sách công hạn chế', desc: 'Cần ưu tiên đầu tư có tác động cao và đo lường được.' },
        { title: 'Tính công bằng trong tiếp cận', desc: 'Nhóm yếu thế dễ bị bỏ lại nếu dịch vụ chỉ số hóa.' },
        { title: 'Thiếu dữ liệu đáng tin cậy', desc: 'Quyết định thiếu số liệu dễ dẫn đến lãng phí.' },
        { title: 'Khác biệt lợi ích giữa các nhóm', desc: 'Cần cơ chế đối thoại để điều hòa mong muốn.' }
      ]
    },
    timeline: {
      title: 'Lộ trình triển khai',
      steps: [
        { title: 'Khảo sát nhu cầu thực tế', desc: 'Tháng 1–2 · Lắng nghe người dân và kiểm kê dữ liệu.' },
        { title: 'Thí điểm mô hình nhỏ', desc: 'Tháng 3–4 · Chọn một khu vực, đo kết quả cụ thể.' },
        { title: 'Đánh giá & điều chỉnh', desc: 'Tháng 5 · Rà soát với người dân và các bên liên quan.' },
        { title: 'Nhân rộng', desc: 'Tháng 6+ · Mở rộng có kiểm soát, duy trì cơ chế phản hồi.' }
      ]
    },
    quote: {
      text: 'Một mình ta làm được rất ít; cùng nhau ta làm được rất nhiều.',
      author: 'Helen Keller'
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Đặt người dân vào trung tâm', desc: 'Thiết kế chính sách từ nhu cầu thực tế, không từ giả định.' },
        { title: 'Công khai dữ liệu và tiêu chí', desc: 'Minh bạch tạo niềm tin và giảm nghi ngại.' },
        { title: 'Bắt đầu từ thí điểm đo được', desc: 'Mô hình nhỏ giúp kiểm chứng trước khi nhân rộng.' },
        { title: 'Duy trì đối thoại thường xuyên', desc: 'Một kênh phản hồi hoạt động tốt hơn nhiều cuộc họp.' }
      ]
    }
  }
};

/**
 * Ngân hàng nội dung chung cho các chủ đề chưa được nhận diện.
 * Nội dung được tạo từ chính chủ đề người dùng nhập.
 */
export function generalBank(topic) {
  return {
    id: 'general',
    label: 'Chuyên đề',
    subtitle: 'Bức tranh toàn cảnh và hướng hành động',
    keywords: [],
    overview: {
      title: 'Bối cảnh & Tổng quan',
      bullets: [
        { title: `${topic} là một chủ đề đáng quan tâm`, desc: 'Nhiều cá nhân và tổ chức bắt đầu tìm hiểu cách tiếp cận một cách bài bản.' },
        { title: 'Hiểu đúng bản chất là bước đầu tiên', desc: 'Nắm rõ bối cảnh và các yếu tố tác động giúp hạn chế quyết định cảm tính.' },
        { title: 'Cách tiếp cận có hệ thống tiết kiệm nguồn lực', desc: 'Một khung rõ ràng giúp tránh lãng phí thời gian và chi phí.' },
        { title: 'Kết quả bền vững đến từ sự kiên trì', desc: 'Tiến bộ đều đặn quan trọng hơn nỗ lực dồn dập rồi bỏ dở.' }
      ]
    },
    stats: {
      title: 'Ba con số đáng chú ý',
      items: [
        { value: '3x', label: 'hiệu quả đạt được khi có kế hoạch và đo lường rõ ràng' },
        { value: '80%', label: 'kết quả phụ thuộc vào chất lượng thực thi, không phải ý tưởng' },
        { value: '30 ngày', label: 'thời gian hợp lý để kiểm chứng một hướng đi mới' }
      ],
      note: 'Số liệu minh họa — hãy thay bằng dữ liệu phù hợp với chủ đề của bạn.'
    },
    pillars: {
      title: 'Ba trụ cột cần xây dựng',
      bullets: [
        { title: 'Hiểu vấn đề', desc: 'Xác định đúng nhu cầu, phạm vi và các bên liên quan trước khi hành động.' },
        { title: 'Kế hoạch khả thi', desc: 'Chia nhỏ mục tiêu thành các bước có thể thực hiện và đo lường.' },
        { title: 'Thực thi & cải tiến', desc: 'Duy trì nhịp độ, rà soát kết quả và điều chỉnh kịp thời.' }
      ]
    },
    chart: {
      title: 'Mức độ ưu tiên các yếu tố',
      labels: ['Hiểu vấn đề', 'Kế hoạch', 'Nguồn lực', 'Thực thi', 'Đo lường'],
      values: [30, 20, 15, 25, 10],
      note: 'Tỷ trọng minh họa — điều chỉnh theo thực tế dự án của bạn.'
    },
    comparison: {
      title: 'Cách làm thiếu chuẩn bị và cách làm bài bản',
      left: {
        title: 'Làm theo cảm tính',
        bullets: ['Bắt đầu mà chưa xác định mục tiêu', 'Nguồn lực dàn trải, thiếu trọng tâm', 'Không đo lường nên không biết hiệu quả', 'Dễ chán nản và bỏ dở giữa chừng']
      },
      right: {
        title: 'Làm có hệ thống',
        bullets: ['Mục tiêu rõ ràng, có chỉ số', 'Ưu tiên vài việc quan trọng nhất', 'Đo lường và điều chỉnh liên tục', 'Duy trì nhịp độ bền vững']
      }
    },
    challenges: {
      title: 'Rào cản cần vượt qua',
      bullets: [
        { title: 'Thiếu thông tin', desc: 'Chưa có đủ dữ liệu để đánh giá đúng tình hình.' },
        { title: 'Nguồn lực hạn chế', desc: 'Thời gian, nhân sự và ngân sách thường không như kỳ vọng.' },
        { title: 'Mất tập trung', desc: 'Quá nhiều việc cùng lúc khiến không việc nào được làm trọn vẹn.' },
        { title: 'Sợ thất bại', desc: 'Nỗi sợ sai khiến nhiều người trì hoãn khởi động.' }
      ]
    },
    timeline: {
      title: 'Lộ trình 4 bước',
      steps: [
        { title: 'Xác định mục tiêu', desc: 'Tuần 1 · Viết rõ kết quả mong muốn và chỉ số đo lường.' },
        { title: 'Lập kế hoạch', desc: 'Tuần 2 · Chia nhỏ công việc và phân bổ nguồn lực.' },
        { title: 'Thực thi', desc: 'Tuần 3–5 · Làm đều đặn, ghi nhận tiến độ.' },
        { title: 'Đánh giá & mở rộng', desc: 'Tuần 6+ · Rút kinh nghiệm và điều chỉnh kế hoạch.' }
      ]
    },
    quote: {
      text: 'Cách tốt nhất để dự đoán tương lai là tự tay tạo ra nó.',
      author: 'Peter Drucker'
    },
    tips: {
      title: 'Mẹo thực thi hiệu quả',
      bullets: [
        { title: 'Một mục tiêu duy nhất mỗi giai đoạn', desc: 'Tập trung tạo ra kết quả sâu hơn làm nhiều việc hời hợt.' },
        { title: 'Đặt mốc thời gian cụ thể', desc: 'Không có hạn chót thì kế hoạch dễ bị trì hoãn vô thời hạn.' },
        { title: 'Ghi lại tiến độ', desc: 'Một trang tính đơn giản giúp duy trì động lực.' },
        { title: 'Chia sẻ với người khác', desc: 'Cam kết công khai tăng khả năng hoàn thành.' }
      ]
    },
    recommendations: {
      title: 'Khuyến nghị hành động',
      bullets: [
        { title: 'Bắt đầu ngay hôm nay', desc: 'Một bước nhỏ hôm nay hơn một kế hoạch hoàn hảo chưa bao giờ chạy.' },
        { title: 'Giữ cho đơn giản', desc: 'Bắt đầu với một thói quen, một kênh, một mục tiêu.' },
        { title: 'Đo lường hằng tuần', desc: 'Dữ liệu nhỏ đều đặn tốt hơn phân tích lớn mà không hành động.' },
        { title: 'Kiên trì và điều chỉnh', desc: 'Thành công đến từ việc làm đủ lâu và sửa sai đủ nhanh.' }
      ]
    }
  };
}

/**
 * Nhận diện chủ đề dựa trên từ khóa. Trả về id category.
 */
const KEYWORD_WEIGHTS = {
  ai: 4,
  'công nghệ': 3,
  'trí tuệ nhân tạo': 3,
  'chuyển đổi số': 3,
  'kinh doanh': 3,
  marketing: 3,
  startup: 3,
  'bán hàng': 2,
  'giáo dục': 3,
  'học tập': 3,
  'đào tạo': 3,
  'môi trường': 4,
  'biến đổi khí hậu': 4,
  'khí hậu': 3,
  'sức khỏe': 4,
  'dinh dưỡng': 3,
  'y tế': 3,
  'tài chính': 4,
  'đầu tư': 3,
  'chứng khoán': 3,
  'ngân hàng': 3,
  'tiết kiệm': 3,
  'du lịch': 4,
  travel: 3,
  'điểm đến': 3,
  'xã hội': 3,
  'cộng đồng': 3,
  'đô thị': 3
};

export function detectCategory(topic) {
  const t = String(topic || '').toLowerCase();
  const normalized = t.normalize('NFC');
  let best = 'general';
  let bestScore = 0;
  for (const cat of Object.values(CATEGORIES)) {
    let score = 0;
    for (const kw of cat.keywords) {
      // Từ khóa ngắn (ai, app, vr...) cần khớp nguyên từ để tránh dương tính giả
      const found = kw.length <= 3
        ? new RegExp(`(^|[^a-zà-ỹ0-9])${kw}([^a-zà-ỹ0-9]|$)`, 'i').test(normalized)
        : normalized.includes(kw);
      if (found) score += KEYWORD_WEIGHTS[kw] ?? (kw.length >= 6 ? 2 : 1);
    }
    if (score > bestScore) {
      bestScore = score;
      best = cat.id;
    }
  }
  return best;
}

export { GENERIC_FAQ, GENERIC_CHECKLIST, GENERIC_INSIGHTS };
