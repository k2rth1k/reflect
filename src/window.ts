import { WorkoutData } from "./database/DatabaseService";
import { WeeklySets } from "./database/queryTypes";

declare global {
  interface Window {
    electronAPI: {
      getAllWorkoutData: () => Promise<WorkoutData[]>;
      getAllExercises: () => Promise<string[]>;
      getAllWeeklySets: () => Promise<WeeklySets[]>;
    };
  }
}

export {};
