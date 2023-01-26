export interface IRoute {
    name: string,
    path: string,
    perms: IPerms
}
export interface IPerms {
    requiredAuth: boolean,
    guestOnly: boolean
    adminOnly: boolean
}