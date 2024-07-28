import { Link } from "react-router-dom";
import css from "./MovieList.module.css";
import { forwardRef } from "react";
import { placeholderPortrait, posterBaseURL } from "../../api/movies";
import { formatDate } from "../../helpers/format_date";

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
            const imgSrc = poster
              ? `${posterBaseURL}${poster}`
              : placeholderPortrait;
            return (
              <li className={css.movieItem} key={id}>
                <Link to={`/movies/${id}`}>
                  <img src={imgSrc} alt={title} height='220'></img>
                  <div className={css.movieDetails}>
                    <p className={css.vote}>
                      {vote !== null ? vote.toFixed(1) : "N/A"}
                    </p>
                    <p className={css.releaseDate}>
                      <span>{formatDate(released)}</span>
                    </p>
                    <p>{title}</p>
                  </div>
                </Link>
              </li>
            );
          }
        )}
    </ul>
  );
});

MovieList.displayName = "MovieList";

export default MovieList;
