import { Link, useLocation } from "react-router-dom";
import css from "./MovieItem.module.css";
import { placeholderPortrait, posterBaseURL } from "../../../api/movies";
import { formatDate } from "../../../helpers/format_date";
import clsx from "clsx";

export default function MovieItem({ id, title, vote, released, poster }) {
  const location = useLocation();

  const imgSrc = poster ? `${posterBaseURL}${poster}` : placeholderPortrait;
  const voteClass = clsx({
    [css.low]: vote < 4,
    [css.middle]: vote >= 4 && vote <= 6,
    [css.high]: vote > 6,
  });
  return (
    <li className={css.movieItem}>
      <Link to={`/movies/${id}`} state={location}>
        <img src={imgSrc} alt={title} height='220'></img>
        <div className={css.movieDetails}>
          <p className={clsx(css.vote, voteClass)}>
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
