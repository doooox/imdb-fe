import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AUTH_ROUTES, NAVIGATION_ROUTES, ROUTES } from "../utils/static";

const useAuthGuard = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const perms =
    NAVIGATION_ROUTES.find((route) => route.path === location.pathname) ||
    AUTH_ROUTES.find((route) => route.path === location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(perms);
    if (!perms) return;
    if (!user && perms?.perms.requiredAuth) {
      navigate(ROUTES.SINGIN);
      return;
    }
    if (user && perms?.perms.guestOnly === true) {
      navigate(-1);
    }
  });
};
export default useAuthGuard;
