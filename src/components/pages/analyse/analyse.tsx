import * as React from "react";
import { DarkTheme } from "../../../utils/themeColors";
import { chartData, CustomLineChart } from "../../Charts/CustomLineChart";
import { useEffect, useState } from "react";

export default function Analyse(): React.JSX.Element {
  const [benchData, setBenchData] = useState<chartData>({ x: [], y: [] });
  const [sessionData, setSessionData] = useState<chartData>({ x: [], y: [] });
  const [weeklyPRs, setWeeklyPRs] = useState<chartData>({ x: [], y: [] });

  useEffect(() => {
    window.electronAPI
      .getExerciseWeeklySets("Bench Press (Smith Machine)")
      .then((res) => {
        const xAxis: number[] = [];
        const yAxis: number[] = [];
        res.forEach((val) => {
          xAxis.push(val.week_number);
          yAxis.push(val.sets);
        });
        setBenchData({ x: xAxis, y: yAxis });
      });

    window.electronAPI
      .getAllSessionPRs("Bench Press (Smith Machine)")
      .then((res) => {
        const xAxis: number[] = [];
        const yAxis: number[] = [];
        res.forEach((val) => {
          xAxis.push(val.session_number);
          yAxis.push(val.pr_1rm);
        });
        setSessionData({ x: xAxis, y: yAxis });
      });

    window.electronAPI
      .getWeeklyPRs("Bench Press (Smith Machine)")
      .then((res) => {
        const xAxis: number[] = [];
        const yAxis: number[] = [];
        res.forEach((val) => {
          xAxis.push(val.week_number);
          yAxis.push(val.sets);
        });
        console.log({ x: xAxis, y: yAxis });
        setWeeklyPRs({ x: xAxis, y: yAxis });
      });
  }, []);

  // Make the whole page scrollable
  return (
    <div>
      <div
        style={{
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          height: "fit-content",
          borderRadius: "1em",
          paddingBottom: "0.5em",
          width: "fit-content",
        }}
      >
        <h2 style={{ color: DarkTheme.boldText, marginLeft: "1.5em" }}>
          Bench press Weekly sets
        </h2>
        <CustomLineChart data={benchData} />
      </div>
      <br />
      <div
        style={{
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          height: "fit-content",
          borderRadius: "1em",
          paddingBottom: "0.5em",
          width: "fit-content",
        }}
      >
        <h2 style={{ color: DarkTheme.boldText, marginLeft: "1.5em" }}>
          Bench press 1rm PR
        </h2>
        <CustomLineChart data={sessionData} />
      </div>
      <br />
      <div
        style={{
          border: `1px solid ${DarkTheme.separatingLineColor}`,
          backgroundColor: DarkTheme.cardPrimary,
          height: "fit-content",
          borderRadius: "1em",
          paddingBottom: "0.5em",
          width: "fit-content",
        }}
      >
        <h2 style={{ color: DarkTheme.boldText, marginLeft: "1.5em" }}>
          Bench press Weekly 1rm PR
        </h2>
        <CustomLineChart data={weeklyPRs} />
      </div>
    </div>
  );
}
