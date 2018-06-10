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

