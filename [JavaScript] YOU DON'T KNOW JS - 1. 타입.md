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

- "undefined"(값이 없는)는 접근 가능한 스코프에 변수가 선언되었으나 현재 아무런 값도 할당되지 않은 상태
- "undeclared"(선언되지 않은)는 접근 가능한 스코프에 변수 자체가 선언조차 되지 않은 상태
- 선언되지 않은 변수도 typeof하면 "undefined"로 나옴 : typeof만의 안전 가드(safety guard)

#### 1.3.2 선언되지 않은 변수

- 여러 스크립트 파일의 변수들이 전역 네임스페이스(namespace) 공유 시, typeof의 안전 가드 이용

  ```javascript
  // 이렇게 하면 에러날 수 있음
  if (DEBUG) {
      console.log("디버깅을 시작합니다");
  }

  // 이렇게 해야 안전하게 존재 여부 체크할 수 있음
  if (typeof DEBUG !== "undefined") {
      console.log("디버깅을 시작합니다");
  }
  ```

  > (DEBUG 같은) 임의로 정의한 변수를 쓰지 않더라도 이런 식으로 체크하는 것이 편리하며, 내장 API 기능을 체크할 때에도 에러 나지 않게 도와줌

- 예제 코드


```javascript
if (typeof atob === "undefined") {
    atob = function() { /* ... */}
}
```

> 명시적으로 var를 빼야 선언문이 호이스팅되지 않음

- typeof 안전가드 없이 전역 변수 체크하는 다른 방법 : 전역 변수가 모두 전역 객체(브라우저는 window)의 프로퍼티라는 점을 이용하는 것

- ```javascript
  var atob; // 선언문이 호이스팅된다
  if (typeof atob === "undefined") {
      atob = function() { /* ... */ };
  }

  if (window.DEBUG) {
      // ...
  }

  if (window.atob) {
      // ...
  }
  ```

  > ReferenceError 나지 않음

  Window 객체를 통한 전역 변수 참조는 가급적 삼가는 것이 좋음

