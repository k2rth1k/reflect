import {WorkoutData} from "../database/DatabaseService";
import {WeeklySets} from "../database/queryTypes";


// Electron API interface for renderer
export interface ElectronAPI {
    getAllWorkoutData: () => Promise<WorkoutData[]>;
    getAllExercises: () => Promise<string[]>;
    getAllWeeklySets: () => Promise<WeeklySets[]>;
}
