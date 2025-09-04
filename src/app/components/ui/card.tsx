'use client';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
