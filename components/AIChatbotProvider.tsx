// components/AIChatbotProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import AIChatbot from './AIChatbot';

interface AIChatbotContextType {
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  isOpen: boolean;
}

const AIChatbotContext = createContext<AIChatbotContextType | undefined>(undefined);

export function useAIChatbot() {
  const context = useContext(AIChatbotContext);
  if (!context) {
    throw new Error('useAIChatbot must be used within AIChatbotProvider');
  }
  return context;
}

interface AIChatbotProviderProps {
  children: ReactNode;
}

export function AIChatbotProvider({ children }: AIChatbotProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <AIChatbotContext.Provider value={{ openChat, closeChat, toggleChat, isOpen }}>
      {children}
      <AIChatbot isOpen={isOpen} onToggle={toggleChat} />
    </AIChatbotContext.Provider>
  );
}