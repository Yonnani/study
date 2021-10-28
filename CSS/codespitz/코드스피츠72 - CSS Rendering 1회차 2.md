# 코드스피츠72 - CSS Rendering 1회차 2/2

- overflow
  - visible | hidden | scroll | inherit | auto
  - 기본값은 visible
  - overflow-x, -y
    - visible | hidden | scroll | clip | auto
    - draft임
  - text-overflow
    - 표준안
    - clip | ellipsis
    - normal flow 영향 안 끼침
  - visible이 아닌 경우 normal flow에 영향 끼침
  - hiddel / scroll 주면 
    - new BFC 생김
    - first line box bound
    - overflow hidden은 float 요소의 공간을 찾아서 내가 들어갈 수 있는지 없는지 판별해서 들어갈 수 있으면 그려지고 못 들어가면 안 그려짐