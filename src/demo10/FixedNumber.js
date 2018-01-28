/**
 * Created by alphabeta on 17-11-14.
 */

function fixedMoney(num, places, halfUp) {
  num = num || '';
  places = !isNaN(places = Math.abs(places)) ? places : 2;

  const reg = /^(\d+)(\.\d{0,2})?$/;
  var firstPostion = num.indexOf('.');
  var digitValue = firstPostion != -1 ? num.substring(0, firstPostion) : num;
  var precisionValue = firstPostion != -1 ? num.substring(firstPostion + 1) : '';
  precisionValue = precisionValue.indexOf('.') !== -1 ? precisionValue.indexOf('.') === 0 ? '' : num.substring(0, firstPostion) : precisionValue
  var persision = precisionValue.length;
  num = firstPostion != -1 ? digitValue + '.' + precisionValue : num;

  if (!reg.test(num)) {
    if (persision > places) {
      if (!halfUp) {
        num = num.substring(0, firstPostion + 1 + places)
      }
      else
        num = num.substring(0, firstPostion + 1 + places)
    }
  }
  return num
}

export default fixedMoney;

//exports.fixedMoney = fixedMoney;

console.log(exports);
console.log(module.exports);
