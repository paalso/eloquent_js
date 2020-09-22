// https://eloquent-javascript.karmazzin.ru/chapter3#rekursiya
// https://eloquentjavascript.net/2nd_edition/03_functions.html

// Можно получить бесконечное количество чисел, начиная с числа 1, и потом
// либо добавляя 5, либо умножая на 3. Как нам написать функцию, которая, получив
// число, пытается найти последовательность таких сложений и умножений, которые
// приводят к заданному числу?

function findSolution(target) {
    function helper(next, expression) {
        if (next === target)
            return expression;
        if (next > target)
            return null;
        return helper(next + 5, `(${expression} + 5)`) || helper(next * 3, `(${expression} * 3)`);
    }
    return helper(1, "1");
}

for (let index = 3; index < 100; index++) {
    console.log(`${index} = ${findSolution(index)}`)
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
