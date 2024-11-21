# Boost




## 주요 기능 설명

### 1. **회원가입 (`/auth/signup`)**

- 사용자는 `username`, `password`, `region` 정보를 제공하여 회원가입을 진행합니다.
- 데이터를 `users` 테이블에 저장하며, MySQL의 `INSERT` 쿼리를 통해 사용자 데이터를 저장합니다.
- 에러가 발생할 경우 적절한 HTTP 상태 코드와 에러 메시지를 반환합니다.

### 2. **로그인 (`/auth/login`)**

- 사용자가 `username`과 `password`를 입력하여 로그인합니다.
- 성공 시, 서버는 사용자 ID를 HTTP-Only 쿠키에 저장해 클라이언트에서 보안성을 높입니다.
- 로그인 실패 시, 에러 메시지를 반환합니다.

### 3. **로그아웃 (`/auth/logout`)**

- 사용자의 쿠키를 제거하여 로그아웃을 처리합니다.

### 4. **사용자 정보 조회 (`/users`)**

- `GET /users/me`: 쿠키에서 가져온 사용자 ID로 현재 로그인된 사용자의 정보를 반환합니다.
- `GET /users/:userId`: 특정 사용자 ID를 기반으로 정보를 조회합니다.

### 5. **후보 등록 (`/candidates`)**

- 로그인한 사용자가 본인을 후보로 등록할 수 있습니다.
- 한 사용자당 하나의 후보로 제한하며, 동일 사용자가 중복 등록하지 못하도록 검사합니다.
- `candidates` 테이블에 사용자의 ID를 저장하여 후보 등록 정보를 관리합니다.

### 6. **지역별 후보 조회 (`/candidates/:region`)**

- 특정 지역에 등록된 후보 목록을 조회합니다.
- `users` 테이블과 `candidates` 테이블을 조인하여 후보의 이름과 ID를 반환합니다.
<br>

---  

<br>

## 주요 코드 구조와 설명

### 1. **폴더 구조**

```
# 서버 (Backend)
├── routes/                 # 라우트 파일들 (API 경로 정의)
│   ├── authRoutes.js       # 인증 관련 라우트
│   ├── candidateRoutes.js  # 후보 관련 라우트
│   ├── userRoutes.js       # 사용자 관련 라우트
├── db.js                   # 데이터베이스 연결 설정
├── app.js                  # 미들웨어 및 라우트 설정
├── index.js                # 애플리케이션 시작 포인트

# 클라이언트 (Frontend)
client/
├── src/                    # React 애플리케이션 소스 코드
│   ├── styles/             # CSS 및 스타일 관련 파일
│   ├── views/              # React 컴포넌트 폴더
│   ├── App.js               # 전체 라우팅 및 레이아웃 설정
│   ├── index.js             # React 렌더링 시작 포인트
```


### 2. **라우트 구조**

- **`authRoutes.js`**: 인증 기능 처리
- **`candidateRoutes.js`**: 후보 등록 및 조회 처리
- **`userRoutes.js`**: 사용자 정보 조회 처리

### 3. **데이터베이스 연결**

- `db.js` 파일에서 MySQL 데이터베이스 연결을 `mysql2/promise` 라이브러리를 사용해 비동기로 처리합니다.
- `.env` 파일에서 DB 정보를 관리하여 보안성을 유지합니다.


<br>

---  

<br>


<details>
  <summary>회원가입/로그인/로그아웃</summary>
 
  ![image](https://github.com/user-attachments/assets/33bb327b-a373-4806-867d-6f8fc154f61e)

  ![image1](https://github.com/user-attachments/assets/fbe2803e-edc4-4d5a-ae7c-67c5482e54f0)

</details>


<details>
  <summary>회원가입 시 지역 설정</summary>

  ![image2](https://github.com/user-attachments/assets/8c3bbf63-72ca-4ddd-a602-2b83ba3a660b)

</details>


<details>
  <summary>자기가 가입한 지역에서 후보 등록(신청) 가능</summary>

  ![스크린샷 2024-11-16 223950](https://github.com/user-attachments/assets/7b545bd0-be0d-4b32-a52d-ee093d146fb9)

</details>


<details>
  <summary>투표 작동 (투표 표수 반영X 결과 표기될 필요X)</summary>
  
  ![스크린샷 2024-11-16 224227](https://github.com/user-attachments/assets/b3f12920-3924-4307-a2da-63c81d7145c5)

</details>


