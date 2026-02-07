import React, { useEffect, useRef } from 'react';

const DoomPlayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dosInstance = useRef<any>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Bloqueia a execução dupla do React 18
    if (isInitialized.current) return;

    const startDoom = async () => {
      // @ts-ignore
      if (window.Dos && containerRef.current && !isInitialized.current) {
        try {
          isInitialized.current = true;
          
          // @ts-ignore
          const ci = await window.Dos(containerRef.current).run("./public/doom.zip");
          dosInstance.current = ci;

          // Ajuste de zoom/redimensionamento automático do canvas
          const canvas = containerRef.current.querySelector('canvas');
          if (canvas) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.objectFit = 'contain';
          }
        } catch (e) {
          console.error("Erro ao iniciar o Doom:", e);
          isInitialized.current = false; 
        }
      }
    };

    //delay
    const timeoutId = setTimeout(startDoom, 800);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup
      if (dosInstance.current) {
        dosInstance.current.exit();
        dosInstance.current = null;
      }
      isInitialized.current = false;
    };
  }, []);

  return (
    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">
      {/* Força o container do js-dos a ocupar todo o espaço e ser visível */}
      <style>{`
        .dosbox-container { width: 100% !important; height: 100% !important; background: #000; }
        .jsdos-canvas { width: 100% !important; height: 100% !important; }
      `}</style>
      
      <div className="flex-grow relative bg-black">
        <div 
          ref={containerRef} 
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="p-2 bg-[#c0c0c0] text-[10px] border-t border-gray-600 font-mono flex justify-between flex-shrink-0 text-black select-none">
        <span>[SYSTEM]: EMULATING DOS/4GW</span>
        <span>CONTROLS: ARROWS / CTRL / SPACE</span>
      </div>
    </div>
  );
};

export default DoomPlayer;