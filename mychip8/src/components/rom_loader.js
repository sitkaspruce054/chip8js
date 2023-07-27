import { RomReader } from "./rom_reader";

async function rom_loader(raw_file){
    
    //console.log('testsdfsdfsdf')
    
    
    const arr_buffer = await raw_file.arrayBuffer()
    //console.log(arr_buffer,'ssdsdsdssssds')
    //console.log('asdasduasdiuhdsfiugahsdifuhsadifhusaiguhafsdiufhasdfhasidufhsaidu')
    const uint8_disp = new Uint8Array(arr_buffer)
    const rom_buffer = new RomReader(uint8_disp)
    //console.log(rom_buffer)
    
    return rom_buffer
  }

  export { rom_loader}