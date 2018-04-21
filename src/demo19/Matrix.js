import sylvester from 'sylvester';

const {Matrix} = sylvester;

// 矩阵变换 - 平移
Matrix.prototype.translate = function(dx, dy) {
  const matrix = Matrix.create([
    [1, 0, 0],
    [0, 1, 0],
    [dx, dy, 1],
  ]);
  return this.x(matrix);
};

// 矩阵变换 - 旋转
Matrix.prototype.rotate = function(theta) {
  const matrix = Matrix.create([
    [Math.cos(theta), Math.sin(theta), 0],
    [-Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1],
  ]);
  console.log(matrix.elements);
  return this.x(matrix);
};

// 矩阵变换 - 缩放
Matrix.prototype.scale = function(sx, sy) {
  const matrix = Matrix.create([
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
  ]);
  return this.x(matrix);
};

export {
  Matrix,
};
