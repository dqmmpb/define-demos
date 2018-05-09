import * as MatrixUtil from './sylvester';

const {Matrix, Vector} = MatrixUtil;

const DD = Matrix.create();

const DD1 = DD.translate(-520.5, -370);
const DD2 = DD1.rotate(10);
const DD3 = DD.translate(520.5, 370);

console.log(`matrix: ${DD}`);
console.log(`move matrix: ${DD1}`);
console.log(`rotate matrix: ${DD2}`);
console.log(`after matrix: ${DD3}`);
console.log(`reverse matrix: ${DD3.invert()}`);

const V1 = Vector.create([2, 3, 1]);
console.log(`${V1}`);
console.log(`${V1.x(DD3)}`);
