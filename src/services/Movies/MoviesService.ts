import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { IMovie } from "../../types/movie.types";

class MovieService {
  private httpService = httpService;

  getAll = async () => {
    return await this.httpService.request<IMovie[]>({
      url: ENDPOINTS.MOVIES,
      method: "GET",
    });
  };
}
export const movieService = new MovieService();
