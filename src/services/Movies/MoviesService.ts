import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { IMovie, IMovieDraft } from "../../types/movie.types";
import { Pagination } from "../../types/pagination.types";

class MovieService {
  private httpService = httpService;

  getAll = async (page: number) => {
    return await this.httpService.request<Pagination<IMovie[]>>({
      url: `${ENDPOINTS.MOVIES}?page=${page}`,
      method: "GET",
    });
  };

  gatSingleMovie = async (id: string) => {
    return await this.httpService.request<IMovie>({
      url: `/movies/${id}`,
      method: "GET",
    });
  };


  createMovie = async (data: IMovieDraft) => {
    return await this.httpService.request<IMovieDraft>({
      url: ENDPOINTS.CREATEMOVIE,
      method: "POST",
      data,
    });
  };

}
export const movieService = new MovieService();
