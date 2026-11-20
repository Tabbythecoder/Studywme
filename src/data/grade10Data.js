export const grade10Subjects = [
  {
    id: 'math10',
    code: 'TOAN-10',
    title: 'Toán 10',
    description: 'Chương trình GDPT 2018: Đại số đại cương, Bất đẳng thức, Vectơ và Lượng giác.',
    lessons: [
      {
        id: 'math10-01',
        title: 'Mệnh đề và Tập hợp',
        status: 'Hoàn thành',
        progress: 100,
        readTime: '6 phút',
        summary: 'Quy tắc chân trị, mệnh đề phủ định, mệnh đề kéo theo, phép giao và hợp tập hợp.',
        theory: [
          {
            heading: '1. Mệnh đề toán học & Mệnh đề phủ định',
            text: 'Mệnh đề là một khẳng định có tính đúng hoặc sai, không thể vừa đúng vừa sai. Ký hiệu phủ định của mệnh đề $P$ là $\\overline{P}$.',
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
            explanation: 'Giao của hai tập hợp là phần tử thuộc cả hai tập: x >= 1 (từ B) và x < 5 (từ A). Do đó A ∩ B = [1; 5). Chú ý ngoặc tròn tại 5 vì x < 5.',
            misconception: 'Thường nhầm lẫn giữa ngoặc vuông [ (lấy dấu bằng) và ngoặc tròn ( (không lấy dấu bằng) tại điểm mút 5.'
          }
        ]
      },
      {
        id: 'math10-02',
        title: 'Bất phương trình bậc nhất hai ẩn',
        status: 'Đang học',
        progress: 60,
        readTime: '7 phút',
        summary: 'Dạng tổng quát ax + by + c ≤ 0, biểu diễn miền nghiệm trên mặt phẳng tọa độ Oxy.',
        theory: [
          {
            heading: '1. Định nghĩa và Miền nghiệm',
            text: 'Bất phương trình bậc nhất hai ẩn có dạng tổng quát:',
            math: 'ax + by + c \\le 0 \\quad (a^2 + b^2 \\neq 0)',
            textAfter: 'Đường thẳng $d: ax + by + c = 0$ chia mặt phẳng thành hai nửa mặt phẳng bờ $d$. Một trong hai nửa mặt phẳng là miền nghiệm.'
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
            explanation: 'Thay x = 1, y = 1 vào vế trái: 2(1) - 3(1) + 4 = 3 > 0 (thỏa mãn). Với (0; 2): 2(0) - 3(2) + 4 = -2 < 0 (loại).',
            misconception: 'Tính nhầm dấu âm của hệ số b (-3y) khi thay giá trị âm hoặc giá trị lớn.'
          }
        ]
      },
      {
        id: 'math10-03',
        title: 'Hệ thức lượng trong tam giác',
        status: 'Chưa học',
        progress: 0,
        readTime: '8 phút',
        summary: 'Định lí côsin, định lí sin, công thức tính diện tích tam giác và bán kính đường tròn.',
        theory: [
          {
            heading: '1. Định lí Côsin',
            text: 'Trong tam giác $ABC$ với các cạnh đối diện tương ứng $a, b, c$:',
            math: 'a^2 = b^2 + c^2 - 2bc \\cos A, \\quad \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}'
          },
          {
            heading: '2. Định lí Sin & Bán kính đường tròn ngoại tiếp',
            math: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R'
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
              { id: 'C', text: '\\sqrt{74}', isCorrect: false },
              { id: 'D', text: '6', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Áp dụng định lí cos: a² = 7² + 5² - 2·7·5·cos(60°) = 49 + 25 - 70·(1/2) = 74 - 35 = 39 ⇒ a = √39.',
            misconception: 'Quên lấy căn bậc hai của kết quả a² = 39, hoặc nhớ sai giá trị cos(60°) = 1/2.'
          }
        ]
      },
      {
        id: 'math10-04',
        title: 'Vectơ trong mặt phẳng',
        status: 'Chưa học',
        progress: 0,
        readTime: '7 phút',
        summary: 'Khái niệm vectơ, quy tắc ba điểm, quy tắc hình bình hành, tích vô hướng của hai vectơ.',
        theory: [
          {
            heading: '1. Tích vô hướng của hai vectơ',
            text: 'Tích vô hướng của hai vectơ $\\vec{u}$ và $\\vec{v}$ được xác định bởi:',
            math: '\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-04',
            question: 'Điều kiện cần và đủ để hai vectơ $\\vec{a}$ và $\\vec{b}$ khác vectơ-không vuông góc với nhau là:',
            questionMath: '\\vec{a} \\perp \\vec{b} \\iff ?',
            options: [
              { id: 'A', text: '\\vec{a} \\cdot \\vec{b} = 0', isCorrect: true },
              { id: 'B', text: '\\vec{a} = \\vec{b}', isCorrect: false },
              { id: 'C', text: '|\\vec{a}| = |\\vec{b}|', isCorrect: false },
              { id: 'D', text: '\\vec{a} \\cdot \\vec{b} = 1', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Do góc giữa hai vectơ vuông góc là 90° và cos(90°) = 0, nên tích vô hướng a·b = |a||b|cos(90°) = 0.',
            misconception: 'Nhầm lẫn giữa tích vô hướng bằng 0 với việc hai vectơ có độ dài bằng nhau.'
          }
        ]
      },
      {
        id: 'math10-05',
        title: 'Hàm số bậc hai và Đồ thị',
        status: 'Chưa học',
        progress: 0,
        readTime: '6 phút',
        summary: 'Hàm số y = ax² + bx + c (a ≠ 0), tọa độ đỉnh parabol, trục đối xứng và bảng biến thiên.',
        theory: [
          {
            heading: '1. Tọa độ đỉnh và Trục đối xứng',
            text: 'Parabol $(P): y = ax^2 + bx + c$ có đỉnh $I$ và trục đối xứng $x$:',
            math: 'I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right), \\quad x = -\\frac{b}{2a}'
          }
        ],
        exercises: [
          {
            id: 'ex-math10-05',
            question: 'Tọa độ đỉnh của parabol $(P): y = x^2 - 4x + 3$ là:',
            questionMath: 'y = x^2 - 4x + 3 \\implies I(x_I; y_I) = ?',
            options: [
              { id: 'A', text: '(2; -1)', isCorrect: true },
              { id: 'B', text: '(-2; 15)', isCorrect: false },
              { id: 'C', text: '(4; 3)', isCorrect: false },
              { id: 'D', text: '(2; 1)', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Hoành độ đỉnh: x = -b/(2a) = -(-4)/(2·1) = 2. Tung độ: y = 2² - 4(2) + 3 = 4 - 8 + 3 = -1. Vậy đỉnh I(2; -1).',
            misconception: 'Quên dấu trừ trong công thức x = -b/(2a), dẫn đến x = -2 thay vì +2.'
          }
        ]
      }
    ]
  },
  {
    id: 'physics10',
    code: 'VATLI-10',
    title: 'Vật lí 10',
    description: 'Chương trình GDPT 2018: Động học, Động lực học chất điểm, Năng lượng & Động lượng.',
    lessons: [
      {
        id: 'phys10-01',
        title: 'Động học chất điểm (Vận tốc & Gia tốc)',
        status: 'Hoàn thành',
        progress: 100,
        readTime: '7 phút',
        summary: 'Phương trình vận tốc, gia tốc, quãng đường của chuyển động thẳng biến đổi đều.',
        theory: [
          {
            heading: '1. Chuyển động thẳng biến đổi đều',
            text: 'Các công thức liên hệ then chốt giữa vận tốc $v$, gia tốc $a$, thời gian $t$ và độ dịch chuyển $d$:',
            math: 'v = v_0 + at, \\quad d = v_0 t + \\frac{1}{2}at^2, \\quad v^2 - v_0^2 = 2ad'
          }
        ],
        exercises: [
          {
            id: 'ex-phys10-01',
            question: 'Một xe máy bắt đầu khởi hành từ trạng thái đứng yên với gia tốc không đổi $a = 2\\text{ m/s}^2$. Vận tốc của xe sau $5\\text{ s}$ là:',
            questionMath: 'v_0 = 0, \\quad a = 2\\text{ m/s}^2, \\quad t = 5\\text{ s} \\implies v = ?',
            options: [
              { id: 'A', text: '10 m/s', isCorrect: true },
              { id: 'B', text: '25 m/s', isCorrect: false },
              { id: 'C', text: '20 m/s', isCorrect: false },
              { id: 'D', text: '5 m/s', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Khởi hành từ trạng thái nghỉ: v₀ = 0. Áp dụng công thức: v = v₀ + at = 0 + 2·5 = 10 m/s.',
            misconception: 'Nhầm công thức vận tốc v = at với công thức quãng đường d = 1/2 at² (tính ra 25m).'
          }
        ]
      },
      {
        id: 'phys10-02',
        title: 'Động lực học (Ba định luật Newton)',
        status: 'Đang học',
        progress: 50,
        readTime: '8 phút',
        summary: 'Định luật I (quán tính), Định luật II (F = ma), Định luật III (tương tác trực đối).',
        theory: [
          {
            heading: '1. Định luật II Newton',
            text: 'Gia tốc của một vật tỉ lệ thuận với hợp lực tác dụng lên vật và tỉ lệ nghịch với khối lượng của vật:',
            math: '\\vec{a} = \\frac{\\vec{F}_{hl}}{m} \\iff \\vec{F}_{hl} = m\\vec{a}'
          },
          {
            heading: '2. Định luật III Newton',
            math: '\\vec{F}_{AB} = -\\vec{F}_{BA}'
          }
        ],
        exercises: [
          {
            id: 'ex-phys10-02',
            question: 'Một lực không đổi $F = 15\\text{ N}$ tác dụng vào vật có khối lượng $m = 3\\text{ kg}$. Gia tốc vật thu được là:',
            questionMath: 'F = 15\\text{ N}, \\quad m = 3\\text{ kg} \\implies a = ?',
            options: [
              { id: 'A', text: '5 m/s²', isCorrect: true },
              { id: 'B', text: '45 m/s²', isCorrect: false },
              { id: 'C', text: '0.2 m/s²', isCorrect: false },
              { id: 'D', text: '12 m/s²', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Theo định luật II Newton: a = F / m = 15 / 3 = 5 m/s².',
            misconception: 'Nhân F · m thay vì chia F / m (tính ra 45).'
          }
        ]
      },
      {
        id: 'phys10-03',
        title: 'Công - Năng lượng - Công suất',
        status: 'Chưa học',
        progress: 0,
        readTime: '6 phút',
        summary: 'Định nghĩa công cơ học A = F·s·cosα, động năng, thế năng trọng trường và cơ năng.',
        theory: [
          {
            heading: '1. Biểu thức tính công',
            math: 'A = F \\cdot s \\cdot \\cos\\alpha, \\quad \\mathcal{P} = \\frac{A}{t} = F \\cdot v'
          }
        ],
        exercises: [
          {
            id: 'ex-phys10-03',
            question: 'Một lực $F$ tác dụng vuông góc với phương dịch chuyển của vật ($\\alpha = 90^\\circ$). Công do lực thực hiện là:',
            questionMath: '\\alpha = 90^\\circ \\implies A = F \\cdot s \\cdot \\cos(90^\\circ) = ?',
            options: [
              { id: 'A', text: 'A = 0', isCorrect: true },
              { id: 'B', text: 'A = F · s', isCorrect: false },
              { id: 'C', text: 'A = -F · s', isCorrect: false },
              { id: 'D', text: 'A > 0', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Vì cos(90°) = 0, công A = F · s · 0 = 0. Lực vuông góc với hướng dịch chuyển không sinh công (ví dụ lực hướng tâm trong chuyển động tròn đều).',
            misconception: 'Nghĩ rằng hễ có lực tác dụng và vật dịch chuyển thì lực luôn sinh công.'
          }
        ]
      },
      {
        id: 'phys10-04',
        title: 'Động lượng & Định luật bảo toàn động lượng',
        status: 'Chưa học',
        progress: 0,
        readTime: '7 phút',
        summary: 'Vectơ động lượng p = mv, hệ kín và va chạm mềm/đàn hồi.',
        theory: [
          {
            heading: '1. Định nghĩa và Bảo toàn động lượng',
            math: '\\vec{p} = m\\vec{v}, \\quad \\sum \\vec{p}_{\\text{trước}} = \\sum \\vec{p}_{\\text{sau}} \\quad (\\text{hệ kín})'
          }
        ],
        exercises: [
          {
            id: 'ex-phys10-04',
            question: 'Đơn vị đo chuẩn của động lượng trong hệ SI là:',
            questionMath: 'p = m \\cdot v \\implies [p] = ?',
            options: [
              { id: 'A', text: 'kg·m/s (hoặc N·s)', isCorrect: true },
              { id: 'B', text: 'Joule (J)', isCorrect: false },
              { id: 'C', text: 'N/m', isCorrect: false },
              { id: 'D', text: 'kg·m/s²', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Động lượng p = m·v có đơn vị khối lượng (kg) nhân vận tốc (m/s) = kg·m/s. Tương đương với N·s từ biến thiên động lượng Δp = F·Δt.',
            misconception: 'Nhầm đơn vị động lượng với đơn vị của lực (kg·m/s² = N) hoặc năng lượng (J).'
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry10',
    code: 'HOAHOC-10',
    title: 'Hóa học 10',
    description: 'Chương trình GDPT 2018: Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học & Oxi hóa - khử.',
    lessons: [
      {
        id: 'chem10-01',
        title: 'Cấu tạo nguyên tử & Vỏ electron',
        status: 'Hoàn thành',
        progress: 100,
        readTime: '6 phút',
        summary: 'Hạt nhân (proton, neutron), vỏ electron, số hiệu nguyên tử Z và cấu hình electron.',
        theory: [
          {
            heading: '1. Thành phần hạt trong nguyên tử',
            text: 'Nguyên tử trung hòa về điện: số proton trong hạt nhân bằng số electron ở lớp vỏ ($p = e = Z$). Số khối $A = Z + N$.',
            math: 'A = Z + N, \\quad q_{\\text{nguyên tử}} = 0'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-01',
            question: 'Nguyên tử Natri ($_{11}^{23}\\text{Na}$) có số hạt proton, electron và neutron lần lượt là:',
            questionMath: '_{11}^{23}\\text{Na} \\implies (p, e, n) = ?',
            options: [
              { id: 'A', text: '11, 11, 12', isCorrect: true },
              { id: 'B', text: '11, 12, 11', isCorrect: false },
              { id: 'C', text: '11, 11, 23', isCorrect: false },
              { id: 'D', text: '12, 12, 11', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Số hiệu Z = p = e = 11. Số khối A = 23, suy ra số neutron n = A - Z = 23 - 11 = 12.',
            misconception: 'Nhầm lẫn giữa số khối A (23) với số neutron n (12).'
          }
        ]
      },
      {
        id: 'chem10-02',
        title: 'Bảng tuần hoàn các nguyên tố hóa học',
        status: 'Đang học',
        progress: 40,
        readTime: '7 phút',
        summary: 'Ô nguyên tố, chu kì, nhóm A/B và quy luật biến đổi tính kim loại, phi kim, bán kính nguyên tử.',
        theory: [
          {
            heading: '1. Quy luật biến đổi tuần hoàn (Trong một chu kì từ trái qua phải)',
            text: 'Điện tích hạt nhân tăng dần: bán kính nguyên tử giảm dần, độ âm điện tăng dần, tính phi kim tăng dần, tính kim loại giảm dần.'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-02',
            question: 'Trong cùng một chu kì, đi từ trái sang phải theo chiều tăng dần của điện tích hạt nhân thì:',
            questionMath: 'Z \\uparrow \\implies \\text{Bán kính nguyên tử & Tính kim loại}?',
            options: [
              { id: 'A', text: 'Bán kính nguyên tử giảm dần, tính kim loại giảm dần', isCorrect: true },
              { id: 'B', text: 'Bán kính nguyên tử tăng dần, tính kim loại tăng dần', isCorrect: false },
              { id: 'C', text: 'Bán kính nguyên tử giảm dần, tính kim loại tăng dần', isCorrect: false },
              { id: 'D', text: 'Bán kính nguyên tử không đổi', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Từ trái sang phải trong chu kì: số lớp electron không đổi nhưng điện tích hạt nhân tăng hút màng e mạnh hơn ⇒ bán kính giảm, khả năng nhường e giảm ⇒ tính kim loại giảm.',
            misconception: 'Nghĩ rằng khối lượng nguyên tử tăng thì kích thước bán kính phải tăng.'
          }
        ]
      },
      {
        id: 'chem10-03',
        title: 'Liên kết hóa học (Cộng hóa trị & Ion)',
        status: 'Chưa học',
        progress: 0,
        readTime: '6 phút',
        summary: 'Quy tắc octet, liên kết ion do lực hút tĩnh điện, liên kết cộng hóa trị phân cực và không phân cực.',
        theory: [
          {
            heading: '1. Quy tắc bát tử (Octet Rule)',
            text: 'Các nguyên tử có xu hướng nhường, nhận hoặc góp chung electron để đạt cấu hình bền vững của khí hiếm với 8 electron ở lớp ngoài cùng (hoặc 2e với He).'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-03',
            question: 'Liên kết giữa kim loại điển hình và phi kim điển hình (như NaCl) thuộc loại liên kết nào?',
            questionMath: '\\text{Na}^+ + \\text{Cl}^- \\longrightarrow \\text{NaCl}',
            options: [
              { id: 'A', text: 'Liên kết ion', isCorrect: true },
              { id: 'B', text: 'Liên kết cộng hóa trị không phân cực', isCorrect: false },
              { id: 'C', text: 'Liên kết hiđro', isCorrect: false },
              { id: 'D', text: 'Liên kết kim loại', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Hiệu độ âm điện giữa Na (0.93) và Cl (3.16) là 2.23 > 1.7. Đây là liên kết hình thành bởi lực hút tĩnh điện giữa cation Na⁺ và anion Cl⁻ (liên kết ion).',
            misconception: 'Nhầm lẫn giữa việc góp chung electron (cộng hóa trị) với việc nhường/nhận hẳn electron tạo ion.'
          }
        ]
      },
      {
        id: 'chem10-04',
        title: 'Phản ứng oxi hóa - khử',
        status: 'Chưa học',
        progress: 0,
        readTime: '8 phút',
        summary: 'Xác định số oxi hóa, chất khử, chất oxi hóa, phương pháp thăng bằng electron.',
        theory: [
          {
            heading: '1. Khẩu quyết xác định',
            text: '"Khử cho - O nhận": Chất khử nhường electron (số oxi hóa tăng), chất oxi hóa nhận electron (số oxi hóa giảm).'
          }
        ],
        exercises: [
          {
            id: 'ex-chem10-04',
            question: 'Trong phản ứng $2\\text{Mg} + \\text{O}_2 \\longrightarrow 2\\text{MgO}$, chất đóng vai trò là chất khử là:',
            questionMath: '\\overset{0}{\\text{Mg}} \\longrightarrow \\overset{+2}{\\text{Mg}} + 2e',
            options: [
              { id: 'A', text: 'Mg', isCorrect: true },
              { id: 'B', text: 'O2', isCorrect: false },
              { id: 'C', text: 'MgO', isCorrect: false },
              { id: 'D', text: 'Không có chất nào', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Mg có số oxi hóa tăng từ 0 lên +2 trong MgO (nhường electron) nên Mg là chất khử. O₂ có số oxi hóa giảm từ 0 xuống -2 nên là chất oxi hóa.',
            misconception: 'Nhầm lẫn giữa chất khử (bị oxi hóa) và chất oxi hóa (bị khử).'
          }
        ]
      }
    ]
  },
  {
    id: 'cs10',
    code: 'TINHOC-10',
    title: 'Tin học 10',
    description: 'Chương trình GDPT 2018: Biểu diễn thông tin, Mạng máy tính & Lập trình ngôn ngữ Python.',
    lessons: [
      {
        id: 'cs10-01',
        title: 'Biểu diễn thông tin và Dữ liệu số',
        status: 'Hoàn thành',
        progress: 100,
        readTime: '5 phút',
        summary: 'Hệ nhị phân (Binary), đơn vị đo bit/byte, mã hóa văn bản, hình ảnh và âm thanh.',
        theory: [
          {
            heading: '1. Đơn vị đo dung lượng thông tin',
            text: 'Bit là đơn vị đo nhỏ nhất (giá trị 0 hoặc 1). Byte gồm 8 bit liên tiếp:',
            math: '1 \\text{ Byte} = 8 \\text{ bits}, \\quad 1 \\text{ KB} = 1024 \\text{ Bytes}'
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-01',
            question: 'Số nhị phân `1011` trong hệ thập phân tương ứng với giá trị nào?',
            questionMath: '1011_2 = 1 \\cdot 2^3 + 0 \\cdot 2^2 + 1 \\cdot 2^1 + 1 \\cdot 2^0 = ?',
            options: [
              { id: 'A', text: '11', isCorrect: true },
              { id: 'B', text: '13', isCorrect: false },
              { id: 'C', text: '9', isCorrect: false },
              { id: 'D', text: '7', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: '1·2³ + 0·2² + 1·2¹ + 1·2⁰ = 8 + 0 + 2 + 1 = 11.',
            misconception: 'Tính nhầm 2⁰ = 0 hoặc nhầm vị trí trọng số bit từ phải sang trái.'
          }
        ]
      },
      {
        id: 'cs10-02',
        title: 'Mạng máy tính & Internet',
        status: 'Đang học',
        progress: 50,
        readTime: '6 phút',
        summary: 'Phân loại mạng LAN/WAN, giao thức TCP/IP, địa chỉ IP và an toàn thông tin.',
        theory: [
          {
            heading: '1. Mạng cục bộ (LAN) và Mạng diện rộng (WAN)',
            text: 'LAN (Local Area Network) kết nối phạm vi hẹp (trường học, văn phòng). WAN (Wide Area Network) kết nối phạm vi địa lý rộng lớn (quốc gia, toàn cầu).'
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-02',
            question: 'Thiết bị nào sau đây có chức năng định tuyến gói tin giữa các mạng máy tính khác nhau?',
            questionMath: '\\text{Thiết bị kết nối mạng}',
            options: [
              { id: 'A', text: 'Router (Bộ định tuyến)', isCorrect: true },
              { id: 'B', text: 'Switch (Bộ chuyển mạch)', isCorrect: false },
              { id: 'C', text: 'Hub', isCorrect: false },
              { id: 'D', text: 'Card mạng (NIC)', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Router hoạt động ở tầng mạng (Network Layer) để tìm đường đi và chuyển tiếp gói tin giữa các mạng con khác nhau. Switch chủ yếu chuyển mạch trong cùng mạng LAN.',
            misconception: 'Nhầm lẫn giữa Switch (chuyển mạch nội bộ) và Router (định tuyến liên mạng).'
          }
        ]
      },
      {
        id: 'cs10-03',
        title: 'Lập trình Python: Cấu trúc rẽ nhánh (if - else)',
        status: 'Chưa học',
        progress: 0,
        readTime: '7 phút',
        summary: 'Kiểu dữ liệu bool, phép so sánh, thụt lề (indentation) và câu lệnh if, if-else, if-elif-else.',
        theory: [
          {
            heading: '1. Cú pháp rẽ nhánh trong Python',
            text: 'Python sử dụng thụt đầu dòng (indentation - thường là 4 dấu cách) để xác định khối lệnh:',
            code: `if diem >= 8.0:
    print("Học lực giỏi")
elif diem >= 6.5:
    print("Học lực khá")
else:
    print("Cần cố gắng thêm")`
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-03',
            question: 'Đoạn mã sau in ra kết quả gì?\n```python\nx = 10\nif x % 2 == 0:\n    print("Chan")\nelse:\n    print("Le")\n```',
            questionMath: 'x = 10 \\implies x \\pmod 2 == 0?',
            options: [
              { id: 'A', text: 'Chan', isCorrect: true },
              { id: 'B', text: 'Le', isCorrect: false },
              { id: 'C', text: 'Báo lỗi cú pháp', isCorrect: false },
              { id: 'D', text: 'Không in gì', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Toán tử % chia lấy phần dư: 10 % 2 = 0. Biểu thức điều kiện 0 == 0 là True, nên khối lệnh if được thực thi và in "Chan".',
            misconception: 'Nhầm toán tử % (chia dư) với toán tử / (chia thực) hoặc // (chia nguyên).'
          }
        ]
      },
      {
        id: 'cs10-04',
        title: 'Lập trình Python: Cấu trúc lặp & Danh sách (list)',
        status: 'Chưa học',
        progress: 0,
        readTime: '8 phút',
        summary: 'Vòng lặp for với range(), vòng lặp while, các thao tác cơ bản trên list (append, len, chỉ số).',
        theory: [
          {
            heading: '1. Vòng lặp for và hàm range()',
            text: 'range(start, stop, step) sinh dãy số từ start đến stop - 1 với bước nhảy step:',
            code: `for i in range(1, 5):
    print(i) # In ra: 1, 2, 3, 4`
          }
        ],
        exercises: [
          {
            id: 'ex-cs10-04',
            question: 'Kết quả của `len([10, 20, 30, 40])` trong Python là:',
            questionMath: 'a = [10, 20, 30, 40] \\implies \\text{len}(a) = ?',
            options: [
              { id: 'A', text: '4', isCorrect: true },
              { id: 'B', text: '3', isCorrect: false },
              { id: 'C', text: '40', isCorrect: false },
              { id: 'D', text: '[10, 20, 30, 40]', isCorrect: false }
            ],
            correctAnswer: 'A',
            explanation: 'Hàm len() trả về số lượng phần tử trong danh sách. Danh sách có 4 phần tử nên len trả về 4. (Chỉ số phần tử chạy từ 0 đến 3).',
            misconception: 'Nhầm giữa số lượng phần tử (4) với chỉ số phần tử cuối cùng (index = 3).'
          }
        ]
      }
    ]
  }
];
