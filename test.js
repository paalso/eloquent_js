const person = {
    name : "Paul"
}

function sayName (text) {
    console.log(text + this.name);
}

// sayName.call(person, "I am ");

console.dir(Number);