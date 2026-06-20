import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      value: 'light',
      label: 'Light',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )
    },
    {
      value: 'system',
      label: 'System',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )
    }
  ] as const;

  return (
    <div className="theme-toggle-pill flex items-center gap-1 rounded-full border border-slate-200/50 bg-white/60 p-1 shadow-sm backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/60" aria-label="Theme selector">
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={[
              'flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-all duration-250 cursor-pointer',
              isActive
                ? 'bg-teal-600 text-white shadow-sm dark:bg-teal-500'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
            ].join(' ')}
            title={`Switch to ${opt.label} theme`}
            aria-pressed={isActive}
          >
            {opt.icon}
            <span className="hidden xs:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
