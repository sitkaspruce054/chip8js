import { Chip8_CPU } from "./cpu";

import Display from "./Display";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";

/** OVERALL STRUCTURE:
 * 
 * The Display component receives the current program, the setter function for pressed key, and the currently pressed key, and passes this to the Emulator. The latter two are received from a controller component that monitors inputs. 
 * This component should be in charge of initializing the CPU, loading the desired file into the CPU, and beginning execution loop
 */
function Emulator(){
    //console.log(props)
    const [cpuState, setcpuState] = useState();
    const [program, setProgram] = useState();

    const [input,setInput] = useState();
    //console.log(emulatorState.displayState)
    //emulatorState.refreshDisplay(23);
    return(
        <Display></Display>
    )
}

export default Emulator