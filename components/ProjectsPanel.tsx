
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  { date: '2026/02/06', name: 'Soul Extractor', status: 'Done', url: '' },
  { date: '2026/01/31', name: 'HORemake', status: 'Done', url: 'https://github.com/Reennaan/HORemake' },
  { date: '2025/09/21', name: 'HiddenHiddenThoughts', status: 'Done', url: 'https://hiddenwoods.neocities.org/blog' },
  { date: '2025/09/07', name: 'TitanicKaggle', status: 'Done', url: 'https://github.com/Reennaan/Titanic_desafio' },
  { date: '2025/08/14', name: 'ExperimentZero', status: 'Done', url: 'https://github.com/Reennaan/ExperimentZero' },
  { date: '2025/01/25', name: 'Mango', status: 'Down', url: 'https://github.com/Reennaan/joguinho' },
  { date: '2025/01/25', name: 'Unknown', status: 'Done', url: 'https://github.com/Reennaan/unknown-soldier'},
  { date: '2024/01/25', name: 'Minesweeper', status: 'Done', url:'https://reennaan.github.io/Minesweeper/'},
  { date: '2024/09/03', name: 'Naointendorip', status: "Down", url: "https://github.com/Reennaan/Naointendorip"},
  { date: '2024/09/03', name: "naointendoripAPI", status: 'Down', url:"https://github.com/Reennaan/naointendoripAPI" }
];

const ProjectsPanel: React.FC = () => {
  return (
    <div className="win95-border p-4 bg-white">
      <h3 className="text-sm font-bold border-b mb-2">Summary.txt</h3>
      <div className="space-y-1 font-mono text-[11px] h-32 overflow-y-auto bg-gray-50 p-2 border inset-shadow">
        {projects.map((p, i) => (
          <div key={i} className="flex justify-between hover:bg-blue-800 hover:text-white group cursor-pointer px-1">
            <span>[{p.date}] <span className="group-hover:underline">{p.name}</span></span>
            <span className={p.status === 'Down' ? 'text-red-600 group-hover:text-red-200' : 'text-green-600 group-hover:text-green-200'}>[{p.status}]</span>
          </div>
        ))}
      </div>
      <br />
      
       
       <marquee>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <img src={import.meta.env.BASE_URL+"img/buttons/125.png"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/bestviewed.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/goodwithcomupter.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/ie4.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/best_chrome.gif"} />
            <a href="https://neocities.org">
              <img src={import.meta.env.BASE_URL+"img/buttons/neocities2.gif"} />
            </a>
            <img src={import.meta.env.BASE_URL+"img/buttons/java2.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/ilikecomputer.png"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/madewithnotepad2.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/mangoad.gif"} />
            <a href="https://neocities.org">
              <img src={import.meta.env.BASE_URL+"img/buttons/neocities.gif"} />
            </a>
            <img src={import.meta.env.BASE_URL+"img/buttons/phonechump.gif"} />
            <a href="https://neocities.org">
              <img src={import.meta.env.BASE_URL+"img/buttons/neocitieschill.gif"} />
            </a>
            <img src={import.meta.env.BASE_URL+"img/buttons/wwwbutton.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/eyes2.gif"} />
            <img src={import.meta.env.BASE_URL+"img/buttons/handcoded.gif"} />
          </div>
        </marquee>


        
      
    </div>
  );
};

export default ProjectsPanel;
