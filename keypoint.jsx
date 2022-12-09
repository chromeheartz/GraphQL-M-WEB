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

/*
  #1.0 Setup 

  Apollo client를 만들기위해 
  client라는 파일을 만들어볼것이다

  이것은 딱 한번만 생성할것인데 GraphQL의 api의 url을 써서
  client를 구성할 수 있다. 그래서 실행중인 서버를 가지고 있는것이 중요하다

  apollo client가 graphQL 서버와 통신하도록 구성할것이여서 서버를 켜야한다.

  client에 apolloClient를 만들어주고 uri에 서버가 돌아가고있는 주소를 넣어준다
  또한, cache strategy라는 어느정도 필수인것을 넣어줄것이다

  데이터를 cache하는것은 다양한데 쿼리를 더 만들고 해볼것이다
  client를 내보내기 전에 확인해볼것이다.

  Apollo client가 가지고있는 hook을 사용해서 확인
  useQuery, useMutation같은것이 있다.
  하지만 hook이 client의 동작을 확인하는 유일한 방법은 아니다

  client를 생성해서 gql안에 query문을 작성해서 data를 확인해보았다
  리액트 버젼이 높아지고 난 후에는 App을 ApolloProvider로 감싸주어야하는 작업이 필요하다

  우리가 작성한 쿼리를 지금 실행중인 localhost:4000으로 보내고 데이터를 받아낸것임.
  콘솔에 우리가 보낸 query가 잘 들어왔는지 (allMovies가 있는지) 확인해보는것이 중요
*/

/*
  #1.1 Apollo Provider

  Movies화면에서 client가 필요하다면 무엇이 필요할까

  - useClient Hook 을 사용해도 된다
  const client = useApolloClient();
  이렇게 써놓으면

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  })
  여기서 만든것과 같은 client가 될것이다 

  * provider 를 쓰는이유인데 이것은 기본적으로 앱 안의 모두가 이 client에 접근할 수 있게 해준다.
  따라서 애플리케이션 내부의 모두가 client에 접근 가능하다. 라우터, 화면, 컴포넌트 ...

  useEffect로도 가능하다. useApolloClient Hook에서 받은 client가 
  client.js와 같기 때문이다 provider덕에. 내가 이 provider안에 무엇을 넣던
  이전에 만든 client에 접근할 수 있다는 점이 포인트다

  하지만 이렇게 하면 Apollo client를 이용해서 계속 요청해야할것이고 client query도 써야하고
  결과를 받아와서 또 state에 넣어주고 해야할것이다. 

  useQuery를 사용해서 개선해볼것이다. useQuery는 쿼리의 내부적으로 client.query를 실행한다
  그리고 데이터를 state안에 넣어줄것이다.
*/

/*
  #1.2 useQuery

  현재 했던 방식은 신경쓸게 많아서 대신 GraphQL 쿼리를 쓸것이다
  export 바깥쪽(컴포넌트 외부)에 const로 선언해주고 gql을 쓸것이다
  gql은 우리가 썼던 함수.
  
  이 안에 썼던것은 항상 우리가 playground에서 썼던것과 같다
  query allMovies, query getMovies처럼 이름을 붙일 수 있는데
  굳이 같은 필요는 없다

  useQuery를 해주고 안에 아까 내가 만들었던 ALL_MOVIES를 넣어주었다.
  useQuery는 엄청 좋은 hook이다.
  우리한테 많은것들을 결과로 넘겨주는데 
  data, client, loading, error 등등이 있다. 이 정보들을 useQuery를 호출하게 되면 다 얻을것

  * GraphQL요청에서 data를 얻고 loading을 하든 안하든 알림을 받고
  네트워크 상태도 받을 수 있고 전에 만든 client에 엑세스 할수 있어서
  useApolloClient를 더이상 쓰지 않아도 된다

  이 hook이 멋진 이유는 우리가 declarative code(선언형 코드)를 쓰게 해주기 때문이다
  선언형 코드는 원하는걸 설명하기 위한 코드만 적는것을 말한다.

  반면에 imperative(명령형)은 모든 단계의 코드를 적는것이다
  기존에 했던 방식들이 명령형. 첫번째로 쿼리요청을 보내고 두번째로 state에 저장하고 step by step으로 진행하는것

  data안에 받을것은 우리가 요청했던 정보를 가진 객체다
  allMovies를 요청했으니 그 안에 들어올것이다

  allTweets도 query에 추가하기만하면 data.allTweets로 넘어올것이다
  우리가 한것은 단순한 graphQL 쿼리이다.
  하나의 쿼리에 원하는 만큼 쿼리들을 추가할 수 있음.
  
*/
