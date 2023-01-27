import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { movieService } from "../services/Movies/MoviesService";
import { IError } from "../types/error.types";
import { IMovie } from "../types/movie.types";
import { QUERY_KEYS } from "../utils/querykeys";

export const useGetMoviesQuery = () => {
    return useQuery<IMovie[], AxiosError<IError>>([QUERY_KEYS.MOVIES], async () => await movieService.getAll())
}

export const useGetMovieByIdQuery = (id: string) => {
    return useQuery<IMovie, AxiosError<IError>>([QUERY_KEYS.MOVIE], async () => await movieService.gatSingleMovie(id))
}
