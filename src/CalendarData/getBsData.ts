import { calendar_data, minBsYear, maxBsYear } from "./data";
//TODO

type EachBSYear = keyof typeof calendar_data;

export const getTotalDaysInBsMonth = (year: number, month: number): number => {
  try {
    const allYears = Object.keys(calendar_data);

    const monthIndex = +month - 1;
    if (year && allYears.includes(year + "") && monthIndex <= 12) {
      return calendar_data[year as EachBSYear][monthIndex];
    } else
      throw new RangeError(
        `Expeceted first paramater as year within range ${minBsYear}-${maxBsYear} and second parameter as month within range 0-12. But got year as ${year} and month as ${month} in getNumberOfDaysInMonth function`
      );
  } catch (err) {
    throw new Error("Error");
    // console.(err);
  }
};
