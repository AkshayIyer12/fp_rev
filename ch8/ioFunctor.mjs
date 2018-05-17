import {map, split, head, last, curry, compose, prop} from '../util'
import Maybe from './maybeFunctor'
class IO {
  constructor (io) {
    this.unsafePerformIO = io
  }
  static of (io) {
    return new IO(() => io)
  }
  map (fn) {
    return new IO(compose(fn, this.unsafePeformIO))
  }
  inspect () {
    return `IO(${this.unsafePeformIO})`
  }
}
const ioWindow = new IO(() => window);

ioWindow.map(win => win.innerWidth);
// IO(1430)

ioWindow
  .map(prop('location'))
  .map(prop('href'))
  .map(split('/'));
// IO(['http:', '', 'localhost:8000', 'blog', 'posts'])


// $ :: String -> IO [DOM]
const $ = selector => new IO(() => document.querySelectorAll(selector));

$('#myDiv').map(head).map(div => div.innerHTML);
// IO('I am some inner html')

// url :: IO String
const url = new IO(() => window.location.href);

// toPairs :: String -> [[String]]
const toPairs = compose(map(split('=')), split('&'));

// params :: String -> [[String]]
const params = compose(toPairs, last, split('?'));

// findParam :: String -> IO Maybe [String]
const findParam = key => map(compose(Maybe.of, filter(compose(eq(key), head)), params), url);

// -- Impure calling code ----------------------------------------------

// run it by calling $value()!
findParam('searchTerm').$value();
// Just([['searchTerm', 'wafflehouse']])
