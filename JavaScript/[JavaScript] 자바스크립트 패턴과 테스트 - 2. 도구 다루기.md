# 자바스크립트 패턴과 테스트

## 2장 도구 다루기

### 2.1 테스팅 프레임워크

- 테스트 예제

  ```javascript
  describe('createReservation(passenger, flight)', function() {
      if('주어진 passenger를 passengerInfo 프로퍼티에 할당한다', function() {
          var testPassenger = {
              firstName: '윤지',
              lastName: '김'
          };
          
          var testFlight = {
              number: '3443',
              carrier: '대한항공',
              destination: '울산'
          };
          
          var reservation = createReservation(testPassenger, testFlight);
          expect(reservation.passengerInfo).toBe(testPassenger);
      });
      
      it('주어진 flight를 flightInfo 프로퍼티에 할당한다', function() {
          var testPassenger = {
              firstName: '윤지', 
              lastName: '김'
          };
          
          var testFlight = {
              number: '3443',
              carrier: '대한항공',
              destination: '울산'
          };
          
          var reservation = createReservation(testPassenger, testFlight);
          expect(reservation.flightInfo).toBe(testFlight);
      });
  });
  ```

  - it 함수 각자는 개발 단위 테스트이며 함수에서 반환된 객체의 속성이 적절한지 expect 함수로 검사함

#### 2.1.1 잘못된 코드 발견하기

- TDD는 코드 결함을 최대한 빨리, 곧 코드 생성 직후 감지하며, 작은 기능 하나라도 테스트를 먼저 작성한 뒤, 최소한의 코드만으로 기능을 구현함

#### 2.1.2 테스트성을 감안하여 설계하기

- 테스트를 먼저 작성하라는 건 코드의 테스트성(testability)을 차후에 두고 볼 문제가 아니라 우선적인 주요 관심사로 생각하는 것임
- 테스트성을 설계 목표로 정하면 SOLID한 코드를 작성할 수 있음

#### 2.1.3 꼭 필요한 코드만 작성하기

- TDD 작업 절차 정리
  - 실패하는 테스트를 작성, 테스트를 성공시킬 만큼만 최소한으로 코딩
  - 내부적으로 구현 세부를 변경하는 리팩토링 과정을 거쳐 중복 코드를 들어냄

#### 2.1.4 안전한 유지 보수와 리팩토링

#### 2.1.5 실행 가능한 명세

- 탄탄한 단위 테스트 꾸러미는 테스트 대상 코드의 실행 가능한 명세(runnable specification) 역할도 함
- 단위 테스팅 프레임워크인 재스민은 행위 기반(behavior-based)으로 테스트를 구성함

#### 2.1.6 최신 오픈 소스 및 상용 프레임워크

- 재스민 그 외의 테스트 프레임워크 : QUnit, D.O.H 등

##### QUnit

- 오픈 소스 프레임워크
- 브라우저가 아닌 환경에서 실행 가능
- 