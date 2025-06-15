import {createHashRouter, Navigate} from "react-router-dom";
import React from "react";
import NotFound from "./NotFound";
import Home from "../components/home";
import DataGridDemo from "../components/pages/tagExecises";

export const router = createHashRouter([
    {
        path: "/",
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace/>,
            },
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: '/tag',
                element: <DataGridDemo/>
            }
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
