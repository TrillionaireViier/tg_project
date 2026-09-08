"use client";

const Row = ({ index }: { index: number }) => (
  <div className="flex items-center p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
    <div className="w-12 h-12 rounded-full bg-white/10 mr-4 flex-shrink-0"></div>
    <div className="flex-1 overflow-hidden">
      <div className="font-semibold text-white/90 truncate">Chat {index}</div>
      <div className="text-sm text-white/50 truncate">Last message here...</div>
    </div>
  </div>
);

export default function ChatList({ count = 50 }: { count?: number }) {
  // Using a standard scroll container instead of react-window for better compatibility
  const items = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="h-full w-full overflow-y-auto">
      {items.map((i) => (
        <Row key={i} index={i} />
      ))}
    </div>
  );
}
