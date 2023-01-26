export interface IMovieDraft {
    title: string,
    description: string,
    coverImage: string,
    genres: IGenre[]
}

export interface IMovie extends IMovieDraft {
    _id: string,

}

export interface IGenre {
    _id: string,
    name?: string
}
