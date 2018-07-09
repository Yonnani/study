# Vue.js 2 Cookbook

## 10. Vuex를 통한 대형 애플리케이션 패턴

### 소개

- Vuex는 프론트엔드 프레임워크에서 널리 사용되는 패턴을 구현하며 큰 규모의 애플리케이션에서 전역 상태를 관리하기 위해 다양한 관심사들로 나뉘어져 구성돼 있음

- 변이(Mutations)만이 상태를 바꿀 수 있기 때문에, 관련 기능을 찾고 싶다면 한곳만 들여다보면 됨

  비동기뿐만 아니라 다양한 로직이 액션(Actions)에 포함됨

- 게터와 모듈은 원래 상태로부터 새로운 상태를 파생하고 코드를 다른 파일들로 분할시켜 사람이 인지하면서 느끼는 피로를 줄여줌

### vue-router에서 동적으로 페이지 로딩하기

#### 준비하기

- vue-router 지식 필요

#### 구동 방법

- 너무 커서 빠르게 브라우징할 수 없는 파일 생성 : Massive.vue

```javascript
import Massive from '@/components/Massive'
```

- 이 라인은 웹팩에게 Massive 컴포넌트에 있는 모든 코드들을 하나의 js 번들에 포함시키도록 지시

- 그 대신 웹팩에게 Massive 컴포넌트를 별도의 번들로 분리하고 필요할 때만 로드하도록 지시하고 싶음

  - 직접 임포트하는 대신 다음 코드를 사용해 Massive 컴포넌트를 선언함

    ```javascript
    const Massive = resolve => require(['../components/Massive.vue'], resolve)
    ```

    - 웹팩은 이 문법을 지연 로딩되는 별도의 파일을 생성하는데 사용함

#### 동작 원리

- 비동기적으로 로드
- 웹팩은 작은 번들로 분리해 필요한 경우에만 로드될 수 있도록 도와줌

#### 추가 정보

- 컴포넌트를 지연 로딩하기 위한 대체 구문이 존재

- index.js

  ```javascript
  routes: [
      {
          path: '/',
          name: 'Hello',
          component: Hello
      },
      {
          path: '/massive',
          name: 'Massive',
          component: import('@/components/Massive')
      }
  ]
  ```

  웹팩이 해당 줄을 읽어 Massive 컴포넌트의 코드를 직접 가져오는 대신 지연 로딩될 별개의 js 파일을 생성하기 때문에 이전에 했던 것과 동일함

##### 애플리케이션 상태 저장을 위한 단순한 저장소 구현하기

###### 준비하기

- 4장, '컴포넌트의 모든 것'의 '컴포넌트와 Vuex 간 통신하기' 레시피 완료

###### 구동 방법



