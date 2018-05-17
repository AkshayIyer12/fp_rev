import { id, map, add, prop, printLn, curry, compose, concat } from '../util'
import moment from 'moment'
class Either {
  constructor (x) {
    this.$value = x
  }
  static of (x) {
    return new Right(x)
  }
}
class Left extends Either {
  map(f) {
    return this;
  }
  inspect() {
    return `Left(${this.$value})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
  }

  inspect() {
    return `Right(${this.$value})`;
  }
}

const left = x => new Left(x);
printLn(Either.of('rain').map(str => `b${str}`))(); 
// Right('brain')

printLn(left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`))(); 
// Left('rain')

printLn(Either.of({ host: 'localhost', port: 80 }).map(prop('host')))();
// Right('localhost')

printLn(left('rolls eyes...').map(prop('host')))();

const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD')
  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed')
})

printLn(getAge(moment(), { birthDate: '2005-12-12' }))()
printLn(getAge(moment(), { birthDate: 'July 4, 2001' }))()

//  fortune :: Number -> String
var fortune = compose(concat('If you survive, you will be '), add(1));
const printer = m => console.log(m)
//  zoltar :: User -> Either(String, _)
//  var zoltar = compose(map(console.log), map(fortune), getAge(moment()));

// 'If you survive, you will be 10'
// Right(undefined)
// Left('Birth date could not be parsed')

const either = curry((f, g, e) => {
  let result;
  switch (e.constructor) {
  case Left:
    result = f(e.$value)
    break;
  case Right:
    result = g(e.$value)
    break;
  }
  return result
})

const zoltar = compose(console.log, either(id, fortune), getAge(moment()))
zoltar({  birthDate: '2005-12-12' });
zoltar({  birthDate: 'balloons!' });
