export const grade10Subjects = [
  // ==========================================
  // 1. TOÁN 10 (7 BÀI)
  // ==========================================
  {
    id: 'math10',
    code: 'TOAN-10',
    title: 'Toán 10',
    description: 'Chương trình GDPT 2018: Mệnh đề, Bất phương trình, Lượng giác, Vectơ, Hàm số bậc hai, Tọa độ Oxy và Đại số tổ hợp.',
    lessons: [
      {
        id: 'math10-01',
        title: 'Mệnh đề và Tập hợp',
        readTime: '6 phút',
        summary: 'Quy tắc chân trị, mệnh đề phủ định, mệnh đề kéo theo, phép giao, hợp và hiệu tập hợp.',
        theory: [
          {
            heading: '1. Mệnh đề toán học & Mệnh đề phủ định',
            text: 'Mệnh đề là khẳng định có tính đúng hoặc sai. Phủ định của mệnh đề $P$ ký hiệu là $\\overline{P}$.',
            math: 'P \\iff \\text{Đúng} \\implies \\overline{P} \\iff \\text{Sai}'
          },
          {
            heading: '2. Các phép toán trên tập hợp',
            text: 'Cho hai tập hợp $A$ và $B$ trong không gian $X$:',
            math: 'A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}, \\quad A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}',
            note: 'Hiệu của hai tập hợp: $A \\setminus B = \\{x \\mid x \\in A \\text{ và } x \\notin B\\}$.'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-01',
            question: 'Cho tập hợp $A = \\{x \\in \\mathbb{R} \\mid -2 \\le x < 5\\}$ và $B = [1; 7]$. Tập hợp $A \\cap B$ là:',
            questionMath: 'A = [-2; 5), \\quad B = [1; 7] \\implies A \\cap B = ?',
            options: [
              { id: 'A', text: '[1; 5)', isCorrect: true },
              { id: 'B', text: '[-2; 7]', isCorrect: false },
              { id: 'C', text: '[1; 5]', isCorrect: false },
              { id: 'D', text: '(-2; 7)', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Giao của hai tập hợp là phần tử chung: x >= 1 (từ B) và x < 5 (từ A). Do đó A ∩ B = [1; 5). Chú ý ngoặc tròn tại điểm mút 5 vì x < 5.',
            misconception: 'Thường nhầm lẫn giữa ngoặc vuông [ (lấy dấu bằng) và ngoặc tròn ( (không lấy dấu bằng).'
          }
        ]
      },
      {
        id: 'math10-02',
        title: 'Bất phương trình bậc nhất hai ẩn',
        readTime: '7 phút',
        summary: 'Dạng tổng quát ax + by + c ≤ 0, biểu diễn miền nghiệm trên mặt phẳng tọa độ Oxy.',
        theory: [
          {
            heading: '1. Định nghĩa và Miền nghiệm',
            text: 'Bất phương trình bậc nhất hai ẩn có dạng tổng quát:',
            math: 'ax + by + c \\le 0 \\quad (a^2 + b^2 \\neq 0)',
            note: 'Đường thẳng $d: ax + by + c = 0$ chia mặt phẳng thành hai nửa mặt phẳng bờ $d$. Một trong hai là miền nghiệm.'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-02',
            question: 'Cặp số $(x; y)$ nào sau đây là một nghiệm của bất phương trình $2x - 3y + 4 > 0$?',
            questionMath: '2x - 3y + 4 > 0',
            options: [
              { id: 'A', text: '(1; 1)', isCorrect: true },
              { id: 'B', text: '(0; 2)', isCorrect: false },
              { id: 'C', text: '(-3; 0)', isCorrect: false },
              { id: 'D', text: '(1; 3)', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Thay x = 1, y = 1 vào vế trái: 2(1) - 3(1) + 4 = 3 > 0 (thỏa mãn). Điểm (0; 2) cho kết quả -2 < 0 nên không thuộc miền nghiệm.',
            misconception: 'Tính nhầm dấu âm của hệ số -3y khi thay các giá trị âm.'
          }
        ]
      },
      {
        id: 'math10-03',
        title: 'Hệ thức lượng trong tam giác',
        readTime: '8 phút',
        summary: 'Định lí côsin, định lí sin, công thức tính diện tích tam giác và bán kính đường tròn.',
        theory: [
          {
            heading: '1. Định lí Côsin',
            text: 'Trong tam giác $ABC$ với các cạnh $a, b, c$ đối diện các góc $A, B, C$:',
            math: 'a^2 = b^2 + c^2 - 2bc \\cos A, \\quad \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}'
          },
          {
            heading: '2. Định lí Sin & Bán kính R',
            math: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R, \\quad S = \\frac{1}{2}bc \\sin A = \\frac{abc}{4R} = pr'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-03',
            question: 'Cho tam giác $ABC$ có $b = 7, c = 5$ và $\\widehat{A} = 60^\\circ$. Độ dài cạnh $a$ bằng:',
            questionMath: 'a^2 = b^2 + c^2 - 2bc \\cos A',
            options: [
              { id: 'A', text: '\\sqrt{39}', isCorrect: true },
              { id: 'B', text: '39', isCorrect: false },
              { id: 'C', text: '7', isCorrect: false },
              { id: 'D', text: '\\sqrt{74}', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Áp dụng định lí côsin: a^2 = 7^2 + 5^2 - 2(7)(5)cos(60°) = 49 + 25 - 70(0.5) = 74 - 35 = 39 => a = √39.',
            misconception: 'Quên khai căn bậc hai của a^2 sau khi tính ra 39.'
          }
        ]
      },
      {
        id: 'math10-04',
        title: 'Vectơ và các phép toán',
        readTime: '9 phút',
        simulation: 'vector',
        summary: 'Khái niệm vectơ, tổng và hiệu hai vectơ theo quy tắc ba điểm và quy tắc hình bình hành, tích vô hướng.',
        theory: [
          {
            heading: '1. Định nghĩa và Quy tắc Hình bình hành',
            text: 'Vectơ là một đoạn thẳng có hướng. Với hình bình hành $ABCD$:',
            math: '\\vec{AB} + \\vec{AD} = \\vec{AC}, \\quad \\vec{AB} + \\vec{BC} = \\vec{AC}'
          },
          {
            heading: '2. Tọa độ và Tích vô hướng',
            text: 'Cho $\\vec{u} = (x_1; y_1)$ và $\\vec{v} = (x_2; y_2)$:',
            math: '\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2 = |\\vec{u}| |\\vec{v}| \\cos(\\vec{u}, \\vec{v})'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-04',
            question: 'Cho hai vectơ $\\vec{u} = (3; 4)$ và $\\vec{v} = (-4; 3)$. Tích vô hướng $\\vec{u} \\cdot \\vec{v}$ bằng:',
            questionMath: '\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2',
            options: [
              { id: 'A', text: '0', isCorrect: true },
              { id: 'B', text: '24', isCorrect: false },
              { id: 'C', text: '-1', isCorrect: false },
              { id: 'D', text: '25', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'u⃗ · v⃗ = 3(-4) + 4(3) = -12 + 12 = 0. Khi tích vô hướng bằng 0, hai vectơ vuông góc với nhau.',
            misconception: 'Nhầm lẫn giữa tích vô hướng (cho ra số thực) với phép nhân tọa độ.'
          }
        ]
      },
      {
        id: 'math10-05',
        title: 'Hàm số bậc hai và Đồ thị',
        readTime: '8 phút',
        simulation: 'parabola',
        summary: 'Dạng y = ax² + bx + c (a ≠ 0), tọa độ đỉnh I, trục đối xứng và sự biến thiên của parabol.',
        theory: [
          {
            heading: '1. Đỉnh và Trục đối xứng của Parabol',
            text: 'Đồ thị hàm số bậc hai $y = ax^2 + bx + c$ là một parabol có đỉnh $I$ và trục đối xứng $d$:',
            math: 'I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right), \\quad x = -\\frac{b}{2a}'
          },
          {
            heading: '2. Bề lõm Parabol',
            text: 'Nếu $a > 0$, bề lõm quay lên trên, hàm số đạt giá trị nhỏ nhất tại đỉnh. Nếu $a < 0$, bề lõm quay xuống dưới, hàm số đạt giá trị lớn nhất tại đỉnh.',
            math: 'a > 0 \\implies y_{min} = -\\frac{\\Delta}{4a}, \\quad a < 0 \\implies y_{max} = -\\frac{\\Delta}{4a}'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-05',
            question: 'Tọa độ đỉnh $I$ của parabol $y = x^2 - 4x + 3$ là:',
            questionMath: 'I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)',
            options: [
              { id: 'A', text: '(2; -1)', isCorrect: true },
              { id: 'B', text: '(-2; 15)', isCorrect: false },
              { id: 'C', text: '(4; 3)', isCorrect: false },
              { id: 'D', text: '(2; 3)', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Ta có a = 1, b = -4, c = 3. Hoành độ đỉnh: x_I = -(-4)/(2*1) = 2. Tung độ: y_I = 2^2 - 4(2) + 3 = -1. Vậy I(2; -1).',
            misconception: 'Nhầm lẫn dấu âm trong công thức x = -b/(2a), tính ra x = -2.'
          }
        ]
      },
      {
        id: 'math10-06',
        title: 'Phương pháp tọa độ trong mặt phẳng (Oxy)',
        readTime: '9 phút',
        summary: 'Phương trình tham số, phương trình tổng quát của đường thẳng, vị trí tương đối và khoảng cách từ điểm đến đường thẳng.',
        theory: [
          {
            heading: '1. Phương trình tổng quát của đường thẳng',
            text: 'Đường thẳng đi qua $M_0(x_0; y_0)$ và nhận $\\vec{n} = (a; b)$ làm vectơ pháp tuyến có phương trình:',
            math: 'a(x - x_0) + b(y - y_0) = 0 \\iff ax + by + c = 0'
          },
          {
            heading: '2. Khoảng cách từ điểm đến đường thẳng',
            text: 'Khoảng cách từ điểm $M(x_M; y_M)$ đến đường thẳng $\\Delta: ax + by + c = 0$:',
            math: 'd(M, \\Delta) = \\frac{|ax_M + by_M + c|}{\\sqrt{a^2 + b^2}}'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-06',
            question: 'Khoảng cách từ gốc tọa độ $O(0; 0)$ đến đường thẳng $\\Delta: 3x - 4y + 10 = 0$ là:',
            questionMath: 'd(O, \\Delta) = \\frac{|3(0) - 4(0) + 10|}{\\sqrt{3^2 + (-4)^2}}',
            options: [
              { id: 'A', text: '2', isCorrect: true },
              { id: 'B', text: '10', isCorrect: false },
              { id: 'C', text: '5', isCorrect: false },
              { id: 'D', text: '2.5', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'd(O, Δ) = |10| / √(3^2 + (-4)^2) = 10 / √25 = 10 / 5 = 2.',
            misconception: 'Quên căn mẫu số √(a^2 + b^2) hoặc tính nhầm dấu bình phương (-4)^2.'
          }
        ]
      },
      {
        id: 'math10-07',
        title: 'Đại số tổ hợp & Xác suất',
        readTime: '8 phút',
        summary: 'Quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp, tổ hợp và công thức tính xác suất cổ điển.',
        theory: [
          {
            heading: '1. Hoán vị, Chỉnh hợp và Tổ hợp',
            text: 'Số chỉnh hợp chập $k$ của $n$ phần tử và số tổ hợp chập $k$ của $n$ phần tử:',
            math: 'A_n^k = \\frac{n!}{(n - k)!}, \\quad C_n^k = \\frac{n!}{k!(n - k)!}'
          },
          {
            heading: '2. Định nghĩa Cổ điển về Xác suất',
            text: 'Xác suất của biến cố $A$ trong không gian mẫu $\\Omega$:',
            math: 'P(A) = \\frac{n(A)}{n(\\Omega)} \\quad (0 \\le P(A) \\le 1)'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-07',
            question: 'Một tổ có 10 học sinh. Số cách chọn ra 3 học sinh để tham gia đội tình nguyện là:',
            questionMath: 'C_{10}^3 = \\frac{10!}{3! \\cdot 7!}',
            options: [
              { id: 'A', text: '120', isCorrect: true },
              { id: 'B', text: '720', isCorrect: false },
              { id: 'C', text: '30', isCorrect: false },
              { id: 'D', text: '210', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Chọn 3 người từ 10 người không phân biệt thứ tự là một tổ hợp: C(10, 3) = (10 * 9 * 8) / (3 * 2 * 1) = 720 / 6 = 120 cách.',
            misconception: 'Nhầm lẫn với chỉnh hợp A(10, 3) = 720 (chỉ dùng khi có phân chia chức vụ cụ thể).'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. VẬT LÍ 10 (6 BÀI)
  // ==========================================
  {
    id: 'physics10',
    code: 'LY-10',
    title: 'Vật lí 10',
    description: 'Chương trình GDPT 2018: Động học, Chuyển động ném, Động lực học Newton, Công - Năng lượng và Động lượng.',
    lessons: [
      {
        id: 'phy10-01',
        title: 'Chuyển động thẳng biến đổi đều',
        readTime: '7 phút',
        summary: 'Gia tốc, phương trình vận tốc, phương trình chuyển động và hệ thức độc lập với thời gian.',
        theory: [
          {
            heading: '1. Vận tốc và Quãng đường',
            text: 'Chuyển động có gia tốc $a = \\text{hằng số}$:',
            math: 'v = v_0 + at, \\quad s = v_0 t + \\frac{1}{2}at^2'
          },
          {
            heading: '2. Hệ thức độc lập thời gian',
            math: 'v^2 - v_0^2 = 2as'
          }
        ],
        exercises: [
          {
            id: 'ex-phy10-01',
            question: 'Một xe máy bắt đầu khởi hành từ trạng thái nghỉ với gia tốc không đổi $a = 2\\text{ m/s}^2$. Vận tốc của xe sau $5\\text{ s}$ là:',
            questionMath: 'v = v_0 + at \\quad (v_0 = 0)',
            options: [
              { id: 'A', text: '10 m/s', isCorrect: true },
              { id: 'B', text: '25 m/s', isCorrect: false },
              { id: 'C', text: '20 m/s', isCorrect: false },
              { id: 'D', text: '5 m/s', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'v = v0 + at = 0 + 2 * 5 = 10 m/s.',
            misconception: 'Nhầm công thức quãng đường s = 1/2 a t^2 = 25m với công thức vận tốc.'
          }
        ]
      },
      {
        id: 'phy10-02',
        title: 'Chuyển động ném ngang',
        readTime: '8 phút',
        simulation: 'projectile',
        summary: 'Phân tích chuyển động ném ngang thành hai chuyển động thành phần: thẳng đều theo Ox và rơi tự do theo Oy.',
        theory: [
          {
            heading: '1. Phương trình quỹ đạo',
            text: 'Vật ném từ độ cao $h$ với vận tốc ban đầu $v_0$ theo phương ngang:',
            math: 'x = v_0 t, \\quad y = \\frac{1}{2}gt^2 \\implies y = \\frac{g}{2v_0^2}x^2'
          },
          {
            heading: '2. Thời gian rơi và Tầm xa',
            math: 't = \\sqrt{\\frac{2h}{g}}, \\quad L = v_0 t = v_0 \\sqrt{\\frac{2h}{g}}'
          }
        ],
        exercises: [
          {
            id: 'ex-phy10-02',
            question: 'Một vật được ném ngang từ độ cao $h = 20\\text{ m}$ với vận tốc ban đầu $v_0 = 15\\text{ m/s}$. Lấy $g = 10\\text{ m/s}^2$. Tầm xa $L$ của vật là:',
            questionMath: 'L = v_0 \\sqrt{\\frac{2h}{g}}',
            options: [
              { id: 'A', text: '30 m', isCorrect: true },
              { id: 'B', text: '20 m', isCorrect: false },
              { id: 'C', text: '45 m', isCorrect: false },
              { id: 'D', text: '15 m', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Thời gian rơi: t = √(2 * 20 / 10) = √4 = 2s. Tầm xa: L = v0 * t = 15 * 2 = 30m.',
            misconception: 'Nghĩ rằng vận tốc ban đầu v0 ảnh hưởng đến thời gian rơi (thời gian rơi chỉ phụ thuộc vào độ cao h).'
          }
        ]
      },
      {
        id: 'phy10-03',
        title: 'Ba định luật Newton',
        readTime: '8 phút',
        summary: 'Định luật I (Quán tính), Định luật II (Mối quan hệ F = ma) và Định luật III (Tác dụng và phản tác dụng).',
        theory: [
          {
            heading: '1. Định luật I & II Newton',
            text: 'Định luật II khẳng định gia tốc của vật tỉ lệ thuận với lực tác dụng và tỉ lệ nghịch với khối lượng:',
            math: '\\vec{a} = \\frac{\\vec{F}}{m} \\iff \\vec{F} = m\\vec{a}'
          },
          {
            heading: '2. Định luật III Newton',
            text: 'Lực và phản lực luôn xuất hiện đồng thời, cùng phương, ngược chiều và đặt vào hai vật khác nhau:',
            math: '\\vec{F}_{AB} = -\\vec{F}_{BA}'
          }
        ],
        exercises: [
          {
            id: 'ex-phy10-03',
            question: 'Một lực $F = 12\\text{ N}$ tác dụng vào vật khối lượng $m = 3\\text{ kg}$. Gia tốc vật thu được là:',
            questionMath: 'a = \\frac{F}{m}',
            options: [
              { id: 'A', text: '4 m/s²', isCorrect: true },
              { id: 'B', text: '36 m/s²', isCorrect: false },
              { id: 'C', text: '0.25 m/s²', isCorrect: false },
              { id: 'D', text: '9 m/s²', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'a = F / m = 12 / 3 = 4 m/s².',
            misconception: 'Nhầm lẫn nhân F * m = 36 thay vì chia F / m.'
          }
        ]
      },
      {
        id: 'phy10-04',
        title: 'Lực hấp dẫn & Lực đàn hồi',
        readTime: '7 phút',
        summary: 'Định luật vạn vật hấp dẫn của Newton, trọng lực, định luật Hooke cho lò xo lý tưởng.',
        theory: [
          {
            heading: '1. Định luật Vạn vật hấp dẫn',
            math: 'F_{hd} = G \\frac{m_1 m_2}{r^2} \\quad (G \\approx 6.67 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2)'
          },
          {
            heading: '2. Định luật Hooke',
            text: 'Trong giới hạn đàn hồi, độ lớn lực đàn hồi tỉ lệ thuận với độ biến dạng $\\Delta l$:',
            math: 'F_{dh} = k |\\Delta l|'
          }
        ],
        exercises: [
          {
            id: 'ex-phy10-04',
            question: 'Một lò xo có độ cứng $k = 100\\text{ N/m}$ bị kéo dãn $\\Delta l = 5\\text{ cm}$. Lực đàn hồi xuất hiện có độ lớn:',
            questionMath: 'F_{dh} = k |\\Delta l|',
            options: [
              { id: 'A', text: '5 N', isCorrect: true },
              { id: 'B', text: '500 N', isCorrect: false },
              { id: 'C', text: '0.5 N', isCorrect: false },
              { id: 'D', text: '20 N', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Đổi 5 cm = 0.05 m. Khi đó F_dh = 100 * 0.05 = 5 N.',
            misconception: 'Quên đổi đơn vị cm sang mét, dẫn đến tính nhầm 100 * 5 = 500 N.'
          }
        ]
      },
      {
        id: 'phy10-05',
        title: 'Công, Năng lượng và Công suất',
        readTime: '8 phút',
        summary: 'Công của lực không đổi, động năng, thế năng trọng trường và định luật bảo toàn cơ năng.',
        theory: [
          {
            heading: '1. Công và Công suất',
            math: 'A = F s \\cos \\alpha, \\quad \\mathcal{P} = \\frac{A}{t} = F v \\cos \\alpha'
          },
          {
            heading: '2. Cơ năng và Định luật bảo toàn',
            text: 'Khi vật chỉ chịu tác dụng của lực thế (như trọng lực):',
            math: 'W = W_d + W_t = \\frac{1}{2}mv^2 + mgh = \\text{const}'
          }
        ],
        exercises: [
          {
            id: 'ex-phy10-05',
            question: 'Một vật khối lượng $m = 2\\text{ kg}$ chuyển động với vận tốc $v = 4\\text{ m/s}$. Động năng của vật bằng:',
            questionMath: 'W_d = \\frac{1}{2}mv^2',
            options: [
              { id: 'A', text: '16 J', isCorrect: true },
              { id: 'B', text: '8 J', isCorrect: false },
              { id: 'C', text: '32 J', isCorrect: false },
              { id: 'D', text: '4 J', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'W_d = 0.5 * 2 * 4^2 = 1 * 16 = 16 J.',
            misconception: 'Quên bình phương vận tốc hoặc quên hệ số 1/2.'
          }
        ]
      },
      {
        id: 'phy10-06',
        title: 'Động lượng & Định luật bảo toàn động lượng',
        readTime: '8 phút',
        summary: 'Vectơ động lượng, xung lượng của lực, va chạm mềm và định luật bảo toàn động lượng cho hệ kín.',
        theory: [
          {
            heading: '1. Động lượng & Xung lượng của lực',
            math: '\\vec{p} = m\\vec{v}, \\quad \\Delta \\vec{p} = \\vec{F} \\Delta t'
          },
          {
            heading: '2. Định luật bảo toàn Động lượng',
            text: 'Trong một hệ cô lập (không chịu ngoại lực hoặc ngoại lực triệt tiêu):',
            math: '\\vec{p}_1 + \\vec{p}_2 = \\text{hằng số}'
          }
        ],
        exercises: [
          {
            id: 'ex-phy10-06',
            question: 'Vật $m = 0.5\\text{ kg}$ chuyển động với vận tốc $v = 6\\text{ m/s}$. Độ lớn động lượng của vật là:',
            questionMath: 'p = mv',
            options: [
              { id: 'A', text: '3 kg·m/s', isCorrect: true },
              { id: 'B', text: '12 kg·m/s', isCorrect: false },
              { id: 'C', text: '9 kg·m/s', isCorrect: false },
              { id: 'D', text: '1.5 kg·m/s', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'p = m * v = 0.5 * 6 = 3 kg·m/s.',
            misconception: 'Nhầm lẫn đơn vị động lượng với đơn vị lực (N) hoặc động năng (J).'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. HÓA HỌC 10 (6 BÀI)
  // ==========================================
  {
    id: 'chemistry10',
    code: 'HOA-10',
    title: 'Hóa học 10',
    description: 'Chương trình GDPT 2018: Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Phản ứng oxi hóa khử, Enthalpy và Tốc độ phản ứng.',
    lessons: [
      {
        id: 'chem10-01',
        title: 'Cấu tạo vỏ nguyên tử & Orbital',
        readTime: '8 phút',
        simulation: 'bohr-atom',
        summary: 'Mô hình nguyên tử Rutherford - Bohr, orbital nguyên tử (AO s, p), các lớp và phân lớp electron.',
        theory: [
          {
            heading: '1. Hạt cơ bản & Số khối A',
            text: 'Nguyên tử gồm hạt nhân (proton mang điện tích $+1$, neutron không mang điện) và vỏ electron (mang điện tích $-1$):',
            math: 'Z = p = e, \\quad A = Z + N'
          },
          {
            heading: '2. Các lớp và số electron tối đa',
            text: 'Lớp $n$ chứa tối đa $2n^2$ electron. Thứ tự phân mức năng lượng theo nguyên lí Klechkowski:',
            math: '1s \\to 2s \\to 2p \\to 3s \\to 3p \\to 4s \\to 3d \\dots'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-01',
            question: 'Nguyên tử Sodium ($Na$, $Z = 11$) có số electron ở lớp ngoài cùng là:',
            questionMath: '1s^2 2s^2 2p^6 3s^1 \\implies \\text{Lớp ngoài cùng (n=3)} = ?',
            options: [
              { id: 'A', text: '1', isCorrect: true },
              { id: 'B', text: '2', isCorrect: false },
              { id: 'C', text: '8', isCorrect: false },
              { id: 'D', text: '3', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Cấu hình electron của Na (Z=11): 1s^2 2s^2 2p^6 3s^1. Lớp ngoài cùng là lớp thứ 3 (n=3) chỉ có 1 electron (ở phân lớp 3s).',
            misconception: 'Nhầm tổng electron lớp 2 (8 electron) là lớp ngoài cùng.'
          }
        ]
      },
      {
        id: 'chem10-02',
        title: 'Bảng tuần hoàn các nguyên tố hóa học',
        readTime: '8 phút',
        summary: 'Nguyên tắc sắp xếp, ô nguyên tố, chu kì, nhóm A/B và quy luật biến đổi tuần hoàn bán kính, độ âm điện.',
        theory: [
          {
            heading: '1. Nguyên tắc sắp xếp',
            text: 'Các nguyên tố được sắp xếp theo chiều tăng dần của điện tích hạt nhân nguyên tử $Z$. Số thứ tự chu kì bằng số lớp electron, số thứ tự nhóm A bằng số electron hóa trị.'
          },
          {
            heading: '2. Quy luật biến đổi tuần hoàn trong một chu kì',
            text: 'Từ trái sang phải trong cùng một chu kì: Bán kính nguyên tử giảm dần, độ âm điện tăng dần, tính kim loại giảm và tính phi kim tăng dần.'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-02',
            question: 'Trong chu kì 3, nguyên tố nào sau đây có độ âm điện lớn nhất?',
            questionMath: '\\text{Chu kì 3: } Na, Mg, Al, Si, P, S, Cl',
            options: [
              { id: 'A', text: 'Chlorine (Cl)', isCorrect: true },
              { id: 'B', text: 'Sodium (Na)', isCorrect: false },
              { id: 'C', text: 'Sulfur (S)', isCorrect: false },
              { id: 'D', text: 'Aluminium (Al)', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Trong cùng một chu kì, đi từ trái sang phải, độ âm điện tăng dần. Chlorine nằm ở cuối chu kì (nhóm VIIA) nên có độ âm điện lớn nhất.',
            misconception: 'Nhầm lẫn giữa bán kính nguyên tử (lớn nhất ở Na) với độ âm điện.'
          }
        ]
      },
      {
        id: 'chem10-03',
        title: 'Liên kết ion & Liên kết cộng hóa trị',
        readTime: '8 phút',
        summary: 'Quy tắc Octet (bát thế), sự hình thành ion, liên kết ion giữa kim loại điển hình và phi kim điển hình, liên kết cộng hóa trị có cực/không cực.',
        theory: [
          {
            heading: '1. Quy tắc Octet & Liên kết ion',
            text: 'Nguyên tử có xu hướng nhường, nhận hoặc góp chung electron để đạt cấu hình electron bền vững của khí hiếm gần kề (8 electron lớp ngoài cùng, riêng He là 2).',
            math: 'Na \\to Na^+ + 1e, \\quad Cl + 1e \\to Cl^- \\implies Na^+ + Cl^- \\to NaCl'
          },
          {
            heading: '2. Hiệu độ âm điện & Bản chất liên kết',
            math: '\\Delta \\chi < 0.4 \\text{ (KCH ko cực)}, \\quad 0.4 \\le \\Delta \\chi < 1.7 \\text{ (KCH có cực)}, \\quad \\Delta \\chi \\ge 1.7 \\text{ (Liên kết ion)}'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-03',
            question: 'Liên kết trong phân tử $NaCl$ thuộc loại liên kết nào?',
            questionMath: '\\Delta \\chi = |\\chi(Cl) - \\chi(Na)| = |3.16 - 0.93| = 2.23',
            options: [
              { id: 'A', text: 'Liên kết ion', isCorrect: true },
              { id: 'B', text: 'Liên kết cộng hóa trị không cực', isCorrect: false },
              { id: 'C', text: 'Liên kết cộng hóa trị phân cực', isCorrect: false },
              { id: 'D', text: 'Liên kết kim loại', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Hiệu độ âm điện giữa Na và Cl là 3.16 - 0.93 = 2.23 > 1.7, tạo nên bởi lực hút tĩnh điện giữa Cation Na+ và Anion Cl-, là liên kết ion điển hình.',
            misconception: 'Nhầm lẫn giữa liên kết ion và liên kết cộng hóa trị có cực.'
          }
        ]
      },
      {
        id: 'chem10-04',
        title: 'Phản ứng oxi hóa - khử',
        readTime: '9 phút',
        summary: 'Số oxi hóa, chất khử (cho e), chất oxi hóa (nhận e), quá trình oxi hóa/khử và phương pháp thăng bằng electron.',
        theory: [
          {
            heading: '1. Quy tắc nhớ bản chất',
            text: 'Khử cho - O nhận: Chất khử là chất nhường electron (số oxi hóa tăng), chất oxi hóa là chất nhận electron (số oxi hóa giảm).'
          },
          {
            heading: '2. Cân bằng phương trình oxi hóa - khử',
            math: '\\text{Tổng electron nhường} = \\text{Tổng electron nhận}'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-04',
            question: 'Trong phản ứng $Fe + 2HCl \\to FeCl_2 + H_2$, chất đóng vai trò là chất khử là:',
            questionMath: 'Fe^0 \\to Fe^{+2} + 2e',
            options: [
              { id: 'A', text: 'Fe', isCorrect: true },
              { id: 'B', text: 'HCl', isCorrect: false },
              { id: 'C', text: 'FeCl₂', isCorrect: false },
              { id: 'D', text: 'H₂', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Fe có số oxi hóa tăng từ 0 lên +2 (nhường 2e) nên Fe là chất khử. H+ trong HCl nhận 1e giảm xuống H2 (0) nên HCl là chất oxi hóa.',
            misconception: 'Nhầm lẫn giữa chất khử (bị oxi hóa) và chất oxi hóa (bị khử).'
          }
        ]
      },
      {
        id: 'chem10-05',
        title: 'Năng lượng hóa học (Enthalpy)',
        readTime: '8 phút',
        summary: 'Phản ứng tỏa nhiệt và thu nhiệt, biến thiên enthalpy chuẩn $\\Delta_r H_{298}^\\circ$, phương trình nhiệt hóa học.',
        theory: [
          {
            heading: '1. Phản ứng Tỏa nhiệt & Thu nhiệt',
            text: 'Phản ứng tỏa nhiệt giải phóng năng lượng ra môi trường, $\\Delta_r H_{298}^\\circ < 0$. Phản ứng thu nhiệt hấp thụ năng lượng từ môi trường, $\\Delta_r H_{298}^\\circ > 0$.',
            math: '\\Delta_r H_{298}^\\circ < 0 \\iff \\text{Tỏa nhiệt}, \\quad \\Delta_r H_{298}^\\circ > 0 \\iff \\text{Thu nhiệt}'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-05',
            question: 'Cho phản ứng $CH_4(g) + 2O_2(g) \\to CO_2(g) + 2H_2O(l)$ có $\\Delta_r H_{298}^\\circ = -890.3\\text{ kJ}$. Đây là phản ứng:',
            questionMath: '\\Delta_r H_{298}^\\circ = -890.3\\text{ kJ} < 0',
            options: [
              { id: 'A', text: 'Tỏa nhiệt', isCorrect: true },
              { id: 'B', text: 'Thu nhiệt', isCorrect: false },
              { id: 'C', text: 'Không đổi năng lượng', isCorrect: false },
              { id: 'D', text: 'Nhiệt phân hủy', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Biến thiên Enthalpy âm (ΔH < 0) đặc trưng cho phản ứng tỏa nhiệt (giải phóng 890.3 kJ nhiệt lượng ra môi trường).',
            misconception: 'Nhầm dấu âm là thu nhiệt.'
          }
        ]
      },
      {
        id: 'chem10-06',
        title: 'Tốc độ phản ứng & Nhóm Halogen',
        readTime: '8 phút',
        summary: 'Các yếu tố ảnh hưởng đến tốc độ phản ứng (nồng độ, nhiệt độ, áp suất, diện tích bề mặt, chất xúc tác) và tính chất hóa học nhóm Halogen.',
        theory: [
          {
            heading: '1. Định luật tác dụng khối lượng',
            math: 'aA + bB \\to Products \\implies v = k [A]^a [B]^b'
          },
          {
            heading: '2. Đặc tính nhóm Halogen (Nhóm VIIA)',
            text: 'Gồm $F, Cl, Br, I$. Có 7 electron lớp ngoài cùng ($ns^2 np^5$), tính phi kim và tính oxi hóa giảm dần từ Fluorine đến Iodine.'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-06',
            question: 'Khi tăng nhiệt độ hoặc tăng nồng độ chất phản ứng, tốc độ phản ứng hóa học thông thường sẽ:',
            questionMath: 'T \\uparrow, \\ C \\uparrow \\implies v = ?',
            options: [
              { id: 'A', text: 'Tăng lên', isCorrect: true },
              { id: 'B', text: 'Giảm đi', isCorrect: false },
              { id: 'C', text: 'Không đổi', isCorrect: false },
              { id: 'D', text: 'Bằng 0', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Tăng nhiệt độ làm các hạt chuyển động nhanh hơn, tăng số va chạm hiệu quả; tăng nồng độ làm mật độ hạt va chạm dày đặc hơn, do đó tốc độ phản ứng tăng.',
            misconception: 'Nghĩ rằng nhiệt độ chỉ ảnh hưởng đến các phản ứng thu nhiệt.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. TIN HỌC 10 (6 BÀI)
  // ==========================================
  {
    id: 'cs10',
    code: 'TIN-10',
    title: 'Tin học 10',
    description: 'Chương trình GDPT 2018: Biểu diễn thông tin, Mạng máy tính, Lập trình Python cơ bản, Rẽ nhánh, Vòng lặp và Kiểu dữ liệu danh sách.',
    lessons: [
      {
        id: 'cs10-01',
        title: 'Biểu diễn thông tin & Hệ nhị phân',
        readTime: '7 phút',
        summary: 'Hệ đếm nhị phân (Binary - Base 2), bảng mã ASCII/Unicode, đơn vị đo dung lượng thông tin (Bit, Byte, KB, MB, GB).',
        theory: [
          {
            heading: '1. Hệ nhị phân (Base 2)',
            text: 'Máy tính sử dụng hai ký hiệu $0$ và $1$ (bit) để biểu diễn mọi dữ liệu. Chuyển đổi nhị phân sang thập phân:',
            math: '(1101)_2 = 1 \\times 2^3 + 1 \\times 2^2 + 0 \\times 2^1 + 1 \\times 2^0 = 8 + 4 + 0 + 1 = 13'
          },
          {
            heading: '2. Đơn vị đo dung lượng thông tin',
            math: '1 \\text{ Byte} = 8 \\text{ bits}, \\quad 1 \\text{ KB} = 1024 \\text{ Bytes}, \\quad 1 \\text{ MB} = 1024 \\text{ KB}'
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-01',
            question: 'Số nhị phân $(1010)_2$ khi chuyển sang hệ thập phân có giá trị là:',
            questionMath: '(1010)_2 = 1 \\cdot 2^3 + 0 \\cdot 2^2 + 1 \\cdot 2^1 + 0 \\cdot 2^0 = ?',
            options: [
              { id: 'A', text: '10', isCorrect: true },
              { id: 'B', text: '12', isCorrect: false },
              { id: 'C', text: '8', isCorrect: false },
              { id: 'D', text: '14', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: '1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 0 * 2^0 = 8 + 0 + 2 + 0 = 10.',
            misconception: 'Đếm lũy thừa cơ số từ trái sang phải thay vì từ phải sang trái (bắt đầu từ 2^0).'
          }
        ]
      },
      {
        id: 'cs10-02',
        title: 'Mạng máy tính & An toàn thông tin',
        readTime: '7 phút',
        summary: 'Mạng cục bộ (LAN), mạng diện rộng (WAN), giao thức TCP/IP, địa chỉ IP và các nguyên tắc bảo vệ dữ liệu cá nhân trên Internet.',
        theory: [
          {
            heading: '1. Phân loại Mạng máy tính',
            text: 'LAN (Local Area Network) kết nối trong phạm vi hẹp (trường học, văn phòng). WAN (Wide Area Network) kết nối trên phạm vi địa lý rộng lớn toàn cầu như Internet.'
          },
          {
            heading: '2. An toàn thông tin & Mật khẩu mạnh',
            text: 'Sử dụng mật khẩu có độ dài tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt; bật xác thực hai yếu tố (2FA).'
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-02',
            question: 'Giao thức nào là nền tảng cốt lõi điều khiển việc truyền nhận dữ liệu trên mạng Internet?',
            options: [
              { id: 'A', text: 'TCP/IP', isCorrect: true },
              { id: 'B', text: 'HTTP only', isCorrect: false },
              { id: 'C', text: 'FTP only', isCorrect: false },
              { id: 'D', text: 'DNS only', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Bộ giao thức TCP/IP (Transmission Control Protocol / Internet Protocol) là bộ quy chuẩn truyền thông cốt lõi của Internet.',
            misconception: 'Nhầm lẫn giữa giao thức ứng dụng HTTP và giao thức mạng cơ bản TCP/IP.'
          }
        ]
      },
      {
        id: 'cs10-03',
        title: 'Biến, Kiểu dữ liệu & Phép toán Python',
        readTime: '8 phút',
        summary: 'Các kiểu dữ liệu cơ bản (int, float, str, bool), quy tắc đặt tên biến, phép toán số học (+, -, *, /, //, %, **).',
        theory: [
          {
            heading: '1. Các kiểu dữ liệu cơ bản',
            code: `age = 16         # int (Số nguyên)
score = 8.5      # float (Số thực)
name = "Minh"    # str (Xâu ký tự)
is_pass = True   # bool (Logic Đúng/Sai)`
          },
          {
            heading: '2. Các phép chia đặc biệt trong Python',
            text: '`//` là phép chia lấy phần nguyên, `%` là phép chia lấy phần dư, `**` là lũy thừa:',
            math: '7 // 2 = 3, \\quad 7 \\% 2 = 1, \\quad 2 ** 3 = 8'
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-03',
            question: 'Trong Python, kết quả của biểu thức `17 // 5` và `17 % 5` lần lượt là:',
            options: [
              { id: 'A', text: '3 và 2', isCorrect: true },
              { id: 'B', text: '3.4 và 2', isCorrect: false },
              { id: 'C', text: '2 và 3', isCorrect: false },
              { id: 'D', text: '3 và 0', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: '17 // 5 chia lấy phần nguyên được 3 (vì 3 * 5 = 15). 17 % 5 chia lấy số dư: 17 - 15 = 2.',
            misconception: 'Nhầm // là phép chia số thực thông thường (17 / 5 = 3.4).'
          }
        ]
      },
      {
        id: 'cs10-04',
        title: 'Cấu trúc rẽ nhánh if-else',
        readTime: '8 phút',
        summary: 'Câu lệnh if, if-else, if-elif-else, quy tắc thụt đầu dòng (Indentation) trong Python và biểu thức logic.',
        theory: [
          {
            heading: '1. Cú pháp if-elif-else',
            code: `score = 8.5
if score >= 8.0:
    print("Học lực Giỏi")
elif score >= 6.5:
    print("Học lực Khá")
else:
    print("Học lực Trung bình")`
          },
          {
            heading: '2. Quy tắc Thụt dòng (Indentation)',
            text: 'Python sử dụng thụt lề (thường là 4 dấu cách) để xác định khối lệnh (block of code) thay cho dấu ngoặc nhọn `{}`.'
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-04',
            question: 'Cho đoạn mã sau:\n```python\nx = 10\nif x % 2 == 0 and x > 5:\n    print("YES")\nelse:\n    print("NO")\n```\nKết quả in ra màn hình là:',
            options: [
              { id: 'A', text: 'YES', isCorrect: true },
              { id: 'B', text: 'NO', isCorrect: false },
              { id: 'C', text: 'Báo lỗi cú pháp', isCorrect: false },
              { id: 'D', text: 'Không in gì', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'x = 10 chia hết cho 2 (10 % 2 == 0 Đúng) VÀ x = 10 > 5 (Đúng). Cả 2 vế của toán tử `and` đều True nên nhánh if chạy, in ra "YES".',
            misconception: 'Hiểu nhầm toán tử logic `and` thành `or`.'
          }
        ]
      },
      {
        id: 'cs10-05',
        title: 'Cấu trúc lặp for và while',
        readTime: '9 phút',
        simulation: 'python-loop',
        summary: 'Vòng lặp xác định với hàm range(), vòng lặp không xác định while, lệnh break và continue.',
        theory: [
          {
            heading: '1. Vòng lặp For & hàm range()',
            text: '`range(start, stop, step)` tạo dãy số từ `start` đến `stop - 1`:',
            code: `for i in range(1, 6):
    print(i) # In ra: 1, 2, 3, 4, 5`
          },
          {
            heading: '2. Vòng lặp While',
            code: `count = 0
while count < 3:
    print(count)
    count += 1 # In ra: 0, 1, 2`
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-05',
            question: 'Đoạn mã sau in ra giá trị gì?\n```python\ntotal = 0\nfor i in range(1, 4):\n    total += i\nprint(total)\n```',
            options: [
              { id: 'A', text: '6', isCorrect: true },
              { id: 'B', text: '10', isCorrect: false },
              { id: 'C', text: '3', isCorrect: false },
              { id: 'D', text: '4', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'range(1, 4) duyệt qua các số: 1, 2, 3 (không gồm 4). Tổng total = 1 + 2 + 3 = 6.',
            misconception: 'Nghĩ rằng range(1, 4) lấy cả số 4 và cộng ra 10.'
          }
        ]
      },
      {
        id: 'cs10-06',
        title: 'Kiểu dữ liệu danh sách (List) và Xâu ký tự',
        readTime: '8 phút',
        summary: 'Khởi tạo List, chỉ số index bắt đầu từ 0, chỉ số âm, các phương thức phổ biến (.append, .pop, .len) và xử lý xâu ký tự.',
        theory: [
          {
            heading: '1. Danh sách (List) trong Python',
            text: 'Danh sách là tập hợp các phần tử có thứ tự và có thể thay đổi (mutable):',
            code: `fruits = ["Táo", "Cam", "Chuối"]
fruits.append("Nho") # Thêm phần tử
print(fruits[0])     # In: Táo
print(fruits[-1])    # In: Nho (phần tử cuối)`
          },
          {
            heading: '2. Xâu ký tự (String)',
            text: 'Xâu ký tự là bất biến (immutable), truy cập tương tự mảng:',
            code: `msg = "Studywme"
print(len(msg))   # Độ dài xâu: 8
print(msg[0:5])   # Cắt xâu (slice): Study`
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-06',
            question: 'Cho danh sách `a = [10, 20, 30, 40]`. Giá trị của `a[-1]` và `len(a)` lần lượt là:',
            options: [
              { id: 'A', text: '40 và 4', isCorrect: true },
              { id: 'B', text: '10 và 4', isCorrect: false },
              { id: 'C', text: '30 và 3', isCorrect: false },
              { id: 'D', text: '40 và 3', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Chỉ số âm -1 truy xuất phần tử cuối cùng của mảng là 40. Hàm len(a) trả về tổng số phần tử là 4.',
            misconception: 'Nhầm chỉ số -1 là phần tử đầu tiên hoặc đếm len bắt đầu từ 0.'
          }
        ]
      }
    ]
  }
];
