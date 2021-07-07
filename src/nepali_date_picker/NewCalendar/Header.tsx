import React from "react";
import { np, calendar_data } from "../data";
import { calendarData, calendarFunctions } from "../helper_bs";
import { ShowDropdownType, ShowYearDropdownType } from "./types";

type OffsetChange = (a: number) => void;

type HeaderProps = {
  year: number;
  month: number;
  changeYear: OffsetChange; //TODO
  changeMonth: OffsetChange;
  isAD: boolean;
  showMonthDropdown: ShowDropdownType;
  showYearDropdown: ShowYearDropdownType;
};

const Header = ({
  year,
  month,
  changeYear,
  changeMonth,
  isAD,
  showMonthDropdown,
  showYearDropdown,
}: HeaderProps) => {
  // because month from props is received in readable format 1= Baishakh
  // but the component manipulates in array format 0= Baisakh
  const monthIndex = month - 1;

  const currentMonthName = isAD
    ? calendarData.adMonth[monthIndex]
    : calendarData.bsMonths[monthIndex];

  const currentYear = isAD
    ? year
    : calendarFunctions.getNepaliNumber(year ?? 0);

  const fullMonthName = np.monthName.full;
  const allYears = Object.keys(calendar_data);

  return (
    <div>
      <div className="month-header">
        <div className="left-actions">
          <div
            title="Previous Year"
            onClick={() => changeYear(-1)}
            className="prev-year hand-cursor"
          >
            &#10094;&#10094;
          </div>
          <div
            title="Previous Month"
            onClick={() => changeMonth(-1)}
            className="prev-month hand-cursor"
          >
            &#10094;
          </div>
        </div>

        <div className="month-header-content">
          {!showMonthDropdown ? (
            <span>{currentMonthName} &nbsp;</span>
          ) : (
            <select
              className="rl-nepali-calendar__month-select"
              value={monthIndex}
              onChange={(e) => {
                const { value } = e.currentTarget;
                const offset = +value - monthIndex;
                changeMonth(offset);
              }}
            >
              {fullMonthName.map((m, i) => (
                <option value={i} key={m}>
                  {m}
                </option>
              ))}
            </select>
          )}

          <div key={`${year}--`} tabIndex={0} className="inline-dropdown">
            <div className="value"></div>
            {!showYearDropdown ? (
              <span>{currentYear || 0} &nbsp;</span>
            ) : (
              <select
                className="rl-nepali-calendar__month-select"
                value={year}
                onChange={(e) => {
                  const { value } = e.currentTarget;
                  const offset = +value - year;
                  changeYear(offset);
                }}
              >
                {allYears.map((m, i) => (
                  <option value={m} key={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="right-actions">
          <div
            title="Next Month"
            onClick={() => changeMonth(1)}
            className="next-month hand-cursor"
          >
            &#10095;
          </div>
          <div
            onClick={() => {
              changeYear(1);
            }}
            title="Next Year"
            className="next-year hand-cursor"
          >
            &#10095;&#10095;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
