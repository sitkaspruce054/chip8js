import { Chip8_CPU } from "./cpu";
//import ibm from './IBM.ch8'
import Display from "./Display";
import React from "react";

import '../App.css';
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
 async function loadRom(prg){
    const response = await fetch(prg)
    //console.log(response,'sd')
    let buff = await response.arrayBuffer()
    
    //console.log(buff,'buffy')
    return buff
    
}


function Emulator(){
    const [program, setProgram] = useState();
    const [load_helper, set_load_helper] = useState(null);
    const [currentKey, updateKey] = useState();
    

    useEffect(()=>{
        console.log('called')
        if(load_helper){
            let a = loadRom(load_helper)
            a.then(function(result){setProgram(new Uint8Array(result))})
        //console.log(program,'a')
        }
    },[load_helper])
    


   const set_prog = async (e) =>{
        switch(e.target.value) {
            case "ibm":
                set_load_helper(ibm)
                break;
            case "tetris":
                set_load_helper(tetris)
                break
            case "brix":
                set_load_helper(brix)
            default:
                //set_load_helper(ibm)
                break

        }
   }

    

    
    
    
    
   
    
   
    
    
    return(
        <div className='emulator'>
            <Display current_program ={ program } currentKey = { currentKey} updateKey = { updateKey }>
                
            </Display>

            <select onChange={set_prog}>
                <option value="ibm">IBM Logo</option>
                <option value="tetris"> Tetris </option>
                <option value="brix"> Breakout </option>
                <option value="pong"> Pong </option>
            </select>
            
                
        </div>
    )
}

export default Emulator