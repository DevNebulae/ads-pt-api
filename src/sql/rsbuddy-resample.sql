-- The way the time frames are calculated is as follows: the
-- epoch gets divided by a number of seconds, which results
-- in a floating point number. This numbers gets rounded
-- down, which results in an integer. Until the integer
-- rolls over, all records will be grouped with the floored
-- integer. The number gets multiplied afterwards by the
-- number it was divided by and this results in a uniform
-- timestamp.
WITH resampled AS (
  SELECT
    row_number() OVER () as rnum,
    to_timestamp((floor(extract(epoch from rsbuddy.ts) / :frameSize) * :frameSize)) AT TIME ZONE 'UTC' AS ts_interval,
    item_id,
    AVG(buying_price) AS buying_price,
    SUM(buying_completed) AS buying_completed,
    AVG(selling_price) AS selling_price,
    SUM(selling_completed) AS selling_completed,
    AVG(overall_price) AS overall_price,
    SUM(overall_completed) AS overall_completed
  FROM rsbuddy
  WHERE rsbuddy.item_id = :itemId AND ts BETWEEN COALESCE(:start, ts) AND COALESCE(:end, ts)
  GROUP BY ts_interval, item_id
),
lagged AS (
  -- Select the row number, which is the unique id given to
  -- each row of the aggregates, partition by the item id so
  -- that the `lag` function does not grab data from other
  -- items and order by row number so that the order of
  -- records does not get mixed up.
  SELECT
    rnum,
    LAG(buying_price) OVER (PARTITION BY item_id ORDER BY rnum) as buying_price_old,
    LAG(buying_completed) OVER (PARTITION BY item_id ORDER BY rnum) as buying_completed_old,
    LAG(selling_price) OVER (PARTITION BY item_id ORDER BY rnum) as selling_price_old,
    LAG(selling_completed) OVER (PARTITION BY item_id ORDER BY rnum) as selling_completed_old,
    LAG(overall_price) OVER (PARTITION BY item_id ORDER BY rnum) as overall_price_old,
    LAG(overall_completed) OVER (PARTITION BY item_id ORDER BY rnum) as overall_completed_old
  FROM resampled
)
SELECT
  ts_interval AS ts,
  buying_price,
  (buying_price - buying_price_old)::float / buying_price_old AS buying_price_delta,
  buying_completed,
  (buying_completed - buying_completed_old)::float / buying_completed_old AS buying_completed_delta,
  selling_price,
  (selling_price - selling_price_old)::float / selling_price_old AS selling_price_delta,
  selling_completed,
  (selling_completed - selling_completed_old)::float / selling_completed_old AS selling_completed_delta,
  overall_price,
  (overall_price - overall_price_old)::float / overall_price_old AS overall_price_delta,
  overall_completed,
  (overall_completed - overall_completed_old)::float / overall_completed_old AS overall_completed_delta
FROM lagged
-- Lastly, join the subquery and the main query together to
-- avoid the n^2 problem.
INNER JOIN resampled ON lagged.rnum = resampled.rnum
ORDER BY ts, resampled.rnum;
