import { ad2bs, bs2ad } from "./index";
import { IDateObject } from "../Calendar/types";
import parse from "./parser";
import format from "./format";

type DateOffset = {
  year?: number;
  month?: number;
  date?: number;
};

export function getNewBsDate<T extends string | undefined>(
  offset: DateOffset,
  dateObjString: IDateObject | string,
  dateFormat?: T
): T extends string | undefined ? string : IDateObject {
  const { year, month, date } = (() => {
    if (typeof dateObjString === "string") {
      if (dateFormat) {
        const bsObj = parse(dateObjString, dateFormat);
        return bsObj;
      } else
        throw new Error(
          `If string type is passed as second argument then dateFormat should be passed compulsarily to parse the string. Or pass the date Object {year,month,date} but received dateFormat as ${dateFormat} for second argument ${JSON.stringify(
            dateObjString
          )}`
        );
    } else return dateObjString;
  })();

  const ad = bs2ad(year, month, date);

  const monthIndex = ad.month - 1;
  const adDate = new Date(
    ad.year + (offset?.year ?? 0),
    monthIndex + (offset?.month ?? 0),
    ad.date + (offset?.date ?? 0)
  );

  const bs = ad2bs(
    adDate.getFullYear(),
    adDate.getMonth() + 1,
    adDate.getDate()
  );

  if (dateFormat) {
    return format(bs, dateFormat) as any;
  }
  return bs as any;
}

export function getNewAdDate<T extends string | undefined>(
  offset: DateOffset,
  dateObjString: IDateObject | string,
  dateFormat?: T
): T extends string | undefined ? string : IDateObject {
  const { year, month, date } = (() => {
    if (typeof dateObjString === "string") {
      if (dateFormat) {
        const adObj = parse(dateObjString, dateFormat);
        return adObj;
      } else
        throw new Error(
          `If string type is passed as second argument then dateFormat should be passed compulsarily to parse the string. Or pass the date Object {year,month,date} but received dateFormat as ${dateFormat} for first argument ${JSON.stringify(
            dateObjString
          )}`
        );
    } else return dateObjString;
  })();

  const monthIndex = month - 1;
  const adDate = new Date(
    year + (offset?.year ?? 0),
    monthIndex + (offset?.month ?? 0),
    date + (offset?.date ?? 0)
  );

  const ad = {
    year: adDate.getFullYear(),
    month: adDate.getMonth() + 1,
    date: adDate.getDate(),
  };

  if (dateFormat) {
    return format(ad, dateFormat) as any;
  }
  return ad as any;
}

type CompareBoolean = 1 | -1 | 0;
//1 => if left is greater
//-1 => if right is greter
//0 => if same
export function compareDates(
  date1: string,
  date2: string,
  dateFormat: string
): CompareBoolean {
  const date1Obj = parse(date1, dateFormat);
  const date2Obj = parse(date2, dateFormat);

  if (date1Obj.year > date2Obj.year) return 1;
  if (date2Obj.year > date1Obj.year) return -1;

  if (date1Obj.month > date2Obj.month) return 1;
  if (date2Obj.month > date1Obj.month) return -1;

  if (date1Obj.date > date2Obj.date) return 1;
  if (date2Obj.date > date1Obj.date) return -1;

  return 0;
}

export function areDateEqual(
  date1: string,
  date2: string,
  dateFormat: string
): boolean {
  const compareBoolean = compareDates(date1, date2, dateFormat);
  return compareBoolean === 0;
}
export function isAfter(
  date1: string,
  date2: string,
  dateFormat: string
): boolean {
  const compareBoolean = compareDates(date1, date2, dateFormat);
  return compareBoolean === 1;
}
export function isBefore(
  date1: string,
  date2: string,
  dateFormat: string
): boolean {
  const compareBoolean = compareDates(date1, date2, dateFormat);
  return compareBoolean === -1;
}
