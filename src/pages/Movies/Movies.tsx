import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IMovie } from "../../types/movie.types";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Container } from "@mui/system";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useGetMoviesQuery } from "../../queries/movie.query";

const Movies = () => {
  useAuthGuard();
  const { setLoading } = useContext(LoadingContext);

  const { data: movies, isLoading, error } = useGetMoviesQuery();

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
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {movies?.map((movie: IMovie) => (
            <Grid item xs={2} sm={4} md={4} key={movie._id}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 350 }}
                  image={movie.coverImage}
                  title="Movie cover image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.genre.map((gen) => (
                      <small
                        style={{ fontSize: "0.7rem", margin: "0.2rem" }}
                        key={gen._id}
                      >
                        {gen.name}
                      </small>
                    ))}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    300 views • created 3w ago
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
export default Movies;
