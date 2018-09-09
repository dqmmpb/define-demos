'use strict';

import {foo} from './demo21_export';

console.log(foo);
setTimeout(() => {
  console.log(foo);
}, 400)
