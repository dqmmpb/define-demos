import {Matrix, Vector, Vectors} from '.';

describe('计算变换矩阵', () => {
  it('单位矩阵', () => {
    // 单位矩阵
    const DD = Matrix.create();
    expect(`${DD}`).toBe('1,0,0,0,1,0,0,0,1');
  });
  it('平移矩阵', () => {
    // 平移
    const DD = Matrix.create().translate(-520.5, -370);
    expect(`${DD}`).toBe('1,0,0,0,1,0,-520.5,-370,1');
  });
  it('平移+旋转矩阵', () => {
    // 平移+旋转
    const DD = Matrix.create().translate(-520.5, -370).rotate(10);
    expect(`${DD}`).toBe('-0.83907151222229,-0.5440211296081543,0,0.5440211296081543,-0.83907151222229,0,235.4488983154297,593.6194458007812,1');
  });
  it('逆矩阵', () => {
    // 逆矩阵
    const DD = Matrix.create().translate(520.5, 370).invert();
    expect(`${DD}`).toBe('1,0,0,0,1,0,-520.5,-370,1');
  });
});

describe('向量变换', () => {
  // 变换矩阵
  const DD = Matrix.create([
    1, 0, 0,
    0, 1, 0,
    520.5, 370, 1
  ]);

  it('零向量', () => {
    // 零向量
    const V = Vector.create();
    expect(`${V}`).toBe('0,0,0');
  });

  it('向量矩阵变换', () => {
    // 零向量
    const V = Vector.create([2, 3, 1]);
    expect(`${V}`).toBe('2,3,1');

    // 矩阵变换
    const V1 = V.x(DD);
    expect(`${V1}`).toBe('522.5,373,1');
  });

});

describe('向量组变换', () => {
  // 变换矩阵
  const DD = Matrix.create([
    1, 0, 0,
    0, 1, 0,
    520.5, 370, 1
  ]);

  it('向量组矩阵变换', () => {
    // 向量组
    const VS = Vectors.create([
      [2, 3, 1],
      [4, 5, 6]
    ]);

    // 矩阵变换
    const VS1 = VS.x(DD);
    expect(`${VS}`).toBe('2,3,1,4,5,6');
    expect(`${VS1}`).toBe('522.5,373,1,3127,2225,6');
  });
});

