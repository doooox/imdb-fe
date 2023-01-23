import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/user.types";
import { ROUTES } from "../utils/static";
import {
  clearItemFormStorage,
  getItemFormStorage,
  setItemToStorage,
} from "../utils/storage";

const useUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(getItemFormStorage("user"));
  const login = (user: IUser) => {
    setUser(user);
    setItemToStorage("user", JSON.stringify(user));
    navigate(ROUTES.MOVIES);
  };
  const logout = () => {
    clearItemFormStorage("user");
    setUser(null);
    navigate(ROUTES.SINGIN);
  };

  return {
    user,
    setUser,
    login,
    logout,
  };
};

export default useUser;
