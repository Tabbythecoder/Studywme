import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Local dev middleware for /api/chat
function devApiChatPlugin() {
  return {
    name: 'dev-api-chat',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

            if (apiKey) {
              const { messages = [], contextData = null } = parsed;
              const systemInstruction = `Bạn là Trợ giảng AI cho học sinh Lớp 10 (Chương trình GDPT 2018 Việt Nam).
Nguyên tắc sư phạm:
- Ngắn gọn, súc tích, chuẩn ngôn ngữ khoa học.
- Khi học sinh làm sai, phân tích vì sao phương án học sinh chọn lại chưa chính xác và hướng dẫn bản chất logic câu đúng.
- Sử dụng công thức LaTeX $...$ cho công thức ngắn và $$...$$ cho công thức khối.`;

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

              const contents = messages.map((msg, idx) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: idx === 0 && contextPrefix ? `${contextPrefix}\n${msg.text}` : msg.text }]
              }));

              const geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                    contents,
                    generationConfig: { temperature: 0.35, maxOutputTokens: 800 }
                  })
                }
              );

              if (geminiRes.ok) {
                const data = await geminiRes.json();
                const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (reply) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, text: reply, modelUsed: 'gemini-2.5-flash' }));
                  return;
                }
              }
            }

            // Fallback response
            res.setHeader('Content-Type', 'application/json');
            const context = parsed.contextData;
            const reply = context && context.userWrongAnswer
              ? `### Phân tích lỗi sai:
Bạn vừa chọn phương án **${context.userWrongAnswer}**, trong khi đáp án chính xác là **${context.correctAnswer}**.

**1. Điểm nhầm lẫn phổ biến:**
Học sinh lớp 10 thường gặp bẫy ở bước xác định điều kiện biên hoặc chưa chú ý điều kiện áp dụng định lý.

**2. Bản chất lý thuyết:**
${context.explanation || 'Hãy kiểm tra lại mối liên hệ giữa các đại lượng trong công thức và chú ý điều kiện áp dụng.'}

**3. Lời khuyên:**
Xem lại công thức chuẩn của bài học và thử tính toán lại từng bước nhé. Bạn có thể hỏi thêm bất kỳ điểm nào chưa rõ ở bên dưới!`
              : `Chào bạn, mình là Trợ giảng AI cho chương trình Lớp 10 (GDPT 2018). Bạn có thể hỏi mình bất kỳ thắc mắc nào về Toán, Lí, Hóa, Tin 10 nhé!`;

            res.end(JSON.stringify({ success: true, text: reply }));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: e.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devApiChatPlugin()
  ],
  server: {
    port: 5173,
    host: true
  }
})
