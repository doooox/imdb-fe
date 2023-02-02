import { IUser } from "./user.types"

export interface ICommentDraft {
    body: string,
}
export interface IComment extends ICommentDraft {
    _id: string,
    movieId: string,
    user: IUser
}
export interface ICreateComment extends ICommentDraft {
    movieId: string
}