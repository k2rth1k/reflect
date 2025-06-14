export const createRawDataTable = `
            CREATE TABLE IF NOT EXISTS workout_raw (
                        date Timestamp NOT NULL,
                        workout_name TEXT NOT NULL,
                        duration TEXT,
                        exercise_name TEXT NOT NULL,
                        set_order INTEGER NOT NULL,
                        weight REAL,
                        reps REAL,
                        distance REAL DEFAULT 0,
                        seconds REAL DEFAULT 0,
                        notes TEXT,
                        workout_notes TEXT,
                        rpe INTEGER,
                        muscle Varchar(255))
                        `;
