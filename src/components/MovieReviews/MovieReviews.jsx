import css from "./MovieReviews.module.css";
import { useEffect, useState, useRef } from "react";
import { fecthMovieReviews } from "../../api/movies";
import { useParams } from "react-router-dom";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { formatDate } from "../../helpers/format_date";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);
  const LoadMoreRef = useRef();
  const lastReviewRef = useRef(null);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    const getMovieCreditsData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const { reviews } = await fecthMovieReviews(movieId);
        setMovieReviews(reviews);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCreditsData();
  }, [movieId]);

  useEffect(() => {
    if (visibleCount > 2 && lastReviewRef.current) {
      const reviewItem = lastReviewRef.current;
      const reviewItemHeight = reviewItem.getBoundingClientRect().height;
      const maxScrollDistance = reviewItemHeight * 2;
      const offsetTop = reviewItem.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = Math.min(
        offsetTop,
        window.scrollY + maxScrollDistance
      );

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
  }, [visibleCount]);

  // useEffect(() => {
  //   if (movieReviews.length > 0 && firstReviewRef.current) {
  //     const cardHeight = firstReviewRef.current.getBoundingClientRect().height;
  //     window.scrollBy({ top: cardHeight, behavior: "smooth" });
  //   }
  // }, [movieReviews]);

  return (
    <>
      {!isLoading && movieReviews.length === 0 && (
        <ErrorMessage>No reviews yet...</ErrorMessage>
      )}
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <ul className={css.reviewsList}>
        {movieReviews
          .slice(0, visibleCount)
          .map(({ author, created_at: posted, id, content }, index) => {
            return (
              <li
                key={id}
                ref={index === visibleCount - 1 ? lastReviewRef : null}>
                <div className={css.reviewWrapper}>
                  <p className={css.author}>{author}</p>
                  <p className={css.posted}>{formatDate(posted)}</p>
                  <p className={css.content}>{content}</p>
                </div>
              </li>
            );
          })}
      </ul>
      <div className='loadMoreWrapper' ref={LoadMoreRef}>
        {visibleCount < movieReviews.length && (
          <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
        )}
      </div>
    </>
  );
}
