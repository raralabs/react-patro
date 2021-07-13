import { useState, useEffect, useRef, useCallback } from "react";
import { IDateObject } from "../Calendar/types";
import {
  getFormattedDateFromObject,
  isDateValid,
  parseDate,
  getDateFromObject,
} from "../date-fns";

type DateString = string | null;
type SelectedDateRange = {
  from: DateString;
  to: DateString;
};
type RangeType = "from" | "to";

const useDateRange = (dateFrom: string, dateTo: string, dateFormat: string) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDateRange>({
    from: dateFrom,
    to: dateFrom,
  });

  useEffect(() => {
    if (isDateValid(dateFrom, dateFormat)) {
      setSelectedDate((selectedDate) => ({ ...selectedDate, from: dateFrom }));
    }
  }, [dateFrom, dateFormat]);

  useEffect(() => {
    if (isDateValid(dateTo, dateFormat)) {
      setSelectedDate((selectedDate) => ({ ...selectedDate, to: dateTo }));
    }
  }, [dateTo, dateFormat]);

  //specifies whose turn to update from or to
  const turnRef = useRef<RangeType>("from");

  const onDateSelect = useCallback(
    (ad_date: IDateObject) => {
      const turn = turnRef.current;
      const date = getDateFromObject(ad_date);
      const formattedDate = getFormattedDateFromObject(ad_date, dateFormat);

      setSelectedDate((selectedDate) => {
        const { from: selectedDateFrom, to: selectedDateTo } = selectedDate;

        if (turn === "from") {
          const dateTo = selectedDateTo
            ? parseDate(selectedDateTo, dateFormat)
            : null;
          if (dateTo && dateTo < date) {
            return { from: formattedDate, to: null };
          }
        }
        if (turn === "to") {
          const dateFrom = selectedDateFrom
            ? parseDate(selectedDateFrom, dateFormat)
            : null;
          if (dateFrom && dateFrom > date) {
            return { to: formattedDate, from: null };
          }
        }
        const newSelection = { ...selectedDate, [turn]: formattedDate };

        return { ...newSelection };
      });

      if (turn === "from") turnRef.current = "to";
      else {
        turnRef.current = "from";
      }
    },
    [dateFormat]
  );

  return { selectedDate, onDateSelect };
};

export default useDateRange;
