import * as BSdata from "./bsData";

const dataType = ["np", "rm", "en"];
const lengthType = ["full", "short", "min"];

const getNames = (type, dataFormat, length) => {
  const nameType = ["monthName", "dayName"];
  if (nameType.includes(type)) {
    if (dataType.includes(dataFormat)) {
      if (length) {
        if (lengthType.includes(length)) {
          return BSdata[dataFormat][type][length];
        }
        console.error(
          `Second parameter in getMonthNames should specity length of month which should be one of ${lengthType}`
        );
      }
    }
    console.error(
      `First Parameter in getMonthNames should specity the name Format which should be one of ${dataType}`
    );
    return BSdata[dataFormat][type];
  } else {
    throw new Error(`Please specify type as one of  ${nameType}`);
  }
};

export const getMonthNames = (type = "np", length) => {
  return getNames("monthName", type, length);
};

export const getWeekNames = (type = "np", length) => {
  return getNames("dayName", type, length);
};

export const convertEnglishToNepaliNumeral = (str) => {
  if (isNaN(str)) {
    throw new Error(
      "Expected Number in convertEnglishToNepaliNumeral function"
    );
  }
  let nep = "";
  for (let i = 0; i < str.length; i++) {
    nep += BSdata.nums[str[i]];
  }
  return nep;
};

export const getValidYears = (type = "np") => {
  if (dataType.includes(type)) {
    const allYears = Object.keys(BSdata.calendar_data);
    if (type === "np" || type === "rm") {
      const nepYears = allYears.map((a) => convertEnglishToNepaliNumeral(a));
      return nepYears;
    } else {
      return allYears;
    }
  } else {
    console.error(
      `Expected paramters for getValidYears is one of the : ${dataType}`
    );
    const allYears = Object.keys(BSdata.calendar_data);
    if (type === "np" || type === "rm") {
      const nepYears = allYears.map((a) => convertEnglishToNepaliNumeral(a));
      return nepYears;
    }
  }
};

const toNumber = (n) => {
  if (n === undefined) return null;
  if (n === "") return null;
  if (isNaN(+n)) return null;

  return +n;
};

export const getNumberOfDaysInMonth = (year, month) => {
  try {
    const allYears = Object.keys(BSdata.calendar_data);

    if (year && allYears.includes(year + "") && toNumber(month) <= 12) {
      return BSdata.calendar_data[year][toNumber(month)];
    } else
      throw new Error(
        `Expeceted first paramater as year within range 1978-2092 and second parameter as month within range 0-12. But got year as ${year} and month as ${month} in getNumberOfDaysInMonth function`
      );
  } catch (err) {
    throw new Error("Error", err);
    // console.(err);
  }
};

//TODO store in cache;
const getCumulativeTotal = () => {
  const years = Object.keys(BSdata.calendar_data);
  const startingYear = +years[0];
  const totalYears = years.length;
  let obj = {};
  for (let i = 0; i < totalYears; i++) {
    obj[startingYear + i] =
      (i === 0 ? 0 : obj[startingYear + i - 1]) +
      BSdata.calendar_data[startingYear + i].slice(-1)[0];
  }
  return obj;
};

const getDayIndex = (daysCount) =>
  ((daysCount % 7) + BSdata.base_bs.dayOfWeek) % 7;

export const getInitialNepaliWeek = (year, month) => {
  const cumulativeData = getCumulativeTotal();
  const prevYearTotal = cumulativeData[year - 1] || 0;
  let days = 0;
  for (let i = 0; i < month; i++) {
    days += BSdata.calendar_data[year][i];
  }
  const daysCount = prevYearTotal + days;
  return getDayIndex(daysCount);
};
