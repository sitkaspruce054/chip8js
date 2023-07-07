
//We need a way to process I/O for the CPU, so we'll create an interface class that the CPU class inherits from

class Interface{
    constructor(){
        
        this.display = document.createElement('canvas')
        console.log(this.display.nodeName)
        this.internal_display = new Array ( 64 * 32) // internal representation of the array
        console.log(this.internal_display)
        this.ctx = this.display.getContext('2d')
        //console.log(this.ctx)
        this.ctx.fillStyle = '#000'
        this.row_ct = 32
        this.col_ct = 64
        this.scalar = 15
        this.display.width = 64 * this.scalar
        this.display.height = 32 * this.scalar
        this.ctx.fillRect(0,0,this.display.width,this.display.height)
        


    }
    //for LDVXK
    
    //DRW
    drawPixel(x,y,value){
        
        let loc_pixel = x + (y * this.col_ct)

        this.internal_display[loc_pixel] ^= 1 // sprites are XOR'ed onscreen

        return !this.internal_display[loc_pixel]


    }
    //CLS
    clearDisplay(){
        this.internal_display = new Array(64 * 32)
    }

    updateDisplay(){
        this.ctx.clearRect(0,0,this.display.width,this.display.height)
        for (let index = 0; index < this.internal_display.length; index++) {
            let x_pos = ( index % this.col_ct ) * (this.scalar)
            let y_pos = Math.floor(index / this.col_ct) * (this.scalar)

            if(this.internal_display[index] == 1){
                //this.ctx.fillStyle= 'white'
                this.ctx.fillRect(x_pos,y_pos, this.scalar,this.scalar)
            }
            
        }
    }




}

export { Interface }