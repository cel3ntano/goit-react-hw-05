import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar({ clearMovies }) {
  const [, setParams] = useSearchParams();
  const [prevQuery, setPrevQuery] = useState("");

  const handleSearch = newQuery => {
    setParams({ query: newQuery, page: 1 });
    clearMovies();
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value.trim();
    const emptyQuery = () =>
      toast.error("Please enter a search query", {
        duration: 20000,
      });
    const sameQuery = () =>
      toast.error(`Already showing results for '${newQuery}'`, {
        duration: 2000,
      });
    if (newQuery === "") {
      emptyQuery();
      return;
    }
    if (newQuery === prevQuery) {
      sameQuery();
      return;
    }
    handleSearch(newQuery);
    setPrevQuery(newQuery);
    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input name='search' type='text' placeholder='Search movies'></input>
      <button type='submit'>
        <CiSearch size='22px' />
      </button>
      <Toaster
        containerStyle={{
          top: 75,
        }}
        toastOptions={{
          style: {
            // backgroundColor: "#f7b5b559",
            backgroundColor: "#542f2fbd",
            // border: "1px solid #757575",
            padding: "3px 5px",
            color: "#bababa",
            marginTop: "16px",
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
  );
}
