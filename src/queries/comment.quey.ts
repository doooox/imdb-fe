import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IComment } from "../types/comments.types";
import { IError } from "../types/error.types";
import { commentsService } from "../services/Comments/CommentsService"
import { Pagination } from "../types/pagination.types";
import { QUERY_KEYS } from "../utils/querykeys";

export const useGetMoviesCommentsQuery = (id: string, page: number) => {
    return useQuery<Pagination<IComment[]>, AxiosError<IError>>([QUERY_KEYS.COMMENTS], async () => await commentsService.getMovieComments(id, page))
}
