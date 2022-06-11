









참조

얕은 복사

깊은복사

[...arr]

{...e}

c.slice()

간단하게 깊은 복사 : JSON.parse(JSON.stringify())

제대로 하려면 _lodash 사용





화살표함수는 this가 윈도우를 가리킴

기본적으로 this는 윈도우를 가리키는데 객체.메서드 하면 객체를 가리킴 (화살표 함수 x)



제로초 블로그 this 읽기





클래스

생성자 함수, new 해도 되고 안 해도 되고.. prototype으로 메서드 작성

class 안에 constructor 메서드, new로 객체 생성



addEventListener에서 this는 이벤트가 붙는 애가 됨

_this, that, self

this는 함수가 호출될 때 결정됨



this는 상황에 따라 다른 값. 기본적으로 window 가리킴

객체를 통해 this를 사용하면 this는 해당 객체 가리킴

addEventListener같은 특정 메서드는 콜백 함수의 this를 바꿈

this가 바뀌는 것이 싫다면 함수 선언문 대신 화살표 함수 사용



클래스 상속

extends

super()





호출 스택, 이벤트 루프, 백그라운드, 태스크 큐

