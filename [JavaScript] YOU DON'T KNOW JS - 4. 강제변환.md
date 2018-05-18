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

- ~(틸드) : 자바스크립트 강제변환 연산자

- 자바스크립트 비트 연산자는 오직 32비트 연산만 가능

- 비트 연산을 하면 피연산자는 32비트 값으로 강제로 맞춰짐

- ToInt32 추상 연산이 이 역할을 함

- ToInt32는 ToNumber 강제변환함

  - "123"이라면 ToInt32 규칙을 적용하기 전 123으로 바꿈

- 숫자 값에 |나 ~ 비트 연산자를 적용하면 전혀 다른 숫자 값을 생성하는 강제변환 효과가 있음

- ex. 아무 연산도 하지 않는 0 | x의 'OR' 연산자(|)는 사실상 ToInt32 변환만 수행함

  ```javascript
  0 | -0; // 0
  0 | NaN; // 0
  0 | Infinity; // 0
  0 | -Infinity; // 0
  ```

  - 이러한 특수 숫자들은 32비트로 나타내는 것이 불가능하므로 ToInt32 연산 결과는 0임

- ~ 연산자는 먼저 32비트 숫자로 '강제변환'한 후 NOT 연산을 함(각 비트를 거꾸로 뒤집음)

- `~`는 2의 보수를 구함

- ~x는 대략 -(x+1)와 같음

  ```javascript
  ~42; // -(42+1) ==> -43
  ```

- -(x+1) 연산의 결과를 0(정확히는 -0)으로 만드는 유일한 값은 -1임

  - 일정 범위 내의 숫자에 `~` 연산을 할 경우 입력 값이 -1이면 falsy한 0, 그 외엔 truthy한 숫자 값이 산출됨

- -1과 같은 성질의 값을 `경계 값(Sentinel Value)`라고 함

- 자바스크립트는 문자열 메서드 `indexOf()`를 정의할 때, 특정 문자 검색하여 발견하면 0부터 시작하는 숫자 값(인덱스)을, 발견하지 못했을 경우 -1을 반환함

  ```javascript
  var a = "Hello World";
  
  if (a.indexOf( "lo" ) >= 0) { // true
    // found it!  
  }
  
  if (a.indexOf( "lo" ) != -1) { // true
    // found it!  
  }
  
  if (a.indexOf( "ol" ) < 0) { // true
    // not found!
  }
  
  if (a.indexOf( "ol" ) == -1) { // true
    // not found!
  }
  ```

  - 필자는 `>= 0`나 `== -1` 같은 코드가 지저분해 보인다고 함
  - `구멍 난 추상화(Leaky Abstraction)`, 즉 (경계 값 -1을 '실패'로 정해버린) 내부 구현 방식을 내가 짠 코드에 심어놓는 꼴인데 이런 부분은 감추는게 낫다고 함(필자 왈)

  ```javascript
  var a = "Hello World";
  
  ~a.indexOf( "lo" ); // -4 <-- truthy!
  if (~a.indexOf( "lo" )) { // true
      // found
  }
  
  ~a.indexOf( "ol" ); // 0 <-- falsy!
  !~a.indexOf( "ol" ); // true
  if (!~a.indexOf( "ol" )) { // true
      // not found
  }
  ```

  - `~`은 `indexOf()`로 검색 결과 '실패' 시 -1을 falsy한 0으로, 그 외에는 truthy한 값으로 바꿈

###### 비트 잘라내기

- `~` 용도 하나 더

- 숫자의 소수점 이상 부분을 잘라내기 위해 더블 틸드 `~~`를 사용하는 개발자들이 있음

- `~~`의 맨 앞의 `~`는 ToInt32 '강제변환'을 적용한 후 각 비트를 거꾸로 함

- 두 번째 `~`는 비트를 또 한 번 뒤집는데, 결과적으로 원래 상태로 되돌림

- 결국 ToInt32 '강제변환'(잘라내기 Truncation)만 하는 셈

- `~~` 사용 시 유의할 점

  - `~~` 연산은 32비트 값에 한하여 안전함

  - 음수에서는 `Math.floor()`과 결괏값이 다름

    ```javascript
    Math.floor( -49.6 ); // -50
    ~~-49.6; // -49
    ```

- `~~x`는 (32비트) 정수로 상위 비트를 잘라냄

- 하지만 같은 일을 하는 `x | 0`가 더 빠를 것 같음

- `x | 0` 대신 `~~x`를 써야하는 이유? 연산자 우선순위 때문임

  ```javascript
  ~~1E20 / 10; // 166199296
  
  1E20 | 0 / 10; // 1661992960
  (1E20 | 0) / 10; // 166199296
  ```

##### 4.3.2 명시적 강제변환: 숫자 형태의 문자열 파싱

```javascript
var a = "42";
var b = "42px";

Number( a ); // 42
parseInt( a ); // 42

Number( b ); // NaN
parseInt( b ); // 42
```

- 문자열로부터 숫자 값의 파싱은 비 숫자형 문자(Non-Numeric Character)를 허용함
- 좌 → 우 방향으로 파싱하다가 숫자 같지 않은 문자를 만나면 멈춤
- 강제변환은 비 숫자형 문자를 허용하지 않기 때문에 `NaN`을 냄
- 파싱은 강제변환과 목적이 다르므로 대안이 될 수 없음
  - 우측에 비 숫자형 문자가 있을지 확실하지 않거나 상관없다면 문자열을 숫자로 `파싱`
  - 반드시 숫자여야만 하고 "42px"같은 값은 되돌려야 한다면 문자열을 숫자로 `강제변환`
- `parseInt()` : 문자열에 쓰는 함수
  - 인자가 비 문자열(Non-String)이면 제일 먼저 자동으로 문자열로 강제변환함 : 암시적 강제변환
  - 절대로 `parseInt()`에 비 문자열 값을 넘기지 말자
  - ES5 이전의 `parseInt()`의 다른 함정 : 두 번째 인자로 기수(radix, 문자열을 숫자로 해석 시 사용되는 진법 종류)를 지정하지 않으면 문자열의 첫 번째 문자만 보고 마음대로 추정함
  - ES5 이후의 `parseInt()`는 두 번째 인자가 없으면 무조건 10진수로 처리함

###### 비 문자열 파싱

- `parseInt()` 오작동으로 고발된 사례

  ```javascript
  parseInt( 1/0, 19 ); // 18
  ```

  - 고발자 왈, "무한대를 정수로 파싱하면 당연히 무한대"

  - 필자 왈, 비 문자열을 `parseInt()` 첫 번째 인자로 넘긴 것 자체가 잘못임

    - 반은 명시적이고 반은 암시적인 강제변환이 꽤 유용함

      ```javascript
      var a = {
          num: 21,
          toString: function() { return String( this.num * 2); }
      };
      
      parseInt( a ); // 42
      ```

      인자 값을 강제로 문자열로 바꾼 다음 파싱을 시작하는 `parseInt()`의 로직은 상당히 일리가 있음

  - `parseInt( 1/0, 19 )`는 `parseInt( "Infinity", 19 )`인데, 

    - 첫 번째 문자 "I"는 19진수의 18에 해당함
    - 두 번째 "n"은 0-9, a-i 범위 밖의 문자이므로 파싱은 여기서 멈춤
    - 그러므로 결과는 18

- 놀랍지만 대단히 합리적인 `parseInt()` 예제 더

  ```javascript
  parseInt( 0.000008 ); // 0 ("0.000008" → "0")
  parseInt( 0.0000008 ); // 8 ("8e-7" → "8")
  parseInt( false, 16 ); // 250 ("false" → "fa")
  parseInt( parseInt, 16 ); // 15 ("function..." → "f")
  parseInt( "0x10" ); // 16
  parseInt( "103", 2 ); // 2
  ```

##### 4.3.3 명시적 강제변환: * → 불리언

- `Boolean()`은 (ToBoolean 추상 연산에 의한) 명시적인 강제변환 방법임

  ```javascript
  var a = "0";
  var b = [];
  var c = {};
  
  var d = "";
  var e = 0;
  var f = null;
  var g;
  
  Boolean( a ); // true
  Boolean( b ); // true
  Boolean( c ); // true
  
  Boolean( d ); // false
  Boolean( e ); // false
  Boolean( f ); // false
  Boolean( g ); // false
  ```

- `!` 부정(Negate) 단항 연산자는 값을 불리언으로 명시적으로 강제변환함

  - 문제는 그 과정에서 truthy, falsy까지 뒤바뀐다는 점임

  - 일반적으로 개발 시 불리언 값으로 명시적으로 강제변환을 할 땐 `!!` 이중부정(double-negate) 연산자를 사용함(두 번째 `!`이 패리티를 다시 원상 복구하기 때문임)

    ```javascript
    var a = "0";
    var b = [];
    var c = {};
    
    var d = "";
    var e = 0;
    var f = null;
    var g;
    
    !!a; // true
    !!b; // true
    !!c; // true
    
    !!d; // false
    !!e; // false
    !!f; // false
    !!g; // false
    ```

- 이 같은 ToBoolean 강제변환 모두 `Boolean()`이나 `!!`를 쓰지 않으면 if() 문 등의 불리언 콘텍스트에서 암시적인 강제변환이 일어남

- 자료 구조의 JSON 직렬화 시 `true/false` 값으로 강제변환하는 것도 명시적인 ToBoolean 강제변환의 일례임

  ```javascript
  var a = [
      1,
      function(){ /* ... */ },
      2,
      function(){ /* ... */ }
  ];
  
  JSON.stringify( a ); // "[1,null,2,null]"
  
  JSON.stringify( a, function(key,val) {
      if (typeof val == "function")  {
          // 함수를 'ToBoolean' 강제변환함
          return !!val;
      } else {
          return val;
      }
  });
  // "[1,true,2,true]"
  ```

- 삼항 연산자 `? :`는 표현식의 평가 결과에 따라 true 또는 false를 반환함

  ```javascript
  var a = 42;
  var b = a ? true : false;
  ```

  - 암시적 강제변환이 매복해 있음
  - a를 불리언으로 강제변환해야 표현식 전체의 true/false 여부를 따져볼 수 있음
  - 이런 코드를 '명시적으로 암시적(Explicitly Implicit)'이라 했는데, 이런 코드는 쓰지 말자.
  - `Boolean( a )`나 `!!a` 같은 명시적 강제변환이 훨씬 좋음

#### 4.4 암시적 변환

- 암시적 강제변환: 부수 효과가 명확하지 않게 숨겨진 형태로 일어나는 타입 변환
- 암시적 강제변환의 목적은 중요한 내용으로부터 주의를 분산시켜 코드를 잡동사니로 가득 채워버리는 장황함(Verbosity), 보일러플레이트(Boilerplate), 불필요한 상세 구현을 줄이는 것임

##### 4.4.1 '암시적'이란?

- 암시적 강제변환이 좋은 점도 있을 것임

##### 4.4.2 암시적 강제변환: 문자열 ↔ 숫자

- `+` 연산자는 '숫자의 덧셈, 문자열 접합' 두 가지 목적으로 오버로드(Overload) 됨

  ```javascript
  var a = "42";
  var b = "0";
  
  var c = 42;
  var d = 0;
  
  a + b; // "420"
  c + d; // 42
  ```

  ```javascript
  var a = [1,2];
  var b = [3,4];
  
  a + b; // "1,23,4"
  ```

  - 피연산자 a, b 모두 문자열이 아니지만 둘 다 문자열로 강제변환된 후 접합됐음
  - `+` 알고리즘은 한쪽 피연산자가 문자열이거나 다음 과정을 통해 문자열 표현형으로 나타낼 수 있으면 문자열 붙이기를 함
  - 따라서 피연산자 중 하나가 객체(배열 포함)라면, 이 값에 ToPrimitive 추상 연산을 수행하고 다시 ToPrimitive는 number 콘텍스트 힌트를 넘겨 [[DefaultValue]] 알고리즘을 호출함
  - 

