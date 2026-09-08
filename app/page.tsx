"use client";

import { useState } from 'react';
import { mockChats, mockMessages } from '../lib/mockData';
import { MenuIcon, SearchIcon, AttachIcon, SmileIcon, MicIcon, SendIcon, DoubleCheckIcon, CheckIcon } from '../components/Icons';

export default function TelegramUI() {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [input, setInput] = useState('');

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white overflow-hidden font-sans">
      
      {/* Left Sidebar (Chats List) */}
      <div className="w-[340px] flex-shrink-0 bg-[#212121] border-r border-black flex flex-col z-10 shadow-[2px_0_10px_rgba(0,0,0,0.5)]">
        
        {/* Sidebar Header */}
        <div className="px-4 py-3 flex items-center gap-4">
          <button className="text-[#aaaaaa] hover:text-white transition cursor-pointer">
            <MenuIcon />
          </button>
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaaaaa]">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-[#181818] rounded-full py-1.5 pl-9 pr-4 text-[15px] outline-none border border-transparent focus:border-[#8774e1] transition placeholder:text-[#aaaaaa]"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={`flex items-center px-3 py-2 cursor-pointer transition ${
                activeChat.id === chat.id ? 'bg-[#8774e1] text-white' : 'hover:bg-[#2c2c2c]'
              }`}
            >
              <div className="relative mr-3 flex-shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                {chat.online && (
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 rounded-full bg-[#00ff00] ${
                    activeChat.id === chat.id ? 'border-[#8774e1]' : 'border-[#212121]'
                  }`}></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-medium text-[15px] truncate">{chat.name}</h3>
                  <span className={`text-xs ml-2 flex-shrink-0 ${activeChat.id === chat.id ? 'text-white/80' : 'text-[#aaaaaa]'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-[14px] truncate ${activeChat.id === chat.id ? 'text-white/90' : 'text-[#aaaaaa]'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <div className={`ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 min-w-[20px] text-center ${
                      activeChat.id === chat.id ? 'bg-white text-[#8774e1]' : 'bg-[#aaaaaa] text-[#212121]'
                    }`}>
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#0f0f0f]">
        {/* Chat Background Pattern */}
        <div className="absolute inset-0 chat-bg opacity-40 pointer-events-none"></div>

        {/* Chat Header */}
        <div className="h-14 bg-[#212121] px-5 flex items-center justify-between border-b border-black z-10 shadow-sm cursor-pointer hover:bg-[#2c2c2c] transition">
          <div className="flex items-center gap-3 min-w-0">
            <img src={activeChat.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <h2 className="font-semibold text-[15px] truncate">{activeChat.name}</h2>
              <span className="text-[13px] text-[#aaaaaa]">
                {activeChat.online ? <span className="text-[#8774e1]">online</span> : 'last seen recently'}
              </span>
            </div>
          </div>
          <div className="flex gap-4 text-[#aaaaaa]">
            <button className="hover:text-white transition"><SearchIcon /></button>
            <button className="hover:text-white transition"><MenuIcon /></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 z-10 relative">
          <div className="text-center my-4">
            <span className="bg-[#212121]/60 backdrop-blur text-white/70 text-sm px-3 py-1 rounded-full font-medium shadow-sm">
              Today
            </span>
          </div>
          
          {mockMessages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1 relative`}>
                <div 
                  className={`
                    relative max-w-[420px] px-3 pt-2 pb-[22px] rounded-[12px] text-[15px] leading-snug shadow-sm
                    ${isMe ? 'bg-[#766ac8] text-white rounded-br-sm bubble-tail-right' : 'bg-[#212121] text-white rounded-bl-sm bubble-tail-left'}
                  `}
                >
                  {msg.text}
                  <div className={`absolute bottom-1 right-2 text-[11px] flex items-center gap-1 ${isMe ? 'text-white/80' : 'text-[#aaaaaa]'}`}>
                    <span>{msg.time}</span>
                    {isMe && (
                      <span className="text-[#7bd37a]">
                        {msg.read ? <DoubleCheckIcon className="w-4 h-4" /> : <CheckIcon className="w-4 h-4" />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Area */}
        <div className="p-4 z-10 flex justify-center">
          <div className="w-full max-w-[720px] bg-[#212121] rounded-xl flex items-end px-2 py-1 shadow-md">
            <button className="p-3 text-[#aaaaaa] hover:text-[#8774e1] transition flex-shrink-0">
              <AttachIcon />
            </button>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 max-h-32 min-h-[44px] bg-transparent outline-none text-[15px] py-3 px-1 resize-none placeholder:text-[#aaaaaa]"
              rows={1}
            />
            <button className="p-3 text-[#aaaaaa] hover:text-[#8774e1] transition flex-shrink-0">
              <SmileIcon />
            </button>
            {input.trim() ? (
              <button 
                onClick={() => setInput('')}
                className="m-1.5 w-10 h-10 rounded-full bg-[#8774e1] text-white flex items-center justify-center hover:bg-[#7a68ce] transition flex-shrink-0"
              >
                <SendIcon />
              </button>
            ) : (
              <button className="p-3 text-[#aaaaaa] hover:text-[#8774e1] transition flex-shrink-0">
                <MicIcon />
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
