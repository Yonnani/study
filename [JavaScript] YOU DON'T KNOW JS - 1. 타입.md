# YOU DON'T KNOW JS 타입과 문법, 스코프와 클로저

## CHAPTER 1. 타입

- 타입 : 자바스크립트 엔진, 개발자 모두에게 어떤 값을 다른 값과 분별할 수 있는, 고유한 내부 특성의 집합임

### 1.1 타입, 그 실체를 이해하자

### 1.2 내장 타입

- null, undefined, boolean, number, string, Object, Symbol(ES6부터)

- 값 타입은 typeof 연산자로 알 수 있음

- null에 대한 typeof 연산 결과

  ```Javascript
  typeof null === "object"; // true
  ```

  null은 falsy한 유일 원시 값이지만 타입은 'object'인 존재

- ```javascript
  typeof function a(){ /* ... */ } === "function"; // true
  ```

  typeof 반환 값은 function이 최상위 레벨의 내장 타입처럼 보이지만, 실제로는 object의 '하위 타입'임

  함수 : 호출가능한 객체

- ```Javascript
  typeof [1,2,3] === "object"; // true
  ```

  배열도 객체

  숫자 인덱스를 가지며, length 프로퍼티가 자동으로 관리되는 등의 추가 특성을 지닌, 객체의 '하위 타입'임

### 1.3 값은 타입을 가진다

- 변수 : 언제라도, 어떤 형태의 값이라도 가질 수 있음
- 자바스크립트는 타입 강제를 하지 않음, 즉 변숫값이 처음 할당된 값과 동일한 타입일 필요 없음
- typeof 연산자 : 이 변수에 들어있는 값의 타입이 무엇이니?
- typeof 연산자의 반환 값은 항상 문자열

#### 1.3.1 값이 없는 vs 선언되지 않은

