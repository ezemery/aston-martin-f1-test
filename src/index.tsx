import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./style/index.css";
import "./style/base.css";
import { Layout } from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/Home/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Laps from "./components/Laps/Laps";
import SearchRace from "./components/SearchRace/SearchRace";
import Race from "./components/Race/Race";
import ErrorPage from "./components/Error/ErrorPage";
import SearchLaps from "./components/SearchLaps/SearchLaps";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/race",
    element: <Layout render={(data) => <Race renderData={data} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/laps",
    element: <Layout render={(data) => <Laps renderData={data} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/race/:year/:circuit",
    element: <Layout render={(data) => <SearchRace renderData={data} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/laps/:year/:circuit",
    element: <Layout render={(data) => <SearchLaps renderData={data} />} />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
