import React from 'react';

export default function Input({
  label,
  type = 'text',
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3.5 text-brand-muted">
            <Icon size={18} />
          </span>
        )}
        <input
          type={type}
          className={`w-full rounded-xl border border-brand-border bg-brand-card py-2.5 px-3.5 text-sm text-brand-text placeholder-brand-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
