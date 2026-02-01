
import React, { useState, useEffect } from 'react';
import RetroOverlay from './components/RetroOverlay';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import GlucoseMonitor from './components/GlucoseMonitor';
import StatusPanel from './components/StatusPanel';
import ProjectsPanel from './components/ProjectsPanel';
import LastFmPanel from './components/LastFmPanel';
import WinampWrapper from './components/WinampWrapper';
import DoomPlayer from './components/DoomPlayer';
import { GoogleGenAI } from "@google/genai";
import { useFormStatus } from "react-dom";

const ASSET_BASE = "https://raw.githubusercontent.com/Reennaan/unknown/aa343befc725f6feef2a013e7cdfbf4b8f4d69e1/";

const Typewriter: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
const [currentText, setCurrentText] = useState('');
const [currentIndex, setCurrentIndex] = useState(0);






  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <>{currentText}</>;
};



const App: React.FC = () => {
  const [windows, setWindows] = useState({
    main: true,
    doom: false,
    ai: false,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [aiResponse, setAiResponse] = useState("Greetings, traveler... I am the spirit of the woods. Ask me anything.");
  const [loadingAi, setLoadingAi] = useState(false);

  const toggleWindow = (key: keyof typeof windows) => {
    setWindows(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaved(true);
    const audio = new Audio(import.meta.env.BASE_URL+ "sounds/save.mp3");
    audio.play().catch(() => {});
    setTimeout(() => setIsSaved(false), 3000);
    var save = document.getElementsByClassName('unsaved')
    save[0].textContent = "SAVED"
    save[0].classList.remove("text-red-600");
    save[0].classList.add("text-green-600")
    var square = document.querySelectorAll('.ssquare')
    square.forEach(el => {
      el.classList.remove('bg-red-600', 'bg-gray-300');
      el.classList.add('bg-green-600')
    });
    
    
  };

    const { pending } = useFormStatus();
    const [glucoseHistory, setGlucoseHistory] = useState<
      { val: string; time: string }[]
    >(() => {
      const saved = localStorage.getItem('glucoseHistory');
      return saved ? JSON.parse(saved) : [];
    });
    const [glucoseLevel, setGlucoseLevel] = useState<string>('');
    const handleGlucoseSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!glucoseLevel) return;

      const entry = {
        val: glucoseLevel,
        time: new Date().toLocaleTimeString(),
      };

      setGlucoseHistory(prev => [entry, ...prev].slice(0, 5));
      setGlucoseLevel('');
    };

  

    useEffect(() => {
      localStorage.setItem(
        'glucoseHistory',
        JSON.stringify(glucoseHistory)
      );
    }, [glucoseHistory]);

  const askSpirit = async (prompt: string) => {
    setLoadingAi(true);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const ai = new GoogleGenAI({ apiKey});
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are a cryptic but helpful 90s-style digital forest spirit living in a .zip file. Your speech is glitchy, poetic, and retro. Use short sentences.",
        }
      });
      setAiResponse(response.text || "The signal is lost in the thicket...");
    } catch (err) {
      setAiResponse("ERROR: SPIRIT_LINK_BROKEN. The signal is weak.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden select-none flex flex-col">
      {/* Background */}
      <img 
        src={`${ASSET_BASE}img/background.gif`} 
        className="absolute inset-0 w-full h-full object-cover z-0 no-select select-none" 
        alt="Background"
      />

      <RetroOverlay />

      {/* Desktop Icons - responsive grid */}
      <div className="absolute top-4 left-4 flex flex-col md:flex-row md:top-auto md:bottom-16 md:left-4 gap-4 md:gap-6 z-10">
        <DesktopIcon 
          name="Doom.exe" 
          iconUrl={`${ASSET_BASE}img/doomicon.png`} 
          onDoubleClick={() => toggleWindow('doom')} 
        />
        <DesktopIcon 
          name="ForestSpirit.lnk" 
          iconUrl="https://img.icons8.com/color/48/ghost.png" 
          onDoubleClick={() => toggleWindow('ai')} 
        />
        <DesktopIcon 
          name="MyComputer" 
          iconUrl="https://img.icons8.com/color/48/monitor--v1.png" 
          onDoubleClick={() => toggleWindow('main')} 
        />
      </div>

      {/* Main Window - Centered on screen, responsive width */}
      {windows.main && (
        <Window 
          title="hiddenwoods.zip" 
          onClose={() => toggleWindow('main')}
          className="top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[85vw] md:w-[700px] z-20 h-[90vh] md:h-[90vh] max-h-[1200px]"
        >
          <div className="p-2 md:p-4 bg-[#f5eee4] h-full overflow-y-auto custom-scrollbar flex flex-col gap-4">
             <div className="relative flex-shrink-0 flex items-center justify-center h-20 md:h-28">
                <img src={`${ASSET_BASE}img/titlebackgroud.gif`} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="relative flex items-center gap-2 md:gap-4 z-10 text-center">
                   <img src={`${ASSET_BASE}img/smileds1.gif`} className="w-6 h-6 md:w-8 md:h-8" />
                   <h1 className="text-3xl md:text-5xl font-bold glitch-text text-green-400" style={{fontFamily: 'WildBreathOfZelda', textShadow: '2px 2px #000'}}>hiddenwoods.zip</h1>
                   <img src={`${ASSET_BASE}img/smileds1.gif`} className="w-6 h-6 md:w-8 md:h-8" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0">
                <StatusPanel assetBase={ASSET_BASE} />
                <div className="flex flex-col gap-4">
                  {/* Enhanced Greeting Area */}
                  <div className="win95-border p-4 bg-[#fffef0] relative overflow-hidden flex-shrink-0 min-h-[220px] flex flex-col">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 opacity-30"></div>
                    <div className="flex justify-between items-start mb-3 border-b border-gray-300 pb-1">
                      <div className="flex flex-col">
                        <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Incoming Transmission</p>
                        <p className="text-[11px] font-bold text-gray-800">From: Shalashaska-</p>
                      </div>
                      <img src="https://img.icons8.com/color/16/verified-badge.png" className="w-4 h-4 opacity-70" alt="Verified" />
                    </div>
                    
                    <div className="text-[11px] leading-relaxed z-10 relative font-mono text-gray-800 flex-grow">
                      <span className="text-blue-600 font-bold mr-1 animate-pulse">_</span>
                      <Typewriter 
                        text="im a very skilled java developer, i swear. try checking out some of my projects, especially " 
                        delay={30} 
                      />
                      <span className="rpg-glow font-bold bg-black px-1 mx-1 text-white inline-block transform -rotate-1 skew-x-2">MANGO</span>
                      <Typewriter 
                        text=" and contact me via fax if you have any suggestions." 
                        delay={30} 
                      />
                    </div>

                    <div className="mt-4 pt-3 border-t border-dotted border-gray-400 flex justify-between items-center text-[9px] font-mono text-gray-500">
                      <span>SENT: 1999/12/31 23:59:59</span>
                      <div className="flex gap-2">
                        <span className="bg-blue-100 px-1 border border-blue-200">PRIORITY: HIGH</span>
                        <span className="bg-gray-100 px-1 border border-gray-200">ENCRYPTED</span>
                      </div>
                    </div>

                    {/* Decorative Corner Watermark */}
                    <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none rotate-12">
                      <img src="https://img.icons8.com/color/96/old-computer.png" className="w-24 h-24" alt="Retro Watermark" />
                    </div>
                  </div>

                  <div className="flex-shrink-0 h-[180px]">
                    <LastFmPanel assetBase={ASSET_BASE} />
                  </div>
                </div>
             </div>

             <div className="flex-shrink-0 pb-4">
                <ProjectsPanel />
             </div>
          </div>
        </Window>
      )}

 

      

      {/*GlucoseMonitor*/}
        <div className='fixed right-2 md:top-[calc(7.5vh+510px)] md:left-[calc(50%+22.6975rem)] md:bottom-auto z-[900] win95-border bg-[#c0c0c0] w-[10rem] md:w-[17.3125rem] p-[.125rem] shadow-lg hidden sm:block max-h-700' >
             
              <GlucoseMonitor
                title="GlucoseMonitor"
                className="bg-white border border-[#808080] m-[2px] overflow-hidden relative h-full flex flex-col" 
                
                >
            
            <div className="internal-state-box">
              <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', background: '#c0c0c0', padding: '4', borderBottom: '1px solid #808080' }}>INTERNAL STATE</div>
              <form onSubmit={handleGlucoseSubmit}>
                  <div style={{ fontSize: '13px', color: '#444' }}>What is your blood sugar level? answer us...</div>
                  <input style={{background: 'black', color: '#00ff00', width: '95%', fontSize: ".9375rem", outline:'none', left: '3%'}}
                      className="retro-input m-[5px]" 
                      type="number" 
                      placeholder="000"
                      value={glucoseLevel}
                      onChange={(e) => setGlucoseLevel(e.target.value)}
                  />
                  <button disabled={pending} className="win95-button m-[5px]" type="submit" style={{padding:'5px',  fontFamily: '"MS Sans Serif", "Tahoma", sans-serif', fontSize: '8'}}> {pending? "Submitting..." : "Log Entry"}</button>
              </form>
            
               <div className="m-[5px]" style={{ marginTop: '10px', fontSize: '10px', fontFamily: 'monospace' }}>
                    <div style={{ fontWeight: 'bold' }}>RECENT LOGS:</div>
                    {glucoseHistory.length === 0 ? (
                        <div style={{ opacity: 0.5 }}>... NO DATA ...</div>
                    ) : (
                        glucoseHistory.map((h, i) => (
                            <div key={i} className="crnt-line">
                                {h.time}  {h.val} mg/dL
                            </div>
                        ))
                    )}
                </div>
              </div>



          </GlucoseMonitor>
        </div>




      {/* Winamp - Repositioned for mobile responsiveness */}
      

      
        <div className="fixed top-[-5%] left-1/2 translate-x-[500px] z-[1000] pointer-events-auto">
          <WinampWrapper assetBase={ASSET_BASE} />
        </div>
    

      {/* Navlink Window - Repositioned for mobile responsiveness */}
      <div className="fixed bottom-14 right-2 md:top-[calc(7.5vh+305px)] md:left-[calc(50%+22.6975rem)] md:bottom-auto z-[20] win95-border bg-[#c0c0c0] w-[10rem] md:w-[17.3125rem] p-[.125rem] shadow-lg hidden sm:block">
        <div className="bg-[#000080] text-white flex items-center justify-between px-1 py-[2px] select-none text-[10px] font-bold">
          <span>advertisements.txt</span>
          <button className="win95-button w-3 h-3 flex items-center justify-center text-[8px] text-black">✕</button>
        </div>
        <div className="bg-white m-[1px] p-1 flex justify-center items-center h-[145px] md:h-[175px]">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 'none', overflow: 'hidden' }} 
            src="https://dimden.neocities.org/navlink/" 
            name="neolink"
          />
        </div>
      </div>

      {/* DOOM Window - Responsive sizing */}
      {windows.doom && (
        <Window 
          title="Doom.exe" 
          onClose={() => toggleWindow('doom')}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[645px] h-[60vh] md:h-[480px] z-[1001]"
        >
          <DoomPlayer />
        </Window>
      )}

      {/* AI Spirit Window - Responsive sizing */}
      {windows.ai && (
        <Window 
          title="ForestSpirit.exe" 
          onClose={() => toggleWindow('ai')}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/4 md:right-480 md:left-auto md:translate-x-0 md:translate-y-0 w-[90vw] md:w-[400px] z-40"
        >
          <div className="p-4 bg-black text-green-500 font-mono text-xs h-[250px] md:h-[300px] flex flex-col justify-between">
            <div className="overflow-y-auto mb-4 custom-scrollbar">
              <p className="mb-2 uppercase text-white border-b border-green-900 pb-1">[Link Established]</p>
              <p className="italic">{loadingAi ? ">>> Recalibrating signal..." : aiResponse}</p>
            </div>
            <div className="flex gap-2 border-t border-green-900 pt-2">
              <span className="text-white">&gt;</span>
              <input 
                type="text" 
                placeholder="Talk to the spirit..."
                className="bg-transparent text-green-400 flex-grow focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    askSpirit(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        </Window>
      )}

      {/* Taskbar - Always at bottom */}
      <div className="fixed bottom-0 w-full h-10 bg-[#c0c0c0] win95-border border-t-2 flex items-center px-2 z-50">
        <button className="win95-button flex items-center gap-1 px-2 md:px-3 py-1 font-bold text-xs md:text-sm mr-2">
          <img src="https://img.icons8.com/color/24/windows-logo.png" className="w-3 h-3 md:w-4 md:h-4" alt="Start" />
          <span className="hidden xs:inline">Start</span>
        </button>
        <div className="flex-grow flex gap-1 md:gap-2 h-full py-1 overflow-hidden">
           {windows.main && <div className="win95-button px-2 md:px-4 flex items-center text-[10px] md:text-xs truncate max-w-[80px] md:max-w-[120px] font-bold">hiddenwoods</div>}
           {windows.doom && <div className="win95-button px-2 md:px-4 flex items-center text-[10px] md:text-xs truncate max-w-[80px] md:max-w-[120px] font-bold bg-[#dfdfdf]">Doom.exe</div>}
           {windows.ai && <div className="win95-button px-2 md:px-4 flex items-center text-[10px] md:text-xs truncate max-w-[80px] md:max-w-[120px] font-bold">ForestSpirit</div>}
        </div>
        <img src={`${ASSET_BASE}img/worldwideweb_badge.gif`} className="h-6 md:h-8 mx-2 md:mx-4 hidden xs:block" alt="Badge" />
        <div className="win95-border px-2 md:px-4 py-1 text-[10px] md:text-xs font-bold flex items-center bg-[#c0c0c0] inset-shadow ml-auto">
           {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Save Button Corner */}
      <div 
        id="red-paper"
        onClick={handleSave}
        className="fixed bottom-14 right-4 w-10 h-10 bg-red-600/60 hover:bg-red-600 cursor-pointer flex items-center justify-center transition-transform hover:scale-110 z-50"
      >
        <span className="text-[9px] text-white font-bold text-center leading-tight"></span>
      </div>

      {/* Snackbar */}
      {isSaved && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-0 z-[10001] animate-pulse">
           <img src='./img/piramidhead3.png'/>
        </div>
      )}

      
    </div>
    





  );
};

export default App;
