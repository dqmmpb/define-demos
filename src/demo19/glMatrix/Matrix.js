import {mat3} from 'gl-matrix';
import {Vector} from './Vector';

class Matrix {
  static create(matrix) {
    if (matrix instanceof Array) {
      return new Matrix(matrix);
    } else {
      return Matrix.identity();
    }
  }

  static identity() {
    return new Matrix(mat3.create());
  }

  static I() {
    return Matrix.identity();
  }

  constructor(matrix) {
    this.matrix = mat3.fromValues(...matrix);
  }

  translate(dx, dy) {
    const matrix = mat3.fromValues(
      1, 0, 0,
      0, 1, 0,
      dx, dy, 1,
    );
    const out = mat3.create();
    mat3.multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }

  rotate(theta) {
    const matrix = mat3.fromValues(
      Math.cos(theta), Math.sin(theta), 0,
      -Math.sin(theta), Math.cos(theta), 0,
      0, 0, 1,
    );
    const out = mat3.create();
    mat3.multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }

  scale(sx, sy) {
    const matrix = mat3.fromValues(
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    );
    const out = mat3.create();
    mat3.multiply(out, matrix, this.matrix);
    return new Matrix(out);
  }

  multiply(matrix) {
    const out = mat3.create();
    mat3.multiply(out, this.matrix, matrix.matrix);
    return new Matrix(out);
  }

  x(matrix) {
    return this.multiply(matrix);
  }

  invert() {
    const out = mat3.create();
    mat3.invert(out, this.matrix);
    return new Matrix(out);
  }

  row(index) {
    const start = 3 * (index - 1);
    return Vector.create([this.matrix[start], this.matrix[start + 1], this.matrix[start + 2]]);
  }

  elements() {
    return this.matrix;
  }

  toString() {
    return this.matrix.toString();
  }
}

export {
  Matrix,
};
