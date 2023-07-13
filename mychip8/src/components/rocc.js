//We'll use the canvas to run the CPU cycle, since the state of the canvas is dependent on state transitions in the CPU component. We pass in current_program (passed in from ./Emulator), [setKey, and KeyPressed] are
//derived from the controller class, and with each successive CPU iteration we will pass in what/which(? can the CHIP8 support multiple keypresses simultaneously?) key is currently being pressed, as this will help in executing
//certain opcodes

//this will be how we render the screen itself, using the global context

import React, { useEffect, useRef, useContext,useState } from "react";
import { RomReader } from "./rom_reader";
import displayContext from "./displayContext";
import { Chip8_CPU } from "./cpu";
/**OVERALL STRUCTURE
 * 
 * This component will mediate the cpu flow, taking in the currentProgram, key-setting function, and the currently pressed key. It will use the useEffect to load in the file, listen for keys pressed, as well as to loop the cpu (using 
 * cpustate and keypressed as dependencies )
 */
function Display({ current_program, currentKey, onKeyPress }) {
  const [cpu_state, set_cpu_state] = useState();

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.fillStyle = 'black'
    context.fillRect(0,0,context.canvas.width,context.canvas.height)


  },[]);
  
  useEffect(()=>{
    document.addEventListener('keydown', (event)=>{
      event.preventDefault()
      onKeyPress(event.code)
    })
    document.addEventListener('keyup',(event)=>{
      event.preventDefault()
      onKeyPress(null)
    })
    return() =>{
      document.removeEventListener('keydown',()=>onKeyPress(null))
      document.removeEventListener('keyup',()=>onKeyPress(null))
    }

    
  },)
  useEffect(()=>{
    
    if(current_program){
      //console.log('here')
      
      
      let parsed_prgm = new RomReader(current_program)
      
      let new_state = new Chip8_CPU(parsed_prgm)
      //console.log(new_state.current_program)
      
      set_cpu_state(new_state)
      

      //cpu_state.rom_loader()
      
    }
    else{
      return
    }
  },[current_program]);
  //console.log(cpu_state)
  let timer = 0
  useEffect(()=>{
    console.log(timer)
    if(cpu_state){
      
      cpu_state.addSpritestoMem()
      cpu_state.loadIntoMem(cpu_state.current_program)
      //console.log(cpu_state)
      setInterval(() => {
        //console.log('in here now')
        timer += 1
        console.log(timer)
        if(timer % 5 === 0){
          cpu_state.tick()
          timer = 0
        }
        cpu_state.step(currentKey,canvasRef.current.getContext('2d'))
    }, 3);

    return ()=> clearInterval()
    }
    else{
      //console.log('shhshs')
      return
    }
    
},[cpu_state,currentKey])
/**
 * 

    useEffect(()=>{
      if(cpu_state){
        const timer_interval = setInterval(()=>{
          if(cpu_state.delay_timer > 0){
            cpu_state.delay_timer -- ;
          }
          if(cpu_state.sound_timer > 0){
            cpu_state.sound_timer --
            
          }
      
        
          cpu_state.render(canvasRef.current.getContext('2d'));
          
        },2);

        return ()=> clearInterval(timer_interval)
      }

  
},[cpu_state])
*/
  return (
    <>
      <canvas ref={canvasRef} height={320} width={640}/>
    </>
  );
}

export default Display

