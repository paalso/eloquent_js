// https://eloquent-javascript.karmazzin.ru/chapter3#rekursiya
// https://eloquentjavascript.net/2nd_edition/03_functions.html

// Можно получить бесконечное количество чисел, начиная с числа 1, и потом
// либо добавляя 5, либо умножая на 3. Как нам написать функцию, которая, получив
// число, пытается найти последовательность таких сложений и умножений, которые
// приводят к заданному числу?

const findSolution = number => {
  const helper = (n, solution) => {
    if (n === number)
      return solution;
    if (n > number)
      return null;

    // Устраняем лишние скобки
    // На самом деле можно усовершенствовать, чтобы не получать
    // выражения типа ((1 + 5 + 5) * 3) * 3
    const multipliedResultString =
      solution.includes('+') ? `(${solution}) * 3` : `${solution} * 3`;
    
      return helper(n + 5, `${solution} + 5`) ||
             helper(n * 3, multipliedResultString);
  };
  return helper(1, '1');
}

for (let k = 2; k < 100; k++) {
  console.log(`${String(k).padStart(3)} = ${findSolution(k)}`);
}

/*
Между делом возник вопрос:
почему с неудачной ветвью helper'а, возвращающей null, findSolution сразу
так же не возвращает null?
Все дело в этой строке:
return helper(next + 5, `(${expression} + 5)`) || helper(next * 3, `(${expression} * 3)`);
- в дизъюнкции, т.е. findSolution возвращает дизъюнкцию результатов всех ветвей,
и если среди них находится хотя бы  один ненулевой (не-null-евой) результат,
то возвращается его значение
*/
