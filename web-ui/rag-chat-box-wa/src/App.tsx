import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { ScrollArea } from './components/ui/scroll-area';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { sendMessageWithContext } from './utils/mockApi';

interface Message {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: string;
  senderName?: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your virtual assistant. How can I help you today?",
      isSent: false,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      senderName: 'Bot Assistant',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isSent: true,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call mock API
      const response = await sendMessageWithContext(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isSent: false,
        timestamp: response.timestamp,
        senderName: 'Bot Assistant',
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600">B</span>
            </div>
            <div>
              <h2 className="m-0">Bot Assistant</h2>
              <p className="text-xs text-green-100 m-0">Online</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="hover:bg-green-700 p-2 rounded-full transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="hover:bg-green-700 p-2 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Background Pattern */}
        <div 
          className="flex-1 bg-gray-50 relative overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <ScrollArea className="h-full">
            <div ref={scrollRef} className="p-4 overflow-y-auto h-[calc(600px-140px)]">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isSent={message.isSent}
                  timestamp={message.timestamp}
                  senderName={message.senderName}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="bg-gray-100 px-4 py-3 flex gap-2 items-center border-t border-gray-200">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-white border-gray-300 rounded-full px-4"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 rounded-full w-12 h-12 p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
