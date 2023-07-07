


 const INSTRUCTION_SET = [
    //00E0
    {
        id: 'CLS',

        name: 'CLS',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0x00ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0x00E0,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            
            
        ]
    }, 

    //00EE RET
    {
        id: 'RET',

        name: 'RET',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0x00ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0x00EE,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            
            
        ]
    },

    //1nnn: JP addr
    {
        id: 'JP_ADDR',

        name: 'JP',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0x1000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            
            { mask: 0x0fff, shift: 0, type: 'NNN'}
        ]
    },

     //2nnn: CALL addr
     {
        id: 'CALL_ADDR',

        name: 'CALL',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0x2000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            
            { mask: 0x0fff, shift: 0, type: 'NNN'}
        ]
    },

    //3xkk: SE Vx, byte
    {
        id: 'SE_VX_BYTE',

        name: 'SE',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0x3000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00ff, shift: 0, type: 'KK'}
        ]
    },

    //4xkk: SNE Vx, byte
    {
        id: 'SNE_VX_BYTE',

        name: 'SNE',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0x4000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00ff, shift: 0, type: 'KK'}
        ]
    },

    //5xy0: SE Vx, Vy
    {
        id: 'LD_VX_byte',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x5000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    //6Xkk: LD Vx, byte
    {
        id: 'LD_VX_byte',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0x6000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00ff, shift: 0, type: 'KK'}
        ]
    },

    //7Xkk: ADD Vx, byte
    {
        id: 'ADD_VX_byte',

        name: 'ADD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0x7000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00ff, shift: 0, type: 'KK'}
        ]
    },

    //8xy0: LD Vx, Vy
    {
        id: 'OR_VX_VY',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },
    
    //8xy1: OR Vx, Vy
    {
        id: 'OR_VX_VY',

        name: 'OR',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8001,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    //8xy2: AND Vx, Vy
    {
        id: 'AND_VX_VY',

        name: 'AND',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8002,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },


    //8xy3: XOR Vx, Vy
    {
        id: 'XOR_VX_VY',

        name: 'XOR',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8003,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    //8xy4: ADD Vx, Vy
    {
        id: 'ADD_VX_VY',

        name: 'ADD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8004,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },
    // 8xy5: SUB Vx, Vy
    {
        id: 'SUB_VX_VY',

        name: 'SUB',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8005,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    // 8xy6: SHR Vx {, Vy}
    {
        id: 'SHR_Vx_{Vy}',

        name: 'SHR',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8006,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    // 8xy7: SUBN Vx, Vy
    {
        id: 'SUBN_Vx_Vy',

        name: 'SUBN',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x8007,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    // 8xyE: SHL Vx {, Vy}
    {
        id: 'SHL_Vx,{,Vy}',

        name: 'SHL',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x800E,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    // 9xy0: SNE Vx,Vy
    {
        id: 'SNE_Vx_Vy',

        name: 'SNE',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf00f,
        //the pattern we get from using the bitmask correctly
        pattern: 0x9000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},
            { mask: 0x00f0, shift: 4, type: 'R'}
        ]
    },

    // Annn: LD I,addr
    {
        id: 'LD_I_ADDR',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0xA000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0fff, shift : 8, type: 'LD'},
            
        ]
    },

    {
        id: 'JP_VO_ADDR',

        name: 'JP',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0xB000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0fff, shift : 8, type: 'NNN'},
            
        ]
    },
    //Cxkk
    {
        id: 'RND_VX_BYTE',

        name: 'RND',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0xC000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            { mask : 0x0f00, shift : 8, type: 'R'},

            { mask: 0x00ff, shift : 0, type: 'KK'}
            
        ]
    },

    //Dxyn
    {
        id: 'DRW_Vx_Vy_NIBBLE',

        name: 'DRW',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf000,
        //the pattern we get from using the bitmask correctly
        pattern: 0xD000,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [

            { mask : 0x0f00, shift : 8, type: 'R'},

            { mask: 0x00f0, shift : 4, type: 'R'},

            { mask: 0xfff0, shift: 0, type: 'N'}
            
        ]
    },

    //Ex9E
    {
        id: 'SKP_VX',

        name: 'SKP',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xE09E,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //ExA1
    {
        id: 'SKNP_Vx',

        name: 'SKNP',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xE0A1,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

     //Fx07
     {
        id: 'LD_Vx_DT',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF007,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx0A
    {
        id: 'LD_Vx_K',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF00A,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },


    //Fx15
    {
        id: 'LD_DT_Vx',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF015,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx18
    {
        id: 'LD_ST_Vx',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF018,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx1E
    {
        id: 'ADD_I_VX',

        name: 'ADD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF01E,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx29
    {
        id: 'LD_F_Vx',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF029,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx33
    {
        id: 'LD_B_Vx',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF033,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx33
    {
        id: 'LD_B_Vx',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF033,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

     //Fx55
     {
        id: 'LD_[I]_Vx',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF055,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },

    //Fx65
    {
        id: 'LD_Vx_I',

        name: 'LD',
        
        // the bitmask we use to get the pattern for the instruction
        mask: 0xf0ff,
        //the pattern we get from using the bitmask correctly
        pattern: 0xF065,

        // the arguments
            // mask: the bitmask we must use to get the variables
            //shift: the right-shift we must use to get the values
            //type: the type of variable
        arguments: [
            //Vx
            { mask : 0x0f00, shift : 8, type: 'R'},

           
            
        ]
    },
]

export { INSTRUCTION_SET }