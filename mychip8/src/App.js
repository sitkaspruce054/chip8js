import logo from './logo.svg';
import './App.css';
import Emulator from './components/Emulator'
import displayContext from './components/displayContext'
import React from 'react';
import { useState } from 'react';
import 'react-dom'



function App(){
  const [displayState, setDisplayState ] = useState(new Array(64*32).fill(0))
  return(
    
    <>
      <h1 >Chip8 Emulator</h1>
      <Emulator props ={{displayState,setDisplayState}}/>
    </>
  )
}

//testsads
export default App;
