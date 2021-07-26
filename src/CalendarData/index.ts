import { getTotalDaysInAdMonth } from "../date-fns";
import { isInBetween } from "../utils";

import { CalendarType } from "../types/main";
import parser from "./parser";
import format from "./format";
import { isInValidRange, isMonthValid, isBsDateValid } from "./validator";
import { getTotalDaysInBsMonth } from "./getBsData";
import * as BSdata from "./data";

const parseBsDate = parser;
const formatBsDate = format;

export { isInValidRange, isMonthValid, isBsDateValid };

export { formatBsDate, parseBsDate };
export { getTotalDaysInBsMonth };

const dataType = ["np", "rm", "en"];
const lengthType = ["full", "short", "min"];

type NameType = "monthName" | "dayName";
type Language = "np" | "rm" | "en";
type Length = "full" | "short" | "min";

type NameReturns = {
  full: string[];
  short: string[];
  min: string[];
};
export function getNames<T extends Length>(
  type: NameType,
  lang: Language,
  length?: T
): T extends Length ? string[] : string[] | NameReturns {
  const nameType = ["monthName", "dayName"];
  if (nameType.includes(type)) {
    if (dataType.includes(lang)) {
      if (length) {
        if (lengthType.includes(length)) {
          return BSdata[lang][type][length];
        }
        console.error(
          `Second parameter in getMonthNames should specify length of month which should be one of ${lengthType}`
        );
      }
    }
    console.error(
      `First Parameter in getMonthNames should specify the name Format which should be one of ${dataType}`
    );
    return BSdata[lang][type] as any;
  } else {
    throw new Error(`Please specify type as one of  ${nameType}`);
  }
}

export const getMonthNames = (
  lang: Language = "np",
  length: Length
): string[] => {
  const allMonths = getNames("monthName", lang, length);
  return allMonths;
};

export const getWeekNames = (lang: Language = "np", length: Length) => {
  const allMonths = getNames("dayName", lang, length);
  if (Array.isArray(allMonths)) return allMonths;
  return null;
};

//TODo
export function getValidYears(
  lang: Language,
  calendarType: CalendarType
): number[] | string[] {
  if (calendarType === "BS") {
    if (dataType.includes(lang)) {
      const allYears = Object.keys(BSdata.calendar_data);
      if (lang === "np" || lang === "rm") {
        const nepYears = allYears.map((a) => getNepaliNumber(a));
        return nepYears;
      } else {
        return allYears;
      }
    } else {
      console.error(
        `Expected paramters for getValidYears is one of the : ${dataType}`
      );
      const allYears = Object.keys(BSdata.calendar_data);
      if (lang === "np" || lang === "rm") {
        const nepYears = allYears.map((a) => getNepaliNumber(a));
        return nepYears;
      }
      return [];
    }
  } else {
    let arr = [];
    for (let i = BSdata.minAdYear; i <= BSdata.maxAdYear; i++) {
      arr.push(i);
    }
    //TODO
    return arr;
  }
}

// type EachNumeral = keyof typeof BSdata.nums;
// type Numeral = typeof BSdata.nums[EachNumeral];
export const getNepaliNumber = (n: number | string) => {
  if (isNaN(+n)) {
    throw new TypeError(`Expected Number  instead got ${typeof n} value=${n}`);
  }
  let nep = "";
  const str = String(n);
  for (let i = 0; i < str.length; i++) {
    nep += BSdata.npNumsArray[str[i] as any];
  }
  return nep;
};

//TODO
type EachBSYear = keyof typeof BSdata.calendar_data;
// type Numeral = typeof BSdata.calendar_data[EachNumeral];
const cache = {
  // stores the number of days to the end of corresponding year from the base date i.e. date.base_bs
  //TODO memoize
  getCumulativeTotal: () => {
    const years = Object.keys(BSdata.calendar_data);
    const startingYear = +years[0];
    const totalYears = years.length;
    let obj: any = {}; //TODO

    for (let i = 0; i < totalYears; i++) {
      const yearIndex = startingYear + i;
      obj[yearIndex] =
        (i === 0 ? 0 : obj[yearIndex - 1]) +
        BSdata.calendar_data[yearIndex as EachBSYear].slice(-1)[0];
    }
    return obj;
  },
};

/**
 * Returns the number of days from the base_bs day
 * @param {Date} date - AD date in the format
 */
const countBSDaysFromBaseDateUsingAdDate = (
  year: number,
  month: number,
  day: number
) => {
  const { base_ad } = BSdata;

  const dateObj = { year, month: month - 1, day };

  const date1 = new Date(base_ad.year, base_ad.month, base_ad.day);
  const date2 = new Date(dateObj.year, dateObj.month, dateObj.day);

  const timeDiff = date2.getTime() - date1.getTime();

  const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayCount;
};
/**
 * Returns the Index of week  0 for sunday and so on..
 * @param {number} daysCount - No. of days from the base bs
 */
const getDayIndex = (daysCount: number) =>
  ((daysCount % 7) + BSdata.base_bs.dayOfWeek) % 7;

//month =1 for Baisakh
//TODO error checking
export const ad2bs = (years: number, months: number, day: number) => {
  const { base_bs, calendar_data } = BSdata;
  const dayCount = countBSDaysFromBaseDateUsingAdDate(years, months, day);

  const cumulativeData = cache.getCumulativeTotal();

  const values = Object.values(cumulativeData);
  const yearIndex = values.findIndex((value) => (value as number) >= dayCount);

  let year = +base_bs.year + yearIndex;
  let offsetDays =
    yearIndex === 0 ? dayCount : dayCount - cumulativeData[year - 1];

  let month = 0;

  // while (1) {
  //   if (calendar_data[year as EachBSYear][month] <= offsetDays) {
  //     //check
  //     offsetDays -= calendar_data[year as EachBSYear][month];
  //     month++;
  //   } else break;
  // }
  while (calendar_data[year as EachBSYear][month] <= offsetDays) {
    //check
    offsetDays -= calendar_data[year as EachBSYear][month];
    month++;
  }
  if (+month === 12) {
    month = 0;
    year = year + 1;
  }

  return {
    year,
    month: month + 1, //1 for Baisakh
    date: offsetDays + 1,
    day: getDayIndex(dayCount),
  };
};

//month =1 for Baisakh
//TODO error checking
export const bs2ad = (year: number, month: number, day: number) => {
  const { base_ad, calendar_data } = BSdata;

  const cumulativeData = cache.getCumulativeTotal();

  let prevMonthCumulativeTotal = 0;
  const prevYearCumulativeTotal = cumulativeData[+year - 1];
  for (let i = 0; i < +month - 1; i++) {
    prevMonthCumulativeTotal += calendar_data[+year as EachBSYear][i];
  }

  const countDays =
    prevYearCumulativeTotal + prevMonthCumulativeTotal + +day - 1;

  const date1 = new Date(base_ad.year, base_ad.month, base_ad.day);
  date1.setDate(date1.getDate() + countDays);

  const ad = {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    date: date1.getDate(),
    day: date1.getDay(),
  };
  return ad;
};

export const getStartingDayOfBsMonth = (year: number, month: number) => {
  const monthIndex = month - 1;
  const cumulativeData = cache.getCumulativeTotal();
  const prevYearTotal = cumulativeData[year - 1] || 0;
  let days = 0;
  for (let i = 0; i < monthIndex; i++) {
    days += BSdata.calendar_data[year as EachBSYear][i];
  }
  const daysCount = prevYearTotal + days;
  return getDayIndex(daysCount);
};

type DateDetail = {
  date: number;
  year: number;
  month: number;
  monthName: string;
};
type RangeDetail = {
  from: DateDetail;
  to: DateDetail;
};
export const getBsRangeForAdCalendar = (
  year: number,
  month: number
): RangeDetail => {
  const allNepaliMonth = getMonthNames("np", "full");

  const bsfirst = ad2bs(year, month, 1);
  const lastDate = getTotalDaysInAdMonth(year, month);
  const bsLast = ad2bs(year, month, lastDate);

  const firstMonth = allNepaliMonth[bsfirst.month - 1];
  const lastMonth = allNepaliMonth[bsLast.month - 1];

  return {
    from: { ...bsfirst, monthName: firstMonth },
    to: { ...bsLast, monthName: lastMonth },
  };
};
export const getAdRangeForBsCalendar = (
  year: number,
  month: number
): RangeDetail => {
  const allEnglishMonth = getMonthNames("en", "short");

  const adfirst = bs2ad(year, month, 1);
  const lastDate = getTotalDaysInBsMonth(year, month);
  const adLast = bs2ad(year, month, lastDate);

  const firstMonth = allEnglishMonth[adfirst.month - 1];
  const lastMonth = allEnglishMonth[adLast.month - 1];

  return {
    from: { ...adfirst, monthName: firstMonth },
    to: { ...adLast, monthName: lastMonth },
  };
};

type DateInfo = {
  month: number;
  year: number;
  totalDays: number;
};

//TODo Error
export const getBsInfoOfoffsetDate = (
  year: number,
  month: number,
  offset?: { year?: number; month?: number }
): DateInfo => {
  const yearOffset = year + (offset?.year ?? 0);
  const monthOffset = month + (offset?.month ?? 0);

  const newMonth = monthOffset % 12 || 12;
  const newYear = yearOffset + Math.floor(monthOffset / 12);

  const newMonthIndex = newMonth - 1;

  if (isInBetween(newYear, BSdata.minBsYear, BSdata.maxBsYear)) {
    const totalDays =
      BSdata.calendar_data[newYear as EachBSYear][newMonthIndex];
    return {
      month: newMonth,
      year: newYear,
      totalDays,
    };
  } else throw new Error("Error");
};
