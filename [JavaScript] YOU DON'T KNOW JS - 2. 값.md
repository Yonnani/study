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

