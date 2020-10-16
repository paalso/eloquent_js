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


// Используем простой тип Vector для представления этих пар координат.
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// Объявляем объект Grid (сетка) с основными методами:
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function(vector) {
  const [x, y] = [vector.x, vector.y];
  return 0 <= x && x < this.width && 0 <= y && y < this.height;
};

Grid.prototype.get = function(vector) {
  return this.space[vector.y * this.width + vector.x];
};

Grid.prototype.set = function(vector, value) {
  this.space[vector.y * this.width + vector.x] = value;
};

// Test
var grid = new Grid(5, 4);
console.log(grid.get(new Vector(1, 1)));  // → undefined
grid.set(new Vector(1, 1), "X");
console.log(grid.get(new Vector(1, 1)));  // → X
