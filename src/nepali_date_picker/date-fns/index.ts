import { DateType } from "./../NewCalendar/types.d";
import isMatch from "date-fns/isMatch";
import parse from "date-fns/parse";
import format from "date-fns/format";

//Since this lib will presumably require only year, month and date
// converting all small to Capital M as the date-fns require month to be "M"
// Allowing flexbility for user of this library to make use of m, y and d , anyway they want
const dateFormatFormatter = (dateFormat: string) => {
  return dateFormat.toLowerCase()?.replaceAll("m", "M");
};

export const isDateValid = (
  initialDate: string,
  dateFormat: string
): boolean => {
  const formatString = dateFormatFormatter(dateFormat);
  return isMatch(initialDate, formatString);
};

export const parseDate = (initialDate: string, dateFormat: string): Date => {
  const formatString = dateFormatFormatter(dateFormat);
  return parse(initialDate, formatString, new Date());
};

export const getDateFromObject = (obj: DateType): Date => {
  const date = obj.year + "-" + obj.month + "-" + obj.day;
  return new Date(date);
};

export const dateFormatter = (date: Date, dateFormat: string): string => {
  const formatString = dateFormatFormatter(dateFormat);
  return format(date, formatString);
};
export { dateFormatFormatter };
