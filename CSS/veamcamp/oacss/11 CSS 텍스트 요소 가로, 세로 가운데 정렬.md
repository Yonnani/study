# CSS 텍스트 요소 가로, 세로 가운데 정렬

- block 안의 inline 요소를 세로 가운데 정렬을 하려면
  - line-height를 높이와 같게 줌 => 반응형웹에서 망할수 있음
  - 부모에서 상하 padding을 줌 `padding: 2em 0`
    - 나중에 폰트 사이즈 바뀌어도, 텍스트가 여러 줄이 되어도 가운데 정렬됨
- 이미지와 텍스트를 세로 정렬 나란히 하려면
  - 이미지에 `vertical-align: middle`로 줌

