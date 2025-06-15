import Database from "better-sqlite3";
import { createRawDataTable } from "./ddl";
import { all_weekly_sets } from "./queries";
import {ExercisesInfo, WeeklySets} from "./queryTypes";
import path from "path";
import { app } from "electron";
import log from "electron-log/main";
import fs from "fs";
// Define interfaces for your data
export interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
  created_at?: string;
}
// Add this interface for the workout data
export interface WorkoutData {
  id?: number;
  date: Date;
  workout_name: string;
  duration: string;
  exercise_name: string;
  set_order: number;
  weight?: number;
  reps?: number;
  distance?: number;
  seconds?: number;
  notes?: string;
  workout_notes?: string;
  rpe?: number;
  muscle?: string;
}

class DatabaseService {
  private db: Database.Database;

  constructor() {
    this.db = new Database(":memory:");

    // Enable foreign keys
    this.db.pragma("foreign_keys = ON");

    this.createStrongTable();
  }

  // Update your createStrongTable method
  createStrongTable() {
    try {
      const createWorkoutTable = this.db.prepare(createRawDataTable);

      createWorkoutTable.run();
      console.log("Workout raw table created successfully");

      // In production, use the bundled path
      log.info(process.resourcesPath);
      let resourcesPath = "";
      console.log("look here", __dirname);
      if (process.env.NODE_ENV === "development") {
        console.log(__dirname);
        resourcesPath = path.join(__dirname, "/data/strong.csv");
      } else {
        console.log(app.getAppPath());
        resourcesPath = path.join(process.resourcesPath, "/strong.csv");
      }

      // Read and parse CSV file
      const fileContent = fs.readFileSync(resourcesPath, { encoding: "utf-8" });
      const lines = fileContent.split("\n");

      // Prepare insert statement
      const insertWorkout = this.db.prepare(`
                INSERT INTO workout_raw (date, workout_name, duration, exercise_name, set_order, weight, reps, distance, seconds, notes, workout_notes, rpe, muscle)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'')
            `);

      // Insert data in transaction for better performance
      const insertMany = this.db.transaction((data: any[]) => {
        for (const row of data) {
          insertWorkout.run(...row);
        }
      });

      // Parse CSV data (skip header)
      const workoutData = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.includes("Rest Timer")) {
          // Simple CSV parsing - you might want to use a proper CSV parser for production
          const values = line.split(",").map((val: string) => {
            const trimmed = val.trim().replace(/^"/, "").replace(/"$/, "");
            return trimmed === "" ? null : trimmed;
          });
          if (values[4] === "D") {
            continue;
          }

          if (values.length >= 12) {
            workoutData.push([
              values[0], // date
              values[1], // workout_name
              values[2], // duration
              values[3], // exercise_name
              parseInt(values[4]) || null, // set_order
              parseFloat(values[5]) || null, // weight
              parseFloat(values[6]) || null, // reps
              parseFloat(values[7]) || 0, // distance
              parseFloat(values[8]) || 0, // seconds
              values[9] || null, // notes
              values[10] || null, // workout_notes
              parseInt(values[11]) || null, // rpe
            ]);
          }
        }
      }

      insertMany(workoutData);
      console.log(`Inserted ${workoutData.length} workout records`);
    } catch (error) {
      console.error("Error creating workout table or importing data:", error);
    }
  }

  // Get all users
  getAllWorkoutData(): WorkoutData[] {
    const select = this.db.prepare("SELECT * FROM workout_raw");
    return select.all() as WorkoutData[];
  }

  getAllExercises(): ExercisesInfo[] {
    const select = this.db.prepare(
      "select distinct exercise_name from workout_raw",
    );
    return select.all() as ExercisesInfo[];
  }

  getAllWeeklySets(): WeeklySets[] {
    const select = this.db.prepare(all_weekly_sets);
    return select.all() as WeeklySets[];
  }

  // Close database connection
  close(): void {
    this.db.close();
  }
}

// Usage example
export function initializeDatabase(): DatabaseService {
  return new DatabaseService();
}

export default DatabaseService;
