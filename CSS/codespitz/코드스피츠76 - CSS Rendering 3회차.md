# 코드스피츠76 - CSS rendering 3

- CSSOM & VENDOR PREFIX

- CSS Object Model

  - Sheet 객체

    - CSS Style Sheet

    - CSSRULES

      - sheet.cssRules
      - 

    - ```html
      <style id="s">
        .test {background: #ff0;}
      </style>
      ```

    - ```javascript
      const el = document.querySelector('#s');
      const sheet = el.sheet;
      const rules = sheet.cssRules;
      const rule = rules[0]; // .test
      console.log(rule.selectorText); // .test
      console.log(rule.style.background); // #ff0
      ```

    - cssrule type

    - css 추가하고 싶으면 sheet에 추가: insertRule

      - document에 등록된 sheet를 건들면 rerendering을 한다
        - `document.styleSheets`

    - css 삭제 : deleteRule

  - 직접 시트 건들이므로 비용 저렴

- 

- 

