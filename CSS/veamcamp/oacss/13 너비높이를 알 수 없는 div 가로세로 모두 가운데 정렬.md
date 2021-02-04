# 너비높이를 알 수 없는 div 가로세로 모두 가운데 정렬

- ```CSS
  .box {
      width: 300px;
      height: auto;
      
      position: absolute;
      left: 50%;
      top: 50%;
      
      transform: translate(-50%, -50%);
  }
  ```