import './App.css';
import LineChart, {DataPoint} from "./Components/LineChart";
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState<DataPoint[]>([]);
    const tmp: DataPoint[] = [];
    useEffect(() => {
        window.electronAPI.getAllWeeklySets().then((res) => {
            res.forEach(val => tmp.push({x: val.week_number, y: val.sets}))
            setData(tmp);
        });

    }, []);

    return (
        <div className="App">
            <LineChart data={data}/>
        </div>
    );
}

export default App;
