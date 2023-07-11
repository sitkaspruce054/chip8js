import { Chip8_CPU } from "./cpu";
//import ibm from './IBM.ch8'
import Display from "./rocc";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import Keyboard from "./Keyboard";
import ibm from './roms/IBM'
import tetris from './roms/TETRIS'

/** OVERALL STRUCTURE:
 * 
 * The Display component receives the current program, the setter function for pressed key, and the currently pressed key, and passes this to the Emulator. The latter two are received from a controller component that monitors inputs. 
 * This component should be in charge of initializing the CPU, loading the desired file into the CPU, and beginning execution loop
 */
 async function loadRom(){
    const response = await fetch(tetris)
    console.log(response,'sd')
    let buff = await response.arrayBuffer()
    
    console.log(buff,'buffy')
    return buff
    
}


function Emulator(){
    const [program, setProgram] = useState();
  
    useEffect(()=>{
        ///console.log('called')
        let a = loadRom()
        a.then(function(result){setProgram(new Uint8Array(result))})
        //console.log(program,'a')
    },[])

    

    
    
    
    
   
    
   
    
    
    return(
        <Display current_program ={program}></Display>
    )
}

export default Emulator