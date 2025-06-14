import { createHashRouter, Navigate } from "react-router-dom";
import React from "react";
import NotFound from "./NotFound";
import Home from "../Components/home";

export const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      // {
      //     path: 'dashboard',
      //     element: <Dashboard />
      // },
      // {
      //     path: 'analytics',
      //     element: <Analytics />,
      //     children: [
      //         {
      //             path: ':period',
      //             element: <Analytics />
      //         }
      //     ]
      // },
      // {
      //     path: 'workouts/:workoutId',
      //     element: <WorkoutDetail />
      // },
      // {
      //     path: 'settings',
      //     element: <Settings />
      // }
    ],
  },
]);
