# div 가로세로 모두 가운데 정렬 css position

- ```css
  .center {
      width: 300px;
      height: 300px;
      position: absolute; 
  	left: 50%;
      margin-left: -150px;
      top: 50%;
      margin-top: -150px;    
  }
  ```

  - width, height가 변경되면 margin-left, margin-top도 수정해야함

- ```CSS
  .center {
  	position: absolute;
  	left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 300px;
      height: 300px;
      margin: auto;
  }
  ```