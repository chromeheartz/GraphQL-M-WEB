/*
  #0 

  0.1  Welcome

  Apollo Client는 상태관리 라이브러리이다.
  graphQl api에서 데이터를 fetch해오는 것을 가능하게 해주고, 
  어플리케이션에서 로컬로 상태를 관리 할수 있게도 해준다.

  *
  서버에있는 데이터를 가지고오는것, 로컬에 있는 데이터를 관리하는것
  두가지를 관리할 수 있고,
  이 두 종류의 데이터를 동기화 할 수 있다.

  0.3 Installation

  npx create-react-app 으로 설치한 후에
  npm install @apollo/client graphql으로 apollo client 설치
  또한 router-dom도 v6로 깔아준다.

  리액트 18이 릴리즈되었을 당시에는 apollo client와 호환이 잘 안되었다.
  그럴때에 오류가 보이면 --legacy-peer-deps를 뒤에 설치할때 같이 넣어주면 해결될것이다

  #0.4 Router

  Movies, Movie로 영화 리스트가 보일 페이지, 영화 상세 페이지를 나누어 구현해주고
  router 세팅을 완료했다.
*/
