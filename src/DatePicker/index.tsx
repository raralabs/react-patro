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
  // getDateFromObject,
} from "../date-fns";
import { isDateValidWithFormat } from "../CalendarData/validator";
import { formatBsDate } from "../CalendarData";
// import { ad2bs, bs2ad, formatBsDate, parseBsDate } from "../CalendarData";
import { IDatePicker } from "../types/main";

const random_id = `rl-nepali-${Math.random()}`;

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
    ...otherProps
  } = props;

  const calendarType = useCalendarType(calendarTypeFromProps);

  // const isAD = calendarType === "AD";

  //This is the data that is sent to the NepaliCalendar
  const [selectedDate, setSelectedDate] = useState(value);

  //This is what is shown in input field;
  const [entetereDate, setEnteredDate] = useState("");
  //Eventually selectedDate and enteredDate is supposed to be equal but not neccesary. When the user is typing on the input field only enteredDate is selected and when s/he stops or blurs or presses enter then only the states are synced.

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const { popupRef, inputRef, isVisible, setIsVisible, containerRef } =
    usePopper();

  // const handleBlur = () => {
  // setEnteredDate(selectedDate);

  // if (isAD) {
  //   const adDateObj = parseBsDate(selectedDate, dateFormat);
  //   const bsDateObj = ad2bs(adDateObj.year, adDateObj.month, adDateObj.date);
  //   const date = getDateFromObject(adDateObj);

  //   typeof onChange === "function" &&
  //     onChange(selectedDate, adDateObj, bsDateObj, date);
  // } else {
  //   const bsDateObj = parseBsDate(selectedDate, dateFormat);
  //   const adDateObj = bs2ad(bsDateObj.year, bsDateObj.month, bsDateObj.date);
  //   const date = getDateFromObject(adDateObj);

  //   typeof onChange === "function" &&
  //     onChange(selectedDate, adDateObj, bsDateObj, date);
  // }
  // setIsVisible(false);
  // };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;

    const today = dateFormatter(new Date(), dateFormat);

    const dateStringOfSelectedDate = parseDate(
      selectedDate || today,
      dateFormat
    );

    const obj = getDateObj(selectedDate || today, dateFormat);

    //TODO static
    const acceptableFormat = [
      "dd-mm-yyyy",
      "dd/mm/yyyy",
      "yyyy-mm-dd",
      "yyyy/mm/dd",
      dateFormat,
    ];

    acceptableFormat.forEach((format, index) => {
      if (isDateValidWithFormat(value, format)) {
        const yearValidator = /\d+.\d+.(\d){4}/;
        const bool =
          index === 1 || index === 2 ? value.match(yearValidator) : true;

        if (bool) {
          const formattedNewDate = changeDateFromOneFormatToAnother(
            value,
            format,
            dateFormat
          );

          setSelectedDate(formattedNewDate);
          setEnteredDate(formattedNewDate);
        }
      }
    });

    if (!isNaN(+value)) {
      if (value.length === 2) {
        const totalDaysInMonth = new Date(
          dateStringOfSelectedDate.getFullYear(),
          dateStringOfSelectedDate.getMonth() + 1,
          0
        ).getDate();

        if (obj && +value <= totalDaysInMonth) {
          obj.date = +value;
          const newDate = formatBsDate(obj, dateFormat);
          setSelectedDate(newDate);
        }
      }
      if (value.length === 4) {
        if (obj) {
          obj.year = +value;
          const newDate = formatBsDate(obj, dateFormat);
          setSelectedDate(newDate);
        }
      }
    }
    setEnteredDate(value);
  };

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
          }}
        />
      )}
      <div className="input-wrapper">
        <input
          ref={inputRef}
          onClick={() => setIsVisible(true)}
          className={`rl-nepali-datepicker-input ${size}`}
          value={entetereDate} // TODO convert  AD to BS and ....
          placeholder={`${placehoder ?? dateFormat} (${calendarType})`}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsVisible(false);
              inputRef.current?.blur();
            }
          }}
          // onFocus={() => setIsVisible(true)}
          // onBlur={handleBlur}
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
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
