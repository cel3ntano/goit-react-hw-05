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
    if (visibleCount > 2) {
      LoadMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleCount]);

  return (
    <>
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <ul className={css.reviewsList}>
        {movieReviews
          .slice(0, visibleCount)
          .map(({ author, created_at: posted, id, content }) => {
            return (
              <li key={id}>
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
