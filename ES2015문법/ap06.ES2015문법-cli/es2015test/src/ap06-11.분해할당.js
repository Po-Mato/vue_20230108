/*
 (구조) 분해 할당에 대해서 알아본다.


*/

const points = [20, 30, 40];
const x1 = points[0];
const y1 = points[1];
const z1 = points[2];
console.log(x1, y1, z1);

const [x2, y2, z2] = points;
console.log(x2, y2, z2);

// const x3 = points[0];
// const z3 = points[2];
// const [x3, z3] = points; // 20, 30
const [x3, , z3] = points; // 20, 40
console.log(x3, z3);

const [x4, y4] = points; // 20, 30
console.log(x4, y4);

// 객체 분해 할당
const car = {
  type: 't',
  color: 'S',
  model: 2017,
};

// ES5
const type1 = car.type;
const color1 = car.color;
const model1 = car.model1;

// 객체 분해 할당을 이용해서 type, color, model를 만드시오.
// 객체 분해 할당은 객체의 프로퍼티명을 이용해서 매핑한다.
const { type, color, model, gear } = car;
console.log(type, color, model, gear);
