# YOU DON'T KNOW JS 타입과 문법, 스코프와 클로저

## CHAPTER 5. 문법

### 5.1 문과 표현식

- 문(Statement)과 표현식(Expression)

- 자바스크립트에서

  - 문(Statement)은 문장(Sentence), 표현식(Expression)은 어구(Phrase), 연산자는 구두점/접속사에 해당됨

  - 모든 표현식은 단일한, 특정한 결괏값으로 계산됨

  - 예

    ```javascript
    var a = 3 * 6;
    var b = a;
    b;
    ```

    - 세 줄은 각각 표현식이 포함된 문임
    - 첫째, 둘째 문장은 각각 변수를 선어(그리고 선택적으로 동시에 어떤 값을 할당)하므로 '선언문(Declaration Statement)'이라 함
    - (앞에 var가 빠진) `a = 3 * 6`나 `b = a`는 '할당 표현식(Assignment Expression)'이라고 함
    - 세 번째 줄은 b가 표현식의 전부이지만 이것만으로도 완전한 문임, '표현식 문(Expression Statement)'이라고 일컬음

#### 5.1.1 문의 완료 값

- 모든 문은 (그 값이 undefined라 해도) 완료 값(Completion Value)을 가짐

- 브라우저 개발자 콘솔 창에서 문을 타이핑하면 가장 최근에 실행된 문의 완료 값이 기본적으로 출력됨

- 할당 표현식 `b = a`는 할당 이후의 값이 완료 값이지만, `var` 문 자체의 완료 값은 `undefined`임

- 다른 종류의 문 완료 값

  - 보통의 `{ }` 블록은 내부의 가장 마지막 문/표현식의 완료 값을 자신의 완료 값으로 반환함

    ```javascript
    var b;
    
    if (true) {
        b = 4 + 38;
    }
    ```

    콘솔 창에서 실행하면 42가 나옴

    블록의 완료 값은 내부에 있는 마지막 문의 값을 암시적으로 반환한 값임

  - 다음 코드는 작동하지 않음

    ```javascript
    var a, b;
    a = if (true) {
        b = 4 + 38;
    };
    ```

    완료 값을 포착하기 위해 어쩔 수 없이 eval() 함수를 사용함

    ```javascript
    var a, b;
    a = eval( "if (true) { b = 4 + 38; }" );
    a; // 42
    ```

    ES7 명세에는 'do 표현식'이 제안됨

    ```javascript
    var a, b;
    a = do {
        if (true) {
            b = 4 + 38;
        }  
    };
    a; // 42
    ```

    - `do { }` 표현식은 (하나 이상의 문을 포함한) 블록 실행 후 블록 내 마지막 문의 완료 값을 do 표현식 전체의 완료 값으로 반환하며 결국 이 값이 변수 a에 할당됨
    - 인라인 함수 표현식 안에 감싸서 명시적으로 반환할 필요 없이 문을 (다른 문 안에 들어갈 수 있는) 표현식처럼 다루자는 게 기본적인 아이디어임


#### 5.1.2 표현식의 부수 효과

- 대부분의 표현식에는 부수 효과가 없음

  ```javascript
  var a = 2;
  var b = a + 3;
  ```

- 함수 호출 표현식은 부수 효과를 가진(가졌을지 모를) 표현식의 예

  ```javascript
  function foo() {
      a = a + 1;
  }
  
  var a = 1;
  foo(); // 결과값: 'undefined', 부수 효과: 'a'가 변경됨
  ```

- 다른 부수 효과를 지닌 표현식

  ```javascript
  var a = 42;
  var b = a++;
  ```

  - 표현식 `a++`이 하는 일은 두 가지임
    1. a의 현재 값 42를 반환(그리고 b에 할당하는 것까지)하고
    2. a 값을 1만큼 증가시킴
  - `++`를 전위 연산자로 사용하면 표현식으로부터 값이 반환되기 전에 (a 값을 1만큼 증가시키는) 부수 효과를 일으킴
  - 후위 연산자로 사용하면 값을 반환한 이후에 부수 효과가 발생함

  > `++a++`은 실행하면 ReferenceError가 남
  >
  > - 부수 효과를 유발하는 연산자는 부수 효과를 일으킬 변수 레퍼런스가 꼭 필요하기 때문임
  >
  > - `++a++`에서는 `a++` 부분이 먼저 평가되어 증가되기 이전의 값을 돌려줌
  >
  >   따라서 `++42` 평가시 `++` 연산자는 42 같은 원시 값에 직접 부수 효과를 일으킬 수는 없으므로 ReferenceError를 던짐

- `a++`를 `()`로 감싸면 후위 부수 효과를 캡슐화할 수 있다고 착각하는 경우도 있음

  ```javascript
  var a = 42;
  var b = (a++);
  
  a; // 43
  b; // 42
  ```

  - `()` 로 둘러싼다 해도 `a++` 표현식에서 부수 효과 발생 이후 재평가된 새 표현식을 만들어내는 건 불가능함

  - 하지만 콤마 연산자 `,`를 사용하면 다수의 개별 표현식을 하나의 문으로 연결할 수 있음

    ```javascript
    var a = 42, b;
    b = ( a++, a );
    
    a; // 43
    b; // 43
    ```

- `delete`도 부수 효과를 일으키는 연산자

  - `delete`는 객체의 프로퍼티를 없애거나 배열에서 슬롯을 제거할 때 씀

  - 하지만 단독 문(Standalone Statement)으로 많이 씀

    ```javascript
    var obj = {
        a: 42
    };
    
    obj.a; // 42
    delete obj.a; // true
    obj.a; // undefined
    ```

  - `delete` 연산이 유효한/허용된 연산일 경우에는 `true`, 그 외에는 `false`를 반환함

  - 이 연산자의 부수 효과는 프로퍼티(또는 배열 슬롯)를 제거하는 것임

- `=` 할당 연산자

  ```javascript
  var a;
  
  a = 42; // 42
  a; // 42
  ```

  - `a = 42` 문의 실행 결과는 이제 막 할당된 값(42)이므로 42를 a에 할당하는 자체가 본질적으로 부수 효과임

  - 할당 표현식/문 실행 시 할당된 값이 완료 값이 되는 작동 원리는 다음과 같은 연쇄 할당문(Chained Assignment)에서 유용함

    ```javascript
    var a, b, c;
    
    a = b = c = 42;
    ```

    - `c = 42` 평가 결과는 (42를 c에 할당하는 부수 효과를 일으키며) 42
    - `b = 42` 평과 결과는 (42를 b에 할당하는 부수 효과를 일으키며) 42
    - `a = 42`로 (42를 a에 할당하는 부수 효과를 일으키며) 평가됨

    ```javascript
    function vowels(str) {
        var matches;
        
        if (str) {
            // 모든 모음을 추출함
            matches = str.match( /[aeiou]/g );
            
            if (matches) {
                return matches;
            }
        }
    }
    
    vowels( "Hello World" ); // ["e", "o", "o"]
    ```

    위의 코드를 할당 연산자의 부수효과를 활용하면

    ```javascript
    function vowels(str) {
        var matches;
        
        // 모든 모음을 추출함
        if (str && (matches = str.match( /[aeiou]/g ))) {
            return matches;
        }
    }
    
    vowels( "Hello World" ); // ["e", "o", "o"]
    ```

    필자는 후자를 더 선호함

#### 5.1.3 콘텍스트 규칙

- 자바스크립트 문법 규칙 중, 같은 구문이지만 어디에서 어떤 식으로 사용하느냐에 따라 서로 다른 의미를 가지는 경우의 사례

##### 중괄호

###### 객체 리터럴

```javascript
// 'bar()' 함수는 앞에서 정의됨

var a = {
    foo: bar()
};
```

###### 레이블

- 방금 전 코드에서 `var a = `부분 삭제

  ```javascript
  // 'bar()' 함수는 앞에서 정의됨
  
  {
      foo: bar()
  }
  ```

  - 여기서의 `{}`는 평범한 코드 블록임

  - `let` 블록스코프 선언과 함께 쓰이면 유용함

  - 자바스크립트에서 레이블 문(Labeled Statement)

    - 거의 잘 알려지지 않고 권장하고 싶지 않은 기능
    - 자바스크립트에 `goto` 문을 지원하지는 않지만 제한적으로 레이블 점프(Labeled Jump)라는 특별한 형태의 `goto` 장치가 대신 마련되어 있음

    ```javascript
    // 'foo' 레이블 루프
    foo: for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            // 두 루프의 반복자가 같을 때마다 바깥쪽 루프를 continue 한다.
            if (j == i) {
                // 다음 순회 시 'foo' 붙은 루프로 점프한다.
                continue foo;
            }
            
            // 홀수 배수는 건너뛴다.
            if ((j * i) % 2 == 1) {
                // 평범한(레이블 없는), 안쪽 루프의 'continue'
                continue;
            }
            
            console.log( i, j );
        }
    }
    
    // 1 0
    // 2 0
    // 2 1
    // 3 0
    // 3 2
    ```

    > continue foo는 "foo라는 레이블이 붙은 루프의 다음 순회를 계속하라"는 뜻임

    ```javascript
    // 'foo' 레이블 루프
    foo: for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            if ((i*j) >= 3) {
                console.log( "그만!", i, j );
                break foo;
            }
            console.log( i, j );
        }
    }
    // 0 0
    // 0 1
    // 0 2
    // 0 3
    // 1 0
    // 1 1
    // 1 2
    // 그만! 1 3
    ```

    - `break foo`는 "foo 라는 레이블이 붙은 바깥쪽 루프/블록 밖으로 나가 그 이후부터 계속하라"는 뜻임

  - 레이블은 비 루프(Nonloop) 블록에 적용할 수 있는데, 이런 비 루프 레이블은 `break`만 참조할 수 있음

    ```javascript
    // 'bar' 레이블 블록
    function foo() {
        bar: {
            console.log("Hello");
            break bar;
            console.log("절대 실행 안됨");
        }
        console.log("world");
    }
    
    foo();
    // Hello
    // world
    ```

###### JSON

- JSON은 자바스크립트 고유의 하위 집합이 아님

- `{ "a" : 42 }`를 콘솔 창에 입력하면 에러남

  - 자바스크립트 문의 레이블은 따옴표로 감싸면 안 되기 때문에 `"a"`는 문법에 맞는 레이블이 아니며, 그 뒤에 `:`이 오면 안됨

  - JSON 문자열로만 가득 채워진 파일을 `<script src=...>` 태그로 읽어 들여도 정상적인 자바스크립트 코드로 인식될 것이라는 것은 오해임

  - 그래서 보통 JSON-P(JSON 데이터를 `foo({"a":42})`와 같은 함수 호출로 감싸는 패턴) 방식으로 자바스크립트 함수 중 하나에 이 값을 인자로 실어 보내면 접근이 안 되는 문제를 해결할 수 있음

  - 하지만 사실은, `{ "a": 42 }`는 완전히 올바른 JSON 값이지만, 그 자체로는 레이블이 잘못된 문 블록으로 해석되어 에러가 남

     `foo({"a":42})`는 함수 내부에서 `{"a":42}`이 `foo()`에 전달된 객체 리터럴이므로 유효한 자바스크립트 코드임

    따라서, JSON-P가 JSON을 문법에 맞는 자바스크립트 코드로 변환해주는 셈

###### 블록

- 자바스크립트 함정 중 하나

  ```javascript
  [] + {}; // [object Object]
  {} + []; // 0
  ```

  - 윗 줄에서 엔진은 `+` 연산자 표현식의 `{}`를 실제 값(빈 객체)으로 해석함

    `[]`는 `""`로 강제변환되고 `{}`도 문자열 `"[object Object]"`로 강제변환됨

  - 아랫 줄의 `{}`는 동떨어진 (아무일도 하지 않는) 빈 블록으로 간주함

    그래서 `+ []` 표현식에서 명시적으로 `[]`를 숫자 0으로 강제변환함

###### 객체 분해

- ES6부터는 '분해 할당(Destructuring Assignments)', 구체적으로는 객체 분해 시 `{}`를 사용함

  ```javascript
  function getData() {
      // ...
      return {
          a: 42,
          b: "foo"
      };
  }
  
  var {a, b} = getData();
  console.log( a, b ); // 42 "foo"
  ```

  - `var { a, b } = ...`이 ES6 분해 할당의 형식이며, 그 의미는 다음 코드와 같음

    ```javascript
    var res = getData();
    var a = res.a;
    bar b = res.b;
    ```

    > `{a, b}`는 `{ a: a, b: b }`를 간결하게 쓴 형태

- `{}`를 이용한 객체 분해는 명명된 함수에도 활용할 수 있음

  암시적인 객체 프로퍼티 할당과 비슷한 간편 구문(Sugar Syntax)임

  ```javascript
  function foo({ a, b, c }) {
      // 다음 코드처럼 할 필요가 없음
      // var a = obj.a, b = obj.b, c = obj.c
      console.log( a, b, c );
  }
  
  foo({
      c: [1, 2, 3],
      a: 42,
      b: "foo"
  }); // 42 "foo" [1, 2, 3]
  ```

###### else if와 선택적 블록

```javascript
if (a) {
    // ...
} else if (b) {
    // ...
} else {
    // ...
}
```

- 실은 `else if` 같은 것은 없음

- 실제로는 항상 아래와 같이 파싱됨

  ```javascript
  if (a) {
      // ...
  } 
  else {
      if (b) {
          // ...
      }
      else {
          // ...
      }
  }
  ```

#### 5.2 연산자 우선순위

- 피연산자가 2개고 연산자가 하나면 결괏값을 쉽게 예상할 수 있음

- 연산자 2개, 피연산자 3개면?

  ```javascript
  var a = 42;
  var b = "foo";
  var c = [1, 2, 3];
  
  a && b || c; // 결과는?
  a || b && c; // 결과는?
  ```

  - 두 표현식의 결과를 이해하려면 '연산자 우선순위(operator precedence)'를 알아야 함

- 예제

  ```javascript
  var a = 42, b;
  b = ( a++, a );
  
  a; // 43
  b; // 43
  ```

  ()를 없애면

  ```javascript
  var a = 42, b;
  b = a++, a;
  
  a; // 43
  b; // 42
  ```

  - `,` 연산자가 `=` 연산자보다 우선순위가 낮음

    `b = a++, a`를 엔진은 `(b = a++), a`로 해석

- 다수의 문을 연결하는 연산자로 `,`를 사용할 때에는 이 연산자의 우선순위가 최하위임

- 예제

  ```javascript
  if (str && (matches = str.match( /[aeiou]/g ))) {
      // ...
  }
  ```

  - 할당문을 양쪽 `()`로 감싸야함
  - `&&`가 `=`보다 우선순위가 높음
  - `(str && matches)`는 정상적인 변수가 아닌, 어떤 값(여기서는 undefined)으로 평가되는데 `=` 할당 연산자 좌측에 값이 나오기때문에 에러남

- 예제

  ```javascript
  var a = 42;
  var b = "foo";
  var c = false;
  
  var d = a && b || c ? c || b ? a : c && b : a;
  
  d;
  ```

  - 제일 앞의 `(a && b || c)`가 `(a && b) || c`와 `a && (b || c)` 중 어느 쪽으로 해석될까

    ```javascript
    (false && true) || true; // true
    false && (true || true); // false
    
    false && true || true; // true
    (false && true) || true; // true
    ```

    - `&&` 연산자가 먼저 평가되고 `||` 연산자가 그 다음에 평가됨

    ```javascript
    true || false && false; // true
    
    (true || false) && false; // false
    true || (false && false); // true
    ```

##### 5.2.1 단락 평가

