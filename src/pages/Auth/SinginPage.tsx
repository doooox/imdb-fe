import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ROUTES } from "../../utils/static";
import { SubmitHandler, useForm } from "react-hook-form";
import ISingin from "../../types/singin.types";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/Auth/AuthService";
import { Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import useAuthGuard from "../../hooks/useAuthGuard";
import { LoadingContext } from "../../context/LoadingContext";
import { AxiosError } from "axios";
import { IError } from "../../types/error.types";
import useErrors from "../../hooks/useErrors";

const SignInPage = () => {
  useAuthGuard();
  const { getFormatedErrors, setError } = useErrors();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingin>();

  const { login } = useContext(UserContext);
  const { mutate: singin } = useMutation(authService.singin, {
    onSuccess: (data) => {
      setLoading(false);
      login(data);
    },
    onError: (error: AxiosError<IError>) => {
      setLoading(false);
      setError(error);
    },
  });

  const onSubmit: SubmitHandler<ISingin> = (data) => {
    setLoading(true);
    singin(data);
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
        <Avatar
          sx={{ m: 1, bgcolor: "secondary.main" }}
          style={{
            background: "#f13636",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            required
            fullWidth
            label="Email Address"
            {...register("email", {
              required: "Email is requiered",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Not a valid email",
              },
            })}
          />
          {errors.email && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {errors.email?.message}
              </Alert>
            </Stack>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            {...register("password", {
              required: "Password is requiered",
              minLength: {
                value: 6,
                message: "password must contain at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {errors.password?.message}
              </Alert>
            </Stack>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {getFormatedErrors()}
          <Grid container>
            <Grid item>
              <Link href={ROUTES.SINGUP} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
