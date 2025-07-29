export interface WeeklySets {
  week_number: number;
  week_start_date: string;
  sets: number;
}

export interface ExerciseSets {
  exercise_name: string;
  week_number: number;
  week_start_date: string;
  sets: number;
}

export interface ExerciseName {
  /**/ exercise_name: string;
}

export interface SessionPR {
  date: string;
  exercise_name: string;
  weight: number;
  reps: number;
  pr_1rm: number;
  session_number: number;
}

export interface Exercises {
  exercise_name: string;
  muscle_group: string[];
  tags: string[];
}