import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Alert,
  Button,
  CardMedia,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../queries/movie.query";
import { IGenre } from "../../types/movie.types";
import { useGetMoviesCommentsQuery } from "../../queries/comment.quey";
import { useCallback, useContext, useEffect } from "react";
import {
  IComment,
  ICommentDraft,
  ICreateComment,
} from "../../types/comments.types";
import PaginationComponent from "../../components/PaginationComponen";
import CommentsComponent from "../../components/CommentsComponent";
import { useMutation } from "@tanstack/react-query";
import { commentsService } from "../../services/Comments/CommentsService";
import { useForm } from "react-hook-form";
import useInfoMessages from "../../hooks/useInfoMessages";
import { LoadingContext } from "../../context/LoadingContext";
import { AxiosError } from "axios";
import { IError } from "../../types/error.types";
import { ROUTES } from "../../utils/static";
import { QUERY_KEYS } from "../../utils/querykeys";
import { emmitEvent, getSocket } from "../../services/SocketService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SingleMoviePage() {
  const { id } = useParams();
  const location = useLocation();
  const getPage = useCallback(() => {
    return Number(location.search.replace("?page=", "")) || 1;
  }, [location.search]);
  const { data: movie } = useGetMovieByIdQuery(id || "");
  const { data: paginatedComments, refetch } = useGetMoviesCommentsQuery(
    id || "",
    getPage()
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICommentDraft>();
  const { setLoading } = useContext(LoadingContext);

  const { getFormatedMessages, setError, setSuccess } = useInfoMessages();
  const { mutate: create } = useMutation(commentsService.createComment, {
    onSuccess: () => {
      setLoading(false);
      setSuccess(["Comment created"]);
      reset();
      refetch();
      emmitEvent("comment-added", "comment-room");
    },
    onError: (error: AxiosError<IError>) => {
      setLoading(false);
      setError(error);
    },
    mutationKey: [QUERY_KEYS.COMMENTS],
  });

  const onSubmitHandler = (data: ICommentDraft) => {
    if (!id) {
      return;
    }
    const payload: ICreateComment = {
      body: data.body,
      movieId: id,
    };
    create(payload);
  };

  useEffect(() => {
    refetch();
  }, [getPage]);

  getSocket().on("comment-added", () => {
    refetch();
  });

  const comments = () => paginatedComments?.data || [];
  const getCount = () => {
    let count = 1;
    if (paginatedComments && paginatedComments.metadata) {
      count = Math.ceil(
        paginatedComments.metadata.total /
          paginatedComments.metadata.paginationLimit
      );
    }
    return count;
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={6} md={12}>
            <Item>
              <h1>{movie?.title}</h1>
            </Item>
          </Grid>

          <Grid xs={6} md={4}>
            <CardMedia
              sx={{ height: 500 }}
              image={movie?.coverImage}
              title="Movie cover image"
              style={{ objectFit: "contain" }}
              component="img"
            />
          </Grid>
          <Grid xs={6} md={8}>
            <Item style={{ textAlign: "initial" }}>
              <h3>Description</h3>
              <p>{movie?.description}</p>
              {movie?.genres.map((genre: IGenre) => (
                <Chip
                  key={genre._id}
                  label={genre.name}
                  style={{ margin: "0.5rem" }}
                />
              ))}
            </Item>
          </Grid>
          <Grid xs={6} md={12}>
            {comments().map((comment: IComment) => (
              <CommentsComponent comment={comment} key={comment._id} />
            ))}
            <PaginationComponent
              route={ROUTES.SINGLEMOVIE.replace(":id", id || "")}
              count={getCount()}
            />
          </Grid>
          <Grid xs={6} md={12}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                label="Your comment"
                fullWidth
                autoFocus
                {...register("body", {
                  required: "Comment body is requiered",
                  maxLength: {
                    value: 500,
                    message: "Comment can't have more than 500 characters",
                  },
                })}
              />
              {getFormatedMessages()}
              {errors.body && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    {errors.body?.message}
                  </Alert>
                </Stack>
              )}
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
