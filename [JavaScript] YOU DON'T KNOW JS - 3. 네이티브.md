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

- 배열, 객체, 함수, 정규식 값은 리터럴 형태로 생성하는 것이 일반적이지만, 리터럴은 생성자 형식으로 만든 것과 동일한 종류의 객체를 생성함
- 생성자는 가급적 쓰지 않는 편이 좋음

#### 3.4.1 Array()

```javascript
var a = new Array( 1, 2, 3 );
a; // [1, 2, 3]

var b = [1, 2, 3];
b; // [1, 2, 3]
```

> Array() 생성자 앞에 new를 붙이지 않아도 됨
>
> Array(1, 2, 3)와 new Array(1, 2, 3)은 결과적으로 같음

- Array 생성자에서 인자로 숫자를 하나만 받으면 그 숫자를 원소로 하는 배열을 생성하는 게 아니라 '배열의 크기를 미리 정하는(Presize)' 기능임

  - 배열의 크기를 정하려면 빈 배열을 만들고 나중에 length 프로퍼티에 숫자 값을 할당하면 됨
  - 실제로 슬롯에 값은 없지만 length만 보면 뭔가 값이 있을 것 같은 이상한 배열은 권장되지 않음
  - '빈 슬롯'을 한 군데 이상 가진 배열을 `구멍난 배열(Sparse Array)`이라고 함

- 브라우저 개발자 콘솔 창마다 객체를 나타내는 방식이 제각각임

  ```javascript
  var a = new Array( 3 );
  var b = [ undefined, undefined, undefined ];
  var c = [];
  c.length = 3;

  a;
  b;
  c;
  ```

  - 현재 크롬에서 b는 `[undefined, undefined, undefined]`로 출력되는 반면, a와 c는 `[empty × 3]`라고 표시 됨

- a와 b가 어떨 때는 같은 값처럼 보이다가도 그렇지 않을 때도 있음

  ```javascript
  var a = new Array( 3 );
  var b = [ undefined, undefined, undefined ];

  a.join("-"); // "--"
  b.join("-"); // "--"

  a.map(function(v, i){ return i; }); // [empty × 3]
  b.map(function(v, i){ return i; }); // [0, 1, 2]
  ```

  - a.map()은 a에 슬롯이 없기 때문에 map() 함수가 순회할 원소가 없음

  - join()은 다름

    ```javascript
    function fakeJoin(arr, connector) {
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) {
                str += connector;
            }
            if (arr[i] !== undefined) {
                str += arr[i];
            }
        }
        return str;
    }

    var a = new Array( 3 );
    fakeJoin( a, "-" ); // "--"
    ```

  - join()은 슬롯이 있다는 가정하에 length만큼 루프를 반복하지만, map() 함수는 이런 가정을 하지 않기 때문에 이상한 '빈 슬롯' 배열이 입력되면 예기치 않은 결과 생길 수도 있음

- 빈 슬롯이 아닌 진짜 undefined 값 원소로 채워진 배열 생성 방법

  ```javascript
  var a = Array.apply( null, { length: 3 } );
  a; // [ undefined, undefined, undefined ]
  ```

  - `apply()`는 모든 함수에서 사용 가능한 유틸리티
  - 첫 번째 인자 this는 객체 바인딩(Object Binding)으로 일단 여기서는 null로 셋팅
  - 두 번째 인자는 인자의 배열(또는 배열 비슷한 '유사 배열')로, 이 안에 포함된 원소들이 '펼쳐져(Spread)' 함수의 인자로 전달됨
  - 즉, `Array.apply()`는 Array() 함수를 호출하는 동시에 `{ length: 3 }` 객체 값을 펼쳐 인자로 넣음

- 결론은, 빈 슬롯 배열을 애써 만들지 말자!

#### 3.4.2 Object(), Function(), and RegExp()

- Object()/Function()/RegExp() 생성자도 선택 사항임

  ```javascript
  var c = new Object();
  c.foo = "bar";
  c; // { foo: "bar" }

  var d = { foo: "bar" };
  d; // { foo: "bar" }

  var e = new Function( "a", "return a * 2;" );
  var f = function(a) { return a * 2; }
  function g(a) { return a * 2; }

  var h = new RegExp( "^a*b+", "g" );
  var i = /^a*b+/g;
  ```

  - new Object() 같은 생성자 폼은 사용할 일이 거의 없음

  - Function 생성자는 함수의 인자나 내용을 동적으로 정의해야 하는, 매우 드문 경우에 한해 유용함

  - 정규 표현식은 리터럴 형식(/^a*b+/g)으로 정의할 것을 권장함 

    - 구문이 쉽고 성능상 이점(자바스크립트 엔진이 실행 전 정규 표현식을 미리 컴파일한 후 캐시함)이 있음

    - `RegExp()`는 정규 표현식 패턴을 동적으로 정의할 경우 의미있는 유틸리티임

      ```javascript
      var name = "Kyle";
      var namePattern = new RegExp( "\\b(?:" + name + ")+\\b", "ig");

      var matches = someText.match( namePattern );
      ```

      `new RegExp("패턴","플래그")` 형식으로 사용하자

#### 3.4.3 Date() and Error()

- 네이티브 생성자 `Date()`와 `Error()`는 리터럴 형식이 없으므로 다른 네이티브에 비해 유용함

- date 객체 값은 `new Date()`로 생성함 : 날짜/시각을 인자로 받고 인자 생략하면 현재 날짜/시각으로 대신함

- date 객체의 인스턴스로부터 getTime()을 호출할 수 있지만 ES5에 정의된 정적 도우미 함수(Helper Function), `Date.now()` 를 사용하는 것이 더 쉬움

  - 폴리필

    ```javascript
    if (!Date.now) {
        Date.now = function(){
            return (new Date()).getTime();
        };
    }
    ```

- `Error()` 생성자는 앞에 new가 있든 없든 같은 결과임

- error 객체의 주 용도는 현재 실행 스택 콘텍스트(Execution Stack Context)를 포착하여 객체에 담는 것임

- error 객체는 보통 throw 연산자와 함께 사용함

  ```javascript
  function foo(x) {
      if (!x) {
          throw new Error( "x를 안 주셨어요!" );
      }
      // ...
  }
  ```

- 사람이 읽기 편한 포맷의 에러 메세지를 보려면 Error 객체의 `toString()` 호출하는 것이 좋음

- 일반적인 Error() 네이티브 이외에도 구체적인 에러 타입에 특화된 네이티브들이 있음

  - `EvalError()`, `RangeError()`,` ReferenceError()`, `SyntaxError()`, `TypeError()`, `URIError()` 테이티브들은 코드에서 실제로 예외가 발생하면 자동으로 던져지므로 직접 사용할 일은 거의 없음

#### 3.4.4 Symbol()

- 심벌(Symbol)은 ES6에서 처음 선보인, 새로운 원시 값 타입

- 심벌은 충돌 염려 없이 객체 프로퍼티로 사용 가능한, 특별한 '유일 값'임(절대적으로 유일함이 보장되지는 않음)

- ES6에 미리 정의된 심벌이 있음 : `Symbol.create`, `Symbol.iterator` 식으로 Symbol 함수 객체의 정적 프로퍼티로 접근함

  ```javascript
  var mysym = Symbol( "my own symbol" );
  mysym; // Symbol(my own symbol)
  mysym.toString(); // "Symbol(my own symbol)"
  typeof mysym; // "symbol"

  var a = {};
  a[mysym] = "foobar";

  Object.getOwnPropertySymbols( a );
  // [ Symbol(my own sym) ]
  ```

- 심벌은 전용(Private) 프로퍼티는 아니지만(Object.getOwnPropertySymbols()로 들여다보면 공용(Public) 프로퍼티임을 알 수 있음), 본래의 사용 목적에 맞게 대부분 전용 혹은 특별한 프로퍼티로 사용함

- 지금까지 "전용/특수/내부 프로퍼티입니다. 건드리지 마세요!"라고 하고 싶을 때 습관적으로 써 왔던, 언더스코어(_)가 앞에 붙은 프로퍼티 명도 언젠가는 심벌에 의해 대체될 가능성이 높음

- 심벌은 객체가 아님, 단순한 스칼라 원시 값임

#### 3.4.5 네이티브 프로토타입

- 내장 네이티브 생성자는 각자의 `.prototype` 객체를 가짐 (예: Array.prototype, String.prototype 등)

- prototype 객체에는 해당 객체의 하위 타입별로 고유한 로직이 있음

  > 문서화 관례에 따라 String.prototype.XYZ는 String#XYZ로 줄여 씀
  >
  > - String#indexOf() 문자열에서 특정 문자의 위치를 검색
  > - String#charAt() 문자열에서 특정 위치의 문자를 반환
  > - String#substr(), String#substring(), and String#slice() 문자열 일부를 새로운 문자열로 추출
  > - String#toUpperCase() and String#toLowerCase() 대문자/소문자로 변환된 새로운 문자열 생성
  > - String#trim() 앞/뒤의 공란이 제거된 새로운 문자열 생성

  - 이 중 문자열 값을 변경하는 메서드는 없음

- 프로토타입 위임(Prototype Delegation) 덕분에 모든 문자열이 이 메서드를 같이 쓸 수 있음

  ```javascript
  var a = " abc ";

  a.indexOf( "c" ); // 3
  a.toUpperCase(); // " ABC "
  a.trim(); // "abc"
  ```

- ```javascript
  typeof Function.prototype; // "function"
  Function.prototype(); // 빈 함수

  RegExp.prototype.toString(); // "/(?:)/" - 빈 regex
  "abc".match( RegExp.prototype ); // [""]
  ```

  ​

