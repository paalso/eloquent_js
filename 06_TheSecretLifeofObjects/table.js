// https://eloquent-javascript.karmazzin.ru/chapter6#formatiruem-tablicu
// https://eloquentjavascript.net/2nd_edition/

/*
name         height country
------------ ------ -------------
Kilimanjaro    5895 Tanzania
Everest        8848 Nepal
Mount Fuji     3776 Japan
Mont Blanc     4808 Italy/France
Vaalserberg     323 Netherlands
Denali         6168 United States
Popocatepetl   5465 Mexico
*/

var MOUNTAINS = [
  { name: "Kilimanjaro\n(Kenya)", height: 5895, country: "Africa" },
  { name: "Everest\n(Asia)", height: 8848, country: "Nepal" },
  { name: "Mount Fuji\n(Asia)", height: 3776, country: "Japan" },
  { name: "Mont Blanc", height: 4808, country: "Italy/France" },
  { name: "Vaalserberg", height: 323, country: "Netherlands" },
  { name: "Denali", height: 6168, country: "United States\n(Alaska)" },
  { name: "Popocatepetl", height: 5465, country: "Mexico" }
];
//   console.log(MOUNTAINS);

// ---- Для тестирования rowHeights, colWidths -------------------------------

// Превращаем исходный массив в объектов в массив массивов строк.   (*)
// Последнее принципиально, т.к. в исходном могут попадаться числа
const arrayData = objectsArray => objectsArray.map(
  objItem => Object.values(objItem).map(item => String(item)));
// console.log(arrayData(MOUNTAINS));

String.prototype.count = function (symbol) {
  return Array.from(this).reduce(
    (acc, c) => c === symbol ? acc + 1 : acc, 0);
};

// Задаем у String свойства minWidth, minHeight для тестирования будущих методв

String.prototype.minWidth = function () {
  const splitted = this.split("\n");
  return splitted.reduce(
    (maxWidth, item) => Math.max(maxWidth, item.length), 0
  ) + 1;
};

String.prototype.minHeight = function () {
  return this.count("\n") + 1;
};

// На самом деле (*) не обязательно и можно было ограничиться
// const arrayData = objectsArray => objectsArray.map(
//   objItem => Object.values(objItem));

// Но задать методы minWidth / minHeight у Number:
Number.prototype.minWidth = function () {
  return String(this) + 1;
};

// console.log("Hello,\nWorld".minWidth());


Number.prototype.minHeight = function () {
  return 1;
};

// ---------------------------------------------------------------------------

// Задача: программа, которая  получает массив массивов из ячеек таблицы,
// и строит строку, содержащую красиво отформатированную таблицу.
// =======================================================================

/* Интерфейс:
==============
- minHeight() возвращает число, показывающее минимальную высоту, которую
требует ячейка (выраженную в строчках),
- minWidth() возвращает число, показывающее минимальную ширину, которую требует
ячейка (выраженную в символах)
- draw(width, height) возвращает массив длины height, содержащий наборы строк,
каждая из которых шириной в width символов. Это содержимое ячейки. */


/**
 * @param {array} rows массив массивов, где каждый внутренний массив –
 * это массив ячеек(объектов, обладающих методами minHeight(), minWidth())
 * @return {array} массив минимально приемлемых высот - т.е. максимум от minHeight()
 * высот ячеек, составляющих ряд
 */
function rowHeights(rows) {
  return rows.map(
    row => row.reduce(
      (maxHeight, cell) => Math.max(maxHeight, cell.minHeight()), 0
    )
  );
}

/**
 * @param {array} rows массив массивов, где каждый внутренний массив –
 * это массив ячеек(объектов, обладающих методами minHeight(), minWidth())
 * @return {array} массив минимально приемлемых ширин - т.е. максимум от minWidth()
 * ширин ячеек, составляющих ряд
 */
function colWidths(rows) {
  // rows[0] - массив, состоящий из ячеек первой строки
  // т.е. rows[0].map просто возвращает массив такого же размера,
  // где каждой ячейке строки соответствует минимально приемлемая ширина -
  // т.е. максимум минимально возможных ширин ячеек
  return rows[0].map(
    (_, i) => rows.reduce(
      (maxWidth, row) => Math.max(maxWidth, row[i].minWidth()), 0
    )
  );
}

// Тестируем
// console.log(arrayData(MOUNTAINS));
// console.log(rowHeights(arrayData(MOUNTAINS)));
// console.log(colWidths(arrayData(MOUNTAINS)));

// --- Код для вывода таблицы ---------------------------------

/**
 * @param {array} rows массив массивов, где каждый внутренний массив –
 * это массив ячеек TextCell (объектов, обладающих методами minHeight(), minWidth())
 * @return {string} строка, включающая все содержимое таблицы (строки таблицы 
 *                  разделены "\n" готовая для печати)
 */
function drawTable(rows) {
  var heights = rowHeights(rows); // массив высот - для каждой строки

  var widths = colWidths(rows);   // массив ширин - для каждого столбца

  /**
   * drawLine выцепляет строки, которые должны появляться рядом друг с
   * другом из массива блоков, и соединяет их через пробел, чтобы создать промежуток
   * в один символ между столбцами таблицы. Например:
   * block - это ячейка - TextCell - по сути, массив строк
   * ['lishck   ', 'dfjvopja ', 'asdojcojc', '         ']
   * blocks - это масив блоков TextCell стандартизованного размера - одна строка таблицы
   * [['lishck   ', 'dfjvopja ', 'asdojcojc', '         '],
   *  ['adavavs', 'sdssd  ', 'sddc   ', 'sdddc  '],...
   * lineNo - это номер строки в каждом block'е
   * Например, задан blocks
   *    --------------------------------
   *    |lishck   |adavavs|sxs   |...       0
   *    |dfjvopja |sdssd  |asa   |...       1 - lineNo  
   *    |asdojcojc|sddc   |asssx |...       2
   *    |         |sdddc  |sx    |...      ...
   *    --------------------------------
   * c lineNo = 1 ф-я drawLine выцепляет 1-ю строку в каждом блоке и возвращает
   * общую строку (предназначенную для дальнейшей печати):
   * "dfjvopja  sdssd   asa    ..."
   * 
   * @param {array} blocks массив блоков стандатизованного размера, к-е представляют
   *                       собой массивы строк (одинакового размера)
   * @return {string} строка текста, состоящая из строк, входящих в blocks,
   * находящиеся на одном "уровне", соединенные пробелами, при выводе представялющие 
   * собой одну строку
   */
  function drawLine(blocks, lineNo) {
    return blocks.map(function (block) {
      return block[lineNo];
    }).join(" ");
  }

  /**
   * Обрабатывает отдельную строку row таблицы с номером rowNum
   * @param {array} row массив блоков TextCell
   * @param {Number} rowNum номер row
   * @return {string} строка, состоящая из всех строк row, находящихся
   * на одном уровне, соединенных "\n", т.е. состоящая из всего содержимого row
   * "dfjvopja  sdssd   asa ...\ndfjvopja  sdssd   asa    ...\n .......    sdddc   sx     ... "
   */
  function drawRow(row, rowNum) {
    // blocks - это массив строк стандартизованного размера, в к-й преобразовывается
    // массив row, состоящий из TextCell, 
    // [TextCell, TextCell, ...] -> 
    // [['lishck   ', ['adavavs',
    //   'dfjvopja ',  'sdssd   ',
    //   'asdojcojc',  'sddc    ',   
    //   '         '], 'sdddc   '],...]
    var blocks = row.map(function (cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);  // cell.draw() - см. ниже?
    });

    // blocks[0] - это набор строк, составляющих первую ячейку blocks:
    // ['lishck   ',
    //  'dfjvopja ',
    //  'asdojcojc',
    //  '         ']
    // т.е. этот фрагмент отображает blocks в набор длинных строк, типа
    // "dfjvopja  sdssd   asa    ...", "asdojcojc sddc    asssx ... ", и связывает их
    // в одну строку с помощью '\n'
    return blocks[0].map(function (_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  // Объединяем и возвращаем такие строки, полученные для каждой строки таблицы
  // Такой набор строк сразу можно будет распечатать
  return rows.map(drawRow).join("\n");
}
// ---------------------------------------------------------------------------

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


// --- Рисование шахматной доски ---------------------------------------------

var chessRows = [];
for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell("  "));
  }
  chessRows.push(row);
}

// console.log(chessRows);
// console.log(drawTable(chessRows));
// ---------------------------------------------------------------------------

// --- Интерфейс для подчеркнутых ячеек --------------------------------------

// UnderlinedCell - это обертка над TextCell
// Т.е. в конструктор new UnderlinedCell(cell) мы передаем уже объекты TextCell,
// поэтому и можем в дальнейшем пользоваться методами TextCell
// Т.е. мы строим новую сущность с тем же интерфейсом (minWidth(), minHeight(), draw()), -
// которого требует разработанный движок для рисования таблицы

/**
 * Конструктор, задающий "текстовую ячейку с подчеркиванием" UnderlinedCell
 * "Mount Fuji\n(Asia)" -> TextCell {["Mount Fuji", "(Asia)"]}
 * @param {TextCell} inner объект TextCell
 * @return {object} объект, содержащий объект TextCell
 */
function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function () {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function () {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

// ---------------------------------------------------------------------------

/**
 * Трансформирует массив объектов, содержащих исходное содержание таблицы
 * в массив стандартизованных для вывода блоков TextCell
 * @param {array} data исходный "сырой" массив объектов (см. MOUNTAINS)
 * @return {array} массив массивов, где каждый внутренний массив –
 * это массив ячеек TextCell (объектов, обладающих методами minHeight(), minWidth())
 */
function dataTable(data) {
  var keys = Object.keys(data[0]);  // ["name", "height", "country"]

  // преобазуем массив строковых keys в массив объектов UnderlinedCell
  var headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name));
  });

  // преобразуем каждую строку массива data, т.е. объект вроде
  // { name: "Kilimanjaro\n(Kenya)", height: 5895, country: "Africa" },
  var body = data.map(function (row) {
    return keys.map(function (name) { // преобразуем строку в массив TextCells
      return new TextCell(String(row[name]));
    });
  });

  return [headers].concat(body);

}

const mountainsData = dataTable(MOUNTAINS);
// console.log(mountainsData);
// console.log(drawTable(mountainsData));
// ---------------------------------------------------------


// Здесь новый конструктор вызывает старый (через метод call, чтобы передать
// ему новый объект и его значение), при этом все поля, которые должны быть
// в старом объекте, добавлены.

/**
 * Конструктор, задающий "текстовую ячейку" RTextCell
 * RTextCell наследуется от TextCell
 * @param {string} text строка (в общем случае включающая символ '\n')
 * @return {object} объект, содержащий массив строк, составляющих text, к-е
 *  в исходном тексте разделены символом '\n', текст выравнивается по правому краю
 */
function RTextCell(text) {
  TextCell.call(this, text);
}

// Наследуем прототип конструктора от старого так, что экземпляры этого типа будут
// иметь доступ к свойствам старого прототипа.
RTextCell.prototype = Object.create(TextCell.prototype);

// переопределяем родительский метод
RTextCell.prototype.draw = function (width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

// Мы повторно использовали конструктор и методы minHeight и minWidth из
// обычногоTextCell. И RTextCell теперь в общем эквивалентен TextCell,
// за исключением того, что в методе draw находится другая функция.

function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
      // Тут поменяли:
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });
  return [headers].concat(body);
}

console.log(drawTable(dataTable(MOUNTAINS)));