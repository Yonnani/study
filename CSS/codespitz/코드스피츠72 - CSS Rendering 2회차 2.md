# 코드스피츠72 - CSS rendering 2

- Box shadow로 하면 빨라짐
  - 박스 쉐도우는 지오메트리에 관여안함
  - 프레그먼트 공정에만 관여함
  - 따라서 부하 주지 않음
- `position: absolute`
  - caret position & offset
- offset
  - `어떤 기준`으로부터 얼만큼 차이가 나는가
  - Dom 구조를 따라가지 않는다
  - Offset parent를 얻는 방법에 달려있음
  - offset parent
    1. null
       - root, html, body
       - Position: fixed
       - out of dom tree
    2. recursive search
       - Parent.position: fixed = null
       - parent: position: !static = ok
       - body = ok
       - td, th, table = ok
       - parent.parent continue
  - offset value
    - offsetLeft
    - offsetTop
    - offsetWidth
    - offsetHeight
    - offsetScrollTop
    - offsetScrollLeft
    - offsetScrollWidth
    - offsetScrollHeight
    - 읽기 전용 값
  - 브라우저는 한번에 reflow 계산하는데,
    - Offset value를 쓰면 무조건 reflow 계산함
- Position: absolute
    - left, top 기본값은 자신을 포함하는 경계면에 일치한다
    - left, top을 꼭 주기!(bottom, right도 있음)
    - Relative : absolute 브릿지