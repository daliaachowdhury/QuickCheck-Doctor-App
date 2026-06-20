import { NavLink } from 'react-router-dom';

interface IconProps {
  className?: string;
}

const tabs = [
  { key: 'dashboard', label: 'Consultation', to: '/', icon: DashboardIcon },
  { key: 'calendar', label: 'Calendar', to: '/calendar', icon: CalendarIcon }
];


function iconClasses(isActive: boolean) {
  return isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400';
}

function DashboardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10.5V20h12v-9.5" />
    </svg>
  );
}


function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}


interface BottomNavProps {
  active?: string;
}

export default function BottomNav({ active = 'dashboard' }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/95">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 sm:px-4 lg:px-6">
        {tabs.map((tab) => {
          const isForcedActive = active === tab.key;

          return (
            <NavLink
              key={tab.key}
              to={tab.to}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-colors',
                  isActive || isForcedActive 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                ].join(' ')
              }
            >
              {({ isActive }) => {
                const Icon = tab.icon;
                return (
                  <>
                    <Icon className={`h-5 w-5 ${iconClasses(isActive || isForcedActive)}`} />
                    <span>{tab.label}</span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
