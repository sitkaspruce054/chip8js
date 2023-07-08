
import { INSTRUCTION_SET } from "./instructions"

import { RomReader } from "./rom_reader"

import disassemble from "./dissasembler"
import React from "react"
import { useState } from "react"
import { Interface } from "./Display"

class Chip8_CPU {
    constructor(file) {
        
        this.internal_display = new Array(32*64).fill(0)
        //console.log(setDisplayState,'wasdasdasda')
        
        //console.log(this.displayState)
        //console.log(this.displayState,'asdas')
        //this.setDisplayState = setDisplayState
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
        return this.memory[this.program_counter]
    }

    decode(opcode) {
        return disassemble(opcode)
    }

    execute(instruction) {
        const { id, args } = instruction

        switch (id) {
            case 'ADD_VX_VY':
                this.registers[args[0]] += this.registers[args[1]]
                this.program_counter = this.program_counter + 2
                break
            case 'JP_ADDR':
                this.program_counter = args[0]
                break
            case 'CALL_ADDR':
                this.Stack_ptr = this.Stack_ptr + 1
                this.Stack.push(this.program_counter)
                this.program_counter = args[0]
                break
            case 'RET':
                this.program_counter = this.Stack[this.Stack.length - 1];
                this.Stack_ptr = this.Stack_ptr - 1
                break
            case 'SE_VX_BTYE':
                if(this.registers[[args[0]]] == this.registers[[args[1]]]){
                    this.program_counter += 2
                }
        }
    }
    
    async loadRom(){
        const rom_file = await fetch(`./roms/IBM.ch8`)
        const arr_buffer = await rom_file.arrayBuffer()
        const uint8_disp = new Uint8Array(arr_buffer)
        const rom_buffer = new RomReader(uint8_disp)
        console.log(rom_buffer)
        this.interface.clearDisplay()
        this.load(rom_buffer)
      }
    // this is the main loop
    step() {
        const opcode = this.fetch()

        const instruction = this.decode(opcode)

        this.execute(instruction)
    }
}

export { Chip8_CPU }