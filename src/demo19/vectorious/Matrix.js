import v from 'vectorious';
import {Vector} from './Vector';

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
    return new Matrix(v.Matrix.identity(3));
  }
  // 单位矩阵
  static I() {
    return Matrix.identity();
  }
  // 构造函数,数组
  constructor(matrix) {
    this.matrix = new v.Matrix(matrix);
  }
  // 平移
  translate(dx, dy) {
    // 平移矩阵
    const matrix = new v.Matrix([
      [1, 0, 0],
      [0, 1, 0],
      [dx, dy, 1],
    ]);
    return new Matrix(this.matrix.multiply(matrix));
  }
  // 旋转
  rotate(theta) {
    // 旋转矩阵
    const matrix = new v.Matrix([
      [Math.cos(theta), Math.sin(theta), 0],
      [-Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 1],
    ]);
    return new Matrix(this.matrix.multiply(matrix));
  }
  // 缩放
  scale(sx, sy) {
    // 缩放矩阵
    const matrix = new v.Matrix([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ]);
    return new Matrix(this.matrix.multiply(matrix));
  }
  // 矩阵乘法
  multiply(matrix) {
    return new Matrix(this.matrix.multiply(matrix.matrix));
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
    return Vector.create([this.matrix.get(index - 1, 0), this.matrix.get(index - 1, 1), this.matrix.get(index - 1, 2)]);
  }
  // 获取矩阵元素
  elements() {
    return this.matrix;
  }
  // toString方法
  toString() {
    return this.matrix.toString();
  }
}

export {
  Matrix,
};
