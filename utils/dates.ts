import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  startOfWeek,
  endOfWeek,
  isSunday,
  isWeekend,
  nextMonday,
  nextSaturday,
  nextSunday,
  add
} from "date-fns";

dayjs.extend(relativeTime);

/**
 * Returns the given date as a readable string.
 * @param date the date to convert to a readable string
 * @param include_weekday a boolean flag determining whether to include
 * weekdays in the output string
 * @returns given date as a readable string
 */
export function dateToReadable(date: string, include_weekday: boolean = true): string {
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
export function timeToReadable(start_time: string, end_time: string): string {
  return `${start_time.slice(0, 5)} - ${end_time.slice(0, 5)}`;
}

/**
 * Returns a given date in an ISO compliant format.
 * @param date a date to convert to an ISO string, today by default.
 * @returns given date in an ISO compliant format
 */
export function dateAsISOString(date: Date = new Date()): string {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
}

/**
 * Returns the end date of this week.
 * @returns end date of this week
 */
export function endOfThisWeekAsISOString(): string {
  const today = new Date();
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
  return dateAsISOString(endOfThisWeek);
}

/**
 * Returns the start date of next week.
 * @returns start date of next week
 */
export function startOfNextWeekAsISOString(): string {
  const today = new Date();
  const nextMon = nextMonday(today);
  const startOfNextWeek = startOfWeek(nextMon, { weekStartsOn: 1 });
  return dateAsISOString(startOfNextWeek);
}

/**
 * Returns the end date of next week.
 * @returns end date of next week
 */
export function endOfNextWeekAsISOString(): string {
  const today = new Date();
  const nextMon = nextMonday(today);
  const endOfNextWeek = endOfWeek(nextMon, { weekStartsOn: 1 });
  return dateAsISOString(endOfNextWeek);
}

/**
 * Returns the start date of this weekend. If it isn't the weekend
 * today it returns the following Saturday otherwise it returns
 * today's date regardless of whether it is Saturday or Sunday.
 * @returns start date of this weekend
 */
export function startOfThisWeekendAsISOString(): string {
  const today = new Date();
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
export function endOfThisWeekendAsISOString(): string {
  const today = new Date();
  if (isSunday(today)) {
    return dateAsISOString(today)
  } else {
    return dateAsISOString(nextSunday(today))
  }
}

export function isBeforeNow(date: Date): boolean {
  const utcDate = date.getTime();
  const utcNow = new Date().getTime();
  return utcDate < utcNow;
}

export function isOlderThan(date: Date, duration: Duration): boolean {
  return add(date, duration) < new Date()
}