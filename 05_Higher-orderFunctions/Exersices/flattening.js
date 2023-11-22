/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter5#svyortka

https://eloquentjavascript.net/2nd_edition/05_higher_order.html
https://eloquentjavascript.net/05_higher_order.html

Sandbox:
https://eloquentjavascript.net/code/#5.1
*/

// Flattening
// ===========

const flatten = arrays => arrays.reduce(
  (flattened, array) => flattened.concat(array), []
);


const arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
console.log(flatten([[]]));
