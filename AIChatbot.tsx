import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Namaskaram! I am ನಿಮ್ಮ Wedding Assistant at Wedland. How can I help you find the perfect outfit today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = 'gemini-3-flash-preview';
      
      const prompt = `You are a personalized wedding stylist for "Wedland Weddings", a premium textiles shop in Kochi, Kerala. 
      You handle sarees, kurtis, groom's wear, and bridal collections.
      Be elegant, helpful, and culturally respectful. Use occasional words in Malayalam or English with a polite South Indian vibe.
      Provide suggestions for fabrics (silk, chiffon, georgette), colors, and styles based on the user's query.
      
      Chat History:
      ${messages.map(m => `${m.role}: ${m.text}`).join('\n')}
      user: ${input}`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });

      const aiMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: response.text || "I apologize, I'm having trouble connecting to the styling studio right now. Please try again or visit us in Kochi!"
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-rose-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-rose-200" />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-tight">Wedland Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest opacity-70">Stylist Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm shadow-sm",
                    msg.role === 'user' 
                      ? "bg-rose-900 text-white rounded-tr-none" 
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                  )}>
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="bg-transparent flex-grow outline-none text-sm text-slate-800 placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="text-rose-900 hover:scale-110 active:scale-95 transition-transform disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-rose-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-rose-800 transition-colors"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.button>
    </div>
  );
}
