export interface IRoute {
    name: string,
    path: string,
    perms: IPerams
}
export interface IPerams {
    requiredAuth: boolean,
    guestOnly: boolean
}