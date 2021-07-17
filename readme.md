# 기본셋팅

- package.json을 이용한 패키지 관리
- babel을 이용한 최신 자바스크립트 사용
- nodemon을 이용한 실시간 컴파일(일일히 npm run dev 안쳐도됨)

관점을디자인하라 부의추월차선 원씽 부자아빠가난한아빠


- express를 이용해 서버 객체를 생성
- app.listen(포트번호, 콜백함수) 메소드를 사용=> request대기중..

# Middleware

- req, res, next 3개의 인자를 가짐.
- 모든 controller 들은 middleware가 될 수 있다.
- res객체를 반환하지 않는(=finalware가 아닌) controller들이 middleware이다.
- app,get(url, controller) 에서 controller를 가변인자로 받아 여러 개가 와도 허용된다.

# app.use

- global middleware를 생성해줌.
- app.use(so meMiddleware); // app.get보다 먼저 사용하여야 함에 주의!

# 라우터란?

url은 /로 나누어져 있는데 카테고리별로 라우터를 매칭해줄 수 있다.

# 상대주소와 절대주소
href = "/edit" => 절대경로로 접근됨
href = "edit" => 상대경로로 접근됨

# mongoose
nodejs와 mongodb를 이어주는 다리역할


# promise 객체와 callback에 대한 이해

- callback은 비동기적인 함수에 대한 후속 조치이다. 비동기적인 함수의 실행이 끝났을 때 후작업을 처리해 주는 것이 callback의 역할이다.

- callback의 존재는 javascript 언어에서 먼저쓰인 코드가 반드시 먼저 실행되지는 않을 수 있다는 점을 상기시켜준다.

- promise객체는 callback의 업그레이드 버전이다.

- (promise방식)비동기적인 함수에 async, 비동기적인 코드에 await을 붙임으로써 강제적으로 동기적인 코드로 만들어 줄 수 있다.

