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

