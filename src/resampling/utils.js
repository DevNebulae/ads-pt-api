/**
 * Parses a time frame string into a number used by the
 * resampling SQL queries. Note that this function assumes
 * that a month is always 30 days.
 * @param {string} timeFrame A string in the form of '1h',
 * 'h', '3d', et cetera.
 */
export const parseModifier = timeFrame => {
  const allowedTimes = ["h", "d", "w", "m"]
  const multipliers = {
    h: 3600,
    d: 3600 * 24,
    w: 3600 * 24 * 7,
    m: 3600 * 24 * 30
  }

  const regex = /(\d{0,2})([d,h,w,m])/i
  const matches = regex.exec(timeFrame)

  if (matches === null) {
    throw new Error(
      `Parsing error in the time frame specified. The only formats which can be parsed are: an integer ranging from 0 to 99 combined with a letter in this range: ['h', 'd', 'w', 'm'] (for example: 1w). I instead got this value: ${
        timeFrame
      }. Please note that floating point numbers get converted to integers.`
    )
  }

  /**
   * This part parses the specified date into the correct
   * variables for the number conversion step. To
   * demonstrate, consider the following behavior of the
   * exec function in JS:
   * '10d' => ['10d', '10', 'd', index: 0, input: '10d']
   * As you can see, when a number and modifier are defined,
   * the array will have three important entries:
   * 	* The string it fully matched on;
   *  * The first capture group;
   * 	* The second capture group.
   * Consider the following:
   * 'h' => ['h', '', 'h', index: 0, input: 'h']
   * The first element in the array will not be filled,
   * since the capture group didn't pick up on anything. By
   * default, the parsing function interprets this as 1.
   */
  let amount = isNaN(matches[1]) || matches[1] === "" ? 1 : parseInt(matches[1])
  let multiplier = matches[2]

  return amount * multipliers[multiplier]
}
