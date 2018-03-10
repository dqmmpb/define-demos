/**
 * Created by alphabeta on 18-1-28.
 */

var log4js = require('log4js');
var {config} = require('./config/index');

log4js.configure(config);
const logger = log4js.getLogger();
// const logger = log4js.getLogger('symbol');

const shapeType = {
  triangle: Symbol('Triangle'),
  rectangle: Symbol('Rectangle'),
  square: Symbol('Square'),
  circle: Symbol('Circle'),
};

const log = console.log;

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = ((options) => {
        let {width, height} = options;
        return 0.5 * width * height;
      })(options);
      break;
    case shapeType.rectangle:
      area = ((options) => {
        let {width, height} = options;
        return width * height;
      })(options);
      break;
    case shapeType.square:
      area = ((options) => {
        let {edge} = options;
        return edge * edge;
      })(options);
      break;
    case shapeType.circle:
      area = ((options) => {
        let {radius} = options;
        return Math.PI * radius * radius;
      })(options);
      break;
  }
  return area;
}

log(getArea(shapeType.triangle, {width: 100, height: 100}));
log(getArea(shapeType.rectangle, {width: 100, height: 200}));
log(getArea(shapeType.square, {edge: 100}));
log(getArea(shapeType.circle, {radius: 100}));


logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.fatal('fatal');


function buildList(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    var a_item = 'item' + i;
    result.push((function () {
      return a_item + ' ' + list[i]
    }()));
  }
  return result;
}

function testList() {
  var fnlist = buildList([1, 2, 3]);
  // Using j only to help prevent confusion -- could use i.
  for (var j = 0; j < fnlist.length; j++) {
    console.log(fnlist[j]);
  }
}

testList(); //logs "item2 undefined" 3 times

let test = Number(2);
log(test);
