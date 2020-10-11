function Human(name, sex) {
  this.name = name;
  this.sex = sex;
}

Human.sayHello = function() {
  console.log("Hello");
};

Human.prototype.sayName = function() {
  console.log(`My name is ${this.name}`);
};

Human.prototype.haveSex = function(name) {
  console.log(`I had sex with ${name}`);
};


const human  = new Human("Tom", "male");
human.sayName();
human.haveSex("Jane");

console.log(Human);
console.log(Human.prototype);