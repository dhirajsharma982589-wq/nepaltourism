import React, { useState } from 'react';
import { fetchApi } from '../apiConfig';

export function AITravelAssistant() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = message.trim();
    if (!content || loading) return;
    const nextConversation = [...conversation, { role: 'user', content }];
    setConversation(nextConversation);
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const response = await fetchApi('/api/ai/assistant', {
        method: 'POST',
        body: JSON.stringify({ message: content, conversation: conversation.slice(-10) }),
      });
      setConversation([...nextConversation, { role: 'assistant', content: response.message, generated: response.generated }]);
    } catch (requestError) {
      setError(requestError.message || 'The assistant could not respond right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-assistant" aria-label="AI Tourism Assistant">
      <div className="ai-assistant-header">
        <div><p className="eyebrow">Grounded in the guide</p><h2>Ask about <em>Nepal.</em></h2></div>
        <button type="button" className="text-link" onClick={() => { setConversation([]); setError(''); }}>Clear conversation</button>
      </div>
      <p className="ai-assistant-note">Generated suggestions may need verification. Check current weather, permits, transport, prices and availability with official sources.</p>
      <div className="ai-conversation" aria-live="polite">
        {!conversation.length && <p className="ai-empty">Ask about destinations, trekking, food, culture, festivals or planning a route.</p>}
        {conversation.map((item, index) => <div className={`ai-message ${item.role}`} key={`${item.role}-${index}`}><span>{item.role === 'user' ? 'You' : 'Guide assistant'}</span><p>{item.content}</p></div>)}
        {loading && <div className="ai-message assistant"><span>Guide assistant</span><p>Thinking about the guide data…</p></div>}
      </div>
      {error && <p className="ai-error" role="alert">{error}</p>}
      <form className="ai-input-row" onSubmit={sendMessage}>
        <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask a Nepal tourism question" aria-label="Ask the AI Tourism Assistant" maxLength={2000} />
        <button className="button button-dark" type="submit" disabled={loading || !message.trim()}>{loading ? 'Sending…' : 'Send'}</button>
      </form>
    </section>
  );
}
