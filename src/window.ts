import { WorkoutData } from "./database/DatabaseService";
import {
  ExercisesInfo,
  WeeklySets,
  ExerciseSets,
  SessionPR,
} from "./database/queryTypes";

declare global {
  interface Window {
    electronAPI: {
      getAllWorkoutData: () => Promise<WorkoutData[]>;
      getAllExercises: () => Promise<ExercisesInfo[]>;
      getAllWeeklySets: () => Promise<WeeklySets[]>;
      getExerciseWeeklySets: (exerciseName: string) => Promise<ExerciseSets[]>;
      getAllSessionPRs: (exerciseName: string) => Promise<SessionPR[]>;
      getWeeklyPRs: (exerciseName: string) => Promise<WeeklySets[]>;
    };
  }
}

export {};
