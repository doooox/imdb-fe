import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IMovie } from "../../types/movie.types";
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import useAuthGuard from "../../hooks/useAuthGuard";
import { Container } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { useGetMoviesQuery } from "../../queries/movie.query";
import useErrors from "../../hooks/useInfoMessages";
import MoviseComponent from "../../components/MoviseComponent";
import { useLocation } from "react-router-dom";
import PaginationComponent from "../../components/PaginationComponen";
import { useGetGenresQuery } from "../../queries/genres.query";
import { ROUTES } from "../../utils/static";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Movies = () => {
  const location = useLocation();
  const getPage = useCallback(() => {
    return Number(location.search.replace("?page=", "")) || 1;
  }, [location.search]);

  useAuthGuard();
  const { getFormatedMessages, setError } = useErrors();
  const { setLoading } = useContext(LoadingContext);
  const [genresName, setGenresName] = useState<string[]>([]);
  const { data: genres } = useGetGenresQuery();
  const formatFilter = () => {
    return genresName.map((genre) => {
      return {
        _id: genre,
      };
    });
  };

  const {
    data: paginatedMovies,
    isLoading,
    error,
    refetch,
  } = useGetMoviesQuery(formatFilter(), getPage());

  const movies = () => paginatedMovies?.data || [];
  const getCount = () => {
    let count = 1;
    if (paginatedMovies && paginatedMovies.metadata) {
      count = Math.ceil(
        paginatedMovies.metadata.total /
          paginatedMovies.metadata.paginationLimit
      );
    }
    return count;
  };

  const handleChange = (event: SelectChangeEvent<typeof genresName>) => {
    const {
      target: { value },
    } = event;
    setGenresName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    refetch();
  }, [genresName]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    refetch();
  }, [getPage]);

  return (
    <>
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
        <InputLabel>Genres</InputLabel>
        <Select
          multiple
          value={genresName}
          onChange={handleChange}
          input={<OutlinedInput label="Genres" />}
          MenuProps={MenuProps}
        >
          {genres?.map((genre) => (
            <MenuItem key={genre._id} value={genre._id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {movies().map((movie: IMovie) => (
              <MoviseComponent
                movie={movie}
                key={movie._id}
                refetch={refetch}
              />
            ))}
          </Grid>
        </Box>
      </Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "10vh" }}
      >
        <Grid>
          <PaginationComponent route={ROUTES.MOVIES} count={getCount()} />
        </Grid>
      </Grid>
    </>
  );
};
export default Movies;
