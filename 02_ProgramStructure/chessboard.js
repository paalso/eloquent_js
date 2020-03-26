// https://eloquentjavascript.net/2nd_edition/02_program_structure.html
// https://eloquentjavascript.net/code/#2.3

// Chessboard
// ===========

const SIZE = 8;
const isOddSize = SIZE % 2;
const pairsQty = Math.trunc(SIZE / 2);

const oddStr = ' #'.repeat(pairsQty) + (isOddSize ? ' ' : '');
const evenStr = '# '.repeat(pairsQty) + (isOddSize ? '#' : '');
for (let i = 0; i < pairsQty; ++i)
  console.log(oddStr + '\n' + evenStr);
isOddSize ? console.log(oddStr) : '';
