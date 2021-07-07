import React from "react";
import { calendarFunctions } from "../helper_bs";
import { checkIsSelected, checkIsToday } from "./util";

// {/* if (typeof disableDate === "function") {
//   isDisabled = disableDate(
//     moment()
//       .date(adDate.day)
//       .month(adDate.month - 1)
//       .year(adDate.year)
//   );
// } */}
const DateRenderer = ({
  week,
  isAD,
  selectedData,
  disableDate,
  shouldPressOK,
  onChangeDate,
  showExtra,
  calendarRenderingData,
  changeMonth,
}) => {
  const _month = isAD
    ? calendarRenderingData.adMonth
    : calendarRenderingData.bsMonth;
  const _year = isAD
    ? calendarRenderingData.adYear
    : calendarRenderingData.bsYear;

  const _startingDayOfWeek = isAD
    ? calendarRenderingData.adStartingDayOfWeek
    : calendarRenderingData.bsStartingDayOfWeek;
  const _totalDaysInMonth = isAD
    ? calendarRenderingData.adTotalDaysInMonth
    : calendarRenderingData.bsTotalDaysInMonth;

  const _prevMonth = isAD
    ? calendarRenderingData.adPrevMonth
    : calendarRenderingData.bsPrevMonth;
  const _prevYear = isAD
    ? calendarRenderingData.adPrevYear
    : calendarRenderingData.bsPrevYear;
  const _nextMonth = isAD
    ? calendarRenderingData.adNextMonth
    : calendarRenderingData.bsNextMonth;
  const _nextYear = isAD
    ? calendarRenderingData.adNextYear
    : calendarRenderingData.bsNextYear;

  const _prevMonthDays = isAD
    ? calendarRenderingData.adPrevMonthDays
    : calendarRenderingData.bsPrevMonthDays;
  return (
    <>
      {Array(7)
        .fill("")
        .map((it2, day) => {
          let cellDate = week * 7 + day - _startingDayOfWeek + 1;

          let isCurrentMonth = true;
          let mainDate = {
            day: cellDate,
            month: _month,
            year: _year,
          };

          if (cellDate <= 0) {
            cellDate = _prevMonthDays + cellDate;
            isCurrentMonth = false;
            mainDate = {
              day: cellDate,
              month: _prevMonth,
              year: _prevYear,
            };
          } else if (cellDate > _totalDaysInMonth) {
            cellDate = cellDate - _totalDaysInMonth;
            isCurrentMonth = false;
            mainDate = {
              day: cellDate,
              month: _nextMonth,
              year: _nextYear,
            };
          }

          let next_date_obj = isAD
            ? calendarFunctions.getBsDateByAdDate(
                mainDate.year,
                mainDate.month,
                mainDate.day
              )
            : calendarFunctions.getAdDateObjectByBsDate(
                mainDate.year,
                mainDate.month,
                mainDate.day
              );
          let subMainDate = {
            day: isAD ? next_date_obj.bsDate : next_date_obj.adDate,
            month: isAD ? next_date_obj.bsMonth : next_date_obj.adMonth,
            year: isAD ? next_date_obj.bsYear : next_date_obj.adYear,
          };

          let adDate = isAD ? mainDate : subMainDate;

          let isDisabled = false;

          const isSelected =
            isCurrentMonth && checkIsSelected(selectedData, adDate);

          const isToday = checkIsToday(adDate);

          const renderMainDate = isAD
            ? cellDate || 0
            : calendarFunctions.getNepaliNumber(cellDate || 0);
          const renderSubDate = isAD
            ? calendarFunctions.getNepaliNumber(subMainDate.day)
            : subMainDate.day;
          return (
            <td
              title={`${mainDate.day}-${mainDate.month}-${mainDate.year}`}
              onClick={(e) => {
                if (isDisabled) {
                  return;
                }
                if (!isCurrentMonth) {
                  if (week === 0) {
                    changeMonth(-1);
                  } else {
                    changeMonth(1);
                  }
                }
                if (shouldPressOK) {
                  onChangeDate(adDate);
                }
              }}
              className={`rl-picker-cell ${isToday ? "today" : ""} ${
                isSelected ? "active" : ""
              } ${!isCurrentMonth ? "other-month" : ""} ${
                isDisabled ? "disabled" : ""
              }`}
            >
              <div className={`rl-picker-cell-inner `}>
                <div className="BS">{renderMainDate}</div>
                {showExtra && <div className="AD">{renderSubDate}</div>}
              </div>
            </td>
          );
        })}
    </>
  );
};

export default DateRenderer;
