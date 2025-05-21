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

import { mockLogin as login } from "../api/auth";

import { Iconify } from "../components/iconify";

export function LoginView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      setErrorMessage(err.response?.data?.message || "Login failed");
    },
  });

  const handleSignIn = () => {
    setErrorMessage("");
    mutation.mutate({ email, password });
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
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>

        <TextField
          fullWidth
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
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button
          fullWidth
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
