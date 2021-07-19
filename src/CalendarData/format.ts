import { IDateObject } from "../Calendar/types";
type DateFormat = {
  yyyy: string;
  mm: string;
  m: string;
  dd: string;
  d: string;
};

function format(dateObj: IDateObject, format: string): string {
  format = String(format)?.toLocaleLowerCase() || "yyyy-mm-dd"; // default format

  const str: DateFormat = {
    yyyy: String(dateObj.year),
    mm: String(dateObj.month).padStart(2, "0"),
    m: String(dateObj.month),
    dd: String(dateObj.date).padStart(2, "0"),
    d: String(dateObj.date),
  };

  const formatted = format.replace(/(yyyy|dd|d|mm|m)/g, function (part) {
    return str[part as keyof DateFormat];
  });

  return formatted;
}
export default format;
