//We'll use the canvas to run the CPU cycle, since the state of the canvas is dependent on state transitions in the CPU component. We pass in current_program (passed in from ./Emulator), [setKey, and KeyPressed] are
//derived from the controller class, and with each successive CPU iteration we will pass in what/which(? can the CHIP8 support multiple keypresses simultaneously?) key is currently being pressed, as this will help in executing
//certain opcodes

//this will be how we render the screen itself, using the global context

import React, { useEffect, useRef, useContext,useState } from "react";
import displayContext from "./displayContext";
import { Chip8_CPU } from "./cpu";
/**OVERALL STRUCTURE
 * 
 * This component will mediate the cpu flow, taking in the currentProgram, key-setting function, and the currently pressed key. It will use the useEffect to load in the file, listen for keys pressed, as well as to loop the cpu (using 
 * cpustate and keypressed as dependencies )
 */
function Display({ current_program, activeKey, keyPressed }) {
  const [cpu_state, set_cpu_state] = useState();

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.fillStyle = 'black'
    context.fillRect(0,0,context.canvas.width,context.canvas.height)


  },);

  useEffect(()=>{
    //console.log('zaza
    if(current_program){
      console.log('here')
      console.log(current_program)
      set_cpu_state(new Chip8_CPU(current_program))
      cpu_state.loadRom(current_program)
    }
    else{
      return
    }
  },[current_program]);


  return (
    <>
      <canvas ref={canvasRef} height={320} width={640}/>
    </>
  );
}

export default Display

