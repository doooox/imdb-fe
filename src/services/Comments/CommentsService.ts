import { httpService } from "../HttpService";
import { ENDPOINTS } from "../../utils/static";
import { IComment, ICreateComment } from "../../types/comments.types";
import { Pagination } from "../../types/pagination.types";

class CommentsService {
    private httpService = httpService;

    getMovieComments = async (id: string, page: number) => {
        return await this.httpService.request<Pagination<IComment[]>>({
            url: `${ENDPOINTS.COMMNETS}/${id}/?page=${page}`,
            method: "GET",
        });
    };

    createComment = async (data: ICreateComment) => {
        return await this.httpService.request<IComment>({
            url: `${ENDPOINTS.CREATECOMMENT}/${data.movieId}`,
            method: "POST",
            data,
        });
    };

}
export const commentsService = new CommentsService();
