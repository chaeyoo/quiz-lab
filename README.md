# Quiz Lab
> 단어를 암기하고, 퀴즈로 테스트하며 공부할 수 있는 웹앱

## 프로젝트 소개
리액트 테스트 코드를 작성하는 법을 익히기 위한 프로젝트 입니다.
퀴즈랩은 사용자와의 인터랙션이 많은 앱이기 때문에, 사용자 중심의 테스트를 구상 및 작성을 연습하는 데에 적합한 프로젝트라고 생각합니다.


## 기술 스택
##### Language & Major Library
- React, Typescript, Jest, React-testing-library, zustand, React-spring, Tailwind
#####  Package Manager
- npm
##### Backend
- Supabase
##### CI/CD
- Amplify

## DEMO 
- [퀴즈랩](https://main.d3102voefpy56i.amplifyapp.com/) (모바일버전으로 브라우저 변경 후 보세요!)

<img src="https://github.com/user-attachments/assets/b4048e28-b6c6-43b0-b483-04d1016f1903" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/93b6efe0-ba5f-4df3-a90d-966c1fca6593" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/b4ba321c-d6a7-483a-a692-8c1d87b2f0f4" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/7ae0147a-4488-4c2b-82b9-e5d5b495025e" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/614e96fe-86a7-4a2c-9a7b-3cc864ccfa37" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/2248de73-9027-47ff-877a-ba51251ffce8" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/c1e5c6be-2b1e-4a08-9429-6ec148cb5681" width="300" height="500"/>

## 주요기능
###### 퀴즈세트 목록
- 검색필터
- 연월로 그룹핑

###### 낱말카드
- 스와이프- 다음 단어로 넘어가기 (오른쪽: 알고 있음, 왼쪽: 학습 중)
- 탭 - 단어/뜻 보여주기
- 알고있음, 학습중 상태 관리
- 낱말카드 결과 차트
  
###### 학습하기 (퀴즈 풀이)
- 퀴즈 정답, 오답 모달 표시
- 학습하기 결과 차트
  
## 데이터 구조
<pre>
<code>
CREATE TABLE quiz_set (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES "user"(id)
);

CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    quiz_set_id INTEGER REFERENCES quiz_set(id),
    word VARCHAR(100) NOT NULL,
    meaning VARCHAR(100) NOT NULL,
    seq INTEGER,
    star BOOLEAN
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nick_name VARCHAR(50),
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</code>
</pre>


## 프로젝트 시작하기
##### 설치
<pre>
<code>
  npm install
</code>
</pre>

##### 실행
<pre>
<code>
  npm run start
</code>
</pre>


