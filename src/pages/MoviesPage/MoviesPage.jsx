import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

import { fecthMovieByQuery } from "../../api/movies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { useEffect } from "react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const movieListRef = useRef(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [params, setParams] = useSearchParams();
  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);

  const query = params.get("query") ?? "";
  const page = Number(params.get("page") ?? 1);

  const clearMovies = () => {
    setMovies([]);
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    params.set("page", newPage);
    setParams(params);
    setIsLoadMoreClicked(true);
  };

  useEffect(() => {
    if (!query) return;
    const getMoviesByQuery = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const { totalPages, queryResults } = await fecthMovieByQuery(
          query,
          page
        );
        setMovies(prevMovies => {
          return [...prevMovies, ...queryResults];
        });
        setTotalPages(totalPages);
        setHasSearched(true);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByQuery();
  }, [page, query]);

  useEffect(() => {
    if (page > 1) {
      const timerId = setTimeout(() => {
        if (movieListRef.current) {
          const lastItem = movieListRef.current.querySelector("li:last-child");
          if (lastItem) {
            const cardHeight = lastItem.getBoundingClientRect().height;
            window.scrollBy({
              top: cardHeight * 2,
              behavior: "smooth",
            });
          }
        }
      }, 200);
      return () => clearTimeout(timerId);
    }
  }, [page, movies]);

  return (
    <div className={css.moviesPage}>
      <SearchBar clearMovies={clearMovies} />
      <MovieList movies={movies} ref={movieListRef} />
      {isError && (
        <ErrorMessage>
          Something went wrong... Please, reload the page
        </ErrorMessage>
      )}
      {hasSearched && movies.length === 0 && !isLoading && !isError && (
        <ErrorMessage>
          There are no movies matching &quot;{query}&quot;
        </ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <div className='loadMoreWrapper'>
        {!isLoading && !isError && movies.length > 0 && page < totalPages && (
          <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
        )}
      </div>
    </div>
  );
}
