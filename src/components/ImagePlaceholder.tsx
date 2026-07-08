import React from 'react';
import { Camera } from 'lucide-react';

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  circular?: boolean;
  src?: string;
}

export function ImagePlaceholder({ label, className = '', circular = false, src }: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={`relative flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/40 overflow-hidden ${
          circular ? 'rounded-full' : 'rounded-2xl'
        } ${className}`}
      >
        <img 
          src={src} 
          alt={label} 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/40 overflow-hidden ${
        circular ? 'rounded-full' : 'rounded-2xl'
      } ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 pointer-events-none" />
      <div className="flex flex-col items-center justify-center gap-2 text-slate-500/70 p-4 text-center z-10">
        <Camera className="w-6 h-6 sm:w-8 sm:h-8" />
        <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">{label}</span>
      </div>
    </div>
  );
}
