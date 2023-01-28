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

interface Props {
  movie: IMovie;
}

const MoviseComponent = ({ movie }: Props) => {
  return (
    <Grid item xs={8} sm={3} md={3} key={movie._id}>
      <Card sx={{ maxWidth: 400, height: 500 }}>
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
                index < 2 && <Chip key={genre?._id} label={genre?.name} />
            )}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            300 views • created 3w ago
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href={`
            /movies/${movie._id}
          `}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MoviseComponent;
