// https://eloquentjavascript.net/2nd_edition/05_higher_order.html
// https://eloquentjavascript.net/2nd_edition/code/#5.2

// Mother-child age difference
// ============================

import { ANCESTRY_FILE } from './ancestry';

const sum = (x, y) => x + y;
const average = coll => coll.reduce(sum) / coll.length;

const dataBase = JSON.parse(ANCESTRY_FILE);

// объект, который сопоставляет имена и людей
const byName = {};
dataBase.forEach(element => {
  byName[element.name] = element;
});

const motherBirthGivingAge = person => person.born - byName[person.mother].born;

const mothersBirthGivingAges = [];

dataBase.forEach(person => {
  const mother = byName[person.mother];
  if (mother) {
    mothersBirthGivingAges.push(motherBirthGivingAge(person));
  }
});

console.log(
  `Average age difference between mothers and children: ${average(mothersBirthGivingAges)}`
);  // → 31.2


/*
const differences = ancestry.filter(function(person) {
  return byName[person.mother] != null;
}).map(function(person) {
  return person.born - byName[person.mother].born;
});
*/