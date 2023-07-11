

// we'll need a way to "parse" the contents of the rom file
import   { INSTRUCTION_SET } from './instructions'

function disassemble(opcode) {
    //process the instruction
    const instruction = INSTRUCTION_SET.find(
        (instruction) => (opcode & instruction.mask) === instruction.pattern
    )

    console.log(instruction,'zazazaza')
    //console.log(instruction.arguments, opcode)
    const args = instruction.arguments.map((arg) => (opcode & arg.mask) >> arg.shift)
    console.log(args)

    return { instruction,args }
}

export default disassemble