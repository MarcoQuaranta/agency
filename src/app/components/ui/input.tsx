'use client';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className={`flex items-center border rounded-lg overflow-hidden ${className}`}>
      {icon && <span className="px-3">{icon}</span>}
      <input className="flex-grow p-2 focus:outline-none" {...props} />
    </div>
  );
}
