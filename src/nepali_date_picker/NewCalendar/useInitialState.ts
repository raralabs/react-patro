import { DateType } from "./types";
import { calendarFunctions } from "../helper_bs";
import { isDateValid, parseDate } from "../date-fns";

const useInitialState = (initialDate: string, dateFormat: string) => {
  let currentDate = new Date();
  let selectedData: DateType = {
    day: null,
    month: null,
    year: null,
  };

  if (initialDate && isDateValid(initialDate, dateFormat)) {
    currentDate = parseDate(initialDate, dateFormat);

    selectedData = {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }
  const currentBsDate = calendarFunctions.getBsDateByAdDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );

  const bsYear = currentBsDate.bsYear;
  const bsMonth = currentBsDate.bsMonth;
  const bsDay = currentBsDate.bsDate;

  const _data = calendarFunctions.getBsMonthInfoByBsDate(
    bsYear,
    bsMonth,
    bsDay
  );
  return {
    selectedData,
    state: {
      calendarRenderingData: {
        adMonth: _data.adMonth,
        adYear: _data.adYear,
        adStartingDayOfWeek: _data.adStartingDayOfWeek,
        adTotalDaysInMonth: _data.adMonthsDay,
        adDayValue: _data.adDay,
        adPrevMonth: _data.adPrevMonth,
        adPrevYear: _data.adPrevYear,
        adPrevMonthDays: _data.adDaysInPrevMonth,
        adNextMonth: _data.adNextMonth,
        adNextYear: _data.adNextYear,

        bsMonth: _data.bsMonth,
        bsYear: _data.bsYear,
        bsStartingDayOfWeek: _data.bsStartingDayOfWeek,
        bsTotalDaysInMonth: _data.bsMonthDays,
        bsDayValue: _data.bsDay,
        bsPrevMonth: _data.bsPrevMonth,
        bsPrevYear: _data.bsPrevYear,
        bsPrevMonthDays: _data.bsDaysInPrevMonth,
        bsNextMonth: _data.bsNextMonth,
        bsNextYear: _data.bsNextYear,

        bsMonthFirstAdDate: _data.bsMonthFirstAdDate,
      },
      calendarDataBS: {
        date: _data.adDate,
        month: _data.bsMonth,
        year: _data.bsYear,
        daysInMonth: _data.bsMonthDays,
        // weekDay: _data.weekDay,
        dayValue: bsDay,
        bsMonthFirstAdDate: _data.bsMonthFirstAdDate,
      },
      isLoaded: true,
    },
  };
};

export default useInitialState;
