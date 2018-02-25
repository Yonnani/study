# CHAPTER 5. 일급 함수

- 함수형 프로그래밍의 핵심 가치 중 하나 : 함수는 일급(first-class) 객체이어야 함
  - 함수가 데이터 타입처럼 사용될 수 있다는 의미
  - 리터럴 형태로 생성 가능
  - 컨테이너에 저장 가능 - 값/변수/데이터 구조처럼
  - 다른 함수에 매개변수로 사용되거나 다른 함수의 반환 값으로 사용
    - 고차 함수(higher-order function)
    - Ex. map(), reduce() : 계산 작업을 일련의 분산 노드에 매핑, 그 결과를 의미있는 사이즈로 다시 줄임으로써 대규모 연산 처리 문제를 다룸
    - 데이터 처리 시 고차 함수를 사용하는 이점 중 하나 : 
      - 데이터를 실제 처리하는 **방법(how)**은 고차 함수를 가지고 있는 프레임워크의 세부 구현사항으로 남겨둔다는 점임.(?) 호출자는 **무엇(what)**이 되어야 하는지를 지정하고, 실제 논리 흐름을 처리하는 것은 고차 함수에 맡길 수 있음 > 선언형 프로그래밍
- 선언형 프로그래밍(declarative programming)
  - 고차 함수 또는 다른 메커니즘은 작업을 선언하는 데 사용되며 그 작업을 직접 수행하지 않음
- 명령형 프로그래밍(imperative programming)
  - 연산의 논리 흐름이 명시적으로 기술됨
- 스칼라는 일급 함수, 고차 함수, 선언형 프로그래밍의 사용을 전적으로 지원함




### 함수 타입과 값

------

- 함수의 **타입(type)** : 함수의 입력 타입과 반환값 타입의 단순 그룹

  > **구문: 함수 타입**
  >
  > ([<타입>, …]) => <타입>

```Scala
scala> def double(x: Int): Int = x * 2
double: (x: Int)Int

scala> double(5)
res0: Int = 10

scala> val myDouble: (Int) => Int = double // myDouble은 값이지만, 다른 값들과 달리 호출 가능
										   // 'myDouble' 값의 명시적 타입은 함수 호출이 아닌 함숫값으로 식별하는 데 필요함
myDouble: Int => Int = $$Lambda$1120/1495001258@61808ecd

scala> myDouble(5) // myDouble을 함수로 호출하는 것은 double을 호출하는 것과 같은 결과
res1: Int = 10

scala> val myDoubleCopy = myDouble
myDoubleCopy: Int => Int = $$Lambda$1120/1495001258@61808ecd

scala> myDoubleCopy(5) // 함숫값을 새로운 값에 할당하는 것은 다른 값들과 마찬가지로 가능
res2: Int = 10
```

- 단일 매개변수를 갖는 함수 타입은 괄호 생략 가능

  - Ex. Int => Int

  > **구문: 와일드카드 연산자로 함수 할당하기**
  >
  > val <식별자> = <함수명> _

  ```scala
  scala> def double(x: Int): Int = x * 2
  double: (x: Int)Int

  scala> val myDouble = double _ // myDouble의 명시적 함수 타입은 함수 호출과 구별하기 위해 필요하지 									  않음, 언더스코어(_)는 미래의 함수 호출에 대한 자리표시자 역할, 								  myDouble에 저장할 수 있는 함숫값을 반환함
  myDouble: Int => Int = $$Lambda$1102/1923626523@36478bce

  scala> val amount = myDouble(20)
  amount: Int = 40
  ```

- 다중 입력값을 가지는 함수 타입

  - 입력 타입을 괄호로 명시적으로 묶음
  - 매개변수 이름이 없는 함수 정의(function definition)의 형태

  ```scala
  scala> def max(a: Int, b: Int) = if (a > b) a else b
  max: (a: Int, b: Int)Int

  scala> val maximize: (Int, Int) => Int = max
  maximize: (Int, Int) => Int = $$Lambda$1217/1836406440@48860139

  scala> maximize(50, 30)
  res0: Int = 50
  ```

- 입력값이 없는 함수 타입

  - 빈 괄호는 값이 없음을 나타내는 Unit 타입의 리터럴 표현이기도 함

  ```scala
  scala> def logStart() = "=" * 50 + "\nStarting NOW\n" + "=" * 50
  logStart: ()String

  scala> val start: () => String = logStart
  <console>:12: warning: Eta-expansion of zero-argument method values is deprecated. Did you intend to write logStart()?
         val start: () => String = logStart
                                   ^
  start: () => String = $$Lambda$1255/300648514@4ed7db72

  scala> println( start() )
  ==================================================
  Starting NOW
  ==================================================
  ```




### 고차 함수

------

- 고차(higher-order) 함수 : 입력 매개변수나 반환값으로 함수 타입의 값을 가지는 함수
- 고차 함수의 예
  - String에서 동작하지만 입력 String이 널(null)이 아닌 경우에만 동작하는 다른 함수를 호출
  - JVM의 NullPointerException 방지
  - 기존 함수를 고차 함수에 매개변수로 전달하는 방법 보여줌 

```scala
scala> def safeStringOp(s: String, f: String => String) = {
     |   if (s != null) f(s) else s
     | }
safeStringOp: (s: String, f: String => String)String

scala> def reverser(s: String) = s.reverse
reverser: (s: String)String

scala> safeStringOp(null, reverser)
res0: String = null

scala> safeStringOp("Ready", reverser)
res1: String = ydaeR
```



### 함수 리터럴

------

- 함수 리터럴(function literal)

  - 실제 동작하지만 이름이 없는 함수

  ```scala
  scala> val doubler = (x: Int) => x * 2 // (x: Int) => x * 2 이 부분이 함수 리터럴
  									   // 타입을 가진 입력 인수(x)와 함수 본문(x * 2)을 정의
  doubler: Int => Int = $$Lambda$1076/1769827821@5d05f453

  scala> val doubled = doubler(22)
  doubled: Int = 44
  ```

  - 함숫값과 변수에 저장되거나 고차 함수 호출의 부분으로 정의될 수 있음

  - 함수 타입을 받는 모든 곳에 함수 리터럴을 표현할 수 있음

  - 종류

    - 익명 함수(Anonymous function)

      : 함수 리터럴에 대한 스칼라 언어의 공식적인 이름

    - 람다 표현식(Lambda expression)

      : 수학에서의 람다 계산(lambda calculus) 구문(ex. x -> x * 2)에서 유래된 용어

    - 람다(Lambda)

      : 람다 표현식의 축약형

    - function0, function1, function2, ...

      : 함수 리터럴에 대한 스칼라 컴파일러의 용어로 입력 인수의 개수를 기반으로 함

  > 왜 그냥 익명 함수라 부르지 않을까?
  >
  > **익명 함수**는 이름이 없는 데에만 초점, 필자는 함수 본문의 모든 로직이 인라인으로 기술된다는 점을 명확히 보여주는 **함수 리터럴**이라는 용어를 선호함

  - 구문: 함수 리터럴 작성하기

  ```
  ([<식별자>: <타입>, ... ]) => <표현식>
  ```

  ```Scala
  scala> val greeter = (name: String) => s"Hello, $name"
  greeter: String => String = $$Lambda$1110/962058379@1152900

  scala> val hi = greeter("World")
  hi: String = Hello, World
  ```

  > 함수 리터럴은 근본적으로 매개변수화된 표현식

  - **함수 리터럴과 함수 할당 비교 예제**

  ```scala
  scala> def max(a: Int, b: Int) = if (a > b) a else b // 원본 함수 max()
  max: (a: Int, b: Int)Int

  scala> val maximize: (Int, Int) => Int = max // 함숫값에 할당됨
  maximize: (Int, Int) => Int = $$Lambda$1116/872877010@1e7d3d87

  scala> val maximize = (a: Int, b: Int) => if (a > b) a else b // 함수 리터럴로 재정의됨
  maximize: (Int, Int) => Int = $$Lambda$1117/1328382325@44618fe6

  scala> maximize(84, 96)
  res0: Int = 96
  ```

  - **어떤 인수도 취하지 않는 함수 리터럴 정의 예제**

  ```scala
  scala> def logStart() = "=" * 50 + "\nStarting NOW\n" + "=" * 50
  logStart: ()String

  scala> val start = () => "=" * 50 + "\nStarting NOW\n" + "=" * 50
  start: () => String = $$Lambda$1143/1386265672@28941a68

  scala> println( start() )
  ==================================================
  Starting NOW
  ==================================================
  ```

  - **고차 함수 호출 내부에 정의되는 함수 리터럴 예제**

  ```scala
  scala> def safeStringOp(s: String, f: String => String) = {
       | if (s != null) f(s) else s
       | }
  safeStringOp: (s: String, f: String => String)String

  scala> safeStringOp(null, (s: String) => s.reverse)
  res2: String = null

  scala> safeStringOp("Ready", (s: String) => s.reverse)
  res3: String = ydaeR
  ```

  > 위 예제에서 함수 매개변수 'f'의 타입은 String => String임
  >
  > 이미 정의한 이 타입으로 함수 리터럴에서 명시적 타입을 제거할 수 있음
  >
  > 명시적 타입을 제거한다는 것은 우리가 함수 리터럴에서 괄호를 제거할 수 있다는 것을 의미

  - **좀 더 단순한 구문을 사용하는 함수 리터럴로 'safeStringOp' 함수 다시 호출**

  ```scala
  scala> safeStringOp(null, s => s.reverse)
  res4: String = null

  scala> safeStringOp("Ready", s => s.reverse)
  res5: String = ydaeR
  ```

  > 명시적 타입과 괄호를 제거한 함수 리터럴에는 함수의 기본적인 본질만 남게 됨
  >
  > 함수 리터럴은 입력 매개변수를 받아 그 매개변수로 연산을 수행한 결괏값을 반환함



### 자리표시자 구문

------

- 자리표시자 구문(placeholder syntax) : 함수 리터럴의 축약형

- 지정된 매개변수를 와일드카드 연산자(_)로 대체한 형태를 가짐

- 이 구문은 (a) 함수의 명시적 타입이 리터럴 외부에 지정되어 있고, (b) 매개변수가 한 번 이상 사용되지 않는 경우에 사용

- 지정된 매개변수 자리에 와일드카드 연산자를 사용하여 두 배 함수 리터럴을 만드는 예제

  ```scala
  scala> val doubler: Int => Int = _ * 2
  doubler: Int => Int = $$Lambda$1253/1695501686@ee9b7ac
  ```

  > 자리표시자 구문은 입력 매개변수가 한 번만 사용되고, 리터럴의 타입이 외부에(값(value)에) 명시적으로 정의되어 있기 때문에 유효함

- 자리표시자 구문 이용하여 'safeStringOp' 예제 호출

  ```scala
  scala> def safeStringOp(s: String, f: String => String) = {
       | if (s != null) f(s) else s
       | }
  safeStringOp: (s: String, f: String => String)String

  scala> safeStringOp(null, _.reverse)
  res6: String = null

  scala> safeStringOp("Ready", _.reverse)
  res7: String = ydaeR
  ```

  > 함수 리터럴 본문은 기능적으로 s => s.reverse와 같지만, 자리표시자 구문으로 단순화 함
  >
  > 입력 매개변수 s에 대한 참조는 함수에의 첫 번째 입력 매개변수를 나타내는 와일드카드(_)로 대체됨
  >
  > 근본적으로 와일드카드는 단일 String 입력 매개변수임

- 두 개의 자리표시자를 가진 예제

  ```scala
  scala> def combination(x: Int, y: Int, f: (Int, Int) => Int) = f(x, y)
  combination: (x: Int, y: Int, f: (Int, Int) => Int)Int

  scala> combination(23, 12, _ * _)
  res8: Int = 276
  ```

  > 두 개의 자리표시자를 사용하는 것은 구문을 더 추상적으로 만듦
  >
  > 자리표시자가 입력 매개변수(x와 y 각각)를 위치적으로 대체함
  >
  > 자리표시자의 개수는 입력 인수의 개수와 일치해야 함

- 자리표시자 개수 세 개의 예제

  ```scala
  scala> def tripleOp(a: Int, b: Int, c: Int, f: (Int, Int, Int) => Int) = f(a, b, c)
  tripleOp: (a: Int, b: Int, c: Int, f: (Int, Int, Int) => Int)Int

  scala> tripleOp(2, 3, 4, _ * _ + _)
  res1: Int = 10
  ```

  > tripleOp 함수는 네 개의 매개변수 취함
  >
  > 실제 함수 본문은 매개변수 리스트보다 훨씬 짧으며, 함수를 입력값에 적용함

- 위의 tripleOp 함수를 두 개의 타입 매개변수(하나는 공통 입력 타입으로, 다른 하나는 반환값 타입으로)를 이용하여 재정의하는 예제

  - tripleOp 함수를 우리가 선택한 어떤 입력 값이나 익명 함수(그 익명 함수가 세 개의 입력값을 취하는 한에는)로 호출할 수 있도록 유연성을 제공함

  ```scala
  scala> tripleOp[Int,Int](23, 92, 14, _ * _ + _)
  res2: Int = 2130

  scala> tripleOp[Int,Double](23, 92, 14, 1.0 * _ / _ / _)
  res3: Double = 0.017857142857142856

  scala> tripleOp[Int,Boolean](93, 92, 14, _ > _ + _)
  res4: Boolean = false
  ```

- 자리표시자 구문은 특히 데이터 구조와 컬렉션으로 작업할 때 유용함

- 수많은 정렬, 필터링, 그 외 다른 데이터 구조 메소드는 일급 함수를 사용하는 경향이 있으며, 자리표시자 구문은 이 메소드들을 호출하는 데 필요한 부가적인 코드의 양을 줄여줌



### 부분 적용 함수와 커링

------

- 함수(일반 함수와 고차 함수 모두)를 호출하려면 전형적으로 호출문 내에 함수의 매개변수가 모두 지정되어 있어야 함



### 이름에 의한 호출 매개변수

------

### 부분 함수

------

### 함수 리터럴 블록으로 고차 함수 호출하기

------

### 요약

------

### 연습문제

------

