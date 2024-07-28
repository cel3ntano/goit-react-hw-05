import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { CiSearch } from "react-icons/ci";
import css from "./MoviesPage.module.css";

import toast, { Toaster } from "react-hot-toast";
import { fecthMovieByQuery } from "../../api/movies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { useEffect } from "react";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const movieListRef = useRef(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [params, setParams] = useSearchParams();
  // ===================================================================
  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value.trim();
    const emptyQuery = () =>
      toast.error("Please enter a search query", {
        duration: 2000,
      });
    const sameQuery = () =>
      toast.error(`Already showing results for '${newQuery}'`, {
        duration: 2000,
      });
    if (newQuery === "") {
      emptyQuery();
      return;
    }
    if (newQuery === query) {
      sameQuery();
      return;
    }
    setMovies([]);
    setPage(1);
    setQuery(newQuery);
    e.target.reset();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
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
    // console.log(movies);new date
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
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input name='search' type='text' placeholder='Search movies'></input>
        <button type='submit'>
          <CiSearch size='22px' />
        </button>
        <Toaster
          containerStyle={{
            top: 80,
          }}
          toastOptions={{
            style: {
              backgroundColor: "#6d6d6d",
              border: "1px solid #757575",
              padding: "8px",
              color: "#bababa",
              marginTop: "45px",
              maxWidth: "500px",
            },
            error: {
              iconTheme: {
                primary: "#c36060",
                secondary: "#dcdcdc",
              },
            },
          }}
        />
      </form>
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
