import React, { useState } from "react";

// import CustomDateRangeToggler from "./nepali_date_picker/custom_daterange_toggler";

// import AdBsDateRenderer from "./lib/NepaliDatePicker/AdBsDateRenderer";
import NepaliCalendar from "./lib/NepaliDatePicker/Calendar";
import DatePicker from "./lib/NepaliDatePicker/DatePicker";
import NepaliCalendarRange from "./lib/NepaliDatePicker/Range";
import PreLabeledRange from "./lib/NepaliDatePicker/Range/PreLabeled";

import "./App.css";
import { ad2bs, bs2ad } from "./lib/NepaliDatePicker/CalendarData";
import parseDate from "./lib/NepaliDatePicker/CalendarData/parser";
import format from "./lib/NepaliDatePicker/CalendarData/format";

const App = () => {
  const [date, setDate] = useState("");

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

  window.ad2bs = ad2bs;
  window.bs2ad = bs2ad;

  window.parse = parseDate;
  window.format = format;
  return (
    <div style={{ background: "tomato", padding: 40, color: "white" }}>
      <div style={{ maxWidth: 960, margin: "0px auto" }}>
        <h1>AD Calendar</h1>
        <p>Selected Date AD: {JSON.stringify(selectedDate)};</p>
        <div style={{ marginBottom: 150 }}>
          <NepaliCalendar
            defaultValue="2021-07-09"
            showExtra={true}
            calendarType={"AD"}
            dateFormat="yyyy-mm-dd"
            value={selectedDate}
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
            calendarType={"BS"}
            dateFormat="yyyy-mm-dd"
            value={selectedDateBS}
            // showMonthDropdown={true}
            // showYearDropdown={true}
            // disablePast
            // maxDate="2021-07-10"
            // minDate="07-03-2021"
            // disablePast
            // disableDate={(date) => date === "07-03-2021"}
            onSelect={(formattedDate, adDate, bsDate, date) => {
              // alert(formattedDate);
              setSelectedDateBS(formattedDate);
            }}
          />
        </div>
        <h1>Ad Date Picker</h1>
        <p>Selected Date: {JSON.stringify(date)}</p>
        New Date Picker
        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              value={date}
              onChange={(val) => {
                setDate(val);
              }}
            />
          </div>
        </div>
        {/* <CustomDateRangeToggler /> */}
        <PreLabeledRange />
        <h1>Ad Date Range</h1>
        <p>
          Selected Range: {selectedDateRange.from} - {selectedDateRange.to}
        </p>
        <div style={{ marginBottom: 100 }}>
          <NepaliCalendarRange
            calendarType="AD"
            onChange={(from, to) => {
              setSelectedDateRange({ from, to });
            }}
          />
        </div>
        BS DAte RAnge
        <NepaliCalendarRange
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
