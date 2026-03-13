import React, { useEffect, useRef } from 'react';

declare const Dosbox: any;
const trackedAudioContexts = new Set<AudioContext>();
let dosbox: any = null;
let runtimeInstance: any = null;

function installAudioContextTracker() {
  const w = window as any;
  if (w.__doomAudioTrackerInstalled) return;
  w.__doomAudioTrackerInstalled = true;

  const OriginalAudioContext = w.AudioContext || w.webkitAudioContext;
  if (!OriginalAudioContext) return;

  const WrappedAudioContext = function (this: AudioContext, ...args: any[]) {
    const ctx = new OriginalAudioContext(...args);
    trackedAudioContexts.add(ctx);
    return ctx;
  } as any;

  WrappedAudioContext.prototype = OriginalAudioContext.prototype;
  w.AudioContext = WrappedAudioContext;
  w.webkitAudioContext = WrappedAudioContext;
}

function runDoom() {
  if (!dosbox) {
    dosbox = new Dosbox({
      id: 'dosbox',
      onload: function (instance: any) {
        runtimeInstance = instance;
        instance.run('https://js-dos.com/cdn/upload/DOOM-@evilution.zip', './DOOM/DOOM.EXE');
      },
      onrun: function (instance: any, app: string) {
        runtimeInstance = instance;
        console.log("App '" + app + "' is runned");
      }
    });
  }
}

export function stopDoom() {
  try {
    runtimeInstance?.stop?.();
    runtimeInstance?.exit?.();
    runtimeInstance?.destroy?.();
    dosbox?.stop?.();
    dosbox?.exit?.();
    dosbox?.destroy?.();
  } catch (_) {}

  runtimeInstance = null;
  dosbox = null;

  const host = document.getElementById('dosbox');
  if (host) {
    host.replaceChildren();
  }

  trackedAudioContexts.forEach((ctx) => {
    try {
      ctx.suspend();
      ctx.close();
    } catch (_) {}
  });
  trackedAudioContexts.clear();

  const mediaEls = document.querySelectorAll('audio, video');
  mediaEls.forEach((el) => {
    if (el instanceof HTMLMediaElement) {
      el.pause();
      el.currentTime = 0;
      el.muted = true;
      el.src = '';
      el.load();
    }
  });
}

const DoomPlayer: React.FC = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    installAudioContextTracker();
    // Bloqueia a execucao dupla do React 18 (StrictMode)
    if (isInitialized.current) return;
    isInitialized.current = true;

    const timeoutId = setTimeout(runDoom, 800);

    return () => {
      clearTimeout(timeoutId);
      stopDoom();
      isInitialized.current = false;
    };
  }, []);

  return (
    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">
      <style>{`
        .dosbox-container { width: 100% !important; height: 100% !important; background: #000; }
        .jsdos-canvas { width: 100% !important; height: 100% !important; }
      `}</style>

      <div className="flex-grow relative bg-black">
        <div id="dosbox" className="absolute inset-0 w-full h-full" />
      </div>

      <div className="p-2 bg-[#c0c0c0] text-[10px] border-t border-gray-600 font-mono flex justify-between flex-shrink-0 text-black select-none">
        <span>[SYSTEM]: js-dos </span>
        <span>if it is slow, reload the page</span>
        <span>CONTROLS: ARROWS / S </span>
      </div>
    </div>
  );
};

export default DoomPlayer;

