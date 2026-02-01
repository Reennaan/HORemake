
import React, { useState, useEffect } from 'react';

interface Props {
  assetBase: string;
}

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Simulated visitor counter logic using localStorage
    const lastCount = localStorage.getItem('visitor_count');
    let currentCount = lastCount ? parseInt(lastCount, 10) : 100432;
    
    // Randomly increment slightly to simulate traffic on refresh
    const increment = Math.floor(Math.random() * 3) + 1;
    currentCount += increment;
    
    setCount(currentCount);
    localStorage.setItem('visitor_count', currentCount.toString());
  }, []);

  const countStr = count.toString().padStart(6, '0');

  return (
    <div className="flex flex-col items-center p-2 bg-black/10 border border-gray-400 mt-2">
      <p className="text-[10px] font-bold uppercase mb-1 tracking-wider text-gray-600">Site Visitors Since '99</p>
      <div className="flex bg-black border border-gray-600 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]">
        {countStr.split('').map((digit, i) => (
          <span key={i} className="counter-digit">{digit}</span>
        ))}
      </div>
    </div>
  );
};

const StatusPanel: React.FC<Props> = ({ assetBase }) => {
  return (
    <div className="win95-border p-3 bg-[#f0f0f0] space-y-3 h-full overflow-y-auto no-scrollbar">
      {/* User Header / Avatar Area */}
      <div className="flex gap-3 items-start border-b-2 border-dotted border-gray-400 pb-3">
        <div className="w-14 h-14 win95-border bg-black p-[2px] flex-shrink-0 group overflow-hidden relative">
          <img 
            src="/img/me.jpg" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="User Avatar"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-white rounded-full animate-pulse shadow-sm"></div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-[14px] font-black leading-none text-blue-900 mb-1">Shalashaska-</h2>
          <p className="text-[9px] font-mono text-gray-500 leading-tight">LV. 99 JAVA MAGE</p>
          <div className="flex gap-1 mt-1">
            <span className="w-2 h-2 bg-red-500 rounded-full border border-gray-400"></span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full border border-gray-400"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full border border-gray-400"></span>
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-tighter text-gray-400 mb-2 px-1">Social Protocols</h3>
        <ul className="grid grid-cols-1 gap-1">
          <li>
            <a href="https://github.com/Reennaan" target="_blank" rel="noopener noreferrer" 
               className="win95-button flex items-center justify-between px-2 py-1 text-[15px] font-bold text-gray-800 hover:text-blue-800 group">
              <span className="flex items-center gap-2">
                <img src={`${assetBase}img/githubgif.gif`} className="w-4 h-4" alt="" />
                Github.lnk
              </span>
              <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt;</span>
            </a>
          </li>
          <li>
            <a href="https://www.last.fm/pt/user/Shalashaska-" target="_blank" rel="noopener noreferrer"
               className="win95-button flex items-center justify-between px-2 py-1 text-[15px] font-bold text-gray-800 hover:text-blue-800 group">
              <span className="flex items-center gap-2">
                <img src={`${assetBase}img/musicnote.webp`} className="w-4 h-4" alt="" />
                Lastfm.url
              </span>
              <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt;</span>
            </a>
          </li>
          <li>
            <div className="win95-button flex items-center justify-between px-2 py-1 text-[15px] font-bold text-gray-800 cursor-help group">
              <span className="flex items-center gap-2">
                <img src={`${assetBase}img/mail.gif`} className="h-4" alt="" />
                Fax.daemon
              </span>
              <span className="text-[9px] font-mono text-blue-600 bg-blue-100 px-1 border border-blue-200 opacity-0 group-hover:opacity-100">ONLINE</span>
            </div>
          </li>
          <li>
            <a href="https://hiddenwoods.neocities.org/blog" target="_blank" rel="noopener noreferrer"
               className="win95-button flex items-center justify-between px-2 py-1 text-[15px] font-bold text-gray-800 hover:text-blue-800 group">
              <span className="flex items-center gap-2">
                <img src={`${assetBase}img/Simple_book.gif`} className="w-4 h-4" alt="" />
                Blog.sys
              </span>
              <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt;</span>
            </a>
          </li>
          <li>
            <a href="#" className="win95-button flex items-center justify-between px-2 py-1 text-[15px] font-bold text-gray-800 hover:text-blue-800 group">
              <span className="flex items-center gap-2">
                <img src={`${assetBase}img/Music_CD.gif`} className="w-4 h-4" alt="" />
                Spotify.exe
              </span>
              <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">&gt;&gt;</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Internal State Section */}
      <div className="bg-[#c0c0c0] win95-border border-t-0 p-2 inset-shadow">
        <h3 className="text-[10px] font-black uppercase text-gray-500 mb-2">Internal State</h3>
        <div className="space-y-2">
          <div className="flex flex-col gap-[2px]">
            <span className="text-[15px] font-bold text-blue-900 leading-none">Reading</span>
            <span className="text-[15px] text-gray-700 bg-white/50 px-1 border-l-2 border-green-400">Meridiano de Sangue</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-[15px] font-bold text-green-900 leading-none">Playing</span>
            <span className="text-[15px] text-gray-700 bg-white/50 px-1 border-l-2 border-green-400">25 Awards Silver Case</span>
          </div>
          <div className="pt-2 mt-1 border-t border-gray-300">
             <div className="flex items-center justify-between text-[10px] font-black">
               <span className="text-red-600 animate-pulse unsaved">DISK_UNSAVED</span>
               <div className="flex gap-[1px]">
                 <div className="w-2 h-3 bg-red-600 ssquare"></div>
                 <div className="w-2 h-3 bg-gray-300 ssquare"></div>
                 <div className="w-2 h-3 bg-gray-300 ssquare"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Visitor Counter Section */}
      <VisitorCounter />
    </div>
  );
};

export default StatusPanel;
