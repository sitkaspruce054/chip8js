import React from "react";
import { useEffect, } from "react";
import { useState } from "react";


function Keyboard({onKeyPress}){
    const [coolDown, setCoolDown] = useState(false);
    function onClick(event,key){
        event.preventDefault();
        onKeyPress(key);
        if(!coolDown){
            setCoolDown(true);
            setTimeout(()=>{onKeyPress(null);setCoolDown(false);}, 200)
        }
    }

    return(
        <div></div>
    )
}

export default Keyboard