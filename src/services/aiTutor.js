/**
 * Studywme AI Tutor Client Service
 * Calls /api/chat with auto-retry support and displays friendly messages.
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

    // If server responded with JSON
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.text) {
        return {
          success: data.success !== false,
          text: data.text,
          modelUsed: data.modelUsed || 'gemini-3.8-flash',
          isError: data.success === false
        };
      }
    }

    // If server responded with status error
    if (!res.ok) {
      if (res.status === 503 || res.status === 429) {
        return {
          success: false,
          isError: true,
          text: 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!'
        };
      }
    }
  } catch (err) {
    console.error('Fetch /api/chat network error:', err);

    // Fallback: If client-side VITE_GEMINI_API_KEY is embedded in browser bundle
    const clientKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
    if (clientKey) {
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
          contents.push({ role: 'user', parts: [{ text: contextPrefix || 'Xin chào gia sư' }] });
        }

        // Try primary model then fallback
        const models = ['gemini-3.8-flash', 'gemini-3.8-flash-lite', 'gemini-2.0-flash'];
        for (const m of models) {
          try {
            const directRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${clientKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents,
                  generationConfig: { temperature: 0.35, maxOutputTokens: 1000 }
                })
              }
            );

            const directData = await directRes.json().catch(() => ({}));
            if (directRes.ok) {
              const directReply = directData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (directReply) {
                return {
                  success: true,
                  text: directReply,
                  modelUsed: `${m} (direct)`
                };
              }
            }
          } catch {
            // try next model
          }
        }
      } catch (directErr) {
        console.error('Direct Gemini error:', directErr);
      }
    }

    return {
      success: false,
      isError: true,
      text: 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!'
    };
  }

  return {
    success: false,
    isError: true,
    text: 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!'
  };
}
