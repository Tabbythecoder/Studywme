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
    const apiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '').trim();

    // Check if API key is present
    if (!apiKey) {
      return sendResponse(res, 200, {
        success: false,
        error: 'MISSING_API_KEY',
        text: `⚠️ **Chưa tìm thấy Gemini API Key trên Vercel!**

Hệ thống đã kiểm tra cả \`process.env.GEMINI_API_KEY\` lẫn \`process.env.VITE_GEMINI_API_KEY\` nhưng giá trị hiện đang rỗng.

**Cách khắc phục:**
1. Truy cập **Vercel Dashboard** > Chọn dự án **Studywme**.
2. Vào **Settings** > **Environment Variables**.
3. Thêm biến \`GEMINI_API_KEY\` với giá trị là API Key lấy từ **Google AI Studio**.
4. Chọn Redeploy lại dự án để Vercel nạp biến môi trường mới.`
      });
    }

    const systemInstruction = `Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam).
Nguyên tắc sư phạm:
- Ngắn gọn, súc tích, chuẩn ngôn ngữ khoa học.
- Khi học sinh làm sai, hãy phân tích vì sao phương án học sinh chọn lại chưa chính xác (misconception) và hướng dẫn bản chất logic để hiểu câu đúng.
- Sử dụng công thức LaTeX $...$ cho công thức ngắn và $$...$$ cho công thức khối.
- Giọng văn đồng hành, nghiêm túc, tập trung vào bản chất logic.`;

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
        parts: [{ text: contextPrefix || 'Xin chào gia sư Lớp 10' }]
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

    // Target Google Gemini 2.5 Flash
    const model = 'gemini-2.5-flash';
    let lastErrorDetails = null;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
            maxOutputTokens: 1000
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
        lastErrorDetails = {
          model,
          status: geminiRes.status,
          error: resData.error || resData
        };
        console.error(`Google API Error with ${model}:`, geminiRes.status, resData);
      }
    } catch (err) {
      lastErrorDetails = {
        model,
        status: 500,
        error: { message: err.message }
      };
      console.error(`Fetch exception for ${model}:`, err);
    }

    // Return the EXACT error message from Google API to the frontend
    const errObj = lastErrorDetails?.error || {};
    const errMsg = errObj.message || JSON.stringify(errObj);
    const errStatus = lastErrorDetails?.status || 500;
    const errModel = lastErrorDetails?.model || 'gemini-2.5-flash';

    return sendResponse(res, 200, {
      success: false,
      error: `Google Gemini API Error (${errStatus})`,
      text: `⚠️ **Thông báo lỗi từ Google Gemini API (Model: \`${errModel}\` - HTTP ${errStatus}):**

\`\`\`json
${JSON.stringify(errObj, null, 2)}
\`\`\`

**Chi tiết:** ${errMsg}

*Gợi ý kiểm tra: Hãy đảm bảo API Key đã được cấp quyền Generative Language API trên Google AI Studio và không bị giới hạn IP/HTTP referrer.*`
    });

  } catch (globalErr) {
    console.error('Serverless Handler Crash:', globalErr);
    return sendResponse(res, 500, {
      success: false,
      error: globalErr.message,
      text: `⚠️ **Lỗi thực thi Serverless Function:**\n\`\`\`\n${globalErr.message}\n\`\`\``
    });
  }
}
