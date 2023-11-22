/*
https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter5#raznica-v-vozraste-materei-i-ikh-detei

https://eloquentjavascript.net/2nd_edition/05_higher_order.html

Sandbox:
https://eloquentjavascript.net/code/#5.2
*/

// Mother-child age difference
// ============================

import { ANCESTRY_FILE } from '../ancestors/ancestry.mjs';

const dataBase = JSON.parse(ANCESTRY_FILE);

const average = array => array.reduce((sum, e) => sum + e) / array.length;
const isFemale = ({sex}) => sex === 'f';

const byName = dataBase.reduce(
  (acc, e) => ({...acc, [e.name]: e}), {}
);

const getMotherChildAgeDiffs = dataBase => {
  const byName = dataBase.reduce(
    (acc, e) => ({...acc, [e.name]: e}), {}
  );
  const ageDiffs = dataBase.reduce(
    (acc, e) => {
      const mother = byName[e.mother];
      if (mother) {
        const ageDiff = e.born - mother.born;
        acc.push(ageDiff);
      }
      return acc;
    }, []
  )
  return ageDiffs;
};
const motherChildAgeDiffs = getMotherChildAgeDiffs(dataBase);
console.log(`Mother-child average differance: ${average(motherChildAgeDiffs)}`);


const getBirthData = dataBase => {
  const byName = dataBase.reduce(
    (acc, e) => ({...acc, [e.name]: e}), {}
  );
  const birthData = dataBase.reduce(
    (acc, e) => {
      const mother = byName[e.mother];
      if (mother) {
        const ageDiff = e.born - mother.born;
        acc.push([e.born, ageDiff]);
      }
      return acc;
    }, []
  )
  return birthData;
};

const birthData = getBirthData(dataBase)
  .sort((entry1, entry2) => entry1[0] - entry2[0]);

const printHistogram = (data, padPositions, histoToken = '#') => 
  data.forEach(([label, value]) => {
    const histoRow = `${histoToken.repeat(value)} ${value}`;
    const paddedLabel = String(label).padStart(padPositions);
    console.log(`${paddedLabel} ${histoRow}`);  
});

console.log('\nMother-child average differance histogram by birth year:');
printHistogram(birthData);


// Another version
/*
const byName = ANCESTORS.reduce(
  (acc, entry) => {
    acc[entry.name] = entry; 
    return acc;
  }, {}
);

// фильтруем записи: выделяем такие, чтобы была информация по матерям
const personsWithMothersInfo = ANCESTORS
.filter(person => person.mother && byName[person.mother]);

const mothersAndChildAgeDiffs = personsWithMothersInfo.map(
  person => person.born - byName[person.mother].born
)
*/