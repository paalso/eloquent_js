import { ANCESTRY_FILE } from './ancestry.mjs';

const dataBase = JSON.parse(ANCESTRY_FILE);

// Фильтруем массив
const youngIn1924 = dataBase.filter(
  ({born}) => 1900 < born && born < 1925
);
// console.log(youngIn1924);

// Преобразования при помощи map
const overNinetyNames = dataBase
  .filter(({born, died}) => died - born > 90)
  .map(({name}) => name);
// console.log(overNinetyNames);

// Суммирование при помощи reduce
const theOldestAncestor = dataBase.reduce(
  (acc, e) => e.born < acc.born ? e : acc
);
// console.log(theOldestAncestor);

// Компонуемость
// находящим средний возраст мужчин и женщин в наборе
const average = array => array.reduce((sum, e) => sum + e) / array.length;
const isMale = ({sex}) => sex === 'm';
const isFemale = ({sex}) => sex === 'f';
// const getAge = ({born}, {died}) => died - born;
// const getAge = ({born}, {died}) => died;
const getAge = ({born, died}) => died - born;
const averageMaleAge = average(dataBase.filter(isMale).map(getAge));
const averageFemaleAge = average(dataBase.filter(isFemale).map(getAge));
console.log(`Average male age:   ${averageMaleAge}`);
console.log(`Average female age: ${averageFemaleAge}`);
