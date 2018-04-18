# YOU DON'T KNOW JS 타입과 문법, 스코프와 클로저

## CHAPTER 3. 네이티브

- 가장 많이 쓰는 네이티브들

  - String( )
  - Number( )
  - Boolean( )
  - Array( )
  - Object( )
  - function( )
  - RegExp( )
  - Data( )
  - Error( )
  - Symbol( ) - ES6에서 추가됨

- 네이티브는 내장 함수임

- 네이티브(Native)는 ECMAScript 명세의 내장 객체

- 네이티브는 생성자처럼 사용할 수 있지만 실제로 생성되는 결과물은 예상과 다를 수 있음

  ```javascript
  var a = new String("abc");

  typeof a; // "object" - "String"이 아님

  a instanceof String; // true

  Object.prototype.toString.call(a); // "[object String]"
  ```

  - (new String("abc")) 생성자의 결과는 원시 값 "abc"를 감싼 객체 래퍼임

- 객체 래퍼 확인

  ```javascript
  console.log( a );
  ```

  이 코드의 실행 결과는 브라우저 마다 다름

- 요지는 new String("abc")은 "abc"를 감싸는 문자열 래퍼를 생성하며 원시 값 "abc"는 아님

### 3.1 내부 [[Class]]

- typeof가 'object'인 값(배열 등)에는 [[Class]]라는 내부 프로퍼티(전통적인 클래스 지향 개념에서의 클래스라기 보단 내부 분류법의 일부)가 추가로 붙음, 이 프로퍼티는 직접 접근할 수 없고 `Object.prototype.toString()`라는 메서드에 값을 넣어 호출함으로써 존재를 엿볼 수 있음

  ```javascript
  Object.prototype.toString.call( [1,2,3] );
  // "[object Array]"

  Object.prototype.toString.call( /regex-literal/i );
  // "[Object RegExp]"
  ```

  ​

