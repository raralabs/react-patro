import React, { useState } from "react";
import { calendarData, calendarFunctions } from "../helper_bs";

import Header from "./Header";
import RenderReference from "./RenderReference"; //TODO What is this???
import DateRenderer from "./DateRenderer";
import useInitialState from "./useInitialState";

import { getMonthOffset, getTodaysDate } from "./util";
import { useCalendarType } from "../hooks";
import { dateFormatter, getDateFromObject } from "../date-fns";

import {
  CalendarType,
  DateType,
  ShowDropdownType,
  ShowYearDropdownType,
} from "./types";

import "../nepali_date_picker.css";

export interface NepaliCalendarProps {
  showToday?: boolean;
  zeroDayName?: string;
  initialDate?: string;
  dateFormat: string;
  value?: string | Date;
  showMonthDropdown?: ShowDropdownType;
  showYearDropdown?: ShowYearDropdownType;
  onSelect: (
    formatteddate: string,
    adDate: DateType,
    bsDate: DateType,
    date: Date
  ) => void;
  shouldPressOK?: boolean;
  disableDate?: () => void;
  showExtra?: boolean;
  withReference?: boolean;
  reference_date?: string;
  rangeReference?: number[];
  calendarType: CalendarType;
}
const NepaliCalendar = (props: NepaliCalendarProps) => {
  const {
    showToday = true,
    zeroDayName,
    initialDate = "07-07-2021",
    dateFormat = "dd-mm-yyyy", // TODO
    // value,
    onSelect,
    shouldPressOK,
    disableDate,
    showExtra,
    withReference,
    reference_date,
    rangeReference,
    showMonthDropdown = false,
    showYearDropdown = false,
    calendarType: calendarTypeFromProps,
  } = props;

  const { selectedData: initSelectedData, state: initState } = useInitialState(
    initialDate,
    dateFormat
  );
  //always in ad
  const [selectedData, setSelectedData] = useState<DateType>(initSelectedData);

  const calendarType = useCalendarType(calendarTypeFromProps);

  const [state, setState] = useState(initState);

  const setCalendarBSData = (
    bsYear: number,
    bsMonth: number,
    bsDay: number
  ) => {
    const _data = calendarFunctions.getBsMonthInfoByBsDate(
      bsYear,
      bsMonth,
      bsDay
    );

    //TODO
    setState((state: any) => ({
      ...state,
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
    }));
  };

  const changeMonth = (offset: number) => {
    const calendarDataBS = state.calendarDataBS;
    const data = getMonthOffset(calendarDataBS, offset);
    if (data) {
      const { year, month, date } = data;

      console.log("calendarMonth", year, month, date);
      setCalendarBSData(year, month, date);
    }
  };

  const onChangeDate = (adDate: DateType) => {
    const bs_dt = calendarFunctions.getBsDateByAdDate(
      adDate.year,
      adDate.month,
      adDate.day
    );
    const bsDate = {
      day: bs_dt.bsDate,
      month: bs_dt.bsMonth,
      year: bs_dt.bsYear,
    };

    const date = getDateFromObject(adDate);
    const formattedDate = dateFormatter(date, dateFormat);
    setSelectedData({ ...adDate });
    typeof onSelect === "function" &&
      onSelect(formattedDate, adDate, bsDate, date); //TODO
  };

  const changeYear = (offset: number) => {
    const calendarDataBS = state.calendarDataBS;
    const prevMonth = calendarDataBS.month;

    const offsetValue = Number(offset);
    if (isNaN(offsetValue)) {
      throw new TypeError(
        `Expected type of offset for change year function is number instead received ${typeof offset}`
      );
    }
    const prevYear = calendarDataBS.year + offsetValue;

    const prevDate = calendarDataBS.dayValue;
    //TODO check date range
    // if (
    //   prevYear < calendarDataBS.minBsYear ||
    //   prevYear > calendarDataBS.maxBsYear
    // ) {
    //   return null;
    // }
    setCalendarBSData(prevYear, prevMonth, prevDate);
  };

  const { calendarRenderingData } = state;
  const isAD = calendarType === "AD";

  const _month = isAD
    ? calendarRenderingData.adMonth
    : calendarRenderingData.bsMonth;
  const _year = isAD
    ? calendarRenderingData.adYear
    : calendarRenderingData.bsYear;

  const { ad: todayDateAD, bs: todayDateBS } = getTodaysDate();

  if (!state.isLoaded) {
    return <div></div>;
  }

  const days_array =
    calendarType === "BS" ? calendarData.bsDays : calendarData.adDays;

  return (
    <div className="rl-nepali-date-panel-wrapper">
      <div className="rl-nepali-date-panel">
        <Header
          changeYear={changeYear}
          changeMonth={changeMonth}
          month={_month}
          year={_year}
          isAD={isAD}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
        />
        <div className="rl-nepali-date-body">
          <table className="rl-nepali-date-content">
            <thead>
              <tr>
                {days_array.map((val, ind) => {
                  return <th key={`${ind}-m`}>{val}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {Array(6)
                .fill("")
                .map((it1, index) => {
                  return (
                    <tr key={index}>
                      <DateRenderer
                        week={index}
                        calendarRenderingData={calendarRenderingData}
                        selectedData={selectedData}
                        isAD={isAD}
                        showExtra={showExtra}
                        disableDate={disableDate}
                        shouldPressOK={shouldPressOK}
                        onChangeDate={onChangeDate}
                        changeMonth={changeMonth}
                      />
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {showToday && (
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
                    todayDateBS.day
                  );
                  onChangeDate(todayDateAD);
                }}
              >
                Today
              </div>
            </div>
          )}
        </div>
      </div>
      {withReference && (
        <RenderReference
          referenceDate={reference_date ?? ""}
          rangeReference={rangeReference ?? []}
          zeroDayName={zeroDayName ?? " "}
          onChangeDate={onChangeDate}
        />
      )}
    </div>
  );
};

export default NepaliCalendar;
