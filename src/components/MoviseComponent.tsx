import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { IMovie } from "../types/movie.types";

interface Props {
  movie: IMovie;
}

const MoviseComponent = ({ movie }: Props) => {
  return (
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
  );
};

export default MoviseComponent;
