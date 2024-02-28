# 이거 받어!!ㅋㅋㅋ

###

**React, React Query를 활용한 아웃소싱 프로젝트 만들기!**

## vercel 배포 링크

[take_it 배포사이트 바로가기](take-it-tawny.vercel.app)

## 프로젝트 소개

#### 자신과 상대방의 정보를 탐색 후 선물을 추천해주는 사이트입니다

### 개발 기간 : 2024. 02.22 ~ 2024.02.29

## 💻️ 개발 환경

-Environment : vscode, github

-Development : react, javascript

-Database : json server

-Library : redux, react-router-dom, tailwindcss

-Design : figma

-Deployment : Vercel

</br>

**# 팀원 소개**
|김대연|김예린|김철균|황현미|김승희|
|---|---|---|---|---|
|<img src="https://avatars.githubusercontent.com/u/103303516?v=4" width="100" height="100"/>|<img src="https://avatars.githubusercontent.com/u/118904207?v=4" width="100" height="100"/>|<img src="https://avatars.githubusercontent.com/u/97039528?v=4" width="100" height="100"/>|<img src="https://img.cjthemarket.com/images/file/product/166/20230131131750628.jpg?SF=webp" width="100" height="100"/>|<img src="https://avatars.githubusercontent.com/u/154486286?v=4" width="100" height="100"/>|
|@rlaedous|@yeriniii|@cheolgyun7|@brownrice0916|@HuaHuaChiChi|
|마이페이지(상세)<br />추천선물페이지|룰렛페이지<br />유튜브|설문결과페이지<br />메인페이지|설문조사<br />커뮤니티|로그인<br />선물상세(댓글)|

<br>

**# 시작 가이드**

- Installation

```
git clone https://github.com/rlaedous/take-it.git
yarn
yarn dev
```

**# 페이지 소개**

- 메인
- 로그인, 회원가입
- 마이페이지
- 설문조사
- 가까운 가게 찾기
- 룰렛돌리기
- 커뮤니티

<br/>

</br>

### ❗ 필수 요구 사항

- 지도 API

- Youtube API

- 설문조사 (SpreadSheet를 db.json으로 활용)

- 상태관리 라이브러리는 RTK를 사용하고 firebase또는 json-server or supabase 택1 진행

#### 배포하기

- Vercel 이라는 호스팅플랫폼을 이용해 배포합니다.
- 배포에 적용될 브랜치는 main 또는 master 브랜치로 적용합니다.

## ERD(Entity Relationship Diagram)

![image](https://github.com/rlaedous/take-it/assets/103303516/314dbe8e-a87d-4da6-bbe7-15e24c29fc18)

## 실제 구현 화면

### 로그인, 회원 가입

<img src="https://github.com/rlaedous/take-it/assets/118904207/716d6117-0367-454b-8218-5449fd77996c" width="800px" height="400px"/>

- React Query를 이용하여 로그인 회원가입 진행합니다.

- 회원가입: 아이디, 패스워드, 패스워드 확인, 닉네임 입력해야 합니다.
- 로그인: 아이디, 비밀번호 입력해야 합니다.

### 메인페이지

<img src="https://github.com/rlaedous/take-it/assets/118904207/1fc3eb83-4ff8-42b7-88d6-7248b2bd1ef0" width="800px" height="400px"/>

- 설문조사를 할 수 있는 버튼과 룰렛 돌리기를 할 수 있는 페이지로 라우팅 할 수 있습니다.

### 마이 페이지

<img src="https://github.com/rlaedous/take-it/assets/118904207/4a1e4f58-1eec-4e2e-b955-2cbe675b6378" width="800px" height="400px"/>

- 저장된 정보를 이용하여 프로필 수정을 할 수 있습니다.(이미지, 닉네임)
- 선물 추천보기를통해 설문조사를 통해 나온 결과값을 저장하면 1등에 대한 리스트가 나옵니다.
- 상세로 들어가면 저장되어 있던 선물리스트가 나옵니다.

### 설물조사 페이지

<img src="https://github.com/rlaedous/take-it/assets/118904207/cf385743-7c76-4065-933e-69467d540d2d" width="800px" height="400px"/>
<img src="https://github.com/rlaedous/take-it/assets/118904207/1b08b842-c547-43db-91b0-36c9460c2641" width="800px" height="400px"/>
<img src="https://github.com/rlaedous/take-it/assets/118904207/cf385743-7c76-4065-933e-69467d540d2d" width="800px" height="400px"/>

- 7개의 질문으로 이루어진 설문조사를 진행하고 그에 맞는 선물을 추천받을 수 있습니다.

### 설문결과 페이지

<img src="https://github.com/rlaedous/take-it/assets/118904207/cc281ee4-591d-4a3b-9e19-0278cb3dcca6" width="800px" height="400px"/>

- 질문을 통해 나온 결과값을 토대로 선물 추천 결과를 배출하고, 결과를 저장해 줍니다.
- 결과를 토대로 알고리즘을 분석하여 유튜브를 추천해줍니다.
- 선물 상세보기를 들어가서 추천해준 선물에 대한 댓글을 각자 달아줍니다(CRUD)
- 로그인을 하지 않으면 결과 저장을 할 수 없습니다.

### 룰렛 페이지(로그인필요)

![2024-02-28 16-13-01](https://github.com/cheolgyun7/deve11og/assets/97039528/d682ac0e-924f-4392-82b5-d21d63082613)

- 비로그인시 로그인 화면으로 이동
- 선물들 중에 랜덤으로 10개를 선정하여 룰렛으로 랜덤 선물을 정해줍니다.

### 가까운 가게 보기 페이지

<img src="https://github.com/cheolgyun7/deve11og/assets/97039528/5b601353-9794-4021-8cb0-81b30d1c802b" width="800px" height="400px"/>
- 내 위치를 설정하고 원하는 가게를 선택하면 내 위치 근처에 있는 가게를 검색해서 표시해줍니다.

### 커뮤니티 페이지

<img src="https://github.com/cheolgyun7/deve11og/assets/97039528/01a776b8-df86-4116-932a-5e01080c7213" width="800px" height="400px"/>
- 비로그인시 커뮤니티 리스트만 확인할수 있게 해줍니다.
- 로그인시 커뮤니티페이지에서 등록, 수정, 삭제가능합니다
- Pagination기능 구현하였고, 상대방의 게시물은 삭제가 불가능하도록 구현하였습니다
