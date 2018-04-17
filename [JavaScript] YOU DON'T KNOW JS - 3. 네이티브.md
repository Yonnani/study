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