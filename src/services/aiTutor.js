/**
 * Studywme AI Tutor Service
 * Dual-layer Architecture:
 * 1. Calls /api/chat (Vercel Serverless Function)
 * 2. Fallbacks to direct client-side call if VITE_GEMINI_API_KEY is available
 * 3. Fallbacks to instant Socratic pedagogical analysis
 */

export async function sendChatMessageToTutor({ messages, contextData = null }) {
  // 1. Try backend serverless endpoint
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
      if (data && data.text) {
        return {
          success: true,
          text: data.text,
          modelUsed: data.modelUsed || 'gemini-2.5-flash'
        };
      }
    }
  } catch (err) {
    console.warn('Backend /api/chat unreachable, attempting direct client fallback:', err);
  }

  // 2. Direct client fallback if client-side VITE key exists
  const clientKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (clientKey && clientKey.trim()) {
    try {
      let contextPrefix = '';
      if (contextData) {
        contextPrefix = `[Ngữ cảnh câu hỏi Lớp 10]:
- Môn học: ${contextData.subject || 'Lớp 10'}
- Bài học: ${contextData.lesson || ''}
- Đề bài: "${contextData.question || ''}"
- Học sinh vừa chọn sai: "${contextData.userWrongAnswer || ''}"
- Đáp án đúng: "${contextData.correctAnswer || ''}"
---
`;
      }

      const contents = (messages || [])
        .filter((m) => m && m.text && m.text.trim())
        .map((msg, idx) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: idx === 0 && contextPrefix ? `${contextPrefix}\n${msg.text}` : msg.text }]
        }));

      if (contents.length === 0) {
        contents.push({ role: 'user', parts: [{ text: contextPrefix || 'Xin chào' }] });
      }

      const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const model of models) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${clientKey.trim()}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{
                    text: 'Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam). Giải thích ngắn gọn, súc tích, phân tích vì sao học sinh chọn sai và hướng dẫn bản chất logic.'
                  }]
                },
                contents,
                generationConfig: { temperature: 0.35, maxOutputTokens: 800 }
              })
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return { success: true, text, modelUsed: model };
            }
          }
        } catch (e) {
          console.warn(`Direct model ${model} error:`, e);
        }
      }
    } catch (directErr) {
      console.warn('Direct Gemini call failed:', directErr);
    }
  }

  // 3. Instant Socratic pedagogical explanation engine
  await new Promise((r) => setTimeout(r, 300));
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
