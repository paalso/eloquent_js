// https://eloquent-javascript.karmazzin.ru/chapter3#minimum
// https://eloquentjavascript.net/03_functions.html
// https://eloquentjavascript.net/code/#3.1

// Minimum
// ========

const min = (...args) => {
  let minimum = args[0];
  for (item of args)
    if (item < minimum)
      minimum = item;
  return minimum;
};

console.log(min());
console.log(min(0, 10)); // → 0
console.log(min(0, -10)); // → -10
console.log(min(0, 1, 2, 3, 4, 5, -10, 10)); // → -10
