import { WorkoutData } from "./database/DatabaseService";
import { ExerciseName, Exercises, ExerciseSets, SessionPR, WeeklySets } from "./database/queryTypes";

declare global {
  interface Window {
    electronAPI: {
      getAllWorkoutData: () => Promise<WorkoutData[]>;
      getAllExercises: () => Promise<ExerciseName[]>;
      getAllWeeklySets: () => Promise<WeeklySets[]>;
      getExerciseWeeklySets: (exerciseName: string) => Promise<ExerciseSets[]>;
      getAllSessionPRs: (exerciseName: string) => Promise<SessionPR[]>;
      getWeeklyPRs: (exerciseName: string) => Promise<WeeklySets[]>;
      upsertExerciseTags: (
        exerciseName: string,
        tags: string[]
      ) => Promise<boolean>;
      getAllExerciseDetails: () => Promise<Exercises[]>;
    };
  }
}

export {};
