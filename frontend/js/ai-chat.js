// === AI CHAT MODULE — ai-chat.js ===

const API_BASE = '';
let chatMode = 'chat'; // chat | correct | english | jury
let chatHistory = [];

function setChatMode(btn, mode) {
  chatMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function initChat(mode) {
  chatHistory = [];
  chatMode = mode;
}

async function sendChat(mode) {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  input.value = '';
  appendMessage('user', msg);

  const spinner = appendMessage('ai', '<span class="spinner"></span>');

  try {
    const endpoint = mode === 'jury' ? '/api/ai/jury'
                   : chatMode === 'correct' ? '/api/ai/correct'
                   : chatMode === 'english' ? '/api/ai/english'
                   : '/api/ai/chat';

    const payload = { message: msg, history: chatHistory };
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    const data = await res.json();
    const reply = data.reply || data.response || 'Pas de reponse.';

    spinner.innerHTML = formatAIText(reply);
    chatHistory.push({ role: 'user', parts: [{ text: msg }] });
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });

    // Keep history to last 20 turns to avoid token overflow
    if (chatHistory.length > 40) chatHistory = chatHistory.slice(-40);

  } catch (err) {
    spinner.innerHTML = `<span style="color:var(--danger)">Erreur : ${err.message}. Verifiez que le serveur est demarre.</span>`;
  }

  scrollChatBottom();
}

function appendMessage(role, html) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = html;
  msgs.appendChild(div);
  scrollChatBottom();
  return div;
}

function scrollChatBottom() {
  const msgs = document.getElementById('chatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function formatAIText(text) {
  // Escape HTML first
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (```...```)
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
    `<pre><code class="lang-${lang || 'text'}">${code.trim()}</code></pre>`);

  // Inline code
  html = html.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Headers (##, ###)
  html = html.replace(/^### (.+)$/gm, '<h4 class="ai-h4">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 class="ai-h3">$1</h3>');
  html = html.replace(/^# (.+)$/gm, '<h2 class="ai-h2">$1</h2>');

  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ai-li-num">$1</li>');
  html = html.replace(/(<li class="ai-li-num">.*<\/li>\n?)+/g, m => `<ol class="ai-ol">${m}</ol>`);

  // Bullet lists
  html = html.replace(/^[-*] (.+)$/gm, '<li class="ai-li">$1</li>');
  html = html.replace(/(<li class="ai-li">.*<\/li>\n?)+/g, m => `<ul class="ai-ul">${m}</ul>`);

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="ai-hr" />');

  // Paragraphs — wrap double newlines
  html = html.replace(/\n{2,}/g, '</p><p class="ai-p">');
  html = html.replace(/\n/g, '<br>');
  html = `<p class="ai-p">${html}</p>`;

  // Clean empty <p>
  html = html.replace(/<p class="ai-p"><\/p>/g, '');

  return html;
}
