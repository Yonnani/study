# 코드스피츠72 - CSS rendering 1

- CSS 

  - 5세대 언어
  - 선언하면 됨

- bitmap 

  - 흑백만 표현

- pixelmap

  - 점에 bit 이상의 많은 데이터 넣을 수 있게 됨
  - 색깔 표현
  - 트루칼라 체계

- fixed number 체계

  - x, y, width, height, color
  - screen size, chrome size, hierarchy 대응 안 됨

- Abstract calculator

  - %, left, block, inline, float
  - 추상화된 계산 방식

- components

  - 다양한 컴포넌트로 화면 구성

- framework

  - 컴포넌트 모아서
  - 부트스트랩 ...

- Rendering system

  - rendering : 그림을 만들어내는 행위
  - geometry calculate
    - 영역을 나눔
    - css 속성 중 width height position...
  - fragment fill
    - fragment : geometry에 포함되는 영역
    - 색칠
    - css 속성 중 background...
  - 브라우저에서 geometry를 계산하는 과정: reflow
  - 브라우저에서 계산된 geometry에 색깔을 칠하는 과정: repaint
  - geometry를 변경하는 것은 자원을 많이 소모

- CSS specifications

  - CSS 본질은 약속
  - CSS level 1
  - CSS level 2
    - 1과 통합 레벨 
    - module 나옴
  - CSS level 2.1
    - 통합 스펙서
    - 모듈별로 나옴
    - values text text decor fonts ui ...
  - MODULE level
    - grid flexbox effects transforms ...

- normal flow

  - CSS 2.1 ...
  - position
    - static, relative, absolute, fixed, inherit
    - static, relative만 normal flow 영향 받음
  - block formatting contexts 이하 bfc
  - inline formatting contexts 이하 lfc
  - relative positioning 이하 rp
  - bfc
  - lfc

  - rp는 static을 모두 그리고 static으로 그려진 normal flow에서 위치를 계산

- float

  - left, right, none, inherit
  - 설정하면서부터 새로운 bfc 생김 : new bfc
  - float over normal flow
  - ifc 요소들 가드하는 역할
  - line box : float 끼리 어떻게 계산?
    - 탑 라인의 기준점이 어디인가
    - 탑 라인은 한번 내려오면 끝
  - line box + inline guade
    - ifc는 
      - float에 걸려서 내려오거나 
        - 부모 안 늘어남
      - block 가드에 걸려서 내려옴

  