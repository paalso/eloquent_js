// https://eloquentjavascript.net/05_higher_order.html

// Flattening
// ===========

const flatten = arrays => arrays.reduce(
  (acc, item) => acc.concat(item)
);

const arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]
