import React, { useState, useEffect } from 'react';


interface Props {
  title: string;
  onClose: () => void;
  
  children: React.ReactNode;
  className?: string;
}


var cont = -1;
const baseurl: string = import.meta.env.BASE_URL;
function eyes() {
    cont++;
  if (cont === 0) {
    
    
    const eye = document.createElement("img");
    const warn = document.createElement("div");
    
    
    warn.className = "fixed bottom-10 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl z-2 bg-black p-4 rounded-lg text-center min-w-[300px]";
    
    eye.src = baseurl + "img/eye.gif";
    eye.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-2 pointer-events-none";
    
    document.body.appendChild(eye);
    document.body.appendChild(warn);

    setTimeout(() => {
      eye.src = baseurl + "img/static-eye.gif";
      
    
      const text = "you should not close the main page. go back";
      let index = 0;
      
      const typewriterInterval = setInterval(() => {
        if (index < text.length) {
          warn.innerHTML = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typewriterInterval);

        }
      }, 30);

      
      setTimeout(() => {
        if (document.body.contains(warn)) {
          document.body.removeChild(warn);
          document.body.removeChild(eye);
          
        }
        const event = new MouseEvent('dblclick', {
        view: window,
        bubbles: true,
        cancelable: true
        });


        const myComputerImg = document.querySelector('img[alt="MyComputer"]');
        if (myComputerImg) {
            myComputerImg.closest('.cursor-pointer').dispatchEvent(event);
        }
              
      }, 5000);

    }, 3000);
    
  }
  console.log(cont)
  const hole = document.createElement("img")
   
    if(cont === 1){
      hole.src = baseurl + "img/hole2.png";
      hole.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-2 pointer-events-none";
      console.log(cont)
    
    }
    if(cont === 2){
      hole.src = baseurl + "img/hole2.png";
      hole.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-35 z-2 max-w-[400px] max-h-[400px] pointer-events-none";
      
    }
      if(cont === 3){
      hole.src = baseurl + "img/hole2.png";
      hole.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-35 z-2 max-w-[900px] max-h-[900px] pointer-events-none";
    }
    
    document.body.appendChild(hole);
    
  
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
            onClick={() =>{
              onClose()
              eyes()
            } 
              
            }
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