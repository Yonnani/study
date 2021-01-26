# CSS 선택자 우선순위 이모저모

- `!important`> 인라인스타일 > 아이디(`#idname`) > 클래스(`.classname`) > 태그(`h1`) > 전체선택자`*`
  - 더 구체적인 선택자의 우선순위가 더 높음

- 가상클래스 > 가상클래스 없을 때
- `class="name name2"`의 경우는 `name`과 `name2`는 동급이고, style에서 뒤에 쓰인 것이 우선 적용됨
- `!important`끼리는 아래의 것이 우선 적용됨