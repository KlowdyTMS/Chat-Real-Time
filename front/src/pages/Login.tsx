import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthentication } from "../store/authentication";
import { useLogin } from "../queries/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const mutation = useLogin();
  const { access_token } = useAuthentication();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (access_token) {
      navigate("/");
    }
  }, [access_token]);

  const onSubmit = async (data: Record<string, any>) => {
    const { name, password } = data;
    try {
      await mutation.mutateAsync({ name, password });
      setError("");
    } catch (error) {
      if (error) {
        setError(error.toString());
      }
    }
  };

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      height={"40rem"}
    >
      <Paper variant="outlined" sx={{ padding: 5, width: 400, minHeight: 250 }}>
        <Typography variant={"h5"} m={"0 0 20px 0"}>
          Entrar
        </Typography>
        <Grid
          container
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
          height={"100%"}
        >
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message?.toString()}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              {...register("name")}
            />
            <TextField
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ marginTop: "15px" }}
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: 4 }}
            >
              Entrar
            </Button>
          </Box>
        </Grid>
      </Paper>
      <Snackbar
        open={error.length > 0 ? true : false}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
