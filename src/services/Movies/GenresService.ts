import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { IGenre } from "../../types/movie.types";

class GenresService {
    private httpService = httpService;

    getMovieGenres = async () => {
        return await this.httpService.request<IGenre[]>({
            url: ENDPOINTS.GENRES,
            method: "GET",
        });
    };
}
export const genresService = new GenresService();
