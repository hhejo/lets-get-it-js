const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');

const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');

const IMG_URL = './rock_scissors_paper.png';

$computer.style.background = `url(${IMG_URL}) -464px 0`;
$computer.style.backgroundSize = 'auto 200px';

const rspX = {
  scissors: '0',
  rock: '-220px',
  paper: '-440px',
}

let computerChoice = 'scissors';
const changeComputerHand = () => {
  if (computerChoice === 'scissors') { // 가위이면
    computerChoice = 'rock';
  } else if (computerChoice === 'rock') { // 바위이면
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') { // 보이면
    computerChoice = 'scissors';
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = 'auto 200px';
};


// const changeComputerHand = () => {
//   if (computerChoice === 'scissors') {
//     computerChoice = 'rock';
//   } else if (computerChoice === 'rock') {
//     computerChoice = 'paper';
//   } else if (computerChoice === 'paper') {
//     computerChoice = 'scissors';
//   }
//   $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
//   $computer.style.backgroundSize = 'auto 200px';
//   setTimeout(changeComputerHand, 50); // 재귀 방식으로 구현
// };
// setTimeout(changeComputerHand, 50);
// // setTimeout, setInterval은 시간이 정확하지 않을 수 있음

let intervalId = setInterval(changeComputerHand, 50);
// console.log(`new intervalID: ${intervalId}`);

// const clickButton = () => {
//   clearInterval(intervalId);
//   // console.log(`cleared intervalID: ${intervalId}`);
//   // // 해결 2 이벤트 리스너 지우고 다시 만들기
//   // $rock.removeEventListener('click', clickButton);
//   // $scissors.removeEventListener('click', clickButton);
//   // $paper.removeEventListener('click', clickButton);
//   setTimeout(() => { // 점수 계산 및 화면 표시
//     clearInterval(intervalId); // 해결 1 clearInterval을 setTimeout 안에 쓰기
//     intervalId = setInterval(changeComputerHand, 50);
//     // console.log(`setTimeout intervalID: ${intervalId}`);
//     // // 해결 2 이벤트 리스너 지우고 다시 만들기
//     // $rock.addEventListener('click', clickButton);
//     // $scissors.addEventListener('click', clickButton);
//     // $paper.addEventListener('click', clickButton);
//   }, 1000);
// };

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
}

// 해결 3 clickable 변수 사용 (추천)
// 이벤트 리스너 추가 삭제 반복하면 실수할 가능성이 증가
let clickable = true;
let computer = 0;
let me = 0;
const clickButton = (event) => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    
    // 점수 계산 및 화면 표시
    const myChoice = event.target.textContent === '바위'
      ? 'rock'
      : event.target.textContent === '가위'
        ? 'scissors'
        : 'paper';

    const myScore = scoreTable[myChoice]
    const computerScore = scoreTable[computerChoice]
    const diff = myScore - computerScore
    let message = '';
    if ([2, -1].includes(diff)) {
      me += 1;
      message = '승리';
    } else if ([-2, 1].includes(diff)) {
      computer += 1
      message = '패배';
    } else if (diff === 0) {
      message = '무승부';
    }
    if (me >= 3) {
      $score.textContent = `나의 승리 ${me} : ${computer}`;
    } else if (computer >= 3) {
      $score.textContent = `컴퓨터의 승리 ${me} : ${computer}`;
    } else {
      $score.textContent = `${me} : ${computer}`;
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50);
      }, 1000);
    }
  }
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);


