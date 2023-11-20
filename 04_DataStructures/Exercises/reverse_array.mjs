/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter4#obrashaem-vspyat-massiv

https://eloquentjavascript.net/2nd_edition/04_data.html
https://eloquentjavascript.net/2nd_edition/04_data.html

Sandbox:
https://eloquentjavascript.net/code/#4.2
*/

// Reversing an array
// ===================

import { range } from './range.mjs'

const reverseArray = array => {
  const result = [];
  for (let i = array.length - 1; i >= 0; i--)
    result.push(array[i]);
  return result;
};

const reverseArrayInPlacePlain = array => {
  const result = [];
  let temp;
  for (let i = 0, j = array.length - 1; i < j; i++, j--) {
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const reverseArrayInPlace = array => {
  const result = [];
  for (let i = 0, j = array.length - 1; i < j; i++, j--)
    [array[i], array[j]] = [array[j], array[i]];
};

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlacePlain(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [1, 2, 3, 4, 5];

// Benchmarking

const getDuration = (func, args, times=1) => {
  const startTime = new Date().getTime();
  for (let i = 0; i < times; i++) {
    func(...args);
  }  
  const endTime = new Date().getTime();
  return endTime - startTime;
}

const array = range(1, 10_000);
const tries = 100_000;

console.log('Benchmarking');
console.log(`Array size: ${array.length}, tries: ${tries}`);
let duration = getDuration(reverseArray, [array], tries);
console.log(`reverseArray duration: ${duration}`);

duration = getDuration(reverseArrayInPlace, [array], tries);
console.log(`reverseArrayInPlace duration: ${duration}`);

duration = getDuration(reverseArrayInPlacePlain, [array], tries);
console.log(`reverseArrayInPlacePlain duration: ${duration}`);

const standardReverse = array => array.reverse();
duration = getDuration(standardReverse, [array], tries);
console.log(`Standart JS Array.prototype.reverse() duration: ${duration}`);

/*
Benchmarking
Array size: 10000, tries: 100000
reverseArray duration: 6669
reverseArrayInPlace duration: 987
reverseArrayInPlacePlain duration: 363
Standart JS Array.prototype.reverse() duration: 612
*/
