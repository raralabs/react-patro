import React from "react";
// import { getFormattedDateFromObject } from "../date-fns";
import { DateRange, DisableProps, IDateObject } from "./types";
import useCalendarData from "./useCalendarData";
import {
  checkIsInRange,
  checkIsSelected,
  checkIsDisabled,
  checkIsRangeBoundary,
} from "./util";

interface DateRendererProps extends DisableProps {
  isAD: boolean;
  selectedData: IDateObject;
  shouldPressOK: boolean;
  onChangeDate: (adDate: IDateObject, bsDate: IDateObject) => void;
  showExtra: boolean;
  changeMonth: (n: number) => void;
  range?: DateRange | null;
  dateFormat: string;
  year: number;
  month: number;
}

const DateRenderer = (props: DateRendererProps) => {
  const {
    isAD,
    selectedData,
    shouldPressOK,
    onChangeDate,
    showExtra,
    year,
    month,
    changeMonth,
    range,
    disableDate,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    dateFormat,
  } = props;
  const weekData = useCalendarData(year, month, isAD);

  return (
    <>
      {weekData.map(({ data, key }, week) => {
        return (
          <tr key={key}>
            {data.map((d, i) => {
              const isDisabled = checkIsDisabled(
                d.adDate,
                {
                  disableDate,
                  disableFuture,
                  disablePast,
                  maxDate,
                  minDate,
                },
                dateFormat,
                d.bsDate
              );

              const isSelected =
                d.isCurrentMonth && checkIsSelected(selectedData, d.adDate);
              const isInRange = range ? checkIsInRange(d.adDate, range) : false;

              const isRangeBoundary = range
                ? checkIsRangeBoundary(d.adDate, range)
                : false;
              return (
                <td
                  key={i}
                  title={`${d.main.year}/${d.main.month}/${d.main.date}`}
                  onClick={() => {
                    if (isDisabled) {
                      return;
                    }
                    if (!d.isCurrentMonth) {
                      if (week === 0) {
                        changeMonth(-1);
                      } else {
                        changeMonth(1);
                      }
                    }
                    if (shouldPressOK) {
                      onChangeDate(d.adDate, d.bsDate);
                    }
                  }}
                  className={`rl-picker-cell ${d.isToday ? "today" : ""} ${
                    isRangeBoundary || isSelected ? "active" : ""
                  } ${!d.isCurrentMonth ? "other-month" : ""} ${
                    isDisabled ? "disabled" : ""
                  }  ${isInRange ? "in-range" : ""}`}
                >
                  <div className={`rl-picker-cell-inner `}>
                    <div className="BS">{d.render.main}</div>
                    {showExtra && <div className="AD">{d.render.sub}</div>}
                  </div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default DateRenderer;
