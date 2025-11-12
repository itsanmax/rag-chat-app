import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';

export function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-4">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-gray-400 text-white">B</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col max-w-[70%]">
        <span className="text-xs text-gray-600 mb-1 px-3">Bot Assistant</span>
        <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
