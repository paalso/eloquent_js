// Рекурсивная функция считающая суммарную длину объекта
const objectLength = object => {
  let counter = 0;
  for (const el of Object.values(object))
    counter += typeof (el) === "object" ? objectLength(el) : 1;
  return counter;
};

// Рекурсивная функция печатающая содердимок обэекта (udemy)
const printObjectContent = object => {
  for (const [key, value] of Object.entries(object)) {
    if (typeof (value) === "object")
      printObjectContent(value);
    else
      console.log(`${key} : ${value}`);
  }
};

// Сделать ф-ю, к-я выводит строку и указывает полный путь для ключей
// ...


// Создать объект как map
const o = {
  "Tom": 24,
  "Dick": 27,
  "Harry": 32
};

// Добавить несколько свойств

Object.getPrototypeOf(o).len = function () {
  return Object.keys(this).length;
};

Object.getPrototypeOf(o).getNames = function () {
  return Object.keys(this);
};

// console.log(o.getNames());
// console.log(o.len());

Object.defineProperty(Object.getPrototypeOf(o), "hiddenNonsense", {
  enumerable: false, value: "ку"
});
// for (var name in o)
//   console.log(name);

// console.log(toString in o);
// console.log(String(o));

// → пицца
// → тронул дерево
// console.log(o.hiddenNonsense);
// → ку

// добавить несчетное свойство
// (например свойство - ф-ю, выдающую длину)

// Вывести в цикле счетные множества



const soldier = {
  health: 100,
  strength: 100,
  toString: function () {
    return `(${this.name}, health ${this.health}, strength ${this.strength})`;
  }
};

const john = {name: "John"};
john.__proto__ = soldier;
// console.log((john.strength));
// console.log(String(john));

var pile = {
  elements: ["скорлупа", "кожура", "червяк"],
  get height() {
    return this.elements.length;
  },
  set height(value) {
    console.log("Игнорируем попытку задать высоту", value);
  }
};