/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter5#istoricheskaya-ozhidaemaya-prodolzhitelnost-zhizni
https://eloquentjavascript.net/2nd_edition/05_higher_order.html
https://eloquentjavascript.net/05_higher_order.html

Sandbox:
https://eloquentjavascript.net/2nd_edition/code/#5.4
*/

// every and some
// ===============

const every = (array, condition) => {
  for (const e of array) {
    if (! condition(e))
      return false;
  }
  return true;
}

const some = (array, condition) => {
  for (const e of array) {
    if (condition(e))
      return true;
  }
  return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false
