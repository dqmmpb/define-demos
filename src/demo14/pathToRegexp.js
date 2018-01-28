/**
 * Created by alphabeta on 17-12-18.
 */
var pathToRegexp = require('path-to-regexp')


var res = pathToRegexp('/app/me/:module?').exec('/app/me/profile')
console.log(res)
var res1 = pathToRegexp('/app/me/:module?').exec('/app/me')
console.log(res1)
var res2 = pathToRegexp('/app/me/:module?').exec('/app/me1')
console.log(res2)
var res3 = pathToRegexp('/app/me/:module*').exec('/app/me/device/add')
console.log(res3)
var res3 = pathToRegexp('/app/me/:module*').exec('/app/me/device/add')
console.log(res3)