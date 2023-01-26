import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { genresService } from "../services/Movies/GenresService";
import { IError } from "../types/error.types";
import { IGenre } from "../types/movie.types";
import { QUERY_KEYS } from "../utils/querykeys";

export const useGetGenresQuery = () => {
    return useQuery<IGenre[], AxiosError<IError>>([QUERY_KEYS.GENRES], async () => await genresService.getMovieGenres())
}

