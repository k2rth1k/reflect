import React, { useEffect, useState } from "react";
import { chartData, CustomLineChart } from "./Charts/CustomLineChart";
import { DarkTheme } from "../utils/themeColors";

function Home() {
  const [data, setData] = useState<chartData>({ x: [], y: [] });
  const [benchData, setBenchData] = useState<chartData>({ x: [], y: [] })
  useEffect(() => {
    let xAxis: number[] = [];
    let yAxis: number[] = [];
    window.electronAPI.getAllWeeklySets().then((res) => {
      res.forEach((val) => {
        xAxis.push(val.week_number);
        yAxis.push(val.sets);
      });
      console.log({ x: xAxis, y: yAxis });
      setData({ x: xAxis, y: yAxis });
    });

    
    window.electronAPI.getExerciseWeeklySets("Bench Press (Smith Machine)").then((res) => {
      xAxis  = [];
      yAxis = [];
      res.forEach((val) => {
        xAxis.push(val.week_number);
        yAxis.push(val.sets);
      });
      console.log({ x: xAxis, y: yAxis });
      setBenchData({ x: xAxis, y: yAxis });
    });

  }, []);

  return (

    <>
      <div
        style={{
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          height: "fit-content",
          borderRadius: "1em",
          paddingBottom: "0.5em",
        }}
      >
        <h2 style={{ color: DarkTheme.boldText, marginLeft: "1.5em" }}>
          Total Weekly Sets
        </h2>
        <CustomLineChart data={data} />
      </div>
      <br />
      <div
        style={{
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          height: "fit-content",
          borderRadius: "1em",
          paddingBottom: "0.5em",
        }}
      >
        <h2 style={{ color: DarkTheme.boldText, marginLeft: "1.5em" }}>
          Total Weekly Sets
        </h2>
        <CustomLineChart data={benchData} />
      </div>
    </>
  );
}

export default Home;
