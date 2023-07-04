

class Chip8_CPU{
    constructor() {
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


    }

    
}