# [인프런 강좌] 자바 디자인 패턴의 이해 - Gof Design Pattern

## 섹션 1. 스트래티지(Strategy) 패턴

- 인터페이스

  - 기능에 대한 선언과 구현 분리
  - 기능을 사용하는 통로

  ```java
  public interface Ainterface {
      // 기능 선언
      public void funcA();
  }
  
  public class AinterfaceImpl implements Ainterface {
      
      @Override
      public void funcA() {
          System.out.println("AAA")
      }
  }
  
  public class Main {
      public static void main(String[] args) {
          Ainterface ainterface = new AinterfaceImpl();
          
          // 통로
          ainterface.funcA();
      }
  }
  ```

- 델리게이트

  - 위임하다

  - ```java
    public class AObj {
        
        Ainterface ainterface;
        
        public AObj() {
            ainterface = new AinterfaceImpl();
        }
        
        public void funcAA() {
            // 위임한다
            ainterface.funcA();
            ainterface.funcA();
        }
    }
    ```

- 스트레티지 패턴

  - 여러 알고리즘을 하나의 추상적인 접근점을 만들어 접근점에서 서로 교환 가능하도록 하는 패턴

- 예제

  - 캐릭터와 무기 구현

    ```java
    public interface Weapon {
        public void attack();
    }
    
    public class Knife implements Weapon {
        @Override
        public void attack() {
            System.out.println("칼 공격");
        }
    }
    
    public class Sword implements Weapon {
        @Override
        public void attack() {
            System.out.println("검 공격");
        }
    }
    
    public class GameCharacter {
        // 접근점
        private Weapon weapon;
        
        // 교환 가능
        public void setWeapon(Weapon weapon) {
            this.weapon = weapon;
        }
        
        public void attack() {
            // 델리게이트
            weapon.attack();
        }
    }
    ```

    

