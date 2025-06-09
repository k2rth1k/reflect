import './App.css';
import LineChart from "./Components/LineChart";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        window.electronAPI.getAllExercises().then((e) => {
            console.log(e)
        });
    }, []);
    return (
        <div className="App">
            <LineChart/>
        </div>
    );
}

export default App;
