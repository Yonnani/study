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

- '웹페이지'는 보통 하나의 리소스가 아닌 리소스의 모음임
- 애플리케이션은 보통 하나의 작업을 수행하기 위해 여러 HTTP 트랜잭션을 수행함

### 1.5 메시지

- HTTP 메시지는 단순한 줄 단위의 문자열임
- 웹 클라이언트에서 웹 서버로 보낸 HTTP 메시지를 요청 메시지라고 부름
- 서버에서 클라이언트로 가는 메시지는 응답 메시지라고 부름

- 시작줄
  - 메시지의 첫 줄은 시작줄
  - 요청 : 무엇을 해야 하는지, 응답 : 무슨 일이 일어났는지
- 헤더
  - 시작줄 다음에 0개 이상의 헤더 필드가 이어짐
  - 각 헤더 필드는 쉬운 구문분석을 위해 `:`으로 구분되어 있는 하나의 이름과 하나의 값으로 구성됨
  - 헤더는 빈 줄로 끝남
- 본문
  - 어떤 종류의 데이터든 들어갈 수 있는 메세지 본문이 필요에 따라 올 수 있음
  - 요청 : 웹 서버로 데이터를 실어 보냄
  - 응답 : 클라이언트로 데이터를 반환함
  - 본문은 임의의 이진 데이터 포함 가능(이미지, 비디오, ...)
  - 텍스트도 가능

#### 1.5.1 간단한 메시지의 예

### 1.6 TCP 커넥션

- 어떻게 메시지가 TCP(Transmission Control Protocol, 전송 제어 프로토콜) 커넥션을 통해 한 곳에서 다른 곳으로 옮겨가는지?

#### 1.6.1 TCP/IP

- HTTP는 애플리케이션 계층 프로토콜
- HTTP는 네트워크 통신의 핵심적인 세부사항을 인터넷 전송 프로토콜인 TCP/IP에 맡김
- TCP는 다음을 제공함
  - 오류없는 데이터 전송
  - 순서에 맞는 전달
  - 조각나지 않는 데이터 스트림

#### 1.6.2 접속, IP 주소 그리고 포트번호

- HTTP 전송 전에, 인터넷 프로토콜(Internet protocol, IP) 주소와 포트번호를 사용해 클라이언트와 서버 사이에 TCP/IP 커넥션을 맺어야 함
- TCP에서는 서버 컴퓨터에 대한 IP 주소와 그 서버에서 실행 중인 프로그램이 사용 중인 포트번호가 필요함
- URL은 그 리소스를 가지고 있는 장비에 대한 IP 주소를 알려줄 수 있음
- 순서
  - 웹브라우저는 서버의 URL에서 호스트 명을 추출함
  - 웹브라우저는 서버의 호스트 명을 IP로 변환함
  - 웹브라우저는 URL에서 포트번호(있다면)를 추출함
  - 웹브라우저는 웹 서버와 TCP  커넥션을 맺음
  - 웹브라우저는 서버에 HTTP 요청을 보냄
  - 서버는 웹 브라우저에 HTTP 응답을 돌려줌
  - 커넥션이 닫히면, 웹브라우저는 문서를 보여줌

#### 1.6.3 텔넷(Telnet)을 이용한 실제 예제

- 텔넷 유틸리티는 목적지의 TCP 포트로 연결해주고 출력 TCP 포트를 화면으로 연결해 줌

### 1.7 프로토콜 버전

- HTTP 프로토콜은 버전이 여러 가지임
- HTTP/0.9
  - 1991년의 HTTP 프로토타입
- HTTP/1.0
  - 처음으로 널리 쓰이기 시작한 버전
  - HTTP가 상업적, 학술적으로 급성장하던 시기에 만들어짐
  - 잘 정의된 명세는 아님
- HTTP/1.0+
- HTTP/1.1
  - 현재의 HTTP 버전
  - HTTP 설계의 결함 교정, 성능 최적화, 잘못된 기능 제거에 집중
- HTTP/2.0
  - HTTP/1.1 성능 문제를 개선하기 위해 구글의 SPDY 프로토콜을 기반으로 설계가 진행 중인 프로토콜

### 1.8 웹의 구성요소

- 프락시
  - 클라이언트와 서버 사이에 위치한 HTTP 중개자
- 캐시
- 게이트웨이
  - 다른 애플리케이션과 연결된 특별한 웹 서버
- 터널
  - HTTP 통신을 전달하기만 하는 특별한 프락시
- 에이전트
  - 자동화된 HTTP 요청을 만드는 준지능적(semi-intelligent) 웹클라이언트

#### 1.8.1 프락시

- 클라이언트와 서버 사이에 위치
- 클라이언트의 모든 HTTP 요청을 받아 서버에 전달함
- 주로 보안을 위해 사용됨
  - 모든 웹 트래픽 흐름 속에서 신뢰할 만한 중개자 역할을 함
  - 요청과 응답을 필터링함

#### 1.8.2 캐시

- 웹캐시와 캐시 프락시는 자신을 거쳐 가는 문서들 중 자주 찾는 것의 사본을 저장해 두는, 특별한 종류의 HTTP 프락시 서버임
- 클라이언트는 웹 서버보다 캐시에서 더 빨리 다운받을 수 있음
- HTTP는 캐시를 효율적으로 동작하게 하고 캐시된 콘텐츠를 최신 버전으로 유지하면서 동시에 프라이버시도 보호하기 위한 많은 기능을 정의함

#### 1.8.3 게이트웨이

- 다른 서버들의 중개자로 동작하는 특별한 서버
- HTTP 트래픽을 다른 프로토콜로 변환하기 위해 사용됨
- HTTP/FTP 게이트웨이는 FTP URI에 대한 HTTP 요청을 받아서, FTP 프로토콜을 이용해 문서를 가져옴, 받아온 문서는 HTTP 메시지에 담겨 클라이언트에게 보냄

#### 1.8.4 터널

- 터널은 두 커넥션 사이에서 raw 데이터를 열어보지 않고 그대로 전달해주는 HTTP 어플리케이션임
- HTTP 터널은 주로 비 HTTP 데이터를 하나 이상의 HTTP 연결을 통해 그대로 전송해주기 위해 사용됨
- 예 : 암호화로 된 SSL 트래픽을 HTTP 커넥션으로 전송함으로써 웹 트래픽만 허용하는 사내 방화벽을 통과시키는 것이 있음

#### 1.8.5 에이전트

- 사용자 에이전트는 사용자를 위해 HTTP 요청을 만들어주는 클라이언트 프로그램임

### 1.9 시작의 끝

### 1.10 추가 정보

#### 1.10.1 HTTP 프로토콜에 대한 정보

- HTTP Pocket Reference
  - 책
- http://www.w3.org/Protocols
- http://www.ietf.org/rfc/rfc2616.txt
  - HTTP/1.1의 현재 버전에 대한 공식 명세
- http://www.ietf.org/rfc/rfc1945.txt
  - 오늘날의 HTTP 초석이 된 HTTP/1.0을 서술한 정보성(informational) RFC
- http://www.w3.org/Protocols/HTTP/AsImplemented.html

#### 1.10.2 역사적 시각

- http://www.w3.org/Protocols/WhyHTTP.html
- http://www.w3.org/History.html
- http://www.w3.org/DesignIssues/Architecture.html

#### 1.10.3 기타 월드 와이드 웹 정보

- http://www.w3.org
  - 월드 와이드 웹 컨소시엄(W3C)은 웹을 기술적으로 주도하는 팀
  - W3C 사이트는 웹 기술에 대한 자세한 문서와 입문 자료의 보고
- http://www.ietf.org/rfc/rfc2396.txt
  - URI, URL에 대한 참고
- http://www.ietf.org/rfc/rfc2141.txt
  - URN 문법을 묘사한 1997년의 명세
- http://www.ietf.org/rfc/rfc2046.txt
  - 멀티미디어 콘텐츠 관리를 위한 다목적 인터넷 메일 확장 표준의 다섯 인터넷 명세 중 두 번째 것
- http://www.wrec.org/Drafts/draft-ietf-wrec-taxonomy-06.txt
  - 웹 구성요소에 대한 표준 용어집

