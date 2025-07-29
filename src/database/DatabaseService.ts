import Database from "better-sqlite3";
import { createRawDataTable, createTagsTable } from "./ddl";
import { all_weekly_sets } from "./Queries/Read/weekly_level/all_weekly_sets";
import { exercise_weekly_sets } from "./Queries/Read/weekly_level/exercise_weekly_sets";
import { Exercises, ExerciseName, SessionPR, WeeklySets } from "./queryTypes";
import { ExerciseSets } from "./queryTypes";
import path from "path";
import { app } from "electron";
import log from "electron-log/main";
import fs from "fs";
import { pr_for_exercise_session_wise } from "./Queries/Read/session_level/session_PRs_for_a_exercise";
import { WEEKLY_LEVEL_EXERCISE_1RM } from "./Queries/Read/weekly_level/exercise_1rm";
import { getAllExerciseInfo, insertExerciseInfo, updateExerciseInfo } from "./Queries/repos/Exercises";
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
    log.info("Initializing DatabaseService", this.db);
    if (!this.db) {
      this.db = new Database(":memory:");

      // Enable foreign keys
      this.db.pragma("foreign_keys = ON");

      this.createStrongTable();
    }
  }

  // Update your createStrongTable method
  createStrongTable() {
    try {
      const createWorkoutTable = this.db.prepare(createRawDataTable);

      createWorkoutTable.run();
      log.info("Workout table created successfully");

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
              parseInt(values[11]) || null // rpe
            ]);
          }
        }
      }

      insertMany(workoutData);
      log.info(`Inserted ${workoutData.length} workout records`);

      this.createTagsTable();

      this.backupDatabase();

    } catch (error) {
      log.error("Error Initializing tables or importing data:", error);
    }
  }

  private backupDatabase() {
    if (process.env.NODE_ENV === "development") {
      const fileDbPath = __dirname + "/mydatabase.db";
      console.log("backup_file_here: ", fileDbPath);
      this.db.backup(fileDbPath);
    }

    log.info("Database backup created successfully");
  }

  private createTagsTable() {
    const createTagsTableStmt = this.db.prepare(createTagsTable);
    createTagsTableStmt.run();
    log.info("Exercise tags table created successfully");

    const stmt = this.db.prepare(insertExerciseInfo);

    // Insert data in transaction for better performance
    const upsert = this.db.transaction((data: any[]) => {
      for (const row of data) {
        stmt.run(...row);
      }
    });

    const data: any[] = [];
    this.getAllExercises().forEach((e, idx) => {
      data.push([e.exercise_name, "[]", "[]"])
    });
    // Insert or update the exercise info   
    log.info("Upserting exercise info");
    log.info("Data to upsert:", data);
    upsert(data);


    log.info("get all data", this.db.prepare(getAllExerciseInfo).all());
    this.backupDatabase();
  }

  // Get all users
  getAllWorkoutData(): WorkoutData[] {
    const select = this.db.prepare("SELECT * FROM workout_raw");
    return select.all() as WorkoutData[];
  }

  /**
   * Get weekly sets for a given exercise name.
   * @param exerciseName The exercise name to filter by
   */
  getExerciseWeeklySets(exerciseName: string): ExerciseSets[] {
    const select = this.db.prepare(exercise_weekly_sets);
    return select.all(exerciseName, exerciseName) as ExerciseSets[];
  }

  getAllExercises(): ExerciseName[] {
    const select = this.db.prepare(
      "select distinct exercise_name from workout_raw",
    );
    return select.all() as ExerciseName[];
  }

  getAllWeeklySets(): WeeklySets[] {
    const select = this.db.prepare(all_weekly_sets);
    return select.all() as WeeklySets[];
  }

  getAllSessionPRs(exerciseName: string): SessionPR[] {
    const select = this.db.prepare(pr_for_exercise_session_wise);
    return select.all(exerciseName) as SessionPR[];
  }

  getWeeklyPRs(exerciseName: string): SessionPR[] {
    const select = this.db.prepare(WEEKLY_LEVEL_EXERCISE_1RM);
    return select.all(exerciseName, exerciseName) as SessionPR[];
  }

  updateExerciseTags(
    exerciseName: string,
    tags: string[],
  ): void {

    log.info(`Updating exercise: ${exerciseName} with  tags: ${tags}`);

    const muscleGroupJson = JSON.stringify([]);
    const tagsJson = JSON.stringify(tags);

    const stmt = this.db.prepare(updateExerciseInfo);
    stmt.run(muscleGroupJson, tagsJson, exerciseName);

    log.info(`Updated exercise: ${exerciseName} with muscle_group: ${muscleGroupJson} and tags: ${tagsJson}`);

    log.info("get all data", this.db.prepare(getAllExerciseInfo).all());
    this.backupDatabase();
  }

  getAllExerciseDetails(): Exercises[] {
    const select = this.db.prepare(getAllExerciseInfo);
    const rows = select.all() as any[];
    // Parse muscle_groups and tags as string[]

    log.info("get all data", rows);
    const result: Exercises[] = rows.map(row => ({
      exercise_name: row.exercise_name,
      muscle_group: this.parseArray(row.muscle_group as string), // Ensure muscle_group is parsed correctly
      tags: this.parseArray(row.tags as string), // Ensure tags are parsed correctly,
    }));

    return result;
  }

  private parseArray(jsonArrayString: string): string[] {
    try {
      return JSON.parse(jsonArrayString || '[]');
    } catch {
      return [];
    }
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
