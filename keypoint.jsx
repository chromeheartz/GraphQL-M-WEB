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

/*
  #1.3 useQuery Variables

  Movies와 Movie 스크린을 연결할것이다
  :id를 parameter로 Link에 넘겨주어 라우터를 구현해볼것이다.

  Movie에서 parameter를 받아오기 위해 useParams를 사용
  그리고 쿼리를 써볼것인데 이 쿼리가 하나의 movie만을 받아올것이라면
  id를 변수로 보내주어야한다.

  어떻게하면 쿼리를 변수로 보낼수 있을까.
  대부분의 경우 쿼리와 변수를 함께 보내야 할것이다

  GET_MOVIE라는 것을 만들어 변수를 보낼 수 잇께 query를 작성해주었다
  실제로 요청을 백엔드 server에 movie라고 불리는 resolver에 넘겨주어야할것이다

  Movie.js에 있는 컴포넌트가 GET_MOVIE쿼리를 위해 movie id라고 하는 변수를 제공하도록 만든것이다
  리액트 컴포넌트가 GET_MOVIE 쿼리를 얻기 위해 변수를 제공하면
  GraphQL즉, Apollo가 String인 movie id를 넣을것이다.

  기존에 우리가 graphql studio에서 했던것과 똑같다
  query랑 String변수의 이름을 쓰고 graphQL API를 호출했다.

  const {} = useQuery(GET_MOVIE, {
    variables: {
      movieId : params.id
    }
  })
  이것이 변수를 필요로하는 쿼리로 변수를 보내는 방법이다.
  매개변수의 이름이 같아야한다.

  loading일때도 구현해주면 잘 나오는것을 확인 해볼 수 있다

  *** Apollo cache 

  Apollo cache의 힘은 loading을 더이상 보지 않게 되는것이다
  뒤로갔다가 다시 돌아올때에 로딩이 보이지 않을것이다 이유는
  우리가 처음에 설정했던 in memory cache 설정이 바로 지금 발생한것이다.
  Apollo가 내 쿼리들을 저장할것이다
  브라우저에 있는 메모리에 cache에.

  즉 한번 화면을 가져오면 다른 화면으로 이동했다가 돌아왔을때 데이터를 가져오지 않아도 되는것이다

  ** 쿼리에 변수보내기
  쿼리를 작성하고 API에 필요한 변수를 올바른 type으로 추가한 다음 해당 변수를 보내주면 된다.

*/

/*
  1.4 Apollo Dev Tools

  Apollo Dev Tools는 cache를 확인할 수 있게 해준다
  확장을 하고나면 inspector에 Apollo라는 것이 생기게 될것이다
  클릭해보면 이전에 실행했었던 쿼리들을 볼 수 있다. 
  Explorer를 열어보면 굳이 서버쪽으로 보지 않아도 확인 될 수 있게 되어있다.

  cache에는 Apollo가 나의 Movies에 대한 정보들을 다 가지고있다.
  
  Movies화면에서 allMovies에 요청할것은 title과 id뿐이다.
  하지만 Movie에서 small_cover_image를 요청하면 어떻게될까
  Apollo는 Movie가 무엇인지 안다 'type Movie'를 알기 때문에

  요청후 cache를 확인해보면 cache안에 클릭했던 영화에
  small_cover_image가 들어와있는것을 볼 수 있을것이다.

  같은 type, 같은 id 객체의 추가적인 데이터를 요청한다면
  Apollo는 그 새로운 데이터를 같은 cache안에 넣을것이다.

  이것들은 entity(개체)다. Apollo client는 그 id로 Movie라는 개체를 생성

  **** 나중에 사용자가 데이터를 수정하기 원하는 경우에는
  같은 entity 안에서 전부 수정할 수 있는것이다.
*/