import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <>
      {/* <p>Movies page</p> */}
      <MovieList movies={movies} />
    </>
  );
}
