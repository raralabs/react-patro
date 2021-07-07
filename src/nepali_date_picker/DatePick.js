import React, { useState, useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";
import moment from "moment";

import { calendarFunctions, calendarData } from "./helper_bs.js";
import { padDateMonth } from "./utils";

import NepaliCalendar from "./NewCalendar";
import CalendarIcon from "./assets/calendar.svg";
import CrossIcon from "./assets/cross_icon";

import useCalendarType from "./hooks/useCalendarType";

import "./nepali_date_picker.css";

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

function usePopper(initialIsVisible) {
  const {
    ref: popupRef,
    isVisible,
    setIsVisible,
  } = useVisible(initialIsVisible);
  const inputRef = React.useRef();
  //useEffect causes flickering of popper from bottom-start to bottom-end
  React.useLayoutEffect(() => {
    if (isVisible) {
      const input = inputRef.current;
      const tooltip = popupRef.current;

      createPopper(input, tooltip, {
        placement: "bottom-end",
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
  return { popupRef, inputRef, isVisible, setIsVisible };
}

const random_id = `rl-nepali-${Math.random()}`;
const DatePicker = (props) => {
  const {
    value,
    separator = " ",
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

  let ad_date = moment();

  let ad_extras = {
    day: ad_date.date(),
    month: ad_date.month() + 1,
    year: ad_date.year(),
  };
  let bs_date = calendarFunctions.getBsDateByAdDate(
    ad_date.year(),
    ad_date.month() + 1,
    ad_date.date()
  );
  let bs_extras = {
    day: bs_date.bsDate,
    month: bs_date.bsMonth,
    year: bs_date.bsYear,
  };

  let rendering_value = selectedDate;

  if (calendarType === "BS" && moment(selectedDate, "DD-MM-YYYY").isValid()) {
    let adDateObj = moment(selectedDate, "DD-MM-YYYY");
    let bsDateObj = calendarFunctions.getBsDateByAdDate(
      adDateObj.year(),
      adDateObj.month() + 1,
      adDateObj.date()
    );
    rendering_value = `${padDateMonth(bsDateObj.bsDate)}-${padDateMonth(
      bsDateObj.bsMonth
    )}-${bsDateObj.bsYear}`;
  }

  return (
    <div id={random_id} className="rl-nepali-datepicker-wrapper">
      {isClearable && (
        <CrossIcon
          visible={selectedDate}
          onClick={() => {
            typeof onChange === "function" && onChange(null);
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
          value={rendering_value}
          placeholder={`DD-MM-YYYY (${calendarType})`}
        />
        <img
          alt="calendar"
          onClick={() => {
            setIsVisible(true);
          }}
          style={{ position: "absolute", top: 5, right: 5 }}
          className="rl-nepali-datepicker-icon hand-cursor"
          src={CalendarIcon}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") {
              let _temp_value = "";
              const temp_value = _temp_value
                .split(separator)
                .map((it) => parseInt(it));
              console.log("temp", temp_value, ad_extras, bs_extras);
              let _day =
                temp_value[0] &&
                temp_value[0] > 0 &&
                temp_value[0] <= (calendarType === "AD" ? 31 : 32)
                  ? temp_value[0]
                  : calendarType === "AD"
                  ? ad_extras.day
                  : bs_extras.day;
              let _month =
                temp_value[1] && temp_value[1] > 0 && temp_value[1] <= 12
                  ? temp_value[1]
                  : calendarType === "AD"
                  ? ad_extras.month
                  : bs_extras.month;
              let _year =
                temp_value[2] &&
                temp_value[2] >
                  calendarData.minBsYear - (calendarType === "AD" ? 57 : 0) &&
                temp_value[2] <=
                  calendarData.maxBsYear - (calendarType === "AD" ? 57 : 0)
                  ? temp_value[2]
                  : calendarType === "AD"
                  ? ad_extras.year
                  : bs_extras.year;
              console.log("new temp should be", {
                _day,
                _month,
                _year,
                calendarType,
              });
              let _new_selected_date = "";
              if (calendarType === "AD") {
                let new_date = moment()
                  .date(_day)
                  .month(_month - 1)
                  .year(_year);
                _new_selected_date = new_date.format("DD-MM-YYYY");
              } else {
                let respectiveADObject =
                  calendarFunctions.getAdDateObjectByBsDate(
                    _year,
                    _month,
                    _day
                  );
                let new_date = moment()
                  .date(respectiveADObject.adDate)
                  .month(respectiveADObject.adMonth - 1)
                  .year(respectiveADObject.adYear);
                _new_selected_date = new_date.format("DD-MM-YYYY");
              }
              setSelectedDate(_new_selected_date);
              typeof onChange === "function" && onChange(_new_selected_date);
            }
          }}
        />
      </div>
      {isVisible && (
        <div ref={popupRef} style={{ zIndex: 999 }}>
          <NepaliCalendar
            initialDate={selectedDate}
            showExtra={true}
            disableDate={props.disableDate}
            shouldPressOK={true}
            initialDateType="BS"
            calendarType={calendarType}
            dateFormat="DD-MM-YYYY"
            showMonthDropdown={true}
            onSelect={(ad_date, bs_date) => {
              setIsVisible(false);
              console.log("Ad date", ad_date);
              let _ad = moment()
                .date(ad_date.day)
                .month(ad_date.month - 1)
                .year(ad_date.year);
              setSelectedDate(_ad.format("DD-MM-YYYY"));

              typeof onChange === "function" &&
                onChange(_ad.format("DD-MM-YYYY"));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
