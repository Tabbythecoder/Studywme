/**
 * Studywme AI Tutor Service
 * 
 * BYOK Architecture (Bring Your Own Key):
 * - Key priority: localStorage('studywme_gemini_key') -> import.meta.env.VITE_GEMINI_API_KEY
 * - Model: gemini-2.5-flash (with fallback to gemini-1.5-flash if needed)
 * - Persona: Gia sư chuẩn kiến thức Lớp 10 (Chương trình GDPT 2018), sư phạm tinh gọn,
 *   tập trung chỉ ra bản chất tại sao học sinh chọn sai và hướng dẫn cách tư duy đúng.
 */

export const STORAGE_KEY_GEMINI = 'studywme_gemini_key';

export function getSavedGeminiKey() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_GEMINI) || import.meta.env.VITE_GEMINI_API_KEY || '';
}

export function saveGeminiKey(key) {
  if (typeof window === 'undefined') return;
  if (key && key.trim()) {
    localStorage.setItem(STORAGE_KEY_GEMINI, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_GEMINI);
  }
}

/**
 * Call Gemini API with conversational context
 * @param {Array<{role: 'user' | 'model', text: string}>} history
 * @param {Object} contextData { subject, lesson, question, userWrongAnswer, correctAnswer }
 */
export async function sendChatMessageToTutor({ messages, contextData = null }) {
  const apiKey = getSavedGeminiKey();

  const systemInstruction = `Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam).
Nguyên tắc sư phạm:
- Ngắn gọn, súc tích, chuẩn ngôn ngữ khoa học.
- Tuyệt đối không đưa ngay đáp án cuối nếu học sinh đang hỏi gợi ý, hãy phân tích vì sao phương án học sinh chọn lại chưa chính xác (misconception).
- Sử dụng công thức LaTeX dạng $...$ cho công thức toán/lý/hóa ngắn, hoặc $$...$$ cho công thức khối.
- Giọng văn đồng hành, nghiêm túc, tập trung vào bản chất logic.`;

  if (apiKey) {
    try {
      // Build conversation contents for Gemini API
      const contents = [];

      // If context provided, prepend system context as initial turn or inject into first prompt
      let contextPrefix = '';
      if (contextData) {
        contextPrefix = `[Ngữ cảnh học tập lớp 10]:
- Môn học: ${contextData.subject || 'Lớp 10'}
- Bài học: ${contextData.lesson || ''}
- Đề bài câu hỏi: "${contextData.question || ''}"
- Học sinh vừa chọn sai đáp án: "${contextData.userWrongAnswer || ''}"
- Đáp án chính xác là: "${contextData.correctAnswer || ''}"
---
`;
      }

      // Map messages array to Gemini format
      messages.forEach((msg, idx) => {
        let text = msg.text;
        if (idx === 0 && contextPrefix) {
          text = `${contextPrefix}\n${text}`;
        }
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text }]
        });
      });

      // Try gemini-2.5-flash first as requested, fallback to gemini-1.5-flash
      const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: systemInstruction }]
                },
                contents,
                generationConfig: {
                  temperature: 0.35,
                  maxOutputTokens: 800
                }
              })
            }
          );

          if (!res.ok) {
            const errJson = await res.json().catch(() => ({}));
            throw new Error(errJson.error?.message || `HTTP ${res.status}`);
          }

          const data = await res.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return {
              success: true,
              text: replyText,
              modelUsed: model
            };
          }
        } catch (err) {
          lastError = err;
          console.warn(`Lỗi gọi model ${model}:`, err.message);
        }
      }

      throw lastError || new Error('Không nhận được phản hồi từ Gemini API');
    } catch (apiError) {
      console.warn('Fallback to local pedagogical engine:', apiError);
      return {
        success: false,
        error: apiError.message,
        text: getLocalPedagogicalFallback(contextData, messages[messages.length - 1]?.text)
      };
    }
  }

  // Fallback if no API key is provided yet
  await new Promise((r) => setTimeout(r, 350));
  return {
    success: true,
    isLocalFallback: true,
    text: getLocalPedagogicalFallback(contextData, messages[messages.length - 1]?.text)
  };
}

function getLocalPedagogicalFallback(context, lastUserMsg = '') {
  if (context && context.userWrongAnswer) {
    return `### Phân tích lỗi sai:
Bạn vừa chọn phương án **${context.userWrongAnswer}**, trong khi đáp án chính xác là **${context.correctAnswer}**.

**1. Điểm nhầm lẫn phổ biến:**
Học sinh lớp 10 thường gặp bẫy ở bước xác định điều kiện biên hoặc định lý tương ứng. 

**2. Bản chất lý thuyết:**
${context.explanation || 'Hãy kiểm tra lại mối liên hệ giữa các đại lượng trong công thức và chú ý điều kiện áp dụng.'}

**3. Hướng khắc phục:**
Xem lại công thức chuẩn của bài học và thử tính toán lại theo từng bước. Nếu bạn muốn giải thích sâu hơn, bạn có thể gõ câu hỏi tiếp theo ở bên dưới hoặc gắn Gemini API Key của bạn tại nút ⚙ ở trên nhé!`;
  }

  return `Chào bạn, mình là Trợ giảng AI cho chương trình Lớp 10.
Mình có thể giúp bạn giải đáp các vấn đề về:
- **Toán 10:** Tập hợp, Bất phương trình, Vectơ, Lượng giác trong tam giác.
- **Vật lí 10:** Động học, 3 định luật Newton, Công & Năng lượng.
- **Hóa học 10:** Cấu tạo nguyên tử, Bảng tuần hoàn, Oxi hóa - khử.
- **Tin học 10:** Mã hóa nhị phân, Lập trình Python cơ bản.

*Mẹo: Bạn có thể nhập Gemini API Key của bạn tại nút ⚙ góc trên để kích hoạt mô hình gemini-2.5-flash trực tiếp.*`;
}
