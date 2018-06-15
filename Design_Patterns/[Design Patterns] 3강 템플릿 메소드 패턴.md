# [인프런 강좌] 자바 디자인 패턴의 이해 - Gof Design Pattern

## 섹션 3. 템플릿 메소드 패턴

- Template Method
  - 공통적인 프로세스를 묶어 주기
  - 알고리즘의 구조를 메소드에 정의하고 하위 클래스에서 알고리즘 구조의 변경없이 알고리즘을 재정의하는 패턴

- When?

  - 구현하려는 알고리즘이 일정한 프로세스가 있다.
  - 구현하려는 알고리즘이 변경 가능성이 있다.

- How?

  - 알고리즘을 여러 단계로 나눈다.
  - 나눠진 알고리즘의 단계를 메소드로 선언한다.
  - 알고리즘을 수행할 템플릿 메소드를 만든다.
  - 하위 클래스에서 나눠진 메소드들을 구현한다.

  ```java
  Abstract Class {
      operation1():void
      operation2():void
      operation3():void
      templateMethod():void
  }
  ```

  ```java
  templateMethod() {
      operation1();
      operation2();
      operation3();
  }
  ```

  ```java
  Concrete Class extends Abstract Class {
      operation1(): void
      operation2(): void
      operation3(): void
  }
  ```

  