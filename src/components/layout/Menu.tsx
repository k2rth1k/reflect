import React, { JSX } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import InsightsIcon from "@mui/icons-material/Insights";

export interface MenuItems {
  link: string;
  itemName: string;
  icon: JSX.Element;
}

export const MENU: MenuItems[] = [
  {
    link: "/home",
    itemName: "Dashboard",
    icon: <DashboardIcon></DashboardIcon>,
  },
  {
    link: "/tag",
    itemName: "Tag Exercise",
    icon: <LabelImportantIcon></LabelImportantIcon>,
  },
  {
    link: "/analyse",
    itemName: "Analyse",
    icon: <InsightsIcon></InsightsIcon>,
  },
];
