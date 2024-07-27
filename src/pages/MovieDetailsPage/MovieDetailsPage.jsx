import { useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { fecthMovieById, posterBaseURL } from "../../api/movies";
import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { format, parseISO } from "date-fns";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

    // return () => {
    //   second;
    // };

    getMovieDetailsById();
    // console.log(runtime, released);
  }, [movieId]);

  const { genres, runtime, overview, homepage, vote, poster, title, released } =
    movieDetails;

  const formatDate = dateString => {
    if (!dateString) return;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return;
    }
    return format(date, "dd MMM yyyy");
  };

  const posterSrc = `${posterBaseURL}${poster}`;

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  return (
    <>
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
                  <p>Duration: {formatDuration(runtime)}</p>
                </li>
                <li>
                  <p>Rating: {vote}</p>
                </li>
                <li>
                  <p> Release date: {formatDate(released)}</p>
                  {/* <p> Release date: {released}</p> */}
                </li>
                <li>
                  <a href={homepage}>Movie official page</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
