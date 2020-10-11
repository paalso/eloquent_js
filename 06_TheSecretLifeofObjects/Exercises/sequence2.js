// https://eloquentjavascript.net/2nd_edition/06_object.html
// https://eloquent-javascript.karmazzin.ru/chapter6#interfeis-k-posledovatelnostyam
// https://eloquentjavascript.net/2nd_edition/code/#6.3


// Sequence interface
// ===================

// Интерфейс:
// * end() - возвращает true, если достигли окончания последовательности
// * next() - при инициировании экземпляра указывает на первый элемент
// последовательности, при каждом вызове возвращает элемент, на к-й указывает
// и перемещается к следующему

// Не вполне понимаю условия задачи :(
// Но кмк сейчас ближе к тому, что ожидается
// PS Да, так  есть - заглянул в ответы (см. sequenceAnswer1.js) -
// там чуть иначе, но, в общем, как то так

/**
 * Принимает объект-последовательность и вызывает console.log для первых её пяти
 * элементов – или для меньшего количества, если их меньше пяти.
 * @param {object} sequence объект, обладающий интерфейсом iter()
 */
function logFive(sequence) {
  for (let i = 0; i < 5; i++) {
    if (sequence.end())
      break;
    console.log(sequence.next());
  }
}

// ---------------------------------------------------------------------
/**
 * ArraySeq оборачивает массив, и позволяет проход по массиву
 * с использованием разработанного нами интерфейса
 * @param {array} array массив
 */
function ArraySeq(array) {
  this.array = array;
  this.index = 0;
  this.end = function () {
    return this.index >= array.length;
  };
  this.next = function () {
    if (!this.end()) {
      this.index += 1;
      return array[this.index - 1];
    }
  };
}

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

// const a1 = new ArraySeq([1, 2, 3, 4, 5, 6, 7]);
// while (!a1.end())
//     console.log(a1.next());


// ---------------------------------------------------------------------
/**
 * RangeSeq проходит по диапазону чисел
 * @param {number} from число - начало диапазона (включая)
 * @param {number} to число - конец диапазона (ислючая)
 */
function RangeSeq(from, to) {
  this.index = from;
  this.end = function () {
    return this.index >= to;
  };
  this.next = function ()     {
    if (!this.end()) {
      this.index += 1;
      return this.index - 1;
    }
  };
}

console.log("Тестируем RangeSeq:");
console.log("logFive(new RangeSeq(100, 1000))");
logFive(new RangeSeq(100, 1000));
