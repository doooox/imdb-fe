export interface IMovieDraft {
    title: string,
    description: string,
    coverImage: string,
    genre: IGenre[]
}

export interface IMovie extends IMovieDraft {
    _id: string,

}

export interface IGenre {
    _id: string,
    name?: string
}
