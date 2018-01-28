/**
 * Created by alphabeta on 17-11-12.
 */

import faker from 'faker';


faker.locale = 'zh_CN'

console.log(faker.name.findName('邓').replace(/\s/g, ''))
