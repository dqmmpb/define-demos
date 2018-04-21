import {mat3} from 'gl-matrix';
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
    return new Matrix(mat3.create());
  }
  // 单位矩阵
  static I() {
    return Matrix.identity();
  }
  // 构造函数,数组
  constructor(matrix) {
    this.matrix = mat3.fromValues(...matrix);
  }
  // 平移
  translate(dx, dy) {
    // 平移矩阵
    const matrix = mat3.fromValues(
      1, 0, 0,
      0, 1, 0,
      dx, dy, 1,
    );
    const out = mat3.create();
    mat3.multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }
  // 旋转
  rotate(theta) {
    // 旋转矩阵
    const matrix = mat3.fromValues(
      Math.cos(theta), Math.sin(theta), 0,
      -Math.sin(theta), Math.cos(theta), 0,
      0, 0, 1,
    );
    const out = mat3.create();
    mat3.multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }
  // 缩放
  scale(sx, sy) {
    // 缩放矩阵
    const matrix = mat3.fromValues(
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    );
    const out = mat3.create();
    mat3.multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }
  // 矩阵乘法
  multiply(matrix) {
    const out = mat3.create();
    mat3.multiply(out, matrix.matrix, this.matrix);
    return new Matrix(out);
  }
  // 矩阵乘法
  x(matrix) {
    return this.multiply(matrix);
  }
  // 逆矩阵
  invert() {
    const out = mat3.create();
    mat3.invert(out, this.matrix);
    return new Matrix(out);
  }
  // 获取矩阵的某一行
  row(index) {
    const start = 3 * (index - 1);
    return Vector.create([this.matrix[start], this.matrix[start + 1], this.matrix[start + 2]]);
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
