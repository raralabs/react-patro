import { ad2bs, formatBsDate } from "./../CalendarData/index";
import { IDateObject } from "../types/main";
import parse from "date-fns/parse";
import format from "date-fns/format";
import { isDateValidWithFormat } from "../CalendarData/validator";

//Since this lib will presumably require only year, month and date
// converting all small to Capital M as the date-fns require month to be "M"
// Allowing flexbility for user of this library to make use of m, y and d , anyway they want
const dateFormatFormatter = (dateFormat: string) => {
  return dateFormat.toLowerCase()?.replaceAll("m", "M");
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
  if (date && isDateValidWithFormat(date, dateFormat)) {
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

export function getTotalDaysInAdMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

type offsetType = {
  year?: number;
  month?: number;
  day?: number;
};

//adds offset to the current provided date and format it accordingly

export function getOffsetFormattedDate(
  offsetObj: offsetType,
  dateFormat?: string,
  dateString?: string | null,
  calendarType?: string | null
): string {
  let date =
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

export function addOffsetBS(offsetObj: offsetType, dateFormat?: string) {
  const adDate = new Date();

   const newDate = new Date(
     adDate.getFullYear() + +(offsetObj?.year ?? 0),
     adDate.getMonth() + +(offsetObj?.month ?? 0),
     adDate.getDate() + +(offsetObj?.day ?? 0)
   );

  const bsDate = ad2bs(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate()
  );

  return dateFormat ? formatBsDate(bsDate, dateFormat) : "";
}


