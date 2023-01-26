import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import useAuthGuard from "../../hooks/useAuthGuard";

const SingoutPage = () => {
  useAuthGuard();
  const { logout, user } = useContext(UserContext);

  useEffect(() => {
    if (user) logout();
  }, []);
  return <></>;
};

export default SingoutPage;
