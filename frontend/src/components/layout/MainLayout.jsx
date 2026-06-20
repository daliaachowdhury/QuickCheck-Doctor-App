import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Clock, Users, Calendar, MoreHorizontal, Activity, Bell, User, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Queue', path: '/queue', icon: Clock },
  { label: 'Patients', path: '/patients', icon: Users },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'More', path: '/more', icon: MoreHorizontal },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">

      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-brand-border px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-brand-muted hover:bg-brand-bg transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Activity size={20} />
            </div>
            <div>
              <h1 className="text-base font-bold text-brand-text leading-tight">QuickCheck</h1>
              <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                Dr. Active
              </span>
            </div>
          </div>
        </div>

        {/* Desktop nav links in header */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-bg rounded-xl transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-brand-muted hover:text-brand-text hover:bg-brand-bg rounded-xl transition-colors">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* ── Mobile Sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar drawer ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl border-r border-brand-border transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 p-5 border-b border-brand-border">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-brand-text">QuickCheck</h1>
            <span className="text-[10px] text-emerald-600 font-medium">Doctor Portal</span>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ── Page Content ── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
        <Outlet />
      </main>

      {/* ── Bottom Navigation (mobile/tablet only) ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'text-primary'
                      : 'text-brand-muted hover:text-brand-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                    <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
