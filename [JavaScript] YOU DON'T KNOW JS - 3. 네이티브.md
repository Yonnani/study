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

  - 내부 [[Class]] 값이, 배열은 "Array", 정규식은 "RegExp"임

- 원시 값에도 내부 [[Class]]가 있을까

  ```javascript
  Object.prototype.toString.call( null );
  // "[object Null]"

  Object.prototype.toString.call( undefined );
  // "[object Undefined]"
  ```

  - 내부 [[Class]] 값을 확인해보니 "Null", "Undefined" 임

- 하지만 그 밖의 문자열, 숫자, 불리언 같은 단순 원시 값은 '박싱(Boxing)' 과정을 거침

  ```javascript
  Object.prototype.toString.call( "abc" );
  // "[object String]"
  Object.prototype.toString.call( 42 );
  // "[object Number]"
  Object.prototype.toString.call( true );
  // "[object Boolean]"
  ```

  - 내부 [[Class]] 값이 각각 String, Number, Boolean으로 표시된 것으로 보아 단순 원시 값은 해당 객체 래퍼로 자동 박싱됨을 알 수 있음


### 3.2 래퍼 박싱하기

- 원시 값에는 프로퍼티나 메서드가 없으므로 .length, .toString()으로 접근하려면 원시 값을 객체 래퍼로 감싸줘야 함

- 자바스크립트는 원시 값을 알아서 박싱(래핑)함

  ```javascript
  var a = "abc";

  a.length; // 3
  a.toUpperCase(); // "ABC"
  ```

- 객체 형태로 써야 할 이유는 거의 없음, 필요시 엔진이 알아서 암시적으로 박싱하게 하는 것이 좋음

#### 3.2.1 객체 래퍼의 함정

- 주의점

  ```javascript
  var a = new Boolean( false );

  if (!a) {
      console.log( "Oops" ); // 실행되지 않음
  }
  ```

  false를 객체 래퍼로 감쌌지만 문제는 객체가 'truthy'라는 점임

- 수동으로 원시 값을 박싱하려면 `Object()` 함수를 이용(앞에 new 키워드는 없음)

  ```javascript
  var a = "abc";
  var b = new String( a );
  var c = Object( a );

  typeof a; // "string"
  typeof b; // "object"
  typeof c; // "object"

  b instanceof String; // true
  c instanceof String; // true

  Object.prototype.toString.call( b ); // "[object String]"
  Object.prototype.toString.call( c ); // "[object String]"
  ```

### 3.3 언박싱

- 객체 래퍼의 원시 값은 `valueOf()` 메서드로 추출함

  ```javascript
  var a = new String( "abc" );
  var b = new Number( 42 );
  var c = new Boolean( true );

  a.valueOf(); // "abc"
  b.valueOf(); // 42
  c.valueOf(); // true
  ```

  이때에도 암시적인 언박싱이 일어남

  ```javascript
  var a = new String( "abc" );
  var b = a + ""; // 'b'에는 언박싱된 원시 값 "abc"이 대입됨

  typeof a; // "object"
  typeof b; // "string"
  ```

### 3.4 네이티브, 나는 생성자다

