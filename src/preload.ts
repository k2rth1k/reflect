// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WorkoutData } from "./database/DatabaseService";
import { WeeklySets, ExerciseSets, SessionPR, Exercises } from "./database/queryTypes";

// Expose database API to renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  upsertExerciseTags: (exerciseName: string, tags: string): Promise<boolean> =>
    ipcRenderer.invoke("db:upsert-exercise-tags", exerciseName, tags),
  getAllWorkoutData: (): Promise<WorkoutData[]> =>
    ipcRenderer.invoke("db:get-workout-raw"),
  getAllExercises: (): Promise<string[]> =>
    ipcRenderer.invoke("db:get-exercises"),
  getAllWeeklySets: (): Promise<WeeklySets[]> =>
    ipcRenderer.invoke("db:get-weekly-sets"),
  getExerciseWeeklySets: (exerciseName: string): Promise<ExerciseSets[]> =>
    ipcRenderer.invoke("db:get-exercise-weekly-sets", exerciseName),
  getAllSessionPRs: (exerciseName: string): Promise<SessionPR[]> =>
    ipcRenderer.invoke("db:get-session-prs", exerciseName),
  getWeeklyPRs: (exerciseName: string): Promise<SessionPR[]> =>
    ipcRenderer.invoke("db:get-weekly-prs", exerciseName),
  getAllExerciseDetails: (): Promise<Exercises[]> =>
    ipcRenderer.invoke("db:get-all-exercise-details"),
});
