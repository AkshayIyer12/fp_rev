class Maybe {
  constructor (x) {
    this.$value = x
  }
  static of (x) {
    return new Maybe(x);
  }

  get isNothing () {
    return this.$value === null || this.$value === undefined;
  }
  
  map (fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  inspect () {
    return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
  }
}
const prop = curry((p, obj) => obj[p])
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
const match = curry((re, str) => re.test(str))
const add = curry((a, b) => a + b)
console.log(Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10)))
const safeHead = xs => Maybe.of(xs[0])
const map = curry((fn, f) => f.map(fn));
const compose = (...fns) => (...args) => fns.reduceRight((accum, val) => [val.call(null, ...accum)], args)[0]
const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

console.log(streetName({ addresses: [] }))
// Nothing

console.log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }))
// Just('Shady Ln.')
