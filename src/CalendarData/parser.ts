import { IDateObject, IDateFormat } from "../types/main";

function parseDate(input: string, format: string): IDateObject {
  format = String(format)?.toLocaleLowerCase() || "yyyy-mm-dd"; // default format
  const parts = input.match(/(\d+)/g);
  if (parts) {
    let i = 0;
    const fmt: IDateFormat = {};

    format.replace(/(yyyy|dd|d|mm|m)/g, function (part) {
      fmt[part as keyof IDateFormat] = i++;
      return "";
    });

    const yearIndex = fmt["yyyy"];
    const monthIndex = fmt["mm"] ?? fmt["m"];
    const dateIndex = fmt["dd"] ?? fmt["d"];
    if (yearIndex === undefined) {
      throw new TypeError(
        `Year isn't Provided in the given date input or the format doesn't contain correct combination of 'yyyy'. Please Acceptable formats are the pemutation of 'yyyy', 'mm' and 'dd'  instead got ${format} `
      );
    }
    if (!monthIndex) {
      throw new TypeError(
        `Month isn't Provided in the given date input or the format doesn't contain correct combination of 'mm' | 'm'. Please Acceptable formats are the pemutation of 'yyyy', 'mm' and 'dd'  instead got ${format} `
      );
    }
    if (!dateIndex) {
      throw new TypeError(
        `Date isn't Provided in the given date input or the format doesn't contain correct combination of 'dd' | 'd'. Please Acceptable formats are the pemutation of 'yyyy', 'mm' and 'dd'  instead got ${format} `
      );
    }

    if (yearIndex !== undefined && monthIndex && dateIndex) {
      const year = +parts[yearIndex];
      const month = +parts[monthIndex];
      const date = +parts[dateIndex];

      return { year, month, date };
    } else {
      throw new Error("error");
    }
  } else {
    throw new TypeError("Passed Input isn't a valid date. Please check again");
  }
}
export default parseDate;
