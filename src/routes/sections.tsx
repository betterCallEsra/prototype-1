import React from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AuthLayout } from "../layouts/auth";

const LoginPage = lazy(() => import("../pages/LoginPage"));

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => theme.palette.grey[200],
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={renderFallback()}>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);
