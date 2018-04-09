# YOU DON'T KNOW JS 타입과 문법, 스코프와 클로저

## CHAPTER 2. 값

### 2.1 배열

- 자바스크립트의 배열 : 어떤 타입의 값이라도 담을 수 있는 그릇

- 크기 정하지 않고 선언가능

- 구멍 난(sparse) 배열을 다룰 때는 조심!

  ```javascript
  var a = [];

  a[0] = 1;
  // 'a[1]' 슬롯을 건너뜀
  a[2] = [3];

  a[1]; // undefined

  a.length; // 3
  ```

  - a[1]은 undefined 이지만, 명시적으로 a[1] = undefined 세팅한 것과 똑같지는 않음

- 배열 인덱스는 숫자이나 배열 자체도 하나의 객체여서 키/프로퍼티 문자열을 추가할 수 있음(하지만 배열 length는 증가하지 않음)

  ```javascript
  var a = [];

  a[0] = 1;
  a["foobar"] = 2;

  a.length; // 1
  a["foobar"]; // 2
  a.foobar; // 2
  ```

  - 키로 넣은 문자열 값이 표준 10진수 숫자로 타입이 바뀌면, 문자열 키가 아닌 숫자 키를 사용한 것과 같은 결과가 초래되므로 주의할 것

    ```javascript
    var a = [];
    a["13"] = 42;
    a.length; // 14
    ```

### 2.1.1 유사 배열

- 유사 배열 값(숫자 인덱스가 가리키는 값들의 집합)을 진짜 배열로 바꾸고 싶을 경우

  - 배열 유틸리티 함수(indexOf(), concat(), forEach() 등)를 사용하여 해결

  - 함수에서 (배열 비슷한) arguments 객체를 사용하여 인자를 리스트로 가져오는 예제(ES6부터 비 권장)

    ```javascript
    function foo() {
        var arr = Array.prototype.slice.call(arguments);
        arr.push("bam");
        console.log(arr);
    }

    foo("bar", "baz"); // ["bar", "baz", "bam"]
    ```

    ES6부터는 기본 내장 함수 Array.from()이 대신함

    ```javascript
    ...
    var arr = Array.from(arguments);
    ...
    ```

### 2.2 문자열

- 자바스크립트 문자열은 문자 배열과 같지 않음

- 문자열은 불변 값(immutable)이지만 배열은 가변 값(mutable)

- 문자열이 불변 값이므로 문자열 메서드는 그 내용을 바로 변경하지 않고 항상 새로운 문자열을 생성한 후 반환함

- 반면 대부분의 배열 메서드는 그 자리에서 곧바로 원소를 수정함

- 문자열을 다룰 때 유용한 대부분의 배열 메서드는 쓸 수 없지만, 문자열에 대해 불변 배열 메서드를 빌려 쓸 수는 있음

  ```javascript
  var a = "foo";
  var b = ["f","o","o"];

  a.join; // undefined
  a.map; // undefined

  var c = Array.prototype.join.call(a, "-");
  var d = Array.prototype.map.call(a, function (v) {
      return v.toUpperCase() + ".";
  }).join("");

  c; // "f-o-o"
  d; // "F.O.O."

  a.reverse; // undefined
  b.reverse(); // ["o","o","f"]
  b; // ["o","o","f"]
  ```

- 문자열은 불변 값이라 바로 변경되지 않으므로 배열의 가변 메서드는 통하지 않고, 그래서 '빌려 쓰는 것' 또한 안됨

- 문자열을 배열로 바꾸고 원하는 작업을 수행한 후 다시 문자열로 되돌리는 것이 또다른 꼼수(핵Hack)임

  ```javascript
  var c = a.split("").reverse().join("");

  c; // "oof"
  ```

- '문자열' 자체에 어떤 작업을 빈번하게 수행하는 경우라면 문자열을 문자 단위로 저장하는 배열로 취급하는 것이 더 나을 수도 있음


### 2.3 숫자

- 자바스크립트 숫자 타입은 number가 유일, 정수(Integer), 부동 소수점 숫자(Fractional Decimal Number) 모두 포함

### 2.3.1 숫자 구문

- 소수점 앞 정수가 0이면 생략 가능

  ```javascript
  var a = 0.42;
  var b = .42;
  ```


- 소수점 이하가 0일 때도 생략 가능

  ```javascript
  var a = 42.0;
  var b = 42.
  ```

- 대부분의 숫자는 10진수가 디폴트고 소수점 이하 0은 뗌

  ```javascript
  var a = 42.300;
  var b = 42.0;

  a; // 42.3
  b; // 42
  ```

- 아주 작거나 큰 숫자는 지수형으로 표시, toExponential()의 결괏값과 같음

  ```javascript
  var a = 5E10;
  a; // 50000000000
  a.toExponential(); // "5e+10"

  var b = a * a;
  b; // 2.5e+21

  var c = 1/a;
  c; // 2e-11
  ```

- 숫자 값은 Number 객체 래퍼로 박싱할 수 잇기 때문에 Number.prototype 메서드로 접근 가능

  - toFixed() 메서드는 지정한 소수점 이하 자릿수까지 숫자를 나타냄

  ```javascript
  var a = 42.59;

  a.toFixed(0); // "43"
  a.toFixed(1); // "42.6"
  a.toFixed(2); // "42.59"
  a.toFixed(3); // "42.590"
  a.toFixed(4); // "42.5900"
  ```

  > 실제로는 숫자 값을 문자열 형태로 반환함

  - toPrecision()은 기능 비슷하지만 유효 숫자 개수를 지정할 수 있음

  ```Javascript
  var a = 42.59;

  a.toPrecision(1); // "4e+1"
  a.toPrecision(2); // "43"
  a.toPrecision(3); // "42.6"
  a.toPrecision(4); // "42.59"
  a.toPrecision(5); // "42.590"
  a.toPrecision(6); // "42.5900"
  ```

- .이 소수점일 경우 프로퍼티 접근자(Accessor)가 아닌 숫자 리터럴의 일부로 해석되므로 . 연산자를 사용할 때는 조심

  ```javascript
  // 잘못된 구문
  42.toFixed(3); // SyntaxError : 이유 : .이 42. 리터럴의 일부가 되어버려 .toFixed 메서드에 접근할 수단이 없기 때문임

  // 모두 올바른 구문
  (42).toFixed(3); // "42.000"
  0.42.toFixed(3); // "0.420"
  42..toFixed(3); // "42.000" => 첫 번째 .은 숫자 리터럴의 일부, 두 번째 .은 프로퍼티 연산자로 해석됨
  ```

- 다음 코드도 옳지만 개발자들이 좀 힘들어짐

  ```javascript
  42 .toFixed(3); // "42.000"
  ```

- 큰 숫자는 보통 지수형으로 표시함

  ```javascript
  var onethousand = 1E3; // 1 * 10^3
  var onemilliononehundredthousand = 1.1E6; // 1.1 * 10^6
  ```

- 숫자 리터럴은 2진, 8진, 16진 등 다른 진법으로 나타낼 수 있음

  ```javascript
  0xf3; // 243의 16진수
  0Xf3; // 위와 같음
  0363; // 243의 8진수
  ```

- ES6부터는 다음 코드 가능

  ```javascript
  0o363; // 243의 8진수
  0O363; // 위와 같음

  0b11110011; // 243의 이진수
  0B11110011; // 위와 같음
  ```

  > 0 다음의 O는 헷갈리니까 항상 소문자로 0x, 0b, 0o 로 표기하면 좋음


### 2.3.2 작은 소수 값

- 이진 부동 소수점 숫자의 부작용

  ```javascript
  0.1 + 0.2 === 0.3; // false
  ```

  > - 수식만 보면 분명 true
  > - 하지만 이진 부동 소수점으로 나타낸 0.1과 0.2는 원래 숫자와 일치하지 않음
  > - 더한 결과는 실제로 0.30000000000000004에 가까움

- 그렇다면, 0.1 + 0.2와 0.3 두 숫자 비교 방법은?

  - 미세한 '반올림 오차'를 허용 공차(Tolerence)로 처리하는 방법이 있음

    - 미세한 오차 : 머신 입실론(Machine Epsilon), 자바스크립트의 머신 입실론은 2^-52임

    - ES6부터는 이 값이 Number.EPSILON으로 미리 정의되어 있음

    - ES6 이전 브라우저는 다음의 폴리필 사용하면 됨

      ```javascript
      if (!Number.EPSILON) {
          Number.EPSILON = Math.pow(2, -52);
      }
      ```

    - Number.EPSILON으로 두 숫자의 (반올림 허용 오차 이내의) 동등함(Equality)을 비교할 수 있음

      ```javascript
      function numbersCloseEnoughToEqual(n1, n2) {
          return Math.abs( n1- n2 ) < Number.EPSION;
      }

      var a = 0.1 + 0.2;
      var b = 0.3;

      numbersCloseEnoughToEqual( a, b ); // true
      numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
      ```

- 부동 소수점 숫자의 최댓값은 대략 1.798e+308이고, `Number.MAX_VALUE`로 정의

- 부동 소수점 숫자의 최솟값은 대략 5e-324로 음수는 아니지만 거의 0에 가까운 숫자고, `Number.MIN_VALUE`로 정의함

### 2.3.3 안전한 정수 범위

- 정수는 Number.MAX_VALUE보다 작은 수준에서 '안전(safe)' 값의 범위가 정해져 있음
  - '안전하게' 표현할 수 있는 정수는 최대 `2^53 - 1(9007199254740991)`임
    - ES6에서 `Number.MAX_SAFE_INTEGER`로 정의함
  - '안전하게' 표현할 수 있는 정수는 최소 `-9007199254740991`임
    - ES6에서 `Number.MIN_SAFE_INTEGER`로 정의함
- 아주 큰 수를 다룰 수밖에 없는 상황이라면, 지금으로서는 큰 수(Big Number) 유틸리티 사용을 권함

### 2.3.4 정수인지 확인

- ES6부터는 `Number.isInteger()`로 정수 여부 확인

  ```javascript
  Number.isInteger(42); // true
  Number.isInteger(42.000); // true
  Number.isInteger(42.3); // false
  ```

- ES6 이전 버전을 위한 폴리필

  ```javascript
  if (!Number.isInteger) {
      Number.isInteger = function(num) {
          return typeof num == "number" && num % 1 == 0;
      }
  }
  ```

- 안전한 정수 여부는 ES6부터 `Number.isSafeInteger()`로 체크

  ```javascript
  Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
  Number.isSafeInteger(Math.pow(2, 53)); // false
  Number.isSafeInteger(Math.pow(2, 53) - 1); // true
  ```

- 폴리필

  ```javascript
  if (!Number.isSafeInteger) {
      Number.isSafeInteger = function (num) {
          return Number.isInteger(num) &&
              Math.abs(num) <= Number.MAX_SAFE_INTEGER;
      };
  }
  ```

### 2.3.5 32비트(부호 있는) 정수

- 정수의 '안전 범위'가 대략 9천 조(53비트)에 이르지만, 32비트 숫자에만 가능햔 연산이 있으므로 실제 범위는 훨씬 줄어듦
  - 정수의 안전 범위는 Math.pow(-2, 31)(-2147483648, 약 -21억)에서 Math.pow(2, 31)-1(2147483647, 약 +21억) 까지임
- a | 0과 같이 쓰면 '숫자 값 -> 32비트 부호 있는 정수'로 강제변환을 함
  - | 비트 연산자는 32비트 정수 값에만 쓸 수 있기 때문에(그 상위 비트는 소실됨) 가능한 방법임
  - 0과의 OR 연산은 본질적으로 NOOP 비트 연산과 같음 (NOP 또는 NOOP는 어셈블리 언어의 명령어 중 하나, 명령 자체의 길이만큼 프로그램 카운터를 증가시킬 뿐 아무런 실행도 하지 않음, 0과의 OR 연산 역시 값은 변하지 않으므로 이에 비유한 것임)

### 2.4 특수 값

#### 2.4.1 값 아닌 값

- Undefined 타입의 값은 undefined밖에 없음
- null 타입도 값은 null 뿐임
- 그래서 이 둘은 타입과 값이 항상 같음
- null은 식별자(Identifier)가 아닌 특별한 키워드이므로 null이라는 변수에 무언가를 할당할 수는 없음
- 하지만 undefined는 식별자로 쓸 수 있음

#### 2.4.2 Undefined

