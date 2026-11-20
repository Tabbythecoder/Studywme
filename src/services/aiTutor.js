/**
 * Studywme AI Tutor Service
 * Calls backend serverless endpoint /api/chat directly (Gemini 2.5 Flash on Vercel).
 * No user API key input required.
 */

export async function sendChatMessageToTutor({ messages, contextData = null }) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        contextData
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text) {
        return {
          success: true,
          text: data.text,
          modelUsed: data.modelUsed || 'gemini-2.5-flash'
        };
      }
    }
  } catch (err) {
    console.warn('Lỗi gọi /api/chat:', err);
  }

  // Graceful pedagogical fallback
  await new Promise((r) => setTimeout(r, 350));
  return {
    success: true,
    text: getLocalPedagogicalFallback(contextData)
  };
}

function getLocalPedagogicalFallback(context) {
  if (context && context.userWrongAnswer) {
    return `### Phân tích lỗi sai:
Bạn vừa chọn phương án **${context.userWrongAnswer}**, trong khi đáp án chính xác là **${context.correctAnswer}**.

**1. Điểm nhầm lẫn phổ biến:**
Học sinh lớp 10 thường gặp bẫy ở bước xác định điều kiện biên hoặc chưa chú ý điều kiện áp dụng định lý.

**2. Bản chất lý thuyết:**
${context.explanation || 'Hãy kiểm tra lại mối liên hệ giữa các đại lượng trong công thức và chú ý điều kiện áp dụng.'}

**3. Hướng khắc phục:**
Xem lại công thức chuẩn của bài học và thử tính toán lại theo từng bước. Bạn có thể đặt câu hỏi tiếp theo ở bên dưới nhé!`;
  }

  return `Chào bạn, mình là Trợ giảng AI cho chương trình Lớp 10 (GDPT 2018).
Mình có thể giúp bạn giải đáp các vấn đề về:
- **Toán 10:** Tập hợp, Bất phương trình, Vectơ, Lượng giác trong tam giác.
- **Vật lí 10:** Động học, 3 định luật Newton, Công & Năng lượng.
- **Hóa học 10:** Cấu tạo nguyên tử, Bảng tuần hoàn, Oxi hóa - khử.
- **Tin học 10:** Mã hóa nhị phân, Lập trình Python cơ bản.`;
}
