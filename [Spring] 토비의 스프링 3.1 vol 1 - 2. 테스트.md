# 토비의 스프링 3.1

## Vol.1 스프링의 이해와 원리

### 2장 테스트

- 스프링이 개발자에게 제공하는 가장 중요한 가치 - 객체지향과 테스트
- 테스트는 스프링을 학습하는 데 있어 가장 효과적인 방법 중 하나

#### 2.1.1 테스트의 유용성

- 테스트란 내가 예상하고 의도했던 대로 코드가 정확히 동작하는지를 확인해서, 만든 코드를 확신할 수 있게 해주는 작업

#### 2.1.2 UserDaoTest의 특징

- 테스트 코드

```java
public class UserDaoTest {
    public static void main(String[] args) throws SQLException {
        ApplicationContext context = new GenericXmlApplicationContext("applicationContext.xml");
        
        UserDao dao = context.getBean("userDao", UserDao.class);
        
        User user = new User();
        user.setId("user");
        user.setName("백기선");
        user.setPassword("married");
        
        dao.add(user);
        
        System.out.println(user.getId() + " 등록 성공");
        
        User user2 = dao.get(user.getId());
        System.out.println(user2.getName());
        System.out.println(user2.getPassword());
        
        System.out.println(user2.getId() + " 조회 성공");
    }
}
```

> - 자바에서 쉽게 실행 가능한 main() 메소드 이용
> - 테스트할 대상인 UserDao의 오브젝트를 가져와 메소드 호출함
> - 테스트에 사용할 입력 값(User 오브젝트)을 직접 코드에서 만들어 넣어줌
> - 테스트의 결과를 콘솔에 출력함
> - 각 단계의 작업이 에러 없이 끝나면 콘솔에 성공 메시지 출력

##### 웹을 통한 DAO 테스트 방법의 문제점

