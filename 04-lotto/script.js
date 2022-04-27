const candidate = Array(45).fill().map((v, i) => i + 1);
const shuffle = [];
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
  const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내
  shuffle.push(value); // shuffle 배열에 넣기
}
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b); // splice는 원본 변경, slice는 비파괴
// sort는 원본 변경. a - b는 오름차순
// slice() 하면 아무것도 변경되지 않고 거기에 sort하면 원본을 변경하지 않고 정렬 가능
// array !== array.slice()
// 문자열을 정렬하려면
// arr.slice().sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt()); // 첫 번째 글자 기준 오름차순
// arr.slice().sort((a, b) => a.localeCompare(b)); // 모든 글자에 대해 오름차순
// arr.slice().sort((a, b) => b.localeCompare(a)); // 모든 글자에 대해 내림차순
const bonus = shuffle[6];
console.log(winBalls, bonus);

function colorize(number, $tag) {
  if (number < 10) {
    $tag.style.backgroundColor = 'red';
    $tag.style.color = 'white';
  } else if (number < 20) {
    $tag.style.backgroundColor = 'orange';
  } else if (number < 30) {
    $tag.style.backgroundColor = 'yellow';
  } else if (number < 40) {
    $tag.style.backgroundColor = 'blue';
    $tag.style.color = 'white';
  } else {
    $tag.style.backgroundColor = 'green';
    $tag.style.color = 'white';
  }
}

const $result = document.querySelector('#result');
const drawBall = (number, $parent) => {
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  colorize(number, $ball);
  $ball.textContent = number;
  $parent.appendChild($ball);
};

for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    drawBall(winBalls[i], $result);
  }, (i + 1) * 1000);
}

// var: 함수 스코프, let: 블록 스코프

// // 클로저 ??
// for (var i = 0; i < winBalls.length; i++) {
//   setTimeout(() => {
//     drawBall(winBalls[i], $result);
//     console.log(winBalls[i], i); // undefined 6이 1초에 한번씩 6번 출력됨. 왜?
//   }, (i + 1) * 1000);
// }

// // 클로저 해결 (클로저로 해결?)
// for (var i = 0; i < winBalls.length; i++) {
//   (function(j) { // 함수를 바로 호출해서 해결. 매개변수 j에 i를 인자로 줌.
//     setTimeout(() => {
//       drawBall(winBalls[j], $result);
//       console.log(winBalls[j], j);
//     }, (i + 1) * 1000);
//   })(i);
// }

const $bonus = document.querySelector('#bonus');
setTimeout(() => {
  drawBall(bonus, $bonus);
}, 7000);
