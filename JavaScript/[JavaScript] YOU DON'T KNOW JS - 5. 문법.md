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

- `&&`, `||` 연산자는 좌측 피연산자의 평가 결과만으로 전체 결과가 이미 결정될 경우 우측 피연산자의 평가를 건너뜀

  그래서 '단락(Short Circuited)'이란 말이 유래됨

- 단락 평가는 유용하고 자주 쓰임

  ```javascript
  function doSomething(opts) {
      if (opts && opts.cool) {
          // ...
      }
  }
  ```

  - `opts && opts.cool`에서 `opts`는 일종의 가드

  ```javascript
  function doSomething(opts) {
      if (opts.cache || primeCache()) {
          // ...
      }
  }
  ```

  - `opts.cache`를 먼저 체크해서 OK면, `primeCache()` 함수는 호출하지 않고 넘어갈 수 있음

##### 5.2.2 끈끈한 우정

- `? :`는 `&&`와 `||`보다 우선순위가 높을까 낮을까

  ```javascript
  a && b || c ? c || b ? a : c && b : a
  ```

  - 다음 둘 중 어느 쪽으로 처리될까

    ```javascript
    a && b || (c ? c || (b ? a : c) && b : a)
    (a && b || c) ? (c || b) ? a : (c && b) : a
    ```

    - 정답은 아랫 줄
    - `&&` > `||` > `? :`

##### 5.2.3 결합성

```javascript
var a = foo() && bar();
```

- `foo()` 함수를 먼저 호출, 그 결과값에 따라 `bar()` 함수 호출 여부를 결정함
- 좌측 -> 우측 순서로 처리되니 `foo()` 먼저 호출(`&&` 결합성과는 무관)
- `a && b && c` 에서는 암시적인 그룹핑이 발생

##### 5.2.4 분명히 하자

#### 5.3 세미콜론 자동 삽입

- ASI(Automatic Semicolon Insertion 자동 세미콜론 삽입)는 자바스크립트 프로그램의 세미콜론(;)이 누락된 곳에 엔진이 자동으로 `;`을 삽입하는 것을 말함
- `;`을 안 써도 프로그램이 실행되는 이유는 ASI 덕분
- ASI는 새 줄(행 바꿈)에만 적용됨
- ASI는 주로 `break`, `continue`, `return`, `yield` 키워드가 있는 곳에서 활약

##### 5.3.1 에러 정정

- 명세에는 ASI가 `에러 정정(Error Correction)` 루틴이라고 씌여 있음
  - 구체적으로 파서 에러(Parser Error)
- 글쓴이는 '필요하다고' 생각되는 곳에는 세미콜론을 사용하고, ASI가 뭔가 해줄 거라는 가정은 최소화하자고 주장

#### 5.4 에러

- 올바르지 않은 정규 표현식은 조기 에러(Early Error)를 던짐

  ```javascript
  var a = /+foo/; // 에러
  ```

- 할당 대상은 반드시 식별자여야 함

  ```javascript
  var a;
  42 = a; // 에러
  ```

- ES5 엄격 모드에서 함수 인자명은 중복될 수 없음

  ```javascript
  function foo(a, b, a) { } // 정상 실행
  function bar(a, b, a) { "use strict"; } // 에러
  ```

- 동일한 이름의 프로퍼티가 여러 개 있는 객체 리터럴

  ```javascript
  (function() {
      "use strict";
      
      var a = {
          b: 42,
          b: 43
      }; // 에러
  })();
  ```

##### 5.4.1 너무 이른 변수 사용

- ES6는 `임시 데드 존(TDZ, Temporal Dead Zone)`이라는 개념 도입

  - TDZ는 아직 초기화를 하지 않아 변수를 참조할 수 없는 코드 영역

  - ex. ES6의 `let` 블록 스코핑

    ```javascript
    {
        a = 2; // ReferenceError!
        let a;
    }
    ```

  - 원래 `typeof` 연산자는 선언되지 않은 변수 앞에 붙여도 오류나지 않는데 TDZ 참조 시에는 에러남

    ```javascript
    {
        typeof a; // undefined
        typeof b; // ReferenceError! (TDZ)
        let b;
    }
    ```

#### 5.5 함수 인자

- TDZ 관련 에러는 ES6 디폴트 인자 값에서도 나타남

  ```javascript
  var b = 3;
  function foo( a = 42, b = a + b + 5 ) {
      // ...
  }
  ```

  - 두번째 할당문에서 좌변 b는 아직 TDZ에 남아있는 b를 참조하려고 하기 때문에 에러!
  - 인자 a는 TDZ를 밟고 간 이후여서 에러 나지 않음

- ES6 디폴트 인자 값은 함수에 인자를 넘기지 않거나 undefined를 전달했을 때 적용됨

  ```javascript
  function foo( a = 42, b = a + 1 ) {
      console.log( a, b );
  }
  
  foo(); // 42, 43
  foo( undefined ); // 42, 43
  foo( 5 ); // 5, 6
  foo( void 0, 7 ); // 42 7
  foo( null ); // null 1 (null은 0으로 강제변환됨)
  ```

- ES6 디폴트 인자 값이 arguments 배열 슬롯과 이에 대응하는 인자 값 간의 불일치를 초래(ES5에서도 불일치 발생함)

  - 인자를 넘기면 arguments의 슬롯과 인자가 연결되면서 항상 같은 값이 할당되지만 인자 없이 호출하면 연결되지 않음

- `인자와 이 인자에 해당하는 arguments 슬롯을 동시에 참조하지 마라`는 규칙만 준수하면 arguments 배열과 인자를 섞어 사용해도 안전함

#### 5.6 try...finally

- try 이후에는 `catch`, `finally` 중 하나만 필수

- `finally` 절의 코드는 반드시 실행되고 다른 코드로 넘어가기 전에 `try` 이후부터 항상 실행됨

- ```javascript
  function foo() {
      try {
          return 42;
      }
      finally {
          console.log("Hello");
      }
      console.log("절대 실행될 리 없지")
  }
  
  console.log( foo() );
  // Hello
  // 42
  ```

  - `return 42`에서 `foo()` 함수의 완료 값은 42로 셋팅되고, try 절의 실행이 종료되면서 곧바로 `finally` 절로 넘어감
  - 그 후 `foo()` 함수 전체의 실행이 끝나고 완료 값은 호출부에 반환됨

- try 안에 throw가 있어도 비슷함

  ```javascript
  function foo() {
      try {
          throw 42;
      }
      finally {
          console.log("Hello");
      }
      
      console.log("실행될 리 없지!");
  }
  
  console.log( foo() );
  // Hello
  // Uncaught Exception: 42
  ```

- 만약 `finally` 절에서 예외가 던져지면, 이전의 실행 결과는 모두 무시함

  ```javascript
  function foo() {
      try {
          return 42;
      }
      finally {
          throw "어이쿠!";
      }
      
      console.log("실행될 리 없지!");
  }
  
  console.log( foo() );
  // Uncaught Exception: 어이쿠!
  ```

- `continue`나 `break` 같은 비선형(Nonlinear) 제어문도 return과 throw와 비슷하게 작동

- `finally` 절의 `return`은 그 이전에 실행된 `try`나 `catch` 절의 `return`을 덮어씀

- 보통 함수에서는 `return`을 생략해도 `return;` 또는 `return undefined;`한 것으로 치지만, `finally` 안에서 `return`을 빼면 이전의 `return`을 무시하지 않음

- `return`을 취소해버리는 `finally + 레이블 break` 코드는 피하자

#### 5.7 switch

- `switch` 표현식과 `case` 표현식 간의 매치 과정은 `===` 알고리즘과 똑같음

- 강제변환이 일어나는 동등 비교(`==`)를 이용하고 싶으면

  ```javascript
  var a = "42";
  switch (true) {
      case a == 10:
          console.log("10 또는 '10'");
          break;
      case a == 42:
          console.log("42 또는 '42'");
          break;
      default:
          // 여기 올 일은 없음
  }
  // 42 또는 '42'
  ```

- case 표현식 평가 결과가 truthy이지만 엄격히 true는 아닐 경우 매치는 실패

  - 표현식에 `&&`나 `||`같은 '논리 연산자'를 사용할 때 문제가 됨

- default에서도 break를 안 쓰면 그 이후 코드가 계속 실행됨

#### 5.8 정리하기

