import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;
export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);
  console.log(data);
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) {
    return <h1>Coud not fetch :( </h1>;
  }
  /*
    provider를 쓰기때문에 원한다면 이렇게
    useEffect hook을 사용해서도 가능하다

    useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
            }
          }
        `,
      })
      .then(result => setMovies(result.data.allMovies));
  }, []);
  */

  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
          {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
