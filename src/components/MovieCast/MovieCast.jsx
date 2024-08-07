import css from "./MovieCast.module.css";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import {
  fecthMovieCredits,
  placeholderPortrait,
  posterBaseURL,
} from "../../api/movies";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const LoadMoreRef = useRef();
  const firstCastRef = useRef(null);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  // useEffect(() => {
  //   if (movieCredits.length > 0 && firstCastRef.current) {
  //     const timerId = setTimeout(() => {
  //       const cardHeight = firstCastRef.current.getBoundingClientRect().height;
  //       window.scrollBy({ top: cardHeight * 0.5, behavior: "smooth" });
  //     }, 200);

  //     return () => clearTimeout(timerId);
  //   }
  // }, [movieCredits]);

  // useEffect(() => {
  //   if (visibleCount > 5) {
  //     const timerId = setTimeout(() => {
  //       if (LoadMoreRef.current) {
  //         LoadMoreRef.current.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }, 100);

  //     return () => clearTimeout(timerId);
  //   }
  // }, [visibleCount]);

  useEffect(() => {
    if (visibleCount > 5 && firstCastRef.current) {
      const cardHeight = firstCastRef.current.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight, behavior: "smooth" });
    }
  }, [visibleCount]);

  useEffect(() => {
    const getMovieCreditsData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const fetchedCredits = await fecthMovieCredits(movieId);
        setMovieCredits(fetchedCredits);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCreditsData();
  }, [movieId]);

  return (
    <>
      {!isLoading && movieCredits.length === 0 && (
        <ErrorMessage>No cast information found...</ErrorMessage>
      )}
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <ul className={css.creditsList}>
        {movieCredits
          .slice(0, visibleCount)
          .map(
            (
              { profile_path: profileImg, name, character, cast_id: id },
              index
            ) => {
              const profileImgSrc = profileImg
                ? `${posterBaseURL}${profileImg}`
                : placeholderPortrait;
              return (
                <li key={id} ref={index === 0 ? firstCastRef : null}>
                  <div>
                    <img src={profileImgSrc} alt={`${name} portrait`} />
                  </div>
                  <div className={css.actorDescription}>
                    <p className={css.actorName}>{name}</p>
                    <p>{character}</p>
                  </div>
                </li>
              );
            }
          )}
      </ul>
      <div className='loadMoreWrapper' ref={LoadMoreRef}>
        {visibleCount < movieCredits.length && (
          <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
        )}
      </div>
    </>
  );
}
