// https://eloquent-javascript.karmazzin.ru/chapter3#schitaem-boby
// https://eloquentjavascript.net/03_functions.html
// https://eloquentjavascript.net/code/#3.3

// Bean counting
// ==============
const countChar = (text, sym) => {
  let counter = 0;
  for (c of text)
    if (c === sym)
      counter += 1;
  return counter;
};

const countBs = text => countChar(text, 'B');

console.log(countBs("BBC")); // → 2
console.log(countChar("kakkerlak", "k")); // → 4
