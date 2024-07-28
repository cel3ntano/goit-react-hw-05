import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { fecthMovieReviews } from "../../api/movies";
import { useParams } from "react-router-dom";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    const getMovieCreditsData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setPage(1);
        const { reviews, totalPages } = await fecthMovieReviews(movieId, page);
        setMovieReviews(reviews);
        setTotalPages(totalPages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCreditsData();
  }, [movieId, page]);

  console.log(movieReviews);
  return (
    <>
      <p>Reviews</p>
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <div className='loadMoreWrapper'>
        {!isLoading &&
          !isError &&
          movieReviews.length > 0 &&
          page < totalPages && (
            <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
          )}
      </div>
    </>
  );
}
