import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import { Link } from "react-router-dom";

interface chartData {
  x: number[];
  y: number[];
}

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
    <div>
      {
        <LineChart
          xAxis={[{ data: data.x }]}
          series={[
            {
              data: data.y,
            },
          ]}
          height={300}
        />
      }

      <Button variant="contained">Hello world</Button>
      <BarChart
        xAxis={[{ data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        height={300}
      />

      <Link to="/somehwere" className="btn btn-primary">
        Go Somehwere
      </Link>
    </div>
  );
}

export default Home;
