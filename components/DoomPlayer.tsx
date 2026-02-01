
import React, { useEffect, useRef } from 'react';

const DoomPlayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDoom = async () => {
      // @ts-ignore
      if (window.Dos && containerRef.current) {
        try {
          // js-dos v7 usage: Dos(element).run(url)
          // @ts-ignore
          Dos(containerRef.current).run("https://js-dos.com/cdn/upload/DOOM-@evilution.zip");
        } catch (e) {
          console.error("Failed to start DOOM", e);
        }
      }
    };
    loadDoom();
  }, []);

  return (
    <div className="w-full h-full bg-black relative flex flex-col">
      <div className="flex-grow overflow-hidden">
        <div ref={containerRef} className="w-full h-full" />
      </div>
      <div className="p-2 bg-[#c0c0c0] text-[10px] border-t border-gray-600 font-mono flex justify-between flex-shrink-0">
        <span>[SYSTEM]: EMULATING DOS/4GW</span>
        <span>CONTROLS: ARROWS / CTRL / SPACE</span>
      </div>
    </div>
  );
};

export default DoomPlayer;
