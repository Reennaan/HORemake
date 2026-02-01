
export interface Album {
  name: string;
  artist: string;
  image: string;
  url: string;
}

export interface Track {
  name: string;
  artist: string;
  album: string;
  url: string;
}

export interface Project {
  date: string;
  name: string;
  status: 'Done' | 'Down' | 'WIP';
  url: string;
}
