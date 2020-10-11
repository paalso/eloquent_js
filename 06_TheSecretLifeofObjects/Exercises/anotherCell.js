// https://eloquentjavascript.net/2nd_edition/06_object.html
// https://eloquent-javascript.karmazzin.ru/chapter6#eshyo-odna-yacheika
// https://eloquentjavascript.net/2nd_edition/code/#6.2


// Another Cell
// =============

/**
 * Возвращает строку, состоящую из заданной string, повторенной times 
 * @param {string} строка
 * @param {times} число
 * @return {string} строка string, повторенная times раз
 */
function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

// --- Интерфейс для ячеек ---------------------------------------------------

/**
 * Конструктор, задающий "текстовую ячейку" TextCell
 * "Mount Fuji\n(Asia)" -> TextCell {["Mount Fuji", "(Asia)"]}
 * @param {string} text строка (в общем случае включающая символ '\n')
 * @return {object} объект, содержащий массив строк, составляющих text, к-е
 *                 в исходном тексте разделены символом '\n'
 */
function TextCell(text) {
  this.text = text.split("\n");
}

/**
 * Метод, к-й вычисляет ширину ячейки - как максимум длин строк
 * TextCell {['lishck   ', 'dfjvopja ', 'asdojc']} -> 8
 */
TextCell.prototype.minWidth = function () {
  return this.text.reduce(function (width, line) {
    return Math.max(width, line.length);
  }, 0);
};

/**
 * Метод, к-й вычисляет высоту ячейки - как количество строк
 * TextCell {['lishck   ', 'dfjvopja ', 'asdojc']} -> 3
 */
TextCell.prototype.minHeight = function () {
  return this.text.length;
};

/**
 * Метод, к-й "рисует" ячейку - т.е. возвращает массив длины height,
 * содержащий наборы строк, каждая из которых шириной в width символов.
 * TextCell {['Hello', 'world!']}.draw(8, 3) -> 
 * ['Hello   ',
 *  'world!  ',
 *  '        ']
 */
TextCell.prototype.draw = function (width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

var cell = new TextCell("abc");
// var cell = new TextCell("abcde\nasdfghh\nasffsd");
console.log(cell.minWidth());   // → 3
console.log(cell.minHeight());  // → 1
console.log(cell.draw(3, 2));   // → ["abc", "   "]


// --- Интерфейс для StretchCell ---------------------------------------------
/**
 * Конструктор, задающий StretchCell
 * @param {TextCell} inner объект TextCell
 * @return {object} объект, содержащий объект TextCell
 */
function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}

StretchCell.prototype.minWidth = function() {
  return Math.max(this.inner.minWidth(), this.width);
};

StretchCell.prototype.minHeight = function() {
  return Math.max(this.inner.minHeight(), this.height);
};

StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height);
};

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]