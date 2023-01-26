import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IMovie } from "../../types/movie.types";
import { Typography } from "@mui/material";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Container } from "@mui/system";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useGetMoviesQuery } from "../../queries/movie.query";
import useErrors from "../../hooks/useInfoMessages";
import MoviseComponent from "../../components/MoviseComponent";

const Movies = () => {
  useAuthGuard();
  const { getFormatedMessages, setError } = useErrors();
  const { setLoading } = useContext(LoadingContext);

  const { data: movies, isLoading, error } = useGetMoviesQuery();

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <Container component="main">
      <Typography
        variant="h3"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 900,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
        style={{ marginBottom: "2rem" }}
      >
        MOVIE LIST
        {getFormatedMessages()}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {movies?.map((movie: IMovie) => (
            <MoviseComponent movie={movie} key={movie._id} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
export default Movies;
