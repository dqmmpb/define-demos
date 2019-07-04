import Matrix from "./Matrix";

/**
 * 零向量
 * @constructor
 */
function Z(): Float32Array {
  const out = new Float32Array(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

/**
 * 初始化向量
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x: number, y: number, z: number): Float32Array {
  const out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * 向量加法
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out: Float32Array, a: Float32Array, b: Float32Array): Float32Array {
  const a0 = a[0];
  const a1 = a[1];
  const a2 = a[2];

  const b0 = b[0];
  const b1 = b[1];
  const b2 = b[2];

  out[0] = b0 + a0;
  out[1] = b1 + a1;
  out[2] = b2 + a2;
  return out;
}

/**
 * 向量矩阵变换
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out: Float32Array, a: Float32Array, m: Float32Array): Float32Array {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  out[0] = (x * m[0]) + (y * m[3]) + (z * m[6]);
  out[1] = (x * m[1]) + (y * m[4]) + (z * m[7]);
  out[2] = (x * m[2]) + (y * m[5]) + (z * m[8]);
  return out;
}

/**
 * 向量
 */
class Vector {
  get vector(): Float32Array {
    return this._vector;
  }

  set vector(value: Float32Array) {
    this._vector = value;
  }

  // 静态工厂
  public static create(vector?: Float32Array | Array<number>): Vector {
    if (vector instanceof Float32Array) {
      return new Vector(vector);
    } else if (vector instanceof Array) {
      return new Vector(new Float32Array(vector));
    } else {
      return Vector.zero();
    }
  }

  // 零向量
  public static zero() {
    return new Vector(Z());
  }

  // 零向量
  public static Z() {
    return Vector.zero();
  }

  private _vector: Float32Array;

  // 构造函数,数组
  constructor(vector: Float32Array) {
    this._vector = fromValues(
      vector[0], vector[1], vector[2]
    );
  }

  // 向量加法
  public add(vector: Vector): Vector {
    const out = Z();
    add(out, this._vector, vector._vector);
    return new Vector(out);
  }

  // 向量变换
  public a(vector: Vector): Vector {
    return this.add(vector);
  }

  // 向量变换,矩阵作用于向量
  public transformMat3(matrix: Matrix): Vector {
    const out = Z();
    transformMat3(out, this._vector, matrix.matrix);
    return new Vector(out);
  }

  // 向量变换
  public x(matrix: Matrix): Vector {
    return this.transformMat3(matrix);
  }

  // 获取向量的某个元素
  public e(index: number): number {
    return this._vector[index - 1];
  }

  // 获取向量元素
  public elements(): Float32Array {
    return this._vector;
  }

  // toString
  public toString(): string {
    return this._vector.toString();
  }

  // 转换为Array
  public toArray(): Array<number> {
    const vectorArray = [];
    for (let i = 1; i <= this._vector.length; i += 1) {
      vectorArray.push(this.e(i));
    }
    return vectorArray;
  }
}

export default Vector;
