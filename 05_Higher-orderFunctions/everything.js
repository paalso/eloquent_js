// https://eloquentjavascript.net/05_higher_order.html
// https://eloquentjavascript.net/code/#5.3

// Everything
// ===========

function some(array, test) {
  for (const item of array)
    if (test(item))
      return true;
  return false;
}

function every(array, test) {
  for (const item of array)
    if (! test(item))
      return false;
  return true;
}

// Version 2
function every(array, test) {
  const antiTest = (x) => test(x) ? false : true;
  return ! some(array, antiTest);
}

console.log(every([NaN, NaN, NaN], isNaN)); // → true
console.log(every([NaN, NaN, 4], isNaN));   // → false
console.log(some([NaN, 3, 4], isNaN));      // → true
console.log(some([2, 3, 4], isNaN));        // → false
console.log(every([2, 4, 6, 8], num => num % 2 === 0));        // → true
