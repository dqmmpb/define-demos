import {Matrix} from './Matrix';

const DD = Matrix.I(3);
const DD1 = DD.translate(-520.5, -370);
const DD2 = DD1.rotate(10);
const DD3 = DD.translate(520.5, 370);

console.log(`matrix: ${DD.elements}`);
console.log(`move matrix: ${DD1.elements}`);
console.log(`rotate matrix: ${DD2.elements}`);
console.log(`after matrix: ${DD3.elements}`);

