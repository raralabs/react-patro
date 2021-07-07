import * as React from "react";
import {
  getMonthNames,
  getNumberOfDaysInMonth,
  getValidYears,
  getWeekNames,
  getInitialNepaliWeek,
} from "./getBsData";

import { Form } from "react-bootstrap";
import { createPopper } from "@popperjs/core";

import {
  newSelectedDate,
  toNumber,
  convertDateObjToString,
  convertDateStringToDateObj,
} from "./utils";
import { ADToBS, BSToAD } from "bikram-sambat-js";

import "./styles.scss";

import { useState, useRef, useEffect } from "react";

function useVisible(initialIsVisible) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}

const fullMonthName = getMonthNames("np", "full");
const shortWeekName = getWeekNames("np", "short");
const allValidYears = getValidYears("en");

const emptyDateObj = { year: null, month: null, date: null };
///For Processing every date should be in object format {year, month, date};
//For output every date should be in ad object format year, month,date
const DatePicker = ({
  isClearable,
  inputClassName = "",
  required,
  value = null,
  onChange,
  defaultValue,
  placeholder = "YYYY-MM-DD",
}) => {
  const currentDate = convertDateStringToDateObj(ADToBS(new Date()));

  const y = value?.getFullYear();

  const hasValidValue = y < 2043 && y > 1913 && value;

  //TODO
  const initialDate = hasValidValue
    ? convertDateStringToDateObj(ADToBS(value))
    : emptyDateObj;

  const [selectedDate, setSelectedDate] = React.useState(initialDate);
  const [enteredDate, setEnteredDate] = React.useState(
    hasValidValue ? convertDateObjToString(initialDate) : null
  );

  const validDate = selectedDate.year ? selectedDate : currentDate;

  const updateSelectedAndEnteredDate = (dateObj) => {
    setSelectedDate(dateObj);
    setEnteredDate(convertDateObjToString(dateObj));
  };

  // const popupRef = React.useRef();

  const { ref: popupRef, isVisible, setIsVisible } = useVisible(false);

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    const newDate = newSelectedDate(validDate, value);
    setSelectedDate(newDate);

    setEnteredDate(value);
    onChange && onChange(new Date(BSToAD(convertDateObjToString(newDate))));
  };

  // should be in range of 1913 to 2044

  const handleMonthChange = (i) => {
    const changedDateObj = (() => {
      if (selectedDate.month > 10 && i > 0) {
        const changedDateObj = {
          ...validDate,
          year: +selectedDate.year + +i,
          month: "00",
        };

        return changedDateObj;
      }
      if (selectedDate.month < 1 && i < 0) {
        const changedDateObj = {
          ...validDate,

          year: +selectedDate.year + +i,
          month: "11",
        };

        return changedDateObj;
      }
      return {
        ...validDate,
        month: +selectedDate.month + +i,
      };
    })();
    updateSelectedAndEnteredDate(changedDateObj);
  };

  const displayDate = React.useMemo(() => {
    // if()
    const year = toNumber(selectedDate?.year ?? currentDate.year);
    const month = toNumber(selectedDate?.month ?? currentDate.month);

    const noOfDaysInMonths = getNumberOfDaysInMonth(year, month);
    const startingWeek = getInitialNepaliWeek(year, month);

    let display = [];
    for (let i = 0; i < startingWeek; i++) {
      display.push(" ");
    }
    for (let i = 0; i < noOfDaysInMonths; i++) {
      display.push(i + 1);
    }
    return display;
  }, [
    selectedDate.year,
    selectedDate.month,
    currentDate.year,
    currentDate.month,
  ]);

  const handleDateChange = (name, value) => {
    const nameTypes = ["year", "month", "date"];
    if (nameTypes.includes(name)) {
      const newSelection = {
        ...(selectedDate.year ? { ...selectedDate } : { ...currentDate }),
        [name]: String(value).padStart(2, 0),
      };
      updateSelectedAndEnteredDate(newSelection);
      onChange &&
        onChange(new Date(BSToAD(convertDateObjToString(newSelection))));
    } else {
      throw new Error(
        `Please pass in one of the following as first parameter: ${nameTypes}`
      );
    }
    setIsVisible(false);
  };

  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isVisible) {
      const input = inputRef.current;
      const tooltip = popupRef.current;

      createPopper(input, tooltip, {
        placement: "bottom-start",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
    }
  });

  return (
    <div className="calendar">
      <Form.Control
        size="sm"
        aria-describedby="tooltip"
        className={`calendar__input ${inputClassName}`}
        ref={inputRef}
        placeholder={placeholder}
        onClick={() => setIsVisible(true)}
        required={required}
        onChange={handleChange}
        value={enteredDate ?? ""}
        defaultValue={defaultValue}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setEnteredDate(convertDateObjToString(selectedDate));
          }
        }}
        onBlur={() => {
          setEnteredDate(
            selectedDate.year ? convertDateObjToString(selectedDate) : null
          );
        }}
      />
      {value && !hasValidValue && (
        <span className="error-msg position-absolute">
          AD should be in range of 1913 to 2044
        </span>
      )}

      {isClearable && value && (
        <button
          className="calendar__clear-icon"
          type="button"
          onClick={(e) => {
            setEnteredDate(null);
            onChange && onChange(null);
          }}
        ></button>
      )}
      {isVisible && (
        <div className="calendar__tooltip" role="tooltip" ref={popupRef}>
          <div className="react-datepicker__tab-loop">
            <div className="react-datepicker__tab-loop__start" tabIndex={0} />
            <div
              className="react-datepicker-popper"
              data-placement="bottom-start"
            >
              <div>
                <div className="react-datepicker">
                  <div className="react-datepicker__triangle" />
                  <button
                    type="button"
                    className="react-datepicker__navigation react-datepicker__navigation--previous"
                    aria-label="Previous Month"
                    onClick={() => handleMonthChange(-1)}
                  >
                    Previous Month
                  </button>
                  <button
                    type="button"
                    className="react-datepicker__navigation react-datepicker__navigation--next"
                    aria-label="Next Month"
                    onClick={() => handleMonthChange(+1)}
                  >
                    Next Month
                  </button>
                  <div className="react-datepicker__month-container">
                    <div className="react-datepicker__header">
                      <div className="react-datepicker__current-month react-datepicker__current-month--hasYearDropdown react-datepicker__current-month--hasMonthDropdown">
                        {
                          fullMonthName[
                            toNumber(selectedDate.month ?? currentDate.month)
                          ]
                        }{" "}
                        {toNumber(selectedDate.year ?? currentDate.year)}
                      </div>
                      <div className="react-datepicker__header__dropdown react-datepicker__header__dropdown--select">
                        <div className="react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--select">
                          <select
                            className="react-datepicker__month-select"
                            onChange={(e) =>
                              handleDateChange("month", e.currentTarget.value)
                            }
                            value={toNumber(
                              selectedDate.month ?? currentDate.month
                            )}
                          >
                            {fullMonthName.map((m, i) => (
                              <option value={i} key={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--select">
                          <select
                            className="react-datepicker__year-select"
                            onChange={(e) =>
                              handleDateChange("year", e.currentTarget.value)
                            }
                            value={toNumber(
                              selectedDate.year ?? currentDate.year
                            )}
                          >
                            {allValidYears.map((y) => (
                              <option value={y} key={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        {shortWeekName.map((w) => (
                          <div className="react-datepicker__day-name" key={w}>
                            {w}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="calendar__date-grid"
                      aria-label="month  2021-03"
                    >
                      {displayDate.map((d, i) => {
                        return (
                          <div
                            className="react-datepicker__day react-datepicker__day--001"
                            tabIndex={-1}
                            aria-label="Choose Monday, March 1st, 2021"
                            role="button"
                            aria-disabled="false"
                            key={i}
                            onClick={() => {
                              handleDateChange("date", d);
                            }}
                            {...(d ===
                              toNumber(
                                selectedDate.date ?? currentDate.date
                              ) && {
                              className:
                                "react-datepicker__day react-datepicker__day--002 react-datepicker__day--selected react-datepicker__day--today",
                            })}
                          >
                            {d}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="react-datepicker__tab-loop__end" tabIndex={0} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
