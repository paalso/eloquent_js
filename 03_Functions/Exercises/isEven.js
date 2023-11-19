// https://eloquent-javascript.karmazzin.ru/chapter3#rekursiya-1
// https://eloquentjavascript.net/03_functions.html
// https://eloquentjavascript.net/code/#3.2

// Recursion
// ==========

const isEven = n => {
  if (n === 0)
    return true;
  
    n = Math.abs(n);
  if (n === 1)
    return false;
  return isEven(n - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
console.log(isEven(10003));
// → ??
