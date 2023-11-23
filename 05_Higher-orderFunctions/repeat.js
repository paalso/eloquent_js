// Функции высшего порядка
// https://karmazzin.gitbook.io/eloquentjavascript_ru/chapter5#funkcii-vysshego-poryadka

function unless(test, then) {
  if (!test) then();
}

function repeat(times, body) {
  for (var i = 0; i < times; i++) body(i);
}

const tries = 5;
repeat(tries, n => {
  unless(
    n % 2 === 1,
    () => console.log(`${n} is even`))
  }
);
