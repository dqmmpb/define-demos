/**
 * Created by alphabeta on 17-9-4.
 */

'use strict';


class Utils {
    static isNumber(obj) {
        return obj === +obj;
    }
    static isString(obj) {
        return obj === obj + '';
    }
    static isBoolean(obj) {
        return obj === !!obj;
    }
    static isNullOrUndefined(obj) {
        return obj == null;
    }
}

class Rectangle {
    constructor(height, width) {
        if(Utils.isNumber(height) && Utils.isNumber(width)) {
            if(height >= 0 && width >= 0) {
                this.height = height;
                this.width = width;
            } else {
                throw new RangeError('长度或宽度不能小于0');
            }
        } else {
            throw new TypeError('长度或宽度类型不合法');
        }
    }
    get square() {
        return this.height * this.width;
    }
    get circumference() {
        return 2 * (this.height + this.width);
    }
}


class Point {
    constructor(x, y) {
        if(Utils.isNumber(x) && Utils.isNumber(y)) {
            this.x = x;
            this.y = y;
        } else {
            throw new TypeError('坐标(x,y)类型不合法');
        }
    }
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
}


try {
    const rect = new Rectangle(600, 800);
    console.log(`矩形(${rect.height}, ${rect.width})的面积为${rect.square}`);
    console.log(`矩形(${rect.height}, ${rect.width})的周长为${rect.circumference}`);
} catch (e) {
    console.log(e.message);
}

try {
    const p1 = new Point(5, 5);
    const p2 = new Point(10, 10);
    console.log(`点(${p1.x}, ${p1.y})和点(${p2.x},${p2.y})之间的距离是${Point.distance(p1, p2)}`);
} catch (e) {
    console.log(e.message);
}


class Square extends Rectangle {
    constructor(width) {
        super(width, width);
    }
}

try {
    const square = new Square(600);
    console.log(`正方形(${square.width})的面积为${square.square}`);
    console.log(`正方形(${square.width})的周长为${square.circumference}`);
} catch (e) {
    console.log(e.message);
}

