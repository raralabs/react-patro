import React, { useState, useEffect } from "react";

import NepaliCalendar, { NepaliCalendarProps } from "../Calendar";
import CalendarIcon from "../assets/calendar.svg";
import CrossIcon from "../assets/cross_icon";

import { usePopper } from "./usePopper";
import useCalendarType from "../hooks/useCalendarType";

import "../nepali_date_picker.css";

const random_id = `rl-nepali-${Math.random()}`;

interface DatePickerProps extends NepaliCalendarProps {
  size: "small" | "large"; // TODO,
  onChange: (formattedDate: string) => void; //,
  isClearable: boolean;
  value: string;
}
const DatePicker = (props: DatePickerProps) => {
  const {
    value,
    size = "small",
    onChange,
    isClearable = true,
    calendarType: calendarTypeFromProps,
  } = props;

  const calendarType = useCalendarType(calendarTypeFromProps);
  const [selectedDate, setSelectedDate] = useState(value);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const { popupRef, inputRef, isVisible, setIsVisible } = usePopper(false);

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
          style={{
            width: "100%",
          }}
          value={selectedDate} // TODO convert  AD to BS and ....
          placeholder={`DD-MM-YYYY (${calendarType})`}
          onChange={(e) => {
            //TODO magic here
          }}
        />
        <img
          alt="calendar"
          onClick={() => {
            setIsVisible(true);
          }}
          style={{ position: "absolute", top: 5, right: 5 }}
          className="rl-nepali-datepicker-icon hand-cursor"
          src={CalendarIcon}
        />
      </div>
      {isVisible && (
        <div ref={popupRef} style={{ zIndex: 999 }}>
          <NepaliCalendar
            initialDate={selectedDate}
            showExtra={true}
            disableDate={props.disableDate}
            shouldPressOK={true}
            // initialDateType="BS"
            calendarType={calendarType}
            dateFormat="DD-MM-YYYY"
            showMonthDropdown={true}
            onSelect={(ad_date, bs_date) => {
              typeof onChange === "function" && onChange(ad_date);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
