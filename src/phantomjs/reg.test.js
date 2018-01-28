var str = "lender.openbuywindow(1,1005493,'8.3%')";

var regExp = /^lender.openbuywindow\(1,(\d+),\'(\d+.\d+)%\'\)$/;


var mR = str.match(regExp);
var itemId = mR[1];
var rate = mR[2];
var needAmount = "needAmount" + itemId;
var wmpsYuGouAmount = "wmpsYuGouAmount" + itemId;
var touzi = "touzi" + itemId;

console.log(needAmount, wmpsYuGouAmount, touzi);
console.log(rate === '8.3' || rate === '9.3');

var da = new Date();

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

console.log(da.Format('yyyy-MM-dd hh:mm:ss'));
