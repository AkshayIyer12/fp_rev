const curry = fn => {
  const arity = fn.length;
  return function $curry (...args) {
    return args.length < arity ? $curry.bind(null, ...args) : fn.call(null, ...args);
  }
}
const match = curry((re, str) => re.test(str))
const add = curry((a, b) => a + b)
const printLn = x => () => console.log(x)
const map = curry((fn, f) => f.map(fn));
const compose = (...fns) => (...args) => fns.reduceRight((accum, val) => [val.call(null, ...accum)], args)[0]
const prop = curry((p, obj) => obj[p])
export {
  curry,
  match,
  add,
  printLn,
  map,
  compose,
  prop
}