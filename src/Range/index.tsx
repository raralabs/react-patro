import React, { useEffect, useRef } from "react";
import { ICalendarRange } from "../types/main";
import { getOffsetFormattedDate } from "../date-fns";

import NepaliCalendarForRange from "../Calendar";
import useDateRange from "./useDateRange";
import { isDateValidWithFormat } from "../CalendarData/validator";

const NepaliCalendarRange = (props: ICalendarRange) => {
  const { from, to, onChange, dateFormat = "yyyy-mm-dd", calendarType } = props;
  const isAD = calendarType === "AD";

  const { selectedDate, onDateSelect } = useDateRange(
    from,
    to,
    dateFormat,
    isAD
  );

  const { from: selectedDateFrom, to: selectedDateTo } = selectedDate;

  console.log("props", props);

  //Use Directly on on Select instead
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    const onChange = onChangeRef.current;
    typeof onChange === "function" &&
      onChange(selectedDate.from, selectedDate.to);
  }, [onChangeRef, selectedDate.from, selectedDate.to]);

  return (
    <div className="rl-range-calendar">
      <NepaliCalendarForRange
        range={{ from: selectedDateFrom, to: selectedDateTo }}
        defaultValue={selectedDateFrom}
        onSelect={(hello, adDate, bsDate) => {
          onDateSelect(isAD ? adDate : bsDate);
        }}
        dateFormat={dateFormat}
        calendarType={calendarType}
        showToday={false}
      />

      <NepaliCalendarForRange
        range={{ from: selectedDateFrom, to: selectedDateTo }}
        defaultValue={
          selectedDateTo == null
            ? selectedDateFrom &&
              isDateValidWithFormat(selectedDateFrom, dateFormat)
              ? getOffsetFormattedDate(
                  { month: 1 },
                  dateFormat,
                  selectedDateFrom
                )
              : getOffsetFormattedDate(
                  { month: 1 },
                  dateFormat,
                  null,
                  calendarType
                )
            : selectedDateTo
        }
        onSelect={(hello, adDate, bsDate) => {
          onDateSelect(isAD ? adDate : bsDate);
        }}
        dateFormat={dateFormat}
        calendarType={calendarType}
        showToday={false}
      />
    </div>
  );
};

export default NepaliCalendarRange;
