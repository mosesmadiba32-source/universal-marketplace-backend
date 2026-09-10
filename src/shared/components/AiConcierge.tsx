import React, { useState, useRef, useEffect } from 'react';
import { AiOrchestrator, AiMessage } from '../lib/aiOrchestrator';
import { useCartStore } from '../store/cartStore';
import { ProductCard } from '../../features/catalog/components/ProductCard';
import {
  Sparkles,
  X,
  Send,
  Image as ImageIcon,
  Paperclip,
  CheckCircle2,
  Package,
  ArrowRight,
  Minimize2,
  Trash2,
  Loader2,
} from 'lucide-react';

export const AiConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: "Welcome to Local Art AI! I am your personal **Artisan Concierge**. How may I assist you with curated styling, live order tracking, or finding the perfect gift today?",
      timestamp: 'Now',
      suggestedPrompts: [
        'Find gifts under $100',
        'Track my shipment',
        'Recommend studio audio gear',
        'Ask about artisan warranty',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getSubtotal, getItemCount } = useCartStore();

  const cartSubtotal = getSubtotal();
  const cartItemCount = getItemCount();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() && !selectedImage) return;

    const userMsg: AiMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const imageToProcess = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await AiOrchestrator.processMessage({
        text: query,
        image: imageToProcess || undefined,
        cartSubtotal,
        cartItemCount,
      });
      setMessages((prev) => [...prev, response]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "I experienced a temporary communication hiccup. Please feel free to ask again or check our Help Center.",
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* 1. Floating Gold Trigger with Sparkle Monogram & Idle Glow */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Local Art AI Concierge"
        className={`fixed bottom-20 sm:bottom-8 right-6 z-40 w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-900 shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/50 ${
          isOpen ? 'rotate-90' : 'animate-bounce-subtle'
        }`}
        style={{
          boxShadow: '0 8px 24px rgba(240, 168, 36, 0.4), 0 2px 6px rgba(10, 24, 48, 0.2)',
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-6 h-6 stroke-[2.2] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-navy-900" />
          </div>
        )}
      </button>

      {/* 2. Slide-up Glassmorphism Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Artisan Concierge"
          className="fixed bottom-36 sm:bottom-24 right-4 sm:right-6 z-40 w-[380px] max-w-[calc(100vw-32px)] h-[540px] bg-surface/95 backdrop-blur-md rounded-[16px] border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 select-none"
        >
          {/* Header */}
          <div className="bg-navy-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center font-black text-xs">
                LA
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5 leading-none">
                  <span>Artisan Concierge</span>
                  <Sparkles className="w-3 h-3 text-gold-500" />
                </h3>
                <p className="text-[10px] text-green-400 font-semibold mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>AI Concierge Online</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setMessages([
                    {
                      id: 'cleared-welcome',
                      sender: 'assistant',
                      text: "Conversation refreshed. How may I assist you with products, sizing, or tracking?",
                      timestamp: 'Now',
                      suggestedPrompts: ['Find gifts under $100', 'Track my shipment', 'Recommend studio audio gear'],
                    },
                  ])
                }
                className="p-1 text-white/60 hover:text-white rounded transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-white/60 hover:text-white rounded transition-colors"
                title="Minimize Concierge"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-bg-page/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Image attachment preview if user uploaded one */}
                {msg.imagePreview && (
                  <img
                    src={msg.imagePreview}
                    alt="Uploaded query"
                    className="w-24 h-24 object-cover rounded-lg mb-1.5 border border-border shadow-sm"
                  />
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-[12px] p-3 shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-navy-900 text-white rounded-br-none'
                      : 'bg-surface border border-border text-text-primary rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Inline Live Product Cards */}
                {msg.products && msg.products.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2.5">
                    <p className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">
                      Verified Catalog Matches
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.products.map((prod) => (
                        <div key={prod.id} className="scale-95 origin-top-left">
                          <ProductCard product={prod} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Order Tracking Timeline */}
                {msg.orderTimeline && (
                  <div className="w-full mt-2.5 bg-surface rounded-[10px] border border-border p-3 space-y-2">
                    <div className="flex items-center justify-between border-b border-border pb-1.5">
                      <span className="font-bold text-[11px] text-navy-900">
                        Order #{msg.orderTimeline.orderNumber}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        In Transit
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {msg.orderTimeline.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px]">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[8px] flex-shrink-0 ${
                              step.completed ? 'bg-blue-600 text-white' : 'border border-border text-text-secondary'
                            }`}
                          >
                            {step.completed ? '✓' : idx + 1}
                          </span>
                          <span className={step.completed ? 'font-bold text-text-primary' : 'text-text-secondary'}>
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prompt Chips */}
                {msg.suggestedPrompts && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="px-2.5 py-1 bg-surface hover:bg-gold-500/10 text-navy-900 hover:text-gold-600 border border-border rounded-full text-[10px] font-semibold transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-text-secondary mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-text-secondary text-xs p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-500" />
                <span className="text-[11px]">Artisan Concierge is analyzing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Image Upload Preview Bar */}
          {selectedImage && (
            <div className="px-4 py-2 bg-neutral-100 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={selectedImage}
                  alt="Selected preview"
                  className="w-8 h-8 rounded object-cover border border-border"
                />
                <span className="text-[10px] text-text-secondary font-medium">Image attached for visual search</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-text-secondary hover:text-red-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-surface border-t border-border flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-text-secondary hover:text-navy-900 rounded-full hover:bg-neutral-100 transition-colors"
              title="Attach image for visual search"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about styles, gifts, orders..."
              className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-border rounded-[8px] focus:outline-none focus:border-blue-600 focus:bg-white"
            />

            <button
              type="submit"
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="p-2 bg-gold-500 hover:bg-gold-600 active:bg-gold-600 text-navy-900 rounded-[8px] disabled:opacity-50 transition-colors"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
