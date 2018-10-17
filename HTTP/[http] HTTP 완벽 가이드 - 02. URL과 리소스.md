# HTTP 완벽 가이드

## 2장. URL과 리소스

- URL(Uniform Resource Locator)은 인터넷의 리소스를 가리키는 표준이름

### 2.1 인터넷의 리소스 탐색하기

- URL은 통합 자원 식별자(Uniform Resource Identifier) 혹은 URI라고 불리는 더 일반화된 부류의 부분집합임
- URI는 두 가지 주요 부분집합인, URL과 URN으로 구성된 종합적인 개념
- `http://www.joes-hardware.com/seasonal/index-fall.html`
  - URL의 첫 부분인 `http`는 URL의 스킴
    - 스킴은 웹 클라이언트가 리소스에 어떻게 접근하는지 알려줌
    - 이 경우는, URL이 HTTP 프로토콜을 사용함
  - URL의 두 번째 부분인 `www.joes-hardware.com`은 서버의 위치
    - 웹 클라이언트가 리소스가 어디에 호스팅 되어 있는지 알려줌
  - URL의 세 번째 부분인 `/seasonal/index-fall.html`은 리소스의 경로
    - 경로는 서버에 존재하는 로컬 리소스들 중에서 요청받은 리소스가 무엇인지 알려줌
- URL은 다른 가용한 프로토콜을 사용할 수도 있음
  -  `mailto:president@whitehouse.gov` : 이메일 주소를 가리킴
  - `ftp://ftp.lots-o-books.com/pub/complete-price-list.xls` : FTP(File Transfer Protocol) 서버에 올라가 있는 파일을 가리킴
  - `rtsp://www.joes-hardware.com:554/interview/cto_video` : 스트리밍을 제공하기 위해 비디오 서버에 호스팅하고 있는 영화를 가리킴
- URL을 사용하면 리소스를 일관된 방식으로 지칭할 수 있음
  - `스킴://서버위치/경로` 구조임

#### 2.1.1 URL이 있기 전 암흑의 시대

- URL은 애플리케이션이 리소스에 접근할 수 있는 방법을 제공함

### 2.2 URL 문법

- 인터넷의 리소스들은 다른 스킴(ex. HTTP, FTP, SMTP)을 통해 접근할 수 있으며, URL 문법은 스킴에 따라서 달라짐
- 대부분의 URL 스킴의 문법은 일반적으로 9개 부분으로 나뉨
  - `<스킴>://<사용자 이름>:<비밀번호>@<호스트>:<포트>/<경로>;<파라미터>?<질의>#<프레그먼트>`

#### 2.2.1 스킴: 사용할 프로토콜

