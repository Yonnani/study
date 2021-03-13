# Tensorflow 101

## 1. 오리엔테이션

- AI
  - machine learning
    - 문제(지도학습) : **회기 / 분류**
      - 알고리즘 : Decision Tree / Random Forest / KNN / SVM / **Neural Network (Deep Learning)** / ...
        - 라이브러리 : **TensorFlow** / PyTorch / Caffe2 / theano

## 2. 목표와 전략

## 3. 지도학습의 빅픽쳐

- 지도학습
  1. 과거 데이터 준비(원인 : 독립변수, 결과 : 종속변수)
  2. 모델의 구조를 만듦
  3. 데이터로 모델을 학습(FIT)함
  4. 모델을 이용

## 4. 환경설정 - Google Colaboratory

## 5. 표를 다루는 도구 '판다스'

- 변수 variable
  - 표의 관점에서 칼럼이 변수(레모네이드 표)
  - 원인: 독립변수, 결과: 종속변수
    - 지도학습은 이 두 가지를 구분하는 것부터 시작
      - pandas 라이브러리 이용

## 6. 표를 다루는 도구 '판다스' (실습)

## 7. 레모네이드 판매 예측

## 8. 손실의 의미

- (예측 - 결과)<sup>2</sup> = LOSS

## 9. 레모네이드 판매 예측 (실습)

## 10. 보스턴집값예측

## 11. 수식과 퍼셉트론

## 12. 보스턴 집값 예측 (실습)

## 13. 학습의 실제 (with 워크북)

- `https://docs.google.com/spreadsheets/d/1de6dkj80Q39l9XWPdaaFwsRF7f9xAAtsj3EiOmohSvk/edit?usp=sharing`

## 14. 아이리스 품종 분류

- 종속변수가 양적 데이터이면 회귀(regression) 알고리즘 사용
- 종속변수가 범주형 데이터이면 분류(classification) 알고리즘 사용

## 15. 원핫인코딩

- 원핫인코딩(onehot-encoding) : 범주형 데이터를 1, 0으로 바꿔주는 과정

- ```python
  # 원핫인코딩
  아이리스 = pd.get_dummies(아이리스)
  ```

## 16. softmax

- 분류 모델이 하는 일 : 분류를 추측하는 것
  - 0~100%로 추측
  - sigmold
  - softmax

- y<sub>1</sub> = softmax(w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + w<sub>3</sub>x<sub>3</sub> + w<sub>4</sub>x<sub>4</sub> + b)

  y<sub>2</sub> = softmax(w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + w<sub>3</sub>x<sub>3</sub> + w<sub>4</sub>x<sub>4</sub> + b)

  y<sub>3</sub> = softmax(w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + w<sub>3</sub>x<sub>3</sub> + w<sub>4</sub>x<sub>4</sub> + b)

- y = f(w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + w<sub>3</sub>x<sub>3</sub> + w<sub>4</sub>x<sub>4</sub> + b)

  - f: Activation 활성화 함수
    - 회귀모델: Identity (y = x)
    - 분류모델: Softmax

## 17. 아이리스 품종 분류 (실습)

## 18. 히든레이어

- Input Layer => Hidden Layer => Output Layer

  - 보스턴 집값 예측에서 (506, 13) => (506, 5) => (506, 1)

  - ```python
    # 2. 모델의 구조를 만듭니다.
    X = tf.keras.layers.Input(shape=[13])
    H = tf.keras.layers.Dense(5, activation='swish')(X)
    H = tf.keras.layers.Dense(3, activation='swish')(H)
    H = tf.keras.layers.Dense(3, activation='swish')(H)
    Y = tf.keras.layers.Dense(1)(H)
    model = tf.keras.models.Model(X, Y)
    model.compile(loss='mse')
    ```

## 19. 히든레이어 (실습)

