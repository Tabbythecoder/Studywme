/**
 * Studywme AI Tutor Client Service
 * Calls /api/chat and surfaces exact API errors directly to the user.
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
          modelUsed: data.modelUsed || 'gemini-2.5-flash',
          isError: data.success === false
        };
      }
    }

    // If server responded with non-JSON or status error
    if (!res.ok) {
      const rawText = await res.text();
      return {
        success: false,
        isError: true,
        text: `⚠️ **Lỗi kết nối Serverless /api/chat (HTTP ${res.status}):**\n\`\`\`\n${rawText.slice(0, 500)}\n\`\`\`\n\nVui lòng kiểm tra lại thiết lập Vercel Serverless Function.`
      };
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

        const directRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${clientKey}`,
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
              modelUsed: 'gemini-2.5-flash (client)'
            };
          }
        } else {
          return {
            success: false,
            isError: true,
            text: `⚠️ **Lỗi từ Google Gemini API (Client direct - HTTP ${directRes.status}):**\n\`\`\`json\n${JSON.stringify(directData.error || directData, null, 2)}\n\`\`\``
          };
        }
      } catch (directErr) {
        return {
          success: false,
          isError: true,
          text: `⚠️ **Không thể kết nối đến Google Gemini API:** ${directErr.message}`
        };
      }
    }

    return {
      success: false,
      isError: true,
      text: `⚠️ **Lỗi mạng khi kết nối /api/chat:** ${err.message}`
    };
  }

  return {
    success: false,
    isError: true,
    text: '⚠️ Không nhận được phản hồi hợp lệ từ server.'
  };
}
