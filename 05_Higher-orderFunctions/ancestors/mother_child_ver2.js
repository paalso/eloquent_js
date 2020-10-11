// https://eloquentjavascript.net/2nd_edition/05_higher_order.html
// https://eloquentjavascript.net/2nd_edition/code/#5.2

// Mother-child age difference
// ============================

import { ANCESTRY_FILE } from './ancestry';

const average = array => array.reduce((sum, el) => sum + el) / array.length;

// строим объект, который сопоставляет имена и людей
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
);

// console.log(personsWithMothersInfo);
console.log(average(mothersAndChildAgeDiffs));
