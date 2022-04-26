const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

const numbers = [];
for (let n = 1; n <= 9; n += 1) {
  numbers.push(n);
}

const answer = [];
for (let n = 0; n <= 3; n += 1) {
  const index = Math.floor(Math.random() * numbers.length);
  // Math.floor, Math.ceil, Math.round
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) { // 길이는 4가 아닌가
    return alert('4자리 숫자를 입력하세요.');
  }
  if (new Set(input).size !== 4) { // 중복된 숫자가 있는가
    return alert('중복되지 않게 입력하세요.');
  }
  if (tries.includes(input)) { // 이미 시도한 값은 아닌가
    return alert('이미 시도한 값입니다.');
  }
  return true;
} // 검사하는 코드

function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
  $logs.appendChild(message);
}

let out = 0;

$form.addEventListener('submit', (event) => {
  event.preventDefault(); // 기본 동작 막기
  const value = $input.value;
  $input.value = '';
  if (!checkInput(value)) { // 입력값 문제 있음
    return;
  }
  if (answer.join('') === value) {
    $logs.textContent = '홈런!'; // 문자열을 계속 추가하고 싶으면 createTextNode, append 사용
    return;
  }
  if (tries.length >= 9) {
    defeated();
    return;
    // $logs.append(message); // 추가하기
    // $logs.innerHTML은 HTML로 인식
    // document.createElement('br') br 태그 생성
  }
  let strike = 0;
  let ball = 0;
  // for (let i = 0; i < answer.length; i++) {
  //   const index = value.indexOf(answer[i]);
  //   if (index > -1) {
  //     if (index === i) {
  //       strike += 1;
  //     } else {
  //       ball += 1;
  //     }
  //   }
  // }

  // forEach 사용하기
  answer.forEach((element, i) => {
    const index = value.indexOf(element);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  });
  // 끝

  // .map 배열 메서드
  // const a = [1, 2, 3];
  // const b = a.map((element, index) => {
  //   return element ** 2;
  // });
  // console.log(b);

  // .fill 배열 메서드로 빈 배열 만들기
  // Array(9).fill();
  // Array(9).fill(0);
  // const c = Array(9).fill().map((elem, idx) => {
  //   return idx + 1;
  // });
  // console.log(c); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}: 아웃`, document.createElement('br'));
  } else {
  $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
  }

  if (out === 3) {
    defeated();
    return;
  }

  // forEach, map
  // 문자열은 createTextNode 없어도 그냥 append로 추가 가능
  // append는 여러 개 추가 가능
  // append는 appendChild를 보완해서 나옴 appendChild는 createTextNode 필요, 여러 개 한꺼번에 불가
  tries.push(value);
  // console.log('서브밋', event);
  // console.log(event.target[0]); // 이런 식으로 접근 가능 (input 태그가 됨)

  // removeEventListener를 이용해서 게임이 끝나면 입력이 불가능하게 만들어보기
});
