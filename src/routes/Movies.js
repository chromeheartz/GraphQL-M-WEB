import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState();
  console.log(movies);
  const client = useApolloClient();
  /*
    provider를 쓰기때문에 원한다면 이렇게
    useEffect hook을 사용해서도 가능하다
  */
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
  return (
    <ul>
      {movies?.map((movie, index) => (
        <li key={index}>{movie.title}</li>
      ))}
    </ul>
  );
}
