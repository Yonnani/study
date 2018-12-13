# 자바스크립트 패턴과 테스트

## 3장 객체를 바르게 만들기

### 3.1 원시형

- ECMAScript5 기준으로 원시형
  - String, Number, Boolean, null, undefined
- ECMAScript6 기준으로 원시형
  - ECMAScript5 원시형 + Symbol

### 3.2 객체 리터럴

- 객체 리터럴의 두 가지 생성 방법

  - 단순 객체 리터럴(bare object literal)

    ```javascript
    var koko = { name: 'koko', genus: 'gorilla', genius: 'sign language' };
    ```

  - 객체 리터럴이 함수 반환값인 경우

    ```javascript
    var amazeTheWorld = function () {
        return { name: 'koko', genus: 'gorilla', genius: 'sign language' };
    }
    
    var koko = amazeTheWorld();
    ```

- 단순 객체 리터럴에서는 의존성 주입 불가능, but 리터럴을 생성/반환하는 함수는 애플리케이션 시작부에서 의존성을 주입하는 과정에 잘 어울림

- 단순 객체 리터럴은 싱글톤 또는 확실히 테스트 마친 코드 아니면 쓰지 않는 편이 좋음

### 3.3 모듈 패턴

#### 3.3.1 임의 모듈 생성

- 임의 모듈 패턴 예시

```javascript
var MyApp = MyApp || {};

MyApp.wildlifePreserveSimulator = function(animalMaker) {
    var animals = [];
    return {
        addAnimal: function(species, sex) {
            animals.push(animalMaker.make(species, sex));
        },
        getAnimalCount: function() {
            return animals.length;
        }
    };
}
```

- 모듈은 다음과 같이 사용됨

  ```javascript
  var preserve = MyApp.wildlifePreserveSimulator(realAnimalMaker);
  preserve.addAnimal(gorilla, female);
  ```

- animalMaker 같은 의존성을 외부 함수에 주입하여 리터럴에서 참조하게 만들 수도 있음

- 다른 모듈에 주입할 수 있어서 확장성이 좋음

#### 3.3.2 즉시 실행 모듈 생성

- API를 반환하는 것은 임의 모듈과 같지만, 외부 함수를 선언하자마자 실행하는 방법
- 반환된 API는 이름공간을 가진 전역 변수에 할당된 후 해당 모듈의 싱글톤 인스턴스가 됨

```javascript
var MyApp = MyApp || {};

MyApp.WildlifePreserveSimulator = (function() {
    var animals = [];
    return {
        addAnimal: function(animalMaker, species, sex) {
            animals.push(animalMaker.make(species, sex));
        },
        getAnimalCount: function() {
            return animals.length;
        }
    };
}());
```

- 싱글톤 사용

  ```javascript
  MyApp.WildlifePreserveSimulator.addAnimal(realAnimalMaker, gorilla, female);
  ```

#### 3.3.3 모듈 생성의 원칙

- 한 모듈에 한 가지 일만 시켜야함
- 모듈이 쓸 객체가 필요하다면 의존성 주입 형태로 (직접 또는 팩토리 주입 형태로) 이 객체를 제공하는 방안을 고려
- 다른 객체 로직을 확장하는 모듈은 해당 로직의 의도가 바뀌지 않도록 분명히 밝혀야함(리스코프 치환 원칙)

### 3.4 객체 프로토타입과 프로토타입 상속

#### 3.4.1 기본 객체 프로토타입

- 객체 리터럴은 자동으로 내장 객체 `Object.prototype`에 연결됨
- 만든 객체에 toString 함수가 없더라도 `Object.prototype`을 찾아보고 여기에 정의된 toString 함수를 실행함

#### 3.4.2 프로토타입 상속

- chimp 객체와 bonobo 객체 생성
- 공통 프로퍼티를 ape 객체에 담아두면 객체마다 프로퍼티를 반복할 필요가 없음
- 