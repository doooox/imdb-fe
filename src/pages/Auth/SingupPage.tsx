import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Container, Stack } from "@mui/material";
import { ROUTES } from "../../utils/static";
import ISingup from "../../types/singup.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/Auth/AuthService";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { LoadingContext } from "../../context/LoadingContext";
import useAuthGuard from "../../hooks/useAuthGuard";
import { IError } from "../../types/error.types";
import useErrors from "../../hooks/useErrors";
import { AxiosError } from "axios";

const SignUpPage = () => {
  useAuthGuard();
  const { getFormatedErrors, setError } = useErrors();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISingup>();

  const { login } = useContext(UserContext);
  const { mutate: singup } = useMutation(authService.singup, {
    onSuccess: (data) => {
      setLoading(false);
      login(data);
    },
    onError: (error: AxiosError<IError>) => {
      setLoading(false);
      setError(error);
    },
  });

  const onSubmit: SubmitHandler<ISingup> = (data) => {
    setLoading(true);
    singup(data);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Name"
                fullWidth
                autoFocus
                {...register("name", { required: "Name is requiered" })}
              />
              {errors.name && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    {errors.name?.message}
                  </Alert>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("password", {
                  required: "Password is requiered",
                  minLength: {
                    value: 6,
                    message: "password must contain at least 6 characters",
                  },
                })}
                label="Password"
                type="password"
              />
            </Grid>
            {errors.password && (
              <Stack sx={{ width: "100%", ml: 3 }} spacing={2}>
                <Alert variant="filled" severity="error">
                  {errors.password?.message}
                </Alert>
              </Stack>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("confirmPassword", {
                  required: "Password confirmation is requiered",
                  validate: (val: string) => {
                    return watch("password") !== val
                      ? "Passwords dont match"
                      : true;
                  },
                })}
                label="Confirm password"
                type="password"
              />
              {errors.confirmPassword && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    {errors.confirmPassword?.message}
                  </Alert>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {getFormatedErrors()}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={ROUTES.SINGIN} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
