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

### 애플리케이션 상태 저장을 위한 단순한 저장소 구현하기

#### 준비하기

- 4장, '컴포넌트의 모든 것'의 '컴포넌트와 Vuex 간 통신하기' 레시피 완료

#### 구동 방법

- 예제처럼 상태를 직접 건드리면 안됨, 항상 변이를 사용해야 함

#### 동작 원리

- 필요에 따라 로컬 범위일 수 있는 변수는 저장소에 두지 않아도 됨
- 그렇지 않으면 구조화된 중앙 집중식 상태를 한 곳에 갖는 것이 좋음

### Vuex의 변이 이해하기

- Vuex 애플리케이션에서 상태를 변경하는 적절한 방법은 변이를 사용하는 것임
- 변이는 원자 단위로 상태 변화를 분해하는 데 매우 유용한 추상화층임

#### 준비하기

#### 구동 방법

> Vuex를 ES6 모듈로 임포트할 때 표현식에서 Vuex를 명시적으로 사용할 필요가 없음
>
> `import { mapState } from 'Vuex'`로 사용하면 `mapState` 함수를 사용할 수 있음

- `mapState` 메서드는 문자열 배열을 매개변수로 사용하고 저장소에서 문자열과 이름이 같은 state 변수를 찾아 같은 이름의 계산된 속성을 생성함

#### 추가 정보

- 뷰 개발자 도구에서 Vuex의 변이 히스토리 확인 가능
- 이 디버그 메커니즘은 변이가 항상 동기적이기 때문에 가능한데 이것은 변이 전후의 상태에 대한 스냅 샷을 취해 시간을 탐색할 수 있음을 의미함

### Vuex에서 액션 나열하기

- 동기로 동작하는 변이에서 비동기 요청을 다루기 위해 액션에서 다음 단계의 추상화를 제공함
- 액션 내에서 여러 개의 변이들을 커밋하고 비동기 연산을 수행할 수 있음

#### 준비하기

#### 구동 방법

#### 동작 원리

- proxyTable 객체는 http-proxy-middleware를 구성함
  - 이는 더 큰 웹 애플리케이션의 UI를 개발할 때마다 유용하며 localhost에서 개발용 서버를 시작했지만 API는 실제 다른 웹 서버에서 응답함
  - 이는 CORS를 사용한 상태에서 다른 웹 사이트가 API를 사용하지 못하도록 할 때 특히 유용함
  - `changeOrigin` 옵션은 호스트로 Xkcd를 사용해 요청을 전송하므로 CORS가 필요하지 않음
- 컴포넌트에서 액션을 호출하기 위해 `dispatch` 함수를 사용함
- 저자는 액션명에 비동기를 명시할 필요가 없다고 생각함

### 모듈로 관심사 분리하기

- 애플리케이션의 각기 다른 관심사들을 모듈로 별도의 영역으로 분리할 수 있음

#### 준비하기

#### 구동 방법

#### 동작 원리

- 변이는 로컬 상태에만 액세스할 수 있는 것이 자연스러움

- 모듈 안에 액션을 선언하면 context 객체가 전달됨

  - 따라서 심장에 영향을 주는 액션을 좌뇌에 선언하고 싶다면 다음과 같이 해야함

    ```javascript
    actions: {
        beNerd ({ rootState }) {
            rootState.heart.loves = 'Math & Physics'
        }
    }
    ```

### 데이터 반환을 위해 게터 작성하기

- 쉽게 동기화되지 않을 수 있기 때문에 중복되거나 파생된 데이터를 보유할 위험성이 있음
- 게터는 모든 로직을 한 곳에서 유지함으로써 컴포넌트의 부담을 증가시키지 않으면서 이런 문제를 해결할 수 있음

#### 준비하기

#### 구동 방법

#### 동작 원리

- 입력된 데이터가 아니라 파생된 데이터에 대한 게터를 갖는 것은 좋음
- 게터의 다른 특징은 다른 케터와 상호작용하고 인자를 주고받을 수 있다는 점

##### 다른 게터에 접근하기

- 호출 시점에 게터에 전달된 두 번째 인자는 다른 게터를 포함하는 객체임

  ```javascript
  getters: {
      ...
      getCatPictures: state => state.pictures.filter(pic => isCat(pic))
      getKittens: (state, getters) => {
          return getters.getCatPictures().filter(cat => !isAdult(cat))
      }
  }
  ```

##### 인자 넘겨주기

- 게터가 인수가 있는 함수를 반환하면 해당 인수는 게터의 인수가 됨

  ```javascript
  getters: {
      ...
      getWorldWonder: state => nth => state.worldWonders[nth]
  }
  ```

### 저장소 테스트하기

- Vuex 저장소를 위한 테스트를 작성함

#### 준비하기

#### 구동 방법

##### 소프트웨어 요구사항

- done 필드를 false에서 true로 변경해주는 MARK_ITEM_AS_DONE 변이
- 서버에서 가장 최근 항목들을 다운로드 목록에 추가하는 downloadNew 액션

##### 변이 테스트하기

- 변이 추출

  ```javascript
  import { mutations } from '@/store'
  ```

- 요구사항 1번 테스트

  ```javascript
  describe('mutations', () => {
      it(`MARK_ITEM_AS_DONE mutation must change 
  the done field from false to true for a todo`, () => {
          const state = {
              todo: [
                  { id: 43, text: 'Buy iPhone', done: false }
              ],
              archived: [
                  { id: 40, text: 'Buy cat', done: false }
              ]
          }
          mutations.MARK_ITEM_AS_DONE(state, 43)
          expect(state.todo[0].done).to.be.true
      })
  })
  ```

##### 액션 테스트하기

- 액션을 테스트한다는 의미는 액션이 예상되는 변이를 실행하는지 검증한다는 뜻임

- 요구사항 2번을 테스트하기 위해 새로운 할 일 항목을 다운로드하기 위한 서버로의 호출을 모킹하는 것으로 시작함

  ```javascript
  describe('actions', () => {
      const actionsInjector = require('inject-loader!@/store/actions')
      const buyHouseTodo = {
          id: 84,
          text: 'Buy house',
          done: true
      }
      const actions = actionsInjector({
          'axios': {
              get() {
                 return new Promise(resolve => {
                      resolve({ data: [buyHouseTodo] })
                 })
              }
          }
      }).default
  })
  ```

  - 이 코드는 axios의 get 메서드 호출이 새로운 할 일 항목을 반환하도록 보장해줌

  - 그리고 ADD_ITEMS 변이가 처리 시점에 호출되는지 검증함

    ```javascript
    describe('actions', () => {
        const actionsInjector = require('inject-loader!@/store/actions')
        const buyHouseTodo = {
            id: 84,
            text: 'Buy house',
            done: true
        }
        const actions = actionsInjector({
            'axios': {
                get() {
                    return new Promise(resolve => {
                        resolve({ data: [buyHouseTodo] })
                    })
                }
            }
        }).default
        it(`downloadNew should commit ADD_ITEMS with the 'Buy house' 
    todo when successful`, done => {
            const commit = (type, payload) => {
                try {
                    expect(type).to.equal('ADD_ITEMS')
                    expect(payload).to.deep.equal([buyHouseTodo])
                    done()
                } catch (error) {
                    done(error)
                }
            }
            actions.downloadNew({ commit })
        })
    })
    ```

#### 동작 원리

- 테스트 작성 시에 외부 서비스에 의존하지 않기 위해 axios 서비스를 모킹함
  - 예제에서는 injection-loader를 사용
  - @ 기호는 src의 축약 표현임
  - axios 라이브러리를 모킹하면서 get 메서드 사용
- 테스트에서 commit 함수를 모킹함
  - 이 함수는 상태를 수정하는 변이를 호출함

