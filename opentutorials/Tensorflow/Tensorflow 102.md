# Tensorflow 102

## 1 오리엔테이션

## 2 데이터와 차원

- 차원
  - 표의 열
    - 관측치 = N차원 공간의 한 점
    - 변수의 개수 = 공간의 **차원수**
  - 포함 관계
    - 배열의 깊이 = **차원수**

- 데이터 공간의 맥락
  - 차원수 = 변수의 개수
- 데이터 형태의 맥락
  - 차원수 = 배열의 깊이

## 3 이미지 데이터 구경하기

## 4 이미지 구경하기 (실습)

## 5 Flatten

## 6 Flatten (실습)

## 7 Conv2d

- Convolution

  - 특정한 패턴의 특징이 어디서 나타나는지를 확인하는 도구
  - convolution 필터를 통해서 나타나는 특징맵(feature map)

- ```python
  # 모델의 구조 만들기
  X = tf.keras.layers.Input(shape=[28, 28, 1])
  H = tf.keras.layers.Conv2D(3, kernel_size=5, activation='swish')(X) # 3개의 특징맵 = 3채널의 특징맵, 필터셋을 3개 사용
  H = tf.keras.layers.Conv2D(6, kernel_size=5, activation='swish')(H) # 6개의 특징맵 = 6채널의 특징맵, 필터셋을 6개 사용
  # kernel_size = 필터셋의 사이즈
  H = tf.keras.layers.Flatten()(H) # 표로 만듦
  ```


## 7.1 Filter

- 필터의 이해
  1. 필터셋은 3차원 형태로 된 가중치의 모음
  2. 필터셋 하나는 앞선 레이어의 결과인 "특징맵" 전체를 본다.
  3. 필터셋 개수 만큼 특징맵을 만든다.

