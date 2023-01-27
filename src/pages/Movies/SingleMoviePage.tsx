import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { CardMedia, Chip } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../queries/movie.query";
import { IGenre } from "../../types/movie.types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  const { id } = useParams();

  const { data: movie } = useGetMovieByIdQuery(id || "");

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
        </Grid>
      </Box>
    </Container>
  );
}
