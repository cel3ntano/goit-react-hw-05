import { Link } from "react-router-dom";
import css from "./MovieList.module.css";
import { forwardRef } from "react";

const MovieList = forwardRef(({ movies }, ref) => {
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  return (
    <ul className={css.movieList} ref={ref}>
      {movies &&
        movies.map(({ id, title, vote_average, release_date, poster_path }) => {
          const imgSrc = `${imageBaseURL}${poster_path}`;
          return (
            <li className={css.movieItem} key={id}>
              <Link to={`/movies/${id}`}>
                <img src={imgSrc} alt={title}></img>
                <div className={css.movieDetails}>
                  <p>{vote_average}</p>
                  <p>{title}</p>
                  <p>{release_date}</p>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
});

MovieList.displayName = "MovieList";

export default MovieList;
