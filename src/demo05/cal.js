/**
 * Created by alphabeta on 17-7-31.
 */


let money = 10000;
let rate = 10;
let days = 30;
let zrDays = 5;
let quan = 480;
let year = 365;
let zrCost = 0.2;
let pDays = 360;
let realRate = rate + quan/money/pDays*year*100;

console.log('项目天数：' + pDays + '天', '年化：' + Math.round(realRate * 100, 5) / 100 + '%', '持有' + days + '天可转让');
console.log('投资金额：' + Math.round(money * 100, 4) / 100 + '元', '返现券：' + Math.round(quan * 100, 4) / 100 + '元');
console.log('变现天数：' + zrDays + '天', '变现手续费：变现金额×' + zrCost + '%')
console.log('-------------------------------------');
for(var i = 0; i < 10; i++) {
    let lixi = money*rate/100 * pDays/year;
    let bianxian = money - 50*i;
    let fee = bianxian*zrCost/100;
    let zhuanqu = quan + bianxian - money - fee;
    let realDays = days + zrDays;
    let leftDays = pDays - realDays;
    let leftRate = (lixi - (bianxian - money))/bianxian/leftDays*year*100;
    let zhuanquRate = zhuanqu/money/realDays*year*100;
    console.log('接盘年化：' + Math.round(leftRate * 100, 4)/100 + "%", '接盘剩余：' + leftDays + '天', '变现金额：' + Math.round(bianxian * 100, 4) / 100 + '元', '手续费：' +  Math.round(fee * 100, 4) / 100 + '元', '变现收益：' +  Math.round(zhuanqu * 100, 4) / 100 + '元', '变现年化：' + Math.round(zhuanquRate * 100, 5)/100 + '%');
}