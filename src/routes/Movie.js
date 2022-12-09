import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      small_cover_image
    }
  }
`;

export default function Movie() {
  const params = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId : params.id
    }
  })
  console.log(data, loading);
  if(loading) {
    return <h1>Fetching Movie</h1>
  }
  return <div>{data.movie.title}</div>;
}
