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

/*
  #2.0 Styles / #2.1 Local Only Fields

  Apollo client로 local state를 다루어볼것이다
  또한, local state를 API에서 제공되는 remote data와 병합하기 위해 어떻게 쓰는지도.

  그 전에 styled-component를 이용해서 어느정도 디자인적으로 보일수 있게 꾸며주었다.

  * 2.1

  내가 하고싶은것은 사용자가 영화에 좋아요를 누를 수 있게 하는것이다
  무언가 버튼이 있어서 그 버튼을 누르면 좋아하는 영화로 보이게 하는것이다.
  문제는 백엔드에는 그런 resolver나 mutation , account등이 없어서
  likeMovieMutation 같은것을 만들 수는 없을것이다

  대신 브라우저안에서 모든것을 처리해볼것
  Apollo cache를 이용해서.

  * local only field *
  local only field는 remote filed의 반대이다.
  id
  title
  medium_cover_image
  rating

  이런것들이 remote filed 이다. Apollo는 페이지가 로딩되면 이것들을 
  cache에서 먼저 찾을것이다.
  그곳에서 찾지 못하면 Apollo는 API에 이 field들을 요청할것이고, 
  그럼 GraphQL은 응답하게 된다.

  local only field는 절대 API로 가지 않는 field이다.
  Apollo는 절대 local only field를 API에서 찾지 않을것
  cache에서만 활동하는 field이다.

  선언하거나 요청하는 방법은 아주 간단하다
  cache옆에만 있다고 알려주기위해
  isLiked @client 라고 선언해줄것이다

  이 isLiked 데이터를 요청하는 방식은 movie의 다른 field를 요청하는 방식과 동일하다
  button을 하나 만들어 사용자가 Like를 했으면 UnLike를 보여줄것이고
  Like를 안했으면 Like Movie를 보여줄것이다

  <button>{data?.movie?.isLiked? "UnLike" : "Like"}</button>
  아주 쉽게 isLiked data에 접근할 수 있다 기존에 remote data에 접근하는 방법이랑 같다

  * GraphQL의 병합의 힘이다 *
  예를들어 GraphQL API에서 가져온 객체를 cache에 저장할 수 있을것이다
  그럼 cache에 사용자 프로필을 가지게 될것이다

  그리고 local only field로 다크모드라던지 타임존, 볼륨크기 등등을 local only field에 저장할 수 있게 될것이다
  
*/

/*
  #2.2 writeFragment

  이벤트 핸들러를 만들었는데 여기서 우리는 cache에 접근해 수정해야한다
  cache는 client에 있고 아직 client에 접근하지 않아도 된다.

  두가지 옵션이 있는데
  하나는 client를 쓰고 useApolloClient를 가져오는것 
  다른 한가지는 useQuery에서 client를 가져오는것이다
  이번에는 useQuery에서 cache를 가져올것

  그리고 onClick안에 cache.writeFragment를 썼다
  이것은 타입의 일부다. 타입 movie는 타입이고 타입 movie의 fragment를 만들 수 있다

  우선 우리의 cache에서 수정하고싶은 객체를 알아내야한다.
  dev tools에서 보게되면 Movie에 객체의 id가 들어간것을 알 수 있다
  그 단어는 API에서 나온 type Movie이고 뒤에것은 id이다. 
  이것으로 우리가 수정하고자하는 영화를 알아낼 수 있다 **

  ** cache안에 수정하고싶은 객체를 알아내는 것이 핵심
  useParams로 가져오는 id를 writeFragment에 넘겨줌

  cache.writeFragment({
    id: `Movie:${params.id}`,
    fragment: gql`
      fragment MovieFragment on Movie
    `
  })

  onClick안에 이런식으로 구현했는데 gql다음에 나오는 fragment는 예약어라고 생각하면된다
  필수라 바꾸지 못한다. 그 다음은 원하는 원하는 fragment이름을 해주면되고
  on도 필수이고 Movie는 GraphQL API에서 온 타입이라 바꾸지 못한다
  여기들어가는 타입은 id에 보내주는 Movie와 이름이 같아야한다.

  이 fragment 안에서 우리가 수정하고싶은 한 부분을 말해주면된다.
  하나의 큰 타입의 일부이기 때문에 Movie의 한 부분만 수정하고싶다
  isLiked부분만
  현재 한것은 writeFragment인데 어떤 type의 일부를 cache에 작성할 것이다
  즉, 우리는 id를 가진 Movie를 찾고 fragment들을 객체(Movie) 안에 쓸것이다

  Apollo cache를 성공적으로 수행한것이다. 
  cache의 data가 잘 바뀜.
  우리가 cache 의 안으로 가서 cache를 수정했다 Apollo client는 isLiked의 변경사항을 듣는 모든것들을 새로고침 할것

  영화 제목같은것도 바꾸어버릴수 있다

  * data만 써놓으면 바뀌지않는다
  우리가 무엇을 바꿀지 정의를 하는게 중요 (fragment안에 )
  타입에서 어떤 field를 수정할지 Apollo에게 말하기

  이제 true에서 다시 false로 가게 fragment를 수정해볼것이다
  data.movie.isLiked를 가져와서 반대값이 되도록 ! 를 추가한다

  좋은점은 다른 화면으로 돌아가도 누른것이 유지가 된다는점
*/

/*
  #2.3 Conclusions

  데이터를 얻기 위해 우리가 해야할것은
  const { data, loading, client : { cache } } = useQuery(GET_MOVIE, {
    variables: {
      movieId: params.id,
    },
  });

  이것밖에 없는것이다 client : cache를 사용하지 않는다면 한줄이 될것이다

  아무것도 안해도 한줄만 있으면 컴포넌트에 데이터를 넣을 수 있다.
  loading, data, error state가 있다

  
*/