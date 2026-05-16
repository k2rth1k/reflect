export const createRawDataTable = `
  CREATE TABLE IF NOT EXISTS workout_raw
  (
    date          Timestamp NOT NULL,
    workout_name  TEXT      NOT NULL,
    duration      TEXT,
    exercise_name TEXT      NOT NULL,
    set_order     INTEGER   NOT NULL,
    weight        REAL,
    reps          REAL,
    distance      REAL DEFAULT 0,
    seconds       REAL DEFAULT 0,
    notes         TEXT,
    workout_notes TEXT,
    rpe           INTEGER,
    muscle        Varchar(255)
  )
`;

export const createTagsTable = `
  CREATE TABLE IF NOT EXISTS exercises
  (
    exercise_name TEXT PRIMARY KEY,
    muscle_group  TEXT,
    tags          TEXT
  )`;

export const createMuscleGroupsTable = `
  CREATE TABLE IF NOT EXISTS muscle_groups
  (
    muscle_group TEXT
  )`;

export const insertMuscleGroups = `
  INSERT INTO muscle_groups (muscle_group)
  VALUES ('Lats'),
         ('Upper Traps'),
         ('Middle Traps'),
         ('Lower Traps'),
         ('Rhomboids'),
         ('Biceps'),
         ('Upper Chest'),
         ('Mid Chest'),
         ('Lower Chest'),
         ('Front Delts'),
         ('Lateral Delts'),
         ('Rear Delts'),
         ('Brachioradialis'),
         ('Forearm flexors'),
         ('Calves'),
         ('Glutes'),
         ('Hamstrings'),
         ('Lower Back'),
         ('Neck'),
         ('Quads'),
         ('ABS'),
         ('Triceps');
`;