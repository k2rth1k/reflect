export const WEEKLY_LEVEL_EXERCISE_1RM = `
    WITH first_date AS (SELECT date(date) AS min_date
                    FROM workout_raw
                    ORDER BY date
                    LIMIT 1),
     start_week AS (SELECT date(min_date, 'weekday 0', '-6 days') AS week_start
                    FROM first_date),
     end_week AS (SELECT date('now', 'weekday 0') AS week_end),
     all_weeks (week) AS (SELECT week_start
                          FROM start_week
                          UNION ALL
                          SELECT date(week, '+7 days')
                          FROM all_weeks,
                               end_week
                          WHERE week
                                    < date(week_end))
        ,
     weekly_counts AS (SELECT date(date, 'weekday 0', '-6 days') AS week_date,
                                exercise_name,
                                max(round(weight*(1+reps/30.0),2)) AS pr_1rm
                       FROM workout_raw where exercise_name = ?
                       GROUP BY week_date),
     combined AS (SELECT wc.exercise_name ,aw.week, COALESCE(wc.pr_1rm, 0) AS pr_1rm
                  FROM all_weeks aw
                           LEFT JOIN weekly_counts wc
                                     ON aw.week = wc.week_date)
SELECT 
        Coalesce(exercise_name, ?) as exercise_name,
        ROW_NUMBER() OVER (ORDER BY week) AS week_number,
        week                              AS week_start_date,
        pr_1rm                            AS sets      
FROM combined
ORDER BY week;
`;
