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

