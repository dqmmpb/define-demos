import s from 'sylvester';

// import {Vector} from './Vector';

/**
 * 矩阵
 */
class Matrix {
  // 静态工厂
  static create(matrix) {
    if (matrix instanceof Array) {
      return new Matrix(matrix);
    } else {
      return Matrix.identity();
    }
  }
  // 单位矩阵
  static identity() {
    return new Matrix(s.Matrix.I(3).elements);
  }
  // 单位矩阵
  static I() {
    return Matrix.identity();
  }
  // 构造函数,数组
  constructor(matrix) {
    this.matrix = s.Matrix.create(matrix);
  }
  // 平移
  translate(dx, dy) {
    // 平移矩阵
    const matrix = s.Matrix.create([
      [1, 0, 0],
      [0, 1, 0],
      [dx, dy, 1],
    ]);
    return new Matrix(this.matrix.x(matrix));
  }
  // 旋转
  rotate(theta) {
    // 旋转矩阵
    const matrix = s.Matrix.create([
      [Math.cos(theta), Math.sin(theta), 0],
      [-Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 1],
    ]);
    return new Matrix(this.matrix.x(matrix));
  }
  // 缩放
  scale(sx, sy) {
    // 缩放矩阵
    const matrix = s.Matrix.create([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ]);
    return new Matrix(this.matrix.x(matrix));
  }
  // 矩阵乘法
  multiply(matrix) {
    return new Matrix(this.matrix.x(matrix));
  }
  // 矩阵乘法
  x(matrix) {
    return this.multiply(matrix);
  }
  // 逆矩阵
  invert() {
    return new Matrix(this.matrix.inverse());
  }
  // 获取矩阵的某一行
  row(index) {
    const start = 3 * (index - 1);
    return Vector.create([this.matrix[start], this.matrix[start + 1], this.matrix[start + 2]]);
  }
  // 获取矩阵元素
  elements() {
    return this.matrix.elements;
  }
  // toString方法
  toString() {
    return this.matrix.elements.toString();
  }
}

export {
  Matrix,
};
