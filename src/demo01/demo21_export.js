'use strict';


/**
 * export 导出的变量值是动态绑定关系，即通过该接口，可以取到模块内部实时的值
 * @type {string}
 */
export var foo = 'bar';
setTimeout(() => foo = 'baz', 300);
