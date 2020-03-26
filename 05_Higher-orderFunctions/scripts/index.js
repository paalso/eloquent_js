import { SCRIPTS } from './scripts';

const dataBase = SCRIPTS;

/**
* Find the script corresponding done symbol code (if any)
*/
const characterScript = (code, scripts) => {
    for (const script of scripts)
        if (script.ranges.some(([from, to]) => from <= code && code < to))
            return script;

    return null;
};


/**
* Expects a collection and a function that computes a group name
* for a given element. 
* Returns an array of objects, each of which names a group and tells
* you the number of elements that were found in that group.
*/
const countBy = (items, groupName) => {
    const qtyByName = [];
    for (const item of items) {
        const name = groupName(item);
        const pos = qtyByName.findIndex(e => e.name === name);
        if (pos < 0)
            qtyByName.push({ name: name, count: 1 })
        else
            qtyByName[pos].count += 1;
    }
    return qtyByName;
};


















// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

// console.log(countBy(['mama', 'peppa', 'marmelade', 'pete', 'pendulim', 'tart'],
//     word => word.slice(0, 2))
// );
