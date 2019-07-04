import Matrix from "./Matrix";
import Vector from "./Vector";

/**
 * 向量数组
 */
class Vectors {
  get vectors(): Array<Vector> {
    return this._vectors;
  }

  set vectors(value: Array<Vector>) {
    this._vectors = value;
  }

  // 静态工厂
  public static create(vectors?: Array<Vector | Float32Array | Array<number>>): Vectors {
    if (vectors instanceof Array) {
      return new Vectors(vectors);
    } else {
      return new Vectors();
    }
  }

  // 向量数组
  private _vectors: Array<Vector>;

  // 构造函数,二维数组
  constructor(vectors?: Array<Vector | Float32Array | Array<number>>) {
    if(vectors) {
      this._vectors = vectors.map((vector) => {
        if(vector instanceof Float32Array) {
          return Vector.create(vector);
        } else if(vector instanceof Array) {
          return Vector.create(vector);
        } else {
          return vector;
        }
      });
    } else {
      this._vectors = new Array();
    }
  }

  // 向量变换,矩阵作用于向量数组
  public transformMat3(matrix: Matrix): Array<Vector> {
    return this._vectors.map((vector) => {
      return vector.transformMat3(matrix);
    });
  }

  // 向量变换
  public x(matrix: Matrix) {
    return this.transformMat3(matrix);
  }

  // 获取向量组的某一行
  public row(index: number) {
    return this._vectors[index - 1];
  }

  // 获取向量组元素
  public elements(): Array<Vector> {
    return this._vectors;
  }

  // 获取向量组的某一行
  public e(row: number, index: number): number {
    return this._vectors[row - 1].e(index - 1);
  }

  // toString
  public toString(): string {
    return this._vectors.map((vector) => {
      return vector.toString();
    }).toString();
  }

  // 转换为Array
  public toArray(): Array<Array<number>> {
    const vectorsArray = [];
    for (let i = 1; i <= this._vectors.length; i += 1) {
      vectorsArray.push(this.row(i).toArray());
    }
    return vectorsArray;
  }
}

export default Vectors;
