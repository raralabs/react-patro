import React, { useEffect, useRef } from "react";
import { ICalendarRange } from "../types/main";

import NepaliCalendarForRange from "../Calendar";
import useDateRange from "./useDateRange";
import { getNewAdDate, getNewBsDate } from "CalendarData/calculation";
import { getTodaysDate } from "Calendar/util";
import { formatBsDate } from "CalendarData";

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

  //Use Directly on on Select instead
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    const onChange = onChangeRef.current;
    typeof onChange === "function" &&
      onChange(selectedDate.from, selectedDate.to);
  }, [onChangeRef, selectedDate.from, selectedDate.to]);

  const today = getTodaysDate();
  const nextMonthDateObj = isAD
    ? getNewAdDate({ month: 1 }, today.ad)
    : getNewBsDate({ month: 1 }, today.bs);
  const formattedNextMonthDate = formatBsDate(nextMonthDateObj, dateFormat);

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
      />

      <NepaliCalendarForRange
        range={{ from: selectedDateFrom, to: selectedDateTo }}
        defaultValue={selectedDateTo ?? formattedNextMonthDate}
        onSelect={(hello, adDate, bsDate) => {
          onDateSelect(isAD ? adDate : bsDate);
        }}
        dateFormat={dateFormat}
        calendarType={calendarType}
      />
    </div>
  );
};

export default NepaliCalendarRange;
