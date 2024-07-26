import axios from "axios";
// const accessKey = import.meta.env.VITE_tmdb_api;
const readToken = import.meta.env.VITE_tmdb_token;
axios.defaults.baseURL = "https://api.themoviedb.org";
axios.defaults.headers.common = { Authorization: `Bearer ${readToken}` };
const trendingURL = "/3/trending/movie/day";

export async function fetchTrendingMovies(page) {
  const response = await axios.get(trendingURL, { params: { page } });
  const { total_pages: totalPages, results: trendingResults } = response.data;
  return { totalPages, trendingResults };
}
