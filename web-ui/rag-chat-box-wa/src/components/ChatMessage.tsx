import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ChatMessageProps {
  message: string;
  isSent: boolean;
  timestamp: string;
  avatarUrl?: string;
  senderName?: string;
}

export function ChatMessage({ message, isSent, timestamp, avatarUrl, senderName }: ChatMessageProps) {
  return (
    <div className={`flex gap-2 mb-4 ${isSent ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarUrl} alt={senderName} />
        <AvatarFallback className={isSent ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
          {senderName ? senderName[0].toUpperCase() : (isSent ? 'Y' : 'B')}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isSent ? 'items-end' : 'items-start'}`}>
        {!isSent && senderName && (
          <span className="text-xs text-gray-600 mb-1 px-3">{senderName}</span>
        )}
        <div
          className={`rounded-lg px-4 py-2 ${
            isSent
              ? 'bg-green-500 text-white rounded-br-none'
              : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
          }`}
        >
          <p className="break-words whitespace-pre-wrap">{message}</p>
          <span className={`text-xs mt-1 block ${isSent ? 'text-green-100' : 'text-gray-500'}`}>
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
