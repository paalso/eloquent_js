/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter4#spisok

https://eloquentjavascript.net/2nd_edition/04_data.html
https://eloquentjavascript.net/2nd_edition/04_data.html

Sandbox:
https://eloquentjavascript.net/code/#4.4
*/

// Deep comparison
// ================

const deepEqual = (object1, object2) => {
  // if (typeof object1 !== 'object' || typeof object2 !== 'object')
  //   return object1 === object2;
  if (typeof object1 !== 'object' || object1 === null || object2 === null)
    return object1 === object2;

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length)
    return false;

  for ([key, val] of Object.entries(object1))
    if (! keys2.includes(key) || ! deepEqual(val, object2[key])) {
      return false;
    }
  return true;
}

var obj = {here: {is: "an"}, object: 2};
console.log('Only objects comparison:');
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {object: 2, here: {is: "an"}}));
// → true
console.log('objects/plain values comparison:');
console.log(deepEqual('a', 'a'));   // true
console.log(deepEqual(null, null)); // true
console.log(deepEqual('a', null));  // false
console.log(deepEqual(null, 'a'));  // false
console.log(deepEqual(obj, null));  // false
console.log(deepEqual(null, obj));  // false
console.log(deepEqual('a', 'b'));   // false
console.log(deepEqual('a', obj));   // false
console.log(deepEqual(obj, 'a'));   // false
