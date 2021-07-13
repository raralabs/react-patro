import {
  getBsInfoOfoffsetDate,
  getStartingDayOfBsMonth,
  getTotalDaysInBsMonth,
} from "./../CalendarData/index";
// import { useEffect } from "react";
import { getNepaliNumber } from "../CalendarData";
import { getInfoOfOffsetDate } from "../date-fns";
import { checkIsToday, getSubDate } from "./util";

const useCalendarData = (year: number, month: number, isAD: boolean) => {
  const startingDayOfMonth = getStartingDayOfMonth(year, month, isAD) || 7;
  const totalDayInThisMonth = getTotalDaysOfMonth(year, month, isAD);

  const getOffsetDateInfo = (
    year: number,
    month: number,
    offset?: { year?: number; month?: number }
  ) =>
    isAD
      ? getInfoOfOffsetDate(year, month, offset)
      : getBsInfoOfoffsetDate(year, month, offset);

  const {
    year: prevYear,
    month: prevMonth,
    totalDays: totalDaysInPrevMonth,
  } = getOffsetDateInfo(year, month, { month: -1 });

  const { year: nextYear, month: nextMonth } = getOffsetDateInfo(year, month, {
    month: 1,
  });

  const data = (year: number, month: number, isAD: boolean, week: number) => {
    return Array(7)
      .fill("")
      .map((ie2: any, day: number) => {
        let cellDate = week * 7 + day - startingDayOfMonth + 1;

        let isCurrentMonth = true;
        let mainDate = {
          date: cellDate,
          month: month,
          year: year,
        };

        if (cellDate <= 0) {
          cellDate = totalDaysInPrevMonth + cellDate;

          isCurrentMonth = false;
          mainDate = {
            date: cellDate,
            month: prevMonth,
            year: prevYear,
          };
        } else if (cellDate > totalDayInThisMonth) {
          cellDate = cellDate - totalDayInThisMonth;

          isCurrentMonth = false;
          mainDate = {
            date: cellDate,
            month: nextMonth,
            year: nextYear,
          };
        }

        const subMainDate = getSubDate(mainDate, isAD);

        const adDate = isAD ? mainDate : subMainDate;
        const bsDate = isAD ? subMainDate : mainDate;

        const isToday = checkIsToday(adDate);

        const renderMainDate = isAD
          ? cellDate || 0
          : getNepaliNumber(cellDate || 0);
        const renderSubDate = isAD
          ? getNepaliNumber(subMainDate.date)
          : subMainDate.date;

        return {
          main: {
            date: mainDate.date,
            month: mainDate.month,
            year: mainDate.year,
          },

          isToday,
          isCurrentMonth,
          render: { main: renderMainDate, sub: renderSubDate },
          adDate,
          bsDate,
        };
      });
  };

  const weekData = (year: number, month: number, isAD: boolean) =>
    Array(6)
      .fill("")
      .map((it1, week) => {
        return { key: `WEEK-${week}`, data: data(year, month, isAD, week) };
      });

  return weekData(year, month, isAD);
};

function getTotalDaysOfMonth(
  year: number,
  month: number,
  isAD: boolean
): number {
  if (isAD) return new Date(year, month, 0).getDate();
  else {
    return getTotalDaysInBsMonth(year, month);
  }
}

//TODO check
function getStartingDayOfMonth(
  year: number,
  month: number,
  isAD: boolean
): number {
  if (isAD) {
    const monthIndex = month - 1;
    return new Date(year, monthIndex, 1).getDay();
  } else {
    return getStartingDayOfBsMonth(year, month);
  }
}

export default useCalendarData;
