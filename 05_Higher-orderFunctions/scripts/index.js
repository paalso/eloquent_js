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
* Expects a text (like 'Hello, Вася! Sieg, Χίτλερ! Упс!')
* Returns a string (41% Latin, 32% Cyrillic, 27% Greek)
* with sorted by percentage value descending order
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

  const charsShare = scripts
    .map(({ name, count }) => ({ name, "share": Math.round(count / totalChars * 100) }))
    .sort((item1, item2) => item2.share - item1.share);

  return charsShare
  .map(({ name, share }) => `${share}% ${name}`)
  .join(', ');
}

const s1 = '41% Latin, 32% Cyrillic, 27% Greek';    
const s2 = '英国的狗说"woof", 俄罗斯的狗说"тяв"';


console.log(textScripts(s1));   // '41% Latin, 32% Cyrillic, 27% Greek'
console.log(textScripts(s2));   // '61% Han, 22% Latin, 17% Cyrillic'

