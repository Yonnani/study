# [인프런 강좌] 자바 디자인 패턴의 이해 - Gof Design Pattern

## 섹션 2. 어댑터 패턴 (Adapter Pattern)

- 알고리즘을 요구사항에 맞게 사용하기 위한 패턴

- 연관성 없는 두 객체 묶어 사용하기

- 요구 사항

  - 두 수에 대한 다음 연산을 수행하는 객체 만들기
    - 수의 두 배의 수를 반환 : twiceOf(Float): Float
    - 수의 절반의 수를 반환 : halfOf(Float):Float
  - 구현 객체 이름은 'Adapter'
  - Math 클래스에서 두 배와 절반을 구하는 함수는 이미 구현되어 있음

  ```java
  public class Math {
      
      // 두 배
      public static double twoTime(double num) { return num*2; }
      
      // 절반
      public static double half(double num) { return num/2; }
      
      // 강화된 알고리즘
      public static Double doubled(Double d) { return d*2; }
  }
  ```

  ```java
  public interface Adapter {
      public Float twiceOf(Float f);
      public Float halfOf(Float f);
  }
  ```

  ```java
  public class AdapterImpl implements Adapter {
      @Override
      public Float twiceOf(Float f) {
          return (Float) Math.twoTime(f.doubleValue());
      }
      
      @Override
      public Float halfOf(Float f) {
          return (Float) Math.half(f.doubleValue());
      }
  }
  ```

  - 알고리즘 변경 요함

    - Math 클래스에 새롭게 두 배를 구할 수 있는 함수 추가됨

      새 알고리즘을 이용하도록 수정 요함

      ```java
      public class AdapterImpl implements Adapter {
          @Override
          public Float twiceOf(Float f) {
              return Math.doubled(f.doubleValue()).floatValue(); // 변경됨
          }
          
          @Override
          public Float halfOf(Float f) {
              return (Float) Math.half(f.doubleValue());
          }
      }
      ```

  - 절반을 구하는 기능에서 로그를 찍는 기능 추가 요함

    ```java
    public class AdapterImpl implements Adapter {
        @Override
        public Float twiceOf(Float f) {
            return Math.doubled(f.doubleValue()).floatValue(); // 변경된 줄
        }
        
        @Override
        public Float halfOf(Float f) {
            System.out.println("절반 함수 호출"); // 추가됨
            return (Float) Math.half(f.doubleValue());
        }
    }
    ```

    