import React, { useEffect, useRef, useState } from "react";
import { CalendarType, IDateOffset } from "../Calendar/types";
import { getOffsetFormattedDate, isDateValid } from "../date-fns";
// import "../nepali_date_picker.css";

import NepaliCalendarForRange from "../Calendar";
import useDateRange from "./useDateRange";
import {
  compareDates,
  getNewAdDate,
  getNewBsDate,
} from "../CalendarData/calculation";

type DefinedRanges = { label: string; offset: number | IDateOffset };
interface IDefinedRange {
  from: string;
  to: string;
  onChange: (dateFrom: string | null, dateTo: string | null) => void;
  dateFormat: string;
  calendarType: CalendarType;
  definedRanges: DefinedRanges[];
  baseDate: string;
}

const _defined = [
  {
    label: "Last Year",
    offset: { year: -1 },
  },
  {
    label: "Last 15 days",
    offset: -15,
  },
  {
    label: "Last 7 days",
    offset: -7,
  },
  {
    label: "Last 25 days",
    offset: -25,
  },
  {
    label: "Last 30 days",
    offset: -30,
  },
  {
    label: "Last 45 days",
    offset: -45,
  },
  {
    label: "Next week",
    offset: 7,
  },
];
const baseDate = "2021-07-14";

const NepaliCalendarRange = (props: IDefinedRange) => {
  const {
    from,
    to,
    onChange,
    dateFormat = "yyyy-mm-dd",
    calendarType,
    definedRanges = _defined,
  } = props;

  const { selectedDate, onDateSelect, setSelectedDate } = useDateRange(
    from,
    to,
    dateFormat
  );

  const [selectedDefinition, setSelectionDefinition] = useState<string>("");

  const { from: selectedDateFrom, to: selectedDateTo } = selectedDate;

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    const onChange = onChangeRef.current;
    typeof onChange === "function" &&
      onChange(selectedDate.from, selectedDate.to);
  }, [onChangeRef, selectedDate.from, selectedDate.to]);

  const isAD = calendarType === "AD";

  return (
    <div className="rl-defined-range-selector">
      <div className="rl-defined-range-label-wrapper">
        {definedRanges.map((e) => {
          const offsetObj =
            typeof e.offset === "number" ? { date: e.offset } : e.offset;

          const newDate = isAD
            ? getNewAdDate({ ...offsetObj }, baseDate, dateFormat)
            : getNewBsDate({ ...offsetObj }, baseDate, dateFormat);

          const comparison = compareDates(newDate, baseDate, dateFormat);

          const fromDate = comparison < 0 ? newDate : baseDate;
          const toDate = comparison < 0 ? baseDate : newDate;
          const range = `${fromDate} - ${toDate}`;

          const isSelected = selectedDefinition === e.label;

          return (
            <div
              key={e.label}
              className={`font-sm  rl-defined-range-label ${
                isSelected ? "rl-defined-range-label-selected" : ""
              }`}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
              onClick={() => {
                setSelectionDefinition(e.label);
                setSelectedDate({ from: fromDate, to: toDate });
              }}
            >
              <div className="gray-60">{e.label}</div>
              <div className="gray-20">{range}</div>
            </div>
          );
        })}
      </div>

      {/* <NepaliCalendarForRange
        range={{ from: selectedDateFrom, to: selectedDateTo }}
        defaultValue={selectedDateFrom}
        onSelect={(hello, adDate) => {
          onDateSelect(adDate);
        }}
        dateFormat={dateFormat}
        calendarType={calendarType}
        showToday={false}
      /> */}

      <NepaliCalendarForRange
        range={{ from: selectedDateFrom, to: selectedDateTo }}
        defaultValue={
          selectedDateTo == null
            ? selectedDateFrom && isDateValid(selectedDateFrom, dateFormat)
              ? getOffsetFormattedDate(
                  { month: 1 },
                  dateFormat,
                  selectedDateFrom
                )
              : getOffsetFormattedDate({ month: 1 }, dateFormat)
            : selectedDateTo
        }
        onSelect={(hello, adDate) => {
          onDateSelect(adDate);
        }}
        dateFormat={dateFormat}
        calendarType={calendarType}
        showToday={false}
      />
    </div>
  );
};

export default NepaliCalendarRange;
