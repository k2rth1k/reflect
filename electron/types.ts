import {WorkoutData} from "../database/DatabaseService";


export interface DatabaseResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

// Electron API interface for renderer
export interface ElectronAPI {
    getAllWorkoutData: () => Promise<DatabaseResult<WorkoutData[]>>;
    getAllExercises: () => Promise<DatabaseResult<string[]>>;
}
