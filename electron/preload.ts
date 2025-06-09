import { contextBridge, ipcRenderer } from 'electron';
import {User, WorkoutData} from '../database/DatabaseService';

// Expose database API to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    getAllWorkoutData: (): Promise<WorkoutData[]> => ipcRenderer.invoke('db:get-workout-raw'),
    getAllExercises: (): Promise<string[]> => ipcRenderer.invoke('db:get-exercises'),
});