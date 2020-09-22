// https://eloquent-javascript.karmazzin.ru/chapter3#rekursiya-1
// https://eloquentjavascript.net/03_functions.html
// https://eloquentjavascript.net/code/#3.2

// Recursion
// ==========

const isEven = (num) => {
  if (num === 0) return true;
  if (num === 1) return false;
  const step = num > 0 ? 2 : -2;
  return isEven(num - step);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
console.log(isEven(10003));
// → ??
