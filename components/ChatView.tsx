
import React, { useEffect, useRef, useState } from 'react';

    
    function ChatView(){
        const [text,setText] = useState("");
        useEffect(() => {
            const load = async() =>{
            try{
                const token = "6bb8df91c86c17f9c4e6"
                const response = await fetch("https://cors.isomorphic-git.org/https://api.dontpad.com/hiddenchat111111.body.json?lastModified=0&session-token="+token)
                if(!response.ok){
                    throw new Error("deu merda: 69 code");
                }else{
                    const result = await response.json();
                    const bodyAny = (result as {body: string}).body;
                    setText(bodyAny);
                    console.log(bodyAny);
                }
            }catch (error){

            }
        };
        load();
    }, []);

     return (
    <div>
      <h3>Chat iniciado</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
    </div>
    );

    }


export default ChatView;