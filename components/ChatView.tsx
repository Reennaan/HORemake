
import React, { useEffect, useRef, useState } from 'react';

    
    function ChatView(){
       

     return (
  

    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">  
      <div className="flex-grow relative bg-black">
        <iframe className="absolute inset-0 w-full h-full w-[95vw] md:w-[545px] h-[60vh] md:h-[17.5rem] z-[1001]" src="https://my.cbox.ws/hiddenchat"></iframe>
      </div>
    </div>

    );

    }


export default ChatView;