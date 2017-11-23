-- The with clause calculates all averages, sums and the
-- timeframe in which the records fall. The timeframes are
-- indicated in seconds.
WITH resampled AS (
  SELECT
    row_number() OVER () as rnum,
    to_timestamp((floor(extract(epoch from rsbuddy.ts) / :frameSize) * :frameSize)) AT TIME ZONE 'UTC' AS ts_interval,
    item_id,
    AVG(buying_price)::int AS buying_price,
    SUM(buying_completed)::int AS buying_completed,
    AVG(selling_price)::int AS selling_price,
    SUM(selling_completed)::int AS selling_completed,
    AVG(overall_price)::int AS overall_price,
    SUM(overall_completed)::int AS overall_completed
  FROM rsbuddy
  WHERE rsbuddy.item_id = :itemId
  GROUP BY ts_interval, item_id;
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
  FROM resampled;
)
SELECT
  ts_interval AS 'ts',
  item_id,
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
ORDER BY item_id, resampled.rnum;
