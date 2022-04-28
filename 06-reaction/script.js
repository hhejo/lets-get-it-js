const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
const records = [];
let timeoutId;
$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) {
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    // $screen.classList.replace('waiting', 'ready');
    $screen.textContent = '초록색이 되면 클릭하세요';
    timeoutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.replace('ready', 'now');
      $screen.textContent = '클릭하세요!!';
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (event.target.classList.contains('ready')) {
    clearTimeout(timeoutId);
    $screen.classList.replace('ready', 'waiting');
    $screen.textContent = '다시 클릭하세요!'
  } else if (event.target.classList.contains('now')){
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    // debugger;
    // 초깃값 따로 주지 않으면 a는 첫 번째 원소가 되고 c는 두 번째 원소로 시작
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.textContent = `현재: ${current}ms, 평균: ${average}ms`;
    const topFive = records.sort((p, c) => p - c).slice(0, 5);
    topFive.forEach((top, index) => {
      $result.append(
        document.createElement('br'),
        `${index + 1}위: ${top}ms`,
      )
    });
    startTime = null;
    endTime = null;
    $screen.classList.replace('now', 'waiting');
    $screen.textContent = '클릭해서 시작하세요';
  }
});


// // reduce 사용해서 객체 리터럴 생성
// const test = ['A', 'B', 'C', 'D'].reduce((a, c, i) => { a[i] = c; return a; }, {});
// console.log(test); // {0: 'A', 1: 'B', 2: 'C', 3: 'D'}

// // Date() 관련 메서드
// new Date().getYear();
// new Date().getFullYear();
// new Date().getMonth();
// new Date().getDate();
// new Date().getHours();
// new Date().getMinutes();
// new Date().getSeconds();
// new Date().getMilliseconds();
// new Date().setDate(10); // 
// new Date().toLocaleDateString(); // 한글로 보여주기
