import {
  ad2bs,
  bs2ad,
  isInValidRange,
  parseBsDate,
} from "./../CalendarData/index";
import { CalendarType, DateRange, IDateObject } from "./types.d";
import {
  parseDate,
  getDateFromObject,
  isDateValid,
  dateFormatter,
} from "../date-fns";
import { DisableProps } from "./types";

type ADBSDateType = {
  ad: IDateObject;
  bs: IDateObject;
};

const getTodaysDate = (): ADBSDateType => {
  const todayDate = new Date();

  const adYear = todayDate.getFullYear();
  const adMonth = todayDate.getMonth() + 1;
  const adDate = todayDate.getDate();

  const {
    date: bsDate,
    month: bsMonth,
    year: bsYear,
  } = ad2bs(adYear, adMonth, adDate);

  const ad = {
    date: adDate,
    month: adMonth,
    year: adYear,
  };

  const bs = {
    date: bsDate,
    month: bsMonth,
    year: bsYear,
  };

  return { bs, ad };
};

function checkIsSelected(
  selectedData: IDateObject,
  adDate: IDateObject
): boolean {
  if (
    selectedData.date &&
    adDate.date === selectedData.date &&
    adDate.year === selectedData.year &&
    adDate.month === selectedData.month
  ) {
    return true;
  } else return false;
}

function checkIsToday(adDate: IDateObject): boolean {
  const { ad: todayDateAD } = getTodaysDate();
  if (
    todayDateAD.date === adDate.date &&
    todayDateAD.month === adDate.month &&
    todayDateAD.year === adDate.year
  ) {
    return true;
  }
  return false;
}

export function checkIsDisabled(
  adDateObj: IDateObject,
  disableConfig: DisableProps,
  dateFormat: string,
  bsDateObj: IDateObject
): boolean {
  const { disableDate, maxDate, minDate, disablePast, disableFuture } =
    disableConfig;

  const adDate = getDateFromObject({
    year: adDateObj.year,
    month: adDateObj.month,
    date: adDateObj.date,
  });

  const formattedAdDate = dateFormatter(adDate, dateFormat);
  const maxDateString = maxDate ? parseDate(maxDate, dateFormat) : null;
  const minDateString = minDate ? parseDate(minDate, dateFormat) : null;

  const today = new Date();
  if (
    typeof disableDate === "function" &&
    disableDate(formattedAdDate, adDateObj, bsDateObj, adDate)
  )
    return true;
  if (adDate > today && disableFuture) {
    return true;
  }
  if (adDate < today && disablePast) {
    return true;
  }

  if (maxDateString && adDate > maxDateString) {
    return true;
  }

  if (minDateString && adDate < minDateString) {
    return true;
  }

  return false;
}

export function checkIsBsDisabled(
  adDateObj: IDateObject,
  disableConfig: DisableProps,
  dateFormat: string,
  bsDateObj: IDateObject
): boolean {
  const { disableDate, maxDate, minDate, disablePast, disableFuture } =
    disableConfig;

  const adDate = getDateFromObject({
    year: adDateObj.year,
    month: adDateObj.month,
    date: adDateObj.date,
  });

  const formattedAdDate = dateFormatter(adDate, dateFormat);
  const maxDateString = maxDate ? parseDate(maxDate, dateFormat) : null;
  const minDateString = minDate ? parseDate(minDate, dateFormat) : null;

  const today = new Date();
  if (
    typeof disableDate === "function" &&
    disableDate(formattedAdDate, adDateObj, bsDateObj, adDate)
  )
    return true;
  if (adDate > today && disableFuture) {
    return true;
  }
  if (adDate < today && disablePast) {
    return true;
  }

  if (maxDateString && adDate > maxDateString) {
    return true;
  }

  if (minDateString && adDate < minDateString) {
    return true;
  }

  return false;
}
//TODO may be generic???
// inclusive of first and last date;
export function isInBetween(data: any, first: any, last: any): boolean {
  if (data >= first && data <= last && first < last) {
    return true;
  } else return false;
}

export function checkIsInRange(
  adDateObj: IDateObject,
  range: DateRange
): boolean {
  const adDate = getDateFromObject(adDateObj);
  const from = range?.from;
  const to = range?.to;
  const dateFormat = range?.format;

  if (from && to && dateFormat) {
    const fromDate = parseDate(from, dateFormat);
    const toDate = parseDate(to, dateFormat);
    if (fromDate > toDate) {
      throw new RangeError(
        `from  date is greater than to Date. Received from =${JSON.stringify(
          range.from
        )} && to = ${JSON.stringify(range.to)}`
      );
    }
    if (isInBetween(adDate, fromDate, toDate)) {
      return true;
    }
  }
  return false;
}
const isYearMonthDateSame = (dateLeft: Date, dateRight: Date): boolean => {
  if (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getDate() === dateRight.getDate()
  )
    return true;
  return false;
};
export function checkIsRangeBoundary(
  adDateObj: IDateObject,
  range?: DateRange
): boolean {
  const adDate = getDateFromObject(adDateObj);
  const from = range?.from;
  const to = range?.to;
  const dateFormat = range?.format;

  if (dateFormat) {
    const fromDate = from ? parseDate(from, dateFormat) : null;
    const toDate = to ? parseDate(to, dateFormat) : null;

    if (fromDate && toDate && fromDate > toDate) {
      throw new RangeError(
        `from  date is greater than to Date. Received from =${JSON.stringify(
          range?.from
        )} && to = ${JSON.stringify(range?.to)}`
      );
    }

    if (
      (fromDate && isYearMonthDateSame(adDate, fromDate)) ||
      (toDate && isYearMonthDateSame(adDate, toDate))
    ) {
      return true;
    }
  }
  return false;
}

//TODO check change its name
const getMonthOffset = (
  dateObj: { year: number; month: number; date: number },
  offset: number,
  calendarType: CalendarType
): IDateObject => {
  const { year, month, date } = dateObj;
  const offsetValue = Number(offset);

  if (isNaN(offsetValue)) {
    throw new TypeError(
      `Expected type of offset for change year function is number instead received ${typeof offset}`
    );
  }

  const monthOffset = month + offset;
  const yearOffset = monthOffset ? Math.floor(monthOffset / 13) : -1;

  const nextYear = year + yearOffset;
  const nextMonth = monthOffset % 12 || 12;
  const nextDate = date;

  //TODO only specified for BS. so causes issue for AD,
  isInValidRange(
    { year: nextYear, month: nextMonth, date: nextDate },
    calendarType,
    true
  );

  return { year: nextYear, month: nextMonth, date: nextDate };
};

export const getSubDate = (
  mainDate: IDateObject,
  isAD: boolean
): IDateObject => {
  if (isAD) {
    const {
      date: bsDate,
      month: bsMonth,
      year: bsYear,
    } = ad2bs(mainDate.year, mainDate.month, mainDate.date);
    return {
      year: bsYear,
      month: bsMonth,
      date: bsDate,
    };
  } else {
    const {
      date: adDate,
      month: adMonth,
      year: adYear,
    } = bs2ad(mainDate.year, mainDate.month, mainDate.date);

    return {
      year: adYear,
      month: adMonth,
      date: adDate,
    };
  }
};

type AllDateProps = {
  maxDate?: string | null;
  minDate?: string | null;
  defaultValue?: string | null;
  value?: string | null;
};

export const checkDatePropsValidity = (
  allDateProps: AllDateProps,
  dateFormat: string,
  calendarType: CalendarType
) => {
  type AllDateString = keyof typeof allDateProps;
  const checker: AllDateString[] = [
    "maxDate",
    "minDate",
    "defaultValue",
    "value",
  ];

  function throwTypeError(date: string, propName: string, dateFormat: string) {
    throw new TypeError(
      `Invalid Date Format. Expected Date Format ${dateFormat} instead got ${date} for prop ${propName} passed in Calendar. `
    );
  }
  checker.forEach((prop) => {
    const value = allDateProps[prop];
    if (value) {
      if (!isDateValid(value, dateFormat)) {
        throwTypeError(value, prop, dateFormat);
        return;
      } else {
        const dateObj = parseBsDate(value, dateFormat);
        isInValidRange(dateObj, calendarType, true);
      }
    }
  });
};
export const padDateMonth = (val: string | number) => {
  return `${val}`.padStart(2, "0");
};

// export { padDateMonth };

export { getTodaysDate, checkIsToday, checkIsSelected, getMonthOffset };
