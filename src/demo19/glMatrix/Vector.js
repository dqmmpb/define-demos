import {vec2, vec3} from 'gl-matrix';

class Vectors {
  static create(vectors) {
    if (vectors instanceof Array) {
      return new Vectors(vectors);
    }
  }

  constructor(vectors) {
    this.vectors = vectors.map((vector) => {
      return Vector.create(vector);
    });
  }

  row(index) {
    return this.vectors[index - 1];
  }

  elements() {
    return this.vectors;
  }

  toString() {
    return this.vectors.map((vector) => {
      return vector.toString();
    }).toString();
  }
}

class Vector {
  static create(vector) {
    if (vector instanceof Array) {
      return new Vector(vector);
    } else {
      return Vector.identity();
    }
  }

  static identity() {
    return new Vector(vec3.create());
  }

  constructor(vector) {
    this.vector = vec3.fromValues(...vector);
  }

  transformMat3(matrix) {
    const out = vec3.create();
    vec3.transformMat3(out, this.vector, matrix.matrix);
    return new Vector(out);
  }

  x(matrix) {
    return this.transformMat3(matrix);
  }

  e(index) {
    return this.vector[index - 1];
  }

  elements() {
    return this.vector;
  }

  toString() {
    return this.vector.toString();
  }
}

export {
  Vector,
  Vectors,
};
