# 자바 ORM 표준 JPA 프로그래밍

## 4. 엔티티 매핑

- JPA가 지원하는 맵핑 어노테이션
  - 객체와 테이블 맵핑 : `@Entity`, `@Table`
  - 기본 키 맵핑 : `@Id`
  - 필드와 컬럼 맵핑 : `@Column`
  - 연관관계 맵핑 : `@ManyToOne`, `@JoinColumn`

### 4.1 @Entity

- JPA를 사용해서 테이블과 맵핑할 클래스는 `@Entity`를 필수로 붙여야함
- 주의사항
  - 기본 생성자는 필수(파라미트가 없는 public/protected 생성자)
  - final 클래스, enum, interface, inner 클래스에는 사용할 수 없음
  - 저장할 필드에 final을 사용하면 안 됨

### 4.2 @Table

- `@Table`은 엔티티와 맵핑할 테이블을 지정함

### 4.3 다양한 매핑 사용

- 자바의 enum을 사용하려면 `@Enumerated` 어노테이션으로 맵핑해야 함
- 자바의 날짜 타입은 `@Temporal`을 사용해서 맵핑함
- `@Lob`을 사용하면 CLOB, BLOB 타입을 맵핑할 수 있음

### 4.4 데이터베이스 스키마 자동 생성

- JPA는 데이터베이스 스키마를 자동으로 생성하는 기능을 지원함

### 4.5 DDL 생성 기능

### 4.6 기본 키 매핑

- 기본 키를 직접 할당하려면 `@Id`만, 자동 생성 전략을 사용하려면 `@Id`에 `@GeneratedValue`를 추가하고 원하는 키 생성 전략을 선택하면 됨

#### 4.6.1 기본 키 직접 할당 전략

- `@Id`로 맵핑
- `@Id` 적용 가능 자바 타입
  - 자바 기본형
  - 자바 래퍼(Wrapper) 형
  - String
  - java.util.Date
  - java.sql.Date
  - java.math.BigDecimal
  - java.math.BigInteger
- 기본 키 직접 할당 전략은 엔티티를 저장하기 전에 애플리케이션에서 기본 키를 직접 할당하는 방법

#### 4.6.2 IDENTITY 전략

- IDENTITY는 기본 키 생성을 데이터베이스에 위임하는 전략
- `@GeneratedValue` 어노테이션 사용하고 식별자 생성 전략을 선택해야 함
- ```엔티티가 영속 상태가 되려면 식별자가 반드시 필요함. 그런데 IDENTITY 식별자 생성 전략은 엔티티를 DB에 저장해야 식별자를 구할 수 있으므로 em.persist()를 호출하는 즉시 insert sql이 DB에 전달됨. 따라서 이 전략은 트랜잭션을 지원하는 쓰기 지연이 동작하지 않음.```

#### 4.6.3 SEQUENCE 전략

- DB 시퀀스는 유일한 값을 순서대로 생성하는 특별한 DB 오브젝트임
- 시퀀스를 지원하는 DB에서 사용할 수 있음

#### 4.6.4 TABLE 전략

- TABLE 전략은 키 생성 전용 테이블을 하나 만들고 여기에 이름과 값으로 사용할 컬럼을 만들어 DB 시퀀스를 흉내내는 전략임

#### 4.6.5 AUTO 전략

- `GenerationType.AUTO`는 선택한 DB 방언에 따라 INDENTITY, SEQUENCE, TABLE 전략 중 하나를 자동으로 선택함
- AUTO 전략의 장점은 DB를 변경해도 코드를 수정할 필요가 없다는 것임

#### 4.6.6 기본 키 매핑 정리

- 영속성 컨텍스트는 엔티티를 식별자 값으로 구분하므로 엔티티를 영속 상태로 만들려면 식별자 값이 반드시 있어야 함
- 권장하는 식별자 선택 전략
  - DB 기본 키는 다음 조건을 모두 만족해야 함
    1. null 값 허용하지 않음
    2. 유일해야 함
    3. 변해서는 아니됨
  - 테이블의 기본 키를 선택하는 전략
    1. 자연 키(natural key)
       - 비지니스에 의미가 있는 키(ex. 주민번호, 이메일, 전화번호 등)
    2. 대리 키(surrogate key)
       - 비지니스와 관련 없는 임의로 만들어진 키, 대체키로도 불림
       - ex. 오라클 시퀀스, auto_increment, 키생성 테이블 사용
  - 자연 키보다는 대리 키를 권장함
  - 비지니스 환경은 언젠가 변함
    - 대리 키는 비지니스와 무관한 임의의 값이므로 요구사항이 변경되어도 기본 키가 변경되는 일은 드뭄
    - 대리 키를 기본키로 사용하되 자연 키의 후보가 되는 컬럼들은 필요에 따라 유니크 인덱스를 설정해서 사용하는 것을 권장함
  - JPA는 모든 엔티티에 일관된 방식으로 대리 키 사용을 권장함

### 4.7 필드와 컬럼 매핑: 레퍼런스

#### 4.7.1 @Column

- 참고

  ```java
  int data1; 		// @Column 생략, 자바 기본 타입
  data1 integer not null // 생성된 DDL
  
  Integer data2; 	// @Column 생략, 객체 타입
  data2 integer 	// 생성된 DDL
      
  @Column
  int data3;		// @Column 사용, 자바 기본 타입
  data3 integer	// 생성된 DDL
  ```

#### 4.7.2 @Enumerated

- 자바의 enum 타입을 매핑할 때 사용

#### 4.7.3 @Temporal

- 날짜 타입(java.util.Date, java.util.Calendar)을 매핑할 때 사용

#### 4.7.4 @Lob

- 데이터베이스 BLOB, CLOB 타입과 매핑

#### 4.7.5 @Transient

- 이 필드는 매핑하지 않음
- DB에 저장하지 않고 조회하지도 않음

#### 4.7.6 @Access

- JPA가 엔티티 데이터에 접근하는 방식을 지정함
  - 필드 접근 : `AccessType.Field` 필드에 직접 접근, `private`이어도 접근 가능
  - 프로퍼티 접근: `AccessType.PROPERTY`로 지정, 접근자(Getter)를 사용함

### 4.8 정리

