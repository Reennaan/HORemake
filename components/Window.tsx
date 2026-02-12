import React, { useState, useEffect } from 'react';


interface Props {
  title: string;
  onClose: () => void;
  
  children: React.ReactNode;
  className?: string;
}


var cont = -1;
let strangeActive = false;
const baseurl: string = import.meta.env.BASE_URL;
export function eyes() {
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
              
      }, 3000);

    }, 3000);
    
  }
  
  const hole = document.createElement("img")
  const phcontainer = document.createElement("div")
  phcontainer.className = "fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-0 z-[10001]"
  const pht = document.createElement("img")
  pht.className = "w-full h-full pointer-events-none"
  const puru = new Audio(baseurl+"/sounds/puru.mp3")
  
   
    if(cont === 1){
      hole.src = baseurl + "img/hole2.png";
      hole.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-2 pointer-events-none";
      pht.src = baseurl+"img/piramidhead7.png"
    
    }
    if(cont === 2){
      hole.src = baseurl + "img/hole2.png";
      hole.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-35 z-2 max-w-[400px] max-h-[400px] pointer-events-none";
      pht.src = baseurl+"img/piramidhead4.png";
      window.dispatchEvent(new CustomEvent("forestspirit-open", {
        detail: { message: "you'd better listen to the giant eye and that red piramid thing, dude." }
      }));
      
    }
      if(cont === 3){
      hole.src = baseurl + "img/hole2.png";
      hole.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-35 z-2 max-w-[900px] max-h-[900px] pointer-events-none";
      pht.src = baseurl+"img/piramidhead6.png";
      window.dispatchEvent(new CustomEvent("forestspirit-open", {
        detail: { message: "shame on you" }
      }));
      somethingStrange();
    }
    if (pht.src) {
      phcontainer.appendChild(pht)
      document.body.appendChild(phcontainer);
      if(cont < 3){
        puru.play()
      }
      setTimeout(() => {
        if (document.body.contains(phcontainer)) {
          document.body.removeChild(phcontainer);
        }
      }, 3000);
    }
    document.body.appendChild(hole);
    
  
}

function somethingStrange(){
  if (strangeActive) {
    return;
  }
  strangeActive = true;

  const effect = document.getElementById("strange");
  if (effect) {
    effect.style.transition = "opacity 8s ease";
    effect.style.opacity = "0";
    effect.style.filter = "grayscale(100%)";
  }
  const webamp = document.getElementById("webamp")
  if (webamp) {
    webamp.style.transition = "filter 4s ease";
    webamp.style.filter = "grayscale(100%)";
  }
  document.body.style.pointerEvents = 'none';
  document.body.style.userSelect = 'none';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = "black";

  const stage = document.createElement("div");
  stage.style.position = "fixed";
  stage.style.inset = "0";
  stage.style.background = "black";
  stage.style.opacity = "0";
  stage.style.transition = "opacity 8s ease";
  stage.style.zIndex = "20000";
  stage.style.display = "flex";
  stage.style.flexDirection = "column";
  stage.style.alignItems = "center";
  stage.style.justifyContent = "center";
  stage.style.gap = "16px";
  stage.style.pointerEvents = "none";
  document.body.appendChild(stage);
  requestAnimationFrame(() => {
    stage.style.opacity = "1";
  });

  const styleId = "pill-rain-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes pill-fall {
        0% { transform: translate3d(var(--pill-x), -15%, 0) rotate(var(--pill-rot)); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translate3d(var(--pill-x), 115vh, 0) rotate(calc(var(--pill-rot) + 360deg)); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const pillLayerBehind = document.createElement("div");
  pillLayerBehind.style.position = "fixed";
  pillLayerBehind.style.inset = "0";
  pillLayerBehind.style.zIndex = "19999";
  pillLayerBehind.style.pointerEvents = "none";
  pillLayerBehind.style.overflow = "hidden";
  document.body.appendChild(pillLayerBehind);

  const pillLayerFront = document.createElement("div");
  pillLayerFront.style.position = "fixed";
  pillLayerFront.style.inset = "0";
  pillLayerFront.style.zIndex = "20002";
  pillLayerFront.style.pointerEvents = "none";
  pillLayerFront.style.overflow = "hidden";
  document.body.appendChild(pillLayerFront);

  const transition = new Audio(baseurl+'sounds/transition.mp3');
  transition.play().catch(() => {});
  let pillInterval: number | null = null;
  let cleanupTimer: number | null = null;

  const spawnPill = (speedSeconds: number) => {
    const pill = document.createElement("img");
    pill.src = baseurl + "img/redpill.png";
    pill.style.position = "absolute";
    pill.style.top = "-10vh";
    pill.style.left = "0";
    pill.style.width = `${28 + Math.random() * 28}px`;
    pill.style.height = "auto";
    pill.style.opacity = "0";
    pill.style.setProperty("--pill-x", `${Math.random() * 100}vw`);
    pill.style.setProperty("--pill-rot", `${Math.random() * 360}deg`);
    pill.style.animation = `pill-fall ${speedSeconds}s linear forwards`;
    const layer = Math.random() < 0.3 ? pillLayerBehind : pillLayerFront;
    layer.appendChild(pill);
    pill.addEventListener("animationend", () => {
      if (pill.parentElement) {
        pill.parentElement.removeChild(pill);
      }
    });
  };

  const startPillRain = () => {
    const fallbackDuration = 24;
    pillInterval = window.setInterval(() => {
      const total = transition.duration && !Number.isNaN(transition.duration)
        ? transition.duration
        : fallbackDuration;
      const progress = Math.min(1, Math.max(0, transition.currentTime / total));
      const spawnCount = Math.ceil(1 + progress * 10);
      const speed = 12 - progress * 8;
      for (let i = 0; i < spawnCount; i++) {
        spawnPill(speed + Math.random() * 1.5);
      }
    }, 220);
  };

  if (transition.readyState >= 1) {
    startPillRain();
  } else {
    transition.addEventListener("loadedmetadata", startPillRain, { once: true });
    cleanupTimer = window.setTimeout(startPillRain, 800);
  }

  transition.onended = () => {
    if (pillInterval !== null) {
      window.clearInterval(pillInterval);
    }
    if (cleanupTimer !== null) {
      window.clearTimeout(cleanupTimer);
    }
    window.location.assign("https://hiddenwoods.neocities.org/not_found");
  };

  setTimeout(() => {
    const eye = document.createElement("img");
    eye.src = baseurl + "img/polpot.jpeg";
    eye.className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-2 pointer-events-none fade-in";



    const warn = document.createElement("div");
    warn.className = "fixed bottom-10 left-1/2 -translate-x-1/2 text-red-500 font-bold text-xl z-2 bg-black p-4 rounded-lg text-center min-w-[300px]";


    const text = ["you are not safe anymore", "i told you...", "Your soul is now cursed", "and I will remember you"];
    
    async function typewriterEffect() {
        for (let i = 0; i < text.length; i++) {
            const fraseAtual = text[i];
            
            // Espera a promessa de digitar a frase ser resolvida
            await new Promise((resolve) => {
                let index = 0;
                const interval = setInterval(() => {
                    warn.innerHTML = fraseAtual.substring(0, index + 1);
                    index++;

                    if (index >= fraseAtual.length) {
                        clearInterval(interval);
                        
                        setTimeout(resolve, 4000); 
                    }
                }, 50);
            });
        }
    }
    stage.appendChild(eye);
    stage.appendChild(warn);

typewriterEffect();


      


    requestAnimationFrame(() => {
      eye.style.opacity = "1";
      
    });
  }, 4200);
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
