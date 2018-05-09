import s from 'sylvester';

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
    return new Vector(s.Vector.Zero(3).elements);
  }
  // 构造函数,数组
  constructor(vector) {
    this.vector = s.Vector.create(vector);
  }
  // 向量变换,矩阵作用于向量
  transformMat3(matrix) {
    return new Vector(matrix.matrix.transpose().x(this.vector));
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
    return this.vector.elements;
  }
  // toString方法
  toString() {
    return this.vector.elements.toString();
  }
}

export {
  Vector,
  Vectors,
};
