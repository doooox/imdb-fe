import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { IMovie, IMovieDraft, IMovieFilter, ISerchMovies } from "../../types/movie.types";
import { Pagination } from "../../types/pagination.types";

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
    return await this.httpService.request<ISerchMovies[]>({
      url: `${ENDPOINTS.SEARCH}?search=${query}`,
      method: "GET",
    });
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
