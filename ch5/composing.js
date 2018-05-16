const compose = (...fns) => (...args) => fns.reduceRight((accum, val) => [val.call(null, ...accum)], args)[0]
const curry = fn => {
  const arity = fn.length
  return function $curry (...args) {
    if (args.length < arity) return $curry.bind(null, ...args)
    return fn.call(null, ...args)
  }
}

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);

let a = shout('send in the clowns'); // "SEND IN THE CLOWNS!"
console.log(a)
const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));
const head = x => x[0];
const reverse = reduce((acc, x) => [x].concat(acc), []);
const last = compose(exclaim, toUpperCase, head, reverse);
let b = last(['jumpkick', 'roundhouse', 'uppercut']);
console.log(b)
let ab = compose(toUpperCase, compose(head, reverse));
let cd = compose(compose(toUpperCase, head), reverse);
console.log(ab(['jumpkick', 'roundhouse', 'uppercut']))
console.log(cd(['jumpkick', 'roundhouse', 'uppercut']))
