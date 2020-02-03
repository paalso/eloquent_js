// https://eloquentjavascript.net/2nd_edition/02_program_structure.html

// Looping a triangle
// ===================

const HEIGHT = 7;
const SYMBOL = '#';
for (let i = 0; i < HEIGHT; ++i) {
  console.log(SYMBOL.repeat(i + 1));
}
