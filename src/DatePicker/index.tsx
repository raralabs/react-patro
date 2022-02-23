import React, { useState, useEffect } from "react";

import NepaliCalendar from "../Calendar";
import CalendarIcon from "../assets/CalendarIcon";
import CrossIcon from "../assets/CrossIcon";

import { usePopper } from "./usePopper";
import useCalendarType from "../hooks/useCalendarType";

import {
  changeDateFromOneFormatToAnother,
  dateFormatter,
  parseDate,
  getDateObj,
  getDateFromObject,
  // getDateFromObject,
} from "../date-fns";
import {
  isAdDateValid,
  isDateValidWithFormat,
  isBsDateValid,
} from "../CalendarData/validator";
import { formatBsDate, parseBsDate } from "../CalendarData";
// import { ad2bs, bs2ad, formatBsDate, parseBsDate } from "../CalendarData";
import { IDatePicker } from "../types/main";
import { getTodaysDate } from "Calendar/util";

const random_id = `rl-nepali-${Math.random()}`;

function addDelimeter(enteredstring: string) {
  console.log("enteredstring", enteredstring);

  if (enteredstring.slice(-1) === "-") return enteredstring;
  if (enteredstring.length === 2) return enteredstring + "-";
  if (enteredstring.length === 5) return enteredstring + "-";
  return enteredstring;
}

const DatePicker = (props: IDatePicker) => {
  const {
    value,
    size = "small",
    onChange,
    isClearable = true,
    dateFormat = "yyyy-mm-dd",
    calendarType: calendarTypeFromProps,
    showMonthDropdown,
    placehoder,
    hideOnSelect = true,
    onSelect,
    children,
    showDelimiter = true,
    ...otherProps
  } = props;

  const calendarType = useCalendarType(calendarTypeFromProps);

  const isAD = calendarType === "AD";

  //This is the data that is sent to the NepaliCalendar
  const [selectedDate, setSelectedDate] = useState(value);

  //This is what is shown in input field;
  const [entetereDate, setEnteredDate] = useState(value);
  //Eventually selectedDate and enteredDate is supposed to be equal but not neccesary. When the user is typing on the input field only enteredDate is selected and when s/he stops or blurs or presses enter then only the states are synced.

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const { popupRef, inputRef, isVisible, setIsVisible, containerRef } =
    usePopper();

  return (
    <div
      id={random_id}
      className="rl-nepali-datepicker-wrapper"
      ref={containerRef}
    >
      {isClearable && (
        <CrossIcon
          visible={!!selectedDate}
          onClick={() => {
            typeof onChange === "function" && onChange("");
            setSelectedDate("");
            setEnteredDate("");
          }}
        />
      )}
      <div className="input-wrapper">
        <input
          ref={inputRef}
          onClick={() => setIsVisible(true)}
          className={`rl-nepali-datepicker-input ${size}`}
          defaultValue={value}
          value={entetereDate}
          placeholder={`${placehoder ?? dateFormat} (${calendarType})`}
          onChange={(e) => {
            if (showDelimiter) {
              setEnteredDate(addDelimeter(e.target.value));
            } else {
              setEnteredDate(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              if (entetereDate.slice(-1) === "-")
                setEnteredDate(entetereDate.slice(0, entetereDate.length - 2));
            }
            if (e.key === "Enter") {
              if (isDateValidWithFormat(entetereDate, dateFormat)) {
                const parsedDateObj = parseBsDate(entetereDate, dateFormat);
                if (isAD && isAdDateValid(parsedDateObj)) {
                  setSelectedDate(entetereDate);
                  onChange(entetereDate);
                }
                if (isBsDateValid(parsedDateObj)) {
                  setSelectedDate(entetereDate);
                  onChange(entetereDate);
                } else {
                  const x = getTodaysDate();
                  const ad = dateFormatter(getDateFromObject(x.ad), dateFormat);
                  setSelectedDate(ad);
                  onChange(ad);
                  setEnteredDate(ad);
                }
              } else {
                const today = getTodaysDate();

                if (entetereDate.length <= 3) {
                  if (entetereDate.slice(-1) === "-") {
                    const sliced = entetereDate.slice(
                      0,
                      entetereDate.length - 1
                    );
                    if (isAD) {
                      today.ad.date = +sliced;
                    } else {
                      today.bs.date = +sliced;
                    }
                  } else {
                    if (isAD) {
                      today.ad.date = +entetereDate;
                    } else {
                      today.bs.date = +entetereDate;
                    }
                  }
                }
                const ad = dateFormatter(
                  getDateFromObject(isAD ? today.ad : today.bs),
                  dateFormat
                );
                setSelectedDate(ad);
                onChange(ad);
                setEnteredDate(ad);
              }

              setIsVisible(false);
              inputRef.current?.blur();
            }
          }}
        />

        <CalendarIcon
          onClick={() => setIsVisible(true)}
          className="rl-nepali-datepicker-icon hand-cursor"
        />
      </div>
      {isVisible && (
        <div ref={popupRef} style={{ zIndex: 999 }}>
          <NepaliCalendar
            // defaultValue={selectedDate}
            value={selectedDate}
            showExtra={true}
            disableDate={props.disableDate}
            shouldPressOK={true}
            calendarType={calendarType}
            dateFormat={dateFormat}
            showMonthDropdown={showMonthDropdown}
            onSelect={(formattedDate, adDate, bsDate, dateString) => {
              hideOnSelect && setIsVisible(false);
              setEnteredDate(formattedDate);
              typeof onChange === "function" &&
                onChange(formattedDate, adDate, bsDate, dateString);
            }}
            {...otherProps}
          >
            {children}
          </NepaliCalendar>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
