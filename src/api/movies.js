import axios from "axios";
const readToken = import.meta.env.VITE_tmdb_token;
axios.defaults.baseURL = "https://api.themoviedb.org";
axios.defaults.headers.common = { Authorization: `Bearer ${readToken}` };
const trendingURL = "/3/trending/movie/day";
const detailsURL = "/3/movie";
const queryURL = "/3/search/movie";

const posterBaseURL = "https://image.tmdb.org/t/p/w500";
const placeholderPortrait =
  "https://dummyimage.com/500X750/3e3180/cacee6.jpg&text=Sorry,+no+poster+here";

async function fetchTrendingMovies(page) {
  const response = await axios(trendingURL, { params: { page } });
  const { total_pages: totalPages, results: trendingResults } = response.data;
  return { totalPages, trendingResults };
}

async function fecthMovieById(movieId) {
  const response = await axios(`${detailsURL}/${movieId}`);
  return response.data;
}

async function fecthMovieByQuery(query, page) {
  const response = await axios(queryURL, { params: { query, page } });
  const { total_pages: totalPages, results: queryResults } = response.data;
  return { totalPages, queryResults };
}

async function fecthMovieCredits(movieId) {
  const response = await axios(`${detailsURL}/${movieId}/credits`);
  const { cast } = response.data;
  return cast;
}

async function fecthMovieReviews(movieId, page) {
  const response = await axios(`${detailsURL}/${movieId}/reviews`, {
    params: { page },
  });
  const { results: reviews, total_pages: totalPages } = response.data;
  return { reviews, totalPages };
}

export {
  fetchTrendingMovies,
  fecthMovieById,
  fecthMovieByQuery,
  fecthMovieCredits,
  fecthMovieReviews,
  posterBaseURL,
  placeholderPortrait,
};
