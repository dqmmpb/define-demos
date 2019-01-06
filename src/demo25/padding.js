'use strict';


function nullOrUndefined(obj) {
  return obj === null || obj === undefined;
}

/**
 * 左补位
 * @param val 待补位字符串
 * @param num 补位后字符串长度
 * @param pad 补位字符，默认使用'0'进行补位；支持多字符补位
 *            例如：
 *            1. leftPad('123', 10, 'A') => 'AAAAAAA123'
 * @returns {string}
 */
function leftPad(val, num, pad) {
  const str = String(val);
  const padStr = (!nullOrUndefined(pad) && String(pad).length >= 0)
    ? String(pad)
    : '0';
  let padding = '';
  let diff = num - str.length;

  if (diff > 0) {
    const padLen = padStr.length;
    do {
      if (diff < padLen) {
        padding = padStr.slice(padStr.length - diff) + padding;
      } else {
        padding = padStr + padding;
      }
      diff -= padLen;
    } while (diff > 0 && padLen > 0);
  }

  return padding + str;
}

/**
 * 右补位
 * @param val 待补位字符串
 * @param num 补位后字符串长度
 * @param pad 补位字符，默认使用'0'进行补位；支持多字符补位
 *            例如：
 *            1. rightPad('123', 10, 'A') => '123AAAAAAA'
 * @returns {string}
 */
function rightPad(val, num, pad) {
  const str = String(val);
  const padStr = (!nullOrUndefined(pad) && String(pad).length >= 0)
    ? String(pad)
    : '0';
  let padding = '';
  let diff = num - str.length;

  if (diff > 0) {
    const padLen = padStr.length;
    do {
      if (diff < padLen) {
        padding += padStr.slice(0, diff);
      } else {
        padding += padStr;
      }
      diff -= padLen;
    } while (diff > 0 && padLen > 0);
  }

  return str + padding;
}

module.exports = {
  leftPad,
  rightPad,
};
