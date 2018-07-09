# 토비의 스프링 3.1

## Vol.1 스프링의 이해와 원리

### 1장 오브젝트와 의존관계

- 스프링이 가장 관심을 많이 두는 대상은 **오브젝트**임

#### 1.1 초난감 DAO

- DAO(Data Access Object) : DB를 사용해 데이터를 조회하거나 조작하는 기능을 전담하도록 만든 오브젝트

##### 1.1.1 User

- 자바빈(JavaBean) 
  - 원래 비주얼 툴에서 조작 가능한 컴포넌트를 말함
  - 이제는 다음 두 가지 관례를 따라 만들어진 오브젝트를 가리킴
    - 디폴트 생성자 : 자바빈은 파라미터가 없는 디폴트 생성자를 갖고 있어야 한다. 툴이나 프레임워크에서 리플렉션을 이용해 오브젝트를 생성하기 때문에 필요하다.
    - 프로퍼티 : 자바빈이 노출하는 이름을 가진 속성을 프로퍼티라고 한다. 프로퍼티는 set으로 시작하는 수정자 메소드(setter)와 get으로 시작하는 접근자 메소드(getter)를 이용해 수정 또는 조회할 수 있다.

##### 1.1.2 UserDao

- JDBC를 이용하는 작업의 일반적인 순서
  - DB 연결을 위한 Connection을 가져온다.
  - SQL을 담은 Statement(또는 PreparedStatement)를 만든다.
  - 만들어진 Statement를 실행한다.
  - 조회의 경우 SQL 쿼리의 실행 결과를 ResultSet으로 받아서 정보를 저장할 오브젝트(ex. User)에 옮겨준다.
  - 작업 중에 생성된 Connection, Statement, ResultSet 같은 리소스는 작업을 마친 후 반드시 닫아준다.
  - JDBC API가 만들어내는 예외(Exception)를 잡아서 직접 처리하거나, 메소드에 throws를 선언해서 예외가 발생하면 메소드 밖으로 던지게 한다.

##### 1.1.3 main()을 이용한 DAO 테스트 코드

#### 1.2 DAO의 분리

##### 1.2.1 관심사의 분리

- 프로그래밍의 기초 개념 중에 **관심사의 분리**(Separation of Concerns)가 있음
  - 이를 객체지향에 적용해보면, 관심이 같은 것끼리는 하나의 객체 안으로 또는 친한 객체로 모이게 하고, 관심이 다른 것은 가능한 한 따로 떨어져서 서로 영향을 주지 않도록 분리하는 것
  - 관심사가 같은 것끼리 모으고 다른 것은 분리해줌으로써 같은 관심에 효과적으로 집중할 수 있게 만들어주는 것

##### 1.2.2 커넥션 만들기의 추출

###### UserDao의 관심사항

- DB 연결과 관련된 관심
- 사용자 등록을 위해 DB에 보낼 SQL 문장을 담을 Statement를 만들고 실행하는 것
- 작업이 끝나면 사용한 리소스인 Statement와 Connection 오브젝트를 닫아서 공유 리소스를 시스템에 돌려주는 것

###### 중복 코드의 메소드 추출

- 중복된 DB 연결 코드를 `getConnection()`이라는 이름의 독립적인 메소드로 만듦

###### 변경사항에 대한 검증: 리팩토링과 테스트

- 리팩토링(refactoring) : 기존의 코드를 외부의 동작방식에는 변화 없이 내부 구조를 변경해서 재구성하는 작업 또는 기술 (리팩토링 참고서 : "리팩토링"(마틴 파울러, 켄트 벡 공저))
- 리팩토링에서 메소드 추출 기법(extract method)
  - 앞의 `getConnection()`과 같이 공통의 기능을 담당하는 메소드로 중복된 코드를 뽑아내는 것

##### 1.2.3 DB 커넥션 만들기의 독립

- 고객에게 UserDao의 소스를 직접 공개하지 않고 컴파일된 클래스 바이너리 파일만 제공하고 싶은 경우, 고객 스스로 원하는 DB 커넥션 생성 방식을 적용하게 하려면?

###### 상속을 통한 확장

- 기존의 UserDao 코드를 한 단계 더 분리하면 됨
  - 만들어진 UserDao에서 메소드 구현 코드를 제거, `getConnection()`을 추상 메소드로 만듦
  - 이 추상 클래스인 UserDao를 고객에게 판매
  - 고객은 UserDao 클래스를 상속해서 서브클래스를 만듦
  - 서브클래스에서는 `getConnection()` 메소드를 원하는 방식대로 구현할 수 있음
- 템플릿 메소드 패턴(template method pattern) : 슈퍼클래스에 기본적인 로직의 흐름을 만들고, 그 기능의 일부를 추상 메소드나 오버라이딩이 가능한 protected 메소드 등으로 만든 뒤 서브클래스에서 이런 메소드를 필요에 맞게 구현해서 사용하도록 하는 방법
- 팩토리 메소드 패턴(factory method pattern) : 서브클래스에서 구체적인 오브젝트 생성 방법을 결정하게 하는 것

> **디자인 패턴**
>
> - 디자인 패턴은 소프트웨어 설계 시 특정 상황에서 자주 만나는 문제를 해결하기 위해 사용할 수 있는 재사용 가능한 솔루션
> - 모든 패턴에는 간결한 이름이 있어서 잘 알려진 패턴을 적용하고자 할 때 패턴 이름을 언급하는 것만으로도 설계의 의도와 해결책을 함께 설명할 수 있다는 장점이 있음
> - 디자인 패턴은 주로 객체지향 설계에 관한 것, 대부분 객체 지향적 설계 원칙을 이용해 문제를 해결함
> - 패턴의 두 가지 구조
>   - 클래스 상속
>   - 오브젝트 합성

> **템플릿 메소드 패턴**
>
> - 상속을 통해 슈퍼클래스의 기능을 확장할 때 사용하는 가장 대표적인 방법
> - 변하지 않는 기능은 슈퍼클래스에, 자주 변경되며 확장할 기능은 서브 클래스에서 만듦
> - 훅(hook) 메소드 : 슈퍼클래스에서 디폴트 기능을 정의해두거나 비워뒀다가 서브클래스에서 선택적으로 오버라이드할 수 있도록 만들어둔 메소드
> - 서브클래스에서는 추상 메소드를 구현하거나, 훅 메소드를 오버라이드하는 방법을 이용해 기능의 일부를 확장함
>
> ```java
> public abstract class Super {
>     // 기본 알고리즘 골격을 담은 메소드를 템플릿 메소드라고 부름
>     // 템플릿 메소드는 서브클래스에서 오버라이드하거나 구현할 메소드를 사용함
>     public void templateMethod() {
>         // 기본 알고리즘 코드
>         hookMethod();
>         abstractMethod();
>         ...
>     }
>     
>     protected void hookMthod() {} // 선택적으로 오버라이드 가능한 훅 메소드
>     public abstract void abstractMethod(); // 서브클래스에서 반드시 구현해야 하는 추상 메소드
> }
> 
> // 슈퍼클래스의 메소드를 오버라이드하거나 구현해서 기능을 확장함
> // 다양한 확장 클래스를 만들 수 있음
> public class Sub1 extends Super {
>     protected void hookMethod() {...}
>     public void abstractmethod() {...}
> }
> ```

> **팩토리 메소드 패턴**
>
> - 팩토리 메소드 : 서브클래스에서 오브젝트 생성 방법과 클래스를 결정할 수 있도록 미리 정의해둔 메소드
> - 팩토리 메소드 패턴 : 팩토리 메소드 방식을 통해 오브젝트 생성 방법을 나머지 로직, 즉 슈퍼클래스의 기본 코드에서 독립시키는 방법
> - 자바에서 오브젝트를 생성하는 기능을 가진 메소드를 일반적으로 팩토리 메소드라고 부르는데, 이때 말하는 팩토리 메소드와 팩토리 메소드 패턴의 팩토리 메소드는 의미가 다름

- 위 코드의 단점
  - 상속을 사용
    - 자바는 클래스의 다중 상속을 허용하지 않기 때문에, 후에 다른 목적으로 UserDao에 상속을 적용하기 힘듦
    - 상속을 통한 상하위 클래스의 관계는 생각보다 밀접함(슈퍼클래스 내부 변경 시, 모든 서브 클래스를 수정 혹은 다시 개발해야하거나 슈퍼클래스가 더 변화하지 않도록 제약을 가하거나)
  - 확장된 기능인 DB 커넥션을 생성하는 코드를 다른 DAO 클래스에 적용할 수 없음

#### 1.3 DAO의 확장

- 추상 클래스를 만들고 이를 상속한 서브클래스에서 변화가 필요한 부분을 바꿔서 쓸 수 있게 만든 이유
  - 변화의 성격이 다른 것을 분리해서, 서로 영향을 주지 않은 채로 각각 필요한 시점에 독립적으로 변경할 수 있게 하기 위함
  - 하지만 상속이 불편함

##### 1.3.1 클래스의 분리

- 상속관계가 아닌 완전히 독립적인 클래스로 만들기
  - DB 커넥션과 관련된 부분을 별도의 클래스에 담음
  - 이 클래스를 UserDao가 이용하면 됨
- 하지만 UserDao가 SimpleConnectionMaker라는 특정 클래스와 그 코드에 종속적이게 됨

##### 1.3.2 인터페이스의 도입

- 위 문제 해결 방법 : 두 개의 클래스가 긴밀하게 연결되어 있지 않도록 중간에 추상적인 연결고리를 만들어주는 것임
- 추상화 : 어떤 것들의 공통적인 성격을 뽑아내어 이를 따로 분리해내는 작업
- 인터페이스 : 자바가 추상화를 위해 제공하는 가장 유용한 도구
  - 인터페이스는 어떤 일을 하겠다는 기능만 정의해놓은 것
- 하지만 생성자에 여전히 오브젝트 생성하는 코드가 남아있는 문제!

##### 1.3.3 관계설정 책임의 분리

- UserDao와 UserDao가 사용할 ConnectionMaker의 특정 구현 클래스 사이의 관계를 설정해주는 것에 관한 관심

- UserDao의 클라이언트 오브젝트가 제3의 관심사항인 UserDao와 ConnectionMaker 구현 클래스의 관계를 결정해주는 기능을 분리해서 두기에 적절한 곳임

  ```java
  public class UserDaoTest {
      public static void main(String[] args) throws ClassNotFoundException, SQLException {
          // UserDao가 사용할 ConnectionMaker 구현 클래스를 결정하고 오브젝트를 만듦
          ConnectionMaker connectionMaker = new DConnectionMaker();
          
          // 1. UserDao 생성
          // 2. 사용할 ConnectionMaker 타입의 오브젝트 제공
          //    결국 두 오브젝트 사이의 의존관계 설정 효과
          UserDao dao = new UserDao(connectionMaker);
          ...
      }
  }
  ```

  - UserDaoTest는 UserDao와 ConnectionMaker 구현 클래스와의 런타임 오브젝트 의존 관계를 설정하는 책임을 담당

- 인터페이스를 도입하고 클라이언트의 도움을 얻는 방법은 상속을 사용해 비슷한 시도를 했을 경우에 비해서 훨씬 유연함

##### 1.3.4 원칙과 패턴

###### 개방 폐쇄 원칙

- 개방 폐쇄 원칙(OCP, Open-Closed Principle)
  - '클래스나 모듈은 확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다'
  - UserDao는 DB 연결 방법이라는 기능을 확장하는 데는 열려있음 
  - 동시에 UserDao 자신의 핵심 기능을 구현한 코드는 변화에 영향을 받지 않고 유지할 수 있으므로 변경에는 닫혀 있음

> **객체지향 설계 원칙(SOLID)**
>
> - 객체지향의 특징을 잘 살릴 수 있는 설계의 특징
> - 로버트 마틴이 정리한 객체지향 설계 원칙인 SOLID에 대한 소개 사이트
>   - http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod
> - SOLID, 5가지 객체지향 설계의 원칙
>   - SRP(The Single Responsibility Principle): 단일 책임 원칙
>   - OCP(The Open Closed Principle): 개방 폐쇄 원칙
>   - LSP(The Liskov Substitution Principle): 리스코프 치환 원칙
>   - ISP(The Interface Segregation Principle): 인터페이스 분리 원칙
>   - DIP(The Dependency Inversion Principle): 의존관계 역전 원칙

###### 높은 응집도와 낮은 결합도

- 개방 폐쇄 원칙은 높은 응집도와 낮은 결합도(high coherence and low coupling)라는 소프트웨어 개발의 고전적인 원리로도 설명 가능함
- 높은 응집도
  - 응집도가 높다는 것은 변화가 일어날 때 해당 모듈에서 변하는 부분이 크다는 것
- 낮은 결합도
  - 책임과 관심사가 다른 오브젝트 또는 모듈과는 낮은 결합도, 즉 느슨하게 연결된 형태를 유지하는 것이 바람직
  - 느슨한 연결은 관계를 유지하는 데 꼭 필요한 최소한의 방법만 간접적인 형태로 제공하고, 나머지는 서로 독립적이고 알 필요도 없게 만들어주는 것임
  - 결합도란 '하나의 오브젝트가 변경이 일어날 때에 관계를 맺고 있는 다른 오브젝트에게 변화를 요구하는 정도'

###### 전략 패턴

- 개선한 UserDaoTest-UserDao-ConnectionMaker 구조를 디자인 패턴의 시각으로 보면 전략 패턴(Strategy Pattern)에 해당함
- 전략 패턴은 자신의 기능 맥락(context)에서, 필요에 따라 변경이 필요한 알고리즘을 인터페이스를 통해 통째로 외부로 분리시키고, 이를 구현한 구체적인 알고리즘 클래스를 필요에 따라 바꿔서 사용할 수 있게 하는 디자인 패턴

#### 1.4 제어의 역전(IoC)

- 제어의 역전(Inversion of Control)

##### 1.4.1 오브젝트 팩토리

- UserDaoTest 분리
  - UserDao와 ConnectionMaker 구현 클래스의 오브젝트를 만드는 것
  - 그렇게 만들어진 두 개의 오브젝트가 연결돼서 사용될 수 있도록 관계를 맺어주는 것

###### 팩토리

- 팩토리(factory) 오브젝트 : 객체의 생성 방법을 결정하고 그렇게 만들어진 오브젝트를 돌려주는 역할

  - 추상 팩토리 패턴이나 팩토리 메소드 패턴과는 다름

- 팩토리 역할을 맡을 클래스 : DaoFactory

  ```java
  public class DaoFactory {
      public UserDao userDao() {
          // 팩토리의 메소드는 UserDao 타입의 오브젝트를 어떻게 만들고, 어떻게 준비시킬지를 결정함
          ConnectionMaker connectionMaker = new DConnectionMaker();
          UserDao userDao = new UserDao(connectionMaker);
          
          return userDao;
      }
  }
  ```

  ```java
  public class UserDaoTest {
      public static void main(String[] args) throws ClassNotFoundException, SQLException {
          UserDao dao = new DaoFactory().userDao();
          ...
      }
  }
  ```

###### 설계도로서의 팩토리

