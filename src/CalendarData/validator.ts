import { getTotalDaysInBsMonth } from "./getBsData";
import { CalendarType, IDateObject } from "../types/main";
import { isInBetween } from "../utils";
import {
  minBsYear,
  maxBsYear,
  minAdYear,
  maxAdYear,
  minAdDate,
  minAdMonth,
} from "./data";
import { getTotalDaysInAdMonth } from "../date-fns";

export const isMonthValid = (
  month: number | string,
  throwError?: boolean
): boolean => {
  if (isNaN(+month)) {
    if (throwError) {
      throw new TypeError(
        `Month can be in between 1-2 instead got ${month} of type ${typeof month}`
      );
    }
    return false;
  }
  if (+month >= 1 && +month <= 12) {
    return true;
  }

  if (throwError)
    throw new Error(`Month can be in between 1-12 instead got ${+month}`);

  return false;
};

export const isBsDateValid = (
  dateObj: IDateObject,
  throwError?: boolean
): boolean => {
  const { year, month, date } = dateObj;

  //Check if year is Valid
  if (isInBetween(year, minBsYear, maxBsYear)) {
    //Check if month is valid
    if (isMonthValid(month, throwError)) {
      const totalDays = getTotalDaysInBsMonth(year, month);
      //Check if Date is Valid
      if (dateObj.date <= totalDays) {
        return true;
      } else {
        if (throwError)
          throw new RangeError(
            `Total Days of the month ${month} of year ${year} BS is ${totalDays} but instead got ${date} as Date. in the given dateObject ${JSON.stringify(
              dateObj
            )}`
          );
      }
      return false;
    } else return false;
  } else {
    if (throwError) {
      throw new RangeError(
        `Year ${minBsYear} BS - ${maxBsYear} BS is only supported. instead got ${year} in getMonthOffset function`
      );
    }
    return false;
  }
};

export const isAdDateValid = (
  dateObj: IDateObject,
  throwError?: boolean
): boolean => {
  const { year, month, date } = dateObj;

  //Check if year is Valid
  if (isInBetween(year, minAdYear, maxAdYear)) {
    if (year === minAdYear) {
      if (month < minAdMonth) {
        if (throwError) {
          throw new RangeError(
            `Minimum valid Ad Date is year=${minAdYear} month=${minAdMonth} date=${minAdDate} instead got month=${month} for year ${year}`
          );
        }
        return false;
      }
      if (month === minAdMonth) {
        if (date < minAdDate) {
          if (throwError) {
            throw new RangeError(
              `Minimum valid Ad Date is year=${minAdYear} month=${minAdMonth} date=${minAdDate} instead got date=${date} for year ${year} and month ${month}`
            );
          }
          return false;
        }
      }
    }
    //Check if month is valid
    if (isMonthValid(month, throwError)) {
      const totalDays = getTotalDaysInAdMonth(year, month);
      //Check if Date is Valid
      if (date <= totalDays) {
        return true;
      } else {
        if (throwError)
          throw new RangeError(
            `Total Days of the month ${month} of year ${year} BS is ${totalDays} but instead got ${date} as Date. in the given dateObject ${JSON.stringify(
              dateObj
            )}`
          );
      }
      return false;
    } else return false;
  } else {
    if (throwError) {
      throw new RangeError(
        `Year ${minBsYear} BS - ${maxBsYear} BS is only supported. instead got ${year} in getMonthOffset function`
      );
    }
    return false;
  }
};

export const isInValidRange = (
  dateObj: IDateObject,
  calendarType: CalendarType,
  throwError: boolean = false
): boolean => {
  if (calendarType === "BS") {
    return isBsDateValid(dateObj, throwError);
  } else {
    return isAdDateValid(dateObj, throwError);
  }
};

type iterator = {
  index: number;
  length: number;
};

type DateFormat = {
  yyyy?: iterator;
  mm?: iterator;
  m?: iterator;
  dd?: iterator;
  d?: iterator;
};

export function isDateValidWithFormat(input: string, format: string): boolean {
  format = String(format)?.toLocaleLowerCase(); // default format
  const parts = input.match(/(\d+)/g);

  const formatSymbol = format.replace(/(yyyy|dd|d|mm|m)/g, "");
  const inputSymbol = input.replace(/\d/g, "");

  if (!parts) return false;

  let i = 0;
  const fmt: DateFormat = {};
  format.replace(/(yyyy|dd|d|mm|m)/g, function (part) {
    fmt[part as keyof DateFormat] = { index: i++, length: part.length };
    return "";
  });

  if (inputSymbol !== formatSymbol) return false;

  const yearD = fmt["yyyy"];

  const monthD = fmt["mm"] ?? fmt["m"];
  const dateD = fmt["dd"] ?? fmt["d"];

  if (yearD !== undefined && monthD !== undefined && dateD !== undefined) {
    let year = +parts[yearD.index];
    let month = +parts[monthD.index];
    let date = +parts[dateD.index];

    console.log("What", month > 12);

    console.log("Year", year, "month", month, "date", date);
    if (month > 12 || date > 32) {
      return false;
    }
  }

  if (yearD !== undefined && monthD !== undefined && dateD !== undefined) {
    let year = parts[yearD.index];
    let month = parts[monthD.index];
    let date = parts[dateD.index];

    if (
      year.length === yearD.length &&
      month.length === monthD.length &&
      date.length === dateD.length
    )
      return true;
  }

  return false;
}
