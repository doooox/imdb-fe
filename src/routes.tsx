import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SinginPage from "./pages/Auth/SinginPage";
import SingupPage from "./pages/Auth/SingupPage";
import { ROUTES } from "./utils/static";
import Movies from "./pages/Movies/Movies";
import SingoutPage from "./pages/Auth/SingoutPage";
import CreateMovie from "./pages/Movies/CrateMovie";
import SingleMoviePage from "./pages/Movies/SingleMoviePage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<Navigation />}>
        <Route index={true} path={ROUTES.MOVIES} element={<Movies />} />
        <Route path={ROUTES.SINGIN} element={<SinginPage />} />
        <Route path={ROUTES.SINGUP} element={<SingupPage />} />
        <Route path={ROUTES.SINGOUT} element={<SingoutPage />} />
        <Route path={ROUTES.CREATEMOVE} element={<CreateMovie />} />
        <Route path={ROUTES.SINGLEMOVIE} element={<SingleMoviePage />} />
      </Route>

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
};

export default AppRoute;
