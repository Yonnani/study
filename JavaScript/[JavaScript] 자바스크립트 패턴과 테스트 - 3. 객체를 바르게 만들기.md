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
- 공통 프로퍼티를 ape 객체에 담아두면 객체마다 프로퍼티를 반복할 필요가 없음, ape를 공유 프로토타입(shared prototype)으로 둠

```javascript
var ape = {
    hasThumbs: true,
    hasTail: false,
    swing: function () {
        return '매달리기';
    }
};

var chimp = Object.create(ape);

var bonobo = Object.create(ape);
bonobo.habitat = '중앙 아프리카';

console.log(bonobo.habitat); // '중앙 아프리카'
console.log(bonobo.hasTail); // false
console.log(chimp.swing()); // '매달리기'

ape.hasThumbs = false;
console.log(chimp.hasThumbs); // false
console.log(bonobo.hasThumbs); // false
```

#### 3.4.3 프로토타입 체인

- 프로토타입 체인(prototype chain)이라는 다층 프로토타입을 이용하면 여러 계층의 상속을 구현할 수 있음

```javascript
var primate = {
    stereoscopicVision: true
};

var ape = Object.create(primate);
ape.hasThumbs = true;
ape.hasTail = false;
ape.swing = function () {
    return "매달리기";
};

var chimp = Object.create(ape);

console.log(chimp.hasTail);				// false
console.log(chimp.stereoscopicVision);  // true
```

- 하지만 너무 깊이 프로토타입 체인을 찾게 되면 성능상 좋지 않을 수 있음

### 3.5 new 객체 생성

#### 3.5.1 new 객체 생성 패턴

- Marsupial 함수는 new 객체 생성 패턴으로 자신의 객체 인스턴스를 생성함

  ```javascript
  function Marsupial(name, nocturnal) {
      this.name = name;
      this.isNocturnal = nocturnal;
  }
  
  var maverick = new Marsupial('매버릭', true);
  var slider = new Marsupial('슬라이더', false);
  
  console.log(maverick.isNocturnal); // true
  console.log(maverick.name); // "매버릭"
  
  console.log(slider.isNocturnal); // false
  console.log(slider.name); // "슬라이더"
  ```

##### '나쁜 일'이 벌어질 가능성

- 자바스크립트에서는 new 키워드 없이 생성자 함수를 사용해도 이를 못하게 막을 보호 체계가 없음

##### new를 사용하도록 강제

- instanceof 연산자를 써서 우회적으로 강제하는 방법

  ```javascript
  function Marsupial(name, nocturnal) {
      if (!(this instanceof Marsupial)) {
          throw new Error("이 객체는 new를 사용하여 생성해야 합니다.");
      }
      this.name = name;
      this.isNocturnal = nocturnal;
  }
  
  var slider = Marsupial('슬라이더', true);
  ```

  ```javascript
  function Marsupial(name, nocturnal) {
      if (!(this instanceof Marsupial)) {
          throw new Marsupial(name, nocturnal);
      }
      this.name = name;
      this.isNocturnal = nocturnal;
  }
  
  var slider = Marsupial('슬라이더', true);
  
  console.log(slider.name); // '슬라이더'
  ```

- new 객체 생성 패턴을 이용하면 정의부 하나로 여러 인스턴스가 함께 사용할 함수 프로퍼티를 생성할 수 있음

  ```javascript
  function Marsupial(name, nocturnal) {
      if (!(this instanceof Marsupial)) {
          throw new Error("이 객체는 new를 사용하여 생성해야 합니다.");
      }
      this.name = name;
      this.isNocturnal = nocturnal;
      
      // 각 객체 인스턴스는 자신만의 isAwake 사본을 가진다.
      this.isAwake = function(isNight) {
          return isNight === this.isNocturnal;
      }
  }
  
  var maverick = new Marsupial('매버릭', true);
  var slider = new Marsupial('슬라이더', false);
  
  var isNightTime = true;
  
  console.log(maverick.isAwake(isNightTime)); // true
  console.log(slider.isAwake(isNightTime)); 	// false
  
  // 각 객체는 자신의 isAwake 함수를 가진다.
  console.log(maverick.isAwake === slider.isAwake); // false
  ```

- 생성자 함수 프로토타입에 함수를 추가

  ```javascript
  function Marsupial(name, nocturnal) {
      if (!(this instanceof Marsupial)) {
          throw new Error("이 객체는 new를 사용하여 생성해야 합니다.");
      }
      this.name = name;
      this.isNocturnal = nocturnal;
  }
  // 각 객체는 isAwake 사본 하나를 공유한다.
  Marsupial.prototype.isAwake = function(isNight) {
      return isNight === this.isNocturnal;
  }
  var maverick = new Marsupial('매버릭', true);
  var slider = new Marsupial('슬라이더', false);
  
  var isNightTime = true;
  
  console.log(maverick.isAwake(isNightTime)); // true
  console.log(slider.isAwake(isNightTime)); 	// false
  
  // 객체들은 isAwake의 단일 인스턴스를 공유한다.
  console.log(maverick.isAwake === slider.isAwake); // true
  ```

- 생성자 프로토타입을 매개로 모든 객체 인스턴스가 `isAwake` 함수 사본 하나를 공유한 코드가 객체 인스턴스 각각 `isAwake` 함수 사본을 생성하여 들고 있는 코드보다 실행이 빠름

### 3.6 클래스 상속

#### 3.6.1 고전적 상속 흉내 내기

```javascript
function Marsupial(name, nocturnal) {
    if (!(this instanceof Marsupial)) {
        throw new Error("이 객체는 new를 사용하여 생성해야 합니다.");
    }
    this.name = name;
    this.isNocturnal = nocturnal;
}
Marsupial.prototype.isAwake = function(isNight) {
    return isNight === this.isNocturnal;
}

function Kangaroo(name) {
    if (!(this instanceof Kangaroo)) {
        throw new Error("이 객체는 new를 사용하여 생성해야 합니다.");
    }
    this.name = name;
    this.isNocturnal = false;
}

Kangaroo.prototype = new Marsupial();
Kangaroo.prototype.hop = function() {
    return this.name + " 가 껑충 뛰었어요!";
};
var jester = new Kangaroo("제스터");
console.log(jester.name);

var isNightTime = false;
console.log(jester.isAwake(isNightTime));	// true
console.log(jester.hop());					// '제스터가 껑충 뛰었어요!'

console.log(jester instanceof Kangaroo);	// true
console.log(jester instanceof Marsupial);	// true
```

#### 3.6.2 반복이 캥거루 잡네

