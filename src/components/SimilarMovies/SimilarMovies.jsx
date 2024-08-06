import { useParams } from "react-router-dom";
import { fecthSimilarMovies } from "../../api/movies";
import MovieList from "../MovieList/MovieList";
import { useState } from "react";
import { useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./SimilarMovies.module.css";

export default function SimilarMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieDetailsById = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const similarMoviesData = await fecthSimilarMovies(movieId);
        setSimilarMovies(similarMoviesData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetailsById();
  }, [movieId]);

  return (
    <>
      <h3>See also</h3>
      <MovieList movies={similarMovies} />
      <Loader isLoading={isLoading} />
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
    </>
  );
}
