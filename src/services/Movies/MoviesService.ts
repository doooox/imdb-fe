import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { IMovie, IMovieDraft } from "../../types/movie.types";

class MovieService {
  private httpService = httpService;

  getAll = async () => {
    return await this.httpService.request<IMovie[]>({
      url: ENDPOINTS.MOVIES,
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
