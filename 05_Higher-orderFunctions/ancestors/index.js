import { ANCESTRY_FILE } from './ancestry';

const dataBase = JSON.parse(ANCESTRY_FILE);
// console.log(ANCESTRY_FILE);
// const bornAfter1900 = ANCESTRY_FILE.

// Родившиеся в начале века
const beginningXXcenturyBorn = dataBase.filter(
  ({ born }) => 1900 < born && born < 1925
);
console.log(beginningXXcenturyBorn.map(entry => entry.name));

// все мужчины
const men = dataBase.filter(entry => entry.sex === 'm');
console.log(men);

// Прожившие >= 90 лет
const overNinety = dataBase.filter(({ born, died }) => died - born >= 90);
console.log(overNinety);

const deathAge = (person) => person.died - person.born;
// самый старый
const oldest = dataBase.reduce(
  (person1, person2) =>
    deathAge(person1) > deathAge(person2) ? person1 : person2
);
console.log(oldest);

// самый старый мужчина
const oldestMale =
  dataBase.
    filter(entry => entry.sex === 'm').
    reduce((person1, person2) =>
      deathAge(person1) > deathAge(person2) ? person1 : person2
    );
console.log(oldestMale);


const sum = (x, y) => x + y;
const average = coll => coll.reduce(sum) / coll.length;

const filterBySex = (coll, sexId) => coll.filter(({ sex }) => sex === sexId);
// const filterBySex = (coll, sexId) => coll.filter(entry => entry.sex === sexId);
// const deathAge = (person) => person.died - person.born;
const averageAge = coll => average(coll.map(person => deathAge(person)));

// console.log('Average age:', averageAge(dataBase));
// console.log('Average age, Male:', averageAge(filterBySex(dataBase, 'm')));
// console.log('Average age, Female:', averageAge(filterBySex(dataBase, 'f')));


// напишем код, находящий средний возраст мужчин и женщин в наборе...


const age = personInfo => personInfo.died - personInfo.born;
const isMale = personInfo => personInfo.sex === 'm';
const isFemale = personInfo => personInfo.sex === 'f';

console.log('Average age:', averageAge(dataBase.map(age)));
console.log('Average age, Male:', average(dataBase.filter(isMale).map(age)));
console.log('Average age, Male:', average(dataBase.filter(isFemale).map(age)));