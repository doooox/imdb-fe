import useAuthGuard from "../../hooks/useAuthGuard";

function Movies() {
  useAuthGuard();

  return <div>Movies</div>;
}

export default Movies;
