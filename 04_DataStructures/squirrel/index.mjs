import { JOURNAL } from './jacques_journal.mjs';

// ----------------------------------------------------------------------------
const intersection = (array1, array2) => {
  const filtered = array1.filter((value) => array2.includes(value));
  return [...new Set(filtered)];
};

const isSubArray = (subArray, array) => subArray.every(e => array.includes(e));

const matchEventsInfo = (events, eventsInfo) => {
  const happened = Object.keys(eventsInfo).filter(key => eventsInfo[key]);
  const notHappened = Object.keys(eventsInfo).filter(key => ! eventsInfo[key]);
  return isSubArray(happened, events) && intersection(notHappened, events).length === 0;
}
// ----------------------------------------------------------------------------
const phi = (table) => {
  return (table[0] * table[3] - table[1] * table[2]) / 
  Math.sqrt(
    (table[1] + table[3]) *
    (table[0] + table[1]) *
    (table[0] + table[2]) *
    (table[2] + table[3]));
};

const hasEvent = (event, entry) => entry.events.indexOf(event) != -1;

/* 
  Усовершенствованная, - по сравнению с книгой - функция:
  вместо того, чтобы принимать единичный event, принимает в общем случае
  объект типа { 'peanuts': true, 'brushed teeth': false, 'carrot': true }
  и находит матрицу сооттветствий для такого комбинированного события;
  также может принимать event типа string - преобразуется в {event: true} и
  event типа array - преобразуется в объект с значением true для каждого ключа
  из массива 
}
*/
const tableFor = (event, journal) => {
  let eventsInfo = event;
  if (typeof event === 'string')
    eventsInfo = {[event]: true};
  else if (Array.isArray(event))
    eventsInfo = event.reduce(
      (acc, e) => ({...acc, [e]: true}), {}  
    );

  const table = [0, 0, 0, 0];
  journal.forEach(entry => {
    let index = 0;
    if (matchEventsInfo(entry.events, eventsInfo))
      index += 1;
    if (entry.squirrel)
      index += 2;
    table[index] += 1;
  });
  return table;
};

const getCorrelation = (event, journal) => phi(tableFor(event, journal));

const getJournalEvents = journal => [...new Set(journal.flatMap(({events}) => events))];

const getCorrelations = journal => getJournalEvents(journal)
  .reduce(
    (acc, event) => {
      acc[event] = phi(tableFor(event, journal));
      return acc;
    }, {}
  );
  
const filterCorrelations = (correlations, thresholdValue) =>
  Object.fromEntries(
    Object.entries(correlations).filter(([_, value]) => Math.abs(value) >= thresholdValue)
  );

// --------------------------------------------------------

const journal = [...JOURNAL];
const journalEvents = getJournalEvents(journal);
const correlations = getCorrelations(journal);

console.log(`All correlations:`);
console.log(correlations);

const highCorrelations = filterCorrelations(correlations, 0.1);
console.log(`High correlations:`);
console.log(highCorrelations);

const specialEvent = {
  'peanuts': true,
  'brushed teeth': false,
}

console.log(
  'peanuts && not brushed teeth correlation: ',
  getCorrelation(specialEvent, journal));
