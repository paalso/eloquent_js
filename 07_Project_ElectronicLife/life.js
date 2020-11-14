
const plan =
  ["############################",
    "#      #    #      o      ##",
    "#                          #",
    "#          #####           #",
    "##         #   #    ##     #",
    "###           ##     #     #",
    "#           ###      #     #",
    "#   ####                   #",
    "#   ##       o             #",
    "# o  #         o       ### #",
    "#    #                     #",
    "############################"];

const directions = {
  "n": new Vector(0, -1),
  "ne": new Vector(1, -1),
  "e": new Vector(1, 0),
  "se": new Vector(1, 1),
  "s": new Vector(0, 1),
  "sw": new Vector(-1, 1),
  "w": new Vector(-1, 0),
  "nw": new Vector(-1, -1)
};


/**
* Создает экземпляр Vector для представления этих пар координат
*
* @constructor
* @this {Vector}
* @param {number} x x-координата 
* @param {number} y x-координата
*/
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
/**
* Возвращает длину окружности, вычисленную заранее.
*
* @this {Vector}
* @param {Vector} other другой вектор
* @return {Vector} Сумма данного вектора и other
*/
Vector.prototype.plus = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

/**
* Создает экземпляр Grid (сетка)
*
* @constructor
* @this {Grid}
* @param {number} width ширина 
* @param {number} height высота
*/
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
/**
* Предикат - лежит ли заданная точка внутри сетки
*
* @this {Grid}
* @param {Vector} vector точка
* @return {boolean} лежит ли точка, заданная vector, внутри сетки
*/
Grid.prototype.isInside = function (vector) {
  const [x, y] = [vector.x, vector.y];
  return 0 <= x && x < this.width && 0 <= y && y < this.height;
};
/**
* Возвращает объект, находящийся в заданной точке
*
* @this {Grid}
* @param {Vector} vector точка
* @return {Object} объект, находящийся внутри сетки в точке
* с координатой vector
*/
Grid.prototype.get = function (vector) {
  return this.space[vector.y * this.width + vector.x];
};
/**
* Помещает объект в заданную точку
*
* @this {Grid}
* @param {Vector} vector точка
* @param {object} value объект - элемент мира
*/
Grid.prototype.set = function (vector, value) {
  this.space[vector.y * this.width + vector.x] = value;
};

/**
* Выбирает случайный элемент массива
* @param {array} array произвольный элемент массива
* @return случайный элемент массива
*/
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
* Создает простое тупое существо, которое просто идёт, пока 
* не врезается в препятствие, а затем отскакивает в случайном направлении,
* создает объект со свойством - случайное направление, в к-м оно движется
* (с каждым ходом) из массива directions
*
* @constructor
* @this {BouncingCritter}
*/
function BouncingCritter() {
  this.direction = randomElement(Object.keys(directions));
}

// У каждого объекта существа есть метод act, который при вызове возвращает
// действие action
// Существа ужасно близоруки и видят только непосредственно прилегающие к ним
// клетки. Но и это может пригодиться при выборе действий. При вызове метода
// act ему даётся объект view, который позволяет существу изучить прилегающую
// местность.
// Т.е. BouncingCritter получает случайное направление, изучает его,
// и если оно направлено в препятствие (!= " "), ищет новое направление или,
// если такового нет - направление (почему то) на юг ("s") и возвращает ход
// в этом направлении

/**
* Возвращает объект - направление, в к-м движется BouncingCritter,
*
* @this {BouncingCritter}
* @param {object} view объект, обеспечивающий реакцию BouncingCritter ?
* @return {object} поведение - движение 
*/
BouncingCritter.prototype.act = function (view) {
  // У объекта view есть метод look, принимающий направление и возвращает
  // символ, к примеру "#", если там стена, или пробел, если там ничего нет.
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return { type: "move", direction: this.direction };
};
// ---------------------------------------------------------------------

/**
* Создает элемент "мира" из объекта legend
* 
* @param {object} legend - объект "легенда", сообщающий, что означает каждый
* из символов карты типа обозначение: значение
* напр. { "#": Wall, "o": BouncingCritter }
* @param {string} ch символ (напр. "#", "o", " ")
* @return {object} Объект - элемент "мира"
*/
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  // добавляем свойство originChar, чтобы было просто выяснить, из какого
  // символа элемент был создан изначально.
  element.originChar = ch;
  return element;
}

/**
* Создает объект World 
*
* @constructor
* @this {World}
* @param {array} map карта мира - массив строк
* @param {object} legend - объект "легенда", сообщающий, что означает каждый
* из символов карты типа обозначение: значение
* напр. { "#": Wall, "o": BouncingCritter }
*/
function World(map, legend) {
  this.legend = legend;

  const grid = new Grid(map[0].length, map.length);   // width * height
  this.grid = grid;
  // внутри функции, передаваемой в forEach, мы уже не находимся непосредственно
  // в области видимости конструктора.Каждый вызов функции получает своё
  // пространство имён, поэтому this внутри неё уже не ссылается на создаваемый
  // объект, на который ссылается this снаружи функции. И вообще, если функция
  // вызывается не как метод, this будет относиться к глобальному объекту.
  // Значит, мы не можем писать this.grid для доступа к сетке изнутри цикла.
  // Вместо этого внешняя функция создаёт локальную переменную grid, через
  // которую внутренняя функция получает доступ к сетке.

  map.forEach(function (line, y) {    // установка на карту элементов мира
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),    // неправильно: this.grid.set ...
        elementFromChar(legend, line[x]));
  });
}

/**
* Возвращает char - изображение элемента мира для печати на карте
* т.е. функция, обратная elementFromChar
* @param {object} element - объект элемента мира (BouncingCritter или Wall)
* @return {string} изображение элемента мира ("o" или "#")
*/
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

/**
* Добавляет к объекту World свойство toString для дальнейшей печати
*
* @this {World}
* @return {string} строчное изображение объекта World
*/
World.prototype.toString = function () {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

/**
* Конструктор объекта Wall. Пустой т.к. не имеет методов
* 
* @constructor
* @this {Wall}
*/
function Wall() { }


/**
* Делает один "ход": обходит сетку методом forEach, ищет объекты,
* у которых есть метод act. Найдя объект, turn вызывает этот метод,
* получая объект action и производит это действие, если оно допустимо. 
*
* @this {World}
*/
World.prototype.turn = function () {
  // массив существ, которые уже сделали свой шаг - чтобы
  var acted = [];     // игнорировать их при дальнейшем проходе.

  // !!!! Вот здесь я не понимаю! Аргументом функции, к-я передается в forEach
  // должен быть элемент массива this.grid , т.е. элемент мира (в т.ч.
  // это может быть critter; но почему передается еще и vector?
  this.grid.forEach(function (critter, vector) {
    if (critter.act &&                // у critter есть метод act
      acted.indexOf(critter) == -1) { // текущий critter еще не ходил
      acted.push(critter);  // добавить текущего critter в список сделаших ход
      this.letAct(critter, vector);
    }
  }, this); // второй параметр метода forEach (this) используется для доступа
  // к правильной переменной this во внутренней функции
  // см. https://eloquent-javascript.karmazzin.ru/chapter7#this-i-ego-oblast-vidimosti
};

/**
* Добавляет к объекту World логику, которая позволяет существам двигаться
* Сначала мы просто просим существо действовать, передавая ему объект view,
* который знает про мир и текущее положение существа в мире (мы скоро зададим
* View). 
*   
* @this {World}
* @param {BouncingCritter} critter существо
* @param {Vector} vector текущая клетка
*/
World.prototype.letAct = function (critter, vector) {
  // Метод act возвращает какое-либо действие.
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {  // Если “move”
    // и если у него есть свойство direction, ссылающееся на допустимое
    // направление, и если клетка в этом направлении пустует (null), мы
    // назначаем клетке, где только что было существо, null, и сохраняем
    // существо в клетке назначения.
    // dest - это клетка, в к-й окажется существо, если движение легитимно
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    } // Если тип действия не “move”, оно игнорируется.
  }
  // letAct заботится об игнорировании неправильных входных данных. Он не
  // предполагает по умолчанию, что направление допустимо, или, что свойство
  // типа имеет смысл.
};

/**
* Добавляет к объекту World логику, которая проверяет является результат
* action (т.е. в нашем случает хода) - клеткой лежащей внутри grid
*
* @this {World}
* @param {object} object объект action - действие, к-е может выполнять critter
* @param {Vector} vector текущая клетка
* @return {Vector} соседняя клетка - результат action, если внутри grid 
*/
World.prototype.checkDestination = function (action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

/**
* Создает объект View для осмотра окружающего мира World из точки vector 
*
* @constructor
* @this {View}
* @param {World} world Объект мир
* @param {Vector} vector точка, из к-й происходит анализ - осмотр мира
*/
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
/**
* Добавляет к объекту View свойство look, осуществляющее осмотр
* Вычисляет координаты, на которые мы пытаемся посмотреть. Если они находятся
* внутри сетки, то получает символ, соответствующий элементу, находящемуся
* там. Для координат снаружи сетки - просто притворяется, что там стена "#"
*
* @this {View}
* @param {string} dir направление (из объекта directions), напр. "ne", "e"...
* @return {string} символ, соответствующий элементу, находящемуся в соседней
*/
View.prototype.look = function (dir) {
  // текущая точка-вектор + вектор, в направлении к-го смотрим.. 
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};
/**
* Добавляет к объекту View свойство findAll, осуществляющее поиск заданного
* символа в соседних клетках. Возвращает ВСЕ такие клетки
*
* @this {View}
* @param {string} ch символ, соответствующий какому-л. элементу World
* @return {array} массив направлений - dirs, в к-х находится искомый ch
*/
View.prototype.findAll = function (ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};
/**
* Добавляет к объекту View свойство findAll, осуществляющее поиск заданного
* символа в соседних клетках. Возвращает ОДНУ СЛУЧАЙНУЮ такую клетку
*
* @this {View}
* @param {string} ch символ, соответствующий какому-л. элементу World
* @return {Vector} случайная соседняя клетка, в к-й находится искомый ch или
* null, если таковых нет 
*/
View.prototype.find = function (ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};


const directionNames = Object.keys(directions); // ["n", "ne", "e", ...]

/**
* Вычисляет новое направление при повороте от направления dir на n делений
* в 45 градусов по часовой стрелке
* dirPlus("n", 1) === "ne"
* dirPlus("s", -2) === "e"
*
* @param {string} dir исходное направление
* @param {number} n количество углов по 45 градусов, на к-е происходит поворот
* (по часовой стрелке)
* @return {string} новое направление
*/
function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
  // ... + 8 чтобы корректно обработать n < 0
}



// -----------------------------------------------------------------------
var world = new World(plan, { "#": Wall, "o": BouncingCritter });
console.log(world.toString());

/**
* Конструктор объекта WallFollower. Создает существо, к-е двигается
* только вдоль стенки, держась за нее левой рукой
* 
* @constructor
* @this {WallFollower}
*/
function WallFollower() {
  this.dir = "s";
}

/**
* Добавляет к объекту View свойство act, обеспечивающее движение вдоль стены
* касаясь ее левой рукой
*
* @this {WallFollower}
* @param {View} view обеспечивает возможность осматривать окрестности
* @return {object} поведение - ход 
*/
WallFollower.prototype.act = function (view) {
  var start = this.dir;

  // существо может оказаться вдали от стен на пустом пространстве —
  // либо обходя другое существо, либо изначально оказавшись там, поэтому
  // ещё одна проверка через if, что сканирование нужно начинать, если существо
  // только что прошло мимо какого-либо препятствия. То есть, если пространство
  // сзади и слева не пустое.
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);

  // в противном случае сканировать начинаем впереди, поэтому в пустом
  // пространстве он будет идти прямо:
  // сканирует окружение существа, начиная с левой стороны и дальше по часовой,
  // пока не находит пустую клетку
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  // Затем он двигается в направлении этой клетки.
  return { type: "move", direction: this.dir };
};

/**
* Конструктор объекта LifelikeWorld, к-й наследуется от World.
* Создает более реалистичный и сложный мир
* 
* @constructor
* @this {LifelikeWorld}
* @param {array} map карта мира - массив строк
* @param {object} legend - объект "легенда", сообщающий, что означает каждый
* из символов карты типа обозначение: значение
* напр. { "#": Wall, "o": BouncingCritter }
*/
function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

// Набор различных функций по совершению действий
const actionTypes = Object.create(null);  // объект без прототипа - зачем?

// действие: рост - его используют растения, рост всегда успешен и
// добавляет половину единицы к энергетическому уровню растения
actionTypes.grow = function (critter) {
  critter.energy += 0.5;
  return true;
};

// действие: движение
actionTypes.move = function (critter, vector, action) {
  // А вот здесь непонятно было: к чему относится этот this? 
  // Ведь move - это свойство объекта actionTypes
  // Посему же ниже this ведет себя как будто относится к  World?
  var dest = this.checkDestination(action, vector);
  if (dest == null || // предоставляет ли действие допустимое направление?
    critter.energy <= 1 ||  // не хватает энергии
    this.grid.get(dest) != null)  // не пустой участок в направлении движения
    return false;   // действие не состоялось
  critter.energy -= 1;  // вычитаем энергию, к-я ушла на движение
  this.grid.set(vector, null);  // двигаем существо
  this.grid.set(dest, critter);
  return true;
};

// действие: питание
actionTypes.eat = function (critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  // если питание удалось, энергия съеденного переходит к едоку,
  // а жертва удаляется с сетки
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

// действие: размножение
actionTypes.reproduce = function (critter, vector, action) {
  var baby = elementFromChar(this.legend,
    critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
    critter.energy <= 2 * baby.energy ||
    this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};


/**
* Добавляет к объекту World более сложную и реалистичную логику
*   
* @this {World}
* @param {BouncingCritter} critter существо
* @param {Vector} vector текущая клетка
*/
LifelikeWorld.prototype.letAct = function (critter, vector) {
  // действие - движение существа critter, например:
  // { type: "move", direction: this.direction }
  var action = critter.act(new View(this, vector));
  // Метод проверяет
  var handled = action && // было ли передано хоть какое-то действие?
    action.type in actionTypes && // есть ли функция, обрабатывающая его?
    // возвращает ли эта функция true, показывая, что действие выполнено успешно
    actionTypes[action.type].call(this, critter,
      vector, action);
  // Если действие по какой-либо причине не сработало, действием по умолчанию
  // для существа будет ожидание. Он теряет 0.2 единицы энергии, а когда его
  // уровень энергии падает ниже нуля, он умирает и исчезает с сетки.
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
};


