import { Chip8_CPU } from "./cpu";
//import ibm from './IBM.ch8'
import Display from "./Display";
import React from "react";


import { useState, useContext } from "react";
import { useEffect } from "react";
import Keyboard from "./Keyboard";
import ibm from './roms/IBM'
import tetris from './roms/TETRIS'
import pong from './roms/PONG'
import test1 from './roms/TEST1'
import test2 from './roms/TEST2'
import test3 from './roms/TEST3'


import brix from './roms/BRIX'
import blink from './roms/BLINKY'

import dan from './roms/DAN'

/** OVERALL STRUCTURE:
 * 
 * The Display component receives the current program, the setter function for pressed key, and the currently pressed key, and passes this to the Emulator. The latter two are received from a controller component that monitors inputs. 
 * This component should be in charge of initializing the CPU, loading the desired file into the CPU, and beginning execution loop
 */
 async function loadRom(){
    const response = await fetch(ibm)
    //console.log(response,'sd')
    let buff = await response.arrayBuffer()
    
    //console.log(buff,'buffy')
    return buff
    
}


function Emulator(){
    const [program, setProgram] = useState();
    const [currentKey, updateKey] = useState();
    useEffect(()=>{
        ///console.log('called')
        let a = loadRom()
        a.then(function(result){setProgram(new Uint8Array(result))})
        //console.log(program,'a')
    },[])


   

    

    
    
    
    
   
    
   
    
    
    return(
        <div className='emulator'>
            <Display current_program ={ program } currentKey = { currentKey} updateKey = { updateKey }></Display>
            
            
        </div>
    )
}

export default Emulator