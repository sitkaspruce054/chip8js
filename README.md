# chip8js

A simple chip8 emulator/ interpreter that runs in the web browser. 

Known bugs:
  1. Selecting a new program does not completely reset the display (i.e an old instance of the cpu persists). Only fix right now is to reload the page each time but I need to investigate further.



Works cited:

  http://devernay.free.fr/hacks/chip8/C8TECH10.HTM  : Some really old documentation on the CHIP8 memory map/ instruction set

  https://tobiasvl.github.io/blog/write-a-chip-8-emulator/ : A great high-level overview of the system

  https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/ : A blog I found helpful when writing this

  https://github.com/annovo/chip-8 An emulator I referenced for project layout purposes
