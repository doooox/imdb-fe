export interface ICommentDraft {
    body: string,
}
export interface IComment extends ICommentDraft {
    _id: string,
}
export interface ICreateComment extends ICommentDraft {
    movieId: string
}