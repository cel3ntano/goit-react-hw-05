import { useEffect, useState, useRef } from "react";
import { fetchTrendingMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const movieListRef = useRef(null);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      const timerId = setTimeout(() => {
        if (movieListRef.current) {
          const lastItem = movieListRef.current.querySelector("li:last-child");
          const cardHeight = lastItem.getBoundingClientRect().height;
          // console.log(cardHeight);
          if (lastItem) {
            window.scrollBy({
              top: cardHeight * 2,
              behavior: "smooth",
            });
          }
        }
      }, 200);
      return () => clearTimeout(timerId);
    }
  }, [page, trendingMovies]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const { totalPages, trendingResults } = await fetchTrendingMovies(page);
        setTrendingMovies(prevTrendingMovies => {
          return [...prevTrendingMovies, ...trendingResults];
        });
        setTotalPages(totalPages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
    // console.log(totalPages, trendingMovies);
  }, [page]);

  return (
    <div className={css.homepage}>
      <MovieList movies={trendingMovies} ref={movieListRef} />
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <div className='loadMoreWrapper'>
        {!isLoading &&
          !isError &&
          trendingMovies.length > 0 &&
          page < totalPages && (
            <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
          )}
      </div>
    </div>
  );
}
