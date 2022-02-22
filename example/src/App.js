import React, { useState } from "react";

// import CustomDateRangeToggler from "./nepali_date_picker/custom_daterange_toggler";

// import AdBsDateRenderer from "nepalicalendar/NepaliDatePicker/AdBsDateRenderer";
// import NepaliCalendar from "nepalicalendar/Calendar";
// import DatePicker from "nepalicalendar/DatePicker";
// import NepaliCalendarRange from "nepalicalendar/Range";
// import PreLabeledRange from "nepalicalendar/Range/PreLabeled";

import {
  DatePicker,
  NepaliCalendar,
  RangeCalendar,
  DefinedRangeCalendar,
} from "react-patro";

// import {
//   ad2bs,
//   bs2ad,
//   isBsDateValid,
//   isInValidRange,
// } from "nepalicalendar/CalendarData";
// import parseDate from "nepalicalendar/CalendarData/parser";
// import format from "nepalicalendar/CalendarData/format";
// import { isAdDateValid } from "nepalicalendar/CalendarData/validator";

import "./App.css";

const App = () => {
  const [date, setDate] = useState("");
  const [dateBS, setDateBS] = useState("01-01-2021");

  const [selectedDate, setSelectedDate] = useState("2021-07-03");

  const [selectedDateBS, setSelectedDateBS] = useState("2078-10-12");

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: "",
    to: "",
  });
  const [selectedDateRangeBs, setSelectedDateRangeBs] = useState({
    from: "",
    to: "",
  });

  const [definedRangeSelector, setDefinedRangeSelector] = useState({
    from: "",
    to: "",
  });

  // //converter
  // window.ad2bs = ad2bs;
  // window.bs2ad = bs2ad;

  // // formater and parser
  // window.parse = parseDate;
  // window.format = format;

  // ////Range VAlidator
  // window.isBsDateValid = isBsDateValid;
  // window.isAdDateValid = isAdDateValid;
  // window.isInValidRange = isInValidRange;

  return (
    <div style={{ background: "tomato", padding: 40, color: "white" }}>
      <div style={{ maxWidth: 960, margin: "0px auto" }}>
        <h1>AD Calendar</h1>
        <p>Selected Date AD: {JSON.stringify(selectedDate)};</p>
        <div style={{ marginBottom: 150 }}>
          <NepaliCalendar
            // defaultValue="2021-07-09"
            showExtra={true}
            calendarType={"AD"}
            dateFormat="yyyy-mm-dd"
            value={selectedDate}
            disablePast
            // showMonthDropdown={true}
            // showMonthDropdown={true}
            // showYearDropdown={true}
            // maxDate="2021-07-10"
            // minDate="07-03-2021"
            // disablePast
            // disableDate={(date) => date === "07-03-2021"}
            onSelect={(formattedDate, adDate, bsDate, date) => {
              setSelectedDate(formattedDate);
            }}
          />
        </div>
        <h1>BS Calendar</h1>
        <p>Selected Date BS: {JSON.stringify(selectedDateBS)};</p>
        <div style={{ marginBottom: 150 }}>
          <NepaliCalendar
            // defaultValue="2021-07-09"
            showExtra={true}
            calendarType="BS"
            dateFormat="yyyy-mm-dd"
            value={selectedDateBS}
            // showMonthDropdown={true}
            // showYearDropdown={true}
            disablePast
            // disableFuture
            maxDate="2078-10-27"
            // minDate="07-03-2021"
            // disablePast
            // disableDate={(date) => date === "07-03-2021"}
            onSelect={(formattedDate, adDate, bsDate, date) => {
              setSelectedDateBS(formattedDate);
            }}
          />
        </div>
        <h1>BS Date Picker</h1>
        <p>Selected Date: {JSON.stringify(dateBS)}</p>
        New Date Picker
        <div style={{ marginBottom: 150 }}>
        <input/>
        <input/>
          <div style={{ width: 250 }}>
          kjs;lkajs;fkja;jfs
            <DatePicker
              // value={dateBS}
              value={dateBS}
              calendarType="AD"
              dateFormat="dd-mm-yyyy"
              onChange={(val) => {
                console.log("val",val);
                setDateBS(val);
              }}
            >
              <button>hello </button>
            </DatePicker>
          </div>
        <input/>

        </div>

        <h1>AD Date Picker</h1>
        <p>Selected Date: {JSON.stringify(date)}</p>
        New Date Picker
        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              value={date}
              calendarType="AD"
              onChange={(val) => {
                setDate(val);
              }}
            />
          </div>
        </div>
        <h1>Defined Range Selector</h1>
        <p>
          Base Date: 2021-09-14 Selected Range: {definedRangeSelector.from} -{" "}
          {definedRangeSelector.to}
        </p>

        <div style={{ marginBottom: 200 }}>
          <DefinedRangeCalendar
            from={definedRangeSelector.from}
            to={definedRangeSelector.to}
            dateFormat="yyyy-mm-dd"
            calendarType="AD"
            onChange={(dateFrom, dateTo) => {
              setDefinedRangeSelector({ from: dateFrom, to: dateTo });
            }}
          />
        </div>
        <h1>Ad Date Range</h1>
        <p>
          Selected Range: {selectedDateRange.from} - {selectedDateRange.to}
        </p>
        <div style={{ marginBottom: 100 }}>
          <RangeCalendar
            calendarType="AD"
            onChange={(from, to) => {
              setSelectedDateRange({ from, to });
            }}
          />
        </div>
        BS DAte RAnge
        <RangeCalendar
          onChange={(from, to) => {
            setSelectedDateRangeBs({ from, to });
          }}
          calendarType="BS"
        />
        <p>
          Selected Range: {selectedDateRangeBs.from} - {selectedDateRangeBs.to}
        </p>
        <div>RENDERED DATE IN AD/BS</div>
        {/* <div>
          {Array(20)
            .fill("")
            .map((it, ind) => {
              return <AdBsDateRenderer adDate={"02-04-2021"} key={ind} />; //TODO
            })}
        </div> */}
      </div>
    </div>
  );
};

export default App;
