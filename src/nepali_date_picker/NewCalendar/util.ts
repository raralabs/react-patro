import { CalendarDataType } from "./types";
import { calendarData, calendarFunctions } from "../helper_bs";

interface DateType {
  day: number;
  month: number;
  year: number;
}
interface ADBSDateType {
  ad: DateType;
  bs: DateType;
}
const getTodaysDate = (): ADBSDateType => {
  const todayDate = new Date();
  const todayBsDate = calendarFunctions.getBsDateByAdDate(
    todayDate.getFullYear(),
    todayDate.getMonth() + 1,
    todayDate.getDate()
  );
  const ad = {
    day: todayDate.getDate(),
    month: todayDate.getMonth() + 1,
    year: todayDate.getFullYear(),
  };

  const bs = {
    day: todayBsDate.bsDate,
    month: todayBsDate.bsMonth,
    year: todayBsDate.bsYear,
  };

  return { bs, ad };
};

function checkIsSelected(selectedData: DateType, adDate: DateType): boolean {
  if (
    selectedData.day &&
    adDate.day === selectedData.day &&
    adDate.year === selectedData.year &&
    adDate.month === selectedData.month
  ) {
    return true;
  } else return false;
}

function checkIsToday(adDate: DateType) {
  const { ad: todayDateAD } = getTodaysDate();
  if (
    todayDateAD.day === adDate.day &&
    todayDateAD.month === adDate.month &&
    todayDateAD.year === adDate.year
  ) {
    return true;
  }
}

//TODO check
const getMonthOffset = (date: CalendarDataType, offset: number) => {
  const offsetValue = Number(offset);

  if (isNaN(offsetValue)) {
    throw new TypeError(
      `Expected type of offset for change year function is number instead received ${typeof offset}`
    );
  }

  const monthOffset = date.month + offset;
  const yearOffset = monthOffset ? Math.floor(monthOffset / 13) : -1;

  const nextYear = date.year + yearOffset;
  const nextMonth = monthOffset % 12 || 12;
  const nextDate = date.dayValue;

  if (nextYear < calendarData.minBsYear || nextYear > calendarData.maxBsYear) {
    throw new RangeError(
      `Year ${calendarData.minBsYear}BS - ${calendarData.maxBsYear}BS is only supported. instead got ${nextYear} in getMonthOffset function`
    );
  }

  return { year: nextYear, month: nextMonth, date: nextDate };
};

export { getTodaysDate, checkIsToday, checkIsSelected, getMonthOffset };
