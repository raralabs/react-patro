import { IDateObject } from "./../Calendar/types.d";
import { DateType } from "../Calendar/types";
import isMatch from "date-fns/isMatch";
import parse from "date-fns/parse";
import format from "date-fns/format";

//Since this lib will presumably require only year, month and date
// converting all small to Capital M as the date-fns require month to be "M"
// Allowing flexbility for user of this library to make use of m, y and d , anyway they want
const dateFormatFormatter = (dateFormat: string) => {
  return dateFormat.toLowerCase()?.replaceAll("m", "M");
};

// const minAdYear = 1913;
// const maxAdYear = 2043;

// type InvalidMessage = { invalidMsg: string };
export const isDateValid = (date: string, dateFormat: string): boolean => {
  if (!date || !dateFormat) return false;
  const formatString = dateFormatFormatter(dateFormat);

  // const dateObj = parseDate(date, dateFormat);
  // const year = dateObj.getFullYear();
  // if (+year > 1913 && +year < 2043) {
  //   return false;
  // }
  return isMatch(date, formatString);
};

export const parseDate = (initialDate: string, dateFormat: string): Date => {
  const formatString = dateFormatFormatter(dateFormat);
  return parse(initialDate, formatString, new Date());
};

export const getDateFromObject = (obj: IDateObject): Date => {
  const date = obj.year + "-" + obj.month + "-" + obj.date;
  return new Date(date);
};

export const dateFormatter = (date: Date, dateFormat: string): string => {
  const formatString = dateFormatFormatter(dateFormat);

  return format(date, formatString);
};

export const getFormattedDateFromObject = (
  obj: IDateObject,
  dateFormat: string
): string => {
  const date = getDateFromObject(obj);
  return dateFormatter(date, dateFormat);
};

type offsetType = {
  year?: number;
  month?: number;
  day?: number;
};
//returns date
//TODO a nice name and nice implementation
export function getOffsetFormattedDate(
  offsetObj: offsetType,
  dateFormat?: string,
  dateString?: string | null
): string {
  const date =
    dateString && dateFormat ? parseDate(dateString, dateFormat) : new Date();
  const newDate = new Date(
    date.getFullYear() + +(offsetObj?.year ?? 0),
    date.getMonth() + +(offsetObj?.month ?? 0),
    date.getDate() + +(offsetObj?.day ?? 0)
  );

  //TODO allow for this date
  // return dateFormat ? dateFormatter(newDate, dateFormat) : date;
  return dateFormat ? dateFormatter(newDate, dateFormat) : "";
}

export const getInfoOfOffsetDate = (
  year: number,
  month: number,
  offsetObj?: { year?: number; month?: number }
) => {
  // const currentDate = new Date(year, month, 1);

  const offsetDate = new Date(
    year + +(offsetObj?.year ?? 0),
    month + +(offsetObj?.month ?? 0),
    0
  );

  const totalDays = offsetDate.getDate();

  return {
    year: offsetDate.getFullYear(),
    month: offsetDate.getMonth() + 1,
    totalDays: totalDays,
  };
};
export const getDateObj = (
  date: string,
  dateFormat: string
): IDateObject | null => {
  if (date && isDateValid(date, dateFormat)) {
    const dateString = parseDate(date, dateFormat);

    return {
      date: dateString.getDate(),
      month: dateString.getMonth() + 1,
      year: dateString.getFullYear(),
    };
  }
  return null;
};

export const changeDateFromOneFormatToAnother = (
  date: string,
  previousDateFormat: string,
  newDateFormat: string
): string => {
  const previousDate = parseDate(date, previousDateFormat);

  const newDate = dateFormatter(previousDate, newDateFormat);
  return newDate;
};

export function calculateDate<T extends string | Date>(
  dateOffset: DateType,
  dateStr: T,
  dateFormat?: string
): T extends string ? string : Date {
  //TODO make common
  // if Date String is provided
  if (dateStr instanceof Date) {
    const date = new Date(dateStr);
    const newDate = new Date(
      date.getFullYear() + +(dateOffset?.year ?? 0),
      date.getMonth() + +(dateOffset?.month ?? 0),
      date.getDate() + +(dateOffset?.day ?? 0)
    );
    return newDate as any;
  } else if (dateFormat && isDateValid(dateStr, dateFormat)) {
    // if Date format is provided
    const date = parseDate(dateStr, dateFormat);
    const newDate = new Date(
      date.getFullYear() + +(dateOffset?.year ?? 0),
      date.getMonth() + +(dateOffset?.month ?? 0),
      date.getDate() + +(dateOffset?.day ?? 0)
    );
    return newDate as any;
  } else {
    throw new Error(
      `Provided Date Format or Date String do not match. Got dateFormat=${dateFormat} && dateString=${dateStr}`
    );
  }
}

export function getTotalDaysInAdMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export { dateFormatFormatter };
