/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter4#spisok

https://eloquentjavascript.net/2nd_edition/04_data.html
https://eloquentjavascript.net/2nd_edition/04_data.html

Sandbox:
https://eloquentjavascript.net/code/#4.3
*/

// A list
// =======

const prepend = (newElement, list) => (
  { 
    value: newElement,
    rest: list,
  }
);

const arrayToList = array => {
  if (array.length === 0)
    return null;
  return prepend(array[0], arrayToList(array.slice(1)));
};

const nth = (list, position) => {
  if (list === null)
    return undefined;
  if (position === 0)    
    return list.value;
  return nth(list.rest, position - 1);
}

const listToArray = list =>
  list === null ? [] : [list.value, ...listToArray(list.rest)];

// ------------------------------------------
console.log(arrayToList([]));
// → null
console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}

console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(nth(arrayToList([10, 20, 30]), 4));
// → underfined
console.log(nth(arrayToList([]), 0));
// → underfined

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(listToArray(arrayToList([])));
// → []
