'use client';
import React from 'react';

export default function Card({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
