import { createContext } from "react";
import { IUser } from "../types/user.types";

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: (user: IUser) => Function,
  login: (user: IUser) => Function,
  logout: () => Function,
});
