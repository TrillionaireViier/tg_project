"use client";

import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
  <div style={style} className="flex items-center p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
    <div className="w-12 h-12 rounded-full bg-white/10 mr-4 flex-shrink-0"></div>
    <div className="flex-1 overflow-hidden">
      <div className="font-semibold text-white/90 truncate">Chat {index}</div>
      <div className="text-sm text-white/50 truncate">Last message here...</div>
    </div>
  </div>
);

export default function ChatList({ count = 1000 }: { count?: number }) {
  return (
    <div className="h-full w-full">
      <List
        height={800} // Ideally calculate from parent
        itemCount={count}
        itemSize={80}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
}
