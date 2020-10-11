// https://eloquentjavascript.net/2nd_edition/06_object.html
// https://eloquent-javascript.karmazzin.ru/chapter6#interfeis-k-posledovatelnostyam
// https://eloquentjavascript.net/2nd_edition/code/#6.3


// Sequence interface
// ===================

// I am going to use a system where a sequence object has two methods:
//
// * next(), which returns a boolean indicating whether there are more
//   elements in the sequence, and moves it forward to the next
//   element when there are.
//
// * current(), which returns the current element, and should only be
//   called after next() has returned true at least once.


/**
 * Принимает объект-последовательность и вызывает console.log для первых её пяти
 * элементов – или для меньшего количества, если их меньше пяти.
 * @param {object} sequence объект, обладающий интерфейсом iter()
 */
function logFive(sequence) {
  for (let index = 0; index < 5; index++) {
    if (!sequence.next())
      break;
    console.log(sequence.current());
  }
}

function ArraySeq(array) {
  this.array = array;
  this.index = -1;
}

ArraySeq.prototype.current = function () {
  return this.array[this.index];
};

ArraySeq.prototype.next = function () {
  if (this.index >= this.array.length - 1)
    return false;
  this.index += 1;
  return true;
};


function RangeSeq(start, end) {
  this.index = start;
  this.end = end;
}

RangeSeq.prototype.current = function () {
  return this.index;
};

RangeSeq.prototype.next = function () {
  if (this.index >= this.end)
    return false;
  this.index += 1;
  return true;
};


console.log("Тестируем ArraySeq:");
console.log("logFive(new ArraySeq([1, 2]))");
logFive(new ArraySeq([1, 2]));
console.log();
console.log("logFive(new ArraySeq([1, 2, 3, 4, 5, 6, 7]))");
logFive(new ArraySeq([1, 2, 3, 4, 5, 6, 7]));
console.log();
console.log("logFive(new ArraySeq([]))");
logFive(new ArraySeq([]));
console.log();


console.log("Тестируем RangeSeq:");
console.log("logFive(new RangeSeq(100, 1000))");
logFive(new RangeSeq(100, 1000));