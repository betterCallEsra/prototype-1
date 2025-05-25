import React from "react";
import type { AxiosError } from "axios";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "../hooks/use-router";

import { login } from "../api/auth";

import { Iconify } from "../components/iconify";

export function LoginView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      router.push("/dashboard");
      setIsLoggedIn(true);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      setErrorMessage(err.response?.data?.message || "Login failed");
      console.log(error);
    },
  });
  // const { data } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: getMsg,
  //   enabled: isLoggedIn,
  // });

  // console.log("me content");
  // console.log(data);

  const handleSignIn = () => {
    setErrorMessage("");
    mutation.mutate({ phone, password });
  };

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Dont have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TextField
          fullWidth
          inputProps={{ "data-testid": "phone-input" }}
          label="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>

        <TextField
          fullWidth
          inputProps={{ "data-testid": "password-input" }}
          data-testid="error-message"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errorMessage && (
          <Typography color="error" data-testid="error-message" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          fullWidth
          data-testid="sign-in-btn"
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleSignIn}
        >
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </Box>

      <Divider
        sx={{ my: 3, "&::before, &::after": { borderTopStyle: "dashed" } }}
      >
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: "fontWeightMedium" }}
        >
          OR
        </Typography>
      </Divider>

      <Box sx={{ gap: 1, display: "flex", justifyContent: "center" }}>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}
