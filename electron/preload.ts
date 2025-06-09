import {contextBridge, ipcRenderer} from 'electron';
import {WorkoutData} from '../database/DatabaseService';
import {WeeklySets} from "../database/queryTypes";

// Expose database API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    getAllWorkoutData: (): Promise<WorkoutData[]> => ipcRenderer.invoke('db:get-workout-raw'),
    getAllExercises: (): Promise<string[]> => ipcRenderer.invoke('db:get-exercises'),
    getAllWeeklySets: (): Promise<WeeklySets[]> => ipcRenderer.invoke('db:get-weekly-sets')
});