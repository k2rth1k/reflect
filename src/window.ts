import { WorkoutData } from "./database/DatabaseService";
import { ExercisesInfo, WeeklySets, ExerciseSets } from "./database/queryTypes";

declare global {
  interface Window {
    electronAPI: {
      getAllWorkoutData: () => Promise<WorkoutData[]>;
      getAllExercises: () => Promise<ExercisesInfo[]>;
      getAllWeeklySets: () => Promise<WeeklySets[]>;
      getExerciseWeeklySets: (exerciseName: string) => Promise<ExerciseSets[]>;
    };
  }
}

export {};
