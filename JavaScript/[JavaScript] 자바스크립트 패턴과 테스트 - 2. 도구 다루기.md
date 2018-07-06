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

  

