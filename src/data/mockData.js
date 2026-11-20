export const subjects = [
  {
    id: 'calculus',
    code: 'MATH-201',
    title: 'Giải tích & Phương trình vi phân',
    description: 'Nắm vững phương pháp tích phân, chuỗi vô hạn và mô hình hóa toán học vi phân.',
    progress: 68,
    totalLessons: 14,
    completedLessons: 9,
    accentColor: '#10B981',
    lesson: {
      id: 'lesson-calc-01',
      title: 'Tích phân từng phần (Integration by Parts)',
      category: 'Giải tích nâng cao',
      readTime: '8 phút',
      theory: [
        {
          heading: '1. Bản chất & Nguồn gốc',
          text: 'Phương pháp tích phân từng phần xuất phát trực tiếp từ quy tắc đạo hàm của tích hai hàm số $u(x)$ và $v(x)$. Khi vi phân hai vế:',
          math: 'd(uv) = u\\,dv + v\\,du \\iff u\\,dv = d(uv) - v\\,du',
          note: 'Lấy tích phân hai vế, ta thu được công thức kinh điển:'
        },
        {
          heading: '2. Công thức tổng quát',
          math: '\\int u \\, dv = u \\cdot v - \\int v \\, du',
          text: 'Đối với tích phân xác định trên đoạn $[a, b]$, công thức chuyển thành:'
        },
        {
          heading: '',
          math: '\\int_{a}^{b} u \\, dv = \\left[ u \\cdot v \\right]_{a}^{b} - \\int_{a}^{b} v \\, du',
          text: 'Mục đích then chốt là biến đổi một tích phân phức tạp $\\int u\\,dv$ thành một tích phân mới $\\int v\\,du$ đơn giản hơn nhiều.'
        },
        {
          heading: '3. Thứ tự ưu tiên chọn $u$',
          text: 'Quy tắc vàng ghi nhớ thứ tự ưu tiên gán cho biến $u$:',
          rule: 'Logarit  →  Đa thức  →  Lượng giác  →  Mũ'
        }
      ],
      flashcards: [
        {
          id: 'fc-1',
          front: 'Công thức tích phân từng phần xuất phát từ công thức vi phân nào?',
          back: 'Từ quy tắc đạo hàm của tích hai hàm số:\nd(uv) = u·dv + v·du',
          hint: 'Liên hệ giữa tích hai hàm số'
        },
        {
          id: 'fc-2',
          front: 'Thứ tự ưu tiên đặt biến u trong phương pháp tích phân từng phần là gì?',
          back: 'Logarit → Đa thức → Lượng giác → Mũ\n(Quy tắc: Nhất log, nhì đa, tam lượng, tứ mũ)',
          hint: 'Quy tắc 4 chữ kinh điển'
        },
        {
          id: 'fc-3',
          front: 'Khi gặp dạng ∫ x · sin(x) dx, ta nên chọn u và dv như thế nào?',
          back: 'Chọn u = x (đa thức) và dv = sin(x)dx (lượng giác)\nSuy ra du = dx và v = -cos(x)',
          hint: 'Đa thức ưu tiên hơn lượng giác'
        }
      ],
      quiz: {
        id: 'q-calc-1',
        title: 'Tính nguyên hàm sau đây:',
        questionMath: 'I = \\int x e^{2x} \\, dx',
        options: [
          { id: 'A', text: '\\frac{1}{2} x e^{2x} - \\frac{1}{4} e^{2x} + C', isCorrect: true },
          { id: 'B', text: 'x e^{2x} - \\frac{1}{2} e^{2x} + C', isCorrect: false },
          { id: 'C', text: '\\frac{1}{2} x e^{2x} + \\frac{1}{4} e^{2x} + C', isCorrect: false },
          { id: 'D', text: '\\frac{1}{4} x e^{2x} - \\frac{1}{2} e^{2x} + C', isCorrect: false }
        ],
        explanation: 'Đặt u = x ⇒ du = dx; dv = e^{2x}dx ⇒ v = ½ e^{2x}.\nÁp dụng công thức: I = uv - ∫v du = ½ x e^{2x} - ½ ∫ e^{2x}dx = ½ x e^{2x} - ¼ e^{2x} + C.'
      }
    }
  },
  {
    id: 'physics',
    code: 'PHYS-102',
    title: 'Vật lý Đại cương: Cơ học & Sóng',
    description: 'Dao động điều hòa, bảo toàn cơ năng và truyền sóng cơ học trong môi trường liên tục.',
    progress: 45,
    totalLessons: 12,
    completedLessons: 5,
    accentColor: '#10B981',
    lesson: {
      id: 'lesson-phys-01',
      title: 'Dao động điều hòa của Con lắc đơn',
      category: 'Cơ học chất điểm',
      readTime: '6 phút',
      theory: [
        {
          heading: '1. Phương trình vi phân dao động',
          text: 'Với góc lệch nhỏ ($\\alpha \\le 10^\\circ \\approx 0.174 \\text{ rad}$), ta xấp xỉ $\\sin\\alpha \\approx \\alpha$. Phương trình vi phân chuyển động có dạng:',
          math: '\\alpha\'\' + \\frac{g}{l}\\alpha = 0',
          note: 'Trong đó $g$ là gia tốc trọng trường và $l$ là chiều dài dây treo.'
        },
        {
          heading: '2. Tần số góc và Chu kỳ dao động',
          text: 'Nghiệm của phương trình là một dao động điều hòa đơn giản có tần số góc $\\omega$ và chu kỳ $T$:',
          math: '\\omega = \\sqrt{\\frac{g}{l}}, \\qquad T = 2\\pi \\sqrt{\\frac{l}{g}}',
          note: 'Lưu ý: Chu kỳ $T$ độc lập hoàn toàn với khối lượng $m$ của con lắc.'
        }
      ],
      flashcards: [
        {
          id: 'fc-p1',
          front: 'Chu kỳ T của con lắc đơn phụ thuộc vào yếu tố nào?',
          back: 'Chỉ phụ thuộc vào chiều dài dây treo (l) và gia tốc trọng trường (g).\nHoàn toàn không phụ thuộc khối lượng vật m.',
          hint: 'Xem công thức T = 2π√(l/g)'
        },
        {
          id: 'fc-p2',
          front: 'Điều kiện góc lệch để con lắc đơn dao động điều hòa là gì?',
          back: 'Góc lệch cực đại α₀ phải đủ nhỏ (thường α₀ ≤ 10° hoặc 0.17 rad) để sin(α) ≈ α.',
          hint: 'Điều kiện xấp xỉ góc nhỏ'
        }
      ],
      quiz: {
        id: 'q-phys-1',
        title: 'Tại cùng một vị trí, nếu tăng chiều dài dây treo con lắc đơn lên 4 lần thì chu kỳ thay đổi thế nào?',
        questionMath: 'l\' = 4l \\implies T\' = ?',
        options: [
          { id: 'A', text: 'T\' = 2T (Chu kỳ tăng 2 lần)', isCorrect: true },
          { id: 'B', text: 'T\' = 4T (Chu kỳ tăng 4 lần)', isCorrect: false },
          { id: 'C', text: 'T\' = \\frac{1}{2}T (Chu kỳ giảm 2 lần)', isCorrect: false },
          { id: 'D', text: 'T\' = T (Chu kỳ không thay đổi)', isCorrect: false }
        ],
        explanation: 'Ta có T = 2π√(l/g). Khi l\' = 4l, ta có T\' = 2π√(4l/g) = 2 · [2π√(l/g)] = 2T.'
      }
    }
  },
  {
    id: 'chemistry',
    code: 'CHEM-301',
    title: 'Nhiệt động lực học & Cân bằng Hóa học',
    description: 'Thế đẳng áp Gibbs, entropy phản ứng và định luật dịch chuyển cân bằng Le Chatelier.',
    progress: 82,
    totalLessons: 10,
    completedLessons: 8,
    accentColor: '#10B981',
    lesson: {
      id: 'lesson-chem-01',
      title: 'Nguyên lý chuyển dịch cân bằng Le Chatelier',
      category: 'Nhiệt động hóa học',
      readTime: '7 phút',
      theory: [
        {
          heading: '1. Nội dung nguyên lý',
          text: 'Một hệ phản ứng thuận nghịch đang ở trạng thái cân bằng hóa học, khi chịu một tác động từ bên ngoài làm thay đổi các yếu tố (nồng độ, nhiệt độ, áp suất) thì cân bằng sẽ dịch chuyển theo chiều chống lại sự thay đổi đó.',
          math: '\\Delta G = \\Delta H - T\\Delta S = 0 \\quad (\\text{tại cân bằng})'
        },
        {
          heading: '2. Ảnh hưởng của nhiệt độ',
          text: 'Hằng số cân bằng $K$ phụ thuộc vào nhiệt độ theo phương trình Van \'t Hoff:',
          math: '\\frac{d \\ln K}{dT} = \\frac{\\Delta H^\\circ}{R T^2}'
        }
      ],
      flashcards: [
        {
          id: 'fc-c1',
          front: 'Khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều nào?',
          back: 'Chuyển dịch theo chiều phản ứng thu nhiệt (ΔH > 0) để hấp thụ bớt lượng nhiệt dư thừa.',
          hint: 'Chống lại việc tăng nhiệt độ'
        }
      ],
      quiz: {
        id: 'q-chem-1',
        title: 'Với phản ứng toả nhiệt N2(k) + 3H2(k) ⇌ 2NH3(k) (ΔH < 0), để tăng hiệu suất tạo NH3 ta nên:',
        questionMath: '\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g), \\quad \\Delta H < 0',
        options: [
          { id: 'A', text: 'Tăng áp suất và giảm nhiệt độ', isCorrect: true },
          { id: 'B', text: 'Giảm áp suất và tăng nhiệt độ', isCorrect: false },
          { id: 'C', text: 'Tăng nhiệt độ và giữ nguyên áp suất', isCorrect: false },
          { id: 'D', text: 'Thêm chất xúc tác để dịch chuyển cân bằng', isCorrect: false }
        ],
        explanation: 'Phản ứng toả nhiệt (ΔH < 0), giảm T làm cân bằng dịch sang chiều thuận. Vế trái có 4 mol khí, vế phải có 2 mol khí, tăng áp suất làm cân bằng chuyển dịch về phía giảm số mol khí (chiều thuận).'
      }
    }
  }
];
