
import React, { useState } from 'react';

interface Props {
  name: string;
  iconUrl: string;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<Props> = ({ name, iconUrl, onDoubleClick }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div 
      className={`w-20 flex flex-col items-center gap-1 cursor-pointer p-2 ${selected ? 'bg-blue-900/40 outline-dashed outline-1 outline-white' : ''}`}
      onClick={() => setSelected(!selected)}
      onDoubleClick={onDoubleClick}
    >
      <img src={iconUrl} alt={name} className="w-10 h-10 drop-shadow-lg" />
      <span className="text-[11px] text-white text-center leading-tight drop-shadow-[1px_1px_black]">
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;
