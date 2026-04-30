// components/AIChatbot.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, Minimize2, Maximize2 } from "lucide-react";

// AI Response Data
const aiResponses = {
  "website": "I can help you build a high-performance website! We specialize in custom web applications, WordPress, Shopify, and full-stack solutions. What type of website are you looking for?",
  "ecommerce": "Great choice! We build headless Shopify Plus stores and custom ecommerce platforms that are optimized for conversions. Would you like to see some of our ecommerce case studies?",
  "wordpress": "WordPress is one of our core expertise areas! We build enterprise-grade WordPress sites with headless CMS architecture. What specific features do you need?",
  "shopify": "Shopify experts at your service! We specialize in headless Shopify Plus, custom storefronts, and global ecommerce solutions. Ready to scale your online store?",
  "ai": "AI is the future! We integrate LLMs, build custom AI agents, and create automation workflows. How can AI transform your business?",
  "price": "Our pricing is customized based on your specific needs. The best way is to schedule a free discovery call where we can understand your requirements and provide a detailed quote.",
  "time": "Project timelines vary based on complexity. A typical website takes 4-8 weeks, while complex ecommerce or AI projects can take 12-16 weeks. Let's discuss your timeline!",
  "support": "We offer 24/7 global support with dedicated teams across time zones. Our SLA guarantees 99.9% uptime and rapid response times.",
  "portfolio": "We've delivered 150+ projects for 50+ global brands. From startups to Fortune 500 companies, check out our case studies to see our work!",
  "contact": "You can reach us at growbusinesssolutionsbd@gmail.com or call +880 1884 369340. Fill out the contact form below and we'll get back to you within 24 hours!",
  "services": "We offer Full-Stack Development, WordPress, Shopify, AI Integration, No-Code solutions, and Intelligent Analytics. What specific service are you interested in?",
  "team": "We have a team of 20+ expert developers, designers, and AI specialists working across global time zones to deliver 24/7 support.",
  "technology": "Our tech stack includes React, Next.js, Node.js, Python, Shopify, WordPress, Webflow, OpenAI, LangChain, and many more cutting-edge technologies.",
  "default": "Thanks for your message! Our AI assistant is here to help. For immediate assistance, please fill out the contact form or email us directly. How else can I help you today?"
};

const quickSuggestions = ["Pricing", "Timeline", "Portfolio", "Services", "Contact", "Technology"];

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface AIChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'dark' | 'light';
}

export default function AIChatbot({ 
  isOpen: externalIsOpen, 
  onToggle, 
  position = 'bottom-right',
  theme = 'dark'
}: AIChatbotProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: "👋 Hello! I'm your AI assistant. Ask me anything about our services, pricing, timeline, or technology stack!" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8'
  };

  const themeClasses = {
    dark: {
      bg: "bg-[#0a0c0f]",
      border: "border-white/10",
      text: "text-white",
      textSecondary: "text-white/40",
      inputBg: "bg-white/5",
      userMsg: "bg-gradient-to-r from-[#6c5ce7] to-[#8b7df0] text-white",
      aiMsg: "bg-white/5 border border-white/10 text-white/80",
      button: "bg-gradient-to-r from-[#6c5ce7] to-[#00cec9]"
    },
    light: {
      bg: "bg-white",
      border: "border-gray-200",
      text: "text-gray-900",
      textSecondary: "text-gray-500",
      inputBg: "bg-gray-50",
      userMsg: "bg-gradient-to-r from-[#6c5ce7] to-[#8b7df0] text-white",
      aiMsg: "bg-gray-100 border border-gray-200 text-gray-700",
      button: "bg-gradient-to-r from-[#6c5ce7] to-[#00cec9]"
    }
  };

  const currentTheme = themeClasses[theme];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // AI Response Handler
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const lowerMsg = userMessage.toLowerCase();
      let response = aiResponses.default;
      
      if (lowerMsg.includes('website') || lowerMsg.includes('site')) response = aiResponses.website;
      else if (lowerMsg.includes('ecommerce') || lowerMsg.includes('shop') || lowerMsg.includes('store')) response = aiResponses.ecommerce;
      else if (lowerMsg.includes('wordpress')) response = aiResponses.wordpress;
      else if (lowerMsg.includes('shopify')) response = aiResponses.shopify;
      else if (lowerMsg.includes('ai') || lowerMsg.includes('artificial intelligence')) response = aiResponses.ai;
      else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('budget')) response = aiResponses.price;
      else if (lowerMsg.includes('time') || lowerMsg.includes('duration') || lowerMsg.includes('long')) response = aiResponses.time;
      else if (lowerMsg.includes('support') || lowerMsg.includes('help')) response = aiResponses.support;
      else if (lowerMsg.includes('portfolio') || lowerMsg.includes('case study') || lowerMsg.includes('project')) response = aiResponses.portfolio;
      else if (lowerMsg.includes('contact') || lowerMsg.includes('reach') || lowerMsg.includes('email')) response = aiResponses.contact;
      else if (lowerMsg.includes('service') || lowerMsg.includes('offer')) response = aiResponses.services;
      else if (lowerMsg.includes('team') || lowerMsg.includes('people')) response = aiResponses.team;
      else if (lowerMsg.includes('tech') || lowerMsg.includes('technology') || lowerMsg.includes('stack')) response = aiResponses.technology;
      
      setMessages(prev => [...prev, { type: 'ai', content: response }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button - Smaller Button, Prominent Logo */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={toggleChat}
        className={`fixed z-50 w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${positionClasses[position]}`}
        style={{
          background: 'white',
          boxShadow: '0 0 0 2px transparent, 0 0 0 2px rgba(108, 92, 231, 0.3)',
        }}
      >
        {/* Gradient Border Effect - Thinner */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] p-[2px] -z-10">
          <div className="w-full h-full rounded-full bg-white" />
        </div>
        
        {/* Logo Image - Full size, minimal padding */}
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-12 h-12 object-contain group-hover:scale-105 transition-transform rounded-full" 
        />
        
        {/* Online Status Indicator */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px',
              width: isMinimized ? '300px' : '400px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-50 ${positionClasses[position]} mb-20 ${currentTheme.bg} ${currentTheme.border} border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl max-w-[calc(100vw-2rem)]`}
            style={{ width: isMinimized ? '300px' : '400px' }}
          >
            {/* Chat Header with Gradient */}
            <div className={`bg-gradient-to-r from-[#6c5ce7]/20 to-[#00cec9]/20 p-4 border-b ${currentTheme.border}`}>
              <div className="flex items-center gap-3">
                {/* Logo in Header */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="w-8 h-8 object-contain rounded-full" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-black text-sm tracking-wider ${currentTheme.text}`}>AI ASSISTANT</h3>
                  <p className={`text-[10px] ${currentTheme.textSecondary}`}>Online • Ready to help</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={toggleMinimize}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                  </button>
                  <button 
                    onClick={toggleChat}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.type === 'user'
                            ? currentTheme.userMsg
                            : currentTheme.aiMsg
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`${currentTheme.aiMsg} p-3 rounded-2xl`}>
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-[#6c5ce7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-[#6c5ce7] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-[#6c5ce7] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className={`px-4 py-2 border-t ${currentTheme.border} flex gap-2 flex-wrap`}>
                  {quickSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`text-[10px] px-3 py-1 rounded-full bg-gradient-to-r from-[#6c5ce7]/10 to-[#00cec9]/10 hover:from-[#6c5ce7]/20 hover:to-[#00cec9]/20 transition-all border border-[#6c5ce7]/20 ${currentTheme.textSecondary} hover:${currentTheme.text}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Chat Input */}
                <div className={`p-4 border-t ${currentTheme.border} flex gap-2`}>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className={`flex-1 ${currentTheme.inputBg} border ${currentTheme.border} rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#6c5ce7] transition-colors ${currentTheme.text}`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </>
            )}

            {/* Minimized View */}
            {isMinimized && (
              <div className="p-4">
                <p className={`text-xs ${currentTheme.textSecondary} text-center`}>
                  Click to expand and chat with AI
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}