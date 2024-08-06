import css from "./MovieList.module.css";
import { forwardRef } from "react";
import MovieItem from "./MovieItem/MovieItem";

const MovieList = forwardRef(({ movies }, ref) => {
  return (
    <ul className={css.movieList} ref={ref}>
      {movies &&
        movies.map(
          ({
            id,
            title,
            vote_average: vote,
            release_date: released,
            poster_path: poster,
          }) => {
            const movieProps = { id, title, vote, released, poster };
            return <MovieItem key={id} {...movieProps} />;
          }
        )}
    </ul>
  );
});

MovieList.displayName = "MovieList";

export default MovieList;
