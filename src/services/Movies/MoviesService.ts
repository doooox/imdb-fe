import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { AlgoliaHits, IMovie, IMovieDraft, IMovieFilter } from "../../types/movie.types";
import { Pagination } from "../../types/pagination.types";
import algoliasearch from "algoliasearch";


const client = algoliasearch("6E6EFRMV26", "67c47bd4ead7615e80257d7b73042378")

export const algoliaindex = client.initIndex("movies")




class MovieService {
  private httpService = httpService;

  getAll = async (page: number, payload: IMovieFilter[]) => {
    return await this.httpService.request<Pagination<IMovie[]>>({
      url: `${ENDPOINTS.MOVIES}?page=${page}`,
      method: "GET",
      params: {
        genres: JSON.stringify(payload)
      }
    });
  };

  gatSingleMovie = async (id: string) => {
    return await this.httpService.request<IMovie>({
      url: `${ENDPOINTS.MOVIES}/${id}`,
      method: "GET",
    });
  };

  getSearchedMovies = async (query: string) => {
    const data: AlgoliaHits = await algoliaindex.search(query)
    console.log(data);
    return data
  }

  createMovie = async (data: IMovieDraft) => {
    return await this.httpService.request<IMovieDraft>({
      url: ENDPOINTS.CREATEMOVIE,
      method: "POST",
      data,
    });
  };

}
export const movieService = new MovieService();
