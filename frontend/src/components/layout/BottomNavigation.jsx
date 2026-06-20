import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Clock, Users, Calendar, MoreHorizontal } from 'lucide-react';

export default function BottomNavigation() {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Queue', path: '/queue', icon: Clock },
    { label: 'Patients', path: '/patients', icon: Users },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'More', path: '/more', icon: MoreHorizontal },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-border px-4 py-2 flex justify-around items-center shadow-[0_-4px_12px_rgba(0,0,0,0.03)] pb-safe">
      <div className="flex w-full justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'text-primary'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-bg/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                  />
                  <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
