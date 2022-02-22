import React, { useState, useEffect } from "react";

import Header from "./Header";
import RangeRender from "./RangeRender";
import useSelectedData from "./useSelectedData";
import { getMonthOffset, checkDatePropsValidity } from "./util";
import { getDateFromObject } from "../date-fns";
import { getWeekNames, formatBsDate } from "../CalendarData";

import { DateRange, INepaliCalendar, IDateObject } from "../types/main";

const NepaliCalendar = (props: INepaliCalendar) => {
  const {
    defaultValue,
    dateFormat,
    value,
    onSelect,
    shouldPressOK = true,
    showExtra = true,
    showMonthDropdown = false,
    showYearDropdown = false,
    calendarType,
    disableDate,
    disablePast,
    disableFuture,
    maxDate,
    minDate,
    range,
    children,
  } = props;

  useEffect(() => {
    if (value !== undefined && defaultValue !== undefined) {
      console.warn("If value is provided defaultValue is ignored.");
    }
  }, [value, defaultValue]);

  useEffect(() => {
    if (dateFormat)
      checkDatePropsValidity(
        { maxDate, defaultValue, minDate, value },
        dateFormat,
        calendarType
      );
  }, [dateFormat, defaultValue, maxDate, minDate, value, calendarType]);

  const isAD = calendarType === "AD";

  // //always in ad
  const [selectedData, setSelectedData] = useSelectedData(
    dateFormat,
    isAD,
    value,
    defaultValue
  );

  const [calendarData, setCalendarData] = useState<IDateObject>({
    date: selectedData.date,
    month: selectedData.month,
    year: selectedData.year,
  });

  const changeMonth = (offset: number) => {
    const data = getMonthOffset(calendarData, offset, calendarType);
    if (data) {
      const { year, month, date } = data;

      setCalendarData({ year, month, date: date });
    }
  };

  const onSelectDate = (adDate: IDateObject, bsDate: IDateObject) => {
    const date = getDateFromObject(adDate);
    const formattedDate = formatBsDate(isAD ? adDate : bsDate, dateFormat);

    if (!value) setSelectedData({ ...adDate });
    typeof onSelect === "function" &&
      onSelect(formattedDate, adDate, bsDate, date);
  };

  //TODO range check
  const changeYear = (offset: number) => {
    const month = calendarData.month;

    const offsetValue = Number(offset);
    if (isNaN(offsetValue)) {
      throw new TypeError(
        `Expected type of offset for change year function is number instead received ${typeof offset}`
      );
    }
    const year = calendarData.year + offsetValue;

    const date = calendarData.date;
    setCalendarData({ year, month, date });
  };

  const allDays =
    calendarType === "BS"
      ? getWeekNames("np", "short")
      : getWeekNames("en", "short");

  const dateRange: DateRange | null = range
    ? { from: range?.from, to: range?.to, format: range?.format ?? dateFormat }
    : null;

  return (
    <div className="rl-nepali-date-panel-wrapper">
      <div className="rl-nepali-date-panel">
        <Header
          changeYear={changeYear}
          changeMonth={changeMonth}
          month={calendarData.month}
          year={calendarData.year}
          isAD={isAD}
          showExtra={showExtra}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
        />
        <div className="rl-nepali-date-body">
          <table className="rl-nepali-date-content">
            <thead>
              <tr>
                {allDays &&
                  allDays.map((val, ind) => {
                    return <th key={`${ind}-m`}>{val}</th>;
                  })}
              </tr>
            </thead>
            <tbody>
              <RangeRender
                year={calendarData.year}
                month={calendarData.month}
                selectedData={selectedData}
                isAD={isAD}
                showExtra={showExtra}
                shouldPressOK={shouldPressOK}
                onChangeDate={onSelectDate}
                changeMonth={changeMonth}
                range={dateRange}
                disableDate={disableDate}
                disablePast={disablePast}
                disableFuture={disableFuture}
                maxDate={maxDate}
                minDate={minDate}
                dateFormat={dateFormat}
              />
            </tbody>
          </table>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NepaliCalendar;
