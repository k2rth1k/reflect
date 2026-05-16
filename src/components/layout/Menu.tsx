import React, { JSX } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import InsightsIcon from "@mui/icons-material/Insights";
import { ROUTES } from "../../utils/constants";

export interface MenuItems {
  link: string;
  itemName: string;
  icon: JSX.Element;
}

export const MENU: MenuItems[] = [
  {
    link: ROUTES.HOME.id,
    itemName: ROUTES.HOME.description,
    icon: <DashboardIcon></DashboardIcon>
  },
  {
    link: ROUTES.TAG.id,
    itemName: ROUTES.TAG.description,
    icon: <LabelImportantIcon></LabelImportantIcon>
  },
  {
    link: ROUTES.ANALYSE.id,
    itemName: ROUTES.ANALYSE.description,
    icon: <InsightsIcon></InsightsIcon>
  }
];
