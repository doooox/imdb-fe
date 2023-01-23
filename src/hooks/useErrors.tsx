import { Alert, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { IError } from "../types/error.types";

function useErrors() {
  const [error, setError] = useState<AxiosError<IError> | undefined>(undefined);

  const getFormatedErrors = () => {
    return error?.response?.data.errors.map((error) => (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity="error">
          {error.msg}
        </Alert>
      </Stack>
    ));
  };
  return { getFormatedErrors, setError };
}

export default useErrors;
