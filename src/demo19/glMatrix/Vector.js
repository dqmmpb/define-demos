import {vec2, vec3} from 'gl-matrix';

/**
 * 向量组
 */
class Vectors {
  // 静态工厂
  static create(vectors) {
    if (vectors instanceof Array) {
      return new Vectors(vectors);
    }
  }
  // 构造函数,二维数组
  constructor(vectors) {
    this.vectors = vectors.map((vector) => {
      return Vector.create(vector);
    });
  }
  // 获取向量组的某一行
  row(index) {
    return this.vectors[index - 1];
  }
  // 获取向量组元素
  elements() {
    return this.vectors;
  }
  // toString方法
  toString() {
    return this.vectors.map((vector) => {
      return vector.toString();
    }).toString();
  }
}

/**
 * 向量
 */
class Vector {
  // 静态工厂
  static create(vector) {
    if (vector instanceof Array) {
      return new Vector(vector);
    } else {
      return Vector.identity();
    }
  }
  // 空向量
  static identity() {
    return new Vector(vec3.create());
  }
  // 构造函数,数组
  constructor(vector) {
    this.vector = vec3.fromValues(...vector);
  }
  // 向量变换,矩阵作用于向量
  transformMat3(matrix) {
    const out = vec3.create();
    vec3.transformMat3(out, this.vector, matrix.matrix);
    return new Vector(out);
  }
  // 向量变换
  x(matrix) {
    return this.transformMat3(matrix);
  }
  // 获取向量的某个元素
  e(index) {
    return this.vector[index - 1];
  }
  // 获取向量元素
  elements() {
    return this.vector;
  }
  // toString方法
  toString() {
    return this.vector.toString();
  }
}

export {
  Vector,
  Vectors,
};
