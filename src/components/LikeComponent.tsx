import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { IMovie, StateType } from "../types/movie.types";
import { useMutation } from "@tanstack/react-query";
import { likeService } from "../services/Movies/LikesService";
import useInfoMessages from "../hooks/useInfoMessages";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import { AxiosError } from "axios";
import { IError } from "../types/error.types";
import { emmitEvent, getSocket } from "../services/SocketService";

interface Props {
  movie: IMovie;
  refetch: () => void;
}

export default function LikeComponent({ movie, refetch }: Props) {
  const { setLoading, loading } = useContext(LoadingContext);
  const { getFormatedMessages, setError } = useInfoMessages();
  const { mutate: changeLikeState } = useMutation(
    likeService.createLikesDislikes,
    {
      onSuccess: () => {
        setLoading(false);
        refetch();
        emmitEvent("movie-liked", "liek-room");
      },
      onError: (error: AxiosError<IError>) => {
        setLoading(false);
        setError(error);
      },
    }
  );
  const handleLikeState = (state: "like" | "dislike") => {
    if (loading) return;
    let newState: StateType = "none";
    if (movie.likeData) {
      if (state === "like" && movie.likeData.state !== "like") {
        newState = "like";
      } else if (state === "dislike" && movie.likeData.state !== "dislike") {
        newState = "dislike";
      }
    } else {
      newState = state;
    }
    setLoading(true);
    changeLikeState({
      movieId: movie._id,
      state: newState,
    });
  };

  getSocket().on("movie-liked", () => {
    console.log("movie loked");
    refetch();
  });

  return (
    <Stack spacing={2} direction="row" sx={{ m: 2 }}>
      <Badge
        badgeContent={movie.likeData?.totalLikes}
        color="success"
        onClick={() => handleLikeState("like")}
      >
        <ThumbUpIcon color="action" />
      </Badge>
      <Badge
        badgeContent={movie.likeData?.totalDislikes}
        color="secondary"
        onClick={() => handleLikeState("dislike")}
      >
        <ThumbDownAltIcon color="action" />
      </Badge>
      {getFormatedMessages()}
    </Stack>
  );
}
