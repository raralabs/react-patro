import { useState, useEffect, useRef, useCallback } from "react";
import { IDateObject } from "../Calendar/types";
import { formatBsDate } from "../CalendarData";
import { isDateValidWithFormat } from "../CalendarData/validator";
import { parseDate, getDateFromObject } from "../date-fns";

type SelectedDateRange = {
  from: string | null;
  to: string | null;
};
type RangeType = "from" | "to";

const useDateRange = (
  dateFrom: string,
  dateTo: string,
  dateFormat: string,
  isAD = true
) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDateRange>({
    from: dateFrom,
    to: dateFrom,
  });

  useEffect(() => {
    if (dateFrom && isDateValidWithFormat(dateFrom, dateFormat)) {
      setSelectedDate((selectedDate) => ({ ...selectedDate, from: dateFrom }));
    }
  }, [dateFrom, dateFormat]);

  useEffect(() => {
    if (dateTo && isDateValidWithFormat(dateTo, dateFormat)) {
      setSelectedDate((selectedDate) => ({ ...selectedDate, to: dateTo }));
    }
  }, [dateTo, dateFormat]);

  //specifies whose turn to update from or to
  const turnRef = useRef<RangeType>("from");

  const onDateSelect = useCallback(
    (adDate: IDateObject) => {
      const turn = turnRef.current;
      const date = getDateFromObject(adDate);
      const formattedDate = formatBsDate(adDate, dateFormat);

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

  return { selectedDate, onDateSelect, setSelectedDate };
};

export default useDateRange;
