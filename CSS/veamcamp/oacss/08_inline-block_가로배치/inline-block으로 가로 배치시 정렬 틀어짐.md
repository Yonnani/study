# inline-block으로 가로 배치시 정렬 틀어짐

- `vertical-align`은 block 요소에 지정될 수 없음
- 부모에게 `line-height`를 주고 자식에게 `vertical-align: middle`을 해야 세로 중앙 정렬이 됨
- `line-height: 1`은 텍스트가 가지고 있는 라인 하이트로 적용
- `vertical-align`은 `inline`과 `inline`의 상대적인 수직 정렬

