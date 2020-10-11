// https://eloquentjavascript.net/2nd_edition/05_higher_order.html

// Historical life expectancy
// ===========================

import { ANCESTRY_FILE } from './ancestry';

const round = (x, accuracy) => Math.round(x * 10 ** accuracy) / 10 ** accuracy;
const sum = (x, y) => x + y;
const average = coll => coll.reduce(sum) / coll.length;

const dataBase = JSON.parse(ANCESTRY_FILE);

const personsCentury = person => Math.ceil(person.died / 100);

const personsAge = person => person.died - person.born;

const byCenturies = {};

dataBase.forEach(person => {
  const century = personsCentury(person);
  if (!byCenturies.hasOwnProperty(century))
    byCenturies[century] = [];
  byCenturies[century].push(personsAge(person));
});

console.log(byCenturies);

for (const [century, ages] of Object.entries(byCenturies))
  console.log(`${century} : ${round(average(ages), 1)}`);
