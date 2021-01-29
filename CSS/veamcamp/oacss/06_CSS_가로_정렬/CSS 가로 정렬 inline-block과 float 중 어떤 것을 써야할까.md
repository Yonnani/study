# CSS 가로 정렬? inline-block과 float 중 어떤 것을 써야할까?

- `inline-block`
  - 부모에 font-size: 0을 주면 공간 없어짐 => 브라우저에 따라 적용안되는 것 있음
  - 요소 사이 공백 삭제 ```<div></div><div></div>```
  - ```margin: 0 -4px``` => 폰트사이즈 바뀌면 ...
  - ```vertical-align: top;```
  - 너비를 고정값으로 주지 않아도 됨
  - 요소 사이에 공간이 생김
- `float: left`
  - float 부모요소가 없어짐
    - ```height: 100px```
    - ```overflow: hidden```
    - `clear`
  - float는 원래 가로배치를 위한 속성은 아님
  - float된 요소와 다른 요소의 자연스러운 배치를 위해 탄생

- `display: grid`
  - 미래형 속성
  - IE 9 이하는 적용 안 됨

