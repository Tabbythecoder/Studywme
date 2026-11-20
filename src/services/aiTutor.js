/**
 * AI Tutor Service (Gemini Ready)
 * 
 * Hướng dẫn tích hợp Gemini API Key:
 * 1. Tạo file `.env` tại thư mục gốc dự án:
 *    VITE_GEMINI_API_KEY=your_gemini_api_key_here
 * 2. Hàm askAITutor() sẽ tự động ưu tiên gọi Google Gemini API nếu có key.
 *    Nếu chưa có key, hệ thống sẽ sử dụng dữ liệu phản hồi mẫu chuẩn sư phạm.
 */

export async function askAITutor({ questionId, questionTitle, context, customKey = null }) {
  const apiKey = customKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Bạn là trợ giảng cá nhân theo phong cách tư duy phản biện và sư phạm tinh gọn (Socratic method).
Nội dung bài học: ${context || 'Kiến thức phổ thông / Đại học'}
Câu hỏi của học viên: "${questionTitle}"

Hãy đưa ra hướng dẫn theo 3 bước:
1. Gợi ý bản chất vấn đề (không giải ngay kết quả cuối).
2. Công thức hoặc định luật then chốt cần áp dụng.
3. Bước biến đổi quan trọng nhất.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 600,
            }
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return {
          success: true,
          source: 'gemini-live',
          content: data.candidates[0].content.parts[0].text
        };
      }
    } catch (err) {
      console.warn('Lỗi kết nối Gemini API, chuyển sang dữ liệu mẫu dự phòng:', err);
    }
  }

  // Dữ liệu gợi ý mẫu sư phạm chuẩn hóa (fallback khi chưa nhập Gemini Key)
  await new Promise((resolve) => setTimeout(resolve, 450));

  const sampleHints = {
    'q-calc-1': `**Gợi ý tư duy:**
1. **Bản chất:** Ta đang tìm nguyên hàm của tích hai hàm số khác loại: $x$ (hàm đa thức) và $e^{2x}$ (hàm mũ).
2. **Phương pháp:** Áp dụng phương pháp nguyên hàm từng phần $\\int u \\, dv = uv - \\int v \\, du$.
3. **Thứ tự ưu tiên đặt $u$:** "Nhất log, nhì đa, tam lượng, tứ mũ". Do đó hãy đặt $u = x$ và $dv = e^{2x}dx$.
4. **Lưu ý dấu hệ số:** Khi tính $v = \\int e^{2x}dx$, đừng quên chia cho hệ số góc là $2$ ($v = \\frac{1}{2}e^{2x}$).`,

    'q-phys-1': `**Gợi ý tư duy:**
1. **Bản chất:** Con lắc đơn dao động điều hòa trong trọng trường. Chu kỳ $T$ phụ thuộc vào chiều dài dây treo $l$ và gia tốc trọng trường $g$.
2. **Công thức then chốt:** $T = 2\\pi \\sqrt{\\frac{l}{g}}$.
3. **Phân tích tỉ lệ:** Nhận thấy $T$ tỉ lệ thuận với $\\sqrt{l}$. Khi chiều dài tăng gấp 4 lần ($l' = 4l$), giá trị $\\sqrt{l'}$ sẽ tăng gấp $\\sqrt{4} = 2$ lần.`,

    'q-chem-1': `**Gợi ý tư duy:**
1. **Nguyên lý Le Chatelier:** Một hệ cân bằng bị thay đổi một yếu tố (áp suất, nhiệt độ, nồng độ) thì cân bằng sẽ dịch chuyển theo chiều chống lại sự thay đổi đó.
2. **Tác động áp suất:** Chỉ ảnh hưởng khi tổng số mol khí trước và sau phản ứng có sự chênh lệch ($\Delta n_{khí} \\neq 0$).`
  };

  return {
    success: true,
    source: 'sample-tutor',
    content: sampleHints[questionId] || `**Hướng dẫn giải gợi mở:**
1. Đọc kỹ giả thiết và xác định rõ đại lượng cần tìm.
2. Liên hệ công thức định nghĩa trực tiếp liên quan đến đại lượng đó.
3. Kiểm tra tính đồng nhất của đơn vị trước khi tính toán.`
  };
}
