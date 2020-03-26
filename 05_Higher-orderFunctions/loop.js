// https://eloquentjavascript.net/05_higher_order.html
// https://eloquentjavascript.net/code/#5.2

// Your own loop
// ==============

// Version 1
// function loop(times, cond, upd, action) {
//   for (let i = times; cond(i); i = upd(i))
//     action(i);
// }

// Version 2
// function loop(times, cond, upd, action) {
//   let i = times;
//   while (cond(i)) {
//     action(i);
//     i = upd(i);
//   }
// }

// Version 3
function loop(times, cond, upd, action) {
  if (!cond(times))
    return;

  action(times);
  loop(upd(times), cond, upd, action);
}


loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
