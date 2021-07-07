import { getNumberOfDaysInMonth, getValidYears } from "./getBsData";

export const dateDisplayFormatter = ({ year, month, date }) =>
  year + "-" + String(+month + 1).padStart(2, 0) + "-" + date;

export const convertDateToString = (dateData) => {
  const date = new Date(dateData);

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth()).padStart(2, 0) +
    "-" +
    String(date.getDate()).padStart(2, 0)
  );
};
export const convertDateObjToString = ({ year, month, date }) =>
  year + "-" + String(+month + 1).padStart(2, 0) + "-" + date;
export const toNumber = (n) => {
  if (n === undefined) return null;
  if (n === "") return null;
  if (isNaN(+n)) return null;

  return +n;
};

export const newSelectedDate = (selectedDate, enteredData) => {
  let _newSelectedDate = { ...selectedDate };
  const allValidYears = getValidYears("en");

  const regexToMonth = /\d{4}(-|\/)(.+)/;
  const regexToDate = /\d{4}(-|\/)(\d{1}|\d{2})(-|\/)(.+)/;
  if (enteredData.match(regexToDate)) {
    const dateMatch = enteredData.match(regexToDate);
    if (toNumber(dateMatch[4])) {
      const noOfDaysInMonths = getNumberOfDaysInMonth(
        selectedDate.year,
        selectedDate.month
      );

      if (toNumber(dateMatch[4]) <= noOfDaysInMonths) {
        _newSelectedDate = {
          ...selectedDate,
          date: String(dateMatch[4]).padStart(2, 0),
        };
      }
    }
  } else if (enteredData.match(regexToMonth)) {
    const monthMatch = enteredData.match(regexToMonth);

    if (toNumber(monthMatch[2])) {
      if (toNumber(monthMatch[2] <= 12))
        _newSelectedDate = {
          ...selectedDate,
          month: String(+monthMatch[2] - 1).padStart(2, 0),
        };
    }
  } else if (toNumber(enteredData)) {
    if (toNumber(enteredData) <= 12) {
      _newSelectedDate = {
        ...selectedDate,
        month: String(+enteredData - 1).padStart(2, 0),
      };
    } else if (
      toNumber(enteredData) <= allValidYears[allValidYears.length - 1] &&
      toNumber(enteredData) >= allValidYears[0]
    ) {
      _newSelectedDate = {
        ...selectedDate,
        year: String(+enteredData).padStart(2, 0),
      };
    }
  }
  return _newSelectedDate;
};

export const convertDateStringToDateObj = (str) => {
  if (str) {
    const date = new Date(str);

    return {
      year: date.getFullYear(),
      month: String(date.getMonth()).padStart(2, 0),
      date: String(date.getDate()).padStart(2, 0),
    };
  } else return null;
};
