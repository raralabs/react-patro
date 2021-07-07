import React, { useState } from "react";
import { NepaliDatePicker } from "./nepali_date_picker/index.js";
import NepaliCalendarRange from "./nepali_date_picker/calendar_range";
import {
  getCalendarType,
  get_ad_bs_listener,
} from "./nepali_date_picker/ad_bs_date_render";
import { Switch, Space } from "antd";
import NepaliRangeInputPicker from "./nepali_date_picker/range_input_picker";
import CustomDateRangeToggler from "./nepali_date_picker/custom_daterange_toggler";

import AdBsDateRenderer from "./lib/NepaliDatePicker/AdBsDateRenderer";
import NepaliCalendar from "./lib/NepaliDatePicker/Calendar";
import DatePicker from "./lib/NepaliDatePicker/DatePicker";

import "./App.css";

const App = ({ disableDate }) => {
  const [date, setDate] = useState("");
  const [checked, setChecked] = useState(getCalendarType() === "BS");
  const [selectedDate, setSelectedDate] = useState();

  return (
    <Space
      direction="vertical"
      size={40}
      style={{
        width: "100%",
        padding: 80,
        backgroundColor: "tomato",
      }}
    >
      <Switch
        checked={checked}
        unCheckedChildren="AD"
        checkedChildren="BS"
        onChange={(checked) => {
          if (checked) {
            // to bs
            let ad_bs_listener = get_ad_bs_listener();
            ad_bs_listener.ad_bs.publish("BS");
          } else {
            // to ad
            let ad_bs_listener = get_ad_bs_listener();
            ad_bs_listener.ad_bs.publish("AD");
          }
          setChecked(checked);
        }}
      ></Switch>
      This is neapli calendar
      <NepaliCalendar
        initialDate={selectedDate}
        showExtra={true}
        disableDate={disableDate}
        shouldPressOK={true}
        initialDateType="BS"
        calendarType={"BS"}
        dateFormat="yyyy-dd-mm"
        showMonthDropdown={true}
        showYearDropdown={true}
        // withReference={true}
        // zeroDayName="Receipt Date"
        // reference_date={"24-08-2020"}
        // rangeReference={[0, 5, 15, 20, 30, 40, 50, 60, 70, 80, 90]}
        onSelect={(formatttedDate, bs_date, date, formattedDate) => {
          setSelectedDate(formattedDate);
        }}
      />
      <div>
        For input, type DATE{"<space>"}Month{"<space>"}Year and press ENTER or
        TAB to select date. NOTE: DATE,MONTH,YEAR field can be neglected
      </div>
      <NepaliDatePicker
        value={date}
        onChange={(val) => {
          setDate(val);
        }}
      />
      new Date Picker
      <DatePicker
        value={date}
        onChange={(val) => {
          setDate(val);
        }}
      />
      <CustomDateRangeToggler />
      <NepaliRangeInputPicker />
      <NepaliCalendarRange />
      <div>RENDERED DATE IN AD/BS</div>
      <div>
        <Space
          size={40}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {Array(20)
            .fill("")
            .map((it, ind) => {
              return <AdBsDateRenderer adDate={"02-04-2021"} />; //TODO
            })}
        </Space>
      </div>
    </Space>
  );
};

export default App;
