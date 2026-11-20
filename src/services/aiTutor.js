/**
 * Studywme AI Tutor Client Service
 * High-speed Streaming with Server-Sent Events (SSE) and Progressive Chunk Rendering.
 */

export async function sendChatMessageToTutor({ messages, contextData = null, onChunk = null }) {
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

    if (!res.ok) {
      const fallbackMsg = 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!';
      onChunk?.(fallbackMsg, null, true);
      return {
        success: false,
        text: fallbackMsg,
        modelUsed: null,
        isError: true
      };
    }

    if (!res.body) {
      const fallbackMsg = 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!';
      onChunk?.(fallbackMsg, null, true);
      return {
        success: false,
        text: fallbackMsg,
        modelUsed: null,
        isError: true
      };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let accumulatedText = '';
    let modelUsed = 'gemini-3.8-flash';
    let isError = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep partial chunk

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data:')) {
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;
          try {
            const data = JSON.parse(jsonStr);
            if (data.model) {
              modelUsed = data.model;
            }
            if (data.error) {
              isError = true;
              accumulatedText = data.text || 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!';
              onChunk?.(accumulatedText, modelUsed, false);
            } else if (data.chunk) {
              accumulatedText += data.chunk;
              onChunk?.(accumulatedText, modelUsed, false);
            } else if (data.done) {
              onChunk?.(accumulatedText, modelUsed, true);
            }
          } catch {
            // ignore non-json stream artefacts
          }
        }
      }
    }

    return {
      success: !isError && accumulatedText.length > 0,
      text: accumulatedText || 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!',
      modelUsed,
      isError
    };
  } catch (err) {
    console.error('Fetch /api/chat network error:', err);
    const errorMsg = 'Gia sư AI đang bận một chút, bạn bấm thử lại sau vài giây nhé!';
    onChunk?.(errorMsg, null, true);
    return {
      success: false,
      isError: true,
      text: errorMsg,
      modelUsed: null
    };
  }
}
