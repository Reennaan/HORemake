
import React from 'react';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Window: React.FC<Props> = ({ title, onClose, children, className }) => {
  return (
    <div className={`fixed win95-border bg-[#c0c0c0] flex flex-col p-[2px] shadow-2xl overflow-hidden ${className}`}>
      {/* Title Bar */}
      <div className="bg-[#000080] text-white flex items-center justify-between px-2 py-[2px] md:py-[3px] select-none flex-shrink-0">
        <span className="text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-2 truncate">
          <img src="https://img.icons8.com/color/16/folder-invoices.png" alt="icon" className="w-3 h-3 md:w-4 md:h-4" />
          <span className="truncate">{title}</span>
        </span>
        <div className="flex gap-1 flex-shrink-0">
          <button className="win95-button w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[8px] md:text-[10px] text-black font-black">_</button>
          <button className="win95-button w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[8px] md:text-[10px] text-black font-black">□</button>
          <button 
            onClick={onClose}
            className="win95-button w-3 h-3 md:w-4 md:h-4 flex items-center justify-center text-[8px] md:text-[10px] text-black font-black hover:bg-red-500"
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* Body */}
      <div className="flex-grow bg-white border border-[#808080] m-[2px] overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default Window;
