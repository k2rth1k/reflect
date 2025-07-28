import { createHashRouter } from "react-router-dom";
import React from "react";
import NotFound from "./NotFound";
import Home from "../components/pages/home";
import DataGridDemo from "../components/pages/tagExecises";
import Layout from "../components/layout/Layout";
import Analyse from "../components/pages/analyse/analyse";

export const router = createHashRouter([
  {
    path: "/",

    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "tag",
            element: <DataGridDemo />,
          },
          {
            path: "tag",
            element: <DataGridDemo />,
          },
          {
            path: "analyse",
            element: <Analyse />,
          },
        ],
      },
    ],
  },
]);
