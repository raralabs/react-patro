import React, { useState, useEffect } from "react";

import NepaliCalendar from "../Calendar";
import CalendarIcon from "../assets/CalendarIcon";
import CrossIcon from "../assets/CrossIcon";

import { usePopper } from "./usePopper";
import useCalendarType from "../hooks/useCalendarType";

// import "../nepali_date_picker.css";
import {
  getFormattedDateFromObject,
  isDateValid,
  changeDateFromOneFormatToAnother,
  dateFormatter,
  parseDate,
  getDateObj,
} from "../date-fns";
import { INepaliCalendar } from "../Calendar/types";

const random_id = `rl-nepali-${Math.random()}`;

interface DatePickerProps extends INepaliCalendar {
  size: "small" | "large"; // TODO,
  onChange: (formattedDate: string) => void; //,TODO
  isClearable: boolean;
  value: string;
  placehoder?: string;
  dateFormat: string;
}
const DatePicker = (props: DatePickerProps) => {
  const {
    value,
    size = "small",
    onChange,
    isClearable = true,
    dateFormat = "yyyy-mm-dd",
    calendarType: calendarTypeFromProps,
    showMonthDropdown,
    placehoder,
  } = props;

  const calendarType = useCalendarType(calendarTypeFromProps);
  const [selectedDate, setSelectedDate] = useState(value);
  const [entetereDate, setEnteredDate] = useState("");

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const { popupRef, inputRef, isVisible, setIsVisible } = usePopper(false);

  const handleBlur = () => {
    setEnteredDate(selectedDate);
    typeof onChange === "function" && onChange(selectedDate);
    // setIsVisible(false);
  };
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
      if (isDateValid(value, format)) {
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
          const newDate = getFormattedDateFromObject(obj, dateFormat);
          setSelectedDate(newDate);
        }
      }
      if (value.length === 4) {
        if (obj) {
          obj.year = +value;
          const newDate = getFormattedDateFromObject(obj, dateFormat);
          setSelectedDate(newDate);
        }
      }
    }
    setEnteredDate(value);
  };
  return (
    <div id={random_id} className="rl-nepali-datepicker-wrapper">
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
          onFocus={() => setIsVisible(true)}
          onBlur={handleBlur}
        />

        <CalendarIcon
          onClick={() => setIsVisible(true)}
          className="rl-nepali-datepicker-icon hand-cursor"
          // style={{ position: "absolute", top: 5, right: 5 }}
        />
        {/* <img
          alt="calendar"
          onClick={() => {
            setIsVisible(true);
          }}
          style={{ position: "absolute", top: 5, right: 5 }}
          className="rl-nepali-datepicker-icon hand-cursor"
          src={CalendarIcon}
        /> */}
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
              setIsVisible(false);
              setEnteredDate(formattedDate);
              typeof onChange === "function" && onChange(formattedDate);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
