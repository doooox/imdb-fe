import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { ILikeData, StateType } from "../../types/movie.types";

class LikeService {
    private httpService = httpService;

    createLikesDislikes = async (data: { movieId: string, state: StateType }) => {
        return await this.httpService.request<ILikeData>({
            url: `${ENDPOINTS.LIKES}${data.movieId}`,
            method: "PUT",
            data: {
                state: data.state
            }
        });
    };
}
export const likeService = new LikeService();
