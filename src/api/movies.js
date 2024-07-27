import axios from "axios";
// const accessKey = import.meta.env.VITE_tmdb_api;
const readToken = import.meta.env.VITE_tmdb_token;
axios.defaults.baseURL = "https://api.themoviedb.org";
axios.defaults.headers.common = { Authorization: `Bearer ${readToken}` };
const trendingURL = "/3/trending/movie/day";
const detailsURL = "/3/movie";
const queryURL = "/3/search/movie";

export const posterBaseURL = "https://image.tmdb.org/t/p/w500";

export async function fetchTrendingMovies(page) {
  const response = await axios.get(trendingURL, { params: { page } });
  const { total_pages: totalPages, results: trendingResults } = response.data;
  return { totalPages, trendingResults };
}

export async function fecthMovieById(movieId) {
  const response = await axios.get(`${detailsURL}/${movieId}`);
  return response.data;
}

export async function fecthMovieByQuery(query, page) {
  const response = await axios.get(queryURL, { params: { query, page } });
  const { total_pages: totalPages, results: queryResults } = response.data;
  return { totalPages, queryResults };
}
