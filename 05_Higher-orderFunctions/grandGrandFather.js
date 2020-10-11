const ancestry = [
  { "name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel" },
  { "name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme" },
  { "name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen" },
  { "name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten" },
  { "name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano" },
  { "name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother": null },
  { "name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother": null },
  { "name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene" },
  { "name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm" },
  { "name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes" },
  { "name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother": null },
  { "name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape" },
  { "name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters" },
  { "name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans" },
  { "name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother": null },
  { "name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke" },
  { "name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker" },
  { "name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker" },
  { "name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze" },
  { "name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke" },
  { "name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father": null, "mother": null },
  { "name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke" },
  { "name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze" },
  { "name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene" },
  { "name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters" },
  { "name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke" },
  { "name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke" },
  { "name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters" },
  { "name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze" },
  { "name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano" },
  { "name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke" },
  { "name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes" },
  { "name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke" },
  { "name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens" },
  { "name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander" },
  { "name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke" },
  { "name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert" },
  { "name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier" },
  { "name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke" }
];

var byName = {};      // объект, который сопоставляет имена и людей.
ancestry.forEach(function (person) {
  byName[person.name] = person;
});


/*
1)  reduceAncestors - это функция, с помощью к-й можно обработать
структуру ANCESTORS произвольным образом (в зависимости от f)
Это универсальный обработчик структуры, вернее дерева предков
("reduceAncestors"), к-й идет от заданного имени вверх по дереву,
пока не упрется в "отсутствующих" лиц */

/**
 * Осуществляет обработку дерева предков person
 * @param {object} person объект person
 * @param {callback} f функция, вычисляющая необходимое значение для person
 * @param {} defaultValue значение для person === null
 */
function reduceAncestors(person, f, defaultValue) {
  function helper(person) {
    if (!person) return defaultValue;
    return f(person, helper(byName[person.father]), helper(byName[person.mother]));
  }
  return helper(person);
}

/* Функция нижу вычислет % ДНК, к - й передается от родителей к person -
т.е. и есть та функция f, к - я передается как параметр в reduceAncestors
Не забыть условие окончания рекурсии, а для этого нужен
патриарх = Pauwels van Haverbeke
для этого, кстати, в ф - ю и приходится передавать person - это единственный случай,
когда потребовалсь значение параметра person
fromMother и fromFather - это те части генов "патриарха",
к - е дошли до них; их ребенок, естественно, получает 0.5 от каждого из них */

/**
 * Возвращает долю генов (патриарха), полученную непосредственно
 * от родителей суммарно
 * @param {object} person Объект person
 * @param {number} fromMother Доля генов, полученная от матери
 * @param {number} fromFather Доля генов, полученная от отца
 * @return {number} Суммарная доля генов, полученная от отца и матери
 */
function sharedDNA(person, fromMother, fromFather) {
  if (person.name === "Pauwels van Haverbeke") return 1;
  return 0.5 * (fromFather + fromMother);
}

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);   // → 0.00049


/* "Можно было бы подсчитать это число и без использования reduceAncestors.
Но (!!!) разделение общего подхода (обход древа) и конкретного случая
(подсчёт ДНК) (!!!) позволяет нам писать более понятный код и использовать
вновь части кода для других задач." (М. Хавербеке) */


/*
Следующий код выясняет процент известных предков данного человека,
доживших до 70 лет. */

/*
В функцию ниже передается функция-предикат test, фильтрующая элементы,
подпадающие под суммирование
В ней внутри вызывается функция, combine, к-я задает операцию суммирования
Это ф-я затем передается как параметр f в reduceAncestors */

/**
 * Суммирует какую-л. величину по предкам person
 * @param {object} person Объект person
 * @param {callback} test Функция-предикат, определяющая добавлять ли к сумме
 * @return {number} Сумма некотрой величины по дереву предков person
 */
function countAncestors(person, test) {
  const summator = (person, fromMother, fromFather) =>
    fromFather + fromMother + (test(person) ? 1 : 0);
  return reduceAncestors(person, summator, 0);
}

/**
 * Рассчитывает % предков, проживших >= 70 лет
 * @param {object} person Объект person
 * @return {number} % предков, проживших >= 70 лет
 */
function longLivingPercentage(person) {
  // считаем всех предков, 
  //         предков, проживших >= 70 лет выводим отношение
  // const totalAncestorsQty = countAncestors(person, person => person);
  const allAncestorsQty = countAncestors(person, person => person);
  const older70AncestorsQty = countAncestors(person, person => person.died - person.born >= 70);
  return older70AncestorsQty / allAncestorsQty;
}
console.log(longLivingPercentage(byName["Emile Haverbeke"]));
  // → 0.145
