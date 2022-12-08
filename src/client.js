import { ApolloClient,InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
})

/*
  client.query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `
  }).then(data => console.log(data))

  이렇게도 확인이 가능
*/
export default client;