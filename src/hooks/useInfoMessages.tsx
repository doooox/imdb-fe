import { Alert, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { IError } from "../types/error.types";

function useInfoMessages() {
  const [error, setError] = useState<AxiosError<IError> | undefined>(undefined);
  const [success, setSuccess] = useState<string[] | undefined>(undefined);

  const getFormatedMessages = () => {
    return (
      <>
        {error?.response?.data.errors.map((error) => (
          <Stack sx={{ width: "100%" }} spacing={2} key={error.msg}>
            <Alert variant="filled" severity="error">
              {error.msg}
            </Alert>
          </Stack>
        ))}

        {success?.map((message) => (
          <Stack sx={{ width: "100%" }} spacing={2} key={message}>
            <Alert variant="filled" severity="success">
              {message}
            </Alert>
          </Stack>
        ))}
      </>
    );
  };

  return { getFormatedMessages, setError, setSuccess };
}

export default useInfoMessages;
