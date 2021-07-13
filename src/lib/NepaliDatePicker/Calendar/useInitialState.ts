import { useEffect, useState } from "react";
import { IDateObject } from "./types";
import { isDateValid, parseDate } from "../date-fns";

const useInitialState = (
  initialDate: string | null | undefined,
  dateFormat: string
) => {
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
  const [data] = useState<IDateObject>(selectedData);

  return { data };
};

export default useInitialState;
