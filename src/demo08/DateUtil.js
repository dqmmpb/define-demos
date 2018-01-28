/**
 * Created by deng.qiming on 2017-01-07.
 */

import fecha from 'fecha';

/**
 * 日期辅助类
 * @type {{format: (function(*=, *=): *)}}
 */
class DateUtil {

  /**
   * 格式化日期时间，使用fecha插件
   * @param dateObj
   * @param format
   * @param pattern
   * @returns {*}
   */
  static format(dateObj, format, pattern) {
    format = format || 'YYYY-MM-DD HH:mm:ss';
    if (Object.prototype.toString.call(dateObj) === '[object Date]') {
      return fecha.format(dateObj, format);
    } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
      try {
        if (pattern) {
          return fecha.format(this.dateParse(dateObj, pattern), format);
        } else {
          return fecha.format(dateObj, format);
        }
      } catch (e) {
        console.warn('Warning, can not format date.');
        return dateObj;
      }
    } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
      return fecha.format(new Date(dateObj), format);
    } else {
      console.warn('Warning, can not format date.');
      return dateObj;
    }
  }

  /**
   * 将非日期时间对象转换为日期时间，使用fecha插件
   * @param dateObj
   * @param pattern
   * @returns {*}
   */
  static parse(dateObj, pattern) {
    pattern = pattern || 'YYYY-MM-DD HH:mm:ss';
    if (Object.prototype.toString.call(dateObj) === '[object Date]') {
      return dateObj;
    } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
      try {
        return fecha.parse(dateObj, pattern);
      } catch (e) {
        console.warn('Warning, can not parse date object.');
        return dateObj;
      }
    } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
      return new Date(dateObj);
    } else {
      console.warn('Warning, can not parse date object.');
      return dateObj;
    }
  }
}

export default DateUtil;
