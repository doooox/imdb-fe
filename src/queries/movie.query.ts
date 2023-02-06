import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { movieService } from "../services/Movies/MoviesService";
import { IError } from "../types/error.types";
import { AlgoliaHits, IMovie, IMovieFilter } from "../types/movie.types";
import { Pagination } from "../types/pagination.types";
import { QUERY_KEYS } from "../utils/querykeys";


export const useGetMoviesQuery = (genres: IMovieFilter[], page = 1) => {
    return useQuery<Pagination<IMovie[]>, AxiosError<IError>>([QUERY_KEYS.MOVIES], async () => await movieService.getAll(page, genres))
}
export const useGetSearchedMovies = (query: string) => {
    return useQuery<AlgoliaHits>([QUERY_KEYS.SEARCH], async () => await movieService.getSearchedMovies(query), {
        retry: 0
    })
}
export const useGetMovieByIdQuery = (id: string) => {
    return useQuery<IMovie, AxiosError<IError>>([QUERY_KEYS.MOVIE], async () => await movieService.gatSingleMovie(id))
}



