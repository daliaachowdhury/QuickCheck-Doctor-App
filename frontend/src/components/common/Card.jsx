import React from 'react';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-brand-card border border-brand-border rounded-2xl p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
