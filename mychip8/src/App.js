import logo from './logo.svg';
import './App.css';
import { Chip8_CPU } from './components/cpu';
import { Interface } from './components/IoInterface';
import { RomReader } from './components/rom_reader';




function App() {
  const canvas = <canvas class="lmao"></canvas>
  const cpuInterface = new Interface()
  //const cpu = new Chip8_CPU(cpuInterface)
  const test = <div></div>
  
  cpuInterface.drawPixel(34,32,3)
  //cpuInterface.updateDisplay()
  document.body.appendChild(cpuInterface.display)
  
  
  
  
  return (
    <h1></h1>
  );
}

export default App;
