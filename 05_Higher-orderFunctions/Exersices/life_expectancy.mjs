/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter5#istoricheskaya-ozhidaemaya-prodolzhitelnost-zhizni

https://eloquentjavascript.net/2nd_edition/05_higher_order.html

Sandbox:
https://eloquentjavascript.net/code/#5.3
*/

// Historical life expectancy
// ============================

import { ANCESTRY_FILE } from '../ancestors/ancestry.mjs';

const dataBase = JSON.parse(ANCESTRY_FILE);

const average = (array, accuracy) =>
  Math.round(
    (array.reduce((sum, e) => sum + e) / array.length) * 10 ** accuracy
  ) / 10 ** accuracy;

const getCentury = year => Math.ceil(year / 100, 0);

const lifeExpectancyByCentury = dataBase
  .reduce(
    (acc, e) => {
      const century = getCentury(e.died);
      if (! acc.hasOwnProperty(century))
        acc[century] = [];
        acc[century].push(e.died - e.born);
        return acc;
    }, {}
  );

const averageLifeExpectancyByCentury =
  Object.entries(lifeExpectancyByCentury)
    .reduce((acc, [year, data]) => ({...acc, [year]: average(data, 1)}), {});

const printHistogram = (data, scale = 1, padPositions, histoToken = '#') => 
  data.forEach(([label, value]) => {
    const histoRow = `${histoToken.repeat(Math.round(value / scale))} ${value}`;
    const paddedLabel = String(label).padStart(padPositions);
    console.log(`${paddedLabel} ${histoRow}`);  
});

console.log(averageLifeExpectancyByCentury);
console.log('\nAverage life expectancy by century:');
printHistogram(
  Object.entries(averageLifeExpectancyByCentury)
    .sort((e1, e2) => e1[0] - e2[0]),
  2
);
