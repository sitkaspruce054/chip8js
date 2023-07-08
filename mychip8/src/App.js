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
    
    <displayContext.Provider value={{displayState,setDisplayState}}>
      <h1>emu</h1>
      <Emulator props ={{displayState,setDisplayState}}/>
    </displayContext.Provider>
  )
}


export default App;
