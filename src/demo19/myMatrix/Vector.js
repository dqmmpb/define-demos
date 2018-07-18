import {ARRAY_TYPE} from './common';

function create() {
  const out = new ARRAY_TYPE(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  const out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  out[0] = (x * m[0]) + (y * m[3]) + (z * m[6]);
  out[1] = (x * m[1]) + (y * m[4]) + (z * m[7]);
  out[2] = (x * m[2]) + (y * m[5]) + (z * m[8]);
  return out;
}

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
  // toArray方法转换为二维数组
  toArray() {
    const vectorsArray = [];
    for (let i = 1; i <= this.vectors.length; i += 1) {
      vectorsArray.push(this.row(i).toArray());
    }
    return vectorsArray;
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
    return new Vector(create());
  }
  // 构造函数,数组
  constructor(vector) {
    this.vector = fromValues(...vector);
  }
  // 向量变换,矩阵作用于向量
  transformMat3(matrix) {
    const out = create();
    transformMat3(out, this.vector, matrix.matrix);
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
  // toArray方法转换为二维数组
  toArray() {
    const vectorArray = [];
    for (let i = 1; i <= this.vector.length; i += 1) {
      vectorArray.push(this.e(i));
    }
    return vectorArray;
  }
}

export {
  Vector,
  Vectors,
};
