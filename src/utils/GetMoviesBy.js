import { getMoviesApi } from "@/services/movies"

export async function getMoviesByKeyword(keyword) {
  let movies = await getMoviesApi({ per: 250 });
  movies = movies.list;
  let targetMovies = movies.filter((item) => {
    if (item.name.search(keyword) > -1) {
      return item;
    }
  })
  return targetMovies;
}