# img 요소 하단에 생기는 빈 공간?



- `img` 는 인라인요소 - 베이스라인의 아래 공간임
- 문제해결방법
  - ```img { display: block; }``` => 해결은 되지만 추천하지 않음
  - ```img { vertical-align: top; }``` => 이렇게 초기화