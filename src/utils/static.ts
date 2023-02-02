import { IRoute } from "../types/navigation.types"

export const ROUTES = {
    MAIN: "/",
    SINGIN: "/singin",
    SINGUP: "/singup",
    MOVIES: "/movies",
    SINGLEMOVIE: "/movies/:id",
    SINGOUT: "/singout",
    CREATEMOVE: "/create"
}

export const NAVIGATION_ROUTES: IRoute[] = [
    {
        name: "Singin",
        path: ROUTES.SINGIN,
        perms: {
            requiredAuth: false,
            guestOnly: true,
            adminOnly: false
        }
    },
    {
        name: "Singup",
        path: ROUTES.SINGUP,
        perms: {
            requiredAuth: false,
            guestOnly: true,
            adminOnly: false
        }
    },
    {
        name: "Singout",
        path: ROUTES.SINGOUT,
        perms: {
            requiredAuth: true,
            guestOnly: false,
            adminOnly: false
        }
    },
    {
        name: "Movies",
        path: ROUTES.MOVIES,
        perms: {
            requiredAuth: true,
            guestOnly: false,
            adminOnly: false
        }
    },
    {
        name: "Create Movie",
        path: ROUTES.CREATEMOVE,
        perms: {
            requiredAuth: true,
            guestOnly: false,
            adminOnly: true
        }
    },
]

export const SITE: IRoute =
{
    name: "IMDB",
    path: "/",
    perms: {
        requiredAuth: false,
        guestOnly: true,
        adminOnly: false
    }
}

export const ENDPOINTS = {
    SINGIN: "/auth/singin",
    SINGUP: "/auth/singup",
    SINGOUT: "/auth/singout",
    MOVIES: "/movies",
    SEARCH: "/movies/find",
    GENRES: "/genres",
    CREATEMOVIE: "/movies/create",
    COMMNETS: "/comments",
    CREATECOMMENT: "/comments/create"
}

export type StorageKeys = "user"

export const DEFAULT_QUERY_OPTIONS = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            refetchOnReconnect: true,
            refetchOnMount: true,
        },
    },
};
