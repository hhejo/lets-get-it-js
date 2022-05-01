// const { body } = document; // const body = document.body;
const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');

let turn = 'O';
const rows = [];


const checkWinner = (target) => {
  // let rowIndex;
  // let cellIndex;
  // rows.forEach((row, ri) => {
  //   row.forEach((cell, ci) => {
  //     if (cell === target) {
  //       rowIndex = ri;
  //       cellIndex = ci;
  //     }
  //   });
  // });
  // td는 자기가 몇 번째 칸인지 알고 있음
  // 행의 번호는 tr이 갖고 있음
  const rowIndex = target.parentNode.rowIndex; // 부모 태그는 parentNode
  const cellIndex = target.cellIndex;
  // children으로 자식 태그 탐색 가능
  let hasWinner = false;
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};


const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', callback);
    return;
  }
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = '무승부';
    return;
  }
  turn = turn === 'X' ? 'O' : 'X';
};


let clickable = true;
const callback = (event) => {
  if (!clickable) return;
  // event.stopPropagation(); // 이벤트 버블링 방지
  if (event.target.textContent) return; // removeEventListener는 실수하기 쉬우니까 이 방식 추천
  event.target.textContent = turn; // event.target 쓰는 것이 좀 더 좋음

  // if (checkWinner(event.target)) {
  //   $result.textContent = `${turn}님이 승리!`;
  //   $table.removeEventListener('click', callback); // 이벤트 버블링이 없었으면 td 9개에 대해 삭제했어야 함
  //   return;
  // }
  // // let draw = true;
  // // rows.forEach((row) => {
  // //   row.forEach((cell) => {
  // //     if (!cell.textContent) {
  // //       draw = false;
  // //     }
  // //   });
  // // });
  // // rows는 2차원 배열
  // // rows.flat()으로 1차원 배열로 만들 수 있음 (3차원은 2차원으로)
  // const draw = rows.flat().every((cell) => cell.textContent); // cell.textContent가 모두 존재해야 true
  // // rows.flat().some() 하나라도 있으면 true
  // if (draw) {
  //   $result.textContent = '무승부';
  //   return;
  // }
  // turn = turn === 'X' ? 'O' : 'X';
  // // console.log(event.target); // $td
  // // console.log(event.currentTarget); // 이벤트 리스너가 붙은 요소 $table

  checkWinnerAndDraw(event.target);

  // 컴퓨터 추가
  if (turn === 'X') {
    clickable = false;
    setTimeout(() => {
      const emptyCells = rows.flat().filter((v) => !v.textContent);
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.textContent = 'X';
      const hasWinner = checkWinner(randomCell);
      // // 승자 있으면
      // if (hasWinner) {
      //   $result.textContent = `${turn}님이 승리!`;
      //   return;
      // }
      // // 승자 없으면
      // const draw = rows.flat().every((cell) => cell.textContent);
      // if (draw) {
      //   $result.textContent = '무승부';
      //   return;
      // }
      // turn = turn === 'X' ? 'O' : 'X';
      checkWinnerAndDraw(event.target);
      clickable = true;
    }, 500);
  }
};


for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    // $td.addEventListener('click', callback); // 이벤트 버블링
    $tr.append($td);
  }
  $table.append($tr);
  rows.push(cells);
}
$table.addEventListener('click', callback); // $td에 달지 않고 $table에 이벤트 리스너 설치
// 이벤트 캡처링 : 팝업 주변을 클릭해서 팝업 창 끌 때
body.append($table);
body.append($result);

// const arr = [1, 2, ,3, 4, 5];
// const one = arr[0];
// const two = arr[1];
// const three = arr[2];
// const four = arr[3];
// const five = arr[4];
// const { one, two, three, four, five } = arr;
// const { one, , three, , five } = arr; // one, three, five만 생성

// const obj = {
//   a: 'hello',
//   b: {
//     c: 'hi',
//     d: { e: 'wow', },
//   }
// }
// // a, c, e 가져오기
// const { a, b: { c, d: { e } } } = obj;
// console.log(a, c, e); // hello hi wow
// // a, b, e 가져오기
// const { a, b } = obj;
// const { d: { e } } = b;
// console.log(a, b, e); // hello {c: 'hi', d: {...}} wow

// HTMLCollection 같은 유사배열은 {0: tr, 1: tr, 2: tr} 이런 식으로 되어 있음
// 배열이 아니기 때문에 forEach를 사용할 수 없음
// Array.from()을 사용해서 배열로 바꿀 수 있음
// Array.from($table.children).forEach((i) => console.log(i));
// 다른 배열 메서드 사용 가능
