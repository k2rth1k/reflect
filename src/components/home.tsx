import React, { useEffect, useState } from "react";
import { chartData, CustomLineChart } from "./Charts/CustomLineChart";
import { DarkTheme } from "../utils/themeColors";

function Home() {
  const [data, setData] = useState<chartData>({ x: [], y: [] });
  useEffect(() => {
    const xAxis: number[] = [];
    const yAxis: number[] = [];
    window.electronAPI.getAllWeeklySets().then((res) => {
      res.forEach((val) => {
        xAxis.push(val.week_number);
        yAxis.push(val.sets);
      });
      setData({ x: xAxis, y: yAxis });
    });
  }, []);

  return (
    <div
      style={{
        marginTop: "1.5em",
        marginLeft: "1.5em",
        marginRight: "1em",
        marginBottom: "1em",
        paddingBottom: "0.4em",
        border: `1px solid ${DarkTheme.separatingLineColor}`,
        backgroundColor: DarkTheme.cardPrimary,
        height: "fit-content",
        borderRadius: "1em",
      }}
    >
      <h2 style={{ color: DarkTheme.boldText, marginLeft: "1.5em" }}>
        Total Weekly Sets
      </h2>
      <CustomLineChart data={data} />
    </div>
  );
}

export default Home;
