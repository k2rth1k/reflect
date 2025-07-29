export const insertExerciseInfo = `
                INSERT INTO exercises (exercise_name, muscle_group, tags)
                VALUES (?, ?, ?);
            `;

export const updateExerciseInfo = `
                UPDATE exercises
                SET muscle_group = ?, tags = ?
                WHERE exercise_name = ?;
            `;            

export const getAllExerciseInfo = `
                SELECT exercise_name, muscle_group, tags FROM exercises;
            `;            