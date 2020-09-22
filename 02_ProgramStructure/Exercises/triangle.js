// https://eloquent-javascript.karmazzin.ru/chapter2#treugolnik-v-cikle
// https://eloquentjavascript.net/2nd_edition/02_program_structure.html
// https://eloquentjavascript.net/code/#2.1

// Looping a triangle
// ===================

const HEIGHT = 7;
const SYMBOL = '#';
for (let i = 0; i < HEIGHT; ++i) {
  console.log(SYMBOL.repeat(i + 1));
}
