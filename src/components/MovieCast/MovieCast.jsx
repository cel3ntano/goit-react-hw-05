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

  const lastElementRef = useRef(null);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

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

  useEffect(() => {
    if (visibleCount > 5) {
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleCount]);

  console.log(movieCredits);

  return (
    <>
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
              index,
              array
            ) => {
              const profileImgSrc = profileImg
                ? `${posterBaseURL}${profileImg}`
                : placeholderPortrait;
              return (
                <li
                  key={id}
                  ref={index === array.length - 1 ? lastElementRef : null}>
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
      <div className='loadMoreWrapper'>
        {visibleCount < movieCredits.length && (
          <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
        )}
      </div>
    </>
  );
}
