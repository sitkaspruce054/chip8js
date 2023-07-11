

class RomReader {

    constructor(fileItems) {
        this.data = []
        console.log(fileItems)
        const buffer = fileItems
        
        for(let i = 0; i < buffer.length; i += 2) {
            
            this.data.push((buffer[i] << 8) | (buffer[i+1] << 0))
        }
        
    }
}

export { RomReader }