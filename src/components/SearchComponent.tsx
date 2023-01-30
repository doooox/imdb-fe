import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { useGetSearchedMovies } from "../queries/movie.query";
import { CircularProgress } from "@mui/material";
import useErrors from "../hooks/useInfoMessages";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/static";

let debounce: number;

export default function SearchComponent() {
  const navigation = useNavigate();
  const [term, setNewTerm] = useState<string>("");
  const { getFormatedMessages, setError } = useErrors();
  const {
    data: searchedMovies,
    isLoading,
    error,
    refetch,
  } = useGetSearchedMovies(term);

  useEffect(() => {
    clearTimeout(debounce);
    debounce = window.setTimeout(() => {
      refetch();
    }, 750);
  }, [term]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  const onInputSelect = (value: { label: string; id: string } | null) => {
    return navigation(`${ROUTES.MOVIES}/${value?.id}`);
  };

  const mapMoviesToAutocompleteOptions = () => {
    if (!searchedMovies) return [];
    return searchedMovies.map((movie) => {
      return {
        label: movie.title,
        id: movie._id,
      };
    });
  };
  return (
    <Autocomplete
      disablePortal
      options={mapMoviesToAutocompleteOptions()}
      sx={{ width: 250 }}
      loading={isLoading}
      onChange={(e, value) => onInputSelect(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Movie"
          style={{ background: "white" }}
          value={term}
          onChange={(e) => setNewTerm(e.target.value || "")}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
                {getFormatedMessages()}
              </>
            ),
          }}
        />
      )}
    />
  );
}
