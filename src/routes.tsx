import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SinginPage from "./pages/Auth/SinginPage";
import SingupPage from "./pages/Auth/SingupPage";
import { ROUTES } from "./utils/static";
import Movies from "./pages/Movies/Movies";

const AppRoute = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<Navigation />}>
        <Route index={true} path={ROUTES.MOVIES} element={<Movies />} />
        <Route path={ROUTES.SINGIN} element={<SinginPage />} />
        <Route path={ROUTES.SINGUP} element={<SingupPage />} />
      </Route>

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};

export default AppRoute;
