import { useEffect, useState } from "react";
import { IDateObject } from "./types";
import { isDateValid, parseDate } from "../date-fns";

import { getDateObj } from "../date-fns";
import { parseBsDate, bs2ad } from "../CalendarData";

const useSelectedData = (
  dateFormat: string,
  isAD: boolean,
  value: string | null | undefined,
  defaultDate: string | null | undefined
) => {
  const initialDate = value ?? defaultDate;
  let currentDate = new Date();
  let selectedData: IDateObject = {
    date: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };
  if (initialDate && isDateValid(initialDate, dateFormat)) {
    currentDate = parseDate(initialDate, dateFormat);

    selectedData = {
      date: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }
  const [data, setData] = useState<IDateObject>(selectedData);

  useEffect(() => {
    if (value) {
      if (isAD) {
        const adDateObj = getDateObj(value, dateFormat);
        if (adDateObj) setData(adDateObj);
      } else {
        const bsDateObj = parseBsDate(value, dateFormat);
        const adDateObj = bs2ad(
          bsDateObj.year,
          bsDateObj.month,
          bsDateObj.date
        );

        if (adDateObj) setData(adDateObj);
      }
    }
  }, [value, dateFormat, isAD]);

  return { selectedData: data, setSelectedData: setData };
};

export default useSelectedData;
