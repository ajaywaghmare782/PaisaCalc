import React from 'react';

interface AdSenseHolderProps {
  label?: string;
  className?: string;
}

export default function AdSenseHolder({ label = 'Advertisement', className = 'my-6' }: AdSenseHolderProps) {
  return (
    <div 
      className={`ad-slot ad-slot-border bg-gray-50 flex flex-col items-center justify-center rounded-lg p-4 text-center transition-all duration-200 hover:bg-gray-100/80 ${className}`}
      style={{ minHeight: '100px' }}
      id={`ad-slot-${Math.random().toString(36).substr(2, 9)}`}
    >
      {/* ADSENSE AD SLOT — Replace this div with your AdSense ad unit code */}
      <span className="text-xs tracking-wider text-gray-400 font-mono uppercase">{label}</span>
      <span className="text-[10px] text-gray-300 font-sans mt-0.5">Placeholder Ad Slot for Adsense Campaign</span>
    </div>
  );
}
