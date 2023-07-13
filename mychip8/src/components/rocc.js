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
const keyMap = [
  'Digit1','Digit2','Digit3','Digit4',
  'KeyQ','KeyW','KeyE','KeyR',
  'KeyA','KeyS','KeyD','KeyF',
  'KeyZ','KeyX','KeyC','KeyV'

]
function Display({ current_program, currentKey,updateKey }) {
  
  const [cpu_state, set_cpu_state] = useState();
  const curr_key = useRef(0)

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.fillStyle = 'black'
    context.fillRect(0,0,context.canvas.width,context.canvas.height)


  },[]);
  
  
  useEffect(()=>{
    console.log('loading rom component mounted')
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

  useEffect(()=>{
    console.log('listener mounted')
    document.addEventListener('keydown', (ev)=>{
      ev.preventDefault();
      const key_index = keyMap.indexOf(ev.code)
      if(key_index){
        //valid keypress
        let key_bitmask = 1 << key_index
        curr_key.current = curr_key.current | key_bitmask
      }
      updateKey(ev.code);
      
    })
    document.addEventListener('keyup',()=>{
      updateKey(null)
      curr_key.current = 0
      curr_key.current = 0

    })
  },[])

  let timer = 0
  useEffect(()=>{
    console.log('cycle component mounted')
    console.log(timer)
    console.log(curr_key.current)
    if(cpu_state){
      
      cpu_state.addSpritestoMem()
      cpu_state.loadIntoMem(cpu_state.current_program)
      
      //console.log(cpu_state)
      setInterval(() => {
        //console.log('in here now')
        timer += 1
        console.log(timer)
        console.log(curr_key.current,'aasdasdasdasdasdasdasd')
        
        if(timer % 5 === 0){
          cpu_state.tick()
          timer = 0
        }
        cpu_state.step(curr_key.current,canvasRef.current.getContext('2d'))
    }, 3);

    return ()=> clearInterval()
    }
    else{
      //console.log('shhshs')
      return
    }
    
},[cpu_state]);
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
      <h2>the current key is {curr_key.current}</h2>
    </>
  );
}

export default Display

