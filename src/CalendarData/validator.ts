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

type DateFormat = {
  yyyy?: number;
  mm?: number;
  m?: number;
  dd?: number;
  d?: number;
};

export function isDateValidWithFormat(
  input: string,
  format: string,
  throwError?: boolean
): boolean {
  if (!format || !input) {
    if (throwError) {
      throw new Error(
        `Date provided or Format  isn't supported. Got date=${input} and format =${format}`
      );
    }
    return false;
  }
  format = String(format)?.toLocaleLowerCase(); // default format
  const parts = input.match(/(\d+)/g);

  console.log({ parts });
  if (parts) {
    let i = 0;
    const fmt: DateFormat = {};

    format.replace(/(yyyy|dd|d|mm|m)/g, function (part) {
      fmt[part as keyof DateFormat] = i++;
      return "";
    });

    const yearIndex = fmt["yyyy"];
    const monthIndex = fmt["mm"] ?? fmt["m"];
    const dateIndex = fmt["dd"] ?? fmt["d"];

    if (yearIndex === undefined) {
      if (throwError)
        throw new TypeError(
          `Year isn't Provided in the given date input or the format doesn't contain correct combination of 'yyyy'.  Acceptable formats are the pemutation of 'yyyy', 'mm' and 'dd'  instead got ${format} `
        );
      return false;
    }
    if (monthIndex === undefined) {
      if (throwError)
        throw new TypeError(
          `Month isn't Provided in the given date input or the format doesn't contain correct combination of 'mm' | 'm'. Acceptable formats are the pemutation of 'yyyy', 'mm','m','d', and 'dd'  instead got ${format} `
        );
      return false;
    }
    if (dateIndex === undefined) {
      if (throwError)
        throw new TypeError(
          `Date isn't Provided in the given date input or the format doesn't contain correct combination of 'dd' | 'd'. Acceptable formats are the pemutation of 'yyyy', 'mm','m', 'd', and 'dd'  instead got ${format} `
        );
      return false;
    }
    const year = parts[yearIndex];
    const month = parts[monthIndex];
    const date = parts[dateIndex];

    if (!year || !month || !date) {
      if (throwError) {
        throw new Error("Invalid date");
      }
      return false;
    }

    return true;
  } else {
    if (throwError)
      throw new TypeError(
        "Passed Input isn't a valid date. Please check again.  Acceptable formats are the pemutation of 'yyyy', 'mm','m','d' and 'dd' "
      );
    return false;
  }
}
