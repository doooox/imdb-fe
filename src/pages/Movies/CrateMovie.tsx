import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Chip,
  Container,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { ROUTES } from "../../utils/static";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import useAuthGuard from "../../hooks/useAuthGuard";
import { IError } from "../../types/error.types";
import { AxiosError } from "axios";
import { IGenre, IMovieDraft } from "../../types/movie.types";
import { movieService } from "../../services/Movies/MoviesService";
import { useGetGenresQuery } from "../../queries/genres.query";
import useInfoMessages from "../../hooks/useInfoMessages";

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

const CreateMovie = () => {
  useAuthGuard();
  const [genreName, setGemreMame] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof genreName>) => {
    const {
      target: { value },
    } = event;
    setGemreMame(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { getFormatedMessages, setError, setSuccess } = useInfoMessages();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMovieDraft>();
  const { data: genres } = useGetGenresQuery();

  const { mutate: create } = useMutation(movieService.createMovie, {
    onSuccess: () => {
      setLoading(false);
      setSuccess(["Movie Created Successfuly"]);
      reset();
    },
    onError: (error: AxiosError<IError>) => {
      setLoading(false);
      setError(error);
    },
  });

  const onSubmit: SubmitHandler<IMovieDraft> = (data) => {
    setLoading(true);
    create({
      title: data.title,
      description: data.description,
      coverImage: data.coverImage,
      genre: data.genre.map((genre) => {
        return {
          _id: genre._id,
        };
      }),
    });
  };

  const { setLoading } = useContext(LoadingContext);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Movie
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Movie title"
                fullWidth
                autoFocus
                {...register("title", {
                  required: "Movie title is requiered",
                  minLength: {
                    value: 2,
                    message: "Title must have at least 2 character!",
                  },
                })}
              />
              {errors.title && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    {errors.title?.message}
                  </Alert>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}>
              {/* description Field */}
              <TextField
                fullWidth
                label="Movie description"
                {...register("description", {
                  required: "Movie description is requiered",
                  minLength: {
                    value: 10,
                    message: "Description must have at least 10 character!",
                  },
                })}
              />
              {errors.description && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    {errors.description?.message}
                  </Alert>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("coverImage", {
                  required: "coverImage is requiered",
                  pattern: {
                    value:
                      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/,
                    message: "Not a valid url",
                  },
                })}
                label="Cover image"
              />
            </Grid>
            {errors.coverImage && (
              <Stack sx={{ width: "100%", ml: 3 }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {errors.coverImage?.message}
                </Alert>
              </Stack>
            )}
            <Grid item xs={12}>
              <InputLabel>Genres</InputLabel>
              <Select
                {...register("genre", {
                  required: "Movie genres are requiered",
                })}
                multiple
                value={genreName}
                onChange={handleChange}
                input={<OutlinedInput label="Genres" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {genres?.map((genre: IGenre) => (
                  <MenuItem key={genre._id} value={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.genre && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    {errors.genre?.message}
                  </Alert>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {getFormatedMessages()}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={ROUTES.SINGIN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateMovie;
