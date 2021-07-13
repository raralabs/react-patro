import React, { useState, useEffect } from "react";

import Header from "./Header";
// import DateRender from "./DateRender";
import RangeRender from "./RangeRender";
import useInitialState from "./useInitialState";

import { getMonthOffset, getTodaysDate, checkDatePropsValidity } from "./util";

import { dateFormatter, getDateFromObject, getDateObj } from "../date-fns";

import { DateRange, NepaliCalendarProps, IDateObject } from "./types";

import { ad2bs, getWeekNames } from "../CalendarData";

import "../nepali_date_picker.css";

type WarningProps = {
  value: string | null | undefined;
  defaultValue: string | null | undefined;
};
const useWarning = ({ value, defaultValue }: WarningProps) => {
  useEffect(() => {
    if (value && defaultValue) {
      console.warn("If value is provided defaultValue is ignored.");
    }
  }, [value, defaultValue]);
};

const NepaliCalendar = (props: NepaliCalendarProps) => {
  const {
    // showToday = true,
    defaultValue,
    dateFormat = "yyyy-mm-dd", // TODO
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
  } = props;

  const { data: initSelectedData } = useInitialState(
    value ?? defaultValue,
    dateFormat
  );

  useWarning({ value, defaultValue });
  useEffect(() => {
    checkDatePropsValidity(
      { maxDate, defaultValue, minDate, value },
      dateFormat
    );
  }, [dateFormat, defaultValue, maxDate, minDate, value]);

  //always in ad
  const [selectedData, setSelectedData] =
    useState<IDateObject>(initSelectedData);

  const [calendarData, setCalendarData] =
    useState<IDateObject>(initSelectedData);

  useEffect(() => {
    if (value) {
      const newDate = getDateObj(value, dateFormat);
      if (newDate) setSelectedData(newDate);
    }
  }, [value, dateFormat]);

  const changeMonth = (offset: number) => {
    const data = getMonthOffset(calendarData, offset);
    if (data) {
      const { year, month, date } = data;

      setCalendarData({ year, month, date: date });
    }
  };

  const onChangeDate = (adDate: IDateObject) => {
    const bs = ad2bs(adDate.year, adDate.month, adDate.date);

    const bsDate = {
      date: bs.date,
      month: bs.month,
      year: bs.year,
    };

    const date = getDateFromObject(adDate);
    const formattedDate = dateFormatter(date, dateFormat);
    if (!value) setSelectedData({ ...adDate });
    typeof onSelect === "function" &&
      onSelect(formattedDate, adDate, bsDate, date); //TODO
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

  const isAD = calendarType === "AD";

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
                onChangeDate={onChangeDate}
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

          {/* {showToday && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: 8,
                paddingBottom: 0,
              }}
            >
              <div
                className="today-btn hand-cursor"
                onClick={() => {
                  setCalendarBSData(
                    todayDateBS.year,
                    todayDateBS.month,
                    todayDateBS.date
                  );
                  onChangeDate(todayDateAD);
                }}
              >
                Today
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default NepaliCalendar;
