import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import NepaliDatePicker from "./NepaliDatePicker";
import "./index.scss";

//Regardless of calendar type chosen the returned date string is always in AD format
const DatePickerComponent = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    name,
    placeholder = "YYYY-MM-DD",
    onChange,
    required = false,
    className,
    error = false,
    errorMsg,
    wrapperClassName,
    wrapperStyle = {},
    labelClassName,
    defaultValue,
    labelStyle = {},

    ...otherProps
  } = props;
  const [dateType, setDateType] = useState("AD");
  const [dateValue, setDateValue] = useState(
    defaultValue ? new Date(defaultValue) : null
  );

  useEffect(() => {
    if (defaultValue) onChange && onChange(new Date(defaultValue));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (value === undefined && defaultValue) {
      setDateValue(defaultValue);
    } else setDateValue(value);
  }, [value, defaultValue]);

  const isAd = dateType === "AD";
  const labelClass = labelClassName
    ? `d-flex justify-content-between align-items-center ${
        labelClassName ?? ""
      }`
    : "d-flex justify-content-between align-items-center ";
  const wrapperClass = wrapperClassName ? `h-100 ${wrapperClassName}` : "h-100";

  return (
    <Form.Group className={wrapperClass} ref={ref} style={{ ...wrapperStyle }}>
      <Form.Label className={labelClass} style={{ ...labelStyle }}>
        <label className="m-0 mr-2">
          {label || "Date"}
          {required && <span className="text-danger">*</span>}
        </label>
        <div className="d-flex">
          <label className="m-0 mr-2 pointer" style={{ fontSize: "0.8rem" }}>
            <input
              type="radio"
              className="mr-1"
              style={{ fontSize: "0.8rem" }}
              checked={!isAd}
              value={!isAd}
              onChange={() => setDateType("BS")}
            />
            BS
          </label>
          <label className=" pointer m-0" style={{ fontSize: "0.8rem" }}>
            <input
              type="radio"
              className="mr-1"
              checked={isAd}
              value={isAd}
              onChange={() => setDateType("AD")}
            />
            AD
          </label>
        </div>
      </Form.Label>

      {isAd ? (
        <DatePicker
          wrapperClassName="form-control-sm p-0 w-100"
          className={`form-control form-control-sm ${className} ${
            error ? "is-invalid" : ""
          }`}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
          required={required}
          selected={dateValue ? new Date(dateValue) : dateValue}
          onChange={(date) => {
            onChange && onChange(date ? new Date(date) : date);
          }}
          {...otherProps}
          isClearable
        />
      ) : (
        <NepaliDatePicker
          value={dateValue ? new Date(dateValue) : dateValue}
          placeholder={placeholder}
          isClearable
          // defaultValue={defaultValue}
          onChange={(date) => {
            onChange && onChange(date ? new Date(date) : date);
          }}
        />
      )}
      {error && errorMsg && <div className="error-msg">{errorMsg}</div>}
    </Form.Group>
  );
});

DatePickerComponent.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  noDefault: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  wrapperClassName: PropTypes.string,
  wrapperStyle: PropTypes.object,
  labelClassName: PropTypes.string,
  labelStyle: PropTypes.object,
};

export default DatePickerComponent;
