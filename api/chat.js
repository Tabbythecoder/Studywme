/**
 * Vercel Serverless Function: /api/chat
 * 100% compatible with Vercel Node runtime for Vite projects.
 */

function sendResponse(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendResponse(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    // Robust body parsing (handles both pre-parsed body and raw stream)
    let body = req.body;
    if (!body || typeof body !== 'object') {
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      } else {
        body = await new Promise((resolve) => {
          let chunks = '';
          req.on('data', (chunk) => { chunks += chunk; });
          req.on('end', () => {
            try { resolve(JSON.parse(chunks || '{}')); } catch { resolve({}); }
          });
          req.on('error', () => resolve({}));
        });
      }
    }

    const { messages = [], contextData = null } = body || {};
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    const systemInstruction = `Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam).
Nguyên tắc sư phạm:
- Ngắn gọn, súc tích, chuẩn ngôn ngữ khoa học.
- Khi học sinh làm sai, hãy phân tích vì sao phương án học sinh chọn lại chưa chính xác (misconception) và hướng dẫn bản chất logic để hiểu câu đúng.
- Sử dụng công thức LaTeX $...$ cho công thức ngắn và $$...$$ cho công thức khối.
- Giọng văn đồng hành, nghiêm túc, tập trung vào bản chất logic.`;

    // If Gemini API Key is configured on Vercel
    if (apiKey && apiKey.trim()) {
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

      // Build valid Gemini contents array
      const contents = [];
      const validMessages = messages.filter((m) => m && m.text && m.text.trim());

      if (validMessages.length === 0) {
        contents.push({
          role: 'user',
          parts: [{ text: contextPrefix || 'Xin chào gia sư' }]
        });
      } else {
        validMessages.forEach((msg, idx) => {
          let text = msg.text.trim();
          if (idx === 0 && contextPrefix) {
            text = `${contextPrefix}\n${text}`;
          }
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text }]
          });
        });
      }

      // Priority list of models: try gemini-2.5-flash, fallback to 2.0-flash, then 1.5-flash
      const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const model of modelsToTry) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
          const geminiRes = await fetch(endpoint, {
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
          });

          const resData = await geminiRes.json().catch(() => ({}));
          if (geminiRes.ok) {
            const reply = resData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              return sendResponse(res, 200, {
                success: true,
                text: reply,
                modelUsed: model
              });
            }
          } else {
            console.warn(`Gemini (${model}) returned status ${geminiRes.status}:`, resData.error?.message);
          }
        } catch (fetchErr) {
          console.warn(`Error calling model ${model}:`, fetchErr.message);
        }
      }
    }

    // Default pedagogical fallback (when no key or upstream limit reached)
    const fallbackText = getPedagogicalExplanation(contextData);
    return sendResponse(res, 200, {
      success: true,
      text: fallbackText,
      modelUsed: 'studywme-tutor'
    });
  } catch (error) {
    console.error('API Chat Exception:', error);
    return sendResponse(res, 200, {
      success: true,
      text: getPedagogicalExplanation(null),
      error: error.message
    });
  }
}

function getPedagogicalExplanation(context) {
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
