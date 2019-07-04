import Vector from './Vector';

/**
 * 空数组
 * @constructor
 */
function Z(): Float32Array {
  const out = new Float32Array(9);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  return out;
}

/**
 * 单位数组
 * @constructor
 */
function I(): Float32Array {
  const out = new Float32Array(9);
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

/**
 * 初始化矩阵
 * @param m00
 * @param m01
 * @param m02
 * @param m10
 * @param m11
 * @param m12
 * @param m20
 * @param m21
 * @param m22
 */
function fromValues(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Float32Array {
  const out = new Float32Array(9);
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
 * 逆矩阵
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out: Float32Array, a: Float32Array): Float32Array {
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
    return out;
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
 * 矩阵加法
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out: Float32Array, a: Float32Array, b: Float32Array): Float32Array {
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

  out[0] = b00 + a00;
  out[1] = b01 + a01;
  out[2] = b02 + a02;

  out[3] = b10 + a10;
  out[4] = b11 + a11;
  out[5] = b12 + a12;

  out[6] = b20 + a20;
  out[7] = b21 + a21;
  out[8] = b22 + a22;
  return out;
}

/**
 * 矩阵乘法
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out: Float32Array, a: Float32Array, b: Float32Array): Float32Array {
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
  get matrix(): Float32Array {
    return this._matrix;
  }

  set matrix(value: Float32Array) {
    this._matrix = value;
  }

  // 静态工厂
  public static create(matrix?: Float32Array | Array<number>): Matrix {
    if (matrix instanceof Float32Array) {
      return new Matrix(matrix);
    } else if (matrix instanceof Array) {
      return new Matrix(new Float32Array(matrix));
    } else {
      return Matrix.identity();
    }
  }

  // 单位矩阵
  public static identity(): Matrix {
    return new Matrix(I());
  }

  // 单位矩阵
  public static I():Matrix {
    return Matrix.identity();
  }

  private _matrix: Float32Array;

  // 构造函数
  constructor(matrix: Float32Array) {
    this._matrix = fromValues(
      matrix[0], matrix[1], matrix[2],
      matrix[3], matrix[4], matrix[5],
      matrix[6], matrix[7], matrix[8],
    );
  }

  // 平移
  public translate(dx: number, dy: number): Matrix {
    // 平移矩阵
    const matrix = fromValues(
      1, 0, 0,
      0, 1, 0,
      dx, dy, 1,
    );
    const out = I();
    multiply(out, matrix, this._matrix);
    return new Matrix(out);
  }

  // 旋转
  public rotate(theta: number): Matrix {
    // 旋转矩阵
    const matrix = fromValues(
      Math.cos(theta), Math.sin(theta), 0,
      -Math.sin(theta), Math.cos(theta), 0,
      0, 0, 1,
    );
    const out = I();
    multiply(out, matrix, this._matrix);
    return new Matrix(out);
  }

  // 缩放
  public scale(sx: number, sy: number): Matrix {
    // 缩放矩阵
    const matrix = fromValues(
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    );
    const out = I();
    multiply(out, matrix, this._matrix);
    return new Matrix(out);
  }

  // 矩阵乘法
  public multiply(matrix: Matrix): Matrix {
    const out = I();
    multiply(out, matrix._matrix, this._matrix);
    return new Matrix(out);
  }

  // 矩阵乘法
  public x(matrix: Matrix): Matrix {
    return this.multiply(matrix);
  }

  // 逆矩阵
  public invert(): Matrix {
    const out = I();
    invert(out, this._matrix);
    return new Matrix(out);
  }

  // 获取矩阵的某一行
  public row(index: number): Vector {
    const start = 3 * (index - 1);
    return Vector.create([
      this._matrix[start], this._matrix[start + 1], this._matrix[start + 2]
    ]);
  }

  // 获取矩阵元素
  public elements(): Float32Array {
    return this._matrix;
  }

  // 获取矩阵元素
  public e(row: number, index: number): number {
    return this._matrix[3 * (row - 1) + index - 1];
  }

  // toString
  public toString(): string {
    return this._matrix.toString();
  }

  // 转换为Array
  public toArray(): Array<Array<number>> {
    const matrixArray = [];
    for (let i = 1; i <= 3; i += 1) {
      matrixArray.push(this.row(i).toArray());
    }
    return matrixArray;
  }
}

export default Matrix;
