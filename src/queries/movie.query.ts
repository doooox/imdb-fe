import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services/Movies/MoviesService";
import { IMovie } from "../types/movie.types";
import { QUERY_KEYS } from "../utils/querykeys";

export const useGetMoviesQuery = () => {
    return useQuery<IMovie[]>([QUERY_KEYS.MOVIES], async () => await movieService.getAll())
}

