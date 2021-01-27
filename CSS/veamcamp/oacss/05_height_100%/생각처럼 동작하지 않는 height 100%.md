# 생각처럼 동작하지 않는 height: 100%

- `width: auto;` : 요소의 부모 크기 기준으로 가득찬다.
- `height: auto;` 요소의 자식 기준으로 자동 조절된다.

- `height: 100%`
  - 부모 height를 받겠다는 말, 그런데 body는 자식 기준으로 높이 지정됨
  - ```html, body { height: 100%; }``` => 구버전
  - ```element { 100 vh; }``` (vh : viewport height) => 최근버전