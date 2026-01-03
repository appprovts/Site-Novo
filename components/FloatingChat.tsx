
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, MessageCircle, ArrowRight, Zap, Calculator, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getChatAssistantResponse } from '../services/geminiService';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const FloatingChat: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou o assistente da VTS Engenharia. Como posso acelerar seu projeto hoje?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getChatAssistantResponse(text);
    
    const botMsg: Message = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);
  };

  const quickActions = [
    { label: 'Simular Economia', icon: Calculator, path: '/calculator' },
    { label: 'Diagnóstico Grupo A', icon: Zap, path: '/group-a' },
    { label: 'Suporte App Pro', icon: ShieldCheck, path: '/app' },
    { label: 'WhatsApp Direto', icon: MessageCircle, isWA: true },
  ];

  const handleAction = (action: typeof quickActions[0]) => {
    if (action.isWA) {
      const msg = encodeURIComponent("Olá VTS! Gostaria de falar com um especialista sobre meu projeto solar.");
      window.open(`https://wa.me/5586999189443?text=${msg}`, '_blank');
    } else if (action.path) {
      navigate(action.path);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-vts-orange hover:bg-vts-orangeHover text-white p-4 rounded-full shadow-2xl shadow-orange-500/40 transition-all hover:scale-110 flex items-center justify-center relative group"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-vts-dark animate-pulse"></div>
          <MessageSquare size={28} />
          <span className="absolute right-16 bg-vts-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Dúvidas? Fale comigo!
          </span>
        </button>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in animate-slide-up">
          {/* Header */}
          <div className="bg-vts-dark p-6 text-white flex justify-between items-center relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-vts-petrol rounded-xl flex items-center justify-center border border-white/10">
                <Bot size={22} className="text-vts-lightPetrol" />
              </div>
              <div>
                <h4 className="font-bold text-sm">VTS Assistant</h4>
                <p className="text-[10px] text-vts-lightPetrol font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Engenharia Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-vts-petrol text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-1 block opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                   <div className="w-1.5 h-1.5 bg-vts-petrol rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-vts-petrol rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-1.5 h-1.5 bg-vts-petrol rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 border-t border-slate-100 bg-white">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Atalhos de Atendimento</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleAction(action)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-vts-petrol hover:text-white hover:border-vts-petrol transition-all"
                >
                  <action.icon size={12} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida técnica..."
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-vts-petrol focus:ring-4 focus:ring-vts-petrol/5 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-vts-dark text-white rounded-lg flex items-center justify-center hover:bg-vts-petrol transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
