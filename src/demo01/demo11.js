'use strict';

const ansi = require('ansicolor').nice;

const execArgv = process.execArgv.filter((argv) => {
  return /--inspect.*/.test(argv);
});

const isInspect = execArgv && execArgv.length > 0;

const log = require('ololog').configure({
  render: (text, {
    engine = ((typeof window !== 'undefined') && (window.window === window) && window.navigator)
      ? (navigator.userAgent.indexOf ('Chrome') >= 0)
        ? 'chrome'
        : 'generic'
      : isInspect ? 'chrome' : 'ansi',
    engines = { /* configurable */ },
    consoleMethod = 'log',
    defaults = {
      ansi:    s => console[consoleMethod] (s),
      chrome:  s => console[consoleMethod] (...ansi.parse (s).asChromeConsoleLogArguments),
      generic: s => console[consoleMethod] (ansi.strip (s))
    }
  }) => ((text && ({...defaults, ...engines})[engine] (text), text)),
});

// console.log('log default');
log('blue underline bgGreen'.blue.underline.bgGreen, 'log'.red);
log('OMG Rainbows!'.red.bright.bgYellow);
log(('foo'.red.bright + ' test').blue);

// console.log('obj');
const obj = {
  abc: 1,
};
log(obj);
log.error(('foo'.red.bright + ' test').blue);
