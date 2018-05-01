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


