
import { INSTRUCTION_SET } from "./instructions"

import { RomReader } from "./rom_reader"
import { rom_loader } from "./rom_loader"
import disassemble from "./dissasembler"
import React from "react"
//import { error } from "console"



class Chip8_CPU {
    constructor(current_program) {
        
        this.internal_display = new Array(64*32).fill(0)
        //console.log(setDisplayState,'wasdasdasda')
        
        
        this.current_program = current_program.data
        // the original chip8 used 4096 bytes
        this.memory = new Uint8Array(4096)
        // 16 registers: V0x0, V0x1, V0x2,... V0xF (hexadecimal)
        this.registers = new Uint8Array(16)
        // a special register used to read/write at a given location in memory
        this.Index_Register = 0

        // the chip8 uses a stack to keep track of subroutines; 16 slots means 16 possible subroutines.
        this.Stack = new Uint16Array(16)
        this.keyMap = [
            'Digit1','Digit2','Digit3','Digit4',
            'KeyQ','KeyS','KeyD','KeyR',
            'KeyA','KeyS','KeyD','KeyF',
            'KeyZ','KeyX','KeyC','KeyV'
    
        ]
        // a pointer we'll use to reference the stack
        this.Stack_ptr = -1

        //The chip8 has a sound and delay timer
        this.sound_timer = 0
        this.delay_timer = 0

        //Our program counter:
        this.program_counter = 0x200
        this.isHalted = false


    }
    reset(){
        
        // the original chip8 used 4096 bytes
        this.memory = new Uint8Array(4096)
        // 16 registers: V0x0, V0x1, V0x2,... V0xF (hexadecimal)
        this.registers = new Uint8Array(16)
        // a special register used to read/write at a given location in memory
        this.Index_Register = 0

        // the chip8 uses a stack to keep track of subroutines; 16 slots means 16 possible subroutines.
        this.Stack = new Uint16Array(16)

        // a pointer we'll use to reference the stack
        this.Stack_ptr = -1

        //The chip8 has a sound and delay timer
        this.sound_timer = 0
        this.delay_timer = 0

        //Our program counter:
        this.program_counter = 0x200
    }
    load(romBuffer){
        this.reset()
        romBuffer.forEach((op_code, i) =>{
            this.memory[i] = this.decode(op_code)
        })
        
    }
    tick(){
        if(this.delay_timer > 0){
            this.delay_timer --
        }
        if(this.sound_timer > 0){
            this.sound_timer --
        }
    }
    addSpritestoMem(){

        const internal_font = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ]

        for (let index = 0; index < internal_font.length; index++) {
            this.memory[index] = internal_font[index]
            
        }

    }
    
    fetch() {
        return (this.memory[this.program_counter] << 8 | this.memory[this.program_counter + 1] << 0)
    }

    decode(opcode) {
        return disassemble(opcode)
    }

    execute(instruction,currentKey,context) {
        
        const id = instruction.instruction.id
        
        const args = instruction.args
        //console.log(id,args)
        switch (id) {
            case 'DRW_VX_VY_NIBBLE':
                let x_coord = this.registers[args[0]] % 64
                let y_coord = this.registers[args[1]] & (32-1)
                let sprite_height = args[2] // stored in the last nibble
                let row_start = this.Index_Register
                let row_end = this.Index_Register + args[2]
                let regVF = 0
                for(row_start,y_coord; y_coord < 32 && row_start < row_end; row_start++, y_coord++){
                    let sprite_row = this.memory[row_start];
                    for(let j = 1 << 7,x = x_coord; j> 0 && x < 64; j >>=1,x+=1){
                        if((sprite_row & j)===0){
                            continue

                        }
                        if(this.internal_display[(y_coord * 64)+x] != 0){
                            regVF = 1
                            this.internal_display[(y_coord * 64)+x] = 0
                            
                        }
                        else if(this.internal_display[(y_coord * 64)+x] == 0){
                            this.internal_display[(y_coord * 64)+x] = 1
                        }
                    }
                    this.registers[0xf] = regVF
                }
                //console.log(this.display)
                this.render(context)
                

        
                break
            case 'CLS':
                this.internal_display = new Array(64*32).fill(0)
                this.render(context)
                break
            case 'ADD_VX_VY':
                this.registers[args[0]] += this.registers[args[1]]
                if(this.registers[args[0]] += this.registers[args[1]] > 255){
                    this.registers[0xF] = 1
                }
                break
            case 'JP_ADDR':
                this.program_counter = args[0] 
                
                break
            case 'CALL_ADDR':
                this.Stack_ptr = this.Stack_ptr + 1
                this.Stack[this.Stack_ptr] = this.program_counter 
                this.program_counter = args[0] 
                break
            case 'RET':
                console.log('zsdadasdasd')
                this.program_counter = this.Stack[this.Stack_ptr];
                this.Stack_ptr = this.Stack_ptr - 1
                
                
                break
            case 'SE_VX_BTYE':
                let val = this.registers[[args[0]]]
                if(val === args[1]){
                    this.program_counter += 2
                }
                break
            case 'LD_I_ADDR':
                
                this.Index_Register = args[0]
                console.log(this.Index_Register)
                break
            case 'LD_VX_BYTE':
                this.registers[args[0]] = args[1]
                console.log(this.registers[args[0]])
                
                break
            case 'JP_ADDR':
                this.program_counter = args[0]
                break
            case 'ADD_VX_BYTE':
                this.registers[args[0]] += args[1]
                break
            case 'SNE_VX_BYTE':
                if(this.registers[[args[0]]] != args[1]){
                    this.program_counter += 2
                }
                break
            case 'SE_VX_BYTE':
                if(this.registers[[args[0]]] == args[1]){
                    this.program_counter +=2
                }
                break
            case 'SE_VX_VY':
                if(this.registers[args[0]] == this.registers[args[1]]){
                    this.program_counter += 2

                }
                break
            case 'LD_VX_VY':
                this.registers[args[0]] = this.registers[args[1]]
                break
            case 'OR_VX_VY':
                this.registers[args[0]] = this.registers[args[0]] | this.registers[[args[1]]]
                break
            case 'AND_VX_VY':
                this.registers[args[0]] =this.registers[args[0]] & this.registers[args[1]]
                break
            case 'XOR_VX_VY':
                this.registers[args[0]] = this.registers[args[0]] ^= this.registers[args[1]]
                break
            case 'SUB_VX_VY':
                if(this.registers[args[0]]>this.registers[args[1]]){
                    this.registers[0xF] = 1
                }else{
                    this.registers[0xF] = 0
                }
                this.registers[args[0]] = this.registers[args[0]] - this.registers[args[1]]
                break
            case 'SHR_VX_VY':
                //TODO: reconfigure based on implementation
                this.registers[0xf] = this.registers[args[0]] & 1
                this.registers[args[0]] >>= 1
                break
            case 'SHL_VX_VY':
                //8xyE
                this.registers[0xf] = this.registers[args[0]] >> 7 & 1
                this.registers[args[0]] <<=1 % (1 << 8)
                break
            case 'SUBN_VX_VY':
                //8xy7
                if(this.registers[args[1]]> this.registers[args[0]]){
                    this.registers[0xF] = 1
                }else{
                    this.registers[0xF] = 0
                }
                this.registers[args[0]] = this.registers[args[1]] - this.registers[args[0]]
                break
            case 'SNE_VX_VY':
                if(this.registers[args[0]] !== this.registers[args[1]]){
                    this.program_counter += 2
                }
                break
            case 'RND_VX_BYTE':
                let rand = Math.floor(Math.random()*0xff)
                this.registers[args[0]] = args[1] & rand
                break
            case 'JP_V0_ADDR':
                this.program_counter = this.registers[0] + args[1]
                break
            case 'SKP_VX':
                if(currentKey == args[0]){
                    this.program_counter += 2
                }
                break
            case 'SKNP_VX':
                if(currentKey != args[0]){
                    this.program_counter += 2
                }
                break
            case 'LD_VX_DT':
                this.registers[args[0]] = this.delay_timer
                break
            case 'LD_VX_K':
                if(currentKey && this.keyMap.includes(currentKey)){
                    this.registers[args[0]] = this.keyMap.indexOf(currentKey)
                }else{
                    this.program_counter-=2
                }
                break
            case 'LD_DT_VX':
                this.delay_timer = this.registers[args[0]]
                break
            case 'LD_ST_VX':
                this.sound_timer = this.registers[args[0]]
                break
            case 'ADD_I_VX':
                this.Index_Register = this.Index_Register + this.registers[args[0]]
                break
            case 'LD_F_VX':
                this.Index_Register = (this.registers[args[0]] & (0xF))*5;
                break
            case 'LD_B_VX':
                let hundreds = Math.floor(this.registers[args[0]] / 100)
                let tens = Math.floor((this.registers[args[0]] - (hundreds*100)) / 10)
                let ones = Math.floor(this.registers[args[0]] % 10)
                this.registers[this.Index_Register] = hundreds
                this.registers[this.Index_Register+1] = tens
                this.registers[this.Index_Register+2] = ones
                break
            case 'LD_I_VX':
                for (let reg_ct = 0; reg_ct <  args[0]; reg_ct++) {
                    this.memory[this.Index_Register+reg_ct] = this.registers[reg_ct]
                    
                    
                }
                break
            case 'LD_VX_I':
                for (let reg_ct = 0; reg_ct <  args[0]; reg_ct++) {
                    this.registers[reg_ct] = this.memory[this.Index_Register+reg_ct]
                        
                        
                }
                break
            
            



            default:
                console.log(id, instruction)
                this.isHalted = true
            
                
        }
    }
    halt(){
        throw new Error("THE CPU HAS HALTED")
    }
    loadIntoMem(ROM){
        let mem_start = 512
        for (let index = 0; index < ROM.length; index++) {
            this.memory[mem_start+2 * index] = ROM[index] >> 8
            this.memory[mem_start+2 * index+1] = ROM[index] & 0x00ff
            
            
        }
    }
    // this is the main loop
   
    step(currentKey,context) {
        if(this.isHalted){
            
            return
        }
        const opcode = this.fetch()
        //console.log(opcode,'cur_code')
        this.program_counter += 2
        const instruction = this.decode(opcode)
        //console.log(instruction,'instr')

        this.execute(instruction,currentKey,context)
        

        
    }
    render(context){
        
        for (let index = 0; index < this.internal_display.length; index++) {
            let x_coord = index % 64
            let y_coord = Math.floor(index /64)

            context.fillStyle = this.internal_display[index] ? 'white' : 'black';
            context.fillRect(x_coord * 10,y_coord * 10,10,10);

            
        }
        console.log('render complete')

    }
}

export { Chip8_CPU }