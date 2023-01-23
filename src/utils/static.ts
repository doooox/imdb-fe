import { IRoute } from "../types/navigation.types"

export const ROUTES = {
    MAIN: "/",
    SINGIN: "/singin",
    SINGUP: "/singup",
    MOVIES: "/movies",
    SINGOUT: "/singout"
}


export const NAVIGATION_ROUTES: IRoute[] = [
    {
        name: "Singin",
        path: ROUTES.SINGIN,
        perms: {
            requiredAuth: false,
            guestOnly: true
        }
    },
    {
        name: "Singup",
        path: ROUTES.SINGUP,
        perms: {
            requiredAuth: false,
            guestOnly: true
        }
    },
]

export const AUTH_ROUTES: IRoute[] = [
    {
        name: "Movies",
        path: ROUTES.MOVIES,
        perms: {
            requiredAuth: true,
            guestOnly: false
        }
    },
    {
        name: "Singout",
        path: ROUTES.SINGOUT,
        perms: {
            requiredAuth: true,
            guestOnly: false
        }
    },
]

export const SITE: IRoute =
{
    name: "IMDB",
    path: "/",
    perms: {
        requiredAuth: false,
        guestOnly: true
    }
}

export const ENDPOINTS = {
    SINGIN: "/auth/singin",
    SINGUP: "/auth/singup",
    SINGOUT: "/auth/singout"
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
