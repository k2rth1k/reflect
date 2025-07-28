import * as React from "react";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "../routes/routes";
import Layout from "./layout/Layout";

function App() {
  useEffect(() => {
    window.electronAPI.getAllWeeklySets().then((data) => console.log(data));
  }, []);
  console.log("App rendered");
  return (
    <div>
      <h1>Hello from React with TypeScript!</h1>
      <p>Welcome to your Electron + React + TypeScript app!</p>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
