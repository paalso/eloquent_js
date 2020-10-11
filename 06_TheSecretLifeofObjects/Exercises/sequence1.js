// https://eloquentjavascript.net/2nd_edition/06_object.html
// https://eloquent-javascript.karmazzin.ru/chapter6#interfeis-k-posledovatelnostyam
// https://eloquentjavascript.net/2nd_edition/code/#6.3


// Sequence interface
// ===================

// Интерфейс:
// iter() возвращает массив номеров, позволяющий проходить по последовтельности

// Не вполне понимаю условия задачи :(
// Сляпал нечто, удовлетворяющее условию, но очень прямолинейно и еще, плохо,
// что мой итератор - не ленивый


/**
 * Принимает объект-последовательность и вызывает console.log для первых её пяти
 * элементов – или для меньшего количества, если их меньше пяти.
 * @param {object} sequence объект, обладающий интерфейсом iter()
 */
function logFive(sequence) {
    // for (let i = 0, iterLength = sequence.iter().lengh; i < Math.min(5, iterLength); i++) {
    for (let i = 0; i < 5; i++) {
        const next = sequence.iter()[i];
        if (!next)
            break;
        console.log(next);
    }
}

/**
 * ArraySeq оборачивает массив, и позволяет проход по массиву
 * с использованием разработанного вами интерфейса iter
 * @param {array} array массив
 */
function ArraySeq(array) {
    this.array = array;
}
ArraySeq.prototype.iter = function () {
    return this.array.slice();
};


/**
 * RangeSeq проходит по диапазону чисел
 * @param {number} from число - начало диапазона (включая)
 * @param {number} to число - конец диапазона (ислючая)
 */
function RangeSeq(from, to) {
    this.array = [];
    for (let i = from; i < to; i++)
        this.array.push(i);
}
RangeSeq.prototype.iter = function () {
    return this.array;
};



// -------------------------------
const o11 = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 1,
    "e": 0,
    "f": 4,
};

const o12 = {
    "a": 1,
    "b": 2,
    "c": 3,
};

const objIterator1 = function () {
    return Object.values(this);
};

Object.getPrototypeOf(o11).iter = objIterator1;
Object.getPrototypeOf(o12).iter = objIterator1;

// logFive(o11);
// console.log();
// logFive(o12);

// -------------------------------
const objIterator2 = function () {
    const seq = [];
    Object.values(this).forEach(element => {
        seq.push(...element);
    });
    return seq;
};

const o2 = {
    "row1": [1, 2, 3],
    "row2": [2, 3, 0],
    "row3": [4]
};
Object.getPrototypeOf(o2).iter = objIterator2;
// logFive(o2);

// -------------------------------
// logFive(new ArraySeq([1, 2]));

// -------------------------------
logFive(new RangeSeq(100, 1000));


