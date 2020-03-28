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


/**
* Expects a text (like 'Упс! hello, Вася! Χίτλερ!')
* Returns a string (39% Cyrillic, 28% Latin, 33% Greek)
*/
function textScripts(text) {
  const scripts = countBy(text, char => {
    const script = characterScript(char.codePointAt(0), SCRIPTS);
    return script ? script.name : "null";
  })
    .filter(({ name }) => name != "null");

  const totalChars = scripts.reduce(
    (acc, { count }) => acc + count, 0);
  if (totalChars == 0) return "No scripts found";

  const charsShare = scripts.map(
    ({ name, count }) => `${Math.round(count / totalChars * 100)}% ${name}`
  );

  return charsShare.join(', ');
}

const s1 = 'Упс! hello, Вася! Χίτλερ!';
const s2 = '英国的狗说"woof", 俄罗斯的狗说"тяв"';


console.log(textScripts(s1));
console.log(textScripts(s2));   // '61% Han, 22% Latin, 17% Cyrillic'