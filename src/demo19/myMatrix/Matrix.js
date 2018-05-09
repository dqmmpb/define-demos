import {ARRAY_TYPE} from './common';
import {Vector} from './Vector';

function create() {
  const out = new ARRAY_TYPE(9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  const out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a10 = a[3];
  const a11 = a[4];
  const a12 = a[5];
  const a20 = a[6];
  const a21 = a[7];
  const a22 = a[8];

  const b01 = (a22 * a11) - (a12 * a21);
  const b11 = (-a22 * a10) + (a12 * a20);
  const b21 = (a21 * a10) - (a11 * a20);

  // Calculate the determinant
  let det = (a00 * b01) + (a01 * b11) + (a02 * b21);

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = ((-a22 * a01) + (a02 * a21)) * det;
  out[2] = ((a12 * a01) - (a02 * a11)) * det;
  out[3] = b11 * det;
  out[4] = ((a22 * a00) - (a02 * a20)) * det;
  out[5] = ((-a12 * a00) + (a02 * a10)) * det;
  out[6] = b21 * det;
  out[7] = ((-a21 * a00) + (a01 * a20)) * det;
  out[8] = ((a11 * a00) - (a01 * a10)) * det;
  return out;
}


/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a10 = a[3];
  const a11 = a[4];
  const a12 = a[5];
  const a20 = a[6];
  const a21 = a[7];
  const a22 = a[8];

  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b10 = b[3];
  const b11 = b[4];
  const b12 = b[5];
  const b20 = b[6];
  const b21 = b[7];
  const b22 = b[8];

  out[0] = (b00 * a00) + (b01 * a10) + (b02 * a20);
  out[1] = (b00 * a01) + (b01 * a11) + (b02 * a21);
  out[2] = (b00 * a02) + (b01 * a12) + (b02 * a22);

  out[3] = (b10 * a00) + (b11 * a10) + (b12 * a20);
  out[4] = (b10 * a01) + (b11 * a11) + (b12 * a21);
  out[5] = (b10 * a02) + (b11 * a12) + (b12 * a22);

  out[6] = (b20 * a00) + (b21 * a10) + (b22 * a20);
  out[7] = (b20 * a01) + (b21 * a11) + (b22 * a21);
  out[8] = (b20 * a02) + (b21 * a12) + (b22 * a22);
  return out;
}

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
    return new Matrix(create());
  }

  // 单位矩阵
  static I() {
    return Matrix.identity();
  }

  // 构造函数,数组
  constructor(matrix) {
    this.matrix = fromValues(...matrix);
  }

  // 平移
  translate(dx, dy) {
    // 平移矩阵
    const matrix = fromValues(
      1, 0, 0,
      0, 1, 0,
      dx, dy, 1,
    );
    const out = create();
    multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }

  // 旋转
  rotate(theta) {
    // 旋转矩阵
    const matrix = fromValues(
      Math.cos(theta), Math.sin(theta), 0,
      -Math.sin(theta), Math.cos(theta), 0,
      0, 0, 1,
    );
    const out = create();
    multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }

  // 缩放
  scale(sx, sy) {
    // 缩放矩阵
    const matrix = fromValues(
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    );
    const out = create();
    multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }

  // 矩阵乘法
  multiply(matrix) {
    const out = create();
    multiply(out, matrix.matrix, this.matrix);
    return new Matrix(out);
  }

  // 矩阵乘法
  x(matrix) {
    return this.multiply(matrix);
  }

  // 逆矩阵
  invert() {
    const out = create();
    invert(out, this.matrix);
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
