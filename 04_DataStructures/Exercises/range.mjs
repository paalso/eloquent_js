/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter4#summa-diapazona

https://eloquentjavascript.net/2nd_edition/04_data.html
https://eloquentjavascript.net/2nd_edition/04_data.html

Sandbox:
https://eloquentjavascript.net/code/#4.1
*/

// The sum of a range
// ===================

export const range = (from, to, step=1) => {
  const result = [];
  const stopCondition = step > 0 ? ((n, to) => n <= to) : (n, to) => n >= to;
  for (let i = from; stopCondition(i, to); i += step)
    result.push(i);
  return result;
}

const sum = array => array.reduce((acc, e) => acc + e);


if (import.meta.main) {
  console.log(range(1, 10));
  // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  console.log(range(5, 2, -1));
  // → [5, 4, 3, 2]
  console.log(sum(range(1, 10)));
  // → 55
}
