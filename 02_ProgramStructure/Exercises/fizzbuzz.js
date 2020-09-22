// https://eloquent-javascript.karmazzin.ru/chapter2#fizzbuzz
// https://eloquentjavascript.net/2nd_edition/02_program_structure.html
// https://eloquentjavascript.net/code/#2.2

// FizzBuzz
// =========

let output = [];
for (let k = 1; k <= 100; ++k) {
  if (k % 3 !== 0 && k % 5 !== 0) {
    output.push(k);
  }
  let s = '';
  if (k % 3 === 0)
    s += 'Fizz';
  if (k % 5 === 0)
    s += 'Buzz';
  output.push(s);
}
console.log(output.join(' '));
