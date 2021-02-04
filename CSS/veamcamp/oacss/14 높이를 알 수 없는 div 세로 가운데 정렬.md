# 높이를 알 수 없는 div 세로 가운데 정렬

- ```html
  <div class="cover">
      <div class="cover-inner">
          <div class="box">
              WOW
          </div>
      </div>
  </div>
  ```

- ```CSS
  .cover {
      height: 100vh;
      display: table;
      width: 100%;
  }
  
  .cover-inner {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
  }
  
  .box {
      // 필요한 스타일
      width: 400px;
      margin: 0 auto;
      padding: 2rem 0;
  }
  ```

  - 테이블 태그 처럼 설정
  - IE 8부터 적용됨