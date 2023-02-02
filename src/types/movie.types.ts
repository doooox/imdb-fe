import { IComment } from "./comments.types"

export interface IMovieDraft {
    title: string,
    description: string,
    coverImage: string,
    genres: IGenre[]
    comments?: IComment[]
}

export interface IMovie extends IMovieDraft {
    _id: string,
}

export interface IGenre {
    _id: string,
    name?: string
}

export interface ISerchMovies {
    title: string,
    _id: string
}
export interface IMovieFilter {
    _id: string
}