"use client";

import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';
import ChatList from '../components/ChatList';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.connect();
    
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg.text]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit('sendMessage', { chatId: '123', senderId: 'user1', text: input });
    setInput('');
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden p-4 gap-4">
      {/* Left Column: Chats */}
      <div className="w-80 glass-panel rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 font-semibold text-lg flex items-center justify-between">
          <span>Chats</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">+</div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatList count={50} />
        </div>
      </div>

      {/* Center Column: Active Chat */}
      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/5 font-semibold text-lg flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/10 mr-3"></div>
          <div>
            <div>Group Chat</div>
            <div className="text-xs text-white/50 font-normal">3 members online</div>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className="self-end glass px-4 py-2 rounded-2xl rounded-tr-sm max-w-[70%] text-sm">
              {msg}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center glass rounded-full px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30"
            />
            <button onClick={sendMessage} className="ml-2 text-white/50 hover:text-white transition">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Info */}
      <div className="w-72 glass-panel rounded-2xl p-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white/10 mt-6 mb-4"></div>
        <h2 className="font-semibold text-lg">Group Chat</h2>
        <p className="text-sm text-white/50 text-center mt-2">
          This is a mock brutalist glass UI for the Telegram clone.
        </p>
      </div>
    </div>
  );
}
