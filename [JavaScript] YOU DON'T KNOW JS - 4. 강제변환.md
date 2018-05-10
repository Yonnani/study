# YOU DON'T KNOW JS 타입과 문법, 스코프와 클로저

## CHAPTER 4. 강제변환

### 4.1 값 변환

- 타입 캐스팅(Type Casting) : 어떤 값을 다른 타입의 값으로 바꾸는 과정이 명시적인 경우 / 정적 타입언어에서 컴파일 시점에 발생
- 강제변환(Coercion) : 어떤 값을 다른 타입의 값으로 바꾸는 과정이 암시적인 경우 / 동적 타입 언어에서 런타임 시점에 발생

> 자바스크립트에서 강제변환을 하면 문자열, 숫자, 불리언 같은 스칼라 원시 값 중 하나가 되며 객체, 함수와 같은 합성 값 타입으로 변환될 일은 없음

- 자바스크립트에서는 모든 유형의 타입변환을 강제변환으로 뭉뚱그려 일컫는 경향이 있어서, `암시적 강제변환(Explicit Coercion)`과 `명시적 강제변환(Implicit Coercion)` 두 가지로 구별하겠음
- 명시적 강제변환 : 의도적으로 타입변환을 일으킴
- 암시적 강제변환 : 다른 작업 도중 불분명한 부수 효과로부터 발생하는 타입 변환

```javascript
var a = 42;
var b = a + ""; // 암시적 강제변환
var c = String( a ); // 명시적 강제변환
```

- 명시적(Explicit) : 암시적(Implicit) = 명백한(Obvious) : 숨겨진 부수효과(Hidden Side Effect)


### 4.2 추상 연산

#### 4.2.1 ToString

- '문자열이 아닌 값 → 문자열' 변환 작업은 ES5 9.8의 ToString 추상 연산 로직이 담당함

- 내장 원시 값은 본연의 문자열화 방법이 정해져 있음

  - ex : null → "null", undefined → "undefined", true → "true"

  - 숫자는 그냥 문자열로 바뀌고 너무 작거나 큰 값은 지수 형태로 바뀜

    ```javascript
    // '1.07'에 '1000'을 7번 곱함
    var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

    // 소수점 이하로 3 * 7 => 21자리까지 내려감
    a.toString(); // "1.07e+21"
    ```

- 일반 객체는 기본적으로 `toString()` 메서드가 내부 `[[Class]]`를 반환함(ex: "[object Object]")

- 자신의 `toString()` 메서드를 가진 객체는 문자열처럼 사용하면 자동으로 이 메서드가 기본 호출되어 `toString()`을 대체함

- 배열은 재정의된 `toString()`이 있음

  var a = [1,2,3];
  a.toString(); // "1,2,3"

- `toString()` 메서드는 명시적으로 호출 가능, 문자열 콘텍스트에서 문자열 아닌 값이 있을 경우에도 자동 호출됨(???)

##### JSON 문자열화

- 대부분 단순 값들은 직렬화 결과가 반드시 문자열이라는 점을 제외하고는, JSON 문자열화나 toString() 변환이나 기본적으로 같은 로직임

  ```javascript
  JSON.stringify( 42 ); // "42"
  JSON.stringify( "42" ); // ""42""
  JSON.stringify( null ); // "null"
  JSON.stringify( true ); // "true"
  ```

- JSON 안전 값(JSON-Safe Value)(JSON 표현형으로 확실히 나타낼 수 있는 값)은 모두 `JSON.stringify()`로 문자열화할 수 있음

- `JSON.stringify()`는 인자가 undefined, 함수, 심벌 값이면 자동으로 누락시키며 이런 값들이 배열에 포함되어 있으면 null로 바꿈, 객체 프로퍼티에 있으면 지워버림

  ```javascript
  JSON.stringify( undefined ); // undefined
  JSON.stringify( function(){} ); // undefined
  
  JSON.stringify( [1,undefined,function(){},4] ); // "[1,null,null,4]"
  JSON.stringify( {a:2, b:function(){}} ); // "{"a":2}"
  ```

- JSON.stringify()에 환형 참조(Circular References) 객체(프로퍼티 참조가 무한 순환되는 구조의 객체)를 넘기면 에러남

- 객체 자체에 `toJSON()` 메서드가 정의되어 있다면, 먼저 이 메서드를 호출하여 직렬화한 값을 반환함

- 부적절한 JSON 값이나 직렬화하기 곤란한 객체 값을 문자열화하려면 `toJSON()` 메서드를 따로 정의해야 함

  ```javascript
  var o = {};
  
  var a = {
      b: 42,
      c: o,
      d: function(){}
  };
  
  // 'a'를 환형 참조 객체로 만듦
  o.e = a;
  
  // 환형 참조 객체는 JSON 문자열화 시 에러 남
  // JSON.stringify( a );
  
  // JSON 값으로 직렬화하는 함수를 따로 정의함
  a.toJSON = function(){
      // 직렬화에 프로퍼티 'b'만 포함시킴
      return { b: this.b };
  };
  
  JSON.stringify( a ); // "{"b":42}"
  ```

- `toJSON()`은 (어떤 타입이든) 적절히 평범한 실제 값을 반환하고 문자열화 처리는 `JSON.stringify()`가 담당함

  ```javascript
  var a = {
      val: [1,2,3],
      
      // 맞다!
      toJSON: function(){
          return this.val.slice( 1 );
      }
  };
  
  var b = {
      val: [1,2,3],
      // 틀리다!
      toJSON: function(){
          return "[" +
              this.val.slice( 1 ).join() + 
              "]";
      }
  };
  
  JSON.stringify( a ); // "[2,3]"
  JSON.stringify( b ); // ""[2,3]""
  ```

  - 두 번째 호출 코드는 배열 자체가 아니라 반환된 문자열을 다시 문자열화 함

- 배열 아니면 함수 형태의 대체자(Replacer)를 `JSON.stringify()`의 두 번째 선택 인자로 지정하여 객체를 재귀적으로 직렬화하면서 (포함할 프로퍼티와 제외할 퍼로퍼티를 결정하는) 필터링 하는 방법이 있음

  - 대체자가 배열이면 전체 원소는 문자열이어야 하고 각 원소는 객체 직렬화의 대상 프로퍼티명임

  - 대체자가 함수면 처음 한 번은 객체 자신에 대해, 그 다음엔 각 객체 프로퍼티별로 한 번씩 실행하면서 매번 키와 값 두 인자를 전달함, 직렬화 과정에서 해당 키를 건너뛰려면 undefined를, 그 외에는 해당 값을 반환함

    ```javascript
    var a = {
        b: 42,
        c: "42",
        d: [1,2,3]
    };
    
    JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"
    JSON.stringify( a, function(k, v) {
      if (k !== "c") return v;  
    } ); // "{"b":42,"d":[1,2,3]}"
    ```

- `JSON.stringify()` 세 번째 선택 인자는 스페이스(Space)라고 하며 사람이 읽기 쉽도록 들여쓰기를 할 수 있음

  - 들여 쓰기를 할 빈 공간의 개수를 숫자로 지정하거나 문자열(10자 이상이면 앞에서 10자까지만 잘라 사용함)을 지정하여 각 들여 쓰기 수준에 사용함

  ```javascript
  var a = {
      b: 42,
      c: "42",
      d: [1,2,3]
  };
  
  JSON.stringify(a, null, 3);
  //"{
  //   "b": 42,
  //   "c": "42",
  //   "d": [
  //      1,
  //      2,
  //      3
  //   ]
  //}"
  
  JSON.stringify(a, null, "-----");
  //"{
  //-----"b": 42,
  //-----"c": "42",
  //-----"d": [
  //----------1,
  //----------2,
  //----------3
  //-----]
  //}"
  ```

- `JSON.stringify()`은 직접적인 강제변환의 형식은 아니지만 두 가지 이유로 ToString 강제 변환과 연관됨

  1. 문자열, 숫자, 불리언, null 값이 JSON으로 문자열화하는 방식은 ToString 추상연산의 규칙에 따라 문자열 값으로 강제변환되는 방식과 동일함
  2. `JSON.stringify()`에 전달한 객체가 자체 `toJSON()`메서드를 갖고 있다면, 문자열화 전 `toJSON()`가 자동 호출되어 JSON 안전 값으로 '강제변환'됨

##### 4.2.2 ToNumber

- `숫자 아닌 값 > 수식 연산이 가능한 숫자` 변환 로직은 ES5 9.3 ToNumber 추상 연산에 정의되어 있음

  - true는 1, false는 0, undefined는 NaN, null은 0으로 바뀜

- 문자열 값에 ToNumber를 적용하면 대부분 숫자 리터럴 규칙/구문과 비슷하게 작동함

  변환이 실패하면 결과는 NaN임

  한가지 차이는 0이 앞에 붙은 8진수는 ToNumber에서 올바른 숫자 리터럴이라도 8진수로 처리하지 않음(대신 일반 10진수로 처리함)

- 객체(그리고 배열)는 동등한 원시 값으로 변환 후 그 결괏값(아직 숫자가 아닌 원시 값)을 앞서 설명한 ToNumber 규칙에 의해 강제변환함

  그렇지 않을 경우 (toString() 메서드가 존재하면) `toString()`을 이용하여 강제변환 함

- 어찌해도 원시 값으로 바꿀 수 없을 때는 TypeError

- ES5부터는 [[Prototype]]이 null인 경우 대부분 `Object.create(null)`를 이용하여 강제변환이 불가능한 객체(valueOf(), toString() 메서드가 없는 객체)를 생성할 수 있음

```javascript
var a = {
    valueOf: function(){
        return "42";
    }
};

var b = {
    toString: function(){
        return "42";
    }
};

var c = [4,2];
c.toString = function(){
    return this.join( "" ); // "42"
};

Number( a ); // 42
Number( b ); // 42
Number( c ); // 42
Number( '' ); // 0
Number( [] ); // 0
Number( [ "abc" ] ); // NaN
```

##### 4.2.3 ToBoolean

- 자바스크립트에서 1과 0 그리고 true, false는 별개임
- 1을 true로, 0을 false로 강제변환할 수는 있짐나 두 값이 같지는 않음

###### Falsy 값

- 자바스크립트의 모든 값은 다음 둘 중 하나임
  1. 불리언으로 강제변환하면 `false`가 되는 값
  2. 1번을 제외한 나머지(즉, 명백히 `true`인 값)
- 명세가 정의한 `falsy`값 (불리언으로 강제변환하면 false)
  - undefined
  - null
  - false
  - +0, -0, NaN
  - ""
- `falsy` 값 목록에 없으면 `truthy` 값이 됨

###### Falsy 객체

```javascript
var a = new Boolean( false );
var b = new Number( 0 );
var c = new String( "" );

var d = Boolean( a && b && c );

d; // true
```

- `falsy 객체`는 불리언으로 강제변환하면 `false`임
- `document.all` 은 DOM에서 사용했던 유사 배열(객체)이며 실제로 `truthy`한 일반 객체처럼 작동했음
  - `document.all`은 '비표준'이며 비권장/폐기 됨
  - 하지만 레거시 코드 베이스가 많음
- 구 IE 브라우저 때문에 비표준('falsy 객체')이 자바스크립트에 더해진 것임

###### truthy 값

- falsy 값 목록에 없으면 무조건 truthy 값임

  ```javascript
  var a = "false";
  var b = "0";
  var c = "''";
  
  var d = Boolean( a && b && c );
  d; // true
  ```

  ```javascript
  var a = []; // 빈 배열
  var b = {}; // 빈 객체
  var c = function(){}; // 빈 함수
  
  var d = Boolean( a && b && c );
  d; // true
  ```

- truthy/falsy 개념은 어떤 값을 불리언 타입으로 (명시적/암시적) 강제변환 시 해당 값의 작동 방식을 이해한다는 점에서 중요함

#### 4.3 명시적 강제변환

- 명시적 강제변환(Explicit Coercion) : 분명하고 확실한 타입변환

##### 4.3.1 명시적 강제변환: 문자열 ↔ 숫자

- `문자열 ↔ 숫자` 강제변환은 String()과 Number() 함수를 이용하는데, 앞에 new 키워드가 붙지 않기 때문에 객체 래퍼를 생성하는 것이 아님

  ```javascript
  var a = 42;
  var b = String( a );
  
  var c = "3.14";
  var d = Number( c );
  
  b; // "42"
  d; // 3.14
  ```

  - ToString 추상 연산 로직에 따라 String()은 값을 받아 원시 문자열로 강제변환 함
  - ToNumber 추상 연산 로직에 의해 Number()은 어떤 값이든 원시 숫자 값으로 강제변환 함

- 또 다른 `문자열 ↔ 숫자`의 명시적인 타입 변환 방법

  ```javascript
  var a = 42;
  var b = a.toString();
  
  var c = "3.14";
  var d = +c;
  
  b; // "42"
  d; // 3.14
  ```

  - `a.toString()` 호출은 겉보기엔 명시적이지만, 몇 가지 암시적인 요소가 있음
  - 원시 값 42에는 `toString()` 메서드가 없으므로 엔진은 42를 객체 래퍼로 '박싱'함 : `명시적으로, 암시적인(Explicitly Implicit)` 작동임
  - +c의 +는 단항 연산자(Unary Operator) : 피연산자 c를 숫자로, 명시적 강제변환함

- +c 처럼 쓸 때 헷갈리는 경우

  ```javascript
  var c = "3.14";
  var d = 5+ +c;
  d; // 8.14
  ```

- `-` 단항 연산자도 `+`처럼 강제변환을 하지만 숫자의 부호를 뒤바꿀 수 있음

  `- -"3.14"`처럼 두 연산자 사이에 공란을 하나 넣어주면 무사히 3.14로 강제변환 됨

- 하지만, 아래와 같은 조합이 나올 수 있음

  ```javascript
  1 + - + + + - + 1; // 2
  ```

- 가급적 +/- 단항 연산자를 다른 연산자와 인접하지 말자

###### 날짜 → 숫자

- `+` 단항 연산자는 `Date 객체 → 숫자` 강제변환 용도로 쓰임

  - 결괏값이 날짜/시각 값을 유닉스 타임스탬프 표현형(1970년 1월 1일 00:00:00 UTC 이후로 경과한 시간을 밀리 초 단위로 표시) 이기 때문

    ```javascript
    var d = new Date( "Mon, 18 Aug 2014 08:53:06 CDT" );
    +d; // 1408369986000
    ```

- 현재 시각을 타임스탬프로 바꿀 때 관용적으로 사용하는 방법

  ```javascript
  var timestamp = +new Date();
  ```

- 강제변환을 하지 않아도 Date 객체로부터 타임스탬프를 얻는 방법이 있으며, 오히려 더 명시적임

  ```javascript
  var timestamp = new Date().getTime();
  // var timestamp = (new Date()).getTime();
  // var timestamp = (new Date).getTime();
  ```

- 하지만 ES5에 추가된 정적 함수 `Date.now()`를 쓰는 것이 더 나음

  ```javascript
  var timestamp = Date.now();
  ```

  - `Date.now()`의 폴리필

    ```javascript
    if (!Date.now) {
        Date.now = function () {
          return +new Date();  
        };
    }
    ```

- 현재 타임스탬프는 `Date.now()`로, 그 외 특정 날짜/시간의 타임스탬프는 `new Date().getTime()`을 대신 쓰도록 하자

###### 이상한 나라의 틸드(~)

