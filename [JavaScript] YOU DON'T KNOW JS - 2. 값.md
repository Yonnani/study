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

