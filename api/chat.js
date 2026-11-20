/**
 * Vercel Serverless Function: /api/chat
 * Handles Gemini 2.5 Flash chat requests securely without exposing API keys to the client.
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages = [], contextData = null } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    const systemInstruction = `Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam).
Nguyên tắc sư phạm:
- Ngắn gọn, súc tích, chuẩn ngôn ngữ khoa học.
- Khi học sinh làm sai, hãy phân tích vì sao phương án học sinh chọn lại chưa chính xác (misconception) và hướng dẫn bản chất logic để hiểu câu đúng.
- Sử dụng công thức LaTeX $...$ cho công thức ngắn và $$...$$ cho công thức khối.
- Giọng văn đồng hành, nghiêm túc, tập trung vào bản chất logic.`;

    // If API key is configured on server (Vercel)
    if (apiKey) {
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

      const contents = messages.map((msg, idx) => {
        let text = msg.text;
        if (idx === 0 && contextPrefix) {
          text = `${contextPrefix}\n${text}`;
        }
        return {
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text }]
        };
      });

      // Call Google Gemini API (gemini-2.5-flash or gemini-1.5-flash)
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      for (const model of models) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemInstruction }] },
                contents,
                generationConfig: {
                  temperature: 0.35,
                  maxOutputTokens: 800
                }
              })
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              return res.status(200).json({ success: true, text: reply, modelUsed: model });
            }
          }
        } catch (mErr) {
          console.warn(`Model ${model} error:`, mErr);
        }
      }
    }

    // Pedagogical fallback when server API key is not yet set
    return res.status(200).json({
      success: true,
      text: getFallbackResponse(contextData, messages[messages.length - 1]?.text)
    });
  } catch (error) {
    console.error('API Chat Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      text: getFallbackResponse(req.body?.contextData)
    });
  }
}

function getFallbackResponse(context) {
  if (context && context.userWrongAnswer) {
    return `### Phân tích lỗi sai:
Bạn vừa chọn phương án **${context.userWrongAnswer}**, trong khi đáp án chính xác là **${context.correctAnswer}**.

**1. Điểm nhầm lẫn phổ biến:**
Học sinh lớp 10 thường gặp bẫy ở bước xác định điều kiện biên hoặc chưa chú ý điều kiện áp dụng định lý.

**2. Bản chất lý thuyết:**
${context.explanation || 'Hãy kiểm tra lại mối liên hệ giữa các đại lượng trong công thức và chú ý điều kiện áp dụng.'}

**3. Lời khuyên:**
Xem lại công thức chuẩn của bài học và thử tính toán lại từng bước nhé. Bạn có thể hỏi thêm bất kỳ điểm nào chưa rõ ở bên dưới!`;
  }

  return `Chào bạn, mình là Trợ giảng AI cho chương trình Lớp 10 (GDPT 2018).
Mình có thể giúp bạn giải đáp các vấn đề về:
- **Toán 10:** Tập hợp, Bất phương trình, Vectơ, Lượng giác trong tam giác.
- **Vật lí 10:** Động học, 3 định luật Newton, Công & Năng lượng.
- **Hóa học 10:** Cấu tạo nguyên tử, Bảng tuần hoàn, Oxi hóa - khử.
- **Tin học 10:** Mã hóa nhị phân, Lập trình Python cơ bản.`;
}
