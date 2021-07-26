import { useEffect, useState } from "react";
import { IDateObject } from "../types/main";

import { getDateObj } from "../date-fns";
import { parseBsDate, bs2ad } from "../CalendarData";
import { isDateValidWithFormat } from "../CalendarData/validator";
import { getTodaysDate } from "./util";

//Regardless of isAD value the data should always contain Ad data by converting bs Data to ad if isAD = false
const useSelectedData = (
  dateFormat: string,
  isAD: boolean,
  value: string | null | undefined,
  defaultDate: string | null | undefined
) => {
  const initialDate = value ?? defaultDate;
  const { ad: todaysDateInAd, bs: todaysDateInBs } = getTodaysDate();

  let currentDate = isAD ? todaysDateInAd : todaysDateInBs;

  let selectedData: IDateObject = {
    date: currentDate.date,
    month: currentDate.month,
    year: currentDate.year,
  };
  if (initialDate && isDateValidWithFormat(initialDate, dateFormat)) {
    selectedData = parseBsDate(initialDate, dateFormat);
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

  return [data, setData] as const;
};

export default useSelectedData;
