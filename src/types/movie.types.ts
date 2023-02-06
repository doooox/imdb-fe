import { IComment } from "./comments.types"

export interface IMovieDraft {
    title: string,
    description: string,
    coverImage: string,
    genres: IGenre[]
    comments?: IComment[],
    likeData?: ILikeData
}

export interface IMovie extends IMovieDraft {
    _id: string,
    views: number
}

export interface IGenre {
    _id: string,
    name?: string
}

export interface IMovieFilter {
    _id: string
}
export interface ILikeData extends ILikeDataDraft {
    _id: string,
    totalLikes: number,
    totalDislikes: number
    movie: string
}

export interface ILikeDataDraft {
    state: StateType
}
export type StateType = "like" | "dislike" | "none"

export type AlgoliaHits = {
    hits: AlgoliaHit[];
};
export type AlgoliaHit = {
    objectID: string,
    name: string
};