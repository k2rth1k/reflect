import { createHashRouter } from "react-router-dom";
import React from "react";
import Home from "../components/pages/home";
import DataGridDemo from "../components/pages/tagExecises";
import Layout from "../components/layout/Layout";
import Analyse from "../components/pages/analyse/analyse";
import { ROUTES } from "../utils/constants";
import NotFound from "./NotFound";

export const router = createHashRouter([
  {
    path: "/",

    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: ROUTES.ROOT.id,
            element: <Home />
          },
          {
            path: ROUTES.HOME.id,
            element: <Home />
          },
          {
            path: ROUTES.TAG.id,
            element: <DataGridDemo />
          },
          {
            path: ROUTES.ANALYSE.id,
            element: <Analyse />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
