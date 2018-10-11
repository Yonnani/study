# HTTP 완벽 가이드

## 1장. HTTP 개관

### 1.1 HTTP: 인터넷의 멀티미디어 배달부

- HTTP는 신뢰성 있는 데이터 전송 프로토콜을 사용함 > 전송 중 변경되는 것을 걱정하지 않아도 됨

### 1.2 웹 클라이언트와 서버

- 웹 콘텐츠는 웹 서버에 존재
- HTTP 클라이언트와 HTTP 서버는 월드 와이드 웹의 기본 요소임
- 가장 흔한 클라이언트 : 웹 브라우저

### 1.3 리소스

- 웹 서버는 웹 리소스를 관리하고 제공함
- 웹 리소스는 웹 콘텐츠의 원천임
- 정적 리소스, 동적 리소스

#### 1.3.1 미디어 타입

- HTTP는 웹에서 전송되는 객체 각각에 신중하게 MIME 타입이라는 데이터 포맷 라벨을 붙임
- MIME(Multipurpose Internet Mail Extensions, 다목적 인터넷 메일 확장) : 이메일에서 잘 동작해서 HTTP에서도 멀티미디어 콘텐츠를 기술하고 라벨을 붙이기 위해 채택됨
- 웹 서버는 모든 HTTP 객체 데이터에 MIME 타입을 붙임
- MIME 타입은 사선(/)으로 구분된 주 타입(primary object type)과 부 타입(specific subtype)으로 이루어진 문자열 라벨
  - HTML로 작성된 텍스트 문서 : `text/html`
  - plain ASCII 텍스트 문서 : `tetx/plain`
  - JPEG 이미지 : `image/jpeg`
  - GIF 이미지 : `image/gif`
  - 등등

#### 1.3.2 URI

- 서버 리소스 이름은 통합 자원 식별자(uniform resource identifier), 혹은 URI로 불림
- URI는 정보 리소스를 고유하게 식별하고 위치를 저장할 수 있음
- URL은 프로토콜, 서버, 리소스를 명시함
  - http://www.joes-hardware.com/specials/saw-blade.gif
  - `http://` : HTTP 프로토콜을 사용하라
  - `www.joes-hardware.com` : www.joes-hardware.com로 이동하라
  - `/specials/saw-blade.gif` : /specials/saw-blade.gif 라고 불리는 리소스를 가져와라
- URI에는 URL과 URN이 있음

#### 1.3.3 URL

- 통합 자원 지시자(uniform resource locator, URL)는 리소스 식별자의 가장 흔한 형태임
- URL은 특정 서버의 한 리소스에 대한 구체적인 위치를 서술함
- 대부분의 URL은 세 부분으로 이루어진 표준 포맷을 따름
  - URL의 첫 번째 부분은 스킴(scheme)이라고 불림, 리소스에 접근하기 위해 사용되는 프로토콜을 서술함
    - 보통 HTTP 프로토콜(http://)임
  - 두 번째 부분은 서버의 인터넷 주소를 제공함(ex. `www.joes-hardware.com`)
  - 마지막은 웹 서버의 리소스를 가리킴(ex. `specials/saw-blade.gif`)
- 오늘날 대부분의 URI는 URL임

#### 1.3.4 URN

- URI의 두 번째 종류는 유니폼 리소스 이름(uniform resource name, URN)임
- URN은 콘텐츠를 이루는 한 리소스에 대해, 그 리소스의 위치에 영향 받지 않는 유일무이한 이름 역할을 함
- 아직 실험 중인 상태임

### 1.4 트랜잭션

- HTTP 트랜잭션은 요청 명령(클라이언트에서 서버로 보내는)과 응답 결과(서버가 클라이언트에게 돌려주는)로 구성되어 있음

- HTTP 요청 메시지는 명령과 URI를 포함함, HTTP 응답 메시지는 트랜잭션의 결과를 포함함

#### 1.4.1 메서드

- HTTP는 HTTP 메서드라고 불리는 여러 가지 종류의 요청 명령을 지원함
- 모든 HTTP 요청 메시지는 한 개의 메서드를 가짐
- 메서드는 서버에게 어떤 동작이 취해져야 하는지 말해줌

#### 1.4.2 상태 코드

- 모든 HTTP 응답 메시지는 상태 코드와 함께 반환됨
- 상태 코드는 클라이언트에게 요청이 성공했는지 아니면 추가 조치가 필요한지 알려주는 세 자리 숫자
- HTTP는 각 숫자 상태 코드에 텍스트로 된 "사유 구절(reason phrase)"도 함께 보냄
- HTTP 소프트웨어는 상태 코드와 사유 구절을 모두 같은 것으로 취급함
  - 200 OK
  - 200 Document attached
  - 200 Success
  - 200 All's cool, dude

#### 1.4.3 웹페이지는 여러 객체로 이루어질 수 있다

