"use client";

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [metrics, setMetrics] = useState({ users: 0, chats: 0, messages: 0 });

  useEffect(() => {
    // In a real app, fetch from NestJS /admin/metrics
    // fetch('http://localhost:3000/admin/metrics').then(res => res.json()).then(setMetrics);
    setMetrics({ users: 1542, chats: 342, messages: 98412 });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="text-white/50 text-sm mb-2">Total Users</div>
          <div className="text-4xl font-semibold">{metrics.users}</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <div className="text-white/50 text-sm mb-2">Active Chats</div>
          <div className="text-4xl font-semibold">{metrics.chats}</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <div className="text-white/50 text-sm mb-2">Total Messages</div>
          <div className="text-4xl font-semibold">{metrics.messages}</div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Spam Queue</h2>
        <div className="text-white/50 text-sm">No pending reports.</div>
      </div>
    </div>
  );
}
