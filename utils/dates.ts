import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  startOfWeek,
  endOfWeek,
  isSunday,
  isWeekend,
  nextMonday,
  nextSaturday,
  nextSunday
} from "date-fns";

dayjs.extend(relativeTime);

/**
 * Returns the given date as a readable string.
 * @param date the date to convert to a readable string
 * @param include_weekday a boolean flag determining whether to include
 * weekdays in the output string
 * @returns given date as a readable string
 */
export function dateToReadable(date: string, include_weekday: boolean = true) {
  const options: {
    weekday?: any;
    year?: any;
    month?: any;
    day?: any;
  } = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (include_weekday) options.weekday = "long";

  const dateObj = new Date(date);

  return dateObj.toLocaleDateString("en-US", options);
}

/**
 * Returns a given time interval as a readable string.
 * @param start_time the interval start time
 * @param end_time the interval end time
 * @returns given time interval as a readable string
 */
export function timeToReadable(start_time: string, end_time: string) {
  return `${start_time.slice(0, 5)} - ${end_time.slice(0, 5)}`;
}

/**
 * Returns a given date in an ISO compliant format.
 * @param date a date to convert to an ISO string, today by default.
 * @returns given date in an ISO compliant format
 */
export function dateAsISOString(date: Date = new Date()) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
}

/**
 * Returns the end date of this week.
 * @returns end date of this week
 */
export function endOfThisWeekAsISOString() {
  var today = new Date();
  var endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
  return dateAsISOString(endOfThisWeek);
}

/**
 * Returns the start date of next week.
 * @returns start date of next week
 */
export function startOfNextWeekAsISOString() {
  var today = new Date();
  var nextMon = nextMonday(today);
  var startOfNextWeek = startOfWeek(nextMon, { weekStartsOn: 1 });
  return dateAsISOString(startOfNextWeek);
}

/**
 * Returns the end date of next week.
 * @returns end date of next week
 */
export function endOfNextWeekAsISOString() {
  var today = new Date();
  var nextMon = nextMonday(today);
  var endOfNextWeek = endOfWeek(nextMon, { weekStartsOn: 1 });
  return dateAsISOString(endOfNextWeek);
}

/**
 * Returns the start date of this weekend. If it isn't the weekend
 * today it returns the following Saturday otherwise it returns
 * today's date regardless of whether it is Saturday or Sunday.
 * @returns start date of this weekend
 */
export function startOfThisWeekendAsISOString() {
  var today = new Date();
  if (isWeekend(today)) {
    return dateAsISOString(today)
  } else {
    return dateAsISOString(nextSaturday(today))
  }
}

/**
 * Returns the end date of this weekend. If it is Sunday it returns
 * today and otherwise it returns the following Sunday.
 * @returns end date of this weekend
 */
export function endOfThisWeekendAsISOString() {
  var today = new Date();
  if (isSunday(today)) {
    return dateAsISOString(today)
  } else {
    return dateAsISOString(nextSunday(today))
  }
}