import css from "./MovieDetailsPage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import { formatDate } from "../../helpers/format_date";
import { getNavlinkClass } from "../../helpers/getNavlinkClass";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense } from "react";
import clsx from "clsx";
import {
  fecthMovieById,
  placeholderPortrait,
  posterBaseURL,
} from "../../api/movies";

export default function MovieDetailsPage() {
  const location = useLocation();
  const goBackBtnRef = useRef(location?.state ?? "/movies");

  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    genres: [],
    runtime: null,
    overview: "",
    homepage: "",
    vote: null,
    poster: "",
    title: "",
    released: "",
  });

  useEffect(() => {
    const getMovieDetailsById = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const {
          genres,
          runtime,
          overview,
          homepage,
          vote_average: vote,
          poster_path: poster,
          original_title: title,
          release_date: released,
        } = await fecthMovieById(movieId);
        setMovieDetails({
          genres,
          runtime,
          overview,
          homepage,
          vote,
          poster,
          title,
          released,
        });
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetailsById();
  }, [movieId]);

  const { genres, runtime, overview, homepage, vote, poster, title, released } =
    movieDetails;

  const posterSrc = poster ? `${posterBaseURL}${poster}` : placeholderPortrait;

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  const voteClass = clsx({
    [css.low]: vote < 4,
    [css.middle]: vote >= 4 && vote <= 6,
    [css.high]: vote > 6,
  });

  return (
    <>
      <GoBackButton path={goBackBtnRef.current}>Go back</GoBackButton>
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      {!isLoading && !isError && movieDetails && (
        <div className={css.movieDetailsWrapper}>
          <h2 className={css.title}>{title}</h2>
          <ul className={css.movieDetailsList}>
            <li className={css.poster}>
              <img src={posterSrc} alt={title}></img>
            </li>
            <li>
              <ul className={css.movieDescriptionList}>
                <li>
                  <h3>Genres:</h3>
                  <ul className={css.genresList}>
                    {genres.map((genre, index) => {
                      return (
                        <li key={genre.id}>
                          <p>
                            {genre.name}
                            {index < genres.length - 1 && ", "}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <p className={css.overview}>{overview}</p>
                </li>
                <li>
                  <p>
                    Duration:
                    <span>{formatDuration(runtime)}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Rating:
                    <span className={clsx(css.vote, voteClass)}>
                      {vote !== null ? vote.toFixed(1) : "N/A"}
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    Release date:
                    <span>{formatDate(released)}</span>
                  </p>
                </li>
                <li className={css.homePageItem}>
                  <a href={homepage} target='_blank'>
                    Movie official page
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className={css.additionalInfoNavigation}>
            <h3 className={css.additionalInfoTitle}>Additional information</h3>
            <ul className={css.additionalInfoButtons}>
              <li>
                <NavLink
                  to='cast'
                  className={({ isActive }) =>
                    getNavlinkClass(css, { isActive })
                  }>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='reviews'
                  className={({ isActive }) =>
                    getNavlinkClass(css, { isActive })
                  }>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={css.additionalInfoWrapper}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
