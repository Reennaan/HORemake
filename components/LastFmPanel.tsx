
import React, { useState, useEffect } from 'react';
import { Album } from '../types';

interface Props {
  assetBase: string;
}

const LastFmPanel: React.FC<Props> = ({ assetBase }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      const albumUrl = "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=Shalashaska-&api_key=0929ed3fd3c3e7b2319317afda26a1cc&format=json&limit=5&period=7day";
      try {
        const response = await fetch(albumUrl);
        const data = await response.json();
        if (data.topalbums && data.topalbums.album) {
          const fetchedAlbums = data.topalbums.album.map((album: any) => ({
            name: album.name,
            artist: album.artist.name,
            image: album.image.find((img: any) => img.size === "large")["#text"] || "https://via.placeholder.com/64",
            url: album.url
          }));
          setAlbums(fetchedAlbums);
        }
      } catch (error) {
        console.error("Error fetching Last.fm albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAlbums();
  }, []);

  return (
    <div className="win95-border p-3 bg-white h-full overflow-hidden flex flex-col min-h-[17rem]">
      <h3 className="text-xs font-bold border-b mb-2 flex-shrink-0">Top albums of the week</h3>
      <div className="space-y-2 flex-grow overflow-y-auto no-scrollbar pr-0">
        {loading ? (
          <div className="text-[10px] animate-pulse">Scanning database...</div>
        ) : albums.length > 0 ? (
          albums.map((album, i) => (
            <div 
              key={i} 
              onClick={() => window.open(album.url, '_blank')}
              className="flex items-center gap-2 text-[.625rem] hover:bg-blue-100 p-1 cursor-pointer relative group"
            >
              <div className="relative flex-shrink-0">
                <img src={album.image} alt={album.name} className="w-10 h-10 win95-border object-cover" />
                <img 
                  src={`${assetBase}img/setabemmassa.png`} 
                  className="absolute -bottom-1 -left-1 w-3 h-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </div>
              <div className="truncate flex-grow leading-tight">
                {album.name.length > 45 ? (
                  React.createElement('marquee', { scrollamount: "2", className: "font-bold block" }, album.name)
                ) : (
                  <p className="font-bold truncate">{album.name}</p>
                )}
                <p className="text-gray-500 truncate">{album.artist}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[10px]">No recent auditory data.</div>
        )}
      </div>
    </div>
  );
};

export default LastFmPanel;
