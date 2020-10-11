// https://eloquentjavascript.net/2nd_edition/06_object.html
// https://eloquent-javascript.karmazzin.ru/chapter6#vektornyi-tip
// https://eloquentjavascript.net/2nd_edition/code/#6.1


// A Vector type
// ==============

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Object.defineProperties(Vector.prototype, {
  length: {
    get: function () {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  },
  plus: {
    value: function (otherVector) {
      const [x, y] = [otherVector.x, otherVector.y];
      return new Vector(this.x + x, this.y + y);
    }
  },
  minus: {
    value: function (otherVector) {
      const [x, y] = [otherVector.x, otherVector.y];
      return new Vector(this.x - x, this.y - y);
    }
  }
});


const v = new Vector(3, 4);
const v1 = new Vector(1, 3);
console.log(v.length);
console.log(v.plus(v1));
console.log(v.minus(v1));

