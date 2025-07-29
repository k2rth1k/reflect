export const pr_for_exercise_session_wise = `

with tmp AS (
    SELECT
        date,
        exercise_name,
        weight,
        reps,
        round(weight * (1+ (reps / 30.0)),2) AS pr_1rm,
        row_number() OVER (PARTITION BY date ORDER BY round(weight * (1+ (reps / 30.0)),2) DESC) AS rn
    FROM
        workout_raw
    WHERE
        date >= '2023-01-01' and exercise_name = ?
)
SELECT
    date,
    exercise_name,
    weight,
    reps,
    pr_1rm,
    row_number() OVER (PARTITION BY exercise_name ORDER BY date ASC) AS session_number
FROM
    tmp WHERE rn=1;

`;
