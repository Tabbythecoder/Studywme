/**
 * Vercel Serverless Function: /api/chat
 * 100% compatible with Vercel Node runtime for Vite projects.
 * Supports auto-retry on HTTP 503/429 and fallback model cascade.
 */

function sendResponse(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGeminiModel(model, apiKey, payload) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  return {
    ok: response.ok,
    status: response.status,
    data
  };
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

Vui lòng cấu hình biến \`GEMINI_API_KEY\` trên Vercel Dashboard (Settings > Environment Variables) và Redeploy lại dự án.`
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

    const geminiPayload = {
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      contents,
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 1000
      }
    };

    // Candidate models in priority order
    // Primary: gemini-3.8-flash
    // Fallbacks: gemini-3.8-flash-lite, gemini-2.0-flash
    const candidateModels = [
      'gemini-3.8-flash',
      'gemini-3.8-flash-lite',
      'gemini-2.0-flash'
    ];

    let successfulReply = null;
    let successfulModel = null;
    let lastStatus = 0;
    let lastErrorObj = null;

    for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
      const currentModel = candidateModels[mIdx];
      const isPrimary = (mIdx === 0);
      // Primary model: retry up to 2 times on 503/429 (total 3 attempts) with 1.5s delay
      // Fallback models: retry once on 503/429 (total 2 attempts) with 1.5s delay
      const maxAttempts = isPrimary ? 3 : 2;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const response = await callGeminiModel(currentModel, apiKey, geminiPayload);
          lastStatus = response.status;
          lastErrorObj = response.data?.error || response.data;

          if (response.ok) {
            const replyText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (replyText) {
              successfulReply = replyText;
              successfulModel = currentModel;
              break;
            }
          }

          // Check if error is temporary overload (503 Service Unavailable / High demand or 429 Too Many Requests)
          const isOverloaded = response.status === 503 || response.status === 429;

          if (isOverloaded && attempt < maxAttempts) {
            console.warn(`[${currentModel}] Attempt ${attempt} received HTTP ${response.status}. Waiting 1.5s before retry...`);
            await sleep(1500);
            continue;
          }

          // If not an overload (e.g. 404 model not found or permanent error), move to next fallback model immediately
          if (!isOverloaded) {
            break;
          }
        } catch (fetchErr) {
          console.error(`[${currentModel}] Attempt ${attempt} network error:`, fetchErr);
          lastStatus = 500;
          lastErrorObj = { message: fetchErr.message };
          if (attempt < maxAttempts) {
            await sleep(1500);
          }
        }
      }

      if (successfulReply) {
        break; // Successfully answered!
      }
    }

    if (successfulReply) {
      return sendResponse(res, 200, {
        success: true,
        text: successfulReply,
        modelUsed: successfulModel
      });
    }

    // If all models failed:
    const isOverloaded = lastStatus === 503 || lastStatus === 429;
    if (isOverloaded) {
      return sendResponse(res, 200, {
        success: false,
        error: 'SERVER_OVERLOADED',
        text: 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!'
      });
    }

    // Specific friendly message for invalid key
    const errMsg = (lastErrorObj?.message || '').toLowerCase();
    if (lastStatus === 400 && errMsg.includes('api key') || lastStatus === 403) {
      return sendResponse(res, 200, {
        success: false,
        error: 'API_KEY_INVALID',
        text: '⚠️ Khóa Google Gemini API Key chưa chính xác hoặc chưa được cấp quyền. Bạn vui lòng kiểm tra lại trên Vercel Settings nhé.'
      });
    }

    // Default friendly message
    return sendResponse(res, 200, {
      success: false,
      error: 'SERVER_BUSY',
      text: 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!'
    });

  } catch (globalErr) {
    console.error('Serverless Handler Crash:', globalErr);
    return sendResponse(res, 200, {
      success: false,
      error: 'SERVER_BUSY',
      text: 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!'
    });
  }
}
