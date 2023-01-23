import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ROUTES } from "../utils/static";

type IProps = {
  routeProtection: boolean;
};

const useAuthGuard = ({ routeProtection }: IProps) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && routeProtection) {
      navigate(ROUTES.MAIN);
      return;
    }
    if (user && !routeProtection) {
      navigate(ROUTES.MOVIES);
    }
  });
};
export default useAuthGuard;
