/**
 * Vercel Serverless Function: /api/chat
 * Ultra-fast streaming response with Server-Sent Events (SSE).
 * Low latency (<2s) with Google Gemini :streamGenerateContent?alt=sse.
 * Auto-retry (500ms max 1 retry) and instant fallback to gemini-3.8-flash-lite / gemini-2.0-flash.
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  // Set SSE response headers early if method is POST
  const sendSSEError = (statusCode, text) => {
    if (!res.headersSent) {
      res.writeHead(statusCode, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
    }
    res.write(`data: ${JSON.stringify({ error: true, text })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  };

  try {
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

    if (!apiKey) {
      return sendSSEError(
        200,
        `⚠️ **Chưa tìm thấy Gemini API Key trên Vercel!**\nVui lòng cấu hình biến \`GEMINI_API_KEY\` trên Vercel Dashboard rồi Redeploy.`
      );
    }

    // Optimized concise system prompt: 3-5 short sentences, no fluff, direct pedagogical feedback
    const systemInstruction = `Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam).
Quy tắc sư phạm:
- Trả lời cực kỳ súc tích, ngắn gọn trong 3 đến 5 câu.
- Chỉ rõ ngay bản chất sai lầm (misconception) trong phương án học sinh chọn và giải thích ngắn gọn logic đáp án đúng.
- Sử dụng công thức LaTeX $...$ khi cần công thức.
- Giọng văn đồng hành, tích cực, tuyệt đối không dài dòng.`;

    let contextPrefix = '';
    if (contextData) {
      contextPrefix = `[Ngữ cảnh câu hỏi Lớp 10]:
- Môn học: ${contextData.subject || 'Lớp 10'}
- Bài học: ${contextData.lesson || ''}
- Đề bài: "${contextData.question || ''}"
- Học sinh chọn sai: "${contextData.userWrongAnswer || ''}"
- Đáp án đúng: "${contextData.correctAnswer || ''}"
---
`;
    }

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
        temperature: 0.3,
        maxOutputTokens: 600
      }
    };

    // Candidate models in priority order
    const candidateModels = [
      'gemini-3.8-flash',
      'gemini-3.8-flash-lite',
      'gemini-2.0-flash'
    ];

    let activeStreamResponse = null;
    let chosenModel = null;

    for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
      const currentModel = candidateModels[mIdx];
      const isPrimary = (mIdx === 0);
      const maxAttempts = isPrimary ? 2 : 1; // 1 retry max (500ms) for primary, 1 attempt for fallback

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:streamGenerateContent?alt=sse&key=${apiKey}`;
          const streamRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiPayload)
          });

          if (streamRes.ok && streamRes.body) {
            activeStreamResponse = streamRes;
            chosenModel = currentModel;
            break;
          }

          const isOverloaded = streamRes.status === 503 || streamRes.status === 429;
          if (isOverloaded && attempt < maxAttempts) {
            await sleep(500); // Fast 500ms retry to stay under Vercel 10s timeout
            continue;
          }

          // If not 200 and not retrying, switch to next fallback model
          break;
        } catch (fetchErr) {
          console.error(`Error connecting to ${currentModel}:`, fetchErr.message);
          if (attempt < maxAttempts) {
            await sleep(500);
          }
        }
      }

      if (activeStreamResponse) break;
    }

    if (!activeStreamResponse || !activeStreamResponse.body) {
      return sendSSEError(200, 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!');
    }

    // Begin SSE Streaming to client
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // Notify client of model used
    res.write(`data: ${JSON.stringify({ model: chosenModel })}\n\n`);

    const reader = activeStreamResponse.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep partial line

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data:')) {
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const chunkText = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (chunkText) {
              res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
            }
          } catch {
            // ignore partial JSON chunks
          }
        }
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

  } catch (globalErr) {
    console.error('Serverless Crash:', globalErr);
    return sendSSEError(200, 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!');
  }
}
