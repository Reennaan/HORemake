
import React, { useEffect, useRef } from 'react';

interface Props {
  assetBase: string;
}

const WinampWrapper: React.FC<Props> = ({ assetBase }) => {
  const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const initWebamp = async () => {
      // @ts-ignore
      if (window.Webamp && containerRef.current) {
        // @ts-ignore
        const webamp = new window.Webamp({
          initialTracks: [{
            metaData: { artist: "Final Fantasy IX", title: "Fairy Battle" },
            url: import.meta.env.BASE_URL+ "sounds/fairy-battle.mp3",
            
          }],
          initialSkin: { url: `${assetBase}img/reiayanami_winskin.wsz` }
        });
        await webamp.renderWhenReady(containerRef.current);
        webamp.appendTracks([
          {url: import.meta.env.BASE_URL+ 'sounds/into-the-depths-catacombs.mp3'},
          {url: import.meta.env.BASE_URL+ 'sounds/fallen-down.mp3'},
        ]);




      }
    };
    console.log(import.meta.env.BASE_URL);
    initWebamp();
  }, [assetBase]);

  return (
    <div className="fixed top-[26.5vh] right-[24%] z-[50] pointer-events-auto" ref={containerRef}>

    </div>
  );
};

export default WinampWrapper;
