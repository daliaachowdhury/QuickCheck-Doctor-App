import React from 'react';
import { Activity, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-card/85 backdrop-blur-md border-b border-brand-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-xl text-primary">
          <Activity size={20} />
        </div>
        <div>
          <h1 className="text-base font-bold text-brand-text leading-tight">QuickCheck</h1>
          <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Dr. Active
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-bg rounded-xl transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-bg rounded-xl transition-colors">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
