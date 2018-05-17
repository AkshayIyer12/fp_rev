import { curry, map, prop, printLn, add, compose } from '../util'
export default class Maybe {
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
const safeHead = xs => Maybe.of(xs[0])
const maybe = curry((v, f, m) => {
  if (m.isNothing) return v
  else return f(m.$value)
})
const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

printLn(Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10)))()
printLn(streetName({ addresses: [] }))()
// Nothing

printLn(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }))()
// Just('Shady Ln.')
// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account 
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);


// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(maybe('You\'re broke!', finishTransaction), withdraw(20));

printLn(getTwenty({ balance: 200.00 }))() 
// Just('Your balance is $180')

printLn(getTwenty({ balance: 10.00 }))()
