import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Send, X } from 'lucide-react';
import { streamAIChat } from './utils/ai_agent';
import ElectionGame from './components/ElectionGame';
import './index.css';

const AICompanion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Jai Hind! 🇮🇳 Welcome to Chunav Saathi — your ultimate guide to India's greatest festival of democracy! Ready to become a true Chunav Champion? Let's start your journey! 🚀" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    const history = [...messages, userMessage];
    
    // Add user message and a placeholder for the bot's response
    setMessages(prev => [...prev, userMessage, { role: 'assistant', content: '' }]);
    const botMsgIndex = history.length; // This will be the index of the placeholder in the new array
    
    setInput('');
    setIsTyping(true);

    try {
      await streamAIChat(
        userMessage.content,
        (chunk) => {
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[botMsgIndex]) {
              newMessages[botMsgIndex] = {
                ...newMessages[botMsgIndex],
                content: newMessages[botMsgIndex].content + chunk
              };
            }
            return newMessages;
          });
        },
        messages.map(m => ({ role: m.role, content: m.content }))
      );
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 110 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass-panel"
            style={{ 
              position: 'absolute', 
              bottom: '100%', 
              right: '0', 
              marginBottom: '1rem', 
              width: '350px',
              height: '450px',
              border: '1px solid var(--saffron)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              background: 'rgba(15, 15, 30, 0.95)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={20} color="white" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontFamily: "'Baloo 2', cursive" }}>Chunav Saathi</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>Civic Mentor Agent</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(255, 107, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  maxWidth: '85%',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Chunav Saathi is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Chunav Saathi anything..."
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '0.8rem',
                  color: 'white',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleSend}
                style={{
                  background: 'linear-gradient(135deg, var(--saffron), var(--gold))',
                  border: 'none',
                  borderRadius: '8px',
                  width: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={18} color="black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="ai-trigger-container" style={{
        display: 'flex', alignItems: 'center', gap: '15px'
      }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                background: 'rgba(255, 153, 51, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 153, 51, 0.3)',
                padding: '8px 16px',
                borderRadius: '20px',
                color: '#FF9933',
                fontSize: '0.9rem',
                fontWeight: '600',
                pointerEvents: 'none',
                boxShadow: '0 0 15px rgba(255, 153, 51, 0.1)'
              }}
            >
              Ask Civic AI Guide
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="glow-pulse"
          style={{
            width: '64px', height: '64px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #FF9933, #FFD700)', 
            border: 'none', cursor: 'pointer', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 0 30px rgba(255, 153, 51, 0.4)',
            position: 'relative'
          }}
        >
          <Shield size={32} color="#000" />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', width: '100%', height: '100%',
              borderRadius: '50%', border: '2px solid #FF9933', top: 0, left: 0
            }}
          />
        </motion.button>
      </div>
    </div>
  );
};

import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <ElectionGame />
      <AICompanion />
    </ErrorBoundary>
  );
}

