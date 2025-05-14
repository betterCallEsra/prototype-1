import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/sections";
import App from "./App";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App>
          <RouterProvider router={router} />
        </App>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
