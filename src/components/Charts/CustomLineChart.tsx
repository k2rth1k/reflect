import React from "react";
import { DarkTheme } from "../../utils/themeColors";
import { ChartsGrid, LineChart } from "@mui/x-charts";

export interface chartData {
  x: number[];
  y: number[];
}

export function CustomLineChart({ data }: { data: chartData }) {
  return (
    <LineChart
      colors={[DarkTheme.primary]}
      xAxis={[
        {
          data: data.x,
          tickLabelStyle: {
            fill: DarkTheme.regularText, // Tick label color
            fontSize: 12,
          },
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: {
            fill: DarkTheme.regularText,
            fontSize: 12,
          },
        },
      ]}
      series={[
        {
          data: data.y,
          showMark: false,
          valueFormatter: (value) => `${value.toLocaleString()}`,
        },
      ]}
      sx={{
        borderRadius: "0.5em",

        "& .MuiChartsAxisHighlight-root": {
          stroke: DarkTheme.separatingLineColor, // Example: change color to red on hover
        },
        "& .MuiChartsAxis-root": {
          "& .MuiChartsAxis-line": {
            stroke: DarkTheme.separatingLineColor, // Axis line color
          },
          "& .MuiChartsAxis-tick": {
            stroke: DarkTheme.separatingLineColor, // Tick marks color
          },
        },
        /* Hide the top horizontal grid line */
        "& .MuiChartsGrid-line:first-child": {
          display: "none",
        },

        // Grid lines
        "& .MuiChartsGrid-line": {
          stroke: DarkTheme.primary,
          strokeWidth: 1,
        },
        ".MuiChartsGrid-line": {
          // Customize grid line color
          stroke: DarkTheme.separatingLineColor,
        },
        // Chart background
        backgroundColor: DarkTheme.cardPrimary,
        "& .MuiChartsTooltip-root": {
          backgroundColor:
            "#1e1e1e" /* Adjust to match your DarkTheme.cardPrimary */ /* Modern glass effect */,
        },
      }}
      height={300}
      width={700}
      slotProps={{
        tooltip: {
          sx: {
            "& :has(.MuiChartsTooltip-table)": {
              color: "#FFF",
              backgroundColor: "black !important",
            },
            "& .MuiChartsTooltip-row": {
              color: "#000 !important",

              backgroundColor: "black",
            },
            "& .MuiChartsTooltip-cell": {
              borderTop: `1px solid ${DarkTheme.separatingLineColor}`,
              color: "#ffffff !important",
            },
          },
        },
      }}
    >
      <ChartsGrid horizontal />
    </LineChart>
  );
}
