import { JOURNAL } from './jacques_journal';

function phi(table) {
  const col0 = table[0] + table[2];
  const col1 = table[1] + table[3];
  const row0 = table[0] + table[1];
  const row1 = table[2] + table[3];
  return (table[3] * table[0] - table[1] * table[2]) /
    Math.sqrt(col0 * col1 * row0 * row1);
}

function gatherEvents(journal) {
  const allEventsList = [];
  journal.forEach(dayInfo => {
    dayInfo.events.forEach(event => {
      if (! allEventsList.includes(event))
        allEventsList.push(event);
    });
  });
  return allEventsList;
}

function tableForEvent(event, journal) {
  const table = [0,0,0,0];
  for (const entry of journal) {
    let index = 0;
    if (entry.squirrel)
      index += 2;
    if (entry.events.includes(event))
      index += 1;
    table[index] += 1;
  }
  return table;
}

function getCorrelationsTable(journal, accuracy = 2) {
  const eventsCorrelations = {};
  for (const event of gatherEvents(JOURNAL)) {
    const value = phi(tableForEvent(event, JOURNAL));
    eventsCorrelations[event] = Math.round(
      value * Math.pow(10, accuracy)) / Math.pow(10, accuracy);
  }
  return eventsCorrelations;
}

function filterTable(table, moreThen) {
  const filtered = {};
  for (const event in table)
    if (Math.abs(table[event]) > moreThen)
      filtered[event] = table[event];
  return filtered;
}

const correlationsTable = getCorrelationsTable(JOURNAL);
const sortedCorrelations = Object.values(correlationsTable).
  sort((x, y) => Math.abs(x) - Math.abs(y));

console.log(filterTable(correlationsTable, 0.1));
