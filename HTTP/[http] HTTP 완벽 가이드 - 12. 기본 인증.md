# HTTP 완벽 가이드

## 12장. 기본 인증

### 12.1 인증

#### 12.1.1 HTTP의 인증요구/응답 프레임워크

- 요청(Client → Server) → 인증요구(Server → Client) → 인가(Client → Server) → 성공Server → Client

#### 12.1.2 인증 프로토콜과 헤더

- 인증 프로토콜은 HTTP 인증 헤더에 기술되어 있음
- HTTP에는 기본 인증과 다이제스트 인증이라는 두 가지 공식적인 인증 프로토콜이 있음
- 기본인증
  - 서버가 사용자에게 인증요구를 보낼 때, 서버는 401 Unauthorized 응답과 함께 WWW-Authenticate 헤더를 기술해서 어디서 어떻게 인증할지 설명함
  - 클라이언트가 서버로 인증하려면, 인코딩된 비밀번호와 그 외 인증 파라미터들을 Authorization 헤더에 담아서 요청을 다시 보냄
  - 인증 요쳥이 성공적으로 완료되면, 서버는 정상적인 상태 코드(ex. 200 OK)를 반환하며, 추가적인 인증 알고리즘에 대한 정보를 Authentication-Info 헤더에 기술할 수도 있음

#### 12.1.3 보안 영역

- HTTP가 어떻게 각 리소스마다 다른 접근 조건을 다루는지

  - 서버가 클라이언트로 인증요구를 할 때, realm 지시자가 기술되어 있는 WWW-Authenticate 헤더가 있음

  - 웹 서버는 기밀문서를 보안 영역(realm) 그룹으로 나눔

  - 보안 영역은 저마다 다른 사용자 권한을 요구함

  - 예

    ```http
    HTTP/1.0 401 Unauthorized
    WWW-Authenticate: Basic realm="Corporate Financials"
    ```

### 12.2 기본 인증

