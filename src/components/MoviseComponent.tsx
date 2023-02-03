import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { IMovie } from "../types/movie.types";
import LikeComponent from "./LikeComponent";

interface Props {
  movie: IMovie;
  refetch: () => void;
}

const MoviseComponent = ({ movie, refetch }: Props) => {
  return (
    <Grid item xs={8} sm={3} md={3} key={movie._id}>
      <Card sx={{ maxWidth: 400, height: 550 }}>
        <CardMedia
          sx={{ height: 300 }}
          image={movie.coverImage}
          title="Movie cover image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {movie.genres.map(
              (genre, index) =>
                index < 2 && <Chip key={index} label={genre?.name} />
            )}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {movie.views} views • created 3w ago
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href={`
            /movies/${movie._id}
          `}
          >
            View movie
          </Button>
        </CardActions>
        <LikeComponent movie={movie} refetch={refetch} />
      </Card>
    </Grid>
  );
};

export default MoviseComponent;
