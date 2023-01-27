import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { NAVIGATION_ROUTES, ROUTES } from "../utils/static";

const useAuthGuard = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const perms = NAVIGATION_ROUTES.find(
    (route) => route.path === location.pathname
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!perms) return;
    if (!user && perms?.perms.requiredAuth) {
      navigate(ROUTES.SINGIN);
      return;
    }
    if (user && perms?.perms.guestOnly) {
      navigate(-1);
    }
    if (user && perms?.perms.adminOnly && !user.isAdmin) {
      navigate(-1);
    }
  });
};
export default useAuthGuard;
